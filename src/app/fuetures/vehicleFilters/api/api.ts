import { api } from "@/src/app/shared/api/client";
import { BrandsResponseDto, ModelResponseDto } from "./dto";
import { PaginationDto } from "@/src/app/shared/api/dto";

export const    getBrands = async () => {
    try {
        const res: PaginationDto<BrandsResponseDto> = await api('/car-brands?page=1&limit=9999', {
            method: 'GET',
        });

        return res.data.map( (item) => ({id: item.id, name: item.mark}))
    } catch (error) {
        console.error(error)
    }
}

export const getModels = async (brandId: string) => {
    try {
        const res: PaginationDto<ModelResponseDto> = await api(`/car-models?page=1&limit=999&brandId=${brandId}`, {
            method: 'GET',
        });
        return res.data.map( (item) => ({id: item.id, name: item.model}))
    } catch (error) {
        console.error(error);
    }
    // if (brandId === '1') return [{ id: '1', name: 'X5', brandId }];
    // return [{ id: '2', name: 'A6', brandId }];
};

export const getGenerations = async (modelId: string) => {
    return [{ id: '1', name: '2020+', modelId }];
};

export const getTypeBodys = async (modelId: string) => {
    return [
        { id: '1', name: 'седан', modelId }, 
        { id: '2', name: 'хетчбек', modelId }, 
        { id: '3', name: 'универсал', modelId }
    ];
};

export const getTypeEngines = async (typeBodyId: string) => {
    return [
        { id: '1', name: 'Дизель', typeBodyId, engines: ['2.0', '3.0'] }, 
        { id: '2', name: 'Бензин', typeBodyId, engines: ['1.6', '2.0'] },
        { id: '3', name: 'Электро', typeBodyId, engines: ['0.0'] }
    ];
};

export const getYears = async () => ([
    { decade: 1980, years: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989] },
    { decade: 1990, years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
    { decade: 2000, years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009] },
    { decade: 2010, years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019] },
    { decade: 2020, years: [2020, 2021, 2022, 2023, 2024, 2025, 2026] },
]);