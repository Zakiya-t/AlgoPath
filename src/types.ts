// =========================================================================
// AlgoPath: Core Type Definitions for Two-Environment Learning Architecture
// Dimension 1: DSA Knowledge Space (Theory, Notes, Conceptual Practice)
// Dimension 2: DSA Coding Lab (C++ Implementation, Execution, Visualizer)
// =========================================================================

export type NavigationTab = 
  | 'dashboard'
  | 'learning-path'
  | 'evaluation'
  | 'my-space'
  | 'concept-maps'
  | 'coding-lab'
  | 'revision-centre'
  | 'profile-settings';

export type AuthMode = 'signin' | 'signup' | null;

export type ModuleId = 'foundations' | 'arrays' | 'linked-lists' | 'stacks' | 'queues';

export interface ModuleMetric {
  id: ModuleId;
  name: string;
  theoryProgress: number;     // 0 - 100 percentage
  codingProgress: number;     // 0 - 100 percentage
  totalLessons: number;
  completedLessons: number;
  totalCodingProblems: number;
  solvedCodingProblems: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface ConceptDiagnostic {
  concept: string;
  category: 'theory' | 'coding';
  status: 'mastered' | 'weak';
  masteryPercentage: number;
  diagnosticEvidence: string;
}

export interface AssessmentRecord {
  id: string;
  title: string;
  mode: 'practice' | 'test';
  score: number;
  totalQuestions: number;
  date: string;
  topic: string;
  correctCount?: number;
  scorePercentage?: number;
  misconceptionsDetected?: string[];
  topicId?: string;
  topicName?: string;
  completedAt?: string;
}

export interface SkillRadarData {
  arrays: number;
  linkedLists: number;
  stacks: number;
  queues: number;
  foundations: number;
}

export interface ActivityHistoryItem {
  date: string; // 'YYYY-MM-DD'
  count: number;
  hours?: number;
}

export interface CodingStatBreakdown {
  totalSolved: number;
  totalAvailable: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  acceptanceRate: number | null; // percentage, null if no submissions yet
  compilationPassRate: number | null;
  codeQualityScore: number | null; // null if not yet evaluated; optimal time complexity (e.g. O(N) vs O(N^2)) & memory
  optimalComplexityRate: number | null; // percentage of solutions with optimal Big-O
  timeComplexityGrade?: string | null; // e.g. 'O(N) Linear' or null
  spaceComplexityGrade?: string | null; // e.g. 'O(1) In-Place' or null
  runtimeMs?: number | null; // e.g. 0.42 ms or null
}

export interface ActivityDay {
  dayName: string;
  date: string;
  hoursSpent: number;
  submissionsCount: number;
  hasActivity: boolean;
}

export interface LearningRecommendation {
  topic: string;
  module: string;
  dimension: 'theory' | 'coding';
  whyRecommended: string;
  weaknessAddressed: string;
  concreteEvidence: string;
  estimatedMinutes: number;
}

export interface RevisionScheduleItem {
  id: string;
  concept: string;
  module: string;
  dueInDays: number;
  targetDimension: 'theory' | 'coding';
  previousMistakePattern: string;
  isReadyForReview: boolean;
}

export interface PracticeQuestion {
  id: string;
  type: 'conceptual' | 'predict_output' | 'find_error' | 'coding';
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface NoteSection {
  id: string;
  title: string;
  content: string;
  codeBlocks?: {
    code: string;
    caption?: string;
    explanation?: string;
    expectedOutput?: string;
  }[];
  dryRunTable?: {
    headers: string[];
    rows: string[][];
  };
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface LearningNote {
  id: string; // e.g. 'F01', 'F02', 'D01-A01'
  category: 'fundamental' | 'core_dsa';
  moduleId: ModuleId;
  moduleName: string;
  title: string;
  subtitle: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedStudyTime: string;
  purpose: string;
  keyMotto: string;
  conceptTags: string[];
  prerequisiteTags: string[];
  recommendedWhen: string[];
  learningObjectives: string[];
  prerequisites: string[];
  introduction: {
    whatIsIt: string;
    whyNeeded: string[];
    analogy: string;
  };
  sections: NoteSection[];
  commonMistakes: {
    mistake: string;
    problem: string;
    correction: string;
  }[];
  dsaConnection: {
    explanation: string;
    codeExample?: string;
    structureUsage: { structure: string; usage: string }[];
  };
  practiceQuestions: PracticeQuestion[];
  quickRevision: {
    terms: { term: string; remember: string }[];
    rules: string[];
  };
  furtherLearning: {
    nextTopic: string;
    nextTopicId: string;
    references: { title: string; url: string }[];
  };
}

export interface StudentProfile {
  id: string;
  email: string;
  name: string;
  levelBadge: string;
  streakDays: number;
  accuracyRate: number;
  nextRecommendedStep: {
    module: string;
    topic: string;
    estimatedMinutes: number;
  };
  masteredConcepts: string[];
  activeMisconceptions: {
    id: string;
    concept: string;
    detail: string;
    severity: string;
  }[];
  retentionSchedule: {
    id: string;
    concept: string;
    dueInDays: number;
    status: string;
  }[];
  moduleProgress?: Record<string, number>;
}

export interface StudentDashboardData {
  studentId: string;
  name: string;
  email: string;
  levelBadge: string;
  streakDays: number;
  bestStreak: number;
  activeDays: number;

  // Gamified Metrics
  dsaEloRating: number;         // Starts at 800
  level: number;                // Starts at 1
  xp: number;                   // Starts at 0
  xpToNextLevel: number;        // e.g. 100
  coins: number;                // AlgoTokens earned
  
  // SEPARATE DIMENSIONS (Core Architecture Rule: Do not mix Theory and Coding)
  overallMasteryScore: number;     // 0 - 100 (Weighted composite)
  theoryMasteryScore: number;      // 0 - 100 (Knowledge Space only)
  codingProficiencyScore: number;   // 0 - 100 (Coding Lab only)
  
  // Skill Radar (Spider Web Chart mapping proficiency in linear DSA)
  radarSkills: SkillRadarData;

  moduleMetrics: ModuleMetric[];
  strongConcepts: ConceptDiagnostic[];
  weakConcepts: ConceptDiagnostic[];
  recentAssessments: AssessmentRecord[];
  codingStats: CodingStatBreakdown;
  weeklyActivity: ActivityDay[];
  activityHistory: ActivityHistoryItem[]; // Real date-based activity heatmap
  recommendation: LearningRecommendation;
  revisionItems: RevisionScheduleItem[];
}

export interface PersonalNote {
  id: string;
  title: string;
  topicId: string;
  topicName: string;
  content: string;
  codeSnippet?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface MistakeVaultItem {
  id: string;
  topicId: string;
  topicName: string;
  question: string;
  codeSnippet?: string;
  studentAnswer: string;
  correctAnswer: string;
  misconceptionTag: string;
  explanation: string;
  recommendedNoteId: string;
  recommendedNoteSection: string;
  resolved: boolean;
  timestamp: string;
}

export interface SavedQuestionItem {
  id: string;
  topicId: string;
  topicName: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  savedAt: string;
}

export type ConceptStatus = 'mastered' | 'in_progress' | 'weak' | 'locked';

export interface ConceptNode {
  id: string;
  title: string;
  category: 'foundations' | 'memory' | 'linear_ds' | 'algorithms' | 'hierarchical' | 'graphs';
  categoryLabel: string;
  tier: number;
  status: ConceptStatus;
  masteryPercentage: number;
  description: string;
  prerequisites: string[];
  unlocks: string[];
  learningNoteId?: string;
  evaluationTopicId?: string;
  codingProblemId?: string;
  misconceptionAlert?: string;
  x: number;
  y: number;
}


