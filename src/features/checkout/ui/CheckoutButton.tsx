"use client";

import { useCheckout } from "../model/checkout.store";

type Props = {
  orderId: number;
};

export function CheckoutButton({ orderId }: Props) {
  const { checkout, isLoading, error } = useCheckout();

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => checkout(orderId)}
        disabled={isLoading}
        className="rounded-lg bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Перехід до оплати..." : "Оплатити"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
