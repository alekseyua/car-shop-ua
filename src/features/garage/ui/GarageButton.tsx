'use client';

import Image from 'next/image';
import iconGarageWhite from '../../../shared/assets/icons/iconGarageWhite.svg';
import iconGarageBlack from '../../../shared/assets/icons/iconGarageBlack.svg';
import { useGarageStore } from '../model/garage.store';
import useModal from '@/src/hooks/use-modal';

interface IProps {
  colorIcon: 'white' | 'black';
}

const GarageButton = ({colorIcon}: IProps) => {
  const { countGarage } = useGarageStore();
  const { openModal } = useModal();
  return (
    <div className="relative text-white hover:text-gray-300 transition duration-300 cursor-pointer self-center sm:self-start">
      <Image
        src={colorIcon === 'white'? iconGarageWhite : iconGarageBlack}
        alt="Garage"
        className='sm:w-10 sm:h-10 w-7 h-7'
        onClick={() => openModal({ type: "garage" })}
      />
      {!!countGarage && (
        <span className="absolute sm:-top-1.5 sm:right-0 bg-red-500 
          text-white text-xs rounded-full w-5 h-5 
          flex items-center justify-center
          -top-2
          -right-2
          ">
          {countGarage}
        </span>
      )}
    </div>
  );
}

export default GarageButton