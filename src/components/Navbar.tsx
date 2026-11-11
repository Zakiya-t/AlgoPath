import React from 'react';
import { GitMerge, UserCheck } from 'lucide-react';
import { AuthMode } from '../types';

interface NavbarProps {
  onOpenAuth: (mode: AuthMode) => void;
  user: { email: string; name: string } | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  user,
  onSignOut
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
              <GitMerge className="w-5 h-5 text-emerald-400 rotate-90 transition-transform group-hover:rotate-180 duration-500" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Algo<span className="text-emerald-400">Path</span>
            </span>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="text-[10px] text-emerald-400/90 font-mono tracking-wider uppercase font-semibold">Linear DSA</span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="text-[10px] text-slate-400 font-mono">Modern C++</span>
            </div>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-white/5">
          <a
            href="#journey"
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            Student Journey
          </a>
          <a
            href="#features"
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            7 DoubtTrace Features
          </a>
          <a
            href="#tracer-demo"
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            Memory Tracer
          </a>
        </nav>

        {/* Right Auth controls */}
        <div className="flex items-center gap-3.5">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 glass-card px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-mono text-emerald-300">{user.name}</span>
              </div>
              <button
                onClick={onSignOut}
                className="text-xs text-slate-400 hover:text-rose-400 font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('signin')}
              className="glass-card hover:bg-white/10 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white border border-white/10 transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Log In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
