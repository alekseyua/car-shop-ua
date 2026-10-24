"use client";

import { Container } from "@/src/shared/ui/layout/Container/Container";
import { useEffect, useRef } from "react";

type Props = {
  action: string;
  data: string;
  signature: string;
};

export default function LiqPayRedirectForm({ action, data, signature }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.submit();
  }, []);

  return (
    <Container className="flex flex-col h-full min-h-screen bg-white" noPadding>
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

        <h1 className="text-xl font-semibold">Переходимо до оплати</h1>

        <p className="text-center text-sm text-gray-500">
          Будь ласка, не закривайте сторінку.
        </p>

        <form ref={formRef} action={action} method="POST">
          <input type="hidden" name="data" value={data} />
          <input type="hidden" name="signature" value={signature} />

          <noscript>
            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-3 text-white"
            >
              Перейти до оплати
            </button>
          </noscript>
        </form>
      </main>
    </Container>
  );
}
