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

const firestoreMenuData = [
  { category: "FRÜHSTÜCK", name: "Die Mainbar Frühstücksetagere", description: "Wilder, leckerer Mix unseres Frühstücksangebots auf einer Etagere serviert genau das richtige. Ab 2 Personen.", price: "38.90", image_url: "/media/mainbar-photo-1.jpg" },
  { category: "FRÜHSTÜCK", name: "Das Baggersee Frühstück", description: "Geräucherter Lachs mit Meerrettich, hausgemachter Shrimps-Cocktail, frisches Avocadomus, fränkischer Räucherschinken, 1 gekochtes Ei, frisches Gemüse, Butter & selbstgebackenes Brot/Brötchen", price: "18.90", image_url: "/media/mainbar-photo-2.jpg" },
  { category: "FRÜHSTÜCK", name: "Das Schweinfurter Markt Frühstück", description: "1 gekochtes Ei, Hart- und Weichkäse, Feigensenf, frisches Avocadomus, selbst eingelegter Feta, hausgemachter Kräuterfrischkäse, Marktgemüse, Butter & selbstgebackenes Brot/Brötchen. (mit frisch gepresstem O-Saft 0.25l +4,00€)", price: "17.90", image_url: "/media/mainbar-photo-3.jpg" },
  { category: "FRÜHSTÜCK", name: "Das Rathaus Frühstück", description: "Büffelmozzarella & Tomate, frisch aufgeschnittener Parmaschinken & italienische Salami, Rührei mit Trüffel, Butter & selbstgebackenes Brot/Brötchen (mit Prosecco 0,1 +3,50€)", price: "17.90", image_url: "/media/mainbar-photo-4.jpg" },
  { category: "FRÜHSTÜCK", name: "Eggs Benedict", description: "Angebratenes Brot, Rucola, frische Avocado, gekochter Schinken oder Räucherlachs, zwei pochierte Eier, Tomate, Hollandaise", price: "13.90", image_url: "/media/mainbar-photo-5.jpg" },
  { category: "FRÜHSTÜCK", name: "Das Kleine Spitalstraßenfrühstück", description: "Marmelade oder Honig, Butter, selbstgebackenes Brot/Brötchen, kleines hausgemachtes Granola mit griechischem Joghurt & frischen Früchten.", price: "9.90", image_url: "/media/mainbar-photo-6.jpg" },
  { category: "FRÜHSTÜCK", name: "Extra: Rührei natur", description: "Aus 3 Eiern", price: "7.90", image_url: "/media/mainbar-photo-1.jpg" },
  { category: "FRÜHSTÜCK", name: "Extra: Rührei mit Bacon", description: "", price: "8.90", image_url: "/media/mainbar-photo-2.jpg" },
  { category: "FRÜHSTÜCK", name: "Extra: 1x gekochtes Ei", description: "", price: "2.00", image_url: "/media/mainbar-photo-3.jpg" },
  { category: "FRÜHSTÜCK", name: "Extra: Butter | Honig | Frischkäse | Marmelade", description: "", price: "1.50", image_url: "/media/mainbar-photo-4.jpg" },
  { category: "FRÜHSTÜCK", name: "Extra: Portion Lachs & Sahnemeerrettich", description: "", price: "6.00", image_url: "/media/mainbar-photo-5.jpg" },
  { category: "FRÜHSTÜCK", name: "Extra: Hausgemachtes Granola", description: "Joghurt & Früchte", price: "8.90", image_url: "/media/mainbar-photo-6.jpg" },
  { category: "FRÜHSTÜCK", name: "Extra: Portion selbstgebackenes Brot/Brötchen", description: "", price: "3.50", image_url: "/media/mainbar-photo-1.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Brot: Avocado & Spiegelei", description: "Frisches Avocadomus & Spiegelei auf selbstgebackenem Brot", price: "12.90", image_url: "/media/mainbar-photo-7.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Brot: Pesto & Parmaschinken", description: "Pesto, Parmaschinken, Rucola & Parmesan auf selbstgebackenem Brot", price: "13.90", image_url: "/media/mainbar-photo-8.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Brot: Avocado & Räucherlachs", description: "Frischkäse, frische Avocado & Räucherlachs auf selbstgebackenem Brot", price: "14.90", image_url: "/media/mainbar-photo-7.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Brot: Geräucherter Schinken", description: "Geräucherter Schinken, Spiegelei & Saure Gurke auf selbstgebackenem Brot", price: "11.90", image_url: "/media/mainbar-photo-8.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Brot: Grillgemüse", description: "Frischkäse, Rucola, Grillgemüse, Parmesan auf selbstgebackenem Brot", price: "14.90", image_url: "/media/mainbar-photo-7.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Sandwich: Thunfisch", description: "Thunfisch, Tomate, Gurke, Spiegelei", price: "14.90", image_url: "/media/mainbar-photo-11.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Sandwich: Avocado Mozzarella", description: "Avocado, Rucola, Tomate, Mozzarella, Hausgemachtes Pesto", price: "13.90", image_url: "/media/mainbar-photo-11.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Sandwich: Avocado Bacon", description: "Avocado, Rucola, Tomate, Mozzarella, Hausgemachtes Pesto, Bacon", price: "14.90", image_url: "/media/mainbar-photo-11.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Sandwich: Hähnchenfleisch", description: "Hähnchenfleisch, Tomate, Gurke, Bacon, Salat, Spiegelei, Mainbarsoße", price: "15.50", image_url: "/media/mainbar-photo-11.jpg" },
  { category: "GESCHMACKSSACHEN", name: "Extra: Mainbar Pommes", description: "Toppe dein Sandwich mit Mainbar Pommes", price: "3.90", image_url: "/media/mainbar-photo-11.jpg" },
  { category: "WINZERFLADEN", name: "Winzerfladen: Klassisch", description: "Schmand - rote Balsamico-Zwiebeln - fränkischer Bauernspeck, Trauben", price: "13.90", image_url: "/media/mainbar-photo-9.jpg" },
  { category: "WINZERFLADEN", name: "Winzerfladen: Mediterran", description: "Schmand - Cherry-Tomaten - Rucola - Parma Schinken - hausgemachtes Pesto - Parmesan", price: "14.90", image_url: "/media/mainbar-photo-10.jpg" },
  { category: "WINZERFLADEN", name: "Winzerfladen: Vegetarisch", description: "Schmand - Rucola - Grillgemüse-Pesto - Parmesan (Auch Vegan Möglich)", price: "14.90", image_url: "/media/mainbar-photo-9.jpg" },
  { category: "WINZERFLADEN", name: "Winzerfladen: Bruschetta", description: "Schmand - gewürfelte Tomaten - Knoblauch - Olivenöl (Auch Vegan Möglich)", price: "13.90", image_url: "/media/mainbar-photo-10.jpg" },
  { category: "HEISSGETRÄNKE", name: "Cafe Crema", description: "Groß: 4.80€", price: "3.50", image_url: "/media/mainbar-photo-12.jpg" },
  { category: "HEISSGETRÄNKE", name: "Cappuccino", description: "Groß: 5.40€", price: "3.90", image_url: "/media/mainbar-photo-13.jpg" },
  { category: "HEISSGETRÄNKE", name: "Espresso", description: "Doppelter Espresso: 4.40€", price: "2.80", image_url: "/media/mainbar-photo-12.jpg" },
  { category: "HEISSGETRÄNKE", name: "Espresso Macchiato", description: "", price: "3.00", image_url: "/media/mainbar-photo-12.jpg" },
  { category: "HEISSGETRÄNKE", name: "Flat White", description: "", price: "5.00", image_url: "/media/mainbar-photo-14.jpg" },
  { category: "HEISSGETRÄNKE", name: "Latte Macchiato", description: "", price: "4.80", image_url: "/media/mainbar-photo-14.jpg" },
  { category: "HEISSGETRÄNKE", name: "Milchkaffee", description: "", price: "4.80", image_url: "/media/mainbar-photo-14.jpg" },
  { category: "HEISSGETRÄNKE", name: "Filterkaffee Pott", description: "", price: "4.80", image_url: "/media/mainbar-photo-12.jpg" },
  { category: "HEISSGETRÄNKE", name: "Chai Latte", description: "Tiger Spice oder Vanilla (+ Espresso Shot 6.90€)", price: "5.70", image_url: "/media/mainbar-photo-15.jpg" },
  { category: "HEISSGETRÄNKE", name: "Trinkschokolade", description: "", price: "5.40", image_url: "/media/mainbar-photo-15.jpg" },
  { category: "HEISSGETRÄNKE", name: "Tasse Tee", description: "Versch. Sorten von MEE TEE: Beerenstark, Earl Grey, Minze, Rooibos Orange, Chai Tee oder Grüner Tee", price: "4.50", image_url: "/media/mainbar-photo-15.jpg" },
  { category: "HEISSGETRÄNKE", name: "Aufpreis Hafermilch", description: "", price: "0.50", image_url: "/media/mainbar-photo-12.jpg" },
  { category: "ALKOHOLFREI", name: "Rhön Sprudel", description: "Leise oder laut (0,25l / 0,75l 5.90€)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "ALKOHOLFREI", name: "Fritz Kola", description: "Normal oder zuckerfrei (0,33l)", price: "4.40", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "ALKOHOLFREI", name: "Orangina", description: "Rot oder gelb (0,25l)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "ALKOHOLFREI", name: "Soda Lemon", description: "(0,33l)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "ALKOHOLFREI", name: "Saft Schorle", description: "Apfel oder Johannisbeere (0,25l / 0,40l 4.90€)", price: "3.30", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "ALKOHOLFREI", name: "Orangensaft", description: "Frisch gepresst (0,25l)", price: "5.90", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "ALKOHOLFREI", name: "Thomas Henry", description: "Tonic Water, Bitter Lemon oder Pink Grapefruit (0,20l)", price: "4.50", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "ALKOHOLFREI", name: "Hausgemachte Limonade", description: "Zitrone-Ingwer-Minze oder Himbeer-Rosmarin (0,40l)", price: "5.60", image_url: "/media/mainbar-photo-16.jpg" },
  { category: "APERITIF & BIER", name: "Mainbar Spritz", description: "Hausgemachter Zitronen-Ingwer-Sirup - Secco - Zitrone (0,25l)", price: "7.40", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Aperol Spritz", description: "Aperol - Secco - Orange (0,25l)", price: "6.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Limoncello Spritz", description: "Limoncello - Secco - Zitrone (0,25l)", price: "6.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Campari Spritz", description: "Campari - Secco - Orange (0,25l)", price: "6.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Sarti Spritz", description: "Sarti (Blutorangenlikör) - Secco - Bitter Lemon (0,25l)", price: "7.40", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Belsazar Spritz", description: "Belsazar Vermouth Rose - Secco - Soda - Orange (0,25l)", price: "7.40", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Crodino Spritz", description: "Alkoholfrei - Crodino - Soda - Orange (0,25l)", price: "5.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Mainbar Secco", description: "trocken (0,10l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Pils, Schlapper Seppel", description: "(0,33l)", price: "4.50", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Helles, Bayreuther", description: "(0,33l)", price: "4.50", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Naturtrübes Radler", description: "(0,50l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Hefeweizen", description: "Auch alkoholfrei (0,50l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "APERITIF & BIER", name: "Bayreuther Alk. Frei", description: "(0,50l)", price: "4.90", image_url: "/media/mainbar-photo-17.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Silvaner", description: "Trocken. Weingut Schmitt aus Bergtheim (0,25l)", price: "7.20", image_url: "/media/mainbar-photo-19.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Pinot Grigio", description: "Trocken (0,25l)", price: "7.50", image_url: "/media/mainbar-photo-19.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Scheurebe", description: "Halbtrocken (0,25l)", price: "7.50", image_url: "/media/mainbar-photo-19.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Carbanet Dorsa", description: "Rot, Trocken (0,25l)", price: "8.50", image_url: "/media/mainbar-photo-19.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Negroni", description: "Tanqueray - Campari - Vermouth Rosso", price: "8.20", image_url: "/media/mainbar-photo-18.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Espresso MainTini", description: "Absolut Vodka - Kahlua Kaffee Likör - Espresso", price: "8.20", image_url: "/media/mainbar-photo-18.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Absolut Vodka", description: "Mit Red Bull, Bitter Lemon oder Soda", price: "7.90", image_url: "/media/mainbar-photo-18.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Tanqueray - London Dry", description: "With Tonic Water. Aromen: Wacholder, Zitrone, Limette", price: "7.90", image_url: "/media/mainbar-photo-18.jpg" },
  { category: "WEINE & LONGDRINKS", name: "Saisonale Winzerbrände", description: "Weingut Schmitt/Bergtheim (2cl)", price: "4.00", image_url: "/media/mainbar-photo-18.jpg" }
];

export default function AdminPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation State ("bookings", "old_bookings", "menu")
  const [activeTab, setActiveTab] = useState("bookings");

  // Data State
  const [bookings, setBookings] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);
  
  // Menu Form State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuForm, setMenuForm] = useState({
    category: menuCategories[0],
    name: "",
    description: "",
    price: "",
    image_url: ""
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
  // Today's date string in YYYY-MM-DD format for precise comparison
  const todayStr = new Date().toISOString().split("T")[0];

  const activeBookings = bookings.filter(b => {
    if (!b.date) return true; // Keep items without a date in active by default
    return b.date >= todayStr;
  });

  const oldBookings = bookings.filter(b => {
    if (!b.date) return false;
    return b.date < todayStr;
  });

  // --- MENU HANDLERS ---
  const resetMenuForm = () => {
    setMenuForm({ category: menuCategories[0], name: "", description: "", price: "", image_url: "" });
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
      image_url: item.image_url || ""
    });
    setEditingId(item.id);
    setIsMenuModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Möchten Sie dieses Gericht wirklich löschen?")) {
      await deleteDoc(doc(db, "menu", id));
    }
  };

  // --- DATABASE SEEDER ---
  const handleSeedDatabase = async () => {
    if (!window.confirm("ACHTUNG: Dies fügt alle 45 Standardgerichte zur Datenbank hinzu. Klicken Sie nur EINMAL. Fortfahren?")) return;
    
    setIsSeeding(true);
    try {
      for (const item of firestoreMenuData) {
        await addDoc(collection(db, "menu"), item);
      }
      alert("Erfolg! Alle Gerichte wurden in die Datenbank übertragen.");
    } catch (error) {
      console.error("Error seeding database:", error);
      alert("Fehler beim Übertragen der Daten.");
    } finally {
      setIsSeeding(false);
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
        <Link href="/" className="absolute top-12 md:top-8 left-6 md:left-8 text-[#a0a0a0] hover:text-[#cda1b1] text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors p-2 md:p-0">
          &larr; Zurück zur Webseite
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-script)] text-5xl text-[#cda1b1] mb-2">MainBar</h1>
            <h2 className="text-[#a0a0a0] uppercase tracking-widest text-xs font-bold">Admin Portal</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-2">E-Mail</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-b border-gray-200 py-2 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d]" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-2">Passwort</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="border-b border-gray-200 py-2 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d]" />
            </div>
            {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}
            <button type="submit" disabled={isLoggingIn} className="w-full mt-4 bg-[#cda1b1] hover:bg-[#ebd2db] text-[#353941] py-4 rounded-full font-semibold uppercase tracking-widest text-xs transition-colors">
              {isLoggingIn ? "Wird geladen..." : "Einloggen"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ================= AUTHENTICATED VIEW (DASHBOARD) =================
  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">
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

      {/* Main Content Area */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto max-h-screen relative">
        <header className="flex justify-between items-center mb-10">
          <h2 className="font-serif text-3xl text-[#2d2d2d]">
            {activeTab === "bookings" && "Aktuelle Event Anfragen"}
            {activeTab === "old_bookings" && "Vergangene Events"}
            {activeTab === "menu" && "Menü Manager"}
          </h2>
          <span className="text-xs font-medium text-[#a0a0a0] bg-white px-4 py-2 rounded-full shadow-sm hidden md:inline-block">
            Eingeloggt als: {user.email}
          </span>
        </header>

        {/* --- VIEW: ACTIVE BOOKINGS --- */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {activeBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center py-20">
                <p className="text-[#a0a0a0]">Keine aktuellen Event-Anfragen vorhanden.</p>
              </div>
            ) : (
              activeBookings.map((booking) => {
                const currentStatus = booking.status || "Neu";
                return (
                  <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <select
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer border-0 outline-none ${
                            currentStatus === "Bestätigt" ? "bg-green-100 text-green-700" :
                            currentStatus === "Storniert" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <option value="Neu">Neu / Warteliste</option>
                          <option value="Bestätigt">Bestätigt</option>
                          <option value="Storniert">Storniert</option>
                        </select>

                        <span className="text-sm font-bold text-[#cda1b1]">
                          📅 {booking.date ? new Date(booking.date).toLocaleDateString('de-DE') : "Kein Datum"}
                        </span>
                      </div>
                      <p className="text-[#2d2d2d] font-bold text-lg mb-1">{booking.email}</p>
                      <p className="text-[#a0a0a0] text-sm flex gap-4">
                        <span>📞 {booking.phone}</span>
                        <span>📍 {booking.city}, {booking.state}</span>
                      </p>
                    </div>
                    
                    <div className="bg-[#faf8f5] px-6 py-4 rounded-xl text-right w-full md:w-auto">
                      <p className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-1">Details</p>
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
          <div className="space-y-4">
            {oldBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center py-20">
                <p className="text-[#a0a0a0]">Keine vergangenen Events vorhanden.</p>
              </div>
            ) : (
              oldBookings.map((booking) => {
                const currentStatus = booking.status || "Neu";
                return (
                  <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 opacity-80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          currentStatus === "Bestätigt" ? "bg-green-100 text-green-700" :
                          currentStatus === "Storniert" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {currentStatus}
                        </span>

                        <span className="text-sm font-medium text-gray-500">
                          📅 {booking.date ? new Date(booking.date).toLocaleDateString('de-DE') : "Kein Datum"} (Vergangen)
                        </span>
                      </div>
                      <p className="text-[#2d2d2d] font-bold text-lg mb-1">{booking.email}</p>
                      <p className="text-[#a0a0a0] text-sm flex gap-4">
                        <span>📞 {booking.phone}</span>
                        <span>📍 {booking.city}, {booking.state}</span>
                      </p>
                    </div>
                    
                    <div className="bg-[#faf8f5] px-6 py-4 rounded-xl text-right w-full md:w-auto">
                      <p className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-1">Details</p>
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
            <div className="flex justify-between items-center mb-6">
              <p className="text-[#a0a0a0] text-sm">Verwalten Sie Ihre Speisekarte in Echtzeit.</p>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleSeedDatabase}
                  disabled={isSeeding}
                  className={`px-4 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs transition-colors shadow-sm ${isSeeding ? "bg-gray-300 text-gray-500" : "bg-red-500 hover:bg-red-600 text-white"}`}
                >
                  {isSeeding ? "Wird geladen..." : "Datenbank automatisch füllen"}
                </button>
                
                <button 
                  onClick={() => setIsMenuModalOpen(true)}
                  className="bg-[#cda1b1] text-[#353941] px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#ebd2db] transition-colors shadow-sm"
                >
                  + Neues Gericht
                </button>
              </div>
            </div>

            {menuItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center py-20">
                <p className="text-[#a0a0a0] mb-4">Ihre Datenbank ist momentan leer.</p>
                <button onClick={() => setIsMenuModalOpen(true)} className="text-[#cda1b1] font-bold text-sm underline hover:text-[#353941]">
                  Erstes Gericht hinzufügen
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0 group">
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#a0a0a0] bg-gray-100 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-lg text-[#2d2d2d]">{item.name}</h4>
                      </div>
                      <p className="text-xs text-[#a0a0a0] line-clamp-1">{item.description || "Keine Beschreibung"}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-[#cda1b1] whitespace-nowrap">€ {item.price}</span>
                      <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditClick(item)} className="text-gray-400 hover:text-blue-500 text-sm font-medium">Bearbeiten</button>
                        <button onClick={() => handleDeleteClick(item.id)} className="text-gray-400 hover:text-red-500 text-sm font-medium">Löschen</button>
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={resetMenuForm}
                  className="absolute top-6 right-6 text-gray-400 hover:text-[#2d2d2d] font-bold text-xl leading-none"
                >
                  &times;
                </button>
                
                <h3 className="font-serif text-2xl text-[#2d2d2d] mb-6">
                  {editingId ? "Gericht bearbeiten" : "Neues Gericht hinzufügen"}
                </h3>

                <form onSubmit={handleMenuSubmit} className="space-y-5">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Kategorie</label>
                    <select 
                      required value={menuForm.category} onChange={(e) => setMenuForm({...menuForm, category: e.target.value})}
                      className="border-b border-gray-200 py-2 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] bg-transparent cursor-pointer text-sm"
                    >
                      {menuCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Name des Gerichts</label>
                    <input type="text" required value={menuForm.name} onChange={(e) => setMenuForm({...menuForm, name: e.target.value})} className="border-b border-gray-200 py-2 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-sm" placeholder="z.B. Avocado Sandwich" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Preis (€)</label>
                    <input type="text" required value={menuForm.price} onChange={(e) => setMenuForm({...menuForm, price: e.target.value})} className="border-b border-gray-200 py-2 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-sm" placeholder="z.B. 14.90" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-1">Beschreibung (Optional)</label>
                    <textarea rows={2} value={menuForm.description} onChange={(e) => setMenuForm({...menuForm, description: e.target.value})} className="border-b border-gray-200 py-2 focus:outline-none focus:border-[#cda1b1] text-[#2d2d2d] text-sm resize-none" placeholder="Zutaten, Besonderheiten..." />
                  </div>

                  <button type="submit" className="w-full mt-4 bg-[#cda1b1] hover:bg-[#ebd2db] text-[#353941] py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors">
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