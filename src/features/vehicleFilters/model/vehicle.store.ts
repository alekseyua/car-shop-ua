import { create } from "zustand";
import { Brand, Modification, Model, Year, Catalog } from "./vehicle.type";
import { getBrandsApi, getModificationsApi, getModelsApi, getYearsApi, getCatalogApi } from "../api/api";
import { transformCatalog } from "../../../entities/catalog/model/libs";
import { TransformCatalog } from "../../../entities/catalog/model/types";
import { useCatalogStore } from "@/src/entities/catalog/model/catalog.store";
import { useAccessoriesStore } from "@/src/entities/catalogAccessories/model/accessories.store";

interface VehicleFiltersState {
    filters: {
        years: Year[];
        brands: Brand[];
        models: Model[];
        modifications: Modification[];
        catalogs: TransformCatalog;
        year: number | null;
        brand: { id: number | null; name: string | null } | null;
        model: { id: number | null; name: string | null } | null;
        modification: Modification | null;
        catalog: Catalog | null;
    };
    activeModification: Modification | null;
    init: () => Promise<void>;
    getYears: () => Promise<Year[]>;
    getBrands: () => Promise<Brand[]>;
    setFilters: (filters: VehicleFiltersState['filters']) => void;
    setBrand: (brand: { id: number; name: string }) => void;
    setModel: (model: { id: number; name: string }) => void;
    resetModel: ()=> void;
    setModification: (modification: Modification) => void;
    resetModification: ()=> void;
    getCatalogByModificationAutotechId: (modification: Modification) => void;
    // getCatalogByModificationAutotechId: (modification: ModificationGarage) => void;
    resetFilters: () => void;
    setActiveModification: (m: Modification) => void;
    resetActiveModification: ()=> void;
}

export const useVehicleFiltersStore = create<VehicleFiltersState>((set, get) => ({
    filters: {
        years: [],
        brands: [],
        models: [],
        modifications: [],
        catalogs: {} as TransformCatalog,
        year: null,
        brand: { id: null, name: null },
        model: null,
        modification: null,
        catalog: null,
        // typeEngine: null,
        // typeBody: null,
    },
    activeModification: null,
    init: async () => {
        const [brands, years] = await Promise.all([getBrandsApi(), getYearsApi()]);
        set({
            filters: {
                years,
                brands,
                models: [],
                modifications: [],
                catalogs: {} as TransformCatalog,
                year: null,
                brand: { id: null, name: null },
                model: null,
                modification: null,
                catalog: null,

            },
        });
    },
    setActiveModification: async (m) => {
        const fetchedCatalog: Catalog[] = await getCatalogApi(m.modificationAutotechId);
        useCatalogStore.getState().resetListItemsCatalog();
        useAccessoriesStore.getState().resetCategoryId();
        set((state) => ({
            activeModification: m,
            filters: {
                ...state.filters,
                catalogs: transformCatalog(fetchedCatalog),
            },
        }));
    },
    resetActiveModification: () => {
        set({
            activeModification: null,
        });
    },
    setFilters: (filters) => set({ filters }),
    resetFilters: () => {
        console.log('clear filters')
        set({
            filters: {
                years: [],
                brands: [],
                models: [],
                modifications: [],
                catalogs: {} as TransformCatalog,
                year: null,
                brand: { id: null, name: null },
                model: null,
                modification: null,
                catalog: null,
            }
        })
    },
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
    setBrand: async (brand: { id: number; name: string }) => {
        get().resetModel();
        get().resetModification();
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
        get().resetModification();
        const fetchedModifications = await getModificationsApi(model.id);
        set((state) => ({
            filters: {
                ...state.filters,
                model,
                modifications: fetchedModifications,
            },
        }));
    },
    resetModel: () => set((state) => ({
        filters: {
            ...state.filters,
            models: [],
            model: null
        }})),
    setModification: async (modification: Modification) => {
        // console.log('Selected modification:', modification);
        // const fetchedCatalog: Catalog[] = await getCatalogApi(modification.modificationAutotechId);
        // useCatalogStore.getState().resetListItemsCatalog();
        set((state) => ({
            filters: {
                ...state.filters,
                modification,
                // catalogs: transformCatalog(fetchedCatalog),
            },
        }));
    },
    resetModification: () => set((state) => ({
        filters: {
            ...state.filters, 
            modifications: [],
            modification: null,
        }})),

    getCatalogByModificationAutotechId: async (modification) => {
        useCatalogStore.getState().resetListItemsCatalog();
        const fetchedCatalog: Catalog[] = await getCatalogApi(modification.id);
        useAccessoriesStore.getState().resetCategoryId();
        set((state) => ({
            filters: {
                ...state.filters,
                catalogs: transformCatalog(fetchedCatalog),
            },
            activeModification: modification,
        }));
    },
}))