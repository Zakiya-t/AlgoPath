import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Search,
  Lightbulb,
  FileText,
  RotateCcw,
  Calendar,
  X
} from 'lucide-react';
import { PersonalNote, MistakeVaultItem, SavedQuestionItem } from '../types';

interface MySpaceViewProps {
  onNavigateToNote: (noteId: string) => void;
  onStartEvaluation: (topicId: string) => void;
}

const STORAGE_KEY_NOTES = 'algopath_personal_notes';
const STORAGE_KEY_MISTAKES = 'algopath_mistake_vault';
const STORAGE_KEY_SAVED_QUESTIONS = 'algopath_saved_questions';

const DEFAULT_NOTES: PersonalNote[] = [
  {
    id: 'note-1',
    title: 'Integer Division Truncation Trap (C++)',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    content:
      'Always remember: if both operands in a division `a / b` are integers, C++ performs integer division and drops the fractional part BEFORE assigning to any variable, even if the destination is a `double`! Always cast at least one operand with `static_cast<double>(a)`.',
    codeSnippet: `int totalMarks = 17;
int studentCount = 4;

// ❌ TRAP: Both operands are int, result truncated to 4.0
double wrongAvg = totalMarks / studentCount; 

// ✅ CORRECT: Explicit cast preserves decimal fraction 4.25
double correctAvg = static_cast<double>(totalMarks) / studentCount;`,
    createdAt: '2026-03-28',
    updatedAt: '2026-03-28',
    tags: ['Gotcha', 'Type Casting', 'static_cast']
  },
  {
    id: 'note-2',
    title: 'Pointer Address-Of (&) vs Dereference (*)',
    topicId: 'F06',
    topicName: 'F06: Pointers & Memory Addresses',
    content:
      'Mental model trick:\n• `&x` asks: "WHERE do you live in RAM?" (returns hexadecimal address like 0x7ffd).\n• `*ptr` asks: "WHAT value is living at the address you hold?" (reads or writes that memory slot).\n• Always initialize pointers to `nullptr` to prevent undefined behavior from wild pointers.',
    codeSnippet: `int score = 95;
int* pScore = &score; // Stores address of score

std::cout << pScore;  // Prints address: 0x7ffeef42
std::cout << *pScore; // Dereferences: prints 95

*pScore = 100;        // Changes score directly in RAM!`,
    createdAt: '2026-03-29',
    updatedAt: '2026-03-29',
    tags: ['Pointers', 'Memory', 'RAM Architecture']
  },
  {
    id: 'note-3',
    title: 'Vector Capacity Doubling & Iterator Invalidation',
    topicId: 'F07',
    topicName: 'F07: Dynamic Memory & std::vector',
    content:
      'When `std::vector::push_back()` causes `size() > capacity()`, the vector allocates a new contiguous block with 2x capacity on the heap, copies or moves all elements, and deletes the old block. This invalidates all existing pointers, references, and iterators to vector elements! Use `v.reserve(N)` if final size is known in advance.',
    codeSnippet: `std::vector<int> nums;
nums.reserve(100); // Pre-allocates memory for 100 elements: zero reallocations!

for (int i = 0; i < 100; ++i) {
    nums.push_back(i); // O(1) guaranteed, no iterator invalidation
}`,
    createdAt: '2026-03-30',
    updatedAt: '2026-03-30',
    tags: ['std::vector', 'Amortized O(1)', 'Performance']
  }
];

