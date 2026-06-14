import { Container } from '@/src/shared/ui/layout/Container/Container';
import { useTranslations } from 'next-intl';
import React from 'react'

const Delivery = () => {
  const t = useTranslations('Header');

  return (
    <Container className="">

      <div>{t('Info.Delivery.title')}</div>
    </Container>
  )
}

export default Delivery