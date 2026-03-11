import { useState, useRef } from "react";
import { Link, useParams } from "react-router";
import {
  GitBranch,
  Star,
  Minus,
  Plus,
  FloppyDisk,
  ToggleRight,
  ToggleLeft,
  ArrowsOut,
  Export,
  Link as LinkIcon,
  ClockCounterClockwise,
  X,
  List,
  Sliders,
} from "@phosphor-icons/react";
import { mockFlows } from "../data/mockData";
import FlowNode from "../components/flow/flow-node";
import NodeLibrary from "../components/flow/node-library";
import PropertyPanel from "../components/flow/property-panel";
import { IZeniteNodeDescription, FlowNodeInstance } from "../types/node-types";
import { getNodeByName } from "../data/node-catalog";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

function ConnectionLine({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
  const controlPoint1X = from.x + (to.x - from.x) * 0.5;
  const controlPoint1Y = from.y;
  const controlPoint2X = from.x + (to.x - from.x) * 0.5;
  const controlPoint2Y = to.y;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#C8C8E8" />
        </marker>
      </defs>
      <path
        d={`M ${from.x} ${from.y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${to.x} ${to.y}`}
        stroke="#C8C8E8"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        className="hover:stroke-[#6868B1] transition-colors"
      />
    </svg>
  );
}

