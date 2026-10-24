"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getPaymentCheckout } from "@/src/features/checkout/api/api.checkout";
import LiqPayRedirectForm from "@/src/features/checkout/ui/LiqPayRedirectForm";
import type { LiqPayCheckout } from "@/src/features/checkout/api/api.checkout.types";
import { Container } from "@/src/shared/ui/layout/Container/Container";
import { useBreadcrumbStore } from "@/src/shared/stores/breadcrumbs/breadcrumbs.store";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [payment, setPayment] = useState<LiqPayCheckout | null>(null);
  const [error, setError] = useState<string | null>(null);
    const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbItems);


  const isValidId = Boolean(id && /^[1-9]\d*$/.test(id));
useEffect(() => {
  const listBreadcrumbs = [
    {
      title: "Замовлення",
      href: "/profile",
    },
    {
      title: "Оплата за товари",
      href: "",
    },
  ];
  setBreadcrumbs(listBreadcrumbs);

  return () => {
    useBreadcrumbStore.getState().resetBreadcrumbItems();
  };
}, [setBreadcrumbs]);

  useEffect(() => {
    if (!isValidId || !id) return;

    let cancelled = false;

    getPaymentCheckout(Number(id))
      .then((result) => {
        if (!cancelled) {
          setPayment(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Не удалось подготовить оплату");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, isValidId]);

  if (!isValidId) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <p role="alert">Некоректний ідентифікатор платежу</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <p role="alert">{error}</p>
      </main>
    );
  }

  if (!payment) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        Підготовляємо оплату...
      </main>
    );
  }

  return <LiqPayRedirectForm {...payment} />;
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center">
          Завантаження...
        </main>
      }
    >
      <Container
        className="flex flex-col h-full min-h-screen bg-white"
        noPadding
      >
        <CheckoutContent />
      </Container>
    </Suspense>
  );
}
