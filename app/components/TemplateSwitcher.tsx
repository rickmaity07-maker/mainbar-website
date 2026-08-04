"use client";

import { usePathname, useRouter } from 'next/navigation';

export default function TemplateSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Safety check: If pathname is null for any reason during initial render, default to modern
  if (!pathname) return null;

  // Determine if we are currently looking at the Rustic template
  const isRustic = pathname.startsWith('/rustic');

  const toggleTemplate = () => {
    if (isRustic) {
      // If we are in Rustic, remove '/rustic' from the URL to go back to Modern
      const newPath = pathname.replace('/rustic', '') || '/';
      router.push(newPath);
    } else {
      // If we are in Modern, add '/rustic' to the beginning of the URL
      const newPath = pathname === '/' ? '/rustic' : `/rustic${pathname}`;
      router.push(newPath);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[999]">
      <button 
        onClick={toggleTemplate}
        className="flex items-center gap-3 bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-2xl text-xs font-bold uppercase tracking-widest border border-white/20 hover:scale-105 transition-all"
      >
        <span>{isRustic ? 'Rustic Theme' : 'Modern Theme'}</span>
        
        {/* Visual Toggle UI */}
        <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${isRustic ? 'bg-[#C07F67]' : 'bg-[#7a6c82]'}`}>
          <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isRustic ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
      </button>
    </div>
  );
}