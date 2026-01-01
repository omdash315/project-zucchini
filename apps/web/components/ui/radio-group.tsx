interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: string;
  required?: boolean;
  className?: string;
  readonly?: boolean;
  disabled?: boolean;
}

export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  className = "",
  readonly = false,
  disabled = false,
}: RadioGroupProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium font-inria text-white mb-0.5">
        {label} {required && <span className="asterisk-icon">*</span>}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={readonly || disabled}
              className="w-4 h-4 accent-white focus:ring-white/50"
            />
            <span className="ml-2 text-white text-sm font-semibold">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
