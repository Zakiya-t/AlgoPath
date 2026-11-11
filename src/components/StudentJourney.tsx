import React, { useState } from 'react';
import {
  Compass,
  Search,
  BookOpen,
  Target,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const StudentJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    {
      step: 1,
      title: 'Discover your level',
      tagline: 'Initial knowledge assessment',
      icon: Compass,
      description:
        'Begin with a baseline assessment. We evaluate actual programming fundamentals, logical reasoning, and C++ memory knowledge instead of relying only on self-reported confidence.',
      accent: 'emerald',
      preview: {
        badge: 'Diagnostic Probe',
        headline: 'Objective Knowledge Discovery',
        details: [
          'Evaluates C++ pointer mechanics & array indexing',
          'Tests Big-O space and time instinct without tricky syntax gotchas',
          'Uncovers where you truly stand before showing a single tutorial'
        ],
        visualNote: 'Result: Calibrated placement (e.g. Skip Array Basics -> Focus on Pointer Reversals)'
      }
    },
    {
      step: 2,
      title: 'Identify knowledge gaps',
      tagline: 'Misconception-aware diagnosis',
      icon: Search,
      description:
        'Our diagnostic system looks for patterns in answers, reasoning, and coding mistakes. It clearly categorizes what you know, partially understand, and do not understand.',
      accent: 'cyan',
      preview: {
        badge: 'Gap Analysis Engine',
        headline: 'Understands WHY You Made the Mistake',
        details: [
          'Detects if you confused pointer dereferencing with value copying',
          'Identifies off-by-one errors and memory leak vulnerabilities in C++',
          'Maps knowledge dependencies to spot missing prerequisites'
        ],
        visualNote: 'Pattern detected: "Understands LIFO stack concepts, but struggles with dynamic heap resizing"'
      }
    },
    {
      step: 3,
      title: 'Learn your way',
      tagline: 'Personalized learning direction',
      icon: BookOpen,
      description:
        'Get targeted explanations, interactive visualizations, code tracing, and hand-picked video recommendations tailored exclusively to the concepts you need.',
      accent: 'teal',
      preview: {
        badge: 'Multi-Modal Learning',
        headline: 'Visual Explanations & Curated Videos',
        details: [
          'Observe pointers move across contiguous memory blocks in 3D',
          'Interactive C++ code stepping with variable watch windows',
          'Relevant high-yield video recommendations directly matched to your weak topics'
        ],
        visualNote: 'No generic 50-hour playlist: only the exact 5-minute explanations you need'
      }
    },
    {
      step: 4,
      title: 'Practice intelligently',
      tagline: 'Adaptive C++ problem solving',
      icon: Target,
      description:
        'Solve C++ questions carefully selected around your current ability and areas for improvement. If you stumble, DoubtTrace explains the underlying misconception and guides you forward.',
      accent: 'emerald',
      preview: {
        badge: 'Adaptive Problem Selection',
        headline: 'Questions Tuned to Your Frontier',
        details: [
          'Problems adapt in difficulty as you demonstrate competence',
          'Intelligent mistake analyzer explains the underlying flaw, not just "Wrong Answer"',
          'Hands-on C++ coding with instant test execution and memory sanity checks'
        ],
        visualNote: 'Targeting your weak spots: 3 tailored problems on Linked List pointer reversal'
      }
    },
    {
      step: 5,
      title: 'Measure your growth',
      tagline: 'Mastery verification & retention tracking',
      icon: TrendingUp,
      description:
        'Reassess with fresh questions &mdash; never simply repeating the same ones. Track conceptual mastery, hints required, and long-term retention over time.',
      accent: 'cyan',
      preview: {
        badge: 'Retention & Spaced Verification',
        headline: 'True Mastery That Sticks',
        details: [
          'Re-tests previously weak concepts after a delay to verify retention',
          'Dynamic skill radar updates continuously as you improve',
          'Permanent learning profile showing your trajectory from Foundations to Mastery'
        ],
        visualNote: 'Mastery verified: Linked List Pointer Reversal &bull; Retained after 7-day spaced check'
      }
    }
  ];

  return (
    <section id="journey" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Student's Learning Journey</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How a Student Masters DSA on <span className="text-emerald-600">AlgoPath</span>
          </h2>
          <p className="text-base text-slate-600">
            The platform behaves like a personal teacher who understands the student, not a website that gives everyone the same static content.
          </p>
        </div>

        {/* Interactive 5-Step Storytelling Journey */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Step Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            {journeySteps.map((s, index) => {
              const Icon = s.icon;
              const isActive = activeStep === index;
              return (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-500/10 translate-x-1.5 ring-1 ring-emerald-500'
                      : 'border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isActive ? 'text-emerald-700' : 'text-slate-500'
                          }`}
                        >
                          Phase 0{s.step}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">&bull; {s.tagline}</span>
                      </div>
                      <h3
                        className={`text-base font-bold ${
                          isActive ? 'text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep-Dive Stage Card */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">

              {/* Top Accent Ribbon */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-sm">
                    {journeySteps[activeStep].step}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold">
                      {journeySteps[activeStep].preview.badge}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {journeySteps[activeStep].title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 font-semibold">
                  {journeySteps[activeStep].tagline}
                </span>
              </div>

              {/* Full Description */}
              <p className="text-sm text-slate-700 leading-relaxed">
                {journeySteps[activeStep].description}
              </p>

              {/* Detailed Breakdown List */}
              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                <span className="text-xs font-mono text-slate-700 uppercase tracking-wider font-bold">
                  How DoubtTrace Executes This:
                </span>
                <div className="space-y-2.5">
                  {journeySteps[activeStep].preview.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Simulation Note */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-xs text-emerald-800 font-mono font-medium">
                  {journeySteps[activeStep].preview.visualNote}
                </span>
              </div>

              {/* Step indicator */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Phase 0{journeySteps[activeStep].step} of 05 &bull; {journeySteps[activeStep].tagline}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
