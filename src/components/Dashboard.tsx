import React, { useState } from 'react';
import { StudentProfile, ModuleId } from '../types';
import {
  GitMerge,
  LogOut,
  Flame,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  Play,
  Lock,
  Boxes,
  Cpu,
  GitFork,
  Layers,
  ListOrdered,
  Terminal,
  X
} from 'lucide-react';

interface DashboardProps {
  user: StudentProfile;
  onSignOut: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onSignOut }) => {
  const [activeLabModule, setActiveLabModule] = useState<string | null>(null);

  const modules: {
    id: ModuleId;
    num: string;
    title: string;
    tagline: string;
    status: 'completed' | 'active' | 'locked';
    icon: any;
    progress: number;
  }[] = [
    {
      id: 'basics',
      num: '01',
      title: 'Foundations (C++ & Memory)',
      tagline: 'Pointers, Variables & Stack Frames',
      status: 'completed',
      icon: Cpu,
      progress: user.moduleProgress.basics
    },
    {
      id: 'array',
      num: '02',
      title: 'Static & Dynamic Arrays',
      tagline: 'Contiguous Memory & Vector Resizing',
      status: 'active',
      icon: Boxes,
      progress: user.moduleProgress.array
    },
    {
      id: 'linked-list',
      num: '03',
      title: 'Linked Lists (Singly & Doubly)',
      tagline: 'Node-Based Chains & Pointer Reversals',
      status: 'locked',
      icon: GitFork,
      progress: user.moduleProgress['linked-list']
    },
    {
      id: 'stack',
      num: '04',
      title: 'Stacks (LIFO)',
      tagline: 'Call Stack & Expression Evaluation',
      status: 'locked',
      icon: Layers,
      progress: user.moduleProgress.stack
    },
    {
      id: 'queue',
      num: '05',
      title: 'Queues & Deques (FIFO)',
      tagline: 'Ring Buffers & Breadth-First Buffers',
      status: 'locked',
      icon: ListOrdered,
      progress: user.moduleProgress.queue
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 selection:bg-emerald-500 selection:text-black relative">
      
      {/* 1. Dashboard Top Bar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1.5px] shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                <GitMerge className="w-5 h-5 text-emerald-400 rotate-90" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Algo<span className="text-emerald-400">Path</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block -mt-1">
                Student Dashboard
              </span>
            </div>
          </div>

          {/* User Profile & Badges */}
          <div className="flex items-center gap-4">
            
            {/* Streak Counter */}
            <div className="hidden sm:flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-xl border border-amber-500/20 text-xs font-mono text-amber-300">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{user.streakDays} Day Streak</span>
            </div>

            {/* Current Level Badge */}
            <div className="glass-card px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{user.levelBadge}</span>
            </div>

            {/* Profile Avatar / Info */}
            <div className="flex items-center gap-3 pl-2 border-l border-white/10">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono font-bold flex items-center justify-center text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-white leading-tight">{user.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{user.email}</div>
              </div>

              <button
                onClick={onSignOut}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 glass-card transition-colors ml-1"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10">
        
        {/* 2. Learning Pulse Ribbon (Next Recommended Step) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-obsidian-900 to-cyan-950/20 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Learning Pulse &bull; DoubtTrace Recommendation
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Next Recommended Step: <span className="text-cyan-300">{user.nextRecommendedStep.topic}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                You have mastered basic pointer dereferencing. Now observe how modern C++ dynamic vectors double their capacity under contiguous memory reallocation.
              </p>
            </div>

            {/* Quick Launch Action & Metrics */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <div className="glass-card px-4 py-3 rounded-2xl border border-white/10 text-center">
                <div className="text-xs text-slate-400 font-mono">Estimated Time</div>
                <div className="text-lg font-mono font-bold text-white mt-0.5">~{user.nextRecommendedStep.estimatedMinutes} mins</div>
              </div>

              <button
                onClick={() => setActiveLabModule('Dynamic Arrays & Vector Resizing')}
                className="neon-btn-primary px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume C++ Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 3. DoubtTrace Diagnostic Center (What You Mastered, Misconceptions, Retention) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>DoubtTrace Diagnostic Center</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Live AI Cognitive Profile
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1: What You Mastered */}
            <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">What You Mastered</h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  {user.masteredConcepts.length} Verified
                </span>
              </div>

              <div className="space-y-2">
                {user.masteredConcepts.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="font-mono text-[11px]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 font-mono pt-1">
                Zero rote-learning &bull; Verified through code execution.
              </div>
            </div>

            {/* Card 2: Misconceptions Under Review */}
            <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Misconceptions Under Review</h4>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                  {user.activeMisconceptions.length} Active
                </span>
              </div>

              <div className="space-y-2.5">
                {user.activeMisconceptions.map((misc) => (
                  <div key={misc.id} className="p-3 rounded-xl bg-white/5 border border-amber-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 font-mono">{misc.concept}</span>
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {misc.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {misc.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 font-mono pt-1">
                DoubtTrace targets these in your upcoming practice questions.
              </div>
            </div>

            {/* Card 3: Retention Schedule */}
            <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-cyan-950/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Retention Schedule</h4>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                  Spaced Repetition
                </span>
              </div>

              <div className="space-y-2.5">
                {user.retentionSchedule.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-cyan-500/20 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white font-mono block">{item.concept}</span>
                      <span className="text-[10px] text-slate-400">Scheduled re-test verification</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-bold font-mono text-cyan-400 block">in {item.dueInDays} days</span>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Spaced Check</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 font-mono pt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next checkup scheduled in 4 days.</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Linear DSA Syllabus Progression Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white">
              Linear Data Structures Track
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              1 of 5 Modules Completed (27% Overall)
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {modules.map((m) => {
              const Icon = m.icon;
              const isCompleted = m.status === 'completed';
              const isActive = m.status === 'active';
              const isLocked = m.status === 'locked';

              return (
                <div
                  key={m.id}
                  className={`glass-card p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                      : isCompleted
                      ? 'border-emerald-500/40 bg-emerald-950/15'
                      : 'border-white/5 opacity-50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {m.num}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full animate-pulse">
                          Active
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
                      }`} />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">{m.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">{m.tagline}</p>
                    </div>
                  </div>

                  {/* Progress Bar & Trigger */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Progress</span>
                      <span className={isActive ? 'text-cyan-300 font-bold' : isCompleted ? 'text-emerald-300 font-bold' : ''}>
                        {m.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-obsidian-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCompleted ? 'bg-emerald-400' : isActive ? 'bg-cyan-400' : 'bg-slate-700'
                        }`}
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>

                    {isActive && (
                      <button
                        onClick={() => setActiveLabModule(m.title)}
                        className="w-full py-2 rounded-xl text-xs font-bold bg-cyan-400 text-obsidian-950 flex items-center justify-center gap-1.5 mt-2 shadow-md shadow-cyan-400/20 hover:scale-[1.02] transition-transform"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Continue</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* 5. C++ Interactive Workspace Modal */}
      {activeLabModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            <button
              onClick={() => setActiveLabModule(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white glass-card"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  Live C++ Lab Environment
                </span>
                <h3 className="text-xl font-extrabold text-white">{activeLabModule}</h3>
              </div>
            </div>

            {/* Simulated In-Browser C++ Workspace */}
            <div className="grid lg:grid-cols-2 gap-4">
              
              {/* Code Editor Mock */}
              <div className="bg-obsidian-950 p-4 rounded-2xl border border-white/10 font-mono text-xs text-slate-200 space-y-2">
                <div className="text-[10px] text-slate-500 border-b border-white/5 pb-2 flex items-center justify-between">
                  <span>vector_memory_growth.cpp</span>
                  <span className="text-emerald-400 font-bold">C++20</span>
                </div>
                <pre className="leading-relaxed text-[11px] overflow-x-auto text-slate-300">
<span className="text-emerald-400">#include</span> &lt;iostream&gt;
<span className="text-emerald-400">#include</span> &lt;vector&gt;

<span className="text-teal-400">int</span> <span className="text-blue-400">main</span>() &#123;
    std::vector&lt;<span className="text-teal-400">int</span>&gt; v;
    <span className="text-slate-500">// Watch capacity double: 1 -&gt; 2 -&gt; 4</span>
    <span className="text-purple-400">for</span> (<span className="text-teal-400">int</span> i = <span className="text-orange-400">0</span>; i &lt; <span className="text-orange-400">5</span>; ++i) &#123;
        v.push_back(i * <span className="text-orange-400">10</span>);
        std::cout &lt;&lt; <span className="text-amber-300">"Cap: "</span> &lt;&lt; v.capacity() &lt;&lt; <span className="text-amber-300">"\\n"</span>;
    &#125;
    <span className="text-emerald-400">return</span> <span className="text-orange-400">0</span>;
&#125;
                </pre>
              </div>

              {/* Memory Inspection Visualizer */}
              <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between border-b border-white/5 pb-2">
                  <span>Hardware Memory View</span>
                  <span className="text-cyan-400 font-bold">Contiguous Heap</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white/5 text-xs font-mono flex items-center justify-between">
                    <span className="text-slate-400">v.size():</span>
                    <span className="text-white font-bold">5 elements</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono flex items-center justify-between">
                    <span className="text-cyan-300">v.capacity():</span>
                    <span className="text-cyan-400 font-bold">8 allocations</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 text-xs font-mono flex items-center justify-between">
                    <span className="text-slate-400">Heap Pointer:</span>
                    <span className="text-emerald-400">0x7ffee140a</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                  Notice how vector capacity doubles to prevent expensive heap reallocation per insert!
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveLabModule(null)}
                className="neon-btn-primary px-6 py-2.5 rounded-xl text-xs font-bold"
              >
                Close Lab
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

