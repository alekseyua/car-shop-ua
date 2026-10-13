//items-catalog?page=1&limit=10&typeId=1054&groupId=2036

import { api } from "@/src/shared/api/client";
import { CarResponse, ResponseCatalogItem, ResponseTopProduct } from "./dto";

export const fetchCatalogItems = async (typeId: number, groupId: number): Promise<ResponseCatalogItem[]> => {
        const result = await api<ResponseCatalogItem[]>(`/products?page=1&limit=10&typeId=${typeId}&groupId=${groupId}`);
        if (!result.ok) {
            throw new Error(result.error);
        }
        const { data } = result;
        return data.sort((a, b) => Number(b.inStock) - Number(a.inStock));
}

export const fetchTopProducts = async (): Promise<ResponseTopProduct[]> => {
        const result = await api<ResponseTopProduct[]>(`/products/top`);
        if (!result.ok) {
            throw new Error(result.error);
        }
        const { data } = result;
        return data;
}

export const fetchKroonOilCarCatalog = async (q: string): Promise<CarResponse> => {
    console.log({'===========': q})
  const result = await api<CarResponse>(`/search/kroon/search?query=${q}`);
  if (!result.ok) {
    const error: unknown = result.error;

    if (error instanceof Error) {
      throw error;
    }
    if (typeof error === "string") {
      throw new Error(error);
    }
    throw new Error("Failed to response kroon oil data");
  }
  const { data } = result;
  return data;
};

