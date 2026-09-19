import React from "react";
import { Currency } from "@/types/symbion";
import { cn } from "@/lib/utils";

interface CurrencyToggleProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencyToggle({
  currentCurrency,
  onCurrencyChange,
  className,
}: CurrencyToggleProps) {
  const currencies: { id: Currency; label: string; symbol: string; country: string }[] = [
    { id: "MYR", label: "MYR", symbol: "RM", country: "MY" },
    { id: "IDR", label: "IDR", symbol: "Rp", country: "ID" },
    { id: "USD", label: "USD", symbol: "$", country: "US" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-lg bg-slate-100/90 border border-slate-200/80 shadow-xs",
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
              "px-2.5 py-1 text-[12px] font-mono font-semibold rounded-md transition-all duration-150 flex items-center gap-1",
              isActive
                ? "bg-white text-primary shadow-xs font-bold border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            )}
          >
            <span className="text-[10px] text-slate-400 font-sans">{curr.symbol}</span>
            <span>{curr.label}</span>
          </button>
        );
      })}
    </div>
  );
}
