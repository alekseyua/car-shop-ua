'use client';

import useModal from '@/src/app/hooks/use-modal';
import { useTranslations } from 'next-intl';
import React from 'react'

const SearchButton = () => {
    const t = useTranslations('Header');
    const {openModal} = useModal();

  return (
    <div className='flex self-start'>
          <button 
            className='flex rounded-md border items-center pl-2 bg-[#f8f8f8] text-[#757575] min-w-[400px] w-[100%] justify-between'
            onClick={()=> openModal('search')}    
        >
            <div>
                {t('search.button.placeholder')}
            </div>
            <div className='flex self-end active:scale-95 justify-center min-h-[36px] items-center px-[12px] py-[3px] bg-[#ed1c24] text-white rounded-md text-xs max-w-[80px] overflow-hidden'>
                {t('search.button.title')}
            </div>
        </button>
    </div>
  )
}

export default SearchButton