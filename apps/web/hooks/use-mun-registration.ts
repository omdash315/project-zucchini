import { useState, useEffect } from "react";
import { useApi } from "@repo/shared-utils";
import { useAuth } from "@/contexts/auth-context";
import type { MunRegistration } from "@repo/shared-types";
import { toast } from "sonner";
import {
  type RegistrationStep,
  type TeamData,
  type TeamNitrStatus,
  saveMunTeamData,
  loadMunTeamData,
  saveMunStep,
  loadMunStep,
  saveMunNitrStatus,
  loadMunNitrStatus,
  saveMunIsTeamRegistration,
  saveMunTeamId,
  loadMunTeamId,
  clearMunStorage,
} from "@/lib/mun-storage";

interface UserData {
  name: string;
  email: string;
  studentType?: "SCHOOL" | "COLLEGE";
  committeeChoice?: string;
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
  teamId?: string;
}

export function useMunRegistration() {
  const { user, isLoading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("info");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamNitrStatus, setTeamNitrStatus] = useState<TeamNitrStatus>({
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
  const { execute: registerTeam } = useApi();

  useEffect(() => {
    const savedTeamData = loadMunTeamData();
    const savedStep = loadMunStep();
    const savedTeamNitrStatus = loadMunNitrStatus();
    const savedTeamId = loadMunTeamId();

    if (savedTeamData) {
      setTeamData(savedTeamData);
      if (savedStep) {
        setCurrentStep(savedStep);
      }
    }

    if (savedTeamNitrStatus) {
      setTeamNitrStatus(savedTeamNitrStatus);
    }

    if (savedTeamId) {
      setTeamId(savedTeamId);
    }
  }, []);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (!user) {
        // Keep on info step if user hasn't clicked register yet
        if (currentStep !== "auth") {
          setCurrentStep("info");
        }
        setIsLoading(false);
        return;
      }

      try {
        const result = await checkRegistration("mun/check-registration", {
          method: "GET",
        });

        if (result.success && result.data?.isRegistered) {
          setUserData({
            name: result.data.name!,
            email: result.data.email!,
          });

          // Capture teamId from check-registration response
          if (result.data.teamId) {
            setTeamId(result.data.teamId);
            saveMunTeamId(result.data.teamId);
          }

          if (
            result.data.isPaymentVerified ||
            (result.data.isNitrStudent && result.data.isVerified)
          ) {
            setCurrentStep("complete");
          } else {
            const savedStep = loadMunStep();
            if (!savedStep || savedStep === "payment") {
              setCurrentStep("payment");
            }
          }
        } else {
          // User not registered - clear any saved state and show form
          clearMunStorage();
          setCurrentStep("form");
        }
      } catch (error) {
        console.error("Failed to check MUN registration status:", error);
        // On error, clear saved state and show form
        clearMunStorage();
        setCurrentStep("form");
      }

      setIsLoading(false);
    };

    if (!authLoading) {
      checkRegistrationStatus();
    }
  }, [user, authLoading]);

  const handleRegistrationComplete = async (
    studentType: string,
    committeeChoice: string,
    registrationData: MunRegistration
  ) => {
    if (committeeChoice === "MOOT_COURT") {
      saveMunIsTeamRegistration(true);

      if (currentStep === "form" || currentStep === "form-leader") {
        saveMunNitrStatus(teamNitrStatus);

        const updatedTeamData = { ...teamData, leader: registrationData };
        setTeamData(updatedTeamData);
        saveMunTeamData(updatedTeamData);
        saveMunStep("form-teammate1");
        setCurrentStep("form-teammate1");
      } else if (currentStep === "form-teammate1") {
        saveMunNitrStatus(teamNitrStatus);

        const updatedTeamData = { ...teamData, teammate1: registrationData };
        setTeamData(updatedTeamData);
        saveMunTeamData(updatedTeamData);
        saveMunStep("form-teammate2");
        setCurrentStep("form-teammate2");
      } else if (currentStep === "form-teammate2") {
        const updatedTeamData = { ...teamData, teammate2: registrationData };
        setTeamData(updatedTeamData);
        saveMunTeamData(updatedTeamData);

        setIsLoading(true);
        setError(null);

        // For Moot Court, all team members must have the same NITR status as the leader
        const isAllNitr = teamNitrStatus.leader;

        const result = await registerTeam("mun/register", {
          method: "POST",
          body: JSON.stringify({
            teamLeader: { ...updatedTeamData.leader, isNitrStudent: teamNitrStatus.leader },
            teammate1: { ...updatedTeamData.teammate1, isNitrStudent: teamNitrStatus.leader },
            teammate2: { ...updatedTeamData.teammate2, isNitrStudent: teamNitrStatus.leader },
          }),
        });

        setIsLoading(false);

        if (!result.success) {
          toast.error("Team registration failed", {
            description: result.error || "Failed to register team. Please try again.",
          });
          return;
        }

        // Capture teamId from response
        if (result.data?.teamId) {
          setTeamId(result.data.teamId);
          saveMunTeamId(result.data.teamId);
        }

        toast.success("Team registration successful!", {
          description: isAllNitr
            ? "Your team registration is complete. No payment required for NIT Rourkela students."
            : "Please proceed to payment to complete your team registration.",
        });

        setUserData({
          name: user?.displayName || "",
          email: user?.email || "",
          studentType: studentType as "SCHOOL" | "COLLEGE",
          committeeChoice,
        });

        if (isAllNitr) {
          clearMunStorage();
          setCurrentStep("complete");
        } else {
          saveMunStep("payment");
          setCurrentStep("payment");
        }
      }
    } else {
      saveMunIsTeamRegistration(false);
      saveMunNitrStatus(teamNitrStatus);

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

      if (!res.success) {
        toast.error("Registration failed", {
          description: res.error || "Failed to register. Please try again.",
        });
        return;
      }

      // Capture teamId from response (for solo registrations)
      if (res.data?.teamId) {
        setTeamId(res.data.teamId);
        saveMunTeamId(res.data.teamId);
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
        saveMunStep("payment");
        setCurrentStep("payment");
      }
    }
  };

  const handlePaymentSuccess = () => {
    clearMunStorage();
    setCurrentStep("complete");
  };

  const handlePaymentFailure = (errorMessage: string) => {
    setPaymentError(errorMessage);
  };

  const handleBackStep = () => {
    if (currentStep === "form-teammate2") {
      setCurrentStep("form-teammate1");
      saveMunStep("form-teammate1");
    } else if (currentStep === "form-teammate1") {
      setCurrentStep("form-leader");
      saveMunStep("form-leader");
    } else if (currentStep === "form" || currentStep === "form-leader") {
      // Go back to info step from form
      setCurrentStep("info");
    } else if (currentStep === "auth") {
      // Go back to info step from auth
      setCurrentStep("info");
    }
  };

  const handleProceedToRegister = () => {
    // Move from info step to auth step
    if (user) {
      setCurrentStep("form");
    } else {
      setCurrentStep("auth");
    }
  };

  const handleNitrStatusChange = (value: boolean) => {
    const updatedStatus = { ...teamNitrStatus, leader: value };
    setTeamNitrStatus(updatedStatus);
    saveMunNitrStatus(updatedStatus);
  };

  return {
    // State
    user,
    currentStep,
    userData,
    isLoading: authLoading || isLoading,
    error,
    paymentError,
    teamNitrStatus,
    teamData,
    teamId,
    // Handlers
    handleRegistrationComplete,
    handlePaymentSuccess,
    handlePaymentFailure,
    handleBackStep,
    handleProceedToRegister,
    handleNitrStatusChange,
    setError,
  };
}
