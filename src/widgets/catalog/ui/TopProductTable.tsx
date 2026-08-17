'use Client';

import { ResponseTopProduct } from '@/src/entities/catalog/api/dto'
import { useCatalogStore } from '@/src/entities/catalog/model/catalog.store';
import CardPreview from '@/src/shared/ui/Card/CardPreview'
import { useEffect } from 'react';

const   TopProductTable = () => {
  const { listTopProducts, getTopProduct } = useCatalogStore();
  useEffect(() => {getTopProduct();}, [getTopProduct]);
  return (
      <div className="grid gap-4 grid-cols-4 bg-white w-full h-full py-[17px] px-[20px]">

      {listTopProducts.map((item: ResponseTopProduct) => (
        // <div key={product.itemNo}>{product.brand}</div>
          <CardPreview
              key={item.itemNo}
              imageSrc={'https://img2.ad.ua/imgs/' + item.firstPic}
              title={item.itemNo}
              description={item.description}
              rating={4} // Placeholder rating
              price={item.price}
              oldPrice={item.retail !== item.price ? item.retail : undefined}
              item={item}
          />
      ))}
    </div>
  )
}

export default TopProductTable