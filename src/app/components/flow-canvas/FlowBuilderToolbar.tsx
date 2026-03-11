import { 
  Plus, 
  TreeStructure, 
  MagnifyingGlassMinus, 
  MagnifyingGlassPlus,
  CornersOut,
  MapTrifold,
  DotsThree,
  PlayCircle,
  Atom,
  GitCommit
} from '@phosphor-icons/react';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

/* ── DS helpers ─────────────────────────────────────────────── */
const iconBtn =
  "w-[34px] h-[34px] shrink-0 rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB] transition-colors flex items-center justify-center cursor-pointer";

const labelBtn =
  "h-[34px] px-[16px] shrink-0 whitespace-nowrap rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB] transition-colors flex items-center gap-[6px] cursor-pointer";

const separator = "w-[1px] h-[20px] bg-[#C8CFDB] rounded-full shrink-0";

interface FlowBuilderToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onFitView: () => void;
  onAddNode: () => void;
  onAutoLayout: () => void;
  onToggleMinimap: () => void;
  onExecuteFlow: () => void;
  isExecuting?: boolean;
  isNodePickerOpen?: boolean;
}

export default function FlowBuilderToolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onFitView,
  onAddNode,
  onAutoLayout,
  onToggleMinimap,
  onExecuteFlow,
  isExecuting = false,
  isNodePickerOpen = false,
}: FlowBuilderToolbarProps) {
  return (
    <div className="absolute bottom-[16px] left-[24px] flex items-center gap-[8px] z-10">
      {/* Toolbar principal */}
      <div
        className="w-fit h-[50px] bg-white backdrop-blur-[50px] rounded-full px-[8px] flex flex-nowrap items-center gap-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      >
        {/* Adicionar Nó */}
        <button
          onClick={onAddNode}
          className={
            isNodePickerOpen
              ? "flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#07ABDE] text-[#DCF0FF] transition-colors cursor-pointer"
              : "flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB] transition-colors cursor-pointer"
          }
        >
          <GitCommit size={14} weight="bold" />
          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Adicionar Nó</span>
        </button>

        {/* Auto-layout */}
        <button onClick={onAutoLayout} className={labelBtn}>
          <TreeStructure size={14} weight="bold" />
          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Auto-layout</span>
        </button>

        <div className={separator} />

        {/* Zoom Out */}
        <button onClick={onZoomOut} className={iconBtn} title="Zoom out">
          <MagnifyingGlassMinus size={14} weight="bold" />
        </button>

        {/* Percentual */}
        <button
          onClick={onZoomReset}
          className="min-w-[44px] h-[34px] px-[8px] rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB] transition-colors flex items-center justify-center cursor-pointer font-bold uppercase tracking-[0.5px]"
          style={{ fontSize: 10, ...ff }}
        >
          {Math.round(zoom * 100)}%
        </button>

        {/* Zoom In */}
        <button onClick={onZoomIn} className={iconBtn} title="Zoom in">
          <MagnifyingGlassPlus size={14} weight="bold" />
        </button>

        {/* Fit View */}
        <button onClick={onFitView} className={iconBtn} title="Ajustar visualização">
          <CornersOut size={14} weight="bold" />
        </button>

        <div className={separator} />

        {/* Mini-mapa */}
        <button onClick={onToggleMinimap} className={labelBtn}>
          <MapTrifold size={14} weight="bold" />
          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Mini-mapa</span>
        </button>

        {/* Mais opções */}
        <button className={iconBtn} title="Mais opções">
          <DotsThree size={14} weight="bold" />
        </button>

        <div className={separator} />

        {/* Executar Fluxo */}
        <button
          onClick={onExecuteFlow}
          disabled={isExecuting}
          className={`
            h-[36px] px-[18px] shrink-0 whitespace-nowrap rounded-full flex items-center gap-[8px] transition-all cursor-pointer
            ${isExecuting
              ? 'bg-[#0483AB] text-white cursor-wait'
              : 'bg-[#3CCEA7] text-white hover:bg-[#30B893]'
            }
          `}
          style={{
            boxShadow: isExecuting
              ? "0px 2px 4px 0px rgba(4,131,171,0.3)"
              : "0px 2px 4px 0px rgba(60,206,167,0.3)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: -0.3,
            ...ff,
          }}
        >
          {isExecuting ? (
            <>
              <div className="w-[16px] h-[16px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Executando...</span>
            </>
          ) : (
            <>
              <PlayCircle size={18} weight="fill" />
              <span>Executar Fluxo</span>
            </>
          )}
        </button>
      </div>

      {/* Turing AI Button */}
      <button
        className="group/turing flex items-center gap-[8px] h-[40px] pl-[14px] pr-[18px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent"
        title="Turing IA"
      >
        <Atom size={16} weight="bold" className="text-[#4E6987] group-hover/turing:animate-[turing-icon-spin_1.5s_linear_infinite]" />
        <span
          className="font-semibold [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent transition-colors duration-300"
          style={{ fontSize: 13, letterSpacing: -0.3, backgroundImage: "linear-gradient(90deg, #8C8CD4, #8C8CD4, #07ABDE, #3CCEA7, #07ABDE, #8C8CD4, #8C8CD4)", backgroundRepeat: "repeat", ...ff }}
        >
          Turing
        </span>
      </button>
    </div>
  );
}