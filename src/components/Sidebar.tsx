import React from 'react';
import { NavigationTab } from '../types';
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Bookmark,
  Network,
  Terminal,
  RotateCcw,
  Settings,
  LogOut,
  GitMerge
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  userName: string;
  userEmail: string;
  onSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userName,
  userEmail,
  onSignOut
}) => {
  const navItems: {
    id: NavigationTab;
    label: string;
    icon: any;
    section: 'knowledge' | 'coding' | 'system';
    tag?: string;
  }[] = [
    // Knowledge Space
    {
      id: 'dashboard',
      label: 'My Dashboard',
      icon: LayoutDashboard,
      section: 'knowledge'
    },
    {
      id: 'learning-path',
      label: 'Learning Path',
      icon: BookOpen,
      section: 'knowledge',
      tag: 'Theory'
    },
    {
      id: 'evaluation',
      label: 'Evaluation',
      icon: CheckSquare,
      section: 'knowledge',
      tag: 'Tests'
    },
    {
      id: 'my-space',
      label: 'My Space',
      icon: Bookmark,
      section: 'knowledge',
      tag: 'Notes'
    },
    {
      id: 'concept-maps',
      label: 'Concept Maps',
      icon: Network,
      section: 'knowledge',
      tag: 'Graph'
    },

    // Coding Lab
    {
      id: 'coding-lab',
      label: 'Coding Lab',
      icon: Terminal,
      section: 'coding',
      tag: 'C++ IDE'
    },

    // System
    {
      id: 'revision-centre',
      label: 'Revision Centre',
      icon: RotateCcw,
      section: 'system',
      tag: 'Spaced'
    },
    {
      id: 'profile-settings',
      label: 'Profile & Settings',
      icon: Settings,
      section: 'system'
    }
  ];

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 flex-shrink-0 z-30 select-none shadow-sm">
      
      {/* 1. Brand Logo */}
      <div className="p-5 border-b border-slate-100 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-[1.5px] shadow-md shadow-emerald-500/20">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <GitMerge className="w-5 h-5 text-emerald-600 rotate-90" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
              Algo<span className="text-emerald-600">Path</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-mono tracking-wider uppercase block -mt-0.5 font-bold">
              C++ DSA Engine
            </span>
          </div>
        </div>

        {/* Dual-Environment Pill */}
        <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[10px] font-mono shadow-xs">
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Knowledge
          </span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-cyan-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Coding Lab
          </span>
        </div>
      </div>

      {/* 2. Scrollable Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        
        {/* Group A: DSA Knowledge Space */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
            DSA Knowledge Space
          </div>
          {navItems.filter(item => item.section === 'knowledge').map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.tag && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-medium ${
                    isActive ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Group B: DSA Coding Lab (Dedicated Practical Environment) */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-cyan-600 font-bold flex items-center justify-between">
            <span>Practical Coding</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
          </div>
          {navItems.filter(item => item.section === 'coding').map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-300 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.tag && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-medium ${
                    isActive ? 'bg-cyan-200/60 text-cyan-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Group C: Retention & System */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
            Retention &amp; Account
          </div>
          {navItems.filter(item => item.section === 'system').map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 border border-slate-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.tag && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </nav>

      {/* 3. Bottom User Profile & Sign Out */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
            {userName ? userName[0].toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-slate-800 truncate block">
              {userName}
            </span>
            <span className="text-[10px] font-mono text-slate-400 truncate block">
              {userEmail}
            </span>
          </div>
        </div>

        <button
          onClick={onSignOut}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

    </aside>
  );
};
