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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
