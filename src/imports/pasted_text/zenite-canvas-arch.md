# Zenite Flow — Arquitetura do Canvas
> Adaptação da arquitetura n8n para o Zenite Flow
> Design System Zenite | HTZ Agency

---

## Visão Geral das Camadas

```
┌─────────────────────────────────────────────────────┐
│  1. BARRA SUPERIOR (Header)                         │
├──────────┬──────────────────────────────────────────┤
│          │  2. CANVAS (área principal)               │
│ 3. RAIL  │  ┌──────────┐   ┌──────────┐            │
│ +        │  │ Gatilho  │──▶│  Passo   │──▶  ...    │
│ PAINEL   │  └──────────┘   └──────────┘            │
│          │                                           │
├──────────┴──────────────────────────────────────────┤
│  4. BARRA INFERIOR (toolbar + botão executar)       │
├─────────────────────────────────────────────────────┤
│  5. PAINEL DIREITO (config do nó / Turing)          │
└─────────────────────────────────────────────────────┘
```

---

## 1. BARRA SUPERIOR

### Componentes (esquerda → direita)

```
[Logo Zenite] [GitBranch] Fluxos > Nome do Fluxo ✎  [+ Tag]  |  [Editor] [Execuções] [Modelos]  |  [Histórico 🕐] [⋯]  [Salvar]  [● Ativar ▾]
```

| Elemento | Comportamento | Zenite Flow |
|----------|---------------|-------------|
| Breadcrumb | Navegável: Fluxos > Nome | Clique em "Fluxos" volta para lista |
| Nome do fluxo | `contenteditable`, edição inline | Salva ao perder foco ou `Enter` |
| `+ Tag` | Adiciona etiqueta colorida | Tags: CRM, Projects, Turing, etc. |
| Tab **Editor** | Canvas de edição | Ativo por padrão |
| Tab **Execuções** | Histórico de runs | Abre `flow_run_history` |
| Tab **Modelos** | Salvar como template | Abre modal de export |
| Ícone `🕐` Histórico | Versões salvas do fluxo | Rollback para versão anterior |
| Ícone `⋯` Menu | Contexto do fluxo | Renomear, duplicar, exportar JSON, excluir |
| Botão **Salvar** | `outline` azul-berry | Salva sem ativar |
| Botão **Ativar `▾`** | Toggle verde quando ativo | `▾` abre: Ativar / Desativar / Publicar como Modelo |

### Estados do botão Ativar

```
● Inativo   → bg: #F6F7F9  texto: #4A4A6A  borda: #EBEBF5
● Ativando  → spinner + "Ativando..."
● Ativo     → bg: #3CCEA7  texto: #fff     ícone: CheckCircle
● Erro      → bg: #FFE8E8  texto: #FF6B6B  ícone: Warning
```

---

## 2. CANVAS — Área Principal

### Fundo (Background)

```
Cor base: #F6F7F9
Grid de pontos: cor #D8D8E8, espaçamento 24px, tamanho 1.5px
Infinito em todas as direções (pan + zoom)
Zoom: 25% mín → 200% máx
```

### Implementação técnica recomendada

```typescript
// Usar React Flow (mesma base do n8n Vue Flow)
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from 'reactflow';

// Tipos de nós customizados Zenite
const nodeTypes = {
  gatilho:    GatilhoNode,
  passo:      PassoNode,
  bifurcacao: BifurcacaoNode,
  rota:       RotaNode,
  repeticao:  RepeticaoNode,
  pausa:      PausaNode,
  juncao:     JuncaoNode,
  filtro:     FiltroNode,
  conector:   ConectorNode,
  portal:     PortalNode,
  script:     ScriptNode,
  aprovacao:  AprovacaoNode,
  turing:     TuringNode,
  memoria:    MemoriaNode,
  molde:      MoldeNode,
  alerta:     AlertaNode,
  subfluxo:   SubfluxoNode,
  registro:   RegistroNode,
  nota:       NotaNode,         // Sticky note
};

// Tipos de arestas customizadas
const edgeTypes = {
  zenite: ZeniteEdge,           // Aresta padrão com bezier suave
  condicional: CondicionalEdge, // Aresta com label (Verdadeiro/Falso)
};
```

