"use client";

import { signInWithGoogle } from "@repo/firebase-config";
import { useMunRegistration } from "@/hooks/use-mun-registration";
import { LoadingState, ProgressBar, AuthStep, CompleteStep } from "@/components/registration";
import {
  LeaderFormStep,
  Teammate1FormStep,
  Teammate2FormStep,
  MunPaymentStep,
} from "@/components/registration/mun";
import { PORTFOLIO_MATRIX_URL } from "@/config/register/mun";

export default function MunRegisterPage() {
  const {
    user,
    currentStep,
    userData,
    isLoading,
    error,
    paymentError,
    teamNitrStatus,
    teamData,
    teamId,
    handleRegistrationComplete,
    handlePaymentFailure,
    handleBackStep,
    setError,
    handleNitrStatusChange,
  } = useMunRegistration();

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google");
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const isTeamRegistration = currentStep === "form-leader";

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Register for MUN - NITRUTSAV 2026
          </h1>
          <p className="text-gray-600">Model United Nations Registration</p>
        </div>

        {/* Portfolio Matrix */}
        <p className="text-center mb-6">
          <a
            href={PORTFOLIO_MATRIX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View Portfolio Matrix
          </a>
        </p>

        <ProgressBar currentStep={currentStep} />
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {currentStep === "auth" && (
            <AuthStep onGoogleSignIn={handleGoogleSignIn} isLoading={isLoading} error={error} />
          )}

          {(currentStep === "form" || currentStep === "form-leader") && user && (
            <LeaderFormStep
              user={user}
              teamData={teamData}
              teamNitrStatus={teamNitrStatus}
              isTeamRegistration={isTeamRegistration}
              onComplete={handleRegistrationComplete}
              onNitrStatusChange={handleNitrStatusChange}
            />
          )}

          {currentStep === "form-teammate1" && user && (
            <Teammate1FormStep
              user={user}
              teamData={teamData}
              teamNitrStatus={teamNitrStatus}
              onComplete={handleRegistrationComplete}
              onBack={handleBackStep}
            />
          )}

          {currentStep === "form-teammate2" && user && (
            <Teammate2FormStep
              user={user}
              teamData={teamData}
              teamNitrStatus={teamNitrStatus}
              onComplete={handleRegistrationComplete}
              onBack={handleBackStep}
            />
          )}

          {currentStep === "payment" && userData && (
            <MunPaymentStep
              userData={userData}
              paymentError={paymentError}
              onPaymentFailure={handlePaymentFailure}
              teamId={teamId}
            />
          )}

          {currentStep === "complete" && <CompleteStep />}
        </div>
      </div>
    </div>
  );
}
