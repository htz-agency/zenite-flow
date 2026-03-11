import { NavLink, useLocation, useNavigate } from "react-router";
import {
  House, FolderOpen, CheckSquare, CalendarBlank, Timer, UsersThree,
  ArrowsClockwise, CaretDown, CaretUp, X,
  Sidebar as SidebarIcon, DotsNine, Plus, Clock, Archive,
  ListChecks, User, CalendarCheck, FlagBanner, ProjectorScreenChart,
  Swatches, PushPin,
} from "@phosphor-icons/react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PillButton } from "./pill-button";
import LogoZenitePjt from "../../imports/LogoZenitePjt";
import { AppDrawer } from "./app-drawer";
import { SidebarFolderOrganizer } from "./sidebar-folder-organizer";
import { useFolders } from "./folder-context";
import { projects as allMockProjects } from "./mock-data";

interface RailItem { id: string; icon: ReactNode; activeIcon: ReactNode; label: string; directTo?: string; sections?: PanelSection[]; }
interface PanelSection { title?: string; items: PanelItem[]; }
interface PanelItem { to: string; icon: ReactNode; activeIcon: ReactNode; label: string; }

const projectsRailItems: RailItem[] = [
  { id: "inicio", icon: <House size={20} weight="duotone" />, activeIcon: <House size={20} weight="fill" />, label: "Inicio", directTo: "/projects" },
  {
    id: "projetos", icon: <ProjectorScreenChart size={20} weight="duotone" />, activeIcon: <ProjectorScreenChart size={20} weight="fill" />, label: "Projetos",
    sections: [
      { title: "Projetos", items: [
        { to: "/projects/all", icon: <ProjectorScreenChart size={18} weight="duotone" />, activeIcon: <ProjectorScreenChart size={18} weight="fill" />, label: "Todos" },
        { to: "/projects/active", icon: <FlagBanner size={18} weight="duotone" />, activeIcon: <FlagBanner size={18} weight="fill" />, label: "Ativos" },
        { to: "/projects/completed", icon: <CheckSquare size={18} weight="duotone" />, activeIcon: <CheckSquare size={18} weight="fill" />, label: "Concluidos" },
        { to: "/projects/archived", icon: <Archive size={18} weight="duotone" />, activeIcon: <Archive size={18} weight="fill" />, label: "Arquivados" },
      ]},
    ],
  },
  {
    id: "tarefas", icon: <CheckSquare size={20} weight="duotone" />, activeIcon: <CheckSquare size={20} weight="fill" />, label: "Tarefas",
    sections: [
      { title: "Tarefas", items: [
        { to: "/tasks/mine", icon: <ListChecks size={18} weight="duotone" />, activeIcon: <ListChecks size={18} weight="fill" />, label: "Minhas tarefas" },
        { to: "/tasks/assigned", icon: <User size={18} weight="duotone" />, activeIcon: <User size={18} weight="fill" />, label: "Atribuidas a mim" },
        { to: "/tasks/today", icon: <CalendarCheck size={18} weight="duotone" />, activeIcon: <CalendarCheck size={18} weight="fill" />, label: "Hoje" },
        { to: "/tasks/week", icon: <CalendarBlank size={18} weight="duotone" />, activeIcon: <CalendarBlank size={18} weight="fill" />, label: "Esta semana" },
      ]},
    ],
  },
  { id: "calendario", icon: <CalendarBlank size={20} weight="duotone" />, activeIcon: <CalendarBlank size={20} weight="fill" />, label: "Calendario", directTo: "/calendar" },
  {
    id: "tempo", icon: <Timer size={20} weight="duotone" />, activeIcon: <Timer size={20} weight="fill" />, label: "Tempo",
    sections: [
      { title: "Tempo", items: [
        { to: "/time/log", icon: <Clock size={18} weight="duotone" />, activeIcon: <Clock size={18} weight="fill" />, label: "Registro de horas" },
        { to: "/time/reports", icon: <Timer size={18} weight="duotone" />, activeIcon: <Timer size={18} weight="fill" />, label: "Relatorios" },
      ]},
    ],
  },
  {
    id: "recursos", icon: <UsersThree size={20} weight="duotone" />, activeIcon: <UsersThree size={20} weight="fill" />, label: "Recursos",
    sections: [
      { title: "Recursos", items: [
        { to: "/resources/team", icon: <UsersThree size={18} weight="duotone" />, activeIcon: <UsersThree size={18} weight="fill" />, label: "Equipe" },
        { to: "/resources/allocation", icon: <CalendarBlank size={18} weight="duotone" />, activeIcon: <CalendarBlank size={18} weight="fill" />, label: "Alocacoes" },
      ]},
    ],
  },
];