---

## 3. NÓS (equivalente aos Nodes do n8n)

### Anatomia de um Nó

```
        ● ←── ENTRADA (handle esquerdo)
        │
┌───────┴──────────────────────────┐
│  ┌─────────────────────────────┐ │
│  │   [ÍCONE PHOSPHOR 24px]    │ │  ← Corpo do nó
│  │   bg: cor da categoria     │ │
│  └─────────────────────────────┘ │
│                                  │
│  [badge de status se executando] │
└──────────────────────────────────┘
        │    │
        ●    ●  ←── SAÍDAS (handles direitos, múltiplos)

  Nome do Nó                        ← label principal (abaixo)
  Subtítulo / operação              ← label secundário (menor, neutro)
```

### Dimensões e espaçamento

```
Largura do card:  72px (apenas ícone, estilo compacto)
ou               240px (card expandido com nome e preview de config)
Altura:           72px compacto | auto expandido
Border radius:    16px
Padding interno:  16px
Gap entre nós:    80px horizontal | 60px vertical (sugestão ao auto-layout)
```

### Cores por categoria

| Tipo de Nó | Ícone Phosphor | Cor fundo ícone | Cor borda selecionado |
|------------|---------------|-----------------|----------------------|
| Gatilho | Lightning | #3CCEA7 | #3CCEA7 |
| Passo (Suite) | Play | #6868B1 | #6868B1 |
| Passo (Google) | Buildings | #4285F4 | #4285F4 |
| Passo (WhatsApp) | WhatsappLogo | #25D366 | #25D366 |
| Bifurcação | GitBranch | #6868B1 | #6868B1 |
| Rota | ArrowsSplit | #6868B1 | #6868B1 |
| Repetição | ArrowsClockwise | #6868B1 | #6868B1 |
| Pausa | HourglassSimple | #9B9BAD | #9B9BAD |
| Junção | GitMerge | #6868B1 | #6868B1 |
| Filtro | Funnel | #F5A623 | #F5A623 |
| Conector | Plugs | #9B9BAD | #9B9BAD |
| Portal | DoorOpen | #3CCEA7 | #3CCEA7 |
| Script | Code | #9B9BAD | #9B9BAD |
| Aprovação | UserCheck | #07ABDE | #07ABDE |
| **Turing** | **Atom** | **gradiente rainbow** | **gradiente animado** |
| Memória | Database | #9B9BAD | #9B9BAD |
| Molde | Shapes | #F5A623 | #F5A623 |
| Alerta | Warning | #FF6B6B | #FF6B6B |
| Sub-fluxo | TreeStructure | #6868B1 | #6868B1 |
| Registro | ClipboardText | #9B9BAD | #9B9BAD |
| Nota | Note | #FEF4E3 | #F5A623 |

### Estados visuais de um nó

```
Normal
  bg: #FFFFFF
  borda: 1.5px solid #EBEBF5
  sombra: 0 2px 8px rgba(0,0,0,0.06)

Hover
  borda: 1.5px solid [cor da categoria]
  sombra: 0 4px 16px rgba(0,0,0,0.12)
  mini-toolbar aparece acima

Selecionado
  borda: 2px solid [cor da categoria]
  sombra: 0 0 0 4px [cor da categoria + 20% opacidade]

Executando
  borda: 2px solid #07ABDE (animada, pulsando)
  badge spinner azul no canto superior direito

Concluído (run recente)
  badge ✓ verde no canto inferior direito
  dura 3s e some com fade

Erro
  borda: 2px solid #FF6B6B
  badge ⚠ vermelho no canto inferior direito
  clique no badge → abre painel de erro

Desativado
  opacidade: 0.4
  borda: 1.5px dashed #EBEBF5
  label "(desativado)" abaixo do nome

Gatilho (identificação)
  ícone Lightning pequeno ⚡ à esquerda do card
  cor: #3CCEA7
```

### Nó especial: Turing

