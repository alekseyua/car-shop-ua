//items-catalog?page=1&limit=10&typeId=1054&groupId=2036

import { api } from "@/src/shared/api/client";
import { ResponseCatalogItem, ResponseTopProduct } from "./dto";

export const fetchCatalogItems = async (typeId: number, groupId: number): Promise<ResponseCatalogItem[]> => {
    try {
        const result = await api<ResponseCatalogItem[]>(`/products?page=1&limit=10&typeId=${typeId}&groupId=${groupId}`);
        if (!result.ok) {
            // result.error доступен здесь
            throw new Error(result.error);
        }

        const { data } = result;
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchTopProducts = async (): Promise<ResponseTopProduct[]> => {
    try {
        const result = await api<ResponseTopProduct[]>(`/products/top`);
        if (!result.ok) {
            // result.error доступен здесь
            throw new Error(result.error);
        }

        const { data } = result;
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