const DEFAULT_MISTAKES: MistakeVaultItem[] = [
  {
    id: 'mis-1',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    question: 'What is the output of: int a = 5; int b = 2; double c = a / b; std::cout << c; ?',
    codeSnippet: `int a = 5;
int b = 2;
double c = a / b;
std::cout << c;`,
    studentAnswer: '2.5',
    correctAnswer: '2',
    misconceptionTag: 'Integer Division Truncation',
    explanation:
      'C++ determines operation types based on operands, not the assignment destination. Because both `a` and `b` are `int`, integer division `5 / 2` evaluates to integer `2` first. Only then is integer `2` converted to `double 2.0` (printed as 2).',
    recommendedNoteId: 'F01',
    recommendedNoteSection: 'Section 10: Type Conversion & static_cast',
    resolved: false,
    timestamp: '2026-03-29'
  },
  {
    id: 'mis-2',
    topicId: 'F06',
    topicName: 'F06: Pointers & Memory Addresses',
    question: 'What happens when executing: int* p; *p = 50; std::cout << *p; ?',
    codeSnippet: `int* p; // uninitialized wild pointer!
*p = 50; 
std::cout << *p;`,
    studentAnswer: 'Outputs 50',
    correctAnswer: 'Undefined Behavior / Segmentation Fault (Crash)',
    misconceptionTag: 'Wild Pointer Dereference',
    explanation:
      'Declaring a pointer `int* p;` only reserves 8 bytes on the stack to hold an address — it does NOT allocate memory for an integer. The uninitialized pointer holds garbage memory coordinates. Writing `*p = 50` attempts to write into an arbitrary memory location, resulting in crash or corruption.',
    recommendedNoteId: 'F06',
    recommendedNoteSection: 'Section 4: Pointer Safety & nullptr',
    resolved: false,
    timestamp: '2026-03-30'
  },
  {
    id: 'mis-3',
    topicId: 'F04',
    topicName: 'F04: Loops & Iteration Control',
    question: 'How many times does the loop body execute in: for (int i = 0; i < 5; ++i) { ... } ?',
    codeSnippet: `for (int i = 0; i < 5; ++i) {
    // executes 5 times for i = 0, 1, 2, 3, 4
}`,
    studentAnswer: '6 times',
    correctAnswer: '5 times',
    misconceptionTag: 'Off-by-One Loop Boundary',
    explanation:
      'With zero-based indexing starting at `i = 0` and strict inequality `i < 5`, the valid iterations are `0, 1, 2, 3, 4`, totaling exactly 5 executions. When `i` reaches 5, the condition `5 < 5` becomes false immediately.',
    recommendedNoteId: 'F01',
    recommendedNoteSection: 'Section 7: Dry Run & Iteration Counts',
    resolved: true,
    timestamp: '2026-03-27'
  }
];

const DEFAULT_SAVED_QUESTIONS: SavedQuestionItem[] = [
  {
    id: 'sq-1',
    topicId: 'F01',
    topicName: 'F01: Variables and Data Types',
    question:
      'Which modern C++ declaration creates a compile-time constant that the compiler can evaluate during compilation and optimize into assembly immediate values?',
    codeSnippet: `// Which keyword is specifically evaluated at compile time?
? int BUFFER_SIZE = 1024;`,
    options: [
      'const int BUFFER_SIZE = 1024;',
      'constexpr int BUFFER_SIZE = 1024;',
      'volatile const int BUFFER_SIZE = 1024;',
      '#define BUFFER_SIZE 1024'
    ],
    correctAnswer: 'constexpr int BUFFER_SIZE = 1024;',
    explanation:
      '`constexpr` (introduced in C++11 and expanded in C++14/17) strictly guarantees compile-time constant evaluation. `const` only guarantees read-only semantics at runtime, while `#define` is an untyped preprocessor macro without scope.',
    savedAt: '2026-03-28'
  },
  {
    id: 'sq-2',
    topicId: 'F06',
    topicName: 'F06: Pointers & Memory Addresses',
    question:
      'Given an array `int arr[5] = {10, 20, 30, 40, 50};` and pointer `int* p = arr + 2;`, what is the value of `*(p + 1)`?',
    codeSnippet: `int arr[5] = {10, 20, 30, 40, 50};
int* p = arr + 2; // p points to index 2 (value 30)
std::cout << *(p + 1);`,
    options: ['20', '30', '40', '50'],
    correctAnswer: '40',
    explanation:
      '`arr + 2` evaluates to the address of `arr[2]` (value 30). Then `p + 1` advances the pointer by one `sizeof(int)` step to index 3. Dereferencing `*(p + 1)` retrieves the element at `arr[3]`, which is 40.',
    savedAt: '2026-03-29'
  },
  {
    id: 'sq-3',
    topicId: 'F07',
    topicName: 'F07: Dynamic Memory & std::vector',
    question:
      'What is the worst-case and amortized time complexity of inserting an element at the back of a `std::vector` using `push_back()`?',
    codeSnippet: `std::vector<int> v;
// What is the time complexity of push_back()?
v.push_back(42);`,
    options: [
      'Worst-case O(1), Amortized O(1)',
      'Worst-case O(N), Amortized O(1)',
      'Worst-case O(N), Amortized O(N)',
      'Worst-case O(log N), Amortized O(1)'
    ],
    correctAnswer: 'Worst-case O(N), Amortized O(1)',
    explanation:
      'Normally, `push_back` is O(1) constant time when space remains. When capacity is exceeded, it must allocate new heap memory and copy all N elements, taking O(N) worst-case. Because capacity doubles (geometric expansion), the amortized cost per operation across many insertions is O(1).',
    savedAt: '2026-03-30'
  }
];

