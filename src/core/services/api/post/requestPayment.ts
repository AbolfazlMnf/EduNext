"use server";

import { apiFetch, IError } from "@/core/Fetch";

interface PaymentApiResponse {
  success: boolean;
  message?: string;
  data?: {
    paymentUrl: string;
    token: string;
  };
}

export async function RequestPayment(courseId: string) {
  const response = await apiFetch<PaymentApiResponse>("/payments/request", {
    method: "POST",
    body: { courseId },
    cache: "no-store",
  });

  if (response && typeof response === "object" && "errorMessage" in response) {
    return { success: false, message: response.errorMessage };
  }

  const apiRes = response as PaymentApiResponse;

  if (apiRes?.success && apiRes?.data?.paymentUrl) {
    return { success: true, paymentUrl: apiRes.data.paymentUrl };
  }

  return {
    success: false,
    message: apiRes?.message || "Failed to connect to the payment gateway",
  };
}
