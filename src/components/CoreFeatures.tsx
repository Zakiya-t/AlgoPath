import React from 'react';
import {
  Brain,
  Network,
  Eye,
  AlertTriangle,
  Compass,
  BarChart2,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';

export const CoreFeatures: React.FC = () => {
  const features = [
    {
      number: 1,
      title: 'Smart Knowledge Assessment',
      icon: Brain,
      tag: 'Pre-Module Discovery',
      description: 'Discovers the student’s existing knowledge before beginning a learning module. Avoids wasting your time on fundamentals you already understand.',
      highlight: 'Objective diagnostic probes'
    },
    {
      number: 2,
      title: 'Knowledge Dependency Mapping',
      icon: Network,
      tag: 'Prerequisite Graph',
      description: 'Clearly displays which prerequisite concepts must be solid before advancing (e.g. pointer arithmetic before singly linked lists).',
      highlight: 'Visual prerequisite tree'
    },
    {
      number: 3,
      title: 'Interactive DSA Visualizer',
      icon: Eye,
      tag: 'Spatial Understanding',
      description: 'Observe traversal, insertion, deletion, pointer movement, stack operations (LIFO), and queue operations (FIFO) step-by-step.',
      highlight: 'Pointer & memory animation'
    },
    {
      number: 4,
      title: 'Intelligent Mistake Analyzer',
      icon: AlertTriangle,
      tag: 'Root-Cause Diagnosis',
      description: 'Identifies WHY a student is making mistakes rather than merely displaying "Wrong Answer". Pinpoints flawed logic and guides towards correct reasoning.',
      highlight: 'Misconception detector'
    },
    {
      number: 5,
      title: 'Personalized Learning Direction',
      icon: Compass,
      tag: 'Evidence-Based Next Steps',
      description: 'Recommends the next concept, targeted explanation, or specific C++ exercise based on concrete learning evidence gathered during practice.',
      highlight: 'Dynamic roadmaps'
    },
    {
      number: 6,
      title: 'Continuous Performance Evaluation',
      icon: BarChart2,
      tag: 'Adaptive Tracking',
      description: 'Continuously tracks accuracy, conceptual understanding, hints required, and recurring mistakes to continuously calibrate your learning pace.',
      highlight: 'Real-time skill metrics'
    },
    {
      number: 7,
      title: 'Mastery Verification',
      icon: CheckCircle,
      tag: 'Spaced Retention',
      description: 'Tests previously weak concepts again after a deliberate time delay to guarantee that knowledge is genuinely retained in long-term memory.',
      highlight: 'Zero rote memorization'
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Intelligence Behind DoubtTrace</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            7 Features That Differentiate <span className="text-emerald-400">AlgoPath</span>
          </h2>
          <p className="text-base text-slate-300">
            More than just another code editor &mdash; a cooperating suite of intelligent diagnostic components designed to turn beginners into C++ DSA masters.
          </p>
        </div>

        {/* 7 Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.number}
                className="glass-card p-7 rounded-3xl border border-white/5 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
                      0{feat.number}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2.5 py-1 rounded-md border border-cyan-500/20 inline-block font-semibold">
                    {feat.tag}
                  </span>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-semibold">{feat.highlight}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400/80" />
                </div>
              </div>
            );
          })}

          {/* 8th Card: The Linear Scope Guarantee */}
          <div className="glass-panel p-7 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-obsidian-900 to-cyan-950/20 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 inline-block">
                Focused Scope
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Controlled Linear Scope
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than covering 50 DSA topics superficially, AlgoPath focuses deeply on the 5 foundational areas: Foundations, Arrays, Linked Lists, Stacks, and Queues.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

