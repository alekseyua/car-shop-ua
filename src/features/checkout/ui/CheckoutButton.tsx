"use client";

import { useState } from "react";
import { useCheckout } from "../model/checkout.store";

type Props = {
  orderId: number;
};

type CheckoutResponse = {
  action: string;
  data: string;
  signature: string;
};

export function CheckoutButton({ orderId }: Props) {
  const { checkout, isLoading, error } = useCheckout();

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={()=>checkout(orderId)}
        disabled={isLoading}
        className="rounded-lg bg-red-600 px-5 py-2 text-white disabled:opacity-50 hover:cursor-pointer"
      >
        {isLoading ? "Переход к оплате..." : "Оплатить"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
