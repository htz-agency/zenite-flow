// Zenite Flow — Catálogo Completo de Nós
// Biblioteca de nós disponíveis no editor

import { IZeniteNodeDescription } from '../types/node-types';

// ==========================================
// GATILHOS (Triggers)
// ==========================================

export const TRIGGER_NODES: IZeniteNodeDescription[] = [
  // Objeto Criado
  {
    displayName: 'Objeto Criado',
    name: 'objetoCriado',
    icon: 'PlusCircle',
    group: ['gatilho'],
    version: 1,
    description: 'Dispara quando um novo objeto é criado na Suite Zenite',
    defaults: {
      name: 'Objeto Criado',
      color: '#3CCEA7',
    },
    inputs: [],
    outputs: ['main'],
    properties: [
      {
        displayName: 'App',
        name: 'app',
        type: 'options',
        default: 'crm.lead',
        options: [
          { name: 'CRM — Lead', value: 'crm.lead' },
          { name: 'CRM — Oportunidade', value: 'crm.oportunidade' },
          { name: 'CRM — Conta', value: 'crm.conta' },
          { name: 'Projects — Projeto', value: 'projects.projeto' },
          { name: 'Projects — Tarefa', value: 'projects.tarefa' },
        ],
      },
    ],
  },

  // Objeto Atualizado
  {
    displayName: 'Objeto Atualizado',
    name: 'objetoAtualizado',
    icon: 'ArrowsClockwise',
    group: ['gatilho'],
    version: 1,
    description: 'Dispara quando um objeto é modificado',
    defaults: {
      name: 'Objeto Atualizado',
      color: '#3CCEA7',
    },
    inputs: [],
    outputs: ['main'],
    properties: [
      {
        displayName: 'App',
        name: 'app',
        type: 'options',
        default: 'crm.lead',
        options: [
          { name: 'CRM — Lead', value: 'crm.lead' },
          { name: 'CRM — Oportunidade', value: 'crm.oportunidade' },
          { name: 'CRM — Conta', value: 'crm.conta' },
        ],
      },
    ],
  },

  // Objeto Mudou de Fase
  {
    displayName: 'Objeto Mudou de Fase',
    name: 'objetoMudouFase',
    icon: 'ArrowDown',
    group: ['gatilho'],
    version: 1,
    description: 'Dispara quando um objeto avança ou retrocede de estágio',
    defaults: {
      name: 'Mudou de Fase',
      color: '#3CCEA7',
    },
    inputs: [],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Objeto',
        name: 'objeto',
        type: 'options',
        default: 'lead',
        options: [
          { name: 'Lead', value: 'lead' },
          { name: 'Oportunidade', value: 'oportunidade' },
        ],
      },
      {
        displayName: 'Fase Destino',
        name: 'faseDestino',
        type: 'options',
        default: '',
        options: [
          { name: 'Qualquer fase', value: '' },
          { name: 'Prospecção', value: 'prospeccao' },
          { name: 'Qualificação', value: 'qualificacao' },
          { name: 'Proposta', value: 'proposta' },
          { name: 'Ganho', value: 'ganho' },
          { name: 'Perdido', value: 'perdido' },
        ],
      },
    ],
  },

  // Agendamento (Schedule)
  {
    displayName: 'Agendamento',
    name: 'agendamento',
    icon: 'Clock',
    group: ['gatilho'],
    version: 1,
    description: 'Executa em horários programados',
    defaults: {
      name: 'Agendamento',
      color: '#3CCEA7',
    },
    inputs: [],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Frequência',
        name: 'frequencia',
        type: 'options',
        default: 'diario',
        options: [
          { name: 'A cada hora', value: 'hora' },
          { name: 'Diário', value: 'diario' },
          { name: 'Semanal', value: 'semanal' },
          { name: 'Mensal', value: 'mensal' },
          { name: 'Cron personalizado', value: 'cron' },
        ],
      },
      {
        displayName: 'Horário',
        name: 'horario',
        type: 'string',
        default: '08:00',
        placeholder: '08:00',
        displayOptions: {
          show: { frequencia: ['diario', 'semanal', 'mensal'] },
        },
      },
      {
        displayName: 'Expressão Cron',
        name: 'cron',
        type: 'string',
        default: '0 8 * * 1',
        placeholder: '0 8 * * 1',
        description: 'Expressão cron padrão (seg min hora dia mês dia-semana)',
        displayOptions: {
          show: { frequencia: ['cron'] },
        },
      },
    ],
  },

  // Portal (Webhook)
  {
    displayName: 'Portal',
    name: 'portal',
    icon: 'DoorOpen',
    group: ['gatilho', 'portal'],
    version: 1,
    description: 'Recebe dados de webhooks externos',
    defaults: {
      name: 'Portal',
      color: '#3CCEA7',
    },
    inputs: [],
    outputs: ['main'],
    webhook: true,
    webhookProperties: {
      httpMethod: 'POST',
      path: '={{ $node.name.toLowerCase() }}',
      responseMode: 'onReceived',
      responseData: 'firstEntryJson',
    },
    properties: [
      {
        displayName: 'Método HTTP',
        name: 'metodo',
        type: 'options',
        default: 'POST',
        options: [
          { name: 'POST', value: 'POST' },
          { name: 'GET', value: 'GET' },
          { name: 'PUT', value: 'PUT' },
        ],
      },
      {
        displayName: 'Autenticação',
        name: 'autenticacao',
        type: 'options',
        default: 'zenite',
        options: [
          { name: 'Nenhuma', value: 'none' },
          { name: 'Bearer Token', value: 'bearer' },
          { name: 'Zenite API Key', value: 'zenite' },
        ],
      },
    ],
  },
];

