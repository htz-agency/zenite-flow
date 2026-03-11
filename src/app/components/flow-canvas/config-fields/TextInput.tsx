const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TextInput({ value, onChange, placeholder, disabled }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full h-[36px] px-[12px] rounded-[8px] border border-[#DDE3EC] bg-white text-[#122232] placeholder:text-[#C8CFDB] outline-none focus:border-[#0483AB] focus:ring-2 focus:ring-[#DCF0FF] disabled:bg-[#F6F7F9] disabled:text-[#98989d] transition-all"
      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
    />
  );
}
