import { memo } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import { Play, Power, Trash, DotsThree, Lightning } from '@phosphor-icons/react';
import { getNodeIcon } from '../../data/node-catalog';
import type { ZeniteNodeData, NodeGroup } from '../../types/node-types';
import { useFlowContext } from '../../contexts/FlowContext';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

// Função para obter cores das categorias (igual ao NodePicker)
function getCategoryColors(group: NodeGroup) {
  // Gatilhos - Blue Berry
  if (group === 'gatilho' || group === 'portal') {
    return { bg: '#DCF0FF', iconColor: '#0483AB', borderColor: '#0483AB' };
  }
  // Ações - Green Mint
  if (group === 'passo') {
    return { bg: '#D9F8EF', iconColor: '#3CCEA7', borderColor: '#3CCEA7' };
  }
  // Turing - Gradiente especial
  if (group === 'turing') {
    return { bg: 'gradient', iconColor: '#FFFFFF', borderColor: 'gradient' };
  }
  // Outros - Purple
  return { bg: '#E8E8FD', iconColor: '#6868B1', borderColor: '#6868B1' };
}

interface ZeniteNodeProps extends NodeProps<ZeniteNodeData> {}

function ZeniteNode({ data, selected, id }: ZeniteNodeProps) {
  const { onNodeDoubleClick } = useFlowContext();
  const { deleteElements } = useReactFlow();
  const Icon = getNodeIcon(data.type);
  const colors = getCategoryColors(data.group);
  const isGatilho = data.group === 'gatilho' || data.group === 'portal';
  const isTuring = data.group === 'turing';

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNodeDoubleClick && id) {
      onNodeDoubleClick(id);
    }
  };

  const handleExecute = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Executar nó:', id);
    // TODO: Implementar execução individual do nó
  };

  const handleToggleActive = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle ativo/inativo:', id);
    // TODO: Implementar toggle de ativo/inativo
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      deleteElements({ nodes: [{ id }] });
    }
  };

  const handleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Mais opções:', id);
    // TODO: Implementar menu de mais opções
  };

  return (
    <div className="relative group">
      {/* Mini Toolbar (aparece no hover/selecionado) */}
      {(selected) && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[8px] flex items-center gap-[10px] bg-[#F6F7F9] rounded-[100px] h-[42px] px-[5px] w-fit z-50"
          style={{ 
            opacity: selected ? 1 : 0,
            boxShadow: '0px 4px 16px 0px rgba(18,34,50,0.12), 0px 2px 4px 0px rgba(18,34,50,0.08)',
          }}
        >
          <button
            onClick={handleExecute}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Executar"
          >
            <Play size={18} weight="bold" />
          </button>
          <button
            onClick={handleToggleActive}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Des/Ativar"
          >
            <Power size={18} weight="bold" />
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Excluir"
          >
            <Trash size={18} weight="bold" />
          </button>
          <button
            onClick={handleMore}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Mais"
          >
            <DotsThree size={18} weight="bold" />
          </button>
        </div>
      )}

      {/* Indicador de Gatilho */}
      {isGatilho && (
        <div className="absolute -left-[24px] top-1/2 -translate-y-1/2">
          <Lightning size={16} weight="fill" className="text-[#73D0FF]" />
        </div>
      )}

      {/* Card do Nó */}
      <div
        className={`
          relative bg-white rounded-[16px] p-[16px] min-w-[240px]
          transition-all duration-200
          ${selected 
            ? `border-2 shadow-[0_0_0_4px_${colors.borderColor}33]` 
            : 'border-[1.5px] border-transparent shadow-none'
          }
          hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]
          ${isTuring ? 'border-gradient-turing' : ''}
        `}
        style={{
          borderColor: selected ? colors.borderColor : undefined,
        }}
        onDoubleClick={handleDoubleClick}
      >
        {/* Handle de Entrada */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-[10px] !h-[10px] !bg-white !border-2 !border-[#9B9BAD] hover:!border-current transition-colors"
          style={{ 
            left: -5,
            borderColor: selected ? colors.borderColor : undefined 
          }}
        />

        {/* Conteúdo */}
        <div className="flex items-start gap-[12px]">
          {/* Ícone */}
          <div
            className={`
              w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0
              ${isTuring ? 'bg-gradient-turing-animated' : ''}\n            `}
            style={{
              backgroundColor: !isTuring ? colors.bg : undefined,
            }}
          >
            <Icon 
              size={24} 
              weight="duotone" 
              style={{ color: colors.iconColor }}
            />
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <div className="text-[#122232] text-[14px] font-semibold leading-tight mb-[2px]" style={ff}>
              {data.label}
            </div>
            {data.subtitle && (
              <div className="text-[#98989d] text-[12px] leading-tight truncate" style={ff}>
                {data.subtitle}
              </div>
            )}
          </div>
        </div>

        {/* Badge Turing IA */}
        {isTuring && (
          <div className="absolute -top-[8px] -right-[8px] bg-gradient-turing-animated text-white text-[9px] font-bold px-[6px] py-[2px] rounded-[4px]" style={ff}>
            IA
          </div>
        )}

        {/* Handles de Saída */}
        {data.outputCount === 1 && (
          <Handle
            type="source"
            position={Position.Right}
            className="!w-[10px] !h-[10px] !bg-white !border-2 !border-[#9B9BAD] hover:!border-current transition-colors"
            style={{ 
              right: -5,
              borderColor: selected ? colors.borderColor : undefined 
            }}
          />
        )}

        {data.outputCount === 2 && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              id="output-1"
              className="!w-[10px] !h-[10px] !bg-white !border-2 !border-[#9B9BAD] hover:!border-current transition-colors"
              style={{ 
                right: -5,
                top: '30%',
                borderColor: selected ? colors.borderColor : undefined 
              }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="output-2"
              className="!w-[10px] !h-[10px] !bg-white !border-2 !border-[#9B9BAD] hover:!border-current transition-colors"
              style={{ 
                right: -5,
                top: '70%',
                borderColor: selected ? colors.borderColor : undefined 
              }}
            />
          </>
        )}

        {/* Handle especial Turing Tools (inferior) */}
        {isTuring && (
          <Handle
            type="source"
            position={Position.Bottom}
            id="tools"
            className="!w-[12px] !h-[12px] !bg-white !border-2 !border-[#9B9BAD] !rotate-45 hover:!border-current transition-colors"
            style={{ 
              bottom: -6,
              borderColor: selected ? colors.borderColor : undefined 
            }}
          />
        )}
      </div>
    </div>
  );
}

export default memo(ZeniteNode);