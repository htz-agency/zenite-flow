import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Node, Edge } from 'reactflow';
import type { ZeniteNodeData } from '../types/node-types';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface FlowMetadata {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  canvas_zoom: number;
  canvas_x: number;
  canvas_y: number;
  created_at: string;
  updated_at: string;
}

export function useFlowData(flowId: string | null) {
  const [flow, setFlow] = useState<FlowMetadata | null>(null);
  const [nodes, setNodes] = useState<Node<ZeniteNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  let channel: RealtimeChannel | null = null;

  // Buscar org_id do usuário logado
  useEffect(() => {
    async function getOrgId() {
      const { data: { user } } = await supabase.auth.getUser();
      const id = user?.user_metadata?.org_id ?? null;
      setOrgId(id);
    }
    getOrgId();
  }, []);

  // Carregar dados do fluxo
  const loadFlow = useCallback(async () => {
    if (!flowId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Buscar metadados do fluxo
      const { data: flowData, error: flowError } = await supabase
        .from('flows')
        .select('*')
        .eq('id', flowId)
        .single();

      if (flowError) throw flowError;
      setFlow(flowData);

      // Buscar steps (nós)
      const { data: stepsData, error: stepsError } = await supabase
        .from('flow_steps')
        .select('*')
        .eq('flow_id', flowId);

      if (stepsError) throw stepsError;

      // Converter steps para nodes do React Flow
      const reactFlowNodes: Node<ZeniteNodeData>[] = (stepsData || []).map((step) => ({
        id: step.id,
        type: 'zenite',
        position: { x: step.position_x, y: step.position_y },
        data: {
          type: step.type,
          subtype: step.subtype || step.type,
          label: step.name,
          subtitle: step.notes || undefined,
          group: step.type as any,
          outputCount: step.config?.outputCount || 1,
          params: step.config?.params || {},
          config: step.config?.settings || {},
          isDisabled: step.is_disabled,
        },
      }));

      setNodes(reactFlowNodes);

      // Buscar connections (arestas)
      const { data: connectionsData, error: connectionsError } = await supabase
        .from('flow_connections')
        .select('*')
        .eq('flow_id', flowId);

      if (connectionsError) throw connectionsError;

      // Converter connections para edges do React Flow
      const reactFlowEdges: Edge[] = (connectionsData || []).map((conn) => ({
        id: conn.id,
        source: conn.source_step_id,
        target: conn.target_step_id,
        sourceHandle: conn.source_output > 0 ? `output-${conn.source_output}` : undefined,
        label: conn.source_output_label || undefined,
        type: 'smoothstep',
      }));

      setEdges(reactFlowEdges);
    } catch (err: any) {
      console.error('Erro ao carregar fluxo:', err);
      setError(err.message || 'Erro ao carregar fluxo');
    } finally {
      setLoading(false);
    }
  }, [flowId]);

  useEffect(() => {
    loadFlow();
  }, [loadFlow]);

  // Salvar step (criar ou atualizar)
  const saveStep = useCallback(
    async (node: Node<ZeniteNodeData>) => {
      if (!flowId || !orgId) return;

      try {
        const stepData = {
          flow_id: flowId,
          org_id: orgId,
          type: node.data.type,
          subtype: node.data.subtype,
          name: node.data.label,
          notes: node.data.subtitle || null,
          position_x: node.position.x,
          position_y: node.position.y,
          config: {
            outputCount: node.data.outputCount || 1,
            params: node.data.params || {},
            settings: node.data.config || {},
          },
          is_disabled: node.data.isDisabled || false,
          color: null,
          credential_id: null,
        };

        console.log('📤 Salvando step no Supabase:', {
          nodeId: node.id,
          params: stepData.config.params,
          settings: stepData.config.settings,
        });

        // Verificar se já existe
        const { data: existing } = await supabase
          .from('flow_steps')
          .select('id')
          .eq('id', node.id)
          .single();

        if (existing) {
          // Atualizar
          const { error } = await supabase
            .from('flow_steps')
            .update(stepData)
            .eq('id', node.id);

          if (error) throw error;
          console.log('✅ Step atualizado no Supabase:', node.id);
        } else {
          // Criar
          const { error } = await supabase
            .from('flow_steps')
            .insert({ ...stepData, id: node.id });

          if (error) throw error;
          console.log('✅ Step criado no Supabase:', node.id);
        }
      } catch (err: any) {
        console.error('Erro ao salvar step:', err);
        throw err;
      }
    },
    [flowId, orgId]
  );

  // Deletar step
  const deleteStep = useCallback(async (nodeId: string) => {
    try {
      // Deletar conexões relacionadas primeiro
      await supabase
        .from('flow_connections')
        .delete()
        .or(`source_step_id.eq.${nodeId},target_step_id.eq.${nodeId}`);

      // Deletar step
      const { error } = await supabase.from('flow_steps').delete().eq('id', nodeId);

      if (error) throw error;
    } catch (err: any) {
      console.error('Erro ao deletar step:', err);
      throw err;
    }
  }, []);

  // Salvar connection
  const saveConnection = useCallback(
    async (edge: Edge) => {
      if (!flowId || !orgId) return;

      try {
        const connectionData = {
          flow_id: flowId,
          org_id: orgId,
          source_step_id: edge.source,
          target_step_id: edge.target,
          source_output: edge.sourceHandle ? parseInt(edge.sourceHandle.split('-')[1]) : 0,
          source_output_label: edge.label?.toString() || null,
        };

        const { error } = await supabase
          .from('flow_connections')
          .insert({ ...connectionData, id: edge.id });

        if (error) throw error;
      } catch (err: any) {
        console.error('Erro ao salvar connection:', err);
        throw err;
      }
    },
    [flowId, orgId]
  );

  // Deletar connection
  const deleteConnection = useCallback(async (edgeId: string) => {
    try {
      const { error } = await supabase.from('flow_connections').delete().eq('id', edgeId);

      if (error) throw error;
    } catch (err: any) {
      console.error('Erro ao deletar connection:', err);
      throw err;
    }
  }, []);

  // Atualizar posição do nó
  const updateNodePosition = useCallback(async (nodeId: string, x: number, y: number) => {
    try {
      const { error } = await supabase
        .from('flow_steps')
        .update({ position_x: x, position_y: y })
        .eq('id', nodeId);

      if (error) throw error;
    } catch (err: any) {
      console.error('Erro ao atualizar posição:', err);
      throw err;
    }
  }, []);

  // Atualizar viewport do canvas
  const updateViewport = useCallback(
    async (zoom: number, x: number, y: number) => {
      if (!flowId) return;

      try {
        const { error } = await supabase
          .from('flows')
          .update({ canvas_zoom: zoom, canvas_x: x, canvas_y: y })
          .eq('id', flowId);

        if (error) throw error;
      } catch (err: any) {
        console.error('Erro ao atualizar viewport:', err);
      }
    },
    [flowId]
  );

  // Atualizar nome e descrição do fluxo
  const updateFlowMetadata = useCallback(
    async (name?: string, description?: string, isActive?: boolean) => {
      if (!flowId) return;

      try {
        const updates: any = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (isActive !== undefined) updates.is_active = isActive;

        const { error } = await supabase
          .from('flows')
          .update(updates)
          .eq('id', flowId);

        if (error) throw error;
      } catch (err: any) {
        console.error('Erro ao atualizar metadados do fluxo:', err);
        throw err;
      }
    },
    [flowId]
  );

  // Subscrever realtime para execuções
  const subscribeToFlowRun = useCallback(
    (runId: string, onUpdate: (payload: any) => void) => {
      const channel = supabase
        .channel(`flow-run-${runId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'flow_runs',
            filter: `id=eq.${runId}`,
          },
          (payload) => onUpdate(payload.new)
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'flow_run_steps',
            filter: `run_id=eq.${runId}`,
          },
          (payload) => onUpdate(payload.new)
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
    []
  );

  return {
    flow,
    nodes,
    edges,
    loading,
    error,
    loadFlow,
    saveStep,
    deleteStep,
    saveConnection,
    deleteConnection,
    updateNodePosition,
    updateViewport,
    updateFlowMetadata,
    subscribeToFlowRun,
  };
}