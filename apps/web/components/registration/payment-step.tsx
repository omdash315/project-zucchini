import { UserData } from "@/app/(public)/register/page";
import RegistrationPaymentButton from "@/components/registration/registration-payment-button";
import { NITRUTSAV_FEES } from "@/config";

interface PaymentStepProps {
  userData: UserData;
  paymentError: string | null;
  onPaymentFailure: (errorMessage: string) => void;
}

export function PaymentStep({ userData, paymentError, onPaymentFailure }: PaymentStepProps) {
  const amount = userData.wantsAccommodation
    ? NITRUTSAV_FEES.withAccomodation
    : NITRUTSAV_FEES.withoutAccomodation;

  return (
    <div className="py-6 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-white font-baloo mb-2">
          Initial Registration Successful
        </h2>
        <p className="text-white font-inria mb-4">
          Complete your payment to confirm your registration
        </p>
        <div className="inline-block bg-white/20 rounded-lg px-4 py-2 mb-2">
          <p className="text-sm text-white/80">
            {userData.wantsAccommodation ? "With Accommodation" : "Without Accommodation"}
          </p>
          <p className="text-2xl font-bold text-white">₹{amount}</p>
        </div>
      </div>

      {paymentError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {paymentError}
        </div>
      )}

      <div className="max-w-md mx-auto">
        <RegistrationPaymentButton
          userName={userData.name}
          userEmail={userData.email}
          wantsAccommodation={userData.wantsAccommodation}
          onPaymentFailure={onPaymentFailure}
        />
      </div>
    </div>
  );
}
