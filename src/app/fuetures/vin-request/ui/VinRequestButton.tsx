'use client';

 import useModal from '@/src/app/hooks/use-modal';
import { useTranslations } from 'next-intl'
import React from 'react'

const VinRequestButton = () => {
  const t = useTranslations('Header');
    const { openModal } = useModal();
  return (
    <div className='flex self-start'>
          <button
            onClick={() => openModal('vinRequest')}
            className='flex justify-center items-center active:scale-95 px-[12px] py-[3px] bg-[#ed1c24] text-white rounded-md text-xs max-w-[80px]'>
            {t('vinRequest.button.title')}
        </button>
    </div>
  )
}

export default VinRequestButton