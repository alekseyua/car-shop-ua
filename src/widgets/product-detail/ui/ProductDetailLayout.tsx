"use client";

import React, { useEffect } from "react";
import ProductImageDetail from "./ProductImageDetail";
import ProductInfo from "./ProductInfo";
import { useProductDetailStore } from "@/src/entities/product-detail/model/detail.store";
import ProductReplace from "./ProductReplace";
import ProductDetailLayoutSkeleton from "./ProductDetailLayoutSkeleton";

const ProductDetailLayout = ({ itemNo }: { itemNo: string }) => {
  const { getProduct, error, isLoading } = useProductDetailStore();

  useEffect(() => {
    getProduct(itemNo);
  }, [itemNo, getProduct]);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }
  return (
    <div className="min-h-[calc(100vh-151px)] bg-white">
      {isLoading ? (
        <ProductDetailLayoutSkeleton />
      ) : (
        <div className="
        grid grid-cols-1
        md:grid-cols-[1.1fr_0.9fr]
        gap-4 bg-white w-full items-stretch ">
          <ProductImageDetail />
          <ProductInfo />
        </div>
      )}
      <ProductReplace />
    </div>
  );
};

export default ProductDetailLayout;
