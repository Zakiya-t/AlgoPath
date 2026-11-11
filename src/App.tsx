import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { StudentJourney } from './components/StudentJourney';
import { CoreFeatures } from './components/CoreFeatures';
import { InteractiveTracerDemo } from './components/InteractiveTracerDemo';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LearningPathView } from './components/LearningPathView';
import { EvaluationView } from './components/EvaluationView';
import { BlankPagePlaceholder } from './components/BlankPagePlaceholder';
import {
  AuthMode,
  NavigationTab,
  StudentProfile,
  StudentDashboardData,
  AssessmentRecord
} from './types';
import {
  getSavedProfile,
  saveProfile,
  clearSavedProfile,
  createDefaultProfile
} from './services/authStore';
import {
  fetchStudentDashboardData,
  createInitialStudentData
} from './services/learnerEngine';

export const App: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [evaluationTopic, setEvaluationTopic] = useState<string>('F01');
  const [activeNoteId, setActiveNoteId] = useState<string>('F01');

  // Load saved profile on initial render
  useEffect(() => {
    const saved = getSavedProfile();
    if (saved) {
      setUser(saved);
    }
  }, []);

  // Fetch or calculate dashboard data when user logs in
  useEffect(() => {
    if (user) {
      fetchStudentDashboardData(user.email, user.name)
        .then((data) => setDashboardData(data))
        .catch(() => {
          setDashboardData(createInitialStudentData(user.id, user.email, user.name));
        });
    }
  }, [user]);

  const handleOpenAuth = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  const handleCloseAuth = () => {
    setAuthMode(null);
  };

  const handleAuthSuccess = (userData: { email: string; name: string }) => {
    const newProfile = createDefaultProfile(userData.email, userData.name);
    setUser(newProfile);
    saveProfile(newProfile);
    setDashboardData(createInitialStudentData(newProfile.id, newProfile.email, newProfile.name));
    setAuthMode(null);
  };

  const handleSignOut = () => {
    clearSavedProfile();
    setUser(null);
    setDashboardData(null);
    setCurrentTab('dashboard');
  };

  const handleStartEvaluation = (topicId: string) => {
    setEvaluationTopic(topicId);
    setCurrentTab('evaluation');
  };

  const handleNavigateToNote = (noteId: string) => {
    setActiveNoteId(noteId);
    setCurrentTab('learning-path');
  };

  const handleRecordAssessment = (record: AssessmentRecord) => {
    setDashboardData((prev) => {
      if (!prev) return prev;
      const updatedAssessments = [record, ...prev.recentAssessments];
      const newTheoryScore = Math.min(100, Math.max(0, prev.theoryMasteryScore + 3));
      const newOverall = Math.round(newTheoryScore * 0.45 + prev.codingProficiencyScore * 0.55);

      return {
        ...prev,
        theoryMasteryScore: newTheoryScore,
        overallMasteryScore: newOverall,
        recentAssessments: updatedAssessments
      };
    });
  };

  // If user is authenticated, render the Student Learning Environment
  if (user) {
    const data = dashboardData || createInitialStudentData(user.id, user.email, user.name);

    return (
      <div className="min-h-screen flex bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500 selection:text-white relative overflow-hidden">

        {/* Persistent 8-Tab Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          userName={user.name}
          userEmail={user.email}
          onSignOut={handleSignOut}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen relative z-10">
          {currentTab === 'dashboard' && (
            <DashboardView
              data={data}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'learning-path' && (
            <LearningPathView
              initialNoteId={activeNoteId}
              onStartEvaluation={handleStartEvaluation}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'evaluation' && (
            <EvaluationView
              initialTopicId={evaluationTopic}
              onNavigateToNote={handleNavigateToNote}
              onRecordAssessment={handleRecordAssessment}
            />
          )}

          {currentTab !== 'dashboard' &&
            currentTab !== 'learning-path' &&
            currentTab !== 'evaluation' && (
              <BlankPagePlaceholder
                tab={currentTab}
                onGoToDashboard={() => setCurrentTab('dashboard')}
              />
            )}
        </main>
      </div>
    );
  }

  // Otherwise, render the Landing Page experience
  return (
    <div className="min-h-screen relative flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">

      {/* 1. Sleek Navbar with single Log In button */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        user={null}
        onSignOut={handleSignOut}
      />

      {/* 3. Main Landing Experience */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full relative z-10 space-y-16">
        
        {/* 1. Hero: Personal Teacher vs Static Website with the ONE Get Started for Free button */}
        <LandingHero
          onOpenAuth={handleOpenAuth}
        />

        {/* 2. The Core Storytelling Section: Student's Learning Journey */}
        <StudentJourney />

        {/* 3. The 7 Intelligent Differentiating Features of DoubtTrace */}
        <CoreFeatures />

        {/* 4. Interactive Memory & Pointer Visualizer */}
        <InteractiveTracerDemo />

      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Sign Up ("Get Started for Free") / Log In Modal */}
      <AuthModal
        mode={authMode}
        onClose={handleCloseAuth}
        onAuthSuccess={handleAuthSuccess}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />

    </div>
  );
};

export default App;
