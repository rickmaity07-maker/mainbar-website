"use client";

import { useState } from 'react';

export default function RusticAdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const [activeTab, setActiveTab] = useState<'contact' | 'menu' | 'rustic-gallery'>('contact');
  const [activeMenuSection, setActiveMenuSection] = useState('Hot Drinks');
  const menuSections = ['Hot Drinks', 'Cold Drinks', 'Breakfast', 'Pastries'];

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

  if (!isAuthenticated) {
    return (
      <main className="fixed inset-0 z-[9999] bg-[#F9F6F0] flex items-center justify-center font-sans p-6 overflow-hidden">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-[#D1C7BD]">
          <h1 className="text-[#4A332A] text-2xl font-medium tracking-wide mb-8 text-center">Rustic Access</h1>
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7D6B5D] mb-2">Identifier</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#F9F6F0] border border-[#D1C7BD] rounded px-4 py-3 text-[#4A332A] outline-none focus:border-[#C07F67] transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7D6B5D] mb-2">Passcode</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#F9F6F0] border border-[#D1C7BD] rounded px-4 py-3 text-[#4A332A] outline-none focus:border-[#C07F67] transition-colors" />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-bold">Authentication failed.</p>}
            <button type="submit" className="w-full bg-[#C07F67] hover:bg-[#A86A55] text-[#F9F6F0] font-bold uppercase tracking-widest py-4 rounded transition-colors mt-4">
              Enter
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 z-[9999] bg-[#F9F6F0] text-[#4A332A] font-sans flex flex-col md:flex-row overflow-hidden text-left">
      <div className="w-full md:w-64 bg-[#E8E0D5] border-r border-[#D1C7BD] flex flex-col shrink-0 h-full">
        <div className="p-6 border-b border-[#D1C7BD]">
          <h2 className="text-xl font-medium tracking-wide text-[#4A332A]">MB Rustic</h2>
          <p className="text-xs text-green-600 mt-2 tracking-wider font-bold">System Online</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {['contact', 'menu', 'rustic-gallery'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`w-full text-left px-4 py-3 rounded text-sm tracking-wider uppercase transition-colors ${activeTab === tab ? 'bg-[#C07F67] text-[#F9F6F0]' : 'text-[#7D6B5D] hover:bg-black/5 hover:text-[#4A332A]'}`}>
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#D1C7BD]">
          <button onClick={() => setIsAuthenticated(false)} className="w-full text-center text-sm text-red-500 hover:text-red-600 font-bold uppercase tracking-widest py-2 transition-colors">
            Lock System
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-full">
        <div className="max-w-4xl mx-auto">
          
          {/* Contact Editor */}
          {activeTab === 'contact' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div><h3 className="text-2xl font-medium tracking-wide mb-2">Edit Contact Info</h3></div>
              <div className="bg-white p-6 rounded-xl border border-[#D1C7BD] space-y-6 shadow-sm">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7D6B5D] mb-2">Phone Number</label>
                  <input type="text" defaultValue="+49 170 2278096" className="w-full bg-[#F9F6F0] border border-[#D1C7BD] rounded px-4 py-3 text-[#4A332A] focus:border-[#C07F67] transition-colors outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7D6B5D] mb-2">Address</label>
                  <input type="text" defaultValue="Spitalstrasse 19 • 97421 Schweinfurt" className="w-full bg-[#F9F6F0] border border-[#D1C7BD] rounded px-4 py-3 text-[#4A332A] focus:border-[#C07F67] transition-colors outline-none" />
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest px-8 py-3 rounded transition-colors shadow-sm">Save Changes</button>
              </div>
            </div>
          )}

          {/* Menu Editor */}
          {activeTab === 'menu' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-medium tracking-wide mb-2">Rustic Menu</h3>
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest text-sm px-6 py-3 rounded transition-colors">Publish</button>
              </div>
              <div className="flex gap-2 border-b border-[#D1C7BD] pb-4">
                {menuSections.map((s) => (
                  <button key={s} onClick={() => setActiveMenuSection(s)} className={`px-6 py-2 rounded-full text-sm uppercase transition-colors ${activeMenuSection === s ? 'bg-[#C07F67] text-[#F9F6F0] font-bold' : 'bg-white border border-[#D1C7BD] text-[#7D6B5D] hover:opacity-80'}`}>{s}</button>
                ))}
              </div>
              <div className="space-y-6">
                {[1].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-[#D1C7BD] relative shadow-sm">
                    <div className="grid grid-cols-2 gap-6">
                      <input type="text" placeholder="DE Item Name" className="w-full bg-[#F9F6F0] border border-[#D1C7BD] rounded px-4 py-2 text-sm text-[#4A332A] focus:border-[#C07F67] outline-none" />
                      <input type="text" placeholder="EN Item Name" className="w-full bg-[#F9F6F0] border border-[#D1C7BD] rounded px-4 py-2 text-sm text-[#4A332A] focus:border-[#C07F67] outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Editor */}
          {activeTab === 'rustic-gallery' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h3 className="text-2xl font-medium tracking-wide mb-2">Rustic Gallery Links</h3>
              <div className="bg-white p-6 rounded-xl border border-[#D1C7BD] space-y-4 shadow-sm">
                {[1, 2, 3].map((num) => (
                  <input key={num} type="text" placeholder={`Image URL ${num}`} className="w-full bg-[#F9F6F0] border border-[#D1C7BD] rounded px-4 py-2 text-sm text-[#4A332A] focus:border-[#C07F67] outline-none" />
                ))}
                <button className="bg-[#C07F67] hover:bg-[#A86A55] text-white font-bold uppercase tracking-widest px-8 py-3 rounded mt-4">Sync Images</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}