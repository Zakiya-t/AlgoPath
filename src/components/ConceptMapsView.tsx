import React, { useState } from 'react';
import {
  Network,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Terminal,
  Bookmark,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  LayoutDashboard,
  CheckSquare,
  Compass
} from 'lucide-react';
import { ConceptNode, NavigationTab } from '../types';

interface ConceptMapsViewProps {
  onNavigateToNote: (noteId: string) => void;
  onStartEvaluation: (topicId: string) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

const CONCEPT_NODES: ConceptNode[] = [
  // ==========================================
  // TIER 1: PROGRAMMING FOUNDATIONS
  // ==========================================
  {
    id: 'F01',
    title: 'Variables & Data Types',
    category: 'foundations',
    categoryLabel: 'Tier 1: Foundations',
    tier: 1,
    status: 'mastered',
    masteryPercentage: 95,
    description: 'Memory bytes, type overflow, static_cast conversion, and C++ primitive ranges.',
    prerequisites: [],
    unlocks: ['F02', 'F06'],
    learningNoteId: 'F01',
    evaluationTopicId: 'F01',
    codingProblemId: 'P01',
    x: 100,
    y: 80
  },
  {
    id: 'F02',
    title: 'Operators & Expressions',
    category: 'foundations',
    categoryLabel: 'Tier 1: Foundations',
    tier: 1,
    status: 'mastered',
    masteryPercentage: 92,
    description: 'Arithmetic precedence, modulo arithmetic, compound assignments, and bitwise logic.',
    prerequisites: ['F01'],
    unlocks: ['F03'],
    learningNoteId: 'F02',
    evaluationTopicId: 'F01',
    codingProblemId: 'P02',
    x: 100,
    y: 200
  },
  {
    id: 'F03',
    title: 'Conditionals & Branching',
    category: 'foundations',
    categoryLabel: 'Tier 1: Foundations',
    tier: 1,
    status: 'mastered',
    masteryPercentage: 90,
    description: 'If-else statements, switch jump tables, ternary operator, and short-circuit evaluation.',
    prerequisites: ['F02'],
    unlocks: ['F04'],
    learningNoteId: 'F03',
    evaluationTopicId: 'F01',
    codingProblemId: 'P03',
    x: 100,
    y: 320
  },
  {
    id: 'F04',
    title: 'Loops & Iteration Control',
    category: 'foundations',
    categoryLabel: 'Tier 1: Foundations',
    tier: 1,
    status: 'mastered',
    masteryPercentage: 86,
    description: 'For, while, do-while loops, break/continue flow, and nested loop time complexity.',
    prerequisites: ['F03'],
    unlocks: ['F05', 'D01-A01'],
    learningNoteId: 'F04',
    evaluationTopicId: 'F01',
    codingProblemId: 'P04',
    x: 100,
    y: 440
  },
  {
    id: 'F05',
    title: 'Functions & Parameter Passing',
    category: 'foundations',
    categoryLabel: 'Tier 1: Foundations',
    tier: 1,
    status: 'in_progress',
    masteryPercentage: 74,
    description: 'Pass-by-value, pass-by-reference (&), const references, return values, and call stacks.',
    prerequisites: ['F04'],
    unlocks: ['F06', 'A03-REC'],
    learningNoteId: 'F05',
    evaluationTopicId: 'F01',
    codingProblemId: 'P05',
    x: 100,
    y: 560
  },

  // ==========================================
  // TIER 2: MEMORY & HARDWARE ARCHITECTURE
  // ==========================================
  {
    id: 'F06',
    title: 'Pointers & Memory Addresses',
    category: 'memory',
    categoryLabel: 'Tier 2: Memory & Hardware',
    tier: 2,
    status: 'weak',
    masteryPercentage: 45,
    description: 'Address-of operator (&), dereferencing (*), nullptr safety, and pointer arithmetic.',
    prerequisites: ['F01', 'F05'],
    unlocks: ['F07', 'D02-L01'],
    learningNoteId: 'F06',
    evaluationTopicId: 'F01',
    codingProblemId: 'P06',
    misconceptionAlert:
      'DoubtTrace Alert: Diagnosed with "Wild Pointer Dereference". Test submission attempted to write into an uninitialized pointer (*p = 50). Must initialize to nullptr.',
    x: 360,
    y: 140
  },
  {
    id: 'F07',
    title: 'Dynamic Memory & std::vector',
    category: 'memory',
    categoryLabel: 'Tier 2: Memory & Hardware',
    tier: 2,
    status: 'in_progress',
    masteryPercentage: 62,
    description: 'Heap allocation with new/delete, vector capacity geometric doubling, and memory leaks.',
    prerequisites: ['F06'],
    unlocks: ['D01-A02', 'D02-L01'],
    learningNoteId: 'F07',
    evaluationTopicId: 'F01',
    codingProblemId: 'P07',
    x: 360,
    y: 340
  },

  // ==========================================
  // TIER 3: LINEAR DATA STRUCTURES
  // ==========================================
  {
    id: 'D01-A01',
    title: 'Static Arrays & Traversal',
    category: 'linear_ds',
    categoryLabel: 'Tier 3: Linear Data Structures',
    tier: 3,
    status: 'mastered',
    masteryPercentage: 88,
    description: 'Contiguous memory layout, zero-based indexing, bounds checking, and element shifting.',
    prerequisites: ['F01', 'F04'],
    unlocks: ['D01-A02', 'A01-BS', 'A02-TP', 'D03-S01'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    codingProblemId: 'P08',
    x: 620,
    y: 80
  },
  {
    id: 'D01-A02',
    title: 'Dynamic Vectors & Invalidation',
    category: 'linear_ds',
    categoryLabel: 'Tier 3: Linear Data Structures',
    tier: 3,
    status: 'in_progress',
    masteryPercentage: 58,
    description: 'Amortized O(1) push_back, size vs capacity, v.reserve(N), and pointer invalidation.',
    prerequisites: ['D01-A01', 'F07'],
    unlocks: ['D03-S01', 'D04-Q01', 'D07-HP'],
    learningNoteId: 'F07',
    evaluationTopicId: 'F01',
    codingProblemId: 'P09',
    x: 620,
    y: 220
  },
  {
    id: 'D02-L01',
    title: 'Singly Linked Lists',
    category: 'linear_ds',
    categoryLabel: 'Tier 3: Linear Data Structures',
    tier: 3,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Dynamic node structures, pointer linking, head/tail tracking, and O(1) head insertion.',
    prerequisites: ['F06', 'F07'],
    unlocks: ['D04-Q01', 'D05-BT'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 620,
    y: 380
  },
  {
    id: 'D03-S01',
    title: 'Stacks (LIFO Architecture)',
    category: 'linear_ds',
    categoryLabel: 'Tier 3: Linear Data Structures',
    tier: 3,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Last-In-First-Out mechanics, push/pop operations, bracket matching, and call stack parsing.',
    prerequisites: ['D01-A01'],
    unlocks: ['A03-REC'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 620,
    y: 520
  },
  {
    id: 'D04-Q01',
    title: 'Queues & Circular Buffers',
    category: 'linear_ds',
    categoryLabel: 'Tier 3: Linear Data Structures',
    tier: 3,
    status: 'locked',
    masteryPercentage: 0,
    description: 'First-In-First-Out buffers, front/rear indices, circular arrays, and task scheduling.',
    prerequisites: ['D01-A02', 'D02-L01'],
    unlocks: ['D09-GR'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 620,
    y: 640
  },

  // ==========================================
  // TIER 4: ALGORITHMIC PARADIGMS
  // ==========================================
  {
    id: 'A01-BS',
    title: 'Binary Search (O(log N))',
    category: 'algorithms',
    categoryLabel: 'Tier 4: Algorithmic Paradigms',
    tier: 4,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Divide and conquer search space halving, mid calculation overflow prevention, and search bounds.',
    prerequisites: ['D01-A01'],
    unlocks: ['D06-BST'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 880,
    y: 80
  },
  {
    id: 'A02-TP',
    title: 'Two Pointers & Sliding Window',
    category: 'algorithms',
    categoryLabel: 'Tier 4: Algorithmic Paradigms',
    tier: 4,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Opposite-end converging pointers, fast/slow runners, and dynamic contiguous subarray windows.',
    prerequisites: ['D01-A01'],
    unlocks: ['D08-HT'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 880,
    y: 220
  },
  {
    id: 'A03-REC',
    title: 'Recursion & Call Stacks',
    category: 'algorithms',
    categoryLabel: 'Tier 4: Algorithmic Paradigms',
    tier: 4,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Base case termination, recursive leap of faith, call stack frames, and recursion trees.',
    prerequisites: ['F05', 'D03-S01'],
    unlocks: ['D05-BT', 'D09-GR'],
    learningNoteId: 'F05',
    evaluationTopicId: 'F01',
    x: 880,
    y: 440
  },

  // ==========================================
  // TIER 5: HIERARCHICAL & TREES
  // ==========================================
  {
    id: 'D05-BT',
    title: 'Binary Trees & Traversals',
    category: 'hierarchical',
    categoryLabel: 'Tier 5: Hierarchical Structures',
    tier: 5,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Root, branch, leaf nodes, Pre-order, In-order, Post-order, and Level-order (BFS) visits.',
    prerequisites: ['D02-L01', 'A03-REC'],
    unlocks: ['D06-BST', 'D07-HP'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 1140,
    y: 160
  },
  {
    id: 'D06-BST',
    title: 'Binary Search Trees (BST)',
    category: 'hierarchical',
    categoryLabel: 'Tier 5: Hierarchical Structures',
    tier: 5,
    status: 'locked',
    masteryPercentage: 0,
    description: 'BST invariant (left < root < right), In-order sorted property, search/insert/delete in O(h).',
    prerequisites: ['D05-BT', 'A01-BS'],
    unlocks: [],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 1140,
    y: 300
  },
  {
    id: 'D07-HP',
    title: 'Heaps & Priority Queues',
    category: 'hierarchical',
    categoryLabel: 'Tier 5: Hierarchical Structures',
    tier: 5,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Complete binary tree array representation, heapify up/down, and std::priority_queue.',
    prerequisites: ['D01-A02', 'D05-BT'],
    unlocks: ['D09-GR'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 1140,
    y: 440
  },
  {
    id: 'D08-HT',
    title: 'Hash Tables & std::unordered_map',
    category: 'hierarchical',
    categoryLabel: 'Tier 5: Hierarchical Structures',
    tier: 5,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Hash functions, bucket array, collision resolution via separate chaining, and O(1) lookups.',
    prerequisites: ['D01-A01', 'A02-TP'],
    unlocks: ['D09-GR'],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 1140,
    y: 580
  },

  // ==========================================
  // TIER 6: GRAPH ALGORITHMS
  // ==========================================
  {
    id: 'D09-GR',
    title: 'Graph Traversal (BFS & DFS)',
    category: 'graphs',
    categoryLabel: 'Tier 6: Graph Algorithms',
    tier: 6,
    status: 'locked',
    masteryPercentage: 0,
    description: 'Adjacency list representation, visited sets, queue-based BFS, and recursive DFS on graphs.',
    prerequisites: ['D04-Q01', 'A03-REC', 'D08-HT'],
    unlocks: [],
    learningNoteId: 'D01-A01',
    evaluationTopicId: 'F01',
    x: 1400,
    y: 360
  }
];

export const ConceptMapsView: React.FC<ConceptMapsViewProps> = ({
  onNavigateToNote,
  onStartEvaluation,
  onNavigateTab
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'graph' | 'tree' | 'ecosystem'>('graph');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('F06');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedNode = CONCEPT_NODES.find((n) => n.id === selectedNodeId) || CONCEPT_NODES[0];

  // Filtering
  const filteredNodes = CONCEPT_NODES.filter((node) => {
    const matchesCategory = categoryFilter === 'all' || node.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
    const matchesSearch =
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Calculate high-level stats
  const masteredCount = CONCEPT_NODES.filter((n) => n.status === 'mastered').length;
  const inProgressCount = CONCEPT_NODES.filter((n) => n.status === 'in_progress').length;
  const weakCount = CONCEPT_NODES.filter((n) => n.status === 'weak').length;
  const lockedCount = CONCEPT_NODES.filter((n) => n.status === 'locked').length;

  // Build edges
  const edges: { from: ConceptNode; to: ConceptNode }[] = [];
  CONCEPT_NODES.forEach((node) => {
    node.unlocks.forEach((unlockedId) => {
      const target = CONCEPT_NODES.find((n) => n.id === unlockedId);
      if (target) {
        edges.push({ from: node, to: target });
      }
    });
  });

  return (
    <div className="flex-1 py-8 px-6 sm:px-10 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header & Quick Architecture Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/90">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Concept Maps
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-mono text-slate-600 font-bold">
              Visual Knowledge Graph &amp; Dependency Brain
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Curriculum Dependency Tree &amp; Prerequisite Graph
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
            Understand how DSA concepts connect together. Discover missing prerequisites when you struggle, see what each concept unlocks, and teleport directly across all platform environments.
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-xs flex-shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveViewMode('graph')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeViewMode === 'graph'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Interactive Graph</span>
          </button>

          <button
            onClick={() => setActiveViewMode('tree')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeViewMode === 'tree'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tier Roadmap</span>
          </button>

          <button
            onClick={() => setActiveViewMode('ecosystem')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeViewMode === 'ecosystem'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>6-Page Ecosystem</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Pills with Electric Lightning Borders */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="lightning-border-emerald p-[2px] rounded-2xl shadow-sm">
          <div className="lightning-inner p-4 rounded-[14px] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                Mastered Nodes
              </span>
              <span className="text-2xl font-black text-slate-950 mt-0.5 block">
                {masteredCount} Concepts
              </span>
              <span className="text-[10px] text-emerald-700 font-bold mt-0.5 block">
                &ge; 80% Retention
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="lightning-border-cyan p-[2px] rounded-2xl shadow-sm">
          <div className="lightning-inner p-4 rounded-[14px] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                In Progress
              </span>
              <span className="text-2xl font-black text-slate-950 mt-0.5 block">
                {inProgressCount} Concepts
              </span>
              <span className="text-[10px] text-cyan-700 font-bold mt-0.5 block">
                Active Learning
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <RotateCcw className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="lightning-border-rainbow p-[2px] rounded-2xl shadow-sm">
          <div className="lightning-inner p-4 rounded-[14px] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                DoubtTrace Alerts
              </span>
              <span className="text-2xl font-black text-rose-600 mt-0.5 block">
                {weakCount} Weak Spot
              </span>
              <span className="text-[10px] text-rose-600 font-bold mt-0.5 block">
                Misconception Found
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="border-2 border-slate-200 bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
              Locked / Ahead
            </span>
            <span className="text-2xl font-black text-slate-900 mt-0.5 block">
              {lockedCount} Nodes
            </span>
            <span className="text-[10px] text-slate-500 font-bold mt-0.5 block">
              Prerequisites Needed
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
            <Lock className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* =====================================================================
          VIEW MODE 1: INTERACTIVE SVG KNOWLEDGE GRAPH
          ===================================================================== */}
      {activeViewMode === 'graph' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Category Filter, Status Filter & Zoom */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find concept node..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Tiers ({CONCEPT_NODES.length})</option>
                <option value="foundations">Tier 1: Foundations</option>
                <option value="memory">Tier 2: Memory &amp; Pointers</option>
                <option value="linear_ds">Tier 3: Linear Data Structures</option>
                <option value="algorithms">Tier 4: Algorithmic Paradigms</option>
                <option value="hierarchical">Tier 5: Trees &amp; Heaps</option>
                <option value="graphs">Tier 6: Graph Algorithms</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Statuses</option>
                <option value="weak">⚠️ Weak / Alert ({weakCount})</option>
                <option value="mastered">🟢 Mastered ({masteredCount})</option>
                <option value="in_progress">🟡 In Progress ({inProgressCount})</option>
                <option value="locked">⚪ Locked ({lockedCount})</option>
              </select>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono font-bold text-slate-700 px-2">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors"
                title="Reset Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Graph Stage & Detail Inspector Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive SVG Canvas (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-6 overflow-hidden relative min-h-[700px]">
              
              {/* Canvas Legend */}
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm border border-slate-200 p-3 rounded-2xl shadow-xs space-y-1.5 text-[11px] font-mono">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Node Status Legend
                </span>
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Mastered (&ge;80%)</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-800 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span>DoubtTrace Alert</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span>Locked</span>
                </div>
              </div>

              {/* Scrollable Container with Zoom */}
              <div className="overflow-x-auto overflow-y-auto max-h-[660px] cursor-grab active:cursor-grabbing pb-8 pr-8">
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left',
                    width: '1600px',
                    height: '800px',
                    position: 'relative'
                  }}
                >
                  
                  {/* SVG Connecting Edges */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                      <linearGradient id="edgeMastered" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="edgeWeak" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#E11D48" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="edgeActive" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0891B2" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {edges.map((edge, idx) => {
                      const x1 = edge.from.x + 90;
                      const y1 = edge.from.y + 35;
                      const x2 = edge.to.x + 10;
                      const y2 = edge.to.y + 35;
                      const cx1 = x1 + (x2 - x1) * 0.5;
                      const cx2 = x1 + (x2 - x1) * 0.5;

                      const isSelectedConnected =
                        selectedNodeId === edge.from.id || selectedNodeId === edge.to.id;

                      let strokeColor = '#CBD5E1';
                      let strokeWidth = 2;
                      let strokeDash = 'none';

                      if (edge.from.status === 'mastered' && edge.to.status === 'mastered') {
                        strokeColor = 'url(#edgeMastered)';
                        strokeWidth = isSelectedConnected ? 3.5 : 2.5;
                      } else if (edge.to.status === 'weak' || edge.from.status === 'weak') {
                        strokeColor = 'url(#edgeWeak)';
                        strokeWidth = isSelectedConnected ? 4 : 2.5;
                      } else if (edge.to.status === 'in_progress') {
                        strokeColor = 'url(#edgeActive)';
                        strokeWidth = isSelectedConnected ? 3.5 : 2;
                      } else if (edge.to.status === 'locked') {
                        strokeColor = '#CBD5E1';
                        strokeDash = '4 4';
                      }

                      return (
                        <path
                          key={idx}
                          d={`M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDash}
                          opacity={isSelectedConnected ? 1 : 0.65}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                  </svg>

                  {/* Render Graph Nodes */}
                  {filteredNodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isPrereqOfSelected = selectedNode.prerequisites.includes(node.id);
                    const isUnlockedBySelected = selectedNode.unlocks.includes(node.id);

                    let borderClass = 'border-slate-300 bg-white hover:border-slate-400';
                    let badgeClass = 'bg-slate-100 text-slate-700';

                    if (node.status === 'mastered') {
                      borderClass = 'lightning-border-emerald shadow-sm';
                      badgeClass = 'bg-emerald-50 text-emerald-800 border border-emerald-300';
                    } else if (node.status === 'weak') {
                      borderClass = 'lightning-border-rainbow shadow-md ring-2 ring-rose-500/30';
                      badgeClass = 'bg-rose-50 text-rose-800 border border-rose-300';
                    } else if (node.status === 'in_progress') {
                      borderClass = 'lightning-border-cyan shadow-sm';
                      badgeClass = 'bg-cyan-50 text-cyan-800 border border-cyan-300';
                    } else if (node.status === 'locked') {
                      borderClass = 'border-dashed border-slate-300 bg-slate-50 opacity-70';
                      badgeClass = 'bg-slate-100 text-slate-400';
                    }

                    if (isSelected) {
                      borderClass += ' ring-4 ring-emerald-500/30 scale-105 z-30';
                    } else if (isPrereqOfSelected) {
                      borderClass += ' ring-2 ring-emerald-400/50 z-20';
                    } else if (isUnlockedBySelected) {
                      borderClass += ' ring-2 ring-cyan-400/50 z-20';
                    }

                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                          position: 'absolute',
                          width: '180px'
                        }}
                        className={`rounded-2xl transition-all duration-200 cursor-pointer select-none p-[2px] ${borderClass}`}
                      >
                        <div className="bg-white p-3.5 rounded-[14px] space-y-2">
                          
                          {/* Top Row: ID & Status Icon */}
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${badgeClass}`}>
                              {node.id}
                            </span>

                            {node.status === 'mastered' && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            )}
                            {node.status === 'weak' && (
                              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 animate-bounce" />
                            )}
                            {node.status === 'in_progress' && (
                              <RotateCcw className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 animate-spin" />
                            )}
                            {node.status === 'locked' && (
                              <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            )}
                          </div>

                          {/* Node Title */}
                          <h4 className="text-xs font-black text-slate-950 leading-tight">
                            {node.title}
                          </h4>

                          {/* Mastery Bar */}
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                              <span className="text-slate-500">Mastery</span>
                              <span
                                className={
                                  node.status === 'mastered'
                                    ? 'text-emerald-700'
                                    : node.status === 'weak'
                                    ? 'text-rose-600'
                                    : 'text-slate-700'
                                }
                              >
                                {node.masteryPercentage}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                style={{ width: `${node.masteryPercentage}%` }}
                                className={`h-full rounded-full ${
                                  node.status === 'mastered'
                                    ? 'bg-emerald-500'
                                    : node.status === 'weak'
                                    ? 'bg-rose-500'
                                    : 'bg-cyan-500'
                                }`}
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>

            </div>

            {/* Concept Detail Inspector Drawer (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-6 space-y-6 sticky top-24">
              
              {/* Drawer Header */}
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {selectedNode.categoryLabel}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase ${
                      selectedNode.status === 'mastered'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : selectedNode.status === 'weak'
                        ? 'bg-rose-50 text-rose-800 border border-rose-300'
                        : selectedNode.status === 'in_progress'
                        ? 'bg-cyan-50 text-cyan-800 border border-cyan-300'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {selectedNode.status === 'weak'
                      ? '⚠️ DoubtTrace Alert'
                      : selectedNode.status}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 leading-snug">
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* DoubtTrace Diagnostic Alert Box (if weak) */}
              {selectedNode.misconceptionAlert && (
                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-black text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>DoubtTrace Diagnostic Finding</span>
                  </div>
                  <p className="text-xs text-rose-950 font-bold leading-relaxed">
                    {selectedNode.misconceptionAlert}
                  </p>
                </div>
              )}

              {/* Mastery Gauge */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600">Calculated Concept Mastery</span>
                  <span className="text-slate-950 font-black text-sm">
                    {selectedNode.masteryPercentage}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    style={{ width: `${selectedNode.masteryPercentage}%` }}
                    className={`h-full rounded-full ${
                      selectedNode.status === 'mastered'
                        ? 'bg-emerald-500'
                        : selectedNode.status === 'weak'
                        ? 'bg-rose-500'
                        : 'bg-cyan-500'
                    }`}
                  />
                </div>
              </div>

              {/* Prerequisites Needed */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  Prerequisites Required:
                </span>
                {selectedNode.prerequisites.length === 0 ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                    ✓ Root Node (No prerequisites needed)
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.prerequisites.map((pId) => {
                      const pNode = CONCEPT_NODES.find((n) => n.id === pId);
                      return (
                        <button
                          key={pId}
                          onClick={() => setSelectedNodeId(pId)}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-300 flex items-center gap-1.5 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          <span>{pNode ? pNode.title : pId}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* What This Unlocks */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  What Mastering This Unlocks:
                </span>
                {selectedNode.unlocks.length === 0 ? (
                  <span className="text-xs text-slate-500 font-medium">
                    Terminal advanced topic
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.unlocks.map((uId) => {
                      const uNode = CONCEPT_NODES.find((n) => n.id === uId);
                      return (
                        <button
                          key={uId}
                          onClick={() => setSelectedNodeId(uId)}
                          className="px-2.5 py-1 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-xs font-bold text-cyan-900 border border-cyan-200 flex items-center gap-1.5 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
                          <span>{uNode ? uNode.title : uId}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* DIRECT 6-PAGE UNIFIED TELEPORT ACTIONS */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Unified 6-Page Navigation:
                </span>

                {/* 1. Read Theory in Learning Path */}
                {selectedNode.learningNoteId && (
                  <button
                    onClick={() => onNavigateToNote(selectedNode.learningNoteId!)}
                    className="w-full neon-btn-primary py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Theory Note {selectedNode.learningNoteId}</span>
                  </button>
                )}

                {/* 2. Take Test in Evaluation */}
                <button
                  onClick={() =>
                    onStartEvaluation(selectedNode.evaluationTopicId || 'F01')
                  }
                  className="w-full px-4 py-2 rounded-xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  <span>Test Understanding in Evaluation</span>
                </button>

                {/* 3. Open in Coding Lab */}
                <button
                  onClick={() => onNavigateTab('coding-lab')}
                  className="w-full neon-btn-cyan py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Implement in C++ Coding Lab</span>
                </button>

                {/* 4. Inspect in My Space */}
                <button
                  onClick={() => onNavigateTab('my-space')}
                  className="w-full px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <Bookmark className="w-4 h-4 text-slate-500" />
                  <span>Check Notes in My Space</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================================
          VIEW MODE 2: CURRICULUM TIER ROADMAP
          ===================================================================== */}
      {activeViewMode === 'tree' && (
        <div className="space-y-8">
          
          {[1, 2, 3, 4, 5, 6].map((tierNum) => {
            const tierNodes = CONCEPT_NODES.filter((n) => n.tier === tierNum);
            const tierNames = [
              'Tier 1: Programming Foundations',
              'Tier 2: Memory & Hardware Architecture',
              'Tier 3: Linear Data Structures',
              'Tier 4: Algorithmic Paradigms',
              'Tier 5: Hierarchical & Non-Linear Structures',
              'Tier 6: Advanced Graph Algorithms'
            ];

            return (
              <div
                key={tierNum}
                className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                      Curriculum Level 0{tierNum}
                    </span>
                    <h3 className="text-xl font-black text-slate-950 mt-0.5">
                      {tierNames[tierNum - 1]}
                    </h3>
                  </div>

                  <span className="text-xs font-mono text-slate-500 font-bold">
                    {tierNodes.length} Concepts in this tier
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tierNodes.map((node) => (
                    <div
                      key={node.id}
                      onClick={() => {
                        setSelectedNodeId(node.id);
                        setActiveViewMode('graph');
                      }}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${
                        node.status === 'mastered'
                          ? 'border-emerald-300 bg-emerald-50/20'
                          : node.status === 'weak'
                          ? 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-400/20'
                          : node.status === 'in_progress'
                          ? 'border-cyan-300 bg-cyan-50/20'
                          : 'border-slate-200 bg-slate-50/60 opacity-75'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white border border-slate-200 text-slate-800">
                          {node.id}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded ${
                            node.status === 'mastered'
                              ? 'text-emerald-800 bg-emerald-100'
                              : node.status === 'weak'
                              ? 'text-rose-800 bg-rose-100'
                              : node.status === 'in_progress'
                              ? 'text-cyan-800 bg-cyan-100'
                              : 'text-slate-500 bg-slate-200'
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-slate-950 mb-1.5">
                        {node.title}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4 line-clamp-2">
                        {node.description}
                      </p>

                      <div className="flex items-center justify-between text-xs font-mono font-bold pt-3 border-t border-slate-200/60">
                        <span className="text-slate-500">Mastery: {node.masteryPercentage}%</span>
                        <span className="text-emerald-700 flex items-center gap-1">
                          <span>Inspect Node</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      )}

      {/* =====================================================================
          VIEW MODE 3: THE 6-PAGE UNIFIED LEARNER ECOSYSTEM
          (Explains how the student moves across all 6 pages)
          ===================================================================== */}
      {activeViewMode === 'ecosystem' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top Banner */}
          <div className="lightning-border-cyan p-[2px] rounded-3xl shadow-sm">
            <div className="lightning-inner p-8 rounded-[22px] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950">
                    How AlgoPath Seamlessly Connects All 6 Environments
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Every page has a dedicated mission, yet all 6 are powered by the shared <strong>DoubtTrace Diagnostic Intelligence Engine</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Step-by-Step Cycle */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Step 1: My Dashboard */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                    Page 1 &bull; Growth Command
                  </span>
                  <h4 className="text-base font-black text-slate-950 mt-0.5">
                    My Dashboard
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Answers: <em>Where am I now?</em> Tracks theoretical mastery separate from practical C++ proficiency, flags active weak spots, and recommends the next best action.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('dashboard')}
                className="w-full neon-btn-primary py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 mt-4"
              >
                <span>Go to My Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 2: Concept Maps */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700">
                    Page 2 &bull; Brain &amp; Dependencies
                  </span>
                  <h4 className="text-base font-black text-slate-950 mt-0.5">
                    Concept Maps
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Answers: <em>Why am I stuck and what unlocks next?</em> Reveals missing foundational prerequisites and downstream algorithm unlocks in an interactive graph.
                </p>
              </div>

              <button
                onClick={() => setActiveViewMode('graph')}
                className="w-full neon-btn-cyan py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 mt-4"
              >
                <span>Explore Interactive Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 3: Learning Path */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700">
                    Page 3 &bull; Conceptual Classroom
                  </span>
                  <h4 className="text-base font-black text-slate-950 mt-0.5">
                    Learning Path
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Answers: <em>How does this algorithm work conceptually?</em> Structured 13-section C++ notes, RAM architecture diagrams, and illustrative code snippets without IDE noise.
                </p>
              </div>

              <button
                onClick={() => onNavigateToNote('F01')}
                className="w-full neon-btn-primary py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 mt-4"
              >
                <span>Open Learning Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 4: Evaluation */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700">
                    Page 4 &bull; Diagnostic Testing
                  </span>
                  <h4 className="text-base font-black text-slate-950 mt-0.5">
                    Evaluation Centre
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Answers: <em>Did I really understand it or did I just memorize?</em> Practice Mode with unlimited hints vs Timed Diagnostic Tests. Misconceptions are fed directly into DoubtTrace.
                </p>
              </div>

              <button
                onClick={() => onStartEvaluation('F01')}
                className="w-full px-4 py-2 rounded-xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 mt-4 transition-colors"
              >
                <span>Take Diagnostic Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 5: My Space */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700">
                    Page 5 &bull; Personal Desk &amp; Vault
                  </span>
                  <h4 className="text-base font-black text-slate-950 mt-0.5">
                    My Space
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Answers: <em>What are my personal traps and notes?</em> Captures your handwritten notes, automatically archives mistakes in the Mistake Vault, and provides an interactive re-attempt quiz.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('my-space')}
                className="w-full neon-btn-primary py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 mt-4"
              >
                <span>Open My Space</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 6: Coding Lab */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700">
                    Page 6 &bull; Practical C++ IDE
                  </span>
                  <h4 className="text-base font-black text-slate-950 mt-0.5">
                    Coding Lab
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Answers: <em>Can I write clean, working C++ that compiles and runs?</em> Hands-on programming workspace with real-time memory visualizers, pointer inspectors, and test runners.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('coding-lab')}
                className="w-full neon-btn-cyan py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 mt-4"
              >
                <span>Launch Coding Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
