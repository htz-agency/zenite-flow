const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface FormFieldProps {
  label: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}

export default function FormField({ label, required, description, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[#122232] flex items-center gap-[4px]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
        {label}
        {required && <span className="text-[#FF6B6B]">*</span>}
      </label>
      {children}
      {description && (
        <span className="text-[#98989d]" style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
          {description}
        </span>
      )}
    </div>
  );
}
