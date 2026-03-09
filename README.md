Project Overview

Fina is a simple personal finance dashboard built with React and Vite.
It helps users track their income, expenses, and monthly budget in a clear and visual way.

The goal of this project is to make it easy for users to understand where their money goes each month and monitor their spending habits.

Tools Used

React

Vite

Tailwind CSS

Chart.js

date-fns

react-hot-toast

lucide-react icons

localStorage (for saving user data)

Main Features
Dashboard Overview

The dashboard shows a quick summary of financial activity including:

Total income

Total expenses

Net balance

Savings rate

Spending Chart

A donut chart displays how spending is distributed across categories.

Financial Trend Chart

A bar chart shows income vs expenses for the past six months so users can see spending patterns.

Budget Tracker

Users can set spending limits for different categories and track their progress using visual indicators.

Transaction Management

Users can:

Add transactions

Delete transactions

Search transactions

Filter transactions by category

Monthly Navigation

Users can move between months to review previous financial records.

Data Persistence

All transaction data is saved in localStorage, so the data remains even after refreshing the browser.

Why I Built This Project

I built this project to practice creating a real-world financial dashboard using modern frontend tools.

The focus was on:

Clean and simple design

Clear data visualization

Smooth user experience

How to Run the Project

Install dependencies
npm install

Start development server
npm run dev

Open the app in the browser
http://localhost:5173



# Fina — Personal Finance Snapshot

A clean, polished personal finance tracker built with React, Tailwind CSS, and Chart.js.

## Live Demo
> Deploy to Vercel: `vercel --prod` or drag the `dist/` folder to netlify.com/drop

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

---

## What I Built

**Fina** is a personal finance dashboard focused on monthly visibility — you can see exactly where your money went, whether you're over budget, and how your habits have changed over the last 6 months.

### Design Choices

- **Cream/ivory background** instead of the typical dark or white — warmer, less clinical, easier on eyes during evening use
- **Playfair Display** for headings gives it a considered, editorial feel — money deserves considered typography
- **Donut + Bar combo** — donut shows proportion at a glance, bar chart tells the story over time
- **Budget editing inline** — hover a category row to reveal the edit icon; no modal needed for a quick limit update

### Features

- 📊 **Dashboard overview** — income, expenses, net balance, savings rate ring
- 🍩 **Spending donut chart** — category breakdown with proportions
- 📈 **6-month trend chart** — income vs expenses bar chart
- 🎯 **Budget tracker** — set limits per category, see colour-coded progress bars, over-budget alerts
- ➕ **Add transactions** — smooth modal, category grid picker, validation, toast confirmations
- 🔍 **Transaction list** — grouped by date, searchable, filterable by category, delete with hover action
- 🗓️ **Month navigation** — flip between months to review history
- 💾 **localStorage persistence** — all data survives page refresh, no backend needed
- 🌱 **Seed data** — pre-loaded with 3 months of realistic transactions so it looks great from the start

### Categories
Food & Dining · Transport · Housing · Entertainment · Health & Fitness · Shopping · Other · Income

---

## What I'd Improve With More Time

1. **Recurring transactions** — Mark a transaction as monthly recurring so you don't have to re-add rent every month
2. **Export to CSV** — Let users download their data
3. **Goal tracking** — "Save $2,000 by December" progress widget
4. **Multi-currency** — Currency selector with live conversion rates
5. **Better mobile experience** — Swipe to delete on transactions, native date picker optimisations
6. **Dark mode** — The colour system is set up for it (CSS variables), just needs a toggle
7. **Analytics tab** — Year-over-year comparison, spending velocity, predictive end-of-month balance

---

## Challenges

- **Chart.js with React 18 Strict Mode** — Double-render in development causes canvas flicker. Solved by using `react-chartjs-2` wrapper which handles canvas cleanup.
- **Date grouping** — Getting transactions grouped by day in the correct timezone without shifting dates. Used `date-fns` `parseISO` consistently to avoid UTC/local issues.
- **Budget edit UX** — Deciding between a modal vs inline edit. Chose inline (hover → reveal → click to edit → enter to save) because budget tweaks should be fast and contextual.

---

## Time Spent

| Task | Time |
|------|------|
| Design system & layout | 1.5h |
| Data layer (hooks, utils, seed data) | 1h |
| Charts (Donut + Trend) | 1h |
| Budget panel | 45min |
| Transaction list + search | 1h |
| Add transaction modal | 1h |
| Polish, animations, responsive | 45min |
| README | 15min |
| **Total** | **~7.5h** |

---

## Tech Stack

- **React 18** — Hooks-based, no Redux needed
- **Tailwind CSS 3** — Utility-first, custom design tokens in config
- **Chart.js 4 + react-chartjs-2** — Donut (spending) + Bar (trend)
- **date-fns** — Date manipulation without the moment.js bundle
- **react-hot-toast** — Lightweight toast notifications
- **lucide-react** — Clean SVG icons
- **Vite 5** — Fast dev server and builds
- **localStorage** — Zero-backend persistence

---

*Built with care for the Frontend Developer Evaluation Assessment.*
