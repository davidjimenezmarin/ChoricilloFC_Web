// resources/js/Components/LanguageSwitcher.tsx

import React from 'react';
import i18n from 'i18next';

const LanguageSwitcher: React.FC = () => {
  const handleChangeLanguage = (lang: 'es' | 'en') => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={() => handleChangeLanguage('es')}
        className="text-sm px-2 py-1 bg-white text-black rounded hover:bg-gray-200"
      >
        ES
      </button>
      <button
        onClick={() => handleChangeLanguage('en')}
        className="text-sm px-2 py-1 bg-white text-black rounded hover:bg-gray-200"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
