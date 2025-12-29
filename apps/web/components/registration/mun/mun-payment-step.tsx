import RegistrationPaymentButton from "../registration-payment-button";

interface UserData {
  name: string;
  email: string;
  studentType?: "SCHOOL" | "COLLEGE";
  committeeChoice?: string;
}

interface MunPaymentStepProps {
  userData: UserData;
  paymentError: string | null;
  onPaymentFailure: (errorMessage: string) => void;
  teamId: string | null;
}

export function MunPaymentStep({
  userData,
  paymentError,
  onPaymentFailure,
  teamId,
}: MunPaymentStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-600">Complete your MUN registration payment</p>
      </div>

      {paymentError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {paymentError}
        </div>
      )}

      {/* <MunPaymentButton
        userName={userData.name}
        userEmail={userData.email}
        studentType={userData.studentType || "COLLEGE"}
        committeeChoice={userData.committeeChoice || "UNHRC"}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentFailure={onPaymentFailure}
        nonNitrCount={
          userData.committeeChoice === "MOOT_COURT"
            ? teamNitrStatus.leader
              ? 0 // All NITR team - no payment needed
              : 3 // All non-NITR team - 3 members pay
            : teamNitrStatus.leader
              ? 0
              : 1
        }
      /> */}

      <RegistrationPaymentButton
        userName={userData.name}
        userEmail={userData.email}
        onPaymentFailure={onPaymentFailure}
        isCollegeStudent={userData.studentType === "COLLEGE"}
        committeeChoice={userData.committeeChoice}
        type="MUN"
        teamId={teamId || ""}
      />
    </div>
  );
}
