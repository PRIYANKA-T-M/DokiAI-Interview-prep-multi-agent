import React from 'react';
import { InterviewRoundId, DifficultyLevel } from '../types';
import { FileText, Cpu, Code2, Network, MessageSquare, CheckCircle, Flame } from 'lucide-react';

interface RoundProgressHeaderProps {
  currentRound: InterviewRoundId;
  currentRoundIndex: number;
  totalRounds: number;
  currentDifficulty: DifficultyLevel;
  theme?: 'light' | 'dark';
}

const ROUND_STEPS: { id: InterviewRoundId; label: string; icon: any }[] = [
  { id: 'RESUME_ATS', label: 'Resume & Background', icon: FileText },
  { id: 'CORE_CS', label: 'Core CS Concepts', icon: Cpu },
  { id: 'CODING_DSA', label: 'Coding & DSA', icon: Code2 },
  { id: 'SYSTEM_DESIGN', label: 'System Design', icon: Network },
  { id: 'COMMUNICATION', label: 'Tech Communication', icon: MessageSquare },
];

export const RoundProgressHeader: React.FC<RoundProgressHeaderProps> = ({
  currentRound,
  currentRoundIndex,
  totalRounds,
  currentDifficulty,
  theme = 'light',
}) => {
  const isLight = theme === 'light';

  const getDifficultyColor = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'Easy':
        return isLight
          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return isLight
          ? 'bg-amber-50 text-amber-700 border-amber-300'
          : 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard':
        return isLight
          ? 'bg-rose-50 text-rose-700 border-rose-300'
          : 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border space-y-4 transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm text-slate-800'
          : 'bg-slate-900 border-slate-800 shadow-md text-slate-100'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Placement Drive • Round {currentRoundIndex + 1} of {totalRounds}
          </span>
          <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {ROUND_STEPS[currentRoundIndex]?.label || 'Interview Drive'}
          </h3>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Adaptive Difficulty:
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all ${getDifficultyColor(
              currentDifficulty
            )}`}
          >
            <Flame className="h-3.5 w-3.5" />
            {currentDifficulty}
          </span>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="grid grid-cols-5 gap-2">
        {ROUND_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < currentRoundIndex;
          const isCurrent = idx === currentRoundIndex;

          let stepStyle = '';
          if (isLight) {
            stepStyle = isCurrent
              ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold shadow-xs'
              : isCompleted
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-800 font-medium'
              : 'bg-slate-100/70 border-slate-200 text-slate-400';
          } else {
            stepStyle = isCurrent
              ? 'bg-indigo-950/50 border-indigo-500 text-white shadow-sm shadow-indigo-500/20'
              : isCompleted
              ? 'bg-slate-950 border-slate-800 text-emerald-400'
              : 'bg-slate-950/40 border-slate-900 text-slate-500';
          }

          return (
            <div
              key={step.id}
              className={`flex flex-col items-center p-2 rounded-xl text-center border transition-all ${stepStyle}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isCompleted ? (
                  <CheckCircle className={`h-4 w-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                ) : (
                  <Icon className={`h-4 w-4 ${isCurrent ? 'text-indigo-600' : isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">
                  R{idx + 1}
                </span>
              </div>
              <span className="text-[11px] font-medium line-clamp-1 leading-tight hidden sm:block">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
