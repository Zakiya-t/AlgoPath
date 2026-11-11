import React from 'react';
import { NavigationTab } from '../types';
import {
  BookOpen,
  CheckSquare,
  Bookmark,
  Network,
  Terminal,
  RotateCcw,
  Settings,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface BlankPagePlaceholderProps {
  tab: NavigationTab;
  onGoToDashboard: () => void;
}

export const BlankPagePlaceholder: React.FC<BlankPagePlaceholderProps> = ({
  tab,
  onGoToDashboard
}) => {
  const getTabMeta = () => {
    switch (tab) {
      case 'learning-path':
        return {
          num: '02',
          title: 'Learning Path',
          tagline: 'Theoretical Learning Environment & Structured Notes',
          desc: 'This is where you study concept notes, architecture diagrams, C++ illustrative snippets, and curated video references without the distraction of a coding workspace.',
          icon: BookOpen,
          accent: 'emerald',
          subsections: [
            'Foundations: Variables, loops, functions, memory layout',
            'Arrays: Introduction, indexing, traversal, shifting, searching',
            'Linked Lists: Singly & doubly node pointer manipulation',
            'Stacks: LIFO mechanics & call-stack parsing',
            'Queues: FIFO buffers & circular queue operations'
          ]
        };
      case 'evaluation':
        return {
          num: '03',
          title: 'Evaluation Centre',
          tagline: 'Dual Mode: Practice Mode vs Independent Timed Tests',
          desc: 'Test what you actually understand. Practice Mode provides unlimited attempts and hints for weak concepts. Test Mode runs independent, timed assessments with full diagnostic scoring.',
          icon: CheckSquare,
          accent: 'emerald',
          subsections: [
            'Practice Mode: No timer pressure, immediate feedback, hints & deep explanations',
            'Test Mode: Timed evaluations, mixed concepts, zero hints, retention verification'
          ]
        };
      case 'my-space':
        return {
          num: '04',
          title: 'My Space',
          tagline: "The Student's Personal Desk & Revision Organizer",
          desc: 'Organizes your personal learning material: your handwritten notes, bookmarked YouTube links, saved tricky questions, and mistake collection.',
          icon: Bookmark,
          accent: 'cyan',
          subsections: [
            'My Notes: Personally written notes, organized by module',
            'Saved Resources: Bookmarked videos and diagrams',
            'Saved Questions: Tricky questions saved to revisit later',
            'My Mistakes: Incorrect conceptual questions and runtime submissions'
          ]
        };
      case 'concept-maps':
        return {
          num: '05',
          title: 'Concept Maps',
          tagline: 'Interactive Knowledge Graph & Dependency Trees',
          desc: 'Understand how concepts are connected and which concepts depend on others. Visualizes prerequisites, mastery status, and personalized routes through the curriculum.',
          icon: Network,
          accent: 'cyan',
          subsections: [
            'Interactive Dynamic Nodes: Zoom, pan, and explore relationships',
            'Prerequisite Paths: Visualizes missing foundations when you struggle',
            'Mastery Highlighting: Glows green for mastered nodes, amber for review'
          ]
        };
      case 'coding-lab':
        return {
          num: '06',
          title: 'Coding Lab',
          tagline: 'Dedicated Practical C++ Coding Workspace',
          desc: 'The hands-on environment for C++ problem-solving, test executions, and real-time pointer visualizers. Completely distinct from theoretical study.',
          icon: Terminal,
          accent: 'cyan',
          subsections: [
            'Coding Roadmap: Skill-based C++ implementation progression',
            'Coding Practice: Easy, Medium, Hard problems with compiler feedback',
            'DSA Visualizer: Step-by-step memory pointer animation in 3D',
            'Interactive Debugger: Variable watch, call stack, and memory inspect'
          ]
        };
      case 'revision-centre':
        return {
          num: '07',
          title: 'Revision Centre',
          tagline: 'Spaced Repetition & Retention Engine',
          desc: 'Reinforces long-term memory. Re-tests weak concepts at calculated intervals (4 days, 7 days) to ensure knowledge sticks permanently.',
          icon: RotateCcw,
          accent: 'emerald',
          subsections: [
            'Due Concepts Queue: Concepts ready for periodic spaced review',
            'Retention Drills: Fresh challenge questions targeting past mistakes'
          ]
        };
      case 'profile-settings':
        return {
          num: '08',
          title: 'Profile & Settings',
          tagline: 'Student Preferences & Learning Engine Calibration',
          desc: 'Customize your learning experience, adjust diagnostic sensitivity, and manage your account.',
          icon: Settings,
          accent: 'cyan',
          subsections: [
            'Student Account Information & Cloud Backup',
            'C++ Compiler Settings (C++20 / C++23 standards)',
            'Reset Diagnostic Baseline'
          ]
        };
      default:
        return {
          num: '00',
          title: 'Section',
          tagline: 'Under Construction',
          desc: 'Page content is queued in the AlgoPath architecture roadmap.',
          icon: Sparkles,
          accent: 'emerald',
          subsections: []
        };
    }
  };

  const meta = getTabMeta();
  const Icon = meta.icon;

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-16 px-6 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl w-full space-y-8 relative overflow-hidden text-center sm:text-left">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs ${
              meta.accent === 'cyan'
                ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              <Icon className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                Destination {meta.num} &bull; Next in Build Order
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                {meta.title}
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold">
            Blank / Scaffolding Phase
          </span>
        </div>

        {/* Tagline & Description */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-800">
            {meta.tagline}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            {meta.desc}
          </p>
        </div>

        {/* Planned Subsections Preview */}
        {meta.subsections.length > 0 && (
          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold block">
              Architectural Specifications:
            </span>
            <div className="space-y-2">
              {meta.subsections.map((sub, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Return to Dashboard Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-mono">
            Focus right now: 01 &bull; My Dashboard
          </span>

          <button
            onClick={onGoToDashboard}
            className="neon-btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <span>Return to My Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
