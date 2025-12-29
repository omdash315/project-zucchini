import { notAllowedInstitutes } from "@repo/shared-types/src/schemas";
import type { MunRegistration } from "@repo/shared-types";

/**
 * Custom hook for MUN form validation logic
 */
export function useMunFormValidation(
  isNitrStudent: boolean,
  lockNitrStatus: boolean,
  setErrors: (errors: any) => void
) {
  /**
   * Check if text contains banned institute keywords
   */
  const containsBannedKeyword = (text: string): boolean => {
    const normalizedText = text
      .toLowerCase()
      .replace(/['\"`\-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return notAllowedInstitutes.some((keyword) => normalizedText.includes(keyword));
  };

  /**
   * Check if text contains NIT Rourkela references
   */
  const containsNitrReference = (text: string): boolean => {
    const normalizedValue = text.toLowerCase();
    return (
      normalizedValue.includes("nit rourkela") ||
      normalizedValue.includes("national institute of technology rourkela") ||
      normalizedValue.includes("nitr")
    );
  };

  /**
   * Validate institute field - prevents non-NITR teammates from selecting NITR
   */
  const validateInstituteField = (value: string): boolean => {
    if (lockNitrStatus && !isNitrStudent && containsNitrReference(value)) {
      setErrors((prev: any) => ({
        ...prev,
        institute:
          "Since the team leader is not from NIT Rourkela, teammates cannot be from NIT Rourkela",
      }));
      return false;
    }
    return true;
  };

  /**
   * Validate institute on blur - checks for banned institutes and NITR restrictions
   */
  const validateInstituteOnBlur = (institute: string | undefined): void => {
    if (!institute) return;

    // Check for banned institutes
    if (containsBannedKeyword(institute)) {
      setErrors((prev: any) => ({
        ...prev,
        institute:
          "Students from this institute/university have been officially barred from participating in NITRUTSAV'26",
      }));
      return;
    }

    // Check for NITR when lockNitrStatus is true and isNitrStudent is false
    if (lockNitrStatus && !isNitrStudent && containsNitrReference(institute)) {
      setErrors((prev: any) => ({
        ...prev,
        institute:
          "Since the team leader is not from NIT Rourkela, teammates cannot be from NIT Rourkela",
      }));
    }
  };

  /**
   * Validate university on blur - checks for banned institutes
   */
  const validateUniversityOnBlur = (university: string | undefined): void => {
    if (!university) return;

    if (containsBannedKeyword(university)) {
      setErrors((prev: any) => ({
        ...prev,
        university:
          "Students from this institute/university have been officially barred from participating in NITRUTSAV'26",
      }));
    }
  };

  /**
   * Get submit button text based on form state
   */
  const getSubmitButtonText = (
    committeeChoice: string | undefined,
    hideCommitteeChoice: boolean,
    buttonText: string
  ): string => {
    if (committeeChoice === "MOOT_COURT" && !hideCommitteeChoice) {
      return "Enter Teammate 1 Details";
    }

    if (buttonText === "Continue to Payment" && isNitrStudent) {
      return "Register";
    }

    return buttonText;
  };

  return {
    containsBannedKeyword,
    containsNitrReference,
    validateInstituteField,
    validateInstituteOnBlur,
    validateUniversityOnBlur,
    getSubmitButtonText,
  };
}
