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

export interface ModificationResponseDto {
    id: number;
    modificationAutotechId: number;
    typeName: string;
    typeRange: string;
    kw: number;
    hp: number;
    ccmTech: number;
    capacity: number;
    cylinders: number;
    valve: number;
    tonnage: number;
    active: boolean;
    image: string;
    fuelId: number;
    engineTypeId: number;
    fuelPreparationId: number;
    bodyTypeId: number;
    driveTypeId: number;
    modelId: number;
    model: {
        model: string;
    }
    "engineType": {
        "name": string;
    },
    "bodyType": {
        "name": string;
    }
}

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