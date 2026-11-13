import { StudentDashboardData, ModuleMetric, AssessmentRecord, SkillRadarData, ActivityHistoryItem, ActivityDay } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const DASHBOARD_STORAGE_KEY = 'algopath_learner_dashboard_data';

// Standard 5 Linear DSA Modules Structure — starts at 0 for real tracking
export const DEFAULT_MODULE_METRICS: ModuleMetric[] = [
  {
    id: 'foundations',
    name: 'Programming Foundations',
    theoryProgress: 0,
    codingProgress: 0,
    totalLessons: 6,
    completedLessons: 0,
    totalCodingProblems: 8,
    solvedCodingProblems: 0,
    status: 'not_started'
  },
  {
    id: 'arrays',
    name: 'Static & Dynamic Arrays',
    theoryProgress: 0,
    codingProgress: 0,
    totalLessons: 8,
    completedLessons: 0,
    totalCodingProblems: 12,
    solvedCodingProblems: 0,
    status: 'not_started'
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists (Singly & Doubly)',
    theoryProgress: 0,
    codingProgress: 0,
    totalLessons: 8,
    completedLessons: 0,
    totalCodingProblems: 10,
    solvedCodingProblems: 0,
    status: 'not_started'
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
  const theoryScore = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const totalProblems = modules.reduce((acc, m) => acc + m.totalCodingProblems, 0);
  const solvedProblems = modules.reduce((acc, m) => acc + m.solvedCodingProblems, 0);
  const codingScore = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  // Composite weighted score (45% Theory, 55% Practical Implementation)
  const overall = Math.round((theoryScore * 0.45) + (codingScore * 0.55));

  return { theoryScore, codingScore, overall };
};

// Generates real date-based activity calendar (past 20 weeks up to today)
const generateInitialActivityHistory = (): ActivityHistoryItem[] => {
  const history: ActivityHistoryItem[] = [];
  const today = new Date();
  
  // 20 weeks = 140 days
  for (let i = 139; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // Today has 1 initial active session (login); past days 0
    history.push({
      date: dateStr,
      count: i === 0 ? 1 : 0,
      hours: i === 0 ? 0.1 : 0
    });
  }
  return history;
};

// Generates real 7-day week breakdown based on actual login and practice
const generateWeeklyDays = (): ActivityDay[] => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const week: ActivityDay[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayName = daysOfWeek[d.getDay()];
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}`;
    const isToday = i === 0;

    week.push({
      dayName,
      date: dateStr,
      hoursSpent: isToday ? 0.2 : 0,
      submissionsCount: isToday ? 1 : 0,
      hasActivity: isToday
    });
  }
  return week;
};

export const createInitialStudentData = (studentId: string, email: string, name: string): StudentDashboardData => {
  const initialModules = JSON.parse(JSON.stringify(DEFAULT_MODULE_METRICS));
  const { theoryScore, codingScore, overall } = calculateAggregateMastery(initialModules);

  return {
    studentId,
    email,
    name: name || email.split('@')[0],
    levelBadge: 'Tier 1: Linear Foundations',
    streakDays: 1,
    bestStreak: 1,
    activeDays: 1,

    // Gamified Metrics
    dsaEloRating: 800, // Starts at 800 per specification
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    coins: 20, // Welcome gift coins

    overallMasteryScore: overall,
    theoryMasteryScore: theoryScore,
    codingProficiencyScore: codingScore,

    radarSkills: {
      foundations: 0,
      arrays: 0,
      linkedLists: 0,
      stacks: 0,
      queues: 0
    },

    moduleMetrics: initialModules,
    strongConcepts: [],
    weakConcepts: [],
    recentAssessments: [],

    codingStats: {
      totalSolved: 0,
      totalAvailable: 42,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
      acceptanceRate: null, // null when no submissions yet
      compilationPassRate: null,
      codeQualityScore: null, // null when not evaluated yet
      optimalComplexityRate: null
    },

    weeklyActivity: generateWeeklyDays(),
    activityHistory: generateInitialActivityHistory(),

    recommendation: {
      topic: 'Variables, Memory & Data Types (F01)',
      module: 'Programming Foundations',
      dimension: 'theory',
      whyRecommended: 'Start your foundational journey. Master memory layout, data types, and pointer mechanics.',
      weaknessAddressed: 'Core memory models and static vs dynamic typing.',
      concreteEvidence: 'Initial diagnostic baseline onboarding.',
      estimatedMinutes: 15
    },

    revisionItems: []
  };
};

// Saves student dashboard data to localStorage and syncs with Supabase if online
export const saveStudentDashboardData = async (data: StudentDashboardData): Promise<void> => {
  try {
    localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || data.studentId;
      await supabase.from('profiles').upsert({
        id: userId,
        email: data.email,
        name: data.name,
        dsa_elo: data.dsaEloRating,
        level: data.level,
        xp: data.xp,
        coins: data.coins,
        streak_days: data.streakDays,
        overall_mastery: data.overallMasteryScore,
        theoretical_mastery: data.theoryMasteryScore,
        coding_proficiency: data.codingProficiencyScore,
        module_stats: data.moduleMetrics,
        coding_stats: data.codingStats,
        recent_assessments: data.recentAssessments,
        activity_history: data.activityHistory,
        radar_skills: data.radarSkills,
        updated_at: new Date().toISOString()
      });
    } catch {
      // Supabase offline/rate-limit fallback
    }
  }
};

// Handles recording of a completed assessment and updates Elo, XP, Radar, and Stats
export const recordCompletedAssessment = (
  prev: StudentDashboardData,
  record: AssessmentRecord
): StudentDashboardData => {
  const scorePct = record.scorePercentage ?? Math.round((record.score / (record.totalQuestions || 10)) * 100);

  // 1. Elo Rating calculation (starts at 800)
  // Increases when passed on first try (>=80%: +35, 60-79%: +15, <50%: -10, min 800)
  let eloDelta = 0;
  if (scorePct >= 80) eloDelta = 35;
  else if (scorePct >= 60) eloDelta = 15;
  else if (scorePct < 50) eloDelta = -10;

  const newElo = Math.max(800, prev.dsaEloRating + eloDelta);

  // 2. XP & Leveling (+50 XP per test, level up every 100 XP)
  let newXp = prev.xp + 50;
  let newLevel = prev.level;
  let newXpToNext = prev.xpToNextLevel;
  let newCoins = prev.coins + (scorePct >= 70 ? 15 : 5);

  if (newXp >= newXpToNext) {
    newLevel += 1;
    newXp = newXp - newXpToNext;
    newXpToNext = newLevel * 100;
    newCoins += 25; // Level up bonus
  }

  // 3. Update Skill Radar by Category
  const topicLower = (record.topicId || record.topic || '').toLowerCase();
  const newRadar: SkillRadarData = { ...prev.radarSkills };

  if (topicLower.includes('f0') || topicLower.includes('foundations')) {
    newRadar.foundations = Math.max(newRadar.foundations, scorePct);
  } else if (topicLower.includes('arr') || topicLower.includes('d01')) {
    newRadar.arrays = Math.max(newRadar.arrays, scorePct);
  } else if (topicLower.includes('ll') || topicLower.includes('linked') || topicLower.includes('d02')) {
    newRadar.linkedLists = Math.max(newRadar.linkedLists, scorePct);
  } else if (topicLower.includes('stk') || topicLower.includes('stack') || topicLower.includes('d03')) {
    newRadar.stacks = Math.max(newRadar.stacks, scorePct);
  } else if (topicLower.includes('q') || topicLower.includes('queue') || topicLower.includes('d04')) {
    newRadar.queues = Math.max(newRadar.queues, scorePct);
  } else {
    newRadar.foundations = Math.max(newRadar.foundations, scorePct);
  }

  // 4. Update Module Metrics
  const updatedModules = prev.moduleMetrics.map((m) => {
    let matches = false;
    if (m.id === 'foundations' && (topicLower.includes('f0') || topicLower.includes('foundations'))) matches = true;
    if (m.id === 'arrays' && (topicLower.includes('arr') || topicLower.includes('d01'))) matches = true;
    if (m.id === 'linked-lists' && (topicLower.includes('ll') || topicLower.includes('linked') || topicLower.includes('d02'))) matches = true;
    if (m.id === 'stacks' && (topicLower.includes('stk') || topicLower.includes('stack') || topicLower.includes('d03'))) matches = true;
    if (m.id === 'queues' && (topicLower.includes('q') || topicLower.includes('queue') || topicLower.includes('d04'))) matches = true;

    if (matches) {
      const newCompleted = Math.min(m.totalLessons, m.completedLessons + 1);
      const newTheory = Math.min(100, Math.max(m.theoryProgress, scorePct));
      return {
        ...m,
        completedLessons: newCompleted,
        theoryProgress: newTheory,
        status: newTheory === 100 ? ('completed' as const) : ('in_progress' as const)
      };
    }
    return m;
  });

  const { theoryScore, codingScore, overall } = calculateAggregateMastery(updatedModules);

  // 5. Update Activity History for Today
  const todayStr = new Date().toISOString().split('T')[0];
  const updatedActivityHistory = [...prev.activityHistory];
  const todayIdx = updatedActivityHistory.findIndex((h) => h.date === todayStr);
  if (todayIdx !== -1) {
    updatedActivityHistory[todayIdx] = {
      ...updatedActivityHistory[todayIdx],
      count: updatedActivityHistory[todayIdx].count + 1,
      hours: (updatedActivityHistory[todayIdx].hours || 0) + 0.25
    };
  } else {
    updatedActivityHistory.push({ date: todayStr, count: 1, hours: 0.25 });
  }

  // 6. Update Strong vs Weak Concepts
  let updatedStrong = [...prev.strongConcepts];
  let updatedWeak = [...prev.weakConcepts];

  if (scorePct >= 80) {
    if (!updatedStrong.some((s) => s.concept === record.title)) {
      updatedStrong.unshift({
        concept: record.title,
        category: 'theory',
        status: 'mastered',
        masteryPercentage: scorePct,
        diagnosticEvidence: `Scored ${scorePct}% in ${record.mode} mode on ${record.date}`
      });
    }
    // Remove from weak if previously failing
    updatedWeak = updatedWeak.filter((w) => w.concept !== record.title);
  } else if (record.misconceptionsDetected && record.misconceptionsDetected.length > 0) {
    record.misconceptionsDetected.forEach((mTag) => {
      if (!updatedWeak.some((w) => w.concept === mTag)) {
        updatedWeak.unshift({
          concept: mTag,
          category: 'theory',
          status: 'weak',
          masteryPercentage: scorePct,
          diagnosticEvidence: `Diagnosed misconception during ${record.title} evaluation`
        });
      }
    });
  }

  // 7. Update Coding Stats & Code Quality
  const prevSolved = prev.codingStats.totalSolved;
  const isPass = scorePct >= 70;
  const newSolved = isPass ? prevSolved + 1 : prevSolved;
  const totalSubmissions = prev.recentAssessments.length + 1;
  const passedSubmissions = prev.recentAssessments.filter(a => (a.scorePercentage || 0) >= 70).length + (isPass ? 1 : 0);
  const newAcceptance = Math.round((passedSubmissions / totalSubmissions) * 100);

  // Code quality score based on accuracy and optimal complexity
  const newQuality = Math.round(
    Math.min(100, Math.max(60, scorePct * 0.95 + (eloDelta > 0 ? 5 : 0)))
  );

  const updatedData: StudentDashboardData = {
    ...prev,
    dsaEloRating: newElo,
    level: newLevel,
    xp: newXp,
    xpToNextLevel: newXpToNext,
    coins: newCoins,
    overallMasteryScore: overall,
    theoryMasteryScore: theoryScore,
    codingProficiencyScore: codingScore,
    radarSkills: newRadar,
    moduleMetrics: updatedModules,
    recentAssessments: [record, ...prev.recentAssessments],
    strongConcepts: updatedStrong.slice(0, 8),
    weakConcepts: updatedWeak.slice(0, 8),
    activityHistory: updatedActivityHistory,
    codingStats: {
      ...prev.codingStats,
      totalSolved: newSolved,
      easyCount: prev.codingStats.easyCount + (topicLower.includes('f0') ? 1 : 0),
      mediumCount: prev.codingStats.mediumCount + (topicLower.includes('arr') || topicLower.includes('ll') ? 1 : 0),
      hardCount: prev.codingStats.hardCount + (topicLower.includes('stk') || topicLower.includes('q') ? 1 : 0),
      acceptanceRate: newAcceptance,
      compilationPassRate: Math.round(Math.min(100, (newAcceptance * 1.1))),
      codeQualityScore: newQuality,
      optimalComplexityRate: Math.round(newQuality * 0.9)
    }
  };

  saveStudentDashboardData(updatedData);
  return updatedData;
};

// Records a successful C++ Coding Lab execution / benchmark
export const recordCodingLabExecution = (
  prev: StudentDashboardData,
  details: {
    programId: string;
    title: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Hard';
    timeComplexity: string;
    spaceComplexity: string;
    isOptimal: boolean;
  }
): StudentDashboardData => {
  const newSolved = prev.codingStats.totalSolved + 1;
  const isBeginner = details.difficulty === 'Beginner';
  const isIntermediate = details.difficulty === 'Intermediate';

  const newEasy = prev.codingStats.easyCount + (isBeginner ? 1 : 0);
  const newMedium = prev.codingStats.mediumCount + (isIntermediate ? 1 : 0);
  const newHard = prev.codingStats.hardCount + (!isBeginner && !isIntermediate ? 1 : 0);

  // Elo rating (+30 on optimal benchmark)
  const eloDelta = details.isOptimal ? 30 : 15;
  const newElo = Math.max(800, prev.dsaEloRating + eloDelta);

  // XP & Coins
  let newXp = prev.xp + 45;
  let newLevel = prev.level;
  let newXpToNext = prev.xpToNextLevel;
  let newCoins = prev.coins + 15;

  if (newXp >= newXpToNext) {
    newLevel += 1;
    newXp = newXp - newXpToNext;
    newXpToNext = newLevel * 100;
    newCoins += 25;
  }

  // Update Radar Skills by program category
  const catLower = details.category.toLowerCase();
  const progLower = details.programId.toLowerCase();
  const newRadar: SkillRadarData = { ...prev.radarSkills };

  const boostSkill = (currentVal: number) => Math.min(100, Math.max(75, currentVal + 25));

  if (catLower.includes('arr') || progLower.includes('array') || progLower.includes('unique')) {
    newRadar.arrays = boostSkill(newRadar.arrays);
  } else if (catLower.includes('link') || progLower.includes('link')) {
    newRadar.linkedLists = boostSkill(newRadar.linkedLists);
  } else if (catLower.includes('stack') || progLower.includes('stack')) {
    newRadar.stacks = boostSkill(newRadar.stacks);
  } else if (catLower.includes('queue') || progLower.includes('queue')) {
    newRadar.queues = boostSkill(newRadar.queues);
  } else {
    newRadar.foundations = boostSkill(newRadar.foundations);
  }

  // Update Activity History
  const todayStr = new Date().toISOString().split('T')[0];
  const updatedActivityHistory = [...prev.activityHistory];
  const todayIdx = updatedActivityHistory.findIndex((h) => h.date === todayStr);
  if (todayIdx !== -1) {
    updatedActivityHistory[todayIdx] = {
      ...updatedActivityHistory[todayIdx],
      count: updatedActivityHistory[todayIdx].count + 1,
      hours: +( (updatedActivityHistory[todayIdx].hours || 0) + 0.4 ).toFixed(1)
    };
  } else {
    updatedActivityHistory.push({ date: todayStr, count: 1, hours: 0.4 });
  }

  // Update weeklyActivity (the 7-day bar chart!)
  const updatedWeekly = prev.weeklyActivity.map((day, idx) => {
    // Last element is today
    if (idx === prev.weeklyActivity.length - 1) {
      return {
        ...day,
        hoursSpent: +((day.hoursSpent || 0) + 0.5).toFixed(1),
        submissionsCount: (day.submissionsCount || 0) + 1,
        hasActivity: true
      };
    }
    return day;
  });

  const updatedData: StudentDashboardData = {
    ...prev,
    dsaEloRating: newElo,
    level: newLevel,
    xp: newXp,
    xpToNextLevel: newXpToNext,
    coins: newCoins,
    radarSkills: newRadar,
    weeklyActivity: updatedWeekly,
    activityHistory: updatedActivityHistory,
    codingStats: {
      ...prev.codingStats,
      totalSolved: newSolved,
      easyCount: newEasy,
      mediumCount: newMedium,
      hardCount: newHard,
      acceptanceRate: 100,
      compilationPassRate: 100,
      codeQualityScore: 96,
      optimalComplexityRate: details.isOptimal ? 100 : 85,
      timeComplexityGrade: details.timeComplexity,
      spaceComplexityGrade: details.spaceComplexity
    }
  };

  saveStudentDashboardData(updatedData);
  return updatedData;
};

// Helper to safely merge raw or cached data with full schema defaults
export const sanitizeStudentData = (raw: any, userEmail: string, userName: string): StudentDashboardData => {
  const baseline = createInitialStudentData(raw?.studentId || `usr_${Date.now()}`, userEmail, userName);
  if (!raw) return baseline;

  return {
    ...baseline,
    ...raw,
    studentId: raw.studentId || baseline.studentId,
    email: raw.email || userEmail,
    name: raw.name || userName || baseline.name,
    levelBadge: raw.levelBadge || baseline.levelBadge,
    streakDays: typeof raw.streakDays === 'number' ? raw.streakDays : baseline.streakDays,
    bestStreak: typeof raw.bestStreak === 'number' ? raw.bestStreak : (raw.streakDays || baseline.bestStreak),
    activeDays: typeof raw.activeDays === 'number' ? raw.activeDays : baseline.activeDays,

    dsaEloRating: typeof raw.dsaEloRating === 'number' ? raw.dsaEloRating : 800,
    level: typeof raw.level === 'number' ? raw.level : 1,
    xp: typeof raw.xp === 'number' ? raw.xp : 0,
    xpToNextLevel: typeof raw.xpToNextLevel === 'number' ? raw.xpToNextLevel : 100,
    coins: typeof raw.coins === 'number' ? raw.coins : 20,

    overallMasteryScore: typeof raw.overallMasteryScore === 'number' ? raw.overallMasteryScore : baseline.overallMasteryScore,
    theoryMasteryScore: typeof raw.theoryMasteryScore === 'number' ? raw.theoryMasteryScore : baseline.theoryMasteryScore,
    codingProficiencyScore: typeof raw.codingProficiencyScore === 'number' ? raw.codingProficiencyScore : baseline.codingProficiencyScore,

    radarSkills: {
      foundations: typeof raw.radarSkills?.foundations === 'number' ? raw.radarSkills.foundations : 0,
      arrays: typeof raw.radarSkills?.arrays === 'number' ? raw.radarSkills.arrays : 0,
      linkedLists: typeof raw.radarSkills?.linkedLists === 'number' ? raw.radarSkills.linkedLists : 0,
      stacks: typeof raw.radarSkills?.stacks === 'number' ? raw.radarSkills.stacks : 0,
      queues: typeof raw.radarSkills?.queues === 'number' ? raw.radarSkills.queues : 0,
    },

    codingStats: {
      totalSolved: typeof raw.codingStats?.totalSolved === 'number' ? raw.codingStats.totalSolved : 0,
      totalAvailable: typeof raw.codingStats?.totalAvailable === 'number' ? raw.codingStats.totalAvailable : 42,
      easyCount: typeof raw.codingStats?.easyCount === 'number' ? raw.codingStats.easyCount : 0,
      mediumCount: typeof raw.codingStats?.mediumCount === 'number' ? raw.codingStats.mediumCount : 0,
      hardCount: typeof raw.codingStats?.hardCount === 'number' ? raw.codingStats.hardCount : 0,
      acceptanceRate: typeof raw.codingStats?.acceptanceRate === 'number' ? raw.codingStats.acceptanceRate : null,
      compilationPassRate: typeof raw.codingStats?.compilationPassRate === 'number' ? raw.codingStats.compilationPassRate : null,
      codeQualityScore: typeof raw.codingStats?.codeQualityScore === 'number' ? raw.codingStats.codeQualityScore : null,
      optimalComplexityRate: typeof raw.codingStats?.optimalComplexityRate === 'number' ? raw.codingStats.optimalComplexityRate : null,
      timeComplexityGrade: typeof raw.codingStats?.timeComplexityGrade === 'string' ? raw.codingStats.timeComplexityGrade : null,
      spaceComplexityGrade: typeof raw.codingStats?.spaceComplexityGrade === 'string' ? raw.codingStats.spaceComplexityGrade : null,
    },

    moduleMetrics: Array.isArray(raw.moduleMetrics) && raw.moduleMetrics.length > 0 ? raw.moduleMetrics : baseline.moduleMetrics,
    strongConcepts: Array.isArray(raw.strongConcepts) ? raw.strongConcepts : [],
    weakConcepts: Array.isArray(raw.weakConcepts) ? raw.weakConcepts : [],
    recentAssessments: Array.isArray(raw.recentAssessments) ? raw.recentAssessments : [],
    weeklyActivity: Array.isArray(raw.weeklyActivity) && raw.weeklyActivity.length > 0 ? raw.weeklyActivity : baseline.weeklyActivity,
    activityHistory: Array.isArray(raw.activityHistory) && raw.activityHistory.length > 0 ? raw.activityHistory : baseline.activityHistory,
    recommendation: raw.recommendation || baseline.recommendation,
    revisionItems: Array.isArray(raw.revisionItems) ? raw.revisionItems : []
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

        if (profile) {
          const rawData = {
            studentId: user.id,
            email: user.email || userEmail,
            name: profile.name || userName,
            levelBadge: profile.level_badge,
            streakDays: profile.streak_days,
            bestStreak: profile.best_streak,
            activeDays: profile.active_days,
            dsaEloRating: profile.dsa_elo,
            level: profile.level,
            xp: profile.xp,
            xpToNextLevel: profile.xp_to_next,
            coins: profile.coins,
            overallMasteryScore: profile.overall_mastery,
            theoryMasteryScore: profile.theoretical_mastery,
            codingProficiencyScore: profile.coding_proficiency,
            radarSkills: profile.radar_skills,
            moduleMetrics: profile.module_stats,
            strongConcepts: profile.strong_concepts,
            weakConcepts: profile.weak_concepts,
            recentAssessments: profile.recent_assessments,
            codingStats: profile.coding_stats,
            weeklyActivity: profile.weekly_activity,
            activityHistory: profile.activity_history,
            recommendation: profile.recommendation,
            revisionItems: profile.revision_items
          };
          const sanitized = sanitizeStudentData(rawData, userEmail, userName);
          saveStudentDashboardData(sanitized);
          return sanitized;
        }
      }
    } catch (err) {
      console.warn('Supabase profile fetch failed, using local storage fallback:', err);
    }
  }

  // 2. Local Storage Persistence with Schema Sanitization
  const cached = localStorage.getItem(DASHBOARD_STORAGE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed.email === userEmail) {
        const sanitized = sanitizeStudentData(parsed, userEmail, userName);
        saveStudentDashboardData(sanitized);
        return sanitized;
      }
    } catch {
      // Fallback
    }
  }

  // 3. Generate structured baseline student data with clean 0 / null defaults
  const freshData = createInitialStudentData(`usr_${Date.now()}`, userEmail, userName);
  saveStudentDashboardData(freshData);
  return freshData;
};

