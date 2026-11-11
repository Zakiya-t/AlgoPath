import React, { useState } from 'react';
import {
  X,
  Network,
  Code2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Clock,
  Check
} from 'lucide-react';
import { UserAssessmentState } from '../types';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (state: UserAssessmentState) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState<'calibration' | 'assessment' | 'roadmap'>('calibration');
  const [selfLevel, setSelfLevel] = useState<'beginner' | 'basic' | 'intermediate' | 'advanced'>('basic');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleFinishAssessment = () => {
    setStep('roadmap');
  };

  const handleDone = () => {
    onComplete({
      selfReportedLevel: selfLevel,
      quizAnswer: selectedAnswer,
      quizScore: selectedAnswer === 1 ? 92 : 60,
      calibratedLevel: selectedAnswer === 1 ? 'Tier 2 (Solid Fundamental)' : 'Tier 1 (Needs Pointer Grounding)'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white glass-card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= STEP A: CALIBRATION & WIREFRAME ONBOARDING ================= */}
        {step === 'calibration' && (
          <div className="space-y-8">
            
            {/* Header */}
            <div className="space-y-2 border-b border-white/5 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Step 1 of 2: Calibration
                </span>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  MVP Design
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Let's understand your learning level.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                We will personalize your Linear DSA journey based on what you actually know.
              </p>
            </div>

            {/* Step 1: Learning Subject (From Screenshot 1) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Choose your learning subject</span>
              </label>

              <div className="glass-card active p-4 sm:p-5 rounded-2xl flex items-center justify-between border border-emerald-500/60 bg-emerald-950/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Network className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Data Structures and Algorithms</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Arrays, Linked Lists, Stacks, Queues, and C++ Memory</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  Available
                </span>
              </div>
            </div>

            {/* Step 2: Choose Programming Language (From Screenshot 1 & 2) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Choose your programming language</span>
              </label>

              <div className="grid sm:grid-cols-3 gap-3">
                {/* C++ (Selected) */}
                <div className="glass-card p-4 rounded-xl border border-emerald-500 bg-emerald-950/20 flex flex-col justify-between h-28 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-extrabold text-white font-mono flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-emerald-400" /> C++
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">Selected</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">The currently supported language for coding exercises.</p>
                </div>

                {/* Python (Coming Later) */}
                <div className="glass-card opacity-50 p-4 rounded-xl border border-white/5 flex flex-col justify-between h-28 cursor-not-allowed">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400 font-mono">Python</span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white/5 px-2 py-0.5 rounded">Coming later</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">Python 3.12 syntax and algorithms track.</p>
                </div>

                {/* Java (Coming Later) */}
                <div className="glass-card opacity-50 p-4 rounded-xl border border-white/5 flex flex-col justify-between h-28 cursor-not-allowed">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400 font-mono">Java</span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white/5 px-2 py-0.5 rounded">Coming later</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">Java collections and memory model.</p>
                </div>
              </div>
            </div>

            {/* Step 3: Tell us your current experience (From Screenshot 2) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Tell us your current experience</span>
              </label>
              <p className="text-xs text-slate-400 -mt-1 italic">
                This is self-reported information, not your actual DSA proficiency.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: 'beginner', label: 'Beginner', desc: 'I am starting from scratch.' },
                  { id: 'basic', label: 'Basic', desc: 'I know programming fundamentals.' },
                  { id: 'intermediate', label: 'Intermediate', desc: 'I have studied some DSA concepts.' },
                  { id: 'advanced', label: 'Advanced', desc: 'I can solve some DSA problems independently.' }
                ].map((tier) => {
                  const active = selfLevel === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelfLevel(tier.id as any)}
                      className={`glass-card p-4 rounded-xl cursor-pointer border transition-all flex items-start gap-3 ${
                        active
                          ? 'border-emerald-500 bg-emerald-950/25 shadow-md shadow-emerald-500/10'
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                        active ? 'border-emerald-400 bg-emerald-400' : 'border-slate-600'
                      }`}>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-obsidian-950"></span>}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{tier.label}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{tier.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Verification Box (From Screenshot 2 bottom) */}
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Next: Initial knowledge assessment</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    AlgoPath will independently assess your knowledge instead of trusting your self-reported level.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep('assessment')}
                className="neon-btn-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-center"
              >
                <span>Take Diagnostic Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP B: REAL KNOWLEDGE ASSESSMENT ================= */}
        {step === 'assessment' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep('calibration')}
                  className="p-1.5 rounded-lg glass-card text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    Diagnostic Challenge 1 of 1
                  </span>
                  <h3 className="text-lg font-bold text-white">C++ Pointer Arithmetic & Auxiliary Space</h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                <Clock className="w-3.5 h-3.5" />
                <span>02:30</span>
              </div>
            </div>

            {/* Question Text */}
            <p className="text-xs sm:text-sm text-slate-200">
              Analyze the following modern C++ code. What does it print, and what is its auxiliary space complexity?
            </p>

            {/* Code Snippet */}
            <div className="bg-black/60 rounded-xl p-4 font-mono text-xs text-slate-200 leading-relaxed border border-white/5 overflow-x-auto">
              <span className="text-emerald-400">#include</span> <span className="text-amber-300">&lt;iostream&gt;</span><br/><br/>
              <span className="text-teal-400">int</span> <span className="text-blue-400">main</span>() &#123;<br/>
              &nbsp;&nbsp;<span className="text-teal-400">int</span> arr[] = &#123;<span className="text-orange-300">10</span>, <span className="text-orange-300">20</span>, <span className="text-orange-300">30</span>, <span className="text-orange-300">40</span>, <span className="text-orange-300">50</span>&#125;;<br/>
              &nbsp;&nbsp;<span className="text-teal-400">int</span>* ptr = arr;<br/>
              &nbsp;&nbsp;ptr += <span className="text-orange-300">2</span>;<br/>
              &nbsp;&nbsp;std::cout &lt;&lt; *(ptr++) &lt;&lt; <span className="text-amber-300">" "</span> &lt;&lt; *ptr;<br/>
              &nbsp;&nbsp;<span className="text-emerald-400">return</span> <span className="text-orange-300">0</span>;<br/>
              &#125;
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {[
                { id: 1, text: 'Prints "30 40" with O(1) Auxiliary Space (Correct)' },
                { id: 2, text: 'Prints "20 30" with O(N) Auxiliary Space' },
                { id: 3, text: 'Prints "30 30" with O(1) Auxiliary Space' },
                { id: 4, text: 'Undefined Behavior / Segmentation Fault' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedAnswer(opt.id)}
                  className={`glass-card p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedAnswer === opt.id
                      ? 'border-emerald-400 bg-emerald-500/15'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs text-slate-200 font-medium">
                    <strong className="font-mono text-emerald-400 mr-2">[{opt.id}]</strong>
                    {opt.text}
                  </span>
                  {selectedAnswer === opt.id && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-[11px] text-slate-400">
                AlgoPath will calibrate your personalized 3D roadmap.
              </span>
              <button
                onClick={handleFinishAssessment}
                disabled={selectedAnswer === null}
                className={`neon-btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  selectedAnswer === null ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <span>Submit & Reveal My Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP C: PERSONALIZED 3D ROADMAP UNLOCK ================= */}
        {step === 'roadmap' && (
          <div className="space-y-6">
            
            {/* Calibration Banner */}
            <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-obsidian-900 to-cyan-950/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Knowledge Calibrated
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                You are ready for: <span className="text-emerald-400">Module 02 (Arrays & Contiguous Memory)</span>
              </h2>
              <p className="text-xs text-slate-300">
                You demonstrated strong pointer arithmetic instincts. We are fast-tracking you past elementary loops directly into dynamic memory resizing and two-pointer algorithms.
              </p>
            </div>

            {/* 5 Linear Node Path Preview */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Your Calibrated Linear DSA Skill Path:
              </span>

              <div className="grid grid-cols-5 gap-2 text-center">
                {/* Node 1 */}
                <div className="glass-card p-3 rounded-xl border border-emerald-500/50 bg-emerald-950/30">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-1">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] font-bold text-white">1. Basics</div>
                  <span className="text-[8px] font-mono text-emerald-400">Verified</span>
                </div>

                {/* Node 2 (Active) */}
                <div className="glass-card p-3 rounded-xl border-2 border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/30 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-cyan-400 text-obsidian-950 mx-auto flex items-center justify-center mb-1 font-bold text-[10px]">
                    2
                  </div>
                  <div className="text-[10px] font-bold text-cyan-300">2. Array</div>
                  <span className="text-[8px] font-mono text-cyan-400 font-bold">ACTIVE TARGET</span>
                </div>

                {/* Node 3 */}
                <div className="glass-card p-3 rounded-xl border border-white/5 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-slate-500 mx-auto flex items-center justify-center mb-1 text-[10px]">
                    3
                  </div>
                  <div className="text-[10px] font-bold text-slate-400">3. Linked List</div>
                  <span className="text-[8px] font-mono text-slate-600">Locked</span>
                </div>

                {/* Node 4 */}
                <div className="glass-card p-3 rounded-xl border border-white/5 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-slate-500 mx-auto flex items-center justify-center mb-1 text-[10px]">
                    4
                  </div>
                  <div className="text-[10px] font-bold text-slate-400">4. Stack</div>
                  <span className="text-[8px] font-mono text-slate-600">Locked</span>
                </div>

                {/* Node 5 */}
                <div className="glass-card p-3 rounded-xl border border-white/5 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-slate-500 mx-auto flex items-center justify-center mb-1 text-[10px]">
                    5
                  </div>
                  <div className="text-[10px] font-bold text-slate-400">5. Queue</div>
                  <span className="text-[8px] font-mono text-slate-600">Locked</span>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-end">
              <button
                onClick={handleDone}
                className="neon-btn-primary px-8 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xl"
              >
                <span>Enter C++ Interactive Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
