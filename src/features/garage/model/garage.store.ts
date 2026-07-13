import { api, ApiResult } from "@/src/shared/api/client";
import { create } from "zustand";
import { CreateGarageCarDto, ResponseGarage } from "./garage.types";
import { Modification } from "../../vehicleFilters/model/vehicle.type";

interface GarageState {
    listGarages: ResponseGarage[];
    listCarGarages: {
        [key: string]: []
    };
    errorMessageGarage: string,
    countGarage: number,
    addCarToGarage: (modification: any, garageId?: number,) => void;
    createGarage: (name: string, comment?: string) => Promise<boolean>;
    getGarages: () => void;
    removeFromGarage: (garageCarId: number) => void;
    editItemGarage: (garageId: number, name?: string, comment?: string) => Promise<boolean>;
    clearGarage: () => void;
    setErrorMessageGarage: (message: string)=>void;
    clearErrorMessageGarage: ()=>void;
    init: () => void;
}

export const useGarageStore = create<GarageState>((set, get) => ({
    listGarages: [],
    countGarage: 0,
    listCarGarages: {},
    errorMessageGarage: '',
    init: () => {
        get()
            .getGarages();
    },
    getGarages: async () => {
        const url = '/garage'
        const garages: ApiResult<ResponseGarage[]> = await api(url, {
            method: 'GET'
        })
        console.log('getGarages', garages);
        if(!garages.ok){
            console.error(garages)
        }else{
            const count = garages.data.reduce((acc,cur)=>{
                acc+=cur.cars.length;
                return acc;
            },0)
            
            set({
                listGarages: garages.data,
                countGarage: count,
            })
        }
    },
    createGarage: async (name, comment)=>{
        const url = '/garage';
        let options: {name: string, comment?: string} = {
            name,
        };
        if (comment){
            options = {...options, comment}
        }
        const response = await api(url, {
            method: 'POST',
            body: JSON.stringify(options)
        })
        console.log({response});
        if(!response.ok && response.status === 400){
            get().setErrorMessageGarage(response.error)
            return false;
        }
        if(response.ok){
            get().getGarages();
            return true;
        }
        return false;
    },
    addCarToGarage: async (modification: Modification, garageId) => {
        const url = `/garage-car`;
        let options: CreateGarageCarDto = {
            modificationId: modification.id,

        }
        const response = await api(url, {
            method: 'POST',
            body: JSON.stringify(options)
        });
        if(response.ok){
            get().getGarages();
        }
    },
    removeFromGarage: async (garageCarId) => {
        const url = `/garage/${garageCarId}`
        const res = await api(url, {
            method: "DELETE"
        })
        if(res.ok){
            get().getGarages();
        }
    },
    editItemGarage: async (garageId, name, comment) => {
        const url = `/garage/${garageId}`;
        let options = {};
        if(name) options = {...options, name};
        if(comment) options = {...options, comment};
        const res = await api(url, {
             method: 'PUT',
             body: JSON.stringify(options)
        })
        if (!res.ok && res.status === 400) {
            get().setErrorMessageGarage(res.error)
            return false;
        }
        if(res.ok) {
            get().getGarages();
            return true;
        }
            return false;
    },
    clearGarage: () => {
        console.log('clearGarage');
        set({
            listGarages: [],
            countGarage: 0,
            listCarGarages: {},
        })
    },
    setErrorMessageGarage: (message) => {
        set({
            errorMessageGarage: message
        })
    },
    clearErrorMessageGarage:()=> set({errorMessageGarage: ''})
}))