export function FlowEditorV2() {
  const { id } = useParams();
  const [zoom, setZoom] = useState(100);
  const [isActive, setIsActive] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const flow = mockFlows.find((f) => f.id === id);
  const flowName = flow?.name || "Novo Fluxo";

  // Estado inicial de nós com a nova arquitetura
  const [nodes, setNodes] = useState<FlowNodeInstance[]>([
    {
      id: "node-1",
      type: "gatilho",
      name: "objetoMudouFase",
      displayName: "Objeto Mudou de Fase",
      icon: "ArrowDown",
      color: "#3CCEA7",
      parameters: {
        objeto: "lead",
        faseDestino: "ganho",
      },
      position: { x: 80, y: 180 },
      connections: {
        input: [],
        output: [[{ node: "node-2", input: 0 }]],
      },
    },
    {
      id: "node-2",
      type: "passo",
      name: "projects",
      displayName: "Projects",
      icon: "FolderOpen",
      color: "#6868B1",
      parameters: {
        operacao: "criarProjeto",
        nomeProjeto: "{{ $json.nome }}",
        cliente: "{{ $json.cliente }}",
      },
      position: { x: 420, y: 180 },
      connections: {
        input: [{ node: "node-1", output: 0 }],
        output: [[{ node: "node-3", input: 0 }]],
      },
    },
    {
      id: "node-3",
      type: "turing",
      name: "turing",
      displayName: "Turing",
      icon: "Atom",
      iconColor: "gradient-rainbow",
      color: "gradient",
      parameters: {
        operacao: "scoreLead",
        instrucao: "Analisar a qualidade do lead",
      },
      position: { x: 760, y: 180 },
      connections: {
        input: [{ node: "node-2", output: 0 }],
        output: [
          [{ node: "node-4", input: 0 }],
          [{ node: "node-5", input: 0 }],
        ],
      },
    },
    {
      id: "node-4",
      type: "passo",
      name: "gmail",
      displayName: "Gmail",
      icon: "EnvelopeSimple",
      color: "#6868B1",
      parameters: {
        operacao: "enviar",
        para: "{{ $json.email }}",
        assunto: "Projeto criado com sucesso!",
        corpo: "Olá! Seu projeto foi criado automaticamente.",
      },
      position: { x: 1100, y: 120 },
      connections: {
        input: [{ node: "node-3", output: 0 }],
        output: [],
      },
    },
    {
      id: "node-5",
      type: "passo",
      name: "whatsapp",
      displayName: "WhatsApp",
      icon: "WhatsappLogo",
      color: "#6868B1",
      parameters: {
        operacao: "mensagem",
        numero: "{{ $json.telefone }}",
        mensagem: "Projeto criado! Entre em contato conosco.",
      },
      position: { x: 1100, y: 280 },
      connections: {
        input: [{ node: "node-3", output: 1 }],
        output: [],
      },
    },
  ]);

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;
  const selectedNodeDescription = selectedNode ? getNodeByName(selectedNode.name) : null;

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleFitView = () => setZoom(100);

  const handleNodeSelect = (nodeDesc: IZeniteNodeDescription) => {
    // Criar nova instância do nó
    const newNode: FlowNodeInstance = {
      id: `node-${Date.now()}`,
      type: nodeDesc.group[0],
      name: nodeDesc.name,
      displayName: nodeDesc.displayName,
      icon: nodeDesc.icon,
      iconColor: nodeDesc.iconColor,
      color: nodeDesc.defaults.color,
      parameters: nodeDesc.properties.reduce((acc, prop) => {
        acc[prop.name] = prop.default;
        return acc;
      }, {} as Record<string, any>),
      position: { x: 100, y: 100 + nodes.length * 120 },
      connections: {
        input: [],
        output: nodeDesc.outputs.map(() => []),
      },
    };

    setNodes([...nodes, newNode]);
    setShowLibrary(false);
    setSelectedNodeId(newNode.id);
    setShowProperties(true);
  };

  const handleParameterChange = (name: string, value: any) => {
    if (!selectedNodeId) return;

    setNodes(
      nodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              parameters: {
                ...node.parameters,
                [name]: value,
              },
            }
          : node
      )
    );
  };

  const handleRemoveNode = (nodeId: string) => {
    setNodes(nodes.filter((n) => n.id !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  // Calcular conexões para renderização
  const connectionLines: Array<{ from: { x: number; y: number }; to: { x: number; y: number } }> = [];
  nodes.forEach((node) => {
    node.connections.output.forEach((outputConnections, outputIndex) => {
      outputConnections.forEach((conn) => {
        const targetNode = nodes.find((n) => n.id === conn.node);
        if (targetNode) {
          const fromX = node.position.x + 280 + 8;
          const fromY = node.position.y + 50;
          const toX = targetNode.position.x - 8;
          const toY = targetNode.position.y + 50;

          connectionLines.push({
            from: { x: fromX, y: fromY },
            to: { x: toX, y: toY },
          });
        }
      });
    });
  });

  return (
    <div className="relative h-full flex bg-[#F6F7F9]">
      {/* Sidebar Esquerda - Biblioteca de Nós */}
      <div
        className={`h-full bg-white border-r border-[#EBEBF5] shadow-[2px_0_8px_rgba(0,0,0,0.04)] transition-all ${
          showLibrary ? "w-[320px]" : "w-0 overflow-hidden"
        }`}
      >
        {showLibrary && (
          <NodeLibrary
            onNodeSelect={handleNodeSelect}
            onClose={() => setShowLibrary(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex items-center justify-between px-[24px] py-[12px] bg-white border-b border-[#EBEBF5] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-[16px]">
            <GitBranch size={20} weight="fill" className="text-[#6868B1]" />
            <input
              type="text"
              defaultValue={flowName}
              className="bg-transparent border-none text-[#1A1A2E] focus:outline-none"
              style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, ...ff }}
            />
            <button className="text-[#9B9BAD] hover:text-[#F5A623] transition-colors">
              <Star size={20} weight="regular" />
            </button>
          </div>

          <div className="flex items-center gap-[16px]">
            {/* Zoom controls */}
            <div className="flex items-center gap-[8px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
              <button
                onClick={handleZoomOut}
                className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors"
              >
                <Minus size={18} weight="bold" />
              </button>
              <span className="px-[12px] text-[#4A4A6A]" style={{ fontSize: 13, fontWeight: 600, ...ff }}>
                {zoom}%
              </span>
              <button
                onClick={handleFitView}
                className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors"
              >
                <ArrowsOut size={18} weight="bold" />
              </button>
              <button
                onClick={handleZoomIn}
                className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors"
              >
                <Plus size={18} weight="bold" />
              </button>
            </div>

            {/* Action buttons */}
            <button className="flex items-center justify-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] transition-colors">
              <FloppyDisk size={14} weight="bold" />
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                Salvar
              </span>
            </button>

            {/* Toggle */}
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-[8px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] transition-colors"
            >
              {isActive ? (
                <>
                  <ToggleRight size={24} weight="fill" className="text-[#3CCEA7]" />
                  <span className="text-[#3CCEA7] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                    Ativo
                  </span>
                </>
              ) : (
                <>
                  <ToggleLeft size={24} weight="fill" className="text-[#9B9BAD]" />
                  <span className="text-[#9B9BAD] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                    Inativo
                  </span>
                </>
              )}
            </button>

            {/* More actions */}
            <div className="flex items-center gap-[8px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
              <button
                onClick={() => setShowLibrary(!showLibrary)}
                className={`flex items-center justify-center size-[32px] rounded-full transition-colors ${
                  showLibrary ? "bg-[#DCF0FF] text-[#0483AB]" : "bg-transparent text-[#0483AB] hover:bg-[#DCF0FF]"
                }`}
              >
                <List size={18} weight="bold" />
              </button>
              <button
                onClick={() => setShowProperties(!showProperties)}
                className={`flex items-center justify-center size-[32px] rounded-full transition-colors ${
                  showProperties ? "bg-[#DCF0FF] text-[#0483AB]" : "bg-transparent text-[#0483AB] hover:bg-[#DCF0FF]"
                }`}
              >
                <Sliders size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors">
                <Export size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors">
                <LinkIcon size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors">
                <ClockCounterClockwise size={18} weight="bold" />
              </button>
              <Link
                to="/"
                className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors"
              >
                <X size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div ref={canvasRef} className="relative flex-1 overflow-auto">
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #DDE3EC 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Content */}
          <div
            className="relative min-w-[2000px] min-h-[1000px]"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
            }}
          >
            {/* Connection lines */}
            {connectionLines.map((conn, i) => (
              <ConnectionLine key={i} from={conn.from} to={conn.to} />
            ))}

            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: node.position.x,
                  top: node.position.y,
                }}
              >
                <FlowNode
                  type={node.type}
                  name={node.displayName}
                  icon={node.icon}
                  config={node.parameters}
                  selected={selectedNodeId === node.id}
                  onClick={() => {
                    setSelectedNodeId(node.id);
                    setShowProperties(true);
                  }}
                  onRemove={() => handleRemoveNode(node.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Direita - Propriedades */}
      <div
        className={`h-full bg-white border-l border-[#EBEBF5] shadow-[-2px_0_8px_rgba(0,0,0,0.04)] transition-all ${
          showProperties ? "w-[360px]" : "w-0 overflow-hidden"
        }`}
      >
        {showProperties && (
          <PropertyPanel
            node={selectedNodeDescription}
            parameters={selectedNode?.parameters || {}}
            onParameterChange={handleParameterChange}
            onClose={() => setShowProperties(false)}
          />
        )}
      </div>
    </div>
  );
}
