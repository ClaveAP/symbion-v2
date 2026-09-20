import React from "react";
import { Currency } from "@/types/symbion";
import { cn } from "@/lib/utils";

interface CurrencyToggleProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
  compact?: boolean;
}

export function CurrencyToggle({
  currentCurrency,
  onCurrencyChange,
  className,
  compact = false,
}: CurrencyToggleProps) {
  const currencies: { id: Currency; label: string; symbol: string; country: string }[] = [
    { id: "MYR", label: "MYR", symbol: "RM", country: "MY" },
    { id: "IDR", label: "IDR", symbol: "Rp", country: "ID" },
    { id: "USD", label: "USD", symbol: "$", country: "US" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center p-0.5 sm:p-1 rounded-lg bg-slate-100/90 border border-slate-200/80 shadow-xs shrink-0 select-none",
        className
      )}
      role="group"
      aria-label="Currency Switcher"
    >
      {currencies.map((curr) => {
        const isActive = currentCurrency === curr.id;
        return (
          <button
            key={curr.id}
            type="button"
            onClick={() => onCurrencyChange(curr.id)}
            className={cn(
              "px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-[12px] font-mono font-semibold rounded-md transition-all duration-150 flex items-center gap-0.5 sm:gap-1 cursor-pointer",
              isActive
                ? "bg-white text-primary shadow-xs font-bold border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50",
              compact && "px-1.5 py-0.5 text-[10.5px]"
            )}
          >
            <span className="text-[9.5px] sm:text-[10px] text-slate-500 font-sans font-bold">
              {curr.symbol}
            </span>
            <span className={cn("font-mono", compact ? "hidden" : "hidden sm:inline")}>
              {curr.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
