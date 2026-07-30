import React, { useState } from 'react';
import { TargetRole, CompanyTier, ATSAnalysisResult } from '../types';
import { SAMPLE_RESUMES, SampleResume } from '../data/sampleResumes';
import { Sparkles, FileText, Briefcase, Building2, User, Play, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface SetupStepProps {
  candidateName: string;
  setCandidateName: (name: string) => void;
  targetRole: TargetRole;
  setTargetRole: (role: TargetRole) => void;
  companyTier: CompanyTier;
  setCompanyTier: (tier: CompanyTier) => void;
  resumeText: string;
  setResumeText: (text: string) => void;
  atsResult: ATSAnalysisResult | null;
  onRunAtsAnalysis: () => Promise<void>;
  onStartDrive: () => void;
  isAnalyzingAts: boolean;
  theme?: 'light' | 'dark';
}

const ROLES: TargetRole[] = [
  'Full-Stack Engineer',
  'Backend Systems Engineer',
  'Frontend Specialist',
  'Data & ML Engineer',
  'DevOps & Cloud Engineer',
  'SDE-1 (Generalist)',
];

const COMPANY_TIERS: CompanyTier[] = [
  'Tier-1 Product (FAANG/MNC)',
  'High-Growth Tech Startup',
  'Enterprise IT Services & Consulting',
];

export const SetupStep: React.FC<SetupStepProps> = ({
  candidateName,
  setCandidateName,
  targetRole,
  setTargetRole,
  companyTier,
  setCompanyTier,
  resumeText,
  setResumeText,
  atsResult,
  onRunAtsAnalysis,
  onStartDrive,
  isAnalyzingAts,
  theme = 'light',
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>('');
  const isLight = theme === 'light';

  const handleSelectSample = (sample: SampleResume) => {
    setSelectedSampleId(sample.id);
    setResumeText(sample.content);
    if (!candidateName || candidateName === 'Candidate') {
      const nameMatch = sample.content.match(/^([A-[Z\s]+)/);
      if (nameMatch) {
        setCandidateName(nameMatch[0].trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()));
      }
    }
    if (sample.role && ROLES.includes(sample.role as TargetRole)) {
      setTargetRole(sample.role as TargetRole);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Welcome Card */}
      <div
        className={`rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden border transition-all ${
          isLight
            ? 'bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/80 border-indigo-200/80 text-slate-800'
            : 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/20 text-slate-100'
        }`}
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="h-64 w-64 text-indigo-500" />
        </div>
        <div className="relative z-10 space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
              isLight
                ? 'bg-indigo-100/70 text-indigo-700 border-indigo-200'
                : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Adaptive Campus Placement Intelligence
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Initialize Your Multi-Agent Placement Drive
          </h2>
          <p className={`text-sm max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Dōki AI deploys 10 autonomous worker agents to analyze your resume, screen your ATS fit, generate customized coding/system challenges, and adapt difficulty dynamically using real-time Gemini LLM evaluation.
          </p>
        </div>
      </div>

      {/* Setup Form Grid */}
      <div
        className={`rounded-2xl p-6 sm:p-8 space-y-6 border transition-all ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm text-slate-800'
            : 'bg-slate-900 border-slate-800 shadow-md text-slate-200'
        }`}
      >
        <h3
          className={`text-lg font-bold flex items-center gap-2 pb-2 border-b ${
            isLight ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
          }`}
        >
          <User className="h-5 w-5 text-indigo-600" />
          Candidate & Placement Profile
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Name */}
          <div className="space-y-2">
            <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              <User className="h-3.5 w-3.5 text-indigo-600" /> Candidate Name
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. Priyanka T M"
              className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600'
                  : 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-indigo-500'
              }`}
            />
          </div>

          {/* Target Role */}
          <div className="space-y-2">
            <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              <Briefcase className="h-3.5 w-3.5 text-indigo-600" /> Target Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value as TargetRole)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-indigo-600'
                  : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
              }`}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Target Company Tier */}
          <div className="space-y-2">
            <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              <Building2 className="h-3.5 w-3.5 text-indigo-600" /> Target Company Tier
            </label>
            <select
              value={companyTier}
              onChange={(e) => setCompanyTier(e.target.value as CompanyTier)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-indigo-600'
                  : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
              }`}
            >
              {COMPANY_TIERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resume Input Area & Presets */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              <FileText className="h-3.5 w-3.5 text-indigo-600" /> Raw Resume Text / CV Details
            </label>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Load Preset:</span>
              {SAMPLE_RESUMES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    selectedSampleId === sample.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  {sample.id === 'fullstack-dev' ? 'Full Stack CV' : 'Backend CV'}
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={8}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste raw text from your resume here (skills, education, projects, experience)..."
            className={`w-full rounded-xl p-4 text-xs font-mono leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600'
                : 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-600 focus:border-indigo-500'
            }`}
          />
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <button
            type="button"
            onClick={onRunAtsAnalysis}
            disabled={isAnalyzingAts || !resumeText.trim()}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 border ${
              isLight
                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border-indigo-500/30'
            }`}
          >
            {isAnalyzingAts ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                Analyzing ATS Fit via Gemini...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Screen Resume & ATS Score
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onStartDrive}
            disabled={!resumeText.trim()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="h-4 w-4 fill-white" />
            Start 5-Round Technical Drive
          </button>
        </div>

        {/* ATS Analysis Summary Card if Available */}
        {atsResult && (
          <div className={`mt-6 rounded-xl p-5 space-y-4 border ${
            isLight
              ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
              : 'bg-slate-950 border-emerald-500/30 text-white'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Resume & ATS Screening Report
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>ATS Match:</span>
                <span className={`px-3 py-1 rounded-full font-bold text-sm border ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {atsResult.atsScore} / 100
                </span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed p-3 rounded-lg border ${
              isLight
                ? 'bg-white/90 border-emerald-100 text-slate-700'
                : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}>
              {atsResult.executiveSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-emerald-700 block mb-1">Detected Key Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.detectedSkills.map((skill, idx) => (
                    <span key={idx} className={`px-2 py-0.5 rounded border ${
                      isLight
                        ? 'bg-white text-slate-700 border-emerald-200'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-amber-700 block mb-1">Missing Role Keywords:</span>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.missingKeywords.map((kw, idx) => (
                    <span key={idx} className={`px-2 py-0.5 rounded border ${
                      isLight
                        ? 'bg-amber-100/80 text-amber-800 border-amber-300'
                        : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                    }`}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
