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
import { MySpaceView } from './components/MySpaceView';
import { ConceptMapsView } from './components/ConceptMapsView';
import { CodingLabView } from './components/CodingLabView';
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
  createInitialStudentData,
  recordCompletedAssessment,
  recordCodingLabExecution
} from './services/learnerEngine';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App render error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white p-8 rounded-3xl border-2 border-slate-300 shadow-xl max-w-md space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-200 text-xl font-black">
              !
            </div>
            <h2 className="text-xl font-black text-slate-900">Workspace Update Detected</h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We updated the real-time analytics engine and gamified metrics. Click below to refresh your dashboard with the new schema.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('algopath_learner_dashboard_data');
                window.location.reload();
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Sync &amp; Reload Workspace
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

const AppContent: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
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

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setIsSidebarOpen(false); // Whole page window for all pages!
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
      return recordCompletedAssessment(prev, record);
    });
  };

  const handleRecordCodingLab = (details: {
    programId: string;
    title: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Hard';
    timeComplexity: string;
    spaceComplexity: string;
    isOptimal: boolean;
  }) => {
    setDashboardData((prev) => {
      if (!prev) return prev;
      return recordCodingLabExecution(prev, details);
    });
  };

  // If user is authenticated, render the Student Learning Environment
  if (user) {
    const data = dashboardData || createInitialStudentData(user.id, user.email, user.name);

    return (
      <div className="min-h-screen flex bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500 selection:text-white relative overflow-hidden">

        {/* 1. SLIDE-OUT NAVIGATION DRAWER (ACCESSIBLE VIA 3 BARS ON EVERY PAGE) */}
        {isSidebarOpen && (
          <>
            {/* Backdrop blur */}
            <div
              className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs z-40 transition-opacity animate-in fade-in"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Slide-out Drawer */}
            <div className="fixed top-0 left-0 h-screen z-50 shadow-2xl transition-transform duration-300 ease-out transform translate-x-0">
              <Sidebar
                currentTab={currentTab}
                onSelectTab={handleSelectTab}
                userName={user.name}
                userEmail={user.email}
                onSignOut={handleSignOut}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>
          </>
        )}

        {/* 2. Main Content Workspace (Full Width Whole Page Window on Every Page) */}
        <main className="flex-1 flex flex-col min-w-0 w-full overflow-y-auto max-h-screen relative z-10">
          {currentTab === 'dashboard' && (
            <DashboardView
              data={data}
              onNavigateTab={handleSelectTab}
              onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
              isSidebarOpen={isSidebarOpen}
            />
          )}

          {currentTab === 'learning-path' && (
            <LearningPathView
              initialNoteId={activeNoteId}
              onStartEvaluation={handleStartEvaluation}
              onNavigateTab={handleSelectTab}
              onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
              isSidebarOpen={isSidebarOpen}
            />
          )}

          {currentTab === 'evaluation' && (
            <EvaluationView
              initialTopicId={evaluationTopic}
              onNavigateToNote={handleNavigateToNote}
              onRecordAssessment={handleRecordAssessment}
              onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
              isSidebarOpen={isSidebarOpen}
            />
          )}

          {currentTab === 'my-space' && (
            <MySpaceView
              onNavigateToNote={handleNavigateToNote}
              onStartEvaluation={handleStartEvaluation}
              onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
              isSidebarOpen={isSidebarOpen}
            />
          )}

          {currentTab === 'concept-maps' && (
            <ConceptMapsView
              onNavigateToNote={handleNavigateToNote}
              onStartEvaluation={handleStartEvaluation}
              onNavigateTab={handleSelectTab}
              onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
              isSidebarOpen={isSidebarOpen}
            />
          )}

          {currentTab === 'coding-lab' && (
            <CodingLabView
              onNavigateToNote={handleNavigateToNote}
              onNavigateTab={handleSelectTab}
              onRecordCodingRun={handleRecordCodingLab}
              onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
              isSidebarOpen={isSidebarOpen}
            />
          )}

          {currentTab !== 'dashboard' &&
            currentTab !== 'learning-path' &&
            currentTab !== 'evaluation' &&
            currentTab !== 'my-space' &&
            currentTab !== 'concept-maps' &&
            currentTab !== 'coding-lab' && (
              <BlankPagePlaceholder
                tab={currentTab}
                onGoToDashboard={() => handleSelectTab('dashboard')}
                onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                isSidebarOpen={isSidebarOpen}
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
