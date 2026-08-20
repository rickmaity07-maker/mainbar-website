"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase"; 
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const menuCategories = [
  "FRÜHSTÜCK", "GESCHMACKSSACHEN", "WINZERFLADEN",
  "HEISSGETRÄNKE", "ALKOHOLFREI", "APERITIF & BIER", "WEINE & LONGDRINKS"
];

export default function AdminPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation State ("bookings", "old_bookings", "menu")
  const [activeTab, setActiveTab] = useState("bookings");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data State
  const [bookings, setBookings] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  
  // Menu Form State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuForm, setMenuForm] = useState({
    category: menuCategories[0],
    name: "",
    description: "",
    price: "",
    image_url: "",
    isExtra: false
  });

  // Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 1. Listen for Authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch live data from Firestore when user is logged in
  useEffect(() => {
    if (!user) return;

    const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubBookings = onSnapshot(qBookings, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qMenu = query(collection(db, "menu"));
    const unsubMenu = onSnapshot(qMenu, (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubBookings();
      unsubMenu();
    };
  }, [user]);

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  // --- AUTH HANDLERS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError("Falsche E-Mail oder Passwort.");
      } else {
        setError(`Fehler: ${err.message}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsMobileMenuOpen(false);
  };

  // --- BOOKING STATUS HANDLER ---
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Fehler beim Aktualisieren des Status.");
    }
  };

  // --- FILTER BOOKINGS BY DATE ---
  const todayStr = new Date().toISOString().split("T")[0];

  const activeBookings = bookings.filter(b => {
    if (!b.date) return true; 
    return b.date >= todayStr;
  });

  const oldBookings = bookings.filter(b => {
    if (!b.date) return false;
    return b.date < todayStr;
  });

  // --- MENU HANDLERS ---
  const resetMenuForm = () => {
    setMenuForm({ category: menuCategories[0], name: "", description: "", price: "", image_url: "", isExtra: false });
    setEditingId(null);
    setIsMenuModalOpen(false);
  };

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "menu", editingId), menuForm);
      } else {
        await addDoc(collection(db, "menu"), menuForm);
      }
      resetMenuForm();
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Fehler beim Speichern des Gerichts.");
    }
  };

  const handleEditClick = (item: any) => {
    setMenuForm({
      category: item.category,
      name: item.name,
      description: item.description || "",
      price: item.price,
      image_url: item.image_url || "",
      isExtra: item.isExtra || false
    });
    setEditingId(item.id);
    setIsMenuModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Möchten Sie dieses Gericht wirklich löschen?")) {
      await deleteDoc(doc(db, "menu", id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <div className="w-8 h-8 border-4 border-[#cda1b1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ================= UNAUTHENTICATED VIEW (LOGIN) =================
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#353941] p-6 relative">
        <Link href="/" className="absolute top-8 left-6 text-[#a0a0a0] hover:text-[#cda1b1] text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors">
          ← Zurück zur Webseite
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-script)] text-5xl text-[#cda1b1] mb-2">MainBar</h1>
            <h2 className="text-[#a0a0a0] uppercase tracking-widest text-xs font-bold">Admin Portal</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-2">E-Mail</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="border-b border-gray-200 py-2.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-base" 
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-2">Passwort</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="border-b border-gray-200 py-2.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-base" 
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}
            <button 
              type="submit" 
              disabled={isLoggingIn} 
              className="w-full mt-4 bg-[#cda1b1] hover:bg-[#ebd2db] text-[#353941] py-4 rounded-full font-semibold uppercase tracking-widest text-xs transition-colors active:scale-[0.98]"
            >
              {isLoggingIn ? "Wird geladen..." : "Einloggen"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ================= AUTHENTICATED VIEW (DASHBOARD) =================
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col md:flex-row">
      
      {/* ========== MOBILE TOP BAR ========== */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label="Menü öffnen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2d2d2d]">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="font-[family-name:var(--font-script)] text-2xl text-[#cda1b1] leading-none">MainBar</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-[11px] font-bold uppercase tracking-widest text-red-400 px-3 py-1.5 rounded-full hover:bg-red-50 active:bg-red-100 transition-colors"
        >
          Ausloggen
        </button>
      </header>

      {/* ========== MOBILE DRAWER ========== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-white shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h1 className="font-[family-name:var(--font-script)] text-3xl text-[#cda1b1]">MainBar</h1>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 rounded-xl hover:bg-gray-50 text-gray-400"
                  aria-label="Menü schließen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                <button 
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-colors ${activeTab === "bookings" ? "bg-[#faf8f5] text-[#2d2d2d]" : "text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d]"}`}
                >
                  📅 Event Anfragen ({activeBookings.length})
                </button>
                <button 
                  onClick={() => setActiveTab("old_bookings")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-colors ${activeTab === "old_bookings" ? "bg-[#faf8f5] text-[#2d2d2d]" : "text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d]"}`}
                >
                  📁 Vergangene Events ({oldBookings.length})
                </button>
                <button 
                  onClick={() => setActiveTab("menu")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-colors ${activeTab === "menu" ? "bg-[#faf8f5] text-[#2d2d2d]" : "text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d]"}`}
                >
                  🍽️ Menü Manager
                </button>
              </nav>

              <div className="p-4 border-t border-gray-100 space-y-1">
                <p className="px-4 py-2 text-[11px] text-[#a0a0a0] truncate">
                  {user.email}
                </p>
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3.5 text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d] rounded-xl text-sm font-bold tracking-wide transition-colors"
                >
                  🌐 Zur Webseite
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-3.5 text-red-400 hover:bg-red-50 rounded-xl text-sm font-bold tracking-wide transition-colors"
                >
                  Ausloggen
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col shrink-0">
        <div className="p-8 border-b border-gray-100">
          <h1 className="font-[family-name:var(--font-script)] text-3xl text-[#cda1b1]">MainBar</h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("bookings")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors ${activeTab === "bookings" ? "bg-[#faf8f5] text-[#2d2d2d]" : "text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d]"}`}
          >
            📅 Event Anfragen ({activeBookings.length})
          </button>
          <button 
            onClick={() => setActiveTab("old_bookings")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors ${activeTab === "old_bookings" ? "bg-[#faf8f5] text-[#2d2d2d]" : "text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d]"}`}
          >
            📁 Vergangene Events ({oldBookings.length})
          </button>
          <button 
            onClick={() => setActiveTab("menu")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors ${activeTab === "menu" ? "bg-[#faf8f5] text-[#2d2d2d]" : "text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d]"}`}
          >
            🍽️ Menü Manager
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link href="/" className="block w-full text-left px-4 py-3 text-[#a0a0a0] hover:bg-[#faf8f5] hover:text-[#2d2d2d] rounded-xl text-sm font-bold tracking-wide transition-colors">
            🌐 Zur Webseite
          </Link>
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-50 rounded-xl text-sm font-bold tracking-wide transition-colors">
            Ausloggen
          </button>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-57px)] md:max-h-screen relative">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2d2d2d]">
            {activeTab === "bookings" && "Aktuelle Event Anfragen"}
            {activeTab === "old_bookings" && "Vergangene Events"}
            {activeTab === "menu" && "Menü Manager"}
          </h2>
          <span className="text-[11px] sm:text-xs font-medium text-[#a0a0a0] bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm self-start sm:self-auto hidden md:inline-block">
            Eingeloggt als: {user.email}
          </span>
        </header>

        {/* --- VIEW: ACTIVE BOOKINGS --- */}
        {activeTab === "bookings" && (
          <div className="space-y-3 sm:space-y-4">
            {activeBookings.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 text-center py-16 sm:py-20">
                <p className="text-[#a0a0a0] text-sm">Keine aktuellen Event-Anfragen vorhanden.</p>
              </div>
            ) : (
              activeBookings.map((booking) => {
                const currentStatus = booking.status || "Neu";
                return (
                  <div 
                    key={booking.id} 
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col gap-4"
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <select
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer border-0 outline-none ${
                          currentStatus === "Bestätigt" ? "bg-green-100 text-green-700" :
                          currentStatus === "Storniert" ? "bg-red-100 text-red-700" :
                          "bg-amber-100 text-amber-700"
                        }`}
                      >
                        <option value="Neu">Neu / Warteliste</option>
                        <option value="Bestätigt">Bestätigt</option>
                        <option value="Storniert">Storniert</option>
                      </select>

                      <span className="text-xs sm:text-sm font-bold text-[#cda1b1]">
                        📅 {booking.date ? new Date(booking.date).toLocaleDateString('de-DE') : "Kein Datum"}
                      </span>
                    </div>

                    <div>
                      <p className="text-[#2d2d2d] font-bold text-base sm:text-lg mb-1 break-all">{booking.email}</p>
                      <div className="text-[#a0a0a0] text-xs sm:text-sm flex flex-col sm:flex-row sm:gap-4 gap-1">
                        <span>📞 {booking.phone}</span>
                        <span>📍 {booking.city}, {booking.state}</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#faf8f5] px-4 sm:px-6 py-3 sm:py-4 rounded-xl">
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#a0a0a0] mb-1">Details</p>
                      <p className="text-[#2d2d2d] font-medium text-sm">
                        {booking.guests} Personen • {booking.seating === "inside" ? "Im Café" : booking.seating === "outside" ? "Außenbereich" : "Catering"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* --- VIEW: OLD/PAST BOOKINGS --- */}
        {activeTab === "old_bookings" && (
          <div className="space-y-3 sm:space-y-4">
            {oldBookings.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 text-center py-16 sm:py-20">
                <p className="text-[#a0a0a0] text-sm">Keine vergangenen Events vorhanden.</p>
              </div>
            ) : (
              oldBookings.map((booking) => {
                const currentStatus = booking.status || "Neu";
                return (
                  <div 
                    key={booking.id} 
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 opacity-80 flex flex-col gap-4"
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                        currentStatus === "Bestätigt" ? "bg-green-100 text-green-700" :
                        currentStatus === "Storniert" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {currentStatus}
                      </span>

                      <span className="text-xs sm:text-sm font-medium text-gray-500">
                        📅 {booking.date ? new Date(booking.date).toLocaleDateString('de-DE') : "Kein Datum"} (Vergangen)
                      </span>
                    </div>

                    <div>
                      <p className="text-[#2d2d2d] font-bold text-base sm:text-lg mb-1 break-all">{booking.email}</p>
                      <div className="text-[#a0a0a0] text-xs sm:text-sm flex flex-col sm:flex-row sm:gap-4 gap-1">
                        <span>📞 {booking.phone}</span>
                        <span>📍 {booking.city}, {booking.state}</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#faf8f5] px-4 sm:px-6 py-3 sm:py-4 rounded-xl">
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#a0a0a0] mb-1">Details</p>
                      <p className="text-[#2d2d2d] font-medium text-sm">
                        {booking.guests} Personen • {booking.seating === "inside" ? "Im Café" : booking.seating === "outside" ? "Außenbereich" : "Catering"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* --- VIEW: MENU MANAGER --- */}
        {activeTab === "menu" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 sm:mb-6">
              <p className="text-[#a0a0a0] text-sm">Verwalten Sie Ihre Speisekarte in Echtzeit.</p>
              
              <button 
                onClick={() => setIsMenuModalOpen(true)}
                className="bg-[#cda1b1] text-[#353941] px-5 sm:px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#ebd2db] transition-colors shadow-sm active:scale-[0.98] self-start sm:self-auto"
              >
                + Neues Gericht
              </button>
            </div>

            {menuItems.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 text-center py-16 sm:py-20">
                <p className="text-[#a0a0a0] mb-4 text-sm">Ihre Datenbank ist momentan leer.</p>
                <button onClick={() => setIsMenuModalOpen(true)} className="text-[#cda1b1] font-bold text-sm underline hover:text-[#353941]">
                  Erstes Gericht hinzufügen
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 space-y-0">
                {menuItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-4 ${index !== menuItems.length - 1 ? "border-b border-gray-50" : ""}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#a0a0a0] bg-gray-100 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        {item.isExtra && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#cda1b1] px-2 py-0.5 rounded-md">
                            Extra
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-base sm:text-lg text-[#2d2d2d]">{item.name}</h4>
                      <p className="text-xs text-[#a0a0a0] line-clamp-2 mt-0.5">{item.description || "Keine Beschreibung"}</p>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0">
                      <span className="font-bold text-[#cda1b1] whitespace-nowrap text-sm sm:text-base">€ {item.price}</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleEditClick(item)} 
                          className="text-blue-500 text-xs sm:text-sm font-medium px-2 py-1 rounded-lg hover:bg-blue-50 active:bg-blue-100"
                        >
                          Bearbeiten
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(item.id)} 
                          className="text-red-500 text-xs sm:text-sm font-medium px-2 py-1 rounded-lg hover:bg-red-50 active:bg-red-100"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- MODAL: ADD/EDIT MENU ITEM --- */}
        <AnimatePresence>
          {isMenuModalOpen && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-lg shadow-2xl relative max-h-[92vh] overflow-y-auto"
              >
                <button 
                  onClick={resetMenuForm}
                  className="absolute top-5 right-5 text-gray-400 hover:text-[#2d2d2d] font-bold text-2xl leading-none w-8 h-8 flex items-center justify-center"
                  aria-label="Schließen"
                >
                  ×
                </button>
                
                <h3 className="font-serif text-xl sm:text-2xl text-[#2d2d2d] mb-6 pr-8">
                  {editingId ? "Gericht bearbeiten" : "Neues Gericht hinzufügen"}
                </h3>

                <form onSubmit={handleMenuSubmit} className="space-y-5">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Kategorie</label>
                    <select 
                      required 
                      value={menuForm.category} 
                      onChange={(e) => setMenuForm({...menuForm, category: e.target.value})}
                      className="border-b border-gray-200 py-2.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] bg-transparent cursor-pointer text-sm"
                    >
                      {menuCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Name des Gerichts</label>
                    <input 
                      type="text" 
                      required 
                      value={menuForm.name} 
                      onChange={(e) => setMenuForm({...menuForm, name: e.target.value})} 
                      className="border-b border-gray-200 py-2.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-sm" 
                      placeholder="z.B. Avocado Sandwich" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Preis (€)</label>
                    <input 
                      type="text" 
                      required 
                      value={menuForm.price} 
                      onChange={(e) => setMenuForm({...menuForm, price: e.target.value})} 
                      className="border-b border-gray-200 py-2.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-sm" 
                      placeholder="z.B. 14.90" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Beschreibung (Optional)</label>
                    <textarea 
                      rows={2} 
                      value={menuForm.description} 
                      onChange={(e) => setMenuForm({...menuForm, description: e.target.value})} 
                      className="border-b border-gray-200 py-2.5 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-sm resize-none" 
                      placeholder="Zutaten, Besonderheiten..." 
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-1 pb-1">
                    <input 
                      type="checkbox" 
                      id="isExtra"
                      checked={menuForm.isExtra} 
                      onChange={(e) => setMenuForm({...menuForm, isExtra: e.target.checked})} 
                      className="w-5 h-5 text-[#cda1b1] border-gray-300 rounded focus:ring-[#cda1b1] cursor-pointer accent-[#cda1b1]" 
                    />
                    <label htmlFor="isExtra" className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] cursor-pointer">
                      Als Extra markieren (Kasten-Design)
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-2 bg-[#cda1b1] hover:bg-[#ebd2db] text-[#353941] py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors active:scale-[0.98]"
                  >
                    {editingId ? "Änderungen Speichern" : "Hinzufügen"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}