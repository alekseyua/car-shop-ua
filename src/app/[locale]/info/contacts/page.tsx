import { Container } from '@/src/shared/ui/layout/Container/Container';
import { useTranslations } from 'next-intl';
import React from 'react'

const Contacts = () => {
  const t = useTranslations('Header');
  
  return (
    <Container className="">
      {t('Info.Contacts.title')}
    </Container>
  )
}

export default Contacts;