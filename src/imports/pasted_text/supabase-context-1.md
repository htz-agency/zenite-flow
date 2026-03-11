# Zenite Flow — Contexto Supabase para Figma Make

## Projeto
- **Supabase URL:** `https://ratwnpugnptmfplezgve.supabase.co`
- **Auth:** via `auth.users`. Cada usuário tem `org_id` e `role` em `raw_user_meta_data`.
- **Isolamento:** todas as queries retornam apenas dados da org do usuário logado (RLS automático).

---

## Tabelas principais e o que a UI faz com cada uma

### `flows` — Lista e gerenciamento de fluxos
| Operação | Quando |
|----------|--------|
| `SELECT * from flow_dashboard` | Tela Home / lista de fluxos |
| `INSERT into flows` | Criar novo fluxo |
| `UPDATE flows SET name, description` | Renomear fluxo |
| `UPDATE flows SET is_active` | Ativar / desativar fluxo |
| `DELETE from flows` | Excluir fluxo |

**Colunas relevantes para UI:**
```
id, name, description, is_active,
total_runs, successful_runs, failed_runs,
last_run_at, last_run_status,
canvas_zoom, canvas_x, canvas_y,
created_at, updated_at
```

---

### `flow_steps` — Nós no canvas
| Operação | Quando |
|----------|--------|
| `SELECT * WHERE flow_id = ?` | Abrir fluxo no canvas |
| `INSERT` | Arrastar nó do painel para o canvas |
| `UPDATE position_x, position_y` | Mover nó no canvas |
| `UPDATE config` | Editar configuração no painel direito |
| `UPDATE is_disabled` | Desativar nó via mini toolbar |
| `DELETE` | Excluir nó |

**Colunas relevantes para UI:**
```
id, flow_id, type, subtype, name, notes,
position_x, position_y, config (jsonb),
is_disabled, color, credential_id
```

**Valores de `type`:**
`gatilho | passo | bifurcacao | rota | repeticao | pausa | juncao | filtro | conector | portal | script | aprovacao | turing | memoria | molde | alerta | subfluxo | registro | nota`

---

### `flow_connections` — Arestas entre nós
| Operação | Quando |
|----------|--------|
| `SELECT * WHERE flow_id = ?` | Abrir fluxo no canvas |
| `INSERT` | Conectar dois nós arrastando handle |
| `DELETE` | Remover conexão (clique na aresta + delete) |

**Colunas relevantes:**
```
id, flow_id, source_step_id, target_step_id,
source_output (0=principal, 1=falso, 2+=rota),
source_output_label
```

---

### `flow_runs` — Histórico de execuções
| Operação | Quando |
|----------|--------|
| `SELECT * from flow_run_history WHERE flow_id = ?` | Aba Execuções |
| `INSERT` (via Edge Function) | Executar fluxo — nunca direto da UI |
| `UPDATE status = 'cancelled'` | Cancelar execução em andamento |

**Colunas relevantes para UI:**
```
id, flow_id, status, trigger_type,
started_at, finished_at, duration_ms,
error_message, items_processed,
steps_executed, steps_failed (da view)
```

**Valores de `status`:** `running | success | error | waiting | cancelled`

---

### `flow_run_steps` — Log por nó em cada execução
| Operação | Quando |
|----------|--------|
| `SELECT * WHERE run_id = ?` | Expandir execução no histórico |

**Colunas relevantes para UI:**
```
id, run_id, step_id, status,
input_data (jsonb), output_data (jsonb),
duration_ms, error_message, attempt
```

---

### `flow_variables` — Variáveis globais do fluxo
| Operação | Quando |
|----------|--------|
| `SELECT * WHERE flow_id = ?` | Painel de variáveis |
| `INSERT / UPDATE / DELETE` | Gerenciar variáveis |

**Colunas:** `id, flow_id, key, value, type, is_secret`

---

### `flow_credentials` — Credenciais de integração
| Operação | Quando |
|----------|--------|
| `SELECT id, name, type, is_valid` | Dropdown de credenciais no painel do nó |
| `INSERT / UPDATE` | Tela de configurações → Credenciais |

> ⚠️ Nunca exibir `encrypted_data` na UI.

---

