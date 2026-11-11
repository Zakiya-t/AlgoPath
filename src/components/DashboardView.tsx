import React, { useState } from 'react';
import { StudentDashboardData, NavigationTab } from '../types';
import {
  Sparkles,
  BookOpen,
  Terminal,
  TrendingUp,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  Layers,
  Code2,
  Cpu,
  Boxes,
  GitFork,
  ListOrdered,
  RotateCcw,
  Play,
  Zap
} from 'lucide-react';

interface DashboardViewProps {
  data: StudentDashboardData;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  onNavigateTab
}) => {
  const [interactiveStep, setInteractiveStep] = useState(1);

  const getModuleIcon = (id: string) => {
    switch (id) {
      case 'foundations':
        return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'arrays':
        return <Boxes className="w-5 h-5 text-cyan-600" />;
      case 'linked-lists':
        return <GitFork className="w-5 h-5 text-teal-600" />;
      case 'stacks':
        return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'queues':
        return <ListOrdered className="w-5 h-5 text-blue-600" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="flex-1 py-8 px-6 sm:px-10 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header: Greeting & Student Profile Level */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              01 &bull; My Dashboard
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-mono text-slate-500 font-semibold">Real-time Growth &amp; Progress</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, <span className="text-emerald-600">{data.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Here is your current standing across theoretical mastery and practical C++ coding implementation.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Consistency Streak */}
          <div className="bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 text-xs font-mono text-amber-800 flex items-center gap-2 shadow-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-bold">{data.streakDays} Day Streak</span>
          </div>

          {/* Level Badge */}
          <div className="bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-xs font-mono text-emerald-800 flex items-center gap-1.5 font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{data.levelBadge}</span>
          </div>
        </div>
      </div>

      {/* 2. Core Tri-Mastery Summary: Overall vs Theory vs Coding (ANIMATED LIGHTNING HIGHLIGHTED BOXES) */}
      <div className="grid sm:grid-cols-3 gap-6">
        
        {/* Card 1: Overall DSA Mastery Score (Animated Lightning Border) */}
        <div className="lightning-border-emerald">
          <div className="lightning-inner p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-800 font-black flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500 animate-pulse" />
                <span>COMPOSITE MASTERY</span>
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100/70 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-slate-950 tracking-tight">
                {data.overallMasteryScore}%
              </span>
              <span className="text-xs text-slate-700 font-mono font-bold">Weighted Scale</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-slate-200/90 rounded-full overflow-hidden border border-slate-300">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${data.overallMasteryScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-800 leading-relaxed font-semibold">
              Balanced index combining theoretical comprehension checks with C++ problem submissions.
            </p>
          </div>
        </div>

        {/* Card 2: Theoretical Knowledge Progress (Knowledge Space - Animated Lightning Border) */}
        <div className="lightning-border-emerald">
          <div className="lightning-inner p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-900 font-black flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>THEORY MASTERY</span>
              </span>
              <button
                onClick={() => onNavigateTab('learning-path')}
                className="text-xs font-mono text-emerald-800 hover:text-emerald-950 font-black flex items-center gap-1 hover:translate-x-0.5 transition-transform"
              >
                <span>View Lessons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-emerald-700 tracking-tight">
                {data.theoryMasteryScore}%
              </span>
              <span className="text-xs text-slate-700 font-mono font-bold">Knowledge Space</span>
            </div>

            <div className="w-full h-3 bg-slate-200/90 rounded-full overflow-hidden border border-slate-300">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${data.theoryMasteryScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-800 leading-relaxed font-semibold">
              Concepts, memory architecture, Big-O analysis, and theoretical algorithm checkpoints.
            </p>
          </div>
        </div>

        {/* Card 3: C++ Coding Proficiency Progress (Coding Lab - Animated Lightning Border) */}
        <div className="lightning-border-cyan">
          <div className="lightning-inner p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-900 font-black flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-700" />
                <span>CODING PROFICIENCY</span>
              </span>
              <button
                onClick={() => onNavigateTab('coding-lab')}
                className="text-xs font-mono text-cyan-800 hover:text-cyan-950 font-black flex items-center gap-1 hover:translate-x-0.5 transition-transform"
              >
                <span>Open Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-cyan-700 tracking-tight">
                {data.codingProficiencyScore}%
              </span>
              <span className="text-xs text-slate-700 font-mono font-bold">Practical Lab</span>
            </div>

            <div className="w-full h-3 bg-slate-200/90 rounded-full overflow-hidden border border-slate-300">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${data.codingProficiencyScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-800 leading-relaxed font-semibold">
              C++ code execution, pointer manipulation, edge-case handling, and passing hidden algorithm tests.
            </p>
          </div>
        </div>

      </div>

      {/* 3. Evidence-Based Adaptive Recommendation Banner (ANIMATED LIGHTNING BORDER) */}
      <div className="lightning-border-rainbow">
        <div className="lightning-inner-lg p-7 sm:p-9 space-y-6 relative overflow-hidden bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-white">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-mono font-black uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-emerald-700 fill-emerald-600 animate-bounce" />
                <span>EVIDENCE-BASED RECOMMENDATION &bull; {data.recommendation.module}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Next Step: <span className="text-emerald-700">{data.recommendation.topic}</span>
              </h2>

              <p className="text-sm text-slate-800 leading-relaxed max-w-3xl font-semibold">
                <strong className="text-emerald-900 font-extrabold">Why this is recommended: </strong>
                {data.recommendation.whyRecommended}
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('coding-lab')}
              className="neon-btn-primary px-7 py-3.5 rounded-2xl text-sm font-extrabold flex items-center gap-3 shadow-lg hover:scale-105 transition-all flex-shrink-0 self-start lg:self-auto"
            >
              <span>Practice in Coding Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recommendation Diagnostic Proof Cards */}
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            
            {/* Weakness Addressed Card */}
            <div className="bg-rose-50/70 p-5 rounded-2xl border-2 border-rose-400 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-rose-900 uppercase font-mono">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Weakness Addressed</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                {data.recommendation.weaknessAddressed}
              </p>
            </div>

            {/* Concrete Failure Evidence Card */}
            <div className="bg-blue-50/70 p-5 rounded-2xl border-2 border-blue-400 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase font-mono">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span>Diagnostic Failure Evidence</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                {data.recommendation.concreteEvidence}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Live Spatial Memory Visualizer Widget (ANIMATED LIGHTNING HIGHLIGHT) */}
      <div className="lightning-border-emerald">
        <div className="lightning-inner p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-800">
                  Interactive Spatial Visualizer
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950">
                Live C++ Dynamic Vector &amp; Pointer Topology
              </h3>
              <p className="text-xs text-slate-700 font-semibold">
                Step through memory reallocation in real time. Notice how pointers mutate when capacity doubles.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setInteractiveStep((prev) => (prev % 4) + 1)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Step Vector Push (`step {interactiveStep}/4`)</span>
              </button>
              <button
                onClick={() => setInteractiveStep(1)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200 transition-colors font-bold"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Memory Cells Visualization Stage */}
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-800 font-black">
                Heap Segment &bull; <strong className="text-emerald-800">std::vector&lt;int&gt;</strong>
              </span>
              <span className="text-slate-800 font-bold">
                Capacity: <strong className="text-slate-950 font-black">4 ints (16 bytes)</strong> &bull; Size: <strong className="text-emerald-800 font-black">{interactiveStep}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { idx: 0, val: 12, addr: '0x10a20', active: true },
                { idx: 1, val: 24, addr: '0x10a24', active: interactiveStep >= 2 },
                { idx: 2, val: 48, addr: '0x10a28', active: interactiveStep >= 3 },
                { idx: 3, val: 96, addr: '0x10a2c', active: interactiveStep >= 4 }
              ].map((cell) => (
                <div
                  key={cell.idx}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center relative ${
                    cell.active
                      ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400/40 -translate-y-1'
                      : 'bg-white/60 border-slate-200 opacity-50'
                  }`}
                >
                  {cell.active && cell.idx === interactiveStep - 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                      *tail ptr
                    </div>
                  )}
                  <div className="text-[10px] font-mono text-slate-700 font-bold">vec[{cell.idx}]</div>
                  <div className="text-3xl font-black font-mono text-slate-950 my-1">
                    {cell.active ? cell.val : '—'}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-900 font-extrabold bg-emerald-50 py-0.5 rounded border border-emerald-200">
                    {cell.addr}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800 flex items-center justify-between font-bold">
              <span>Spatial Address Distance: <strong className="text-slate-950">+4 bytes per element (sizeof(int))</strong></span>
              <span className="text-emerald-800 font-black">&check; Contiguous L1 Cache Friendly</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Five Linear DSA Modules Progress Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-xl font-black text-slate-950">
              The 5 Linear DSA Curriculum Modules
            </h3>
            <p className="text-xs text-slate-700 font-semibold">
              Theoretical knowledge and C++ implementation are evaluated separately for each module.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-700 font-black bg-slate-100 px-3 py-1 rounded-full border-2 border-slate-300">
            5 Modules Active
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.moduleMetrics.map((module) => {
            const isCompleted = module.status === 'completed';
            const isStarted = module.status === 'in_progress';

            return (
              <div
                key={module.id}
                className="bg-white p-5 rounded-3xl border-2 border-slate-300 hover:border-emerald-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      {getModuleIcon(module.id)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-950 leading-snug">
                        {module.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-600 font-bold">
                        {module.completedLessons}/{module.totalLessons} Lessons &bull; {module.solvedCodingProblems}/{module.totalCodingProblems} Problems
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                        : isStarted
                        ? 'bg-cyan-100 text-cyan-950 border border-cyan-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {module.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Progress Indicators: Theory (Emerald) vs Coding (Cyan) */}
                <div className="space-y-2 pt-1 border-t border-slate-200 text-xs font-mono">
                  {/* Theory Progress */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-800 font-bold">Theory Progress</span>
                      <span className="text-emerald-800 font-black">{module.theoryProgress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/90 rounded-full overflow-hidden border border-slate-300">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${module.theoryProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Coding Progress */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-800 font-bold">Coding Proficiency</span>
                      <span className="text-cyan-800 font-black">{module.codingProgress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/90 rounded-full overflow-hidden border border-slate-300">
                      <div
                        className="h-full bg-cyan-500 rounded-full transition-all"
                        style={{ width: `${module.codingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab('learning-path')}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-extrabold text-slate-900 border border-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Diagnosed Strong Concepts vs Weak Misconceptions */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Strong Concepts */}
        <div className="bg-white p-6 rounded-3xl border-2 border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-black text-slate-950">
                Diagnosed Mastered Concepts ({data.strongConcepts.length})
              </h4>
            </div>
            <span className="text-[10px] font-mono text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-black">
              Verified
            </span>
          </div>

          <div className="space-y-3">
            {data.strongConcepts.map((item, idx) => (
              <div
                key={idx}
                className="bg-emerald-50/80 p-4 rounded-2xl border-2 border-emerald-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-950">
                    {item.concept}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-800">
                    {item.masteryPercentage}%
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {item.diagnosticEvidence}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Concepts & Misconceptions Under Review */}
        <div className="bg-white p-6 rounded-3xl border-2 border-rose-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <h4 className="text-sm font-black text-slate-950">
                Misconceptions Under Review ({data.weakConcepts.length})
              </h4>
            </div>
            <span className="text-[10px] font-mono text-rose-950 bg-rose-100 px-2 py-0.5 rounded border border-rose-300 font-black">
              Needs Focus
            </span>
          </div>

          <div className="space-y-3">
            {data.weakConcepts.map((item, idx) => (
              <div
                key={idx}
                className="bg-rose-50/80 p-4 rounded-2xl border-2 border-rose-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-950">
                    {item.concept}
                  </span>
                  <span className="text-xs font-mono font-black text-rose-800">
                    {item.masteryPercentage}%
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {item.diagnosticEvidence}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. Coding Stats, Weekly Consistency, and Spaced Revision (Bottom Tri-Grid) */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Coding Practice Stats */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-cyan-600" />
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900">
              Coding Practice Statistics
            </h4>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-700 font-bold">Problems Solved</span>
              <span className="text-xl font-black font-mono text-slate-950">
                {data.codingStats.totalSolved} / {data.codingStats.totalAvailable}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-300">
                <span className="text-[10px] text-emerald-950 block font-black">Easy</span>
                <span className="font-black text-emerald-800 text-sm">{data.codingStats.easyCount}</span>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-300">
                <span className="text-[10px] text-amber-950 block font-black">Medium</span>
                <span className="font-black text-amber-800 text-sm">{data.codingStats.mediumCount}</span>
              </div>
              <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-300">
                <span className="text-[10px] text-rose-950 block font-black">Hard</span>
                <span className="font-black text-rose-800 text-sm">{data.codingStats.hardCount}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-700 font-bold">Compilation Pass Rate:</span>
              <strong className="text-emerald-800 font-black">{data.codingStats.compilationPassRate}%</strong>
            </div>
          </div>
        </div>

        {/* 7-Day Consistency Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900">
              7-Day Activity &amp; Consistency
            </h4>
          </div>

          <div className="flex items-end justify-between gap-2 h-28 pt-2">
            {data.weeklyActivity.map((day, idx) => {
              const maxHours = 3.0;
              const heightPercent = Math.min(100, Math.round((day.hoursSpent / maxHours) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[9px] font-mono text-slate-600 font-bold">
                    {day.hoursSpent > 0 ? `${day.hoursSpent}h` : ''}
                  </span>
                  <div
                    className={`w-full rounded-lg transition-all ${
                      day.hasActivity
                        ? 'bg-emerald-600 shadow-xs'
                        : 'bg-slate-200'
                    }`}
                    style={{ height: `${Math.max(14, heightPercent)}%` }}
                  />
                  <span className="text-[10px] font-mono font-black text-slate-800">
                    {day.dayName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spaced Retention Schedule */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calendar className="w-4 h-4 text-teal-600" />
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900">
              Upcoming Spaced Revision
            </h4>
          </div>

          <div className="space-y-2.5">
            {data.revisionItems.map((rev) => (
              <div
                key={rev.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-black text-slate-950 block">{rev.concept}</span>
                  <span className="text-[10px] font-mono text-slate-600 font-bold">{rev.module}</span>
                </div>
                <span
                  className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full ${
                    rev.dueInDays === 0
                      ? 'bg-rose-100 text-rose-900 border border-rose-300'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {rev.dueInDays === 0 ? 'Due Today' : `In ${rev.dueInDays}d`}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
