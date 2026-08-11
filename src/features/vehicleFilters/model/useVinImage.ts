import imgVin_uk from '../../../shared/assets/images/vinDiagram.ua.png';
import imgVin_ru from '../../../shared/assets/images/vinDiagram.ru.png';
import imgVin_en from '../../../shared/assets/images/vinDiagram.en.png';

export const useVinImage = () => {
    const getImageByLangCode = (langCode : string) => {
        switch  (langCode) {
            case 'uk':
                return imgVin_uk;
            case 'en':
                return imgVin_en;
                case 'ru':
                return imgVin_ru;
            default:
                return '';
        }
    };

    return {
        getImageByLangCode,
    }
};