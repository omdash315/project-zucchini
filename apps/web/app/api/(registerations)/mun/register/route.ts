import { NextRequest } from "next/server";
import { registerMunUser, registerMunTeam } from "@repo/database";
import { handleResponse, handleApiError, requireAuth } from "@repo/shared-utils/server";
import { type MunRegistration, type TeamMunRegistration } from "@repo/shared-types";

function normalizeDateOfBirth(data: MunRegistration): void {
  if (data.dateOfBirth && typeof data.dateOfBirth === "string") {
    data.dateOfBirth = new Date(data.dateOfBirth);
  }
}

function validateSchoolStudentCommittee(
  studentType: string,
  committeeChoice: string
): { valid: boolean; error?: string } {
  const restrictedCommittees = ["MOOT_COURT", "UNSC_OVERNIGHT_CRISIS", "AIPPM_OVERNIGHT_CRISIS"];

  if (studentType === "SCHOOL" && restrictedCommittees.includes(committeeChoice)) {
    return {
      valid: false,
      error:
        "School students can only participate in UNHRC, DISEC, AIPPM, ECOSOC, and IP committees",
    };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    const body = await request.json();

    if (body.teamLeader && body.teammate1 && body.teammate2) {
      const teamData = body as TeamMunRegistration;

      // Validate school student committee restrictions for all team members
      const leaderValidation = validateSchoolStudentCommittee(
        teamData.teamLeader.studentType,
        teamData.teamLeader.committeeChoice
      );
      if (!leaderValidation.valid) {
        return handleApiError(
          new Error(leaderValidation.error!),
          "Invalid committee choice for school student"
        );
      }

      const teammate1Validation = validateSchoolStudentCommittee(
        teamData.teammate1.studentType,
        teamData.teamLeader.committeeChoice
      );
      if (!teammate1Validation.valid) {
        return handleApiError(
          new Error(teammate1Validation.error!),
          "Invalid committee choice for school student"
        );
      }

      const teammate2Validation = validateSchoolStudentCommittee(
        teamData.teammate2.studentType,
        teamData.teamLeader.committeeChoice
      );
      if (!teammate2Validation.valid) {
        return handleApiError(
          new Error(teammate2Validation.error!),
          "Invalid committee choice for school student"
        );
      }

      const leaderIsNitr = (body.teamLeader as any).isNitrStudent || false;
      const teammate1IsNitr = (body.teammate1 as any).isNitrStudent || false;
      const teammate2IsNitr = (body.teammate2 as any).isNitrStudent || false;

      // Validate Moot Court team homogeneity: all members must have same NITR status as leader
      if (teammate1IsNitr !== leaderIsNitr || teammate2IsNitr !== leaderIsNitr) {
        return handleApiError(
          new Error(
            "For Moot Court, all team members must have the same NITR status as the team leader. " +
              (leaderIsNitr
                ? "All teammates must be from NIT Rourkela."
                : "No teammates can be from NIT Rourkela.")
          ),
          "Invalid team composition"
        );
      }

      normalizeDateOfBirth(teamData.teamLeader);
      normalizeDateOfBirth(teamData.teammate1);
      normalizeDateOfBirth(teamData.teammate2);

      const result = await registerMunTeam(
        teamData.teamLeader,
        teamData.teammate1,
        teamData.teammate2,
        auth.uid,
        null,
        null,
        leaderIsNitr,
        teammate1IsNitr,
        teammate2IsNitr
      );

      return handleResponse(result, 201);
    } else {
      const individualData = body as MunRegistration;
      const { isNitrStudent = false } = body;

      // Validate school student committee restrictions
      const validation = validateSchoolStudentCommittee(
        individualData.studentType,
        individualData.committeeChoice
      );
      if (!validation.valid) {
        return handleApiError(
          new Error(validation.error!),
          "Invalid committee choice for school student"
        );
      }

      normalizeDateOfBirth(individualData);

      const result = await registerMunUser(individualData, auth.uid, isNitrStudent);
      return handleResponse(result, 201);
    }
  } catch (error) {
    return handleApiError(error, "MUN registration failed");
  }
}
