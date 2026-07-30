import React from 'react';
import { X, Cpu, ShieldCheck, Zap, Network, Layers, Bot } from 'lucide-react';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

const WORKER_AGENTS = [
  { name: 'Interview Orchestrator ("The Brain")', role: 'Evaluates state, adjusts difficulty (Easy ↔ Medium ↔ Hard), handles state transitions' },
  { name: 'ResumeAnalyzer Agent', role: 'Parses raw candidate resume, extracts skills, key projects, and stack experience' },
  { name: 'AtsAnalyzer Agent', role: 'Calculates ATS keyword match, missing role competencies, and role fit score' },
  { name: 'RoleRequirement Agent', role: 'Encodes hiring standards for FAANG, Startup, or IT Service company tiers' },
  { name: 'QuestionGenerator Agent', role: 'Synthesizes non-static, dynamic technical questions tailored to round & stack' },
  { name: 'ConceptEvaluator Agent', role: 'Evaluates Core CS answers across OS, DBMS, Networks, and System Design' },
  { name: 'CodingEvaluator Agent', role: 'Performs AST, Time/Space Complexity, and edge-case code evaluation' },
  { name: 'CommunicationEvaluator Agent', role: 'Scores technical articulation, trade-off reasoning, and scenario response' },
  { name: 'SkillGapAnalyzer Agent', role: 'Detects technical weaknesses and generates remediation resource links' },
  { name: 'PlacementPredictor Agent', role: 'Computes placement readiness probability & category radar metrics' },
  { name: 'CareerCoach Agent', role: 'Builds 7-day revision roadmaps & answers follow-up technical strategy Q&A' },
];

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose, theme = 'light' }) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto ${
      isLight ? 'bg-slate-900/40' : 'bg-slate-950/80'
    }`}>
      <div className={`rounded-2xl max-w-3xl w-full p-6 space-y-6 border shadow-2xl relative transition-all ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-lg transition-all ${
            isLight
              ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        <div className={`flex items-center gap-3 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${
            isLight
              ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
              : 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
          }`}>
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Dōki AI (同期 AI) Multi-Agent System Specification
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Architecture Overview & 10 Autonomous Worker Agent Contracts
            </p>
          </div>
        </div>

        <div className={`space-y-4 text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          <div className={`p-4 rounded-xl border space-y-2 ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-slate-950 border-slate-800'
          }`}>
            <h4 className={`font-bold flex items-center gap-1.5 text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Zap className="h-4 w-4 text-amber-500" /> Real-time Gemini LLM Dynamic Execution
            </h4>
            <p>
              Unlike static LeetCode banks or hardcoded question pools, Dōki AI leverages Google's <code className="text-indigo-600 font-semibold">gemini-3.6-flash</code> via server-side API routes to generate custom adaptive questions, evaluate code complexity in real time, and adjust difficulty level based on candidate performance.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className={`font-bold text-sm flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Bot className="h-4 w-4 text-indigo-600" /> 10 Specialized Worker Agents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WORKER_AGENTS.map((agent, i) => (
                <div key={i} className={`p-3 rounded-xl border space-y-1 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-950 border-slate-800'
                }`}>
                  <span className={`font-bold block ${isLight ? 'text-indigo-700' : 'text-indigo-300'}`}>{agent.name}</span>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{agent.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex justify-end pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
};
