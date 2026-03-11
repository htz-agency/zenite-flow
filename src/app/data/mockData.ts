export interface Flow {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  trigger: {
    type: string;
    icon: string;
    label: string;
  };
  actions: Array<{
    type: string;
    icon: string;
    label: string;
  }>;
  lastExecution: string;
  executionCount: number;
  createdAt: string;
}

export interface FlowNode {
  id: string;
  type: "trigger" | "action" | "condition" | "wait" | "turing";
  position: { x: number; y: number };
  data: {
    label: string;
    icon?: string;
    config?: Record<string, any>;
  };
}

export interface FlowConnection {
  id: string;
  source: string;
  target: string;
}

export const mockFlows: Flow[] = [
  {
    id: "1",
    name: "Deal Ganho → Projeto",
    description: "Cria automaticamente um projeto quando um deal é ganho",
    status: "active",
    trigger: {
      type: "stage_change",
      icon: "ArrowDown",
      label: "Um Objeto andou de fase no Pipe",
    },
    actions: [
      {
        type: "create_project",
        icon: "FolderOpen",
        label: "Criar Projeto no Zenite Projects",
      },
    ],
    lastExecution: "há 2h",
    executionCount: 47,
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    name: "Lead Frio → Notify",
    description: "Notifica vendedor sobre leads sem atividade há 7 dias",
    status: "active",
    trigger: {
      type: "scheduled",
      icon: "Clock",
      label: "Agendado (diário 8h)",
    },
    actions: [
      {
        type: "check_condition",
        icon: "ArrowsLeftRight",
        label: "Verificar inatividade",
      },
      {
        type: "send_whatsapp",
        icon: "ChatCircle",
        label: "Enviar notificação WhatsApp",
      },
    ],
    lastExecution: "há 14h",
    executionCount: 12,
    createdAt: "2026-02-01",
  },
  {
    id: "3",
    name: "Form Externo → Lead",
    description: "Cria lead no CRM a partir de formulário externo",
    status: "active",
    trigger: {
      type: "webhook",
      icon: "Link",
      label: "Webhook POST externo",
    },
    actions: [
      {
        type: "create_lead",
        icon: "Heart",
        label: "Criar Lead no CRM",
      },
      {
        type: "send_email",
        icon: "EnvelopeSimple",
        label: "Enviar email de boas-vindas",
      },
    ],
    lastExecution: "há 5min",
    executionCount: 203,
    createdAt: "2026-01-10",
  },
  {
    id: "4",
    name: "Onboarding Cliente",
    description: "Sequência de emails e tarefas para novos clientes",
    status: "inactive",
    trigger: {
      type: "object_created",
      icon: "Square",
      label: "Um novo Objeto foi criado (tipo: cliente)",
    },
    actions: [
      {
        type: "send_email",
        icon: "EnvelopeSimple",
        label: "Email boas-vindas",
      },
      {
        type: "check_condition",
        icon: "EnvelopeOpen",
        label: "Verificar abertura",
      },
      {
        type: "send_whatsapp",
        icon: "ChatCircle",
        label: "WhatsApp follow-up",
      },
    ],
    lastExecution: "há 3 dias",
    executionCount: 8,
    createdAt: "2025-12-20",
  },
];

export const mockTemplates = [
  {
    id: "t1",
    name: "Deal Ganho → Cria Projeto",
    category: "CRM + Projects",
    description: "Cria automaticamente um projeto quando um deal é marcado como ganho",
    preview: "trigger-action",
  },
  {
    id: "t2",
    name: "Lead Frio → Notifica Vendedor",
    category: "CRM",
    description: "Envia notificação ao vendedor quando lead fica sem atividade por 7 dias",
    preview: "trigger-condition-action",
  },
  {
    id: "t3",
    name: "Novo Lead → Email Boas-vindas",
    category: "CRM + Email",
    description: "Envia email automático de boas-vindas para novos leads",
    preview: "trigger-action",
  },
  {
    id: "t4",
    name: "Meta Batida → Notifica Time",
    category: "Dash",
    description: "Notifica o time quando uma meta é atingida",
    preview: "trigger-action",
  },
  {
    id: "t5",
    name: "Form Externo → Cria Lead no CRM",
    category: "Integração",
    description: "Cria lead automaticamente a partir de webhook de formulário externo",
    preview: "trigger-action",
  },
  {
    id: "t6",
    name: "Turing Análise Semanal Automática",
    category: "IA",
    description: "Turing analisa deals e envia resumo semanal por email",
    preview: "trigger-turing-action",
  },
];

export const mockHistory = [
  {
    id: "h1",
    flowName: "Deal Ganho → Projeto",
    trigger: "Deal #342 ganho",
    status: "success" as const,
    startTime: "11/03/2026 14:23",
    duration: "1.2s",
    details: "Projeto #789 criado com sucesso",
  },
  {
    id: "h2",
    flowName: "Form Externo → Lead",
    trigger: "Webhook POST recebido",
    status: "success" as const,
    startTime: "11/03/2026 14:18",
    duration: "0.8s",
    details: "Lead #1523 criado, email enviado",
  },
  {
    id: "h3",
    flowName: "Form Externo → Lead",
    trigger: "Webhook POST recebido",
    status: "running" as const,
    startTime: "11/03/2026 14:17",
    duration: "2.1s",
    details: "Processando...",
  },
  {
    id: "h4",
    flowName: "Lead Frio → Notify",
    trigger: "Agendamento diário 8h",
    status: "success" as const,
    startTime: "11/03/2026 08:00",
    duration: "4.5s",
    details: "3 leads identificados, 3 notificações enviadas",
  },
  {
    id: "h5",
    flowName: "Onboarding Cliente",
    trigger: "Cliente #89 criado",
    status: "error" as const,
    startTime: "10/03/2026 16:45",
    duration: "0.3s",
    details: "Erro: Template de email não encontrado",
  },
  {
    id: "h6",
    flowName: "Deal Ganho → Projeto",
    trigger: "Deal #341 ganho",
    status: "success" as const,
    startTime: "10/03/2026 11:30",
    duration: "1.1s",
    details: "Projeto #788 criado com sucesso",
  },
];
