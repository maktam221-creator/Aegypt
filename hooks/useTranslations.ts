import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';

type TranslationKey = keyof typeof translations;

export const useTranslations = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const t = (key: TranslationKey, params: Record<string, string | number> = {}) => {
    let text = translations[key]?.[language] || key;

    Object.keys(params).forEach(paramKey => {
      text = text.replace(`{${paramKey}}`, String(params[paramKey]));
    });

    return text;
  };

  return { t, setLanguage, language };
};
