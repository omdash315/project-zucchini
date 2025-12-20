import { StepIndicator } from "./step-indicator";

type RegistrationStep =
  | "auth"
  | "form"
  | "form-leader"
  | "form-teammate1"
  | "form-teammate2"
  | "payment"
  | "complete";

interface ProgressBarProps {
  currentStep: RegistrationStep;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  // Determine if we're in the form phase (any form step)
  const isFormPhase =
    currentStep === "form" ||
    currentStep === "form-leader" ||
    currentStep === "form-teammate1" ||
    currentStep === "form-teammate2";

  const isPaymentOrComplete = currentStep === "payment" || currentStep === "complete";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-3">
        <StepIndicator
          step={1}
          label="Sign In"
          active={currentStep === "auth"}
          completed={currentStep !== "auth"}
        />
        <div className="w-12 h-0.5 bg-gray-300">
          <div
            className={`h-full bg-gray-900 transition-all duration-300 ${
              currentStep !== "auth" ? "w-full" : "w-0"
            }`}
          />
        </div>
        <StepIndicator
          step={2}
          label="Details"
          active={isFormPhase}
          completed={isPaymentOrComplete}
        />
        <div className="w-12 h-0.5 bg-gray-300">
          <div
            className={`h-full bg-gray-900 transition-all duration-300 ${
              isPaymentOrComplete ? "w-full" : "w-0"
            }`}
          />
        </div>
        <StepIndicator
          step={3}
          label="Payment"
          active={currentStep === "payment"}
          completed={currentStep === "complete"}
        />
      </div>
    </div>
  );
}
