# Zenite Flow — Arquitetura de Nós

> Documentação técnica da estrutura de nós do Zenite Flow.  
> Baseada na arquitetura n8n, adaptada com terminologia e contexto da Zenite Cloud Suite.

---

## Estrutura de um Nó

```
zenite-flow/
├── packages/
│   └── nodes/
│       └── meu-no/
│           ├── package.json
│           ├── index.ts
│           └── MeuNo.node.ts   ← arquivo principal
```

---

## Interface `IZeniteNode` (equivalente ao `INodeType` do n8n)

```typescript
import {
  IZeniteExecuteFunctions,
  IZeniteNodeExecutionData,
  IZeniteNode,
  IZeniteNodeDescription,
} from '@zenite/flow-workflow';

export class MeuNo implements IZeniteNode {
  description: IZeniteNodeDescription = {
    displayName: 'Nome do Nó',        // Aparece na UI do Flow
    name: 'meuNo',                     // ID interno (camelCase)
    icon: 'phosphor:star',             // Sempre Phosphor Icons
    group: ['passo'],                  // Categoria do nó (ver grupos abaixo)
    version: 1,
    description: 'Descrição do que o nó faz',
    defaults: {
      name: 'Meu Nó',
      color: '#6868B1',                // Cor do nó no canvas
    },
    inputs: ['main'],                  // Entradas (connectors)
    outputs: ['main'],                 // Saídas (connectors)
    credentials: [],                   // Autenticação necessária
    properties: [                      // Campos configuráveis na UI
      {
        displayName: 'Minha Propriedade',
        name: 'minhaPropriedade',
        type: 'string',
        default: '',
        description: 'Valor de entrada',
      },
    ],
  };

  async execute(this: IZeniteExecuteFunctions): Promise<IZeniteNodeExecutionData[][]> {
    const items = this.getInputData();
    const resultado = items.map(item => ({
      json: {
        valor: this.getNodeParameter('minhaPropriedade', 0),
      },
    }));
    return [resultado];
  }
}
```

---

## Terminologia Zenite Flow vs n8n

| Conceito n8n       | Zenite Flow       | Descrição                                      |
|--------------------|-------------------|------------------------------------------------|
| Node               | **Nó**            | Unidade individual de um fluxo                 |
| Trigger            | **Gatilho**       | Inicia o fluxo                                 |
| Action             | **Passo**         | Executa uma ação                               |
| Condition / If     | **Bifurcação**    | Divide o fluxo por condição                    |
| Switch             | **Rota**          | Múltiplos caminhos por regra                   |
| Loop               | **Repetição**     | Itera sobre lista de itens                     |
| Wait               | **Pausa**         | Aguarda tempo ou evento                        |
| Merge              | **Junção**        | Une dois caminhos em um                        |
| Filter             | **Filtro**        | Remove itens por condição                      |
| Sub-workflow       | **Sub-fluxo**     | Chama outro fluxo Zenite                       |
| HTTP Request       | **Conector**      | Chamada para API externa                       |
| Webhook            | **Portal**        | Recebe dados externos via HTTP                 |
| Code               | **Script**        | Executa JavaScript/TypeScript customizado      |
| Human Review       | **Aprovação**     | Aguarda ação humana para continuar             |
| AI Node            | **Turing**        | Nó de inteligência artificial                  |
| Store Data         | **Memória**       | Armazena dado entre execuções                  |
| Transform          | **Molde**         | Transforma e formata dados                     |
| Error              | **Alerta**        | Para o fluxo com mensagem de erro              |
| Log                | **Registro**      | Salva evento no histórico do Flow              |

---

## Grupos de Nós (equivalente ao `group` do n8n)

