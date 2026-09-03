import { useAccessoriesStore } from '@/src/entities/catalogAccessories/model/accessories.store';
import { CardAccessories } from '@/src/entities/catalogAccessories/ui/CardAccessories';
import useModal from '@/src/hooks/use-modal';
import { useRouter } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react'

const MenuAccessories = () => {
    const { getAccessoriesMenu, accessoriesMenu, getCatalogAccessories, setCategoryId } =
      useAccessoriesStore();
    const {closeModal} = useModal();
    const t = useTranslations("catalog");
    const router = useRouter();

    const handleFetchDataAccessories = (id: number)=> {
        setCategoryId(id);
        getCatalogAccessories(id, 1);
        closeModal();
        router.push('/')
    }
    useEffect(() => {
      getAccessoriesMenu();
    }, [getAccessoriesMenu]);
  return (
    <div className="felx flex-col h-full">
      <h2 className="font-bold text-lg text-center">
        {t("accessories.catalogTitle")}
      </h2>

      {accessoriesMenu.map((la, i) => (
        <CardAccessories
          key={i}
          item={la}
          handleFetchDataAccessories={handleFetchDataAccessories}
        />
      ))}
    </div>
  );
}

export default MenuAccessories