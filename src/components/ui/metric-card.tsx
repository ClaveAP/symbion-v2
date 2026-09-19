import React from "react";
import { cn } from "@/lib/utils";
import { StatusBadge, BadgeType } from "./status-badge";

interface MetricCardProps {
  title: string;
  badgeType: BadgeType;
  badgeLabel?: string;
  value: string | number;
  unit?: string;
  deltaText?: string;
  deltaPositive?: boolean;
  subtitle?: string;
  footnote?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  alert?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  badgeType,
  badgeLabel,
  value,
  unit,
  deltaText,
  deltaPositive = true,
  subtitle,
  footnote,
  icon,
  highlight = false,
  alert = false,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-5 rounded-xl border bg-white shadow-xs transition-all duration-200",
        highlight
          ? "border-primary/40 bg-gradient-to-br from-white via-white to-emerald-50/40"
          : alert
          ? "border-amber-300 bg-gradient-to-br from-white via-white to-amber-50/30"
          : "border-slate-200 hover:border-slate-300",
        className
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              {icon}
            </div>
          )}
          <h4 className="text-[13px] font-semibold text-slate-700 leading-snug">
            {title}
          </h4>
        </div>
        <StatusBadge type={badgeType} label={badgeLabel} />
      </div>

      {/* Main Metric Value */}
      <div className="my-2">
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "text-2xl lg:text-3xl font-bold font-mono tracking-tight tabular-nums",
              highlight
                ? "text-primary"
                : alert
                ? "text-amber-700"
                : "text-slate-900"
            )}
          >
            {value}
          </span>
          {unit && (
            <span className="text-[13px] font-medium text-slate-500 font-mono">
              {unit}
            </span>
          )}
        </div>

        {deltaText && (
          <div className="flex items-center gap-1 mt-1">
            <span
              className={cn(
                "text-[11px] font-semibold px-1.5 py-0.5 rounded font-mono",
                deltaPositive
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              )}
            >
              {deltaText}
            </span>
            {subtitle && (
              <span className="text-[11px] text-slate-500 truncate">
                {subtitle}
              </span>
            )}
          </div>
        )}

        {!deltaText && subtitle && (
          <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Footer Rule & Note */}
      {footnote && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="truncate">{footnote}</span>
        </div>
      )}
    </div>
  );
}
