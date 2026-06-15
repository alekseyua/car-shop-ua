import { ResponseTopProduct } from '@/src/entities/catalog/api/dto';
import TopProductTable from './TopProductTable';
import { getTopProducts } from '@/src/entities/catalog/api/catalog.service';

const TopProductLayout = async () => {
  const topProducts: ResponseTopProduct[] = await getTopProducts();
  return (
    <TopProductTable listTopProducts={topProducts} />
  )
}

export default TopProductLayout