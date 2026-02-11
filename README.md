<div align="center">
  <h1>Personal Finance App</h1>
  <p><strong>A full-stack personal finance management application built with modern web technologies</strong></p>

  <p>
    <a href="https://personal-finance-app-ookl.vercel.app/">View Demo</a>
    ·
    <a href="#features">Features</a>
    ·
    <a href="#architecture">Architecture</a>
    ·
    <a href="#installation">Installation</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.1-black?logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Neon-Serverless_Postgres-00E5CC?logo=postgresql" alt="Neon" />
    <img src="https://img.shields.io/badge/Zod-3-3E67B1?logo=zod" alt="Zod" />
  
  </p>
</div>

---

## Overview

A comprehensive personal finance management application that helps users track expenses, manage budgets, monitor savings goals, and stay on top of recurring bills. Built as a solution to the [Frontend Mentor Personal Finance App Challenge](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1), this project demonstrates production-ready patterns and modern React architecture.

<div align="center">
  <img src="public/assets/images/overview.png" alt="Dashboard Overview" width="800" />
</div>

---

## Features

### Core Functionality

#### Dashboard

At-a-glance overview of balances, recent transactions, budgets, and savings

#### Transactions

Full transaction history with search, sort, filter, and pagination

#### Budgets

Create and manage spending limits by category with visual progress tracking

#### Savings Pots

Set savings goals, add/withdraw funds, and track progress

#### Recurring Bills

Monitor upcoming, paid, and due-soon bills

### Technical Highlights

- **Server-Side Rendering** with Next.js App Router for optimal performance
- **Serverless PostgreSQL** with Neon for scalable data persistence
- **Secure Authentication** with NextAuth.js (Auth.js)
- **Type-Safe** throughout with TypeScript strict mode
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Keyboard Accessible** following WCAG 2.1 AA standards
- **Dark Mode/Light Mode**

### Tech Stack

#### Frontend

- **Next.js 16** — React framework with App Router, Server Components, Server Actions
- **React 19** — UI library with latest features
- **TypeScript 5** — Type safety with strict mode
- **Tailwind CSS 4** — Utility-first styling
- **Zod 3** — Schema-based form validation
- **Chart.js** — Data visualization for budgets

#### Backend & Data

- **Neon** — Serverless PostgreSQL database with autoscaling
- **NextAuth.js (Auth.js)** — User authentication and session management
- **Next.js Server Actions** — Type-safe API mutations

#### Tools

- **Jest** — Unit and integration testing
- **Playwright** — End-to-end testing
- **React Testing Library** — Component testing
- **ESLint** — Code linting
- **Prettier** — Code formatting
- **Turbopack** — Fast development builds

---

## Architecture

### Design Patterns Used

| Pattern                      | Implementation                    | Location                                 |
| ---------------------------- | --------------------------------- | ---------------------------------------- |
| **Data Access Layer**        | Centralized CRUD functions        | `src/lib/data.ts`                        |
| **Singleton Factory**        | Lazy database client creation     | `src/lib/db.ts`                          |
| **Compound Components**      | Card, Pagination components       | `src/components/ui/`                     |
| **Strategy**                 | Recurring bills categorization    | `src/lib/calculateRecurringBillsData.ts` |
| **Command**                  | Server Actions for auth mutations | `src/lib/actions.ts`                     |
| **Container/Presentational** | Server/Client component split     | Throughout `src/app/`                    |
| **Schema Validation**        | Zod schemas for form validation   | `src/lib/validations.ts`                 |

### Project Structure

