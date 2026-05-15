import { Container } from "@/src/app/shared/ui/layout/Container/Container";
import ProductDetailLayout from "@/src/app/widgets/product-detail/ui/ProductDetailLayout";

interface CatalogDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function CatalogDetailPage({
  params,
}: CatalogDetailPageProps) {
  const { locale, id } = await params;
  
  return (
    <Container className="bg-white w-full">
      <ProductDetailLayout productId={id} />
    </Container>
  );
}
      //https://ecom.ad.ua/api/Items/ItemCard
      // POST ASH MA-33121