import React from 'react';
import { ArrowRight, Sparkles, Brain, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface LandingHeroProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenAuth
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-16 md:py-20">
      <div className="grid lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Core Value Proposition */}
        <div className="lg:col-span-7 space-y-7">

          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>DoubtTrace Intelligence Engine &bull; Self-Learning C++ DSA</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            A personal DSA mentor that{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              understands you first.
            </span>
          </h1>

          {/* The Core Feedback Loop Pill Strip */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
              The Complete Feedback Loop
            </span>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">Learn</span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">Diagnose</span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">Understand</span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">Correct</span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">Practice</span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">Evaluate</span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-bold">Improve</span>
            </div>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Assesses actual C++ knowledge, not confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Misconception-aware mistake diagnosis</span>
            </div>
          </div>

          {/* The Only Get Started CTA Button */}
          <div className="pt-3">
            <button
              onClick={() => onOpenAuth('signup')}
              className="neon-btn-primary px-8 py-4 rounded-2xl text-base font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5 text-obsidian-950" />
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Right Column: The "Personal Teacher vs Static Website" Comparison Card */}
        <div className="lg:col-span-5 relative">

          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 rounded-3xl blur-2xl"></div>

          <div className="relative glass-panel rounded-3xl p-7 border border-white/10 shadow-2xl space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">How AlgoPath Works</h3>
                  <span className="text-[10px] text-emerald-400 font-mono">DoubtTrace Architecture</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-white/5 text-slate-300 px-2.5 py-1 rounded-full border border-white/5">
                Adaptive AI
              </span>
            </div>

            {/* Comparison 1: Traditional Website */}
            <div className="glass-card p-4 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <XCircle className="w-4 h-4" />
                <span>Typical DSA Platforms (Generic & Rigid)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Immediately drops you into "Lesson 1: Arrays" regardless of what you already know. Assumes everyone makes the same errors and gives repetitive LeetCode problems with no root-cause diagnosis.
              </p>
            </div>

            {/* Comparison 2: AlgoPath Adaptive Model */}
            <div className="glass-card p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>AlgoPath + DoubtTrace (The Personal Mentor)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                First probes your understanding of C++ memory & pointers. Identifies <span className="text-emerald-300 font-semibold">what you know, partially understand, and lack</span>. Selects concepts and exercises tailored to your exact weaknesses.
              </p>
            </div>

            {/* Active Student Diagnostic Simulated State */}
            <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Diagnostic Calibration State:</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active Probe</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <span className="text-slate-300">1. Pointer Arithmetic:</span>
                  <span className="text-emerald-400 font-bold">&check; Mastered</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <span className="text-slate-300">2. Contiguous Cache Lines:</span>
                  <span className="text-cyan-400 font-bold">&bull; Partially Understood</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <span className="text-slate-300">3. Node Reversal Pointers:</span>
                  <span className="text-amber-400 font-bold">! Needs Focus</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Recommendation:</span>
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  <span>Fast-track to Linked List Nodes</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
