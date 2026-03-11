const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export default function Checkbox({ checked, onChange, label, description, disabled }: CheckboxProps) {
  return (
    <label className="flex items-start gap-[10px] cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="mt-[2px] w-[18px] h-[18px] rounded-[4px] border-2 border-[#DDE3EC] bg-white checked:bg-[#0483AB] checked:border-[#0483AB] cursor-pointer disabled:opacity-50 transition-all"
      />
      <div className="flex-1">
        <span className="text-[#122232] group-hover:text-[#0483AB] transition-colors" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
          {label}
        </span>
        {description && (
          <p className="text-[#98989d] mt-[2px]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
            {description}
          </p>
        )}
      </div>
    </label>
  );
}
