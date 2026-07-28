import { create } from "zustand";
import { Brand, Modification, Model, Year, Catalog } from "./vehicle.type";
import { getBrandsApi, getModificationsApi, getModelsApi, getYearsApi, getCatalogApi } from "../api/api";
import { transformCatalog } from "../../../entities/catalog/model/libs";
import { TransformCatalog } from "../../../entities/catalog/model/types";
import { ModificationGarage } from "../../garage/model/garage.types";
import { useCatalogStore } from "@/src/entities/catalog/model/store";

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
    init: () => Promise<void>;
    getYears: () => Promise<Year[]>;
    getBrands: () => Promise<Brand[]>;
    setFilters: (filters: VehicleFiltersState['filters']) => void;
    setBrand: (brand: { id: number; name: string }) => void;
    setModel: (model: { id: number; name: string }) => void;
    setModification: (modification: Modification) => void;
    getCatalogByModificationAutotechId: (modification: ModificationGarage) => void;
    resetFilters: () => void;
}

export const useVehicleFiltersStore = create<VehicleFiltersState>((set) => ({
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
        console.log({fetchedModifications})
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
        useCatalogStore.getState().resetListItems();
        set((state) => ({
            filters: {
                ...state.filters,
                modification,
                catalogs: transformCatalog(fetchedCatalog),
            },
        }));
    },
    getCatalogByModificationAutotechId: async (modification) => {
        const fetchedCatalog: Catalog[] = await getCatalogApi(modification.id);
        useCatalogStore.getState().resetListItems();
        set((state) => ({
            filters: {
                ...state.filters,
                modification: {
                    id: modification.id,
                    name: modification.typeName,
                    range: modification.typeRange,
                    kw: modification.kw,
                    hp: modification.hp,
                    engineType: modification.engineType.name,
                    modelType: modification.model.model,
                    bodyType: modification.bodyType.name,
                    modificationAutotechId: modification.modificationAutotechId,
                    image: modification.model?.image ?? '',
                    modelId: modification.model.id,
                    model: modification.model.model,
                    brand: modification.brand
                },
                catalogs: transformCatalog(fetchedCatalog),
            },
        }));
    },
}))