// ==========================================
// PASSOS (Actions) - Suite Zenite
// ==========================================

export const ACTION_NODES: IZeniteNodeDescription[] = [
  // CRM
  {
    displayName: 'CRM',
    name: 'crm',
    icon: 'AddressBook',
    group: ['passo'],
    version: 1,
    description: 'Operações no Zenite CRM',
    defaults: {
      name: 'CRM',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'zeniteApi', required: true }],
    properties: [
      {
        displayName: 'Operação',
        name: 'operacao',
        type: 'options',
        default: 'criarLead',
        options: [
          { name: 'Criar Lead', value: 'criarLead' },
          { name: 'Atualizar Lead', value: 'atualizarLead' },
          { name: 'Mover Lead de Fase', value: 'moverLead' },
          { name: 'Criar Oportunidade', value: 'criarOportunidade' },
          { name: 'Atualizar Oportunidade', value: 'atualizarOportunidade' },
          { name: 'Criar Conta', value: 'criarConta' },
          { name: 'Registrar Atividade', value: 'registrarAtividade' },
          { name: 'Buscar Lead', value: 'buscarLead' },
        ],
      },
      {
        displayName: 'Nome',
        name: 'nome',
        type: 'string',
        default: '',
        placeholder: 'Nome do lead',
        displayOptions: {
          show: { operacao: ['criarLead', 'criarConta'] },
        },
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        placeholder: 'email@exemplo.com',
        displayOptions: {
          show: { operacao: ['criarLead'] },
        },
      },
      {
        displayName: 'Telefone',
        name: 'telefone',
        type: 'string',
        default: '',
        placeholder: '+55 11 99999-9999',
        displayOptions: {
          show: { operacao: ['criarLead'] },
        },
      },
      {
        displayName: 'Estágio Destino',
        name: 'estagioDestino',
        type: 'options',
        default: 'prospeccao',
        options: [
          { name: 'Prospecção', value: 'prospeccao' },
          { name: 'Qualificação', value: 'qualificacao' },
          { name: 'Proposta', value: 'proposta' },
          { name: 'Ganho', value: 'ganho' },
          { name: 'Perdido', value: 'perdido' },
        ],
        displayOptions: {
          show: { operacao: ['moverLead'] },
        },
      },
    ],
  },

  // Projects
  {
    displayName: 'Projects',
    name: 'projects',
    icon: 'FolderOpen',
    group: ['passo'],
    version: 1,
    description: 'Operações no Zenite Projects',
    defaults: {
      name: 'Projects',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'zeniteApi', required: true }],
    properties: [
      {
        displayName: 'Operação',
        name: 'operacao',
        type: 'options',
        default: 'criarProjeto',
        options: [
          { name: 'Criar Projeto', value: 'criarProjeto' },
          { name: 'Atualizar Projeto', value: 'atualizarProjeto' },
          { name: 'Criar Tarefa', value: 'criarTarefa' },
          { name: 'Atualizar Tarefa', value: 'atualizarTarefa' },
          { name: 'Mover Tarefa', value: 'moverTarefa' },
          { name: 'Atribuir Responsável', value: 'atribuirResponsavel' },
          { name: 'Registrar Tempo', value: 'registrarTempo' },
        ],
      },
      {
        displayName: 'Nome do Projeto',
        name: 'nomeProjeto',
        type: 'string',
        default: '',
        placeholder: 'Nome do projeto',
        displayOptions: {
          show: { operacao: ['criarProjeto'] },
        },
      },
      {
        displayName: 'Cliente',
        name: 'cliente',
        type: 'string',
        default: '',
        placeholder: 'Nome do cliente',
        displayOptions: {
          show: { operacao: ['criarProjeto'] },
        },
      },
    ],
  },

  // Gmail
  {
    displayName: 'Gmail',
    name: 'gmail',
    icon: 'EnvelopeSimple',
    group: ['passo'],
    version: 1,
    description: 'Enviar e gerenciar emails via Gmail',
    defaults: {
      name: 'Gmail',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'googleWorkspace', required: true }],
    properties: [
      {
        displayName: 'Operação',
        name: 'operacao',
        type: 'options',
        default: 'enviar',
        options: [
          { name: 'Enviar Email', value: 'enviar' },
          { name: 'Responder Email', value: 'responder' },
          { name: 'Buscar Emails', value: 'buscar' },
          { name: 'Criar Rascunho', value: 'rascunho' },
          { name: 'Marcar como Lido', value: 'marcarLido' },
        ],
      },
      {
        displayName: 'Para',
        name: 'para',
        type: 'string',
        default: '',
        placeholder: 'destinatario@email.com',
        displayOptions: {
          show: { operacao: ['enviar', 'rascunho'] },
        },
      },
      {
        displayName: 'Assunto',
        name: 'assunto',
        type: 'string',
        default: '',
        placeholder: 'Assunto do email',
        displayOptions: {
          show: { operacao: ['enviar', 'rascunho'] },
        },
      },
      {
        displayName: 'Corpo',
        name: 'corpo',
        type: 'string',
        default: '',
        placeholder: 'Mensagem do email...',
        typeOptions: { rows: 5 },
        displayOptions: {
          show: { operacao: ['enviar', 'rascunho', 'responder'] },
        },
      },
    ],
  },

  // WhatsApp
  {
    displayName: 'WhatsApp',
    name: 'whatsapp',
    icon: 'WhatsappLogo',
    group: ['passo'],
    version: 1,
    description: 'Enviar mensagens via WhatsApp Business',
    defaults: {
      name: 'WhatsApp',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'whatsappBusiness', required: true }],
    properties: [
      {
        displayName: 'Operação',
        name: 'operacao',
        type: 'options',
        default: 'mensagem',
        options: [
          { name: 'Enviar Mensagem', value: 'mensagem' },
          { name: 'Enviar Template', value: 'template' },
          { name: 'Enviar Arquivo', value: 'arquivo' },
        ],
      },
      {
        displayName: 'Número',
        name: 'numero',
        type: 'string',
        default: '',
        placeholder: '+5511999999999',
      },
      {
        displayName: 'Mensagem',
        name: 'mensagem',
        type: 'string',
        default: '',
        placeholder: 'Digite a mensagem...',
        typeOptions: { rows: 3 },
        displayOptions: {
          show: { operacao: ['mensagem'] },
        },
      },
    ],
  },
];

