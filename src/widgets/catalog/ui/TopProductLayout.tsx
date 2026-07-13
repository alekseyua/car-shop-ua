'use client';

import { ResponseTopProduct } from '@/src/entities/catalog/api/dto';
import TopProductTable from './TopProductTable';
import { getTopProducts } from '@/src/entities/catalog/api/catalog.service';
import { useEffect, useState } from 'react';

const TopProductLayout = () => {
  const [topProducts, setTopProducts] = useState < ResponseTopProduct[]>([]);
  useEffect(()=>{
    const fetchData = async () => {
      const response = await getTopProducts();
      setTopProducts(response);
    }
    fetchData();
  }, [getTopProducts, setTopProducts])
  return (
    <TopProductTable listTopProducts={topProducts} />
  )
}

export default TopProductLayout