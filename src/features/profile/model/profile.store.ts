import { api } from "@/src/shared/api/client";
import { create } from "zustand";

export interface ProfileState {
  currentSection: number;
  
  setCurrentSection: (section: number) => void;
}
export const useProfileStore = create<ProfileState>((set) => ({
 

  currentSection: 0,
  setCurrentSection: (section) => {
    set({
      currentSection: section,
    });
  },

}));