```typescript
type ZeniteNodeGroup =
  | 'gatilho'     // ⚡ Inicia o fluxo (Lightning — #3CCEA7)
  | 'passo'       // ▶ Executa ação (Play — #6868B1)
  | 'bifurcacao'  // ⑂ Divide por condição (GitBranch — #6868B1)
  | 'rota'        // ⌥ Múltiplos caminhos (ArrowsSplit — #6868B1)
  | 'repeticao'   // ↻ Itera sobre itens (ArrowsClockwise — #6868B1)
  | 'pausa'       // ⏳ Aguarda (HourglassSimple — #9B9BAD)
  | 'juncao'      // ⊕ Une caminhos (GitMerge — #6868B1)
  | 'filtro'      // ∇ Remove itens (Funnel — #F5A623)
  | 'conector'    // ☍ API externa (Plugs — #9B9BAD)
  | 'portal'      // ◈ Webhook entrada (Door — #3CCEA7)
  | 'script'      // ✎ Código custom (Code — #9B9BAD)
  | 'aprovacao'   // ✓ Humano no loop (UserCheck — #07ABDE)
  | 'turing'      // ◎ IA (Atom — gradiente rainbow)
  | 'memoria'     // ▣ Armazenamento (Database — #9B9BAD)
  | 'molde'       // ◧ Transformação (Shapes — #F5A623)
  | 'alerta'      // ⚠ Erro (Warning — #FF6B6B)
  | 'subfluxo'    // ❧ Sub-fluxo (TreeStructure — #6868B1)
  | 'registro'    // ✐ Log (ClipboardText — #9B9BAD)
```

---

## Tipos de Propriedades

```typescript
type ZenitePropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'options'          // dropdown de opções fixas
  | 'multiOptions'     // multiselect
  | 'collection'       // grupo de campos relacionados
  | 'fixedCollection'  // lista repetível (ex: headers de requisição)
  | 'json'             // editor JSON
  | 'color'            // color picker
  | 'dateTime'         // date/time picker
  | 'resourceLocator'  // busca de recurso (ex: lead no CRM)
  | 'filter'           // construtor visual de filtros/condições
```

### Exemplos de propriedades

```typescript
properties: [
  // String simples
  {
    displayName: 'Nome do Projeto',
    name: 'nomeProjeto',
    type: 'string',
    default: '',
    placeholder: 'ex: Projeto Alpha',
    description: 'Nome do projeto a ser criado',
  },

  // Dropdown
  {
    displayName: 'Estágio',
    name: 'estagio',
    type: 'options',
    options: [
      { name: 'Prospecção', value: 'prospeccao' },
      { name: 'Qualificação', value: 'qualificacao' },
      { name: 'Proposta', value: 'proposta' },
      { name: 'Ganho', value: 'ganho' },
      { name: 'Perdido', value: 'perdido' },
    ],
    default: 'prospeccao',
  },

  // Busca de recurso no CRM
  {
    displayName: 'Lead',
    name: 'leadId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    modes: [
      { displayName: 'Da lista', name: 'list' },
      { displayName: 'Por ID', name: 'id' },
    ],
  },

  // Construtor de condição visual
  {
    displayName: 'Condição',
    name: 'condicao',
    type: 'filter',
    default: {},
    typeOptions: {
      filter: {
        caseSensitive: '={{ !$parameter.ignorarCase }}',
        typeValidation: 'strict',
      },
    },
  },

  // Grupo de campos
  {
    displayName: 'Configurações Adicionais',
    name: 'configAdicional',
    type: 'collection',
    placeholder: 'Adicionar configuração',
    default: {},
    options: [
      {
        displayName: 'Responsável',
        name: 'responsavelId',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Prazo (dias)',
        name: 'prazoDias',
        type: 'number',
        default: 7,
      },
    ],
  },
]
```

---

## Catálogo Completo de Nós

### ⚡ Gatilhos
*group: 'gatilho' | inputs: [] | outputs: ['main']*

#### Gatilhos de Evento (Suite Zenite)

```typescript
// Objeto criado
{
  displayName: 'Objeto Criado',
  name: 'objetoCriado',
  icon: 'phosphor:plus-circle',
  group: ['gatilho'],
  inputs: [],
  outputs: ['main'],
  properties: [
    {
      displayName: 'App',
      name: 'app',
      type: 'options',
      options: [
        { name: 'CRM — Lead', value: 'crm.lead' },
        { name: 'CRM — Oportunidade', value: 'crm.oportunidade' },
        { name: 'CRM — Conta', value: 'crm.conta' },
        { name: 'Projects — Projeto', value: 'projects.projeto' },
        { name: 'Projects — Tarefa', value: 'projects.tarefa' },
      ],
      default: 'crm.lead',
    },
  ],
}

// Objeto atualizado
// Objeto mudou de fase
// Objeto entrou em fase específica
// Objeto excluído
```

#### Gatilhos de Comunicação

