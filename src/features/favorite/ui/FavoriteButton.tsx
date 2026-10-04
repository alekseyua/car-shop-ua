'use client';

import Image from 'next/image';
import useModal from '@/src/hooks/use-modal';
import { useFavoriteStore } from '../model/favorite.store';
import iconFavoriteTransporant from "../../../shared/assets/icons/favorite-transporent.svg";
import iconFavoriteWhite from '../../../shared/assets/icons/favorite-white.svg';
import { useRouter } from '@/src/i18n/navigation';

interface IProps {
  colorIcon?: 'white' | 'black';
}

const FavoriteButton = ({colorIcon}: IProps) => {
  const { countFavorite } = useFavoriteStore();
  const route = useRouter();
  const { openModal } = useModal();
  return (
    <div className="relative text-white hover:text-gray-300 transition duration-300 cursor-pointer self-center sm:self-start">
      <Image
        src={
          !!countFavorite ? iconFavoriteWhite : iconFavoriteTransporant
        }
        alt="Garage"
        className="w-6.5 h-6.5"
        onClick={() => route.push('/favorite')}
      />
      {!!countFavorite && (
        <span
          className="absolute sm:-top-1.4 sm:-right-1 bg-red-500 
          text-white text-xs rounded-full w-4 h-4 
          flex items-center justify-center
          -top-2
          -right-2
          "
        >
          {countFavorite}
        </span>
      )}
    </div>
  );
}

export default FavoriteButton