import { Link } from "react-router";
import {
  GitBranch,
  FolderOpen,
  Heart,
  ChartBar,
  Atom,
  ArrowRight,
} from "@phosphor-icons/react";
import { mockTemplates } from "../data/mockData";

const fontFeature = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

function TemplateCard({ template }: { template: typeof mockTemplates[0] }) {
  const getCategoryColor = (category: string) => {
    if (category.includes("IA")) return { bg: "#E8E8FD", text: "#6868B1" };
    if (category.includes("CRM")) return { bg: "#FEEDCA", text: "#685516" };
    if (category.includes("Projects")) return { bg: "#DCF0FF", text: "#0483AB" };
    if (category.includes("Dash")) return { bg: "#D9F8EF", text: "#135543" };
    return { bg: "#EBEBF5", text: "#4A4A6A" };
  };

  const colors = getCategoryColor(template.category);

  return (
    <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all">
      {/* Preview */}
      <div className="flex items-center justify-center gap-[8px] mb-[16px] py-[24px] bg-[#F6F7F9] rounded-[8px]">
        {template.preview === "trigger-turing-action" ? (
          <>
            <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-[#E8E8FD]">
              <GitBranch size={20} weight="fill" className="text-[#6868B1]" />
            </div>
            <div className="text-[#C8CFDB]">→</div>
            <div
              className="flex items-center justify-center size-[40px] rounded-[10px]"
              style={{
                background: "linear-gradient(135deg, #8C8CD4 0%, #8C8CD4 35%, #07ABDE 65%, #3CCEA7 100%)",
              }}
            >
              <Atom size={20} weight="fill" className="text-white" />
            </div>
            <div className="text-[#C8CFDB]">→</div>
            <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-white border-2 border-[#EBEBF5]">
              <GitBranch size={20} weight="regular" className="text-[#4A4A6A]" />
            </div>
          </>
        ) : template.preview === "trigger-condition-action" ? (
          <>
            <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-[#E8E8FD]">
              <GitBranch size={20} weight="fill" className="text-[#6868B1]" />
            </div>
            <div className="text-[#C8CFDB]">→</div>
            <div className="flex items-center justify-center size-[32px] rounded-[8px] bg-white border-2 border-[#EBEBF5]">
              <span className="text-[#4A4A6A]" style={{ fontSize: 10, fontWeight: 700, ...fontFeature }}>
                IF
              </span>
            </div>
            <div className="text-[#C8CFDB]">→</div>
            <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-white border-2 border-[#EBEBF5]">
              <GitBranch size={20} weight="regular" className="text-[#4A4A6A]" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-[#E8E8FD]">
              <GitBranch size={20} weight="fill" className="text-[#6868B1]" />
            </div>
            <div className="text-[#C8CFDB]">→</div>
            <div className="flex items-center justify-center size-[40px] rounded-[10px] bg-white border-2 border-[#EBEBF5]">
              <GitBranch size={20} weight="regular" className="text-[#4A4A6A]" />
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="mb-[12px]">
        <div
          className="inline-flex items-center h-[20px] px-[8px] rounded-[500px] mb-[8px]"
          style={{ backgroundColor: colors.bg }}
        >
          <span
            className="uppercase whitespace-nowrap font-bold tracking-[0.5px]"
            style={{ fontSize: 8, color: colors.text, ...fontFeature }}
          >
            {template.category}
          </span>
        </div>
        
        <h3 className="text-[#1A1A2E] mb-[4px]" style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
          {template.name}
        </h3>
        
        <p className="text-[#9B9BAD]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.2, lineHeight: "18px", ...fontFeature }}>
          {template.description}
        </p>
      </div>

      {/* Button */}
      <button className="flex items-center justify-center gap-[6px] w-full h-[34px] rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] transition-colors">
        <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
          Usar modelo
        </span>
        <ArrowRight size={14} weight="bold" />
      </button>
    </div>
  );
}

export function Templates() {
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
            Biblioteca de Modelos
          </h1>
          <p className="text-[#4A4A6A]" style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}>
            {mockTemplates.length} templates disponíveis para começar rapidamente
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-[32px] py-[24px]">
        <div className="grid grid-cols-3 gap-[16px]">
          {mockTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}
