"use client";

import React from "react";
import { useSymbion } from "@/context/symbion-context";
import { useUserSession } from "@/context/user-session-context";
import { StressTestTerminal } from "@/components/interactive/stress-test-terminal";
import { ProjectFeasibilityCard } from "@/components/interactive/project-feasibility-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ShieldAlert,
  AlertOctagon,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function StressTestPage() {
  const { isJhiri } = useSymbion();
  const { isPartner, isAdmin } = useUserSession();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-200 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[16px] sm:text-[18px] font-bold text-slate-900 tracking-tight leading-snug">
                System Resilience & Stress Testing Terminal
              </h1>
              <StatusBadge type={isJhiri ? "INPUT_DEFICIT" : "OUTPUT_SURPLUS"} />
            </div>
            <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 mt-1 leading-snug">
              Simulating industrial network shocks across upstream feedstock supply, operational run-time, and downstream off-take.
            </p>
          </div>
        </div>

        {/* Global Resilience Health Indicator */}
        <div className="flex items-center gap-2 font-mono text-[10.5px] sm:text-[11px] w-full sm:w-auto">
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>ROBUSTNESS INDEX: 76.7% RETENTION</span>
          </span>
        </div>
      </div>

      {/* Role-Differentiated Stress Test Context Banner */}
      {isPartner && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex flex-wrap items-center justify-between gap-2.5 text-[11.5px] sm:text-[12px] shadow-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Regional Partner Supply Risk Audit:</strong> PT Sawit Subang contracted off-take is secured under guaranteed long-term FiT floor prices. Even under a -20% supply contraction, facility operations remain financially resilient with positive cash flow.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-800 text-[10.5px] sm:text-[11px] px-2.5 py-0.5 rounded bg-white border border-emerald-300 self-end sm:self-auto">
            Partner Risk: Low (Tier-A)
          </span>
        </div>
      )}

      {isAdmin && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-[11.5px] sm:text-[12px] shadow-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse mt-1 sm:mt-0 shrink-0" />
            <span>
              <strong>Estate Administrator Master Sensitivity Terminal:</strong> Unrestricted network shock modeling (-80% to 0%), evaluating system-wide break-even margins, minimum digester loading rates, and secondary off-taker capacities.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-300 text-[10.5px] sm:text-[11px] px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 self-end sm:self-auto">
            Audit Level: Root Resilience
          </span>
        </div>
      )}

      {/* Featured Stitch Screen: Uji Ketahanan & Kesimpulan Kelayakan Proyek (Skor 94/100) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h2 className="text-[14.5px] sm:text-[15px] font-bold text-slate-900">
              Regional Project Feasibility & Business Risk Assessment
            </h2>
            <p className="text-[11.5px] sm:text-[12px] text-slate-500">
              Interactive sensitivity slider (-20% shock test) with verified environmental and financial checklists.
            </p>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2c7a4b] border border-emerald-200 self-start sm:self-auto shrink-0">
            GRADE A+ • 94/100
          </span>
        </div>
        <ProjectFeasibilityCard />
      </div>

      {/* Main Interactive Stress Test Simulator */}
      <div className="space-y-4">
        <StressTestTerminal />
      </div>

      {/* Section 6 Empirical Shock Scenarios Matrix */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            <h2 className="text-[15px] font-bold text-slate-900">
              Paper Section 6: Standardized Shock Benchmark Matrix (α = 75%)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-semibold">
            EMPIRICAL DATASET
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Shock 1 */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-rose-800">
                UPSTREAM SHOCK
              </span>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-rose-200 text-rose-900 font-bold">
                80% Retention
              </span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">
                Feedstock Supply Shock (-20%)
              </h3>
              <p className="text-[11.5px] text-slate-600 mt-1">
                Seasonal agro-residue contraction reduces additional supply from 52.5 t/d to 42.0 t/d.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-rose-200 text-[11px] font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Intake Rate:</span>
                <span className="font-bold text-slate-800">122.0 t/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Utilization:</span>
                <span className="font-bold text-slate-800">81.33% (vs 88.33%)</span>
              </div>
            </div>
          </div>

          {/* Shock 2 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-amber-800">
                PROCESSING SHOCK
              </span>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-amber-200 text-amber-900 font-bold">
                80% Retention
              </span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">
                Operating-Time Shock (-20%)
              </h3>
              <p className="text-[11.5px] text-slate-600 mt-1">
                Unscheduled anaerobic digester maintenance curtails annual run-time from 330 to 264 days.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-[11px] font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Feedstock:</span>
                <span className="font-bold text-slate-800">13,860 t/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CBG Yield:</span>
                <span className="font-bold text-slate-800">462.0 t/year</span>
              </div>
            </div>
          </div>

          {/* Shock 3 */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-indigo-800">
                DOWNSTREAM SHOCK
              </span>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-indigo-200 text-indigo-900 font-bold">
                70% Retention
              </span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">
                CBG Off-Take Shock (-30%)
              </h3>
              <p className="text-[11.5px] text-slate-600 mt-1">
                City gas network compressor downtime suppresses downstream demand absorption.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-indigo-200 text-[11px] font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Absorbed CBG:</span>
                <span className="font-bold text-slate-800">404.25 t/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Energy Value:</span>
                <span className="font-bold text-slate-800">21.02M MJ/year</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
