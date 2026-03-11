import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  useReactFlow,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toast } from 'sonner';

import ZeniteNode from './ZeniteNode';
import FlowBuilderHead from './FlowBuilderHead';
import FlowBuilderToolbar from './FlowBuilderToolbar';
import NodePicker from './NodePicker';
import NodeConfigDialog from './NodeConfigDialog';
import FlowLoadingSkeleton from './FlowLoadingSkeleton';
import { nodeCatalog, getNodeColor } from '../../data/node-catalog';
import type { ZeniteNodeData, NodeGroup } from '../../types/node-types';
import { FlowContext } from '../../contexts/FlowContext';
import { useFlowData } from '../../../hooks/useFlowData';
import { useDebounce } from '../../../hooks/useDebounce';
import { projectId } from '../../../utils/supabase/info';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

// Define nodeTypes FORA do componente para evitar re-criação
const nodeTypes = {
  zenite: ZeniteNode,
};

// Define edge style FORA do componente para evitar re-criação
const defaultEdgeStyle = { stroke: '#C8C8E0', strokeWidth: 2 };

const defaultViewport = { x: 0, y: 0, zoom: 1 };
const snapGrid: [number, number] = [24, 24];
const proOptions = { hideAttribution: true };

// Estilos estáticos para evitar re-criação
const backgroundStyle = { backgroundColor: '#F6F7F9' };
const minimapStyle = {
  backgroundColor: '#1A1A2E',
  borderRadius: 8,
  border: 'none',
  opacity: 0.9,
};

const initialNodes: Node<ZeniteNodeData>[] = [];

const initialEdges: Edge[] = [];

interface FlowBuilderProps {
  flowId?: string;
}

