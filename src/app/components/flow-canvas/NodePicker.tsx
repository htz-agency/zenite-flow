import { useState, useMemo } from 'react';
import {
  MagnifyingGlass,
  X,
  CaretLeft,
  Lightning,
  Play,
  GitFork,
  Signpost,
  ArrowsClockwise,
  Repeat,
  HourglassSimple,
  ArrowsMerge,
  FunnelSimple,
  Plugs,
  DoorOpen,
  WebhooksLogo,
  Code,
  CheckCircle,
  Atom,
  Database,
  Sigma,
  Blueprint,
  Bell,
  BellRinging,
  TreeStructure,
  ClipboardText,
  Files,
} from '@phosphor-icons/react';
import { nodeCatalog } from '../../data/node-catalog';
import { getNodeIcon, getNodeColor } from '../../data/node-catalog';
import type { NodeGroup } from '../../types/node-types';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface NodePickerProps {
  onNodeSelect: (nodeType: string, group: NodeGroup) => void;
  onClose: () => void;
  position?: { x: number; y: number };
}

const recentNodes = [
  { type: 'crm_criar_lead', group: 'passo' as NodeGroup, label: 'Passo CRM' },
  { type: 'turing_chat', group: 'turing' as NodeGroup, label: 'Turing' },
  { type: 'gmail_send', group: 'passo' as NodeGroup, label: 'Gmail' },
];

const categories = [
  { id: 'gatilho', label: 'Gatilhos', Icon: Lightning, color: '#DCF0FF', iconColor: '#0483AB' },
  { id: 'passo', label: 'Ações', Icon: Play, color: '#D9F8EF', iconColor: '#3CCEA7' },
  { id: 'bifurcacao', label: 'Bifurcação', Icon: GitFork, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'rota', label: 'Rota', Icon: Signpost, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'repeticao', label: 'Repetição', Icon: Repeat, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'pausa', label: 'Tempo', Icon: HourglassSimple, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'juncao', label: 'Junção', Icon: ArrowsMerge, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'filtro', label: 'Filtro', Icon: FunnelSimple, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'conector', label: 'Conector', Icon: Plugs, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'portal', label: 'Webhooks', Icon: WebhooksLogo, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'script', label: 'Script', Icon: Code, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'aprovacao', label: 'Aprovação', Icon: CheckCircle, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'turing', label: 'Turing', Icon: Atom, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'memoria', label: 'Variável', Icon: Sigma, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'molde', label: 'Molde', Icon: Blueprint, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'alerta', label: 'Notificações', Icon: BellRinging, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'subfluxo', label: 'Sub-fluxo', Icon: TreeStructure, color: '#E8E8FD', iconColor: '#6868B1' },
  { id: 'registro', label: 'Registro', Icon: Files, color: '#E8E8FD', iconColor: '#6868B1' },
];

