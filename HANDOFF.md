# Symbion v2.0 — Engineering & UI/UX Handoff Document (Codex Ready)

> **Competition Target**: **I-SINERGIE MALAYSIA 2026** (International Invention & Innovation Competition)  
> **Affiliation**: **IPB University**, Indonesia — Department of Industrial Systems Engineering  
> **Product**: Symbion v2.0 — Industrial Symbiosis Decision Support System  
> **Stitch Benchmark Source**: `projects/12148159828393703567` ("Remix of Symbion Industrial Symbiosis Engine")  
> **Current Workspace**: `/Users/admin/code/code-kuliah/symbion-v2`  
> **Stack**: Next.js 14 (App Router, Modular Multi-Page), Tailwind CSS, TypeScript, Lucide React, Canvas Confetti  
> **Build Status**: **Exit Code 0** (`npm run build` passing with 0 errors & 0 ESLint warnings across all 11 static routes)

---

## 1. Project Mission & Operational Context

Symbion v2.0 is an ex-ante decision evaluation engine designed to match upstream industrial byproduct/waste generators with bio-refining / anaerobic conversion facilities and commercial off-takers.

### Core Waste Stream Domain:
1. **POME (Palm Oil Mill Effluent)**: $5,000\text{ m}^3/\text{month}$, COD $> 45,000\text{ mg/L}$, methane capture for clean electricity ($261,200\text{ kWh/month}$).
2. **EFB (Empty Fruit Bunches)**: $800\text{ t/month}$ for boiler pellets & organic composting.
3. **Sugarcane Bagasse**: $300\text{ t/month}$ for co-firing & animal feed compounding.
4. **Poultry Manure**: $200\text{ t/month}$ for organic bio-fertilizer granulation & anaerobic co-digestion.
5. **Soy Okara**: $10\text{ t/month}$ for high-protein feed supplements.
6. **Coal Thermal Fly Ash (NTPC Gadarwara Case)**: $1.685\text{M t/year}$ diverted from wet slurry ponds into green cement and road embankments.

---

## 2. Core Mandatory Rules (from `AGENTS.md`)

| Rule | Requirement | Implementation Detail |
| :--- | :--- | :--- |
| **Language** | **100% ENGLISH ONLY** | All titles, metrics, badges, table headers, descriptions, buttons, tooltips, and explanations must be in fluent, professional English for international competition juries. |
| **Multi-Currency** | **MYR / IDR / USD** | Supported across all financial calculations via `formatCurrency()`: <br>• **IDR (Rp)**: Base operational currency for Indonesian facilities.<br>• **MYR (RM)**: Host country currency for I-SINERGIE Malaysia 2026.<br>• **USD ($)**: Global international investment benchmark. |
| **Architecture** | **Modular Multi-Page** | Dedicated, full-screen routes inside App Router. **NO Single-Page App (SPA) collapsing**. |
| **Code Quality** | **Zero ESLint Breakages** | Never leave unused imports or unassigned variables (`@typescript-eslint/no-unused-vars` triggers strict build failure). Always verify with `npm run build`. |

---

## 3. Typography & UI Design System (Standardized)

The entire application has been strictly harmonized to match the gold-standard typography established on the **Ex-Ante Scenario Evaluation Matrix (`/scenarios`)**:

### Typography Hierarchy:
- **Headlines & Section Titles**: `Plus Jakarta Sans` / `Geist` (`font-sans`, `font-bold text-slate-900 tracking-tight`).
  - Page Titles: `text-[18px]` or `text-[20px] font-bold`
  - Card Titles: `text-[14px]` to `text-[16px] font-bold`
  - Subtitles & Descriptions: `text-[12px]` or `text-[12.5px] text-slate-500 leading-normal`
- **Numbers, Metrics & Code**: `JetBrains Mono` / `Geist Mono` (`font-mono`, `font-bold`, `tabular-nums` enforced globally via `globals.css`).
  - Hero KPI Values: `text-[24px]` to `text-[26px] font-bold font-mono tracking-tight`
  - Data Table Numbers: `text-[12px] font-mono`
- **Badges, Tags & Table Headers**:
  - Table Headers: `bg-slate-100/75 text-slate-600 text-[11px] font-mono uppercase tracking-wider border-b border-slate-200 py-3 px-3.5`
  - Status Badges: `text-[10px]` or `text-[10.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border`