// ==========================================
// TURING (IA)
// ==========================================

export const TURING_NODE: IZeniteNodeDescription = {
  displayName: 'Turing',
  name: 'turing',
  icon: 'Atom',
  iconColor: 'gradient-rainbow',
  group: ['turing'],
  version: 1,
  description: 'Inteligência artificial para análise e decisões',
  defaults: {
    name: 'Turing',
    color: 'gradient',
  },
  inputs: ['main'],
  outputs: ['main', 'main'],
  outputNames: ['Sim / Alta Prioridade', 'Não / Baixa Prioridade'],
  credentials: [{ name: 'zeniteApi', required: true }],
  properties: [
    {
      displayName: 'Operação',
      name: 'operacao',
      type: 'options',
      default: 'scoreLead',
      options: [
        // Análise
        { name: 'Analisar Score do Lead', value: 'scoreLead' },
        { name: 'Classificar Intenção', value: 'classificarIntencao' },
        { name: 'Análise de Sentimento', value: 'sentimento' },
        { name: 'Extrair Informações', value: 'extrairInfo' },
        // Geração
        { name: 'Gerar Resumo', value: 'gerarResumo' },
        { name: 'Gerar Resposta', value: 'gerarResposta' },
        { name: 'Gerar Relatório', value: 'gerarRelatorio' },
        // Decisão
        { name: 'Decidir Próximo Passo', value: 'decidirProxPasso' },
        { name: 'Classificar Texto', value: 'classificarTexto' },
        // Memória
        { name: 'Lembrar Contexto', value: 'lembrarContexto' },
        { name: 'Resumir Histórico', value: 'resumirHistorico' },
      ],
    },
    {
      displayName: 'Instrução Customizada',
      name: 'instrucao',
      type: 'string',
      default: '',
      placeholder: 'Instrução adicional para o Turing (opcional)',
      typeOptions: { rows: 3 },
      description: 'Personalize o comportamento da IA',
    },
    {
      displayName: 'Dados de Entrada',
      name: 'dadosEntrada',
      type: 'json',
      default: '{}',
      description: 'Dados extras para passar ao Turing',
    },
  ],
};

