"use client";

import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import { useState, useEffect } from 'react';

// We put this OUTSIDE the component. 
// It resets to false when you refresh the page, but stays true when navigating via links!
let animationPlayed = false;

export default function Home() {
  const { lang } = useLanguage();
  
  // Initialize loading based on whether the animation has played yet
  const [loading, setLoading] = useState(!animationPlayed);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    if (!animationPlayed) {
      // Phase 1: Wait for pour (2s) and let steam rise for a moment, then zoom out (3.4s)
      const t1 = setTimeout(() => setExplode(true), 3400);
      
      // Phase 2: Completely remove the preloader from the screen (4.2s)
      const t2 = setTimeout(() => {
        setLoading(false);
        animationPlayed = true; // Mark as finished so it doesn't play on "Back Home" clicks
      }, 4200);
      
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  const t = {
    subtitle: lang === 'de' ? 'Getränke & Speisen' : 'Drinks & Food',
    menu: lang === 'de' ? 'Zur Speisekarte' : 'View Menu',
    gallery: lang === 'de' ? 'Galerie' : 'Gallery',
    visit: lang === 'de' ? 'Besuchen Sie uns' : 'Visit Us',
    reserve: lang === 'de' ? 'Tischreservierung' : 'Table Reservation',
    welcome: lang === 'de' ? 'Willkommen in der Mainbar' : 'Welcome to Mainbar',
    quote: lang === 'de' ? '"Bei uns ist Qualität das Produkt der Liebe zum Detail."' : '"With us, quality is the product of attention to detail."',
  };

  const acrostic = [
    { l: "L", de: "ebenstraum", en: "ifelong dream" }, 
    { l: "E", de: "inzigartig", en: "xceptional" }, 
    { l: "I", de: "mmerfrisch", en: "lways fresh" },
    { l: "D", de: "uftender Kaffee", en: "elicious coffee" }, 
    { l: "E", de: "rfolgsrezepte", en: "xquisite recipes" }, 
    { l: "N", de: "achhaltigkeit", en: "atural sustainability" },
    { l: "S", de: "elbstgebacken", en: "cratch-baked" }, 
    { l: "C", de: "harismatisch", en: "harismatic" }, 
    { l: "H", de: "erzlichkeit", en: "eartfelt warmth" },
    { l: "A", de: "nders", en: "lways different" }, 
    { l: "F", de: "amilienbetrieb", en: "amily business" }, 
    { l: "T", de: "alentschmiede", en: "alent forge" }
  ];

  return (
    <>
      {loading && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fcfbf9] transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: explode ? 0 : 1, pointerEvents: explode ? 'none' : 'auto' }}
        >
          <style>{`
            .animate-pour { animation: pour 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
            .animate-fill { animation: fill 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
            .animate-tilt { animation: tilt 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
            
            @keyframes pour {
              0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
              15% { transform: scaleY(1); transform-origin: top; opacity: 1; }
              85% { transform: scaleY(1); transform-origin: top; opacity: 1; }
              100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
            }
            @keyframes fill {
              0%, 15% { transform: scaleY(0); }
              85%, 100% { transform: scaleY(1); }
            }
            @keyframes tilt {
              0%, 100% { transform: rotate(0deg); }
              15%, 85% { transform: rotate(-30deg); }
            }
            @keyframes steam-rise {
              0% { transform: translateY(0) scale(1); opacity: 0; }
              20% { opacity: 0.5; }
              100% { transform: translateY(-80px) scale(2.5); opacity: 0; }
            }
          `}</style>
          
          <div 
            className="relative flex items-center justify-center w-full h-full transition-transform duration-[1000ms] ease-in-out"
            style={{ transform: explode ? 'scale(80)' : 'scale(1)' }}
          >
             <div className="relative w-48 h-48">
                
                {/* Kettle SVG */}
                <div className="absolute top-0 right-4 w-20 h-20 text-[#7a6c82] animate-tilt origin-bottom-left z-20">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                     <path d="M8 3v2M12 3v2M16 3v2M5 10c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v7c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4v-7z" fill="none"/>
                     <path d="M19 12h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2" fill="none"/>
                     <path d="M5 12H2L4 7h1" fill="none"/>
                  </svg>
                </div>

                {/* Animated Coffee Stream */}
                <div className="absolute top-12 left-[3.2rem] w-2 h-20 bg-[#3a3340] rounded-full animate-pour z-10"></div>

                {/* Dynamic Rising Steam (Delays are set so it only rises after coffee is poured) */}
                <div className="absolute bottom-20 left-6 w-5 h-5 bg-gray-400 rounded-full blur-md opacity-0 z-30" style={{ animation: 'steam-rise 2s ease-in infinite', animationDelay: '1.8s' }}></div>
                <div className="absolute bottom-20 left-12 w-6 h-6 bg-gray-400 rounded-full blur-md opacity-0 z-30" style={{ animation: 'steam-rise 2.2s ease-in infinite', animationDelay: '2.1s' }}></div>
                <div className="absolute bottom-20 left-16 w-4 h-4 bg-gray-400 rounded-full blur-md opacity-0 z-30" style={{ animation: 'steam-rise 1.8s ease-in infinite', animationDelay: '2.4s' }}></div>

                {/* Cup Outline */}
                <div className="absolute bottom-4 left-4 w-20 h-16 border-4 border-[#7a6c82] rounded-b-xl z-20 overflow-hidden bg-[#fcfbf9]">
                  {/* Rising Coffee Filling */}
                  <div className="absolute bottom-0 left-0 w-full h-full bg-[#7a6c82] origin-bottom animate-fill"></div>
                </div>
                
                {/* Cup Handle */}
                <div className="absolute bottom-6 left-[5.5rem] w-6 h-8 border-4 border-l-0 border-[#7a6c82] rounded-r-full z-10"></div>
             </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="min-h-screen flex flex-col md:flex-row font-sans relative">
        <div className="w-full md:w-1/2 bg-[#7a6c82] text-[#fcfbf9] flex flex-col items-center justify-center p-12 text-center relative">
          
          <h1 className="text-6xl md:text-8xl font-light tracking-widest mb-4 font-serif">MainBar</h1>
          <p className="text-xl tracking-[0.3em] uppercase text-[#dcd6df] mb-12">{t.subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-4 mb-10 w-full max-w-md">
            <Link href="/menu" className="border-2 border-[#fcfbf9] text-[#fcfbf9] px-6 py-4 uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-[#7a6c82] transition-colors shadow-lg flex-1">
              {t.menu}
            </Link>
            <Link href="/contact" className="border-2 border-[#fcfbf9] text-[#fcfbf9] px-6 py-4 uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-[#7a6c82] transition-colors shadow-lg flex-1">
              {t.visit}
            </Link>
          </div>

          <div className="mt-8 border-t border-[#9b8d9f] pt-8 w-full max-w-sm">
            <p className="text-sm uppercase tracking-widest text-[#dcd6df] mb-3">{t.reserve}</p>
            <a href="tel:+491702278096" className="text-2xl font-light tracking-wider hover:text-white transition-colors">
              +49 170 2278096
            </a>
          </div>

          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-40">
            <Link href="/gallery" className="flex items-center gap-4 text-[#fcfbf9] hover:text-gray-300 transition-colors uppercase tracking-widest text-sm font-bold group">
              <span className="w-8 h-[2px] bg-[#fcfbf9] group-hover:w-16 transition-all duration-500 ease-in-out"></span>
              {t.gallery}
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-[#fcfbf9] text-[#7a6c82] flex flex-col justify-center items-center md:items-start p-12 md:p-24">
          <h2 className="text-2xl font-medium mb-4 uppercase tracking-widest text-center md:text-left">{t.welcome}</h2>
          <p className="italic text-gray-500 mb-10 text-center md:text-left">{t.quote}</p>
          
          <div className="space-y-2 text-lg tracking-wider text-gray-700">
            {acrostic.map((item, i) => (
              <p key={i}><strong className="text-[#7a6c82] text-2xl font-bold pr-4">{item.l}</strong>{lang === 'de' ? item.de : item.en}</p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}