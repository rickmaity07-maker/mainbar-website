"use client";

import { useState } from 'react';

export default function AdminPortal() {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Dashboard Tab State
  const [activeTab, setActiveTab] = useState<'contact' | 'menu' | 'modern-gallery' | 'rustic-gallery'>('contact');
  
  // Menu Editor Sub-State
  const [activeMenuSection, setActiveMenuSection] = useState('Hot Drinks');
  const menuSections = ['Hot Drinks', 'Cold Drinks', 'Breakfast', 'Pastries'];

  // Hardcoded credentials for the UI mockup
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'MainBar2026!') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  // If not logged in, show the Secret Gate
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#1a161d] flex items-center justify-center font-sans p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#2a2530] p-8 rounded-xl shadow-2xl border border-white/5">
          <h1 className="text-[#fcfbf9] text-2xl font-light tracking-widest uppercase mb-8 text-center">System Access</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Identifier</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-3 text-[#fcfbf9] focus:outline-none focus:border-[#7a6c82] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Passcode</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-3 text-[#fcfbf9] focus:outline-none focus:border-[#7a6c82] transition-colors"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">Authentication failed. Disconnecting...</p>}

            <button type="submit" className="w-full bg-[#7a6c82] hover:bg-[#605566] text-[#fcfbf9] font-bold uppercase tracking-widest py-4 rounded transition-colors mt-4">
              Enter
            </button>
          </div>
        </form>
      </main>
    );
  }

  // If logged in, show the Control Dashboard
  return (
    <main className="min-h-screen bg-[#1a161d] text-[#fcfbf9] font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-[#2a2530] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-light tracking-widest uppercase">MB Control</h2>
          <p className="text-xs text-green-400 mt-2 tracking-wider">System Online</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('contact')}
            className={`w-full text-left px-4 py-3 rounded text-sm tracking-wider uppercase transition-colors ${activeTab === 'contact' ? 'bg-[#7a6c82] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            Contact Info
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full text-left px-4 py-3 rounded text-sm tracking-wider uppercase transition-colors ${activeTab === 'menu' ? 'bg-[#7a6c82] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            Menu Editor
          </button>
          <button 
            onClick={() => setActiveTab('modern-gallery')}
            className={`w-full text-left px-4 py-3 rounded text-sm tracking-wider uppercase transition-colors ${activeTab === 'modern-gallery' ? 'bg-[#7a6c82] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            Modern Gallery
          </button>
          <button 
            onClick={() => setActiveTab('rustic-gallery')}
            className={`w-full text-left px-4 py-3 rounded text-sm tracking-wider uppercase transition-colors ${activeTab === 'rustic-gallery' ? 'bg-[#7a6c82] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            Rustic Gallery
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => setIsAuthenticated(false)} className="w-full text-center text-sm text-red-400 hover:text-red-300 uppercase tracking-widest py-2 transition-colors">
            Lock System
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* --- CONTACT EDITOR --- */}
          {activeTab === 'contact' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div>
                <h3 className="text-2xl font-light tracking-widest uppercase mb-2">Edit Contact Info</h3>
                <p className="text-gray-400 text-sm">Updates will reflect across both modern and rustic templates.</p>
              </div>
              
              <div className="bg-[#2a2530] p-6 rounded-xl border border-white/5 space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                  <input type="text" defaultValue="+49 170 2278096" className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-3 focus:border-[#7a6c82] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Address</label>
                  <input type="text" defaultValue="Spitalstrasse 19 • 97421 Schweinfurt" className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-3 focus:border-[#7a6c82] transition-colors" />
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest px-8 py-3 rounded transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* --- MENU EDITOR --- */}
          {activeTab === 'menu' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-light tracking-widest uppercase mb-2">Menu Editor</h3>
                  <p className="text-gray-400 text-sm">Select a section below to manage its items.</p>
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest text-sm px-6 py-3 rounded transition-colors">
                  Publish Menu
                </button>
              </div>
              
              {/* Menu Section Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {menuSections.map((section) => (
                  <button 
                    key={section}
                    onClick={() => setActiveMenuSection(section)}
                    className={`px-6 py-2 rounded-full text-sm tracking-wider uppercase transition-colors ${
                      activeMenuSection === section 
                        ? 'bg-[#fcfbf9] text-[#1a161d] font-bold' 
                        : 'bg-[#2a2530] text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Items for the Selected Section */}
              <div className="space-y-6">
                <h4 className="text-lg text-[#7a6c82] uppercase tracking-widest">Editing: {activeMenuSection}</h4>
                
                {/* Mockup of a single menu item row */}
                {[1, 2].map((itemIndex) => (
                  <div key={itemIndex} className="bg-[#2a2530] p-6 rounded-xl border border-white/5 relative group">
                    <button className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors" title="Delete Item">
                      &times; Remove
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* German Fields */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#7a6c82] text-xs px-2 py-1 rounded font-bold">DE</span>
                          <span className="text-xs uppercase tracking-widest text-gray-400">German</span>
                        </div>
                        <input type="text" placeholder="Item Name (z.B. Cappuccino)" className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-2 text-sm focus:border-[#7a6c82] transition-colors" />
                        <input type="text" placeholder="Description (z.B. Mit cremigem Milchschaum)" className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-2 text-sm focus:border-[#7a6c82] transition-colors" />
                      </div>
                      
                      {/* English Fields */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gray-600 text-xs px-2 py-1 rounded font-bold">EN</span>
                          <span className="text-xs uppercase tracking-widest text-gray-400">English</span>
                        </div>
                        <input type="text" placeholder="Item Name (e.g. Cappuccino)" className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-2 text-sm focus:border-gray-400 transition-colors" />
                        <input type="text" placeholder="Description (e.g. With creamy milk foam)" className="w-full bg-[#1a161d] border border-white/10 rounded px-4 py-2 text-sm focus:border-gray-400 transition-colors" />
                      </div>
                    </div>
                    
                    {/* Price & Options */}
                    <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-6 items-end">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Price (€)</label>
                        <input type="text" placeholder="3.50" className="w-32 bg-[#1a161d] border border-white/10 rounded px-4 py-2 text-sm focus:border-[#7a6c82] transition-colors" />
                      </div>
                      <div className="flex items-center gap-2 pb-2">
                        <input type="checkbox" id={`vegan-${itemIndex}`} className="w-4 h-4 accent-[#7a6c82]" />
                        <label htmlFor={`vegan-${itemIndex}`} className="text-sm text-gray-400">Vegan Option Available</label>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Item Button */}
                <button className="w-full border-2 border-dashed border-white/10 text-gray-400 hover:border-[#7a6c82] hover:text-[#7a6c82] py-6 rounded-xl uppercase tracking-widest text-sm font-bold transition-colors">
                  + Add New Item to {activeMenuSection}
                </button>
              </div>
            </div>
          )}

          {/* --- MODERN GALLERY EDITOR --- */}
          {activeTab === 'modern-gallery' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div>
                <h3 className="text-2xl font-light tracking-widest uppercase mb-2">Modern Gallery Layout</h3>
                <p className="text-gray-400 text-sm">Paste direct image URLs here to update the live grid.</p>
              </div>
              
              <div className="bg-[#2a2530] p-6 rounded-xl border border-white/5 space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="flex gap-4 items-center">
                    <span className="text-gray-500 w-6">0{num}</span>
                    <input type="text" placeholder={`Image URL ${num}`} className="flex-1 bg-[#1a161d] border border-white/10 rounded px-4 py-2 text-sm focus:border-[#7a6c82] transition-colors" />
                  </div>
                ))}
                <div className="pt-4">
                  <button className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest px-8 py-3 rounded transition-colors">
                    Sync to Live Site
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- RUSTIC GALLERY EDITOR --- */}
          {activeTab === 'rustic-gallery' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div>
                <h3 className="text-2xl font-light tracking-widest uppercase mb-2">Rustic Gallery Layout</h3>
                <p className="text-gray-400 text-sm">Paste direct image URLs here to update the live grid.</p>
              </div>
              
              <div className="bg-[#2a2530] p-6 rounded-xl border border-white/5 space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="flex gap-4 items-center">
                    <span className="text-[#C07F67] w-6">0{num}</span>
                    <input type="text" placeholder={`Image URL ${num}`} className="flex-1 bg-[#1a161d] border border-white/10 rounded px-4 py-2 text-sm focus:border-[#C07F67] transition-colors" />
                  </div>
                ))}
                <div className="pt-4">
                  <button className="bg-[#C07F67] hover:bg-[#A86A55] text-white font-bold uppercase tracking-widest px-8 py-3 rounded transition-colors">
                    Sync to Live Site
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}