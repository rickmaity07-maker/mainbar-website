"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function HomeRustic() {
  const { lang } = useLanguage();

  const t = {
    subtitle: lang === 'de' ? 'Kaffee & Handgemachtes' : 'Coffee & Handmade Goods',
    menu: lang === 'de' ? 'Unsere Speisekarte' : 'Our Menu',
    gallery: lang === 'de' ? 'Erinnerungen' : 'Memories',
    visit: lang === 'de' ? 'Komm Vorbei' : 'Come By',
    welcome: lang === 'de' ? 'Willkommen Zuhause.' : 'Welcome Home.',
    quote: lang === 'de' ? 'Mit Liebe gebacken, mit Herz serviert.' : 'Baked with love, served with heart.',
  };

  return (
    <main className="min-h-screen flex flex-col font-serif bg-[#F9F6F0] text-[#5C4033] selection:bg-[#C07F67] selection:text-white">
      
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center mt-12">
        <div className="w-16 h-16 mb-8 text-[#C07F67]">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8 2 4 5 4 10c0 3.5 2 6 4 7.5V20a2 2 0 002 2h4a2 2 0 002-2v-2.5c2-1.5 4-4 4-7.5 0-5-4-8-8-8zm0 13c-2.5 0-4.5-2-4.5-4.5S9.5 6 12 6s4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
          </svg>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-medium tracking-wide mb-6 text-[#4A332A]">
          MainBar
        </h1>
        
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12 bg-[#C07F67]"></div>
          <p className="text-lg tracking-widest uppercase text-[#C07F67]">{t.subtitle}</p>
          <div className="h-px w-12 bg-[#C07F67]"></div>
        </div>

        <p className="text-2xl md:text-3xl italic mb-16 max-w-2xl leading-relaxed text-[#7D6B5D]">
          {t.welcome} <br/> {t.quote}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center font-sans">
          {/* NOTICE: Links are updated to point to /rustic/... */}
          <Link href="/rustic/menu" className="bg-[#C07F67] text-[#F9F6F0] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#A86A55] transition-all shadow-md transform hover:-translate-y-1">
            {t.menu}
          </Link>
          <Link href="/rustic/gallery" className="bg-transparent border-2 border-[#C07F67] text-[#C07F67] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#C07F67] hover:text-[#F9F6F0] transition-all">
            {t.gallery}
          </Link>
        </div>
      </div>

      <footer className="w-full text-center p-8 border-t border-[#E8E0D5] text-[#7D6B5D] text-sm tracking-widest uppercase mt-auto">
        Spitalstrasse 19 • 97421 Schweinfurt • +49 170 2278096
      </footer>
    </main>
  );
}