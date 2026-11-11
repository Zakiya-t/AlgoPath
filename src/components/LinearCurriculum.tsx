import React, { useState } from 'react';
import { LINEAR_MODULES } from '../data/curriculum';
import { CurriculumModule } from '../types';
import {
  Cpu,
  Boxes,
  GitFork,
  Layers,
  ListOrdered,
  ArrowRight,
  Code2,
  Clock,
  HardDrive,
  CheckCircle2,
  X
} from 'lucide-react';

interface LinearCurriculumProps {
  onStartOnboarding: () => void;
}

export const LinearCurriculum: React.FC<LinearCurriculumProps> = ({ onStartOnboarding }) => {
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-emerald-400" />;
      case 'Boxes':
        return <Boxes className="w-6 h-6 text-cyan-400" />;
      case 'GitFork':
        return <GitFork className="w-6 h-6 text-teal-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-emerald-400" />;
      case 'ListOrdered':
        return <ListOrdered className="w-6 h-6 text-cyan-400" />;
      default:
        return <Cpu className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="curriculum" className="py-20 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <span>Curriculum Track</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The 5 Pillars of <span className="text-emerald-400">Linear Data Structures</span>
          </h2>
          <p className="text-base text-slate-400">
            Engineered from ground up for C++. Master pointer traversal, contiguous vs node memory, LIFO/FIFO patterns, and algorithmic optimization.
          </p>
        </div>

        {/* 5 Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LINEAR_MODULES.map((module) => (
            <div
              key={module.id}
              onClick={() => setSelectedModule(module)}
              className="glass-card p-7 rounded-3xl border border-white/5 hover:border-emerald-500/50 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="space-y-4">
                {/* Module Badge & Number */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getModuleIcon(module.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        Module 0{module.number}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs font-mono text-cyan-300/80 bg-cyan-950/20 px-2.5 py-1 rounded-md border border-cyan-500/20 inline-block">
                  {module.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {module.description}
                </p>

                {/* Key Concepts Preview */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Core Concepts:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {module.concepts.slice(0, 3).map((c, i) => (
                      <span key={i} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                        {c.split('(')[0]}
                      </span>
                    ))}
                    {module.concepts.length > 3 && (
                      <span className="text-[10px] text-emerald-400 px-1 py-0.5">
                        +{module.concepts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-slate-400">Access: <strong className="text-emerald-400">{module.complexity.access}</strong></span>
                  <span className="text-slate-400">Space: <strong className="text-cyan-400">{module.complexity.space}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}

          {/* 6th Card: The Calibration Assessment Callout */}
          <div className="glass-panel p-7 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-obsidian-900 to-cyan-950/20 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 inline-block">
                Adaptive Placement
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Don't know where to start?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Take our 3-minute diagnostic test. AlgoPath assesses your understanding of pointers, array indices, and call-stacks to pinpoint exactly which module you should tackle first.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Objective C++ knowledge calibration</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Skip what you already know</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Interactive 3D roadmap generation</span>
                </div>
              </div>
            </div>

            <button
              onClick={onStartOnboarding}
              className="neon-btn-primary w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-6"
            >
              <span>Take Diagnostic Calibration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Module Detail Modal / Drawer */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedModule(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white glass-card"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  Module 0{selectedModule.number}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedModule.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300 font-mono">
                {selectedModule.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedModule.description}
            </p>

            {/* Complexity Matrix Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Asymptotic Complexity Matrix</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
                <div className="glass-card p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400">Access</div>
                  <div className="font-bold text-emerald-400 mt-1">{selectedModule.complexity.access}</div>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400">Search</div>
                  <div className="font-bold text-slate-200 mt-1">{selectedModule.complexity.search}</div>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400">Insertion</div>
                  <div className="font-bold text-cyan-400 mt-1">{selectedModule.complexity.insertion}</div>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400">Deletion</div>
                  <div className="font-bold text-cyan-400 mt-1">{selectedModule.complexity.deletion}</div>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <div className="text-[10px] text-slate-400">Aux Space</div>
                  <div className="font-bold text-amber-400 mt-1">{selectedModule.complexity.space}</div>
                </div>
              </div>
            </div>

            {/* Concepts Covered */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Key Concepts & In-Depth Topics</span>
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedModule.concepts.map((concept, index) => (
                  <div key={index} className="glass-card p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* C++ Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>C++ Implementation Pattern</span>
              </span>
              <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {selectedModule.cppSnippet}
              </pre>
            </div>

            {/* Real World Impact */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-emerald-300">Industry Real-World Application</h4>
                <p className="text-xs text-slate-300 mt-0.5">{selectedModule.practicalApplication}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => setSelectedModule(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white glass-card"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedModule(null);
                  onStartOnboarding();
                }}
                className="neon-btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <span>Calibrate & Start Module</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