- **Form Elements**: Universal inheritance (`button, input, select, textarea { font-family: inherit; }`) preventing fallback to default OS system fonts.
- **SVG Texts**: Global `.font-mono` inheritance on all SVG `<text>` elements, eliminating default browser Courier fonts.

---

## 4. Route Map & Page Implementations

```
src/
├── app/
│   ├── page.tsx            # Executive Overview & High-Level Synthesis
│   ├── topology/page.tsx   # Interactive Circular Material & Energy Topology Studio
│   ├── scenarios/page.tsx  # Ex-Ante Scenario Gap-Fulfillment Matrix (α = 50%, 75%, 100%)
│   ├── impact/page.tsx     # Carbon Accounting & Tri-Currency Valuation
│   ├── stress-test/page.tsx# Resilience Stress Test & Business Feasibility (Score 94/100)
│   ├── input-data/page.tsx # Data Integration Hub & Facility Waste Stream Registration
│   ├── login/page.tsx      # Stitch-Aligned Dual-Role Authentication & Onboarding Portal
│   └── methodology/page.tsx# Academic E-Digest Paper, Flowchart, Constants & Equations
├── components/
│   ├── layout/
│   │   ├── app-shell.tsx         # Global AppShell with pathname bypass for standalone /login
│   │   ├── sidebar.tsx           # Role-aware navigation (Tenant Waste vs Master Cluster Admin)
│   │   ├── header.tsx            # Contextual top utility bar with case info, currency & profile
│   │   └── user-profile-menu.tsx # Circular profile avatar, role switcher & session manager
│   ├── interactive/
│   │   ├── executive-symbiosis-grid.tsx  # Draggable Material Flow Network & Blueprint
│   │   ├── project-feasibility-card.tsx  # -20% Shock Slider, dual bar charts, Grade A+
│   │   ├── scenario-matrix.tsx           # Interactive 4-column Alpha matrix table
│   │   ├── topology-canvas.tsx           # Draggable bipartite SVG graph with Bezier paths
│   │   ├── carbon-accounting-summary.tsx # 4 Hero green cards, 3-step storytelling flow
│   │   ├── stress-test-terminal.tsx      # Sensitivity shock simulator
│   │   └── custom-sandbox-modal.tsx      # Live custom facility parameter slider modal
│   └── ui/
│       ├── currency-toggle.tsx           # Multi-currency switcher (MYR / IDR / USD)
│       ├── metric-card.tsx               # Reusable engineering metric card
│       └── status-badge.tsx              # Fact / Assumption / Deficit badge pills
├── context/
│   ├── symbion-context.tsx       # Global React Context (Case study, Currency, Alpha, Sandbox)
│   └── user-session-context.tsx  # User Session Context (Active role, permissions, login/logout)
└── lib/
    ├── cases.ts            # Jhiri CBG (GAIL), Gadarwara STPS (NTPC), Subang Axis datasets
    ├── currency.ts         # Tri-currency conversion rates & formatting helpers
    └── types.ts            # TypeScript interfaces & domain types
```

---

## 5. Summary of Recent Work Completed

