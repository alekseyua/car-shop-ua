import vinCardUa from '../../../shared/assets/images/vinCodeUa.webp';
import vinCardRu from '../../../shared/assets/images/vinCodeRu.webp';
import vinCardEn from '../../../shared/assets/images/vinCodeEn.webp';

export const useVinRequestForm = () => {
    const getImageByLangCode = (langCode : string) => {
        switch  (langCode) {
            case 'uk':
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