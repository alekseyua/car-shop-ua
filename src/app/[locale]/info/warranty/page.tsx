import { Container } from '@/src/app/shared/ui/layout/Container/Container';
import { useTranslations } from 'next-intl';
import React from 'react'

const Warranty = () => {
  const t = useTranslations('Header');
  
  return (
    <Container className="">
      {t('Info.Warranty.title')}
    </Container>
  )
}

export default Warranty;