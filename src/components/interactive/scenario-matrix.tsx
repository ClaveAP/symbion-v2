"use client";

import React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Sliders, TrendingUp } from "lucide-react";

interface ScenarioMatrixProps {
  selectedAlpha: number;
  onSelectAlpha: (alpha: number) => void;
}

export function ScenarioMatrix({
  selectedAlpha,
  onSelectAlpha,
}: ScenarioMatrixProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Header & Explanatory Lead */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-slate-900">
              Ex-Ante Scenario Gap-Fulfillment Matrix (α)
            </h3>
            <StatusBadge type="ASSUMPTION" label="EVALUATION SCENARIOS" />
          </div>
          <p className="text-[12px] text-slate-500 mt-1">
            Evaluating recovery pathways across 50%, 75%, and 100% input gap closure
            relative to the 80 t/d baseline.
          </p>
        </div>

        {/* Quick Slider Selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          <Sliders className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-mono font-semibold text-slate-600">
            Active α:
          </span>
          <span className="text-[12px] font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary-light">
            {(selectedAlpha * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Responsive Interactive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12.5px] border-collapse">
          <thead>
            <tr className="bg-slate-100/75 text-slate-600 text-[11px] font-mono uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Evaluation Indicator</th>
              <th className="py-3 px-4 text-center">Baseline (0%)</th>
              <th className="py-3 px-4 text-center">Conservative (50%)</th>
              <th className="py-3 px-4 text-center bg-emerald-50/60 text-emerald-900 font-bold border-x border-emerald-200/80">
                Representative (75%)
              </th>
              <th className="py-3 px-4 text-center">Full Loop (100%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[12px]">
            {/* Row 1: Additional Supply */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <td className="py-3 px-4 font-sans font-semibold text-slate-800">
                Additional Supply Inflow (ΔS)
              </td>
              <td className="py-3 px-4 text-center text-slate-400">—</td>
              <td className="py-3 px-4 text-center text-slate-700 font-semibold">
                +35.0 t/d
              </td>
              <td className="py-3 px-4 text-center bg-emerald-50/30 font-bold text-emerald-800 border-x border-emerald-100">
                +52.5 t/d
              </td>
              <td className="py-3 px-4 text-center text-slate-700 font-semibold">
                +70.0 t/d
              </td>
            </tr>

            {/* Row 2: Total Input */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <td className="py-3 px-4 font-sans font-semibold text-slate-800">
                Total Operational Intake
              </td>
              <td className="py-3 px-4 text-center text-slate-600">80.0 t/d</td>
              <td className="py-3 px-4 text-center text-slate-700 font-semibold">
                115.0 t/d
              </td>
              <td className="py-3 px-4 text-center bg-emerald-50/30 font-bold text-emerald-800 border-x border-emerald-100">
                132.5 t/d
              </td>
              <td className="py-3 px-4 text-center text-slate-700 font-semibold">
                150.0 t/d
              </td>
            </tr>

            {/* Row 3: Capacity Utilization */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <td className="py-3 px-4 font-sans font-semibold text-slate-800">
                Capacity Utilization (U)
              </td>
              <td className="py-3 px-4 text-center text-slate-500">53.33%</td>
              <td className="py-3 px-4 text-center text-slate-700">76.67%</td>
              <td className="py-3 px-4 text-center bg-emerald-50/30 font-bold text-emerald-700 border-x border-emerald-100 text-[13px]">
                88.33%
              </td>
              <td className="py-3 px-4 text-center text-primary font-bold">100.0%</td>
            </tr>

            {/* Row 4: Remaining Gap */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <td className="py-3 px-4 font-sans font-semibold text-slate-800">
                Unfilled Capacity Deficit
              </td>
              <td className="py-3 px-4 text-center text-amber-700 font-semibold">
                70.0 t/d
              </td>
              <td className="py-3 px-4 text-center text-amber-600">35.0 t/d</td>
              <td className="py-3 px-4 text-center bg-emerald-50/30 font-semibold text-amber-800 border-x border-emerald-100">
                17.5 t/d
              </td>
              <td className="py-3 px-4 text-center text-emerald-700 font-bold">0.0 t/d</td>
            </tr>

            {/* Row 5: Action Button to apply */}
            <tr className="bg-slate-50/30">
              <td className="py-3 px-4 font-sans text-[11px] text-slate-400">
                Click to set dashboard context:
              </td>
              {[0, 0.5, 0.75, 1.0].map((alpha) => {
                const isSelected = selectedAlpha === alpha;
                return (
                  <td
                    key={alpha}
                    className={`py-2.5 px-3 text-center ${
                      alpha === 0.75 ? "border-x border-emerald-200/70" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectAlpha(alpha)}
                      className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-sans font-semibold transition-all ${
                        isSelected
                          ? "bg-primary text-white shadow-xs font-bold ring-2 ring-primary/30"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {isSelected ? "Active" : `Apply ${(alpha * 100).toFixed(0)}%`}
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Methodological Context Callout Banner */}
      <div className="p-4 bg-emerald-50/40 border-t border-emerald-100 text-[11.5px] text-slate-600 flex items-start gap-2.5">
        <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800 font-semibold">Methodology Note:</strong> The{" "}
          <span className="text-primary font-bold">75% scenario (52.5 t/d)</span> is adopted
          as the representative configuration to demonstrate downstream economic and
          environmental yields in detail, acting as an intermediate empirical baseline between
          partial and full gap closure.
        </p>
      </div>
    </div>
  );
}
