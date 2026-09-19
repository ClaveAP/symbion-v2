"use client";

import React from "react";
import { useSymbion } from "@/context/symbion-context";
import { useUserSession } from "@/context/user-session-context";
import { ScenarioMatrix } from "@/components/interactive/scenario-matrix";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/currency";
import {
  Sliders,
  TrendingUp,
  Scale,
  HelpCircle,
  Sparkles,
  BarChart3,
  Factory,
} from "lucide-react";

export default function ScenariosPage() {
  const { scenario, selectedAlpha, setSelectedAlpha, currency, isJhiri } =
    useSymbion();
  const { isPartner, isAdmin } = useUserSession();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-bold text-slate-900 tracking-tight leading-none">
                Ex-Ante Scenario Evaluation Matrix
              </h1>
              <StatusBadge type={isJhiri ? "INPUT_DEFICIT" : "OUTPUT_SURPLUS"} />
            </div>
            <p className="text-[12.5px] text-slate-500 mt-1.5">
              Comparative analysis of capacity gap-closure rates (α = 50%, 75%, 100%) against baseline operational data.
            </p>
          </div>
        </div>

        {/* Active Scenario Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            CURRENT: α = {(selectedAlpha * 100).toFixed(0)}% FULFILLMENT
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-primary-light text-primary font-bold border border-primary/20">
            {scenario.utilizationPct}% CAPACITY RESTORED
          </span>
        </div>
      </div>

      {/* Role-Differentiated Scenario Banner */}
      {isPartner && (
        <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex flex-wrap items-center justify-between gap-3 text-[12px] shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>
              <strong>Regional Partner Offtake Sensitivity:</strong> Evaluates incremental feedstock co-digestion supply volumes (+35 t/d, +52.5 t/d, +70 t/d) and corresponding partner CBG yield contributions.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-800 text-[11px] px-2.5 py-0.5 rounded bg-white border border-emerald-300">
            Partner Allocation: Active
          </span>
        </div>
      )}

      {isAdmin && (
        <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[12px] shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Estate Administrator Gap-Closure Optimization:</strong> Simulates secondary agro-wholesale mandi waste integration to restore anchor facility utilization from 53.33% to 88.33% (α = 75%) and 100.0% (α = 100%).
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-300 text-[11px] px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700">
            Optimization Level: Master α-Matrix
          </span>
        </div>
      )}

      {isJhiri ? (
        <>
          {/* Main Scenario Matrix Component */}
          <div className="space-y-4">
            <ScenarioMatrix
              selectedAlpha={selectedAlpha}
              onSelectAlpha={setSelectedAlpha}
            />
          </div>

          {/* Rationale for α = 75% Representative Scenario */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-[15px] font-bold text-slate-900">
                    Why α = 75% was Selected as Representative Benchmark
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  PAPER SECTION 4 PROOF
                </span>
              </div>

              <p className="text-[13px] text-slate-600 leading-relaxed">
                As detailed in Section 4 of the empirical study, selecting α = 75% (52.5 t/day additional wet organic intake) does not imply that 75% is guaranteed to be the most likely realization or global optimum. Rather, it serves as a rigorous, realistic intermediate condition between partial (50%) and theoretical complete (100%) gap fulfillment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[12.5px]">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Pragmatic Supply Logistics</span>
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-normal">
                    Municipal and agro-processing supply chains experience seasonal fluctuations. Assuming 100% immediate fill overlooks collection bottlenecks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[12.5px]">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Compelling Commercial Viability</span>
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-normal">
                    At 75% gap closure, the facility achieves {formatCurrency(scenario.grossValue[currency], currency, true)} annual gross revenue, proving high financial viability even with residual buffer.
                  </p>
                </div>
              </div>
            </div>

            {/* Marginal Conversion Rate Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="text-[14px] font-bold text-slate-900">
                    Marginal Conversion Multipliers
                  </h3>
                </div>
                <p className="text-[12px] text-slate-500 leading-snug">
                  Fixed design ratios based on 150 t/d input yielding ~5.0 t/d CBG and 25.0 t/d FOM:
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    CBG YIELD COEFFICIENT (r_CBG)
                  </span>
                  <span className="text-[16px] font-mono font-bold text-slate-900 block mt-0.5">
                    0.03333 t CBG / t input
                  </span>
                  <span className="text-[10.5px] text-slate-500">
                    33.33 kg purified biomethane per ton
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    FOM YIELD COEFFICIENT (r_FOM)
                  </span>
                  <span className="text-[16px] font-mono font-bold text-slate-900 block mt-0.5">
                    0.16667 t FOM / t input
                  </span>
                  <span className="text-[10.5px] text-slate-500">
                    166.67 kg bio-fertilizer per ton
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10.5px] font-mono text-slate-400 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>330 operating run-days/year standard</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Gadarwara Output Surplus Scenario Matching */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-sky-600" />
                <h2 className="text-[15px] font-bold text-slate-900">
                  Gadarwara Output Surplus: Required Symbiotic Sink Allocation
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">
                SURPLUS: 1,050,700 TONS/YEAR
              </span>
            </div>

            <p className="text-[13px] text-slate-600 leading-relaxed">
              In output-surplus industrial symbiosis, the evaluation focuses on allocating unutilized balances across secondary industrial sectors to avoid hazardous tailings accumulation. To achieve 100% fly ash utilization (Zero Slurry Breach Risk), the 1.05M t/yr balance is partitioned across three complementary pathways:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-sky-800">
                    PATHWAY 1
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-sky-200 text-sky-900 font-bold">
                    38.1% Share
                  </span>
                </div>
                <h3 className="text-[14px] font-bold text-slate-900">
                  Autoclaved Aerated Concrete & Brick Making
                </h3>
                <div className="text-[18px] font-mono font-bold text-sky-900">
                  400,000 t/yr
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Displaces natural topsoil excavation for construction materials within 100km radius.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-800">
                    PATHWAY 2
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-emerald-200 text-emerald-900 font-bold">
                    38.1% Share
                  </span>
                </div>
                <h3 className="text-[14px] font-bold text-slate-900">
                  National Highway Road Embankment
                </h3>
                <div className="text-[18px] font-mono font-bold text-emerald-900">
                  400,000 t/yr
                </div>
                <p className="text-[11.5px] text-slate-600">
                  High-volume structural fill for NHAI highway sub-base engineering projects.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-indigo-800">
                    PATHWAY 3
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-indigo-200 text-indigo-900 font-bold">
                    23.8% Share
                  </span>
                </div>
                <h3 className="text-[14px] font-bold text-slate-900">
                  Abandoned Coal Mine Void Backfilling
                </h3>
                <div className="text-[18px] font-mono font-bold text-indigo-900">
                  250,700 t/yr
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Prevents subsidence in regional coal seams while achieving complete zero-slurry equilibrium.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
