"use client";

import React, { useState } from "react";
import { useSymbion } from "@/context/symbion-context";
import { formatCurrency } from "@/lib/currency";
import {
  ShieldAlert,
  CheckCircle2,
  ThumbsUp,
  TrendingDown,
  Clock,
  Zap,
} from "lucide-react";

export function ProjectFeasibilityCard() {
  const { currency, scenario, currentCase, isJhiri } = useSymbion();
  const [shockPct, setShockPct] = useState<number>(20);

  // Math conversions
  const nominalIntake = isJhiri ? scenario.totalInputPerDay : 1_685_000;
  const remainingMultiplier = (100 - shockPct) / 100;
  const remainingIntake = Math.round(nominalIntake * remainingMultiplier);

  // Revenue base
  const baseRevenue = scenario.grossValue[currency];
  const remainingRevenue = baseRevenue * remainingMultiplier;

  // Bar heights for visualization (max 65px)
  const intakeBarHeight = Math.max(12, Math.round(65 * remainingMultiplier));
  const revenueBarHeight = Math.max(12, Math.round(65 * remainingMultiplier));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch font-sans">
      {/* LEFT: RESILIENCE & BUSINESS RISK STRESS TEST */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#2c7a4b]" />
              <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
                Resilience & Business Risk Stress Test
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2c7a4b] text-[10.5px] font-bold border border-emerald-200 font-mono">
              RISK AUDIT
            </span>
          </div>
          <p className="text-[12px] text-slate-600 leading-snug">
            Does the facility remain viable if feedstock supply contracts by 20%?{" "}
            <strong className="text-slate-900 font-bold">
              Yes, operations retain {(remainingMultiplier * 100).toFixed(0)}% of nominal throughput and profitability.
            </strong>
          </p>
        </div>

        {/* Shock Slider Control */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex justify-between items-center text-[12px]">
            <span className="font-bold text-slate-800">
              Feedstock Supply Shock:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-mono font-bold text-[11px]">
              -{shockPct}% CONTRACTION ({remainingIntake.toLocaleString()} {isJhiri ? "t/day" : "t/yr"})
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={shockPct}
            onChange={(e) => setShockPct(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2c7a4b]"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Baseline (0%)</span>
            <span>-20% Empirical</span>
            <span>-50% Critical</span>
            <span>-80% Shutdown</span>
          </div>
        </div>

        {/* Dual Bar Charts (Stitch Exact Layout) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Chart 1: Feedstock Volume */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-slate-800">
                Feedstock Intake
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">{isJhiri ? "t/day" : "t/yr"}</span>
            </div>

            <div className="flex items-end gap-2.5 h-24 pt-3 px-1">
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9.5px] text-slate-400 font-medium">0</span>
                <div className="w-full bg-slate-200 rounded-t" style={{ height: "4px" }} />
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Zero</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono font-bold text-slate-700">
                  {nominalIntake.toLocaleString()}
                </span>
                <div className="w-full bg-slate-300 rounded-t" style={{ height: "65px" }} />
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Nominal</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono font-bold text-[#2c7a4b]">
                  {remainingIntake.toLocaleString()}
                </span>
                <div
                  className="w-full bg-[#2c7a4b] rounded-t transition-all duration-300"
                  style={{ height: `${intakeBarHeight}px` }}
                />
                <span className="text-[9px] text-[#2c7a4b] font-bold uppercase">Shocked</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Off-take Sales Revenue */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-slate-800">
                Off-take Value
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">Annual</span>
            </div>

            <div className="flex items-end gap-2.5 h-24 pt-3 px-1">
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9.5px] text-slate-400 font-medium">0</span>
                <div className="w-full bg-slate-200 rounded-t" style={{ height: "4px" }} />
                <span className="text-[9px] text-slate-400 uppercase font-semibold">Zero</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono font-bold text-slate-700">
                  {formatCurrency(baseRevenue, currency, true)}
                </span>
                <div className="w-full bg-slate-300 rounded-t" style={{ height: "65px" }} />
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Nominal</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono font-bold text-[#2c7a4b]">
                  {formatCurrency(remainingRevenue, currency, true)}
                </span>
                <div
                  className="w-full bg-[#306856] rounded-t transition-all duration-300"
                  style={{ height: `${revenueBarHeight}px` }}
                />
                <span className="text-[9px] text-[#2c7a4b] font-bold uppercase">Shocked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Paper Section 6 Shock Benchmarks */}
        <div className="grid grid-cols-3 gap-2 text-[10.5px] font-mono pt-1">
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500">
              <TrendingDown className="w-3 h-3 text-rose-500" />
              <span className="text-[9.5px] uppercase">Supply Shock</span>
            </div>
            <div className="text-[12px] font-bold text-slate-900 mt-0.5">80% Safe</div>
            <span className="text-[9px] text-slate-400">Under -20% supply</span>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500">
              <Clock className="w-3 h-3 text-amber-500" />
              <span className="text-[9.5px] uppercase">Downtime</span>
            </div>
            <div className="text-[12px] font-bold text-slate-900 mt-0.5">90% Yield</div>
            <span className="text-[9px] text-slate-400">35 days offline</span>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500">
              <Zap className="w-3 h-3 text-emerald-500" />
              <span className="text-[9.5px] uppercase">Grid Off-take</span>
            </div>
            <div className="text-[12px] font-bold text-slate-900 mt-0.5">100% SATAT</div>
            <span className="text-[9px] text-slate-400">Bankable PPA</span>
          </div>
        </div>

        {/* Protection Health Pill */}
        <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between text-[11.5px]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-950 font-bold">
              Resilience Index: Protected
            </span>
          </div>
          <span className="font-mono text-emerald-800 font-bold text-[11px]">
            {(remainingMultiplier * 100).toFixed(0)}% Capacity Retained
          </span>
        </div>
      </div>

      {/* RIGHT: PROJECT FEASIBILITY & DECISION ENGINE */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2c7a4b]" />
              <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
                Project Feasibility & Investment Recommendation
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2c7a4b] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
              HIGHLY FEASIBLE (Score: 94/100)
            </span>
          </div>
          <p className="text-[12px] text-slate-500 leading-snug">
            Integrated techno-economic evaluation for the {currentCase.title}.
          </p>
        </div>

        {/* 3 Checklist Items */}
        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2c7a4b] shrink-0 mt-0.5" />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-900">
                  Feedstock Buffer Exceeds Safety Threshold
                </span>
                <span className="text-[10px] font-mono text-[#2c7a4b] font-bold">
                  88.33% Utilization
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {isJhiri
                  ? "Secondary agro-mandi waste (+52.5 t/d) bridges 75% of the input gap, lifting plant throughput to 132.5 t/d."
                  : "Secondary cement absorption absorbs 634,300 t/yr with remaining surplus addressed by brick/embankment sinks."}
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2c7a4b] shrink-0 mt-0.5" />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-900">
                  Bankable Long-Term Off-Take Framework
                </span>
                <span className="text-[10px] font-mono text-[#2c7a4b] font-bold">
                  Official Policy Backed
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {isJhiri
                  ? "Generates guaranteed revenue through national SATAT procurement and City Gas Distribution injection."
                  : "Guaranteed absorption through regional infrastructure mandates and green building procurement standards."}
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2c7a4b] shrink-0 mt-0.5" />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-900">
                  High Resilience to Upstream Supply Shocks
                </span>
                <span className="text-[10px] font-mono text-[#2c7a4b] font-bold">
                  Low Risk Exposure
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Under a severe 20% feedstock shock, the facility maintains 80% operational cashflow, comfortably above break-even.
              </p>
            </div>
          </div>
        </div>

        {/* Decision Banner (Solid Green Card from Stitch) */}
        <div className="bg-[#2c7a4b] p-3.5 rounded-xl text-white shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-white" />
              <span className="text-[13px] font-bold tracking-tight">
                Decision: Highly Recommended to Proceed
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#2c7a4b] text-[10px] font-mono font-bold">
              Score: 94 / 100 • Grade A+
            </span>
          </div>
          <p className="text-[11.5px] text-white/90 leading-snug">
            The decision engine strongly recommends executing the secondary sourcing integration agreements to close the resource imbalance and capture full economic gains.
          </p>
        </div>

        {/* 3 Key Pillars Implementation Strip */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2 text-[10.5px]">
          <div className="leading-snug">
            <strong className="text-slate-900 block">[1] Siting:</strong>
            <span className="text-slate-500">Haulage radius &lt; 15 km minimizes freight costs.</span>
          </div>
          <div className="leading-snug">
            <strong className="text-slate-900 block">[2] Emissions:</strong>
            <span className="text-slate-500">Avoids 1,685 tCO2e/yr equivalent fossil emissions.</span>
          </div>
          <div className="leading-snug">
            <strong className="text-slate-900 block">[3] Policy:</strong>
            <span className="text-slate-500">Full statutory and environmental clearance aligned.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
