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
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-[1.5px] shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <GitMerge className="w-5 h-5 text-emerald-600 rotate-90 transition-transform group-hover:rotate-180 duration-500" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
              Algo<span className="text-emerald-600">Path</span>
            </span>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="text-[10px] text-emerald-600 font-mono tracking-wider uppercase font-semibold">
                Linear DSA
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-[10px] text-slate-500 font-mono">Modern C++</span>
            </div>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/80">
          <a
            href="#journey"
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition-all"
          >
            Student Journey
          </a>
          <a
            href="#features"
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition-all"
          >
            7 DoubtTrace Features
          </a>
          <a
            href="#tracer-demo"
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition-all"
          >
            Memory Tracer
          </a>
        </nav>

        {/* Right Auth controls */}
        <div className="flex items-center gap-3.5">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-mono text-emerald-700 font-semibold">
                  {user.name}
                </span>
              </div>
              <button
                onClick={onSignOut}
                className="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('signin')}
              className="bg-white hover:bg-slate-50 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Log In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
