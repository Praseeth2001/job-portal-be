# 🏢 Job Portal — Backend API

> **⚠️ This project is currently in active development.**
> This README is a **living document** — update the checklist below after completing each JIRA story, then push to GitHub.

---

## 🚧 Development Status

**Current Sprint:** Sprint 0 — Project Foundation
**Overall Progress:** `1 / 41` stories complete (`2%`)

---

## ✅ Story Completion Checklist

> Check off each story as it's completed and merged. Keep this in sync with Jira.

### Epic 0 — Project Foundation & Infrastructure
- [x] 0.1 — Project Bootstrap
- [ ] 0.2 — Environment Config & Database Connection
- [ ] 0.3 — Core Middleware & Error Handling
- [ ] 0.4 — Logging & Health Check

### Epic 1 — Authentication (Local + OAuth)
- [ ] 1.1 — Local Registration & Login
- [ ] 1.2 — JWT Access & Refresh Token Rotation
- [ ] 1.3 — Google & LinkedIn OAuth
- [ ] 1.4 — Email Verification & Password Management
- [ ] 1.5 — Session Management

### Epic 2 — Recruiter Profile
- [ ] 2.1 — Recruiter Profile Management

### Epic 3 — Resume Management
- [ ] 3.1 — Storage Abstraction Layer
- [ ] 3.2 — Resume Upload
- [ ] 3.3 — Resume Retrieval & Management

### Epic 4 — Company Management
- [ ] 4.1 — Company CRUD
- [ ] 4.2 — Company Verification
- [ ] 4.3 — Company Team Management
- [ ] 4.4 — Company Followers

### Epic 5 — Job Management
- [ ] 5.1 — Job CRUD
- [ ] 5.2 — Job Status Workflow & Automation
- [ ] 5.3 — Saved Jobs

### Epic 6 — User Preferences
- [ ] 6.1 — Job Search Preferences

### Epic 7 — Applications
- [ ] 7.1 — Job Application (Candidate)
- [ ] 7.2 — Application Management (Recruiter)

### Epic 8 — Interviews
- [ ] 8.1 — Interview Scheduling
- [ ] 8.2 — Interview Feedback & Auto-Completion

### Epic 9 — Notifications & Real-Time Infrastructure
- [ ] 9.1 — WebSocket Server Setup
- [ ] 9.2 — Notification Management

### Epic 10 — Messaging
- [ ] 10.1 — Conversations
- [ ] 10.2 — Messages

### Epic 11 — Analytics
- [ ] 11.1 — Job Analytics Tracking
- [ ] 11.2 — Recruiter & Company Dashboards
- [ ] 11.3 — Platform Analytics (Admin)

### Epic 12 — Admin Panel
- [ ] 12.1 — Admin User Management
- [ ] 12.2 — Admin Company Management
- [ ] 12.3 — Admin Job Management
- [ ] 12.4 — Admin Dashboard & Audit Logs

### Epic 13 — Hardening & Launch Readiness
- [ ] 13.1 — Rate Limiting
- [ ] 13.2 — RBAC & Validation Hardening
- [ ] 13.3 — Testing & CI
- [ ] 13.4 — Dockerization & Deployment Prep

---

## ✨ Planned Features

- Role-based access control — `JOB_SEEKER`, `RECRUITER`, `COMPANY_ADMIN`, `ADMIN`
- JWT auth (access + rotating refresh tokens) + Google & LinkedIn OAuth
- Candidate profiles — education, experience, skills, certifications, projects, languages
- Resume management via a swappable storage abstraction (local disk → cloud-ready)
- Company management with an admin verification workflow, team management, and followers
- Job postings with an approval workflow and rich search/filtering
- Full application lifecycle with status history
- Multi-round interview scheduling with feedback and auto-completion
- Real-time notifications and 1:1 messaging via Socket.IO
- Recruiter, company, and platform-level analytics
- Admin moderation tools with an immutable audit log

---

## 🗂️ Project Structure

Full breakdown in [`FOLDER_STRUCTURE.md`](./FOLDER_STRUCTURE.md). Summary:

