"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Gallery() {
  const { lang } = useLanguage();

  const t = {
    title: lang === 'de' ? 'Galerie' : 'Gallery',
    subtitle: lang === 'de' ? 'Eindrücke aus der Mainbar' : 'Moments from Mainbar',
    back: lang === 'de' ? 'Zur Startseite' : 'Back Home',
    instaText: lang === 'de' ? 'Folgen Sie uns auf Instagram für mehr' : 'Follow us on Instagram for more',
  };

  // Upgraded array to support both images (.jpg) and videos (.mp4)
  // Just make sure the files in your public/gallery folder match these names perfectly!
  const mediaItems = [
    { id: 1, type: 'image', src: '1.jpg' },
    { id: 2, type: 'video', src: '2.mp4' },
    { id: 3, type: 'image', src: '3.jpg' },
    { id: 4, type: 'video', src: '4.mp4' },
    { id: 5, type: 'image', src: '5.jpg' },
    { id: 6, type: 'image', src: '6.jpg' },
  ];

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-gray-800 p-6 md:p-12 font-sans relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-gray-200">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-5xl font-light tracking-wide text-[#7a6c82] font-serif">{t.title}</h1>
            <p className="text-sm text-gray-400 uppercase tracking-widest mt-2">{t.subtitle}</p>
          </div>
          <Link href="/" className="text-sm uppercase tracking-widest text-[#7a6c82] border border-[#7a6c82] px-6 py-2 hover:bg-[#7a6c82] hover:text-white transition-colors">
            &larr; {t.back}
          </Link>
        </header>

        {/* Masonry Media Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="break-inside-avoid overflow-hidden shadow-md group relative bg-gray-200">
              
              {/* Render Image or Video conditionally */}
              {item.type === 'image' ? (
                <img 
                  src={`/gallery/${item.src}`} 
                  alt={`MainBar Gallery Media ${item.id}`} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  style={{ minHeight: item.id % 2 === 0 ? '300px' : '450px' }}
                />
              ) : (
                <video 
                  src={`/gallery/${item.src}`} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  style={{ minHeight: item.id % 2 === 0 ? '300px' : '450px' }}
                />
              )}

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-[#7a6c82]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-16 text-center">
          <a 
            href="https://www.instagram.com/mainbar_sw/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block border-b-2 border-[#7a6c82] pb-1 text-lg tracking-widest text-[#7a6c82] hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            {t.instaText} &rarr;
          </a>
        </div>
        
      </div>
    </main>
  );
}