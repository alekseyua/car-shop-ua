import WarrantyAndReturn from '@/src/pagesContent/warranty-return/WarrantyInfo';
import { Container } from '@/src/shared/ui/layout/Container/Container';

const Warranty = () => {
  
  return (
    <Container
      className="bg-white mx-auto flex w-full max-w-7xl flex-1 flex-col"
      noPadding
    >
      <WarrantyAndReturn />
    </Container>
  );
}

export default Warranty;