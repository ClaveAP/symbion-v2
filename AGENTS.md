# AGENTS.md — Symbion v2.0 Operational Playbook & Design Rules

> **Competition Project**: Symbion v2.0 — Industrial Symbiosis Decision Support System  
> **Event Target**: **I-SINERGIE MALAYSIA 2026** (International Competition)  
> **Source of Truth**: Google Stitch Project `projects/12148159828393703567` ("Remix of Symbion Industrial Symbiosis Engine")  
> **Repository Workspace**: `/Users/admin/code/code-kuliah/symbion-v2`  
> **Core Stack**: Next.js 14 (App Router, Modular Multi-Page), Tailwind CSS, TypeScript, Lucide React, Canvas Confetti

---

## 1. Primary Objectives & Competition Mandate

1. **International Competition Standard**: Built to impress international judges and jury members at **I-SINERGIE Malaysia 2026**.
2. **Industrial Symbiosis Focus**: Decision engine matching industrial waste/byproduct generators (upstream) with bio-refining / anaerobic conversion (processing) and commercial off-takers (downstream).
3. **Core Empirical Research Cases (Published e-Digest)**:
   - **Case 1 (Input Deficit Anchor)**: **GAIL Compressed Biogas (CBG) Facility, Jhiri, Ranchi**:
     - Design capacity $150.0\text{ t/d}$ wet organic waste, operating at $80.0\text{ t/d}$ baseline supply ($53.33\%$ utilization, $70.0\text{ t/d}$ deficit).
     - Solved by integrating secondary agro-wholesale mandi waste ($+52.5\text{ t/d}$ at $\alpha = 75\%$, restoring utilization to $88.33\%$, $+65.6\%$ relative gain).
     - Environmental & economic returns: $1,685\text{ tCO}_2/\text{yr}$ avoided emissions, $1,650\text{ t/yr CBG}$ ($85,800\text{ GJ/yr}$), and ₹4.21 Crore/yr gross value.
   - **Case 2 (Output Surplus Sink)**: **NTPC Gadarwara Super Thermal Power Station (2 × 800 MW), Madhya Pradesh**:
     - $1.685\text{M t/yr}$ pulverized coal combustion fly ash generation.
     - $634.3\text{k t/yr}$ baseline utilized in PPC cement ($37.64\%$), leaving $1.05\text{M t/yr}$ unutilized in slurry dykes ($62.35\%$ surplus).
     - Target secondary symbiotic sinks: geopolymer bricks, road embankment, and precast civil works.

---

## 2. Language & Currency Rules

| Rule | Requirement | Implementation Detail |
| :--- | :--- | :--- |
| **UI Language** | **ENGLISH ONLY** | All titles, metrics, badges, table headers, descriptions, buttons, tooltips, and explanations must be presented in professional, fluent English. No unvetted Indonesian in competition views. |
| **Regional Context** | Allowed in proper nouns | Regional cluster names (e.g., *"Subang Smartpolitan Axis"*, *"PT Agro Sawit Jaya"*) are preserved as contextual case entities. |
| **Multi-Currency** | **MYR / IDR / USD (Option B)** | Supported across all financial calculations via `formatCurrency()`: <br>• **IDR (Rp)**: Base operational currency for Indonesian agro-industrial facilities.<br>• **MYR (RM)**: Host country currency for I-SINERGIE Malaysia 2026.<br>• **USD ($)**: Global international investment benchmark. |

---

## 3. UI, UX & Visual Design System (Anti-AI-Slop Rules)

### Typography Hierarchy (8-Point Golden Ratio Scale)
- **Headlines & Big Numbers**: `Hanken Grotesk` (font-semibold / font-bold, tracking-tight, crisp and modern).
- **Body Text & Descriptions**: `Inter` (clean line-height, high readability, balanced contrast).
- **Metrics, Counters & Code**: `JetBrains Mono` (engineering precision, fixed-width clarity).
- **Font Scale Progression**:
  - `label-sm`: 10px / 14px (uppercase, tracking-wider, font-bold)
  - `label-md`: 12px / 16px
  - `body-sm`: 11px / 15px
  - `body-md`: 13px / 18px
  - `body-lg`: 14px / 20px
  - `headline-sm`: 15px / 20px
  - `headline-lg`: 18px – 20px / 26px
  - `headline-xl`: 26px – 28px / 34px

### Spatial Rhythm (4px / 8px Comparison Grid)
- **Rule**: Box spacing, margins, and paddings must follow multiples of 4 and 8:
  - `gap-1` / `p-1`: 4px
  - `gap-2` / `p-2`: 8px
  - `gap-3` / `p-3`: 12px
  - `gap-4` / `p-4`: 16px
  - `gap-6` / `p-6`: 24px
  - `gap-8` / `p-8`: 32px
- Maintain harmonious whitespace so cards breathe without wasting viewport height.

