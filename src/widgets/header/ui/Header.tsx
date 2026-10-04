import React from 'react'
import iconBackground from '../../../../public/images/header-background.webp';
import Image from 'next/image';
import { Container } from '../../../shared/ui/layout/Container/Container';
import TopNav from '@/src/components/navigation/TopNav';
import Logo from '@/src/shared/ui/logo/Logo';
import Contacts from '@/src/shared/ui/contacts/Contacts';
import VinRequestButton from '@/src/features/vin-request/ui/VinRequestButton';
import GarageButton from '@/src/features/garage/ui/GarageButton';
import FavoriteButton from '@/src/features/favorite/ui/FavoriteButton';
import CartHeader from '@/src/features/cart/ui/CartHeader';

const Header = () => {
  return (
    <div className="flex items-center justify-center flex-col relative">
      <Image
        src={iconBackground}
        alt="header background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        fill
        sizes="100vw"
        priority
      />

      <Container className="flex flex-col gap-1 px-[15px] pt-[5px]" noPadding>
        <div className="relative hidden w-full justify-between sm:flex">
          {/* <LanguageSwitcher /> */}
        </div>
        <div className="flex w-full gap-5 items-center justify-between mb-2">
          <div className='flex flex-row w-full items-center gap-3 sm:justify-start justify-between'>
            <Logo />
            <Contacts />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <TopNav />
            <div className='sm:flex hidden gap-3 w-full justify-end'>
              <VinRequestButton />
              <GarageButton colorIcon='white'/>
              <FavoriteButton />
              <CartHeader colorIcon='white'/>
            </div>
          </div>
        </div>
        {/* <NavMenu /> */}
      </Container>
    </div>
  );
}

export default Header