'use client'
import OrderTable from './OrderTable'
import { Container } from '@/src/shared/ui/layout/Container/Container'
import CheckoutForm from '@/src/widgets/checkout-form/ui/CheckoutForm'
import Image from "next/image";
import iconEmptyTrash from "../../../shared/assets/icons/iconEmptyTrash.svg";
import { useCartStore } from '../../cart/model/cart.store';

const OrderLayout = () => {
      const { cartItems } = useCartStore();
    
     if (!cartItems.length) {
        return (
          <Container className="flex flex-col min-h-[calc(100dvh-270px)] justify-center  p-[0] flex-[1_1_0] bg-white">
            <div className="flex flex-col w-full h-full justify-center items-center mb-10">
              <Image
                src={iconEmptyTrash}
                alt="empty trash"
                className="w-40 h-40"
              />
              <h3>Кошик порожній :(</h3>
              <span>Але це ніколи не складно виправити 😉</span>
            </div>
          </Container>
        );
      }
    return (
        // <Container className='bg-white'>
        <Container className="flex flex-col h-full p-[0] flex-[1_1_0] bg-white">

            <h1 className='text-center text-black w-full text-3xl font-bold mt-4'>{'Оформлення замовлення'}</h1>
            <div className='grid 
            grid-cols-1
            md:grid-cols-[1fr_1fr] '>
                {/* left side */}
                <CheckoutForm />
                {/* right side */}
                <OrderTable />
            </div>
        </Container>
    )
}

export default OrderLayout