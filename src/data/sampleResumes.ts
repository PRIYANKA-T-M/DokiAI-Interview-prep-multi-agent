export interface SampleResume {
  id: string;
  title: string;
  role: string;
  content: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'fullstack-dev',
    title: 'CSE Senior - Full Stack Developer (React & Node.js)',
    role: 'Full-Stack Engineer',
    content: `PRIYANKA T M
Computer Science & Engineering | Final Year B.Tech | GPA: 8.75/10
Email: candidate@example.com | GitHub: github.com/priyanka | LinkedIn: linkedin.com/in/priyanka

TECHNICAL SKILLS
Languages: JavaScript (ES6+), TypeScript, Python, C++, HTML5/CSS3
Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, HTML/CSS
Backend: Node.js, Express.js, RESTful APIs, GraphQL, JWT Authentication
Databases: PostgreSQL, MongoDB, Redis, Prisma ORM
Tools & Cloud: Git, Docker, AWS (S3, EC2), Postman, Jest, Linux

PROJECTS
1. Dōki AI - Multi-Agent Placement Preparation System (React, Express, Gemini API, Tailwind)
- Built a real-time technical placement evaluation engine supporting adaptive difficulty scaling.
- Implemented 10 autonomous worker agents communicating over shared state.
- Integrated server-side Gemini 3.6 Flash for automated coding complexity analysis and ATS scoring.

2. Campus Event Management & Ticketing Engine (Next.js, PostgreSQL, Redis)
- Developed a full-stack campus ticket booking portal handling up to 1,500 concurrent users during college fests.
- Utilized Redis caching to reduce database read latency by 45%.
- Integrated Razorpay payment gateway with Webhook verification for secure ticket generation.

EXPERIENCE
Software Engineering Intern | TechScale Systems (June 2025 – August 2025)
- Optimized 12 microservice REST API endpoints, reducing average P99 latency from 320ms to 140ms.
- Wrote unit & integration tests using Jest and Supertest achieving 88% code coverage.
- Participated in daily Agile standups, code reviews, and CI/CD deployment pipelines using GitHub Actions.

EDUCATION
B.Tech in Computer Science & Engineering | Tier-1 Institute (2022 - 2026)
Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, System Design.`,
  },
  {
    id: 'backend-systems',
    title: 'CSE Senior - Backend & Systems Engineer (Java & Microservices)',
    role: 'Backend Systems Engineer',
    content: `ARJUN SHARMA
Computer Science & Engineering | Final Year B.Tech | GPA: 8.9/10
Email: arjun.backend@example.com | GitHub: github.com/arjun-dev

TECHNICAL SKILLS
Languages: Java 17, C++, Go, SQL
Frameworks: Spring Boot, Spring Cloud, Hibernate/JPA, JUnit 5
System Architecture: Microservices, Distributed Caching, Kafka Event Streaming, gRPC
Databases: PostgreSQL, MySQL, Redis, Elasticsearch
DevOps: Docker, Kubernetes, CI/CD, Grafana, Prometheus

PROJECTS
1. High-Throughput Order Processing System (Java, Spring Boot, Kafka, PostgreSQL)
- Engineered an asynchronous order processing pipeline using Apache Kafka capable of handling 5,000 TPS.
- Implemented distributed locking via Redis Redlock to prevent double-booking during flash sales.

2. Distributed File Storage Node (Go, gRPC, Raft Consensus)
- Built a fault-tolerant distributed file metadata service using Raft consensus algorithm in Go.
- Achieved zero data loss during simulated 2-node failure scenarios in a 5-node cluster.

EDUCATION
B.Tech in Computer Science (2022 - 2026)
Coursework: Advanced Operating Systems, Distributed Systems, Computer Networks, Database Architecture.`,
  },
];