```
Borda: 2px com gradiente animado
  linear-gradient(135deg, #8C8CD4, #07ABDE, #3CCEA7)
  background-size: 200% 200%
  animation: gradientShift 3s ease infinite

Ícone Atom com brilho sutil (box-shadow colorida)
Badge "IA" no canto superior direito em gradiente
Executando: partículas animadas saindo do ícone
```

### Nó especial: Nota (Sticky Note)

```
Sem handles de entrada/saída (não conectável)
Cor customizável: amarelo (#FEF4E3), azul (#E8E8FD), verde (#E0FBF4), vermelho (#FFE8E8)
Texto editável inline (contenteditable)
Redimensionável via corner handle
Font: DM Sans 13px | cor: #4A4A6A
Border radius: 8px
Sombra: 0 2px 8px rgba(245,166,35,0.15)
```

---

## 4. MINI TOOLBAR (ao hover/selecionar um nó)

Aparece **acima** do nó centralizada, com gap de 8px:

```
┌────────────────────────────────────────────┐
│  [▶ Executar]  [⏻ Des/Ativar]  [🗑 Excluir]  [⋯ Mais]  │
└────────────────────────────────────────────┘
                     ↕ 8px
              ┌──────────────┐
              │     NÓ       │
              └──────────────┘
```

| Botão | Ícone Phosphor | Ação |
|-------|---------------|------|
| **Executar** | Play | Executa só este nó com dados do run anterior |
| **Des/Ativar** | Power | Desabilita sem excluir (is_disabled toggle) |
| **Excluir** | Trash | Remove nó + conexões (com confirmação se tiver run) |
| **⋯ Mais** | DotsThree | Dropdown: Renomear, Duplicar, Copiar, Adicionar Nota, Ver logs |

### Estilo da mini toolbar

```css
background: #1A1A2E;
border-radius: 8px;
padding: 6px 8px;
gap: 4px;
box-shadow: 0 4px 16px rgba(0,0,0,0.24);

/* Botões */
color: #FFFFFF;
width: 28px; height: 28px;
border-radius: 6px;
hover: background rgba(255,255,255,0.1);

/* Excluir — vermelho no hover */
hover.excluir: background rgba(255,107,107,0.2); color: #FF6B6B;
```

---

## 5. HANDLES (Conectores/Ports)

### Tipos de handle

```
ENTRADA (Input Handle)
  Posição: lado esquerdo, centro vertical
  Forma: círculo ●
  Tamanho: 10px × 10px
  Cor normal: #EBEBF5 com borda #9B9BAD
  Cor hover/conectando: [cor da categoria do nó]

SAÍDA (Output Handle)
  Posição: lado direito
  Para nós com 1 saída: centro vertical
  Para nós com 2 saídas (bifurcação): superior e inferior
  Para nós com N saídas (rota): distribuídas verticalmente
  Cor: mesma lógica do input

HANDLE ESPECIAL — Turing Tools
  Posição: lado inferior, centro
  Forma: losango ◇
  Uso: conectar ferramentas/sub-agentes ao Turing
  Cor: gradiente rainbow
```

### Comportamento de drag de handle

```
1. Usuário começa a arrastar um handle de saída
   → cursor muda para crosshair
   → aresta "fantasma" aparece seguindo o cursor (tracejada, cor da categoria)

2. Sobre outro nó compatível
   → handle de entrada ilumina (cor da categoria)
   → tooltip "Conectar aqui"

3. Soltar em área vazia do canvas
   → abre o Seletor de Nós ancorado naquela posição
   → ao escolher novo nó: cria nó + conexão automaticamente

4. Soltar sobre handle incompatível
   → shake animation + tooltip "Não compatível"
   → ex: saída de Gatilho não conecta em outro Gatilho
```

---

## 6. ARESTAS (Conexões entre nós)

### Estilo padrão

