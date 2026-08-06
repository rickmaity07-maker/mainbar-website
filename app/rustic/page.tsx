"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import MainBarLogo from '../components/MainBarLogo';
import { useRouter } from 'next/navigation'; // <-- Added Router Import

export default function HomeRustic() {
  const { lang } = useLanguage();
  const router = useRouter(); // <-- Initialized the router

  const t = {
    subtitle: lang === 'de' ? 'Kaffee & Handgemachtes' : 'Coffee & Handmade Goods',
    menu: lang === 'de' ? 'Unsere Speisekarte' : 'Our Menu',
    gallery: lang === 'de' ? 'Erinnerungen' : 'Memories',
    visit: lang === 'de' ? 'Komm Vorbei' : 'Visit Us',
    welcome: lang === 'de' ? 'Willkommen Zuhause.' : 'Welcome Home.',
    quote: lang === 'de' ? 'Mit Liebe gebacken, mit Herz serviert.' : 'Baked with love, served with heart.',
  };

  return (
    <main className="min-h-screen flex flex-col font-serif bg-[#F9F6F0] text-[#5C4033] selection:bg-[#C07F67] selection:text-white relative">
      
      {/* Custom Animations for the Rustic Theme */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-fade-up {
          animation: fade-in-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center mt-16 md:mt-12 overflow-x-hidden relative z-10">
        
        {/* Floating Icon - No delay */}
        <div className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 text-[#C07F67] animate-float">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8 2 4 5 4 10c0 3.5 2 6 4 7.5V20a2 2 0 002 2h4a2 2 0 002-2v-2.5c2-1.5 4-4 4-7.5 0-5-4-8-8-8zm0 13c-2.5 0-4.5-2-4.5-4.5S9.5 6 12 6s4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
          </svg>
        </div>
        
        {/* Logo - Fades in first */}
        <div className="mb-4 md:mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <MainBarLogo textColor="text-[#4A332A]" ringColor="border-[#C07F67]" />
        </div>
        
        {/* Subtitle Line - Fades in second */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12 w-full px-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="h-px w-8 md:w-12 bg-[#C07F67] hidden sm:block"></div>
          <p className="text-xs sm:text-sm md:text-lg tracking-widest uppercase text-[#C07F67] text-center">
            {t.subtitle}
          </p>
          <div className="h-px w-8 md:w-12 bg-[#C07F67] hidden sm:block"></div>
        </div>

        {/* Welcome Quote - Fades in third */}
        <p className="text-lg sm:text-xl md:text-3xl italic mb-10 md:mb-16 max-w-sm md:max-w-2xl leading-relaxed text-[#7D6B5D] px-4 animate-fade-up" style={{ animationDelay: '500ms' }}>
          {t.welcome} <br className="hidden sm:block"/> {t.quote}
        </p>

        {/* Navigation Buttons - Fades in last */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-xs md:max-w-2xl justify-center font-sans animate-fade-up" style={{ animationDelay: '700ms' }}>
          <Link href="/rustic/menu" className="bg-[#C07F67] text-[#F9F6F0] px-6 md:px-8 py-3 md:py-4 rounded-full uppercase tracking-wider text-xs md:text-sm font-semibold hover:bg-[#A86A55] transition-all shadow-md transform hover:-translate-y-1">
            {t.menu}
          </Link>
          <Link href="/rustic/gallery" className="bg-transparent border-2 border-[#C07F67] text-[#C07F67] px-6 md:px-8 py-3 md:py-4 rounded-full uppercase tracking-wider text-xs md:text-sm font-semibold hover:bg-[#C07F67] hover:text-[#F9F6F0] transition-all">
            {t.gallery}
          </Link>
          <Link href="/rustic/contact" className="bg-[#5C4033] text-[#F9F6F0] px-6 md:px-8 py-3 md:py-4 rounded-full uppercase tracking-wider text-xs md:text-sm font-semibold hover:bg-[#4A332A] transition-all shadow-md transform hover:-translate-y-1">
            {t.visit}
          </Link>
        </div>
      </div>

      {/* Footer - Fades in at the very end */}
      <footer className="w-full text-center p-8 border-t border-[#E8E0D5] text-[#7D6B5D] text-sm tracking-widest uppercase mt-auto animate-fade-up relative z-10" style={{ animationDelay: '900ms' }}>
        Spitalstrasse 19 • 97421 Schweinfurt • +49 170 2278096
      </footer>

     {/* --- THE SECRET ADMIN TRIGGER --- */}
        <div 
          onClick={() => router.push('/mb-vault-m892')} 
          className="fixed bottom-0 right-0 w-16 h-16 z-[200] opacity-0 cursor-default"
          title=" "
        ></div>

    </main>
  );
}