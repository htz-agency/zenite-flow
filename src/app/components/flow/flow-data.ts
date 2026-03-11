// Mock data para o Zenite Flow

export interface FlowNode {
  id: string;
  type: "trigger" | "action" | "condition" | "wait" | "turing";
  name: string;
  icon: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[]; // IDs dos nós conectados
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  lastRun?: string;
  executions: number;
  nodes: FlowNode[];
  createdAt: string;
  updatedAt: string;
}

export interface FlowExecution {
  id: string;
  flowId: string;
  flowName: string;
  status: "success" | "error" | "running";
  trigger: string;
  startedAt: string;
  duration: string;
  error?: string;
}

export interface TriggerOption {
  id: string;
  name: string;
  icon: string;
  category: "object" | "communication" | "agenda" | "time";
  description: string;
}

export interface ActionOption {
  id: string;
  name: string;
  icon: string;
  app: string;
  appColor: string;
  description: string;
}

export const mockFlows: Flow[] = [
  {
    id: "1",
    name: "Deal Ganho → Projeto",
    description: "Quando um Deal for marcado como Ganho, criar automaticamente um Projeto no Zenite Projects",
    status: "active",
    lastRun: "há 2h",
    executions: 47,
    createdAt: "2026-02-15",
    updatedAt: "2026-03-11",
    nodes: [
      {
        id: "trigger-1",
        type: "trigger",
        name: "Objeto andou de fase",
        icon: "ArrowDown",
        config: {
          object: "deal",
          stage: "Ganho"
        },
        position: { x: 100, y: 200 },
        connections: ["action-1"]
      },
      {
        id: "action-1",
        type: "action",
        name: "Criar Projeto",
        icon: "FolderOpen",
        config: {
          app: "Projects",
          projectName: "{{deal.name}}",
          clientName: "{{deal.client}}"
        },
        position: { x: 400, y: 200 },
        connections: []
      }
    ]
  },
  {
    id: "2",
    name: "Lead Frio → Notify",
    description: "Notificar vendedor via WhatsApp sobre leads sem atividade há 7 dias",
    status: "active",
    lastRun: "há 14h",
    executions: 12,
    createdAt: "2026-02-20",
    updatedAt: "2026-03-10",
    nodes: [
      {
        id: "trigger-2",
        type: "trigger",
        name: "Agendado diariamente",
        icon: "Clock",
        config: {
          time: "08:00"
        },
        position: { x: 100, y: 200 },
        connections: ["condition-1"]
      },
      {
        id: "condition-1",
        type: "condition",
        name: "Sem atividade há 7 dias",
        icon: "Question",
        config: {
          field: "last_activity",
          operator: "older_than",
          value: "7 days"
        },
        position: { x: 400, y: 200 },
        connections: ["action-2"]
      },
      {
        id: "action-2",
        type: "action",
        name: "Enviar WhatsApp",
        icon: "WhatsappLogo",
        config: {
          app: "WhatsApp",
          message: "Lead {{lead.name}} está frio há 7 dias"
        },
        position: { x: 700, y: 200 },
        connections: []
      }
    ]
  },
  {
    id: "3",
    name: "Form Externo → Lead",
    description: "Criar Lead no CRM quando receber webhook de formulário externo",
    status: "active",
    lastRun: "há 5min",
    executions: 203,
    createdAt: "2026-01-10",
    updatedAt: "2026-03-11",
    nodes: [
      {
        id: "trigger-3",
        type: "trigger",
        name: "Webhook POST",
        icon: "Webhook",
        config: {
          url: "https://api.zenite.cloud/webhook/form"
        },
        position: { x: 100, y: 200 },
        connections: ["action-3"]
      },
      {
        id: "action-3",
        type: "action",
        name: "Criar Lead",
        icon: "AddressBook",
        config: {
          app: "CRM",
          name: "{{form.name}}",
          email: "{{form.email}}",
          phone: "{{form.phone}}"
        },
        position: { x: 400, y: 200 },
        connections: []
      }
    ]
  },
  {
    id: "4",
    name: "Onboarding Cliente",
    description: "Fluxo de boas-vindas para novos clientes",
    status: "inactive",
    executions: 0,
    createdAt: "2026-03-05",
    updatedAt: "2026-03-05",
    nodes: [
      {
        id: "trigger-4",
        type: "trigger",
        name: "Novo cliente criado",
        icon: "UserPlus",
        config: {
          object: "client"
        },
        position: { x: 100, y: 200 },
        connections: ["action-4"]
      },
      {
        id: "action-4",
        type: "action",
        name: "Email boas-vindas",
        icon: "EnvelopeSimple",
        config: {
          app: "Email",
          template: "welcome"
        },
        position: { x: 400, y: 200 },
        connections: ["condition-2"]
      },
      {
        id: "condition-2",
        type: "condition",
        name: "Abriu o email",
        icon: "EnvelopeOpen",
        config: {
          event: "email_opened"
        },
        position: { x: 700, y: 200 },
        connections: ["action-5"]
      },
      {
        id: "action-5",
        type: "action",
        name: "WhatsApp follow-up",
        icon: "WhatsappLogo",
        config: {
          app: "WhatsApp",
          message: "Olá! Vi que abriu nosso email..."
        },
        position: { x: 1000, y: 200 },
        connections: []
      }
    ]
  }
];

