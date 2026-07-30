import React from 'react';
import { EvaluationResult, DifficultyLevel } from '../types';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  Cpu,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

interface EvaluationFeedbackCardProps {
  evaluation: EvaluationResult;
  onNextQuestion: () => void;
  isLastRound: boolean;
  theme?: 'light' | 'dark';
}

export const EvaluationFeedbackCard: React.FC<EvaluationFeedbackCardProps> = ({
  evaluation,
  onNextQuestion,
  isLastRound,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const isPassed = evaluation.score >= 65;

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 space-y-6 border transition-all animate-in fade-in duration-300 ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm text-slate-800'
          : 'bg-slate-900 border-slate-800 shadow-xl text-slate-100'
      }`}
    >
      {/* Score Banner */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl p-5 border ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : 'bg-slate-950 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          {isPassed ? (
            <div
              className={`h-12 w-12 rounded-xl border flex items-center justify-center ${
                isLight
                  ? 'bg-emerald-100/80 text-emerald-700 border-emerald-300'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}
            >
              <CheckCircle2 className="h-7 w-7" />
            </div>
          ) : (
            <div
              className={`h-12 w-12 rounded-xl border flex items-center justify-center ${
                isLight
                  ? 'bg-amber-100/80 text-amber-700 border-amber-300'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              <AlertTriangle className="h-7 w-7" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isPassed ? 'Strong Response Evaluation' : 'Evaluation Completed with Gaps'}
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  isPassed
                    ? isLight
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : isLight
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}
              >
                {isPassed ? 'Passed' : 'Review Needed'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Evaluated by Dōki Multi-Agent Consensus System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className={`text-xs uppercase tracking-wider block font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Evaluation Score
            </span>
            <span className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{evaluation.score}</span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}> / 100</span>
          </div>

          <div className={`text-right border-l pl-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <span className={`text-xs uppercase tracking-wider block font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Next Difficulty
            </span>
            <span className="text-sm font-bold text-indigo-600">
              {evaluation.recommendedNextDifficulty || 'Medium'}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          Multi-Agent Detailed Feedback
        </h4>
        <p className={`text-sm p-4 rounded-xl border leading-relaxed ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-800'
            : 'bg-slate-950 border-slate-800 text-slate-200'
        }`}>
          {evaluation.detailedFeedback}
        </p>
      </div>

      {/* Code Complexity analysis if present */}
      {evaluation.codeComplexity && (
        <div className={`rounded-xl p-4 space-y-3 border ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : 'bg-slate-950 border-slate-800'
        }`}>
          <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-emerald-600" /> Code Complexity & Quality Analysis
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <span className={`block text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Time Complexity</span>
              <span className="font-mono text-emerald-600 font-bold text-sm">
                {evaluation.codeComplexity.timeComplexity}
              </span>
            </div>
            <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <span className={`block text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Space Complexity</span>
              <span className="font-mono text-indigo-600 font-bold text-sm">
                {evaluation.codeComplexity.spaceComplexity}
              </span>
            </div>
            <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <span className={`block text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Code Quality Rating</span>
              <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {evaluation.codeComplexity.codeQualityScore} / 100
              </span>
            </div>
          </div>
          {evaluation.codeComplexity.bugAnalysis && (
            <p className={`text-xs font-mono p-2.5 rounded-lg border ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              {evaluation.codeComplexity.bugAnalysis}
            </p>
          )}
        </div>
      )}

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className={`rounded-xl p-4 space-y-2 border ${
          isLight
            ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
            : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
        }`}>
          <span className="font-bold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Key Strengths Observed
          </span>
          <ul className="space-y-1.5">
            {evaluation.strengthsObserved.map((st, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`rounded-xl p-4 space-y-2 border ${
          isLight
            ? 'bg-amber-50/70 border-amber-200 text-slate-800'
            : 'bg-amber-950/20 border-amber-500/20 text-amber-200'
        }`}>
          <span className="font-bold text-amber-700 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-amber-600" /> Actionable Improvements
          </span>
          <ul className="space-y-1.5">
            {evaluation.areasToImprove.map((imp, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Worker Agent Reflections & Confidence Logs */}
      {evaluation.agentReflections && evaluation.agentReflections.length > 0 && (
        <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <h4 className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            <BrainCircuit className="h-4 w-4 text-indigo-600" />
            Worker Agent Self-Reflections & Confidence Matrix
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evaluation.agentReflections.map((ref, i) => (
              <div
                key={i}
                className={`rounded-xl p-3 text-xs space-y-1 border ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-600">{ref.agentName}</span>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    Confidence: {(ref.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{ref.reasoningText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action to proceed */}
      <div className={`flex justify-end pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <button
          onClick={onNextQuestion}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{isLastRound ? 'Generate Final Placement Readiness Report' : 'Proceed to Next Interview Round'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
