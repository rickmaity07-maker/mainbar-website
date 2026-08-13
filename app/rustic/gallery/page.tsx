"use client";

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

export default function RusticGallery() {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  
  const t = {
    title: lang === 'de' ? 'Erinnerungen' : 'Memories',
    back: lang === 'de' ? 'Zurück nach Hause' : 'Back Home',
  };

  // 9 Images with mathematically forced dimensions to perfectly balance a 3-column layout
  const images = [
    "/media/mainbar-photo-1.jpg", // Landscape
    "/media/mainbar-photo-2.jpg", // Portrait
    "/media/mainbar-photo-3.jpg", // Landscape
    "/media/mainbar-photo-4.jpg", // Portrait
    "/media/mainbar-photo-5.jpg", // Landscape
    "/media/mainbar-photo-6.jpg", // Portrait
    "/media/mainbar-photo-7.jpg", // Landscape
    "/media/mainbar-photo-8.jpg", // Portrait
    "/media/mainbar-photo-9.jpg", // Landscape
  ];

  const openLightbox = (index: number) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);
  const nextImage = (e: React.MouseEvent) => { e.stopPropagation(); if (currentIndex !== null) setCurrentIndex((currentIndex + 1) % images.length); };
  const prevImage = (e: React.MouseEvent) => { e.stopPropagation(); if (currentIndex !== null) setCurrentIndex((currentIndex - 1 + images.length) % images.length); };

  return (
    <main className="min-h-screen bg-[#F9F6F0] text-[#5C4033] font-serif p-6 md:p-12 overflow-x-hidden relative pb-24">
      
      <style>{`
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; opacity: 0; }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-[#C07F67] hidden sm:block"></div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-wide text-[#4A332A] text-center">{t.title}</h1>
            <div className="h-px w-8 bg-[#C07F67] hidden sm:block"></div>
          </div>
          <Link href="/rustic" className="text-xs md:text-sm tracking-widest uppercase font-sans font-semibold text-[#C07F67] hover:text-[#A86A55] transition-colors border-b-2 border-transparent hover:border-[#A86A55]">
            {t.back}
          </Link>
        </div>
        
        {/* Masonry Image Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              onClick={() => openLightbox(idx)}
              className="group overflow-hidden rounded-xl shadow-md animate-fade-up bg-white p-2 cursor-pointer break-inside-avoid" 
              style={{ animationDelay: `${300 + (idx * 100)}ms` }}
            >
              <img src={src} alt={`MainBar Rustic Cafe ${idx + 1}`} className="w-full h-auto object-cover rounded-lg transform transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {currentIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-[#4A332A]/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-6 right-8 text-[#F9F6F0] text-4xl hover:text-[#C07F67] transition-colors">&times;</button>
          <button onClick={prevImage} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-[#F9F6F0] text-5xl md:text-7xl hover:text-[#C07F67] p-4 transition-colors">&#8249;</button>
          <img src={images[currentIndex]} alt="Expanded View" className="max-h-[85vh] max-w-full object-contain rounded-sm shadow-2xl border-4 border-[#F9F6F0]" onClick={(e) => e.stopPropagation()} />
          <button onClick={nextImage} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-[#F9F6F0] text-5xl md:text-7xl hover:text-[#C07F67] p-4 transition-colors">&#8250;</button>
        </div>
      )}
    </main>
  );
}