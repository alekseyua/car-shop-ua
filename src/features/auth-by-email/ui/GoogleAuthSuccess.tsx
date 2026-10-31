"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { completeGoogleLogin } from "../api/google-auth.api";

type Status = "loading" | "success" | "error";

export default function GoogleAuthSuccess() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params.locale;

  const loginPromise = useRef<Promise<unknown> | null>(null);

  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    if (!loginPromise.current) {
      loginPromise.current = completeGoogleLogin();
    }

    loginPromise.current
      .then(() => {
        if (cancelled) return;

        setStatus("success");
        router.replace(`/${locale}`);
      })
      .catch((err: unknown) => {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Не удалось войти через Google",
        );

        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [locale, router]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <section
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
        aria-live="polite"
      >
        {status === "loading" && (
          <>
            <div
              className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
              aria-label="Загрузка"
            />

            <h1 className="text-xl font-semibold text-gray-900">
              Выполняем вход
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Подождите, завершаем авторизацию через Google...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              ✓
            </div>

            <h1 className="text-xl font-semibold text-gray-900">
              Вы успешно вошли
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Перенаправляем вас на главную страницу...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
              !
            </div>

            <h1 className="text-xl font-semibold text-gray-900">
              Не удалось войти
            </h1>

            <p className="mt-2 break-words text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => router.replace(`/${locale}/login`)}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Вернуться ко входу
            </button>
          </>
        )}
      </section>
    </main>
  );
}
