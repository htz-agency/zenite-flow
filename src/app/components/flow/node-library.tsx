import { useState } from "react";
import {
  Lightning,
  Play,
  Atom,
  GitBranch,
  Toolbox,
  MagnifyingGlass,
  X,
  PlusCircle,
  ArrowsClockwise,
  ArrowDown,
  Clock,
  DoorOpen,
  AddressBook,
  FolderOpen,
  EnvelopeSimple,
  WhatsappLogo,
  ArrowsSplit,
  HourglassSimple,
  GitMerge,
  Funnel,
  UserCheck,
  Plugs,
  Code,
  Database,
  Shapes,
  Warning,
  TreeStructure,
  ClipboardText,
  Question,
} from "@phosphor-icons/react";
import { ALL_NODES, NODE_CATEGORIES } from "../../data/node-catalog";
import { IZeniteNodeDescription } from "../../types/node-types";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface NodeLibraryProps {
  onNodeSelect?: (node: IZeniteNodeDescription) => void;
  onClose?: () => void;
}

export default function NodeLibrary({ onNodeSelect, onClose }: NodeLibraryProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Lightning,
      Play,
      Atom,
      GitBranch,
      Toolbox,
    };
    return icons[iconName] || Play;
  };

  // Filtrar nós
  const filteredNodes = ALL_NODES.filter((node) => {
    const matchesSearch =
      search === "" ||
      node.displayName.toLowerCase().includes(search.toLowerCase()) ||
      node.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      node.group.includes(selectedCategory as any) ||
      (selectedCategory === "control" &&
        ["bifurcacao", "rota", "repeticao", "pausa", "juncao", "filtro"].some((g) =>
          node.group.includes(g as any)
        )) ||
      (selectedCategory === "util" &&
        ["conector", "script", "memoria", "molde", "alerta", "subfluxo", "registro"].some((g) =>
          node.group.includes(g as any)
        ));

    return matchesSearch && matchesCategory;
  });

  // Agrupar por grupo principal
  const groupedNodes = filteredNodes.reduce((acc, node) => {
    const primaryGroup = node.group[0];
    if (!acc[primaryGroup]) {
      acc[primaryGroup] = [];
    }
    acc[primaryGroup].push(node);
    return acc;
  }, {} as Record<string, IZeniteNodeDescription[]>);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-[16px] border-b border-[#EBEBF5]">
        <div className="flex items-center justify-between mb-[12px]">
          <h2 className="text-[#122232] text-[16px] font-bold" style={{ letterSpacing: -0.5, ...ff }}>
            Biblioteca de Nós
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="w-[28px] h-[28px] rounded-[6px] bg-[#F6F7F9] hover:bg-[#EBEBF5] flex items-center justify-center transition-colors"
            >
              <X size={16} weight="bold" className="text-[#98989d]" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlass size={16} weight="bold" className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#98989d]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar nós..."
            className="w-full h-[36px] pl-[36px] pr-[12px] rounded-[8px] border border-[#EBEBF5] bg-[#F6F7F9] text-[#122232] text-[13px] placeholder:text-[#98989d] focus:outline-none focus:border-[#6868B1] transition-colors"
            style={{ letterSpacing: -0.3, ...ff }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-[16px] py-[12px] border-b border-[#EBEBF5] flex gap-[8px] overflow-x-auto">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-[12px] py-[6px] rounded-[6px] text-[11px] font-bold uppercase tracking-[0.5px] whitespace-nowrap transition-colors ${
            selectedCategory === "all"
              ? "bg-[#6868B1] text-white"
              : "bg-[#F6F7F9] text-[#98989d] hover:bg-[#EBEBF5]"
          }`}
          style={ff}
        >
          Todos
        </button>
        {NODE_CATEGORIES.map((category) => {
          const Icon = getIcon(category.icon);
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-[12px] py-[6px] rounded-[6px] text-[11px] font-bold uppercase tracking-[0.5px] whitespace-nowrap flex items-center gap-[6px] transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#6868B1] text-white"
                  : "bg-[#F6F7F9] text-[#98989d] hover:bg-[#EBEBF5]"
              }`}
              style={ff}
            >
              <Icon size={14} weight="bold" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Nodes List */}
      <div className="flex-1 overflow-y-auto p-[16px] space-y-[16px]">
        {filteredNodes.length === 0 ? (
          <div className="text-center py-[48px]">
            <p className="text-[#98989d] text-[13px]" style={{ letterSpacing: -0.3, ...ff }}>
              Nenhum nó encontrado
            </p>
          </div>
        ) : (
          Object.entries(groupedNodes).map(([group, nodes]) => (
            <div key={group}>
              <h3 className="text-[#98989d] text-[10px] font-bold uppercase tracking-[0.5px] mb-[8px]" style={ff}>
                {group}
              </h3>
              <div className="space-y-[8px]">
                {nodes.map((node) => (
                  <NodeLibraryItem
                    key={node.name}
                    node={node}
                    onClick={() => onNodeSelect?.(node)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

interface NodeLibraryItemProps {
  node: IZeniteNodeDescription;
  onClick?: () => void;
}

function NodeLibraryItem({ node, onClick }: NodeLibraryItemProps) {
  const isTuring = node.group.includes("turing");
  const isGatilho = node.group.includes("gatilho") || node.group.includes("portal");

  return (
    <button
      onClick={onClick}
      className={`w-full p-[12px] rounded-[8px] border text-left hover:shadow-md transition-all ${
        isTuring
          ? "border-transparent bg-white"
          : isGatilho
          ? "border-[#3CCEA7] bg-[#E8FFFA]"
          : "border-[#EBEBF5] bg-white hover:border-[#6868B1]"
      }`}
      style={
        isTuring
          ? {
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(135deg, #8C8CD4, #07ABDE, #3CCEA7)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              borderWidth: "2px",
            }
          : {}
      }
    >
      <div className="flex items-start gap-[8px]">
        <div
          className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0 ${
            isTuring
              ? "bg-gradient-to-br from-[#8C8CD4] via-[#07ABDE] to-[#3CCEA7]"
              : isGatilho
              ? "bg-[#3CCEA7]"
              : "bg-[#E8E8FD]"
          }`}
        >
          <NodeIcon icon={node.icon} isTuring={isTuring} isGatilho={isGatilho} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[#122232] text-[13px] font-bold mb-[2px]" style={{ letterSpacing: -0.3, ...ff }}>
            {node.displayName}
          </h4>
          <p className="text-[#98989d] text-[11px] leading-[1.4]" style={{ letterSpacing: -0.2, ...ff }}>
            {node.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function NodeIcon({ icon, isTuring, isGatilho }: { icon: string; isTuring: boolean; isGatilho: boolean }) {
  // Mapear ícones do catálogo para componentes Phosphor
  const iconMap: Record<string, any> = {
    PlusCircle,
    ArrowsClockwise,
    ArrowDown,
    Clock,
    DoorOpen,
    AddressBook,
    FolderOpen,
    EnvelopeSimple,
    WhatsappLogo,
    Atom,
    GitBranch,
    ArrowsSplit,
    HourglassSimple,
    GitMerge,
    Funnel,
    UserCheck,
    Plugs,
    Code,
    Database,
    Shapes,
    Warning,
    TreeStructure,
    ClipboardText,
  };

  const IconComponent = iconMap[icon] || Question;

  return (
    <IconComponent
      size={16}
      weight="bold"
      className={isTuring ? "text-white" : isGatilho ? "text-white" : "text-[#6868B1]"}
    />
  );
}