import type { MunRegistration } from "@repo/shared-types";

export type RegistrationStep =
  | "info"
  | "auth"
  | "form"
  | "form-leader"
  | "form-teammate1"
  | "form-teammate2"
  | "payment"
  | "complete";

export interface TeamData {
  leader: MunRegistration | null;
  teammate1: MunRegistration | null;
  teammate2: MunRegistration | null;
}

export interface TeamNitrStatus {
  leader: boolean;
  teammate1: boolean;
  teammate2: boolean;
}

const STORAGE_KEYS = {
  TEAM_DATA: "munTeamRegistration",
  CURRENT_STEP: "munCurrentStep",
  IS_TEAM_REGISTRATION: "munIsTeamRegistration",
  NITR_STATUS: "munTeamNitrStatus",
  IS_NITR_STUDENT: "munIsNitrStudent",
  TEAM_ID: "munTeamId",
} as const;

/**
 * Save team registration data to localStorage
 */
export function saveMunTeamData(teamData: TeamData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEAM_DATA, JSON.stringify(teamData));
  } catch (error) {
    console.error("Failed to save MUN team data:", error);
  }
}

/**
 * Load team registration data from localStorage
 */
export function loadMunTeamData(): TeamData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM_DATA);
    if (!saved) return null;
    return JSON.parse(saved) as TeamData;
  } catch (error) {
    console.error("Failed to load MUN team data:", error);
    localStorage.removeItem(STORAGE_KEYS.TEAM_DATA);
    return null;
  }
}

/**
 * Save current registration step to localStorage
 */
export function saveMunStep(step: RegistrationStep): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, step);
  } catch (error) {
    console.error("Failed to save MUN step:", error);
  }
}

/**
 * Load current registration step from localStorage
 */
export function loadMunStep(): RegistrationStep | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP);
    return saved as RegistrationStep | null;
  } catch (error) {
    console.error("Failed to load MUN step:", error);
    return null;
  }
}

/**
 * Save NITR status for team members to localStorage
 */
export function saveMunNitrStatus(status: TeamNitrStatus): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NITR_STATUS, JSON.stringify(status));
  } catch (error) {
    console.error("Failed to save MUN NITR status:", error);
  }
}

/**
 * Load NITR status for team members from localStorage
 */
export function loadMunNitrStatus(): TeamNitrStatus | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NITR_STATUS);
    if (!saved) return null;
    return JSON.parse(saved) as TeamNitrStatus;
  } catch (error) {
    console.error("Failed to load MUN NITR status:", error);
    localStorage.removeItem(STORAGE_KEYS.NITR_STATUS);
    return null;
  }
}

/**
 * Save team registration flag to localStorage
 */
export function saveMunIsTeamRegistration(isTeam: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.IS_TEAM_REGISTRATION, String(isTeam));
  } catch (error) {
    console.error("Failed to save MUN team registration flag:", error);
  }
}

/**
 * Save team ID to localStorage
 */
export function saveMunTeamId(teamId: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEAM_ID, teamId);
  } catch (error) {
    console.error("Failed to save MUN team ID:", error);
  }
}

/**
 * Load team ID from localStorage
 */
export function loadMunTeamId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.TEAM_ID);
  } catch (error) {
    console.error("Failed to load MUN team ID:", error);
    return null;
  }
}

/**
 * Clear all MUN registration data from localStorage
 */
export function clearMunStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.TEAM_DATA);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP);
    localStorage.removeItem(STORAGE_KEYS.IS_TEAM_REGISTRATION);
    localStorage.removeItem(STORAGE_KEYS.IS_NITR_STUDENT);
    localStorage.removeItem(STORAGE_KEYS.NITR_STATUS);
    localStorage.removeItem(STORAGE_KEYS.TEAM_ID);
  } catch (error) {
    console.error("Failed to clear MUN storage:", error);
  }
}
