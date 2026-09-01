import { api } from "@/src/shared/api/client"
import { ProductsSearchResponse } from "./search.types"

export const getSearchApi = async (q: string): Promise<ProductsSearchResponse> => {
    try {
        const url = `/search?q=${q}`;
        const res = await api<ProductsSearchResponse>(url);
        if(res.ok){
            return {
                total: res.data.total,
                products: res.data.products,
            }
        }
        return {
          total: 0,
          products: [],
        };
    } catch (error) {
        console.log({error})
        return {
            total: 0,
            products: []
        }
        
    }
}

export const getHistorySearchApi = (q:string) => {
    
}