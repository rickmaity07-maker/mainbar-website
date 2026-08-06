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
  
  // FIX: Start loading as 'true' so the server and client always match initially!
  const [loading, setLoading] = useState(true); 
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    if (!animationPlayed) {
      const t1 = setTimeout(() => setExplode(true), 2000);
      const t2 = setTimeout(() => {
        setLoading(false);
        animationPlayed = true;
      }, 2800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      // FIX: If it already played, immediately dismiss it on the client
      setLoading(false);
    }
  }, []);

  const t = {
    subtitle: lang === 'de' ? 'Café & Patisserie' : 'Café & Patisserie',
    menu: lang === 'de' ? 'Zur Speisekarte' : 'View Menu',
    gallery: lang === 'de' ? 'Galerie' : 'Gallery',
    visit: lang === 'de' ? 'Besuchen Sie uns' : 'Visit Us',
    reserve: lang === 'de' ? 'Tischreservierung' : 'Table Reservation',
    welcome: lang === 'de' ? 'Willkommen in der Mainbar' : 'Welcome to Mainbar',
    quote: lang === 'de' ? 'Bei uns ist Qualität das Produkt der Liebe zum Detail.' : 'With us, quality is the product of attention to detail.',
    
    menuCategories: [
      {
        title: lang === 'de' ? 'Hausgemachte Gebäck' : 'House Pastries',
        items: [
          { name: lang === 'de' ? 'Beeren-Tarte' : 'Berry Tart', price: '€ 5.50', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop' },
          { name: lang === 'de' ? 'Macaron Variation' : 'Macaron Assortment', price: '€ 6.20', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop' },
          { name: lang === 'de' ? 'Butter Croissant' : 'Butter Croissant', price: '€ 3.50', img: 'https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?q=80&w=800&auto=format&fit=crop' },
          { name: lang === 'de' ? 'Schokoladenkuchen' : 'Chocolate Cake', price: '€ 4.90', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop' }
        ]
      },
      {
        title: lang === 'de' ? 'Heiße Klassiker' : 'Hot Classics',
        items: [
          { name: lang === 'de' ? 'Rosen-Latte' : 'Rose Vanilla Latte', price: '€ 4.80', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop' },
          { name: lang === 'de' ? 'Cappuccino' : 'Cappuccino', price: '€ 3.80', img: 'https://images.unsplash.com/photo-1572442388796-11668a67ef46?q=80&w=800&auto=format&fit=crop' },
          { name: lang === 'de' ? 'Matcha Latte' : 'Matcha Latte', price: '€ 4.50', img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop' },
          { name: lang === 'de' ? 'Flat White' : 'Flat White', price: '€ 4.20', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop' }
        ]
      }
    ]
  };

  return (
    <>
      {loading && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F9FAFB] transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: explode ? 0 : 1, pointerEvents: explode ? 'none' : 'auto' }}
        >
          <div className="relative flex items-center justify-center w-full h-full transition-transform duration-[1000ms] ease-in-out" style={{ transform: explode ? 'scale(80)' : 'scale(1)' }}>
             <div className="w-16 h-16 border-4 border-[#E5E7EB] border-t-[#C89FA3] rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <main className="min-h-screen flex flex-col font-sans bg-[#F9FAFB] overflow-x-hidden text-[#4B5563]">
        
        {/* --- HERO IMAGE GRID SECTION --- */}
        <div className="min-h-[90svh] flex flex-col md:flex-row relative bg-[#374151]">
          
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 text-center relative z-10 text-[#F9FAFB]">
            <MainBarLogo textColor="text-[#C89FA3]" ringColor="border-[#C89FA3]" />
            <p className="text-sm md:text-xl font-serif tracking-[0.3em] uppercase text-[#9CA3AF] mb-12 px-4 mt-6">{t.subtitle}</p>
            
            <div className="flex gap-4 sm:gap-6 mt-2 mb-10 w-full max-w-sm">
              <Link href="/menu" className="bg-[#C89FA3] text-white px-6 py-4 uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-[#A67B80] transition-colors rounded-full flex-1 shadow-lg">
                {t.menu}
              </Link>
            </div>
            <div className="border-t border-[#4B5563] pt-8 w-full max-w-sm">
              <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mb-3">{t.reserve}</p>
              <a href="tel:+491702278096" className="text-2xl font-serif tracking-wider text-[#C89FA3] hover:text-white transition-colors">
                +49 170 2278096
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-[50svh] md:h-auto relative grid grid-cols-2 gap-2 p-2 bg-[#F9FAFB]">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover rounded-tl-3xl" alt="Cafe ambiance" />
            <img src="https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover rounded-tr-3xl" alt="Pouring coffee" />
            <img src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover rounded-bl-3xl col-span-2 md:col-span-1" alt="Pastries" />
            <div className="hidden md:flex bg-[#C89FA3] rounded-br-3xl items-center justify-center p-8 text-center">
              {/* FIX: Using proper HTML entity &quot; for the quotes to prevent compile errors! */}
              <p className="text-white font-serif text-2xl italic">&quot;{t.quote}&quot;</p>
            </div>
          </div>
        </div>

        {/* --- FULL VISUAL MENU SECTION --- */}
        <div className="w-full py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-[#374151] mb-6">Unser Menü</h2>
            <div className="w-24 h-[2px] bg-[#C89FA3] mx-auto"></div>
          </div>

          {t.menuCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-24 last:mb-0">
              <h3 className="text-2xl tracking-widest uppercase text-[#9CA3AF] mb-10 text-center md:text-left border-b border-[#E5E7EB] pb-4">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group cursor-pointer">
                    <div className="w-full aspect-square mb-4 overflow-hidden rounded-2xl bg-[#E5E7EB] relative shadow-sm">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute bottom-3 right-3 bg-[#F9FAFB]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#4B5563]">
                        {item.price}
                      </div>
                    </div>
                    <h4 className="text-lg font-serif text-[#374151] group-hover:text-[#C89FA3] transition-colors">{item.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
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