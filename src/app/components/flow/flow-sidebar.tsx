import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  House,
  FolderOpen,
  GitBranch,
  ChartBar,
  ArrowsClockwise,
  AddressBook,
  Bell,
  GearSix,
  MagnifyingGlass,
  Plus,
  CaretDown,
  CaretRight,
  Lightning,
  BookOpen,
  Palette,
} from "@phosphor-icons/react";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

export default function FlowSidebar() {
  const location = useLocation();
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState<"active" | "inactive" | "templates" | null>("active");

  const isActive = (path: string) => location.pathname === path;

  const railItems = [
    { icon: House, label: "Início", path: "/", app: "Home" },
    { icon: FolderOpen, label: "Projects", path: "/projects", app: "Projects" },
    { icon: GitBranch, label: "Flow", path: "/", app: "Flow", active: true },
    { icon: ChartBar, label: "Dash", path: "/dash", app: "Dash" },
    { icon: ArrowsClockwise, label: "Sync", path: "/sync", app: "Sync" },
    { icon: AddressBook, label: "CRM", path: "/crm", app: "CRM" },
  ];

  const bottomItems = [
    { icon: Bell, label: "Notificações" },
    { icon: Palette, label: "Design System", path: "/design-system" },
    { icon: GearSix, label: "Configurações" },
  ];

  return (
    <div className="flex h-full">
      {/* Rail - 72px */}
      <div className="w-[72px] bg-white border-r border-[#EBEBF5] flex flex-col items-center py-[16px]">
        {/* Logo Zenite */}
        <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#8C8CD4] via-[#07ABDE] to-[#3CCEA7] rounded-[12px] flex items-center justify-center mb-[24px]">
          <span className="text-white text-[18px] font-bold" style={ff}>Z</span>
        </div>

        {/* Separator */}
        <div className="w-[24px] h-[2px] bg-[#EBEBF5] rounded-full mb-[16px]" />

        {/* Navigation items */}
        <div className="flex-1 flex flex-col gap-[8px] w-full items-center">
          {railItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="group relative"
            >
              <div
                className={`w-[48px] h-[48px] rounded-[12px] flex items-center justify-center transition-all ${
                  item.active
                    ? "bg-[#DCF0FF] text-[#0483AB]"
                    : "text-[#4E6987] hover:bg-[#F6F7F9]"
                }`}
              >
                <item.icon size={24} weight={item.active ? "fill" : "regular"} />
              </div>
              {/* Tooltip */}
              <div className="absolute left-[64px] top-1/2 -translate-y-1/2 px-[12px] py-[6px] bg-[#122232] text-white rounded-[8px] text-[12px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" style={ff}>
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-[#122232]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Separator bottom */}
        <div className="w-[24px] h-[2px] bg-[#EBEBF5] rounded-full mb-[16px]" />

        {/* Bottom items */}
        <div className="flex flex-col gap-[8px] w-full items-center mb-[16px]">
          {bottomItems.map((item) => {
            if (item.path) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="group relative w-[48px] h-[48px] rounded-[12px] flex items-center justify-center text-[#4E6987] hover:bg-[#DCF0FF] transition-all"
                >
                  <item.icon size={24} weight="duotone" />
                  {/* Tooltip */}
                  <div className="absolute left-[64px] top-1/2 -translate-y-1/2 px-[12px] py-[6px] bg-[#122232] text-white rounded-[8px] text-[12px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50" style={ff}>
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-[#122232]" />
                  </div>
                </Link>
              );
            }
            return (
              <button
                key={item.label}
                className="group relative w-[48px] h-[48px] rounded-[12px] flex items-center justify-center text-[#4E6987] hover:bg-[#F6F7F9] transition-all"
              >
                <item.icon size={24} weight="duotone" />
                {/* Tooltip */}
                <div className="absolute left-[64px] top-1/2 -translate-y-1/2 px-[12px] py-[6px] bg-[#122232] text-white rounded-[8px] text-[12px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50" style={ff}>
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-[#122232]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Avatar */}
        <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#6868B1] to-[#8C8CD4] flex items-center justify-center text-white text-[14px] font-bold cursor-pointer" style={ff}>
          JD
        </div>
      </div>

      {/* Panel - 224px (expandido quando GitBranch ativo) */}
      {panelExpanded && (
        <div className="w-[224px] bg-white border-r border-[#EBEBF5] flex flex-col">
          {/* Header */}
          <div className="p-[16px] border-b border-[#EBEBF5]">
            <div className="flex items-center justify-between mb-[12px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] bg-[#DCF0FF] rounded-[8px] flex items-center justify-center">
                  <GitBranch size={18} weight="bold" className="text-[#0483AB]" />
                </div>
                <span className="text-[#122232] font-bold text-[15px]" style={{ letterSpacing: -0.5, ...ff }}>
                  Zenite Flow
                </span>
              </div>
            </div>
            <Link
              to="/editor"
              className="w-full h-[34px] flex items-center justify-center gap-[6px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors"
            >
              <Plus size={16} weight="bold" />
              <span className="font-bold uppercase tracking-[0.5px] text-[10px]" style={ff}>
                Novo Fluxo
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="p-[16px] border-b border-[#EBEBF5]">
            <div className="relative">
              <MagnifyingGlass size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#98989d]" weight="bold" />
              <input
                type="text"
                placeholder="Pesquisar fluxos..."
                className="w-full h-[36px] pl-[36px] pr-[12px] bg-[#F6F7F9] border border-[#EBEBF5] rounded-[8px] text-[13px] text-[#122232] placeholder:text-[#98989d] focus:outline-none focus:border-[#0483AB] transition-colors"
                style={{ letterSpacing: -0.3, ...ff }}
              />
            </div>
          </div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto p-[12px]">
            {/* ATIVOS */}
            <div className="mb-[8px]">
              <button
                onClick={() => setActiveSection(activeSection === "active" ? null : "active")}
                className="w-full flex items-center justify-between px-[8px] py-[6px] hover:bg-[#F6F7F9] rounded-[6px] transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  {activeSection === "active" ? (
                    <CaretDown size={12} weight="bold" className="text-[#4E6987]" />
                  ) : (
                    <CaretRight size={12} weight="bold" className="text-[#4E6987]" />
                  )}
                  <span className="text-[#4E6987] uppercase font-bold text-[9px] tracking-[0.5px]" style={ff}>
                    Ativos
                  </span>
                </div>
                <div className="h-[18px] px-[6px] bg-[#D9F8EF] rounded-[4px] flex items-center justify-center">
                  <span className="text-[#3CCEA7] font-bold text-[9px]" style={ff}>3</span>
                </div>
              </button>
              {activeSection === "active" && (
                <div className="mt-[4px] ml-[20px] space-y-[2px]">
                  <Link
                    to="/editor/1"
                    className="block px-[8px] py-[6px] text-[12px] text-[#122232] hover:bg-[#F6F7F9] rounded-[6px] transition-colors"
                    style={{ letterSpacing: -0.3, ...ff }}
                  >
                    Deal Ganho → Projeto
                  </Link>
                  <Link
                    to="/editor/2"
                    className="block px-[8px] py-[6px] text-[12px] text-[#122232] hover:bg-[#F6F7F9] rounded-[6px] transition-colors"
                    style={{ letterSpacing: -0.3, ...ff }}
                  >
                    Lead Frio → Notify
                  </Link>
                  <Link
                    to="/editor/3"
                    className="block px-[8px] py-[6px] text-[12px] text-[#122232] hover:bg-[#F6F7F9] rounded-[6px] transition-colors"
                    style={{ letterSpacing: -0.3, ...ff }}
                  >
                    Form Externo → Lead
                  </Link>
                </div>
              )}
            </div>

            {/* INATIVOS */}
            <div className="mb-[8px]">
              <button
                onClick={() => setActiveSection(activeSection === "inactive" ? null : "inactive")}
                className="w-full flex items-center justify-between px-[8px] py-[6px] hover:bg-[#F6F7F9] rounded-[6px] transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  {activeSection === "inactive" ? (
                    <CaretDown size={12} weight="bold" className="text-[#4E6987]" />
                  ) : (
                    <CaretRight size={12} weight="bold" className="text-[#4E6987]" />
                  )}
                  <span className="text-[#4E6987] uppercase font-bold text-[9px] tracking-[0.5px]" style={ff}>
                    Inativos
                  </span>
                </div>
                <div className="h-[18px] px-[6px] bg-[#F6F7F9] rounded-[4px] flex items-center justify-center">
                  <span className="text-[#98989d] font-bold text-[9px]" style={ff}>1</span>
                </div>
              </button>
              {activeSection === "inactive" && (
                <div className="mt-[4px] ml-[20px] space-y-[2px]">
                  <Link
                    to="/editor/4"
                    className="block px-[8px] py-[6px] text-[12px] text-[#98989d] hover:bg-[#F6F7F9] rounded-[6px] transition-colors"
                    style={{ letterSpacing: -0.3, ...ff }}
                  >
                    Onboarding Cliente
                  </Link>
                </div>
              )}
            </div>

            {/* MODELOS */}
            <div>
              <button
                onClick={() => setActiveSection(activeSection === "templates" ? null : "templates")}
                className="w-full flex items-center justify-between px-[8px] py-[6px] hover:bg-[#F6F7F9] rounded-[6px] transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  {activeSection === "templates" ? (
                    <CaretDown size={12} weight="bold" className="text-[#4E6987]" />
                  ) : (
                    <CaretRight size={12} weight="bold" className="text-[#4E6987]" />
                  )}
                  <span className="text-[#4E6987] uppercase font-bold text-[9px] tracking-[0.5px]" style={ff}>
                    Modelos
                  </span>
                </div>
              </button>
              {activeSection === "templates" && (
                <div className="mt-[4px] ml-[20px]">
                  <Link
                    to="/templates"
                    className="flex items-center gap-[6px] px-[8px] py-[6px] text-[12px] text-[#0483AB] hover:bg-[#DCF0FF] rounded-[6px] transition-colors"
                    style={{ letterSpacing: -0.3, ...ff }}
                  >
                    Ver biblioteca
                    <BookOpen size={14} weight="bold" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Footer stats */}
          <div className="p-[16px] border-t border-[#EBEBF5] space-y-[8px]">
            <div className="flex items-center justify-between">
              <span className="text-[#98989d] text-[11px]" style={{ letterSpacing: -0.3, ...ff }}>
                Execuções hoje
              </span>
              <div className="flex items-center gap-[4px]">
                <Lightning size={12} weight="fill" className="text-[#3CCEA7]" />
                <span className="text-[#122232] font-bold text-[12px]" style={ff}>47</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#98989d] text-[11px]" style={{ letterSpacing: -0.3, ...ff }}>
                Erros hoje
              </span>
              <span className="text-[#3CCEA7] font-bold text-[12px]" style={ff}>0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}