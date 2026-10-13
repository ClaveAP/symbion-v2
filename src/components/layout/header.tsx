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
  const pagesWithCurrency = ["/", "/impact", "/stress-test", "/scenarios"];
  const hasCurrency = pagesWithCurrency.includes(pathname);

  // Quick submit feedstock shortcut only needed on dashboard
  const showSubmitFeedstock = isPartner && pathname === "/";

  // Export action only relevant on pages where report printing makes sense
  const exportLabel =
    pathname === "/impact"
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
    <header className="fixed top-0 left-64 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 hidden lg:flex items-center justify-between px-4 sm:px-6 shadow-[0_1px_6px_rgba(0,0,0,0.03)] select-none">
      {/* Left: Case Info & Role Context (Truncates gracefully on smaller desktop viewports) */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2 xl:pr-4">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-[13.5px] xl:text-[14px] font-bold text-slate-900 tracking-tight leading-none truncate">
              {currentCase.facility}
            </h2>

            {/* Location Badge: visible on large 2xl screens, hidden on laptop viewports */}
            <span className="hidden 2xl:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
              <MapPin className="w-3 h-3 text-[#2c7a4b]" />
              <span className="truncate">{currentCase.location}</span>
            </span>

            {/* Role Context Pill: visible on xl screens, hidden below 1280px to prevent crowding */}
            {isPartner && (
              <span className="hidden xl:inline-flex items-center gap-1 text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="max-w-[150px] truncate">
                  Partner: {currentUser?.displayName || "PT Sawit Subang"}
                </span>
              </span>
            )}
            {isAdmin && (
              <span className="hidden xl:inline-flex items-center gap-1 text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white border border-slate-800 shrink-0">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{currentUser?.displayName || "Root Authority"}</span>
              </span>
            )}
          </div>
          <span className="text-[10px] xl:text-[10.5px] font-mono text-slate-500 mt-1 truncate">
            {currentCase.primaryStream} ({currentCase.designCapacity.toLocaleString()}{" "}
            {currentCase.capacityUnit})
          </span>
        </div>
      </div>

      {/* Right: Contextual Controls & Profile Menu (Adaptive widths to fit without collision) */}
      <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
        {/* Currency Switcher: Only displayed on pages with financial values */}
        {hasCurrency && (
          <div className="flex items-center gap-1.5 animate-in fade-in duration-150 shrink-0">
            <span className="text-[11px] font-mono text-slate-400 font-semibold hidden 2xl:inline">
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
            className="flex items-center gap-1.5 py-1.5 px-2.5 xl:px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11.5px] xl:text-[12px] font-semibold border border-emerald-200 transition-colors shadow-xs shrink-0"
            title="Submit New Feedstock Batch"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="hidden xl:inline">Submit Feedstock</span>
            <span className="xl:hidden">Feedstock</span>
          </Link>
        )}

        {/* Contextual Export/Print Action */}
        {exportLabel && (
          <button
            type="button"
            onClick={handleExportDossier}
            className="flex items-center gap-1.5 py-1.5 px-2.5 xl:px-3 rounded-lg bg-[#2c7a4b] hover:bg-[#23613c] text-white text-[11.5px] xl:text-[12px] font-bold shadow-xs transition-colors shrink-0"
            title={exportLabel}
          >
            <DownloadCloud className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden 2xl:inline">{exportLabel}</span>
            <span className="2xl:hidden">Export</span>
          </button>
        )}

        {/* Vertical divider */}
        <div className="h-5 w-px bg-slate-200 mx-0.5" aria-hidden="true" />

        {/* Interactive Circular Profile Menu */}
        <UserProfileMenu />
      </div>
    </header>
  );
}
