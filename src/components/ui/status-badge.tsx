import React from "react";
import { cn } from "@/lib/utils";

export type BadgeType =
  | "FACT"
  | "ASSUMPTION"
  | "PROJECTED"
  | "STRESS_TEST"
  | "OPTIMAL"
  | "WARNING"
  | "CRITICAL"
  | "INPUT_DEFICIT"
  | "OUTPUT_SURPLUS";

interface StatusBadgeProps {
  type: BadgeType;
  label?: string;
  className?: string;
}

export function StatusBadge({ type, label, className }: StatusBadgeProps) {
  const badgeConfig: Record<
    BadgeType,
    { text: string; bg: string; textCol: string; border: string; dot?: string }
  > = {
    FACT: {
      text: "FACT",
      bg: "bg-blue-50",
      textCol: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-600",
    },
    ASSUMPTION: {
      text: "ASSUMPTION",
      bg: "bg-amber-50",
      textCol: "text-amber-800",
      border: "border-amber-200",
      dot: "bg-amber-500",
    },
    PROJECTED: {
      text: "PROJECTED",
      bg: "bg-emerald-50",
      textCol: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
    },
    STRESS_TEST: {
      text: "STRESS TEST",
      bg: "bg-purple-50",
      textCol: "text-purple-700",
      border: "border-purple-200",
      dot: "bg-purple-500",
    },
    OPTIMAL: {
      text: "OPTIMAL",
      bg: "bg-emerald-50",
      textCol: "text-emerald-800",
      border: "border-emerald-300",
      dot: "bg-emerald-600",
    },
    WARNING: {
      text: "WARNING",
      bg: "bg-amber-50",
      textCol: "text-amber-800",
      border: "border-amber-300",
      dot: "bg-amber-600",
    },
    CRITICAL: {
      text: "CRITICAL SHOCK",
      bg: "bg-rose-50",
      textCol: "text-rose-700",
      border: "border-rose-200",
      dot: "bg-rose-600",
    },
    INPUT_DEFICIT: {
      text: "INPUT DEFICIT",
      bg: "bg-amber-50",
      textCol: "text-amber-800",
      border: "border-amber-200",
    },
    OUTPUT_SURPLUS: {
      text: "OUTPUT SURPLUS",
      bg: "bg-sky-50",
      textCol: "text-sky-800",
      border: "border-sky-200",
    },
  };

  const config = badgeConfig[type];
  const displayText = label || config.text;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono font-semibold tracking-wider uppercase",
        config.bg,
        config.textCol,
        config.border,
        className
      )}
    >
      {config.dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      )}
      {displayText}
    </span>
  );
}
