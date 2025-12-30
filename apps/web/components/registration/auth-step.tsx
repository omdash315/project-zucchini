import GoogleIcon from "@repo/ui/google-icon";
import { MoveRight } from "lucide-react";

interface AuthStepProps {
  onGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function AuthStep({ onGoogleSignIn, isLoading, error }: AuthStepProps) {
  return (
    <div className="text-center min-h-60 flex flex-col justify-center items-center text-white">
      <h2 className="text-xl font-semibold mb-2 font-berry">Welcome</h2>
      <p className="mb-8 font-inria">Sign in with your Google account to begin registration</p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={onGoogleSignIn}
        disabled={isLoading}
        className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white rounded-xl text-gray-800 font-medium hover:bg-white/95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-inria shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] animate-[slideFadeIn_0.8s_ease-out]"
      >
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-3 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            <span className="text-base">Signing in...</span>
          </>
        ) : (
          <>
            <GoogleIcon />
            <span className="text-base">Continue with Google</span>
            <MoveRight className="size-4" />
          </>
        )}
      </button>
    </div>
  );
}
