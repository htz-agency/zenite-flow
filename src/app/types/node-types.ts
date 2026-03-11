// Zenite Flow — Tipos de Nós
// Baseado na arquitetura n8n adaptada

export type ZeniteNodeGroup =
  | 'gatilho'     // ⚡ Inicia o fluxo
  | 'passo'       // ▶ Executa ação
  | 'bifurcacao'  // ⑂ Divide por condição
  | 'rota'        // ⌥ Múltiplos caminhos
  | 'repeticao'   // ↻ Itera sobre itens
  | 'pausa'       // ⏳ Aguarda
  | 'juncao'      // ⊕ Une caminhos
  | 'filtro'      // ∇ Remove itens
  | 'conector'    // ☍ API externa
  | 'portal'      // ◈ Webhook entrada
  | 'script'      // ✎ Código custom
  | 'aprovacao'   // ✓ Humano no loop
  | 'turing'      // ◎ IA
  | 'memoria'     // ▣ Armazenamento
  | 'molde'       // ◧ Transformação
  | 'alerta'      // ⚠ Erro
  | 'subfluxo'    // ❧ Sub-fluxo
  | 'registro';   // ✐ Log

// Alias para compatibilidade
export type NodeGroup = ZeniteNodeGroup;

export type ZenitePropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'options'          // dropdown de opções fixas
  | 'multiOptions'     // multiselect
  | 'collection'       // grupo de campos relacionados
  | 'fixedCollection'  // lista repetível
  | 'json'             // editor JSON
  | 'color'            // color picker
  | 'dateTime'         // date/time picker
  | 'resourceLocator'  // busca de recurso
  | 'filter';          // construtor visual de filtros

export type ExecutionStatus = 
  | 'running'    // Executando
  | 'success'    // Concluído
  | 'error'      // Falhou
  | 'waiting'    // Aguardando
  | 'skipped'    // Ignorado
  | 'cancelled'; // Cancelado

export interface IZenitePropertyOption {
  name: string;
  value: string;
}

export interface IZeniteProperty {
  displayName: string;
  name: string;
  type: ZenitePropertyType;
  default: any;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: IZenitePropertyOption[];
  typeOptions?: {
    rows?: number;
    editor?: string;
    editorLanguage?: string;
    multipleValues?: boolean;
    filter?: {
      caseSensitive?: boolean | string;
      typeValidation?: 'strict' | 'loose';
    };
  };
  displayOptions?: {
    show?: Record<string, string[]>;
    hide?: Record<string, string[]>;
  };
  values?: IZeniteProperty[]; // Para collection/fixedCollection
}

export interface IZeniteNodeDescription {
  displayName: string;
  name: string;
  icon: string;
  iconColor?: string; // 'gradient-rainbow' para Turing
  group: ZeniteNodeGroup[];
  version: number;
  description: string;
  defaults: {
    name: string;
    color: string;
  };
  inputs: string[];
  outputs: string[];
  outputNames?: string[];
  credentials?: Array<{ name: string; required: boolean }>;
  properties: IZeniteProperty[];
  webhook?: boolean;
  webhookProperties?: {
    httpMethod: string;
    path: string;
    responseMode: string;
    responseData: string;
  };
}

export interface IZeniteNode {
  description: IZeniteNodeDescription;
  execute?: (context: any) => Promise<any[][]>;
}

export interface FlowNodeInstance {
  id: string;
  type: ZeniteNodeGroup;
  name: string;
  displayName: string;
  icon: string;
  iconColor?: string;
  color: string;
  parameters: Record<string, any>;
  position: { x: number; y: number };
  connections: {
    input: Array<{ node: string; output: number }>;
    output: Array<Array<{ node: string; input: number }>>;
  };
  disabled?: boolean;
  notes?: string;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  lastRun?: string;
  executions: number;
  nodes: FlowNodeInstance[];
  connections: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface FlowExecution {
  id: string;
  flowId: string;
  flowName: string;
  status: ExecutionStatus;
  trigger: string;
  startedAt: string;
  finishedAt?: string;
  duration: string;
  error?: string;
  data?: any;
}

// Cores por grupo de nó
export const NODE_GROUP_COLORS: Record<ZeniteNodeGroup, string> = {
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
  turing: 'gradient', // Especial
  memoria: '#9B9BAD',
  molde: '#F5A623',
  alerta: '#FF6B6B',
  subfluxo: '#6868B1',
  registro: '#9B9BAD',
};

// Ícones Phosphor por grupo
export const NODE_GROUP_ICONS: Record<ZeniteNodeGroup, string> = {
  gatilho: 'Lightning',
  passo: 'Play',
  bifurcacao: 'GitBranch',
  rota: 'ArrowsSplit',
  repeticao: 'ArrowsClockwise',
  pausa: 'HourglassSimple',
  juncao: 'GitMerge',
  filtro: 'Funnel',
  conector: 'Plugs',
  portal: 'DoorOpen',
  script: 'Code',
  aprovacao: 'UserCheck',
  turing: 'Atom',
  memoria: 'Database',
  molde: 'Shapes',
  alerta: 'Warning',
  subfluxo: 'TreeStructure',
  registro: 'ClipboardText',
};

// Status de execução - cores e ícones
export const EXECUTION_STATUS_CONFIG: Record<ExecutionStatus, { color: string; icon: string }> = {
  running: { color: '#07ABDE', icon: 'CircleNotch' },
  success: { color: '#3CCEA7', icon: 'CheckCircle' },
  error: { color: '#FF6B6B', icon: 'XCircle' },
  waiting: { color: '#F5A623', icon: 'HourglassSimple' },
  skipped: { color: '#9B9BAD', icon: 'MinusCircle' },
  cancelled: { color: '#9B9BAD', icon: 'ProhibitInset' },
};

// Tipo para nós do React Flow
export interface ZeniteNodeData {
  type: string;
  group: NodeGroup;
  label: string;
  subtitle?: string;
  outputCount?: number;
  status?: ExecutionStatus;
  parameters?: Record<string, any>;
}