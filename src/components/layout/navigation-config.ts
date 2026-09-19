import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Factory,
  LayoutDashboard,
  PlusCircle,
  ShieldAlert,
} from "lucide-react";

export interface AppNavigationItem {
  href: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}

export interface AppNavigationSection {
  label: string;
  items: AppNavigationItem[];
}

export const APP_NAVIGATION: AppNavigationSection[] = [
  {
    label: "Operational Core",
    items: [
      {
        href: "/",
        label: "Executive Dashboard",
        shortLabel: "Overview",
        description: "Decision summary, impact outcomes, topology, and feasibility evidence.",
        icon: LayoutDashboard,
      },
      {
        href: "/topology",
        label: "Network Topology",
        shortLabel: "Topology",
        description: "Interactive facility nodes, material streams, and balance verification.",
        icon: Activity,
      },
      {
        href: "/impact",
        label: "Carbon Accounting & Impact",
        shortLabel: "Impact",
        description: "Material, carbon, energy, and tri-currency economic valuation.",
        icon: Factory,
      },
      {
        href: "/stress-test",
        label: "Resilience & Feasibility",
        shortLabel: "Stress Test",
        description: "Supply shocks, network retention, and investment readiness scoring.",
        icon: ShieldAlert,
      },
    ],
  },
  {
    label: "System Infrastructure",
    items: [
      {
        href: "/input-data",
        label: "Data Integration Hub",
        shortLabel: "Input Data",
        description: "Facility registration, partner registry, matching, and network updates.",
        icon: PlusCircle,
      },
      {
        href: "/methodology",
        label: "Research & E-Digest Paper",
        shortLabel: "Methodology",
        description: "Research workflow, empirical cases, equations, and references.",
        icon: BookOpen,
      },
    ],
  },
];

export const APP_NAVIGATION_ITEMS = APP_NAVIGATION.flatMap((section) => section.items);
