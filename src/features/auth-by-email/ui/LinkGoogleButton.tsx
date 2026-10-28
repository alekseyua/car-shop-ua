"use client";

import { useState } from "react";
import { useAuthStore } from "../model/auth.store";
import { startGoogleLink } from "../api/auth.api";

export function LinkGoogleButton() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLinkGoogle() {
    if (!accessToken) {
      setError("Сначала войдите в аккаунт");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { url } = await startGoogleLink(accessToken);
      window.location.assign(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось начать привязку",
      );
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" disabled={loading} onClick={handleLinkGoogle}>
        {loading ? "Переход к Google..." : "Привязать Google"}
      </button>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}
