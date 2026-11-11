import React, { useState, useEffect } from 'react';
import {
  Timer,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Award,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { AssessmentRecord } from '../types';

interface EvaluationViewProps {
  initialTopicId?: string;
  onNavigateToNote: (noteId: string) => void;
  onRecordAssessment?: (record: AssessmentRecord) => void;
}

interface EvaluationQuestion {
  id: string;
  topicId: string;
  topicName: string;
  type: 'concept' | 'output' | 'error' | 'reasoning';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  misconceptionTag: string;
  explanation: string;
  recommendedNoteId: string;
  recommendedNoteSection: string;
}

const EVALUATION_BANK: EvaluationQuestion[] = [
  // F01 Questions
  {
    id: 'f01_e1',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    type: 'output',
    question: 'What is the output of the following C++ code snippet?',
    codeSnippet: `int totalMarks = 5;
int students = 2;
double avg = totalMarks / students;
std::cout << avg;`,
    options: ['2.5', '2', '2.0', 'Compilation error'],
    correctAnswer: '2',
    hint: 'Look closely at the types of totalMarks and students on the right side of the division operator.',
    misconceptionTag: 'Integer Division Truncation',
    explanation: 'Both totalMarks and students are int. Therefore, C++ performs integer division (5 / 2 = 2) BEFORE assigning the result to double avg. To preserve decimals, at least one operand must be cast: static_cast<double>(totalMarks) / students.',
    recommendedNoteId: 'F01',
    recommendedNoteSection: 'Section 10: Type Conversion & static_cast'
  },
  {
    id: 'f01_e2',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    type: 'concept',
    question: 'Which of the following is a valid identifier name in standard C++?',
    options: ['2ndAttempt', 'student-score', '_userScore', 'class'],
    correctAnswer: '_userScore',
    hint: 'Recall the rules: cannot start with a digit, cannot contain hyphens, and cannot match reserved keywords like class.',
    misconceptionTag: 'Identifier Naming Rules',
    explanation: 'Identifiers may contain letters, digits, and underscores, and cannot start with a digit. Hyphens (-) are treated as subtraction operators, and "class" is a reserved C++ keyword.',
    recommendedNoteId: 'F01',
    recommendedNoteSection: 'Section 5: Naming rules: identifiers'
  },
  {
    id: 'f01_e3',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    type: 'error',
    question: 'What error will the C++ compiler generate for this code?',
    codeSnippet: `const int maxCapacity;
maxCapacity = 100;`,
    options: [
      'Warning only, runtime crash',
      'Compile-time error: uninitialized const object',
      'Segmentation fault',
      'Stack overflow'
    ],
    correctAnswer: 'Compile-time error: uninitialized const object',
    hint: 'const objects are immutable once created. When must their value be assigned?',
    misconceptionTag: 'Const Object Immutability',
    explanation: 'A const variable must be initialized at the moment of declaration (const int maxCapacity = 100;). Leaving it uninitialized is an immediate compile-time error.',
    recommendedNoteId: 'F01',
    recommendedNoteSection: 'Section 9: Constants: const and constexpr'
  },
  {
    id: 'f01_e4',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    type: 'reasoning',
    question: 'Why does sizeof(int) report 4 bytes on typical 64-bit systems, while sizeof(char) always reports 1 byte?',
    options: [
      'char is guaranteed by the C++ standard to be exactly 1 byte; int sizes depend on platform architecture',
      'int is a pointer type while char is a primitive value',
      'Compilers compress char variables into half a register',
      'char can store up to 16 bits of Unicode directly'
    ],
    correctAnswer: 'char is guaranteed by the C++ standard to be exactly 1 byte; int sizes depend on platform architecture',
    hint: 'Review Section 8: Memory sizes & the C++ standard definitions of sizeof.',
    misconceptionTag: 'Data Type Bit Widths',
    explanation: 'By the ISO C++ standard, sizeof(char) is defined to be 1 byte (typically 8 bits). The sizes of int, long, and pointers are platform-dependent (ILP32 vs LP64 data models).',
    recommendedNoteId: 'F01',
    recommendedNoteSection: 'Section 8: sizeof operator and memory sizes'
  },
  {
    id: 'f01_e5',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    type: 'output',
    question: 'What will be output by this code testing uniform initialization?',
    codeSnippet: `int counter{5};
counter += 3;
std::cout << counter;`,
    options: ['5', '8', 'Compilation error due to braces', 'Undefined behavior'],
    correctAnswer: '8',
    hint: 'C++11 brace initialization int x{5} directly initializes x with 5.',
    misconceptionTag: 'Uniform Brace Initialization',
    explanation: 'Uniform brace initialization (int counter{5};) assigns 5 to counter without narrowing conversions. counter += 3 updates the value to 8.',
    recommendedNoteId: 'F01',
    recommendedNoteSection: 'Section 4: Initialization methods'
  }
];

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  initialTopicId = 'F01',
  onNavigateToNote,
  onRecordAssessment
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId);
  const [activeMode, setActiveMode] = useState<'practice' | 'test'>('practice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(300); // 5 minutes

  // Filter questions for active topic
  const questions = EVALUATION_BANK.filter((q) => q.topicId === selectedTopicId);
  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Timer countdown for Timed Test Mode
  useEffect(() => {
    if (activeMode !== 'test' || testSubmitted) return;

    if (timeLeftSeconds <= 0) {
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeMode, testSubmitted, timeLeftSeconds]);

  const handleSelectOption = (option: string) => {
    if (testSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleStartTest = () => {
    setActiveMode('test');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTestSubmitted(false);
    setShowHint(false);
    setTimeLeftSeconds(300);
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);

    // Calculate score
    let correctCount = 0;
    const misconceptions: {
      questionId: string;
      topicId: string;
      misconception: string;
      question: string;
      userPick: string;
      correctPick: string;
      explanation: string;
      noteId: string;
      section: string;
    }[] = [];

    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      } else {
        misconceptions.push({
          questionId: q.id,
          topicId: q.topicId,
          misconception: q.misconceptionTag,
          question: q.question,
          userPick: userAnswers[q.id] || 'Not answered',
          correctPick: q.correctAnswer,
          explanation: q.explanation,
          noteId: q.recommendedNoteId,
          section: q.recommendedNoteSection
        });
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);

    if (onRecordAssessment) {
      onRecordAssessment({
        id: `eval_${Date.now()}`,
        title: currentQ.topicName,
        mode: activeMode,
        score: scorePct,
        date: 'Just now',
        topic: selectedTopicId,
        topicId: selectedTopicId,
        topicName: currentQ.topicName,
        scorePercentage: scorePct,
        totalQuestions: questions.length,
        correctCount,
        completedAt: 'Just now',
        misconceptionsDetected: misconceptions.map((m) => m.misconception)
      });
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  // Evaluation results calculation
  const correctAnswersCount = questions.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;
  const scorePercentage = Math.round((correctAnswersCount / questions.length) * 100);

  const diagnosedMisconceptions = questions
    .filter((q) => userAnswers[q.id] && userAnswers[q.id] !== q.correctAnswer)
    .map((q) => ({
      question: q.question,
      misconception: q.misconceptionTag,
      userPick: userAnswers[q.id],
      explanation: q.explanation,
      noteId: q.recommendedNoteId,
      section: q.recommendedNoteSection
    }));

  return (
    <div className="flex-1 py-8 px-6 sm:px-10 max-w-6xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/90">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              03 &bull; Evaluation
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              {activeMode === 'practice' ? 'Practice Mode (Learning with Hints)' : 'Test Mode (Timed Diagnostic Assessment)'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Conceptual Knowledge Evaluation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Verify actual understanding before practical C++ coding. Practice mode offers unlimited hints; Test mode provides timed independent scoring.
          </p>
        </div>

        {/* Dual Mode Toggle Pill */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto shadow-xs">
          <button
            onClick={() => {
              setActiveMode('practice');
              setTestSubmitted(false);
              setShowHint(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMode === 'practice'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Practice Mode</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('test');
              handleStartTest();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMode === 'test'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Timed Test Mode</span>
          </button>
        </div>
      </div>

      {/* 2. Topic Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
            Active Topic:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedTopicId('F01');
                setCurrentQuestionIndex(0);
                setUserAnswers({});
                setTestSubmitted(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedTopicId === 'F01'
                  ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400 shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              F01: Variables &amp; Data Types
            </button>
            <span className="text-xs font-mono text-slate-500">
              ({questions.length} questions available)
            </span>
          </div>
        </div>

        {/* Test Timer indicator (if test mode) */}
        {activeMode === 'test' && !testSubmitted && (
          <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-300 px-3.5 py-1.5 rounded-xl font-mono text-xs text-cyan-800 font-bold">
            <Timer className="w-4 h-4 text-cyan-600 animate-spin" />
            <span>Time Remaining: <strong>{formatTime(timeLeftSeconds)}</strong></span>
          </div>
        )}
      </div>

      {/* 3. Main Evaluation Stage or Results Screen */}
      {!testSubmitted ? (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Question Stepper & Content (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-7 sm:p-9 rounded-3xl border-2 border-slate-200/90 shadow-md space-y-6">
              
              {/* Top Question Progress Ribbon */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Question 0{currentQuestionIndex + 1} of 0{questions.length}
                  </span>
                  <span className="text-xs font-mono text-slate-500 capitalize font-medium">
                    &bull; {currentQ.type} check
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                        currentQuestionIndex === idx
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : userAnswers[questions[idx].id]
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </h3>

                {currentQ.codeSnippet && (
                  <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === opt;
                  const isPracticeAnswered = activeMode === 'practice' && userAnswers[currentQ.id] !== undefined;
                  const isThisCorrect = opt === currentQ.correctAnswer;

                  let borderClass = 'border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-50';
                  if (isSelected) {
                    borderClass = 'border-emerald-500 bg-emerald-50 shadow-xs ring-1 ring-emerald-500/30';
                  }

                  if (isPracticeAnswered) {
                    if (isThisCorrect) {
                      borderClass = 'border-emerald-600 bg-emerald-100/70 text-emerald-950 font-bold ring-2 ring-emerald-500/40';
                    } else if (isSelected && !isThisCorrect) {
                      borderClass = 'border-rose-500 bg-rose-50 text-rose-950 line-through';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-4 ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center font-mono text-xs font-bold text-slate-700 flex-shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-slate-800">{opt}</span>
                      </div>

                      {isPracticeAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {isPracticeAnswered && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback in Practice Mode */}
              {activeMode === 'practice' && userAnswers[currentQ.id] && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-1.5 font-mono ${
                    userAnswers[currentQ.id] === currentQ.correctAnswer
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                    {userAnswers[currentQ.id] === currentQ.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct Understanding Verified</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Misconception Detected: {currentQ.misconceptionTag}</span>
                      </>
                    )}
                  </div>
                  <p className="font-sans text-xs text-slate-700 leading-relaxed font-medium">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Hint Box (Practice Mode Only) */}
              {activeMode === 'practice' && showHint && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block font-mono uppercase text-[10px] text-amber-800 font-bold">Tutor Hint:</strong>
                    <span className="font-medium">{currentQ.hint}</span>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => {
                    setCurrentQuestionIndex((prev) => prev - 1);
                    setShowHint(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  &larr; Previous Question
                </button>

                <div className="flex items-center gap-3">
                  {activeMode === 'practice' && !showHint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="px-3 py-1.5 rounded-xl border border-amber-300 text-amber-800 text-xs font-bold bg-amber-50 hover:bg-amber-100 transition-colors flex items-center gap-1.5"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Show Hint</span>
                    </button>
                  )}

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex((prev) => prev + 1);
                        setShowHint(false);
                      }}
                      className="neon-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitTest}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete &amp; Analyze</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Linked Note Quick Link & Rules (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Associated Note Info */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                  Linked Learning Note
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  NOTE {currentQ.recommendedNoteId}
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  Variables and Data Types in C++
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {currentQ.recommendedNoteSection}
                </p>

                <button
                  onClick={() => onNavigateToNote(currentQ.recommendedNoteId)}
                  className="w-full mt-2 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Review Note Section</span>
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* Mode Guidance Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Evaluation Rules
              </span>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <span><strong>Practice Mode:</strong> No timer pressure, hints available, immediate explanations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></span>
                  <span><strong>Test Mode:</strong> 5-minute timer, no hints, official diagnostic score.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0"></span>
                  <span>All evaluation results feed directly into your <strong>DoubtTrace Diagnostic Engine</strong>.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      ) : (
        /* 4. Post-Test Evaluation Diagnostic Analysis Screen */
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-slate-200/90 shadow-xl space-y-8 max-w-4xl mx-auto">
          
          <div className="text-center space-y-3 border-b border-slate-100 pb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
              Evaluation Completed
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Diagnostic Mastery Score: <span className="text-emerald-600">{scorePercentage}%</span>
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              You correctly answered <strong>{correctAnswersCount} of {questions.length}</strong> questions on {currentQ.topicName}.
            </p>
          </div>

          {/* Diagnosed Gaps & Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                DoubtTrace Root-Cause Analysis:
              </span>
            </div>

            {diagnosedMisconceptions.length === 0 ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Flawless Conceptual Mastery!</h4>
                <p className="text-xs text-slate-700 font-medium">
                  You demonstrated rock-solid conceptual understanding of C++ variable semantics, type casting, and constness. You are ready for practical C++ coding challenges!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {diagnosedMisconceptions.map((dm, idx) => (
                  <div key={idx} className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-200 uppercase">
                          Misconception: {dm.misconception}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900">{dm.question}</h5>
                      </div>
                      <span className="text-xs font-mono text-rose-700 flex-shrink-0 font-bold">
                        Your choice: <strong className="line-through">{dm.userPick}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {dm.explanation}
                    </p>

                    <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-mono text-[11px]">
                        Recommended Study: <strong>{dm.noteId} &bull; {dm.section}</strong>
                      </span>
                      <button
                        onClick={() => onNavigateToNote(dm.noteId)}
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>Revisit Note {dm.noteId}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs: Retake or Go to Learning Path */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={handleStartTest}
              className="bg-white hover:bg-slate-50 border border-slate-200 shadow-xs px-5 py-3 rounded-2xl text-xs font-bold text-slate-700 flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Evaluation</span>
            </button>

            <button
              onClick={() => onNavigateToNote('F01')}
              className="neon-btn-primary px-7 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all w-full sm:w-auto justify-center"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to Learning Path (Notes)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
