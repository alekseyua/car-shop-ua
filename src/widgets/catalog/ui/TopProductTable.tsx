'use Client';

import { ResponseTopProduct } from '@/src/entities/catalog/api/dto'
import { useCatalogStore } from '@/src/entities/catalog/model/catalog.store';
import CardPreview from '@/src/shared/ui/Card/CardPreview'
import CardPreviewSkeleton from '@/src/shared/ui/Card/CardPreviewSkeleton';
import React from 'react';
import { useEffect } from 'react';

const   TopProductTable = () => {
  const {
    listTopProducts,
    getTopProduct,
    isLoadingTopProducts,
    topProductsError,
  } = useCatalogStore();
  useEffect(() => {getTopProduct();}, [getTopProduct]);
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] bg-white w-full h-full py-[17px] px-[20px]">
      {topProductsError && (
        <div className="text-red-500">{topProductsError}</div>
      )}
      {isLoadingTopProducts ? ( 
        <React.Fragment>
          {Array.from({ length: 12 }).map((el, i) => (
            <CardPreviewSkeleton key={i} />
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {listTopProducts.map((item: ResponseTopProduct) => (
            // <div key={product.itemNo}>{product.brand}</div>
            <CardPreview
              key={item.itemNo}
              imageSrc={"https://img2.ad.ua/imgs/" + item.firstPic}
              title={item.itemNo}
              description={item.description}
              rating={4} // Placeholder rating
              price={item.price}
              oldPrice={item.retail !== item.price ? item.retail : undefined}
              item={item}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

export default TopProductTable