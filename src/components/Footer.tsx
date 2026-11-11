import React from 'react';
import { GitMerge, Github, Twitter, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/90 py-12 bg-white/80 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-6 space-y-8">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo & Philosophy */}
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 p-[1px]">
                <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                  <GitMerge className="w-4 h-4 text-emerald-600 rotate-90" />
                </div>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Algo<span className="text-emerald-600">Path</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering developers to truly master Linear Data Structures in C++ through 3D memory tracking and independent diagnostic calibration.
            </p>
          </div>

          {/* Linear Module Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2">
              <span className="font-mono text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                5 Linear Modules
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li><a href="#journey" className="hover:text-emerald-600 transition-colors">1. Basics &amp; Pointers</a></li>
                <li><a href="#journey" className="hover:text-emerald-600 transition-colors">2. Arrays &amp; Vectors</a></li>
                <li><a href="#journey" className="hover:text-emerald-600 transition-colors">3. Linked Lists</a></li>
                <li><a href="#journey" className="hover:text-emerald-600 transition-colors">4. Stacks (LIFO)</a></li>
                <li><a href="#journey" className="hover:text-emerald-600 transition-colors">5. Queues (FIFO)</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-cyan-700 font-bold uppercase tracking-wider text-[10px]">
                Interactive Tools
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li><a href="#tracer-demo" className="hover:text-cyan-600 transition-colors">Memory Tracer</a></li>
                <li><a href="#features" className="hover:text-cyan-600 transition-colors">Diagnostic Engine</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">C++ AST Analyzer</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">3D Cache Visualizer</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                Community
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Open Source</span>
                </li>
                <li className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer">
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Developer Updates</span>
                </li>
                <li className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Modern C++ Guide</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span>&copy; 2026 AlgoPath. Designed for deep C++ Data Structure Mastery.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800">Terms of Service</a>
            <a href="#" className="hover:text-slate-800">C++20 Playground</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
