import React from 'react';
import { ViewState } from '../types';
import { Map, Zap, Compass, Search, User } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children }) => {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '探索与搜索', icon: <Search size={20} /> },
    { id: 'macro', label: '智能路线规划 (宏观)', icon: <Map size={20} /> },
    { id: 'micro', label: 'POI 深度洞察 (微观)', icon: <Zap size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col shadow-sm z-30">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
            <Compass size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-none">SmartTravel</h1>
            <span className="text-[10px] text-brand-600 font-medium tracking-wider">UGC INTELLIGENCE</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 px-4 mb-2 uppercase tracking-wider">工具箱</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                <User size={16} />
              </div>
              <div className="flex-1">
                <div className="font-medium">User Profile</div>
                <div className="text-xs text-slate-400">Pro Plan</div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative flex flex-col bg-slate-50/50">
        <header className="h-16 bg-white border-b border-slate-200 flex-shrink-0 flex items-center justify-between px-8 z-20">
          <h2 className="text-lg font-semibold text-slate-800">
            {navItems.find((n) => n.id === currentView)?.label}
          </h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-slate-600">UGC Engine: Analyzing</span>
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};