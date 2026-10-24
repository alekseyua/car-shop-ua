import { api } from "@/src/shared/api/client";
import { CreatePaymentResponse, LiqPayCheckout } from "./api.checkout.types";

export async function createPayment(orderId: number) {
  const result = await api<CreatePaymentResponse>(
    `/payments/checkout`,
    {
      method: "POST",
      body: JSON.stringify({ orderId }),
    },
  );

  if (!result.ok) {
    throw new Error(
      typeof result.error === "string"
        ? result.error
        : "Не удалось создать платёж",
    );
  }

  return result.data;
}

export async function getPaymentCheckout(
  paymentId: number,
): Promise<LiqPayCheckout> {
  const response = await api(
    `/payments/${paymentId}/checkout`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Не удалось получить данные платежа");
  }
  return response.data as LiqPayCheckout;
}