export default function FlowBuilder({ flowId }: FlowBuilderProps) {
  // Supabase integration
  const {
    flow,
    nodes: dbNodes,
    edges: dbEdges,
    loading,
    error,
    saveStep,
    deleteStep,
    saveConnection,
    deleteConnection,
    updateNodePosition,
    updateViewport,
    updateFlowMetadata,
    subscribeToFlowRun,
  } = useFlowData(flowId || null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [flowName, setFlowName] = useState('Novo Fluxo de Automação');
  const [flowStatus, setFlowStatus] = useState<'inactive' | 'activating' | 'active' | 'error'>('inactive');
  const [zoom, setZoom] = useState(1);
  const [showMinimap, setShowMinimap] = useState(false);
  const [showNodePicker, setShowNodePicker] = useState(false);
  const [nodePickerPosition, setNodePickerPosition] = useState<{ x: number; y: number } | undefined>();
  const [isExecuting, setIsExecuting] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const { fitView, zoomIn, zoomOut, setViewport } = useReactFlow();

  // Refs para track changes
  const nodesRef = useRef<Node<ZeniteNodeData>[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const isInitialLoadRef = useRef(true);

  // Carregar dados do Supabase quando disponíveis
  useEffect(() => {
    if (!loading && flowId) {
      if (dbNodes.length > 0) {
        setNodes(dbNodes);
        setEdges(dbEdges);
        nodesRef.current = dbNodes;
        edgesRef.current = dbEdges;
      }
      
      if (flow) {
        setFlowName(flow.name);
        setFlowStatus(flow.is_active ? 'active' : 'inactive');
        
        // Restaurar viewport
        if (flow.canvas_zoom || flow.canvas_x || flow.canvas_y) {
          setViewport({
            x: flow.canvas_x,
            y: flow.canvas_y,
            zoom: flow.canvas_zoom,
          });
        }
      }
      
      isInitialLoadRef.current = false;
    }
  }, [loading, dbNodes, dbEdges, flow, flowId, setNodes, setEdges, setViewport]);

  // Auto-save nodes com debounce
  const debouncedSaveNodes = useDebounce(async (nodesToSave: Node<ZeniteNodeData>[]) => {
    if (!flowId || isInitialLoadRef.current) return;

    try {
      for (const node of nodesToSave) {
        await saveStep(node);
      }
    } catch (err) {
      console.error('Erro ao auto-salvar nós:', err);
      toast.error('Erro ao salvar alterações', {
        description: 'Não foi possível salvar as mudanças no fluxo.',
      });
    }
  }, 1000);

  // Auto-save edges com debounce
  const debouncedSaveEdges = useDebounce(async (edgesToSave: Edge[]) => {
    if (!flowId || isInitialLoadRef.current) return;

    try {
      // Identificar edges adicionadas (estão em edgesToSave mas não em edgesRef)
      const previousEdgeIds = edgesRef.current.map(e => e.id);
      const newEdges = edgesToSave.filter(e => !previousEdgeIds.includes(e.id));
      
      for (const edge of newEdges) {
        await saveConnection(edge);
      }
    } catch (err) {
      console.error('Erro ao auto-salvar conexões:', err);
      toast.error('Erro ao salvar conexão', {
        description: 'Não foi possível salvar a nova conexão.',
      });
    }
  }, 1000);

  // Track changes nos nodes
  useEffect(() => {
    if (nodes !== nodesRef.current && !isInitialLoadRef.current) {
      debouncedSaveNodes(nodes);
      nodesRef.current = nodes;
    }
  }, [nodes, debouncedSaveNodes]);

  // Track changes nos edges
  useEffect(() => {
    if (edges !== edgesRef.current && !isInitialLoadRef.current) {
      debouncedSaveEdges(edges);
      edgesRef.current = edges;
    }
  }, [edges, debouncedSaveEdges]);

  // Auto-save nome do fluxo com debounce
  const debouncedSaveFlowName = useDebounce(async (name: string) => {
    if (!flowId || isInitialLoadRef.current) return;

    try {
      await updateFlowMetadata(name);
    } catch (err) {
      console.error('Erro ao salvar nome do fluxo:', err);
      toast.error('Erro ao salvar nome', {
        description: 'Não foi possível salvar o nome do fluxo.',
      });
    }
  }, 1500);

  // Track mudanças no nome do fluxo
  useEffect(() => {
    if (flowName && flow && flowName !== flow.name && !isInitialLoadRef.current) {
      debouncedSaveFlowName(flowName);
    }
  }, [flowName, flow, debouncedSaveFlowName]);

  const handleNodeDoubleClick = useCallback((nodeId: string) => {
    setEditingNodeId(nodeId);
  }, []);

  const handleNodeConfigSave = useCallback((nodeData: ZeniteNodeData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editingNodeId) {
          return { ...node, data: nodeData };
        }
        return node;
      })
    );
  }, [editingNodeId, setNodes]);

  const editingNode = nodes.find((n) => n.id === editingNodeId);

  const onConnect = useCallback(
    (params: Connection) => {
      const edge: Edge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        type: 'smoothstep',
        style: defaultEdgeStyle,
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  // Handler para deletar nós (também do Supabase)
  const onNodesDelete = useCallback(
    async (deleted: Node<ZeniteNodeData>[]) => {
      if (!flowId) return;

      try {
        for (const node of deleted) {
          await deleteStep(node.id);
        }
        toast.success('Nó excluído', {
          description: 'O nó foi removido do fluxo com sucesso.',
        });
      } catch (err) {
        console.error('Erro ao deletar nó:', err);
        toast.error('Erro ao excluir nó', {
          description: 'Não foi possível remover o nó do fluxo.',
        });
      }
    },
    [flowId, deleteStep]
  );

  // Handler para deletar edges (também do Supabase)
  const onEdgesDelete = useCallback(
    async (deleted: Edge[]) => {
      if (!flowId) return;

      try {
        for (const edge of deleted) {
          await deleteConnection(edge.id);
        }
      } catch (err) {
        console.error('Erro ao deletar conexão:', err);
        toast.error('Erro ao excluir conexão', {
          description: 'Não foi possível remover a conexão.',
        });
      }
    },
    [flowId, deleteConnection]
  );

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  const handleZoomReset = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 200 });
  }, [setViewport]);

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.2, duration: 200 });
  }, [fitView]);

  const handleAddNode = useCallback(() => {
    setShowNodePicker(true);
    setNodePickerPosition(undefined); // Centro da tela
  }, []);

  const handleAutoLayout = useCallback(() => {
    // Implementar auto-layout com Dagre posteriormente
    console.log('Auto-layout');
  }, []);

  const handleToggleMinimap = useCallback(() => {
    setShowMinimap((prev) => !prev);
  }, []);

  const handleExecuteFlow = useCallback(async () => {
    if (!flowId) {
      toast.error('Nenhum fluxo carregado', {
        description: 'Salve o fluxo antes de executar.',
      });
      return;
    }

    setIsExecuting(true);
    let runId: string | null = null;

    try {
      // Chama o servidor para criar o flow_run
      const serverUrl = import.meta.env.VITE_SERVER_URL
        ?? `https://${projectId}.supabase.co/functions/v1/make-server-e7f4e3cf`;

      const res = await fetch(`${serverUrl}/flow-runner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flow_id: flowId,
          trigger_type: "manual",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Erro ao iniciar execução");
      }

      const { run_id } = await res.json();
      runId = run_id;

      toast.success('Fluxo iniciado', {
        description: `Execução #${run_id.slice(0, 8)} em andamento...`,
      });

      // Subscreve ao realtime para acompanhar status
      const unsubscribe = subscribeToFlowRun(run_id, (payload: any) => {
        if (payload.status === 'success') {
          setIsExecuting(false);
          toast.success('Execução concluída!', {
            description: `Fluxo executado com sucesso em ${payload.duration_ms ?? '—'}ms`,
          });
          unsubscribe();
        } else if (payload.status === 'error') {
          setIsExecuting(false);
          toast.error('Erro na execução', {
            description: payload.error_message ?? 'Verifique os logs do fluxo.',
          });
          unsubscribe();
        }
      });

      // Timeout de segurança: 5 minutos
      setTimeout(() => {
        setIsExecuting(false);
        unsubscribe();
      }, 5 * 60 * 1000);

    } catch (err: any) {
      setIsExecuting(false);
      toast.error('Falha ao executar fluxo', {
        description: err.message ?? 'Erro desconhecido.',
      });
    }
  }, [flowId, subscribeToFlowRun]);

  const handleSave = useCallback(() => {
    console.log('Salvando fluxo...', { nodes, edges, flowName });
  }, [nodes, edges, flowName]);

  const handleToggleActivate = useCallback(() => {
    if (flowStatus === 'inactive') {
      setFlowStatus('activating');
      setTimeout(() => {
        setFlowStatus('active');
      }, 1500);
    } else if (flowStatus === 'active') {
      setFlowStatus('inactive');
    }
  }, [flowStatus]);

  const handleNodeSelect = useCallback(
    (nodeType: string, group: NodeGroup) => {
      const catalogNodes = nodeCatalog[group];
      const selectedNode = catalogNodes?.find((n) => n.type === nodeType);

      if (!selectedNode) return;

      const newNode: Node<ZeniteNodeData> = {
        id: `node-${Date.now()}`,
        type: 'zenite',
        position: nodePickerPosition 
          ? { x: nodePickerPosition.x - 120, y: nodePickerPosition.y - 40 }
          : { x: 250, y: 250 },
        data: {
          type: selectedNode.type,
          group: selectedNode.group,
          label: selectedNode.label,
          subtitle: selectedNode.description,
          outputCount: selectedNode.type.includes('bifurcacao') || selectedNode.type.includes('rota') ? 2 : 1,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setShowNodePicker(false);
    },
    [nodePickerPosition, setNodes]
  );

  const minimapNodeColor = useCallback((node: Node<ZeniteNodeData>) => {
    return getNodeColor(node.data.group);
  }, []);

  const flowContextValue = useMemo(() => ({
    onNodeDoubleClick: handleNodeDoubleClick,
  }), [handleNodeDoubleClick]);

  // Mostrar loading skeleton
  if (loading && flowId) {
    return <FlowLoadingSkeleton />;
  }

  // Mostrar erro se houver
  if (error && flowId) {
    toast.error('Erro ao carregar fluxo', {
      description: error,
    });
  }

  return (
    <FlowContext.Provider value={flowContextValue}>
      <div className="w-full h-full flex flex-col bg-[#F6F7F9]" style={{ width: '100%', height: '100%' }}>
        {/* Header */}
        <FlowBuilderHead
          flowName={flowName}
          onFlowNameChange={setFlowName}
          flowStatus={flowStatus}
          onSave={handleSave}
          onToggleActivate={handleToggleActivate}
        />

        {/* Canvas */}
        <div className="flex-1 relative w-full" style={{ minHeight: 0, width: '100%' }}>
          <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodesDelete={onNodesDelete}
              onEdgesDelete={onEdgesDelete}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              minZoom={0.25}
              maxZoom={2}
              defaultViewport={defaultViewport}
              snapToGrid
              snapGrid={snapGrid}
              onMove={(_, viewport) => setZoom(viewport.zoom)}
              proOptions={proOptions}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={24}
                size={1.5}
                color="#D8D8E8"
                style={backgroundStyle}
              />
              
              {showMinimap && (
                <MiniMap
                  nodeColor={minimapNodeColor}
                  style={minimapStyle}
                  maskColor="rgba(26, 26, 46, 0.3)"
                />
              )}
            </ReactFlow>
          </div>

          {/* Node Picker */}
          {showNodePicker && (
            <NodePicker
              onNodeSelect={handleNodeSelect}
              onClose={() => setShowNodePicker(false)}
              position={nodePickerPosition}
            />
          )}

          {/* Toolbar */}
          <FlowBuilderToolbar
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onZoomReset={handleZoomReset}
            onFitView={handleFitView}
            onAddNode={handleAddNode}
            onAutoLayout={handleAutoLayout}
            onToggleMinimap={handleToggleMinimap}
            onExecuteFlow={handleExecuteFlow}
            isExecuting={isExecuting}
            isNodePickerOpen={showNodePicker}
          />
        </div>

        {/* Node Config Dialog */}
        {editingNode && (
          <NodeConfigDialog
            nodeData={editingNode.data}
            onSave={handleNodeConfigSave}
            onClose={() => setEditingNodeId(null)}
          />
        )}
      </div>
    </FlowContext.Provider>
  );
}