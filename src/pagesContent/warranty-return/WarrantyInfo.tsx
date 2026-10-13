"use client";
import {
  BreadcrumbItem,
  useBreadcrumbStore,
} from "@/src/shared/stores/breadcrumbs/breadcrumbs.store";
import WarrantyReturn from "@/src/widgets/info/warranty-return/ui/WarrantyReturn";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const WarrantyAndReturn = () => {
  const t = useTranslations("Header");
  const { setBreadcrumbItems, resetBreadcrumbItems } = useBreadcrumbStore();
  useEffect(() => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        title: t("Info.Warranty.title"),
        href: "",
      },
    ];
    setBreadcrumbItems(breadcrumbs);
    return () => resetBreadcrumbItems();
  }, [setBreadcrumbItems, resetBreadcrumbItems, t]);

  return (
    <div className="p-3 sm:p-4 flex flex-col flex-1">
      <h1 className="text-lg font-bold sm:text-xl">
        {t("Info.Warranty.title")}
      </h1>
      <div className="mt-4 w-full flex-1">
        <WarrantyReturn />
      </div>
    </div>
  );
};

export default WarrantyAndReturn;
