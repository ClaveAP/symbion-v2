import {
  IndustrialCase,
  ScenarioCalculation,
  StressTestShock,
} from "@/types/symbion";
import { convertFromINR } from "./currency";

export function calculateScenario(
  industrialCase: IndustrialCase,
  alpha: number
): ScenarioCalculation {
  const inputGap = Math.max(
    0,
    industrialCase.designCapacity - industrialCase.initialSupply
  );
  const additionalSupply = alpha * inputGap;
  const totalInput = industrialCase.initialSupply + additionalSupply;
  const utilizationPct = (totalInput / industrialCase.designCapacity) * 100;
  const gapRemaining = Math.max(0, industrialCase.designCapacity - totalInput);

  // Annual feedstock
  const annualFeedstock = additionalSupply * industrialCase.operatingDaysPerYear;

  // Byproduct ratios (CBG & FOM)
  const cbgTons = industrialCase.cbgYieldRatio * annualFeedstock;
  const fomTons = industrialCase.fomYieldRatio * annualFeedstock;

  // Energy conversions
  const cbgKg = cbgTons * 1000;
  const energyMJ = cbgKg * industrialCase.calorificValueMJperKg;
  const energyMMBtu = energyMJ > 0 ? energyMJ / 1055.06 : 0;

  // Economic gross projection (Base price INR/MMBtu)
  const grossValueINR = energyMMBtu * industrialCase.basePriceINRperMMBtu;

  // Avoided carbon emissions (56.1 kg CO2 / GJ equivalent)
  const energyGJ = energyMJ / 1000;
  const avoidedCO2Kg =
    energyGJ * industrialCase.naturalGasEmissionFactorKgPerGJ;
  const avoidedCO2Tons = avoidedCO2Kg / 1000;

  const label =
    alpha === 0
      ? "Baseline (0%)"
      : alpha === 0.5
      ? "Conservative (50%)"
      : alpha === 0.75
      ? "Representative (75%)"
      : "Full Loop (100%)";

  return {
    alpha,
    label,
    isRepresentative: alpha === 0.75,
    additionalSupplyPerDay: Number(additionalSupply.toFixed(2)),
    totalInputPerDay: Number(totalInput.toFixed(2)),
    utilizationPct: Number(utilizationPct.toFixed(2)),
    gapRemainingPerDay: Number(gapRemaining.toFixed(2)),
    annualFeedstockProcessedTons: Math.round(annualFeedstock),
    cbgProductionPerDay: Number((additionalSupply * industrialCase.cbgYieldRatio).toFixed(2)),
    fomProductionPerDay: Number((additionalSupply * industrialCase.fomYieldRatio).toFixed(2)),
    cbgProductionTonsYear: Number(cbgTons.toFixed(2)),
    cbgProductionKgYear: Math.round(cbgKg),
    fomProductionTonsYear: Number(fomTons.toFixed(2)),
    energyMJYear: Math.round(energyMJ),
    energyMMBtuYear: Number(energyMMBtu.toFixed(2)),
    grossValueINR: Math.round(grossValueINR),
    grossValue: {
      INR: Math.round(grossValueINR),
      MYR: Math.round(convertFromINR(grossValueINR, "MYR")),
      IDR: Math.round(convertFromINR(grossValueINR, "IDR")),
      USD: Math.round(convertFromINR(grossValueINR, "USD")),
    },
    avoidedCO2TonsYear: Number(avoidedCO2Tons.toFixed(2)),
  };
}

export function getAllScenarios(
  industrialCase: IndustrialCase
): ScenarioCalculation[] {
  return [0, 0.5, 0.75, 1.0].map((alpha) =>
    calculateScenario(industrialCase, alpha)
  );
}

export function getStressTestShocks(
  industrialCase: IndustrialCase
): StressTestShock[] {
  // Representative 75% scenario benchmark
  const rep = calculateScenario(industrialCase, 0.75);

  return [
    {
      id: "nominal",
      title: "Nominal System Equilibrium",
      category: "nominal",
      shockDescription:
        "Standard balanced operating conditions under 75% gap fulfillment benchmark.",
      retentionPct: 100,
      effectiveCapacityUtilization: rep.utilizationPct, // 88.33%
      effectiveFeedstockAnnual: rep.annualFeedstockProcessedTons, // 17,325 t/y
      effectiveCbgAbsorbedTons: rep.cbgProductionTonsYear, // 577.5 t/y
      status: "optimal",
    },
    {
      id: "feedstock_shock",
      title: "Feedstock Supply Shock (-20%)",
      category: "feedstock",
      shockDescription:
        "Disruption in municipal/agricultural collection reducing additional supply by 20%.",
      retentionPct: 80,
      effectiveCapacityUtilization: 81.33, // 122 t/d on 150 t/d = 81.33%
      effectiveFeedstockAnnual: Math.round(rep.annualFeedstockProcessedTons * 0.8), // 13,860 t/y
      effectiveCbgAbsorbedTons: Number((rep.cbgProductionTonsYear * 0.8).toFixed(2)), // 462 t/y
      status: "moderate",
    },
    {
      id: "operating_time_shock",
      title: "Operating-Time Shock (-20% Days)",
      category: "operating_time",
      shockDescription:
        "Unplanned maintenance, grid outages, or monsoon downtime reducing annual run days to 264.",
      retentionPct: 80,
      effectiveCapacityUtilization: rep.utilizationPct, // 88.33% (daily rate steady)
      effectiveFeedstockAnnual: 13860, // 52.5 t/d * 264 days = 13,860 t/y
      effectiveCbgAbsorbedTons: Number((577.5 * 0.8).toFixed(2)), // 462 t/y
      status: "moderate",
    },
    {
      id: "offtake_shock",
      title: "CBG Off-Take Absorption Shock (-30%)",
      category: "offtake",
      shockDescription:
        "Downstream grid curtailment, CNG filling station congestion, or industrial client off-take delay.",
      retentionPct: 70,
      effectiveCapacityUtilization: rep.utilizationPct,
      effectiveFeedstockAnnual: rep.annualFeedstockProcessedTons,
      effectiveCbgAbsorbedTons: 404.25, // 577.5 * 0.7 = 404.25 t/y
      status: "critical",
    },
  ];
}
