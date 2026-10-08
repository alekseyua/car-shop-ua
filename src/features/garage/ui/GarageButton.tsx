'use client';

import Image from 'next/image';
import iconGarageWhite from '../../../shared/assets/icons/iconGarageWhite.svg';
import iconGarageBlack from '../../../shared/assets/icons/iconGarageBlack.svg';
import { useGarageStore } from '../model/garage.store';
import useModal from '@/src/hooks/use-modal';
import { useAuthStore } from '../../auth-by-email/model/auth.store';

interface IProps {
  colorIcon: 'white' | 'black';
}

const GarageButton = ({colorIcon}: IProps) => {
  const countGarage = useGarageStore((s) => s.countGarage);
  const { openModal } = useModal();
  const user = useAuthStore(s=>s.user);

  const handleGarageClick = () => {
    if(!user) return openModal({
      type: "please_registration",
      visible: 'top'
    });
    openModal({ type: "garage" });
  }
  return (
    <div className="relative text-white hover:text-gray-300 transition duration-300 cursor-pointer self-center sm:self-start">
      <Image
        src={colorIcon === "white" ? iconGarageWhite : iconGarageBlack}
        alt="Garage"
        className="w-6 h-6"
        onClick={handleGarageClick}
      />
      {!!countGarage && (
        <span
          className="absolute sm:-top-1.4 sm:-right-1 bg-red-500 
          text-white text-xs rounded-full w-4 h-4 
          flex items-center justify-center
          -top-2
          -right-2
          "
        >
          {countGarage}
        </span>
      )}
    </div>
  );
}

export default GarageButton