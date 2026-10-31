import { api } from "@/src/shared/api/client";

export const getLinkTelegram = async () => {
  const response = await api<{ url: string }>("/telegram/link", {
    method: "POST",
  });
  return response;
};
