import React from 'react';
import { Cpu, Sparkles, BookOpen, RefreshCw, CheckCircle2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onStartNewDrive: () => void;
  onOpenSpecs: () => void;
  activeTab: 'drive' | 'specs' | 'history';
  setActiveTab: (tab: 'drive' | 'specs' | 'history') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onStartNewDrive,
  onOpenSpecs,
  activeTab,
  setActiveTab,
  theme,
  onToggleTheme,
}) => {
  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-colors duration-200 ${
        isLight
          ? 'bg-white/90 border-b border-slate-200 text-slate-800 shadow-sm'
          : 'bg-slate-900/90 border-b border-slate-800 text-slate-100 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Dōki AI <span className="text-indigo-600 font-normal text-sm ml-1">(同期 AI)</span>
              </h1>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium border px-2 py-0.5 rounded-full ${
                  isLight
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Gemini Active
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} hidden sm:block`}>
              Autonomous Multi-Agent Placement Intelligence Platform
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('drive')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'drive'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : isLight
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Placement Drive
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : isLight
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Past Sessions
          </button>

          <button
            onClick={() => {
              setActiveTab('specs');
              onOpenSpecs();
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'specs'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : isLight
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Agent Specs
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-all ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
          >
            {isLight ? (
              <>
                <Moon className="h-3.5 w-3.5 text-indigo-600" />
                <span className="hidden md:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden md:inline">Light</span>
              </>
            )}
          </button>

          <button
            onClick={onStartNewDrive}
            className={`ml-1 px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-all ${
              isLight
                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-indigo-500/30'
            }`}
            title="Start a fresh placement drive session"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            New Drive
          </button>
        </div>
      </div>
    </header>
  );
};

