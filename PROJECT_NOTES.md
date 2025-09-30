

**PROJECT NAME:** Fantasy Football Yahoo App (Working Title)

---

## ✅ CURRENT GOAL

* Define project vision and UI layout before coding
* Identify MVP features
* Clarify display priorities for dashboard and league views

---

## ✅ TECH STACK (Planned)

**Framework:** Next.js (App Router)

**Styling:**

* TailwindCSS
* (Optional) Shadcn/UI

**State Management:**

* TBD (Minimal at start)

**Backend/API:**

* Next.js API Routes (Vercel serverless)

**Database:**

* Neon (PostgreSQL)

**Auth:**

* Yahoo OAuth 2.0

**Deployment:**

* Vercel

---

## ✅ WHAT'S DECIDED SO FAR

* Rebuild from scratch using Next.js instead of React+Flask
* Use Neon for token and data storage
* Reuse existing Yahoo app credentials
* Only update redirect URI for new deployment
* UI/UX will be prioritized before coding

---

## ✅ RECENT PROGRESS

* Clarified tech stack direction
* Confirmed Neon database
* Identified need for new redirect URI
* Established intention to focus on personal team data first
* Created project documentation outline

---

## 🎯 NEXT STEPS (Immediate)

* [x] Create project notes document (this file)
* [x] Draft README.md
* [ ] Define MVP dashboard layout (what shows first?)
* [ ] Name the project (optional for now)
* [ ] Initialize Next.js project locally
* [ ] Set up `.env.local` with placeholder variables

---

## 📌 FUTURE TASKS (Post-MVP Layout)

* Create OAuth route: `/api/auth/yahoo`
* Add Neon DB connection + token table
* Store access & refresh tokens with expiry
* Fetch and display personal team PF/PA + standings
* Build Dashboard Page (Week-by-week and totals)
* Build League Overview Page (sortable standings + luck index)

---

## 🧠 IMPORTANT NOTES / REMINDERS

* Redirect URI must match exactly in Yahoo app settings
* Avoid spaghetti structure: modular helpers (DB, Yahoo API)
* Focus on personal team view first
* UI first, features second
* Keep everything incremental and clean
