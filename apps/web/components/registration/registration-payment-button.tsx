"use client";

import { useApi } from "@repo/shared-utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Button from "../ui/button";

interface RegistrationPaymentButtonProps {
  userName: string;
  userEmail: string;
  onPaymentFailure?: (error: string) => void;
  isCollegeStudent?: boolean;
  committeeChoice?: string;
  type?: string;
  teamId?: string;
  wantsAccommodation?: boolean;
}

export default function RegistrationPaymentButton({
  userName,
  userEmail,
  onPaymentFailure,
  isCollegeStudent,
  committeeChoice,
  type,
  teamId,
  wantsAccommodation,
}: RegistrationPaymentButtonProps) {
  const { execute, loading: isLoading } = useApi({
    onError(error) {
      console.error(error);
      toast.error(error || "Failed to initiate payment!");
    },
  });

  const handleSubmit = async () => {
    if (!teamId && window.location.pathname.includes("/mun")) {
      toast.error("Team ID is required");
      return;
    }
    const result = await execute("pay", {
      method: "POST",
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        type: type || "NITRUTSAV",
        isCollegeStudent,
        committeeChoice,
        teamId,
        wantsAccommodation,
      }),
    });

    if (!result.success) {
      onPaymentFailure?.(result.error || "Failed to initiate payment");
      return;
    }

    const { url, ...params } = result.data as { url: string; params: Record<string, string> };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    for (const key in params) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      // @ts-ignore
      input.value = params[key];
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isLoading}
      className="h-[75px] w-[275px] flex items-center"
    >
      <span className="text-lg">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
          </>
        ) : (
          "Proceed to Payment"
        )}
      </span>
    </Button>
  );
}
