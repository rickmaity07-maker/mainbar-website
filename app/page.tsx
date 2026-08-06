"use client";
import MainBarLogo from './components/MainBarLogo';
import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

let animationPlayed = false;

export default function Home() {
  const { lang } = useLanguage();
  const router = useRouter();
  
  const [loading, setLoading] = useState(!animationPlayed);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    if (!animationPlayed) {
      const t1 = setTimeout(() => setExplode(true), 3400);
      const t2 = setTimeout(() => {
        setLoading(false);
        animationPlayed = true;
      }, 4200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  const t = {
    subtitle: lang === 'de' ? 'Café & Patisserie' : 'Café & Patisserie',
    menu: lang === 'de' ? 'Zur Speisekarte' : 'View Menu',
    gallery: lang === 'de' ? 'Galerie' : 'Gallery',
    visit: lang === 'de' ? 'Besuchen Sie uns' : 'Visit Us',
    reserve: lang === 'de' ? 'Tischreservierung' : 'Table Reservation',
    welcome: lang === 'de' ? 'Willkommen in der Mainbar' : 'Welcome to Mainbar',
    quote: lang === 'de' ? '"Bei uns ist Qualität das Produkt der Liebe zum Detail."' : '"With us, quality is the product of attention to detail."',
    featuredTitle: lang === 'de' ? 'Süße Versuchungen' : 'Sweet Temptations',
    featuredMenu: [
      {
        name: lang === 'de' ? 'Beeren-Tarte' : 'Berry Tart',
        desc: lang === 'de' ? 'Frische Beeren auf zarter Vanillecreme.' : 'Fresh berries on delicate vanilla custard.',
        price: '€ 5.50',
        img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
      },
      {
        name: lang === 'de' ? 'Rosen-Latte' : 'Rose Vanilla Latte',
        desc: lang === 'de' ? 'Espresso, aufgeschäumte Milch & Rosensirup.' : 'Espresso, steamed milk & rose syrup.',
        price: '€ 4.80',
        img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop'
      },
      {
        name: lang === 'de' ? 'Macaron Variation' : 'Macaron Assortment',
        desc: lang === 'de' ? 'Handgemachte französische Macarons.' : 'Handcrafted French macarons.',
        price: '€ 6.20',
        img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop'
      }
    ]
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF7F5] transition-opacity duration-[800ms] ease-in-out"
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
                <div className="absolute top-0 right-4 w-20 h-20 text-[#DCAFB3] animate-tilt origin-bottom-left z-20">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                     <path d="M8 3v2M12 3v2M16 3v2M5 10c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v7c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4v-7z" fill="none"/>
                     <path d="M19 12h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2" fill="none"/>
                     <path d="M5 12H2L4 7h1" fill="none"/>
                  </svg>
                </div>
                <div className="absolute top-12 left-[3.2rem] w-2 h-20 bg-[#8A6F78] rounded-full animate-pour z-10"></div>
                <div className="absolute bottom-20 left-6 w-5 h-5 bg-[#DCAFB3] rounded-full blur-md opacity-0 z-30" style={{ animation: 'steam-rise 2s ease-in infinite', animationDelay: '1.8s' }}></div>
                <div className="absolute bottom-20 left-12 w-6 h-6 bg-[#DCAFB3] rounded-full blur-md opacity-0 z-30" style={{ animation: 'steam-rise 2.2s ease-in infinite', animationDelay: '2.1s' }}></div>
                <div className="absolute bottom-20 left-16 w-4 h-4 bg-[#DCAFB3] rounded-full blur-md opacity-0 z-30" style={{ animation: 'steam-rise 1.8s ease-in infinite', animationDelay: '2.4s' }}></div>
                <div className="absolute bottom-4 left-4 w-20 h-16 border-4 border-[#DCAFB3] rounded-b-xl z-20 overflow-hidden bg-[#FAF7F5]">
                  <div className="absolute bottom-0 left-0 w-full h-full bg-[#DCAFB3] origin-bottom animate-fill"></div>
                </div>
                <div className="absolute bottom-6 left-[5.5rem] w-6 h-8 border-4 border-l-0 border-[#DCAFB3] rounded-r-full z-10"></div>
             </div>
          </div>
        </div>
      )}

      {/* Main Scrollable Area */}
      <main className="min-h-screen flex flex-col font-sans bg-[#FAF7F5] overflow-x-hidden text-[#4A333E]">
        
        {/* --- HERO SPLIT SECTION --- */}
        <div className="min-h-[100svh] flex flex-col md:flex-row relative">
          
          {/* Left Side (Blush Pink Theme) */}
          <div className="w-full md:w-1/2 bg-[#DCAFB3] text-[#FAF7F5] flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 text-center relative min-h-[50svh] md:min-h-screen">
            
            <div className="mb-2 md:mb-4 mt-8 md:mt-0">
              <MainBarLogo textColor="text-[#FAF7F5]" ringColor="border-[#FAF7F5]" />
            </div>
            
            <p className="text-sm sm:text-base md:text-xl font-serif tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#F9E8EA] mb-8 md:mb-12 px-4">{t.subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 mb-8 md:mb-10 w-full max-w-xs sm:max-w-md">
              <Link href="/menu" className="border border-[#FAF7F5] bg-transparent text-[#FAF7F5] px-4 py-3 md:px-6 md:py-4 uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm hover:bg-[#FAF7F5] hover:text-[#DCAFB3] transition-colors shadow-sm rounded-full flex-1">
                {t.menu}
              </Link>
              <Link href="/contact" className="border border-[#FAF7F5] bg-transparent text-[#FAF7F5] px-4 py-3 md:px-6 md:py-4 uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm hover:bg-[#FAF7F5] hover:text-[#DCAFB3] transition-colors shadow-sm rounded-full flex-1">
                {t.visit}
              </Link>
            </div>

            <div className="mt-4 md:mt-8 border-t border-[#C89FA3] pt-6 md:pt-8 w-full max-w-xs sm:max-w-sm mb-16 md:mb-0">
              <p className="text-xs md:text-sm uppercase tracking-widest text-[#F9E8EA] mb-2 md:mb-3">{t.reserve}</p>
              <a href="tel:+491702278096" className="text-xl md:text-2xl font-serif tracking-wider hover:text-white transition-colors">
                +49 170 2278096
              </a>
            </div>

            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-40">
              <Link href="/gallery" className="flex items-center gap-3 md:gap-4 text-[#FAF7F5] hover:text-white transition-colors uppercase tracking-widest text-xs md:text-sm group">
                <span className="w-6 md:w-8 h-[1px] bg-[#FAF7F5] group-hover:w-12 md:group-hover:w-16 transition-all duration-500 ease-in-out"></span>
                {t.gallery}
              </Link>
            </div>
          </div>
          
          {/* Right Side (Cream Theme / Acrostic) */}
          <div className="w-full md:w-1/2 bg-[#FAF7F5] text-[#4A333E] flex flex-col justify-center items-center md:items-start p-8 sm:p-12 md:p-24 min-h-[50svh] md:min-h-screen">
            <h2 className="text-2xl md:text-4xl font-serif mb-4 text-center md:text-left text-[#DCAFB3]">{t.welcome}</h2>
            <p className="italic text-[#8A6F78] mb-10 text-center md:text-left text-sm md:text-lg">{t.quote}</p>
            
            <div className="space-y-3 text-sm md:text-base tracking-wider text-[#8A6F78]">
              {acrostic.map((item, i) => (
                <p key={i} className="flex items-center">
                  <strong className="text-[#DCAFB3] text-xl md:text-2xl font-serif pr-3 md:pr-4 w-8">{item.l}</strong>
                  {lang === 'de' ? item.de : item.en}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* --- NEW: VISUAL MENU SECTION --- */}
        <div className="w-full bg-white py-20 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Elegant Header */}
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-serif text-[#DCAFB3] mb-6">
                {t.featuredTitle}
              </h2>
              <div className="w-24 h-[1px] bg-[#C89FA3] mx-auto"></div>
            </div>

            {/* Arched Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {t.featuredMenu.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  {/* Window Arch Image Container */}
                  <div className="w-full h-80 mb-8 overflow-hidden rounded-t-[120px] rounded-b-3xl shadow-[0_15px_40px_-15px_rgba(220,175,179,0.4)] border-4 border-[#FAF7F5]">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  
                  {/* Item Details */}
                  <h3 className="text-xl md:text-2xl font-serif text-[#4A333E] mb-3">{item.name}</h3>
                  <p className="text-sm text-[#8A6F78] mb-4 max-w-[250px] leading-relaxed">{item.desc}</p>
                  <p className="text-[#DCAFB3] font-bold tracking-widest">{item.price}</p>
                </div>
              ))}
            </div>
            
            {/* Bottom Button */}
            <div className="text-center mt-16">
              <Link href="/menu" className="inline-block border border-[#DCAFB3] text-[#DCAFB3] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#DCAFB3] hover:text-white transition-colors rounded-full">
                {t.menu}
              </Link>
            </div>
          </div>
        </div>
        
        {/* --- THE SECRET ADMIN TRIGGER --- */}
        <div 
          onClick={() => router.push('/mb-vault-m892')} 
          className="fixed bottom-0 right-0 w-16 h-16 z-[200] opacity-0 cursor-default"
          title=" "
        ></div>

      </main>
    </>
  );
}