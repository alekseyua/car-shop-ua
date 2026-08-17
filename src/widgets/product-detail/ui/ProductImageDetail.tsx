import { useProductDetailStore } from "@/src/entities/product-detail/model/store";
import { ProductDetailResponse } from "@/src/entities/product-detail/model/types";
import { normolizeImagePath } from "@/src/shared/libs/helpers";
import Image from "next/image";
import React from "react";
//                        tcd/4686_pic/pr23010185.JPG
//https://img2.ad.ua/imgs/tcd-pic/4686_pic/pr23010185.JPG
const ProductImageDetail = () => {
  const {
    product,
  }: { product: ProductDetailResponse | null; isLoading: boolean } =
    useProductDetailStore();
  const imagePath: string | null = product?.item?.firstPic
    ? normolizeImagePath(product?.item.firstPic)
    : null;

  return (
    <div>
      {imagePath && (
        <Image
          src={"https://img2.ad.ua/imgs/" + imagePath}
          alt={imagePath.split("/").pop() ?? "Product Image"}
          width={500}
          height={500}
          loading="eager"
          className="object-contain w-[500px] h-[500px]"
        />
      )}
    </div>
  );
};

export default ProductImageDetail;
