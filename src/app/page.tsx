"use client";

import React from "react";
import Link from "next/link";
import { useSymbion } from "@/context/symbion-context";
import { useUserSession } from "@/context/user-session-context";
import { ExecutiveSymbiosisGrid } from "@/components/interactive/executive-symbiosis-grid";
import { ProjectFeasibilityCard } from "@/components/interactive/project-feasibility-card";
import { APP_NAVIGATION_ITEMS } from "@/components/layout/navigation-config";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Droplets,
  Factory,
  Gauge,
  Home,
  Leaf,
  MapPin,
  Network,
  Recycle,
  ShieldCheck,
  TrendingUp,
  Trees,
  Zap,
} from "lucide-react";

interface ImpactCardProps {
  label: string;
  value: string;
  unit: string;
  description: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "sky" | "amber" | "slate";
  featured?: boolean;
}

const impactTones = {
  emerald: {
    card: "border-emerald-200 bg-emerald-50/70",
    icon: "border-emerald-200 bg-white text-emerald-700",
    value: "text-emerald-800",
    label: "text-emerald-800",
  },
  sky: {
    card: "border-sky-200 bg-white",
    icon: "border-sky-100 bg-sky-50 text-sky-700",
    value: "text-slate-950",
    label: "text-slate-600",
  },
  amber: {
    card: "border-amber-200 bg-white",
    icon: "border-amber-100 bg-amber-50 text-amber-700",
    value: "text-slate-950",
    label: "text-slate-600",
  },
  slate: {
    card: "border-slate-200 bg-white",
    icon: "border-emerald-100 bg-emerald-50 text-emerald-700",
    value: "text-emerald-800",
    label: "text-slate-600",
  },
};

function ImpactCard({
  label,
  value,
  unit,
  description,
  icon: Icon,
  tone,
  featured = false,
}: ImpactCardProps) {
  const styles = impactTones[tone];

  return (
    <article
      className={cn(
        "flex min-h-[216px] flex-col justify-between rounded-xl border p-5 shadow-xs",
        styles.card
      )}
    >
      <div>
        <div className="mb-6 flex items-start justify-between gap-3">
          <span className={cn("text-[12px] font-bold uppercase", styles.label)}>
            {label}
          </span>
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
              styles.icon
            )}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </span>
        </div>

        {featured && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-2.5 py-1 text-[11px] font-bold text-white">
            <ShieldCheck className="h-3.5 w-3.5" />
            Flagship validated outcome
          </div>
        )}

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <strong className={cn("text-[32px] font-extrabold leading-none tabular-nums", styles.value)}>
            {value}
          </strong>
          <span className="text-[13px] font-semibold text-slate-600">{unit}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200/80 pt-4 text-[13px] leading-5 text-slate-600">
        {description}
      </div>
    </article>
  );
}

