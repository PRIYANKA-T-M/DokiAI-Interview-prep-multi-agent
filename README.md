# Dōki AI (同期 AI) 🚀

> **An Autonomous AI-Powered Peer & Placement Copilot for Personalized Technical Interview Preparation**

Dōki AI is an intelligent interview preparation platform that simulates realistic software engineering interviews using autonomous AI agents. It dynamically adapts interview difficulty based on a candidate's performance, evaluates coding and communication skills, and generates comprehensive placement readiness reports with personalized learning recommendations.

Built with a modern full-stack architecture, Dōki AI provides students with a realistic interview experience, helping them identify strengths, improve weak areas, and prepare confidently for campus placements.

---

## 📌 Table of Contents

- Overview
- Features
- Architecture
- AI Agent Workflow
- Tech Stack
- Project Structure
- Installation
- Configuration
- Running the Application
- API Endpoints
- Database Schema
- AI Workflow
- Future Enhancements
- Screenshots
- Team

---

# 📖 Overview

Technical interviews are one of the biggest challenges students face during campus placements. Traditional interview preparation platforms often rely on static questions and generic feedback, making it difficult for candidates to understand their actual strengths and weaknesses.

Dōki AI addresses this challenge by acting as an intelligent AI interviewer capable of:

- Conducting adaptive technical interviews
- Evaluating coding and communication skills
- Adjusting interview difficulty dynamically
- Providing detailed performance analytics
- Generating personalized learning roadmaps

The platform combines autonomous AI reasoning with structured evaluation to deliver an interview experience similar to a real senior software engineer.

---

# ✨ Features

## 🤖 AI-Powered Adaptive Interviews

- Dynamic question generation
- Personalized interview flow
- Adaptive difficulty progression
- Multi-domain interview support

Supported Roles

- Backend Developer
- Frontend Developer
- Full Stack Developer
- AI/ML Engineer
- Software Engineer
- DSA Preparation

---

## 💻 Code Evaluation

Supports

- Java
- Python
- C++
- JavaScript
- TypeScript

Evaluation Parameters

- Code Correctness
- Logic
- Time Complexity
- Space Complexity
- Edge Case Handling
- Code Quality
- Communication Skills
- Confidence Score

---

## 📊 Placement Readiness Report

After every interview, Dōki AI generates:

- Overall Interview Score
- Placement Probability
- Skill Gap Analysis
- Strengths
- Weak Areas
- Recommended Learning Path
- Improvement Suggestions

---

## 📈 Dashboard

Students can view

- Interview History
- Overall Scores
- Weak Topics
- Strong Topics
- Placement Readiness
- Analytics Dashboard

---

## 🔄 Smart Fallback Engine

Even without an external AI API key, Dōki AI continues functioning using its built-in interview engine.

This enables:

- Offline demonstrations
- Reliable hackathon demos
- Zero downtime

---

# 🏗️ System Architecture

```
                        +----------------------+
                        |    Next.js Frontend  |
                        +----------+-----------+
                                   |
                                   |
                             REST API
                                   |
                      +------------+------------+
                      |     Express.js API      |
                      +------------+------------+
                                   |
               +-------------------+-------------------+
               |                                       |
         Authentication                        Interview Engine
               |                                       |
               +---------------+-----------------------+
                               |
                      AI Agent Orchestrator
                               |
        ---------------------------------------------------------
        |         |          |         |          |             |
        |         |          |         |          |             |
Interviewer  Evaluator  Difficulty  Memory  Report Generator  ATS Agent
   Agent       Agent      Manager     Agent       Agent
                               |
                               |
                    Gemini API / Fallback Engine
                               |
                               |
                        PostgreSQL Database
```

---

# 🤖 AI Agent Workflow

## Interviewer Agent

Responsibilities

- Generates interview questions
- Chooses interview topics
- Adjusts questioning strategy

---

## Evaluator Agent

Responsible for

- Code evaluation
- Explanation analysis
- Complexity analysis
- Logic scoring

---

## Difficulty Manager

Tracks candidate performance.

Adjusts

- Easy
- Medium
- Hard

questions based on previous answers.

---

## Memory Agent

Maintains

- Conversation context
- Previous responses
- Follow-up questions

---

## Report Generator

Generates

- Final interview report
- Skill Gap Analysis
- Placement Score
- Learning Recommendations

---

## ATS Resume Agent

Analyzes uploaded resumes

Provides

- ATS Score
- Missing Keywords
- Resume Improvements

---

# ⚙️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Monaco Editor
- Lucide Icons

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

---

## Database

- PostgreSQL
- Prisma ORM

---

## AI

- Google Gemini API
- Custom Multi-Agent Architecture
- Prompt Engineering

---

## DevOps

- Docker
- Docker Compose

---

# 📁 Project Structure

```
doki-ai/
│
├── apps/
│   ├── api/
│   │   ├── agents/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── providers/
│   │   ├── prisma/
│   │   └── server.js
│   │
│   └── web/
│       ├── app/
│       ├── components/
│       ├── lib/
│       ├── hooks/
│       └── styles/
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/yourusername/doki-ai.git
```

Move inside project

```bash
cd doki-ai
```

---

## Backend

```bash
cd apps/api

npm install
```

---

## Frontend

```bash
cd apps/web

npm install
```

---

# 🔐 Environment Variables

Backend

```env
DATABASE_URL=

JWT_SECRET=

GEMINI_API_KEY=

PORT=
```

Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# ▶️ Running the Project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

Using Docker

```bash
docker compose up
```

---

# 🔗 API Endpoints

## Authentication

```
POST /auth/register

POST /auth/login

GET /auth/profile
```

---

## Interview

```
POST /interview/start

POST /interview/answer

GET /interview/:id

POST /interview/end
```

---

## Reports

```
GET /report/:id

GET /dashboard

GET /history
```

---

## Resume

```
POST /resume/analyze
```

---

# 🗄 Database Schema

### User

- id
- name
- email
- password
- createdAt

---

### Interview Session

- id
- userId
- role
- techStack
- overallScore
- placementProbability

---

### Questions

- id
- sessionId
- difficulty
- question

---

### Answers

- id
- questionId
- code
- explanation
- score

---

### Skill Gap

- id
- sessionId
- weakAreas
- recommendations

---

# 🔄 AI Workflow

```
Login

↓

Select Role

↓

Choose Tech Stack

↓

Start Interview

↓

Question Generated

↓

Candidate Response

↓

Evaluation

↓

Difficulty Adjustment

↓

Next Question

↓

Final Report

↓

Dashboard Updated
```

---

# 🎯 Future Enhancements

- Voice-based interviews
- Live coding execution
- AI avatar interviewer
- Company-specific interview modes
- Collaborative mock interviews
- Interview scheduling
- Recruiter dashboard
- Team interview mode
- Resume builder
- Personalized learning planner
  
---

# 👥 Team

**Team SyncUp**

Built with ❤️ for helping students prepare smarter for technical interviews through AI.

---

# 📜 License

This project is developed for educational and hackathon purposes.

---

## ⭐ Key Highlights

- 🤖 Autonomous Multi-Agent Interview System
- 🧠 Adaptive AI Question Generation
- 💻 Real-Time Code Evaluation
- 📊 Placement Readiness Analytics
- 📄 ATS Resume Analysis
- 🎯 Personalized Learning Roadmap
- 🔐 Secure JWT Authentication
- 🐳 Dockerized Deployment
- ⚡ Modern Full-Stack Architecture
