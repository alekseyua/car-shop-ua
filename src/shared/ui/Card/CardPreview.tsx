"use client";
import Image from "next/image";
import React, { useState } from "react";
import RaitingItemCard from "../Raiting/RaitingItemCard";
import gearIcon from "../../../shared/assets/icons/gear.svg";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { ProductAvailabilityList } from "@/src/entities/product/ui/ProductAvailabilityList";
import { ResponseCatalogItem, ResponseTopProduct } from "@/src/entities/catalog/api/dto";
import { ProductAccessories } from "@/src/entities/catalogAccessories/model/accessories.type";
import { ProductItemDetail } from "@/src/entities/product-detail/model/detail.types";
import { handleAddToCart } from "@/src/features/cart/model/action.addToCart";

interface CardPreviewProps {
  imageSrc: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  oldPrice?: number;
  item:
    | ResponseCatalogItem
    | ResponseTopProduct
    | ProductAccessories
    | ProductItemDetail;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  imageSrc,
  title,
  description,
  rating,
  price,
  oldPrice,
  item,
}) => {
  const t = useTranslations();
  const [isAvailable, setIsAvailable] = useState(true);
  return (
    <div className="relative w-full max-w-[170px]">
      {!isAvailable && (
        <div className="absolute inset-0 bg-black/10 z-1 rounded-md pointer-events-none border-gray-400 rounded-md" />
      )}

      <div
        data-name="CardPreview"
        className={`
                flex flex-col gap-1 
                shadow-md
                items-left p-2 w-full max-w-[250px] rounded-md
                hover:shadow-md transition-shadow duration-300 hover:cursor-pointer
                overflow-hidden
                `}
      >
        <Link href={`/catalog/detail/${title}`}>
          <Image
            src={imageSrc ?? gearIcon}
            alt={title}
            width={150}
            height={150}
            className={`
                    object-contain rounded-l-md h-[150px] m-[0_auto]
                `}
          />
          <div className="font-semibold text-md text-[#171717] min-w-0 truncate ">{title}</div>
          <div
            className="
                            text-[#3b79d5] text-sm leading-none line-clamp-2 min-h-[calc(2*0.95rem)] hit-highlight
                            hover:text-[#3b79d5]
                            "
          >
            {description}
          </div>
          <div className="text-[#737373] text-sm flex items-center gap-1 whitespace-nowrap min-w-0 truncate">
            {" "}
            {<RaitingItemCard count={4} />}- {t("raiting.views", { count: 0 })}
          </div>
        </Link>
        <div
          className={
            "flex flex-col justify-between items-center gap-2 mt-1 w-full"
          }
        >
          <div className="relative flex w-full items-center justify-between gap-1">
            {oldPrice && (
              <div
                className={`text-[#171717] text-xs font-extrabold whitespace-nowrap ${oldPrice ? "line-through text-gray-500 text-xs" : ""}`}
              >
                {oldPrice.toFixed(2)} ₴
              </div>
            )}
            <span className="text-red-500 text-lg font-bold -top-3 -left-5  w-full relative whitespace-nowrap flex justify-end">
              {price.toFixed(2)} ₴
            </span>
          </div>
          <div className="flex w-full min-h-[30px]">
            <ProductAvailabilityList
              onClick={(statusDelivery: string) =>
                              handleAddToCart({
                                itemNo: item.itemNo,
                                title: item.brand,
                                price: item.price,
                                imageUrl: item.firstPic,
                                quantity: 1,
                                statusDelivery,
                              })
                            }
              stock={item.stock}
              showOnlyFirst={true}
              setIsAvailable={setIsAvailable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
