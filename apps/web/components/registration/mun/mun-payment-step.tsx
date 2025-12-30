import RegistrationPaymentButton from "../registration-payment-button";
import { MUN_FEE } from "@/config";

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
  const isCollegeStudent = userData.studentType === "COLLEGE";
  const isMootCourt = userData.committeeChoice === "MOOT_COURT";
  const basePrice = isCollegeStudent ? MUN_FEE.college : MUN_FEE.school;
  const price = isMootCourt ? basePrice * 3 : basePrice;

  return (
    <div className="space-y-6 flex items-center justify-center flex-col">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Payment</h2>
        <p className="text-white/80">Complete your MUN registration payment</p>
      </div>

      {/* Price Display */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
        <div className="flex items-center gap-3 text-white font-inria">
          <span>
            Registration Fee
            {isMootCourt && <span className="text-white/70 text-sm ml-1">(× 3 team members)</span>}
          </span>
          <span className="text-xl font-semibold">₹{price.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {paymentError && (
        <div className="p-3 bg-red-500/20 border-2 border-red-400 rounded-[13px] text-red-200 text-sm backdrop-blur-[9.25px]">
          {paymentError}
        </div>
      )}

      <RegistrationPaymentButton
        userName={userData.name}
        userEmail={userData.email}
        onPaymentFailure={onPaymentFailure}
        isCollegeStudent={isCollegeStudent}
        committeeChoice={userData.committeeChoice}
        type="MUN"
        teamId={teamId || ""}
      />
    </div>
  );
}
