'use client';

import { ResponseCatalogItem } from '@/src/entities/catalog/api/dto';
import { useCatalogStore } from '@/src/entities/catalog/model/store';
import React, { useEffect } from 'react'

const TopProduct = () => {
    const { listTopProducts, getListTopProducts }: { listTopProducts: ResponseCatalogItem[]; getListTopProducts: () => void } = useCatalogStore();
    useEffect(() => {
        getListTopProducts();
    }, []);
    console.log(listTopProducts, 'listTopProducts');
  return (
    <div>TopProduct</div>
  )
}

export default TopProduct