import { NextRequest } from "next/server";
import { registerMunUser, registerMunTeam } from "@repo/database";
import { handleResponse, handleApiError, requireAuth } from "@repo/shared-utils/server";
import { type MunRegistration, type TeamMunRegistration } from "@repo/shared-types";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    const body = await request.json();

    if (body.teamLeader && body.teammate1 && body.teammate2) {
      const teamData = body as TeamMunRegistration;

      if (teamData.teamLeader.dateOfBirth && typeof teamData.teamLeader.dateOfBirth === "string") {
        teamData.teamLeader.dateOfBirth = new Date(teamData.teamLeader.dateOfBirth);
      }
      if (teamData.teammate1.dateOfBirth && typeof teamData.teammate1.dateOfBirth === "string") {
        teamData.teammate1.dateOfBirth = new Date(teamData.teammate1.dateOfBirth);
      }
      if (teamData.teammate2.dateOfBirth && typeof teamData.teammate2.dateOfBirth === "string") {
        teamData.teammate2.dateOfBirth = new Date(teamData.teammate2.dateOfBirth);
      }

      const result = await registerMunTeam(
        teamData.teamLeader,
        teamData.teammate1,
        teamData.teammate2,
        auth.uid,
        null,
        null
      );

      return handleResponse(result, 201);
    } else {
      const individualData = body as MunRegistration;

      if (individualData.dateOfBirth && typeof individualData.dateOfBirth === "string") {
        individualData.dateOfBirth = new Date(individualData.dateOfBirth);
      }

      const result = await registerMunUser(individualData, auth.uid);
      return handleResponse(result, 201);
    }
  } catch (error) {
    return handleApiError(error, "MUN registration failed");
  }
}
