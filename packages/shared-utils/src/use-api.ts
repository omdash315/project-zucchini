"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";

interface ApiResponse<T = any> {
  success: true;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface ExecuteResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

interface UseApiReturn<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
  execute: (endpoint: string, options?: RequestInit) => Promise<ExecuteResult<T>>;
}

async function getAuthToken(): Promise<string | null> {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken();
  } catch {
    return null;
  }
}

export function useApi<T = any>(options?: UseApiOptions): UseApiReturn<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async (
    endpoint: string,
    fetchOptions?: RequestInit
  ): Promise<ExecuteResult<T>> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const token = await getAuthToken();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(fetchOptions?.headers as Record<string, string>),
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      const result: ApiResponse<T> | ApiErrorResponse = await response.json();

      if (!result.success) {
        const errorMessage = (result as ApiErrorResponse).error || "An error occurred";
        setError(errorMessage);
        options?.onError?.(errorMessage);
        return { data: null, error: errorMessage, success: false };
      }

      const responseData = (result as ApiResponse<T>).data;
      setData(responseData);
      options?.onSuccess?.(responseData);
      return { data: responseData, error: null, success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      setError(errorMessage);
      options?.onError?.(errorMessage);
      return { data: null, error: errorMessage, success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, execute };
}
