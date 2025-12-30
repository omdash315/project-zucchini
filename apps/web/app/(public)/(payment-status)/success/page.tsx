"use client";
import { LoadingState } from "@/components/registration";
import { useApi } from "@repo/shared-utils";
import { toast } from "sonner";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, X, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TransactionDetails {
  isVerified: boolean;
  txnid: string;
  mihpayid: string;
  amt: string;
  bank_ref_num?: string;
}

function SuccessContent() {
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failure" | "pending">("pending");
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const [fromMUN, setFromMUN] = useState(false);
  const { execute, loading: isLoading } = useApi({
    onError(error) {
      toast.error(error || "Failed to verify payment!");
    },
  });

  useEffect(() => {
    const verifyPayment = async () => {
      if (user) {
        const txnid = searchParams.get("txnid");
        if (!txnid) {
          toast.error("Transaction ID not found!");
          setPaymentStatus("failure");
          return;
        }
        setFromMUN(txnid?.includes("MUN"));

        const res = await execute(`verify?txnid=${txnid}`, {
          method: "GET",
        });

        if (!res.success) {
          toast.error("Failed to verify payment!");
          setPaymentStatus("failure");
        } else if (res.data?.isVerified) {
          setTransactionDetails(res.data as TransactionDetails);
          setPaymentStatus("success");
          toast.success("Payment verified successfully!");
        } else {
          setPaymentStatus("failure");
          toast.error("Payment verification failed");
        }
      }
    };

    verifyPayment();
  }, [user, searchParams]);

  if (authLoading || isLoading || paymentStatus === "pending") return <LoadingState />;

  return (
    <div className="min-h-screen reg-bg-image flex items-center justify-center p-4">
      <div className="form-container mt-20 p-8 max-w-md w-full text-center">
        {paymentStatus === "success" ? (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/20 backdrop-blur-sm">
              <Check className="w-10 h-10 text-green-400" strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 font-baloo">Payment Successful!</h1>
            <p className="text-white/90 mb-6 text-lg">
              Your payment has been verified successfully.
            </p>
            {transactionDetails && (
              <div className="text-left bg-white/10 backdrop-blur-sm rounded-lg p-5 mt-6 space-y-2 font-inria">
                <p className="text-white/90 text-sm">
                  <strong className="text-white">Transaction ID:</strong> {transactionDetails.txnid}
                </p>
                <p className="text-white/90 text-sm">
                  <strong className="text-white">PayU ID:</strong> {transactionDetails.mihpayid}
                </p>
                <p className="text-white/90 text-sm">
                  <strong className="text-white">Amount:</strong> ₹{transactionDetails.amt}
                </p>
                {transactionDetails.bank_ref_num && (
                  <p className="text-white/90 text-sm">
                    <strong className="text-white">Bank Ref:</strong>{" "}
                    {transactionDetails.bank_ref_num}
                  </p>
                )}
              </div>
            )}
            <Link
              href={fromMUN ? "/register/mun" : "/register"}
              className="gradient-border-btn w-full mt-6 py-3 px-6 text-white font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2 font-inria"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Link>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/20 backdrop-blur-sm">
              <X className="w-10 h-10 text-red-400" strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 font-baloo">
              Payment Verification Failed
            </h1>
            <p className="text-white/90 mb-6 text-lg">
              Unable to verify your payment. Please contact support if amount was deducted.
            </p>
            <Link
              href={fromMUN ? "/register/mun" : "/register"}
              className="gradient-border-btn w-full mt-6 py-3 px-6 text-white font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2 font-inria"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SuccessContent />
    </Suspense>
  );
}
