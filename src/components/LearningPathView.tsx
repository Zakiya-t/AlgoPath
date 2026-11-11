import React, { useState } from 'react';
import { LEARNING_NOTES } from '../data/learningNotes';
import { LearningNote } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Lightbulb,
  Code2,
  ExternalLink,
  XCircle,
  Zap,
  Clock
} from 'lucide-react';

interface LearningPathViewProps {
  initialNoteId?: string;
  onStartEvaluation: (topicId: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  initialNoteId = 'F01',
  onStartEvaluation,
}) => {
  // Navigation Mode: 'catalog' (all modules overview) or 'reader' (inside a single full note)
  const [viewMode, setViewMode] = useState<'catalog' | 'reader'>('catalog');
  const [selectedNoteId, setSelectedNoteId] = useState<string>(initialNoteId);
  const [activeCategory, setActiveCategory] = useState<'all' | 'fundamental' | 'core_dsa'>('all');
  const [bookmarkedNotes, setBookmarkedNotes] = useState<Record<string, boolean>>({});
  const [completedNotes, setCompletedNotes] = useState<Record<string, boolean>>({ F01: true });
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const activeNoteIndex = LEARNING_NOTES.findIndex((n) => n.id === selectedNoteId);
  const activeNote: LearningNote =
    activeNoteIndex !== -1 ? LEARNING_NOTES[activeNoteIndex] : LEARNING_NOTES[0];

  const prevNote = activeNoteIndex > 0 ? LEARNING_NOTES[activeNoteIndex - 1] : null;
  const nextNote =
    activeNoteIndex < LEARNING_NOTES.length - 1
      ? LEARNING_NOTES[activeNoteIndex + 1]
      : null;

  const filteredNotes = LEARNING_NOTES.filter((note) => {
    if (activeCategory === 'all') return true;
    return note.category === activeCategory;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComplete = (id: string) => {
    setCompletedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectQuizOption = (questionId: string, option: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleOpenNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setViewMode('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* =====================================================================
          1. PERSISTENT TOP HEADER & NAVIGATION
          ===================================================================== */}
      <header className="sticky top-0 z-30 px-6 sm:px-10 py-4 border-b border-slate-200/90 bg-white/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          {viewMode === 'reader' ? (
            <button
              onClick={() => setViewMode('catalog')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border-2 border-slate-300 hover:border-emerald-400 font-black text-xs flex items-center gap-2 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600" />
              <span>Back to All Modules</span>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs bg-emerald-50 text-emerald-800 border-2 border-emerald-300 shadow-xs">
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                DSA Knowledge Space
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-[11px] font-mono text-slate-600 font-bold">
                {viewMode === 'catalog'
                  ? 'All Foundation Notes & Core Modules'
                  : `Currently Reading: Note ${activeNote.id}`}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-950 mt-0.5">
              {viewMode === 'catalog'
                ? 'Curriculum Modules & Complete C++ Notes'
                : activeNote.title}
            </h1>
          </div>
        </div>

        {/* View Controls & Action CTAs */}
        <div className="flex items-center gap-3">
          {viewMode === 'catalog' ? (
            /* Category Filter Tabs */
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold shadow-xs">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-emerald-800 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                All Notes ({LEARNING_NOTES.length})
              </button>
              <button
                onClick={() => setActiveCategory('fundamental')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === 'fundamental'
                    ? 'bg-white text-emerald-800 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Foundations (F01–F07)
              </button>
              <button
                onClick={() => setActiveCategory('core_dsa')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === 'core_dsa'
                    ? 'bg-white text-cyan-800 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Core DSA (Arrays)
              </button>
            </div>
          ) : (
            /* Inside Note Header Controls */
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(activeNote.id)}
                className={`p-2.5 rounded-xl border-2 text-xs flex items-center gap-1.5 font-bold transition-all ${
                  bookmarkedNotes[activeNote.id]
                    ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title="Save note"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedNotes[activeNote.id] ? 'fill-current text-amber-500' : 'text-slate-400'
                  }`}
                />
                <span className="hidden sm:inline">
                  {bookmarkedNotes[activeNote.id] ? 'Saved' : 'Bookmark'}
                </span>
              </button>

              <button
                onClick={() => toggleComplete(activeNote.id)}
                className={`px-3.5 py-2.5 rounded-xl border-2 text-xs font-bold flex items-center gap-1.5 transition-all ${
                  completedNotes[activeNote.id]
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {completedNotes[activeNote.id] ? 'Mastered ✓' : 'Mark Done'}
                </span>
              </button>

              <button
                onClick={() => onStartEvaluation(activeNote.id)}
                className="neon-btn-primary px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md hover:scale-105 transition-all"
              >
                <span>Take Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* =====================================================================
          2. VIEW A: CURRICULUM CATALOG & MODULE HUB (When viewMode === 'catalog')
          ===================================================================== */}
      {viewMode === 'catalog' && (
        <main className="flex-1 py-10 px-6 sm:px-12 max-w-7xl mx-auto w-full space-y-10 animate-in fade-in duration-200">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-white p-8 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-800">
                Structured Educational Notes &bull; High-Confidence C++
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Select a Topic to Dive Deep Into Complete Concepts &amp; Dry Runs
            </h2>
            <p className="text-sm text-slate-700 font-semibold max-w-3xl leading-relaxed">
              Each topic contains beginner-friendly explanations, real-world analogies, verified C++17 syntax, memory tables, common mistake dissections, and instant knowledge checks.
            </p>
          </div>

          {/* Grid of Highlighted Module Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => {
              const isDone = completedNotes[note.id];
              const isFundamental = note.category === 'fundamental';

              return (
                <div
                  key={note.id}
                  onClick={() => handleOpenNote(note.id)}
                  className={`cursor-pointer transition-all duration-300 group ${
                    isFundamental ? 'lightning-border-emerald' : 'lightning-border-cyan'
                  }`}
                >
                  <div className="lightning-inner p-6 space-y-4 flex flex-col justify-between h-full group-hover:scale-[1.01] transition-transform">
                    
                    <div className="space-y-3">
                      {/* Top Pill Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg border ${
                            isFundamental
                              ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                              : 'bg-cyan-100 text-cyan-950 border-cyan-300'
                          }`}>
                            NOTE {note.id}
                          </span>
                          <span className="text-[11px] font-mono text-slate-600 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {note.estimatedStudyTime.split(' ')[0]}
                          </span>
                        </div>

                        {isDone && (
                          <span className="text-[10px] font-mono font-black bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Mastered
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-lg font-black text-slate-950 group-hover:text-emerald-700 transition-colors">
                          {note.title}
                        </h3>
                        <p className="text-xs text-slate-700 font-semibold line-clamp-2 mt-1 leading-relaxed">
                          {note.subtitle}
                        </p>
                      </div>

                      {/* Key Motto */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-800 italic">
                        &ldquo;{note.keyMotto}&rdquo;
                      </div>

                      {/* Concept Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {note.conceptTags.slice(0, 4).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black">
                      <span className="text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1.5">
                        <span>Read Complete Notes</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {note.level}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </main>
      )}

      {/* =====================================================================
          3. VIEW B: INSIDE THAT NOTE FULL (When viewMode === 'reader')
          ===================================================================== */}
      {viewMode === 'reader' && (
        <main className="flex-1 overflow-y-auto px-4 sm:px-10 py-8 space-y-10 max-w-5xl mx-auto font-sans text-slate-800 animate-in fade-in duration-200">
          
          {/* Quick Switcher Ribbon: "Which FR do you want next?" */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-black uppercase text-slate-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Jump to Any Note / Which Topic Do You Want Next?</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-bold">
                {LEARNING_NOTES.length} Topics Available
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {LEARNING_NOTES.map((n) => {
                const isActive = n.id === activeNote.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => handleOpenNote(n.id)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40 scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                    }`}
                  >
                    <span>{n.id}</span>
                    <span className="font-sans text-[11px] font-bold truncate max-w-[120px] hidden md:inline">
                      {n.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note Top Metadata Header Card */}
          <div className="lightning-border-emerald">
            <div className="lightning-inner p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-950 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                      NOTE {activeNote.id}
                    </span>
                    <span className="text-xs font-mono text-slate-600 font-extrabold">
                      {activeNote.moduleName}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs font-mono text-cyan-900 font-black bg-cyan-100 px-2.5 py-1 rounded-lg border border-cyan-300">
                      {activeNote.language}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 pt-1">
                    {activeNote.title}
                  </h1>
                  <p className="text-sm italic text-slate-700 font-bold">
                    {activeNote.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => onStartEvaluation(activeNote.id)}
                  className="neon-btn-primary px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md hover:scale-105 transition-all self-start sm:self-auto flex-shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Take Topic Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Note Specification Details Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Language Standard
                  </span>
                  <span className="font-black text-emerald-800">
                    {activeNote.language}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Target Level
                  </span>
                  <span className="font-black text-slate-900">{activeNote.level}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Estimated Study Time
                  </span>
                  <span className="font-black text-slate-900">{activeNote.estimatedStudyTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Core Purpose
                  </span>
                  <span className="font-black text-slate-900 truncate block" title={activeNote.purpose}>
                    {activeNote.purpose}
                  </span>
                </div>
              </div>

              {/* Key Motto Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-center font-black text-sm tracking-wide text-emerald-950">
                &ldquo;{activeNote.keyMotto}&rdquo;
              </div>
            </div>
          </div>

          {/* Section 1: Learning Objectives */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-center font-mono font-black">
                1
              </span>
              <span>Learning Objectives</span>
            </h2>
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
              <p className="text-xs text-slate-700 font-bold uppercase font-mono tracking-wider">
                After completing this topic, a learner should be able to:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {activeNote.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-800 font-bold leading-relaxed">
                      {obj}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Prerequisites */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-cyan-100 border border-cyan-300 text-cyan-900 text-xs flex items-center justify-center font-mono font-black">
                2
              </span>
              <span>Prerequisites</span>
            </h2>
            <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-2">
              {activeNote.prerequisites.map((pre, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>{pre}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Introduction */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-teal-100 border border-teal-300 text-teal-900 text-xs flex items-center justify-center font-mono font-black">
                3
              </span>
              <span>Introduction: What and Why</span>
            </h2>
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-black text-slate-950">
                  3.1 Conceptual Overview
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {activeNote.introduction.whatIsIt}
                </p>
              </div>

              {/* Relatable Real-world Analogy */}
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3.5">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider block text-amber-900">
                    Real-World Analogy
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed font-semibold">
                    {activeNote.introduction.analogy}
                  </p>
                </div>
              </div>

              {/* Why needed bullets */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  3.3 Why Programs Need This Concept:
                </h4>
                <ul className="space-y-2 pl-2">
                  {activeNote.introduction.whyNeeded.map((why, idx) => (
                    <li key={idx} className="text-xs sm:text-sm flex items-start gap-2.5 text-slate-800 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                      <span>{why}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed Concept Sections */}
          {activeNote.sections.map((sec, idx) => (
            <section key={sec.id} className="space-y-4">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-center font-mono font-black">
                  {idx + 4}
                </span>
                <span>{sec.title}</span>
              </h2>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {sec.content}
                </p>

                {/* Comparison Table if present */}
                {sec.comparisonTable && (
                  <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
                    <table className="w-full text-left text-xs font-mono border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-950 border-b border-slate-200">
                          {sec.comparisonTable.headers.map((h, i) => (
                            <th key={i} className="p-3.5 font-black uppercase tracking-wider">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {sec.comparisonTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3.5 font-bold ${
                                  cIdx === 0
                                    ? 'text-emerald-900 font-black'
                                    : 'text-slate-800'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Code Examples with Syntax Highlighter Block */}
                {sec.codeBlocks && sec.codeBlocks.length > 0 && (
                  <div className="space-y-4 pt-2">
                    {sec.codeBlocks.map((codeBlock, cIdx) => (
                      <div
                        key={cIdx}
                        className="rounded-2xl border-2 border-slate-300 bg-slate-950 overflow-hidden shadow-inner space-y-0"
                      >
                        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                          <span className="text-emerald-400 font-bold flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-emerald-400" />
                            {codeBlock.caption}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase">
                            C++17
                          </span>
                        </div>

                        <pre className="p-5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                          <code>{codeBlock.code}</code>
                        </pre>

                        {codeBlock.expectedOutput && (
                          <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 text-xs font-mono text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-400 font-black flex-shrink-0">
                              Output:
                            </span>
                            <span className="text-slate-200">{codeBlock.expectedOutput}</span>
                          </div>
                        )}

                        <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs font-sans text-slate-300 font-medium">
                          <strong>Execution Logic: </strong>
                          {codeBlock.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* Common Mistakes Section */}
          {activeNote.commonMistakes && activeNote.commonMistakes.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-xs flex items-center justify-center font-mono font-black">
                  !
                </span>
                <span>Common Beginner Traps &amp; Anti-Patterns</span>
              </h2>

              <div className="space-y-4">
                {activeNote.commonMistakes.map((mistake, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-rose-50/70 border-2 border-rose-300 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-rose-950 font-black text-xs uppercase font-mono">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Pitfall #{idx + 1}: {mistake.mistake}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                      <strong>Why this happens: </strong>
                      {mistake.problem}
                    </p>
                    <div className="p-3 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-emerald-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span><strong>Corrected Approach: </strong>{mistake.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DSA Connection Section */}
          {activeNote.dsaConnection && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-300 text-indigo-900 text-xs flex items-center justify-center font-mono font-black">
                  DSA
                </span>
                <span>Direct Connection to Data Structures &amp; Algorithms</span>
              </h2>

              <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/50 border-2 border-indigo-300 space-y-4">
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {activeNote.dsaConnection.explanation}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {activeNote.dsaConnection.structureUsage.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border-2 border-indigo-200 space-y-1 shadow-xs"
                    >
                      <h5 className="text-xs font-black text-indigo-950">
                        {item.structure}
                      </h5>
                      <p className="text-xs font-mono text-slate-700 font-bold">
                        {item.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Practice Questions with Instant Quiz Feedback */}
          {activeNote.practiceQuestions && activeNote.practiceQuestions.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-center font-mono font-black">
                  ?
                </span>
                <span>Interactive Knowledge Check</span>
              </h2>

              <div className="space-y-4">
                {activeNote.practiceQuestions.map((q, idx) => {
                  const selectedOption = quizAnswers[q.id];
                  const isAnswered = selectedOption !== undefined;
                  const isCorrect = selectedOption === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-sm font-black text-slate-950 leading-snug">
                          {idx + 1}. {q.question}
                        </h4>

                        {isAnswered && (
                          <div
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black flex items-center gap-1 uppercase ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                                : 'bg-rose-100 text-rose-950 border border-rose-300'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Correct</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Incorrect</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {q.options && (
                        <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isPicked = selectedOption === opt;
                            const isThisCorrect = opt === q.correctAnswer;

                            let btnStyle = 'border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold';

                            if (isAnswered) {
                              if (isThisCorrect) {
                                btnStyle = 'border-2 border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-500/30';
                              } else if (isPicked && !isCorrect) {
                                btnStyle = 'border-2 border-rose-400 bg-rose-50 text-rose-950 line-through font-bold';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectQuizOption(q.id, opt)}
                                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                              >
                                <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-mono font-black text-slate-700 flex-shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation Box */}
                      {isAnswered && (
                        <div
                          className={`p-4 rounded-xl border-2 text-xs font-mono space-y-1 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-rose-50 border-rose-300 text-rose-950'
                          }`}
                        >
                          <span className="font-black block uppercase tracking-wider text-[10px]">
                            Diagnostic Explanation:
                          </span>
                          <p className="font-sans leading-relaxed font-semibold text-slate-800">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Quick Revision Cheatsheet */}
          {activeNote.quickRevision && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-center font-mono font-black">
                  ✓
                </span>
                <span>Quick Revision Cheatsheet</span>
              </h2>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-5">
                <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-950 border-b border-slate-200">
                        <th className="p-3 font-black uppercase">Term / Syntax</th>
                        <th className="p-3 font-black uppercase">Key Rule to Remember</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activeNote.quickRevision.terms.map((t, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          <td className="p-3 font-black text-emerald-900">
                            {t.term}
                          </td>
                          <td className="p-3 text-slate-800 font-bold">
                            {t.remember}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-800">
                    Critical Rules to Remember:
                  </span>
                  <div className="space-y-1.5">
                    {activeNote.quickRevision.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 17: References */}
          {activeNote.furtherLearning && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 border border-cyan-300 text-cyan-900 text-xs flex items-center justify-center font-mono font-black">
                  Ref
                </span>
                <span>Verified Documentation References</span>
              </h2>

              <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-700">
                  Primary References for Technical Verification:
                </span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activeNote.furtherLearning.references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl border-2 border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-white text-slate-800 hover:text-emerald-900 font-bold text-xs flex items-center justify-between transition-all"
                    >
                      <span className="truncate pr-2">{ref.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* =================================================================
              BOTTOM NAVIGATION BAR (Which FR next? Previous / Next / Test)
              ================================================================= */}
          <div className="lightning-border-rainbow">
            <div className="lightning-inner-lg p-7 sm:p-9 space-y-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-white">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-black text-emerald-900 uppercase tracking-widest bg-emerald-100/70 px-2.5 py-0.5 rounded border border-emerald-300">
                    Topic {activeNote.id} Completed
                  </span>
                  <h3 className="text-xl font-black text-slate-950 pt-1">
                    What would you like to explore next?
                  </h3>
                  <p className="text-xs text-slate-700 font-bold">
                    You can advance to the next note, return to the full module catalog, or evaluate your understanding.
                  </p>
                </div>

                <button
                  onClick={() => onStartEvaluation(activeNote.id)}
                  className="neon-btn-primary px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md hover:scale-105 transition-all flex-shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Take Evaluation Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                {prevNote ? (
                  <button
                    onClick={() => handleOpenNote(prevNote.id)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-extrabold flex items-center gap-2 shadow-xs transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 text-emerald-600" />
                    <span>&larr; Previous: Note {prevNote.id}</span>
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  onClick={() => {
                    setViewMode('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-900 text-xs font-black transition-all"
                >
                  <span>View All Modules Catalog</span>
                </button>

                {nextNote ? (
                  <button
                    onClick={() => handleOpenNote(nextNote.id)}
                    className="neon-btn-primary px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all hover:scale-105"
                  >
                    <span>Next: Note {nextNote.id} ({nextNote.title.split(' ')[0]})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

            </div>
          </div>

        </main>
      )}

    </div>
  );
};
