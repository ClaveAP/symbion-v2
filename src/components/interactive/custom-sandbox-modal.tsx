"use client";

import React, { useState } from "react";
import { Currency, IndustrialCase, ScenarioCalculation } from "@/types/symbion";
import { calculateScenario } from "@/lib/symbion-engine";
import { formatCurrency } from "@/lib/currency";
import { X, Sparkles, Calculator } from "lucide-react";
import confetti from "canvas-confetti";

interface CustomSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
}

export function CustomSandboxModal({
  isOpen,
  onClose,
  currency,
}: CustomSandboxModalProps) {
  const [facilityName, setFacilityName] = useState<string>("My Industrial Facility");
  const [designCapacity, setDesignCapacity] = useState<number>(200);
  const [initialSupply, setInitialSupply] = useState<number>(90);
  const [operatingDays, setOperatingDays] = useState<number>(330);
  const [alpha, setAlpha] = useState<number>(0.75);

  if (!isOpen) return null;

  // Virtual case for computation
  const customCase: IndustrialCase = {
    id: "custom",
    title: facilityName,
    badge: "CUSTOM EVALUATION",
    facility: facilityName,
    location: "User Defined Site",
    imbalanceType: "input_deficit",
    primaryStream: "Custom Organic / Energy Stream",
    designCapacity,
    initialSupply,
    capacityUnit: "tons/day",
    operatingDaysPerYear: operatingDays,
    cbgYieldRatio: 5 / 150,
    fomYieldRatio: 25 / 150,
    calorificValueMJperKg: 52,
    naturalGasEmissionFactorKgPerGJ: 56.1,
    basePriceINRperMMBtu: 1478,
    description: "Live custom simulated facility.",
    actorsCount: 4,
    streamCount: 6,
  };

  const result: ScenarioCalculation = calculateScenario(customCase, alpha);

  const handleSimulate = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary-light text-primary">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Custom Facility Simulation Sandbox
              </h3>
              <p className="text-[11.5px] text-slate-500">
                Test your own industrial plant numbers using Symbion ex-ante algorithms
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Parameters Form */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Facility / Project Name:
              </label>
              <input
                type="text"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                className="w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 focus:border-primary focus:outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1 font-mono">
                Operating Days per Year:
              </label>
              <input
                type="number"
                value={operatingDays}
                onChange={(e) => setOperatingDays(Number(e.target.value))}
                className="w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 focus:border-primary focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1 font-mono">
                Design Capacity (t/day):
              </label>
              <input
                type="number"
                value={designCapacity}
                onChange={(e) => setDesignCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 focus:border-primary focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1 font-mono">
                Initial Baseline Supply (t/day):
              </label>
              <input
                type="number"
                value={initialSupply}
                onChange={(e) => setInitialSupply(Number(e.target.value))}
                className="w-full px-3 py-2 text-[13px] rounded-lg border border-slate-200 focus:border-primary focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Gap Fulfillment Slider */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[12px] font-mono">
              <span className="font-semibold text-slate-700">
                Gap Fulfillment Scenario (α):
              </span>
              <span className="font-bold text-primary bg-primary-light px-2 py-0.5 rounded">
                {(alpha * 100).toFixed(0)}% Gap Closure
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.05}
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Live Computed Results */}
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-emerald-900 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Real-Time Feasibility Results
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-800">
                {result.utilizationPct}% Utilization
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 uppercase">Input Gap</span>
                <div className="text-lg font-bold text-slate-800 mt-0.5">
                  {designCapacity - initialSupply} <span className="text-[10px]">t/d</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 uppercase">Daily Intake</span>
                <div className="text-lg font-bold text-primary mt-0.5">
                  {result.totalInputPerDay} <span className="text-[10px]">t/d</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 uppercase">Gross Revenue</span>
                <div className="text-[13px] font-bold text-emerald-700 mt-1 truncate">
                  {formatCurrency(result.grossValue[currency], currency, true)}
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 uppercase">Avoided CO₂</span>
                <div className="text-[13px] font-bold text-blue-700 mt-1">
                  ~{Math.round(result.avoidedCO2TonsYear)} <span className="text-[10px]">t/yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSimulate}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-[12px] font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Validate Solution Feasibility</span>
          </button>
        </div>
      </div>
    </div>
  );
}
