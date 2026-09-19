"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SymbionProvider, useSymbion } from "@/context/symbion-context";
import { UserSessionProvider, useUserSession } from "@/context/user-session-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { UserProfileMenu } from "@/components/layout/user-profile-menu";
import { CustomSandboxModal } from "@/components/interactive/custom-sandbox-modal";
import { Menu, X, AlertCircle } from "lucide-react";

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSandboxOpen, setIsSandboxOpen, currency } = useSymbion();
  const { isLoggedOut, login } = useUserSession();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  // When on the standalone login page, bypass analytical sidebar & header
  if (pathname === "/login") {
    return <div className="min-h-screen w-full bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-canvas text-slate-dark flex">
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[70] -translate-y-20 rounded-lg bg-slate-950 px-4 py-2 text-[13px] font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* Mobile Top Bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-xs lg:hidden">
        <div>
          <div className="text-[14px] font-bold text-slate-900">Symbion v2.0</div>
          <div className="text-[10px] font-semibold text-slate-500">Industrial decision engine</div>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Mobile Profile Menu */}
          <UserProfileMenu compact />

          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            onClick={() => setIsNavigationOpen((open) => !open)}
            aria-controls="application-navigation"
            aria-expanded={isNavigationOpen}
            aria-label={isNavigationOpen ? "Close navigation" : "Open navigation"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {isNavigationOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isNavigationOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsNavigationOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden"
        />
      )}

      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        isOpen={isNavigationOpen}
        onNavigate={() => setIsNavigationOpen(false)}
      />

      {/* Fixed Desktop Top Utility Header */}
      <Header />

      {/* Main Analytical Content Workspace */}
      <div className="flex min-w-0 flex-1 flex-col pt-14 lg:pl-64 lg:pt-14">
        {/* Logged-out Demo Session Alert Banner */}
        {isLoggedOut && (
          <div className="mx-4 mt-3 sm:mx-6 md:mx-8 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 flex flex-wrap items-center justify-between gap-3 text-[12.5px] shadow-xs animate-in fade-in-50 duration-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
              <span>
                <strong>Session Inactive:</strong> You have logged out of the demonstration session. Authentication provider configuration will follow in the next phase.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg bg-[#2c7a4b] hover:bg-[#23613c] text-white font-bold text-[11.5px] transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>Halaman Masuk (Login) →</span>
              </Link>
              <button
                type="button"
                onClick={() => login("regional_partner")}
                className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100/60 text-amber-900 font-semibold text-[11.5px] transition-colors shadow-xs"
              >
                Mitra
              </button>
              <button
                type="button"
                onClick={() => login("estate_administrator")}
                className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100/60 text-amber-900 font-semibold text-[11.5px] transition-colors shadow-xs"
              >
                Admin
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main id="main-content" className="w-full min-w-0 max-w-[1550px] mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Global Custom Facility Sandbox Modal */}
      <CustomSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        currency={currency}
      />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SymbionProvider>
      <UserSessionProvider>
        <ShellInner>{children}</ShellInner>
      </UserSessionProvider>
    </SymbionProvider>
  );
}
