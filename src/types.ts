export type ModuleId = 'basics' | 'array' | 'linked-list' | 'stack' | 'queue';

export interface CurriculumModule {
  id: ModuleId;
  number: number;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  complexity: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
    space: string;
  };
  concepts: string[];
  cppSnippet: string;
  iconName: string;
  practicalApplication: string;
}

export type AuthMode = 'signin' | 'signup' | null;

export interface UserAssessmentState {
  selfReportedLevel: 'beginner' | 'basic' | 'intermediate' | 'advanced';
  quizAnswer: number | null;
  quizScore: number;
  calibratedLevel: string;
}

export interface StudentProfile {
  id: string;
  email: string;
  name: string;
  levelBadge: string; // e.g. "Tier 1: Foundations"
  streakDays: number;
  accuracyRate: number; // e.g. 92
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
    severity: 'medium' | 'high';
  }[];
  retentionSchedule: {
    id: string;
    concept: string;
    dueInDays: number;
    status: 'scheduled' | 'ready';
  }[];
  moduleProgress: {
    basics: number;
    array: number;
    'linked-list': number;
    stack: number;
    queue: number;
  };
}
