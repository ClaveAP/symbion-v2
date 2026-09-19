"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserSession, UserRole } from "@/context/user-session-context";
import {
  User,
  Check,
  LogOut,
  Building2,
  ShieldCheck,
  ChevronDown,
  Layers,
  Lock,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileMenuProps {
  compact?: boolean;
}

export function UserProfileMenu({ compact = false }: UserProfileMenuProps) {
  const router = useRouter();
  const {
    currentUser,
    activeRole,
    isLoggedOut,
    switchRole,
    logout,
    login,
    allUsers,
  } = useUserSession();

  const [isOpen, setIsOpen] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSwitchAccount = useCallback(
    (role: UserRole) => {
      switchRole(role);
      // Keep open briefly or close
      setIsOpen(false);
    },
    [switchRole]
  );

  const handleLogout = useCallback(() => {
    logout();
    setIsOpen(false);
    router.push("/login");
  }, [logout, router]);

  const handleLogin = useCallback(
    (role: UserRole) => {
      login(role);
      setIsOpen(false);
    },
    [login]
  );

  return (
    <div ref={menuRef} className="relative inline-block text-left font-sans">
      {/* Circular Profile Avatar Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={
          currentUser
            ? `Profile menu for ${currentUser.displayName} (${currentUser.roleLabel})`
            : "User account menu (Session Inactive)"
        }
        className={cn(
          "group relative flex items-center justify-center rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          compact ? "h-8 w-8 text-[11px]" : "h-9 w-9 text-[12px]",
          currentUser
            ? `${currentUser.accent.bg} ${currentUser.accent.text} border-2 ${currentUser.accent.border} ${currentUser.accent.ring} hover:scale-105 active:scale-95 shadow-xs`
            : "bg-slate-100 text-slate-500 border-2 border-slate-300 focus-visible:ring-slate-500 hover:bg-slate-200"
        )}
      >
        {currentUser ? (
          <span className="font-mono font-bold tracking-tight select-none">
            {currentUser.initials}
          </span>
        ) : (
          <User className={cn(compact ? "h-4 w-4" : "h-4.5 w-4.5")} />
        )}

        {/* Live Status Indicator Dot */}
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-white",
            compact ? "h-2.5 w-2.5" : "h-3 w-3",
            currentUser ? "bg-emerald-500" : "bg-slate-400"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Floating Interactive Profile Dropdown Card */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
          className={cn(
            "absolute right-0 top-full mt-2 w-[340px] sm:w-[360px] rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl ring-1 ring-slate-900/5 z-50 animate-in fade-in zoom-in-95 duration-150 focus:outline-none"
          )}
        >
          {isLoggedOut || !currentUser ? (
            /* ============================================================ */
            /* LOGGED-OUT / INACTIVE SESSION STATE                          */
            /* ============================================================ */
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-slate-900">
                    Session Inactive
                  </h3>
                  <p className="text-[11.5px] text-slate-500 leading-tight">
                    Authentication setup will follow. Choose a demo profile to continue.
                  </p>
                </div>
              </div>

              {/* Instant Demo Sign-in Options */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    SELECT DEMO ROLE TO ENTER
                  </span>
                  <span className="text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    Pre-Auth Demo
                  </span>
                </div>

                {allUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleLogin(user.role)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold border",
                          user.accent.bg,
                          user.accent.text,
                          user.accent.border
                        )}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-emerald-900">
                            {user.displayName}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 leading-none">
                          {user.roleLabel} • <span className="text-slate-400">{user.roleSubtitle}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <span>Sign in</span>
                      <UserCheck className="h-3.5 w-3.5" />
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-[10.5px] text-slate-400 text-center leading-normal">
                Competition standard compliance • I-SINERGIE Malaysia 2026
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* LOGGED-IN PROFILE MENU                                       */
            /* ============================================================ */
            <div className="space-y-3">
              {/* Profile Card Header */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                {/* Large Circle Avatar */}
                <div
                  className={cn(
                    "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-[14px] font-bold border-2 shadow-xs",
                    currentUser.accent.bg,
                    currentUser.accent.text,
                    currentUser.accent.border
                  )}
                >
                  {currentUser.initials}
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"
                    title="Online & Verified"
                  />
                </div>

                {/* Identity & Badges */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="text-[13.5px] font-bold text-slate-900 truncate">
                      {currentUser.displayName}
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 truncate">
                    {currentUser.email}
                  </p>

                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {/* Primary English Role Badge */}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border",
                        currentUser.accent.badgeBg,
                        currentUser.accent.badgeText,
                        currentUser.accent.badgeBorder
                      )}
                    >
                      <ShieldCheck className="h-3 w-3 shrink-0" />
                      <span>{currentUser.roleLabel}</span>
                    </span>

                    {/* Indonesian Subtitle Pill */}
                    <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-medium">
                      {currentUser.roleSubtitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Organization & Cluster Scope */}
              <div className="px-3 py-2 rounded-lg bg-white border border-slate-200/80 text-[11.5px] space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
                  <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{currentUser.organization}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Layers className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{currentUser.facilityScope}</span>
                </div>
              </div>

              {/* ========================================================== */}
              {/* ACCOUNT SWITCHING SECTION                                   */}
              {/* ========================================================== */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    SWITCH DEMO ACCOUNT
                  </span>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Live Switcher
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {allUsers.map((user) => {
                    const isCurrent = activeRole === user.role;
                    return (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleSwitchAccount(user.role)}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-xl text-left transition-all border",
                          isCurrent
                            ? "bg-emerald-50/70 border-emerald-300 text-slate-900 shadow-xs ring-1 ring-emerald-400/30"
                            : "bg-white border-slate-200/70 hover:bg-slate-50 hover:border-slate-300 text-slate-600"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[10.5px] font-bold border",
                              user.accent.bg,
                              user.accent.text,
                              user.accent.border
                            )}
                          >
                            {user.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12px] font-bold text-slate-900 truncate">
                                {user.displayName}
                              </span>
                              <span className="text-[9.5px] font-mono text-slate-400 font-medium">
                                ({user.roleSubtitle})
                              </span>
                            </div>
                            <span className="block text-[10.5px] text-slate-500 truncate leading-none mt-0.5">
                              {user.roleLabel}
                            </span>
                          </div>
                        </div>

                        {isCurrent ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded border border-transparent hover:border-slate-200">
                            Switch
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================== */}
              {/* ACCESS SCOPE & PERMISSIONS TOGGLE                           */}
              {/* ========================================================== */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowPermissions((prev) => !prev)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-semibold transition-colors border border-slate-200/70"
                >
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-slate-400" />
                    <span>View Role Permissions ({currentUser.permissions.length})</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                      showPermissions && "rotate-180"
                    )}
                  />
                </button>

                {showPermissions && (
                  <div className="mt-1.5 p-2.5 rounded-lg bg-slate-50/70 border border-slate-200 text-[11px] space-y-1.5 animate-in fade-in-50 duration-100">
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      GRANTED CAPABILITIES:
                    </div>
                    <ul className="space-y-1 text-slate-600">
                      {currentUser.permissions.map((perm, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span className="truncate">{perm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 pt-1" />

              {/* Log Out Action */}
              <button
                type="button"
                onClick={handleLogout}
                className="group w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors text-[12px] font-semibold"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
                  <span>Log out</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-rose-500 font-medium">
                  End session
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
