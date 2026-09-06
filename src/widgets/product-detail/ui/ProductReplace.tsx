"use client";

import { useProductDetailStore } from "@/src/entities/product-detail/model/detail.store";
import {
  ProductItemDetail,
  ProductDetailResponse,
} from "@/src/entities/product-detail/model/detail.types";
import { getOldPrice } from "@/src/shared/libs/helpers";
import CardPreview from "@/src/shared/ui/Card/CardPreview";
import { useTranslations } from "next-intl";

const ProductReplace = () => {
  const {
    product,
    isLoading,
  }: { product: ProductDetailResponse | null; isLoading: boolean } =
    useProductDetailStore();
  const t = useTranslations("catalog");
  if (!product) return null;
  return (
    <div>
      {!!product.replaces.length && (
        <div>
          <h2 className="text-2xl font-bold mb-4 pt-2 text-black">
            {t("replaces")}
          </h2>
          <div
            className="
                w-full 
                bg-white 
                grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3
                justify-items-center
            "
          >
            {product &&
              product.replaces.map((item: ProductItemDetail) => {
                return (
                  <CardPreview
                    key={item.itemNo}
                    imageSrc={"https://img2.ad.ua/imgs/" + item.firstPic}
                    title={item.itemNo}
                    description={item.description}
                    rating={4} // Placeholder rating
                    price={item.price}
                    oldPrice={
                      item.inStock ? getOldPrice(item.price) : undefined
                    }
                    item={item as ProductItemDetail}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReplace;
