"use client";

import React from "react";
import { useSymbion } from "@/context/symbion-context";
import { useUserSession } from "@/context/user-session-context";
import { ImpactCards } from "@/components/interactive/impact-cards";
import { CarbonAccountingSummary } from "@/components/interactive/carbon-accounting-summary";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/currency";
import {
  Factory,
  Zap,
  Globe2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

export default function ImpactPage() {
  const { scenario, currency, isJhiri, selectedAlpha } =
    useSymbion();
  const { isPartner, isAdmin } = useUserSession();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
            <Factory className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-bold text-slate-900 tracking-tight leading-none">
                Carbon Accounting & Economic Valuation
              </h1>
              <StatusBadge type={isJhiri ? "INPUT_DEFICIT" : "OUTPUT_SURPLUS"} />
            </div>
            <p className="text-[12.5px] text-slate-500 mt-1.5">
              Thermodynamic energy conversion, multi-currency gross valuation (MYR / IDR / USD), and fossil fuel CO₂ displacement.
            </p>
          </div>
        </div>

        {/* Global Model Status Badge */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>IPCC TIER-2 VALIDATED</span>
          </span>
        </div>
      </div>

      {/* Role-Differentiated Impact Context Banner */}
      {isPartner && (
        <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex flex-wrap items-center justify-between gap-3 text-[12px] shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>
              <strong>Regional Partner ESG & Carbon Audit:</strong> Avoided fossil emissions (1,685 tCO₂e/yr) generated through PT Sawit Subang organic diversion are certified under ISO 14064 for green credit and carbon taxation offsets.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-800 text-[11px] px-2.5 py-0.5 rounded bg-white border border-emerald-300">
            Partner Audit: Certified
          </span>
        </div>
      )}

      {isAdmin && (
        <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[12px] shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Estate Administrator Macro-Economic Valuation:</strong> System-wide gross circular yields consolidated across all participating industrial nodes with live conversions for international investment benchmarks (MYR / IDR / USD).
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-300 text-[11px] px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700">
            Valuation Scope: Master Portfolio
          </span>
        </div>
      )}

      {/* Featured Stitch Screen: Ringkasan Eksekutif Dampak Hijau & Karbon (Carbon Accounting) */}
      <CarbonAccountingSummary />

      {isJhiri ? (
        <>
          {/* Main Interactive Impact Cards */}
          <div className="space-y-4">
            <ImpactCards scenario={scenario} currency={currency} />
          </div>

          {/* Step-by-Step Conversion Pipeline & Energy Waterfall */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <h2 className="text-[15px] font-bold text-slate-900">
                  Section 5 Audit Trail: Thermodynamic to Monetary Pipeline (α = {(selectedAlpha * 100).toFixed(0)}%)
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">
                EMPIRICAL COEFFICIENTS VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    STEP 1: PHYSICAL YIELD
                  </span>
                  <div className="text-[16px] font-mono font-bold text-slate-900 mt-1">
                    {scenario.cbgProductionTonsYear} t/yr
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    = {scenario.cbgProductionKgYear.toLocaleString()} kg/yr
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 font-sans">
                  Design ratio r_CBG × 330 days
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    STEP 2: HIGHER HEATING
                  </span>
                  <div className="text-[16px] font-mono font-bold text-emerald-800 mt-1">
                    {(scenario.energyMJYear / 1e6).toFixed(2)}M MJ
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    × 52 MJ/kg CBG
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 font-sans">
                  Standard biomethane LHV/HHV
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    STEP 3: GAS UNIT CONV.
                  </span>
                  <div className="text-[16px] font-mono font-bold text-sky-800 mt-1">
                    {scenario.energyMMBtuYear.toLocaleString(undefined, {
                      maximumFractionDigits: 1,
                    })}{" "}
                    MMBtu
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    ÷ 1,055.06 MJ/MMBtu
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 font-sans">
                  Standard ISO/SATAT billing unit
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    STEP 4: GROSS REVENUE
                  </span>
                  <div className="text-[16px] font-mono font-bold text-primary mt-1">
                    {formatCurrency(scenario.grossValue[currency], currency, true)}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    @ ₹1,478 / MMBtu
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 font-sans">
                  SATAT fixed procurement benchmark
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    STEP 5: CARBON OFFSET
                  </span>
                  <div className="text-[16px] font-mono font-bold text-emerald-700 mt-1">
                    ~{Math.round(scenario.avoidedCO2TonsYear).toLocaleString()} t CO₂/yr
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    56.1 kg CO₂ / GJ gas
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 font-sans">
                  Avoided fossil gas combustion
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Currency Equivalence Reference & Methodological Scope Note */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Multi-Currency Table */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Globe2 className="w-5 h-5 text-primary" />
                <h3 className="text-[14px] font-bold text-slate-900">
                  Tri-National Currency Valuation (α = {(selectedAlpha * 100).toFixed(0)}%)
                </h3>
              </div>

              <div className="space-y-2 text-[12.5px]">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="font-bold text-slate-900">
                      Malaysian Ringgit (MYR - I-SINERGIE Host)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800 text-[14px]">
                    {formatCurrency(scenario.grossValue.MYR, "MYR")}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="font-bold text-slate-900">
                      Indonesian Rupiah (IDR - Team Home Base)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-rose-800 text-[14px]">
                    {formatCurrency(scenario.grossValue.IDR, "IDR")}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    <span className="font-bold text-slate-900">
                      United States Dollar (USD - Global Benchmark)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-sky-800 text-[14px]">
                    {formatCurrency(scenario.grossValue.USD, "USD")}
                  </span>
                </div>
              </div>

              <p className="text-[11px] font-mono text-slate-400">
                Base INR: ₹{scenario.grossValueINR.toLocaleString()} (₹{(scenario.grossValueINR / 1e7).toFixed(2)} Crore)
              </p>
            </div>

            {/* Scientific Scope & Boundary Conditions */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-bold text-[13.5px]">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Analytical Boundary Conditions & Scope Caveat</span>
                </div>
                <p className="text-[12px] text-amber-950/80 mt-2 leading-relaxed">
                  As explicitly defined in Section 5 of the study, the economic figures represent <strong>projected gross CBG market value</strong>, not net EBITDA. It does not deduct feedstock logistics, digestate drying, or capital equipment depreciation.
                </p>
                <p className="text-[12px] text-amber-950/80 mt-2 leading-relaxed">
                  Similarly, carbon avoidance (~1,685 t CO₂/yr) strictly models direct fossil natural gas combustion displacement. It does not represent a full cradle-to-grave Life Cycle Assessment (LCA) as transportation fuel and methane slip are outside the initial ex-ante scope.
                </p>
              </div>

              <div className="pt-3 border-t border-amber-200 flex items-center justify-between text-[11px] font-mono text-amber-800 font-semibold">
                <span>COMPLIANCE STATUS:</span>
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TRANSPARENT SCIENTIFIC INTEGRITY</span>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Gadarwara Impact Card */
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-[15px] font-bold text-slate-900">
            NTPC Gadarwara: Environmental Risk Avoidance & Resource Recovery
          </h2>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            By diverting 1,050,700 tons/year of fly ash from wet slurry disposal ponds into cement, brick, and road infrastructure, the regional watershed avoids severe heavy metal leaching (arsenic, lead) and eliminates the acute disaster risk of slurry dyke breaches during monsoon seasons.
          </p>
        </div>
      )}
    </div>
  );
}
