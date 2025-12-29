"use client";

import { useState, useEffect } from "react";
import { signInWithGoogle } from "@repo/firebase-config";
import { useApi } from "@repo/shared-utils";
import { useAuth } from "@/contexts/auth-context";
import {
  LoadingState,
  ProgressBar,
  AuthStep,
  FormStep,
  PaymentStep,
  CompleteStep,
} from "@/components/registration";

type RegistrationStep = "auth" | "form" | "payment" | "complete";

export interface UserData {
  name: string;
  email: string;
}

interface CheckRegistrationResponse {
  isMunRegistered: boolean;
  isNitrutsavRegistered: boolean;
  registrationType: "MUN" | "NITRUTSAV" | null;
  userId: number | null;
  name: string | null;
  email: string | null;
  isPaymentVerified: boolean;
  isNitrStudent: boolean;
  isVerified: boolean;
}

export default function RegisterPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("auth");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const { execute: checkRegistration } = useApi<CheckRegistrationResponse>();

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (!user) {
        setCurrentStep("auth");
        setIsLoading(false);
        return;
      }

      try {
        const result = await checkRegistration("check-cross-registration", {
          method: "GET",
        });

        if (result.success && result.data?.isNitrutsavRegistered) {
          setUserData({
            name: result.data.name!,
            email: result.data.email!,
          });

          if (
            result.data.isPaymentVerified ||
            (result.data.isNitrStudent && result.data.isVerified)
          ) {
            setCurrentStep("complete");
          } else {
            setCurrentStep("payment");
          }
        } else {
          // User not registered - show form
          setCurrentStep("form");
        }
      } catch (error) {
        console.error("Failed to check registration status:", error);
        // On error, show form
        setCurrentStep("form");
      }

      setIsLoading(false);
    };

    if (!authLoading) {
      checkRegistrationStatus();
    }
  }, [user, authLoading]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  const handleRegistrationComplete = (isNitrStudent: boolean = false) => {
    setUserData({
      name: user?.displayName || "",
      email: user?.email || "",
    });

    if (isNitrStudent) {
      setCurrentStep("complete");
    } else {
      setCurrentStep("payment");
    }
  };

  const handlePaymentFailure = (errorMessage: string) => {
    setPaymentError(errorMessage);
  };

  if (authLoading || isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Register for NITRUTSAV 2026</h1>
        </div>
        <ProgressBar currentStep={currentStep} />
        <div className=" border border-gray-200 rounded-lg p-8">
          {currentStep === "auth" && (
            <AuthStep onGoogleSignIn={handleGoogleSignIn} isLoading={isLoading} error={error} />
          )}

          {currentStep === "form" && user && (
            <FormStep user={user} onComplete={handleRegistrationComplete} />
          )}

          {currentStep === "payment" && userData && (
            <PaymentStep
              userData={userData}
              paymentError={paymentError}
              onPaymentFailure={handlePaymentFailure}
            />
          )}

          {currentStep === "complete" && <CompleteStep />}
        </div>
      </div>
    </div>
  );
}
