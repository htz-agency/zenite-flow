import { useState } from "react";
import { Link } from "react-router";
import {
  Plus,
  GitBranch,
  Lightning,
  Warning,
  Heart,
  ArrowDown,
  Clock,
  Link as LinkIcon,
  FolderOpen,
  ChatCircle,
  EnvelopeSimple,
  Square,
  ArrowsLeftRight,
  ToggleLeft,
  ToggleRight,
  NotePencil,
} from "@phosphor-icons/react";
import { useHomeData } from "../../hooks/useHomeData";
import { Skeleton } from "../components/ui/skeleton";

const fontFeature = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

type FilterType = "all" | "active" | "inactive" | "templates";

// Função auxiliar para formatar tempo relativo
function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "Nunca";
  
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `há ${diffMins} minuto${diffMins > 1 ? "s" : ""}`;
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
  return `há ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
}

function FlowCard({ flow }: { flow: any }) {
  const [isActive, setIsActive] = useState(flow.is_active);

  const getIcon = (iconName: string, size: number = 16) => {
    const icons: Record<string, any> = {
      ArrowDown,
      Clock,
      LinkIcon,
      FolderOpen,
      ChatCircle,
      EnvelopeSimple,
      Square,
      Heart,
      ArrowsLeftRight,
    };
    const IconComponent = icons[iconName] || GitBranch;
    return <IconComponent size={size} weight="duotone" />;
  };

  return (
    <div className="group relative bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-[12px]">
        <div className="flex-1">
          <h3 className="text-[#1A1A2E] mb-[4px]" style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
            {flow.name}
          </h3>
          <p className="text-[#9B9BAD]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.2, ...fontFeature }}>
            {flow.description || "Sem descrição"}
          </p>
        </div>
        
        {/* Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsActive(!isActive);
          }}
          className="ml-[8px] shrink-0"
        >
          {isActive ? (
            <ToggleRight size={32} weight="fill" className="text-[#3CCEA7]" />
          ) : (
            <ToggleLeft size={32} weight="fill" className="text-[#9B9BAD]" />
          )}
        </button>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-[8px] mb-[16px]">
        <div
          className="flex items-center gap-[4px] h-[24px] px-[10px] rounded-[500px]"
          style={{
            backgroundColor: isActive ? "#D9F8EF" : "#EBEBF5",
          }}
        >
          <span
            className="uppercase whitespace-nowrap font-bold tracking-[0.5px]"
            style={{
              fontSize: 8,
              color: isActive ? "#135543" : "#9B9BAD",
              ...fontFeature,
            }}
          >
            {isActive ? "Ativo" : "Inativo"}
          </span>
        </div>
      </div>

      {/* Flow preview */}
      <div className="flex items-center gap-[8px] mb-[16px] overflow-x-auto pb-[4px]">
        {/* Trigger */}
        {flow.primary_trigger && (
          <>
            <div className="flex items-center gap-[6px] px-[12px] py-[6px] bg-[#E8E8FD] rounded-[8px] shrink-0">
              <div className="text-[#6868B1]">
                {getIcon("Clock", 14)}
              </div>
              <span className="text-[#6868B1] whitespace-nowrap" style={{ fontSize: 11, fontWeight: 600, ...fontFeature }}>
                Gatilho
              </span>
            </div>

            {/* Arrow */}
            <div className="text-[#C8CFDB]">→</div>
          </>
        )}

        {/* Actions - mostrar quantos steps tem */}
        {flow.active_steps_count > 0 && (
          <div className="flex items-center gap-[4px]">
            <div className="flex items-center gap-[6px] px-[12px] py-[6px] bg-[#F6F7F9] border border-[#EBEBF5] rounded-[8px] shrink-0">
              <div className="text-[#4A4A6A]">
                {getIcon("Square", 14)}
              </div>
              <span className="text-[#4A4A6A] whitespace-nowrap" style={{ fontSize: 11, fontWeight: 600, ...fontFeature }}>
                {flow.active_steps_count} {flow.active_steps_count === 1 ? "Ação" : "Ações"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[#9B9BAD]" style={{ fontSize: 12, fontWeight: 500, ...fontFeature }}>
        <span>Última execução: {formatRelativeTime(flow.last_run_at)}</span>
        <div className="flex items-center gap-[12px]">
          <span>{flow.total_runs} execuções</span>
          {flow.success_rate_pct !== null && flow.total_runs > 0 && (
            <span className="text-[#3CCEA7]">
              {Math.round(flow.success_rate_pct)}% sucesso
            </span>
          )}
        </div>
      </div>

      {/* Hover edit button */}
      <Link
        to={`/editor/${flow.id}`}
        className="absolute top-[20px] right-[20px] opacity-0 group-hover:opacity-100 flex items-center justify-center size-[34px] rounded-full bg-[#DCF0FF] text-[#0483AB] hover:bg-[#07ABDE] hover:text-white transition-all"
      >
        <NotePencil size={16} weight="bold" />
      </Link>
    </div>
  );
}

function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-[12px] mb-[8px]">
        <Skeleton className="size-[40px] rounded-[10px]" />
        <div className="flex-1">
          <Skeleton className="h-[28px] w-[60px] mb-[4px]" />
          <Skeleton className="h-[13px] w-[100px]" />
        </div>
      </div>
    </div>
  );
}

function FlowCardSkeleton() {
  return (
    <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between mb-[12px]">
        <div className="flex-1">
          <Skeleton className="h-[16px] w-[180px] mb-[8px]" />
          <Skeleton className="h-[13px] w-[240px]" />
        </div>
        <Skeleton className="size-[32px] rounded-full" />
      </div>
      <Skeleton className="h-[24px] w-[80px] mb-[16px]" />
      <div className="flex items-center gap-[8px] mb-[16px]">
        <Skeleton className="h-[26px] w-[100px] rounded-[8px]" />
        <Skeleton className="h-[8px] w-[16px]" />
        <Skeleton className="h-[26px] w-[100px] rounded-[8px]" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-[12px] w-[150px]" />
        <Skeleton className="h-[12px] w-[100px]" />
      </div>
    </div>
  );
}

export function Home() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { flows, loading } = useHomeData();

  const activeFlows = flows.filter((f) => f.is_active);
  const inactiveFlows = flows.filter((f) => !f.is_active);

  const filteredFlows =
    filter === "all"
      ? flows
      : filter === "active"
      ? activeFlows
      : filter === "inactive"
      ? inactiveFlows
      : [];

  const executionsToday = flows.reduce((sum, f) => sum + (f.runs_last_24h || 0), 0);
  const errorsToday = flows.reduce((sum, f) => sum + (f.errors_last_24h || 0), 0);

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-[32px] pt-[28px] pb-[24px] border-b border-[#EBEBF5] bg-white">
        <div className="flex items-start justify-between mb-[16px]">
          <div>
            <h1 className="text-[#1A1A2E] mb-[4px]" style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>
              Fluxos
            </h1>
            {loading ? (
              <Skeleton className="h-[14px] w-[120px]" />
            ) : (
              <p className="text-[#4A4A6A]" style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}>
                {activeFlows.length} ativos · {inactiveFlows.length} inativo{inactiveFlows.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          
          
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-[8px]">
          {(["all", "active", "inactive", "templates"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-[32px] px-[16px] rounded-[500px] font-bold uppercase tracking-[0.5px] transition-colors ${
                filter === f
                  ? "bg-[#6868B1] text-white"
                  : "bg-[#F6F7F9] text-[#9B9BAD] hover:bg-[#EBEBF5] hover:text-[#4A4A6A]"
              }`}
              style={{ fontSize: 10, ...fontFeature }}
            >
              {f === "all" ? "Todos" : f === "active" ? "Ativos" : f === "inactive" ? "Inativos" : "Modelos"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-[32px] py-[24px]">
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-[16px] mb-[24px]">
          {loading ? (
            <>
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-[12px] mb-[8px]">
                  <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-[#E8E8FD]">
                    <GitBranch size={20} weight="fill" className="text-[#6868B1]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#1A1A2E] mb-[2px]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>
                      {activeFlows.length}
                    </div>
                    <div className="text-[#4A4A6A]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                      Fluxos Ativos
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-[12px] mb-[8px]">
                  <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-[#D9F8EF]">
                    <Lightning size={20} weight="fill" className="text-[#3CCEA7]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#1A1A2E] mb-[2px]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>
                      {executionsToday}
                    </div>
                    <div className="text-[#4A4A6A]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                      Execuções Hoje
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-[12px] mb-[8px]">
                  <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-[#D9F8EF]">
                    <Warning size={20} weight="fill" className="text-[#3CCEA7]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#1A1A2E] mb-[2px]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>
                      {errorsToday}
                    </div>
                    <div className="text-[#4A4A6A]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                      Erros Hoje
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Flow grid */}
        {loading ? (
          <div className="grid grid-cols-3 gap-[16px]">
            <FlowCardSkeleton />
            <FlowCardSkeleton />
            <FlowCardSkeleton />
            <FlowCardSkeleton />
            <FlowCardSkeleton />
            <FlowCardSkeleton />
          </div>
        ) : filter === "templates" ? (
          <div className="flex flex-col items-center justify-center py-[80px]">
            <GitBranch size={64} weight="duotone" className="text-[#C8CFDB] mb-[16px]" />
            <h3 className="text-[#1A1A2E] mb-[8px]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
              Biblioteca de Modelos
            </h3>
            <p className="text-[#9B9BAD] mb-[24px]" style={{ fontSize: 14, fontWeight: 500, ...fontFeature }}>
              Utilize templates prontos para começar rapidamente
            </p>
            <Link
              to="/templates"
              className="flex items-center justify-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors"
            >
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Ver Modelos
              </span>
            </Link>
          </div>
        ) : filteredFlows.length > 0 ? (
          <div className="grid grid-cols-3 gap-[16px]">
            {filteredFlows.map((flow) => (
              <FlowCard key={flow.id} flow={flow} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-[80px]">
            <GitBranch size={64} weight="duotone" className="text-[#C8CFDB] mb-[16px]" />
            <h3 className="text-[#1A1A2E] mb-[8px]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
              Nenhum fluxo encontrado
            </h3>
            <p className="text-[#9B9BAD]" style={{ fontSize: 14, fontWeight: 500, ...fontFeature }}>
              Tente ajustar os filtros ou criar um novo fluxo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}