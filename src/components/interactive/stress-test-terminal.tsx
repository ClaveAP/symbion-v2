"use client";

import React, { useState } from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { CheckCircle2, Zap } from "lucide-react";

export function StressTestTerminal() {
  const [activeShockId, setActiveShockId] = useState<string>("nominal");
  const [customShockPct, setCustomShockPct] = useState<number>(20);

  // Calculate dynamic values based on shock selection
  let retentionPct = 100;
  let statusBadge: "OPTIMAL" | "WARNING" | "CRITICAL" = "OPTIMAL";
  let effectiveDailyInput = 132.5;
  let effectiveUtilization = 88.33;
  let annualFeedstock = 17325;
  let cbgAbsorbedTons = 577.5;
  let description = "Normal continuous equilibrium under 75% gap closure baseline.";

  if (activeShockId === "feedstock") {
    retentionPct = 80;
    statusBadge = "WARNING";
    effectiveDailyInput = 122.0; // 80 + (52.5 * 0.8)
    effectiveUtilization = 81.33;
    annualFeedstock = 13860;
    cbgAbsorbedTons = 462.0;
    description =
      "Feedstock Inflow Shock: 20% drop in secondary collection leads to 122 t/d total intake, preserving 81.33% capacity utilization.";
  } else if (activeShockId === "operating_days") {
    retentionPct = 80;
    statusBadge = "WARNING";
    effectiveDailyInput = 132.5;
    effectiveUtilization = 88.33;
    annualFeedstock = 13860; // 52.5 * 264 days
    cbgAbsorbedTons = 462.0;
    description =
      "Operating-Time Shock: 20% reduction in annual running days (from 330 to 264 days) preserves 13,860 tons/yr processing volume.";
  } else if (activeShockId === "offtake") {
    retentionPct = 70;
    statusBadge = "CRITICAL";
    effectiveDailyInput = 132.5;
    effectiveUtilization = 88.33;
    annualFeedstock = 17325;
    cbgAbsorbedTons = 404.25; // 577.5 * 0.7
    description =
      "Downstream Off-Take Shock: 30% reduction in gas absorption leaves 404.25 tons/yr captured, necessitating storage buffer or backup flaring.";
  } else if (activeShockId === "custom") {
    retentionPct = 100 - customShockPct;
    statusBadge = customShockPct > 30 ? "CRITICAL" : "WARNING";
    const addl = 52.5 * (1 - customShockPct / 100);
    effectiveDailyInput = Number((80 + addl).toFixed(1));
    effectiveUtilization = Number(((80 + addl) / 150 * 100).toFixed(2));
    annualFeedstock = Math.round(addl * 330);
    cbgAbsorbedTons = Number((577.5 * (1 - customShockPct / 100)).toFixed(2));
    description = `Dynamic Simulator: -${customShockPct}% systemic perturbation evaluates operational retention at ${retentionPct}%.`;
  }

  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-slate-900">
              System Stress Testing & Resilience Terminal
            </h3>
            <StatusBadge type={statusBadge} />
          </div>
          <p className="text-[12px] text-slate-500 mt-1">
            Simulates exogenous shocks across feedstock supply, operating uptime, and
            product off-take absorption.
          </p>
        </div>

        {/* Status Retention Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] font-mono text-emerald-800">
            Resilience Retention:
          </span>
          <span className="text-[13px] font-mono font-bold text-emerald-700">
            {retentionPct.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Preset Shock Switcher Strip */}
      <div className="p-4 bg-slate-100/60 border-b border-slate-200 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono uppercase font-bold text-slate-500 mr-1">
          Select Shock Event:
        </span>
        <button
          type="button"
          onClick={() => setActiveShockId("nominal")}
          className={`px-3 py-1.5 rounded-lg text-[11.5px] font-mono font-semibold transition-all ${
            activeShockId === "nominal"
              ? "bg-primary text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Nominal (100%)
        </button>
        <button
          type="button"
          onClick={() => setActiveShockId("feedstock")}
          className={`px-3 py-1.5 rounded-lg text-[11.5px] font-mono font-semibold transition-all ${
            activeShockId === "feedstock"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Supply Shock (-20%)
        </button>
        <button
          type="button"
          onClick={() => setActiveShockId("operating_days")}
          className={`px-3 py-1.5 rounded-lg text-[11.5px] font-mono font-semibold transition-all ${
            activeShockId === "operating_days"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Operating Time (-20%)
        </button>
        <button
          type="button"
          onClick={() => setActiveShockId("offtake")}
          className={`px-3 py-1.5 rounded-lg text-[11.5px] font-mono font-semibold transition-all ${
            activeShockId === "offtake"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          CBG Off-Take (-30%)
        </button>
        <button
          type="button"
          onClick={() => setActiveShockId("custom")}
          className={`px-3 py-1.5 rounded-lg text-[11.5px] font-mono font-semibold transition-all ${
            activeShockId === "custom"
              ? "bg-slate-800 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Custom Slider
        </button>
      </div>

      {/* Dynamic Results Grid */}
      <div className="p-5 space-y-4">
        {/* Custom Slider Bar if active */}
        {activeShockId === "custom" && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[12px] font-mono">
              <span className="font-semibold text-slate-700">
                Adjust Custom Disruption Magnitude:
              </span>
              <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                -{customShockPct}% Shock
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={customShockPct}
              onChange={(e) => setCustomShockPct(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Minor (-5%)</span>
              <span>Standard (-20%)</span>
              <span>Severe (-40%)</span>
              <span>Extreme (-60%)</span>
            </div>
          </div>
        )}

        {/* Metric Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
              Post-Shock Daily Intake
            </span>
            <div className="text-2xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
              {effectiveDailyInput} <span className="text-[13px] font-sans font-normal text-slate-500">t/d</span>
            </div>
            <span className="text-[11.5px] font-mono text-emerald-700 mt-1 block">
              {effectiveUtilization}% Utilization
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
              Annual Material Processed
            </span>
            <div className="text-2xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
              {annualFeedstock.toLocaleString()}{" "}
              <span className="text-[13px] font-sans font-normal text-slate-500">t/yr</span>
            </div>
            <span className="text-[11.5px] font-mono text-slate-500 mt-1 block">
              Effective Run Capacity
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
              CBG Absorbed Output
            </span>
            <div className="text-2xl font-mono font-bold text-primary mt-1 tabular-nums">
              {cbgAbsorbedTons}{" "}
              <span className="text-[13px] font-sans font-normal text-slate-500">t/yr</span>
            </div>
            <span className="text-[11.5px] font-mono text-emerald-700 mt-1 block">
              {retentionPct}% Revenue Safeguarded
            </span>
          </div>
        </div>

        {/* Narrative Finding */}
        <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 text-[12px] text-slate-700 leading-relaxed flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
