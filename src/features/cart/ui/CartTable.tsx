"use client";

import { useCartStore } from "../model/cart.store";
import { CartItem } from "../model/cart.types";
import Image from "next/image";
import QuantitySelector from "@/src/shared/ui/QuantitySelector/QuantitySelector";
import { RemoveCartItemButton } from "./RemoveCartItem";
import ProductAvailabilityStatus from "@/src/shared/ui/status/ProductAvailabilityStatus";

const CartTable = () => {
  const { cartItems, changeQuantity, removeFromCart, total } = useCartStore();
  if (!!!cartItems.length) return null;
  return (
    <div
      className="
      max-w-4xl mx-auto bg-white rounded-xl
      order-1 
      md:order-2 
      sm:p-6 p-2 "
    >
      <h2 className="text-3xl font-bold mb-6 text-black">Найменування</h2>

      <div className="flex gap-4 flex-col">
        {cartItems.map((item: CartItem) => (
          <div
            key={item.itemNo}
            className="
              grid
              grid-cols-[80px_1fr]
              grid-rows-[auto_1fr]
              [grid-template-areas:'image_title'_'image_content']

              sm:grid-cols-[100px_minmax(150px,1fr)_minmax(80px,150px)_110px]

              sm:grid-rows-none
              sm:[grid-template-areas:'image_title_price_order']

              items-center
              gap-3
              p-2
              border-b
            "
          >
            {/* IMAGE */}
            <div className="[grid-area:image] rounded-md border border-gray">
              <Image
                src={"https://img2.ad.ua/imgs/" + item.imageUrl}
                alt={"preview_" + item?.imageUrl?.split("/").pop()}
                width={80}
                height={80}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* TITLE */}
            <div className="[grid-area:title] text-black">{item?.title}</div>

            {/* MOBILE CONTENT */}
            <div
              className="
                [grid-area:content]
                flex
                items-center
                justify-between
                gap-3

                sm:contents
              "
            >
              {/* PRICE */}
              <div className="[grid-area:price]">
                <div className="flex flex-col">
                  {item?.quantity > 1 && (
                    <span className="text-black text-sm font-light text-nowrap">
                      {Number(item?.price).toFixed(2)} {" X "} {item?.quantity}
                    </span>
                  )}
                  <span className="text-black text-[20px] font-bold text-nowrap">
                    {(Number(item?.price) * Number(item.quantity)).toFixed(2)} ₴
                  </span>
                </div>

                <ProductAvailabilityStatus status={item.statusDelivery} />
              </div>

              {/* ORDER */}
              <div
                className="
                  [grid-area:order]
                  text-black
                  flex
                  flex-col
                  gap-2
                "
              >
                <QuantitySelector
                  initialValue={item.quantity}
                  onChange={(count: number) =>
                    changeQuantity(item.itemNo, count)
                  }
                />

                <RemoveCartItemButton
                  onClick={() => removeFromCart(item.itemNo)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-lg font-bold uppercase mt-3">
        total: {Number(total).toFixed(2)} ₴
      </div>
    </div>
  );
};

export default CartTable;