// ==========================================
// CONTROLE DE FLUXO
// ==========================================

export const FLOW_CONTROL_NODES: IZeniteNodeDescription[] = [
  // Bifurcação (If)
  {
    displayName: 'Bifurcação',
    name: 'bifurcacao',
    icon: 'GitBranch',
    group: ['bifurcacao'],
    version: 1,
    description: 'Divide o fluxo em dois caminhos baseado em condições',
    defaults: {
      name: 'Bifurcação',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: ['main', 'main'],
    outputNames: ['Verdadeiro', 'Falso'],
    properties: [
      {
        displayName: 'Condições',
        name: 'condicoes',
        type: 'filter',
        default: {},
        typeOptions: {
          filter: { caseSensitive: false, typeValidation: 'loose' },
        },
      },
      {
        displayName: 'Combinar com',
        name: 'combinarCom',
        type: 'options',
        default: 'AND',
        options: [
          { name: 'E (todas verdadeiras)', value: 'AND' },
          { name: 'OU (qualquer verdadeira)', value: 'OR' },
        ],
      },
    ],
  },

  // Rota (Switch)
  {
    displayName: 'Rota',
    name: 'rota',
    icon: 'ArrowsSplit',
    group: ['rota'],
    version: 1,
    description: 'Direciona para múltiplos caminhos baseado em valores',
    defaults: {
      name: 'Rota',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: [],
    properties: [
      {
        displayName: 'Campo de Decisão',
        name: 'campo',
        type: 'string',
        default: '',
        placeholder: 'Ex: {{ $json.estagio }}',
        description: 'Campo que determina a rota',
      },
    ],
  },

  // Repetição (Loop)
  {
    displayName: 'Repetição',
    name: 'repeticao',
    icon: 'ArrowsClockwise',
    group: ['repeticao'],
    version: 1,
    description: 'Itera sobre itens em lotes',
    defaults: {
      name: 'Repetição',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: ['main', 'main'],
    outputNames: ['Loop', 'Concluído'],
    properties: [
      {
        displayName: 'Tamanho do Lote',
        name: 'tamanheLote',
        type: 'number',
        default: 10,
        description: 'Número de itens por iteração',
      },
    ],
  },

  // Pausa (Wait)
  {
    displayName: 'Pausa',
    name: 'pausa',
    icon: 'HourglassSimple',
    group: ['pausa'],
    version: 1,
    description: 'Aguarda tempo ou evento antes de continuar',
    defaults: {
      name: 'Pausa',
      color: '#9B9BAD',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Tipo de Pausa',
        name: 'tipo',
        type: 'options',
        default: 'tempo',
        options: [
          { name: 'Por Tempo', value: 'tempo' },
          { name: 'Até Data/Hora', value: 'dataHora' },
          { name: 'Até Webhook', value: 'webhook' },
          { name: 'Até Aprovação', value: 'aprovacao' },
        ],
      },
      {
        displayName: 'Duração',
        name: 'duracao',
        type: 'number',
        default: 1,
        displayOptions: {
          show: { tipo: ['tempo'] },
        },
      },
      {
        displayName: 'Unidade',
        name: 'unidade',
        type: 'options',
        default: 'horas',
        options: [
          { name: 'Minutos', value: 'minutos' },
          { name: 'Horas', value: 'horas' },
          { name: 'Dias', value: 'dias' },
        ],
        displayOptions: {
          show: { tipo: ['tempo'] },
        },
      },
    ],
  },

  // Junção (Merge)
  {
    displayName: 'Junção',
    name: 'juncao',
    icon: 'GitMerge',
    group: ['juncao'],
    version: 1,
    description: 'Une dois ou mais caminhos em um',
    defaults: {
      name: 'Junção',
      color: '#6868B1',
    },
    inputs: ['main', 'main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Modo',
        name: 'modo',
        type: 'options',
        default: 'aguardarTodos',
        options: [
          { name: 'Aguardar todos', value: 'aguardarTodos' },
          { name: 'Primeiro que chegar', value: 'primeiroChegar' },
          { name: 'Mesclar por campo', value: 'mesclar' },
        ],
      },
    ],
  },

  // Filtro
  {
    displayName: 'Filtro',
    name: 'filtro',
    icon: 'Funnel',
    group: ['filtro'],
    version: 1,
    description: 'Remove itens que não atendem às condições',
    defaults: {
      name: 'Filtro',
      color: '#F5A623',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Condições',
        name: 'condicoes',
        type: 'filter',
        default: {},
      },
      {
        displayName: 'Combinar com',
        name: 'combinarCom',
        type: 'options',
        default: 'AND',
        options: [
          { name: 'E (todas)', value: 'AND' },
          { name: 'OU (qualquer)', value: 'OR' },
        ],
      },
    ],
  },

  // Aprovação
  {
    displayName: 'Aprovação',
    name: 'aprovacao',
    icon: 'UserCheck',
    group: ['aprovacao'],
    version: 1,
    description: 'Aguarda aprovação humana para continuar',
    defaults: {
      name: 'Aprovação',
      color: '#07ABDE',
    },
    inputs: ['main'],
    outputs: ['main', 'main'],
    outputNames: ['Aprovado', 'Reprovado'],
    properties: [
      {
        displayName: 'Canal',
        name: 'canal',
        type: 'options',
        default: 'email',
        options: [
          { name: 'Email', value: 'email' },
          { name: 'WhatsApp', value: 'whatsapp' },
          { name: 'Notificação Zenite', value: 'zenite' },
        ],
      },
      {
        displayName: 'Aprovador',
        name: 'aprovador',
        type: 'string',
        default: '',
        placeholder: 'email@exemplo.com ou ID do usuário',
        description: 'Email ou ID do usuário Zenite',
      },
      {
        displayName: 'Mensagem',
        name: 'mensagem',
        type: 'string',
        default: 'Sua aprovação é necessária para continuar.',
        typeOptions: { rows: 3 },
      },
      {
        displayName: 'Tempo Limite (horas)',
        name: 'tempoLimite',
        type: 'number',
        default: 24,
        description: 'Continua automaticamente após esse prazo',
      },
      {
        displayName: 'Ação ao Expirar',
        name: 'acaoExpirar',
        type: 'options',
        default: 'reprovar',
        options: [
          { name: 'Aprovar automaticamente', value: 'aprovar' },
          { name: 'Reprovar automaticamente', value: 'reprovar' },
          { name: 'Cancelar fluxo', value: 'cancelar' },
        ],
      },
    ],
  },
];

