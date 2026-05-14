import { create } from "zustand";
import { Brand, Modification, Model, Year, Catalog } from "./type";
import { getBrandsApi, getModificationsApi, getModelsApi, getYearsApi, getCatalogApi } from "../api/api";
import { transformCatalog } from "../../../entities/catalog/model/libs";
import { TransformCatalog } from "../../../entities/catalog/model/types";

interface VehicleFiltersState {
    filters: {
        years: Year[];
        brands: Brand[];
        models: Model[];
        modifications: Modification[];
        catalogs: TransformCatalog;


        // typeEngines: TypeEngine[];
        // typeBodys: TypeBody[];

        year: number | null;
        brand: { id: number | null; name: string | null } | null;
        model:  { id: number | null; name: string | null } | null;
        modification:  Modification | null;
        catalog: Catalog | null;


        // typeEngine: string | null;
        // typeBody: string | null;
    };
    init: ()=> Promise<void>;
    getYears: () => Promise<Year[]>;
    getBrands: () => Promise<Brand[]>;
    getModels: (brandId: number) => Promise<Model[]>;
    getModifications: (modelId: number) => Promise<Modification[]>;
    getCatalog: (modificationId: number) => Promise<Catalog | null>;
    // getTypeEngines: (modelId: string) => Promise<TypeEngine[]>;
    // getTypeBodys: () => Promise<TypeBody[]>;
    setFilters: (filters: VehicleFiltersState['filters']) => void;
    setBrand: (brand: { id: number; name: string }) => void;
    setModel: (model: { id: number; name: string }) => void;
    setModification: (modification: Modification) => void;
    setCatalog: () => void;
    // setTypeEngine: (typeEngine: { id: string; name: string }) => void;
    // setTypeBody: (typeBody: { id: string; name: string }) => void;
}

export const useVehicleFiltersStore = create<VehicleFiltersState>((set) => ({
    filters: {
        years: [],
        brands: [],
        models: [],
        modifications: [],
        catalogs: {} as TransformCatalog,
        // typeEngines: [],
        // typeBodys: [],
        year: null,
        brand: {id: null, name: null},
        model: null,
        modification: null,
        catalog: null,
        // typeEngine: null,
        // typeBody: null,
    },
    init: async () => {
        const [brands, years] = await Promise.all([getBrandsApi(), getYearsApi()]);
        set({
            filters: {
                years,
                brands,
                models: [],
                modifications: [],
                catalogs: {} as TransformCatalog,
                // typeEngines: [],
                // typeBodys: [],
                year: null,
                brand: {id: null, name: null},
                model: null,
                modification: null,
                catalog: null,
                // typeEngine: null,
                // typeBody: null,
            },
        });
    },
    setFilters: (filters) => set({ filters }),
    getBrands: async () => {
        const brands: Brand[] = await getBrandsApi();
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
        const years = await getYearsApi();
        console.log('Fetched years:', years);
        set((state) => ({
            filters: {
                ...state.filters,
                years,
            },
        }));
        return years;
    },
    getModels: async (brandId: number) => {
        console.log(brandId)
        // Implement API call to fetch models based on brandId
        // Update state with fetched models
        return [];
    },
    getModifications: async (modelId: number) => {
        // Implement API call to fetch modifications based on modelId
        // Update state with fetched modifications
        return [];
    },
    getCatalog: async () => {
        // Implement API call to fetch catalog based on modificationId
        // Update state with fetched catalog
        return null;
    },
    // getTypeEngines: async (modelId: string) => {
    //     // Implement API call to fetch type engines based on modelId
    //     // Update state with fetched type engines
    //     return [];
    // },
    // getTypeBodys: async () => {
    //     // Implement API call to fetch type bodys
    //     // Update state with fetched type bodys
    //     return [];
    // },
    setBrand: async (brand: { id: number; name: string }) => {
        const fetchedModels = await getModelsApi(brand.id);
        set((state) => ({
            filters: {
                ...state.filters,
                brand,
                models: fetchedModels,
                model: null,
                modifications: [],
                typeEngines: [],
                typeBodys: [],
            },
        }));
    },
    setModel: async (model: { id: number; name: string }) => {
        const fetchedModifications = await getModificationsApi(model.id);
        set((state) => ({
            filters: {
                ...state.filters,
                model,
                modifications: fetchedModifications,
            },
        }));
    },
    setModification: async (modification: Modification) => {
        console.log('Selected modification:', modification);
        const fetchedCatalog: Catalog[] = await getCatalogApi(modification.modificationAutotechId);
        set((state) => ({
            filters: {
                ...state.filters,
                modification,
                catalogs: transformCatalog(fetchedCatalog),
            },
        }));
    },
    setCatalog: () => {
        // set((state) => ({
        //     filters: {
        //         ...state.filters,
        //         catalog,
        //     },
        // }));
    },
    // setTypeEngine: (typeEngine: { id: string; name: string }) => {
    //     set((state) => ({
    //         filters: {
    //             ...state.filters,
    //         },
    //     }));
    // },
    // setTypeBody: (typeBody: { id: string; name: string }) => {
    //     const fetchedEngines = getTypeEngines(typeBody.id);

    //     // set((state) => ({
    //     //     filters: {
    //     //         ...state.filters,
    //     //         typeEngines: fetchedEngines,
    //     //     },
    //     // }));
    // },


}))