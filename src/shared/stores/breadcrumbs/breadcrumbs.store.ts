import { create } from "zustand";

export type BreadcrumbItem = {
  title: string;
  href?: string;
};

type BreadcrumbStore = {
  items: BreadcrumbItem[];

  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
  resetBreadcrumbItems: () => void;
};

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  items: [],

  setBreadcrumbItems: (items) => set({ items }),

  resetBreadcrumbItems: () => set({ items: [] }),
}));
