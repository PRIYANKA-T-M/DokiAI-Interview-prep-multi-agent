import React, { useState } from 'react';
import { PlacementReport } from '../types';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Trophy,
  Target,
  CheckSquare,
  Square,
  Sparkles,
  Send,
  Loader2,
  Calendar,
  AlertTriangle,
  Award,
  ChevronRight,
  UserCheck,
  Brain,
} from 'lucide-react';

interface FinalPlacementReportViewProps {
  report: PlacementReport;
  onRestart: () => void;
  theme?: 'light' | 'dark';
}

export const FinalPlacementReportView: React.FC<FinalPlacementReportViewProps> = ({
  report,
  onRestart,
  theme = 'light',
}) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [coachQuery, setCoachQuery] = useState('');
  const [coachChatHistory, setCoachChatHistory] = useState<{ sender: 'user' | 'coach'; text: string }[]>([]);
  const [isAskingCoach, setIsAskingCoach] = useState(false);

  const isLight = theme === 'light';

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachQuery.trim() || isAskingCoach) return;

    const userMsg = coachQuery;
    setCoachQuery('');
    setCoachChatHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsAskingCoach(true);

    try {
      const res = await fetch('/api/interview/career-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportContext: report,
          userQuery: userMsg,
        }),
      });
      const data = await res.json();
      setCoachChatHistory((prev) => [
        ...prev,
        { sender: 'coach', text: data.answer || 'Keep practicing!' },
      ]);
    } catch (err) {
      setCoachChatHistory((prev) => [
        ...prev,
        { sender: 'coach', text: 'Sorry, I had trouble answering. Please try again!' },
      ]);
    } finally {
      setIsAskingCoach(false);
    }
  };

  const barData = Object.entries(report.roundScores || {}).map(([key, val]) => ({
    round: key.replace('_', ' '),
    score: val,
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Top Banner & Main Readiness Score */}
      <div
        className={`rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border transition-all ${
          isLight
            ? 'bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/80 border-indigo-200/80 text-slate-800'
            : 'bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 border-indigo-500/30 text-slate-100'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                isLight
                  ? 'bg-indigo-100/70 text-indigo-700 border-indigo-200'
                  : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
              }`}
            >
              <Trophy className="h-4 w-4 text-amber-500" /> Multi-Agent Placement Readiness Audit
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Placement Report for {report.candidateName}
            </h2>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              <span className={`px-3 py-1 rounded-lg border font-medium ${
                isLight ? 'bg-white/80 border-slate-200 text-slate-700' : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}>
                Role: <strong className={isLight ? 'text-slate-900' : 'text-white'}>{report.targetRole}</strong>
              </span>
              <span className={`px-3 py-1 rounded-lg border font-medium ${
                isLight ? 'bg-white/80 border-slate-200 text-slate-700' : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}>
                Target: <strong className={isLight ? 'text-slate-900' : 'text-white'}>{report.companyTier}</strong>
              </span>
            </div>
          </div>

          {/* Big Circular Metric Cards */}
          <div className="flex items-center gap-4">
            <div className={`rounded-2xl p-4 sm:p-5 text-center min-w-[130px] border shadow-xs ${
              isLight ? 'bg-white/90 border-indigo-200' : 'bg-slate-950/80 border-indigo-500/40'
            }`}>
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Overall Score
              </span>
              <span className={`text-3xl sm:text-4xl font-black ${isLight ? 'text-indigo-600' : 'bg-gradient-to-r from-indigo-300 to-white bg-clip-text text-transparent'}`}>
                {report.overallScore}
              </span>
              <span className={`text-xs block font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>out of 100</span>
            </div>

            <div className={`rounded-2xl p-4 sm:p-5 text-center min-w-[140px] border shadow-xs ${
              isLight ? 'bg-white/90 border-emerald-200' : 'bg-slate-950/80 border-emerald-500/40'
            }`}>
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Placement Probability
              </span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-600">
                {report.placementProbability}%
              </span>
              <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                {report.readinessLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Grid: Radar Chart & Round Score Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className={`rounded-2xl p-6 shadow-sm border flex flex-col justify-between ${
          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}>
          <div>
            <h3 className={`text-base font-bold flex items-center gap-2 mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Brain className="h-5 w-5 text-indigo-600" />
              6-Dimension Technical Skill Profile
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Evaluated across DSA, System Design, Core CS, ATS Match, Communication, and Quality.
            </p>
          </div>

          <div className="w-full h-[280px] my-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={report.radarMetrics}>
                <PolarGrid stroke={isLight ? '#e2e8f0' : '#334155'} />
                <PolarAngleAxis
                  dataKey="subject"
                  stroke={isLight ? '#64748b' : '#94a3b8'}
                  tick={{ fill: isLight ? '#334155' : '#cbd5e1', fontSize: 11 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isLight ? '#cbd5e1' : '#475569'} />
                <Radar
                  name="Candidate"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={isLight ? 0.3 : 0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className={`flex flex-wrap gap-2 text-xs border-t pt-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            {report.radarMetrics.map((m) => (
              <span
                key={m.subject}
                className={`px-2.5 py-1 rounded-lg border font-mono ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                {m.subject}: <strong className="text-indigo-600">{m.score}/100</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Round Performance Breakdown */}
        <div className={`rounded-2xl p-6 shadow-sm border flex flex-col justify-between space-y-4 ${
          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}>
          <div>
            <h3 className={`text-base font-bold flex items-center gap-2 mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Award className="h-5 w-5 text-indigo-600" />
              Round-by-Round Performance Metrics
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Scores attained across each technical evaluation stage.
            </p>
          </div>

          {barData.length > 0 && (
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="round" stroke={isLight ? '#64748b' : '#94a3b8'} tick={{ fill: isLight ? '#334155' : '#cbd5e1', fontSize: 10 }} />
                  <YAxis domain={[0, 100]} stroke={isLight ? '#64748b' : '#94a3b8'} tick={{ fill: isLight ? '#334155' : '#cbd5e1', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isLight ? '#ffffff' : '#0f172a',
                      borderColor: isLight ? '#e2e8f0' : '#334155',
                      color: isLight ? '#0f172a' : '#fff',
                    }}
                  />
                  <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className={`space-y-2 border-t pt-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Career Coaching Takeaways
            </h4>
            <p className={`text-xs leading-relaxed p-3 rounded-xl border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              {report.careerCoachAdvice.keyTakeaways}
            </p>
          </div>
        </div>
      </div>

      {/* Critical Skill Gap Analysis */}
      <div className={`rounded-2xl p-6 shadow-sm border space-y-4 ${
        isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <h3 className={`text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Critical Skill Gap Analysis & Remediation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.skillGaps.map((gap, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 space-y-2 text-xs flex flex-col justify-between border ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    isLight
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {gap.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      gap.severity === 'Critical'
                        ? isLight ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isLight ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {gap.severity}
                  </span>
                </div>

                <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{gap.gapTitle}</h4>
                <p className={`mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{gap.description}</p>
              </div>

              <div className={`pt-2 border-t text-[11px] ${isLight ? 'border-slate-200' : 'border-slate-900'}`}>
                <span className={`block ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Recommended Practice:</span>
                <span className="text-emerald-600 font-semibold">{gap.remediationResource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Revision Roadmap */}
      <div className={`rounded-2xl p-6 shadow-sm border space-y-4 ${
        isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Calendar className="h-5 w-5 text-indigo-600" />
            Personalized 7-Day Revision Roadmap
          </h3>
          <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Check completed daily tasks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.revisionRoadmap.map((dayItem) => (
            <div
              key={dayItem.day}
              className={`rounded-xl p-4 space-y-3 border ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}>
                  Day {dayItem.day} • {dayItem.focusArea}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{dayItem.estimatedHours} hrs prep</span>
              </div>

              <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{dayItem.title}</h4>

              <ul className="space-y-2 text-xs">
                {dayItem.tasks.map((t, tIdx) => {
                  const taskId = `day-${dayItem.day}-task-${tIdx}`;
                  const isDone = !!completedTasks[taskId];

                  return (
                    <li
                      key={tIdx}
                      onClick={() => toggleTask(taskId)}
                      className={`flex items-start gap-2 cursor-pointer transition-all select-none ${
                        isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className={`h-4 w-4 shrink-0 mt-0.5 ${isLight ? 'text-slate-400' : 'text-slate-600'}`} />
                      )}
                      <span className={isDone ? (isLight ? 'line-through text-slate-400' : 'line-through text-slate-500') : ''}>{t}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Career Coach Chat Drawer */}
      <div className={`rounded-2xl p-6 shadow-sm border space-y-4 ${
        isLight
          ? 'bg-white border-indigo-200 text-slate-800'
          : 'bg-slate-900 border-indigo-500/30 text-slate-100'
      }`}>
        <div className={`flex items-center gap-2 border-b pb-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <UserCheck className="h-5 w-5 text-indigo-600" />
          <div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Ask CareerCoach AI Agent</h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Get direct strategy advice, interview preparation tips, or clarifying answers based on your report.
            </p>
          </div>
        </div>

        {coachChatHistory.length > 0 && (
          <div className={`max-h-60 overflow-y-auto space-y-3 p-4 rounded-xl text-xs border ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-slate-950 border-slate-800'
          }`}>
            {coachChatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white font-medium shadow-xs'
                      : isLight
                      ? 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleAskCoach} className="flex gap-2">
          <input
            type="text"
            value={coachQuery}
            onChange={(e) => setCoachQuery(e.target.value)}
            placeholder="e.g., 'How should I explain my DP space optimization solution in the interview?'"
            className={`flex-1 rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600'
                : 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-indigo-500'
            }`}
          />
          <button
            type="submit"
            disabled={isAskingCoach || !coachQuery.trim()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
          >
            {isAskingCoach ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Ask
          </button>
        </form>
      </div>

      {/* Restart Drive */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onRestart}
          className={`px-8 py-3.5 rounded-xl font-semibold text-sm border shadow-sm flex items-center gap-2 transition-all cursor-pointer ${
            isLight
              ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
          }`}
        >
          <span>Start Another Placement Drive</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
