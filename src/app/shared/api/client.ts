import { HOST } from "@/src/config";

type FetchOptions = RequestInit & {
  next?: NextFetchRequestConfig;
};


export async function api<T>(
    endpoint: string,
    options: FetchOptions = {}
) :Promise<T> {
    try {
        const response = await fetch(HOST + endpoint,{
            ...options,
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        })
        if(!response.ok){
            throw new Error("Api Error")
        }
        return await response.json()
    } catch (error) {
        throw new Error("Something wrong!")
    }
}