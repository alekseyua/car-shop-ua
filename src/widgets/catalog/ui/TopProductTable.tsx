import { ResponseTopProduct } from '@/src/entities/catalog/api/dto'
import CardPreview from '@/src/shared/ui/Card/CardPreview'
import React from 'react'

const   TopProductTable = ({ listTopProducts }: { listTopProducts: ResponseTopProduct[] }) => {
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