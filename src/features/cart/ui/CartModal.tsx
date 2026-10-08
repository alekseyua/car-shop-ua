import React from 'react'
import CartTable from './CartTable'
import useModal from '@/src/hooks/use-modal';
import { useRouter } from '@/src/i18n/navigation';
import Loading from '@/src/shared/ui/loading/Loading';
import { Container } from '@/src/shared/ui/layout/Container/Container';
import Image from 'next/image';
import iconEmptyTrash from '../../../shared/assets/icons/iconEmptyTrash.svg';
import { useCartStore } from '@/src/entities/cart/model/cart.store';

const CartModal = () => {
  const { closeModal } = useModal();
  const isLoading = useCartStore((s) => s.isLoading);
  const cartItems = useCartStore((s) => s.cartItems);

  const route = useRouter();
  const listCart = cartItems;

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
    <div className="relative">
      {isLoading && (
        <div className="absolute w-full h-full bg-gray-900/30 z-999 flex items-center justify-center pr-4">
          <Loading size={60} />
        </div>
      )}
      <CartTable />
      <div className="h-[1px] w-full bg-gray-300 mt-5 mb-5"></div>
      <div className="flex justify-between gap-4">
        {/* continue shopping */}
        <button
          onClick={closeModal}
          className="
                                  w-full
                                  max-w-sm
                                  h-14
                                  mt-8
                                  bg-transparent
                                  text-black
                                  border
                                  rounded-lg
                                  font-semibold
                                  "
        >
          Продовжити покупки
        </button>
        {/* place an order */}
        <button
          onClick={() => {
            route.push("/order");
            closeModal();
          }}
          className="
                                  max-w-sm
                                  w-full
                                  h-14
                                  mt-8
                                  bg-red-600
                                  text-white
                                  rounded-lg
                                  font-semibold
                                  "
        >
           Оформити замовлення
        </button>
      </div>
    </div>
  );
}

export default CartModal