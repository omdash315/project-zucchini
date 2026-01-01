interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
  readonly?: boolean;
  disabled?: boolean;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
  required = false,
  helperText,
  className = "",
  readonly = false,
  disabled = false,
}: SelectFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium font-inria text-white mb-0.5">
        {label} {required && <span className="asterisk-icon">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={readonly || disabled}
        className={`w-full px-3 py-2 text-sm font-semibold input-field focus:outline-none transition-all ${
          error ? "border-red-500" : ""
        } ${readonly || disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p className="mt-0.5 text-xs text-white/80">{helperText}</p>}
      {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
