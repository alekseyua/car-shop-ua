//items-catalog?page=1&limit=10&typeId=1054&groupId=2036

import { api } from "@/src/shared/api/client";
import { ResponseCatalogItem, ResponseTopProduct } from "./dto";

export const fetchCatalogItems = async (typeId: number, groupId: number): Promise<ResponseCatalogItem[]> => {
    try {
        const response: ResponseCatalogItem[] = await api(`/items-catalog?page=1&limit=10&typeId=${typeId}&groupId=${groupId}`);
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchTopProducts = async (): Promise<ResponseTopProduct[]> => {
    try {
        const response: ResponseTopProduct[] = await api(`/products/top`);
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}

