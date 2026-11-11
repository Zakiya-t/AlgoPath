import { StudentDashboardData, ModuleMetric } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const DASHBOARD_STORAGE_KEY = 'algopath_learner_dashboard_data';

// Standard 5 Linear DSA Modules Structure
export const DEFAULT_MODULE_METRICS: ModuleMetric[] = [
  {
    id: 'foundations',
    name: 'Programming Foundations',
    theoryProgress: 100,
    codingProgress: 85,
    totalLessons: 6,
    completedLessons: 6,
    totalCodingProblems: 8,
    solvedCodingProblems: 7,
    status: 'completed'
  },
  {
    id: 'arrays',
    name: 'Static & Dynamic Arrays',
    theoryProgress: 80,
    codingProgress: 45, // Example from user: Student understands arrays theoretically (80%), but struggles with C++ implementation (45%)
    totalLessons: 8,
    completedLessons: 6,
    totalCodingProblems: 12,
    solvedCodingProblems: 5,
    status: 'in_progress'
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists (Singly & Doubly)',
    theoryProgress: 20,
    codingProgress: 0,
    totalLessons: 8,
    completedLessons: 1,
    totalCodingProblems: 10,
    solvedCodingProblems: 0,
    status: 'in_progress'
  },
  {
    id: 'stacks',
    name: 'Stacks (LIFO Architecture)',
    theoryProgress: 0,
    codingProgress: 0,
    totalLessons: 6,
    completedLessons: 0,
    totalCodingProblems: 8,
    solvedCodingProblems: 0,
    status: 'not_started'
  },
  {
    id: 'queues',
    name: 'Queues & Circular Buffers',
    theoryProgress: 0,
    codingProgress: 0,
    totalLessons: 6,
    completedLessons: 0,
    totalCodingProblems: 8,
    solvedCodingProblems: 0,
    status: 'not_started'
  }
];

export const calculateAggregateMastery = (modules: ModuleMetric[]) => {
  const totalLessons = modules.reduce((acc, m) => acc + m.totalLessons, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.completedLessons, 0);
  const theoryScore = Math.round((completedLessons / totalLessons) * 100);

  const totalProblems = modules.reduce((acc, m) => acc + m.totalCodingProblems, 0);
  const solvedProblems = modules.reduce((acc, m) => acc + m.solvedCodingProblems, 0);
  const codingScore = Math.round((solvedProblems / totalProblems) * 100);

  // Composite weighted score (45% Theory, 55% Practical Implementation)
  const overall = Math.round((theoryScore * 0.45) + (codingScore * 0.55));

  return { theoryScore, codingScore, overall };
};

