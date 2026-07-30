import 'dotenv/config';
import express from 'express';
import 'dotenv/config';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  analyzeResumeAndATS,
  generateRoundQuestion,
  evaluateAnswer,
  generateFinalPlacementReport,
  askCareerCoach,
} from './server/agents.js';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3001);

  app.use(express.json({ limit: '10mb' }));

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Dōki AI (同期 AI) Placement Intelligence Backend',
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // 1. ATS & Resume Analyzer API Endpoint
  app.post('/api/ats/analyze', async (req, res) => {
    try {
      const { resumeText, targetRole, companyTier } = req.body;
      if (!resumeText) {
        res.status(400).json({ error: 'Resume text is required' });
        return;
      }
      const result = await analyzeResumeAndATS(
        resumeText,
        targetRole || 'Full-Stack Engineer',
        companyTier || 'Tier-1 Product (FAANG/MNC)'
      );
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/ats/analyze:', err);
      res.status(500).json({ error: err.message || 'Failed to analyze resume' });
    }
  });

  // 2. Generate Question API Endpoint
  app.post('/api/interview/generate-question', async (req, res) => {
    try {
      const {
        round,
        targetRole,
        companyTier,
        resumeSummary,
        currentDifficulty,
        previousTopics,
      } = req.body;

      const question = await generateRoundQuestion(
        round || 'RESUME_ATS',
        targetRole || 'Full-Stack Engineer',
        companyTier || 'Tier-1 Product (FAANG/MNC)',
        resumeSummary || '',
        currentDifficulty || 'Medium',
        previousTopics || []
      );
      res.json(question);
    } catch (err: any) {
      console.error('Error in /api/interview/generate-question:', err);
      res.status(500).json({ error: err.message || 'Failed to generate question' });
    }
  });

  // 3. Evaluate Candidate Answer API Endpoint
  app.post('/api/interview/evaluate-answer', async (req, res) => {
    try {
      const {
        round,
        question,
        answerText,
        codeSnippet,
        targetRole,
        currentDifficulty,
      } = req.body;

      if (!question) {
        res.status(400).json({ error: 'Question data is required' });
        return;
      }

      const evaluation = await evaluateAnswer(
        round || 'CORE_CS',
        question,
        answerText || '',
        codeSnippet,
        targetRole || 'Full-Stack Engineer',
        currentDifficulty || 'Medium'
      );
      res.json(evaluation);
    } catch (err: any) {
      console.error('Error in /api/interview/evaluate-answer:', err);
      res.status(500).json({ error: err.message || 'Failed to evaluate answer' });
    }
  });

  // 4. Final Placement Report API Endpoint
  app.post('/api/interview/final-report', async (req, res) => {
    try {
      const {
        candidateName,
        targetRole,
        companyTier,
        atsResult,
        questions,
        evaluations,
      } = req.body;

      const report = await generateFinalPlacementReport(
        candidateName || 'Candidate',
        targetRole || 'Full-Stack Engineer',
        companyTier || 'Tier-1 Product (FAANG/MNC)',
        atsResult,
        questions || [],
        evaluations || {}
      );
      res.json(report);
    } catch (err: any) {
      console.error('Error in /api/interview/final-report:', err);
      res.status(500).json({ error: err.message || 'Failed to generate final report' });
    }
  });

  // 5. Ask Career Coach Q&A API Endpoint
  app.post('/api/interview/career-coach', async (req, res) => {
    try {
      const { reportContext, userQuery } = req.body;
      if (!userQuery) {
        res.status(400).json({ error: 'User query is required' });
        return;
      }
      const answer = await askCareerCoach(reportContext || {}, userQuery);
      res.json({ answer });
    } catch (err: any) {
      console.error('Error in /api/interview/career-coach:', err);
      res.status(500).json({ error: err.message || 'Failed to connect to career coach' });
    }
  });

  // Vite middleware for development or Static server for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, 'localhost', () => {
    console.log(`Dōki AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
