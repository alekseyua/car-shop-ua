import { api } from "@/src/app/shared/api/client";
import { BrandsResponseDto, CatalogResponseDto, ModelResponseDto, ModificationResponseDto } from "./dto";
import { PaginationDto } from "@/src/app/shared/api/dto";
import { Brand, Modification, Model, Catalog } from "../model/type";

export const getBrandsApi = async (): Promise<Brand[]> => {
    try {
        const res: PaginationDto<BrandsResponseDto> = await api('/car-brands?page=1&limit=9999', {
            method: 'GET',
        });
        const brands: Brand[] = res.data.map((item) => ({ id: item.id, name: item.mark }));
        return brands;
    } catch (error) {
        console.error(error)
        return [{ id: 0, name: 'Unknown Brand' }]
    }
}

export const getModelsApi = async (brandId: number): Promise<Model[]> => {
    try {
        const res: PaginationDto<ModelResponseDto> = await api(`/car-models?page=1&limit=999&brandId=${brandId}`, {
            method: 'GET',
        });
        const models: Model[] = res.data.map((item) => ({ id: item.id, name: item.model, brandId }));
        return models;
    } catch (error) {
        console.error(error);
        return [{ id: 0, name: 'Unknown Model', brandId }];
    }
};

export const getModificationsApi = async (modelId: number): Promise<Modification[]> => {
    try{
        const res: PaginationDto<ModificationResponseDto> = await api(`/car-modification?page=1&limit=999&modelId=${modelId}`, {
            method: 'GET',
        });
        const modifications: Modification[] = res.data.map((item) => ({ 
            id: item.id, 
            name: item.model.model + ' ' + item.typeName,
            modificationAutotechId: item.modificationAutotechId,
            range: item.typeRange,
            kw: item.kw,
            hp: item.hp,
            engineType: item.engineType.name,
            modelType: item.model.model,
            bodyType: item.bodyType.name,
            image: item.image,
            modelId
        }));
        return modifications;
    }catch(error){
        console.error(error);
        return [{ 
            id: 0, 
            name: 'Unknown Modification',
            modificationAutotechId: 0,
            range: '',
            kw: 0,
            hp: 0,
            engineType: '',
            modelType: '',
            bodyType: '',
            modelId: 0,
            image: ''
        }];
    }
};

export const getCatalogApi = async (modificationId: number): Promise<Catalog[]> => {
    try {
        const res: PaginationDto<CatalogResponseDto> = await api(`/catalog?page=1&limit=999&typeAutotechId=${modificationId}`, {
            method: 'GET',
        });
        const catalog: Catalog[] = res.data.map((item) => ({ 
            typeId: item?.typeId ?? item?.typeAutotechId, 
            groupId: item.groupId,
            groupCode: item.groupCode,
            subGroupCode: item.subGroupCode,
            count: item.count,
        }));
        return catalog;
    } catch (error) {
        console.error(error);
        return [{ typeId: 0, groupId: 0, groupCode: '0', subGroupCode: '0', count: 0 }];
    }
};

// export const getYears = async () => ([
// export const getTypeBodys = async (modelId: number) => {
//     return [
//         { id: 1, name: 'седан', modelId }, 
//         { id: 2, name: 'хетчбек', modelId }, 
//         { id: 3, name: 'универсал', modelId }
//     ];
// };

// export const getTypeEngines = async (typeBodyId: number) => {
//     return [
//         { id: 1, name: 'Дизель', typeBodyId, engines: ['2.0', '3.0'] }, 
//         { id: 2, name: 'Бензин', typeBodyId, engines: ['1.6', '2.0'] },
//         { id: 3, name: 'Электро', typeBodyId, engines: ['0.0'] }
//     ];
// };

export const getYearsApi = async () => ([
    { decade: 1980, years: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989] },
    { decade: 1990, years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
    { decade: 2000, years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009] },
    { decade: 2010, years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019] },
    { decade: 2020, years: [2020, 2021, 2022, 2023, 2024, 2025, 2026] },
]);