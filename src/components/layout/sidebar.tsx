"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSymbion } from "@/context/symbion-context";
import { useUserSession } from "@/context/user-session-context";
import {
  CheckCircle2,
  SlidersHorizontal,
  ArrowLeftRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { APP_NAVIGATION } from "@/components/layout/navigation-config";

interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void;
}

export function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { currentCaseId, setCurrentCaseId, setIsSandboxOpen, isJhiri, scenario } =
    useSymbion();
  const { currentUser, isPartner, isLoggedOut, switchRole } = useUserSession();

  const currentPath = pathname || "/";

  return (
    <aside
      id="application-navigation"
      aria-label="Primary application navigation"
      className={`fixed left-0 top-0 z-50 flex h-dvh w-64 flex-col border-r border-slate-200 bg-white font-sans shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {/* Brand Header - Stitch Style with Official Hexagonal Infinity Logo */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
          <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 group">
            {/* New Official Symbion Emblem */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
              <Image
                src="/images/symbion-logo.png"
                alt="Symbion Logo"
                width={30}
                height={30}
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-slate-900 tracking-tight">
                  Symbion
                </span>
                <span className="text-[10px] font-mono text-[#2c7a4b] font-bold">
                  v2.0
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                Decision Engine
              </span>
            </div>
          </Link>

          <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-emerald-50 text-[#2c7a4b] border border-emerald-200">
            I-SINERGIE
          </span>
        </div>

        {/* Role Workspace Context Banner */}
        <div className="px-3 pt-3 pb-1 border-b border-slate-100 bg-slate-50/50">
          {isLoggedOut || !currentUser ? (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-[11px]">
              <div>
                <div className="font-bold">Guest Mode</div>
                <div className="text-[10px] text-amber-700">Logged out</div>
              </div>
              <button
                type="button"
                onClick={() => switchRole("regional_partner")}
                className="px-2 py-1 rounded bg-amber-700 text-white font-semibold text-[10px]"
              >
                Sign in
              </button>
            </div>
          ) : isPartner ? (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 shadow-xs">
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-700 text-white">
                  MITRA KAWASAN
                </span>
                <button
                  type="button"
                  onClick={() => switchRole("estate_administrator")}
                  className="text-[9px] font-mono text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-0.5 underline decoration-dotted"
                  title="Switch to Estate Administrator view"
                >
                  <ArrowLeftRight className="w-2.5 h-2.5" />
                  <span>Switch</span>
                </button>
              </div>
              <div className="text-[12px] font-bold text-slate-900 truncate">
                {currentUser.displayName}
              </div>
              <div className="text-[10px] text-emerald-800 truncate font-medium mt-0.5 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-emerald-700 shrink-0" />
                <span className="truncate">{currentUser.organization}</span>
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xs">
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#2c7a4b] text-white">
                  ADMIN ROOT
                </span>
                <button
                  type="button"
                  onClick={() => switchRole("regional_partner")}
                  className="text-[9px] font-mono text-slate-300 hover:text-white font-semibold flex items-center gap-0.5 underline decoration-dotted"
                  title="Switch to Regional Partner view"
                >
                  <ArrowLeftRight className="w-2.5 h-2.5" />
                  <span>Switch</span>
                </button>
              </div>
              <div className="text-[12px] font-bold text-white truncate">
                {currentUser.displayName}
              </div>
              <div className="text-[10px] text-slate-300 truncate font-medium mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">Central Cluster Authority</span>
              </div>
            </div>
          )}
        </div>

        {/* Compact Case Study Selector */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/30">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
              {isPartner ? "PARTNER OPERATING CLUSTER" : "EVALUATION CLUSTER"}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#2c7a4b] animate-pulse" />
          </div>

          <div className="flex flex-col gap-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80">
            <button
              type="button"
              onClick={() => setCurrentCaseId("jhiri-cbg")}
              className={`min-h-11 py-1 px-2 rounded-md text-left transition-all flex items-center justify-between ${
                currentCaseId === "jhiri-cbg"
                  ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <div className="text-[11px] leading-tight truncate">1. Jhiri CBG (GAIL)</div>
              <div className="text-[9px] font-mono text-amber-700 font-bold">
                -70 t/d
              </div>
            </button>

            <button
              type="button"
              onClick={() => setCurrentCaseId("gadarwara-flyash")}
              className={`min-h-11 py-1 px-2 rounded-md text-left transition-all flex items-center justify-between ${
                currentCaseId === "gadarwara-flyash"
                  ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <div className="text-[11px] leading-tight truncate">2. Gadarwara (NTPC)</div>
              <div className="text-[9px] font-mono text-sky-700 font-bold">
                +1.05M t
              </div>
            </button>
          </div>

          {isPartner && (
            <div className="mt-2 px-1 text-[10px] font-mono text-emerald-800 flex items-center gap-1.5 bg-emerald-50/70 p-1.5 rounded-md border border-emerald-200/60">
              <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
              <span className="truncate">Node: Subang Sawit A4 Feedstock</span>
            </div>
          )}
        </div>

        {APP_NAVIGATION.map((section, sectionIndex) => (
          <div key={section.label} className={`px-3 ${sectionIndex === 0 ? "pt-3 pb-1" : "pt-2"}`}>
            <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 font-bold">
              {section.label}
            </div>
            <nav className="flex flex-col gap-0.5 mt-0.5" aria-label={section.label}>
              {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] transition-all ${
                    isActive
                      ? "bg-[#2c7a4b] text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer System Infrastructure Widgets - Stitch Exact Style */}
      <div className="shrink-0 p-3 border-t border-slate-200 bg-white space-y-2">
        {/* Circularity Target Metric Box */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
          <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-mono">
            <span className="text-slate-500 font-medium uppercase">
              {isJhiri ? "CAPACITY RESTORED" : "FLY ASH UTILIZATION"}
            </span>
            <span className="font-bold text-[#2c7a4b]">
              {isJhiri ? `${scenario.utilizationPct}%` : "37.64%"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#2c7a4b] rounded-full transition-all duration-500"
              style={{
                width: isJhiri ? `${scenario.utilizationPct}%` : "37.64%",
              }}
            />
          </div>
          <div className="mt-1.5 text-[10px] text-slate-500 font-medium flex items-center justify-between">
            <span>{isJhiri ? "Benchmark: α = 75%" : "Cement Sinks"}</span>
            <span className="font-semibold text-[#2c7a4b]">✓ Verified</span>
          </div>
        </div>

        {/* Custom Sandbox Simulator Button */}
        <button
          type="button"
          onClick={() => setIsSandboxOpen(true)}
          className="w-full min-h-11 py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#2c7a4b]" />
          <span>Launch Custom Sandbox</span>
        </button>

        {/* Instance Status Widget (Stitch Signature) */}
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between text-slate-700">
          <div className="flex flex-col leading-none">
            <span className="text-[9.5px] text-slate-400 font-mono font-bold uppercase">
              INSTANCE SYMBION-09
            </span>
            <span className="text-[10.5px] text-emerald-800 font-bold font-mono mt-0.5">
              CONNECTED • 99.98%
            </span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#2c7a4b]" />
        </div>

        {/* Research Team Attribution (IPB University - I-SINERGIE 2026) */}
        <div className="px-1 pt-1 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100">
          <span className="truncate">IPB University Team</span>
          <span className="text-[#2c7a4b] font-bold shrink-0">MY 2026</span>
        </div>
      </div>
    </aside>
  );
}
