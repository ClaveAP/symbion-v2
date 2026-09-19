"use client";

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";

export type UserRole = "regional_partner" | "estate_administrator";

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  roleLabel: "Regional Partner" | "Estate Administrator";
  roleSubtitle: "Mitra Kawasan" | "Admin Pengelola";
  organization: string;
  facilityScope: string;
  accessTier: string;
  initials: string;
  accent: {
    bg: string;
    text: string;
    border: string;
    ring: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
  };
  permissions: string[];
}

export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  regional_partner: {
    id: "usr-partner-subang",
    displayName: "Hendra Pratama",
    email: "partner.subang@symbion.eco",
    role: "regional_partner",
    roleLabel: "Regional Partner",
    roleSubtitle: "Mitra Kawasan",
    organization: "PT Sawit Subang Bio-Industri",
    facilityScope: "Subang Smartpolitan Axis (POME & Biomass)",
    accessTier: "Tier-1 Industrial Partner",
    initials: "HP",
    accent: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-300",
      ring: "focus-visible:ring-emerald-600",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      badgeBorder: "border-emerald-200",
    },
    permissions: [
      "Feedstock Intake & Waste Registration",
      "Live Stream Telemetry (POME, EFB)",
      "Local Node Mass Balance Audit",
      "Offtake Contract Verification",
    ],
  },
  estate_administrator: {
    id: "usr-admin-central",
    displayName: "Dr. Siti Aminah",
    email: "admin.estate@symbion.eco",
    role: "estate_administrator",
    roleLabel: "Estate Administrator",
    roleSubtitle: "Admin Pengelola",
    organization: "Central Industrial Symbiosis Authority",
    facilityScope: "All Regional Clusters (Root Authority)",
    accessTier: "System Administrator (Level 3)",
    initials: "SA",
    accent: {
      bg: "bg-sky-100",
      text: "text-sky-800",
      border: "border-sky-300",
      ring: "focus-visible:ring-sky-600",
      badgeBg: "bg-sky-50",
      badgeText: "text-sky-800",
      badgeBorder: "border-sky-200",
    },
    permissions: [
      "Global Cluster Topology Configuration",
      "Cross-Facility Mass & Energy Balancing",
      "Ex-Ante Simulation Sensitivity & Stress Rules",
      "Dossier & Academic Publication Export",
      "Security & System Integrity Audits",
    ],
  },
};

export function parseUserCredentials(
  inputUsername: string,
  role: UserRole,
  customOrg?: string
): UserProfile {
  const trimmed = inputUsername.trim();

  // If user entered standard demo credentials, retain original demo profile
  if (
    trimmed === "operator.subang@symbion.id" ||
    trimmed === "partner.subang@symbion.eco"
  ) {
    return {
      ...DEMO_PROFILES.regional_partner,
      email: trimmed,
      role,
    };
  }

  if (
    trimmed === "admin.estate@symbion.id" ||
    trimmed === "admin.estate@symbion.eco"
  ) {
    return {
      ...DEMO_PROFILES.estate_administrator,
      email: trimmed,
      role,
    };
  }

  // Parse custom user input (name or email)
  let email = "";
  let displayName = "";

  if (trimmed.includes("@")) {
    email = trimmed;
    const localPart = trimmed.split("@")[0];
    const words = localPart
      .replace(/[._\-+]/g, " ")
      .split(" ")
      .filter(Boolean);
    displayName = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  } else {
    displayName = trimmed
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    email = `${trimmed.toLowerCase().replace(/[^a-z0-9]/g, ".")}@symbion.eco`;
  }

  if (!displayName) {
    displayName = role === "regional_partner" ? "Regional Partner User" : "Estate Admin User";
  }

  const nameParts = displayName.split(" ").filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : displayName.slice(0, 2).toUpperCase();

  const isPartner = role === "regional_partner";
  const defaultOrg = isPartner
    ? customOrg ||
      (trimmed.includes("@") && !trimmed.endsWith("@symbion.id") && !trimmed.endsWith("@symbion.eco")
        ? `PT ${trimmed.split("@")[1].split(".")[0].toUpperCase()} Agro`
        : "PT Sawit Subang Bio-Industri")
    : customOrg || "Central Industrial Symbiosis Authority";

  return {
    id: `usr-custom-${Date.now()}`,
    displayName,
    email,
    role,
    roleLabel: isPartner ? "Regional Partner" : "Estate Administrator",
    roleSubtitle: isPartner ? "Mitra Kawasan" : "Admin Pengelola",
    organization: defaultOrg,
    facilityScope: isPartner
      ? "Subang Smartpolitan Axis (POME & Biomass)"
      : "All Regional Clusters (Root Authority)",
    accessTier: isPartner ? "Tier-1 Industrial Partner" : "System Administrator (Level 3)",
    initials,
    accent: DEMO_PROFILES[role].accent,
    permissions: DEMO_PROFILES[role].permissions,
  };
}

