"use client";
import {
  BreadcrumbItem,
  useBreadcrumbStore,
} from "@/src/shared/stores/breadcrumbs/breadcrumbs.store";
import { DeliveryPayContent } from "@/src/widgets/info/delivery-pay/ui/DeliveryPayContent";
import { DeliveryPaySidebar } from "@/src/widgets/info/delivery-pay/ui/DeliveryPaySidebar";
import { useEffect } from "react";

export default function DeliveryPaymentPage() {
  const { setBreadcrumbItems, resetBreadcrumbItems } = useBreadcrumbStore();
  useEffect(() => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        title: "Отримання і оплата",
        href: "",
      },
    ];
    setBreadcrumbItems(breadcrumbs);
    return () => resetBreadcrumbItems();
  }, [setBreadcrumbItems, resetBreadcrumbItems]);
  return (
    <div className="p-3 sm:p-4">
      <h1 className="text-lg font-bold sm:text-xl">Отримання і оплата</h1>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <DeliveryPaySidebar />
        </aside>

        <main className="min-w-0">
          <DeliveryPayContent />
        </main>
      </div>
    </div>
  );
}
