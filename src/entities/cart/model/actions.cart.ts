import { CartItem } from "./types";

export const addQuantityOptimistically = (
  items: CartItem[],
  dto: CartItem,
): CartItem[] => {
  const existing = items.find((item) => item.itemNo === dto.itemNo);

  if (!existing) {
    return [...items, dto];
  }

  return items.map((item) =>
    item.itemNo === dto.itemNo
      ? {
          ...item,
          quantity: item.quantity + dto.quantity,
        }
      : item,
  );
};
export const updateQuantityOptimistically = (
  items: CartItem[],
  dto: CartItem,
  count: number,
): CartItem[] => {
  return items.map((item) =>
    item.itemNo === dto.itemNo
      ? {
          ...item,
          quantity: count,
        }
      : item,
  );
};

export const removeFromCartOptimistically = (
  items: CartItem[],
  itemNo: string,
): CartItem[] => {
  return items.filter((item) => item.itemNo !== itemNo);
};