// ==========================================
// UTILIDADES
// ==========================================

export const UTILITY_NODES: IZeniteNodeDescription[] = [
  // Conector (HTTP Request)
  {
    displayName: 'Conector',
    name: 'conector',
    icon: 'Plugs',
    group: ['conector'],
    version: 1,
    description: 'Faz requisições HTTP para APIs externas',
    defaults: {
      name: 'Conector',
      color: '#9B9BAD',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: '',
        placeholder: 'https://api.exemplo.com/endpoint',
      },
      {
        displayName: 'Método',
        name: 'metodo',
        type: 'options',
        default: 'POST',
        options: [
          { name: 'GET', value: 'GET' },
          { name: 'POST', value: 'POST' },
          { name: 'PUT', value: 'PUT' },
          { name: 'PATCH', value: 'PATCH' },
          { name: 'DELETE', value: 'DELETE' },
        ],
      },
      {
        displayName: 'Corpo (JSON)',
        name: 'corpo',
        type: 'json',
        default: '{}',
        displayOptions: {
          show: { metodo: ['POST', 'PUT', 'PATCH'] },
        },
      },
    ],
  },

  // Script
  {
    displayName: 'Script',
    name: 'script',
    icon: 'Code',
    group: ['script'],
    version: 1,
    description: 'Executa código JavaScript/TypeScript customizado',
    defaults: {
      name: 'Script',
      color: '#9B9BAD',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Linguagem',
        name: 'linguagem',
        type: 'options',
        default: 'js',
        options: [
          { name: 'JavaScript', value: 'js' },
          { name: 'TypeScript', value: 'ts' },
        ],
      },
      {
        displayName: 'Código',
        name: 'codigo',
        type: 'string',
        default: `// Acesse os dados com: $input.all()
// Retorne: return items.map(i => ({ json: i.json }))
const items = $input.all();
return items;`,
        typeOptions: {
          editor: 'code',
          editorLanguage: '={{ $parameter.linguagem }}',
          rows: 10,
        },
      },
    ],
  },

  // Memória
  {
    displayName: 'Memória',
    name: 'memoria',
    icon: 'Database',
    group: ['memoria'],
    version: 1,
    description: 'Armazena e recupera dados entre execuções',
    defaults: {
      name: 'Memória',
      color: '#9B9BAD',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operação',
        name: 'operacao',
        type: 'options',
        default: 'set',
        options: [
          { name: 'Armazenar', value: 'set' },
          { name: 'Recuperar', value: 'get' },
          { name: 'Deletar', value: 'delete' },
        ],
      },
      {
        displayName: 'Chave',
        name: 'chave',
        type: 'string',
        default: '',
        placeholder: 'lead_{{ $json.id }}',
        description: 'Identificador único do dado',
      },
      {
        displayName: 'Valor',
        name: 'valor',
        type: 'json',
        default: '{}',
        displayOptions: {
          show: { operacao: ['set'] },
        },
      },
      {
        displayName: 'Expirar em (horas)',
        name: 'expirar',
        type: 'number',
        default: 0,
        description: '0 = nunca expira',
        displayOptions: {
          show: { operacao: ['set'] },
        },
      },
    ],
  },

  // Molde (Transform)
  {
    displayName: 'Molde',
    name: 'molde',
    icon: 'Shapes',
    group: ['molde'],
    version: 1,
    description: 'Transforma e formata dados',
    defaults: {
      name: 'Molde',
      color: '#F5A623',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Tipo',
        name: 'tipo',
        type: 'options',
        default: 'editarCampos',
        options: [
          { name: 'Editar Campos', value: 'editarCampos' },
          { name: 'Formatar Texto', value: 'formatarTexto' },
          { name: 'Formatar Data', value: 'formatarData' },
          { name: 'Formatar Número', value: 'formatarNumero' },
        ],
      },
    ],
  },

  // Alerta (Error)
  {
    displayName: 'Alerta',
    name: 'alerta',
    icon: 'Warning',
    group: ['alerta'],
    version: 1,
    description: 'Para o fluxo com mensagem de erro',
    defaults: {
      name: 'Alerta',
      color: '#FF6B6B',
    },
    inputs: ['main'],
    outputs: [],
    properties: [
      {
        displayName: 'Mensagem de Erro',
        name: 'mensagem',
        type: 'string',
        default: 'Erro no fluxo: {{ $json.motivo }}',
        typeOptions: { rows: 2 },
      },
      {
        displayName: 'Notificar Administrador',
        name: 'notificarAdmin',
        type: 'boolean',
        default: true,
      },
    ],
  },

  // Sub-fluxo
  {
    displayName: 'Sub-fluxo',
    name: 'subfluxo',
    icon: 'TreeStructure',
    group: ['subfluxo'],
    version: 1,
    description: 'Executa outro fluxo Zenite',
    defaults: {
      name: 'Sub-fluxo',
      color: '#6868B1',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Fluxo',
        name: 'fluxoId',
        type: 'string',
        default: '',
        placeholder: 'ID do fluxo',
        description: 'Selecione o fluxo Zenite a ser executado',
      },
      {
        displayName: 'Dados para o Sub-fluxo',
        name: 'dados',
        type: 'json',
        default: '={{ $json }}',
      },
      {
        displayName: 'Aguardar conclusão',
        name: 'aguardar',
        type: 'boolean',
        default: true,
      },
    ],
  },

  // Registro (Log)
  {
    displayName: 'Registro',
    name: 'registro',
    icon: 'ClipboardText',
    group: ['registro'],
    version: 1,
    description: 'Salva evento no histórico do Flow',
    defaults: {
      name: 'Registro',
      color: '#9B9BAD',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Nível',
        name: 'nivel',
        type: 'options',
        default: 'info',
        options: [
          { name: 'Info', value: 'info' },
          { name: 'Sucesso', value: 'sucesso' },
          { name: 'Aviso', value: 'aviso' },
          { name: 'Erro', value: 'erro' },
        ],
      },
      {
        displayName: 'Mensagem',
        name: 'mensagem',
        type: 'string',
        default: '',
        placeholder: 'Mensagem do log',
      },
      {
        displayName: 'Dados Extras',
        name: 'dados',
        type: 'json',
        default: '={{ $json }}',
      },
    ],
  },
];

