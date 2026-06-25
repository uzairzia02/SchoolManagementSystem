# School ERP Management System

A production-grade, multi-tenant School ERP platform supporting academic management, admissions, attendance, examinations, grading, finance, HR, communication, reporting, file management, and public website functionality.

## Features

- **Multi-tenant Architecture** - Isolated data per school with shared infrastructure
- **Role-Based Access Control** - 8 roles with granular permissions
- **Secure Authentication** - NextAuth with JWT, OAuth2, MFA support
- **Comprehensive Modules** - Student, Teacher, Parent, Attendance, Timetable, Exams, Grading, Fees, HR, and more

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (NeonDB)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI**: shadcn/ui + Tailwind CSS
- **Deployment**: Vercel

## Documentation

- [Constitution](../.specify/memory/constitution.md)
- [Specifications](../specs/)
- [Implementation Plan](../plans/school-erp-implementation-plan.md)

## License

MIT