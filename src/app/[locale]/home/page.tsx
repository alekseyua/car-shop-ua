
import CatalogLayoutAccessories from "@/src/widgets/catalogAccessories/ui/CatalogLayoutAccessories";
import VehicleFilters from "../../../features/vehicleFilters/ui/VehicleFilters";
import { Container } from "../../../shared/ui/layout/Container/Container";
import CatalogLayout from "../../../widgets/catalog/ui/CatalogLayout";

export default function Home() {
  

  return (
    <Container className="flex flex-col h-full p-[0]  min-h-screen">
      {/* <div className="sticky top-0 z-50 flex flex-col items-start justify-start gap-4 bg-[#f2f4f3] w-full h-full py-[17px] px-[20px]">
        <VehicleFilters />
      </div> */}
      <CatalogLayout />
    </Container>
  );
}
