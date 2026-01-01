import { StepIndicator } from "./step-indicator";

type MunRegistrationStep =
  | "info"
  | "auth"
  | "form"
  | "form-leader"
  | "form-teammate1"
  | "form-teammate2"
  | "payment"
  | "complete";

interface MunProgressBarProps {
  currentStep: MunRegistrationStep;
}

export function MunProgressBar({ currentStep }: MunProgressBarProps) {
  const isFormPhase =
    currentStep === "form" ||
    currentStep === "form-leader" ||
    currentStep === "form-teammate1" ||
    currentStep === "form-teammate2";

  const isPaymentOrComplete = currentStep === "payment" || currentStep === "complete";

  // Don't show progress bar on info step
  if (currentStep === "info") {
    return null;
  }

  return (
    <div className="my-20">
      <div className="flex items-center justify-center space-x-3">
        <StepIndicator
          step={1}
          active={currentStep === "auth"}
          completed={currentStep !== "auth"}
        />
        <div className="step-indicator-progress-bar">
          <div
            className={`step-indicator-progress-bar-active transition-all duration-300 ${
              currentStep !== "auth" ? "w-full" : "w-0"
            }`}
          />
        </div>
        <StepIndicator step={2} active={isFormPhase} completed={isPaymentOrComplete} />
        <div className="step-indicator-progress-bar">
          <div
            className={`step-indicator-progress-bar-active transition-all duration-300 ${
              isPaymentOrComplete ? "w-full" : "w-0"
            }`}
          />
        </div>
        <StepIndicator
          step={3}
          active={currentStep === "payment"}
          completed={currentStep === "complete"}
        />
      </div>
    </div>
  );
}
