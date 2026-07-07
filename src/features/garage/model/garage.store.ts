import { create } from "zustand";

interface GarageState {
    listGarage: [];
    listCarGarage: [];
    addToGarage: (modification: any) => void;
    removeFromGarage: (modificationId: number) => void;
    clearGarage: () => void;
}

export const useGarageStore = create<GarageState>((set) => ({
    listGarage: [],
    listCarGarage: [],
    addToGarage: (modification) => {

    },
    removeFromGarage: (modificationId) => {},
    clearGarage: () => {},
}))