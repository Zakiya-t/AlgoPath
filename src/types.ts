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

export interface CodingStatBreakdown {
  totalSolved: number;
  totalAvailable: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  acceptanceRate: number; // percentage
  compilationPassRate: number; // percentage
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
  
  // SEPARATE DIMENSIONS (Core Architecture Rule: Do not mix Theory and Coding)
  overallMasteryScore: number;     // 0 - 100 (Weighted composite)
  theoryMasteryScore: number;      // 0 - 100 (Knowledge Space only)
  codingProficiencyScore: number;   // 0 - 100 (Coding Lab only)
  
  moduleMetrics: ModuleMetric[];
  strongConcepts: ConceptDiagnostic[];
  weakConcepts: ConceptDiagnostic[];
  recentAssessments: AssessmentRecord[];
  codingStats: CodingStatBreakdown;
  weeklyActivity: ActivityDay[];
  recommendation: LearningRecommendation;
  revisionItems: RevisionScheduleItem[];
}