```typescript
// Email enviado | Email aberto | Email respondido
// Link clicado em email
// Mensagem WhatsApp recebida
// Ligação registrada
```

#### Gatilhos de Agenda

```typescript
// Evento criado no Google Calendar
// Evento cancelado
// Evento iniciando (X minutos antes)
// Tarefa criada | Tarefa concluída
// Prazo se aproximando
```

#### Gatilhos Temporais

```typescript
{
  displayName: 'Agendamento',
  name: 'agendamento',
  icon: 'phosphor:clock',
  group: ['gatilho'],
  inputs: [],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Frequência',
      name: 'frequencia',
      type: 'options',
      options: [
        { name: 'A cada hora', value: 'hora' },
        { name: 'Diário', value: 'diario' },
        { name: 'Semanal', value: 'semanal' },
        { name: 'Mensal', value: 'mensal' },
        { name: 'Cron personalizado', value: 'cron' },
      ],
      default: 'diario',
    },
    {
      displayName: 'Expressão Cron',
      name: 'cron',
      type: 'string',
      default: '0 8 * * 1',
      displayOptions: { show: { frequencia: ['cron'] } },
      description: 'Expressão cron padrão',
    },
  ],
}
```

#### Gatilhos Externos

```typescript
// Portal (Webhook entrada)
{
  displayName: 'Portal',
  name: 'portal',
  icon: 'phosphor:door-open',
  group: ['gatilho', 'portal'],
  inputs: [],
  outputs: ['main'],
  webhook: true,                    // Habilita recebimento de webhook
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
      options: [
        { name: 'POST', value: 'POST' },
        { name: 'GET', value: 'GET' },
        { name: 'PUT', value: 'PUT' },
      ],
      default: 'POST',
    },
    {
      displayName: 'Autenticação',
      name: 'autenticacao',
      type: 'options',
      options: [
        { name: 'Nenhuma', value: 'none' },
        { name: 'Bearer Token', value: 'bearer' },
        { name: 'Zenite API Key', value: 'zenite' },
      ],
      default: 'zenite',
    },
  ],
}

// Executado por outro fluxo (Sub-fluxo como gatilho)
// Turing detectar (condição avaliada por IA)
```

---

### ▶ Passos — Suite Zenite
*group: 'passo' | inputs: ['main'] | outputs: ['main']*

#### Zenite CRM

```typescript
{
  displayName: 'CRM',
  name: 'crm',
  icon: 'phosphor:address-book',
  group: ['passo'],
  credentials: [{ name: 'zeniteApi', required: true }],
  properties: [
    {
      displayName: 'Operação',
      name: 'operacao',
      type: 'options',
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
      default: 'criarLead',
    },
    // Campos condicionais por operação
    {
      displayName: 'Nome',
      name: 'nome',
      type: 'string',
      default: '',
      displayOptions: { show: { operacao: ['criarLead', 'criarConta'] } },
    },
    {
      displayName: 'Estágio Destino',
      name: 'estagioDestino',
      type: 'options',
      options: [
        { name: 'Prospecção', value: 'prospeccao' },
        { name: 'Qualificação', value: 'qualificacao' },
        { name: 'Proposta', value: 'proposta' },
        { name: 'Ganho', value: 'ganho' },
        { name: 'Perdido', value: 'perdido' },
      ],
      displayOptions: { show: { operacao: ['moverLead'] } },
    },
  ],
}
```

#### Zenite Projects

```typescript
// Operações disponíveis:
// criarProjeto | atualizarProjeto
// criarTarefa | atualizarTarefa | moverTarefa
// atribuirResponsavel | registrarTempo
```

#### Zenite Dash

```typescript
// Operações disponíveis:
// criarPainel | atualizarDataset
// gerarSnapshot | exportarRelatorio
```

#### Zenite Sync

```typescript
// Operações disponíveis:
// forcarSync | verificarStatus
// criarFonte | pausarSync | retomarSync
```

---

### ▶ Passos — Google Workspace
*credentials: [{ name: 'googleWorkspace', required: true }]*

#### Gmail

