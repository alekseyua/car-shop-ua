export interface ResponseGarage {
    id: number;
    name: string;
    comment: string | null;
    cars: ResponseGarageCar[];
}


export interface EngineType {
    id: number;
    name: string;
}

export interface BodyType {
    id: number;
    name: string;
}

export interface Model {
    id: number;
    model: string;
    modelAutotechId: number;
    range: string;
    active: boolean;
    image: string | null;
    brandId: number;
}

export interface ModificationGarage {
    id: number;
    modificationAutotechId: number;
    typeName: string;
    model: Model;
    typeRange: string;
    engineType: EngineType;
    kw: number;
    hp: number;
    bodyType: BodyType;
}

export interface ResponseGarageCar {
    id: number;
    vin: string | null;
    nickname: string | null;
    modification: ModificationGarage;
}

export interface CreateGarageCarDto {
    garageId?: number;
    modificationId: number;
    vin?: string;
    nickname?: string;
    mileage?: number;
    year?: number;
    color?: string;
}