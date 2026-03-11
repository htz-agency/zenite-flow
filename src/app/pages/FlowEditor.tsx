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
  Heart,
  EnvelopeSimple,
  EnvelopeOpen,
  ChatCircle,
  Atom,
  Clock,
  Square,
  ArrowsClockwise,
  ArrowDown,
  CheckSquare,
  CalendarCheck,
} from "@phosphor-icons/react";
import { mockFlows } from "../data/mockData";

const fontFeature = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface FlowNode {
  id: string;
  type: "trigger" | "action" | "condition" | "turing";
  position: { x: number; y: number };
  data: {
    label: string;
    sublabel?: string;
    icon: any;
    iconColor?: string;
  };
}

function FlowNodeComponent({ node, isSelected, onClick }: { node: FlowNode; isSelected: boolean; onClick: () => void }) {
  const isTuring = node.type === "turing";
  
  return (
    <div
      className={`absolute cursor-pointer ${isSelected ? "z-10" : "z-0"}`}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      onClick={onClick}
    >
      {/* Trigger node */}
      {node.type === "trigger" && (
        <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-2 border-[#6868B1] w-[240px]">
          <div className="bg-[#E8E8FD] px-[12px] py-[6px] rounded-t-[10px]">
            <span className="uppercase font-bold tracking-[0.5px] text-[#6868B1]" style={{ fontSize: 9, ...fontFeature }}>
              Gatilho Inicial
            </span>
          </div>
          <div className="p-[12px]">
            <div className="flex items-center gap-[8px] px-[12px] py-[8px] bg-[#F6F7F9] rounded-[8px]">
              <node.data.icon size={16} weight="duotone" className="text-[#6868B1]" />
              <span className="text-[#1A1A2E] flex-1" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                {node.data.label}
              </span>
            </div>
          </div>
          {/* Output port */}
          <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-[#6868B1] border-2 border-white" />
        </div>
      )}

      {/* Action node */}
      {node.type === "action" && (
        <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#EBEBF5] w-[240px]">
          <div className="bg-[#F6F7F9] px-[12px] py-[6px] rounded-t-[10px]">
            <span className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Ação
            </span>
          </div>
          <div className="p-[12px]">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <node.data.icon size={16} weight="duotone" className="text-[#4A4A6A]" />
              <span className="text-[#1A1A2E] flex-1" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                {node.data.label}
              </span>
            </div>
            {node.data.sublabel && (
              <div className="text-[#9B9BAD]" style={{ fontSize: 11, fontWeight: 500, lineHeight: "15px", ...fontFeature }}>
                <span className="uppercase font-bold tracking-[0.5px]" style={{ fontSize: 8 }}>
                  {node.data.sublabel.split(":")[0]}:
                </span>
                <br />
                {node.data.sublabel.split(":")[1]}
              </div>
            )}
          </div>
          {/* Input port */}
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-white border-2 border-[#EBEBF5]" />
          {/* Output port */}
          <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-white border-2 border-[#EBEBF5]" />
        </div>
      )}

      {/* Condition node */}
      {node.type === "condition" && (
        <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#EBEBF5] w-[200px]">
          <div className="bg-[#F6F7F9] px-[12px] py-[6px] rounded-t-[10px]">
            <span className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Condição
            </span>
          </div>
          <div className="p-[12px]">
            <div className="flex items-center gap-[8px] mb-[6px]">
              <node.data.icon size={14} weight="duotone" className="text-[#4A4A6A]" />
              <span className="text-[#1A1A2E] text-sm font-semibold">
                {node.data.label}
              </span>
            </div>
            {node.data.sublabel && (
              <div className="text-[#9B9BAD] text-xs">
                {node.data.sublabel}
              </div>
            )}
          </div>
          {/* Input port */}
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-white border-2 border-[#EBEBF5]" />
          {/* Output ports */}
          <div className="absolute right-[-8px] top-[30%] -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-[#3CCEA7] border-2 border-white" />
          <div className="absolute right-[-8px] top-[70%] -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-[#FF6B6B] border-2 border-white" />
        </div>
      )}

      {/* Turing IA node */}
      {isTuring && (
        <div className="relative bg-white rounded-[12px] shadow-[0_4px_16px_rgba(140,140,212,0.25)] w-[240px]">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-[12px] p-[2px] bg-gradient-to-r from-[#8C8CD4] via-[#07ABDE] to-[#3CCEA7] animate-[gradient_3s_linear_infinite]">
            <div className="bg-white rounded-[10px] size-full" />
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-[#E8E8FD] to-[#DCF0FF] px-[12px] py-[6px] rounded-t-[10px]">
              <div className="flex items-center gap-[6px]">
                <Atom size={12} weight="bold" className="text-[#6868B1]" />
                <span className="uppercase font-bold tracking-[0.5px] text-[#6868B1]" style={{ fontSize: 9, ...fontFeature }}>
                  Turing IA
                </span>
              </div>
            </div>
            <div className="p-[12px]">
              <div className="flex items-center gap-[8px]">
                <Atom size={16} weight="bold" className="text-[#6868B1]" />
                <span className="text-[#1A1A2E] flex-1" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                  {node.data.label}
                </span>
              </div>
            </div>
            {/* Input port */}
            <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-white border-2 border-[#8C8CD4]" />
            {/* Output port */}
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-gradient-to-r from-[#8C8CD4] to-[#3CCEA7] border-2 border-white" />
          </div>
        </div>
      )}
    </div>
  );
}

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

export function FlowEditor() {
  const { id } = useParams();
  const [zoom, setZoom] = useState(100);
  const [isActive, setIsActive] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showTriggerPanel, setShowTriggerPanel] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const flow = mockFlows.find((f) => f.id === id);
  const flowName = flow?.name || "Novo Fluxo";

  // Mock nodes for visualization
  const [nodes] = useState<FlowNode[]>([
    {
      id: "trigger-1",
      type: "trigger",
      position: { x: 80, y: 180 },
      data: {
        label: "Um novo Lead foi criado",
        icon: Heart,
      },
    },
    {
      id: "action-1",
      type: "action",
      position: { x: 400, y: 180 },
      data: {
        label: "Envio de email de Fluxo",
        sublabel: "EMAIL: Email de resposta automática pós-cadastro v1.3",
        icon: EnvelopeSimple,
      },
    },
    {
      id: "condition-1",
      type: "condition",
      position: { x: 720, y: 180 },
      data: {
        label: "Abriu o email",
        sublabel: "BOTÃO: Saiba mais no WhatsApp",
        icon: EnvelopeOpen,
      },
    },
    {
      id: "action-2",
      type: "action",
      position: { x: 1000, y: 120 },
      data: {
        label: "Enviar WhatsApp",
        icon: ChatCircle,
      },
    },
    {
      id: "turing-1",
      type: "turing",
      position: { x: 1000, y: 260 },
      data: {
        label: "Analisar score do lead",
        icon: Atom,
      },
    },
  ]);

  const connections = [
    { from: "trigger-1", to: "action-1" },
    { from: "action-1", to: "condition-1" },
    { from: "condition-1", to: "action-2" },
    { from: "condition-1", to: "turing-1" },
  ];

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleFitView = () => setZoom(100);

  return (
    <div className="relative h-full flex flex-col bg-[#F6F7F9]">
      {/* Topbar */}
      <div className="flex items-center justify-between px-[24px] py-[12px] bg-white border-b border-[#EBEBF5] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-[16px]">
          <GitBranch size={20} weight="fill" className="text-[#6868B1]" />
          <input
            type="text"
            defaultValue={flowName}
            className="bg-transparent border-none text-[#1A1A2E] focus:outline-none"
            style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}
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
            <span className="px-[12px] text-[#4A4A6A]" style={{ fontSize: 13, fontWeight: 600, ...fontFeature }}>
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
            <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
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
                <span className="text-[#3CCEA7] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Ativo
                </span>
              </>
            ) : (
              <>
                <ToggleLeft size={24} weight="fill" className="text-[#9B9BAD]" />
                <span className="text-[#9B9BAD] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Inativo
                </span>
              </>
            )}
          </button>

          {/* More actions */}
          <div className="flex items-center gap-[8px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
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
          {connections.map((conn, i) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            // Calculate connection points
            const fromX = fromNode.position.x + 240 + 8; // node width + port offset
            const fromY = fromNode.position.y + 50; // approximate center
            const toX = toNode.position.x - 8;
            const toY = toNode.position.y + 50;

            return <ConnectionLine key={i} from={{ x: fromX, y: fromY }} to={{ x: toX, y: toY }} />;
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <FlowNodeComponent
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              onClick={() => setSelectedNodeId(node.id)}
            />
          ))}
        </div>
      </div>

      {/* Floating toolbar */}
      <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex items-center gap-[8px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
        <button
          onClick={() => setShowTriggerPanel(true)}
          className="flex items-center gap-[6px] h-[32px] px-[16px] rounded-[500px] bg-white text-[#6868B1] hover:bg-[#E8E8FD] transition-colors"
        >
          <GitBranch size={14} weight="bold" />
          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
            Gatilho
          </span>
        </button>
        <button className="flex items-center gap-[6px] h-[32px] px-[16px] rounded-[500px] bg-white text-[#4A4A6A] hover:bg-[#EBEBF5] transition-colors">
          <Square size={14} weight="bold" />
          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
            Ação
          </span>
        </button>
        <button className="flex items-center gap-[6px] h-[32px] px-[16px] rounded-[500px] bg-white text-[#4A4A6A] hover:bg-[#EBEBF5] transition-colors">
          <CheckSquare size={14} weight="bold" />
          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
            Condição
          </span>
        </button>
        <button className="flex items-center gap-[6px] h-[32px] px-[16px] rounded-[500px] bg-white text-[#4A4A6A] hover:bg-[#EBEBF5] transition-colors">
          <Clock size={14} weight="bold" />
          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
            Aguardar
          </span>
        </button>
        <button className="group/turing flex items-center gap-[6px] h-[32px] px-[16px] rounded-[500px] bg-white text-[#4A4A6A] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35)] transition-all">
          <Atom size={14} weight="bold" className="group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]" />
          <span className="font-bold uppercase tracking-[0.5px] [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent" style={{ fontSize: 10, backgroundImage: "linear-gradient(90deg, #8C8CD4, #8C8CD4, #07ABDE, #3CCEA7, #07ABDE, #8C8CD4, #8C8CD4)", backgroundRepeat: "repeat", ...fontFeature }}>
            Turing IA
          </span>
        </button>
      </div>

      {/* Trigger panel (modal-like) */}
      {showTriggerPanel && (
        <div className="absolute inset-0 bg-black/30 flex items-end justify-center z-50" onClick={() => setShowTriggerPanel(false)}>
          <div
            className="bg-white rounded-t-[24px] w-full max-w-[800px] max-h-[70vh] overflow-y-auto shadow-[0_-4px_24px_rgba(0,0,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-[32px] py-[24px] border-b border-[#EBEBF5]">
              <div className="flex items-center justify-between mb-[8px]">
                <h2 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>
                  Gatilhos Iniciais
                </h2>
                <button
                  onClick={() => setShowTriggerPanel(false)}
                  className="flex items-center justify-center size-[34px] rounded-full bg-[#F6F7F9] text-[#4A4A6A] hover:bg-[#EBEBF5] transition-colors"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
              <p className="text-[#4A4A6A]" style={{ fontSize: 13, fontWeight: 500, lineHeight: "18px", ...fontFeature }}>
                Gatilhos iniciais são ações que devem ocorrer para que o fluxo seja ativado.
              </p>
            </div>

            <div className="px-[32px] py-[24px]">
              {/* Eventos de Objeto */}
              <div className="mb-[24px]">
                <h3 className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A] mb-[12px]" style={{ fontSize: 9, ...fontFeature }}>
                  Eventos de Objeto
                </h3>
                <div className="grid grid-cols-2 gap-[12px]">
                  {[
                    { icon: Square, label: "Um novo Objeto foi criado" },
                    { icon: ArrowsClockwise, label: "Um Objeto foi atualizado" },
                    { icon: ArrowsClockwise, label: "Um Objeto trocou de Pipe" },
                    { icon: ArrowDown, label: "Um Objeto andou de fase no Pipe" },
                  ].map((trigger, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-[10px] px-[16px] py-[12px] bg-[#F6F7F9] hover:bg-[#E8E8FD] hover:border-[#6868B1] border-2 border-transparent rounded-[8px] transition-all text-left"
                    >
                      <trigger.icon size={20} weight="duotone" className="text-[#4A4A6A]" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                        {trigger.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eventos de Comunicação */}
              <div className="mb-[24px]">
                <h3 className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A] mb-[12px]" style={{ fontSize: 9, ...fontFeature }}>
                  Eventos de Comunicação
                </h3>
                <div className="grid grid-cols-2 gap-[12px]">
                  {[
                    { icon: EnvelopeSimple, label: "Um Email foi enviado" },
                    { icon: EnvelopeOpen, label: "Um Email foi aberto" },
                    { icon: ChatCircle, label: "Uma Mensagem foi enviada" },
                    { icon: LinkIcon, label: "Um Link foi clicado" },
                  ].map((trigger, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-[10px] px-[16px] py-[12px] bg-[#F6F7F9] hover:bg-[#E8E8FD] hover:border-[#6868B1] border-2 border-transparent rounded-[8px] transition-all text-left"
                    >
                      <trigger.icon size={20} weight="duotone" className="text-[#4A4A6A]" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                        {trigger.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eventos de Agenda */}
              <div>
                <h3 className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A] mb-[12px]" style={{ fontSize: 9, ...fontFeature }}>
                  Eventos de Agenda
                </h3>
                <div className="grid grid-cols-2 gap-[12px]">
                  {[
                    { icon: CalendarCheck, label: "Um Evento foi agendado" },
                    { icon: CheckSquare, label: "Uma Tarefa foi criada" },
                  ].map((trigger, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-[10px] px-[16px] py-[12px] bg-[#F6F7F9] hover:bg-[#E8E8FD] hover:border-[#6868B1] border-2 border-transparent rounded-[8px] transition-all text-left"
                    >
                      <trigger.icon size={20} weight="duotone" className="text-[#4A4A6A]" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                        {trigger.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
