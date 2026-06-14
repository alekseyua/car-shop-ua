'use client';

import { ResponseCatalogItem, ResponseTopProduct } from '@/src/entities/catalog/api/dto';
import { useCatalogStore } from '@/src/entities/catalog/model/store';
import React, { useEffect } from 'react'
import TopProductTable from './TopProductTable';

const TopProductLayout = () => {
    const { listTopProducts, getListTopProducts }: { listTopProducts: ResponseTopProduct[]; getListTopProducts: () => Promise<ResponseTopProduct> } = useCatalogStore();
    useEffect(() => {
        getListTopProducts();
    }, []);
    console.log(listTopProducts, 'listTopProducts');
  return (
    <TopProductTable listTopProducts={listTopProducts} />
  )
}

export default TopProductLayout