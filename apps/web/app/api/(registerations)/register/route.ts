import { NextRequest } from "next/server";
import { registerUser } from "@repo/database";
import { handleResponse, handleApiError, requireAuth } from "@repo/shared-utils/server";
import { type Registration } from "@repo/shared-types";
import { isBlockedInstitute } from "@repo/shared-types/src/schemas";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    const body = await request.json();
    const { isNitrStudent = false, wantsAccommodation = false, referralCode, ...formData } = body;
    const institute = body.institute;
    const university = body.university;

    // Validate blocked institutes
    if (isBlockedInstitute(institute)) {
      return handleApiError(
        new Error(
          "Students from this institute have been officially barred from participating in NITRUTSAV'26"
        ),
        "Registration failed"
      );
    }
    if (isBlockedInstitute(university)) {
      return handleApiError(
        new Error(
          "Students from this university have been officially barred from participating in NITRUTSAV'26"
        ),
        "Registration failed"
      );
    }

    const result = await registerUser(
      formData as Registration,
      auth.uid,
      isNitrStudent,
      wantsAccommodation,
      referralCode // Pass referral code for validation
    );
    return handleResponse(result, 201);
  } catch (error) {
    return handleApiError(error, "Registration failed");
  }
}
