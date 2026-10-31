import React from 'react'
import TableCatalogAccessories from '../../../features/catalogAccessories/ui/TableCatalogAccessories'
import { Container } from '@/src/shared/ui/layout/Container/Container'

const CatalogLayoutAccessories = () => {
  return (
    <Container className="flex flex-col h-full min-h-screen" noPadding>
      <TableCatalogAccessories />
    </Container>
  )
}

export default CatalogLayoutAccessories