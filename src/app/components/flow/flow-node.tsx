import {
  ArrowDown,
  ArrowsClockwise,
  Clock,
  EnvelopeSimple,
  WhatsappLogo,
  FolderOpen,
  AddressBook,
  Question,
  Atom,
  EnvelopeOpen,
  X,
  Lightning,
  Play,
  GitBranch,
  ArrowsSplit,
  HourglassSimple,
  GitMerge,
  Funnel,
  Plugs,
  DoorOpen,
  Code,
  UserCheck,
  Database,
  Shapes,
  Warning,
  TreeStructure,
  ClipboardText,
  PlusCircle,
} from "@phosphor-icons/react";
import { ZeniteNodeGroup, NODE_GROUP_COLORS } from "../../types/node-types";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface FlowNodeProps {
  type: ZeniteNodeGroup;
  name: string;
  icon: string;
  config?: Record<string, any>;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export default function FlowNode({ type, name, icon, config, selected, onClick, onRemove }: FlowNodeProps) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      ArrowDown,
      ArrowsClockwise,
      Clock,
      EnvelopeSimple,
      WhatsappLogo,
      FolderOpen,
      AddressBook,
      Question,
      Atom,
      EnvelopeOpen,
      Lightning,
      Play,
      GitBranch,
      ArrowsSplit,
      HourglassSimple,
      GitMerge,
      Funnel,
      Plugs,
      DoorOpen,
      Code,
      UserCheck,
      Database,
      Shapes,
      Warning,
      TreeStructure,
      ClipboardText,
      PlusCircle,
    };
    return icons[iconName] || Question;
  };

  const Icon = getIcon(icon);

  const isTuring = type === 'turing';
  const isGatilho = type === 'gatilho' || type === 'portal';
  const isAlerta = type === 'alerta';
  
  const nodeColor = NODE_GROUP_COLORS[type];
  const isGradient = nodeColor === 'gradient';

  // Cores das categorias (igual ao NodePicker)
  const getCategoryColors = (type: ZeniteNodeGroup) => {
    // Gatilhos - Blue Berry
    if (type === 'gatilho' || type === 'portal') {
      return { bg: '#DCF0FF', iconColor: '#0483AB' };
    }
    // Ações - Green Mint
    if (type === 'passo') {
      return { bg: '#D9F8EF', iconColor: '#3CCEA7' };
    }
    // Turing - Gradiente especial
    if (type === 'turing') {
      return { bg: 'gradient', iconColor: '#FFFFFF' };
    }
    // Outros - Purple
    return { bg: '#E8E8FD', iconColor: '#6868B1' };
  };

  const categoryColors = getCategoryColors(type);
  
  // Labels por tipo
  const getTypeLabel = (type: ZeniteNodeGroup): string => {
    const labels: Record<ZeniteNodeGroup, string> = {
      gatilho: 'Gatilho Inicial',
      passo: 'Ação',
      bifurcacao: 'Bifurcação',
      rota: 'Rota',
      repeticao: 'Repetição',
      pausa: 'Pausa',
      juncao: 'Junção',
      filtro: 'Filtro',
      conector: 'Conector',
      portal: 'Portal',
      script: 'Script',
      aprovacao: 'Aprovação',
      turing: 'Turing IA',
      memoria: 'Memória',
      molde: 'Molde',
      alerta: 'Alerta',
      subfluxo: 'Sub-fluxo',
      registro: 'Registro',
    };
    return labels[type];
  };

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-[12px] p-[16px] cursor-pointer transition-all ${
        selected
          ? "shadow-[0_0_0_2px_#6868B1]"
          : "shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
      } ${
        isGradient
          ? "border-[2px] border-transparent"
          : isGatilho
          ? "border-[2px] border-[#3CCEA7]"
          : isAlerta
          ? "border-[2px] border-[#FF6B6B]"
          : "border border-[#EBEBF5]"
      }`}
      style={{
        width: 280,
        ...(isGradient
          ? {
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(135deg, #8C8CD4, #07ABDE, #3CCEA7)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }
          : {}),
      }}
    >
      {/* Header */}
      <div
        className={`mb-[12px] ${
          isGatilho ? "bg-[#E8FFFA]" : isAlerta ? "bg-[#FFE8E8]" : "bg-[#F6F7F9]"
        } rounded-[6px] px-[8px] py-[4px]`}
      >
        <span
          className={`uppercase font-bold text-[9px] tracking-[0.5px] ${
            isGatilho ? "text-[#3CCEA7]" : isAlerta ? "text-[#FF6B6B]" : "text-[#98989d]"
          }`}
          style={ff}
        >
          {getTypeLabel(type)}
        </span>
      </div>

      {/* Body - Nome e ícone */}
      <div className="flex items-center gap-[8px] mb-[12px]">
        <div
          className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0`}
          style={{
            background: categoryColors.bg === 'gradient'
              ? "linear-gradient(135deg, #8C8CD4, #07ABDE, #3CCEA7)"
              : categoryColors.bg,
          }}
        >
          <Icon
            size={18}
            weight="duotone"
            style={{ color: categoryColors.iconColor }}
          />
        </div>
        <span className="text-[#122232] text-[14px] font-semibold flex-1" style={{ letterSpacing: -0.5, ...ff }}>
          {name}
        </span>
      </div>

      {/* Config metadata */}
      {config && Object.keys(config).length > 0 && (
        <div className="space-y-[6px]">
          {Object.entries(config).slice(0, 2).map(([key, value]) => (
            <div key={key} className="bg-[#F6F7F9] rounded-[6px] px-[8px] py-[6px]">
              <span className="text-[#98989d] uppercase text-[8px] font-bold tracking-[0.5px] block mb-[2px]" style={ff}>
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-[#122232] text-[12px]" style={{ letterSpacing: -0.3, ...ff }}>
                {typeof value === "string" ? value : JSON.stringify(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Conexão ports */}
      {!isGatilho && (
        <div className="absolute -left-[8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] bg-white border-[2px] border-[#C8C8E8] rounded-full" />
      )}
      {type !== 'alerta' && (
        <div className="absolute -right-[8px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] bg-white border-[2px] border-[#C8C8E8] rounded-full" />
      )}

      {/* Remove button (hover) */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-[8px] -right-[8px] w-[24px] h-[24px] bg-[#FF6B6B] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
        >
          <X size={14} weight="bold" className="text-white" />
        </button>
      )}
    </div>
  );
}