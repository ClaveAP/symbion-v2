"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useSymbion } from "@/context/symbion-context";
import { formatCurrency } from "@/lib/currency";
import {
  Leaf,
  Wind,
  Recycle,
  Droplets,
  Zap,
  Home,
  TrendingUp,
  Factory,
  Sparkles,
  Download,
  Handshake,
  CheckCircle2,
  Check,
  Trees,
  Wheat,
  Egg,
  Layers,
} from "lucide-react";

export function CarbonAccountingSummary() {
  const { currency, scenario } = useSymbion();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const formattedGrossValue = formatCurrency(
    scenario.grossValue[currency],
    currency,
    true
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleAjukanKerjasama = () => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2c7a4b", "#7fb8a3", "#a4f4ba"],
      });
    }
    showToast(
      "Partnership dossier submitted to the Eco-Industrial Park Authority!"
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Banner & Circularity Score */}
      <div className="rounded-2xl bg-white p-6 md:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#2c7a4b] text-[11px] font-mono font-bold tracking-wide uppercase border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Empirical Carbon Accounting
            </div>
            <h2 className="text-[24px] md:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Executive Carbon & Environmental Accounting
            </h2>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Ex-ante valuation of industrial and municipal residue valorization into clean biomethane, bio-fertilizers, and fossil emission displacement for the Ranchi & Gadarwara Eco-Industrial Corridors.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-[#2c7a4b] border border-emerald-200">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10.5px] font-mono uppercase text-slate-400 font-bold block">
                  Circularity Index
                </span>
                <span className="text-[20px] font-bold text-[#2c7a4b] leading-tight font-mono">
                  88.33% Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Impact Metrics (Exact Stitch Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Hero Green Metric */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 p-5 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2c7a4b] text-white text-[10px] font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-3 h-3" />
                Primary Carbon Avoidance
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#2c7a4b]">
                <Wind className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 font-medium">
              Carbon Emissions Avoided
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-extrabold text-[#2c7a4b] tracking-tight font-mono">
                {scenario.avoidedCO2TonsYear.toLocaleString()}
              </span>
              <span className="text-[12px] font-medium text-slate-600 font-mono">
                tCO₂e / year
              </span>
            </div>
          </div>
          <div className="pt-3 mt-3 bg-white/90 rounded-xl p-2.5 border border-emerald-100 flex items-center gap-2">
            <Trees className="w-4 h-4 text-[#2c7a4b] shrink-0" />
            <p className="text-[11px] text-slate-600 leading-snug">
              Equivalent to planting <strong className="text-slate-900 font-bold font-mono">27,500 trees</strong> or removing <strong className="text-slate-900 font-bold font-mono">360 passenger cars</strong> annually.
            </p>
          </div>
        </div>

        {/* Metric 2: Material Circulation */}
        <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Material Recirculation
              </span>
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
                <Recycle className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 font-medium">
              Waste Diverted
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-extrabold text-slate-900 tracking-tight font-mono">
                {scenario.annualFeedstockProcessedTons.toLocaleString()}
              </span>
              <span className="text-[12px] font-medium text-slate-600 font-mono">
                t / year
              </span>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-2 text-slate-600">
            <Droplets className="w-4 h-4 text-teal-600 shrink-0" />
            <p className="text-[11px] leading-snug">
              <strong className="text-slate-900 font-bold font-mono">132.5 t/day</strong> segregated wet organic waste diverted from landfills to CSTR digestion.
            </p>
          </div>
        </div>

        {/* Metric 3: Clean Production */}
        <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Clean Fuel Yield
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 font-medium">
              Compressed Biogas (CBG)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-extrabold text-slate-900 tracking-tight font-mono">
                {scenario.cbgProductionTonsYear.toLocaleString()}
              </span>
              <span className="text-[12px] font-medium text-slate-600 font-mono">
                tons / year
              </span>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-2 text-slate-600">
            <Home className="w-4 h-4 text-[#2c7a4b] shrink-0" />
            <p className="text-[11px] leading-snug">
              Yields <strong className="text-slate-900 font-bold font-mono">85,800 GJ/yr</strong> clean compressed biomethane replacing fossil natural gas.
            </p>
          </div>
        </div>

        {/* Metric 4: Economic Value */}
        <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Commercial Off-take
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#2c7a4b]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 font-medium">
              Annual Economic Dividends
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-extrabold text-[#2c7a4b] tracking-tight font-mono">
                {formattedGrossValue}
              </span>
              <span className="text-[12px] font-medium text-slate-600 font-mono">
                / year
              </span>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-2 text-slate-600">
            <Factory className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-[11px] leading-snug">
              Combined commercial sales across CBG fuel and Fermented Organic Manure (FOM).
            </p>
          </div>
        </div>
      </div>

      {/* 3. 3-Step Circular Transformation Flow */}
      <div className="rounded-2xl bg-white p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold uppercase tracking-wider">
            STEP-BY-STEP CIRCULAR BLUEPRINT
          </div>
          <h3 className="text-[18px] font-bold text-slate-900 mt-1">
            Resilient Circular Valorization Architecture
          </h3>
          <p className="text-[12.5px] text-slate-500 mt-0.5">
            Demonstrating how multi-source agro-industrial streams close operational deficits and deliver bankable returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative pt-1">
          {/* Step 1 */}
          <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200/80 relative flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#2c7a4b] text-white text-[12px] flex items-center justify-center font-bold">
                  1
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  FEEDSTOCK DEFICIT CLOSURE
                </span>
              </div>
              <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center text-[#2c7a4b] mb-3 shadow-2xs border border-slate-200">
                <Factory className="w-5 h-5" />
              </div>
              <h4 className="text-[14px] font-bold text-slate-900 mb-1">
                1. Multi-Stream Sourcing
              </h4>
              <p className="text-[12.5px] text-slate-600 leading-relaxed">
                Ranchi Municipal Corporation (<strong className="text-slate-900 font-bold">80.0 t/d baseline</strong>) paired with Pandra Wholesale Agri-Mandi (<strong className="text-slate-900 font-bold">+52.5 t/d</strong>) bridges the input deficit.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[#2c7a4b] text-[11px] font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Flow Sensor Monitored: Jhiri Ranchi Axis #1</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200/80 relative flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#2c7a4b] text-white text-[12px] flex items-center justify-center font-bold">
                  2
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  ANAEROBIC VALORIZATION
                </span>
              </div>
              <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center text-teal-700 mb-3 shadow-2xs border border-slate-200">
                <Recycle className="w-5 h-5" />
              </div>
              <h4 className="text-[14px] font-bold text-slate-900 mb-1">
                2. Continuous CSTR Digestion
              </h4>
              <p className="text-[12.5px] text-slate-600 leading-relaxed">
                Continuous Stirred-Tank Digesters restore capacity utilization to <strong className="text-slate-900 font-bold">88.33% (132.5 t/d)</strong> with high methane yield and zero fugitive losses.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-teal-700 text-[11px] font-mono font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Closed-Loop Thermophilic Digester</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-emerald-50/40 p-5 rounded-xl border border-emerald-200/80 relative flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-[#2c7a4b] text-white text-[12px] flex items-center justify-center font-bold">
                  3
                </span>
                <span className="text-[10px] font-mono text-[#2c7a4b] uppercase font-bold">
                  REGIONAL VALUE DELIVERY
                </span>
              </div>
              <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center text-[#2c7a4b] mb-3 shadow-2xs border border-emerald-200">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-[14px] font-bold text-slate-900 mb-1">
                3. Biomethane & Fertilizer Off-take
              </h4>
              <p className="text-[12.5px] text-slate-600 leading-relaxed">
                Dispatch of <strong className="text-slate-900 font-bold">1,650 t/yr CBG</strong> into City Gas Distribution networks and <strong className="text-slate-900 font-bold">8,250 t/yr FOM</strong> for organic soil conditioning.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-1.5 text-[#2c7a4b] text-[11px] font-mono font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>SATAT Indexed Off-take & FPO Supply</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Feasibility Notes & 5 Identified Waste Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Feasibility Verification Notes */}
        <div className="lg:col-span-6 rounded-2xl bg-white p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  BANKABLE FEASIBILITY METRICS
                </span>
                <h3 className="text-[16px] font-bold text-slate-900 mt-0.5">
                  Eco-Industrial Investment Assessment
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#2c7a4b] text-[11px] font-bold font-mono">
                SCORE: 94/100
              </span>
            </div>

            {/* 3 Validation Checklists */}
            <div className="space-y-2.5 my-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="w-5 h-5 rounded-full bg-[#2c7a4b] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-900">
                    Sustainable & Abundant Feedstock Security
                  </h4>
                  <p className="text-[11.5px] text-slate-600 mt-0.5 leading-snug">
                    Municipal wet waste combined with wholesale vegetable market residue secures 88.33% design capacity across 330 operational days/year.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="w-5 h-5 rounded-full bg-[#2c7a4b] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-900">
                    Bankable Commercial Payback
                  </h4>
                  <p className="text-[11.5px] text-slate-600 mt-0.5 leading-snug">
                    Projected positive cashflows starting Q3 of operations, achieving full capital payback within 3.2 years via SATAT offtake.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="w-5 h-5 rounded-full bg-[#2c7a4b] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-900">
                    Environmental Compliance & Net-Zero Target
                  </h4>
                  <p className="text-[11.5px] text-slate-600 mt-0.5 leading-snug">
                    Diverts 43,725 t/yr of organic waste from unmanaged dumpsites, directly avoiding 1,685 tCO₂e/yr in equivalent fossil emissions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto px-4 py-2 bg-[#2c7a4b] hover:bg-[#23613c] text-white rounded-xl text-[12.5px] font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Executive Brief (PDF)</span>
            </button>
            <button
              type="button"
              onClick={handleAjukanKerjasama}
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[12.5px] font-semibold transition-all flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
            >
              <Handshake className="w-4 h-4 text-[#2c7a4b]" />
              <span>Submit Partnership Inquiry</span>
            </button>
          </div>
        </div>

        {/* Right Column: 5 Identified Waste Streams */}
        <div className="lg:col-span-6 rounded-2xl bg-white p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  REGIONAL RESIDUE DATABASE
                </span>
                <h3 className="text-[16px] font-bold text-slate-900 mt-0.5">
                  5 Identified Industrial & Urban Waste Streams
                </h3>
              </div>
              <span className="text-[10.5px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-semibold">
                Jhiri & Gadarwara
              </span>
            </div>
            <p className="text-[12px] text-slate-500 mb-3">
              Spatial inventory of regional biomass and industrial byproducts ready for industrial symbiosis valorization.
            </p>

            {/* List 5 Items with Progress Bars */}
            <div className="space-y-3">
              {/* Item 1: Municipal Wet Waste */}
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#2c7a4b] text-white flex items-center justify-center">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                        1. Segregated Municipal Wet Waste
                      </span>
                      <span className="text-[10.5px] text-[#2c7a4b] font-semibold">
                        Priority #1 — Committed Baseline Supply
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-slate-900 font-mono block leading-tight">
                      80.0
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      tons / day
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-[#2c7a4b] h-full w-full rounded-full" />
                </div>
                <div className="flex justify-between items-center mt-1.5 text-[10.5px] text-slate-500">
                  <span>Recommendation: GAIL Jhiri CBG Plant Intake</span>
                  <span className="text-[#2c7a4b] font-bold">100% Committed</span>
                </div>
              </div>

              {/* Item 2: Mandi Organic Waste */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Wheat className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                        2. Wholesale Agri-Mandi Vegetable Waste
                      </span>
                      <span className="text-[10.5px] text-amber-700 font-semibold">
                        Priority #2 — Secondary Gap Closure
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-slate-900 font-mono block leading-tight">
                      52.5
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      tons / day
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-amber-500 h-full w-[75%] rounded-full" />
                </div>
                <div className="flex justify-between items-center mt-1.5 text-[10.5px] text-slate-500">
                  <span>Recommendation: Secondary Anaerobic Co-Digestion</span>
                  <span className="text-amber-700 font-semibold">Gap Closure α = 75%</span>
                </div>
              </div>

              {/* Item 3: Agricultural Crop Straw */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                      <Trees className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                        3. Agricultural Crop Residue / Straw
                      </span>
                      <span className="text-[10.5px] text-slate-500">
                        C/N Ratio Balancing & Biomass Briquetting
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-slate-900 font-mono block leading-tight">
                      30.0
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      tons / day
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-teal-600 h-full w-[50%] rounded-full" />
                </div>
                <div className="flex justify-between items-center mt-1.5 text-[10.5px] text-slate-500">
                  <span>Recommendation: Thermal densification & co-digestion</span>
                  <span className="font-semibold text-teal-700">Identified (50%)</span>
                </div>
              </div>

              {/* Item 4: Dairy & Cattle Manure */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                      <Egg className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                        4. Dairy Cattle Slurry & Manure
                      </span>
                      <span className="text-[10.5px] text-slate-500">
                        Microbial Inoculum & Bio-Slurry
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-slate-900 font-mono block leading-tight">
                      20.0
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      tons / day
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-slate-400 h-full w-[35%] rounded-full" />
                </div>
                <div className="flex justify-between items-center mt-1.5 text-[10.5px] text-slate-500">
                  <span>Recommendation: Anaerobic bacterial starter</span>
                  <span className="font-semibold text-slate-600">Active Supply (35%)</span>
                </div>
              </div>

              {/* Item 5: Pulverized Coal Fly Ash */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                        5. Pulverized Coal Fly Ash (NTPC)
                      </span>
                      <span className="text-[10.5px] text-sky-700 font-semibold">
                        Gadarwara STPS — 1.05M t/yr Unutilized
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-slate-900 font-mono block leading-tight">
                      4,616
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      tons / day
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-sky-600 h-full w-[37.6%]" />
                </div>
                <div className="flex justify-between items-center mt-1.5 text-[10.5px] text-slate-500">
                  <span>Recommendation: Cement blending & geopolymer road bricks</span>
                  <span className="font-semibold text-sky-700">37.6% Absorbed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px] font-mono">
            <span>Aggregated Sinks: 2 National Industrial Hubs</span>
            <span className="text-[#2c7a4b] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Empirical Field Data Synchronized
            </span>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 max-w-md bg-white border border-emerald-300 shadow-xl rounded-xl p-4 flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2c7a4b] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#2c7a4b]" />
          </div>
          <div>
            <div className="text-[12.5px] font-bold text-slate-900">
              System Notification
            </div>
            <div className="text-[11.5px] text-slate-600 mt-0.5">
              {toastMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
