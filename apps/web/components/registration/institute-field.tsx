import SearchableSelect from "../ui/searchable-select";
import { collegeOptions, OTHER_COLLEGE_VALUE } from "@/config/register/colleges";

interface InstituteFieldProps {
  value: string | undefined;
  universityValue: string | undefined;
  isNitrStudent: boolean;
  instituteError?: string;
  universityError?: string;
  onInstituteChange: (value: string) => void;
  onUniversityChange: (value: string) => void;
}

export default function InstituteField({
  value,
  universityValue,
  isNitrStudent,
  instituteError,
  universityError,
  onInstituteChange,
  onUniversityChange,
}: InstituteFieldProps) {
  return (
    <>
      {/* Institute Name - Searchable Dropdown */}
      <div>
        <label className="block text-sm font-medium font-inria text-white mb-0.5">
          Institute Name <span className="asterisk-icon">*</span>
        </label>
        {isNitrStudent ? (
          <input
            type="text"
            value={value || ""}
            disabled
            className="w-full px-3 py-2 text-sm font-semibold input-field opacity-50 cursor-not-allowed"
          />
        ) : (
          <SearchableSelect
            options={[
              ...collegeOptions.map((c) => ({ label: c.label, value: c.value })),
              { label: "Other (Enter manually)", value: OTHER_COLLEGE_VALUE },
            ]}
            value={value}
            onChange={onInstituteChange}
            placeholder="Search for your college..."
            error={instituteError}
            allowCustom={true}
            customPlaceholder="Enter your college/institute name..."
          />
        )}
      </div>

      {/* University Name - Auto-filled or manual */}
      <div>
        <label className="block text-sm font-medium font-inria text-white mb-0.5">
          University Name <span className="asterisk-icon">*</span>
        </label>
        <input
          type="text"
          value={universityValue || ""}
          onChange={(e) => onUniversityChange(e.target.value)}
          placeholder="Enter your university name"
          disabled={isNitrStudent}
          className={`w-full px-3 py-2 text-sm font-semibold input-field focus:outline-none transition-all ${
            universityError ? "border-red-500" : ""
          } ${isNitrStudent ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {universityError && <p className="mt-0.5 text-xs text-red-400">{universityError}</p>}
      </div>
    </>
  );
}
