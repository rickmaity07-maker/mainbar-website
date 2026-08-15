"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const menuCategories = [
  "FRÜHSTÜCK", 
  "GESCHMACKSSACHEN", 
  "WINZERFLADEN",
  "HEISSGETRÄNKE", 
  "ALKOHOLFREI", 
  "APERITIF & BIER", 
  "WEINE & LONGDRINKS"
];

export default function UnifiedHomePage() {
  const [activeTab, setActiveTab] = useState(menuCategories[0]);
  const [firestoreMenuData, setFirestoreMenuData] = useState<any[]>([]);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  // Fetch live menu items from Firestore
  useEffect(() => {
    const q = query(collection(db, "menu"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirestoreMenuData(items);
    });

    return () => unsubscribe();
  }, []);

  const activeItems = firestoreMenuData.filter(item => item.category === activeTab);

  useEffect(() => {
    const imagesForTab = activeItems
      .filter(item => item.image_url)
      .map(item => item.image_url);

    if (imagesForTab.length > 0) {
      const randomIndex = Math.floor(Math.random() * imagesForTab.length);
      setRandomImage(imagesForTab[randomIndex]);
    } else {
      setRandomImage(null);
    }
  }, [activeTab, firestoreMenuData]);

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      const targetY = menuSection.getBoundingClientRect().top + window.scrollY;
      animate(window.scrollY, targetY, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], 
        onUpdate: (value) => window.scrollTo(0, value),
      });
    }
  };

  return (
    // Note: added 'relative' to the main container so the absolute footer link anchors correctly to the page bottom
    <main className="flex flex-col min-h-screen w-full bg-white relative">
      
      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col lg:flex-row min-h-svh w-full bg-[#353941]">
        
        {/* Left Panel - Branding */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-24 px-6 lg:p-12 text-center relative z-10 grow">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center -mt-8 lg:-mt-16"
          >
            <div className="absolute w-40 h-40 md:w-48 md:h-48 border border-[#cda1b1]/40 rounded-full -top-4 md:-top-6 left-1/2 -translate-x-1/2 z-0"></div>
            <div className="absolute w-40 h-40 md:w-48 md:h-48 border border-[#cda1b1]/40 rounded-full -top-2 md:-top-4 left-1/2 translate-x-[-40%] z-0"></div>
            
            <h1 className="font-(family-name:--font-script) text-6xl md:text-8xl lg:text-9xl text-[#cda1b1] relative z-10 leading-none drop-shadow-sm">
              MainBar
            </h1>
            
            {/* Reverted back to plain text */}
            <span className="text-[9px] md:text-xs tracking-[0.4em] text-[#cda1b1] uppercase mt-2 md:mt-3 z-10 font-normal">
              Drinks & Food
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#9ba4b5] tracking-[0.25em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-medium mt-12 md:mt-16 mb-4"
          >
            Café & Patisserie
          </motion.h2>

          <motion.button
            onClick={scrollToMenu}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="mt-6 bg-[#cda1b1] text-[#353941] px-10 md:px-12 py-3.5 md:py-4 rounded-full font-semibold uppercase tracking-widest text-[11px] md:text-sm hover:bg-[#ebd2db] transition-colors duration-300 shadow-md"
          >
            Zur Speisekarte
          </motion.button>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 p-2">
            <Link href="/booking" className="text-[#9ba4b5] hover:text-white uppercase tracking-widest text-[10px] md:text-xs transition-colors border-b border-transparent hover:border-white pb-1">
              Event & Catering Buchen
            </Link>
          </motion.div>
        </div>

        {/* Right Panel - Dynamic Grid */}
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-svh grid grid-cols-2 grid-rows-2 bg-white">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative w-full h-full border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-white overflow-hidden group">
            <Image src="/media/mainbar-photo-1.jpg" alt="Interior" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }} className="relative w-full h-full border-b-2 md:border-b-4 border-white overflow-hidden group">
            <Image src="/media/mainbar-photo-2.jpg" alt="Food" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative w-full h-full border-r-2 md:border-r-4 border-white overflow-hidden group">
            <Image src="/media/mainbar-photo-3.jpg" alt="Pastries" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <div className="w-full h-full bg-[#cda1b1] flex items-center justify-center p-6 md:p-12 text-center">
            <p className="text-white font-serif italic text-lg md:text-2xl lg:text-3xl leading-relaxed drop-shadow-sm">
              "Bei uns ist Qualität das Produkt der Liebe zum Detail."
            </p>
          </div>
        </div>
      </section>

      {/* ================= ELEGANT MENU SECTION ================= */}
      <section id="menu-section" className="min-h-screen bg-[#faf8f5] px-4 md:px-6 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-[#2d2d2d] mb-4 md:mb-6">Unser Menü</h2>
            <div className="w-12 h-px bg-[#cda1b1] mx-auto"></div>
          </div>

          {/* Tabs: Swipeable on mobile (overflow-x-auto), clean multi-line wrapping grid on laptop (lg:flex-wrap lg:justify-center) */}
          <div className="flex justify-start lg:justify-center lg:flex-wrap gap-2 mb-10 md:mb-16 overflow-x-auto lg:overflow-x-visible hide-scrollbar pb-4 lg:pb-0 snap-x snap-mandatory">
            {menuCategories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`snap-center shrink-0 relative px-4 md:px-5 py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors ${
                  activeTab === tab ? "text-white" : "text-[#a0a0a0] hover:text-[#2d2d2d]"
                }`}
              >
                {activeTab === tab && (
                  <motion.div layoutId="active-tab" className="absolute inset-0 bg-[#353941] rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* Bordered Menu List Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative bg-white border border-[#cda1b1]/30 rounded-3xl p-6 md:p-16 shadow-sm min-h-100"
            >
              
              {/* Randomized Floating Corner Image */}
              {randomImage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                  className="hidden md:block absolute -top-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 pointer-events-none"
                >
                  <Image src={randomImage} alt="Menu Highlight" fill sizes="(max-width: 768px) 0vw, 200px" className="object-cover" />
                </motion.div>
              )}

              {/* Text-Based Menu Items */}
              <div className="w-full md:w-3/4 pr-0 md:pr-8">
                {activeItems.length === 0 ? (
                  <p className="text-[#a0a0a0] text-sm py-10 text-center">Keine Gerichte in dieser Kategorie gefunden.</p>
                ) : (
                  activeItems.map((item) => (
                    <div key={item.id} className="mb-6 md:mb-8 group">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b border-gray-100 pb-2 mb-2 gap-1 sm:gap-4">
                        <h3 className="font-serif text-[16px] md:text-lg text-[#2d2d2d] group-hover:text-[#cda1b1] transition-colors">{item.name}</h3>
                        <span className="font-bold text-[#cda1b1] text-sm md:text-base whitespace-nowrap">
                          € {item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[11px] md:text-xs text-[#a0a0a0] leading-relaxed font-light md:pr-12">{item.description}</p>
                    )}
                    </div>
                  ))
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ====== THE SECRET ADMIN DOOR ====== */}
      {/* Completely invisible 60x60 square in the absolute bottom-right corner of the whole page */}
      <Link 
        href="/admin" 
        className="absolute bottom-0 right-0 w-16 h-16 bg-transparent text-transparent cursor-default select-none z-0"
        tabIndex={-1} 
        aria-hidden="true"
      >
        .
      </Link>
    </main>
  );
}