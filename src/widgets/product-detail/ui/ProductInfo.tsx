import { useProductDetailStore } from '@/src/entities/product-detail/model/store';
import { CriteriaItem, ProductDetail, ProductDetailResponse } from '@/src/entities/product-detail/model/types';
import { handleAddToCart } from '@/src/features/cart/model/actions';
import ProductAvailabilityStatus from '@/src/shared/ui/status/ProductAvailabilityStatus';
import { useTranslations } from 'next-intl';
import React from 'react'

const ProductInfo = () => {
    const { product, isLoading }:{ product: ProductDetailResponse | null, isLoading: boolean } = useProductDetailStore();
    const t = useTranslations("catalog");
  return (
    <div>
      {isLoading ? (
        <div> loading .....</div>
      ) : (
        <div className="flex flex-col gap-2 p-4 border-l w-full h-full">
          <h1 className="text-2xl font-bold mb-4 text-black text-center">
            {product?.item.description}
          </h1>
          {/* description product */}
            {!!product?.item.criterias.length || !!product?.item?.searchDescription ? (
            <div className="flex flex-col text-black">
                {!!product?.item.criterias.length  && <h2 className="text-xl font-semibold mb-2 text-black">
                {t("characteristics")}
              </h2>}
              {product?.item.criterias.map(
                (desc: CriteriaItem, index: number) => (
                  <div className="flex gap-4 " key={desc.itemNo + "_" + index}>
                    <div className="text-zinc-500">{desc.criteria}</div>
                    <div className="text-black">{desc.value}</div>
                  </div>
                ),
              )}
                {!!product?.item?.searchDescription  && (
                  <>
                    <h2 className="text-xl font-semibold mb-2 text-black"> 
                      {t("add-characteristics")}
                    </h2>
                  <p>{product.item.searchDescription}</p>
                  </>
                )}
            </div>
          ) : (
            <div className="text-lg text-start text-black">
              {t("descriptionNotLook")}
            </div>
          )}
          <div className="border rounded-md p-4 mt-4 bg-yellow-50">
            <p className="text-lg text-gray-700 mb-2">
              <span> {t('price')}: </span>
              <span className='font-bold'>{product?.item.price}</span>
              <span> UAH </span>
            </p>
            {product?.item?.stock.length && (
              <p className="text-lg text-gray-500 mb-2">
                {t("available")}:
                <div className="flex flex-col gap-1">
                  {product.item.stock.map((item, index: number) => (
                    <div key={index}>
                     {item.statusDelivery !== "notAvailable" && <ProductAvailabilityStatus
                        status={item.statusDelivery}
                        count={item.quantity}
                        onClick={() => handleAddToCart(product?.item as ProductDetail)}
                      />}
                    </div>
                  ))}
                </div>
              </p>
            )}
          </div>
           {/* Additional product info can be added here */}
        </div>
      )}
    </div>
  );
}

export default ProductInfo