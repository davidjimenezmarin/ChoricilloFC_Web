// resources/js/Components/LanguageSwitcher.tsx

import React from 'react';
import i18n from 'i18next';
import { CircleFlag } from 'react-circle-flags';

const LanguageSwitcher: React.FC = () => {
  const currentLang = i18n.language;

  const handleChangeLanguage = (lang: 'es' | 'en') => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => handleChangeLanguage('es')}
        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition hover:scale-105 ${
          currentLang === 'es' ? 'border-white' : 'border-transparent'
        }`}
        aria-label="Cambiar a español"
      >
        <CircleFlag countryCode="es" height="32" />
      </button>

      <button
        onClick={() => handleChangeLanguage('en')}
        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition hover:scale-105 ${
          currentLang === 'en' ? 'border-white' : 'border-transparent'
        }`}
        aria-label="Switch to English"
      >
        <CircleFlag countryCode="gb" height="32" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
