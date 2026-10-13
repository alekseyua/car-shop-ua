import DeliveryPaymentPage from '@/src/pagesContent/delivery-payment/DeliveryPaymentPage';
import { Container } from '@/src/shared/ui/layout/Container/Container';
import { useTranslations } from 'next-intl';
import React from 'react'

const Delivery = () => {
  const t = useTranslations('Header');

  return (
    <Container className="bg-white" noPadding>

      <DeliveryPaymentPage />
    </Container>
  )
}

export default Delivery