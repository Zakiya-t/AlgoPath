import React from 'react';
import {
  Brain,
  Network,
  Eye,
  AlertTriangle,
  Compass,
  BarChart2,
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
      highlight: 'Objective diagnostic probes',
      color: 'emerald'
    },
    {
      number: 2,
      title: 'Knowledge Dependency Mapping',
      icon: Network,
      tag: 'Prerequisite Graph',
      description: 'Clearly displays which prerequisite concepts must be solid before advancing (e.g. pointer arithmetic before singly linked lists).',
      highlight: 'Visual prerequisite tree',
      color: 'cyan'
    },
    {
      number: 3,
      title: 'Interactive DSA Visualizer',
      icon: Eye,
      tag: 'Spatial Understanding',
      description: 'Observe traversal, insertion, deletion, pointer movement, stack operations (LIFO), and queue operations (FIFO) step-by-step.',
      highlight: 'Pointer & memory animation',
      color: 'teal'
    },
    {
      number: 4,
      title: 'Intelligent Mistake Analyzer',
      icon: AlertTriangle,
      tag: 'Root-Cause Diagnosis',
      description: 'Identifies WHY a student is making mistakes rather than merely displaying "Wrong Answer". Pinpoints flawed logic and guides towards correct reasoning.',
      highlight: 'Misconception detector',
      color: 'rose'
    },
    {
      number: 5,
      title: 'Personalized Learning Direction',
      icon: Compass,
      tag: 'Evidence-Based Next Steps',
      description: 'Recommends the next concept, targeted explanation, or specific C++ exercise based on concrete learning evidence gathered during practice.',
      highlight: 'Dynamic roadmaps',
      color: 'emerald'
    },
    {
      number: 6,
      title: 'Continuous Performance Evaluation',
      icon: BarChart2,
      tag: 'Adaptive Tracking',
      description: 'Continuously tracks accuracy, conceptual understanding, hints required, and recurring mistakes to continuously calibrate your learning pace.',
      highlight: 'Real-time calibration',
      color: 'cyan'
    },
    {
      number: 7,
      title: 'Mastery Verification System',
      icon: ShieldCheck,
      tag: 'Retention Engine',
      description: 'Verifies true mastery using fresh, independent questions &mdash; never just repeating questions you have seen before.',
      highlight: 'Spaced checkups',
      color: 'teal'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Brain className="w-3.5 h-3.5 text-cyan-600" />
            <span>The 7 Pillars of DoubtTrace</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How AlgoPath Makes You a <span className="text-emerald-600">DSA Master</span>
          </h2>
          <p className="text-base text-slate-600">
            Engineered from ground up to solve the core cognitive bottlenecks in understanding memory layout, pointer logic, and algorithm design.
          </p>
        </div>

        {/* 7 Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.number}
                className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                      0{feat.number}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                      {feat.tag}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-700 font-semibold">{feat.highlight}</span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
