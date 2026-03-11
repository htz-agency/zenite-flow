const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export default function NumberInput({ value, onChange, placeholder, min, max, step, disabled }: NumberInputProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className="w-full h-[36px] px-[12px] rounded-[8px] border border-[#DDE3EC] bg-white text-[#122232] placeholder:text-[#C8CFDB] outline-none focus:border-[#0483AB] focus:ring-2 focus:ring-[#DCF0FF] disabled:bg-[#F6F7F9] disabled:text-[#98989d] transition-all"
      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
    />
  );
}
