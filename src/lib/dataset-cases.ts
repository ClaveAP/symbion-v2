import { IndustrialCase } from "@/types/symbion";

export const BENCHMARK_CASES: Record<string, IndustrialCase> = {
  "jhiri-cbg": {
    id: "jhiri-cbg",
    title: "Compressed Biogas (CBG) Plant - GAIL Ranchi",
    badge: "INPUT DEFICIT ANCHOR",
    facility: "Jhiri CBG Facility (GAIL India)",
    location: "Jhiri, Ranchi, Jharkhand",
    imbalanceType: "input_deficit",
    primaryStream: "Segregated Wet Organic Waste",
    byproductStream: "Fermented Organic Manure (FOM)",
    designCapacity: 150, // tons/day
    initialSupply: 80, // tons/day
    capacityUnit: "tons/day",
    operatingDaysPerYear: 330,
    cbgYieldRatio: 5 / 150, // 5 tons CBG per 150 tons wet waste
    fomYieldRatio: 25 / 150, // 25 tons FOM per 150 tons wet waste
    calorificValueMJperKg: 52, // 52 MJ/kg
    naturalGasEmissionFactorKgPerGJ: 56.1, // 56.1 kg CO2/GJ
    basePriceINRperMMBtu: 1478, // ₹1,478 / MMBtu
    description:
      "A commercial-scale anaerobic digestion facility designed for 150 t/day organic wet waste, operating with an initial input deficit of 70 t/day (53.33% capacity utilization). Ex-ante analysis demonstrates closed-loop restoration under 50%, 75%, and 100% gap fulfillment.",
    actorsCount: 5,
    streamCount: 7,
  },
  "gadarwara-flyash": {
    id: "gadarwara-flyash",
    title: "Gadarwara Super Thermal Power Station (NTPC)",
    badge: "OUTPUT SURPLUS SINK",
    facility: "NTPC Gadarwara (2 × 800 MW)",
    location: "Narsinghpur District, Madhya Pradesh",
    imbalanceType: "output_surplus",
    primaryStream: "Pulverized Coal Combustion Fly Ash",
    designCapacity: 1_685_000, // tons/year generation
    initialSupply: 634_300, // tons/year recorded utilization
    unutilizedTonsYear: 1_050_700, // 1,685,000 - 634,300
    unutilizedRatioPct: 62.35, // 62.35% unutilized
    capacityUnit: "tons/year",
    operatingDaysPerYear: 365,
    cbgYieldRatio: 0,
    fomYieldRatio: 0,
    calorificValueMJperKg: 0,
    naturalGasEmissionFactorKgPerGJ: 0,
    basePriceINRperMMBtu: 0,
    description:
      "A mega coal-fired thermal generation plant generating 1.685M tons/year of combustion fly ash with only 634.3k tons utilized in cement blending, leaving an unutilized surplus balance of 1.05M tons/year (62.35%) requiring secondary symbiotic sinks.",
    actorsCount: 7,
    streamCount: 10,
  },
};
