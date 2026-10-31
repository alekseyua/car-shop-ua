import { getLinkTelegram } from "../api/profile.api"

export const handleTelegramClick = async () => {
    const response = await getLinkTelegram();
    if (response.ok) {
      window.open(response.data.url, "_blank");
    }
}