"use client";

import { FormProvider, useForm } from "react-hook-form";
import ContactFields from "./ContactFields";
import CitySelect from "./CitySelect";
import DeliveryMethod from "./DeliveryMethod";
import CommentBox from "./CommentBox";
import VinCheck from "./VinCheck";
import { CheckoutFormValues } from "../model/checkout.types";
import { useCreateOrder } from "@/src/features/order/model/useCreateOrder";
import { useCheckoutStore } from "../model/checkout.store";
import { ApiResult } from "@/src/shared/api/client";
import { ResponseOrder } from "@/src/features/order/api/response.dto";
import { useRouter } from "@/src/i18n/navigation";
import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";


export default function CheckoutForm() {
  const { submit } = useCreateOrder();
  const router = useRouter();
  const { deliveryMethod, deliveryCityRef } = useCheckoutStore();
  const cartItems = useCartStore((state) => state.cartItems);
  const guestItems = useCartStore((state) => state.guestItems);
  const user = useAuthStore((s) => s.user);
  const clearCart = useCartStore((s) => s.clearCart);

  const listCart = cartItems;
  // const listCart = user ? cartItems : guestItems;
  const methods = useForm<CheckoutFormValues>({
    defaultValues: {
      deliveryCity: "",
      deliveryPhone: "",
      deliveryEmail: "",
      deliveryLastname: "",
      deliveryFirstname: "",
      deliveryMiddlename: "",
      deliveryComment: "",
      deliveryVin: "",
      deliveryPoint: "",
      deliveryPointRef: "",
      deliveryStreet: "",
      deliveryHouse: "",
      deliveryApartment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const response: ApiResult<ResponseOrder> = await submit({
        ...data,
        deliveryMethod,
        deliveryCityRef,
      });
      if (response.ok) {
        const { orderNumber } = response.data;
        if (orderNumber) {
          router.push("/");
          clearCart();
        }
      } else {
        console.error("Error creating order: ", response.status);
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="
                      max-w-4xl
                      mx-auto
                      bg-white
                      p-6
                      rounded-xl
                      "
      >
        <ContactFields />
        <div className="border-t my-8" />
        <CitySelect />
        <div className="border-t my-8" />
        <DeliveryMethod />
        <CommentBox />
        <VinCheck />
        {!!listCart.length && (
          <button
            type="submit"
            className="
                                  w-full
                                  h-14
                                  mt-8
                                  bg-red-600
                                  text-white
                                  rounded-lg
                                  font-semibold
                                  "
          >
            Замовлення підтверджую
          </button>
        )}
      </form>
    </FormProvider>
  );
}