```typescript
{
  displayName: 'Gmail',
  name: 'gmail',
  icon: 'phosphor:envelope',
  group: ['passo'],
  credentials: [{ name: 'googleWorkspace', required: true }],
  properties: [
    {
      displayName: 'Operação',
      name: 'operacao',
      type: 'options',
      options: [
        { name: 'Enviar Email', value: 'enviar' },
        { name: 'Responder Email', value: 'responder' },
        { name: 'Buscar Emails', value: 'buscar' },
        { name: 'Criar Rascunho', value: 'rascunho' },
        { name: 'Marcar como Lido', value: 'marcarLido' },
      ],
      default: 'enviar',
    },
    {
      displayName: 'Para',
      name: 'para',
      type: 'string',
      default: '',
      displayOptions: { show: { operacao: ['enviar', 'rascunho'] } },
    },
    {
      displayName: 'Assunto',
      name: 'assunto',
      type: 'string',
      default: '',
      displayOptions: { show: { operacao: ['enviar', 'rascunho'] } },
    },
    {
      displayName: 'Corpo',
      name: 'corpo',
      type: 'string',
      typeOptions: { rows: 5 },
      default: '',
      displayOptions: { show: { operacao: ['enviar', 'rascunho', 'responder'] } },
    },
  ],
}
```

#### Google Calendar

```typescript
// Operações: criarEvento | atualizarEvento | cancelarEvento
//            buscarDisponibilidade | listarEventos
```

#### Google Drive

```typescript
// Operações: criarArquivo | moverArquivo | buscarArquivo | upload
// Nota: compartilhamento é operação restrita — requer confirmação
```

#### Google Docs / Sheets / Meet

```typescript
// Google Docs: criarDocumento | inserirTexto | exportarPDF
// Google Sheets: criarPlanilha | adicionarLinha | atualizarCelula | buscar
// Google Meet: criarReuniao | adicionarParticipantes
```

#### WhatsApp Business

```typescript
{
  displayName: 'WhatsApp',
  name: 'whatsapp',
  icon: 'phosphor:whatsapp-logo',
  group: ['passo'],
  credentials: [{ name: 'whatsappBusiness', required: true }],
  properties: [
    {
      displayName: 'Operação',
      name: 'operacao',
      type: 'options',
      options: [
        { name: 'Enviar Mensagem', value: 'mensagem' },
        { name: 'Enviar Template', value: 'template' },
        { name: 'Enviar Arquivo', value: 'arquivo' },
      ],
      default: 'mensagem',
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
      typeOptions: { rows: 3 },
      default: '',
      displayOptions: { show: { operacao: ['mensagem'] } },
    },
  ],
}
```

---

### ◎ Turing (Nós de IA)
*group: 'turing' | color: gradiente rainbow*

```typescript
{
  displayName: 'Turing',
  name: 'turing',
  icon: 'phosphor:atom',
  iconColor: 'gradient-rainbow',  // Propriedade especial do Zenite Flow
  group: ['turing'],
  credentials: [{ name: 'zeniteApi', required: true }],
  properties: [
    {
      displayName: 'Operação',
      name: 'operacao',
      type: 'options',
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
      default: 'scoreLead',
    },
    {
      displayName: 'Instrução Customizada',
      name: 'instrucao',
      type: 'string',
      typeOptions: { rows: 3 },
      default: '',
      description: 'Instrução adicional para o Turing (opcional)',
    },
    {
      displayName: 'Dados de Entrada',
      name: 'dadosEntrada',
      type: 'json',
      default: '{}',
      description: 'Dados extras para passar ao Turing',
    },
  ],
  // outputs especiais para decisão
  outputs: ['main', 'main'],
  outputNames: ['Sim / Alta Prioridade', 'Não / Baixa Prioridade'],
}
```

---

### ⑂ Bifurcação
*group: 'bifurcacao' | outputs: ['main', 'main']*

```typescript
{
  displayName: 'Bifurcação',
  name: 'bifurcacao',
  icon: 'phosphor:git-branch',
  group: ['bifurcacao'],
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
      options: [
        { name: 'E (todas verdadeiras)', value: 'AND' },
        { name: 'OU (qualquer verdadeira)', value: 'OR' },
      ],
      default: 'AND',
    },
  ],
}
```

---

### ⌥ Rota (Switch)
*group: 'rota' | outputs: dinâmicos*

