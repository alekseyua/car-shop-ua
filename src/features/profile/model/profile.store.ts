import { create } from "zustand";

export interface ProfileState {
  listOrderUser: [];
}
export const useProfileStore = create<ProfileState>((set) => ({
  listOrderUser: [],
}));
