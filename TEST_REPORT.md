# 🏗️ System Architecture Document

## 1. High-Level Design
The Club Activities Tracker is built as a decoupled Full-Stack application using a Client-Server architecture.

- **Client (Frontend)**: Next.js 14 using the App Router for fast routing and Tailwind CSS for a responsive, mobile-first UI.
- **Server (Backend-as-a-Service)**: Supabase provides a PostgreSQL database, Authentication, and Real-time data synchronization.

## 2. Data Flow (The Club Cycle)
1. **Infrastructure**: Admin creates `Campuses` $\rightarrow$ `Clubs`.
2. **Onboarding**: Students request to join $\rightarrow$ Admin approves `Memberships`.
3. **Execution**: Admin plans `Activities` with a `session_code` $\rightarrow$ Students enter code for `Attendance`.
4. **Evaluation**: Students upload `Submissions` $\rightarrow$ Admin assigns `Score` and `Feedback`.
5. **Certification**: The system aggregates all verified data into a `Transcript`.

## 3. Database Schema
- `profiles`: User roles and identification.
- `campuses`: Physical campus locations.
- `clubs`: Club details linked to campuses.
- `memberships`: Mapping students to clubs (Pending/Approved).
- `activities`: Planned events with verification codes.
- `attendance`: Verified check-in timestamps.
- `submissions`: Student deliverables and grades.