function getFirstRoute(item: RailItem): string | null {
  if (item.directTo) return item.directTo;
  if (item.sections) for (const s of item.sections) if (s.items.length > 0) return s.items[0].to;
  return null;
}

function railOwnsPath(item: RailItem, pathname: string): boolean {
  if (item.directTo !== undefined) {
    if (item.directTo === "/projects") return pathname === "/projects" || pathname === "/";
    return pathname.startsWith(item.directTo);
  }
  if (item.sections) {
    // Also own folder routes for the "projetos" rail
    if (item.id === "projetos" && pathname.startsWith("/projects/folder/")) return true;
    return item.sections.some(s => s.items.some(i => pathname === i.to || pathname.startsWith(i.to + "/")));
  }
  return false;
}

export function ProjectsSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setActiveFolder } = useFolders();
  const appDrawerRef = useRef<HTMLDivElement>(null);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [expandedRail, setExpandedRail] = useState<string | null>(() => {
    for (const item of projectsRailItems) if (!item.directTo && railOwnsPath(item, location.pathname)) return item.id;
    return null;
  });
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [pinnedProjectIds, setPinnedProjectIds] = useState<string[]>(() => {
    // Default pinned: first 2 projects
    return allMockProjects.slice(0, 2).map(p => p.id);
  });
  const pinnedProjects = allMockProjects.filter(p => pinnedProjectIds.includes(p.id));
  const isPinnedCollapsed = collapsedSections.has("fixados");

  useEffect(() => { for (const item of projectsRailItems) if (!item.directTo && railOwnsPath(item, location.pathname)) { setExpandedRail(item.id); return; } }, [location.pathname]);
  useEffect(() => { if (onClose) onClose(); setShowAppDrawer(false); }, [location.pathname]);
  useEffect(() => {
    if (!showAppDrawer) return;
    const h1 = (e: MouseEvent) => { if (appDrawerRef.current && !appDrawerRef.current.contains(e.target as Node)) setShowAppDrawer(false); };
    const h2 = (e: KeyboardEvent) => { if (e.key === "Escape") setShowAppDrawer(false); };
    document.addEventListener("mousedown", h1); document.addEventListener("keydown", h2);
    return () => { document.removeEventListener("mousedown", h1); document.removeEventListener("keydown", h2); };
  }, [showAppDrawer]);

  const handleRailClick = (item: RailItem) => {
    if (panelCollapsed) setPanelCollapsed(false);
    if (item.directTo) { navigate(item.directTo); setExpandedRail(null); }
    else { setExpandedRail(item.id); if (!railOwnsPath(item, location.pathname)) { const r = getFirstRoute(item); if (r) navigate(r); } }
  };
  const toggleSection = (key: string) => setCollapsedSections(prev => { const next = new Set(prev); if (next.has(key)) next.delete(key); else next.add(key); return next; });

  const expandedItem = projectsRailItems.find(r => r.id === expandedRail);
  const showPanel = !!expandedItem?.sections;

  const rail = (
    <div className="flex flex-col items-center w-[72px] min-w-[72px] h-screen bg-[#EBF1FA] py-3 gap-1 z-20">
      <button onClick={() => setPanelCollapsed(v => !v)}
        className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors mb-4 mt-1 shrink-0 text-[#4E6987] hover:bg-[#28415C]/10 hover:text-[#28415C] cursor-pointer">
        <SidebarIcon size={20} weight="duotone" />
      </button>
      <div className="flex flex-col items-center gap-4 flex-1">
        {projectsRailItems.map(item => {
          const ownsPath = railOwnsPath(item, location.pathname);
          const firstOwner = projectsRailItems.find(ri => railOwnsPath(ri, location.pathname));
          const isActive = ownsPath && firstOwner?.id === item.id;
          const isExpanded = expandedRail === item.id;
          const hl = isActive || isExpanded;
          return (
            <button key={item.id} onClick={() => handleRailClick(item)} className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer">
              <div className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${hl ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]" : "w-[32px] text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C]"}`}
                style={hl ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
                <span className="flex items-center justify-center">{hl ? item.activeIcon : item.icon}</span>
                {hl && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
              </div>
              <span className={`transition-colors ${hl ? "text-[#28415C]" : "text-[#4E6987] group-hover:text-[#28415C]"}`}
                style={{ fontSize: 11, fontWeight: hl ? 700 : 500, letterSpacing: -0.5, lineHeight: "22px" }}>{item.label}</span>
            </button>
          );
        })}

        {/* Sync button */}
        {(() => {
          const isSyncActive = location.pathname === "/sync-config";
          return (
            <button onClick={() => { setExpandedRail(null); navigate("/sync-config"); }} className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer">
              <div className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${isSyncActive ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]" : "w-[32px] text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C]"}`}
                style={isSyncActive ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
                <span className="flex items-center justify-center"><ArrowsClockwise size={20} weight={isSyncActive ? "fill" : "duotone"} /></span>
                {isSyncActive && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
              </div>
              <span className={`transition-colors ${isSyncActive ? "text-[#28415C]" : "text-[#4E6987] group-hover:text-[#28415C]"}`}
                style={{ fontSize: 11, fontWeight: isSyncActive ? 700 : 500, letterSpacing: -0.5, lineHeight: "22px" }}>Sync</span>
            </button>
          );
        })()}

        {/* Design System button */}
        {(() => {
          const isDsActive = location.pathname === "/design-system";
          return (
            <button onClick={() => { setExpandedRail(null); navigate("/design-system"); }} className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer">
              <div className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${isDsActive ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]" : "w-[32px] text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C]"}`}
                style={isDsActive ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
                <span className="flex items-center justify-center"><Swatches size={20} weight={isDsActive ? "fill" : "duotone"} /></span>
                {isDsActive && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
              </div>
              <span className={`transition-colors ${isDsActive ? "text-[#28415C]" : "text-[#4E6987] group-hover:text-[#28415C]"}`}
                style={{ fontSize: 11, fontWeight: isDsActive ? 700 : 500, letterSpacing: -0.5, lineHeight: "22px" }}>Design</span>
            </button>
          );
        })()}
      </div>
      <div className="mt-auto pt-3">
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#0483AB] text-white mb-3" style={{ fontSize: 12, fontWeight: 700 }}>HZ</div>
        <div className="relative" ref={appDrawerRef}>
          <div onClick={() => setShowAppDrawer(v => !v)}
            className={`relative flex items-center justify-center h-[32px] rounded-full cursor-pointer transition-all ${showAppDrawer ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]" : "w-[32px] text-[#4E6987] hover:w-[42px] hover:bg-[#28415C]/10 hover:text-[#28415C]"}`}
            style={showAppDrawer ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
            <DotsNine size={20} weight={showAppDrawer ? "fill" : "duotone"} />
            {showAppDrawer && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
          </div>
          <AnimatePresence>
            {showAppDrawer && (
              <AppDrawer
                currentAppId="pjt"
                onNavigate={(route) => navigate(route)}
                onClose={() => setShowAppDrawer(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const panel = showPanel && expandedItem ? (
    <motion.div
      initial={false}
      animate={{ width: panelCollapsed ? 0 : 224, opacity: panelCollapsed ? 0 : 1 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col h-screen bg-[#F6F7F9] z-10 overflow-hidden"
      style={{ minWidth: 0 }}
    >
      <div className="px-5 py-5">
        <div className="w-[128px] h-[30px]">
          <LogoZenitePjt />
        </div>
      </div>
      {expandedItem.id === "projetos" && (
        <div className="px-5 pb-4" style={{ minWidth: 224 }}>
          <PillButton
            variant="default"
            icon={<Plus size={16} weight="bold" />}
            onClick={() => navigate("/projects/new")}
            className="w-full"
          >
            Novo Projeto
          </PillButton>
        </div>
      )}
      <div className="flex-1 overflow-y-auto py-3" style={{ minWidth: 224 }}>
        {/* Fixados section — only for "projetos" rail */}
        {expandedItem.id === "projetos" && (
          <div className="mb-2">
            <button
              onClick={() => toggleSection("fixados")}
              className="flex items-center justify-between w-full px-5 py-2 text-[#122232] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
            >
              <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5 }}>Fixados</span>
              {isPinnedCollapsed ? <CaretDown size={14} className="text-[#4E6987]" /> : <CaretUp size={14} className="text-[#4E6987]" />}
            </button>
            <AnimatePresence initial={false}>
              {!isPinnedCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-[2px] mt-0.5 px-3">
                    {pinnedProjects.length === 0 ? (
                      <div className="px-[6px] py-[8px] text-[#98989d]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3 }}>
                        Nenhum projeto fixado
                      </div>
                    ) : (
                      pinnedProjects.map(project => {
                        const projectRoute = `/projects/${project.id}`;
                        const isActive = location.pathname === projectRoute || location.pathname.startsWith(projectRoute + "/");
                        return (
                          <div
                            key={project.id}
                            onClick={() => navigate(projectRoute)}
                            className={`group/pinned relative flex items-center gap-[8px] pl-[6px] pr-[6px] py-[6px] transition-all cursor-pointer ${
                              isActive
                                ? "rounded-[100px] bg-[#28415c] backdrop-blur-[50px]"
                                : "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec]"
                            }`}
                          >
                            {isActive && (
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 rounded-[100px] pointer-events-none"
                                style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                              />
                            )}
                            <span
                              className={`relative z-[1] shrink-0 size-[8px] rounded-full`}
                              style={{ backgroundColor: project.color }}
                            />
                            <span
                              className={`relative z-[1] flex-1 truncate ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                              style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "20px" }}
                            >
                              {project.name}
                            </span>
                            {!isActive && (
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  setPinnedProjectIds(prev => prev.filter(id => id !== project.id));
                                }}
                                className="relative z-[1] flex items-center justify-center size-[20px] rounded-full text-[#4E6987] opacity-0 group-hover/pinned:opacity-100 hover:bg-[#c8cfdb] transition-all cursor-pointer"
                                title="Desafixar"
                              >
                                <PushPin size={12} weight="fill" />
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {expandedItem.sections!.map((section, si) => {
          const sectionKey = `${expandedItem.id}-${si}`;
          const isCollapsed = collapsedSections.has(sectionKey);
          return (
            <div key={sectionKey} className="mb-2">
              {section.title && (
                <button onClick={() => toggleSection(sectionKey)} className="flex items-center justify-between w-full px-5 py-2 text-[#122232] hover:bg-[#F6F7F9] transition-colors">
                  <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5 }}>{section.title}</span>
                  {isCollapsed ? <CaretDown size={14} className="text-[#4E6987]" /> : <CaretUp size={14} className="text-[#4E6987]" />}
                </button>
              )}
              {!isCollapsed && (
                <div className="flex flex-col gap-[2px] mt-0.5 px-3">
                  {section.items.map(subItem => (
                    <NavLink key={subItem.to} to={subItem.to}
                      onClick={() => setActiveFolder(null)}
                      className={({ isActive }) => {
                        const isFolderRoute = location.pathname.startsWith("/projects/folder/");
                        const active = isActive && !isFolderRoute;
                        return `group/item relative flex items-center gap-[10px] pl-[6px] py-[6px] transition-all cursor-pointer ${active ? "rounded-[100px] bg-[#28415c] backdrop-blur-[50px] pr-[22px]" : "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec] pr-[22px]"}`;
                      }}>
                      {({ isActive }) => {
                        const isFolderRoute = location.pathname.startsWith("/projects/folder/");
                        const active = isActive && !isFolderRoute;
                        return (<>
                          {active && <div aria-hidden="true" className="absolute inset-0 rounded-[100px] pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }} />}
                          <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${active ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                            {active ? subItem.activeIcon : subItem.icon}
                          </span>
                          <span className={`flex-1 ${active ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                            style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px" }}>{subItem.label}</span>
                        </>);
                      }}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Folder organizer — only for "projetos" rail */}
        {expandedItem.id === "projetos" && (
          <div className="mt-2 border-t border-[#e2e6ed] pt-2">
            <SidebarFolderOrganizer />
          </div>
        )}
      </div>
    </motion.div>
  ) : null;

  const minimalPanel = !showPanel ? (
    <motion.div
      initial={false}
      animate={{ width: panelCollapsed ? 0 : 224, opacity: panelCollapsed ? 0 : 1 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col h-screen bg-[#F6F7F9] z-10 overflow-hidden"
      style={{ minWidth: 0 }}
    >
      <div className="px-5 py-5">
        <div className="w-[128px] h-[30px]">
          <LogoZenitePjt />
        </div>
      </div>
    </motion.div>
  ) : null;

  const sidebarContent = (<div className="flex h-screen">{rail}{panel}{minimalPanel}</div>);

  return (<>
    <div className="hidden lg:flex">{sidebarContent}</div>
    {isOpen && (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative z-10 h-full flex">
          {sidebarContent}
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-[#4E6987] hover:text-[#122232] shadow-md z-20"><X size={18} /></button>
        </div>
      </div>
    )}
  </>);
}