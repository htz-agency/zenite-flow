import { Link } from "react-router";
import {
  CheckCircle,
  XCircle,
  ArrowsClockwise,
  ArrowRight,
} from "@phosphor-icons/react";
import { mockHistory } from "../data/mockData";

const fontFeature = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

export function History() {
  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-[32px] pt-[28px] pb-[24px] border-b border-[#EBEBF5] bg-white">
        <Link
          to="/"
          className="inline-flex items-center gap-[6px] text-[#6868B1] hover:text-[#4E4E91] transition-colors mb-[16px]"
          style={{ fontSize: 13, fontWeight: 600, ...fontFeature }}
        >
          ← Voltar para Fluxos
        </Link>
        
        <div>
          <h1 className="text-[#1A1A2E] mb-[4px]" style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>
            Histórico de Execuções
          </h1>
          <p className="text-[#4A4A6A]" style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}>
            Acompanhe todas as execuções dos seus fluxos
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-[32px] py-[24px]">
        {/* Table */}
        <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[140px_1fr_200px_140px_100px_100px] gap-[16px] px-[20px] py-[12px] border-b border-[#EBEBF5] bg-[#F6F7F9]">
            <div className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Status
            </div>
            <div className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Fluxo
            </div>
            <div className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Gatilho
            </div>
            <div className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Início
            </div>
            <div className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Duração
            </div>
            <div className="uppercase font-bold tracking-[0.5px] text-[#4A4A6A]" style={{ fontSize: 9, ...fontFeature }}>
              Detalhes
            </div>
          </div>

          {/* Table body */}
          <div>
            {mockHistory.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-[140px_1fr_200px_140px_100px_100px] gap-[16px] px-[20px] py-[16px] hover:bg-[#F6F7F9] transition-colors ${
                  index !== mockHistory.length - 1 ? "border-b border-[#EBEBF5]" : ""
                }`}
              >
                {/* Status */}
                <div className="flex items-center">
                  {item.status === "success" && (
                    <div className="flex items-center gap-[6px] h-[24px] px-[10px] rounded-[500px] bg-[#D9F8EF]">
                      <CheckCircle size={10} weight="fill" className="text-[#135543]" />
                      <span className="uppercase whitespace-nowrap font-bold tracking-[0.5px] text-[#135543]" style={{ fontSize: 8, ...fontFeature }}>
                        Sucesso
                      </span>
                    </div>
                  )}
                  {item.status === "error" && (
                    <div className="flex items-center gap-[6px] h-[24px] px-[10px] rounded-[500px] bg-[#FFEDEB]">
                      <XCircle size={10} weight="fill" className="text-[#B13B00]" />
                      <span className="uppercase whitespace-nowrap font-bold tracking-[0.5px] text-[#B13B00]" style={{ fontSize: 8, ...fontFeature }}>
                        Erro
                      </span>
                    </div>
                  )}
                  {item.status === "running" && (
                    <div className="flex items-center gap-[6px] h-[24px] px-[10px] rounded-[500px] bg-[#DCF0FF]">
                      <ArrowsClockwise size={10} weight="bold" className="text-[#07ABDE] animate-spin" />
                      <span className="uppercase whitespace-nowrap font-bold tracking-[0.5px] text-[#07ABDE]" style={{ fontSize: 8, ...fontFeature }}>
                        Executando
                      </span>
                    </div>
                  )}
                </div>

                {/* Flow */}
                <div className="flex items-center">
                  <span className="text-[#1A1A2E] truncate" style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2, ...fontFeature }}>
                    {item.flowName}
                  </span>
                </div>

                {/* Trigger */}
                <div className="flex items-center">
                  <span className="text-[#4A4A6A] truncate" style={{ fontSize: 13, fontWeight: 500, ...fontFeature }}>
                    {item.trigger}
                  </span>
                </div>

                {/* Start time */}
                <div className="flex items-center">
                  <span className="text-[#9B9BAD]" style={{ fontSize: 13, fontWeight: 500, ...fontFeature }}>
                    {item.startTime}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center">
                  <span className="text-[#9B9BAD]" style={{ fontSize: 13, fontWeight: 500, ...fontFeature }}>
                    {item.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="flex items-center">
                  <button className="flex items-center gap-[4px] text-[#0483AB] hover:text-[#07ABDE] transition-colors">
                    <span className="font-bold" style={{ fontSize: 12, ...fontFeature }}>Ver</span>
                    <ArrowRight size={12} weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