```css
/* Aresta Zenite */
stroke: #C8C8E0;
stroke-width: 2px;
fill: none;
stroke-linecap: round;
border-radius: bezier suave (curvatura 60px)

/* Hover */
stroke: #6868B1;
stroke-width: 2.5px;
cursor: pointer; /* clique seleciona a aresta */

/* Selecionada */
stroke: #6868B1;
stroke-dasharray: none;

/* Executando (animação de fluxo) */
stroke: #3CCEA7;
animation: flowPulse 1.2s linear infinite;
/* traço percorre da origem ao destino */
```

### Tipos de aresta

```
PADRÃO (saída única)
  Linha bezier suave, sem label

CONDICIONAL (bifurcação/rota)
  Badge no meio da aresta com label
  Ex: "Verdadeiro"  bg: #E0FBF4  texto: #3CCEA7
      "Falso"       bg: #FFE8E8  texto: #FF6B6B
      "Alta Prio"   bg: #E8E8FD  texto: #6868B1
      "Rota A"      bg: #F6F7F9  texto: #4A4A6A

LOOP (repetição)
  Aresta com seta circular, levemente curva para cima

TURING TOOL (losango → nó)
  Linha pontilhada com gradiente rainbow
  Indica sub-ferramenta/agente vinculado
```

### Seta (arrow)

```
Tipo: filled arrow (▶)
Tamanho: 8px
Posição: no target (ponta da aresta)
Cor: herda da aresta
```

---

## 7. SELETOR DE NÓS (Node Picker)

Abre ao:
- Soltar aresta em área vazia
- Clicar `+` na barra inferior
- Atalho `Tab` com canvas focado

### Layout

```
┌─────────────────────────────────────────┐
│  🔍  Buscar nós...                       │
├─────────────────────────────────────────┤
│  RECENTES                               │
│  [Passo CRM]  [Turing]  [Gmail]         │
├─────────────────────────────────────────┤
│  CATEGORIAS                             │
│  ⚡ Gatilhos      ▶ Passos — Suite      │
│  ⑂ Bifurcação    🔗 Passos — Google    │
│  ◎ Turing         ⌥ Rota               │
│  ↻ Repetição      ✓ Aprovação          │
│  ⏳ Pausa          ∇ Filtro             │
│  ☍ Conector       ◈ Portal             │
│  ▣ Memória        ◧ Molde              │
│  ✎ Script         ⊕ Junção             │
│  ⚠ Alerta         ❧ Sub-fluxo         │
│  ✐ Registro       📝 Nota              │
└─────────────────────────────────────────┘
```

### Estilo

```css
/* Container */
background: #FFFFFF;
border: 1px solid #EBEBF5;
border-radius: 12px;
box-shadow: 0 8px 32px rgba(0,0,0,0.16);
width: 320px;
max-height: 480px;
overflow-y: auto;

/* Input de busca */
background: #F6F7F9;
border: none;
border-radius: 8px;
padding: 10px 12px;
font: DM Sans 13px;

/* Item de nó */
padding: 10px 12px;
border-radius: 8px;
gap: 10px;
hover: background #F6F7F9;

/* Ícone do nó no picker */
width: 32px; height: 32px;
border-radius: 8px;
background: [cor da categoria];
```

---

## 8. BARRA INFERIOR (Toolbar)

```
[+ Adicionar Nó]  [Auto-layout]  |  [Zoom -]  [75%]  [Zoom +]  [Fit]  |  [Mini-mapa]  [⋯]  |  [▶ Executar Fluxo]
```

| Elemento | Ícone | Função |
|----------|-------|--------|
| **+ Adicionar Nó** | Plus | Abre Seletor de Nós no centro do canvas |
| **Auto-layout** | TreeStructure | Reorganiza nós automaticamente (esquerda → direita) |
| **Zoom -/+** | MagnifyingGlass | Zoom incremental (10% por clique) |
| **Percentual** | — | Clique → reseta para 100% |
| **Fit** | CornersOut | Ajusta zoom para caber todos os nós |
| **Mini-mapa** | MapTrifold | Toggle do mini-mapa (canto inferior direito) |
| **⋯** | DotsThree | Mais: Selecionar tudo, Copiar, Colar, Limpar canvas |
| **▶ Executar Fluxo** | PlayCircle | Executa o fluxo completo com dados reais |