export const mockExecutions: FlowExecution[] = [
  {
    id: "exec-1",
    flowId: "3",
    flowName: "Form Externo → Lead",
    status: "success",
    trigger: "Webhook POST recebido",
    startedAt: "2026-03-11 14:23:15",
    duration: "0.8s"
  },
  {
    id: "exec-2",
    flowId: "1",
    flowName: "Deal Ganho → Projeto",
    status: "success",
    trigger: "Deal 'Website HTZ' → Ganho",
    startedAt: "2026-03-11 12:15:42",
    duration: "1.2s"
  },
  {
    id: "exec-3",
    flowId: "3",
    flowName: "Form Externo → Lead",
    status: "error",
    trigger: "Webhook POST recebido",
    startedAt: "2026-03-11 11:05:23",
    duration: "2.1s",
    error: "Email inválido no formulário"
  },
  {
    id: "exec-4",
    flowId: "2",
    flowName: "Lead Frio → Notify",
    status: "success",
    trigger: "Agendamento diário 08:00",
    startedAt: "2026-03-11 08:00:12",
    duration: "3.5s"
  },
  {
    id: "exec-5",
    flowId: "1",
    flowName: "Deal Ganho → Projeto",
    status: "running",
    trigger: "Deal 'App Mobile' → Ganho",
    startedAt: "2026-03-11 14:30:01",
    duration: "..."
  }
];

export const triggerOptions: TriggerOption[] = [
  // Eventos de Objeto
  { id: "obj-created", name: "Um novo Objeto foi criado", icon: "Square", category: "object", description: "Quando criar qualquer objeto no CRM" },
  { id: "obj-updated", name: "Um Objeto foi atualizado", icon: "ArrowsClockwise", category: "object", description: "Quando atualizar campos de um objeto" },
  { id: "obj-pipe-change", name: "Um Objeto trocou de Pipe", icon: "ArrowsLeftRight", category: "object", description: "Quando mover para outro pipeline" },
  { id: "obj-stage-move", name: "Um Objeto andou de fase no Pipe", icon: "ArrowDown", category: "object", description: "Quando avançar de estágio" },
  { id: "obj-pipe-enter", name: "Um Objeto entrou no Pipe", icon: "ArrowUp", category: "object", description: "Quando entrar em um pipeline" },
  
  // Eventos de Comunicação
  { id: "email-sent", name: "Um Email foi enviado", icon: "EnvelopeSimple", category: "communication", description: "Quando enviar email do CRM" },
  { id: "email-opened", name: "Um Email foi aberto", icon: "EnvelopeOpen", category: "communication", description: "Quando destinatário abrir" },
  { id: "message-sent", name: "Uma Mensagem foi enviada", icon: "ChatCircle", category: "communication", description: "WhatsApp ou SMS enviado" },
  { id: "call-made", name: "Uma Ligação foi realizada", icon: "Phone", category: "communication", description: "Quando fazer ligação" },
  { id: "link-clicked", name: "Um Link foi clicado", icon: "Link", category: "communication", description: "Quando clicar em link de email" },
  
  // Eventos de Agenda
  { id: "event-scheduled", name: "Um Evento foi agendado", icon: "CalendarCheck", category: "agenda", description: "Quando agendar reunião" },
  { id: "event-cancelled", name: "Um Evento foi cancelado", icon: "CalendarX", category: "agenda", description: "Quando cancelar evento" },
  { id: "task-created", name: "Uma Tarefa foi criada", icon: "CheckSquare", category: "agenda", description: "Quando criar tarefa" },
  
  // Eventos de Tempo
  { id: "time-scheduled", name: "Agendado (horário específico)", icon: "Clock", category: "time", description: "Executar em horário definido" },
  { id: "time-webhook", name: "Webhook externo", icon: "Webhook", category: "time", description: "Receber POST de API externa" }
];