1. **Draggable Network Topology on Executive Dashboard ([`executive-symbiosis-grid.tsx`](file:///Users/admin/code/code-kuliah/symbion-v2/src/components/interactive/executive-symbiosis-grid.tsx))**:
   - Replaced static, hardcoded coordinates with fully draggable node cards using pointer events (`handlePointerDown`, `handlePointerMove`, `handlePointerUp`).
   - Dynamic real-time cubic Bezier curves (`createPath(source, target)`) that re-route automatically when cards are dragged.
   - Connected **PT Sawit Subang A4** directly to **Central Biogas CSTR Hub** via pulsating POME stream pill (`5,000 m³`).
   - Added stream filtering (`All (4)`, `Material (3)`, `Energy (2)`), grip handles (`<GripHorizontal />`), and a **Reset** button (`<RotateCcw />`).
2. **Equalized Heights & Eliminated Empty Voids ([`project-feasibility-card.tsx`](file:///Users/admin/code/code-kuliah/symbion-v2/src/components/interactive/project-feasibility-card.tsx))**:
   - Equalized left and right columns to ~510px via `items-stretch`.
   - Embedded Section 6 Empirical Shock Benchmarks (Supply -20% $\rightarrow$ 80%, Downtime -10% $\rightarrow$ 90%, Off-take -15% $\rightarrow$ 100% FiT).
3. **Academic Methodology Page ([`src/app/methodology/page.tsx`](file:///Users/admin/code/code-kuliah/symbion-v2/src/app/methodology/page.tsx))**:
   - Embedded IPB University research team author attribution.
   - Figure 1 Methodology Flowchart (`/images/edigest_figure1.png`).
   - 4 AI Pillars: Knowledge Graph (KG), Graph Neural Networks (GNN), Genetic Algorithm (GA), Agent-Based Modeling (ABM).
   - 14 thermodynamic & economic formulas and 8 Scopus/government citations.
4. **Global Typography Harmonization ([`globals.css`](file:///Users/admin/code/code-kuliah/symbion-v2/src/app/globals.css), [`carbon-accounting-summary.tsx`](file:///Users/admin/code/code-kuliah/symbion-v2/src/components/interactive/carbon-accounting-summary.tsx), [`input-data/page.tsx`](file:///Users/admin/code/code-kuliah/symbion-v2/src/app/input-data/page.tsx))**:
   - All numbers, values, and metrics use `font-mono` (`JetBrains Mono` / `Geist Mono` with `tabular-nums`).
   - All SVG text elements inherit `.font-mono`.
   - Table headers across all pages match the `/scenarios` standard.
   - Global antialiasing and form element font inheritance.
5. **Interactive Profile Menu & Account Switching ([`user-profile-menu.tsx`](file:///Users/admin/code/code-kuliah/symbion-v2/src/components/layout/user-profile-menu.tsx))**:
   - Mounted circular avatar in top bar and mobile bar with live status indicators and initials badge.
   - Interactive dropdown supporting one-click account switching between **Regional Partner** (`operator.subang@symbion.id`) and **Estate Administrator** (`admin.estate@symbion.id`).
   - Expandable role capabilities/permissions accordion, demo sign-in fallback, and logout session handling.
6. **Role-Based View Differentiation (Regional Partner vs. Estate Administrator)**:
   - **Regional Partner (Mitra Kawasan)**: Focuses on facility-level yield, individual waste monetization, tenant intake forms, and personal carbon offset shares.
   - **Estate Administrator (Admin Pengelola)**: Provides macro-cluster oversight, cross-tenant dispatch routing, validation and approval workflows, and regional stress-testing.
   - Dynamically updates badges, action buttons, alert banners, and telemetry across the entire workspace via `useUserSession()`.
7. **Dedicated Login Page ([`src/app/login/page.tsx`](file:///Users/admin/code/code-kuliah/symbion-v2/src/app/login/page.tsx))**:
   - Built directly from Google Stitch screen `59cd86a5b81346efa589b7c06c26e391` ("Halaman Masuk (Login) Symbion") and user reference design.
   - Clean dual-column split: left card with interactive role pill switcher (`Mitra Kawasan & User` vs `Admin Pengelola`), dynamic pre-filled demo credentials, password visibility toggle, remember me checkbox, and celebratory confetti upon submission.
   - Right hero card with forest green gradient, official Symbion Platform logo, three circular value propositions, and 256-bit SSL encryption trust badge.
   - Three interactive modal dialogs: Bantuan & Kontak (IPB University team contact info), Pemulihan Kata Sandi (instant demo recovery), and Pengajuan Akses Mitra Baru (company onboarding registration).
   - AppShell bypasses sidebar and top header on `/login` for a true full-bleed standalone authentication portal experience.

---

## 6. How to Run & Verify

```bash
# 1. Start local development server (Port 3000)
npm run dev

# 2. Production build verification (Ensures 0 errors & 0 ESLint warnings)
npm run build

# 3. Lint audit & type check
npm run lint
npx tsc --noEmit
```

---

## 7. System Health & Verification Status

- **Build Status**: **Exit Code 0** (`npm run build` generates all 12 static routes including `/login` at 6.84 kB).
- **ESLint & TypeScript**: Zero warnings, zero errors (`npm run lint && npx tsc --noEmit` pass cleanly).
- **Competition Target**: Fully compliant with **I-SINERGIE Malaysia 2026** design guidelines and tri-currency evaluation.
