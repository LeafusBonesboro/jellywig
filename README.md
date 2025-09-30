# Fantasy Football Yahoo App (Working Title)

## Overview
This project is a rebuilt version of my previous Yahoo Fantasy integration, originally built with React + Flask + Render. The new version uses **Next.js + Vercel + Neon** for a cleaner architecture and easier auth, data fetching, and UI work.

The goal is to pull my Yahoo Fantasy Football league data (especially my team) and display useful stats, including PF/PA, weekly trends, standings, and projections.

---

## Current Status
- Planning + requirements phase
- Tech stack chosen
- OAuth strategy confirmed (Yahoo app will be reused)
- Database selected (Neon for Postgres)

---

## Tech Stack
- **Next.js** (App Router)
- **TailwindCSS** (and possibly Shadcn/UI)
- **Vercel** for deployment + API routes
- **Neon** for token + data storage
- **Yahoo OAuth 2.0** for league/team access

---

## Upcoming Tasks
1. Finalize initial UI layout (MVP screen priorities)
2. Create Next.js project + GitHub repo
3. Set up `.env.local` with:
   - `YAHOO_CLIENT_ID`
   - `YAHOO_CLIENT_SECRET`
   - `YAHOO_REDIRECT_URI`
   - `DATABASE_URL`
4. Define `/api/auth/yahoo` for token exchange
5. Connect Neon and create table for tokens
6. First API call: fetch my team data

---

## Longer-Term Features
- League-wide PF/PA + Luck Index
- Power rankings
- Weekly charts & projections
- Notifications / AI analysis
- Support for multiple teams or leagues

---

## Notes
This rewrite is meant to avoid the previous “spaghetti” structure and leverage what I’ve learned using Next.js. OAuth and DB integration will be cleaner and modular this time around.
