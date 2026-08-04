"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Menu() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [direction, setDirection] = useState(1);

  const t = {
    title: lang === 'de' ? 'Speisekarte' : 'MainBar Menu',
    subtitle: lang === 'de' ? 'Dienstag - Samstag von 9.30 UHR - 13:00 UHR' : 'Tuesday - Saturday from 9:30 AM - 1:00 PM',
    back: lang === 'de' ? 'Zur Startseite' : 'Back Home',
    footer: lang === 'de' 
      ? '* Bitte nach Allergenliste fragen. Alle Preise beinhalten die gesetzliche MwSt. Kein Ausschank von Alkohol an Minderjährige.' 
      : '* Please ask for the allergen list. All prices include VAT. No alcohol served to minors.',
    others: lang === 'de' ? 'Andere' : 'Others'
  };

  const categories = [
    { id: 'breakfast', de: 'Frühstück', en: 'Breakfast' },
    { id: 'food', de: 'Essen', en: 'Food' },
    { id: 'hotdrinks', de: 'Heissgetränke', en: 'Hot Drinks' },
    { id: 'nonalc', de: 'Alkoholfrei', en: 'Non-Alcoholic' },
    { id: 'alc', de: 'Alkohol', en: 'Alcoholic' }
  ];

  const handleCategoryChange = (newCat: string) => {
    if (newCat === activeCategory) return;
    const newIndex = categories.findIndex(c => c.id === newCat);
    const oldIndex = categories.findIndex(c => c.id === activeCategory);
    
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveCategory(newCat);
  };

  const menuData: Record<string, { name: {de: string, en: string}; price: string; description?: {de: string, en: string}; subcategory?: {de: string, en: string} }[]> = {
    'breakfast': [
      { name: { de: "Die Mainbar Frühstücksetagere", en: "The Mainbar Breakfast Etagere" }, price: "38.90€", description: { de: "Ihr könnt euch nicht entscheiden? Dann ist unser wilder, leckerer Mix unseres Frühstücksangebots auf einer Etagere serviert genau das richtige. Ab 2 Personen.", en: "Can't decide? Then our wild, delicious mix of our breakfast offer served on an etagere is just right for you. From 2 persons." } },
      { name: { de: "Das Baggersee Frühstück", en: "The Baggersee Breakfast" }, price: "18.90€", description: { de: "Geräucherter Lachs mit Meerrettich, hausgemachter Shrimps-Cocktail, frisches Avocadomus, fränkischer Räucherschinken, 1 gekochtes Ei, frisches Gemüse, Butter & selbstgebackenes Brot/Brötchen", en: "Smoked salmon with horseradish, homemade shrimp cocktail, fresh avocado mash, franconian smoked ham, 1 boiled egg, fresh vegetables, butter & homemade bread/rolls" } },
      { name: { de: "Das Schweinfurter Markt Frühstück", en: "The Schweinfurt Market Breakfast" }, price: "17.90€", description: { de: "1 gekochtes Ei, Hart- und Weichkäse, Feigensenf, frisches Avocadomus, selbst eingelegter Feta, hausgemachter Kräuterfrischkäse, Marktgemüse, Butter & selbstgebackenes Brot/Brötchen.", en: "1 boiled egg, hard and soft cheese, fig mustard, fresh avocado mash, pickled feta, homemade herb cream cheese, market vegetables, butter & homemade bread/rolls." } },
      { name: { de: "Das Rathaus Frühstück", en: "The City Hall Breakfast" }, price: "17.90€", description: { de: "Büffelmozzarella & Tomate, frisch aufgeschnittener Parmaschinken & italienische Salami, Rührei mit Trüffel, Butter & selbstgebackenes Brot/Brötchen", en: "Buffalo mozzarella & tomato, freshly sliced prosciutto & italian salami, truffle scrambled eggs, butter & homemade bread/rolls" } },
      { name: { de: "Eggs Benedict", en: "Eggs Benedict" }, price: "13.90€", description: { de: "Angebratenes Brot, Rucola, frische Avocado, gekochter Schinken oder Räucherlachs, zwei pochierte Eier, Tomate, Hollandaise", en: "Fried bread, arugula, fresh avocado, boiled ham or smoked salmon, two poached eggs, tomato, hollandaise sauce" } },
      { name: { de: "Das Kleine Spitalstrassenfrühstück", en: "The Little Spitalstrasse Breakfast" }, price: "9.90€", description: { de: "Marmelade oder Honig, Butter, selbstgebackenes Brot/Brötchen, kleines hausgemachtes Granola mit griechischem Joghurt & frischen Früchten.", en: "Jam or honey, butter, homemade bread/rolls, small homemade granola with greek yogurt & fresh fruits." } },
      { subcategory: { de: "Extras", en: "Extras" }, name: { de: "Rührei natur (aus 3 Eiern)", en: "Scrambled eggs plain (3 eggs)" }, price: "7.90€" },
      { subcategory: { de: "Extras", en: "Extras" }, name: { de: "Rührei mit Bacon", en: "Scrambled eggs with bacon" }, price: "8.90€" },
      { subcategory: { de: "Extras", en: "Extras" }, name: { de: "Portion selbstgebackenes Brot/Brötchen", en: "Portion of homemade bread/rolls" }, price: "3.50€" },
    ],
    'food': [
      { subcategory: { de: "Selbstgebackenes Brot", en: "Homemade Bread" }, name: { de: "Frisches Avocadomus & Spiegelei", en: "Fresh avocado mash & fried egg" }, price: "12.90€" },
      { subcategory: { de: "Selbstgebackenes Brot", en: "Homemade Bread" }, name: { de: "Pesto, Parmaschinken, Rucola & Parmesan", en: "Pesto, prosciutto, arugula & parmesan" }, price: "13.90€" },
      { subcategory: { de: "Fränkische Winzerfladen", en: "Franconian Wine Flatbreads" }, name: { de: "Klassisch", en: "Classic" }, price: "13.90€", description: { de: "Schmand - rote Balsamico-Zwiebeln - fränkischer Bauernspeck, Trauben", en: "Sour cream - red balsamic onions - franconian bacon, grapes" } },
      { subcategory: { de: "Fränkische Winzerfladen", en: "Franconian Wine Flatbreads" }, name: { de: "Mediterran", en: "Mediterranean" }, price: "14.90€", description: { de: "Schmand - Cherry-Tomaten - Rucola - Parma Schinken - hausgemachtes Pesto - Parmesan", en: "Sour cream - cherry tomatoes - arugula - parma ham - homemade pesto - parmesan" } },
      { subcategory: { de: "Sandwich", en: "Sandwich" }, name: { de: "Thunfisch", en: "Tuna" }, price: "14.90€", description: { de: "Thunfisch, Tomate, Gurke, Spiegelei", en: "Tuna, tomato, cucumber, fried egg" } },
      { subcategory: { de: "Sandwich", en: "Sandwich" }, name: { de: "Hähnchenfleisch", en: "Chicken" }, price: "15.50€", description: { de: "Tomate, Gurke, Bacon, Salat, Spiegelei, Mainbarsoße", en: "Tomato, cucumber, bacon, lettuce, fried egg, Mainbar sauce" } },
    ],
    'hotdrinks': [
      { name: { de: "Cafe Crema", en: "Cafe Crema" }, price: "3.50€ / 4.80€", description: { de: "Groß", en: "Large" } },
      { name: { de: "Cappuccino", en: "Cappuccino" }, price: "3.90€ / 5.40€", description: { de: "Groß", en: "Large" } },
      { name: { de: "Espresso", en: "Espresso" }, price: "2.80€ / 4.40€", description: { de: "Doppelter Espresso", en: "Double Espresso" } },
      { name: { de: "Flat White", en: "Flat White" }, price: "5.00€" },
      { name: { de: "Milchkaffee", en: "Milk Coffee" }, price: "4.80€" },
      { name: { de: "Trinkschokolade", en: "Hot Chocolate" }, price: "5.40€" },
    ],
    'nonalc': [
      { name: { de: "Rhön Sprudel", en: "Rhön Mineral Water" }, price: "4.50€ / 5.90€", description: { de: "0.50l / 0.75l (Leise oder laut)", en: "0.50l / 0.75l (Still or sparkling)" } },
      { name: { de: "Fritz Kola", en: "Fritz Kola" }, price: "4.40€", description: { de: "0.33l (Normal oder zuckerfrei)", en: "0.33l (Normal or sugar-free)" } },
      { name: { de: "Orangensaft", en: "Orange Juice" }, price: "5.90€", description: { de: "0.25l (Frisch gepresst)", en: "0.25l (Freshly squeezed)" } },
      { name: { de: "Hausgemachte Limonade", en: "Homemade Lemonade" }, price: "5.60€", description: { de: "0.40l (Zitrone-Ingwer-Minze oder Himbeer-Rosmarin)", en: "0.40l (Lemon-ginger-mint or raspberry-rosemary)" } },
    ],
    'alc': [
      { subcategory: { de: "Aperitif & Prickelndes", en: "Aperitif & Sparkling" }, name: { de: "Mainbar Spritz", en: "Mainbar Spritz" }, price: "7.40€", description: { de: "Hausgemachter Zitronen-Ingwer-Sirup - Secco - Zitrone", en: "Homemade lemon-ginger syrup - Secco - Lemon" } },
      { subcategory: { de: "Aperitif & Prickelndes", en: "Aperitif & Sparkling" }, name: { de: "Aperol Spritz", en: "Aperol Spritz" }, price: "6.90€", description: { de: "Aperol - Secco - Orange", en: "Aperol - Secco - Orange" } },
      { subcategory: { de: "Bier", en: "Beer" }, name: { de: "Pils, Schlapper Seppel", en: "Pilsner, Schlapper Seppel" }, price: "4.50€", description: { de: "0.33l", en: "0.33l" } },
      { subcategory: { de: "Bier", en: "Beer" }, name: { de: "Hefeweizen", en: "Wheat Beer" }, price: "4.90€", description: { de: "0.50l (Auch Alkoholfrei)", en: "0.50l (Also non-alcoholic)" } },
      { subcategory: { de: "Weine & Longdrinks", en: "Wines & Longdrinks" }, name: { de: "Silvaner", en: "Silvaner" }, price: "7.20€", description: { de: "0.25l Trocken", en: "0.25l Dry" } },
      { subcategory: { de: "Weine & Longdrinks", en: "Wines & Longdrinks" }, name: { de: "Espresso Maintini", en: "Espresso Maintini" }, price: "8.20€", description: { de: "Absolut Vodka - Kahlua Kaffee Likör - Espresso", en: "Absolut Vodka - Kahlua Coffee Liqueur - Espresso" } },
    ]
  };

  const currentItems = menuData[activeCategory];

  const renderItems = () => {
    const hasSubcategories = currentItems.some(item => item.subcategory);
    
    if (!hasSubcategories) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {currentItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start border-b border-gray-200 pb-4">
              <div className="pr-4">
                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">{item.name[lang]}</h3>
                {item.description && <p className="text-gray-500 text-sm mt-1">{item.description[lang]}</p>}
              </div>
              <span className="text-lg font-medium text-[#7a6c82] whitespace-nowrap">{item.price}</span>
            </div>
          ))}
        </div>
      );
    }

    const groupedItems = currentItems.reduce((acc, item) => {
      const sub = item.subcategory ? item.subcategory[lang] : t.others;
      if (!acc[sub]) acc[sub] = [];
      acc[sub].push(item);
      return acc;
    }, {} as Record<string, typeof currentItems>);

    return (
      <div className="space-y-12">
        {Object.entries(groupedItems).map(([subcat, items], idx) => (
          <div key={idx}>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#7a6c82] mb-6 border-b border-[#7a6c82] pb-2 inline-block">
              {subcat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-start border-b border-gray-100 pb-3">
                  <div className="pr-4">
                    <h4 className="text-md font-bold text-gray-800 tracking-wide">{item.name[lang]}</h4>
                    {item.description && <p className="text-gray-500 text-xs mt-1">{item.description[lang]}</p>}
                  </div>
                  <span className="text-md font-medium text-[#7a6c82] whitespace-nowrap">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Explicitly typing this as Variants solves the TypeScript error
  const pageVariants: Variants = {
    initial: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: dir > 0 ? "right" : "left",
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: dir > 0 ? "left" : "right",
      transition: { duration: 0.4, ease: "easeIn" }
    })
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-gray-800 p-6 md:p-12 font-sans relative">
      <div className="max-w-5xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-5xl font-light tracking-wide text-[#7a6c82] font-serif">{t.title}</h1>
            <p className="text-sm text-gray-400 uppercase tracking-widest mt-2">{t.subtitle}</p>
          </div>
          <Link href="/" className="text-sm uppercase tracking-widest text-[#7a6c82] border border-[#7a6c82] px-6 py-2 hover:bg-[#7a6c82] hover:text-white transition-colors">
            &larr; {t.back}
          </Link>
        </header>

        <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 uppercase tracking-[0.15em] text-sm font-bold transition-colors ${
                activeCategory === category.id 
                  ? 'bg-[#7a6c82] text-white' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {lang === 'de' ? category.de : category.en}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 min-h-[50vh] relative" style={{ perspective: "1500px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCategory}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {renderItems()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-12 text-center text-xs text-gray-400 italic">
          {t.footer}
        </div>
      </div>
    </main>
  );
}