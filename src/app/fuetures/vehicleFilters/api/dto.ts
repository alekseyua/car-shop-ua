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