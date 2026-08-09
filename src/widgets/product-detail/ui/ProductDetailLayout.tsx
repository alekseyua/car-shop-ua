'use client'

import React, { useEffect } from 'react'
import ProductDetail from './ProductDetail'
import ProductInfo from './ProductInfo'
import { useProductDetailStore } from '@/src/entities/product-detail/model/store'
import ProductReplace from './ProductReplace'

const ProductDetailLayout = ({ itemNo }: { itemNo: string }) => {
    const { getProduct } = useProductDetailStore();

    useEffect(() => {
      getProduct(itemNo);
    }, [itemNo, getProduct]);

  return (
    <div>

    <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 bg-white w-full h-full">
        <ProductDetail />
        <ProductInfo />
    </div>
    <ProductReplace />
    </div>
  )
}

export default ProductDetailLayout