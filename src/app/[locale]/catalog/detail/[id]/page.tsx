import { Container } from "@/src/shared/ui/layout/Container/Container";
import ProductDetailLayout from "@/src/widgets/product-detail/ui/ProductDetailLayout";

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
      <ProductDetailLayout itemNo={id} />
    </Container>
  );
}
      //https://ecom.ad.ua/api/Items/ItemCard
      // POST ASH MA-33121