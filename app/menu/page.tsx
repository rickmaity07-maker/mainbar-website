"use client";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import MainBarLogo from '../components/MainBarLogo';

export default function Menu() {
  const { lang } = useLanguage();

  const t = {
    back: lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home',
    title: lang === 'de' ? 'Unsere Spezialitäten' : 'Our Specialties',
    categories: [
      {
        title: lang === 'de' ? 'Hausgemachte Gebäck' : 'House Pastries',
        items: [
          { name: lang === 'de' ? 'Beeren-Tarte' : 'Berry Tart', desc: lang === 'de' ? 'Frische Beeren auf Vanillecreme.' : 'Fresh berries on vanilla custard.', price: '€ 5.50', img: '/media/mainbar-photo-10.jpg' },
          { name: lang === 'de' ? 'Macaron Variation' : 'Macaron Assortment', desc: lang === 'de' ? 'Handgemachte französische Macarons.' : 'Handcrafted French macarons.', price: '€ 6.20', img: '/media/mainbar-photo-11.jpg' },
          { name: lang === 'de' ? 'Butter Croissant' : 'Butter Croissant', desc: lang === 'de' ? 'Täglich frisch gebacken.' : 'Freshly baked daily.', price: '€ 3.50', img: '/media/mainbar-photo-12.jpg' },
          { name: lang === 'de' ? 'Schokoladenkuchen' : 'Chocolate Cake', desc: lang === 'de' ? 'Mit flüssigem Kern.' : 'With a molten center.', price: '€ 4.90', img: '/media/mainbar-photo-13.jpg' }
        ]
      },
      {
        title: lang === 'de' ? 'Heiße Klassiker' : 'Hot Classics',
        items: [
          { name: lang === 'de' ? 'Rosen-Latte' : 'Rose Vanilla Latte', desc: lang === 'de' ? 'Espresso & Rosensirup.' : 'Espresso & rose syrup.', price: '€ 4.80', img: '/media/mainbar-photo-14.jpg' },
          { name: lang === 'de' ? 'Cappuccino' : 'Cappuccino', desc: lang === 'de' ? 'Doppelter Espresso mit cremigem Schaum.' : 'Double espresso with creamy foam.', price: '€ 3.80', img: '/media/mainbar-photo-15.jpg' },
          { name: lang === 'de' ? 'Matcha Latte' : 'Matcha Latte', desc: lang === 'de' ? 'Premium Matcha aus Japan.' : 'Premium Matcha from Japan.', price: '€ 4.50', img: '/media/mainbar-photo-16.jpg' },
          { name: lang === 'de' ? 'Flat White' : 'Flat White', desc: lang === 'de' ? 'Samtiger Mikroschaum.' : 'Velvety microfoam.', price: '€ 4.20', img: '/media/mainbar-photo-17.jpg' }
        ]
      },
      {
        title: lang === 'de' ? 'Kühle Erfrischungen' : 'Cold Refreshments',
        items: [
          { name: lang === 'de' ? 'Iced Rose Latte' : 'Iced Rose Latte', desc: lang === 'de' ? 'Erfrischend auf Eis.' : 'Refreshing over ice.', price: '€ 4.90', img: '/media/mainbar-photo-18.jpg' },
          { name: lang === 'de' ? 'Hausgemachte Limonade' : 'House Lemonade', desc: lang === 'de' ? 'Zitrone, Minze & Soda.' : 'Lemon, mint & soda.', price: '€ 4.20', img: '/media/mainbar-photo-19.jpg' }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#4B5563] font-sans pb-24">
      {/* Header */}
      <div className="w-full bg-[#374151] py-12 px-6 text-center text-[#F9FAFB] flex flex-col items-center">
        <div className="mb-8 scale-75 md:scale-100 origin-top">
          <MainBarLogo textColor="text-[#C89FA3]" ringColor="border-[#C89FA3]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-6">{t.title}</h1>
        <Link href="/" className="text-[#C89FA3] hover:text-white transition-colors uppercase tracking-widest text-xs md:text-sm flex items-center gap-2">
          <span>&larr;</span> {t.back}
        </Link>
      </div>

      {/* Menu Categories */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        {t.categories.map((category, catIdx) => (
          <div key={catIdx} className="mb-24 last:mb-0">
            <h2 className="text-3xl font-serif text-[#374151] mb-12 text-center md:text-left border-b border-[#E5E7EB] pb-4">
              {category.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#E5E7EB]">
                  <div className="w-full h-56 overflow-hidden relative">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-4 right-4 bg-[#F9FAFB]/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-[#374151] shadow-sm">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif text-[#374151] mb-2">{item.name}</h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed flex-grow">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}