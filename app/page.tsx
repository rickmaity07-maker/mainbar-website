"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { collection, onSnapshot, query, addDoc, orderBy } from "firebase/firestore";
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

// Natural fallback reviews if Firebase is empty
const fallbackReviews = [
  { id: "1", author: "Lisa K.", text: "Super schönes Café! Der Kaffee ist extrem lecker und die Winzerfladen sind ein Traum. Komme gerne in der Mittagspause her.", rating: 5 },
  { id: "2", author: "Markus T.", text: "Richtig coole Einrichtung und sehr nettes Personal. Das Avocado-Sandwich war der Wahnsinn, nur am Wochenende am besten vorher reservieren.", rating: 4 },
  { id: "3", author: "Julia S.", text: "Mein absoluter Lieblingsort in Schweinfurt für einen Aperol Spritz nach der Arbeit. Tolles Ambiente!", rating: 5 },
  { id: "4", author: "Timo W.", text: "Das Frühstück für zwei ist preislich absolut fair und man wird mehr als satt. Sehr liebevoll angerichtet.", rating: 5 },
  { id: "5", author: "Sophie M.", text: "Sehr entspannte Atmosphäre. Perfekt zum Abschalten. Die hausgemachte Limonade ist sehr zu empfehlen.", rating: 4 }
];