export const actionOptions: ActionOption[] = [
  // Zenite CRM
  { id: "crm-create-lead", name: "Criar Lead", icon: "AddressBook", app: "Zenite CRM", appColor: "#6868B1", description: "Criar novo lead no CRM" },
  { id: "crm-update-deal", name: "Atualizar Deal", icon: "Handshake", app: "Zenite CRM", appColor: "#6868B1", description: "Modificar dados de deal" },
  { id: "crm-create-task", name: "Criar Tarefa", icon: "CheckSquare", app: "Zenite CRM", appColor: "#6868B1", description: "Adicionar tarefa à agenda" },
  
  // Zenite Projects
  { id: "proj-create", name: "Criar Projeto", icon: "FolderOpen", app: "Zenite Projects", appColor: "#6868B1", description: "Novo projeto no Projects" },
  { id: "proj-add-task", name: "Adicionar Tarefa ao Projeto", icon: "ListChecks", app: "Zenite Projects", appColor: "#6868B1", description: "Criar task em projeto" },
  
  // Zenite Dash
  { id: "dash-notify", name: "Enviar para Dashboard", icon: "ChartBar", app: "Zenite Dash", appColor: "#6868B1", description: "Adicionar métrica ao Dash" },
  
  // Zenite Sync
  { id: "sync-trigger", name: "Sincronizar Dados", icon: "ArrowsClockwise", app: "Zenite Sync", appColor: "#3CCEA7", description: "Forçar sync com integração" },
  
  // Comunicação
  { id: "email-send", name: "Enviar Email", icon: "EnvelopeSimple", app: "Email", appColor: "#F5A623", description: "Disparar email automático" },
  { id: "whatsapp-send", name: "Enviar WhatsApp", icon: "WhatsappLogo", app: "WhatsApp", appColor: "#25D366", description: "Mensagem via WhatsApp" },
  
  // Webhook
  { id: "webhook-post", name: "Chamar Webhook", icon: "Webhook", app: "Webhook", appColor: "#98989d", description: "POST para URL externa" },
  
  // Turing IA
  { id: "turing-score", name: "Analisar Score do Lead", icon: "Atom", app: "Turing IA", appColor: "gradient", description: "IA analisa qualificação" },
  { id: "turing-summary", name: "Gerar Resumo do Deal", icon: "Atom", app: "Turing IA", appColor: "gradient", description: "IA resume informações" },
  { id: "turing-decide", name: "Decidir Próximo Passo", icon: "Atom", app: "Turing IA", appColor: "gradient", description: "IA sugere ação" }
];

export const flowTemplates = [
  {
    id: "template-1",
    name: "Deal Ganho → Cria Projeto",
    category: "Vendas",
    description: "Automaticamente cria projeto quando fechar negócio",
    preview: ["Deal Ganho", "Criar Projeto", "Notificar Time"]
  },
  {
    id: "template-2",
    name: "Lead Frio → Notifica Vendedor",
    category: "CRM",
    description: "Alerta vendedor sobre leads inativos há 7 dias",
    preview: ["Agendado", "Verificar Atividade", "WhatsApp"]
  },
  {
    id: "template-3",
    name: "Novo Lead → Email Boas-vindas",
    category: "Marketing",
    description: "Envio automático de email de boas-vindas",
    preview: ["Novo Lead", "Email Welcome", "Aguardar", "Follow-up"]
  },
  {
    id: "template-4",
    name: "Meta Batida → Notifica Time",
    category: "Performance",
    description: "Comemoração automática de metas atingidas",
    preview: ["Meta Alcançada", "Slack Team", "Dashboard"]
  },
  {
    id: "template-5",
    name: "Form Externo → Cria Lead no CRM",
    category: "Integrações",
    description: "Webhook recebe formulário e cria lead",
    preview: ["Webhook", "Criar Lead", "Email Notify"]
  },
  {
    id: "template-6",
    name: "Turing Análise Semanal Automática",
    category: "IA",
    description: "IA analisa pipeline toda segunda 9h",
    preview: ["Segunda 9h", "Turing Análise", "Email Report"]
  }
];
