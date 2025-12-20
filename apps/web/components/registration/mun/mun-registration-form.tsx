"use client";

import { type User } from "@repo/firebase-config";
import { MunRegistrationSchema, type MunRegistration } from "@repo/shared-types";
import { useApi } from "@repo/shared-utils";
import CloudinaryUploader from "../../cloudinary-uploader";
import { FormSection, InputField } from "../../ui";
import {
  basicInfoFields,
  collegeInfoFields,
  munDetailsFields,
  emergencyFields,
} from "../../../config/register/mun";
import { useFormState, renderFormFields, SubmitButton, ErrorDisplay } from "../../../utils/form";

interface MunRegistrationFormProps {
  user: User;
  onComplete: (
    studentType: string,
    committeeChoice: string,
    registrationData: MunRegistration
  ) => void;
  stepTitle?: string; // Optional title for multi-step flow
  initialData?: Partial<MunRegistration>; // Prefilled data for teammates
  hideCommitteeChoice?: boolean; // Hide committee choice for teammates
  buttonText?: string; // Dynamic button text
  clearUserDetails?: boolean; // Don't prefill name/email for teammates
}

export default function MunRegistrationForm({
  user,
  onComplete,
  stepTitle,
  initialData,
  hideCommitteeChoice = false,
  buttonText = "Continue to Payment",
  clearUserDetails = false,
}: MunRegistrationFormProps) {
  // Convert ISO date strings to Date objects for Zod validation
  const processedInitialData = initialData
    ? {
        ...initialData,
        dateOfBirth:
          initialData.dateOfBirth &&
          typeof initialData.dateOfBirth === "string" &&
          initialData.dateOfBirth.includes("T")
            ? new Date(initialData.dateOfBirth)
            : initialData.dateOfBirth,
      }
    : {};

  const { formData, errors, handleInputChange, validateForm, setErrors } =
    useFormState<MunRegistration>(
      {
        email: clearUserDetails ? "" : processedInitialData?.email || user.email || "",
        name: clearUserDetails ? "" : processedInitialData?.name || user.displayName || "",
        gender: processedInitialData?.gender || undefined,
        studentType: processedInitialData?.studentType || undefined,
        committeeChoice: processedInitialData?.committeeChoice || undefined,
        hasParticipatedBefore: processedInitialData?.hasParticipatedBefore || false,
        agreedToTerms: undefined as any,
        ...processedInitialData, // Spread any additional prefilled data
      },
      MunRegistrationSchema
    );

  const { loading: isSubmitting, error: submitError, execute: registerApi } = useApi({});

  const handleFieldChange = (field: keyof MunRegistration, value: any) => {
    handleInputChange(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert dateOfBirth string to Date object for Zod validation
    const registrationData = {
      ...formData,
      dateOfBirth:
        typeof formData.dateOfBirth === "string"
          ? new Date(formData.dateOfBirth)
          : formData.dateOfBirth,
    } as MunRegistration;

    // Call onComplete to pass data to parent (parent handles API call for team registration)
    onComplete(formData.studentType!, formData.committeeChoice!, registrationData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderFormFields(basicInfoFields, formData, errors, handleFieldChange)}
        </div>
      </FormSection>

      {/* College/Institute Details */}
      <FormSection title="College / Institute Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderFormFields(collegeInfoFields, formData, errors, handleFieldChange)}

          {/* ID Card Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              College/University ID Card <span className="text-red-500">*</span>
            </label>
            <CloudinaryUploader
              maxFiles={1}
              value={formData.idCard}
              onUploadComplete={(url) => handleFieldChange("idCard", url)}
            />
            {errors.idCard && <p className="mt-1 text-sm text-red-600">{errors.idCard}</p>}
          </div>
        </div>
      </FormSection>

      {/* MUN Details - Only show for team leader or individual registration */}
      {!hideCommitteeChoice && (
        <FormSection title="MUN Details">
          <div className="space-y-6">
            {munDetailsFields.map((field) => (
              <div key={field.name}>
                {renderFormFields([field], formData, errors, handleFieldChange)}
                {formData.studentType === "SCHOOL" && (
                  <p className="mt-1 text-sm text-amber-600">
                    Note: School students are not eligible for Overnight Crisis Committees
                  </p>
                )}
                {formData.committeeChoice === "MOOT_COURT" && (
                  <p className="mt-1 text-sm text-blue-600">
                    Note: For MOOT Court, you will register as team leader and provide details of 2
                    teammates
                  </p>
                )}
              </div>
            ))}

            {/* Previous Participation */}
            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasParticipatedBefore || false}
                  onChange={(e) => handleFieldChange("hasParticipatedBefore", e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I have participated in NITRUTSAV before
                </span>
              </label>
            </div>
          </div>
        </FormSection>
      )}

      {/* Emergency & Safety Details */}
      <FormSection title="Emergency & Safety Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderFormFields(emergencyFields, formData, errors, handleFieldChange)}
        </div>
      </FormSection>

      {/* Declaration & Consent */}
      <FormSection title="Declaration & Consent">
        <div className="space-y-3">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreedToTerms === true}
              onChange={(e) => handleFieldChange("agreedToTerms", e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded mt-1"
            />
            <span className="ml-2 text-sm text-gray-700">
              I confirm that the information provided is correct and I agree to follow NITRUTSAV
              rules & code of conduct <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreedToTerms}</p>
          )}
        </div>
      </FormSection>

      <ErrorDisplay error={submitError} />
      <SubmitButton
        isSubmitting={false}
        loadingText="Registering..."
        submitText={
          formData.committeeChoice === "MOOT_COURT" && !hideCommitteeChoice
            ? "Enter Teammate 1 Details"
            : buttonText
        }
      />
    </form>
  );
}
