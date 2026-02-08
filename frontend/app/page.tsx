'use client';

import React, { useState } from 'react';
import Header, { Tab, UserData } from '../components/Header';
import GroupsView from '../components/GroupsView';
import RolesView from '../components/RolesView';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('groups');
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = () => {
    // Mock login
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
        
        {/* Animated Tab Switching */}
        <div className={activeTab === 'groups' ? 'block' : 'hidden'}>
          <GroupsView />
        </div>
        
        <div className={activeTab === 'builds' ? 'block' : 'hidden'}>
          <RolesView />
        </div>

      </main>
    </div>
  );
}