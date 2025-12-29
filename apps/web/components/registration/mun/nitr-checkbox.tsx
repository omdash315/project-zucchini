interface NitrCheckboxProps {
  isNitrStudent: boolean;
  setIsNitrStudent: (value: boolean) => void;
  lockNitrStatus: boolean;
  stepTitle?: string;
  hideCommitteeChoice: boolean;
}

export function NitrCheckbox({
  isNitrStudent,
  setIsNitrStudent,
  lockNitrStatus,
  stepTitle,
  hideCommitteeChoice,
}: NitrCheckboxProps) {
  return (
    <div
      className={`border rounded-lg p-4 ${lockNitrStatus ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"}`}
    >
      <label
        className={`flex items-center ${lockNitrStatus ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          type="checkbox"
          checked={isNitrStudent}
          onChange={(e) => {
            if (!lockNitrStatus) {
              setIsNitrStudent(e.target.checked);
            }
          }}
          disabled={lockNitrStatus}
          className={`w-4 h-4 text-blue-600 focus:ring-blue-500 rounded ${lockNitrStatus ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        <span
          className={`ml-2 text-sm font-semibold ${lockNitrStatus ? "text-gray-600" : "text-blue-900"}`}
        >
          {stepTitle ? `Is ${stepTitle} from NIT Rourkela?` : "I am from NIT Rourkela"}
        </span>
      </label>
      {lockNitrStatus && (
        <p className="mt-2 text-xs text-gray-600">
          {isNitrStudent
            ? "The team leader is from NIT Rourkela, so all teammates must also be from NIT Rourkela."
            : "The team leader is not from NIT Rourkela, so no teammates can be from NIT Rourkela. You can be from any other college."}
        </p>
      )}
      {!lockNitrStatus && isNitrStudent && (
        <p className="mt-2 text-xs text-blue-700">
          College information will be auto-filled and locked.
          {!hideCommitteeChoice && " You won't need to pay registration fees."}
        </p>
      )}
    </div>
  );
}