// Helper function to shuffle reviews
const shuffleArray = (array: any[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function UnifiedHomePage() {
  const [activeTab, setActiveTab] = useState(menuCategories[0]);
  const [firestoreMenuData, setFirestoreMenuData] = useState<any[]>([]);
  const [randomImage, setRandomImage] = useState<string | null>(null);
  
  // Review States
  const [reviews, setReviews] = useState<any[]>([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    author: "",
    text: "",
    rating: 5
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  // Mobile autoplay handling
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const forcePlayVideos = () => {
    videoRefs.current.forEach((video) => {
      if (!video) return;

      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    });
  };

  useEffect(() => {
    const startVideos = () => {
      requestAnimationFrame(() => {
        forcePlayVideos();
      });
    };

    startVideos();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startVideos();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 1. Fetch Menu from Firebase
  useEffect(() => {
    const qMenu = query(collection(db, "menu"));
    const unsubMenu = onSnapshot(qMenu, (snapshot) => {
      setFirestoreMenuData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubMenu();
  }, []);

  // 2. Fetch Live Reviews from Firebase (with TypeScript fix)
  useEffect(() => {
    const qReviews = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubReviews = onSnapshot(qReviews, (snapshot) => {
      let fetchedReviews: any[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter reviews: Only 3 stars or more!
      fetchedReviews = fetchedReviews.filter((r: any) => r.rating >= 3);
      
      if (fetchedReviews.length > 0) {
        setReviews(shuffleArray(fetchedReviews));
      } else {
        setReviews(shuffleArray(fallbackReviews));
      }
    });

    return () => unsubReviews();
  }, []);

  // 3. Auto Slider Effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 4000); 
    return () => clearInterval(interval);
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        author: reviewForm.author,
        text: reviewForm.text,
        rating: reviewForm.rating,
        createdAt: new Date().toISOString(),
      });
      setIsReviewFormOpen(false);
      setReviewForm({ author: "", text: "", rating: 5 });
      alert("Vielen Dank für deine Bewertung!");
    } catch (error) {
      console.error("Fehler beim Speichern der Bewertung:", error);
      alert("Es gab ein Problem. Bitte versuche es später nochmal.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-white relative">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative z-0 flex flex-col lg:flex-row min-h-svh w-full bg-[#353941] overflow-hidden">

        {/* ================= FLOATING REVIEW WIDGET (TOP LEFT) ================= */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
          
          <motion.button
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#cda1b1]/30 text-[#2d2d2d] px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span className="text-[#cda1b1] text-lg leading-none group-hover:text-yellow-400 transition-colors">
              {isReviewFormOpen ? "×" : "★"}
            </span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase mt-0.5">
              {isReviewFormOpen ? "Schließen" : "Bewerte uns"}
            </span>
          </motion.button>

          {/* Form opens directly under the button */}
          <AnimatePresence>
            {isReviewFormOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-4 w-[calc(100vw-3rem)] max-w-85 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 origin-top-left"
              >
                <div className="text-center mb-5">
                  <h3 className="font-serif text-xl text-[#2d2d2d] mb-1">Wie war dein Besuch?</h3>
                  <p className="text-[10px] text-[#a0a0a0]">Teile deine Erfahrung mit uns.</p>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex justify-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`text-3xl outline-none transition-colors ${reviewForm.rating >= star ? "text-yellow-400" : "text-gray-200 hover:text-yellow-200"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest text-[#a0a0a0] mb-1">Dein Vorname</label>
                    <input type="text" required value={reviewForm.author} onChange={(e) => setReviewForm({...reviewForm, author: e.target.value})} className="border-b border-gray-200 py-1.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-xs" placeholder="z.B. Sarah" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-widest text-[#a0a0a0] mb-1">Deine Bewertung</label>
                    <textarea rows={3} required value={reviewForm.text} onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})} className="border-b border-gray-200 py-1.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-xs resize-none" placeholder="Was hat dir besonders gefallen?" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full mt-2 bg-[#cda1b1] hover:bg-[#ebd2db] text-[#353941] py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-colors disabled:opacity-50">
                    {isSubmitting ? "Wird gesendet..." : "Bewertung absenden"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left Panel - Branding + Video */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-24 px-6 lg:p-12 text-center relative z-10 grow overflow-hidden">
          
          {/* Background video */}
          <video
            ref={(el) => {
              videoRefs.current[0] = el;
            }}
            className="absolute inset-0 w-full h-full object-cover -z-10"
            src="/media/mainbar-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }}
            onCanPlay={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }}
            onError={(e) => console.error("Hero-Video konnte nicht geladen werden:", e.currentTarget.error)}
          />

          {/* Scrim */}
          <div className="absolute inset-0 bg-[#353941]/60 -z-10" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center -mt-8 lg:-mt-16"
          >
            <div className="absolute w-40 h-40 md:w-48 md:h-48 border border-[#cda1b1]/40 rounded-full -top-4 md:-top-6 left-1/2 -translate-x-1/2 z-0"></div>
            <div className="absolute w-40 h-40 md:w-48 md:h-48 border border-[#cda1b1]/40 rounded-full -top-2 md:-top-4 left-1/2 translate-x-[-40%] z-0"></div>
            
            <h1 className="font-[family-name:var(--font-script)] text-6xl md:text-8xl lg:text-9xl text-[#cda1b1] relative z-10 leading-none drop-shadow-sm">
              MainBar
            </h1>
            
            <span className="text-[9px] md:text-xs tracking-[0.4em] text-[#cda1b1] uppercase mt-2 md:mt-3 z-10 font-normal">
              Drinks & Food
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white tracking-[0.25em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-medium mt-12 md:mt-16 mb-4"
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
            <Link href="/booking" className="text-gray-100 hover:text-white uppercase tracking-widest text-[10px] md:text-xs transition-colors border-b border-transparent hover:border-white pb-1">
              Event & Catering Buchen
            </Link>
          </motion.div>
        </div>

        {/* Right Panel - Dynamic Grid (videos) */}
        <div className="relative z-10 w-full lg:w-1/2 min-h-[50vh] lg:min-h-svh grid grid-cols-2 grid-rows-2 bg-white">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative w-full h-full border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-white overflow-hidden group">
            <video
              ref={(el) => {
                videoRefs.current[1] = el;
              }}
              src="/media/video-1.mp4"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
              onCanPlay={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }} className="relative w-full h-full border-b-2 md:border-b-4 border-white overflow-hidden group">
            <video
              ref={(el) => {
                videoRefs.current[2] = el;
              }}
              src="/media/video-2.mp4"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
              onCanPlay={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative w-full h-full border-r-2 md:border-r-4 border-white overflow-hidden group">
            <video
              ref={(el) => {
                videoRefs.current[3] = el;
              }}
              src="/media/video-3.mp4"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
              onCanPlay={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
            />
          </motion.div>

          <div className="w-full h-full bg-[#cda1b1] flex items-center justify-center p-6 md:p-12 text-center">
            <p className="text-white font-serif italic text-lg md:text-2xl lg:text-3xl leading-relaxed drop-shadow-sm">
              "Bei uns ist Qualität das Produkt der Liebe zum Detail."
            </p>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION (AUTO SLIDER) ================= */}
      <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16 px-6">
            <h2 className="font-serif text-3xl md:text-5xl text-[#2d2d2d] mb-4">Das sagen unsere Gäste</h2>
            <div className="flex justify-center items-center gap-2 text-sm text-[#a0a0a0] mb-6 font-bold tracking-widest uppercase">
              <span className="text-[#cda1b1]">★★★★★</span> Community
            </div>
            <div className="w-12 h-px bg-[#cda1b1] mx-auto"></div>
          </div>
          
          {/* Scrollable / Auto-Sliding Container */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 md:px-12 pb-8 scroll-smooth"
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="snap-center shrink-0 w-70 md:w-87.5 bg-[#faf8f5] p-8 rounded-3xl border border-[#cda1b1]/20 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
              >
                <div>
                  <div className="text-[#cda1b1] text-lg mb-4 tracking-widest">
                    {"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}
                  </div>
                  <p className="text-[#2d2d2d] text-sm md:text-base italic leading-relaxed mb-6 font-light">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#cda1b1]/20 flex items-center justify-center text-[#cda1b1] font-bold text-xs">
                    {review.author.charAt(0)}
                  </div>
                  <p className="text-[#a0a0a0] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {review.author}
                  </p>
                </div>
              </div>
            ))}
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

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative bg-white border border-[#cda1b1]/30 rounded-3xl p-6 md:p-16 shadow-sm min-h-100"
            >
              
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