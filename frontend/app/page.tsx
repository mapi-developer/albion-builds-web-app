'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Hammer, 
  LogOut, 
  User, 
  Menu,
  LucideIcon
} from 'lucide-react';

// --- Types ---

interface NavigationButtonProps {
  active: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface DiscordIconProps {
  className?: string;
}

interface UserData {
  username: string;
  role: string;
}

type Tab = 'builds' | 'groups';

// --- Components ---

const NavigationButton: React.FC<NavigationButtonProps> = ({ active, icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
      active 
        ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40' 
        : 'text-slate-400 hover:text-amber-500 hover:bg-slate-800'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const DiscordIcon: React.FC<DiscordIconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 127.14 96.36" 
    width="20" 
    height="15"
    fill="currentColor"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.09,105.09,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c2.36-24.44-5.42-48.18-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

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
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="relative max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo - Text Only - Clickable */}
          <button 
            onClick={() => setActiveTab('groups')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <h1 className="text-xl font-bold tracking-tight text-slate-100">
              Albion<span className="text-amber-500">Builds</span>
            </h1>
          </button>

          {/* Navigation Pills - Absolutely Centered */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-slate-900/50 p-1 rounded-xl border border-slate-800/50">
            <NavigationButton 
              active={activeTab === 'groups'} 
              icon={Users} 
              label="Groups" 
              onClick={() => setActiveTab('groups')} 
            />
            <div className="w-px h-4 bg-slate-800 mx-1"></div>
            <NavigationButton
              active={activeTab === 'builds'}
              icon={Hammer}
              label="Builds"
              onClick={() => setActiveTab('builds')}
            />
          </nav>

          {/* User Widget */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4 bg-slate-900/50 pl-4 pr-1.5 py-1.5 rounded-xl border border-slate-800/50">
                <div className="text-right hidden md:block">
                  <div className="text-xs text-amber-500 font-bold uppercase">{user.role}</div>
                  <div className="text-sm font-bold text-white leading-none">{user.username}</div>
                </div>
                <div className="h-9 w-9 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                  <User size={18} className="text-slate-400" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-full transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
                title="Login with Discord"
              >
                <DiscordIcon className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button className="ml-4 md:hidden p-2 text-slate-400 cursor-pointer">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT (Empty) --- */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64 border border-dashed border-slate-800 rounded-xl bg-slate-900/30 text-slate-500">
            {activeTab === 'groups' ? 'Groups Content' : 'Builds Content'}
        </div>
      </main>
    </div>
  );
}