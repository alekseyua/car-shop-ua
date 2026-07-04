import { create } from "zustand";

export interface ProfileState {
  listOrderUser: [];
  currentSection: number;
  setCurrentSection: (section: number) => void
}
export const useProfileStore = create<ProfileState>((set) => ({
  listOrderUser: [],

  currentSection: 0,
  setCurrentSection: (section) => {
    set({
      currentSection: section
    })
  },

  

}));
