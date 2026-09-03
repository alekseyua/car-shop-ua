import React from 'react'
import iconBackground from '../../../../public/images/header-background.webp';
import Image from 'next/image';
import { Container } from '../../../shared/ui/layout/Container/Container';
import LanguageSwitcher from '@/src/components/i18n/languageSwitcher/ui/LanguageSwitcher';
import TopNav from '@/src/components/navigation/TopNav';
import Logo from '@/src/shared/ui/logo/Logo';
import Contacts from '@/src/shared/ui/contacts/Contacts';
import VinRequestButton from '@/src/features/vin-request/ui/VinRequestButton';
import SearchButton from '@/src/features/search/ui/SearchButton';
import CartHeader from '@/src/features/cart/ui/CartHeader';
import GarageButton from '@/src/features/garage/ui/GarageButton';

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

      <Container className="flex flex-col gap-3 px-[15px] pt-[5px] pb-[10px]">
        <div className="hidden w-full justify-between mb-2 sm:flex">
          <LanguageSwitcher />
          <TopNav />
        </div>
        <div className="flex w-full gap-5 items-center justify-between mb-2">
          <Logo />
          <Contacts />
          <div className='sm:flex hidden gap-3'>
            <VinRequestButton />
            <GarageButton colorIcon='white'/>
            <CartHeader colorIcon='white'/>
          </div>
        </div>
        {/* <NavMenu /> */}
      </Container>
    </div>
  );
}

export default Header