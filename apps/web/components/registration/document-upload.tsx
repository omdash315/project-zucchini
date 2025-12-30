import CloudinaryUploader from "../cloudinary-uploader";

interface DocumentUploadProps {
  label: string;
  description?: string;
  value: string | undefined;
  error?: string;
  onUploadComplete: (url: string) => void;
  compact?: boolean;
}

export default function DocumentUpload({
  label,
  description,
  value,
  error,
  onUploadComplete,
  compact = false,
}: DocumentUploadProps) {
  return (
    <div>
      <label
        className={`block font-medium font-inria text-white mb-1 ${compact ? "text-sm" : "text-base"}`}
      >
        {label} <span className="asterisk-icon">*</span>
      </label>
      {description && (
        <p className={`text-white/80 mb-1 ${compact ? "text-xs" : "text-sm"}`}>{description}</p>
      )}
      <CloudinaryUploader
        maxFiles={1}
        value={value}
        onUploadComplete={onUploadComplete}
        compact={compact}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
