import { api } from "@/src/shared/api/client";
import { CategoriesResponse, ProductAccessories } from "../model/accessories.type";
import { PaginationDto } from "@/src/shared/api/dto";

export const getListCatalogAccessories = async () => {
     try {
            const result = await api<CategoriesResponse>(`/accessories/menu`);
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

export const fetchCatalogAccessories = async (
  id: number,
  page: number,
  limit: number,
): Promise<PaginationDto<ProductAccessories>> => {
  try {
    const result = await api<PaginationDto<ProductAccessories>>(
      `/accessories/catalog?page=${page}&limit=${limit}&id=${id}`,
    );
    if (!result.ok) {
      // result.error доступен здесь
      throw new Error(result.error);
    }
    return result.data;
  } catch (error) {
    console.error(error);
    return {
        data: [],
        meta: {
            page: 0,
            limit: 0,
            total: 0,
            totalPages: 0,
        }
    }
  }
};
