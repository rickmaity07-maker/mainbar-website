"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

// 1. THIS IS YOUR COMPLETE FIREBASE BLUEPRINT
const firestoreMenuData = [
  // ================= FRÜHSTÜCK =================
  { id: "f1", category: "FRÜHSTÜCK", name: "Die Mainbar Frühstücksetagere", description: "Wilder, leckerer Mix unseres Frühstücksangebots auf einer Etagere serviert genau das richtige. Ab 2 Personen.", price: "38.90", image_url: "/media/mainbar-photo-1.jpg" },
  { id: "f2", category: "FRÜHSTÜCK", name: "Das Baggersee Frühstück", description: "Geräucherter Lachs mit Meerrettich, hausgemachter Shrimps-Cocktail, frisches Avocadomus, fränkischer Räucherschinken, 1 gekochtes Ei, frisches Gemüse, Butter & selbstgebackenes Brot/Brötchen", price: "18.90", image_url: "/media/mainbar-photo-2.jpg" },
  { id: "f3", category: "FRÜHSTÜCK", name: "Das Schweinfurter Markt Frühstück", description: "1 gekochtes Ei, Hart- und Weichkäse, Feigensenf, frisches Avocadomus, selbst eingelegter Feta, hausgemachter Kräuterfrischkäse, Marktgemüse, Butter & selbstgebackenes Brot/Brötchen. (mit frisch gepresstem O-Saft 0.25l +4,00€)", price: "17.90", image_url: "/media/mainbar-photo-3.jpg" },
  { id: "f4", category: "FRÜHSTÜCK", name: "Das Rathaus Frühstück", description: "Büffelmozzarella & Tomate, frisch aufgeschnittener Parmaschinken & italienische Salami, Rührei mit Trüffel, Butter & selbstgebackenes Brot/Brötchen (mit Prosecco 0,1 +3,50€)", price: "17.90", image_url: "/media/mainbar-photo-4.jpg" },
  { id: "f5", category: "FRÜHSTÜCK", name: "Eggs Benedict", description: "Angebratenes Brot, Rucola, frische Avocado, gekochter Schinken oder Räucherlachs, zwei pochierte Eier, Tomate, Hollandaise", price: "13.90", image_url: "/media/mainbar-photo-5.jpg" },
  { id: "f6", category: "FRÜHSTÜCK", name: "Das Kleine Spitalstraßenfrühstück", description: "Marmelade oder Honig, Butter, selbstgebackenes Brot/Brötchen, kleines hausgemachtes Granola mit griechischem Joghurt & frischen Früchten.", price: "9.90", image_url: "/media/mainbar-photo-6.jpg" },
  
  // Frühstück Extras
  { id: "fx1", category: "FRÜHSTÜCK", name: "Extra: Rührei natur", description: "Aus 3 Eiern", price: "7.90", image_url: "/media/mainbar-photo-1.jpg" },
  { id: "fx2", category: "FRÜHSTÜCK", name: "Extra: Rührei mit Bacon", description: "", price: "8.90", image_url: "/media/mainbar-photo-2.jpg" },
  { id: "fx3", category: "FRÜHSTÜCK", name: "Extra: 1x gekochtes Ei", description: "", price: "2.00", image_url: "/media/mainbar-photo-3.jpg" },
  { id: "fx4", category: "FRÜHSTÜCK", name: "Extra: Butter | Honig | Frischkäse | Marmelade", description: "", price: "1.50", image_url: "/media/mainbar-photo-4.jpg" },
  { id: "fx5", category: "FRÜHSTÜCK", name: "Extra: Portion Lachs & Sahnemeerrettich", description: "", price: "6.00", image_url: "/media/mainbar-photo-5.jpg" },
  { id: "fx6", category: "FRÜHSTÜCK", name: "Extra: Hausgemachtes Granola", description: "Joghurt & Früchte", price: "8.90", image_url: "/media/mainbar-photo-6.jpg" },
  { id: "fx7", category: "FRÜHSTÜCK", name: "Extra: Portion selbstgebackenes Brot/Brötchen", description: "", price: "3.50", image_url: "/media/mainbar-photo-1.jpg" },

  // ================= GESCHMACKSSACHEN (BROTE & SANDWICHES) =================
  { id: "g1", category: "GESCHMACKSSACHEN", name: "Brot: Avocado & Spiegelei", description: "Frisches Avocadomus & Spiegelei auf selbstgebackenem Brot", price: "12.90", image_url: "/media/mainbar-photo-7.jpg" },
  { id: "g2", category: "GESCHMACKSSACHEN", name: "Brot: Pesto & Parmaschinken", description: "Pesto, Parmaschinken, Rucola & Parmesan auf selbstgebackenem Brot", price: "13.90", image_url: "/media/mainbar-photo-8.jpg" },
  { id: "g3", category: "GESCHMACKSSACHEN", name: "Brot: Avocado & Räucherlachs", description: "Frischkäse, frische Avocado & Räucherlachs auf selbstgebackenem Brot", price: "14.90", image_url: "/media/mainbar-photo-7.jpg" },
  { id: "g4", category: "GESCHMACKSSACHEN", name: "Brot: Geräucherter Schinken", description: "Geräucherter Schinken, Spiegelei & Saure Gurke auf selbstgebackenem Brot", price: "11.90", image_url: "/media/mainbar-photo-8.jpg" },
  { id: "g5", category: "GESCHMACKSSACHEN", name: "Brot: Grillgemüse", description: "Frischkäse, Rucola, Grillgemüse, Parmesan auf selbstgebackenem Brot", price: "14.90", image_url: "/media/mainbar-photo-7.jpg" },
  
  // Sandwiches
  { id: "s1", category: "GESCHMACKSSACHEN", name: "Sandwich: Thunfisch", description: "Thunfisch, Tomate, Gurke, Spiegelei", price: "14.90", image_url: "/media/mainbar-photo-11.jpg" },
  { id: "s2", category: "GESCHMACKSSACHEN", name: "Sandwich: Avocado Mozzarella", description: "Avocado, Rucola, Tomate, Mozzarella, Hausgemachtes Pesto", price: "13.90", image_url: "/media/mainbar-photo-11.jpg" },
  { id: "s3", category: "GESCHMACKSSACHEN", name: "Sandwich: Avocado Bacon", description: "Avocado, Rucola, Tomate, Mozzarella, Hausgemachtes Pesto, Bacon", price: "14.90", image_url: "/media/mainbar-photo-11.jpg" },
  { id: "s4", category: "GESCHMACKSSACHEN", name: "Sandwich: Hähnchenfleisch", description: "Hähnchenfleisch, Tomate, Gurke, Bacon, Salat, Spiegelei, Mainbarsoße", price: "15.50", image_url: "/media/mainbar-photo-11.jpg" },
  { id: "s5", category: "GESCHMACKSSACHEN", name: "Extra: Mainbar Pommes", description: "Toppe dein Sandwich mit Mainbar Pommes", price: "3.90", image_url: "/media/mainbar-photo-11.jpg" },

  // ================= WINZERFLADEN =================
  { id: "w1", category: "WINZERFLADEN", name: "Winzerfladen: Klassisch", description: "Schmand - rote Balsamico-Zwiebeln - fränkischer Bauernspeck, Trauben", price: "13.90", image_url: "/media/mainbar-photo-9.jpg" },
  { id: "w2", category: "WINZERFLADEN", name: "Winzerfladen: Mediterran", description: "Schmand - Cherry-Tomaten - Rucola - Parma Schinken - hausgemachtes Pesto - Parmesan", price: "14.90", image_url: "/media/mainbar-photo-10.jpg" },
  { id: "w3", category: "WINZERFLADEN", name: "Winzerfladen: Vegetarisch", description: "Schmand - Rucola - Grillgemüse-Pesto - Parmesan (Auch Vegan Möglich)", price: "14.90", image_url: "/media/mainbar-photo-9.jpg" },
  { id: "w4", category: "WINZERFLADEN", name: "Winzerfladen: Bruschetta", description: "Schmand - gewürfelte Tomaten - Knoblauch - Olivenöl (Auch Vegan Möglich)", price: "13.90", image_url: "/media/mainbar-photo-10.jpg" },

  // ================= HEISSGETRÄNKE =================
  { id: "h1", category: "HEISSGETRÄNKE", name: "Cafe Crema", description: "Groß: 4.80€", price: "3.50", image_url: "/media/mainbar-photo-12.jpg" },
  { id: "h2", category: "HEISSGETRÄNKE", name: "Cappuccino", description: "Groß: 5.40€", price: "3.90", image_url: "/media/mainbar-photo-13.jpg" },
  { id: "h3", category: "HEISSGETRÄNKE", name: "Espresso", description: "Doppelter Espresso: 4.40€", price: "2.80", image_url: "/media/mainbar-photo-12.jpg" },
  { id: "h4", category: "HEISSGETRÄNKE", name: "Espresso Macchiato", description: "", price: "3.00", image_url: "/media/mainbar-photo-12.jpg" },
  { id: "h5", category: "HEISSGETRÄNKE", name: "Flat White", description: "", price: "5.00", image_url: "/media/mainbar-photo-14.jpg" },
  { id: "h6", category: "HEISSGETRÄNKE", name: "Latte Macchiato", description: "", price: "4.80", image_url: "/media/mainbar-photo-14.jpg" },
  { id: "h7", category: "HEISSGETRÄNKE", name: "Milchkaffee", description: "", price: "4.80", image_url: "/media/mainbar-photo-14.jpg" },
  { id: "h8", category: "HEISSGETRÄNKE", name: "Filterkaffee Pott", description: "", price: "4.80", image_url: "/media/mainbar-photo-12.jpg" },
  { id: "h9", category: "HEISSGETRÄNKE", name: "Chai Latte", description: "Tiger Spice oder Vanilla (+ Espresso Shot 6.90€)", price: "5.70", image_url: "/media/mainbar-photo-15.jpg" },
  { id: "h10", category: "HEISSGETRÄNKE", name: "Trinkschokolade", description: "", price: "5.40", image_url: "/media/mainbar-photo-15.jpg" },
  { id: "h11", category: "HEISSGETRÄNKE", name: "Tasse Tee", description: "Versch. Sorten von MEE TEE: Beerenstark, Earl Grey, Minze, Rooibos Orange, Chai Tee oder Grüner Tee", price: "4.50", image_url: "/media/mainbar-photo-15.jpg" },
  { id: "h12", category: "HEISSGETRÄNKE", name: "Aufpreis Hafermilch", description: "", price: "0.50", image_url: "/media/mainbar-photo-12.jpg" },

  // ================= ALKOHOLFREI =================
  { id: "a1", category: "ALKOHOLFREI", name: "Rhön Sprudel", description: "Leise oder laut (0,25l / 0,75l 5.90€)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { id: "a2", category: "ALKOHOLFREI", name: "Fritz Kola", description: "Normal oder zuckerfrei (0,33l)", price: "4.40", image_url: "/media/mainbar-photo-16.jpg" },
  { id: "a3", category: "ALKOHOLFREI", name: "Orangina", description: "Rot oder gelb (0,25l)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { id: "a4", category: "ALKOHOLFREI", name: "Soda Lemon", description: "(0,33l)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { id: "a5", category: "ALKOHOLFREI", name: "Saft Schorle", description: "Apfel oder Johannisbeere (0,25l / 0,40l 4.90€)", price: "3.30", image_url: "/media/mainbar-photo-16.jpg" },
  { id: "a6", category: "ALKOHOLFREI", name: "Orangensaft", description: "Frisch gepresst (0,25l)", price: "5.90", image_url: "/media/mainbar-photo-16.jpg" },
  { id: "a7", category: "ALKOHOLFREI", name: "Thomas Henry", description: "Tonic Water, Bitter Lemon oder Pink Grapefruit (0,20l)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { id: "a8", category: "ALKOHOLFREI", name: "Hausgemachte Limonade", description: "Zitrone-Ingwer-Minze oder Himbeer-Rosmarin (0,40l)", price: "5.60", image_url: "/media/mainbar-photo-16.jpg" },

  // ================= APERITIF & BIER =================
  { id: "ap1", category: "APERITIF & BIER", name: "Mainbar Spritz", description: "Hausgemachter Zitronen-Ingwer-Sirup - Secco - Zitrone (0,25l)", price: "7.40", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "ap2", category: "APERITIF & BIER", name: "Aperol Spritz", description: "Aperol - Secco - Orange (0,25l)", price: "6.90", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "ap3", category: "APERITIF & BIER", name: "Limoncello Spritz", description: "Limoncello - Secco - Zitrone (0,25l)", price: "6.90", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "ap4", category: "APERITIF & BIER", name: "Campari Spritz", description: "Campari - Secco - Orange (0,25l)", price: "6.90", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "ap5", category: "APERITIF & BIER", name: "Sarti Spritz", description: "Sarti (Blutorangenlikör) - Secco - Bitter Lemon (0,25l)", price: "7.40", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "ap6", category: "APERITIF & BIER", name: "Belsazar Spritz", description: "Belsazar Vermouth Rose - Secco - Soda - Orange (0,25l)", price: "7.40", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "ap7", category: "APERITIF & BIER", name: "Crodino Spritz", description: "Alkoholfrei - Crodino - Soda - Orange (0,25l)", price: "5.90", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "ap8", category: "APERITIF & BIER", name: "Mainbar Secco", description: "trocken (0,10l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },
  
  // Bier
  { id: "b1", category: "APERITIF & BIER", name: "Pils, Schlapper Seppel", description: "(0,33l)", price: "4.50", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "b2", category: "APERITIF & BIER", name: "Helles, Bayreuther", description: "(0,33l)", price: "4.50", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "b3", category: "APERITIF & BIER", name: "Naturtrübes Radler", description: "(0,50l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "b4", category: "APERITIF & BIER", name: "Hefeweizen", description: "Auch alkoholfrei (0,50l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },
  { id: "b5", category: "APERITIF & BIER", name: "Bayreuther Alk. Frei", description: "(0,50l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },

  // ================= WEINE & LONGDRINKS =================
  { id: "wl1", category: "WEINE & LONGDRINKS", name: "Silvaner", description: "Trocken. Weingut Schmitt aus Bergtheim (0,25l)", price: "7.20", image_url: "/media/mainbar-photo-19.jpg" },
  { id: "wl2", category: "WEINE & LONGDRINKS", name: "Pinot Grigio", description: "Trocken (0,25l)", price: "7.50", image_url: "/media/mainbar-photo-19.jpg" },
  { id: "wl3", category: "WEINE & LONGDRINKS", name: "Scheurebe", description: "Halbtrocken (0,25l)", price: "7.50", image_url: "/media/mainbar-photo-19.jpg" },
  { id: "wl4", category: "WEINE & LONGDRINKS", name: "Carbanet Dorsa", description: "Rot, Trocken (0,25l)", price: "8.50", image_url: "/media/mainbar-photo-19.jpg" },
  { id: "wl5", category: "WEINE & LONGDRINKS", name: "Negroni", description: "Tanqueray - Campari - Vermouth Rosso", price: "8.20", image_url: "/media/mainbar-photo-18.jpg" },
  { id: "wl6", category: "WEINE & LONGDRINKS", name: "Espresso MainTini", description: "Absolut Vodka - Kahlua Kaffee Likör - Espresso", price: "8.20", image_url: "/media/mainbar-photo-18.jpg" },
  { id: "wl7", category: "WEINE & LONGDRINKS", name: "Absolut Vodka", description: "Mit Red Bull, Bitter Lemon oder Soda", price: "7.90", image_url: "/media/mainbar-photo-18.jpg" },
  { id: "wl8", category: "WEINE & LONGDRINKS", name: "Tanqueray - London Dry", description: "Mit Tonic Water. Aromen: Wacholder, Zitrone, Limette", price: "7.90", image_url: "/media/mainbar-photo-18.jpg" },
  { id: "wl9", category: "WEINE & LONGDRINKS", name: "Saisonale Winzerbrände", description: "Weingut Schmitt/Bergtheim (2cl)", price: "4.00", image_url: "/media/mainbar-photo-18.jpg" },
];

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
  const [randomImage, setRandomImage] = useState<string | null>(null);

  const activeItems = firestoreMenuData.filter(item => item.category === activeTab);

  // Safely compute the random image on the client side when the tab changes
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
  }, [activeTab, activeItems]);

  // Framer Motion Custom Buttery Scroll Physics
  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      const targetY = menuSection.getBoundingClientRect().top + window.scrollY;
      animate(window.scrollY, targetY, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Apple-style custom ease-out-expo curve
        onUpdate: (value) => window.scrollTo(0, value),
      });
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-white">
      
      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col lg:flex-row min-h-[100svh] w-full bg-[#353941]">
        
        {/* Left Panel - Branding */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 text-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center mt-[-2rem]"
          >
            <div className="absolute w-48 h-48 border-[1px] border-[#cda1b1]/40 rounded-full -top-6 left-1/2 -translate-x-1/2 z-0"></div>
            <div className="absolute w-48 h-48 border-[1px] border-[#cda1b1]/40 rounded-full -top-4 left-1/2 -translate-x-[40%] z-0"></div>
            
            <h1 className="font-[family-name:var(--font-script)] text-7xl md:text-8xl lg:text-9xl text-[#cda1b1] relative z-10 leading-none drop-shadow-sm">
              MainBar
            </h1>
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#cda1b1] uppercase mt-3 z-10 font-normal">
              Drinks & Food
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#9ba4b5] tracking-[0.3em] uppercase text-sm font-medium mt-16 mb-4"
          >
            Café & Patisserie
          </motion.h2>

          <motion.button
            onClick={scrollToMenu}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="mt-6 bg-[#cda1b1] text-[#353941] px-12 py-4 rounded-full font-semibold uppercase tracking-widest text-xs md:text-sm hover:bg-[#ebd2db] transition-colors duration-300 shadow-md"
          >
            Zur Speisekarte
          </motion.button>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
            <Link href="/booking" className="text-[#9ba4b5] hover:text-white uppercase tracking-widest text-[10px] md:text-xs transition-colors border-b border-transparent hover:border-white pb-1">
              Event & Catering Buchen
            </Link>
          </motion.div>
        </div>

        {/* Right Panel - Dynamic Grid */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen grid grid-cols-2 grid-rows-2 bg-white">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative w-full h-full border-r-[4px] border-b-[4px] border-white overflow-hidden group">
            <Image src="/media/mainbar-photo-1.jpg" alt="Interior" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }} className="relative w-full h-full border-b-[4px] border-white overflow-hidden group">
            <Image src="/media/mainbar-photo-2.jpg" alt="Food" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative w-full h-full border-r-[4px] border-white overflow-hidden group">
            <Image src="/media/mainbar-photo-3.jpg" alt="Pastries" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <div className="w-full h-full bg-[#cda1b1] flex items-center justify-center p-8 md:p-12 text-center">
            <p className="text-white font-serif italic text-xl md:text-2xl lg:text-3xl leading-relaxed drop-shadow-sm">
              "Bei uns ist Qualität das Produkt der Liebe zum Detail."
            </p>
          </div>
        </div>
      </section>

      {/* ================= ELEGANT MENU SECTION ================= */}
      <section id="menu-section" className="min-h-screen bg-[#faf8f5] px-6 py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#2d2d2d] mb-6">Unser Menü</h2>
            <div className="w-12 h-[1px] bg-[#cda1b1] mx-auto"></div>
          </div>

          {/* Animated Category Tabs */}
          <div className="flex justify-center gap-2 md:gap-4 mb-16 flex-wrap">
            {menuCategories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors ${
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
              className="relative bg-white border-[1px] border-[#cda1b1]/30 rounded-3xl p-8 md:p-16 shadow-sm min-h-[400px]"
            >
              
              {/* Randomized Floating Corner Image */}
              {randomImage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                  className="hidden md:block absolute -top-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 pointer-events-none"
                >
                  <Image src={randomImage} alt="Menu Highlight" fill className="object-cover" />
                </motion.div>
              )}

              {/* Text-Based Menu Items */}
              <div className="w-full md:w-3/4 pr-0 md:pr-8">
                {activeItems.map((item) => (
                  <div key={item.id} className="mb-8 group">
                    <div className="flex justify-between items-baseline border-b border-gray-100 pb-2 mb-2">
                      <h3 className="font-serif text-[17px] md:text-lg text-[#2d2d2d] group-hover:text-[#cda1b1] transition-colors">{item.name}</h3>
                      <span className="font-bold text-[#cda1b1] text-sm md:text-base whitespace-nowrap pl-4">
                        € {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-[#a0a0a0] leading-relaxed font-light pr-12">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

    </main>
  );
}