import { useState } from 'react';
import { Link } from 'react-router';
import { 
  GitBranch, 
  NotePencil, 
  Plus, 
  ClockCounterClockwise,
  DotsThree,
  CheckCircle,
  Warning,
  X,
  FloppyDisk,
  PencilSimple,
  Tag
} from '@phosphor-icons/react';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

type FlowStatus = 'inactive' | 'activating' | 'active' | 'error';

interface FlowBuilderHeadProps {
  flowName: string;
  onFlowNameChange: (name: string) => void;
  flowStatus: FlowStatus;
  onSave: () => void;
  onToggleActivate: () => void;
}

export default function FlowBuilderHead({
  flowName,
  onFlowNameChange,
  flowStatus,
  onSave,
  onToggleActivate,
}: FlowBuilderHeadProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'execucoes' | 'modelos'>('editor');
  const [isEditingName, setIsEditingName] = useState(false);

  const getActivateButtonStyle = () => {
    switch (flowStatus) {
      case 'active':
        return 'bg-[#3CCEA7] text-white';
      case 'activating':
        return 'bg-[#07ABDE] text-white';
      case 'error':
        return 'bg-[#FFE8E8] text-[#FF6B6B]';
      default:
        return 'bg-[#F6F7F9] text-[#4A4A6A] border border-[#EBEBF5]';
    }
  };

  const getActivateButtonContent = () => {
    switch (flowStatus) {
      case 'active':
        return (
          <>
            <CheckCircle size={14} weight="bold" />
            <span>Ativo</span>
          </>
        );
      case 'activating':
        return <span>Ativando...</span>;
      case 'error':
        return (
          <>
            <Warning size={14} weight="bold" />
            <span>Erro</span>
          </>
        );
      default:
        return <span>Inativo</span>;
    }
  };

  return (
    <div className="h-[64px] bg-white border-b border-[#EBEBF5] px-[24px] flex items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
      {/* Esquerda: Breadcrumb + Tabs */}
      <div className="flex items-center gap-[24px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-[8px]">
          <Link
            to="/"
            className="flex items-center gap-[6px] text-[#4E6987] hover:text-[#122232] transition-colors"
          >
            <GitBranch size={18} weight="bold" />
            <span className="text-[14px] font-medium" style={ff}>
              Fluxos
            </span>
          </Link>
          <span className="text-[#98989d]">&gt;</span>
          
          {isEditingName ? (
            <input
              type="text"
              value={flowName}
              onChange={(e) => onFlowNameChange(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingName(false);
              }}
              className="text-[14px] font-semibold text-[#122232] bg-[#F6F7F9] px-[8px] py-[4px] rounded-[6px] outline-none focus:ring-2 focus:ring-[#0483AB]"
              style={ff}
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-[6px] text-[#122232] hover:text-[#0483AB] transition-colors group"
            >
              <span className="text-[14px] font-semibold" style={ff}>
                {flowName}
              </span>
              <NotePencil size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          
        </div>

        {/* Separator */}
        

        {/* Tabs */}
        <div className="flex items-center gap-[4px]">
          {[
            { id: 'editor', label: 'Editor' },
            { id: 'execucoes', label: 'Execuções' },
          ].map((tab) => (
            null
          ))}
        </div>
      </div>

      {/* Direita: Ações */}
      <div className="flex items-center gap-[12px]">
        {/* Separator */}
        <div className="w-[1px] h-[24px] bg-[#DDE3EC] order-last" />

        {/* Action Pill — Histórico + Mais opções */}
        <div className="flex items-center bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px] order-last">
          <button
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Tag"
          >
            <Tag size={18} weight="bold" />
          </button>
          <button
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Editar"
          >
            <PencilSimple size={18} weight="bold" />
          </button>
          <button
            onClick={onSave}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Salvar"
          >
            <FloppyDisk size={18} weight="bold" />
          </button>
          <button
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Histórico de versões"
          >
            <ClockCounterClockwise size={18} weight="bold" />
          </button>
          <button
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Mais opções"
          >
            <DotsThree size={18} weight="bold" />
          </button>
          <button
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Fechar"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Ativar */}
        <button
          onClick={onToggleActivate}
          className="flex flex-row-reverse items-center gap-[8px] cursor-pointer group"
        >
          <div className={`relative w-[40px] h-[22px] rounded-full transition-colors duration-200 ${
            flowStatus === 'active' ? 'bg-[#07ABDE]' :
            flowStatus === 'activating' ? 'bg-[#07ABDE]' :
            flowStatus === 'error' ? 'bg-[#FF6B6B]' :
            'bg-[#C8CFDB]'
          }`}>
            <div className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-transform duration-200 ${
              flowStatus === 'active' || flowStatus === 'activating' ? 'translate-x-[20px]' : 'translate-x-[2px]'
            }`} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#4E6987]" style={ff}>
            {flowStatus === 'active' ? 'Ativo' :
             flowStatus === 'activating' ? 'Ativando...' :
             flowStatus === 'error' ? 'Erro' :
             'Inativo'}
          </span>
        </button>
      </div>
    </div>
  );
}