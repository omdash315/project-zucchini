"use client";

import { useState, useEffect } from "react";
import { signInWithGoogle, onAuthStateChanged, type User } from "@repo/firebase-config";
import { useApi } from "@repo/shared-utils";
import { LoadingState, ProgressBar, AuthStep, CompleteStep } from "@/components/registration";
import { MunRegistrationForm, MunPaymentButton } from "@/components/registration/mun";
import type { MunRegistration } from "@repo/shared-types";
import { toast } from "sonner";

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
  isNitrStudent?: boolean;
  isVerified?: boolean;
}

export default function MunRegisterPage() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("auth");
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isTeamRegistration, setIsTeamRegistration] = useState(false);
  const [teamNitrStatus, setTeamNitrStatus] = useState({
    leader: false,
    teammate1: false,
    teammate2: false,
  });
  const [teamData, setTeamData] = useState<TeamData>({
    leader: null,
    teammate1: null,
    teammate2: null,
  });

  const { execute: checkRegistration } = useApi<CheckMunRegistrationResponse>();

  useEffect(() => {
    const savedTeamData = localStorage.getItem("munTeamRegistration");
    const savedStep = localStorage.getItem("munCurrentStep");
    const savedIsTeamReg = localStorage.getItem("munIsTeamRegistration");
    const savedTeamNitrStatus = localStorage.getItem("munTeamNitrStatus");

    if (savedTeamData) {
      try {
        const parsed = JSON.parse(savedTeamData);
        setTeamData(parsed);

        if (savedStep) {
          setCurrentStep(savedStep as RegistrationStep);
        }

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

    if (savedTeamNitrStatus) {
      try {
        const parsed = JSON.parse(savedTeamNitrStatus);
        setTeamNitrStatus(parsed);
      } catch (error) {
        console.error("Failed to parse saved team NITR status:", error);
        localStorage.removeItem("munTeamNitrStatus");
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

            if (result.isPaymentVerified || (result.isNitrStudent && result.isVerified)) {
              setCurrentStep("complete");
            } else {
              const savedStep = localStorage.getItem("munCurrentStep");
              if (!savedStep || savedStep === "payment") {
                setCurrentStep("payment");
              }
            }
          } else {
            // User not registered - clear any saved state and show form
            localStorage.removeItem("munCurrentStep");
            localStorage.removeItem("munTeamRegistration");
            localStorage.removeItem("munIsTeamRegistration");
            localStorage.removeItem("munIsNitrStudent");
            setCurrentStep("form");
          }
        } catch (error) {
          console.error("Failed to check MUN registration status:", error);
          // On error, clear saved state and show form
          localStorage.removeItem("munCurrentStep");
          localStorage.removeItem("munTeamRegistration");
          localStorage.removeItem("munIsTeamRegistration");
          localStorage.removeItem("munIsNitrStudent");
          setCurrentStep("form");
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
    if (committeeChoice === "MOOT_COURT") {
      setIsTeamRegistration(true);
      localStorage.setItem("munIsTeamRegistration", "true");

      if (currentStep === "form" || currentStep === "form-leader") {
        localStorage.setItem("munTeamNitrStatus", JSON.stringify(teamNitrStatus));

        const updatedTeamData = { ...teamData, leader: registrationData };
        setTeamData(updatedTeamData);
        localStorage.setItem("munTeamRegistration", JSON.stringify(updatedTeamData));
        localStorage.setItem("munCurrentStep", "form-teammate1");
        setCurrentStep("form-teammate1");
      } else if (currentStep === "form-teammate1") {
        localStorage.setItem("munTeamNitrStatus", JSON.stringify(teamNitrStatus));

        const updatedTeamData = { ...teamData, teammate1: registrationData };
        setTeamData(updatedTeamData);
        localStorage.setItem("munTeamRegistration", JSON.stringify(updatedTeamData));
        localStorage.setItem("munCurrentStep", "form-teammate2");
        setCurrentStep("form-teammate2");
      } else if (currentStep === "form-teammate2") {
        const updatedTeamData = { ...teamData, teammate2: registrationData };
        setTeamData(updatedTeamData);
        localStorage.setItem("munTeamRegistration", JSON.stringify(updatedTeamData));

        setIsLoading(true);
        setError(null);

        const allNitrStudents =
          teamNitrStatus.leader && teamNitrStatus.teammate1 && teamNitrStatus.teammate2;

        const result = await registerTeam("mun/register", {
          method: "POST",
          body: JSON.stringify({
            teamLeader: { ...updatedTeamData.leader, isNitrStudent: teamNitrStatus.leader },
            teammate1: { ...updatedTeamData.teammate1, isNitrStudent: teamNitrStatus.teammate1 },
            teammate2: { ...updatedTeamData.teammate2, isNitrStudent: teamNitrStatus.teammate2 },
          }),
        });

        setIsLoading(false);

        if (result === null) {
          toast.error("Team registration failed", {
            description: "Failed to register team. Please try again.",
          });
          return;
        }

        toast.success("Team registration successful!", {
          description: allNitrStudents
            ? "Your team registration is complete. No payment required for NIT Rourkela students."
            : "Please proceed to payment to complete your team registration.",
        });

        setUserData({
          name: user?.displayName || "",
          email: user?.email || "",
          studentType: studentType as "SCHOOL" | "COLLEGE",
          committeeChoice,
        });

        if (allNitrStudents) {
          localStorage.removeItem("munTeamRegistration");
          localStorage.removeItem("munCurrentStep");
          localStorage.removeItem("munIsTeamRegistration");
          localStorage.removeItem("munTeamNitrStatus");
          setCurrentStep("complete");
        } else {
          localStorage.setItem("munCurrentStep", "payment");
          setCurrentStep("payment");
        }
      }
    } else {
      setIsTeamRegistration(false);
      localStorage.setItem("munIsTeamRegistration", "false");
      localStorage.setItem("munTeamNitrStatus", JSON.stringify(teamNitrStatus));

      setIsLoading(true);
      setError(null);

      const res = await registerTeam("mun/register", {
        method: "POST",
        body: JSON.stringify({
          ...registrationData,
          isNitrStudent: teamNitrStatus.leader,
        }),
      });

      setIsLoading(false);

      if (res === null) {
        toast.error("Registration failed", {
          description: "Failed to register. Please try again.",
        });
        return;
      }

      toast.success("Registration successful!", {
        description: teamNitrStatus.leader
          ? "Your registration is complete. No payment required for NIT Rourkela students."
          : "Please proceed to payment to complete your registration.",
      });

      setUserData({
        name: user?.displayName || "",
        email: user?.email || "",
        studentType: studentType as "SCHOOL" | "COLLEGE",
        committeeChoice,
      });

      if (teamNitrStatus.leader) {
        setCurrentStep("complete");
      } else {
        localStorage.setItem("munCurrentStep", "payment");
        setCurrentStep("payment");
      }
    }
  };

  const handlePaymentSuccess = () => {
    localStorage.removeItem("munTeamRegistration");
    localStorage.removeItem("munCurrentStep");
    localStorage.removeItem("munIsTeamRegistration");
    setCurrentStep("complete");
  };

  const handlePaymentFailure = (errorMessage: string) => {
    setPaymentError(errorMessage);
  };

  const handleBackStep = () => {
    if (currentStep === "form-teammate2") {
      setCurrentStep("form-teammate1");
      localStorage.setItem("munCurrentStep", "form-teammate1");
    } else if (currentStep === "form-teammate1") {
      setCurrentStep("form-leader");
      localStorage.setItem("munCurrentStep", "form-leader");
    }
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
                isNitrStudent={teamNitrStatus.leader}
                setIsNitrStudent={(value) =>
                  setTeamNitrStatus({ ...teamNitrStatus, leader: value })
                }
              />
            </div>
          )}

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
                isNitrStudent={teamNitrStatus.teammate1}
                setIsNitrStudent={(value) =>
                  setTeamNitrStatus({ ...teamNitrStatus, teammate1: value })
                }
                onBack={handleBackStep}
              />
            </div>
          )}

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
                isNitrStudent={teamNitrStatus.teammate2}
                setIsNitrStudent={(value) =>
                  setTeamNitrStatus({ ...teamNitrStatus, teammate2: value })
                }
                onBack={handleBackStep}
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
                committeeChoice={userData.committeeChoice || "UNHRC"}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailure={handlePaymentFailure}
                nonNitrCount={
                  userData.committeeChoice === "MOOT_COURT"
                    ? [
                        teamNitrStatus.leader,
                        teamNitrStatus.teammate1,
                        teamNitrStatus.teammate2,
                      ].filter((isNitr) => !isNitr).length
                    : teamNitrStatus.leader
                      ? 0
                      : 1
                }
              />
            </div>
          )}

          {currentStep === "complete" && <CompleteStep />}
        </div>
      </div>
    </div>
  );
}
