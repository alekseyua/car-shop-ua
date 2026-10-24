"use client";

import { useState } from "react";
import { useRouter } from "@/src/i18n/navigation";
import { createPayment } from "../api/api.checkout";

export function useCheckout() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (orderId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const payment = await createPayment(orderId);

      router.push(
        `/payment/checkout?id=${encodeURIComponent(payment.paymentId)}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при оплате");
    } finally {
      setIsLoading(false);
    }
  };

  return { checkout, isLoading, error };
}
