import { Check } from "lucide-react";

interface StepIndicatorProps {
  step: number;
  active: boolean;
  completed: boolean;
}

export function StepIndicator({ step, active, completed }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`size-10 rounded-full flex items-center justify-center text-base transition-all  font-berry ${
          completed
            ? "step-indicator-active text-white"
            : active
              ? "gradient-border-circle step-indicator-active text-white"
              : "bg-gray-200 text-gray-200 step-indicator-inactive"
        }`}
      >
        {completed ? <Check className="w-4 h-4" /> : step}
      </div>
    </div>
  );
}
