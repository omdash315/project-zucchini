"use client";

import { useState, useEffect } from "react";
import { signInWithGoogle, onAuthStateChanged, type User } from "@repo/firebase-config";
import { useApi } from "@repo/shared-utils";
import { LoadingState, ProgressBar, AuthStep, CompleteStep } from "@/components/registration";
import { MunRegistrationForm, MunPaymentButton } from "@/components/registration/mun";
import type { MunRegistration } from "@repo/shared-types";

type RegistrationStep =
  | "auth"
  | "form"
  | "form-leader"
  | "form-teammate1"
  | "form-teammate2"
  | "payment"
  | "complete";

interface UserData {
  name: string;
  email: string;
  studentType?: "SCHOOL" | "COLLEGE";
  committeeChoice?: string;
}

interface TeamData {
  leader: MunRegistration | null;
  teammate1: MunRegistration | null;
  teammate2: MunRegistration | null;
}

interface CheckMunRegistrationResponse {
  isRegistered: boolean;
  userId?: number;
  name?: string;
  email?: string;
  isPaymentVerified?: boolean;
  isTeamMember?: boolean;
  isTeamLeader?: boolean;
  teamLeaderName?: string;
}

export default function MunRegisterPage() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("auth");
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isTeamRegistration, setIsTeamRegistration] = useState(false);
  const [teamData, setTeamData] = useState<TeamData>({
    leader: null,
    teammate1: null,
    teammate2: null,
  });

  const { execute: checkRegistration } = useApi<CheckMunRegistrationResponse>();

  // Restore team data from localStorage on mount
  useEffect(() => {
    const savedTeamData = localStorage.getItem("munTeamRegistration");
    const savedStep = localStorage.getItem("munCurrentStep");
    const savedIsTeamReg = localStorage.getItem("munIsTeamRegistration");

    if (savedTeamData) {
      try {
        const parsed = JSON.parse(savedTeamData);
        setTeamData(parsed);

        // Restore step if saved
        if (savedStep) {
          setCurrentStep(savedStep as RegistrationStep);
        }

        // Restore team registration flag
        if (savedIsTeamReg) {
          setIsTeamRegistration(savedIsTeamReg === "true");
        }
      } catch (error) {
        console.error("Failed to parse saved team data:", error);
        localStorage.removeItem("munTeamRegistration");
        localStorage.removeItem("munCurrentStep");
        localStorage.removeItem("munIsTeamRegistration");
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const result = await checkRegistration("mun/check-registration", {
            method: "GET",
          });

          if (result?.isRegistered) {
            setUserData({
              name: result.name!,
              email: result.email!,
            });

            if (result.isPaymentVerified) {
              setCurrentStep("complete");
            } else {
              // Only set to payment if not already in a form step (from localStorage)
              const savedStep = localStorage.getItem("munCurrentStep");
              if (!savedStep || savedStep === "payment") {
                setCurrentStep("payment");
              }
            }
          } else {
            // Only set to form if not already restored from localStorage
            const savedStep = localStorage.getItem("munCurrentStep");
            if (!savedStep) {
              setCurrentStep("form");
            }
          }
        } catch (error) {
          console.error("Failed to check MUN registration status:", error);
          const savedStep = localStorage.getItem("munCurrentStep");
          if (!savedStep) {
            setCurrentStep("form");
          }
        }
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const { execute: registerTeam } = useApi();

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

  const handleRegistrationComplete = async (
    studentType: string,
    committeeChoice: string,
    registrationData: MunRegistration
  ) => {
    // Check if this is a team registration (MOOT_COURT)
    if (committeeChoice === "MOOT_COURT") {
      setIsTeamRegistration(true);
      localStorage.setItem("munIsTeamRegistration", "true");

      // Determine which step we're on and store data accordingly
      if (currentStep === "form" || currentStep === "form-leader") {
        const updatedTeamData = { ...teamData, leader: registrationData };
        setTeamData(updatedTeamData);
        // Save to localStorage
        localStorage.setItem("munTeamRegistration", JSON.stringify(updatedTeamData));
        localStorage.setItem("munCurrentStep", "form-teammate1");
        setCurrentStep("form-teammate1");
      } else if (currentStep === "form-teammate1") {
        const updatedTeamData = { ...teamData, teammate1: registrationData };
        setTeamData(updatedTeamData);
        // Save to localStorage
        localStorage.setItem("munTeamRegistration", JSON.stringify(updatedTeamData));
        localStorage.setItem("munCurrentStep", "form-teammate2");
        setCurrentStep("form-teammate2");
      } else if (currentStep === "form-teammate2") {
        const updatedTeamData = { ...teamData, teammate2: registrationData };
        setTeamData(updatedTeamData);
        // Save to localStorage
        localStorage.setItem("munTeamRegistration", JSON.stringify(updatedTeamData));

        // All team data collected, register the team
        try {
          setIsLoading(true);
          setError(null);

          await registerTeam("mun/register", {
            method: "POST",
            body: JSON.stringify({
              leader: updatedTeamData.leader,
              teammate1: updatedTeamData.teammate1,
              teammate2: updatedTeamData.teammate2,
            }),
          });

          // Only proceed to payment if registration was successful
          setUserData({
            name: user?.displayName || "",
            email: user?.email || "",
            studentType: studentType as "SCHOOL" | "COLLEGE",
            committeeChoice,
          });
          localStorage.setItem("munCurrentStep", "payment");
          setCurrentStep("payment");
        } catch (error) {
          setError(error instanceof Error ? error.message : "Failed to register team");
          // Don't proceed to payment on error
          console.error("Team registration failed:", error);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // Individual registration (OVERNIGHT_CRISIS)
      setIsTeamRegistration(false);
      localStorage.setItem("munIsTeamRegistration", "false");

      try {
        setIsLoading(true);
        setError(null);

        await registerTeam("mun/register", {
          method: "POST",
          body: JSON.stringify(registrationData),
        });

        // Only proceed to payment if registration was successful
        setUserData({
          name: user?.displayName || "",
          email: user?.email || "",
          studentType: studentType as "SCHOOL" | "COLLEGE",
          committeeChoice,
        });
        localStorage.setItem("munCurrentStep", "payment");
        setCurrentStep("payment");
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to register");
        // Don't proceed to payment on error
        console.error("Individual registration failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePaymentSuccess = () => {
    // Clear localStorage on successful payment
    localStorage.removeItem("munTeamRegistration");
    localStorage.removeItem("munCurrentStep");
    localStorage.removeItem("munIsTeamRegistration");
    setCurrentStep("complete");
  };

  const handlePaymentFailure = (errorMessage: string) => {
    setPaymentError(errorMessage);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Register for MUN - NITRUTSAV 2026
          </h1>
          <p className="text-gray-600">Model United Nations Registration</p>
        </div>
        <ProgressBar currentStep={currentStep} />
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {currentStep === "auth" && (
            <AuthStep onGoogleSignIn={handleGoogleSignIn} isLoading={isLoading} error={error} />
          )}

          {/* Individual registration or Team Leader step */}
          {(currentStep === "form" || currentStep === "form-leader") && user && (
            <div>
              {currentStep === "form-leader" && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Team Leader Registration
                  </h2>
                  <p className="text-gray-600">
                    Step 1 of 3: Enter your details as the team leader
                  </p>
                </div>
              )}
              <MunRegistrationForm
                user={user}
                stepTitle={currentStep === "form-leader" ? "Team Leader" : undefined}
                initialData={teamData.leader || undefined}
                buttonText={
                  currentStep === "form-leader" ? "Enter Teammate 1 Details" : "Continue to Payment"
                }
                onComplete={(studentType, committeeChoice, registrationData) =>
                  handleRegistrationComplete(studentType, committeeChoice, registrationData)
                }
              />
            </div>
          )}

          {/* Teammate 1 step */}
          {currentStep === "form-teammate1" && user && teamData.leader && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Teammate 1 Registration</h2>
                <p className="text-gray-600">Step 2 of 3: Enter details for your first teammate</p>
              </div>
              <MunRegistrationForm
                user={user}
                stepTitle="Teammate 1"
                initialData={{
                  ...(teamData.teammate1 || {}),
                  studentType: teamData.leader.studentType,
                  committeeChoice: teamData.leader.committeeChoice,
                  institute: teamData.leader.institute,
                  university: teamData.leader.university,
                  city: teamData.leader.city,
                }}
                hideCommitteeChoice={true}
                clearUserDetails={true}
                buttonText="Enter Teammate 2 Details"
                onComplete={(studentType, committeeChoice, registrationData) =>
                  handleRegistrationComplete(studentType, committeeChoice, registrationData)
                }
              />
            </div>
          )}

          {/* Teammate 2 step */}
          {currentStep === "form-teammate2" && user && teamData.leader && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Teammate 2 Registration</h2>
                <p className="text-gray-600">Step 3 of 3: Enter details for your second teammate</p>
              </div>
              <MunRegistrationForm
                user={user}
                stepTitle="Teammate 2"
                initialData={{
                  ...(teamData.teammate2 || {}),
                  studentType: teamData.leader.studentType,
                  committeeChoice: teamData.leader.committeeChoice,
                  institute: teamData.leader.institute,
                  university: teamData.leader.university,
                  city: teamData.leader.city,
                }}
                hideCommitteeChoice={true}
                clearUserDetails={true}
                buttonText="Continue to Payment"
                onComplete={(studentType, committeeChoice, registrationData) =>
                  handleRegistrationComplete(studentType, committeeChoice, registrationData)
                }
              />
            </div>
          )}

          {currentStep === "payment" && userData && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
                <p className="text-gray-600">Complete your MUN registration payment</p>
              </div>

              {paymentError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {paymentError}
                </div>
              )}

              <MunPaymentButton
                userName={userData.name}
                userEmail={userData.email}
                studentType={userData.studentType || "COLLEGE"}
                committeeChoice={userData.committeeChoice || "OVERNIGHT_CRISIS"}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailure={handlePaymentFailure}
              />
            </div>
          )}

          {currentStep === "complete" && <CompleteStep />}
        </div>
      </div>
    </div>
  );
}
