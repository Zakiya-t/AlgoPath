import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { StudentJourney } from './components/StudentJourney';
import { CoreFeatures } from './components/CoreFeatures';
import { InteractiveTracerDemo } from './components/InteractiveTracerDemo';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { AuthMode, StudentProfile } from './types';
import { getSavedProfile, saveProfile, clearSavedProfile, createDefaultProfile } from './services/authStore';

export const App: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [user, setUser] = useState<StudentProfile | null>(null);

  // Load saved profile on initial render
  useEffect(() => {
    const saved = getSavedProfile();
    if (saved) {
      setUser(saved);
    }
  }, []);

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
    setAuthMode(null);
  };

  const handleSignOut = () => {
    clearSavedProfile();
    setUser(null);
  };

  // If user is authenticated, render the Student Dashboard view
  if (user) {
    return (
      <Dashboard
        user={user}
        onSignOut={handleSignOut}
      />
    );
  }

  // Otherwise, render the Landing Page experience
  return (
    <div className="min-h-screen relative flex flex-col bg-obsidian-950 text-slate-100 selection:bg-emerald-500 selection:text-obsidian-950 overflow-x-hidden">
      
      {/* 1. Subtle, Clean Ambient Blurred Canvas */}
      <ThreeCanvas />

      {/* 2. Sleek Navbar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        user={null}
        onSignOut={handleSignOut}
      />

      {/* 3. Main Landing Experience */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full relative z-10 space-y-16">
        
        {/* 1. Hero: Personal Teacher vs Static Website */}
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
