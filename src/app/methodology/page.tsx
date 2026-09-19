/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useUserSession } from "@/context/user-session-context";
import { MethodologyCard } from "@/components/interactive/methodology-card";
import {
  Binary,
  Award,
  GitBranch,
  Scale,
  FileText,
  Building2,
  ShieldCheck,
  Lock,
  Mail,
  Copy,
  Check,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function MethodologyPage() {
  const { isPartner, isAdmin } = useUserSession();
  const [activeTab, setActiveTab] = useState<"flowchart" | "cases" | "equations" | "references">("flowchart");
  const [frameworkView, setFrameworkView] = useState<"all" | "ai">("all");
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  const frameworkSteps = [
    {
      stepNumber: 1,
      badge: "STEP 1 • FOUNDATIONAL DATA",
      category: "DATA INTEGRATION",
      code: "DATA",
      title: "Data Collection & Multi-Tier Integration",
      indoBox: "Pengumpulan dan Integrasi Data",
      isAiPillar: false,
      codeBadge: "bg-amber-100 text-amber-800 border-amber-300",
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
      description:
        "Ingests industrial profiles, material and energy flows, thermodynamic grades, spatial coordinates, logistic tariffs, and regulatory baselines. Real-world plant inputs are cross-verified and augmented by benchmark proxy databases.",
    },
    {
      stepNumber: 2,
      badge: "STEP 2 • AI PILLAR 1",
      category: "KNOWLEDGE GRAPH",
      code: "KG",
      title: "Knowledge Graph (KG) Ecosystem Modeling",
      indoBox: "Pemodelan Ekosistem Industri — KG",
      isAiPillar: true,
      codeBadge: "bg-sky-100 text-sky-800 border-sky-300",
      badgeClass: "bg-sky-50 text-sky-800 border-sky-200",
      description:
        "Represents industrial actors, material and energy streams, thermodynamic grades, and transport infrastructure as a dynamic multi-relational graph. Aggregates data through park operators to safeguard proprietary commercial secrets.",
    },
    {
      stepNumber: 3,
      badge: "STEP 3 • GAP ANALYSIS",
      category: "DIAGNOSTIC ENGINE",
      code: "GAP",
      title: "Supply-Demand & Compatibility Gap Analysis",
      indoBox: "Analisis Supply-Demand dan Kompatibilitas",
      isAiPillar: false,
      codeBadge: "bg-purple-100 text-purple-800 border-purple-300",
      badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
      description:
        "Identifies volumetric raw material deficits, unutilized slurry/effluent surpluses, stoichiometric requirements, and thermodynamic/chemical compatibility thresholds to determine whether secondary suppliers or off-takers are required.",
    },
    {
      stepNumber: 4,
      badge: "STEP 4 • AI PILLAR 2",
      category: "GRAPH NEURAL NET",
      code: "GNN",
      title: "Missing Industry Identification (GNN)",
      indoBox: "Alternatif Missing Industry — GNN & Kebutuhan Pengguna",
      isAiPillar: true,
      codeBadge: "bg-indigo-100 text-indigo-800 border-indigo-300",
      badgeClass: "bg-indigo-50 text-indigo-800 border-indigo-200",
      description:
        "Uses Graph Neural Networks to recommend complementary facility types (e.g. CSTR Anaerobic Digesters, Fly Ash Brick Plants, Biomass Pelletizers) that will absorb unutilized by-products and close open material loops.",
    },
    {
      stepNumber: 5,
      badge: "STEP 5 • AI PILLAR 3",
      category: "GENETIC ALGORITHM",
      code: "GA",
      title: "Configuration Optimization (Genetic Algorithm)",
      indoBox: "Optimasi Konfigurasi — GA",
      isAiPillar: true,
      codeBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
      description:
        "Solves multi-objective Pareto optimization across resource utilization, gross economic revenue, transport distances, and avoided emissions subject to capacity and thermodynamic mass-balance constraints.",
    },
    {
      stepNumber: 6,
      badge: "STEP 6 • AI PILLAR 4",
      category: "AGENT-BASED MODEL",
      code: "ABM",
      title: "Dynamic Resilience Stress Testing (ABM)",
      indoBox: "Simulasi dan Uji Ketahanan — ABM",
      isAiPillar: true,
      codeBadge: "bg-rose-100 text-rose-800 border-rose-300",
      badgeClass: "bg-rose-50 text-rose-800 border-rose-200",
      description:
        "Deploys Agent-Based Modeling to simulate behavior under upstream supply disruption (-20% to -80%), facility operating-time downtime, and downstream off-take cancellations, confirming 70%–80% nominal performance retention.",
    },
    {
      stepNumber: 7,
      badge: "STEP 7 • DECISION SYNTHESIS",
      category: "ACTIONABLE ROADMAP",
      code: "ROAD",
      title: "Symbiosis Recommendations & Policy Report",
      indoBox: "Rekomendasi dan Laporan Simbiosis",
      isAiPillar: false,
      codeBadge: "bg-teal-100 text-teal-800 border-teal-300",
      badgeClass: "bg-teal-50 text-teal-800 border-teal-200",
      description:
        "Synthesizes recommended network configurations, capacity allocation, multi-currency Capex/Opex valuation, environmental carbon offsets, bottleneck mitigations, and strategic implementation pathways for park administrators.",
    },
  ];

  const paperCitation =
    "Nurcahyo, Z., Faiza, K. R., Anggoro, D. S., Prasetia, T. A., & Hidayat, A. P. (2026). Symbion: AI-Driven Decision Support for Resilient Industrial Symbiosis. Department of Industrial Systems Engineering, IPB University. Prepared for I-SINERGIE Malaysia 2026.";

  const handleCopyCitation = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(paperCitation);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2500);
    }
  };

  const authors = [
    { name: "Zamzam Nurcahyo", email: "nczamzam@apps.ipb.ac.id", role: "Principal Investigator" },
    { name: "Kayla Rahma Faiza", email: "101006kayla@apps.ipb.ac.id", role: "Process Simulation" },
    { name: "Dhamar Syamhudi Anggoro", email: "dhamar11syamhudi@apps.ipb.ac.id", role: "Optimization & GA" },
    { name: "Trias Aldi Prasetia", email: "prasetiaalditrias@apps.ipb.ac.id", role: "Techno-Economic Analysis" },
    { name: "Agung Prayudha Hidayat", email: "agungprayudha@apps.ipb.ac.id", role: "Industrial Systems Engineering" },
  ];

  const references = [
    {
      citation: "Central Electricity Authority. (2022). Report on fly ash generation at coal/lignite based thermal power stations and its utilization in the country for the year 2021–22. Ministry of Power, Government of India.",
      domain: "Fly Ash Benchmark & National Power Surplus",
      tag: "GOVERNMENT AUDIT",
    },
    {
      citation: "Fraccascia, L., & Yazan, D. M. (2018). The role of online information-sharing platforms on the performance of industrial symbiosis networks. Resources, Conservation and Recycling, 136, 473–485.",
      domain: "Information Platforms & Enterprise Confidentiality",
      tag: "SCOPUS Q1",
    },
    {
      citation: "GAIL (India) Limited. (2021, March 18). GAIL and Ranchi Municipal Corporation sign agreement for setting up compressed biogas plant. GAIL (India) Limited.",
      domain: "Jhiri CBG 150 t/d Plant Operational Design",
      tag: "INDUSTRY DATA",
    },
    {
      citation: "Krom, P., Piscicelli, L., & Frenken, K. (2022). Digital platforms for industrial symbiosis. Journal of Innovation Economics & Management, 39(3), 215–240.",
      domain: "Resource Matchmaking vs. Ecosystem Coordination",
      tag: "ACADEMIC REVIEW",
    },
    {
      citation: "Kosmadakis, G. (2024). Industrial waste heat potential and heat exploitation solutions. Applied Thermal Engineering, 246, 122957.",
      domain: "221.32 TWh/yr Industrial Waste Heat Metric",
      tag: "THERMAL ENG",
    },
    {
      citation: "Kechichian, E. R., Demir Duru, S., Quaranta, D., & Shin, N. Y. (2021). Circular economy in industrial parks: Technologies for competitiveness. World Bank Group.",
      domain: "World Bank Survey of 438 Global Eco-Industrial Parks",
      tag: "WORLD BANK",
    },
    {
      citation: "Makropoulos, C., Kritikos, N.-A., & Pantazis, C. (2024). Matchmaking for industrial symbiosis: A digital tool for the identification, quantification and optimisation of symbiotic potential in industrial ecosystems. Frontiers in Chemical Engineering, 6, 1363888.",
      domain: "Digital Matching & Optimization Frontiers",
      tag: "FRONTIERS",
    },
    {
      citation: "Yadav, S. (2026, May 23). Ranchi Municipal Corporation boosts biogas plant capacity to 100 tonnes daily. The Times of India.",
      domain: "Empirical Wet Organic Waste Delivery Rate",
      tag: "FIELD VERIFICATION",
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Role-Differentiated Methodology Context Banner */}
      {isPartner && (
        <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex flex-wrap items-center justify-between gap-3 text-[12px] shadow-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Regional Partner Academic Verification:</strong> Backed by IPB University chemical & industrial systems research, ensuring all feedstock co-digestion stoichiometry and yield forecasts comply with international standards.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-800 text-[11px] px-2.5 py-0.5 rounded bg-white border border-emerald-300">
            Partner Audit: Peer Reviewed
          </span>
        </div>
      )}

      {isAdmin && (
        <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[12px] shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Estate Administrator Decision Framework:</strong> Full access to 14 thermodynamic & economic formulas, 4 AI Pillars (Knowledge Graph, GNN, GA, ABM), and 8 Scopus/Government empirical citations.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-300 text-[11px] px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700">
            Scope: Full Theoretical Dossier
          </span>
        </div>
      )}

      {/* 1. ACADEMIC PAPER HEADER BANNER (E-Digest Official Attribution) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-[#14503f] text-white border border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#2c7a4b] text-white border border-emerald-400/40">
              I-SINERGIE MALAYSIA 2026
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-slate-200 border border-white/20">
              INTERNATIONAL COMPETITION
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Private Manuscript • Embargoed</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAccessModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[12px] font-semibold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Request Paper Access</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-[20px] md:text-[22px] font-bold text-white tracking-tight leading-snug">
            Symbion: AI-Driven Decision Support for Resilient Industrial Symbiosis
          </h1>
          <p className="text-[14px] text-emerald-300 font-medium italic">
            Enabling Eco-Industrial Park Transformation Through Ecosystem Simulation
          </p>
        </div>

        {/* Authors & Institution Strip */}
        <div className="pt-2 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[12px] text-slate-300">
            <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-white">IPB University, Indonesia</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Department of Industrial Systems Engineering</span>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            {authors.map((author) => (
              <span
                key={author.email}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-300 transition-colors"
                title={`${author.role} (${author.email})`}
              >
                {author.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS (Flowchart / Cases / Equations / References) */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs text-[12.5px] font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("flowchart")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === "flowchart"
              ? "bg-[#2c7a4b] text-white font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Figure 1: Methodology Flowchart & AI Pillars</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cases")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === "cases"
              ? "bg-[#2c7a4b] text-white font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Empirical Cases (Jhiri & Gadarwara)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("equations")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === "equations"
              ? "bg-[#2c7a4b] text-white font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Binary className="w-4 h-4" />
          <span>Mathematical Derivations & Constants</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("references")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            activeTab === "references"
              ? "bg-[#2c7a4b] text-white font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Literature Citations (8 Works)</span>
        </button>
      </div>

      {/* TAB 1: FIGURE 1 METHODOLOGY FLOWCHART & 4 AI PILLARS */}
      {activeTab === "flowchart" && (
        <div className="space-y-6">
          {/* Methodology Figure 1 Split Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive Diagram Viewer */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#2c7a4b]" />
                  <h2 className="text-[14px] font-bold text-slate-900">
                    Figure 1: Symbion Decision-Support Framework Flowchart
                  </h2>
                </div>
                <span className="text-[10.5px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  EMPIRICAL ARCHITECTURE
                </span>
              </div>

              {/* Diagram Container */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/edigest_figure1.png"
                  alt="Figure 1: Symbion Decision-Support Framework Flowchart"
                  className="w-full max-h-[620px] object-contain rounded-lg border border-slate-200/60 shadow-xs bg-white"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11.5px] text-slate-600 leading-snug space-y-2">
                <div>
                  <strong>Flowchart Source:</strong> Zamzam Nurcahyo et al. (2026), <em>Symbion: AI-Driven Decision Support for Resilient Industrial Symbiosis</em>. Ex-ante evaluation integrating Knowledge Graph, GNN, GA, and ABM.
                </div>
                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10.5px] font-mono text-slate-500">
                  <span className="text-amber-700 font-semibold">• Step 1: Input Data</span>
                  <span className="text-sky-700 font-semibold">• Step 2: KG (AI 1)</span>
                  <span className="text-purple-700 font-semibold">• Step 3: Gap Analysis</span>
                  <span className="text-indigo-700 font-semibold">• Step 4: GNN (AI 2)</span>
                  <span className="text-emerald-700 font-semibold">• Step 5: GA (AI 3)</span>
                  <span className="text-rose-700 font-semibold">• Step 6: ABM (AI 4)</span>
                  <span className="text-teal-700 font-semibold">• Step 7: Symbiosis Report</span>
                </div>
              </div>
            </div>

            {/* Right: Methodology Stages & 4 Algorithmic AI Pillars Breakdown */}
            <div className="lg:col-span-6 space-y-4">
              {/* Executive Abstract Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#2c7a4b]" />
                  <span>The Core Scientific Paradigm Shift</span>
                </h3>
                <p className="text-[12.5px] text-slate-600 leading-relaxed">
                  Existing digital symbiosis platforms mainly match companies already registered within a network and rarely test how fluctuating supply affects long-term viability. Symbion shifts industrial symbiosis from <strong>passive resource matchmaking</strong> to <strong>proactive ecosystem design</strong> — identifying missing industrial functions and testing whether newly introduced facilities survive dynamic operational shocks.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1 text-[11.5px] font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">WORLD BANK BENCHMARK</span>
                    <strong className="text-slate-800 text-[13px]">438 Parks</strong>
                    <span className="text-slate-500 block text-[10.5px]">Only 57.5% circular</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">EU/UK WASTE HEAT</span>
                    <strong className="text-emerald-700 text-[13px]">221.32 TWh/yr</strong>
                    <span className="text-slate-500 block text-[10.5px]">Untapped potential</span>
                  </div>
                </div>
              </div>

              {/* Methodology Framework Stages Container */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-[#2c7a4b]" />
                      <span>Figure 1 Flowchart Breakdown (Steps 1–7)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Sequential 1:1 mapping with the decision-support flowchart stages
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setFrameworkView("all")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        frameworkView === "all"
                          ? "bg-white text-slate-900 font-bold shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All 7 Steps (Complete)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrameworkView("ai")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        frameworkView === "ai"
                          ? "bg-[#2c7a4b] text-white font-bold shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      4 AI Pillars Only
                    </button>
                  </div>
                </div>

                {/* Sub-notice explaining Step 1 & 3 if AI view is selected */}
                {frameworkView === "ai" && (
                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-[11.5px] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      <strong>Displaying 4 Core AI Pillars:</strong> Knowledge Graph (Step 2), GNN (Step 4), Genetic Algorithm (Step 5), and ABM (Step 6). Foundational Data (Step 1), Gap Analysis (Step 3), and Symbiosis Reporting (Step 7) complete the remaining pipeline stages.
                    </span>
                  </div>
                )}

                {/* Steps Cards List */}
                <div className="space-y-3">
                  {frameworkSteps
                    .filter((s) => (frameworkView === "ai" ? s.isAiPillar : true))
                    .map((step) => (
                      <div
                        key={step.stepNumber}
                        className={`p-4 rounded-xl border transition-all hover:shadow-xs space-y-1.5 ${
                          step.isAiPillar
                            ? "bg-white border-slate-200 hover:border-emerald-300"
                            : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10.5px] font-mono border shrink-0 ${step.codeBadge}`}
                            >
                              {step.code}
                            </div>
                            <div>
                              <h4 className="text-[13px] font-bold text-slate-900 leading-snug">
                                {step.stepNumber}. {step.title}
                              </h4>
                              <span className="text-[10.5px] font-sans italic text-slate-500 block">
                                Flowchart Box: &ldquo;{step.indoBox}&rdquo;
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {step.isAiPillar ? (
                              <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                                <Sparkles className="w-3 h-3 text-emerald-600" />
                                <span>{step.badge}</span>
                              </span>
                            ) : (
                              <span className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border ${step.badgeClass}`}>
                                {step.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-[11.5px] text-slate-600 leading-relaxed pl-[42px]">
                          {step.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMPIRICAL CASE DEMONSTRATIONS */}
      {activeTab === "cases" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1: GAIL Jhiri CBG */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    CASE STUDY 1: INPUT DEFICIT
                  </span>
                  <h3 className="text-[16px] font-bold text-slate-900 mt-1.5">
                    GAIL Compressed Biogas (CBG) Plant
                  </h3>
                  <span className="text-[12px] text-slate-500 font-mono">
                    Jhiri, Ranchi, Jharkhand, India
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[20px] font-extrabold text-[#2c7a4b] block">88.33%</span>
                  <span className="text-[10.5px] text-slate-400">Capacity Restored</span>
                </div>
              </div>

              <div className="space-y-3 text-[12.5px] text-slate-600 leading-relaxed">
                <p>
                  <strong>Imbalance Problem:</strong> Designed for 150 tonnes/day wet organic waste, operating at only 80 tonnes/day (53.33% capacity utilization) due to municipal segregation constraints, leaving an unutilized capacity gap of 70 t/day.
                </p>
                <p>
                  <strong>Symbion Intervention:</strong> Sourced regional organic wastes (vegetable market sludge, agro-industrial manure) under representative α = 75% fulfillment (+52.5 t/d), increasing throughput to 132.5 t/day (88.33% utilization).
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-center">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[9.5px]">CAPACITY GAIN</span>
                  <strong className="text-emerald-700 text-[13px]">+65.6%</strong>
                  <span className="text-slate-500 block text-[9px]">Relative Boost</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[9.5px]">GROSS REVENUE</span>
                  <strong className="text-slate-900 text-[13px]">₹4.21 Cr/yr</strong>
                  <span className="text-slate-500 block text-[9px]">RM 2.37M / $510k</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[9.5px]">OFFSET CO₂</span>
                  <strong className="text-teal-700 text-[13px]">1,685 t/yr</strong>
                  <span className="text-slate-500 block text-[9px]">Fossil Displaced</span>
                </div>
              </div>
            </div>

            {/* Case 2: NTPC Gadarwara STPS */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                    CASE STUDY 2: OUTPUT SURPLUS
                  </span>
                  <h3 className="text-[16px] font-bold text-slate-900 mt-1.5">
                    Gadarwara Super Thermal Power Station
                  </h3>
                  <span className="text-[12px] text-slate-500 font-mono">
                    NTPC (2 × 800 MW), Madhya Pradesh, India
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[20px] font-extrabold text-sky-700 block">1.685M t</span>
                  <span className="text-[10.5px] text-slate-400">Annual Ash Volume</span>
                </div>
              </div>

              <div className="space-y-3 text-[12.5px] text-slate-600 leading-relaxed">
                <p>
                  <strong>Imbalance Problem:</strong> Generates 1,685,000 tonnes/year pulverized coal fly ash. Only 634,300 tonnes utilized in cement blending, leaving 1,050,700 tonnes/year (62.35%) unutilized surplus dumped into containment lagoons.
                </p>
                <p>
                  <strong>Symbion Intervention:</strong> Identifies missing industrial functions: on-site fly ash brick manufacturing units, Pozzolanic cement (PPC) clinker replacement, and highway embankment stabilization corridors within a 50 km logistics radius.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-center">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[9.5px]">UNUTILIZED POOL</span>
                  <strong className="text-rose-700 text-[13px]">1.05M t/yr</strong>
                  <span className="text-slate-500 block text-[9px]">62.35% Surplus</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[9.5px]">RECOMMENDED SINK</span>
                  <strong className="text-slate-900 text-[13px]">Brick & Roads</strong>
                  <span className="text-slate-500 block text-[9px]">Eco-Materials</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[9.5px]">CIRCULAR RECOVERY</span>
                  <strong className="text-emerald-700 text-[13px]">100%</strong>
                  <span className="text-slate-500 block text-[9px]">Zero Landfill Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MATHEMATICAL DERIVATIONS & THERMODYNAMIC CONSTANTS */}
      {activeTab === "equations" && (
        <div className="space-y-6">
          <MethodologyCard />

          {/* Thermodynamic Constants Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Binary className="w-5 h-5 text-primary" />
                <h2 className="text-[15px] font-bold text-slate-900">
                  Thermodynamic Parameters & Empirical Constants
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">
                CERTIFIED PHYSICAL CONSTANTS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-left font-mono text-[11px] text-slate-500 uppercase">
                    <th className="py-2.5 px-3">Symbol</th>
                    <th className="py-2.5 px-3">Parameter Description</th>
                    <th className="py-2.5 px-3">Standard Value</th>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">Empirical Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">HHV_CBG</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Compressed Biogas Higher Heating Value</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">52.0</td>
                    <td className="py-3 px-3 font-mono text-slate-600">MJ / kg</td>
                    <td className="py-3 px-3 text-slate-500 text-[11.5px]">SATAT / MoPNG Technical Standards (95% CH₄)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">C_MMBtu</td>
                    <td className="py-3 px-3 font-medium text-slate-900">British Thermal Unit Equivalent Conversion</td>
                    <td className="py-3 px-3 font-mono font-bold text-sky-700">1,055.06</td>
                    <td className="py-3 px-3 font-mono text-slate-600">MJ / MMBtu</td>
                    <td className="py-3 px-3 text-slate-500 text-[11.5px]">ISO 13686 Natural Gas Measurement Standard</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">P_CBG</td>
                    <td className="py-3 px-3 font-medium text-slate-900">SATAT Fixed Commercial Procurement Price</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-700">1,478.0</td>
                    <td className="py-3 px-3 font-mono text-slate-600">INR / MMBtu</td>
                    <td className="py-3 px-3 text-slate-500 text-[11.5px]">GAIL & Indian Oil SATAT Public Tariff Sheet</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">EF_NG</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Natural Gas Displaced Combustion Emission Factor</td>
                    <td className="py-3 px-3 font-mono font-bold text-rose-700">56.1</td>
                    <td className="py-3 px-3 font-mono text-slate-600">kg CO₂ / GJ</td>
                    <td className="py-3 px-3 text-slate-500 text-[11.5px]">IPCC Guidelines for National GHG Inventories</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">t_op</td>
                    <td className="py-3 px-3 font-medium text-slate-900">Annual Effective Plant Operating Days</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">330</td>
                    <td className="py-3 px-3 font-mono text-slate-600">Days / Year</td>
                    <td className="py-3 px-3 text-slate-500 text-[11.5px]">Standard Industrial Availability (35 days maintenance)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LITERATURE CITATIONS & REFERENCES */}
      {activeTab === "references" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2c7a4b]" />
              <h2 className="text-[15px] font-bold text-slate-900">
                Official Literature & Policy Citation Registry
              </h2>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              8 PEER-REVIEWED SOURCES
            </span>
          </div>

          <div className="space-y-3">
            {references.map((ref, idx) => (
              <div
                key={ref.citation}
                className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    [{idx + 1}] {ref.domain}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {ref.tag}
                  </span>
                </div>
                <p className="text-[12.5px] text-slate-800 font-serif leading-relaxed">
                  {ref.citation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACCESS REQUEST & CONFIDENTIALITY MODAL */}
      {showAccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowAccessModal(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-[#14503f] text-white flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    <Lock className="w-3 h-3 text-amber-400" />
                    CONFIDENTIAL PREPRINT • UNDER PEER REVIEW
                  </span>
                </div>
                <h3 className="text-[17px] font-bold text-white tracking-tight leading-snug">
                  Symbion Research Paper & Modeling Dossier
                </h3>
                <p className="text-[12px] text-emerald-300">
                  I-SINERGIE Malaysia 2026 Official Entry • IPB University
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAccessModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[12px] text-slate-700 leading-relaxed space-y-2">
                <p>
                  <strong>Notice of Confidentiality:</strong> The complete academic manuscript containing proprietary thermodynamic equations, evolutionary algorithm derivations, and empirical industrial datasets (GAIL Jhiri & NTPC Gadarwara) is protected under institutional competition embargo and journal review.
                </p>
                <p className="text-slate-600 text-[11.5px]">
                  Competition jurors, academic reviewers, and industrial park evaluators can request full-text access directly from the lead researchers.
                </p>
              </div>

              {/* Principal Investigator Contact Info */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                    Corresponding Author / PI
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300 font-semibold">
                    Lead Investigator
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900">
                      Zamzam Nurcahyo
                    </h4>
                    <p className="text-[11.5px] text-slate-600">
                      Department of Industrial Systems Engineering, IPB University
                    </p>
                    <p className="text-[11px] font-mono text-emerald-700 mt-0.5">
                      nczamzam@apps.ipb.ac.id
                    </p>
                  </div>
                  <a
                    href="mailto:nczamzam@apps.ipb.ac.id?subject=%5BSymbion%20v1.0%5D%20Academic%20Paper%20Access%20Request%20(I-SINERGIE%20Malaysia)&body=Dear%20Zamzam%20Nurcahyo%20and%20Symbion%20Research%20Team,%0A%0AI%20am%20reviewing%20the%20Symbion%20v1.0%20decision%20engine%20for%20I-SINERGIE%20Malaysia%202026%20and%20would%20like%20to%20request%20access%20to%20the%20full%20academic%20manuscript%20and%20methodology%20appendix.%0A%0AOrganization%20/%20Role:%20%0APurpose%20of%20Request:%20%0A%0ABest%20regards,"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2c7a4b] hover:bg-[#23613c] text-white text-[12px] font-semibold transition-colors shadow-xs shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Request via Email</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200" />
                  </a>
                </div>
              </div>

              {/* Citation Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Suggested Academic Citation (APA)
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCitation}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2c7a4b] hover:text-[#23613c] transition-colors cursor-pointer"
                  >
                    {copiedCitation ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-serif text-slate-800 leading-relaxed select-all">
                  {paperCitation}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-[10.5px] font-mono text-slate-500">
                Proprietary Academic Intellectual Property • Symbion v1.0
              </span>
              <button
                type="button"
                onClick={() => setShowAccessModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-[12px] font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
