import React, { useState, useEffect } from 'react';
import {
  TargetRole,
  CompanyTier,
  InterviewRoundId,
  DifficultyLevel,
  ATSAnalysisResult,
  QuestionItem,
  EvaluationResult,
  PlacementReport,
} from './types';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { Header } from './components/Header';
import { SetupStep } from './components/SetupStep';
import { RoundProgressHeader } from './components/RoundProgressHeader';
import { QuestionCard } from './components/QuestionCard';
import { EvaluationFeedbackCard } from './components/EvaluationFeedbackCard';
import { FinalPlacementReportView } from './components/FinalPlacementReportView';
import { SpecsModal } from './components/SpecsModal';
import { PastSessionsView } from './components/PastSessionsView';
import { Loader2, AlertCircle } from 'lucide-react';

const ROUND_IDS: InterviewRoundId[] = [
  'RESUME_ATS',
  'CORE_CS',
  'CODING_DSA',
  'SYSTEM_DESIGN',
  'COMMUNICATION',
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'drive' | 'specs' | 'history'>('drive');
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isLight = theme === 'light';

  // Profile setup state
  const [candidateName, setCandidateName] = useState<string>('Priyanka T M');
  const [targetRole, setTargetRole] = useState<TargetRole>('Full-Stack Engineer');
  const [companyTier, setCompanyTier] = useState<CompanyTier>('Tier-1 Product (FAANG/MNC)');
  const [resumeText, setResumeText] = useState<string>(SAMPLE_RESUMES[0].content);

  // ATS Analysis state
  const [atsResult, setAtsResult] = useState<ATSAnalysisResult | null>(null);
  const [isAnalyzingAts, setIsAnalyzingAts] = useState<boolean>(false);

  // Placement Drive state
  const [driveState, setDriveState] = useState<'SETUP' | 'QUESTION' | 'EVALUATION' | 'REPORT'>('SETUP');
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('Medium');

  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(null);
  const [evaluations, setEvaluations] = useState<Record<string, EvaluationResult>>({});
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResult | null>(null);
  const [finalReport, setFinalReport] = useState<PlacementReport | null>(null);

  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState<boolean>(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Past Sessions History
  const [pastSessions, setPastSessions] = useState<PlacementReport[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('doki_past_sessions');
      if (stored) {
        setPastSessions(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load past sessions:', err);
    }
  }, []);

  const saveReportToHistory = (newReport: PlacementReport) => {
    const updated = [newReport, ...pastSessions];
    setPastSessions(updated);
    try {
      localStorage.setItem('doki_past_sessions', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save session to storage:', err);
    }
  };

  const handleClearHistory = () => {
    setPastSessions([]);
    try {
      localStorage.removeItem('doki_past_sessions');
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  // Run ATS Analysis via Server Gemini Agent
  const handleRunAtsAnalysis = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzingAts(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/ats/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole,
          companyTier,
        }),
      });

      if (!res.ok) {
        throw new Error('Server error analyzing ATS fit');
      }

      const data: ATSAnalysisResult = await res.json();
      setAtsResult(data);
    } catch (err: any) {
      console.error('ATS Analysis Error:', err);
      setErrorMessage(err.message || 'Failed to complete ATS screening.');
    } finally {
      setIsAnalyzingAts(false);
    }
  };

  // Start 5-Round Placement Drive & Generate Round 1 Question
  const handleStartDrive = async () => {
    setErrorMessage(null);
    setQuestions([]);
    setEvaluations({});
    setCurrentEvaluation(null);
    setFinalReport(null);
    setCurrentRoundIndex(0);
    setCurrentDifficulty('Medium');

    await fetchAndSetQuestion(0, 'Medium', []);
    setDriveState('QUESTION');
  };

  // Helper to fetch question from server QuestionGenerator Agent
  const fetchAndSetQuestion = async (
    roundIdx: number,
    diff: DifficultyLevel,
    existingQuestions: QuestionItem[]
  ) => {
    setIsGeneratingQuestion(true);
    setErrorMessage(null);

    const roundId = ROUND_IDS[roundIdx] || 'RESUME_ATS';
    const previousTopics = existingQuestions.map((q) => q.topic);

    try {
      const res = await fetch('/api/interview/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          round: roundId,
          targetRole,
          companyTier,
          resumeSummary: resumeText.slice(0, 1500),
          currentDifficulty: diff,
          previousTopics,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate interview question');
      }

      const q: QuestionItem = await res.json();
      setCurrentQuestion(q);
      setQuestions((prev) => [...prev, q]);
    } catch (err: any) {
      console.error('Generate Question Error:', err);
      setErrorMessage(err.message || 'Failed to generate question from Gemini');
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  // Handle Answer Submission to Server Multi-Agent Evaluator
  const handleSubmitAnswer = async (answerText: string, codeSnippet?: string) => {
    if (!currentQuestion) return;
    setIsSubmittingAnswer(true);
    setErrorMessage(null);

    const roundId = ROUND_IDS[currentRoundIndex];

    try {
      const res = await fetch('/api/interview/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          round: roundId,
          question: currentQuestion,
          answerText,
          codeSnippet,
          targetRole,
          currentDifficulty,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to evaluate answer');
      }

      const evaluation: EvaluationResult = await res.json();

      setEvaluations((prev) => ({ ...prev, [currentQuestion.id]: evaluation }));
      setCurrentEvaluation(evaluation);

      // Dynamically update difficulty for next round if recommended by Gemini Evaluator
      if (evaluation.recommendedNextDifficulty) {
        setCurrentDifficulty(evaluation.recommendedNextDifficulty);
      }

      setDriveState('EVALUATION');
    } catch (err: any) {
      console.error('Answer Evaluation Error:', err);
      setErrorMessage(err.message || 'Failed to evaluate response');
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  // Move to next question or final report
  const handleNextStep = async () => {
    if (currentRoundIndex < ROUND_IDS.length - 1) {
      const nextIdx = currentRoundIndex + 1;
      setCurrentRoundIndex(nextIdx);
      setDriveState('QUESTION');
      await fetchAndSetQuestion(nextIdx, currentDifficulty, questions);
    } else {
      // Final Round completed! Generate Final Placement Report
      setIsGeneratingReport(true);
      setErrorMessage(null);

      try {
        const res = await fetch('/api/interview/final-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            candidateName,
            targetRole,
            companyTier,
            atsResult,
            questions,
            evaluations,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to generate final placement report');
        }

        const report: PlacementReport = await res.json();
        setFinalReport(report);
        saveReportToHistory(report);
        setDriveState('REPORT');
      } catch (err: any) {
        console.error('Final Report Error:', err);
        setErrorMessage(err.message || 'Failed to build placement readiness report');
      } finally {
        setIsGeneratingReport(false);
      }
    }
  };

  const handleStartNewDrive = () => {
    setDriveState('SETUP');
    setCurrentQuestion(null);
    setCurrentEvaluation(null);
    setFinalReport(null);
    setActiveTab('drive');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Top Header */}
      <Header
        onStartNewDrive={handleStartNewDrive}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Error Alert if any */}
        {errorMessage && (
          <div className={`mb-6 rounded-2xl p-4 text-xs flex items-center justify-between gap-3 shadow-md border ${
            isLight
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-slate-400 hover:text-slate-700 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Tab Switcher Content */}
        {activeTab === 'specs' ? (
          <SpecsModal isOpen={true} onClose={() => setActiveTab('drive')} theme={theme} />
        ) : activeTab === 'history' ? (
          <PastSessionsView
            sessions={pastSessions}
            onSelectSession={(report) => {
              setFinalReport(report);
              setDriveState('REPORT');
              setActiveTab('drive');
            }}
            onClearHistory={handleClearHistory}
            theme={theme}
          />
        ) : (
          /* Main Drive Workflow */
          <div>
            {driveState === 'SETUP' && (
              <SetupStep
                candidateName={candidateName}
                setCandidateName={setCandidateName}
                targetRole={targetRole}
                setTargetRole={setTargetRole}
                companyTier={companyTier}
                setCompanyTier={setCompanyTier}
                resumeText={resumeText}
                setResumeText={setResumeText}
                atsResult={atsResult}
                onRunAtsAnalysis={handleRunAtsAnalysis}
                onStartDrive={handleStartDrive}
                isAnalyzingAts={isAnalyzingAts}
                theme={theme}
              />
            )}

            {(driveState === 'QUESTION' || driveState === 'EVALUATION') && (
              <div className="space-y-6">
                <RoundProgressHeader
                  currentRound={ROUND_IDS[currentRoundIndex]}
                  currentRoundIndex={currentRoundIndex}
                  totalRounds={ROUND_IDS.length}
                  currentDifficulty={currentDifficulty}
                  theme={theme}
                />

                {isGeneratingQuestion ? (
                  <div className={`rounded-2xl p-16 text-center space-y-4 shadow-sm border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl'
                  }`}>
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mx-auto" />
                    <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      QuestionGenerator Agent Synthesizing Round {currentRoundIndex + 1}...
                    </h3>
                    <p className={`text-xs max-w-md mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Adapting challenge difficulty ({currentDifficulty}) based on target role ({targetRole}) and previous candidate evaluations.
                    </p>
                  </div>
                ) : driveState === 'QUESTION' && currentQuestion ? (
                  <QuestionCard
                    question={currentQuestion}
                    onSubmitAnswer={handleSubmitAnswer}
                    isSubmitting={isSubmittingAnswer}
                    theme={theme}
                  />
                ) : driveState === 'EVALUATION' && currentEvaluation ? (
                  <EvaluationFeedbackCard
                    evaluation={currentEvaluation}
                    onNextQuestion={handleNextStep}
                    isLastRound={currentRoundIndex === ROUND_IDS.length - 1}
                    theme={theme}
                  />
                ) : null}
              </div>
            )}

            {driveState === 'REPORT' && (
              <div>
                {isGeneratingReport ? (
                  <div className={`rounded-2xl p-16 text-center space-y-4 shadow-sm border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl'
                  }`}>
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mx-auto" />
                    <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      PlacementPredictor & SkillGapAnalyzer Synthesizing Final Audit...
                    </h3>
                    <p className={`text-xs max-w-md mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Building 6-dimension radar metrics, placement probability, and 7-day revision roadmap.
                    </p>
                  </div>
                ) : finalReport ? (
                  <FinalPlacementReportView
                    report={finalReport}
                    onRestart={handleStartNewDrive}
                    theme={theme}
                  />
                ) : null}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal overlays if opened via header */}
      <SpecsModal isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} theme={theme} />
    </div>
  );
}
