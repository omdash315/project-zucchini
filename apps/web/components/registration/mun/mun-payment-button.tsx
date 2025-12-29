"use client";

import { useState } from "react";
import Script from "next/script";
import { Loader2 } from "lucide-react";
import { useApi } from "@repo/shared-utils";
import { munAmount } from "@/config";

interface MunPaymentButtonProps {
  userName: string;
  userEmail: string;
  studentType: "SCHOOL" | "COLLEGE";
  committeeChoice: string;
  onPaymentSuccess?: () => void;
  onPaymentFailure?: (error: string) => void;
  nonNitrCount?: number;
}

export default function MunPaymentButton({
  userName,
  userEmail,
  studentType,
  committeeChoice,
  onPaymentSuccess,
  onPaymentFailure,
  nonNitrCount,
}: MunPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const initiateOrderApi = useApi<{ orderId: string; amount: number }>();
  const verifyOrderApi = useApi();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const orderResult = await initiateOrderApi.execute("mun/initiate-order", {
        method: "POST",
        body: JSON.stringify({ studentType, committeeChoice }),
      });

      if (!orderResult.success) {
        onPaymentFailure?.(orderResult.error || "Failed to initiate payment");
        setIsLoading(false);
        return;
      }

      const { orderId, amount: orderAmount } = orderResult.data!;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderAmount * 100,
        currency: "INR",
        name: "NITRUTSAV 2026 - MUN",
        description: `MUN Registration - ${committeeChoice === "MOOT_COURT" ? "MOOT Court (3 per team: 2 speakers + 1 researcher)" : "Overnight Crisis"}`,
        order_id: orderId,
        handler: async function (response: any) {
          const verifyResult = await verifyOrderApi.execute("mun/verify-order", {
            method: "POST",
            body: JSON.stringify({
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: orderAmount,
            }),
          });

          if (verifyResult.success) {
            onPaymentSuccess?.();
          } else {
            onPaymentFailure?.(verifyResult.error || "Payment verification failed");
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        onPaymentFailure?.("Payment failed. Please try again.");
        console.error(response.error);
      });
      razorpay.open();
    } catch (error) {
      onPaymentFailure?.("Failed to initiate payment. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const baseFee = studentType === "COLLEGE" ? munAmount.college : munAmount.school;
  const memberCount = committeeChoice === "MOOT_COURT" ? (nonNitrCount ?? 3) : 1;
  const displayAmount = baseFee * memberCount;

  return (
    <>
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Registration Fee</h4>
          <p className="text-2xl font-bold text-blue-600">₹{displayAmount}</p>
          <p className="text-sm text-blue-700 mt-1">
            {studentType === "COLLEGE" ? "College Student" : "School Student"}
            {committeeChoice === "MOOT_COURT" &&
              ` - ${memberCount} ${memberCount === 1 ? "member" : "members"} paying`}
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={isLoading || initiateOrderApi.loading}
          className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading || initiateOrderApi.loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ₹${displayAmount}`
          )}
        </button>
      </div>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
