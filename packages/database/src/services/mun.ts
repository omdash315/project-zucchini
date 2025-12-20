import { db } from "../index";
import { munRegistrationsTable, munTransactionsTable, usersTable } from "../schema";
import { eq } from "drizzle-orm";
import { MunRegistrationSchema, validateAndThrow, type MunRegistration } from "@repo/shared-types";
import { getUserByFirebaseUid } from "./user";
import { munAmount } from "../../../../apps/web/config";

export const getMunUserByFirebaseUid = async (firebaseUid: string) => {
  const [result] = await db
    .select({
      registration: munRegistrationsTable,
      transaction: munTransactionsTable,
    })
    .from(munRegistrationsTable)
    .leftJoin(munTransactionsTable, eq(munRegistrationsTable.teamId, munTransactionsTable.teamId))
    .where(eq(munRegistrationsTable.firebaseUid, firebaseUid))
    .limit(1);

  if (!result) return null;

  return {
    ...result.registration,
    isPaymentVerified: result.transaction?.isVerified || false,
  };
};

// Check if email is already registered
const checkEmailRegistration = async (email: string): Promise<boolean> => {
  // Check MUN registrations
  const [munReg] = await db
    .select()
    .from(munRegistrationsTable)
    .where(eq(munRegistrationsTable.email, email))
    .limit(1);

  if (munReg) return true;

  // Check NITRUTSAV registrations
  const [nitrutsavReg] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return !!nitrutsavReg;
};

export const registerMunUser = async (userData: MunRegistration, firebaseUid: string) => {
  validateAndThrow(MunRegistrationSchema, userData, "MUN registration");

  if (await checkEmailRegistration(userData.email)) {
    throw new Error(`${userData.email} is already registered`);
  }

  const teamId = crypto.randomUUID();

  const [newRegistration] = await db
    .insert(munRegistrationsTable)
    .values({
      firebaseUid,
      teamId,
      isTeamLeader: false,
      ...userData,
    })
    .returning();

  if (!newRegistration) {
    throw new Error("Failed to create MUN registration");
  }

  return { userId: newRegistration.id, teamId };
};

export const registerMunTeam = async (
  teamLeader: MunRegistration,
  teammate1: MunRegistration,
  teammate2: MunRegistration,
  leaderFirebaseUid: string,
  teammate1FirebaseUid: string | null,
  teammate2FirebaseUid: string | null
) => {
  const emails = [teamLeader.email, teammate1.email, teammate2.email];
  for (const email of emails) {
    if (await checkEmailRegistration(email)) {
      throw new Error(`${email} is already registered`);
    }
  }

  const teamId = crypto.randomUUID();

  const registrations = await db
    .insert(munRegistrationsTable)
    .values([
      {
        firebaseUid: leaderFirebaseUid,
        teamId,
        isTeamLeader: true,
        ...teamLeader,
      },
      {
        firebaseUid: teammate1FirebaseUid,
        teamId,
        isTeamLeader: false,
        ...teammate1,
      },
      {
        firebaseUid: teammate2FirebaseUid,
        teamId,
        isTeamLeader: false,
        ...teammate2,
      },
    ])
    .returning();

  if (registrations.length !== 3) {
    throw new Error("Failed to create team registrations");
  }

  return {
    teamId,
    teamLeaderId: registrations[0]!.id,
    teammate1Id: registrations[1]!.id,
    teammate2Id: registrations[2]!.id,
  };
};

export const getTeamMembers = async (teamId: string) => {
  const members = await db
    .select()
    .from(munRegistrationsTable)
    .where(eq(munRegistrationsTable.teamId, teamId));

  return members;
};

export const updateTeammateFirebaseUid = async (email: string, firebaseUid: string) => {
  const [updated] = await db
    .update(munRegistrationsTable)
    .set({ firebaseUid })
    .where(eq(munRegistrationsTable.email, email))
    .returning();

  return updated;
};

export const getMunRegistrationFee = (
  studentType: "SCHOOL" | "COLLEGE",
  committeeChoice: string
): number => {
  const baseFee = studentType === "COLLEGE" ? munAmount.college : munAmount.school;
  return committeeChoice === "MOOT_COURT" ? baseFee * 3 : baseFee;
};

export const checkCrossRegistration = async (firebaseUid: string) => {
  const munUser = await getMunUserByFirebaseUid(firebaseUid);
  if (munUser) {
    return {
      isMunRegistered: true,
      isNitrutsavRegistered: true, // MUN = NITRUTSAV
      registrationType: "MUN" as const,
      userId: munUser.id,
      name: munUser.name,
      email: munUser.email,
      isPaymentVerified: munUser.isPaymentVerified,
    };
  }

  // Check NITRUTSAV registration
  const nitrutsavUser = await getUserByFirebaseUid(firebaseUid);
  if (nitrutsavUser) {
    return {
      isMunRegistered: false,
      isNitrutsavRegistered: true,
      registrationType: "NITRUTSAV" as const,
      userId: nitrutsavUser.id,
      name: nitrutsavUser.name,
      email: nitrutsavUser.email,
      isPaymentVerified: nitrutsavUser.isPaymentVerified,
    };
  }

  return {
    isMunRegistered: false,
    isNitrutsavRegistered: false,
    registrationType: null,
    userId: null,
    name: null,
    email: null,
    isPaymentVerified: false,
  };
};
