import { Atom } from "@phosphor-icons/react";

interface TuringMascotProps {
  size?: number;
  showUpload?: boolean;
  className?: string;
}

export function TuringMascot({ size = 80, showUpload = false, className = "" }: TuringMascotProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="relative flex items-center justify-center rounded-[20%]"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #8C8CD4 0%, #8C8CD4 35%, #07ABDE 65%, #3CCEA7 100%)",
        }}
      >
        <Atom
          size={size * 0.6}
          weight="bold"
          className="text-white"
        />
      </div>
      {showUpload && (
        <div className="absolute -bottom-2 -right-2 size-8 bg-white rounded-full border-2 border-[#EBEBF5] flex items-center justify-center shadow-md">
          <span className="text-xs">📷</span>
        </div>
      )}
    </div>
  );
}
