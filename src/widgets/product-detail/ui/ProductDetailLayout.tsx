"use client";

import React, { useEffect } from "react";
import ProductImageDetail from "./ProductImageDetail";
import ProductInfo from "./ProductInfo";
import { useProductDetailStore } from "@/src/entities/product-detail/model/detail.store";
import ProductReplace from "./ProductReplace";
import ProductDetailLayoutSkeleton from "./ProductDetailLayoutSkeleton";
import { useBreadcrumbStore } from "@/src/shared/stores/breadcrumbs/breadcrumbs.store";
import { useVehicleFiltersStore } from "@/src/features/vehicleFilters/model/vehicle.store";

const ProductDetailLayout = ({ itemNo }: { itemNo: string }) => {
  const { getProduct, error, isLoading } = useProductDetailStore();
  const { activeModification } =
        useVehicleFiltersStore();
const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbItems);
  const { product } = useProductDetailStore();

useEffect(() => {
  const listBreadcrumbs = [
    {
      title: "Деталі товару",
      href: "",
    },
    {
      title: product?.item.brand ?? "",
    },
  ];
  if (activeModification) {
    listBreadcrumbs.unshift({
      title: "Каталог",
      href: "/catalog",
    });
  }
  setBreadcrumbs(listBreadcrumbs);

  return () => {
    useBreadcrumbStore.getState().resetBreadcrumbItems();
  };
}, [product, setBreadcrumbs, activeModification]);

  useEffect(() => {
    getProduct(itemNo);
  }, [itemNo, getProduct]);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }
  console.log({isLoading})
  return (
    <div className="min-h-[calc(100vh-151px)] bg-white">
      {isLoading ? (
        <ProductDetailLayoutSkeleton />
      ) : (
        <div
          className="
        grid grid-cols-1
        md:grid-cols-[1fr_1fr]
        gap-4 bg-white w-full items-stretch "
        >
          <ProductImageDetail />
          <ProductInfo />
        </div>
      )}
      <ProductReplace />
    </div>
  );
};

export default ProductDetailLayout;
