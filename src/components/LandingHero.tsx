import React from 'react';
import { ArrowRight, Sparkles, Brain, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface LandingHeroProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenAuth
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:py-20">
      <div className="grid lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Core Value Proposition */}
        <div className="lg:col-span-7 space-y-7">

          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>DoubtTrace Intelligence Engine &bull; Self-Learning C++ DSA</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            A personal DSA mentor that{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              understands you first.
            </span>
          </h1>

          {/* The Core Feedback Loop Pill Strip */}
          <div className="space-y-2.5 pt-1">
            <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-widest font-bold">
              The Complete Feedback Loop
            </span>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold shadow-xs">Learn</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold shadow-xs">Diagnose</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold shadow-xs">Understand</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold shadow-xs">Correct</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold shadow-xs">Practice</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold shadow-xs">Evaluate</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold shadow-sm">Improve</span>
            </div>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Assesses actual C++ knowledge, not confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Misconception-aware mistake diagnosis</span>
            </div>
          </div>

          {/* The Only Get Started CTA Button */}
          <div className="pt-3">
            <button
              onClick={() => onOpenAuth('signup')}
              className="neon-btn-primary px-8 py-4 rounded-2xl text-base font-extrabold flex items-center gap-3 shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Right Column: The "Personal Teacher vs Static Website" Comparison Card */}
        <div className="lg:col-span-5 relative">

          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200/40 via-teal-200/30 to-cyan-200/40 rounded-3xl blur-2xl"></div>

          <div className="relative bg-white/95 rounded-3xl p-7 border border-slate-200/80 shadow-xl space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">How AlgoPath Works</h3>
                  <span className="text-[10px] text-emerald-600 font-mono font-semibold">DoubtTrace Architecture</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                Adaptive AI
              </span>
            </div>

            {/* Comparison 1: Traditional Website */}
            <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Typical DSA Platforms (Generic &amp; Rigid)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediately drops you into "Lesson 1: Arrays" regardless of what you already know. Assumes everyone makes the same errors and gives repetitive LeetCode problems with no root-cause diagnosis.
              </p>
            </div>

            {/* Comparison 2: AlgoPath Adaptive Model */}
            <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>AlgoPath + DoubtTrace (The Personal Mentor)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                First probes your understanding of C++ memory &amp; pointers. Identifies <span className="text-emerald-700 font-bold">what you know, partially understand, and lack</span>. Selects concepts and exercises tailored to your exact weaknesses.
              </p>
            </div>

            {/* Active Student Diagnostic Simulated State */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">Diagnostic Calibration State:</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 font-bold">Active Probe</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/60">
                  <span className="text-slate-700">1. Pointer Arithmetic:</span>
                  <span className="text-emerald-600 font-bold">&check; Mastered</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/60">
                  <span className="text-slate-700">2. Contiguous Cache Lines:</span>
                  <span className="text-cyan-700 font-bold">&bull; Partially Understood</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/60">
                  <span className="text-slate-700">3. Node Reversal Pointers:</span>
                  <span className="text-amber-700 font-bold">! Needs Focus</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600">
                <span>Recommendation:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
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