// ==========================================
// CATÁLOGO COMPLETO
// ==========================================

export const ALL_NODES: IZeniteNodeDescription[] = [
  ...TRIGGER_NODES,
  ...ACTION_NODES,
  TURING_NODE,
  ...FLOW_CONTROL_NODES,
  ...UTILITY_NODES,
];

// Buscar nó por nome
export function getNodeByName(name: string): IZeniteNodeDescription | undefined {
  return ALL_NODES.find((node) => node.name === name);
}

// Buscar nós por grupo
export function getNodesByGroup(group: string): IZeniteNodeDescription[] {
  return ALL_NODES.filter((node) => node.group.includes(group as any));
}

// Categorias para organização na UI
export const NODE_CATEGORIES = [
  { id: 'gatilho', name: 'Gatilhos', icon: 'Lightning', color: '#3CCEA7' },
  { id: 'passo', name: 'Ações', icon: 'Play', color: '#6868B1' },
  { id: 'turing', name: 'Turing IA', icon: 'Atom', color: 'gradient' },
  { id: 'control', name: 'Controle de Fluxo', icon: 'GitBranch', color: '#6868B1' },
  { id: 'util', name: 'Utilidades', icon: 'Toolbox', color: '#9B9BAD' },
] as const;

// ==========================================
// HELPERS PARA REACT FLOW
// ==========================================

