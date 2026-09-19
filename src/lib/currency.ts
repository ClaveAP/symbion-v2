import { Currency } from "@/types/symbion";

// Exchange rates normalized against INR as base anchor
// 1 USD = 86.50 INR | 1 USD = 4.45 MYR | 1 USD = 15,800 IDR
export const EXCHANGE_RATES = {
  INR_TO_USD: 1 / 86.5,
  INR_TO_MYR: 4.45 / 86.5,
  INR_TO_IDR: 15800 / 86.5,
};

export function convertFromINR(inrAmount: number, targetCurrency: Currency): number {
  switch (targetCurrency) {
    case "USD":
      return inrAmount * EXCHANGE_RATES.INR_TO_USD;
    case "MYR":
      return inrAmount * EXCHANGE_RATES.INR_TO_MYR;
    case "IDR":
      return inrAmount * EXCHANGE_RATES.INR_TO_IDR;
    default:
      return inrAmount;
  }
}

export function formatCurrency(
  amount: number,
  currency: Currency,
  compact: boolean = false
): string {
  if (compact) {
    if (currency === "MYR") {
      if (amount >= 1_000_000) {
        return `RM ${(amount / 1_000_000).toFixed(2)}M`;
      }
      if (amount >= 1_000) {
        return `RM ${(amount / 1_000).toFixed(1)}k`;
      }
      return `RM ${Math.round(amount).toLocaleString()}`;
    }

    if (currency === "IDR") {
      if (amount >= 1_000_000_000) {
        return `Rp ${(amount / 1_000_000_000).toFixed(2)} Miliar`;
      }
      if (amount >= 1_000_000) {
        return `Rp ${(amount / 1_000_000).toFixed(1)} Juta`;
      }
      return `Rp ${Math.round(amount).toLocaleString()}`;
    }

    if (currency === "USD") {
      if (amount >= 1_000_000) {
        return `$${(amount / 1_000_000).toFixed(2)}M`;
      }
      if (amount >= 1_000) {
        return `$${(amount / 1_000).toFixed(1)}k`;
      }
      return `$${Math.round(amount).toLocaleString()}`;
    }
  }

  // Full detailed format
  switch (currency) {
    case "MYR":
      return `RM ${Math.round(amount).toLocaleString("en-MY")}`;
    case "IDR":
      return `Rp ${Math.round(amount).toLocaleString("id-ID")}`;
    case "USD":
      return `$${Math.round(amount).toLocaleString("en-US")}`;
    default:
      return `${Math.round(amount).toLocaleString()}`;
  }
}
