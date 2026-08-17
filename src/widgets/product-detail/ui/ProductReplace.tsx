'use client';

import { useProductDetailStore } from '@/src/entities/product-detail/model/store';
import { ProductImageDetail, ProductDetailResponse } from '@/src/entities/product-detail/model/types';
import CardPreview from '@/src/shared/ui/Card/CardPreview';
import { useTranslations } from 'next-intl';

const ProductReplace = () => {
    const { product, isLoading }: { product: ProductDetailResponse | null, isLoading: boolean } = useProductDetailStore();
    const t = useTranslations('catalog');
    if (!product) return null;
    console.log({product})
    return (
        <div>
            { !!product.replaces.length && 
            <div>
            <h2 className='text-2xl font-bold mb-4 pt-2 text-black'>{t('replaces')}</h2>
            <div className="
                w-full 
                bg-white 
                grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3
                justify-items-center
            ">
                {product && product.replaces.map((item: ProductImageDetail) => {
                    return  <CardPreview
                        key={item.itemNo}
                        imageSrc={'https://img2.ad.ua/imgs/' + item.firstPic}
                        title={item.itemNo}
                        description={item.description}
                        rating={4} // Placeholder rating
                        price={item.price}
                        oldPrice={item.retail !== item.price ? item.retail : undefined}
                        item={item}
                    />
                })}
            </div>
            </div>
            }
        </div>
    )
}

export default ProductReplace