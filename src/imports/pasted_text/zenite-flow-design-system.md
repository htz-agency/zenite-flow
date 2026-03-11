Crie o Zenite Flow, app de automação de fluxos da Zenite Cloud Suite da HTZ Agency.

## DESIGN SYSTEM ZENITE

Fonte: DM Sans (todos os pesos)
Ícones: Phosphor Icons (phosphor-react)
Border radius padrão: 12px cards, 8px botões, 6px inputs
Sombra padrão: 0 2px 8px rgba(0,0,0,0.06)

Cores:
  --blue-berry-base: #6868B1
  --blue-berry-light: #E8E8FD
  --green-mint-base: #3CCEA7
  --green-mint-light: #E0FBF4
  --red-cherry-base: #FF6B6B
  --red-cherry-light: #FFE8E8
  --yellow-mustard-base: #F5A623
  --yellow-mustard-light: #FEF4E3
  --neutral-900: #1A1A2E
  --neutral-600: #4A4A6A
  --neutral-400: #9B9BAD
  --neutral-100: #F6F7F9
  --neutral-border: #EBEBF5
  --white: #FFFFFF

Gradiente Turing: linear-gradient(135deg, #8C8CD4, #07ABDE, #3CCEA7)

## IDENTIDADE DO APP

Nome: Zenite Flow
Ícone: GitBranch (Phosphor) — cor #6868B1 fundo #E8E8FD
Tagline: "Automatize a Zenite Suite"
Posição no App Drawer: entre Projects e Sync

## SIDEBAR (Rail 72px + Panel 224px)

Rail — ícones 24px, tooltip ao hover:
- Logo Zenite topo
- GitBranch ativo (Flow)
- Separator
- House (Início)
- FolderOpen (Projects)
- GitBranch ativo (Flow) highlight #6868B1
- ChartBar (Dash)
- ArrowsClockwise (Sync)
- AddressBook (CRM)
- Separator bottom
- Bell (notificações)
- GearSix (configurações)
- Avatar usuário

Panel expandido quando GitBranch ativo:
- Header "Zenite Flow" + botão "+ Novo Fluxo" (verde mint)
- Busca "Pesquisar fluxos..."
- Seções colapsáveis:
  ATIVOS (badge count verde)
    → Deal Ganho → Projeto
    → Lead Frio → Notify
    → Form Externo → Lead
  INATIVOS (badge count cinza)
    → Onboarding Cliente
  MODELOS
    → Ver biblioteca →

## TELAS PRINCIPAIS

### 1. HOME — Lista de Fluxos
Layout: header + grid de cards

Header:
- Título "Fluxos" (24px semibold)
- Subtítulo "3 ativos · 1 inativo"
- Botão "+ Criar Fluxo" (Green Mint, ícone Plus)
- Filtros pill: Todos | Ativos | Inativos | Modelos

Grid 3 colunas, card por fluxo:
- Nome do fluxo (16px semibold)
- Descrição curta (13px neutral-400)
- Badge status: "Ativo" (verde) ou "Inativo" (cinza)
- Linha de preview: [ícone gatilho] → [ícone ação] → [ícone condição]
- Rodapé: "Última execução: há 2h" + "47 execuções"
- Toggle ativo/inativo no canto
- Hover: shadow elevada + botão "Editar"

Cards de métricas no topo (3 cards):
- "Fluxos Ativos" — número grande + ícone GitBranch azul
- "Execuções Hoje" — número + ícone Lightning verde
- "Erros Hoje" — número + ícone Warning vermelho (se 0: verde)

### 2. EDITOR DE FLUXO (tela principal)
Canvas infinito com zoom/pan. Fundo: #F6F7F9 com grid de pontos sutil.

Topbar:
- Ícone GitBranch + "Nome do Fluxo" (editável inline, clique para editar)
- Ícone estrela (favoritar)
- Separador
- Ícones: zoom-, fit, zoom+
- Botão "Salvar Alterações" (outline blue-berry)
- Toggle "Fluxo ativado" (verde quando ativo)
- Ícones: fullscreen, export, link, histórico, fechar X

Canvas — Nós do fluxo:

GATILHO INICIAL (nó de entrada):
- Card branco, borda 2px #6868B1, sombra suave
- Header roxo claro #E8E8FD: label "Gatilho Inicial" pequeno
- Corpo: chip arredondado com ícone + texto do gatilho selecionado
- Exemplo: coração ♡ "Um novo Lead foi criado"
- Botão "+" abaixo para adicionar mais gatilhos (OR)
- Porta de saída → direita

NÓ DE AÇÃO:
- Card branco, borda 1px #EBEBF5
- Header cinza claro: label "Ação" pequeno
- Ícone da ação + nome em chip arredondado
- Metadados abaixo: label secundário + valor
- Exemplo: ✉ "Envio de email de Fluxo" / "EMAIL SELECIONADO: Email de resposta automática pós-cadastro v1.3"
- Portas: entrada esquerda, saídas direita (múltiplas para condições)

NÓ DE CONDIÇÃO:
- Card branco menor, borda 1px #EBEBF5
- Label "Condição" topo
- Chip com ícone + texto da condição
- Exemplo: "Abriu o email" / "Não abriu o email" / "Clicou no botão"
- Metadado: "BOTÃO SELECIONADO: Saiba mais no WhatsApp"

CONEXÕES:
- Linhas curvas suaves (bezier), cor #C8C8E8
- Seta na ponta
- Hover: linha fica azul #6868B1

Painel lateral direito (quando nó selecionado):
- Header: tipo do nó + ícone
- Configurações do nó (formulário)
- Para Gatilho: dropdown "Selecionar evento"
- Para Ação: dropdown tipo + configurações específicas
- Para Condição: campo condição + valor
- Botão "Remover nó" (vermelho, outline)

Toolbar flutuante no canvas (centro-baixo):
- Botões: Gatilho | Ação | Condição | Aguardar | Turing IA
- Cada um com ícone Phosphor correspondente
- Turing IA tem gradiente especial (rainbow)

### 3. PAINEL DE GATILHOS (bottom sheet ao clicar "+ Selecionar")
Aparece como drawer bottom ou painel lateral

Título "Gatilhos Iniciais"
Descrição "Gatilhos Iniciais são ações que devem ocorrer para que o fluxo seja ativado."

Grid de chips clicáveis (2-3 por linha):
Eventos de Objeto:
- [Square] Um novo Objeto foi criado
- [ArrowsClockwise] Um Objeto foi atualizado
- [ArrowsLeftRight] Um Objeto trocou de Pipe
- [ArrowDown] Um Objeto andou de fase no Pipe
- [ArrowUp] Um Objeto entrou no Pipe

Eventos de Comunicação:
- [EnvelopeSimple] Um Email foi enviado
- [EnvelopeOpen] Um Email foi aberto
- [ChatCircle] Uma Mensagem foi enviada
- [Phone] Uma Ligação foi realizada
- [Link] Um Link foi clicado

Eventos de Agenda:
- [CalendarCheck] Um Evento foi agendado
- [CalendarX] Um Evento foi cancelado
- [CheckSquare] Uma Tarefa foi criada

Chips: fundo #F6F7F9, hover fundo #E8E8FD borda #6868B1, selecionado fundo #6868B1 texto branco

### 4. HISTÓRICO DE EXECUÇÕES
Tabela com colunas:
- Status (badge: Sucesso verde / Erro vermelho / Executando azul animado)
- Fluxo
- Gatilho
- Início
- Duração
- Detalhes (botão "Ver →")

Filtros: Período | Status | Fluxo

### 5. BIBLIOTECA DE MODELOS
Grid de cards de templates:
- Preview visual do fluxo (miniatura)
- Nome do template
- Categoria (badge)
- Descrição
- "Usar modelo →" button

Templates incluídos:
- Deal Ganho → Cria Projeto
- Lead Frio → Notifica Vendedor
- Novo Lead → Email Boas-vindas
- Meta Batida → Notifica Time
- Form Externo → Cria Lead no CRM
- Turing Análise Semanal Automática

## INTEGRAÇÕES VISÍVEIS NA UI

No painel de Ações, mostrar integrações disponíveis:
- Zenite CRM (ícone AddressBook #6868B1)
- Zenite Projects (ícone FolderOpen #6868B1)
- Zenite Dash (ícone ChartBar #6868B1)
- Zenite Sync (ícone ArrowsClockwise #3CCEA7)
- Turing IA (ícone Atom — gradiente rainbow)
- Email (ícone EnvelopeSimple #F5A623)
- WhatsApp (ícone WhatsappLogo #25D366)
- Webhook (ícone Webhook #9B9BAD)

## NÓ ESPECIAL: TURING IA

Nó diferenciado no canvas:
- Borda com gradiente animado (rainbow: #8C8CD4 → #07ABDE → #3CCEA7)
- Ícone Atom com brilho sutil
- Label "Turing IA"
- Ações disponíveis:
  - Analisar score do lead
  - Gerar resumo do deal
  - Decidir próximo passo
  - Enviar análise por email

## ESTADOS ESPECIAIS

Empty state (sem fluxos):
- Ícone GitBranch grande, cor #C8C8E8
- "Nenhum fluxo criado ainda"
- "Automatize tarefas repetitivas da sua suite"
- Botão "+ Criar primeiro fluxo"

Loading state dos nós:
- Skeleton shimmer nos cards

Execução em tempo real:
- Nó pulsando suavemente quando executando
- Linha de conexão animada (trace percorrendo o caminho)
- Badge "Executando..." azul no topbar

## RESPONSIVIDADE

Desktop (>1280px): sidebar rail + panel + canvas completo
Tablet (768-1280px): sidebar colapsada + canvas
Mobile: lista de fluxos apenas, editor não disponível (mensagem "Use o desktop para editar fluxos")

## DADOS MOCK

Fluxo 1 — "Deal Ganho → Projeto":
  Gatilho: Objeto andou de fase (estagio = 'Ganho')
  Ação: Criar Projeto no Zenite Projects
  Status: Ativo | 47 execuções | última há 2h

Fluxo 2 — "Lead Frio → Notify":
  Gatilho: Agendado (diário 8h)
  Ação: Enviar notificação WhatsApp
  Condição: sem atividade há 7 dias
  Status: Ativo | 12 execuções | última há 14h

Fluxo 3 — "Form Externo → Lead":
  Gatilho: Webhook POST externo
  Ação: Criar Lead no CRM
  Status: Ativo | 203 execuções | última há 5min

Fluxo 4 — "Onboarding Cliente":
  Gatilho: Novo objeto criado (tipo: cliente)
  Ação: Email boas-vindas → Condição abriu → WhatsApp
  Status: Inativo

## NOTAS TÉCNICAS

- Supabase como backend (tabelas: flows, flow_steps, flow_runs)
- Edge Function: /flow-runner (já deployada)
- Triggers PostgreSQL já instalados nas tabelas
- Novos fluxos: apenas INSERT na tabela flows — sem criar triggers novos
- Auth via Supabase com isolamento por org_id
- Canvas: usar React Flow ou implementação própria com SVG

Crie todas as telas com dados mock realistas. O app deve parecer production-ready.