'use client';

 import useModal from '@/src/hooks/use-modal';
import { useTranslations } from 'next-intl'
import React from 'react'

const VinRequestButton = () => {
  const t = useTranslations('Header');
    const { openModal } = useModal();
  return (
    <div className="flex self-start">
      <button
        onClick={() => openModal({ type: "vinRequest" })}
        className="flex justify-center items-center active:scale-95 px-[12px] py-[8px] bg-[#ed1c24] text-white rounded-md text-xs max-w-[130px] min-w-[130px]"
      >
        {t("vinRequest.button.title")}
      </button>
    </div>
  );
}

export default VinRequestButton