import * as PhosphorIcons from '@phosphor-icons/react';
import type { NodeGroup } from '../types/node-types';

// Catálogo organizado por grupo para o NodePicker
export const nodeCatalog: Record<string, Array<{ type: string; group: NodeGroup; label: string; description?: string }>> = {
  gatilho: TRIGGER_NODES.map(node => ({
    type: node.name,
    group: 'gatilho' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  passo: ACTION_NODES.map(node => ({
    type: node.name,
    group: 'passo' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  turing: [{
    type: TURING_NODE.name,
    group: 'turing' as NodeGroup,
    label: TURING_NODE.displayName,
    description: TURING_NODE.description,
  }],
  bifurcacao: FLOW_CONTROL_NODES.filter(n => n.group.includes('bifurcacao')).map(node => ({
    type: node.name,
    group: 'bifurcacao' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  rota: FLOW_CONTROL_NODES.filter(n => n.group.includes('rota')).map(node => ({
    type: node.name,
    group: 'rota' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  repeticao: FLOW_CONTROL_NODES.filter(n => n.group.includes('repeticao')).map(node => ({
    type: node.name,
    group: 'repeticao' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  pausa: FLOW_CONTROL_NODES.filter(n => n.group.includes('pausa')).map(node => ({
    type: node.name,
    group: 'pausa' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  juncao: FLOW_CONTROL_NODES.filter(n => n.group.includes('juncao')).map(node => ({
    type: node.name,
    group: 'juncao' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  filtro: UTILITY_NODES.filter(n => n.group.includes('filtro')).map(node => ({
    type: node.name,
    group: 'filtro' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  conector: UTILITY_NODES.filter(n => n.group.includes('conector')).map(node => ({
    type: node.name,
    group: 'conector' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  portal: TRIGGER_NODES.filter(n => n.group.includes('portal')).map(node => ({
    type: node.name,
    group: 'portal' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  script: UTILITY_NODES.filter(n => n.group.includes('script')).map(node => ({
    type: node.name,
    group: 'script' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  aprovacao: UTILITY_NODES.filter(n => n.group.includes('aprovacao')).map(node => ({
    type: node.name,
    group: 'aprovacao' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  memoria: UTILITY_NODES.filter(n => n.group.includes('memoria')).map(node => ({
    type: node.name,
    group: 'memoria' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  molde: UTILITY_NODES.filter(n => n.group.includes('molde')).map(node => ({
    type: node.name,
    group: 'molde' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  alerta: UTILITY_NODES.filter(n => n.group.includes('alerta')).map(node => ({
    type: node.name,
    group: 'alerta' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  subfluxo: UTILITY_NODES.filter(n => n.group.includes('subfluxo')).map(node => ({
    type: node.name,
    group: 'subfluxo' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
  registro: UTILITY_NODES.filter(n => n.group.includes('registro')).map(node => ({
    type: node.name,
    group: 'registro' as NodeGroup,
    label: node.displayName,
    description: node.description,
  })),
};

// Mapear ícone Phosphor para cada tipo de nó
export function getNodeIcon(nodeType: string): any {
  const node = ALL_NODES.find(n => n.name === nodeType);
  const iconName = node?.icon || 'Circle';
  return (PhosphorIcons as any)[iconName] || PhosphorIcons.Circle;
}

// Mapear cor para cada grupo de nó
export function getNodeColor(group: NodeGroup): string {
  const colorMap: Record<NodeGroup, string> = {
    gatilho: '#3CCEA7',
    passo: '#6868B1',
    bifurcacao: '#6868B1',
    rota: '#6868B1',
    repeticao: '#6868B1',
    pausa: '#9B9BAD',
    juncao: '#6868B1',
    filtro: '#F5A623',
    conector: '#9B9BAD',
    portal: '#3CCEA7',
    script: '#9B9BAD',
    aprovacao: '#07ABDE',
    turing: '#8C8CD4', // Vai usar gradiente, mas fallback
    memoria: '#9B9BAD',
    molde: '#F5A623',
    alerta: '#FF6B6B',
    subfluxo: '#6868B1',
    registro: '#9B9BAD',
  };
  return colorMap[group] || '#9B9BAD';
}