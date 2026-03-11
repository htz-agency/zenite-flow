# Zenite Flow — Arquitetura de Nós Implementada

## 📋 Visão Geral

Implementação completa da arquitetura de nós do Zenite Flow baseada no padrão n8n, adaptada com a terminologia e design system da Zenite Cloud.

## 🗂️ Estrutura de Arquivos

```
/src/app/
├── types/
│   └── node-types.ts              # Tipos TypeScript completos
├── data/
│   ├── node-catalog.ts            # Catálogo de 30+ nós disponíveis
│   └── mockData.ts                # Dados mock existentes
├── components/
│   └── flow/
│       ├── flow-node.tsx          # Componente visual de nó (atualizado)
│       ├── node-library.tsx       # Biblioteca de nós (novo)
│       └── property-panel.tsx     # Painel de propriedades (novo)
└── pages/
    ├── FlowEditor.tsx             # Editor original (mantido)
    └── FlowEditorV2.tsx           # Editor com nova arquitetura (novo)
```

## 🎯 Componentes Principais

### 1. Sistema de Tipos (`/src/app/types/node-types.ts`)

Define toda a estrutura de dados:

- **ZeniteNodeGroup**: 18 grupos de nós (gatilho, passo, turing, etc.)
- **ZenitePropertyType**: 12 tipos de campos configuráveis
- **IZeniteNodeDescription**: Interface completa de descrição de nó
- **FlowNodeInstance**: Instância de nó no canvas
- **ExecutionStatus**: 6 status de execução

### 2. Catálogo de Nós (`/src/app/data/node-catalog.ts`)

**30+ nós organizados em categorias:**

#### ⚡ Gatilhos (5 nós)
- Objeto Criado
- Objeto Atualizado
- Objeto Mudou de Fase
- Agendamento (Schedule)
- Portal (Webhook)

#### ▶ Passos/Ações (4 nós principais)
- CRM (8 operações)
- Projects (7 operações)
- Gmail (5 operações)
- WhatsApp (3 operações)

#### ◎ Turing IA (1 nó, 11 operações)
- Análise (score, sentimento, intenção)
- Geração (resumo, resposta, relatório)
- Decisão (próximo passo, classificação)
- Memória (contexto, histórico)

#### 🔀 Controle de Fluxo (7 nós)
- Bifurcação (If/Else)
- Rota (Switch)
- Repetição (Loop)
- Pausa (Wait)
- Junção (Merge)
- Filtro
- Aprovação (Human in the Loop)

#### 🛠️ Utilidades (8 nós)
- Conector (HTTP Request)
- Script (JavaScript/TypeScript)
- Memória (Data Store)
- Molde (Transform)
- Alerta (Error)
- Sub-fluxo
- Registro (Log)

### 3. Componentes Visuais

#### FlowNode (`flow-node.tsx`)
- Suporta todos os 18 grupos de nós
- Cores específicas por grupo
- Gradiente animado para Turing
- Bordas diferenciadas (gatilhos, alertas)
- Conexões input/output corretas
- Labels personalizados por tipo

#### NodeLibrary (`node-library.tsx`)
- Busca e filtro de nós
- Categorização visual
- Preview de descrição
- Drag-and-drop ready (futuro)

#### PropertyPanel (`property-panel.tsx`)
- Renderização de 10 tipos de campos
- DisplayOptions (show/hide condicional)
- Validação de valores
- Interface limpa e responsiva

### 4. Editor V2 (`FlowEditorV2.tsx`)

**Features implementadas:**
- ✅ Sidebar esquerda com biblioteca de nós
- ✅ Sidebar direita com painel de propriedades
- ✅ Canvas com grid e zoom
- ✅ Conexões visuais entre nós
- ✅ Estado completo de fluxo
- ✅ Toggle de sidebars
- ✅ Seleção e edição de nós
- ✅ Remoção de nós

**Estado inicial demonstrativo:**
- Gatilho: Objeto Mudou de Fase
- Ação: Criar Projeto
- IA: Turing Score
- Ramificação: Gmail (alta prioridade) / WhatsApp (baixa prioridade)

## 🎨 Design System

### Cores por Grupo

```typescript
gatilho:    #3CCEA7  (Green Mint)
passo:      #6868B1  (Blue Berry)
bifurcacao: #6868B1  (Blue Berry)
pausa:      #9B9BAD  (Gray)
filtro:     #F5A623  (Orange)
aprovacao:  #07ABDE  (Cyan)
turing:     gradient (Rainbow animado)
alerta:     #FF6B6B  (Red Cherry)
```

### Ícones Phosphor

Todos os nós usam ícones da biblioteca Phosphor:
- Lightning (Gatilho)
- Play (Passo)
- Atom (Turing)
- GitBranch (Bifurcação)
- Funnel (Filtro)
- UserCheck (Aprovação)
- Warning (Alerta)
- etc.

## 🔧 Tipos de Propriedades Suportados

1. **string** - Campo de texto
2. **number** - Campo numérico
3. **boolean** - Checkbox
4. **options** - Dropdown
5. **multiOptions** - Multi-select
6. **json** - Editor JSON
7. **filter** - Construtor de condições
8. **color** - Color picker
9. **dateTime** - Date/time picker
10. **collection** - Grupo de campos
11. **fixedCollection** - Lista repetível
12. **resourceLocator** - Busca de recurso

## 📊 Status de Execução

```typescript
running:   #07ABDE  CircleNotch
success:   #3CCEA7  CheckCircle
error:     #FF6B6B  XCircle
waiting:   #F5A623  HourglassSimple
skipped:   #9B9BAD  MinusCircle
cancelled: #9B9BAD  ProhibitInset
```

## 🚀 Próximos Passos

### Fase 1 - Melhorias Imediatas
- [ ] Drag and drop de nós da biblioteca
- [ ] Arraste de nós no canvas
- [ ] Criação visual de conexões
- [ ] Desfazer/Refazer (undo/redo)
- [ ] Validação de propriedades obrigatórias

### Fase 2 - Features Avançadas
- [ ] Construtor visual de filtros/condições
- [ ] Editor de código (Script node)
- [ ] Teste de execução de nós individuais
- [ ] Histórico de versões do fluxo
- [ ] Exportar/Importar fluxos (JSON)

### Fase 3 - Integração Backend
- [ ] Persistência no Supabase
- [ ] Execução real de fluxos
- [ ] Logs e debugging
- [ ] Credenciais seguras (Supabase Secrets)
- [ ] Webhooks funcionais

### Fase 4 - Integrações Externas
- [ ] n8n como motor de execução
- [ ] Google Workspace real
- [ ] WhatsApp Business API
- [ ] Zenite Suite APIs

## 📚 Referências

- Documentação original: `/src/imports/pasted_text/zenite-flow-docs.md`
- Design System Zenite: cores, tipografia DM Sans, ícones Phosphor
- Inspiração: n8n, Zapier, Make.com

## 💡 Diferencial Zenite Flow

1. **Terminologia própria**: Gatilho (não Trigger), Passo (não Action), Turing (não AI)
2. **Design coeso**: Cores e ícones do ecossistema Zenite
3. **Turing IA nativo**: Gradiente animado rainbow, operações específicas
4. **Suite integrada**: CRM, Projects, Dash, Sync nativamente
5. **Aprovação humana**: Human in the Loop com múltiplos canais

---

**Status**: ✅ Arquitetura completa implementada  
**Próximo passo**: Testar no browser e implementar drag-and-drop
