Preciso conectar o botão "Executar Fluxo" ao backend real. Hoje o handleExecuteFlow no FlowBuilder.tsx só faz um setTimeout fake. Vou precisar alterar 3 arquivos.

ARQUIVO 1 — Adicionar rota no supabase/functions/server/index.tsx
Adicione a rota POST /flow-runner antes do Deno.serve(app.fetch):
typescriptapp.post("/make-server-e7f4e3cf/flow-runner", async (c) => {
  try {
    const { flow_id, trigger_type, trigger_data } = await c.req.json();

    if (!flow_id) {
      return c.json({ error: "flow_id é obrigatório" }, 400);
    }

    // Importa o cliente Supabase com service role para escrever no banco
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Cria o registro de execução
    const { data: run, error } = await supabase
      .from("flow_runs")
      .insert({
        flow_id,
        trigger_type: trigger_type ?? "manual",
        trigger_data: trigger_data ?? {},
        status: "running",
      })
      .select("id, flow_id, status, trigger_type, started_at")
      .single();

    if (error) throw error;

    // Responde imediatamente com o run_id
    // A execução real será feita pela Edge Function flow-runner (a ser deployada)
    // Por ora retorna o run criado para o front acompanhar via realtime
    return c.json({ run_id: run.id, status: "running", flow_id });

  } catch (err: any) {
    console.error("[flow-runner]", err);
    return c.json({ error: err.message || "Erro ao iniciar execução" }, 500);
  }
});

ARQUIVO 2 — Corrigir FlowBuilder.tsx
Localize a função handleExecuteFlow e substitua pelo código abaixo. O serverUrl já existe no projeto — use a mesma forma que outros hooks importam a URL do servidor Figma Make.
typescriptconst handleExecuteFlow = useCallback(async () => {
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
      ?? `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-e7f4e3cf`;

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
Adicione subscribeToFlowRun na desestruturação do useFlowData:
typescriptconst {
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
  subscribeToFlowRun,   // ← ADICIONAR
} = useFlowData(flowId || null);

ARQUIVO 3 — Corrigir FlowBuilderHead.tsx
O link de breadcrumb aponta para /flows mas a rota correta no projeto é /. Corrija:
typescript// Trocar:
to="/flows"

// Por:
to="/"

Não altere nenhum outro arquivo. Não mude nada visual.