export default function ExecutiveOverviewPage() {
  const {
    currentCaseId,
    setCurrentCaseId,
    currentCase,
    scenario,
    currency,
    isJhiri,
  } = useSymbion();
  const { isPartner, isAdmin } = useUserSession();

  const caseOptions = [
    { id: "jhiri-cbg" as const, label: "Jhiri CBG (GAIL)" },
    { id: "gadarwara-flyash" as const, label: "Gadarwara STPS (NTPC)" },
  ];

  const formattedGrossValue = formatCurrency(
    scenario.grossValue[currency],
    currency,
    true
  );

  return (
    <div className="space-y-8 font-sans">
      <section className="space-y-5" aria-labelledby="overview-title">
        <div className="flex flex-col gap-5">
          <div className="max-w-3xl">
            <h1
              id="overview-title"
              className="text-[28px] font-extrabold leading-[1.2] text-slate-950 md:text-[32px]"
            >
              Industrial symbiosis impact, ready for decision
            </h1>
            <p className="mt-2 max-w-[72ch] text-[14px] leading-6 text-slate-600">
              Symbion translates regional byproduct exchanges into measurable carbon,
              material, energy, and economic outcomes while keeping the underlying
              resilience and feasibility evidence visible.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                Verified decision model SYM-R9.4
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                Flagship empirical case: {currentCase.facility}
              </span>
            </div>
          </div>
        </div>

        {/* Regional Partner Dedicated Operating Panel */}
        {isPartner && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#14503f] text-white border border-emerald-800 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-400/30">
                  MITRA KAWASAN OPERATING TELEMETRY
                </span>
                <span className="text-[12px] text-emerald-200">
                  Node: <strong>PT Sawit Subang Bio-Industri</strong> (Subang Smartpolitan Axis)
                </span>
              </div>
              <Link
                href="/input-data"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-emerald-900 text-[11.5px] font-bold hover:bg-emerald-50 transition-colors shadow-xs"
              >
                <span>Register New Feedstock Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="text-[10px] font-mono text-emerald-200 uppercase font-semibold">
                  Contracted Inflow
                </div>
                <div className="text-[18px] font-bold font-mono text-white mt-0.5">
                  5,000 m³ + 800 t
                </div>
                <div className="text-[10.5px] text-emerald-200/80 mt-1">
                  Monthly POME & EFB allocation
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="text-[10px] font-mono text-emerald-200 uppercase font-semibold">
                  Dispatch Compliance
                </div>
                <div className="text-[18px] font-bold font-mono text-emerald-300 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>100% Target Met</span>
                </div>
                <div className="text-[10.5px] text-emerald-200/80 mt-1">
                  Continuous biogas feedstock
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="text-[10px] font-mono text-emerald-200 uppercase font-semibold">
                  Partner Carbon Dividend
                </div>
                <div className="text-[18px] font-bold font-mono text-white mt-0.5">
                  1,685 tCO₂e / yr
                </div>
                <div className="text-[10.5px] text-emerald-200/80 mt-1">
                  ISO 14064 verified abatement
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="text-[10px] font-mono text-emerald-200 uppercase font-semibold">
                  Gross Yield Offtake
                </div>
                <div className="text-[18px] font-bold font-mono text-white mt-0.5">
                  {formattedGrossValue}
                </div>
                <div className="text-[10.5px] text-emerald-200/80 mt-1">
                  FiT guaranteed bio-energy contract
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Estate Administrator Master Governance Control Panel */}
        {isAdmin && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-400/30">
                  CENTRAL CLUSTER GOVERNANCE (ROOT)
                </span>
                <span className="text-[12px] text-slate-300">
                  Authority: <strong>Central Industrial Symbiosis Council</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/stress-test"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-700 text-white text-[11.5px] font-bold hover:bg-emerald-600 transition-colors shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Resilience Audit (Score 94/100)</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-200">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  Network Circularity Index
                </div>
                <div className="text-[18px] font-bold font-mono text-white mt-0.5">
                  {isJhiri ? "88.33% Utilization" : "37.64% Baseline"}
                </div>
                <div className="text-[10.5px] text-slate-400 mt-1">
                  {isJhiri ? "Deficit closed (+52.5 t/d Mandi)" : "1.05M t surplus unutilized"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  Multi-Facility Balancing
                </div>
                <div className="text-[18px] font-bold font-mono text-emerald-400 mt-0.5">
                  100% Mass Balanced
                </div>
                <div className="text-[10.5px] text-slate-400 mt-1">
                  Continuous CSTR equilibrium
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  Cluster Economic Output
                </div>
                <div className="text-[18px] font-bold font-mono text-white mt-0.5">
                  {formattedGrossValue}
                </div>
                <div className="text-[10.5px] text-slate-400 mt-1">
                  {isJhiri ? "CBG gas + FOM bio-fertilizer" : "Fly ash cement substitution"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  Resilience Stress Grade
                </div>
                <div className="text-[18px] font-bold font-mono text-emerald-400 mt-0.5">
                  Grade A+ (94/100)
                </div>
                <div className="text-[10.5px] text-slate-400 mt-1">
                  Tested under -20% supply shock
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {isJhiri ? (
            <>
              <ImpactCard
                label="Carbon reduction"
                value={scenario.avoidedCO2TonsYear.toLocaleString()}
                unit="tCO₂e / year"
                icon={Leaf}
                tone="emerald"
                featured
                description={
                  <div className="flex items-start gap-2.5">
                    <Trees className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <p>
                      Avoided fossil emissions equivalent to{" "}
                      <strong className="font-bold text-slate-900">27,500 trees</strong> or{" "}
                      <strong className="font-bold text-slate-900">360 passenger cars</strong> annually.
                    </p>
                  </div>
                }
              />
              <ImpactCard
                label="Material circulation"
                value={scenario.totalInputPerDay.toFixed(1)}
                unit="tons / day"
                icon={Recycle}
                tone="sky"
                description={
                  <div className="flex items-start gap-2.5">
                    <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                    <p>
                      <strong className="font-bold text-slate-900">88.33% capacity utilization</strong>{" "}
                      (+65.6% relative gain) via mandi organic waste integration.
                    </p>
                  </div>
                }
              />
              <ImpactCard
                label="Clean energy yield"
                value={scenario.cbgProductionTonsYear.toLocaleString()}
                unit="tons CBG / year"
                icon={Zap}
                tone="amber"
                description={
                  <div className="flex items-start gap-2.5">
                    <Home className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    <p>
                      Yields <strong className="font-bold text-slate-900">85,800 GJ/yr</strong>{" "}
                      clean compressed biomethane fuel replacing fossil natural gas.
                    </p>
                  </div>
                }
              />
              <ImpactCard
                label="Economic value"
                value={formattedGrossValue}
                unit="/ year"
                icon={TrendingUp}
                tone="slate"
                description={
                  <div className="flex items-start gap-2.5">
                    <Factory className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <p>
                      Gross projected revenue generated across verified off-take channels under SATAT framework.
                    </p>
                  </div>
                }
              />
            </>
          ) : (
            <>
              <ImpactCard
                label="Unutilized Fly Ash"
                value="1,050,700"
                unit="tons / year"
                icon={Leaf}
                tone="emerald"
                featured
                description={
                  <div className="flex items-start gap-2.5">
                    <Trees className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <p>
                      Surplus combustion fly ash currently deposited in slurry dykes requiring secondary sinks.
                    </p>
                  </div>
                }
              />
              <ImpactCard
                label="Current Utilization"
                value="634,300"
                unit="tons / year"
                icon={Recycle}
                tone="sky"
                description={
                  <div className="flex items-start gap-2.5">
                    <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                    <p>
                      <strong className="font-bold text-slate-900">37.64% baseline absorption</strong>{" "}
                      dispatched to regional PPC cement manufacturing plants.
                    </p>
                  </div>
                }
              />
              <ImpactCard
                label="Surplus Gap Ratio"
                value="62.35"
                unit="% of output"
                icon={Zap}
                tone="amber"
                description={
                  <div className="flex items-start gap-2.5">
                    <Home className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    <p>
                      Opportunity gap to close via geopolymer bricks, road embankment, and precast infrastructure.
                    </p>
                  </div>
                }
              />
              <ImpactCard
                label="Total Generation"
                value="1.685M"
                unit="tons / year"
                icon={TrendingUp}
                tone="slate"
                description={
                  <div className="flex items-start gap-2.5">
                    <Factory className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <p>
                      Annual fly ash production across 2 × 800 MW super-critical boiler units at Gadarwara STPS.
                    </p>
                  </div>
                }
              />
            </>
          )}
        </div>
      </section>

      <section
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
        aria-label="Active evaluation cluster"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-bold text-slate-500">Active evaluation cluster</span>
              <span className="text-[14px] font-bold text-slate-950">{currentCase.facility}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {currentCase.location}
              </span>
              <span>
                {currentCase.primaryStream} · {currentCase.designCapacity.toLocaleString()}
                {" "}{currentCase.capacityUnit}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-100 p-1" role="group" aria-label="Evaluation cluster">
              {caseOptions.map((option) => {
                const isActive = currentCaseId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setCurrentCaseId(option.id)}
                    className={cn(
                      "min-h-9 rounded-md px-3 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
                      isActive
                        ? "bg-white text-slate-950 shadow-xs"
                        : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-[12px] font-semibold text-slate-600 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              <span className="inline-flex items-center gap-1.5">
                <Network className="h-4 w-4 text-sky-700" />
                {currentCase.actorsCount} facilities · {currentCase.streamCount} streams
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-emerald-700" />
                94/100 feasibility
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
        aria-labelledby="workspace-modules-title"
      >
        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="workspace-modules-title" className="text-[16px] font-bold text-slate-950">
              Complete analytical workspace
            </h2>
            <p className="mt-1 text-[12.5px] text-slate-500">
              Every decision module is available from both this overview and the primary navigation.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800">
            {APP_NAVIGATION_ITEMS.length}/{APP_NAVIGATION_ITEMS.length} modules available
          </span>
        </div>
        <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-3">
          {APP_NAVIGATION_ITEMS.filter((item) => item.href !== "/").map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex min-h-[108px] items-start gap-3 px-5 py-4 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600",
                  index % 2 === 1 && "sm:border-l sm:border-slate-100",
                  index % 3 !== 0 && "xl:border-l xl:border-slate-100",
                  index >= 2 && "sm:border-t sm:border-slate-100",
                  index >= 3 && "xl:border-t xl:border-slate-100"
                )}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-[13px] font-bold text-slate-900 group-hover:text-emerald-800">
                    {item.shortLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1 block text-[11.5px] leading-4 text-slate-500">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <ExecutiveSymbiosisGrid />

      <section className="space-y-3" aria-labelledby="feasibility-title">
        <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="feasibility-title" className="text-[18px] font-bold text-slate-950">
              Resilience and investment feasibility
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-slate-500">
              Supply disruption simulation paired with the 94/100 Grade A+ investment assessment.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Highly feasible
          </span>
        </div>
        <ProjectFeasibilityCard />
      </section>

      <section className="flex flex-col justify-between gap-5 rounded-xl bg-slate-950 p-5 text-white shadow-sm md:flex-row md:items-center">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-emerald-300">
            <span className="rounded-full border border-emerald-500/40 bg-emerald-900/70 px-2.5 py-1 text-white">
              I-SINERGIE Malaysia 2026
            </span>
            <span>IPB University research prototype</span>
          </div>
          <h2 className="mt-3 text-[17px] font-bold text-white">
            AI-driven decision support for resilient industrial symbiosis
          </h2>
          <p className="mt-1.5 max-w-[75ch] text-[13px] leading-5 text-slate-300">
            The research model combines a Knowledge Graph, GNN gap closure, and
            Agent-Based Modeling to verify 70%–80% network retention under simulated shocks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <div className="min-w-[132px]">
            <div className="text-[15px] font-extrabold text-emerald-300 tabular-nums">70%–80%</div>
            <div className="text-[11px] text-slate-400">retention under shocks</div>
          </div>
          <Link
            href="/methodology"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <BookOpen className="h-4 w-4 text-emerald-300" />
            View methodology
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
