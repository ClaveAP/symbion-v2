"use client";

import React from "react";
import { Currency, ScenarioCalculation } from "@/types/symbion";
import { formatCurrency } from "@/lib/currency";
import { StatusBadge } from "@/components/ui/status-badge";
import { DollarSign, Leaf, Info, Flame, Trees, Car } from "lucide-react";

interface ImpactCardsProps {
  scenario: ScenarioCalculation;
  currency: Currency;
}

export function ImpactCards({ scenario, currency }: ImpactCardsProps) {
  const currentGross = scenario.grossValue[currency];
  const formattedGross = formatCurrency(currentGross, currency, true);
  const formattedDetailed = formatCurrency(currentGross, currency, false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* CARD 1: ECONOMIC VALUATION */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-50 text-primary border border-emerald-200/60">
                <DollarSign className="w-4 h-4" />
              </div>
              <h4 className="text-[15px] font-bold text-slate-900">
                Projected Gross Economic Value
              </h4>
            </div>
            <StatusBadge type="PROJECTED" label="GROSS PROJECTION" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-mono font-bold text-primary tracking-tight tabular-nums">
                {formattedGross}
              </span>
              <span className="text-[13px] font-mono text-slate-500 font-medium">
                / year
              </span>
            </div>
            <div className="text-[12px] font-mono text-slate-500 mt-1">
              Exact Amount:{" "}
              <span className="font-semibold text-slate-800">{formattedDetailed}</span> / yr
            </div>
          </div>

          {/* Energy Conversion Footprint */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-[11.5px] font-mono">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Thermal Energy Content:
              </span>
              <span className="font-bold text-slate-900">
                {scenario.energyMJYear.toLocaleString()} MJ/yr
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Standard MMBtu Equivalent:</span>
              <span className="font-bold text-slate-900">
                {scenario.energyMMBtuYear.toLocaleString()} MMBtu/yr
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200">
              <span>Benchmark Gas Tariff (₹1,478/MMBtu):</span>
              <span className="font-bold text-emerald-800">
                ₹{(scenario.grossValue.INR / 10_000_000).toFixed(2)} Crore/yr
              </span>
            </div>
          </div>
        </div>

        {/* Caveat Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-normal">
            Reflects projected gross revenues based on energy equivalence. Excludes raw
            collection/transport logistics and auxiliary facility operating expenses (OPEX).
          </p>
        </div>
      </div>

      {/* CARD 2: CARBON DISPLACEMENT IMPACT */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-[15px] font-bold text-slate-900">
                Avoided Fossil Fuel Carbon Emissions
              </h4>
            </div>
            <StatusBadge type="FACT" label="EMISSION OFFSET" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-mono font-bold text-blue-700 tracking-tight tabular-nums">
                ~{Math.round(scenario.avoidedCO2TonsYear).toLocaleString()}
              </span>
              <span className="text-[13px] font-mono text-slate-500 font-medium">
                tons CO₂e / year
              </span>
            </div>
            <p className="text-[12px] text-slate-500 mt-1">
              Based on empirical natural gas displacement factor of{" "}
              <strong className="text-slate-700 font-mono">56.1 kg CO₂ / GJ</strong>.
            </p>
          </div>

          {/* Environmental Equivalencies */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-[11.5px] font-mono">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-blue-600" />
                Equivalent Passenger Vehicles:
              </span>
              <span className="font-bold text-slate-900">
                ~{Math.round(scenario.avoidedCO2TonsYear / 4.6)} cars off road / yr
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5 text-emerald-600" />
                Urban Forest Sequestration:
              </span>
              <span className="font-bold text-slate-900">
                ~{Math.round(scenario.avoidedCO2TonsYear * 45).toLocaleString()} tree
                seedlings (10 yrs)
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200">
              <span>Bio-Fertilizer (FOM) Soil Co-Benefit:</span>
              <span className="font-bold text-emerald-700">
                {scenario.fomProductionTonsYear.toLocaleString()} t/yr organic sink
              </span>
            </div>
          </div>
        </div>

        {/* Caveat Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-normal">
            Calculated strictly from avoided combustion of fossil natural gas. Does not represent
            cradle-to-grave lifecycle emissions (transport fuel, fugitives, or digestate handling).
          </p>
        </div>
      </div>
    </div>
  );
}
