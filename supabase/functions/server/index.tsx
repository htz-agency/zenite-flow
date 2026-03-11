import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e7f4e3cf/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/make-server-e7f4e3cf/flow-runner", async (c) => {
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

Deno.serve(app.fetch);