export type Brand = {
    id: string;
    name: string;
};

export type Model = {
    id: string;
    name: string;
    brandId: string;
};

export type Generation = {
    id: string;
    name: string;
    modelId: string;
};

export type TypeEngine = {
    id: string;
    name: string;
};

export type TypeBody = {
    id: string;
    name: string;
};

export type Year = {decade: number; years: number[]};