# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


# 🚀 Tech-Tonic Workplace

An AI-powered full-stack SaaS platform that transforms GitHub repositories into meaningful insights using modern cloud technologies and generative AI.

🔗 **Live Demo:** https://tech-tonic-workplace.vercel.app/

---

## 📌 Overview

Tech-Tonic Workplace is designed to bridge the gap between raw GitHub data and actionable project intelligence. It helps developers, teams, and managers understand codebases quickly through AI-driven summaries, analytics dashboards, and interactive Q&A.

---

## ✨ Features

### 🤖 AI-Powered Intelligence

* AI-based commit summarization
* Repository Q&A chatbot (Repo-Chat)
* Semantic code understanding
* Voice-to-text summaries using AssemblyAI

### 📊 Analytics & Dashboards

* Commit trend analysis
* Contributor heatmaps
* File churn metrics
* Project activity tracking

### 👥 Team Collaboration

* Multi-workspace management
* Role-based access control
* Shared insights across teams

### 💳 SaaS Functionality

* Subscription plans (Free, Pro, Team)
* Stripe payment integration
* Secure authentication

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React
* Tailwind CSS
* Shadcn UI

### Backend / APIs

* Google Gemini AI
* AssemblyAI
* GitHub API

### Database & Auth

* NeonDB (PostgreSQL)
* Firebase Authentication

### Deployment

* Vercel

---

## ⚙️ How It Works

1. User connects their GitHub repository
2. System fetches commits and metadata
3. AI analyzes code and generates summaries
4. Dashboards visualize project insights
5. Users can ask questions about the repository

---

## 📂 Project Structure (Simplified)

```
/app
/components
/hooks
/lib
/server
/actions
```

---

## 🎯 Objectives

* Automate code understanding using AI
* Reduce manual effort in analyzing commits
* Provide real-time project insights
* Improve team collaboration

---

## 📈 Use Cases

* Developers understanding large codebases
* Project managers tracking progress
* Teams collaborating on analytics
* Students learning from repositories

---


## 🧪 Installation (For Local Setup)

```bash
git clone https://github.com/your-repo-link
cd tech-tonic-workplace
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file and add:

```
GEMINI_API_KEY=
DATABASE_URL=
FIREBASE_CONFIG=
STRIPE_SECRET_KEY=
```

---

## 📸 Live Preview

👉 https://tech-tonic-workplace.vercel.app/

---

## 📚 References

* Next.js Documentation
* React Documentation
* Gemini AI API
* AssemblyAI
* Stripe
* GitHub API

---


⭐ If you like this project, give it a star!

