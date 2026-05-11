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
    name: string;
    range: string;
    kw: number;
    hp: number;
    engineType: string;
    modelType: string;
    bodyType: string;
    modificationAutotechId: number;

    modelId: number;
};

export type Catalog = {
    id: number;
    groupId: number;
    groupCode: string;
    subGroupCode: string;
    count: number;
};

// export type TypeEngine = {
//     id: string;
//     name: string;
// };

// export type TypeBody = {
//     id: string;
//     name: string;
// };

export type Year = {decade: number; years: number[]};