```typescript
{
  displayName: 'Rota',
  name: 'rota',
  icon: 'phosphor:arrows-split',
  group: ['rota'],
  outputs: [], // gerados dinamicamente pela UI
  properties: [
    {
      displayName: 'Campo de Decisão',
      name: 'campo',
      type: 'string',
      default: '',
      description: 'Ex: {{ $json.estagio }}',
    },
    {
      displayName: 'Rotas',
      name: 'rotas',
      type: 'fixedCollection',
      typeOptions: { multipleValues: true },
      default: {},
      options: [
        {
          displayName: 'Rota',
          name: 'rota',
          values: [
            { displayName: 'Valor', name: 'valor', type: 'string', default: '' },
            { displayName: 'Label', name: 'label', type: 'string', default: '' },
          ],
        },
      ],
    },
  ],
}
```

---

### ↻ Repetição (Loop)
*group: 'repeticao'*

```typescript
{
  displayName: 'Repetição',
  name: 'repeticao',
  icon: 'phosphor:arrows-clockwise',
  group: ['repeticao'],
  outputs: ['main', 'main'],
  outputNames: ['Loop', 'Concluído'],
  properties: [
    {
      displayName: 'Tamanho do Lote',
      name: 'tamanheLote',
      type: 'number',
      default: 10,
      description: 'Itens por iteração',
    },
  ],
}
```

---

### ⏳ Pausa
*group: 'pausa'*

```typescript
{
  displayName: 'Pausa',
  name: 'pausa',
  icon: 'phosphor:hourglass-simple',
  group: ['pausa'],
  properties: [
    {
      displayName: 'Tipo de Pausa',
      name: 'tipo',
      type: 'options',
      options: [
        { name: 'Por Tempo', value: 'tempo' },
        { name: 'Até Data/Hora', value: 'dataHora' },
        { name: 'Até Webhook', value: 'webhook' },
        { name: 'Até Aprovação', value: 'aprovacao' },
      ],
      default: 'tempo',
    },
    {
      displayName: 'Duração',
      name: 'duracao',
      type: 'number',
      default: 1,
      displayOptions: { show: { tipo: ['tempo'] } },
    },
    {
      displayName: 'Unidade',
      name: 'unidade',
      type: 'options',
      options: [
        { name: 'Minutos', value: 'minutos' },
        { name: 'Horas', value: 'horas' },
        { name: 'Dias', value: 'dias' },
      ],
      default: 'horas',
      displayOptions: { show: { tipo: ['tempo'] } },
    },
  ],
}
```

---

### ✓ Aprovação (Human in the Loop)
*group: 'aprovacao' | outputs: ['main', 'main']*

```typescript
{
  displayName: 'Aprovação',
  name: 'aprovacao',
  icon: 'phosphor:user-check',
  group: ['aprovacao'],
  outputs: ['main', 'main'],
  outputNames: ['Aprovado', 'Reprovado'],
  properties: [
    {
      displayName: 'Canal',
      name: 'canal',
      type: 'options',
      options: [
        { name: 'Email', value: 'email' },
        { name: 'WhatsApp', value: 'whatsapp' },
        { name: 'Notificação Zenite', value: 'zenite' },
      ],
      default: 'email',
    },
    {
      displayName: 'Aprovador',
      name: 'aprovador',
      type: 'string',
      default: '',
      description: 'Email ou ID do usuário Zenite',
    },
    {
      displayName: 'Mensagem',
      name: 'mensagem',
      type: 'string',
      typeOptions: { rows: 3 },
      default: 'Sua aprovação é necessária para continuar.',
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
      options: [
        { name: 'Aprovar automaticamente', value: 'aprovar' },
        { name: 'Reprovar automaticamente', value: 'reprovar' },
        { name: 'Cancelar fluxo', value: 'cancelar' },
      ],
      default: 'reprovar',
    },
  ],
}
```

---

### ☍ Conector (HTTP Request)
*group: 'conector'*

```typescript
{
  displayName: 'Conector',
  name: 'conector',
  icon: 'phosphor:plugs',
  group: ['conector'],
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
      options: [
        { name: 'GET', value: 'GET' },
        { name: 'POST', value: 'POST' },
        { name: 'PUT', value: 'PUT' },
        { name: 'PATCH', value: 'PATCH' },
        { name: 'DELETE', value: 'DELETE' },
      ],
      default: 'POST',
    },
    {
      displayName: 'Headers',
      name: 'headers',
      type: 'fixedCollection',
      typeOptions: { multipleValues: true },
      default: {},
    },
    {
      displayName: 'Corpo (JSON)',
      name: 'corpo',
      type: 'json',
      default: '{}',
      displayOptions: { show: { metodo: ['POST', 'PUT', 'PATCH'] } },
    },
  ],
}
```