### Color Palette (Stitch Brand Signature)
- **Primary Green**: `#2c7a4b` (forest green, high-contrast CTA and active highlights).
- **Deep Primary**: `#086135` / `#14503f` (headers, dark states).
- **Mint & Highlights**: `#7fb8a3`, `#a4f4ba`, `#b7ffc9` (subtle badges, light fills).
- **Backgrounds**: Crisp white `#ffffff` for elevated cards, soft background `#f7f9fb` / `#f8fafc`.
- **Borders**: Clean technical borders `border-slate-200` with subtle shadows `shadow-xs` / `shadow-sm` (avoid muddy AI blur drop-shadows).
- **Semantic Colors**:
  - Emerald (`text-emerald-700`, `bg-emerald-50`): Verified, circular, positive yield.
  - Rose (`text-rose-700`, `bg-rose-50`): Deficit, shock scenario, untamed waste.
  - Amber (`text-amber-700`, `bg-amber-50`): Processing, pending survey, warning.
  - Sky (`text-sky-700`, `bg-sky-50`): Biogas flow, energy dispatch, surplus sinks.

### UX Cognitive Load & Information Hierarchy
- **Rule**: *"Hindari terlalu banyak informasi (too much information) karena user/juri pasti bingung mau baca yang mana dulu."*
- **Layout Principle**:
  1. **Top Glance**: 3–4 High-impact KPI summary cards with bold numbers and units.
  2. **Core Interactive Zone**: Draggable canvas, shock slider, or simulation calculator.
  3. **Structured Breakdown**: 2-column or 3-column split with clear visual containers.
  4. **Progressive Detail**: Collapsible accordions or modals for complex engineering equations and legal citations.

### Interactivity & Dynamism ("Bikin Juri Melirik!")
- **Do not render static mockup shells**. Every module must feel alive:
  - **Draggable Canvas**: Material flow nodes can be repositioned with real-time Bezier curve re-routing.
  - **Interactive Shock Sliders**: Dynamically re-compute volume and revenue bars from 0% to -80%.
  - **Live Scenario Alpha Toggle**: Seamless switching across $\alpha = 50\%, 75\%, 100\%$.
  - **Interactive Forms**: Instant tag insertion, live capacity estimators, filterable tables, and celebratory micro-interactions (`canvas-confetti` on verification).

---

## 4. Modular Multi-Page Architecture (No SPAs)

The application is structured as dedicated, full-screen workspaces inside Next.js 14 App Router:

```
src/
├── app/
│   ├── page.tsx            # Executive Dashboard & High-Level Synthesis
│   ├── topology/page.tsx   # Interactive Draggable Material Flow Canvas
│   ├── scenarios/page.tsx  # Ex-Ante Gap Analysis Matrix (α = 50%, 75%, 100%)
│   ├── impact/page.tsx     # Carbon Accounting & Tri-Currency Valuation
│   ├── stress-test/page.tsx# Resilience Stress Test & Feasibility (Score 94/100)
│   ├── input-data/page.tsx # Data Integration Hub & Facility Waste Registration
│   └── methodology/page.tsx# API Docs, Equations & Thermodynamic Constants
├── components/
│   ├── layout/             # Sidebar, Header, AppShell (persistent state)
│   ├── interactive/        # Topology canvas, Stress test, Feasibility cards
│   └── ui/                 # Metric cards, Status badges, Currency toggles
├── context/
│   └── symbion-context.tsx # Global state (caseId, currency, alpha, sandbox)
└── lib/
    ├── cases.ts            # Jhiri CBG & Gadarwara STPS dataset
    ├── currency.ts         # IDR, MYR, USD exchange rates and formatters
    └── types.ts            # Type definitions
```

---

## 5. Stitch Screens Mapping Reference

| Stitch Screen / Artifact | Name in Stitch | Route | Key Features |
| :--- | :--- | :--- | :--- |
| `39e72ac1...` / `media_1789811625913.png` | **Uji Ketahanan & Kelayakan Proyek** | `/stress-test` & `/` | -20% shock slider, dual bar charts ($132.5 \rightarrow 106.0\text{ t/d}$, ₹4.21 Cr gross value), Score 94/100 Grade A+, 3-bullet execution accordion. |
| `e8fc9a08...` | **Ringkasan Eksekutif Dampak Hijau (Carbon Accounting)** | `/impact` | 4 hero green cards ($1,685\text{ tCO}_2\text{e}$ = 27.5k trees / 360 cars, $43,725\text{ t/yr}$ wet waste, $1,650\text{ t/yr CBG}$, ₹4.21 Crore/yr gross value), 3-step circular transformation, 5 identified waste types progress list, PDF download & partnership CTA. |
| `53479d61...` / `media_1789811682163.png` | **Data Integration Hub (Aliran Limbah)** | `/input-data` | 4 KPI cards, waste intake registration form (STEP 1/2) with quick tags, AI model matching v2.4, 4-partner waste stream table with search, filter, and verification actions. |
| `cluster-topology` | **Symbiosis Topology** | `/topology` | Draggable bipartite SVG graph, animated flow strokes, node telemetry sidebar, and stream balance audit. |

---

## 6. Code Quality & Agent Behavioral Guardrails

1. **Always Verify Compilation**: Before concluding any task, run `npm run build` and ensure exit code `0` with 0 ESLint errors.
2. **Never Leave Dead Imports**: Do not leave unused imports or unassigned variables that trigger strict `@typescript-eslint/no-unused-vars` build breaks.
3. **Preserve State Integrity**: Keep `SymbionProvider` active so changing currency or switching case study immediately updates all components across all pages.
4. **Window Guarding**: Always guard browser-only APIs (`window.print()`, `canvas-confetti`) with `typeof window !== "undefined"` for Next.js SSR safety.
