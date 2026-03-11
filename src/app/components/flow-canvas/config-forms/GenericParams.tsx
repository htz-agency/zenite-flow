const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface GenericParamsProps {
  nodeType: string;
  params: any;
  onChange: (params: any) => void;
}

export default function GenericParams({ nodeType, params, onChange }: GenericParamsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[40px] px-[20px]">
      <div className="text-center">
        <div className="text-[#98989d] mb-[8px]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
          Parâmetros em desenvolvimento
        </div>
        <p className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
          Os parâmetros específicos para este tipo de nó ainda estão sendo implementados.
        </p>
      </div>
    </div>
  );
}