---

### ◧ Molde (Transform)
*group: 'molde'*

```typescript
// Subtipos:
// EditarCampos — adiciona, remove, renomeia campos
// MoldeIA — transforma via instrução Turing (linguagem natural)
// FormatarTexto — capitalizar, truncar, substituir
// FormatarData — converte e formata datas
// FormatarNumero — arredonda, moeda, percentual
// SepararItens — lista → itens individuais
// ConverterJSON — estrutura em JSON
// ExtrairDeArquivo — CSV/XLSX/JSON → dados
// ConverterParaArquivo — dados → CSV/PDF
```

---

### ∇ Filtro
*group: 'filtro' | outputs: ['main']*

```typescript
{
  displayName: 'Filtro',
  name: 'filtro',
  icon: 'phosphor:funnel',
  group: ['filtro'],
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
      options: [
        { name: 'E (todas)', value: 'AND' },
        { name: 'OU (qualquer)', value: 'OR' },
      ],
      default: 'AND',
    },
  ],
}
```

---

### ▣ Memória
*group: 'memoria'*

```typescript
{
  displayName: 'Memória',
  name: 'memoria',
  icon: 'phosphor:database',
  group: ['memoria'],
  properties: [
    {
      displayName: 'Operação',
      name: 'operacao',
      type: 'options',
      options: [
        { name: 'Armazenar', value: 'set' },
        { name: 'Recuperar', value: 'get' },
        { name: 'Deletar', value: 'delete' },
      ],
      default: 'set',
    },
    {
      displayName: 'Chave',
      name: 'chave',
      type: 'string',
      default: '',
      description: 'Identificador único do dado. Ex: lead_{{ $json.id }}',
    },
    {
      displayName: 'Valor',
      name: 'valor',
      type: 'json',
      default: '{}',
      displayOptions: { show: { operacao: ['set'] } },
    },
    {
      displayName: 'Expirar em (horas)',
      name: 'expirar',
      type: 'number',
      default: 0,
      description: '0 = nunca expira',
      displayOptions: { show: { operacao: ['set'] } },
    },
  ],
}
```

---

### ✎ Script
*group: 'script'*

```typescript
{
  displayName: 'Script',
  name: 'script',
  icon: 'phosphor:code',
  group: ['script'],
  properties: [
    {
      displayName: 'Linguagem',
      name: 'linguagem',
      type: 'options',
      options: [
        { name: 'JavaScript', value: 'js' },
        { name: 'TypeScript', value: 'ts' },
      ],
      default: 'js',
    },
    {
      displayName: 'Código',
      name: 'codigo',
      type: 'string',
      typeOptions: {
        editor: 'code',
        editorLanguage: '={{ $parameter.linguagem }}',
        rows: 10,
      },
      default: `// Acesse os dados com: $input.all()
// Retorne: return items.map(i => ({ json: i.json }))
const items = $input.all();
return items;`,
    },
  ],
}
```

---

### ⊕ Junção
*group: 'juncao' | inputs: ['main', 'main']*

```typescript
{
  displayName: 'Junção',
  name: 'juncao',
  icon: 'phosphor:git-merge',
  group: ['juncao'],
  inputs: ['main', 'main'],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Modo',
      name: 'modo',
      type: 'options',
      options: [
        { name: 'Aguardar todos', value: 'aguardarTodos' },
        { name: 'Primeiro que chegar', value: 'primeiroChegar' },
        { name: 'Mesclar por campo', value: 'mesclar' },
      ],
      default: 'aguardarTodos',
    },
  ],
}
```

---

### ⚠ Alerta
*group: 'alerta'*

```typescript
{
  displayName: 'Alerta',
  name: 'alerta',
  icon: 'phosphor:warning',
  group: ['alerta'],
  color: '#FF6B6B',
  properties: [
    {
      displayName: 'Mensagem de Erro',
      name: 'mensagem',
      type: 'string',
      default: 'Erro no fluxo: {{ $json.motivo }}',
    },
    {
      displayName: 'Notificar Administrador',
      name: 'notificarAdmin',
      type: 'boolean',
      default: true,
    },
  ],
}
```

