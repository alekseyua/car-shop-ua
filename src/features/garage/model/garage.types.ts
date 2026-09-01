import { Modification } from "../../vehicleFilters/model/vehicle.type";

export interface ResponseGarage {
    id: number;
    name: string;
    comment: string | null;
    cars: ResponseGarageCar[];
    isDefault: boolean;
}


export interface EngineType {
    id: number;
    name: string;
}

export interface BodyType {
    id: number;
    name: string;
}

// export interface ModificationGarage {
//     id: number;
//     modificationAutotechId: number;
//     typeName: string;
//     model: string;
//     brand: string;
//     typeRange: string;
//     engineType: EngineType;
//     kw: string;
//     hp: string;
//     bodyType: BodyType;
// }

export interface ResponseGarageCar {
    id: number;
    vin: string | null;
    nickname: string | null;
    isDefault: boolean;
    modification: Modification;
    // modification: ModificationGarage;
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