import React from 'react'
import OrderTable from './OrderTable'
import { Container } from '@/src/shared/ui/layout/Container/Container'
import CheckoutForm from '@/src/widgets/checkout-form/ui/CheckoutForm'

const OrderLayout = () => {
    return (
        // <Container className='bg-white'>
        <Container className="flex flex-col h-full p-[0] flex-[1_1_0] bg-white">

            <h1 className='text-center text-black w-full text-[46px] font-bold'>{'Оформлення замовлення'}</h1>
            <div className='grid grid-cols-[1fr_1fr]'>
                {/* left side */}
                <CheckoutForm />
                {/* right side */}
                <OrderTable />
            </div>
        </Container>
    )
}

export default OrderLayout