### Botão Executar Fluxo

```
Estado normal:
  bg: #3CCEA7  texto: #fff  ícone: PlayCircle
  "Executar Fluxo"

Executando:
  bg: #07ABDE  spinner  "Executando..."

Concluído:
  bg: #3CCEA7  ícone: CheckCircle  "Concluído" (3s)

Erro:
  bg: #FF6B6B  ícone: Warning  "Falhou — Ver logs"
```

---

## 9. PAINEL DIREITO (Configuração do Nó)

Abre ao clicar em qualquer nó. Largura: 380px. Slide-in da direita.

### Header do painel

```
┌─────────────────────────────────────────┐
│ [ícone 32px]  Nome do Nó          [×]  │
│               Tipo: Passo · CRM         │
├─────────────────────────────────────────┤
│ [Configuração] [Entrada] [Saída] [Logs] │
└─────────────────────────────────────────┘
```

### Aba Configuração

Renderiza os `properties` do nó dinamicamente:

```
Cada propriedade vira um campo:
  string      → <input type="text">
  number      → <input type="number">
  boolean     → <toggle>
  options     → <select> ou botões pill
  json        → editor Monaco (syntax highlight)
  filter      → construtor visual de condições
  dateTime    → date picker
  resourceLocator → busca com dropdown
  collection  → accordion expansível
  fixedCollection → lista com + Adicionar item
```

Expressões dinâmicas:
```
Campos aceitam {{ }} para referenciar dados de nós anteriores
Ex: {{ $steps['Nome do Nó'].output.campo }}
    {{ $json.email }}
    {{ $now | date: 'DD/MM/YYYY' }}

Ao digitar {{ → autocomplete com:
  - Campos disponíveis do nó anterior
  - Variáveis globais do fluxo ($env)
  - Funções de data/texto disponíveis
```

### Aba Entrada

Preview dos dados que entraram no nó:
```
[Tabela] [JSON]  ← toggle de visualização

Tabela: campo | valor (até 20 linhas preview)
JSON: editor readonly com syntax highlight
```

### Aba Saída

Preview dos dados que saíram do nó (após execução):
```
[Tabela] [JSON]  [Itens: 3]

Mostra resultado real do último run
```

### Aba Logs

```
Timestamp    Status      Duração    Run ID
14:32:01     ✓ Sucesso   320ms      run-uuid
14:28:44     ⚠ Erro      102ms      run-uuid  ← clicável, expande detalhes
14:15:09     ✓ Sucesso   280ms      run-uuid
```

### Painel especial: Turing

Quando o nó Turing está selecionado, o painel direito vira um **mini-chat**:

```
┌─────────────────────────────────────────┐
│ ◎ Turing                           [×] │
│ Agente IA · Zenite Flow                 │
├─────────────────────────────────────────┤
│ [Configuração] [Testar] [Logs]          │
├─────────────────────────────────────────┤
│                                         │
│  Operação: Analisar Score do Lead  ▾    │
│  Instrução customizada:                 │
│  ┌─────────────────────────────────┐   │
│  │ Analise e retorne score 0-100   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ─── Testar com dados reais ──────      │
│  [▶ Testar agora]                       │
│                                         │
│  Resultado:                             │
│  { "score": 82, "motivo": "..." }       │
└─────────────────────────────────────────┘
```

---

## 10. MINI-MAPA

Canto inferior direito do canvas:

```
┌──────────────────┐
│ ··  ■ ■  ·  ■   │  ← representação miniatura dos nós
│ ·   ·    ■  ·   │
│ ·   ·    ·  ·   │
└──────────────────┘

Largura: 160px | Altura: 100px
Nó: 6px × 4px, cor da categoria
Viewport: retângulo semitransparente arrastável
bg: #1A1A2E com opacidade 90%
border-radius: 8px
```

---

## 11. ATALHOS DE TECLADO

