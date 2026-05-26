'use client'

import React, { useEffect } from 'react'
import ProductDetail from './ProductDetail'
import ProductInfo from './ProductInfo'
import { useProductDetailStore } from '@/src/app/entities/product-detail/model/store'

const ProductDetailLayout = ({ productId }: { productId: string }) => {
    const { getProduct } = useProductDetailStore();

    useEffect(() => {
      getProduct(productId);
    }, [productId, getProduct]);

  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 bg-white w-full h-full">
        <ProductDetail />
        <ProductInfo />
    </div>
  )
}

export default ProductDetailLayout