export const MySpaceView: React.FC<MySpaceViewProps> = ({
  onNavigateToNote,
  onStartEvaluation
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'mistakes' | 'saved' | 'bookmarks'>('notes');
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [mistakes, setMistakes] = useState<MistakeVaultItem[]>([]);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestionItem[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('all');
  const [mistakeFilter, setMistakeFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  // Interactive Quiz state in Saved Questions tab
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizChecked, setQuizChecked] = useState<Record<string, boolean>>({});

  // Note creation drawer/modal
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTopicId, setNewTopicId] = useState('F01');
  const [newContent, setNewContent] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newTags, setNewTags] = useState('Gotcha, C++');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize and load from localStorage
  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem(STORAGE_KEY_NOTES);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes(DEFAULT_NOTES);
        localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(DEFAULT_NOTES));
      }

      const storedMistakes = localStorage.getItem(STORAGE_KEY_MISTAKES);
      if (storedMistakes) {
        setMistakes(JSON.parse(storedMistakes));
      } else {
        setMistakes(DEFAULT_MISTAKES);
        localStorage.setItem(STORAGE_KEY_MISTAKES, JSON.stringify(DEFAULT_MISTAKES));
      }

      const storedSQ = localStorage.getItem(STORAGE_KEY_SAVED_QUESTIONS);
      if (storedSQ) {
        setSavedQuestions(JSON.parse(storedSQ));
      } else {
        setSavedQuestions(DEFAULT_SAVED_QUESTIONS);
        localStorage.setItem(STORAGE_KEY_SAVED_QUESTIONS, JSON.stringify(DEFAULT_SAVED_QUESTIONS));
      }
    } catch {
      setNotes(DEFAULT_NOTES);
      setMistakes(DEFAULT_MISTAKES);
      setSavedQuestions(DEFAULT_SAVED_QUESTIONS);
    }
  }, []);

  const saveNotesToStorage = (updatedNotes: PersonalNote[]) => {
    setNotes(updatedNotes);
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(updatedNotes));
  };

  const saveMistakesToStorage = (updatedMistakes: MistakeVaultItem[]) => {
    setMistakes(updatedMistakes);
    localStorage.setItem(STORAGE_KEY_MISTAKES, JSON.stringify(updatedMistakes));
  };

  const saveSavedQuestionsToStorage = (updatedSQ: SavedQuestionItem[]) => {
    setSavedQuestions(updatedSQ);
    localStorage.setItem(STORAGE_KEY_SAVED_QUESTIONS, JSON.stringify(updatedSQ));
  };

  // Actions
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const topicNameMap: Record<string, string> = {
      F01: 'F01: Variables & Data Types',
      F02: 'F02: Operators & Expressions',
      F03: 'F03: Conditionals & Decisions',
      F04: 'F04: Loops & Iterations',
      F05: 'F05: Functions & Passing',
      F06: 'F06: Pointers & Memory',
      F07: 'F07: Dynamic Memory & Vectors',
      'D01-A01': 'Arrays: Introduction & Traversal'
    };

    const newNote: PersonalNote = {
      id: `note-${Date.now()}`,
      title: newTitle.trim(),
      topicId: newTopicId,
      topicName: topicNameMap[newTopicId] || newTopicId,
      content: newContent.trim(),
      codeSnippet: newCode.trim() ? newCode.trim() : undefined,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    };

    const updated = [newNote, ...notes];
    saveNotesToStorage(updated);

    // Reset form
    setNewTitle('');
    setNewContent('');
    setNewCode('');
    setNewTags('Gotcha, C++');
    setIsCreatingNote(false);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotesToStorage(updated);
  };

  const handleToggleResolveMistake = (id: string) => {
    const updated = mistakes.map((m) => {
      if (m.id === id) {
        return { ...m, resolved: !m.resolved };
      }
      return m;
    });
    saveMistakesToStorage(updated);
  };

  const handleDeleteSavedQuestion = (id: string) => {
    const updated = savedQuestions.filter((q) => q.id !== id);
    saveSavedQuestionsToStorage(updated);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTopic = selectedTopicFilter === 'all' || note.topicId === selectedTopicFilter;
    return matchesSearch && matchesTopic;
  });

  // Filtered Mistakes
  const filteredMistakes = mistakes.filter((m) => {
    if (mistakeFilter === 'unresolved') return !m.resolved;
    if (mistakeFilter === 'resolved') return m.resolved;
    return true;
  });

  const unresolvedCount = mistakes.filter((m) => !m.resolved).length;

  return (
    <div className="flex-1 py-8 px-6 sm:px-10 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header & Desk Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/90">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              My Space
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-mono text-slate-600 font-bold">
              Student Desk &amp; Knowledge Vault
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Personal Notes &amp; Mistake Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
            Your private repository of handwritten revision notes, diagnosed algorithmic misconceptions, bookmarked tricky quiz questions, and verified C++ reference links.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNote(true)}
          className="lightning-border-emerald p-[2px] rounded-2xl group flex-shrink-0 shadow-sm cursor-pointer"
        >
          <div className="lightning-inner px-5 py-2.5 rounded-[14px] flex items-center gap-2 text-slate-950 font-black text-xs group-hover:text-emerald-700 transition-colors">
            <Plus className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Write New Note</span>
          </div>
        </button>
      </div>

      {/* 2. Dynamic Metric Cards (Electric Lightning Borders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Notes Count */}
        <div className="lightning-border-emerald p-[2px] rounded-2xl shadow-sm">
          <div className="lightning-inner p-5 rounded-[14px] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                Personal Notes
              </span>
              <span className="text-3xl font-black text-slate-950 mt-1 block">
                {notes.length}
              </span>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 block">
                {notes.length} Active in Local Storage
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Mistakes in Vault */}
        <div className="lightning-border-rainbow p-[2px] rounded-2xl shadow-sm">
          <div className="lightning-inner p-5 rounded-[14px] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                Mistake Vault
              </span>
              <span className="text-3xl font-black text-slate-950 mt-1 block">
                {unresolvedCount}
              </span>
              <span className="text-[11px] text-rose-600 font-bold mt-0.5 block">
                {unresolvedCount > 0 ? `${unresolvedCount} Under Active Review` : 'All Misconceptions Resolved!'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Saved Questions */}
        <div className="lightning-border-cyan p-[2px] rounded-2xl shadow-sm">
          <div className="lightning-inner p-5 rounded-[14px] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                Saved Questions
              </span>
              <span className="text-3xl font-black text-slate-950 mt-1 block">
                {savedQuestions.length}
              </span>
              <span className="text-[11px] text-cyan-700 font-bold mt-0.5 block">
                Ready for Interactive Re-attempt
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border-2 border-cyan-200 flex items-center justify-center text-cyan-600 shadow-xs">
              <RotateCcw className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Spaced Retention Status */}
        <div className="lightning-border-emerald p-[2px] rounded-2xl shadow-sm">
          <div className="lightning-inner p-5 rounded-[14px] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                Next Spaced Review
              </span>
              <span className="text-3xl font-black text-slate-950 mt-1 block">
                2 Days
              </span>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 block">
                Interval: 48h Retention Cycle
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Sub-Hub Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs ${
              activeTab === 'notes'
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Personal Notes</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'notes' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {notes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs ${
              activeTab === 'mistakes'
                ? 'bg-rose-600 text-white shadow-rose-500/20'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>DoubtTrace Mistake Vault</span>
            {unresolvedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800">
                {unresolvedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs ${
              activeTab === 'saved'
                ? 'bg-cyan-600 text-white shadow-cyan-500/20'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Saved Questions &amp; Revision</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'saved' ? 'bg-cyan-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {savedQuestions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs ${
              activeTab === 'bookmarks'
                ? 'bg-slate-900 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bookmarks &amp; Resources</span>
          </button>

        </div>
      </div>

      {/* =====================================================================
          SUB-HUB 1: MY PERSONAL NOTES
          ===================================================================== */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          
          {/* Controls: Search & Topic Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by keyword or tag..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Topic:
              </span>
              <select
                value={selectedTopicFilter}
                onChange={(e) => setSelectedTopicFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Topics ({notes.length})</option>
                <option value="F01">F01: Variables &amp; Data Types</option>
                <option value="F06">F06: Pointers &amp; Memory</option>
                <option value="F07">F07: Dynamic Memory &amp; Vectors</option>
                <option value="D01-A01">Arrays &amp; Traversal</option>
              </select>
            </div>
          </div>

          {/* Notes Grid */}
          {filteredNotes.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-300 text-center space-y-4">
              <FileText className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-black text-slate-900">No Personal Notes Found</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                You haven't written any notes matching this filter. Click &ldquo;Write New Note&rdquo; above to record your own insights, traps, or formulas.
              </p>
              <button
                onClick={() => setIsCreatingNote(true)}
                className="neon-btn-primary px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Write First Note</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="lightning-border-emerald p-[2px] rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="lightning-inner p-6 rounded-[22px] space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      
                      {/* Note Header & Actions */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {note.topicId}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 font-bold">
                              {note.topicName}
                            </span>
                          </div>
                          <h3 className="text-base font-black text-slate-950 leading-snug">
                            {note.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                        {note.content}
                      </p>

                      {/* Code Snippet */}
                      {note.codeSnippet && (
                        <div className="relative group rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                          <div className="flex items-center justify-between px-3 py-1 bg-slate-950 text-slate-400 text-[10px] font-mono">
                            <span>C++ Snippet</span>
                            <button
                              onClick={() => handleCopyCode(note.id, note.codeSnippet!)}
                              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                            >
                              {copiedId === note.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-3 bg-slate-900 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                            <code>{note.codeSnippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Tags & Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {note.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-bold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onNavigateToNote(note.topicId)}
                        className="text-xs font-black text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group/btn"
                      >
                        <span>Lesson</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* =====================================================================
          SUB-HUB 2: DOUBTTRACE MISTAKE VAULT
          ===================================================================== */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          
          {/* Diagnostic Info Banner */}
          <div className="bg-white p-5 rounded-2xl border-2 border-rose-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-950">
                  DoubtTrace Diagnostic Misconception Tracker
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Every incorrect answer during Practice or Timed Tests is cataloged here with its diagnosed mental-model trap so you can eliminate blind spots.
                </p>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-end md:self-auto">
              <button
                onClick={() => setMistakeFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  mistakeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({mistakes.length})
              </button>
              <button
                onClick={() => setMistakeFilter('unresolved')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  mistakeFilter === 'unresolved'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Under Review ({unresolvedCount})
              </button>
              <button
                onClick={() => setMistakeFilter('resolved')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  mistakeFilter === 'resolved'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mastered ({mistakes.length - unresolvedCount})
              </button>
            </div>
          </div>

          {/* Mistakes List */}
          <div className="space-y-5">
            {filteredMistakes.map((m) => (
              <div
                key={m.id}
                className={`p-[2px] rounded-3xl shadow-sm transition-all ${
                  m.resolved ? 'border-2 border-emerald-300 bg-white' : 'lightning-border-rainbow'
                }`}
              >
                <div className="lightning-inner p-6 rounded-[22px] space-y-4 bg-white">
                  
                  {/* Top Bar: Misconception Tag & Resolution Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-extrabold uppercase bg-rose-50 text-rose-800 border border-rose-200">
                        {m.misconceptionTag}
                      </span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-xs font-mono font-bold text-slate-600">
                        {m.topicName}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleResolveMistake(m.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                        m.resolved
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{m.resolved ? 'Mastered & Resolved' : 'Mark as Resolved'}</span>
                    </button>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Evaluation Question:
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {m.question}
                    </h4>

                    {m.codeSnippet && (
                      <pre className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner">
                        <code>{m.codeSnippet}</code>
                      </pre>
                    )}
                  </div>

                  {/* Side-by-side Answer Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-rose-800 font-bold block">
                          What You Answered:
                        </span>
                        <span className="text-xs font-black text-rose-950 line-through">
                          {m.studentAnswer}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                          Correct Answer:
                        </span>
                        <span className="text-xs font-black text-emerald-950">
                          {m.correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DoubtTrace Diagnosis */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      DoubtTrace Root-Cause Explanation:
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed font-semibold">
                      {m.explanation}
                    </p>
                  </div>

                  {/* Direct Jump to Learning Path */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500 font-bold">
                      Recommended Study: {m.recommendedNoteSection}
                    </span>

                    <button
                      onClick={() => onNavigateToNote(m.recommendedNoteId)}
                      className="neon-btn-primary px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2"
                    >
                      <span>Study Note {m.recommendedNoteId}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =====================================================================
          SUB-HUB 3: SAVED QUESTIONS & REVISION DECK (INTERACTIVE!)
          ===================================================================== */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          
          <div className="bg-white p-5 rounded-2xl border-2 border-cyan-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 flex-shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-950">
                  Interactive Revision Deck
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Select an answer directly below to re-verify your retention with instant diagnostic feedback.
                </p>
              </div>
            </div>

            <button
              onClick={() => onStartEvaluation('F01')}
              className="neon-btn-cyan px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Take Full Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-6">
            {savedQuestions.map((q) => {
              const selectedOpt = quizAnswers[q.id];
              const isChecked = quizChecked[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="lightning-border-cyan p-[2px] rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="lightning-inner p-6 sm:p-7 rounded-[22px] space-y-5 bg-white">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                          {q.topicId}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-600">
                          {q.topicName}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteSavedQuestion(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove from Saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Question */}
                    <div className="space-y-3">
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h4>

                      {q.codeSnippet && (
                        <pre className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      )}
                    </div>

                    {/* Interactive Multiple Choice Options */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === opt;
                        const isThisCorrect = opt === q.correctAnswer;

                        let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                        if (isChosen && !isChecked) {
                          style = 'bg-cyan-50 border-cyan-500 text-cyan-950 font-bold ring-2 ring-cyan-500/20';
                        }
                        if (isChecked) {
                          if (isThisCorrect) {
                            style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                          } else if (isChosen && !isThisCorrect) {
                            style = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isChecked}
                            onClick={() =>
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: opt }))
                            }
                            className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${style}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-mono font-bold text-[11px] flex items-center justify-center text-slate-600">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>

                            {isChecked && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            )}
                            {isChecked && isChosen && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Check Answer / Reset Action */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                      {!isChecked ? (
                        <button
                          disabled={!selectedOpt}
                          onClick={() =>
                            setQuizChecked((prev) => ({ ...prev, [q.id]: true }))
                          }
                          className="px-5 py-2 rounded-xl text-xs font-black bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white shadow-xs transition-colors"
                        >
                          Check Answer
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-black px-2.5 py-1 rounded-md ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
                          </span>
                          <button
                            onClick={() => {
                              setQuizChecked((prev) => ({ ...prev, [q.id]: false }));
                              setQuizAnswers((prev) => {
                                const copy = { ...prev };
                                delete copy[q.id];
                                return copy;
                              });
                            }}
                            className="px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200"
                          >
                            Re-try
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => onNavigateToNote(q.topicId)}
                        className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
                      >
                        <span>Open Theory Note</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Detailed Explanation when checked */}
                    {isChecked && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                          Explanation:
                        </span>
                        <p className="text-xs text-slate-800 font-medium leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* =====================================================================
          SUB-HUB 4: BOOKMARKS & CURATED RESOURCES
          ===================================================================== */}
      {activeTab === 'bookmarks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Col 1: Bookmarked Lessons from Learning Path */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-600" />
                <span>Bookmarked Learning Path Notes</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 font-bold">
                Quick Jump
              </span>
            </div>

            <div className="space-y-4">
              
              <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    F01
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    Est. 45 mins
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-950">
                  Variables and Data Types in Modern C++
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Memory bytes, type overflow, static_cast conversions, and std::numeric_limits.
                </p>
                <button
                  onClick={() => onNavigateToNote('F01')}
                  className="w-full neon-btn-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Read Note F01</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    F06
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    Est. 60 mins
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-950">
                  Pointers &amp; Memory Addresses
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Address-of operator (&amp;), dereference (*), nullptr safety, and pointer arithmetic.
                </p>
                <button
                  onClick={() => onNavigateToNote('F06')}
                  className="w-full neon-btn-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Read Note F06</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">
                    F07
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    Est. 55 mins
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-950">
                  Dynamic Memory &amp; std::vector
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Heap allocation with new/delete, vector capacity geometric doubling, and memory leaks.
                </p>
                <button
                  onClick={() => onNavigateToNote('F07')}
                  className="w-full neon-btn-cyan py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Read Note F07</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Col 2: Curated C++ Reference Links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-cyan-600" />
                <span>Verified External C++ Resources</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 font-bold">
                Standards
              </span>
            </div>

            <div className="space-y-4">
              
              <a
                href="https://en.cppreference.com/w/cpp"
                target="_blank"
                rel="noreferrer"
                className="block bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-400 shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    cppreference.com
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h4 className="text-sm font-black text-slate-950 mt-1">
                  C++ Standard Library &amp; Language Specification
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  The definitive authoritative reference for types, algorithms, containers, and Big-O guarantees.
                </p>
              </a>

              <a
                href="https://www.learncpp.com/"
                target="_blank"
                rel="noreferrer"
                className="block bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-cyan-400 shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-700">
                    learncpp.com
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                </div>
                <h4 className="text-sm font-black text-slate-950 mt-1">
                  In-Depth Modern C++ Tutorials
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Comprehensive, step-by-step programming lessons with modern best practices (C++17/20).
                </p>
              </a>

              <a
                href="https://godbolt.org/"
                target="_blank"
                rel="noreferrer"
                className="block bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-teal-400 shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-700">
                    godbolt.org
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                </div>
                <h4 className="text-sm font-black text-slate-950 mt-1">
                  Compiler Explorer (Interactive Assembly)
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Inspect how modern GCC, Clang, and MSVC compilers translate your C++ code into machine instructions.
                </p>
              </a>

            </div>
          </div>

        </div>
      )}

      {/* =====================================================================
          NOTE CREATION MODAL / DRAWER
          ===================================================================== */}
      {isCreatingNote && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-950">
                    Write Personal Study Note
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Saved directly to your browser's persistent storage.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCreatingNote(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Off-by-one trap in binary search while condition"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-700">
                    Topic / Module *
                  </label>
                  <select
                    value={newTopicId}
                    onChange={(e) => setNewTopicId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="F01">F01: Variables &amp; Data Types</option>
                    <option value="F02">F02: Operators &amp; Expressions</option>
                    <option value="F03">F03: Conditionals &amp; Decisions</option>
                    <option value="F04">F04: Loops &amp; Iteration</option>
                    <option value="F05">F05: Functions &amp; Passing</option>
                    <option value="F06">F06: Pointers &amp; Memory</option>
                    <option value="F07">F07: Dynamic Memory &amp; Vectors</option>
                    <option value="D01-A01">Arrays &amp; Traversal</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-700">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="Gotcha, Pointer, Big-O"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">
                  Note Explanation / Formula *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain the mental model, trap to avoid, or key takeaway..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">
                  Optional C++ Code Snippet
                </label>
                <textarea
                  rows={4}
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder={`// Paste your C++ snippet here\nint low = 0, high = n - 1;\nwhile (low <= high) { ... }`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs text-emerald-950 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingNote(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neon-btn-primary px-6 py-2.5 rounded-xl text-xs font-black"
                >
                  Save Note to My Space
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
