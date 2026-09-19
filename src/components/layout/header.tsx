"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSymbion } from "@/context/symbion-context";
import { useUserSession } from "@/context/user-session-context";
import { CurrencyToggle } from "@/components/ui/currency-toggle";
import { UserProfileMenu } from "@/components/layout/user-profile-menu";
import { MapPin, DownloadCloud, PlusCircle, ShieldCheck } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { currentCase, currency, setCurrency } = useSymbion();
  const { isPartner, isAdmin, currentUser } = useUserSession();

  // Pages with monetary figures that require currency conversion
  const pagesWithCurrency = ["/", "/impact", "/stress-test"];
  const hasCurrency = pagesWithCurrency.includes(pathname);

  // Quick submit feedstock shortcut only needed on dashboard
  const showSubmitFeedstock = isPartner && pathname === "/";

  // Export action only relevant on pages where report printing makes sense
  const exportLabel =
    pathname === "/methodology"
      ? "Print Academic Paper"
      : pathname === "/impact"
      ? "Export Impact Dossier"
      : pathname === "/stress-test"
      ? "Export Stress Report"
      : pathname === "/"
      ? (isAdmin ? "Export Master Dossier" : "Export Partner Audit")
      : null;

  const handleExportDossier = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 hidden lg:flex items-center justify-between px-6 shadow-[0_1px_6px_rgba(0,0,0,0.03)] select-none">
      {/* Left: Case Info & Role Context */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] font-bold text-slate-900 tracking-tight leading-none">
              {currentCase.facility}
            </h2>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              <MapPin className="w-3 h-3 text-[#2c7a4b]" />
              <span>{currentCase.location}</span>
            </span>

            {/* Role Context Pill with Dynamic User Identity */}
            {isPartner && (
              <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Partner: {currentUser?.displayName || "PT Sawit Subang"}</span>
              </span>
            )}
            {isAdmin && (
              <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white border border-slate-800">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{currentUser?.displayName || "Root Authority"}</span>
              </span>
            )}
          </div>
          <span className="text-[10.5px] font-mono text-slate-500 mt-1">
            {currentCase.primaryStream} ({currentCase.designCapacity.toLocaleString()}{" "}
            {currentCase.capacityUnit})
          </span>
        </div>
      </div>

      {/* Right: Contextual Controls & Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Currency Switcher: Only displayed on pages with financial values */}
        {hasCurrency && (
          <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
            <span className="text-[11px] font-mono text-slate-400 font-semibold hidden xl:inline">
              Currency:
            </span>
            <CurrencyToggle
              currentCurrency={currency}
              onCurrencyChange={setCurrency}
            />
          </div>
        )}

        {/* Partner-specific quick action: Submit Feedstock (Dashboard only) */}
        {showSubmitFeedstock && (
          <Link
            href="/input-data"
            className="hidden md:flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[12px] font-semibold border border-emerald-200 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Submit Feedstock</span>
          </Link>
        )}


        {/* Contextual Export/Print Action (Hidden on data entry & diagram canvas) */}
        {exportLabel && (
          <button
            type="button"
            onClick={handleExportDossier}
            className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#2c7a4b] hover:bg-[#23613c] text-white text-[12px] font-bold shadow-xs transition-colors"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>{exportLabel}</span>
          </button>
        )}

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

        {/* Interactive Circular Profile Menu */}
        <UserProfileMenu />
      </div>
    </header>
  );
}
