import { api, ApiResult } from "@/src/shared/api/client";
import { create } from "zustand";
import { CreateGarageCarDto, ResponseGarage } from "./garage.types";
import { Modification } from "../../vehicleFilters/model/vehicle.type";

interface GarageState {
  listGarages: ResponseGarage[];
  listCarGarages: {
    [key: string]: [];
  };
  errorMessageGarage: string;
  countGarage: number;
  loadingGarage: boolean;
  loadingCarGarage: boolean;
  addCarToGarage: (
    modification: Modification,
    garageId?: number,
  ) => Promise<boolean>;
  createGarage: (name: string, comment?: string) => Promise<boolean>;
  getGarages: () => Promise<void>;
  removeCarFromGarage: (garageCarId: number) => void;
  editItemGarage: (
    garageId: number,
    name?: string,
    comment?: string,
  ) => Promise<boolean>;
  clearGarage: () => void;
  setErrorMessageGarage: (message: string) => void;
  clearErrorMessageGarage: () => void;
  changeDefaultGarage: (garageId: number) => Promise<void>;
  init: () => void;
}

export const useGarageStore = create<GarageState>((set, get) => ({
  listGarages: [],
  countGarage: 0,
  listCarGarages: {},
  errorMessageGarage: "",
  loadingGarage: false,
  loadingCarGarage: false,
  init: () => {
    get().getGarages();
  },
  changeDefaultGarage: async (garageId) => {
    set({
      loadingGarage: true,
    });
    try{

      const url = `/garage/${garageId}/default`;
      const res = await api(url, {
        method: "PUT",
      });
      if (res.ok) {
        get().getGarages();
      }
    } catch(e){
      console.error(e)
    }finally{
      set({
        loadingGarage: false,
      })
    }
  },
  getGarages: async () => {
    try {
      set({
        loadingGarage: true,
      });
      const url = "/garage";
      const garages: ApiResult<ResponseGarage[]> = await api(url, {
        method: "GET",
      });
      console.log("getGarages", garages);
      if (!garages.ok) {
        console.error(garages);
      } else {
        const count = garages.data.reduce((acc, cur) => {
          acc += cur.cars.length;
          return acc;
        }, 0);
        set({
          listGarages: garages.data,
          loadingGarage: false,
          countGarage: count,
        });
      }
    } catch (error) {
      console.error({ error });
    } finally {
      set({
        loadingGarage: false,
      });
    }
  },
  createGarage: async (name, comment) => {
    try {
      set({
        loadingGarage: true,
      });
      const url = "/garage";
      let options: { name: string; comment?: string } = {
        name,
      };
      if (comment) {
        options = { ...options, comment };
      }
      const response = await api(url, {
        method: "POST",
        body: JSON.stringify(options),
      });
      if (!response.ok && response.status === 400) {
        get().setErrorMessageGarage(response.error);
        return false;
      }
      if (response.ok) {
        get().getGarages();
        return true;
      }
      return false;
    } catch (error) {
      console.error({ error });
    } finally {
      set({
        loadingGarage: false,
      });
      return false;
    }
  },
  addCarToGarage: async (
    modification: Modification,
    garageId,
  ): Promise<boolean> => {
    try {
      set({
        loadingCarGarage: true,
      });
      const url = `/garage-car`;
      const options: CreateGarageCarDto = {
        modificationId: modification.id,
      };
      const response = await api(url, {
        method: "POST",
        body: JSON.stringify(options),
      });
      if (response.ok) {
        get().getGarages();
        // resetBreadcrumbItems state create garage
        // redirect to
        return true;
      }
      return false;
    } catch (error) {
      console.error({ error });
    } finally {
      set({
        loadingCarGarage: false,
      });
      return false;
    }
  },
  removeCarFromGarage: async (garageCarId) => {
    try {
      set({
        loadingCarGarage: true,
      });
      const url = `/garage-car/${garageCarId}`;
      const res = await api(url, {
        method: "DELETE", 
      });
      if (res.ok) {

        get().getGarages();
        const listGarages = get().listGarages;
        if(listGarages){
          set({
            listGarages: listGarages.map((lg) => ({
              ...lg,
              cars: lg.cars.filter((el) => el.id !== garageCarId),
            })),
          });
        }
      }
    } catch (error) {
      console.error({ error });
    } finally {
      set({
        loadingCarGarage: false,
      });
    }
  },
  editItemGarage: async (garageId, name, comment) => {
    try {
      set({
        loadingCarGarage: true,
      });
      const url = `/garage/${garageId}`;
      let options = {};
      if (name) options = { ...options, name };
      if (comment) options = { ...options, comment };
      const res = await api(url, {
        method: "PUT",
        body: JSON.stringify(options),
      });
      if (!res.ok && res.status === 400) {
        get().setErrorMessageGarage(res.error);
        return false;
      }
      if (res.ok) {
        get().getGarages();
        return true;
      }
      return false;
    } catch (error) {
      console.error({ error });
    } finally {
      set({
        loadingCarGarage: false,
      });
      return false;
    }
  },
  clearGarage: () => {
    set({
      listGarages: [],
      countGarage: 0,
      listCarGarages: {},
    });
  },
  setErrorMessageGarage: (message) => {
    set({
      errorMessageGarage: message,
    });
  },
  clearErrorMessageGarage: () => set({ errorMessageGarage: "" }),
}));
