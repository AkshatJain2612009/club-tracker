# ♣️ MSOT Club Activities Tracker

A professional, full-stack co-curricular management platform designed for MSOT Academy to track club memberships, verify session attendance, and generate academic transcripts.

## 🚀 Features
- **Admin Control Panel**: Manage campuses, create clubs, and plan verified activities.
- **Verified Check-in**: Secure attendance system using unique session codes to prevent fraud.
- **Submission Portal**: Students can submit deliverable links (PPTs/Code) for every activity.
- **Evaluation System**: Coordinators can grade submissions and provide feedback.
- **Digital Transcript**: Auto-generated, print-ready co-curricular records for students.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript.
- **Backend**: Supabase (PostgreSQL, Auth, Storage).
- **Deployment**: Vercel (Frontend) & Supabase (Database).

## 📋 Project Structure
- `/app` : Core pages (Admin, Student, Login, Transcript).
- `/components` : Reusable UI components (Navbar).
- `/lib` : Supabase client configuration.

## ⚙️ Local Setup
1. Clone the repo: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add:
   - `NEXT_PUBLIC_SUPABASE_URL=your_url`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key`
4. Run the app: `npm run dev`
5. Open `http://localhost:3000`

## 🧪 Testing Status
- [x] Calculation Accuracy (Scores & Attendance)
- [x] Role-Based Access Control (Admin vs Student)
- [x] Verified Check-in Logic (Secret Codes)
- [x] PDF Transcript Generation
