import React from 'react';
import { PlacementReport } from '../types';
import { History, Trophy, Calendar, Briefcase, ChevronRight, Trash2 } from 'lucide-react';

interface PastSessionsViewProps {
  sessions: PlacementReport[];
  onSelectSession: (report: PlacementReport) => void;
  onClearHistory: () => void;
  theme?: 'light' | 'dark';
}

export const PastSessionsView: React.FC<PastSessionsViewProps> = ({
  sessions,
  onSelectSession,
  onClearHistory,
  theme = 'light',
}) => {
  const isLight = theme === 'light';

  if (sessions.length === 0) {
    return (
      <div
        className={`max-w-2xl mx-auto border rounded-2xl p-12 text-center space-y-4 shadow-sm transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-600'
            : 'bg-slate-900 border-slate-800 text-slate-400 shadow-lg'
        }`}
      >
        <div
          className={`h-16 w-16 mx-auto rounded-2xl border flex items-center justify-center ${
            isLight
              ? 'bg-slate-100 border-slate-200 text-slate-400'
              : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          <History className="h-8 w-8" />
        </div>
        <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
          No Past Placement Sessions Found
        </h3>
        <p className="text-sm max-w-md mx-auto">
          Complete a 5-round technical placement drive to generate your first placement readiness score and revision roadmap!
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
      <div className={`flex items-center justify-between border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div>
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <History className="h-6 w-6 text-indigo-600" /> Past Placement Drive Sessions
          </h2>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            View past skill gap reports and progress trends.
          </p>
        </div>

        <button
          onClick={onClearHistory}
          className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all border cursor-pointer ${
            isLight
              ? 'text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100'
              : 'text-rose-400 hover:text-rose-300 bg-rose-950/30 border-rose-500/20'
          }`}
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear History
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((rep, idx) => (
          <div
            key={rep.sessionId || idx}
            onClick={() => onSelectSession(rep)}
            className={`rounded-2xl p-5 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border group ${
              isLight
                ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-xs'
                : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 shadow-md'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{rep.candidateName}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                    isLight
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                  }`}
                >
                  {rep.targetRole}
                </span>
              </div>
              <div className={`flex items-center gap-3 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> {rep.companyTier}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {new Date(rep.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className={`text-[11px] font-bold uppercase tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Readiness
                </span>
                <span className="text-xl font-black text-emerald-600">
                  {rep.overallScore} / 100
                </span>
              </div>

              <div className={`h-8 w-8 rounded-xl border flex items-center justify-center transition-all ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600'
                  : 'bg-slate-950 border-slate-800 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'
              }`}>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
