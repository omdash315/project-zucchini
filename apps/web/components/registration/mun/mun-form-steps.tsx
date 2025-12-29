import type { User } from "@repo/firebase-config";
import type { MunRegistration } from "@repo/shared-types";
import MunRegistrationForm from "./mun-registration-form";
import type { TeamData, TeamNitrStatus } from "@/lib/mun-storage";

interface LeaderFormStepProps {
  user: User;
  teamData: TeamData;
  teamNitrStatus: TeamNitrStatus;
  isTeamRegistration: boolean;
  onComplete: (
    studentType: string,
    committeeChoice: string,
    registrationData: MunRegistration
  ) => void;
  onNitrStatusChange: (value: boolean) => void;
}

export function LeaderFormStep({
  user,
  teamData,
  teamNitrStatus,
  isTeamRegistration,
  onComplete,
  onNitrStatusChange,
}: LeaderFormStepProps) {
  return (
    <div>
      {isTeamRegistration && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Leader Registration</h2>
          <p className="text-gray-600">Step 1 of 3: Enter your details as the team leader</p>
        </div>
      )}
      <MunRegistrationForm
        user={user}
        stepTitle={isTeamRegistration ? "Team Leader" : undefined}
        initialData={teamData.leader || undefined}
        buttonText={isTeamRegistration ? "Enter Teammate 1 Details" : "Continue to Payment"}
        onComplete={onComplete}
        isNitrStudent={teamNitrStatus.leader}
        setIsNitrStudent={onNitrStatusChange}
      />
    </div>
  );
}

interface Teammate1FormStepProps {
  user: User;
  teamData: TeamData;
  teamNitrStatus: TeamNitrStatus;
  onComplete: (
    studentType: string,
    committeeChoice: string,
    registrationData: MunRegistration
  ) => void;
  onBack: () => void;
}

export function Teammate1FormStep({
  user,
  teamData,
  teamNitrStatus,
  onComplete,
  onBack,
}: Teammate1FormStepProps) {
  if (!teamData.leader) return null;

  return (
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
        onComplete={onComplete}
        isNitrStudent={teamNitrStatus.leader}
        setIsNitrStudent={() => {}}
        lockNitrStatus={true}
        onBack={onBack}
        hideStudentType={true}
      />
    </div>
  );
}

interface Teammate2FormStepProps {
  user: User;
  teamData: TeamData;
  teamNitrStatus: TeamNitrStatus;
  onComplete: (
    studentType: string,
    committeeChoice: string,
    registrationData: MunRegistration
  ) => void;
  onBack: () => void;
}

export function Teammate2FormStep({
  user,
  teamData,
  teamNitrStatus,
  onComplete,
  onBack,
}: Teammate2FormStepProps) {
  if (!teamData.leader) return null;

  return (
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
        onComplete={onComplete}
        isNitrStudent={teamNitrStatus.leader}
        setIsNitrStudent={() => {}}
        lockNitrStatus={true}
        onBack={onBack}
        hideStudentType={true}
      />
    </div>
  );
}