interface UserSessionContextType {
  currentUser: UserProfile | null;
  activeRole: UserRole | null;
  isLoggedOut: boolean;
  isPartner: boolean;
  isAdmin: boolean;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  login: (role?: UserRole, inputUsername?: string, inputOrg?: string) => void;
  allUsers: UserProfile[];
}

const UserSessionContext = createContext<UserSessionContextType | undefined>(undefined);

export function UserSessionProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<UserRole>("regional_partner");
  const [customProfile, setCustomProfile] = useState<UserProfile | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);

  // Restore saved session from localStorage and cookie on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const hasAuthCookie = document.cookie
          .split(";")
          .some((c) => c.trim().startsWith("symbion_auth=true"));
        const saved = localStorage.getItem("symbion_user_session");

        if (hasAuthCookie && saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.role) {
            setCustomProfile(parsed);
            setActiveRole(parsed.role);
            setIsLoggedOut(false);
            return;
          }
        }
        // If no auth cookie or invalid session, enforce logged out state
        setIsLoggedOut(true);
      } catch (err) {
        console.error("Failed to restore user session", err);
        setIsLoggedOut(true);
      }
    }
  }, []);

  const currentUser = useMemo(() => {
    if (isLoggedOut) return null;
    if (customProfile) return customProfile;
    return DEMO_PROFILES[activeRole];
  }, [activeRole, isLoggedOut, customProfile]);

  const allUsers = useMemo(() => {
    return [DEMO_PROFILES.regional_partner, DEMO_PROFILES.estate_administrator];
  }, []);

  const isPartner = !isLoggedOut && (currentUser?.role === "regional_partner" || activeRole === "regional_partner");
  const isAdmin = !isLoggedOut && (currentUser?.role === "estate_administrator" || activeRole === "estate_administrator");

  const switchRole = useCallback((role: UserRole) => {
    const demoProfile = DEMO_PROFILES[role];
    setActiveRole(role);
    setCustomProfile(demoProfile);
    setIsLoggedOut(false);

    if (typeof document !== "undefined") {
      document.cookie = "symbion_auth=true; path=/; max-age=2592000; SameSite=Lax";
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("symbion_user_session", JSON.stringify(demoProfile));
      } catch {
        // ignore
      }
    }
  }, []);

  const logout = useCallback(() => {
    setIsLoggedOut(true);
    setCustomProfile(null);

    if (typeof document !== "undefined") {
      document.cookie = "symbion_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("symbion_user_session");
      } catch {
        // ignore
      }
    }
  }, []);

  const login = useCallback(
    (role?: UserRole, inputUsername?: string, inputOrg?: string) => {
      const targetRole = role || activeRole || "regional_partner";
      let profileToSet: UserProfile;

      if (inputUsername && inputUsername.trim()) {
        profileToSet = parseUserCredentials(inputUsername, targetRole, inputOrg);
      } else {
        profileToSet = DEMO_PROFILES[targetRole];
      }

      setActiveRole(targetRole);
      setCustomProfile(profileToSet);
      setIsLoggedOut(false);

      if (typeof document !== "undefined") {
        document.cookie = "symbion_auth=true; path=/; max-age=2592000; SameSite=Lax";
      }

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("symbion_user_session", JSON.stringify(profileToSet));
        } catch {
          // ignore
        }
      }
    },
    [activeRole]
  );

  return (
    <UserSessionContext.Provider
      value={{
        currentUser,
        activeRole: isLoggedOut ? null : activeRole,
        isLoggedOut,
        isPartner,
        isAdmin,
        switchRole,
        logout,
        login,
        allUsers,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
}
