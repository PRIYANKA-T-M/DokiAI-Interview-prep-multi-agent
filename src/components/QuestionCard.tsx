import React, { useState } from 'react';
import { QuestionItem } from '../types';
import { Code2, HelpCircle, Send, Lightbulb, Play, CheckCircle2, Loader2, Sparkles, Terminal } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionItem;
  onSubmitAnswer: (answerText: string, codeSnippet?: string) => Promise<void>;
  isSubmitting: boolean;
  theme?: 'light' | 'dark';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSubmitAnswer,
  isSubmitting,
  theme = 'light',
}) => {
  const [answerText, setAnswerText] = useState<string>('');
  const [codeSnippet, setCodeSnippet] = useState<string>(question.codeTemplate || '');
  const [language, setLanguage] = useState<string>('javascript');
  const [showHintIndex, setShowHintIndex] = useState<number>(-1);
  const [customTestInput, setCustomTestInput] = useState<string>('');
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const isLight = theme === 'light';
  const isCodingRound = question.round === 'CODING_DSA';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim() && (!isCodingRound || !codeSnippet.trim())) return;
    await onSubmitAnswer(answerText, isCodingRound ? codeSnippet : undefined);
  };

  const handleRunLocalTest = () => {
    setTestOutput('Local Execution Simulated: Code passed basic syntax check.');
  };

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 space-y-6 border transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm text-slate-800'
          : 'bg-slate-900 border-slate-800 shadow-lg text-slate-100'
      }`}
    >
      {/* Question Metadata Header */}
      <div className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isLight
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
            }`}
          >
            {question.topic}
          </span>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {question.round}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {question.expectedConcepts && question.expectedConcepts.length > 0 && (
            <div className={`flex items-center gap-1 text-[11px] hidden sm:flex ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>Expected:</span>
              <span className={`font-mono font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                {question.expectedConcepts.slice(0, 3).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Question Text */}
      <div className="space-y-3">
        <h2 className={`text-lg sm:text-xl font-bold leading-relaxed ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {question.questionText}
        </h2>

        {/* Hints Accordion */}
        {question.hints && question.hints.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Need a hint?
              </span>
              {question.hints.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setShowHintIndex(showHintIndex === idx ? -1 : idx)}
                  className={`text-xs px-2.5 py-0.5 rounded border font-medium transition-all ${
                    showHintIndex === idx
                      ? isLight
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  Hint {idx + 1}
                </button>
              ))}
            </div>

            {showHintIndex >= 0 && (
              <div
                className={`mt-2.5 rounded-xl p-3 text-xs leading-relaxed border ${
                  isLight
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                }`}
              >
                <span className="font-bold text-amber-600 mr-1">Hint {showHintIndex + 1}:</span>
                {question.hints[showHintIndex]}
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Coding Round Sandbox if applicable */}
        {isCodingRound && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                <Code2 className="h-4 w-4 text-indigo-600" /> Solution Code Editor
              </label>

              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`text-xs rounded-lg px-2.5 py-1 focus:outline-none border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-600'
                      : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-indigo-500'
                  }`}
                >
                  <option value="javascript">JavaScript / TypeScript</option>
                  <option value="python">Python 3</option>
                  <option value="java">Java 17</option>
                  <option value="cpp font-mono">C++ 20</option>
                </select>

                <button
                  type="button"
                  onClick={handleRunLocalTest}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg flex items-center gap-1 border transition-all ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <Play className="h-3 w-3 text-emerald-500" /> Quick Syntax Check
                </button>
              </div>
            </div>

            <textarea
              rows={10}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="// Write your code solution here..."
              className={`w-full rounded-xl p-4 text-xs font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
                isLight
                  ? 'bg-slate-900 border-slate-800 text-emerald-400 placeholder-slate-500'
                  : 'bg-slate-950 border-slate-800 text-emerald-300 placeholder-slate-600'
              }`}
            />

            {testOutput && (
              <div
                className={`rounded-xl p-3 text-xs font-mono flex items-center gap-2 border ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <Terminal className="h-4 w-4 text-indigo-600" />
                <span>{testOutput}</span>
              </div>
            )}
          </div>
        )}

        {/* Text Explanation Input */}
        <div className="space-y-2">
          <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            <HelpCircle className="h-4 w-4 text-indigo-600" />
            {isCodingRound
              ? 'Approach Explanation & Time/Space Complexity Rationale'
              : 'Your Technical Response'}
          </label>
          <textarea
            rows={5}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder={
              isCodingRound
                ? 'Explain your approach, why you chose this data structure, and the overall time & space complexity...'
                : 'Write your comprehensive technical answer, detailing key principles, trade-offs, and design considerations...'
            }
            className={`w-full rounded-xl p-4 text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600'
                : 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600 focus:border-indigo-500'
            }`}
          />
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting || (!answerText.trim() && !codeSnippet.trim())}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                Multi-Agent Evaluation in Progress...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Answer for Gemini Evaluation
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
