import React from 'react'
import OrderTable from './OrderTable'
import { Container } from '@/src/shared/ui/layout/Container/Container'

const OrderLayout = () => {
    return (
        <Container className='bg-white'>
            <h1 className='text-center text-black w-full'>{'Оформлення замовлення'}</h1>
            <OrderTable />
        </Container>
    )
}

export default OrderLayout