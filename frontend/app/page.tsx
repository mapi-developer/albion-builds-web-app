'use client';

import React, { useState } from 'react';
// Changed from alias '@/' to relative path '../' to ensure resolution
import Header, { Tab, UserData } from '../components/Header';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('groups');
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = () => {
    setUser({
      username: "AlbionWarlord",
      role: "Veteran"
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64 border border-dashed border-slate-800 rounded-xl bg-slate-900/30 text-slate-500">
            {activeTab === 'groups' ? 'Groups Content' : 'Builds Content'}
        </div>
      </main>
    </div>
  );
}