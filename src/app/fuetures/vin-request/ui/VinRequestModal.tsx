import Image from 'next/image'
import barCode from '../../../shared/assets/icons/barcode.svg';
import { useLocale, useTranslations } from 'next-intl';
import VinRequestForm from './VinRequestForm';
import { useVinRequestForm } from '../model/useVinRequestModal';


const VinRequestModal = () => {
  const t = useTranslations('Header');
    const lang = useLocale();
    const { getImageByLangCode } = useVinRequestForm();

  return (
    <div className='flex flex-col'>
        <div className="flex gap-4 w-full items-center justify-center">
            <Image src={barCode} alt="Barcode" width={25} height={25}/>
              <h3 className="text-[27px] font-bold text-[#33333f]">
                {t('vinRequest.modal.title')}
              </h3>
        </div>
        <p className="text-start text-[#33333f] text-sm mt-2">
            {t('vinRequest.modal.description')}
        </p>
        <div className='grid grid-cols-[1fr_1fr] gap-4 mt-4'>
            <div>
          <Image src={getImageByLangCode(lang)} alt="Tech Card" className='flex w-full h-[250px] object-cover'/>
            </div>
            <div className='flex flex-col'>
                <VinRequestForm />
            </div>
        </div>
    </div>
  )
}

export default VinRequestModal