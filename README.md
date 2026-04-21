# 🦁 CSI Mascot Competition Voting App

A premium, high-fidelity voting platform built for the **CSI Mascot Design Competition**. This application allows students to cast their votes for the official mascot design with a focused, secure, and professional experience.

---

## ✨ Key Features

### 🗳️ Voting Experience
- **Premium UI/UX**: Built with a modern glassmorphism aesthetic, featuring smooth transitions and a "Light Mode Only" experience.
- **Concept Deep-Dive**: Integrated PDF viewer allowing voters to read the design concept before making a choice.
- **Mandatory Confirmation**: A two-step voting process with mandatory checkboxes to ensure absolute certainty.
- **One-Vote Protection**: Built-in verification to ensure each participant can only vote once.

### 🛡️ Security & Authentication
- **Institutional Access**: Registration is strictly restricted to users with the `@itbss.ac.id` email domain.
- **Supabase Auth**: Secure authentication and session management.
- **RLS Protection**: Row Level Security ensures users can only access their own data and view valid mascot entries.

### 🏢 Administrative Tools
- **Competition Console**: A dedicated dashboard for committee members.
- **Live Standings**: Track real-time vote updates and entry performance.
- **Entry Management**: Full CRUD capabilities for mascot candidates, including image and concept document (PDF) URLs.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Database Setup
Ensure your Supabase project has the following tables:
- `mascots`: `id`, `name`, `description`, `image_url`, `pdf_url`.
- `votes`: `id`, `user_id`, `mascot_id`, `created_at`.

Run this SQL to add the PDF support:
```sql
ALTER TABLE public.mascots ADD COLUMN IF NOT EXISTS pdf_url TEXT;
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Installation
```bash
npm install
npm run dev
```

---

## 📸 Screenshots
*(Add your screenshots here after deployment)*

---

## ⚖️ License
This project is developed by **Xenelly Dev** for the **CSI Organization**. All rights reserved &copy; 2026.
