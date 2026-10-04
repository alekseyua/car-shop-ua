"use client";
import { Container } from "@/src/shared/ui/layout/Container/Container";
import CheckoutForm from "@/src/widgets/checkout-form/ui/CheckoutForm";
import Image from "next/image";
import iconEmptyTrash from "../../../shared/assets/icons/iconEmptyTrash.svg";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumbStore } from "@/src/shared/stores/breadcrumbs/breadcrumbs.store";
import { useTranslations } from "next-intl";
import Loading from "@/src/shared/ui/loading/Loading";
import { useCartStore } from "@/src/entities/cart/model/cart.store";
import CartTable from "../../cart/ui/CartTable";
import { useAuthStore } from "../../auth-by-email/model/auth.store";

const OrderLayout = () => {
  const isLoading = useCartStore((s) => s.isLoading);
  const cartItems = useCartStore((state)=> state.cartItems);
  const guestItems = useCartStore((s) => s.guestItems);
  const user = useAuthStore(s=>s.user);
  const t = useTranslations("breadcrumb");
  const { setBreadcrumbItems, resetBreadcrumbItems } = useBreadcrumbStore();
  const listCart = user? cartItems : guestItems;
  useEffect(()=>{
    const itemsBreadcrumb: BreadcrumbItem[]= [
      {
        title: t('order'),
      }
    ];
    setBreadcrumbItems(itemsBreadcrumb);
    return () => resetBreadcrumbItems();
  },[setBreadcrumbItems, resetBreadcrumbItems, t]);

  if (!listCart.length) {
    return (
      <Container className="flex flex-col min-h-[calc(100dvh-270px)] justify-center  p-[0] flex-[1_1_0] bg-white">
        <div className="flex flex-col w-full h-full justify-center items-center mb-10">
          <Image src={iconEmptyTrash} alt="empty trash" className="w-40 h-40" />
          <h3>Кошик порожній :(</h3>
          <span>Але це ніколи не складно виправити 😉</span>
        </div>
      </Container>
    );
  }
  return (
    // <Container className='bg-white'>
    <Container
      className="relative flex flex-col h-full p-[0] flex-[1_1_0] bg-white"
      noPadding
    >
      {isLoading && (
        <div className="absolute w-full h-full bg-gray-900/30 z-999 flex items-center justify-center pr-4">
          <Loading size={60} />
        </div>
      )}
      <h1 className="text-center text-black w-full text-3xl font-bold mt-4">
        {"Оформлення замовлення"}
      </h1>
      <div
        className="grid 
                            grid-cols-1
                            lg:grid-cols-[1fr_1fr] "
      >
        {/* left side */}
        <div className="order-2 lg:order-1">
          <CheckoutForm />
        </div>
        {/* right side */}
        <div
          className=" order-1 
                lg:order-2 
            "
        >
          <CartTable />
        </div>
      </div>
    </Container>
  );
};

export default OrderLayout;
