"use client";

import { usePathname } from 'next/navigation';
// Ensure this path matches where your context folder actually lives:
import { useLanguage } from '../context/LanguageContext'; 

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();
  const pathname = usePathname();

  const isRustic = pathname?.startsWith('/rustic');

  const borderColor = isRustic ? 'border-[#C07F67]' : 'border-[#7a6c82]';
  const activeBg = isRustic ? 'bg-[#C07F67] text-[#F9F6F0]' : 'bg-[#7a6c82] text-white';
  const inactiveText = isRustic ? 'text-[#C07F67]' : 'text-[#7a6c82]';

  return (
    <div className="absolute top-6 right-6 z-50">
      <button 
        onClick={toggleLanguage}
        className={`flex items-center border ${borderColor} rounded-full p-1 bg-white/90 backdrop-blur-md shadow-lg transition-all cursor-pointer`}
      >
        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors ${lang === 'de' ? activeBg : inactiveText}`}>
          DE
        </span>
        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors ${lang === 'en' ? activeBg : inactiveText}`}>
          EN
        </span>
      </button>
    </div>
  );
}