import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  House,
  GitBranch,
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  Plus,
  Sidebar as SidebarIcon,
  DotsNine,
  Lightning,
  Swatches,
  Key,
} from "@phosphor-icons/react";

const fontFeature = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const location = useLocation();
  const isFlowActive = location.pathname === "/" || location.pathname.startsWith("/editor") || location.pathname.startsWith("/flow-builder") || location.pathname.startsWith("/templates") || location.pathname.startsWith("/history") || location.pathname.startsWith("/credenciais");
  const isPanelVisible = isFlowActive && !location.pathname.startsWith("/flow-builder");
  
  const [activesOpen, setActivesOpen] = useState(true);
  const [inactivesOpen, setInactivesOpen] = useState(false);

  const railItems = [
    { icon: House, label: "Inicio", path: "#", active: false },
    { icon: GitBranch, label: "Fluxos", path: "/", active: isFlowActive },
  ];

  return (
    <div className="flex h-screen bg-[#F6F7F9]">
      {/* Rail - 72px */}
      <div className="flex flex-col items-center w-[72px] min-w-[72px] h-screen bg-[#EBF1FA] py-3 gap-1 z-20">
        {/* Sidebar toggle */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-xl text-[#4E6987] hover:bg-[#28415C]/10 hover:text-[#28415C] cursor-pointer transition-colors mb-4 mt-1 shrink-0"
        >
          <SidebarIcon size={20} weight="duotone" />
        </button>

        {/* Nav items */}
        <div className="flex flex-col items-center gap-4 flex-1">
          {railItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer"
            >
              {/* Icon pill */}
              <div
                className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${
                  item.active
                    ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]"
                    : "w-[32px] text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C]"
                }`}
                style={item.active ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}
              >
                <item.icon size={20} weight={item.active ? "fill" : "duotone"} />
                {item.active && (
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: "0.7px solid rgba(200,207,219,0.6)" }}
                  />
                )}
              </div>
              {/* Label */}
              <span
                className={`transition-colors ${item.active ? "text-[#28415C]" : "text-[#4E6987] group-hover:text-[#28415C]"}`}
                style={{
                  fontSize: 11,
                  fontWeight: item.active ? 700 : 500,
                  letterSpacing: -0.5,
                  lineHeight: "22px",
                  ...fontFeature,
                }}
              >
                {item.label}
              </span>
            </Link>
          ))}

          {/* Divider */}
          <div className="flex flex-col items-center gap-4 pt-1">
            <svg width="23" height="2" viewBox="0 0 23 2" fill="none" className="shrink-0">
              <path d="M1 1H22" stroke="#98989D" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 flex flex-col items-center gap-2">
          {/* User avatar */}
          <div
            className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#0483AB] text-white ring-2 ring-[#DDE3EC]"
            style={{ fontSize: 12, fontWeight: 700, ...fontFeature }}
          >
            HZ
          </div>
          {/* App Drawer */}
          <div
            className="relative flex items-center justify-center h-[32px] w-[32px] rounded-full text-[#4E6987] hover:w-[42px] hover:bg-[#28415C]/10 hover:text-[#28415C] cursor-pointer transition-all"
          >
            <DotsNine size={20} weight="duotone" />
          </div>
        </div>
      </div>

      {/* Panel - 224px (only visible when Flow is active) */}
      {isPanelVisible && (
        <div className="w-[224px] bg-[#F6F7F9] flex flex-col h-screen z-10 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-5">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <GitBranch size={20} weight="fill" className="text-[#0483AB]" />
              <h2 className="text-[#122232] flex-1" style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
                Zenite Flow
              </h2>
            </div>
            <Link
              to="/flow-builder"
              className="flex items-center justify-center gap-[6px] w-full h-[34px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors"
            >
              <Plus size={14} weight="bold" />
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Novo Fluxo
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="px-[16px] py-[12px] border-b border-[#EBEBF5]">
            <div className="relative">
              <MagnifyingGlass size={16} weight="bold" className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#9B9BAD]" />
              <input
                type="text"
                placeholder="Pesquisar fluxos..."
                className="w-full h-[36px] pl-[36px] pr-[12px] bg-[#F6F7F9] border border-[#EBEBF5] rounded-[8px] text-[#1A1A2E] placeholder:text-[#9B9BAD] focus:outline-none focus:border-[#6868B1] transition-colors"
                style={{ fontSize: 13, fontWeight: 500, ...fontFeature }}
              />
            </div>
          </div>

          {/* Flow list */}
          <div className="flex-1 overflow-y-auto py-3">
            {/* Ativos */}
            <div className="mb-2">
              <button
                onClick={() => setActivesOpen(!activesOpen)}
                className="flex items-center justify-between w-full px-5 py-2 text-[#122232] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              >
                <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Ativos</span>
                {activesOpen ? <CaretUp size={14} className="text-[#4E6987]" /> : <CaretDown size={14} className="text-[#4E6987]" />}
              </button>

              {activesOpen && (
                <div className="flex flex-col gap-[2px] mt-0.5 px-3">
                  {[
                    { to: "/editor/1", label: "Deal Ganho → Projeto" },
                    { to: "/editor/2", label: "Lead Frio → Notify" },
                    { to: "/editor/3", label: "Form Externo → Lead" },
                  ].map((flow) => (
                    <NavLink
                      key={flow.to}
                      to={flow.to}
                      className={({ isActive }) =>
                        `group/item relative flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] transition-all cursor-pointer ${
                          isActive
                            ? "rounded-[100px] bg-[#28415c] backdrop-blur-[50px]"
                            : "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 rounded-[100px] pointer-events-none"
                              style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                            />
                          )}
                          <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                            <Lightning size={18} weight={isActive ? "fill" : "duotone"} />
                          </span>
                          <span
                            className={`flex-1 truncate ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                            style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
                          >
                            {flow.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Inativos */}
            <div className="mb-2">
              <button
                onClick={() => setInactivesOpen(!inactivesOpen)}
                className="flex items-center justify-between w-full px-5 py-2 text-[#122232] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              >
                <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Inativos</span>
                {inactivesOpen ? <CaretUp size={14} className="text-[#4E6987]" /> : <CaretDown size={14} className="text-[#4E6987]" />}
              </button>

              {inactivesOpen && (
                <div className="flex flex-col gap-[2px] mt-0.5 px-3">
                  {[
                    { to: "/editor/4", label: "Onboarding Cliente" },
                  ].map((flow) => (
                    <NavLink
                      key={flow.to}
                      to={flow.to}
                      className={({ isActive }) =>
                        `group/item relative flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] transition-all cursor-pointer ${
                          isActive
                            ? "rounded-[100px] bg-[#28415c] backdrop-blur-[50px]"
                            : "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 rounded-[100px] pointer-events-none"
                              style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                            />
                          )}
                          <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                            <Lightning size={18} weight={isActive ? "fill" : "duotone"} />
                          </span>
                          <span
                            className={`flex-1 truncate ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                            style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
                          >
                            {flow.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Modelos */}
            <div className="mb-2">
              <NavLink
                to="/templates"
                className={({ isActive }) =>
                  `group/item relative flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] mx-3 transition-all cursor-pointer ${
                    isActive
                      ? "rounded-[100px] bg-[#28415c] backdrop-blur-[50px]"
                      : "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[100px] pointer-events-none"
                        style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                      />
                    )}
                    <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                      <Swatches size={18} weight={isActive ? "fill" : "duotone"} />
                    </span>
                    <span
                      className={`flex-1 truncate ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
                    >
                      Modelos
                    </span>
                  </>
                )}
              </NavLink>
            </div>

            {/* Credenciais */}
            <div className="mb-2">
              <NavLink
                to="/credenciais"
                className={({ isActive }) =>
                  `group/item relative flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] mx-3 transition-all cursor-pointer ${
                    isActive
                      ? "rounded-[100px] bg-[#28415c] backdrop-blur-[50px]"
                      : "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[100px] pointer-events-none"
                        style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                      />
                    )}
                    <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                      <Key size={18} weight={isActive ? "fill" : "duotone"} />
                    </span>
                    <span
                      className={`flex-1 truncate ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
                    >
                      Credenciais
                    </span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-hidden h-screen min-h-0">
        {children}
      </div>
    </div>
  );
}