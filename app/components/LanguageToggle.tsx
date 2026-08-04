"use client";

import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="absolute top-6 right-6 z-50">
      <button 
        onClick={toggleLanguage}
        className="flex items-center border border-[#7a6c82] rounded-full p-1 bg-white/80 backdrop-blur-sm shadow-sm transition-all"
      >
        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors ${lang === 'de' ? 'bg-[#7a6c82] text-white' : 'text-[#7a6c82]'}`}>
          DE
        </span>
        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors ${lang === 'en' ? 'bg-[#7a6c82] text-white' : 'text-[#7a6c82]'}`}>
          EN
        </span>
      </button>
    </div>
  );
}