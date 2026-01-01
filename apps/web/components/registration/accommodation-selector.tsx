interface AccommodationSelectorProps {
  wantsAccommodation: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

export default function AccommodationSelector({
  wantsAccommodation,
  onToggle,
  disabled = false,
}: AccommodationSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium font-inria text-white mb-0.5">
        Accommodation Preference <span className="asterisk-icon">*</span>
      </label>
      <div className="flex gap-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="accommodation"
            checked={!wantsAccommodation}
            onChange={() => onToggle(false)}
            disabled={disabled}
            className="w-4 h-4 accent-white focus:ring-white/50"
          />
          <span className="ml-2 text-white text-sm font-semibold">Not Required</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="accommodation"
            checked={wantsAccommodation}
            onChange={() => onToggle(true)}
            disabled={disabled}
            className="w-4 h-4 accent-white focus:ring-white/50"
          />
          <span className="ml-2 text-white text-sm font-semibold">Required</span>
        </label>
      </div>
    </div>
  );
}
