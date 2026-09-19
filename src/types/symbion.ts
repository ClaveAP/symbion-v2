export type Currency = 'MYR' | 'IDR' | 'USD';

export type ImbalanceType = 'input_deficit' | 'output_surplus';

export type CaseId = 'jhiri-cbg' | 'gadarwara-flyash' | 'custom';

export interface IndustrialCase {
  id: CaseId;
  title: string;
  badge: string;
  facility: string;
  location: string;
  imbalanceType: ImbalanceType;
  primaryStream: string;
  byproductStream?: string;
  designCapacity: number; // tons/day (or tons/yr)
  initialSupply: number; // tons/day (or tons/yr)
  capacityUnit: string;
  operatingDaysPerYear: number;
  cbgYieldRatio: number; // e.g. 5 / 150
  fomYieldRatio: number; // e.g. 25 / 150
  calorificValueMJperKg: number; // 52 MJ/kg
  naturalGasEmissionFactorKgPerGJ: number; // 56.1 kg CO2/GJ
  basePriceINRperMMBtu: number; // 1478 INR
  description: string;
  unutilizedTonsYear?: number;
  unutilizedRatioPct?: number;
  actorsCount: number;
  streamCount: number;
}

export interface ScenarioCalculation {
  alpha: number; // 0, 0.5, 0.75, 1.0
  label: string;
  isRepresentative?: boolean;
  additionalSupplyPerDay: number;
  totalInputPerDay: number;
  utilizationPct: number;
  gapRemainingPerDay: number;
  annualFeedstockProcessedTons: number;
  cbgProductionPerDay?: number;
  fomProductionPerDay?: number;
  cbgProductionTonsYear: number;
  cbgProductionKgYear: number;
  fomProductionTonsYear: number;
  energyMJYear: number;
  energyMMBtuYear: number;
  grossValueINR: number;
  grossValue: {
    MYR: number;
    IDR: number;
    USD: number;
    INR: number;
  };
  avoidedCO2TonsYear: number;
}

export type ScenarioResult = ScenarioCalculation;

export interface StressTestShock {
  id: string;
  title: string;
  category: 'nominal' | 'feedstock' | 'operating_time' | 'offtake';
  shockDescription: string;
  retentionPct: number;
  effectiveCapacityUtilization: number;
  effectiveFeedstockAnnual: number;
  effectiveCbgAbsorbedTons: number;
  status: 'optimal' | 'moderate' | 'critical';
}
