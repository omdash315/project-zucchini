interface InputFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "date";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  helperText?: string;
  className?: string;
  readonly?: boolean;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  maxLength,
  helperText,
  className = "",
  readonly,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Convert ISO date strings to YYYY-MM-DD format for date inputs
  const getInputValue = () => {
    if (type === "date" && typeof value === "string" && value.includes("T")) {
      // Handle ISO date strings from localStorage (e.g., "2024-12-30T00:00:00.000Z")
      return value.split("T")[0];
    }
    return value || "";
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium font-inria text-white mb-0.5">
        {label}
        {required && <span className="asterisk-icon ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={getInputValue()}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        readOnly={readonly}
        className={`w-full px-3 py-2 text-sm focus:outline-none input-field font-semibold ${error ? "border-red-500" : "border-gray-300 "}`}
      />
      {helperText && <p className="mt-0.5 text-xs text-white/80">{helperText}</p>}
      {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
