"use client";

import React, { useState } from "react";
import { useSymbion } from "@/context/symbion-context";
import { useUserSession } from "@/context/user-session-context";
import { TopologyCanvas } from "@/components/interactive/topology-canvas";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Activity,
  Layers,
  Sparkles,
  Move,
  Info,
  CheckCircle2,
} from "lucide-react";

export default function TopologyPage() {
  const { currentCase, scenario, isJhiri, selectedAlpha } = useSymbion();
  const { isPartner, isAdmin } = useUserSession();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "inflow" | "outflow">("all");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center border border-sky-200 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[16px] sm:text-[18px] font-bold text-slate-900 tracking-tight leading-snug">
                Material Flow Topology Workspace
              </h1>
              <StatusBadge type={isJhiri ? "INPUT_DEFICIT" : "OUTPUT_SURPLUS"} />
            </div>
            <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 mt-1 leading-snug">
              Interactive bipartite network mapping feedstock sources, core digestion hub, and secondary byproduct sinks.
            </p>
          </div>
        </div>

        {/* Live Canvas Tooltip & Stats */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] sm:text-[11px] w-full sm:w-auto">
          <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            <Move className="w-3.5 h-3.5 text-primary" />
            <span>DRAGGABLE NODES</span>
          </span>
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
            MASS BALANCE: 100% BALANCED
          </span>
        </div>
      </div>

      {/* Role-Differentiated Topology Status Banner */}
      {isPartner && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex flex-wrap items-center justify-between gap-2.5 text-[11.5px] sm:text-[12px] shadow-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse mt-1 sm:mt-0 shrink-0" />
            <span>
              <strong>Regional Partner Inflow Active:</strong> PT Sawit Subang node is currently routing 5,000 m³/mo POME & 800 t/mo EFB to the Central Digester Hub. Mass balance equilibrium is sustained at 100%.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-800 text-[10.5px] sm:text-[11px] px-2.5 py-0.5 rounded bg-white border border-emerald-300 self-end sm:self-auto">
            Node Status: Active & Contracted
          </span>
        </div>
      )}

      {isAdmin && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-[11.5px] sm:text-[12px] shadow-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse mt-1 sm:mt-0 shrink-0" />
            <span>
              <strong>Estate Administrator Master Graph:</strong> Full bipartite flow routing enabled across upstream generators, anaerobic digesters, and industrial off-take sinks.
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-300 text-[10.5px] sm:text-[11px] px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 self-end sm:self-auto">
            Authority: Root Flow Routing
          </span>
        </div>
      )}

      {/* Stream Filter Toggle Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-slate-400 px-1 sm:px-2">
            STREAM FILTER:
          </span>
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-[10.5px] sm:text-[11.5px] font-medium">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-2.5 sm:px-3 py-1 rounded-md transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-white text-slate-900 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Streams ({currentCase.streamCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("inflow")}
              className={`px-2.5 sm:px-3 py-1 rounded-md transition-all cursor-pointer ${
                selectedFilter === "inflow"
                  ? "bg-white text-slate-900 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Feedstock Inflows
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("outflow")}
              className={`px-2.5 sm:px-3 py-1 rounded-md transition-all cursor-pointer ${
                selectedFilter === "outflow"
                  ? "bg-white text-slate-900 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Product Off-takes
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Click & drag any node to explore spatial layout</span>
        </div>
      </div>

      {/* Full-Featured Topology Canvas */}
      <div className="space-y-3">
        <TopologyCanvas currentCase={currentCase} scenario={scenario} />
      </div>

      {/* Network Nodes & Streams Inventory Table */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-[15px] font-bold text-slate-900">
              Industrial Nodes & Stream Attribution Registry
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-semibold">
            MASS BALANCE INTEGRITY CHECK
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-left font-mono text-[11px] text-slate-500 uppercase">
                <th className="py-2.5 px-3">Node Classification</th>
                <th className="py-2.5 px-3">Industrial Actor</th>
                <th className="py-2.5 px-3">Material Stream</th>
                <th className="py-2.5 px-3">Nominal Rate</th>
                <th className="py-2.5 px-3">Symbiosis Condition</th>
                <th className="py-2.5 px-3">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {isJhiri ? (
                <>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                      Inflow Source A
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      Ranchi Municipal Corp (RMC)
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Segregated Wet Organic Waste
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      80.0 t/day
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        Baseline Existing
                      </span>
                    </td>
                    <td className="py-3 px-3 text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified [FACT]</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 bg-emerald-50/20">
                    <td className="py-3 px-3 font-mono font-semibold text-emerald-800">
                      Inflow Source B
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      Agro & Market Agro-Processing
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Agro-residues & Mandi Waste
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                      +{scenario.additionalSupplyPerDay} t/day
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                        α = {(selectedAlpha * 100).toFixed(0)}% Symbiosis
                      </span>
                    </td>
                    <td className="py-3 px-3 text-emerald-700 font-medium flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Modeled [ASSUMPTION]</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 bg-slate-50/40">
                    <td className="py-3 px-3 font-mono font-semibold text-primary">
                      Central Hub
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      GAIL Jhiri CBG Facility
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Total Intake & Digestion
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {scenario.totalInputPerDay} t/day
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-sky-100 text-sky-800 border border-sky-300 font-bold">
                        {scenario.utilizationPct}% Utilization
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sky-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Operational Hub</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                      Off-take Sink A
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      City Gas Distribution (CGD) Network
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Compressed Biogas (CBG 95% CH₄)
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {scenario.cbgProductionPerDay} t/day ({scenario.cbgProductionTonsYear} t/yr)
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        Energy Off-take
                      </span>
                    </td>
                    <td className="py-3 px-3 text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SATAT Verified</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                      Off-take Sink B
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      Regional Agricultural Cooperatives
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Fermented Organic Manure (FOM)
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {scenario.fomProductionPerDay} t/day ({scenario.fomProductionTonsYear} t/yr)
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        Bio-fertilizer
                      </span>
                    </td>
                    <td className="py-3 px-3 text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Bio-fertilizer Standard</span>
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                      Generator
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      NTPC Gadarwara STPS (2x800MW)
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Combustion Pulverized Fly Ash
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      1,685,000 t/year
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-rose-100 text-rose-800 border border-rose-200">
                        Thermal Byproduct
                      </span>
                    </td>
                    <td className="py-3 px-3 text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified [FACT]</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                      Active User
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      Regional Cement Manufacturers
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Pozzolana Cement Blending
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                      634,300 t/year
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-200">
                        37.64% Utilized
                      </span>
                    </td>
                    <td className="py-3 px-3 text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Certified Sink</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 bg-amber-50/30">
                    <td className="py-3 px-3 font-mono font-semibold text-amber-800">
                      Orphan Stream
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      On-site Ash Slurry Pond (Lagoon)
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      Unutilized Balance (Disposal Risk)
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-700">
                      1,050,700 t/year
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                        62.35% Unutilized
                      </span>
                    </td>
                    <td className="py-3 px-3 text-amber-700 font-medium flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Requires Sinks</span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
