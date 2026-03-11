const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export default function Dropdown({ value, onChange, options, placeholder, disabled }: DropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full h-[36px] px-[12px] rounded-[8px] border border-[#DDE3EC] bg-white text-[#122232] outline-none focus:border-[#0483AB] focus:ring-2 focus:ring-[#DCF0FF] disabled:bg-[#F6F7F9] disabled:text-[#98989d] transition-all cursor-pointer"
      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
