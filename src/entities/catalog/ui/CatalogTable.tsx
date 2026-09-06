import { ResponseCatalogItem } from "@/src/entities/catalog/api/dto";
import { useCatalogStore } from "@/src/entities/catalog/model/catalog.store";
import { useTranslations } from "next-intl";
import CardPreview from "@/src/shared/ui/Card/CardPreview";
import CardPreviewSkeleton from "@/src/shared/ui/Card/CardPreviewSkeleton";
import React from "react";
import { getOldPrice } from "@/src/shared/libs/helpers";

const CatalogTable = () => {
  const {
    listItemsCatalog,
    isLoadingItemsCatalog,
    itemsCatalogError,
  } = useCatalogStore();
  const t = useTranslations();

  return (
    <div className="block w-full">
      {listItemsCatalog.length > 0 ? (
        <div
          className="
                        w-full 
                        bg-white 
                        grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3
                        justify-items-center
                        "
        >
          {itemsCatalogError && (
            <div className="text-red-500">{itemsCatalogError}</div>
          )}
          {isLoadingItemsCatalog ? (
            <React.Fragment>
              {Array.from({ length: 12 }).map((el, i) => (
                <CardPreviewSkeleton key={i} />
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {listItemsCatalog.map((item: ResponseCatalogItem) => (
                <CardPreview
                  key={item.itemNo}
                  imageSrc={"https://img2.ad.ua/imgs/" + item.firstPic}
                  title={item.itemNo}
                  description={item.description}
                  rating={4} // Placeholder rating
                  price={item.price}
                  oldPrice={item.inStock ? getOldPrice(item.price) : undefined}
                  item={item as ResponseCatalogItem}
                />
              ))}
            </React.Fragment>
          )}
        </div>
      ) : (
        <p>{t("card.notProduct")}</p>
      )}
    </div>
  );
};

export default CatalogTable;