### `flow_webhooks` — Portais (endpoints externos)
| Operação | Quando |
|----------|--------|
| `SELECT token, http_method, is_active` | Painel do nó Portal |
| `UPDATE is_active` | Ativar/desativar portal |

**URL pública gerada:** `https://ratwnpugnptmfplezgve.supabase.co/functions/v1/flow-portal/{token}`

---

### `flow_schedules` — Agendamentos
| Operação | Quando |
|----------|--------|
| `SELECT cron_expression, timezone, next_run_at` | Painel do nó Gatilho Agendamento |
| `UPDATE cron_expression, timezone` | Editar horário |

---

### `flow_templates` — Biblioteca de modelos
| Operação | Quando |
|----------|--------|
| `SELECT * WHERE is_official OR org_id = minha_org` | Tela de Templates |
| `INSERT` | Salvar fluxo atual como template |

**Colunas:** `id, name, description, category, tags, is_official, uses_count, flow_snapshot`

---

## Views prontas para a UI

### `flow_dashboard` — Home / Lista de fluxos
Retorna tudo que a tela principal precisa já calculado:
```
id, name, description, is_active,
total_runs, successful_runs, failed_runs,
last_run_at, last_run_status,
success_rate_pct,        ← calculado automaticamente
active_steps_count,      ← qtd de nós ativos
primary_trigger,         ← tipo do gatilho principal
has_active_portal,       ← boolean
has_active_schedule,     ← boolean
runs_last_24h,           ← execuções nas últimas 24h
errors_last_24h          ← erros nas últimas 24h
```

### `flow_run_history` — Aba Execuções
```
id, flow_id, status, trigger_type,
started_at, finished_at, duration_ms,
error_message, flow_name,
steps_executed, steps_failed    ← calculados
```

### `flow_org_stats` — Cards do Dashboard geral
```
active_flows, inactive_flows,
total_runs_all, total_success, total_errors
```

---

## Edge Functions (chamadas da UI via fetch)

| Função | Endpoint | Quando chamar |
|--------|----------|---------------|
| `flow-runner` | `POST /functions/v1/flow-runner` | Botão "Executar Fluxo" |
| `flow-portal` | `POST /functions/v1/flow-portal/{token}` | Endpoint externo (não chamado pela UI) |

**Payload para executar fluxo:**
```json
{
  "flow_id": "uuid",
  "trigger_type": "manual",
  "trigger_data": {}
}
```

**Headers obrigatórios:**
```
Authorization: Bearer {supabase_anon_key}
Content-Type: application/json
```

---

## Realtime (execução ao vivo)

A UI deve subscrever atualizações em tempo real enquanto um fluxo está rodando:

```javascript
// Subscrever status do run
supabase
  .channel('flow-run-' + runId)
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'flow_runs',
    filter: `id=eq.${runId}`
  }, (payload) => updateRunStatus(payload.new))
  .subscribe()

// Subscrever steps em tempo real
supabase
  .channel('flow-run-steps-' + runId)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'flow_run_steps',
    filter: `run_id=eq.${runId}`
  }, (payload) => updateStepStatus(payload.new))
  .subscribe()
```

---

## Resumo para o prompt do Figma Make

```
Banco de dados: Supabase (PostgreSQL)
Autenticação: Supabase Auth (já configurada)
Isolamento: RLS por org_id (automático, não precisa filtrar na query)

TELAS e suas queries principais:

HOME (lista de fluxos)
  → SELECT * FROM flow_dashboard ORDER BY updated_at DESC

CANVAS (editor de fluxo)
  → SELECT * FROM flow_steps WHERE flow_id = $id
  → SELECT * FROM flow_connections WHERE flow_id = $id
  → Realtime em flow_runs e flow_run_steps durante execução

EXECUÇÕES (histórico)
  → SELECT * FROM flow_run_history WHERE flow_id = $id ORDER BY started_at DESC
  → SELECT * FROM flow_run_steps WHERE run_id = $run_id

TEMPLATES (biblioteca)
  → SELECT * FROM flow_templates WHERE is_official OR org_id = auth_org_id

EXECUTAR FLUXO
  → POST https://ratwnpugnptmfplezgve.supabase.co/functions/v1/flow-runner
  → Body: { flow_id, trigger_type: "manual" }
```