| Ação | Atalho |
|------|--------|
| Selecionar tudo | `Cmd/Ctrl + A` |
| Copiar nós | `Cmd/Ctrl + C` |
| Colar nós | `Cmd/Ctrl + V` |
| Duplicar | `Cmd/Ctrl + D` |
| Excluir selecionado | `Delete` ou `Backspace` |
| Desfazer | `Cmd/Ctrl + Z` |
| Refazer | `Cmd/Ctrl + Shift + Z` |
| Salvar | `Cmd/Ctrl + S` |
| Executar fluxo | `Cmd/Ctrl + Enter` |
| Adicionar nó | `Tab` |
| Fit canvas | `Cmd/Ctrl + Shift + H` |
| Zoom in/out | `Cmd/Ctrl + scroll` |
| Pan canvas | `Space + drag` |
| Fechar painel | `Escape` |

---

## 12. INTERAÇÕES AVANÇADAS

### Seleção múltipla

```
Arrastar em área vazia → cria caixa de seleção (lasso)
Shift + clique → adiciona à seleção
Cmd/Ctrl + clique → toggle de seleção
Nós selecionados: bordas destacadas + podem ser movidos juntos
```

### Copy/Paste

```
Copiar nós selecionados → clipboard JSON com steps + connections
Colar → cria nós com offset de 20px (evita sobreposição)
Colar em outro fluxo → mantém estrutura, perde credenciais vinculadas
```

### Auto-layout

```
Algoritmo: Dagre (esquerda → direita)
Espaçamento horizontal: 120px entre nós
Espaçamento vertical: 80px entre linhas
Gatilhos sempre na coluna mais à esquerda
Animação suave (300ms ease-out) ao reorganizar
```

### Zoom semântico

```
> 75%: card completo com nome + subtítulo
50-75%: card compacto (só ícone + nome)
< 50%: mini card (só ícone, sem texto)
```

### Drag & Drop de nó novo

```
Arrastar da biblioteca (painel esquerdo) → soltar no canvas
Soltar sobre aresta existente → inserir nó no meio da conexão
```

---

## 13. EXECUÇÃO VISUAL EM TEMPO REAL

Quando o fluxo está rodando:

```
1. Nó ativo: borda pulsando (azul #07ABDE)
2. Aresta ativa: traço animado percorre da origem ao destino (verde #3CCEA7)
3. Nó concluído: badge ✓ verde por 3s
4. Nó com erro: badge ⚠ vermelho permanente (até novo run)
5. Progresso no header: "Executando passo 3 de 7..."

Ao clicar em nó durante execução:
  → painel direito mostra dados em tempo real (streaming)
  → JSON de entrada/saída vai aparecendo progressivamente
```

---

## 14. EQUIVALÊNCIA COMPLETA n8n → Zenite Flow

| n8n | Zenite Flow |
|-----|-------------|
| Workflow | Fluxo |
| Node | Nó |
| Trigger | Gatilho |
| Action | Passo |
| If | Bifurcação |
| Switch | Rota |
| Split in Batches | Repetição |
| Wait | Pausa |
| Merge | Junção |
| Filter | Filtro |
| HTTP Request | Conector |
| Webhook | Portal |
| Code | Script |
| Human in the Loop | Aprovação |
| AI Agent | Turing |
| Data Store | Memória |
| Set/Edit Fields | Molde |
| Stop and Error | Alerta |
| Execute Sub-workflow | Sub-fluxo |
| Sticky Note | Nota |
| Input Handle | Entrada |
| Output Handle | Saída |
| Edge | Aresta |
| Handle/Port | Conector |
| Node Picker | Seletor de Nós |
| Mini Toolbar | Mini Toolbar |
| Executions | Execuções |
| Run | Execução |
| Canvas | Canvas |
| Breadcrumb | Breadcrumb |
| Publish | Ativar |
| Unpublish | Desativar |
| Save | Salvar |
| Test | Testar |

---

> **Stack recomendada:** React Flow + Dagre (auto-layout) + Monaco Editor (campos JSON/Script)  
> **Compatível com:** Supabase Realtime (execução em tempo real via websocket)  
> **Futura integração n8n:** Conector aponta para API do n8n → zero mudanças no canvas