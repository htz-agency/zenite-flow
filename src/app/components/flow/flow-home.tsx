import { useState } from "react";
import { Link } from "react-router";
import { Plus, GitBranch, Lightning, Warning, Toggle, ToggleLeft, NotePencil, ArrowsClockwise, EnvelopeSimple, AddressBook, WebhooksLogo } from "@phosphor-icons/react";
import { mockFlows } from "./flow-data";
import { motion } from "motion/react";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

export default function FlowHome() {
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "templates">("all");

  const activeFlows = mockFlows.filter(f => f.status === "active");
  const inactiveFlows = mockFlows.filter(f => f.status === "inactive");
  
  const filteredFlows = 
    filter === "active" ? activeFlows :
    filter === "inactive" ? inactiveFlows :
    filter === "templates" ? [] :
    mockFlows;

  const getIconForNode = (iconName: string) => {
    const icons: Record<string, any> = {
      ArrowDown: ArrowsClockwise,
      FolderOpen: GitBranch,
      Clock: Lightning,
      WhatsappLogo: EnvelopeSimple,
      Webhook: WebhooksLogo,
      AddressBook: AddressBook,
      EnvelopeSimple: EnvelopeSimple,
    };
    return icons[iconName] || GitBranch;
  };

  return (
    <div className="p-[32px]">
      {/* Header */}
      <div className="mb-[32px]">
        <div className="flex items-center justify-between mb-[8px]">
          <div>
            <h1 className="text-[#122232] text-[29px] font-bold mb-[4px]" style={{ letterSpacing: -0.5, lineHeight: "38px", ...ff }}>
              Fluxos
            </h1>
            <p className="text-[#4E6987] text-[14px] font-medium" style={{ letterSpacing: -0.3, ...ff }}>
              {activeFlows.length} ativos · {inactiveFlows.length} inativo
            </p>
          </div>
          <Link
            to="/flow-builder"
            className="group/pill relative flex items-center gap-[3px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer"
          >
            <Plus size={16} weight="bold" />
            <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px", ...ff }}>
              Criar Fluxo
            </span>
          </Link>
        </div>

        {/* Filtros pill */}
        <div className="flex gap-[8px] mt-[16px]">
          {[
            { id: "all", label: "Todos" },
            { id: "active", label: "Ativos" },
            { id: "inactive", label: "Inativos" },
            { id: "templates", label: "Modelos" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`h-[32px] px-[16px] rounded-[500px] text-[10px] font-bold uppercase tracking-[0.5px] transition-all ${
                filter === f.id
                  ? "bg-[#07ABDE] text-[#DCF0FF]"
                  : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#DDE3EC]"
              }`}
              style={ff}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-3 gap-[16px] mb-[32px]">
        <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[#98989d] uppercase text-[9px] font-bold tracking-[0.5px]" style={ff}>
              Fluxos Ativos
            </span>
            <div className="w-[32px] h-[32px] bg-[#E8E8FD] rounded-[8px] flex items-center justify-center">
              <GitBranch size={18} weight="fill" className="text-[#6868B1]" />
            </div>
          </div>
          <div className="text-[#122232] text-[38px] font-bold" style={{ letterSpacing: -0.5, ...ff }}>
            {activeFlows.length}
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[#98989d] uppercase text-[9px] font-bold tracking-[0.5px]" style={ff}>
              Execuções Hoje
            </span>
            <div className="w-[32px] h-[32px] bg-[#D9F8EF] rounded-[8px] flex items-center justify-center">
              <Lightning size={18} weight="fill" className="text-[#3CCEA7]" />
            </div>
          </div>
          <div className="text-[#122232] text-[38px] font-bold" style={{ letterSpacing: -0.5, ...ff }}>
            262
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[#98989d] uppercase text-[9px] font-bold tracking-[0.5px]" style={ff}>
              Erros Hoje
            </span>
            <div className="w-[32px] h-[32px] bg-[#D9F8EF] rounded-[8px] flex items-center justify-center">
              <Warning size={18} weight="fill" className="text-[#3CCEA7]" />
            </div>
          </div>
          <div className="text-[#3CCEA7] text-[38px] font-bold" style={{ letterSpacing: -0.5, ...ff }}>
            0
          </div>
        </div>
      </div>

      {/* Grid de fluxos */}
      {filter === "templates" ? (
        <div className="flex flex-col items-center justify-center py-[80px]">
          <GitBranch size={64} weight="regular" className="text-[#C8C8E8] mb-[16px]" />
          <p className="text-[#122232] text-[19px] font-bold mb-[4px]" style={{ letterSpacing: -0.5, ...ff }}>
            Nenhum modelo disponível
          </p>
          <p className="text-[#4E6987] text-[14px] mb-[20px]" style={{ letterSpacing: -0.3, ...ff }}>
            Visite nossa biblioteca de templates
          </p>
          <Link
            to="/templates"
            className="h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors flex items-center justify-center"
          >
            <span className="font-bold uppercase tracking-[0.5px] text-[10px]" style={ff}>
              Ver Biblioteca
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-[16px]">
          {filteredFlows.map((flow, idx) => {
            const previewNodes = flow.nodes.slice(0, 3);
            
            return (
              <motion.div
                key={flow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200 relative"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-[12px]">
                  <div className="flex-1">
                    <h3 className="text-[#122232] text-[16px] font-semibold mb-[4px]" style={{ letterSpacing: -0.5, ...ff }}>
                      {flow.name}
                    </h3>
                    <p className="text-[#98989d] text-[13px]" style={{ letterSpacing: -0.3, ...ff }}>
                      {flow.description}
                    </p>
                  </div>
                  <div className={`h-[22px] px-[8px] rounded-[4px] flex items-center justify-center ${
                    flow.status === "active" ? "bg-[#D9F8EF]" : "bg-[#F6F7F9]"
                  }`}>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.5px] ${
                      flow.status === "active" ? "text-[#3CCEA7]" : "text-[#98989d]"
                    }`} style={ff}>
                      {flow.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>

                {/* Preview linha */}
                <div className="flex items-center gap-[8px] mb-[16px] py-[12px] px-[12px] bg-[#F6F7F9] rounded-[8px]">
                  {previewNodes.map((node, i) => {
                    const Icon = getIconForNode(node.icon);
                    return (
                      <div key={node.id} className="flex items-center gap-[8px]">
                        <div className="w-[24px] h-[24px] bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBF5]">
                          <Icon size={14} weight="bold" className="text-[#6868B1]" />
                        </div>
                        {i < previewNodes.length - 1 && (
                          <div className="w-[16px] h-[2px] bg-[#C8C8E8] rounded-full" />
                        )}
                      </div>
                    );
                  })}
                  {flow.nodes.length > 3 && (
                    <span className="text-[#98989d] text-[11px] ml-[4px]" style={ff}>
                      +{flow.nodes.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-[4px]">
                    {flow.lastRun && (
                      <span className="text-[#98989d] text-[11px]" style={{ letterSpacing: -0.3, ...ff }}>
                        Última execução: {flow.lastRun}
                      </span>
                    )}
                    <span className="text-[#4E6987] text-[12px] font-semibold" style={{ letterSpacing: -0.3, ...ff }}>
                      {flow.executions} execuções
                    </span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <button
                      className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors ${
                        flow.status === "active"
                          ? "bg-[#D9F8EF] text-[#3CCEA7]"
                          : "bg-[#F6F7F9] text-[#98989d]"
                      }`}
                    >
                      {flow.status === "active" ? (
                        <Toggle size={16} weight="fill" />
                      ) : (
                        <ToggleLeft size={16} weight="regular" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Botão Editar (hover) */}
                <Link
                  to={`/flow-builder/${flow.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#6868B1] text-white hover:bg-[#4E4E91] transition-colors">
                    <NotePencil size={14} weight="bold" />
                    <span className="font-bold uppercase tracking-[0.5px] text-[10px]" style={ff}>
                      Editar
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Empty state quando não há fluxos */}
      {filteredFlows.length === 0 && filter !== "templates" && (
        <div className="flex flex-col items-center justify-center py-[80px]">
          <GitBranch size={64} weight="regular" className="text-[#C8C8E8] mb-[16px]" />
          <p className="text-[#122232] text-[19px] font-bold mb-[4px]" style={{ letterSpacing: -0.5, ...ff }}>
            Nenhum fluxo {filter === "active" ? "ativo" : "inativo"} encontrado
          </p>
          <p className="text-[#4E6987] text-[14px] mb-[20px]" style={{ letterSpacing: -0.3, ...ff }}>
            Crie seu primeiro fluxo de automação
          </p>
          <Link
            to="/editor"
            className="h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all flex items-center gap-[3px]"
          >
            <Plus size={16} weight="bold" />
            <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px", ...ff }}>
              Criar primeiro fluxo
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}