"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { CaseId, Currency, IndustrialCase, ScenarioResult } from "@/types/symbion";
import { BENCHMARK_CASES } from "@/lib/dataset-cases";
import { calculateScenario } from "@/lib/symbion-engine";

interface SymbionContextType {
  currentCaseId: CaseId;
  setCurrentCaseId: (id: CaseId) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  selectedAlpha: number;
  setSelectedAlpha: (alpha: number) => void;
  isSandboxOpen: boolean;
  setIsSandboxOpen: (open: boolean) => void;
  currentCase: IndustrialCase;
  scenario: ScenarioResult;
  allScenarios: ScenarioResult[];
  isJhiri: boolean;
}

const SymbionContext = createContext<SymbionContextType | undefined>(undefined);

export function SymbionProvider({ children }: { children: React.ReactNode }) {
  const [currentCaseId, setCurrentCaseIdState] = useState<CaseId>("jhiri-cbg");
  const [currency, setCurrency] = useState<Currency>("MYR");
  const [selectedAlpha, setSelectedAlpha] = useState<number>(0.75);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);

  const setCurrentCaseId = (id: CaseId) => {
    setCurrentCaseIdState(id);
    setSelectedAlpha(0.75);
  };

  const currentCase = useMemo(
    () => BENCHMARK_CASES[currentCaseId] || BENCHMARK_CASES["jhiri-cbg"],
    [currentCaseId]
  );

  const scenario = useMemo(
    () => calculateScenario(currentCase, selectedAlpha),
    [currentCase, selectedAlpha]
  );

  const allScenarios = useMemo(() => {
    return [0, 0.5, 0.75, 1.0].map((alpha) => calculateScenario(currentCase, alpha));
  }, [currentCase]);

  const isJhiri = currentCaseId === "jhiri-cbg";

  return (
    <SymbionContext.Provider
      value={{
        currentCaseId,
        setCurrentCaseId,
        currency,
        setCurrency,
        selectedAlpha,
        setSelectedAlpha,
        isSandboxOpen,
        setIsSandboxOpen,
        currentCase,
        scenario,
        allScenarios,
        isJhiri,
      }}
    >
      {children}
    </SymbionContext.Provider>
  );
}

export function useSymbion() {
  const context = useContext(SymbionContext);
  if (!context) {
    throw new Error("useSymbion must be used within a SymbionProvider");
  }
  return context;
}
