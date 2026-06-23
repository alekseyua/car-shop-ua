import { fetchTopProducts } from "./catalog.api";

export async function getTopProducts() {
    const res = await fetchTopProducts();

    return res
    // .map(item => ({
    //     ...item,
    //     firstPic: item.firstPic?.replace('tcd/', 'tcd-pic/')
    // }));
}