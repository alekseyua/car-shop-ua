import React from 'react'
import bgc from '../../../../../public/images/header-background.webp';
import Image from 'next/image';
import { Container } from '../../../shared/ui/layout/Container/Container';
import LanguageSwitcher from '@/src/app/components/i18n/languageSwitcher/ui/LanguageSwitcher';
import TopNav from '@/src/app/components/navigation/TopNav';
import Logo from '@/src/app/shared/ui/logo/Logo';
import Contacts from '@/src/app/shared/ui/contacts/Contacts';
import VinRequestButton from '@/src/app/fuetures/vin-request/ui/VinRequestButton';
import SearchButton from '@/src/app/fuetures/search/ui/SearchButton';
import CartHeader from '@/src/app/fuetures/cartHeader/ui/CartHeader';
import NavMenu from './NavMenu';

const Header = () => {
  return (
    <div
        className='flex items-center justify-center flex-col relative'
    >
          <Image src={bgc} alt='header background' className='w-full h-full object-cover absolute inset-0 -z-10' fill priority />

        <Container className='flex flex-col gap-3 px-[15px] pt-[5px] pb-[10px]'>
            <div className='flex w-full justify-between mb-2'>
                <LanguageSwitcher />
                <TopNav />
                  
            </div>
            <div className='flex w-full gap-5 items-center justify-between mb-2'>
                <Logo />
                <Contacts />
                <VinRequestButton />
                <SearchButton />
                <CartHeader />    
            </div>
            {/* <NavMenu /> */}
        </Container>
    
    </div>
  )
}

export default Header