```
src/
├── config/        # env, database, passport, socket, logger
├── modules/       # one folder per domain (auth, jobs, applications, ...)
├── middlewares/    # auth, rbac, validation, rate limiting, error handling
├── services/        # storage abstraction, email, socket, audit
├── models/          # shared models (Tokens)
├── routes/          # central router mount
├── utils/           # response helpers, jwt, hashing, pagination
├── jobs/             # cron task registry
└── types/            # global TypeScript augmentations
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Runtime | Node.js ≥ 18 |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (access + refresh rotation) + Passport (Google, LinkedIn OAuth) |
| File Storage | Local disk (v1) via storage abstraction — cloud-ready |
| Real-Time | Socket.IO |
| Validation | Zod |
| Scheduling | node-cron |
| Testing | Jest + mongodb-memory-server |
| Frontend (separate repo) | React.js, React-Redux, Context API, Axios |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB ≥ 6.0

### Installation

```bash
git clone https://github.com/your-username/job-portal-backend.git
cd job-portal-backend
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/jobportal

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:5000/api/v1/auth/linkedin/callback

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

STORAGE_DRIVER=local
UPLOAD_DIR=./uploads

CLIENT_URL=http://localhost:3000
```

### Run

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Tests
npm test

# Seed an admin account
npm run seed
```

---

## 📡 API

**Base URL:** `/api/v1`
Full contract → [`API_CONTRACT.md`](./API_CONTRACT.md)

---

## 🗄️ Database

17 collections. Full schema → [`DATABASE_CONTRACT.md`](./DATABASE_CONTRACT.md)

`Users` · `CandidateProfiles` · `RecruiterProfiles` · `Companies` · `Jobs` · `Applications` · `Interviews` · `Resumes` · `SavedJobs` · `CompanyFollowers` · `UserPreferences` · `Notifications` · `Conversations` · `Messages` · `JobAnalytics` · `Tokens` · `AuditLogs`

---

## 🔒 Role Permissions

| Module | JOB_SEEKER | RECRUITER | COMPANY_ADMIN | ADMIN |
|---|---|---|---|---|
| View & Search Jobs | ✅ | ✅ | ✅ | ✅ |
| Apply / Save Jobs | ✅ | ❌ | ❌ | ❌ |
| Manage Resume / Preferences | ✅ | ❌ | ❌ | ❌ |
| Create & Manage Jobs | ❌ | ✅ (own) | ✅ | ✅ |
| Manage Applications & Interviews | ❌ | ✅ | ✅ | ✅ |
| Create & Manage Company | ❌ | ❌ | ✅ | ✅ |
| View Analytics | ❌ | ✅ (own) | ✅ (company) | ✅ (platform) |
| Approve Companies & Jobs, Moderate Users | ❌ | ❌ | ❌ | ✅ |

---

## 📚 Related Documents

| Document | Purpose |
|---|---|
| [`PRD.md`](./PRD.md) | Product requirements, scope, personas, NFRs |
| [`DATABASE_CONTRACT.md`](./DATABASE_CONTRACT.md) | Full MongoDB schema, indexes, relationships |
| [`API_CONTRACT.md`](./API_CONTRACT.md) | Full REST API request/response contracts |
| [`JIRA_STORIES.md`](./JIRA_STORIES.md) | Epics, stories, subtasks, story points, sprint plan |
| [`FOLDER_STRUCTURE.md`](./FOLDER_STRUCTURE.md) | Production-grade backend folder structure |

---

## 📝 How to Update This README

1. Finish a story and merge it.
2. Check the corresponding box under [Story Completion Checklist](#-story-completion-checklist).
3. Update **Current Sprint** and **Overall Progress** at the top.
4. Move any newly-shipped feature bullets from "Planned Features" into a new "✅ Shipped" section (create it once the first story ships).
5. Commit with a message like `docs: mark story 1.1 complete` and push.

---

## 📝 License

This project is licensed under the [MIT License](./LICENSE).

---

> Built with ☕ and a lot of MongoDB indexes.
