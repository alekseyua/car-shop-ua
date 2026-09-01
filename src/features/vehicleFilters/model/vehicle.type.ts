export type Brand = {
    id: number;
    name: string;
};

export type Model = {
    id: number;
    name: string;
    brandId: number;
};

export type Modification = {
    id: number;
    kw: number;
    hp: number;
    modificationAutotechId: number;
    image: string;
    name: string;
    range: string;
    engineType: string;
    bodyType: string;
    model: string;
    brand: string;
    modelId?: number;
};

export type Catalog = {
    typeId: number;
    groupId: number;
    groupCode: string;
    subGroupCode: string;
    count: number;
};

export type Year =  number;