---

### ❧ Sub-fluxo
*group: 'subfluxo'*

```typescript
{
  displayName: 'Sub-fluxo',
  name: 'subfluxo',
  icon: 'phosphor:tree-structure',
  group: ['subfluxo'],
  properties: [
    {
      displayName: 'Fluxo',
      name: 'fluxoId',
      type: 'resourceLocator',
      default: { mode: 'list', value: '' },
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
}
```

---

### ✐ Registro
*group: 'registro'*

```typescript
{
  displayName: 'Registro',
  name: 'registro',
  icon: 'phosphor:clipboard-text',
  group: ['registro'],
  properties: [
    {
      displayName: 'Nível',
      name: 'nivel',
      type: 'options',
      options: [
        { name: 'Info', value: 'info' },
        { name: 'Sucesso', value: 'sucesso' },
        { name: 'Aviso', value: 'aviso' },
        { name: 'Erro', value: 'erro' },
      ],
      default: 'info',
    },
    {
      displayName: 'Mensagem',
      name: 'mensagem',
      type: 'string',
      default: '',
    },
    {
      displayName: 'Dados Extras',
      name: 'dados',
      type: 'json',
      default: '={{ $json }}',
    },
  ],
}
```

---

## Conceitos Essenciais

| Conceito          | O que é no Zenite Flow                                           |
|-------------------|------------------------------------------------------------------|
| `inputs/outputs`  | Entradas e saídas do nó no canvas (connectors)                   |
| `properties`      | Campos configuráveis no painel lateral do editor                 |
| `execute()`       | Lógica que roda quando o fluxo passa pelo nó                     |
| `credentials`     | Autenticação — sempre via Supabase Secrets                       |
| `webhook`         | Se o nó pode receber dados externos via HTTP (Portais e Gatilhos)|
| `outputNames`     | Labels das saídas (ex: 'Aprovado' / 'Reprovado')                 |
| `displayOptions`  | Mostra/esconde campos condicionalmente                           |
| `iconColor`       | `'gradient-rainbow'` exclusivo para nós Turing                   |

---

## Status de Execução

| Status técnico | Zenite Flow UI | Cor       | Ícone Phosphor    |
|----------------|----------------|-----------|-------------------|
| `running`      | Executando     | #07ABDE   | CircleNotch (spin)|
| `success`      | Concluído      | #3CCEA7   | CheckCircle       |
| `error`        | Falhou         | #FF6B6B   | XCircle           |
| `waiting`      | Aguardando     | #F5A623   | HourglassSimple   |
| `skipped`      | Ignorado       | #9B9BAD   | MinusCircle       |
| `cancelled`    | Cancelado      | #9B9BAD   | ProhibitInset     |

---

## Registrando um Nó no Zenite Flow

```typescript
// zenite-flow/packages/nodes/index.ts
import { ObjetoCriado } from './gatilhos/ObjetoCriado.node';
import { CRM } from './suite/CRM.node';
import { Turing } from './turing/Turing.node';
import { Bifurcacao } from './fluxo/Bifurcacao.node';
import { Gmail } from './workspace/Gmail.node';

export const ZeniteNodes = [
  ObjetoCriado,
  CRM,
  Turing,
  Bifurcacao,
  Gmail,
  // ... demais nós
];
```

---

## Compatibilidade com n8n (Fase 2)

Quando o n8n for integrado como motor de integrações externas, o mapeamento é direto:

```
Zenite Flow Nó    →    n8n Equivalente
─────────────────────────────────────
Gatilho           →    Trigger Node
Passo             →    Action Node
Bifurcação        →    If Node
Rota              →    Switch Node
Repetição         →    Split in Batches
Pausa             →    Wait Node
Junção            →    Merge Node
Filtro            →    Filter Node
Conector          →    HTTP Request
Portal            →    Webhook Node
Script            →    Code Node
Aprovação         →    Human in the Loop
Turing            →    AI Agent (Gemini/Anthropic)
Memória           →    Data Store Node
Sub-fluxo         →    Execute Sub-workflow
Alerta            →    Stop and Error
Registro          →    (custom log node)
```

O Zenite Flow pode passar execuções para o n8n via **Conector** (HTTP Request) apontando para a API do n8n, sem alterar a estrutura dos fluxos existentes.