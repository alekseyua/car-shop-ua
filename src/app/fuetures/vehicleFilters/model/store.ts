import { create } from "zustand";
import { Brand, Generation, Model, TypeBody, TypeEngine, Year } from "./type";
import { getBrands, getGenerations, getModels, getTypeBodys, getTypeEngines, getYears } from "../api/api";

interface VehicleFiltersState {
    filters: {
      years: Year[];
      brands: Brand[];
      models: Model[];
      generations: Generation[];
      typeEngines: TypeEngine[];
      typeBodys: TypeBody[];

        year: number | null;
        brand: { id: string | null; name: string | null } | null;
        model: string | null;
        generation: string | null;
        typeEngine: string | null;
        typeBody: string | null;
    };
    init: ()=> Promise<void>;
    getYears: () => Promise<Year[]>;
    getBrands: () => Promise<Brand[]>;
    getModels: (brandId: string) => Promise<Model[]>;
    getGenerations: (modelId: string) => Promise<Generation[]>;
    getTypeEngines: (modelId: string) => Promise<TypeEngine[]>;
    getTypeBodys: () => Promise<TypeBody[]>;
    setFilters: (filters: VehicleFiltersState['filters']) => void;
    setBrand: (brand: { id: string; name: string }) => void;
    setModel: (model: { id: string; name: string }) => void;
    setGeneration: (generation: { id: string; name: string }) => void;
    setTypeEngine: (typeEngine: { id: string; name: string }) => void;
    setTypeBody: (typeBody: { id: string; name: string }) => void;
}

export const useVehicleFiltersStore = create<VehicleFiltersState>((set) => ({
    filters: {
        years: [],
        brands: [],
        models: [],
        generations: [],
        typeEngines: [],
        typeBodys: [],
        year: null,
        brand: {id: null, name: null},
        model: null,
        generation: null,
        typeEngine: null,
        typeBody: null,
    },
    init: async () => {
        const [brands, years] = await Promise.all([getBrands(), getYears()]);
        console.log('Fetched brands:', brands);
        console.log('Fetched years:', years);
        set({
            filters: {
                years,
                brands,
                models: [],
                generations: [],
                typeEngines: [],
                typeBodys: [],
                year: null,
                brand: {id: null, name: null},
                model: null,
                generation: null,
                typeEngine: null,
                typeBody: null,
            },
        });
    },
    setFilters: (filters) => set({ filters }),
    getBrands: async () => {
        const brands = await getBrands();
        console.log('Fetched brands:', brands);
        set((state) => ({
            filters: {
                ...state.filters,
                brands,
            },
        }));
        return brands;
    },
    getYears: async () => {
        const years = await getYears();
        console.log('Fetched years:', years);
        set((state) => ({
            filters: {
                ...state.filters,
                years,
            },
        }));
        return years;
    },
    getModels: async (brandId: string) => {
        // Implement API call to fetch models based on brandId
        // Update state with fetched models
        return [];
    },
    getGenerations: async (modelId: string) => {
        // Implement API call to fetch generations based on modelId
        // Update state with fetched generations
        return [];
    },
    getTypeEngines: async (modelId: string) => {
        // Implement API call to fetch type engines based on modelId
        // Update state with fetched type engines
        return [];
    },
    getTypeBodys: async () => {
        // Implement API call to fetch type bodys
        // Update state with fetched type bodys
        return [];
    },
    setBrand: async (brand: { id: string; name: string }) => {
        const fetchedModels = await getModels(brand.id);
        set((state) => ({
            filters: {
                ...state.filters,
                brand,
                models: fetchedModels,
                model: null,
                generations: [],
                typeEngines: [],
                typeBodys: [],
            },
        }));
    },
    setModel: async (model: { id: string; name: string }) => {
        const fetchedTypeBodys = await getTypeBodys(model.id);
        set((state) => ({
            filters: {
                ...state.filters,
                typeBodys: fetchedTypeBodys,
                generations: [],
                typeEngines: [],
            },
        }));
    },
    setGeneration: (generation: { id: string; name: string }) => {
        // const fetchedTypeEngines = getTypeEngines(generation.id);
        // set((state) => ({
        //     filters: {
        //         ...state.filters,
        //         generation,
        //     },
        // }));
    },
    setTypeEngine: (typeEngine: { id: string; name: string }) => {
        set((state) => ({
            filters: {
                ...state.filters,
            },
        }));
    },
    setTypeBody: (typeBody: { id: string; name: string }) => {
        const fetchedEngines = getTypeEngines(typeBody.id);

        set((state) => ({
            filters: {
                ...state.filters,
                typeEngines: fetchedEngines,
                typeEngine: null,
            },
        }));
    },


}))