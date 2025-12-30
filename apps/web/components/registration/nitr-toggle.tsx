interface NitrToggleProps {
  isNitrStudent: boolean;
  onToggle: (checked: boolean) => void;
}

export default function NitrToggle({ isNitrStudent, onToggle }: NitrToggleProps) {
  return (
    <div className="border-2 border-white/40 rounded-[13px] p-3 bg-white/25 backdrop-blur-[9.25px]">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isNitrStudent}
          onChange={(e) => onToggle(e.target.checked)}
          className="w-4 h-4 accent-white focus:ring-white/50 rounded"
        />
        <span className="ml-2 text-sm font-semibold text-white">I am from NIT Rourkela</span>
      </label>
      {isNitrStudent && (
        <p className="mt-1.5 text-xs text-white/90">
          Your college information will be auto-filled and you won&apos;t need to pay registration
          fees.
        </p>
      )}
    </div>
  );
}
