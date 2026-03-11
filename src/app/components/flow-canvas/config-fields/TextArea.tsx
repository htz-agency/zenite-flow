const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

export default function TextArea({ value, onChange, placeholder, rows = 4, disabled }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className="w-full px-[12px] py-[10px] rounded-[8px] border border-[#DDE3EC] bg-white text-[#122232] placeholder:text-[#C8CFDB] outline-none focus:border-[#0483AB] focus:ring-2 focus:ring-[#DCF0FF] disabled:bg-[#F6F7F9] disabled:text-[#98989d] transition-all resize-none"
      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, lineHeight: '20px', ...ff }}
    />
  );
}
