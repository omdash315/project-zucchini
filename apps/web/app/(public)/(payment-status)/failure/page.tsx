"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { X, Home } from "lucide-react";
import Link from "next/link";

export default function Failure() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const txnid = searchParams.get("txnid");
  const status = searchParams.get("status");
  const reason = searchParams.get("reason");
  const error = searchParams.get("error");

  const getErrorMessage = () => {
    if (error === "config") return "Payment system configuration error. Please contact support.";
    if (error === "hash") return "Payment verification failed. Transaction may be tampered.";
    if (error === "exception") return "An unexpected error occurred during payment processing.";
    if (reason) return decodeURIComponent(reason);
    return "Payment was not successful. Please try again.";
  };

  return (
    <div className="min-h-screen reg-bg-image flex items-center justify-center p-4">
      <div className="form-container mt-20 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/20 backdrop-blur-sm">
          <X className="w-10 h-10 text-red-400" strokeWidth={3} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3 font-baloo">Payment Failed</h1>

        <p className="text-white/90 mb-6 text-lg">{getErrorMessage()}</p>

        {txnid && (
          <div className="text-left bg-white/10 backdrop-blur-sm rounded-lg p-5 mt-6 space-y-2">
            <p className="text-white/90 text-sm">
              <strong className="text-white">Transaction ID:</strong> {txnid}
            </p>
            {status && (
              <p className="text-white/90 text-sm">
                <strong className="text-white">Status:</strong> {status}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3 mt-6">
          <Link
            href={"/register"}
            className="w-full py-3 px-6 text-white font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 rounded-[0_19.598px] border border-white/30 font-inria"
          >
            Try Again
          </Link>

          <Link
            href={"/"}
            className="w-full py-3 px-6 text-white font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 rounded-[0_19.598px] border border-white/30 font-inria"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