```
src/
├── app/                                  # Next.js App Router
│   ├── layout.tsx                        # Root layout (providers, theme)
│   ├── page.tsx                          # Landing / redirect page
│   ├── globals.css                       # Global styles
│   ├── login/page.tsx                    # Login page
│   ├── signup/page.tsx                   # Signup page
│   ├── auth/[...nextauth]/route.ts       # NextAuth route handler
│   ├── api/                              # REST API routes
│   │   ├── balance/route.ts
│   │   ├── budgets/route.ts
│   │   ├── categories/route.ts
│   │   ├── pots/route.ts
│   │   ├── pots/[potId]/route.ts         # CRUD per pot
│   │   ├── pots/[potId]/add/route.ts
│   │   ├── pots/[potId]/withdraw/route.ts
│   │   └── transactions/route.ts
│   ├── dashboard/                        # Protected routes
│   │   ├── layout.tsx                    # Dashboard layout with sidebar
│   │   ├── page.tsx                      # Overview page
│   │   ├── components/                   # Dashboard section components
│   │   │   ├── BalanceSection.tsx
│   │   │   ├── BudgetsSection.tsx
│   │   │   ├── PotsSection.tsx
│   │   │   ├── RecurringBillsSection.tsx
│   │   │   └── TransactionsSection.tsx
│   │   ├── budgets/page.tsx              # Budget management
│   │   ├── pots/page.tsx                 # Savings pots
│   │   ├── transactions/page.tsx         # Transaction history
│   │   └── recurring-bills/page.tsx      # Bill tracking
│   └── ui/                               # Feature-specific components
│       ├── modal.tsx                      # Shared modal component
│       ├── budgets/                       # Budget cards, modals, charts
│       ├── dashboard/                     # Sidemenu, nav, widgets, skeletons
│       ├── pots/                          # Pot cards, add/withdraw modals
│       ├── recurring-bills/               # Bills table, summary, search/sort
│       └── transactions/                  # Table, pagination, filters
├── components/ui/                        # Reusable base components (shadcn/ui)
│   ├── button.tsx                        # Variant-driven button (CVA)
│   ├── card.tsx                          # Compound card component
│   ├── input.tsx, select.tsx, label.tsx   # Form primitives
│   └── ...                               # 12+ base components
├── lib/
│   ├── data.ts                           # Data access layer (20+ CRUD functions)
│   ├── db.ts                             # Singleton Postgres client factory
│   ├── actions.ts                        # Server Actions (auth mutations)
│   ├── validations.ts                    # Zod schemas for form validation
│   ├── client-data.ts                    # Client-side data fetching
│   ├── calculateRecurringBillsData.ts    # Bill categorization logic
│   ├── definitions.ts                    # TypeScript interfaces & types
│   ├── utils.ts                          # Utilities (cn, pagination, formatting)
│   └── getBaseUrl.ts                     # Base URL helper
├── auth.ts                               # NextAuth.js configuration
├── auth.config.ts                        # Auth providers config
├── middleware.ts                          # Auth middleware (route protection)
├── utils/db/
│   └── client.ts                         # API client helper
└── __tests__/                            # Unit & integration tests
    ├── login.test.tsx                    # Auth form tests
    ├── signup.test.tsx                   # Signup form tests
    ├── actions.test.ts                   # Server actions tests
    ├── DashboardPage.test.tsx            # Dashboard integration tests
    ├── BudgetClient.test.tsx             # Budget component tests
    ├── PotsPage.test.tsx                 # Pots feature tests
    ├── api-*.test.ts                     # API route tests
    └── utils.test.ts                     # Utility function tests
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun
- Neon account (free tier available)

### Installation

### Clone the repository

```
git clone https://github.com/atripunoska/personal-finance-app.git
cd personal-finance-app
```

### Install dependencies

`npm install`

### Set up environment variables

Create a `.env.local` file in the project root with the following variables:

```env
# Neon Database — https://neon.tech
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

# NextAuth.js — generate with: openssl rand -base64 33
AUTH_SECRET=your-secret-key-here
```

### Database Setup

1. Create a new project on [Neon](https://neon.tech) (free tier available)
2. Copy your connection string to `DATABASE_URL`
3. Create the required tables: `balance`, `budgets`, `pots`, `transactions`

## Development

### Start development server (with Turbopack)

`npm run dev`

### Type checking

`npm run type-check`

### Linting

`npm run lint`

### Format code

`npm run format`

### Production Build

```
npm run build
npm run start
```

### Testing

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm test -- --coverage    # Coverage report
```

### Accessibility

This application follows WCAG 2.1 AA guidelines:

- Keyboard Navigation: All features accessible via keyboard
- Semantic HTML: Proper heading hierarchy, landmarks, and ARIA labels
- Screen Reader Support: Descriptive labels and live regions
- Color Contrast: Meets AA contrast ratios (verified with Lighthouse)
- Focus Management: Visible focus indicators on all interactive elements

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Frontend Mentor for the challenge design
- shadcn/ui for the component primitives
- Neon for serverless PostgreSQL
- Vercel for hosting

## Author

**Ana Tripunoska**

- Portfolio: [anatripunoska.com](https://www.anatripunoska.com/)
- Frontend Mentor: [@atripunoska](https://www.frontendmentor.io/profile/atripunoska)
- GitHub: [@atripunoska](https://github.com/atripunoska)
