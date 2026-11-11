import React from 'react';
import { Compass, ArrowRight, Code, Brain } from 'lucide-react';

interface MethodologySectionProps {
  onStartOnboarding: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onStartOnboarding }) => {
  return (
    <section id="methodology" className="py-20 relative">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <span>The Diagnostic Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Independent Verification &mdash; <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              No More Guesswork.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Self-reporting whether you are "intermediate" or "advanced" is inherently flawed. AlgoPath tests your real understanding of memory layout, pointers, and call stacks before setting your path.
          </p>
        </div>

        {/* 3 Step Scientific Progression */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
              Phase 01
            </span>
            <h3 className="text-xl font-bold text-white">
              Baseline Calibration
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We collect your self-reported familiarity across basic C++, but instead of taking it at face value, our system sets up targeted diagnostic probes for pointer semantics and time complexity.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Phase 02
            </span>
            <h3 className="text-xl font-bold text-white">
              The Diagnostic Gauntlet
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A rapid 3-minute challenge testing pointer dereferencing (`*(ptr++)`), contiguous memory jumps, and auxiliary space requirements. Our engine spots hidden blindspots instantly.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">
              Phase 03
            </span>
            <h3 className="text-xl font-bold text-white">
              The Dynamic 3D Path
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your linear roadmap unlocks in 3D. If you already understand pointer arithmetic, you jump directly to dynamic vectors and linked list reversals without wasting hours on basics.
            </p>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-obsidian-900 to-cyan-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">
              Ready to find out where your C++ DSA skills stand?
            </h3>
            <p className="text-xs text-slate-300">
              It takes less than 3 minutes. Unlock your tailored roadmap across all 5 Linear Data Structure modules.
            </p>
          </div>

          <button
            onClick={onStartOnboarding}
            className="neon-btn-primary px-8 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xl flex-shrink-0"
          >
            <span>Start Free Calibration Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
