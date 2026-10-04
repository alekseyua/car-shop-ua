'use client';

import { useAccessoriesStore } from '@/src/entities/catalogAccessories/model/accessories.store';
import { ProductAccessories } from '@/src/entities/catalogAccessories/model/accessories.type';
import { getOldPrice } from '@/src/shared/libs/helpers';
import { BreadcrumbItem, useBreadcrumbStore } from '@/src/shared/stores/breadcrumbs/breadcrumbs.store';
import CardPreview from '@/src/shared/ui/Card/CardPreview';
import CardPreviewSkeleton from '@/src/shared/ui/Card/CardPreviewSkeleton';
import { Pagination } from '@/src/shared/ui/Pagination/Pagination';
import React from 'react';
import { useEffect } from 'react';

const TableCatalogAccessories = () => {
  const {
    catalogAccessories,
    page,
    total,
    totalPages,
    isLoading,
    nextPage,
    prevPage,
    goToPage,
    showMore,
    resetCategoryId,
  } = useAccessoriesStore();

  const {setBreadcrumbItems, resetBreadcrumbItems } = useBreadcrumbStore();
  // if (isLoading) {
  //   return (<div> loading ....</div>)
  // }

  
  useEffect(()=>{
    const breadcrumbs:BreadcrumbItem[] = [
      {
        title: 'Accessories',
        href: ''
      }
    ]
    setBreadcrumbItems(breadcrumbs)
    return () => resetBreadcrumbItems();
  }, [setBreadcrumbItems, resetBreadcrumbItems]);

    return (
      <div className="w-full">
        <div
          className="
                        w-full 
                        bg-white 
                        grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3
                        justify-items-center
                        "
        >
          {isLoading ? (
            <React.Fragment>
              {Array.from({ length: 12 }).map((el, i) => (
                <CardPreviewSkeleton key={i} />
              ))}
            </React.Fragment>
          ) : (
            catalogAccessories.map((item: ProductAccessories) => (
              <CardPreview
                key={item.itemNo}
                imageSrc={"https://img2.ad.ua/imgs/" + item.firstPic}
                title={item.itemNo}
                description={item.description}
                rating={4} // Placeholder rating
                price={item.price}
                oldPrice={item.inStock ? getOldPrice(item.price) : undefined}
                item={item as ProductAccessories}
              />
            ))
          )}
        </div>
        <div className=" mt-4">
          <Pagination
            page={page}
            total={total}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            goToPage={goToPage}
            showMore={showMore}
          />
        </div>
      </div>
    );
}

export default TableCatalogAccessories