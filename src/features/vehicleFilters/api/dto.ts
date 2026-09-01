import { Modification } from "../model/vehicle.type";

export interface BrandsResponseDto {
    "id": number;
    "mark": string;
    "markAutotechId": number;
    "active": boolean;
    "image": string | null;
}

export interface ModelResponseDto {
     id: number;
    model: string;
    modelAutotechId: number;
    range: string;
    active: boolean;
    image: string;
    brandId: number;
}

export type ModificationResponseDto = Modification;

export interface CatalogResponseDto {
    typeId?: number;
    groupId: number;
    groupCode: string;
    subGroupCode: string;
    count: number;
    typeAutotechId: number;
    createdAt: string;
    updatedAt: string;
    modificationId: number;
}