export const createInitialStudentData = (studentId: string, email: string, name: string): StudentDashboardData => {
  const { theoryScore, codingScore, overall } = calculateAggregateMastery(DEFAULT_MODULE_METRICS);

  return {
    studentId,
    email,
    name: name || email.split('@')[0],
    levelBadge: 'Tier 1: Linear Foundations',
    streakDays: 4,
    overallMasteryScore: overall,
    theoryMasteryScore: theoryScore,
    codingProficiencyScore: codingScore,
    moduleMetrics: DEFAULT_MODULE_METRICS,
    strongConcepts: [
      {
        concept: 'Call-Stack Frame Lifetime',
        category: 'theory',
        status: 'mastered',
        masteryPercentage: 96,
        diagnosticEvidence: 'Passed 8/8 conceptual quiz checks with 0 hints requested'
      },
      {
        concept: 'Contiguous Memory Addressing & Cache Hits',
        category: 'theory',
        status: 'mastered',
        masteryPercentage: 92,
        diagnosticEvidence: 'Demonstrated clear mental model of L1/L2 spatial locality'
      },
      {
        concept: 'In-Place Array Value Swapping',
        category: 'coding',
        status: 'mastered',
        masteryPercentage: 88,
        diagnosticEvidence: 'Implemented two-pointer reverse with 100% test case coverage'
      }
    ],
    weakConcepts: [
      {
        concept: 'Vector Reallocation Pointer Invalidation',
        category: 'coding',
        status: 'weak',
        masteryPercentage: 42,
        diagnosticEvidence: 'Observed dangling pointer segfault when pushing into capacity-constrained vector'
      },
      {
        concept: 'Off-By-One Boundary in Element Shifting',
        category: 'coding',
        status: 'weak',
        masteryPercentage: 48,
        diagnosticEvidence: 'Failed edge cases on array insertion at index 0 and index N'
      },
      {
        concept: 'Asymptotic Amortized vs Worst-Case Insertion',
        category: 'theory',
        status: 'weak',
        masteryPercentage: 55,
        diagnosticEvidence: 'Confused O(1) amortized push_back with worst-case O(N) reallocation'
      }
    ],
    recentAssessments: [
      {
        id: 'eval_01',
        title: 'Array Indexing & Memory Bounds',
        mode: 'practice',
        score: 9,
        totalQuestions: 10,
        date: '2026-11-10',
        topic: 'Arrays'
      },
      {
        id: 'eval_02',
        title: 'C++ Pointer Dereferencing Diagnostic',
        mode: 'test',
        score: 4,
        totalQuestions: 5,
        date: '2026-11-08',
        topic: 'Foundations'
      },
      {
        id: 'eval_03',
        title: 'Time & Space Complexity Instincts',
        mode: 'practice',
        score: 8,
        totalQuestions: 8,
        date: '2026-11-06',
        topic: 'Foundations'
      }
    ],
    codingStats: {
      totalSolved: 12,
      totalAvailable: 46,
      easyCount: 8,
      mediumCount: 4,
      hardCount: 0,
      acceptanceRate: 78.4,
      compilationPassRate: 85.2
    },
    weeklyActivity: [
      { dayName: 'Mon', date: '11/05', hoursSpent: 1.5, submissionsCount: 4, hasActivity: true },
      { dayName: 'Tue', date: '11/06', hoursSpent: 2.0, submissionsCount: 6, hasActivity: true },
      { dayName: 'Wed', date: '11/07', hoursSpent: 0.5, submissionsCount: 2, hasActivity: true },
      { dayName: 'Thu', date: '11/08', hoursSpent: 2.2, submissionsCount: 7, hasActivity: true },
      { dayName: 'Fri', date: '11/09', hoursSpent: 0.0, submissionsCount: 0, hasActivity: false },
      { dayName: 'Sat', date: '11/10', hoursSpent: 1.8, submissionsCount: 5, hasActivity: true },
      { dayName: 'Sun', date: '11/11', hoursSpent: 1.2, submissionsCount: 3, hasActivity: true }
    ],
    recommendation: {
      topic: 'Dynamic Vector Resizing & Invalidation',
      module: 'Module 02: Arrays',
      dimension: 'coding',
      whyRecommended: 'You have high theoretical understanding of arrays (80%), but your C++ coding implementation score is 45%.',
      weaknessAddressed: 'Fixes iterator/pointer invalidation when std::vector grows beyond its capacity.',
      concreteEvidence: 'Your last 2 submissions in Coding Lab failed with segmentation faults during dynamic push_back operations.',
      estimatedMinutes: 25
    },
    revisionItems: [
      {
        id: 'rev_1',
        concept: 'Contiguous Cache Lines & Spatial Locality',
        module: 'Arrays',
        dueInDays: 2,
        targetDimension: 'theory',
        previousMistakePattern: 'Confused L1 cache block boundaries with RAM bus width.',
        isReadyForReview: false
      },
      {
        id: 'rev_2',
        concept: 'Pointer Arithmetic on 4-Byte Integer Arrays',
        module: 'Foundations',
        dueInDays: 0,
        targetDimension: 'coding',
        previousMistakePattern: 'Forgot that ptr + 1 increments memory address by sizeof(int), not 1 byte.',
        isReadyForReview: true
      },
      {
        id: 'rev_3',
        concept: 'In-Place Array Element Deletion with Shifting',
        module: 'Arrays',
        dueInDays: 5,
        targetDimension: 'coding',
        previousMistakePattern: 'Left dangling trailing elements after shifting left.',
        isReadyForReview: false
      }
    ]
  };
};

export const fetchStudentDashboardData = async (userEmail: string, userName: string): Promise<StudentDashboardData> => {
  // 1. Try fetching from Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile && profile.module_stats) {
          return {
            studentId: user.id,
            email: user.email || userEmail,
            name: profile.name || userName,
            levelBadge: profile.level_badge || 'Tier 1: Linear Foundations',
            streakDays: profile.streak_days || 1,
            overallMasteryScore: profile.overall_mastery || 45,
            theoryMasteryScore: profile.theoretical_mastery || 50,
            codingProficiencyScore: profile.coding_proficiency || 40,
            moduleMetrics: profile.module_stats || DEFAULT_MODULE_METRICS,
            strongConcepts: profile.strong_concepts || [],
            weakConcepts: profile.weak_concepts || [],
            recentAssessments: profile.recent_assessments || [],
            codingStats: profile.coding_stats || {
              totalSolved: 0,
              totalAvailable: 46,
              easyCount: 0,
              mediumCount: 0,
              hardCount: 0,
              acceptanceRate: 0,
              compilationPassRate: 0
            },
            weeklyActivity: profile.weekly_activity || [],
            recommendation: profile.recommendation || {
              topic: 'Foundations',
              module: 'Foundations',
              dimension: 'theory',
              whyRecommended: 'Begin by mastering basic C++ variables and memory layout.',
              weaknessAddressed: 'Foundational syntax and pointer addressing.',
              concreteEvidence: 'New learner onboarding.',
              estimatedMinutes: 15
            },
            revisionItems: profile.revision_items || []
          };
        }
      }
    } catch (err) {
      console.warn('Supabase profile fetch failed, using local storage fallback:', err);
    }
  }

  // 2. Local Storage Persistence
  const cached = localStorage.getItem(DASHBOARD_STORAGE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed.email === userEmail) {
        return parsed;
      }
    } catch {
      // Fallback
    }
  }

  // 3. Generate structured baseline student data
  const freshData = createInitialStudentData(`usr_${Date.now()}`, userEmail, userName);
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(freshData));
  return freshData;
};

