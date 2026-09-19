import React from "react";
import { BookOpen } from "lucide-react";

export function MethodologyCard() {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary-light text-primary">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">
              Mathematical Formulation & Logic Proof
            </h3>
            <p className="text-[12px] text-slate-500">
              Peer-reviewed ex-ante evaluation logic for symbiotic capacity allocation
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold">
          SECTION 3 & 4 AUDIT
        </span>
      </div>

      {/* Grid of Formulas */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-800">
        {/* Case 1: Input Deficit */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h4 className="text-[13px] font-bold text-slate-900 font-sans">
              1. Input Deficit Formulation (Jhiri CBG)
            </h4>
          </div>
          <div className="space-y-2 text-[12px] font-mono text-slate-700">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">CAPACITY DEFICIT (GAP):</span>
              <code className="text-slate-900 font-bold">
                Gap = C_design - S_initial = 150 - 80 = 70 t/day
              </code>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">CAPACITY UTILIZATION:</span>
              <code className="text-slate-900 font-bold">
                U = (S_initial / C_design) × 100% = (80 / 150) × 100% = 53.33%
              </code>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">SCENARIO INFLOW (α = 75%):</span>
              <code className="text-slate-900 font-bold">
                ΔS = 0.75 × 70 = 52.5 t/day → Total = 132.5 t/day (88.33%)
              </code>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">ANNUAL FEEDSTOCK & CBG/FOM:</span>
              <code className="text-slate-900 font-bold">
                M_yr = 52.5 × 330 = 17,325 t/yr → CBG = 577.5 t, FOM = 2,887.5 t
              </code>
            </div>
          </div>
        </div>

        {/* Case 2: Output Surplus & Impacts */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h4 className="text-[13px] font-bold text-slate-900 font-sans">
              2. Output Surplus (Gadarwara) & Impacts
            </h4>
          </div>
          <div className="space-y-2 text-[12px] font-mono text-slate-700">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">UNUTILIZED SURPLUS BALANCE:</span>
              <code className="text-slate-900 font-bold">
                B = 1,685,000 - 634,300 = 1,050,700 t/yr (62.35% surplus)
              </code>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">THERMAL ENERGY & GROSS REVENUE:</span>
              <code className="text-slate-900 font-bold">
                577.5t × 52 MJ/kg = 30.03M MJ = 28,462.84 MMBtu × ₹1,478 = ₹4.21 Cr
              </code>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">AVOIDED FOSSIL CARBON:</span>
              <code className="text-slate-900 font-bold">
                30,030 GJ × 56.1 kg CO₂/GJ = 1,684.68 t CO₂/yr ≈ 1,685 t CO₂
              </code>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-[10px]">RESILIENCE RETENTION:</span>
              <code className="text-slate-900 font-bold">
                Retention = (Throughput_post_shock / Throughput_nominal) × 100%
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
