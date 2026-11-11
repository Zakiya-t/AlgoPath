import React, { useState } from 'react';
import { AuthMode } from '../types';
import { authService } from '../services/authStore';
import { isSupabaseConfigured } from '../services/supabase';
import {
  X,
  Github,
  Mail,
  ArrowRight,
  CheckCircle2,
  GitMerge,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
  onAuthSuccess: (user: { email: string; name: string }) => void;
  onSwitchMode: (newMode: 'signin' | 'signup') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  onClose,
  onAuthSuccess,
  onSwitchMode
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!mode) return null;

  const isSignUp = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (isSignUp) {
        const profile = await authService.signUp(email, password, fullName);
        onAuthSuccess({
          email: profile.email,
          name: profile.name
        });
      } else {
        const profile = await authService.signIn(email, password);
        onAuthSuccess({
          email: profile.email,
          name: profile.name
        });
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const profile = await authService.signInWithOAuth(provider);
      if (profile) {
        onAuthSuccess({
          email: profile.email,
          name: profile.name
        });
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'OAuth error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">

      {/* Modal Container */}
      <div className="relative w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white glass-card"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1.5px] shadow-lg shadow-emerald-500/20 mb-1">
            <div className="w-full h-full bg-obsidian-950 rounded-[14px] flex items-center justify-center">
              <GitMerge className="w-6 h-6 text-emerald-400 rotate-90" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-white">
            {isSignUp ? 'Get Started for Free' : 'Log In to AlgoPath'}
          </h2>
          <p className="text-xs text-slate-400">
            {isSignUp
              ? 'Create your free account to begin mastering C++ Linear Data Structures.'
              : 'Welcome back. Log in to continue your personalized DSA journey.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 glass-card rounded-xl border border-white/5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onSwitchMode('signup')}
            className={`py-2 rounded-lg transition-all ${isSignUp
                ? 'bg-emerald-500 text-obsidian-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
              }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('signin')}
            className={`py-2 rounded-lg transition-all ${!isSignUp
                ? 'bg-emerald-500 text-obsidian-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
              }`}
          >
            Log In
          </button>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleOAuth('github')}
            disabled={isLoading}
            className="w-full glass-card hover:bg-white/10 py-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2.5 border border-white/10 transition-all hover:scale-[1.01]"
          >
            <Github className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('google')}
            disabled={isLoading}
            className="w-full glass-card hover:bg-white/10 py-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2.5 border border-white/10 transition-all hover:scale-[1.01]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-white/10"></div>
          <span className="text-[10px] font-mono uppercase text-slate-500">or with email</span>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Turing"
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dev@algopath.io"
                className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              {!isSignUp && (
                <a href="#" className="text-[11px] text-emerald-400 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="neon-btn-primary w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-2 shadow-lg"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{isSignUp ? 'Get Started for Free' : 'Log In to AlgoPath'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Feature Trust */}
        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {isSupabaseConfigured
              ? 'Connected to Supabase PostgreSQL'
              : 'Free access to 5 Linear Data Structure modules'}
          </span>
        </div>

      </div>

    </div>
  );
};
