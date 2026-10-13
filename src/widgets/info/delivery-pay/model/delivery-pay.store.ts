import { create } from "zustand";

export type InfoSection =
  | "payment"
  | "payment-faq"
  | "delivery"
  | "delivery-faq";

interface DeliveryPay {
  activeSection: InfoSection;
  setActiveSection: (section: InfoSection) => void;
}
export const useIfoDeliveryPay = create<DeliveryPay>((set) => ({
    activeSection: "payment",
    setActiveSection: (section) => {
        set({ activeSection: section });
    },
}));