export default function NodePicker({ onNodeSelect, onClose, position }: NodePickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNodes = useMemo(() => {
    let nodes = Object.values(nodeCatalog).flat();

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      nodes = nodes.filter(
        (node) =>
          node.label.toLowerCase().includes(term) ||
          node.description?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      nodes = nodes.filter((node) => node.group === selectedCategory);
    }

    return nodes;
  }, [searchTerm, selectedCategory]);

  return (
    <>
      {/* Overlay */}
      <div
        className="absolute inset-0 bottom-[64px] z-40 bg-transparent"
        onClick={onClose}
      />

      {/* Picker — Painel Lateral (Card DS: bg-white rounded-[15px]) */}
      <div
        className="absolute right-[16px] top-[16px] z-50 bg-white rounded-[15px] w-[316px] max-h-[calc(100%-96px)] flex flex-col overflow-hidden"
        style={{ boxShadow: '0px 2px 8px 0px rgba(18,34,50,0.10), 0px 4px 16px 0px rgba(18,34,50,0.06)' }}
      >
        {/* Header — H1 + Action Pill com X */}
        <div className="p-[16px] pb-[12px] flex items-center justify-between">
          <h1
            className="text-[#122232]"
            style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.5, lineHeight: '22px', ...ff }}
          >
            Selecione um nó
          </h1>
          {/* Action Pill — Botão único (DS: bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]) */}
          <div className="flex items-center bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
            <button
              onClick={onClose}
              className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
              title="Fechar"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {!selectedCategory && !searchTerm && (
            <>
              {/* Recentes */}
              <div className="p-[16px] border-b border-[#DDE3EC]">
                {/* Label DS: fontSize 9, fontWeight 700, uppercase, letterSpacing 0.5 */}
                <span
                  className="text-[#98989d] uppercase block mb-[8px]"
                  style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}
                >
                  Recentes
                </span>
                <div className="flex gap-[8px]">
                  {recentNodes.map((node) => {
                    const Icon = getNodeIcon(node.type);
                    const color = getNodeColor(node.group);
                    // Buscar dados reais do catálogo
                    const realNode = Object.values(nodeCatalog).flat().find(n => n.type === node.type);
                    const displayLabel = realNode ? realNode.label : node.label;
                    return (
                      <button
                        key={node.type}
                        onClick={() => onNodeSelect(node.type, node.group)}
                        className="flex-1 p-[10px] rounded-[10px] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                      >
                        <div
                          className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center mx-auto mb-[6px]"
                          style={{ backgroundColor: color }}
                        >
                          <Icon size={18} weight="duotone" className="text-white" />
                        </div>
                        <div
                          className="text-[#4E6987] text-center truncate"
                          style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                        >
                          {displayLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categorias */}
              <div className="p-[16px]">
                <span
                  className="text-[#98989d] uppercase block mb-[8px]"
                  style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}
                >
                  Categorias
                </span>
                <div
                  className="relative flex items-center gap-[10px] h-[40px] px-[14px] rounded-full bg-[#DDE3EC] mb-[8px]"
                  style={{ boxShadow: 'inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)' }}
                >
                  <MagnifyingGlass
                    size={16}
                    weight="duotone"
                    className="text-[#98989d] shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Buscar nós..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-[#28415c] placeholder:text-[#c8cfdb]"
                    style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-[8px]">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="h-[40px] px-[12px] rounded-[10px] bg-[#F6F7F9] hover:bg-[#EBEDF0] transition-colors flex items-center gap-[8px] text-left cursor-pointer"
                    >
                      <div
                        className="w-[24px] h-[24px] rounded-[7px] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: category.color, marginLeft: '-2px' }}
                      >
                        <category.Icon 
                          size={14} 
                          weight="duotone" 
                          style={{ color: category.iconColor }}
                        />
                      </div>
                      <span
                        className="text-[#28415C] flex-1 truncate"
                        style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                      >
                        {category.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Lista de nós filtrados */}
          {(selectedCategory || searchTerm) && (
            <div className="p-[8px]">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-full text-left px-[12px] py-[8px] rounded-[10px] hover:bg-[#F6F7F9] mb-[4px] flex items-center gap-[6px] transition-colors cursor-pointer"
                >
                  <CaretLeft size={14} weight="duotone" className="text-[#0483AB]" />
                  <span
                    className="text-[#0483AB]"
                    style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}
                  >
                    Voltar
                  </span>
                </button>
              )}

              {filteredNodes.length === 0 ? (
                <div
                  className="text-center py-[32px] text-[#98989d]"
                  style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                >
                  Nenhum nó encontrado
                </div>
              ) : (
                <div className="flex flex-col gap-[2px]">
                  {filteredNodes.map((node) => {
                    const Icon = getNodeIcon(node.type);
                    // Se há categoria selecionada, usa as cores da categoria
                    const selectedCat = categories.find(cat => cat.id === selectedCategory);
                    const color = selectedCat ? selectedCat.color : getNodeColor(node.group);
                    const iconColor = selectedCat ? selectedCat.iconColor : '#FFFFFF';
                    return (
                      <button
                        key={node.type}
                        onClick={() => onNodeSelect(node.type, node.group)}
                        className="w-full p-[10px] rounded-[10px] hover:bg-[#F6F7F9] transition-colors flex items-center gap-[10px] cursor-pointer"
                      >
                        <div
                          className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: color }}
                        >
                          <Icon size={18} weight="duotone" style={{ color: iconColor }} />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div
                            className="text-[#122232] truncate"
                            style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
                          >
                            {node.label}
                          </div>
                          {node.description && (
                            <div
                              className="text-[#98989d] truncate"
                              style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}
                            >
                              {node.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}