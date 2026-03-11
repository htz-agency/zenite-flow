import React from "react";
import { Robot } from "@phosphor-icons/react";

const TURING_GRADIENT = "linear-gradient(135deg, #8C8CD4 0%, #8C8CD4 35%, #07ABDE 65%, #3CCEA7 100%)";

interface TuringMascotProps {
  size?: number;
  showUpload?: boolean;
  className?: string;
}

export function TuringMascot({ size = 80, showUpload = false, className = "" }: TuringMascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-[16px] ${className}`}
      style={{
        width: size,
        height: size,
        background: TURING_GRADIENT,
      }}
    >
      <Robot size={size * 0.5} weight="duotone" color="#fff" />
      {showUpload && (
        <div
          className="absolute -bottom-[4px] -right-[4px] w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="#122232" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
