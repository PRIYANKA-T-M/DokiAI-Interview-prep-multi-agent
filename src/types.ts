export type TargetRole =
  | 'Full-Stack Engineer'
  | 'Backend Systems Engineer'
  | 'Frontend Specialist'
  | 'Data & ML Engineer'
  | 'DevOps & Cloud Engineer'
  | 'SDE-1 (Generalist)';

export type CompanyTier =
  | 'Tier-1 Product (FAANG/MNC)'
  | 'High-Growth Tech Startup'
  | 'Enterprise IT Services & Consulting';

export type InterviewRoundId = 
  | 'RESUME_ATS'
  | 'CORE_CS'
  | 'CODING_DSA'
  | 'SYSTEM_DESIGN'
  | 'COMMUNICATION';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface ATSAnalysisResult {
  atsScore: number;
  roleFitPercentage: number;
  detectedSkills: string[];
  missingKeywords: string[];
  executiveSummary: string;
  strengthPoints: string[];
  gapRecommendations: string[];
}

export interface QuestionItem {
  id: string;
  round: InterviewRoundId;
  questionText: string;
  codeTemplate?: string;
  hints?: string[];
  difficulty: DifficultyLevel;
  topic: string;
  expectedConcepts: string[];
}

export interface AnswerSubmission {
  questionId: string;
  answerText: string;
  codeSnippet?: string;
  timeSpentSeconds: number;
}

export interface AgentReflection {
  agentName: string;
  confidenceScore: number; // 0.0 to 1.0
  reasoningText: string;
}

export interface EvaluationResult {
  questionId: string;
  score: number; // 0-100
  passed: boolean;
  detailedFeedback: string;
  strengthsObserved: string[];
  areasToImprove: string[];
  codeComplexity?: {
    timeComplexity: string;
    spaceComplexity: string;
    codeQualityScore: number;
    bugAnalysis: string;
  };
  agentReflections: AgentReflection[];
  recommendedNextDifficulty: DifficultyLevel;
}

export interface RadarMetric {
  subject: string;
  score: number;
  fullMark: number;
}

export interface SkillGapItem {
  category: string;
  gapTitle: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  description: string;
  remediationResource: string;
}

export interface RevisionDay {
  day: number;
  title: string;
  focusArea: string;
  tasks: string[];
  estimatedHours: number;
}

export interface PlacementReport {
  sessionId: string;
  createdAt: string;
  candidateName: string;
  targetRole: TargetRole;
  companyTier: CompanyTier;
  overallScore: number; // 0-100
  placementProbability: number; // 0-100 %
  readinessLabel: 'Placement Ready' | 'Near Ready (1-2 Weeks)' | 'Needs Targeted Practice' | 'Foundational Work Needed';
  radarMetrics: RadarMetric[];
  skillGaps: SkillGapItem[];
  revisionRoadmap: RevisionDay[];
  careerCoachAdvice: {
    keyTakeaways: string;
    interviewStrategyTips: string[];
    recommendedProjectsOrTopics: string[];
  };
  roundScores: Record<InterviewRoundId, number>;
}

export interface InterviewSession {
  id: string;
  createdAt: string;
  candidateName: string;
  resumeText: string;
  targetRole: TargetRole;
  companyTier: CompanyTier;
  currentRoundIndex: number;
  currentDifficulty: DifficultyLevel;
  atsAnalysis?: ATSAnalysisResult;
  questions: QuestionItem[];
  submissions: Record<string, AnswerSubmission>;
  evaluations: Record<string, EvaluationResult>;
  finalReport?: PlacementReport;
  status: 'SETUP' | 'IN_PROGRESS' | 'COMPLETED';
}
