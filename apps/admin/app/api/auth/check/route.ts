import { NextRequest } from "next/server";
import { handleResponse, handleApiError, requireAuth } from "@repo/shared-utils/server";
import { getAdminByUid } from "@repo/database";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);

    if (!auth.uid) {
      return handleApiError(new Error("Firebase UID not found in token"), "Invalid token");
    }

    const admin = await getAdminByUid(auth.uid);

    return handleResponse({
      isRegistered: !!admin,
      isVerified: admin?.isVerified || false,
    });
  } catch (error) {
    return handleApiError(error, "Check failed");
  }
}
