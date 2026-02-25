# ResumePro - Modern Resume Builder

ResumePro is a high-impact, professional resume builder that helps you create stunning resumes in minutes. Choose from 15 beautiful templates and export your perfect resume to PDF.

## 🚀 Key Features

- **15+ Stunning Templates**: From minimal to creative, tech to executive styles.
- **Real-time Preview**: See changes instantly as you type.
- **Multi-page PDF Export**: High-quality PDF generation supporting multiple pages.
- **Smart Sections**: Dedicated areas for experience, education, skills, projects, and hobbies.
- **Modern UI/UX**: Built with React, TailwindCSS, and Framer Motion for a smooth editing experience.
- **Secure Data Storage**: Built-in authentication and PostgreSQL storage for your documents.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Radix UI, Framer Motion, TanStack Query
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js (Local Strategy)
- **Styling**: TailwindCSS with Custom Theming

## 🏃 How to Run Locally

### 1. Prerequisites
- Node.js (v18 or later)
- PostgreSQL database

### 2. Setup Environment
Create a `.env` file in the root directory (or use Replit Secrets) with:
```env
DATABASE_URL=your_postgresql_connection_string
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Migration
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5000`.

## 🏗 Project Structure

- `client/`: React frontend (Vite-powered)
- `server/`: Express backend and API routes
- `shared/`: Shared TypeScript types and Drizzle schemas
- `attached_assets/`: Static assets and icons

## 📄 License
© 2024 ResumePro. All rights reserved.
