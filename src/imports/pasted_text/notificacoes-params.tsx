Preciso que você crie 3 novos arquivos de config forms e corrija 2 arquivos existentes.
Contexto: O projeto já tem GatilhoParams, TuringParams, RotaParams e PassoParams em src/app/components/flow-canvas/config-forms/. Os 3 novos devem seguir exatamente o mesmo padrão: recebem { params, onChange }, usam updateField, importam de ../config-fields/.

ARQUIVO 1 — Criar NotificacoesParams.tsx
src/app/components/flow-canvas/config-forms/NotificacoesParams.tsx
Campos dinâmicos baseados no valor de params.canal:
Canal (Dropdown, obrigatório):

email → Email
push → Push (Navegador)
sms → SMS
slack → Slack
teams → Microsoft Teams
telegram → Telegram
whatsapp → WhatsApp Business
webhook → Webhook

Se canal = email:

Para (TextInput, obrigatório) — placeholder: destinatario@email.com — description: Use {{ expressão }} para dados dinâmicos
CC (TextInput, opcional)
Assunto (TextInput, obrigatório) — placeholder: 🔔 Novo lead: {{ $trigger.nome }}
Corpo (TextArea, obrigatório, rows=6) — description: Suporta HTML. Use {{ expressão }} para dados dinâmicos
Credencial Google (Dropdown, obrigatório) — placeholder: Selecione a conta Gmail — options: [{ value: 'google_workspace', label: 'Google Workspace' }]

Se canal = slack:

Credencial (Dropdown, obrigatório) — placeholder: Selecione a credencial Slack
Canal/Usuário (TextInput, obrigatório) — placeholder: #geral ou @usuario
Mensagem (TextArea, obrigatório, rows=4)

Se canal = telegram:

Credencial (Dropdown, obrigatório)
Chat ID (TextInput, obrigatório) — placeholder: {{ $trigger.telegram_id }}
Mensagem (TextArea, obrigatório, rows=4)

Se canal = webhook:

URL (TextInput, obrigatório) — placeholder: https://
Método (Dropdown) — opções: POST, PUT, PATCH
Corpo (TextArea, rows=4) — description: JSON. Use {{ expressão }} para dados dinâmicos

Se canal = push, sms, whatsapp ou teams:

Mostrar um bloco informativo (mesmo estilo do tipo === 'manual' no GatilhoParams, fundo #EBF1FA) com texto: "Integração com [canal] em breve disponível."


ARQUIVO 2 — Criar TempoParams.tsx
src/app/components/flow-canvas/config-forms/TempoParams.tsx
Tipo (Dropdown, obrigatório):

duracao_fixa → Duração fixa
ate_data_hora → Até data/hora
ate_webhook → Aguardar webhook

Se tipo = duracao_fixa:

Grid 2 colunas: Duração (NumberInput, min=1) + Unidade (Dropdown: segundos, minutos, horas, dias)

Se tipo = ate_data_hora:

Data e hora (TextInput) — placeholder: {{ $trigger.data_agendada }} — description: Formato ISO 8601 ou expressão dinâmica

Se tipo = ate_webhook:

Caminho do webhook (TextInput, obrigatório) — placeholder: /aguardar-aprovacao
Timeout máximo (grid 2 col): Valor (NumberInput) + Unidade (Dropdown: minutos, horas, dias)
Ação ao timeout (Dropdown): continuar → Continuar fluxo, erro → Retornar erro, saida_alternativa → Saída alternativa


ARQUIVO 3 — Criar VariavelParams.tsx
src/app/components/flow-canvas/config-forms/VariavelParams.tsx
Operação (Dropdown, obrigatório):

definir → Definir variável
ler → Ler variável
incrementar → Incrementar
decrementar → Decrementar
apagar → Apagar variável

Escopo (Dropdown, obrigatório):

execucao → Execução atual
fluxo → Fluxo (persiste entre execuções)
global → Global (todos os fluxos)

Se operação = definir:

Lista de variáveis — botão + Adicionar variável que adiciona uma linha com:

Nome (TextInput, placeholder: minhaVariavel)
Valor (TextInput, placeholder: {{ $trigger.campo }})
Tipo (Dropdown): string, numero, booleano, json
Botão de remover (X)



Se operação = ler:

Nome da variável (TextInput, obrigatório) — placeholder: minhaVariavel
Valor padrão se não existir (TextInput) — placeholder: valor_padrao

Se operação = incrementar ou decrementar:

Nome da variável (TextInput, obrigatório)
Valor (NumberInput, min=1, default=1)

Se operação = apagar:

Nome da variável (TextInput, obrigatório)


ARQUIVO 4 — Corrigir NodeConfigDialog.tsx
No categoryMap dentro da função getCategoryColor(), corrija os nomes antigos:
typescript// REMOVER estas entradas antigas:
'pausa': { bg: '#f0f2f5', icon: '#9B9BAD' },
'memoria': { bg: '#f0f2f5', icon: '#9B9BAD' },
'alerta': { bg: '#ffe5e5', icon: '#FF6B6B' },

// ADICIONAR no lugar:
'tempo': { bg: '#f0f2f5', icon: '#9B9BAD' },
'variavel': { bg: '#fff4e6', icon: '#F5A623' },
'notificacoes': { bg: '#ffe5e5', icon: '#FF6B6B' },
'webhook': { bg: '#f0f2f5', icon: '#9B9BAD' },
E na função getParamsComponent(), adicione os 3 novos cases no switch:
typescriptimport NotificacoesParams from './config-forms/NotificacoesParams';
import TempoParams from './config-forms/TempoParams';
import VariavelParams from './config-forms/VariavelParams';

// No switch:
case 'notificacoes':
  return <NotificacoesParams params={params} onChange={setParams} />;
case 'tempo':
  return <TempoParams params={params} onChange={setParams} />;
case 'variavel':
  return <VariavelParams params={params} onChange={setParams} />;

ARQUIVO 5 — Corrigir GenericParams.tsx
Traduza o texto para português:
tsx// Trocar:
"Parâmetros em desenvolvimento"
"Os parâmetros específicos para este tipo de nó ainda estão sendo implementados."

// Manter igual — já está em português ✓
Na verdade está correto, não altere GenericParams.tsx.

Não altere nenhum outro arquivo. Não mude nada visual nos forms existentes.