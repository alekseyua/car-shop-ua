'use client';

import Image from 'next/image';
import GarageIcon from '../../../shared/assets/icons/garage.svg';
import { useGarageStore } from '../model/garage.store';
import useModal from '@/src/hooks/use-modal';

const GarageButton = () => {
  const { countGarage } = useGarageStore();
  const { openModal } = useModal();
  return (
    <div className="relative text-white hover:text-gray-300 transition duration-300 cursor-pointer self-start">
        <Image src={GarageIcon} 
            alt="Garage" 
            width={24} 
            height={24} 
            style={{width: 40, height: 40, color: 'white'}}
        onClick={() => openModal('garage')}
        />
      {!!countGarage && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{countGarage}</span>}
    </div>
  )
}

export default GarageButton