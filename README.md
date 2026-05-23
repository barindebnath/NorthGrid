# NorthGrid

A real-time sustainability intelligence platform designed for Danish companies and environmentally conscious individuals. Built with a Scandinavian design philosophy ("Calm Infrastructure"), it balances real-time Denmark grid intelligence with carbon-aware employee commute tracking.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Variables-driven Light/Dark theme)
- **Charts**: Recharts
- **Icons**: Lucide React

---

## ⚙️ How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run dev server**:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view.

---

## 📊 Project Progress & Roadmap

Overall Completion: **~65%**

```
[█████████████░░░░░░░] 65% Completed
```

### ✅ What is Completed (Frontend & UI Logic)
All pages and UI components are fully implemented with responsive layouts, interactive charts, and client-side reactive state tracking (using `localStorage` events):
- **Layout & Navigation**: Responsive sidebar, mobile navigations, and client-controlled theme toggles (Light/Dark).
- **Dashboard (`/dashboard`)**: Dynamic carbon intensity, mix visualization, live feed, and ESG KPIs.
- **Energy (`/energy`)**: Live spot price trends (DKK/kWh) and grid balancing charts.
- **Mobility (`/mobility`)**: Custom commute logger drawer (dispatching events to update stats across the platform) and team rankings.
- **Reports (`/reports`)**: ESG Scope 1/2/3 tracking and PDF export layout.
- **Calculator (`/calculator`)**: Appliance cost and charging optimization simulator.
- **Settings (`/settings`)**: Profile and regional grid zone configuration.

### ⏳ Remaining / Incomplete Features
- **Database & Persistence**: Integration of PostgreSQL database and Drizzle ORM to store commute logs and user configurations (currently stored in `localStorage`).
- **Live APIs**:
  - Backend API endpoints (`/app/api/*`) for data mutations and retrieval.
  - Integration with Energinet API for live Danish energy pricing and real grid carbon intensity.
- **Testing**: Jest unit tests and Playwright End-to-End coverage.
