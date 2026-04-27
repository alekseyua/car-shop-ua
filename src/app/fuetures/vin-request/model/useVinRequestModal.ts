import vinCardUa from '../../../shared/assets/images/vinCodeUa.webp';
import vinCardRu from '../../../shared/assets/images/vinCodeRu.webp';
import vinCardEn from '../../../shared/assets/images/vinCodeEn.webp';

export const useVinRequestForm = () => {
    const getImageByLangCode = (langCode : string) => {
        console.log(langCode);
        switch  (langCode) {
            case 'ua':
                return vinCardUa;
            case 'en':
                return vinCardEn;
            case 'ru':
                return vinCardRu;
            default:
                return '';
        }
    };

    return {
        getImageByLangCode,
    }
};