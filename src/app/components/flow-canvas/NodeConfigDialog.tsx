import { useState } from 'react';
import { X, Play } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { getNodeIcon, ALL_NODES } from '../../data/node-catalog';
import type { ZeniteNodeData, NodeGroup } from '../../types/node-types';
import ConfiguracoesTab from './config-forms/ConfiguracoesTab';
import GatilhoParams from './config-forms/GatilhoParams';
import PassoParams from './config-forms/PassoParams';
import RotaParams from './config-forms/RotaParams';
import TuringParams from './config-forms/TuringParams';
import NotificacoesParams from './config-forms/NotificacoesParams';
import TempoParams from './config-forms/TempoParams';
import VariavelParams from './config-forms/VariavelParams';
import GenericParams from './config-forms/GenericParams';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface NodeConfigDialogProps {
  nodeData: ZeniteNodeData;
  onClose: () => void;
  onSave: (data: ZeniteNodeData) => void;
}

export default function NodeConfigDialog({ nodeData, onClose, onSave }: NodeConfigDialogProps) {
  const [localData, setLocalData] = useState(nodeData);
  const [activeTab, setActiveTab] = useState<'parameters' | 'settings'>('parameters');
  
  // Buscar definição do nó no catálogo
  const nodeDefinition = ALL_NODES.find(n => n.name === nodeData.type);
  const Icon = getNodeIcon(nodeData.type);

  // Obter cor baseada no grupo do nó
  const getCategoryColor = () => {
    if (!nodeDefinition?.group) return { bg: '#F6F7F9', icon: '#4E6987' };
    
    const group = nodeDefinition.group[0];
    const categoryMap: Record<string, { bg: string; icon: string }> = {
      'gatilho': { bg: '#d9f8ef', icon: '#3CCEA7' },
      'passo': { bg: '#e8e8f5', icon: '#6868B1' },
      'turing': { bg: '#dcf0ff', icon: '#07ABDE' },
      'bifurcacao': { bg: '#e8e8f5', icon: '#6868B1' },
      'rota': { bg: '#e8e8f5', icon: '#6868B1' },
      'repeticao': { bg: '#e8e8f5', icon: '#6868B1' },
      'tempo': { bg: '#f0f2f5', icon: '#9B9BAD' },
      'juncao': { bg: '#e8e8f5', icon: '#6868B1' },
      'filtro': { bg: '#fff4e6', icon: '#F5A623' },
      'aprovacao': { bg: '#dcf0ff', icon: '#07ABDE' },
      'conector': { bg: '#f0f2f5', icon: '#9B9BAD' },
      'script': { bg: '#f0f2f5', icon: '#9B9BAD' },
      'variavel': { bg: '#fff4e6', icon: '#F5A623' },
      'molde': { bg: '#fff4e6', icon: '#F5A623' },
      'notificacoes': { bg: '#ffe5e5', icon: '#FF6B6B' },
      'webhook': { bg: '#f0f2f5', icon: '#9B9BAD' },
    };
    
    return categoryMap[group] || { bg: '#F6F7F9', icon: '#4E6987' };
  };

  const categoryColors = getCategoryColor();

  const handleSave = () => {
    console.log('💾 Salvando nó com parâmetros:', {
      label: localData.label,
      params: localData.params,
      config: localData.config,
    });
    onSave(localData);
    onClose();
  };

  const handleExecute = () => {
    // TODO: Implementar execução do step
    console.log('Executar step:', localData);
    toast.success('Step executado com sucesso!');
  };

  // Determinar qual formulário de parâmetros mostrar baseado na categoria
  const getParamsComponent = () => {
    const group = nodeDefinition?.group?.[0] as NodeGroup | undefined;
    
    const params = localData.params || {};
    const setParams = (newParams: any) => {
      setLocalData({ ...localData, params: newParams });
    };

    switch (group) {
      case 'gatilho':
        return <GatilhoParams params={params} onChange={setParams} />;
      case 'passo':
        return <PassoParams params={params} onChange={setParams} />;
      case 'rota':
        return <RotaParams params={params} onChange={setParams} />;
      case 'turing':
        return <TuringParams params={params} onChange={setParams} />;
      case 'notificacoes':
        return <NotificacoesParams params={params} onChange={setParams} />;
      case 'tempo':
        return <TempoParams params={params} onChange={setParams} />;
      case 'variavel':
        return <VariavelParams params={params} onChange={setParams} />;
      default:
        return <GenericParams nodeType={nodeData.type} params={params} onChange={setParams} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div 
        className="relative bg-white rounded-[16px] flex flex-col mx-[40px] my-[40px]"
        style={{ 
          width: 'calc(100vw - 80px)',
          height: 'calc(100vh - 80px)',
          boxShadow: '0px 8px 32px 0px rgba(18,34,50,0.16), 0px 4px 8px 0px rgba(18,34,50,0.08)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#DDE3EC]">
          <div className="flex items-center gap-[12px]">
            <div 
              className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center"
              style={{ backgroundColor: categoryColors.bg }}
            >
              <Icon size={18} weight="duotone" style={{ color: categoryColors.icon }} />
            </div>
            <h2 
              className="text-[#122232] font-semibold"
              style={{ fontSize: 15, letterSpacing: -0.3, ...ff }}
            >
              {localData.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-[8px]">
            <button
              onClick={handleSave}
              className="h-[34px] px-[16px] rounded-[500px] bg-[#0483AB] hover:bg-[#0377A0] text-white font-bold uppercase flex items-center gap-[6px] transition-colors"
              style={{ fontSize: 10, letterSpacing: 0.5, ...ff }}
            >
              SALVAR
            </button>
            <button
              onClick={onClose}
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[#4E6987] hover:bg-[#F6F7F9] transition-colors"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: INPUT */}
          <div className="w-[240px] border-r border-[#DDE3EC] bg-[#F6F7F9] p-[16px] rounded-t-[0px] rounded-bl-[16px] rounded-br-[0px]">
            <div 
              className="text-[#4E6987] font-bold uppercase mb-[12px]"
              style={{ fontSize: 10, letterSpacing: 0.5, ...ff }}
            >
              INPUT
            </div>
            
            <div className="flex flex-col gap-[8px]">
              {nodeDefinition?.inputs && nodeDefinition.inputs.length > 0 ? (
                nodeDefinition.inputs.map((input, idx) => (
                  <div 
                    key={idx}
                    className="text-[#122232] text-[12px] py-[8px] px-[12px] bg-white rounded-[6px] border border-[#DDE3EC]"
                    style={{ ...ff }}
                  >
                    {input}
                  </div>
                ))
              ) : (
                <div className="text-[#98989d] text-center py-[24px]" style={{ fontSize: 12, ...ff }}>
                  No input data
                  <div className="text-[10px] mt-[4px]">
                    Execute previous nodes<br />to view input data
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: PARAMETERS/SETTINGS */}
          <div className="flex-1 flex flex-col">
            {/* Segmented Control + Execute Button */}
            <div className="border-b border-[#DDE3EC] px-[24px] py-[12px] flex items-center justify-between">
              <div className="relative flex items-center gap-[4px] h-[44px] p-[4px] bg-[#F6F7F9] rounded-[100px] w-fit">
                <div 
                  className="absolute inset-0 pointer-events-none rounded-[inherit]"
                  style={{ 
                    boxShadow: "inset 0px -0.5px 1px 0px rgba(255,255,255,0.3), inset 0px -0.5px 1px 0px rgba(255,255,255,0.25), inset 1px 1.5px 4px 0px rgba(0,0,0,0.08), inset 1px 1.5px 4px 0px rgba(0,0,0,0.1)" 
                  }} 
                />
                {([
                  { key: 'parameters', label: 'Parâmetros' },
                  { key: 'settings', label: 'Configurações' }
                ] as const).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex items-center gap-[3px] h-[36px] px-[16px] rounded-[100px] transition-all cursor-pointer ${
                      activeTab === tab.key
                        ? "text-[#F6F7F9]"
                        : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"
                    }`}
                  >
                    {activeTab === tab.key && (
                      <>
                        <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]"
                          style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                        />
                      </>
                    )}
                    <span className="relative z-[1] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleExecute}
                className="h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] hover:bg-[#30B893] text-white font-bold uppercase flex items-center gap-[6px] transition-colors"
                style={{ fontSize: 10, letterSpacing: 0.5, ...ff }}
              >
                <Play size={14} weight="bold" />
                EXECUTAR PASSO
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-[24px]">
              {activeTab === 'parameters' ? (
                getParamsComponent()
              ) : (
                <ConfiguracoesTab 
                  config={localData.config || {}} 
                  onChange={(newConfig) => setLocalData({ ...localData, config: newConfig })} 
                />
              )}
            </div>
          </div>

          {/* Right: OUTPUT */}
          <div className="w-[240px] border-l border-[#DDE3EC] bg-[#F6F7F9] p-[16px] rounded-t-[0px] rounded-bl-[0px] rounded-br-[16px]">
            <div 
              className="text-[#4E6987] font-bold uppercase mb-[12px]"
              style={{ fontSize: 10, letterSpacing: 0.5, ...ff }}
            >
              OUTPUT
            </div>
            
            <div className="flex flex-col gap-[8px]">
              {nodeDefinition?.outputs && nodeDefinition.outputs.length > 0 ? (
                nodeDefinition.outputs.map((output, idx) => (
                  <div 
                    key={idx}
                    className="text-[#122232] text-[12px] py-[8px] px-[12px] bg-white rounded-[6px] border border-[#DDE3EC]"
                    style={{ ...ff }}
                  >
                    {output}
                  </div>
                ))
              ) : (
                <div className="text-[#98989d] text-center py-[24px]" style={{ fontSize: 12, ...ff }}>
                  No output data
                  <div className="text-[10px] mt-[4px]">
                    Execute step<br />or set mock data
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}