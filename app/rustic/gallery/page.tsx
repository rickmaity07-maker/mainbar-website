"use client";

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function RusticGallery() {
  const { lang } = useLanguage();
  
  const t = {
    title: lang === 'de' ? 'Galerie' : 'Gallery',
    subtitle: lang === 'de' ? 'Eindrücke aus der Mainbar' : 'Moments from Mainbar',
    back: lang === 'de' ? 'Zur Startseite' : 'Back Home',
    instaText: lang === 'de' ? 'Folgen Sie uns auf Instagram für mehr' : 'Follow us on Instagram for more',
  };

  const mediaItems = [
    { id: 1, type: 'image', src: '1.jpg' },
    { id: 2, type: 'video', src: '2.mp4' },
    { id: 3, type: 'image', src: '3.jpg' },
    { id: 4, type: 'video', src: '4.mp4' },
    { id: 5, type: 'image', src: '5.jpg' },
    { id: 6, type: 'image', src: '6.jpg' },
  ];

  return (
    <main className="min-h-screen bg-[#F9F6F0] text-[#5C4033] p-6 md:p-12 font-serif">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-[#E8E0D5]">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-5xl font-medium tracking-wide text-[#4A332A]">{t.title}</h1>
            <p className="text-sm text-[#C07F67] uppercase tracking-widest mt-2">{t.subtitle}</p>
          </div>
          <Link href="/rustic" className="text-sm uppercase tracking-widest text-[#C07F67] border-2 border-[#C07F67] rounded-full px-6 py-2 hover:bg-[#C07F67] hover:text-[#F9F6F0] transition-colors font-sans font-semibold">
            &larr; {t.back}
          </Link>
        </header>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="break-inside-avoid overflow-hidden rounded-xl shadow-lg group relative bg-white p-2">
              {item.type === 'image' ? (
                <img src={`/gallery/${item.src}`} className="w-full h-auto object-cover rounded-lg" style={{ minHeight: item.id % 2 === 0 ? '300px' : '450px' }} />
              ) : (
                <video src={`/gallery/${item.src}`} autoPlay loop muted playsInline className="w-full h-auto object-cover rounded-lg" style={{ minHeight: item.id % 2 === 0 ? '300px' : '450px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}