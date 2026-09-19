"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { useUserSession } from "@/context/user-session-context";
import {
  Building2,
  MapPin,
  Recycle,
  Factory,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  PlusCircle,
  Search,
  Download,
  Eye,
  Edit2,
  Check,
  RotateCcw,
  Layers,
  Newspaper,
  BadgeCheck,
  Handshake,
  FileCheck2,
  ArrowUpRight,
  X,
} from "lucide-react";

interface IndustrialPartner {
  id: string;
  name: string;
  location: string;
  wasteType: string;
  specification: string;
  volume: string;
  currentDisposal: string;
  disposalTagClass: string;
  recommendedSolution: string;
  verificationStatus: "Verified" | "Pending Survey" | "Active";
  badgeClass: string;
}

type UpdateCategory = "Verification" | "Market" | "Policy";

interface NetworkUpdate {
  id: string;
  category: UpdateCategory;
  title: string;
  summary: string;
  timestamp: string;
  action: string;
}

const INITIAL_PARTNERS: IndustrialPartner[] = [
  {
    id: "p1",
    name: "Ranchi Municipal Wet Waste Collection",
    location: "Ranchi Urban Core / Jhiri",
    wasteType: "Segregated Municipal Wet Waste",
    specification: "Volatile Solids > 70%, Moisture 75%",
    volume: "2,400 t/mo (80 t/d)",
    currentDisposal: "Open Landfill Dumpsite",
    disposalTagClass: "bg-rose-50 text-rose-700 border border-rose-200",
    recommendedSolution: "Continuous Biogas Digester (GAIL Jhiri CBG)",
    verificationStatus: "Verified",
    badgeClass: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  },
  {
    id: "p2",
    name: "Pandra Wholesale Agricultural Mandi",
    location: "Pandra Market Yard, Ranchi",
    wasteType: "Agro-Market Vegetable & Fruit Residue",
    specification: "High Biodegradable Organic Fraction",
    volume: "1,575 t/mo (52.5 t/d)",
    currentDisposal: "Unsegregated Dumpsite",
    disposalTagClass: "bg-slate-100 text-slate-700 border border-slate-200",
    recommendedSolution: "Secondary Biogas Co-Digestion (Gap Closure)",
    verificationStatus: "Verified",
    badgeClass: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  },
  {
    id: "p3",
    name: "NTPC Gadarwara Super Thermal Station",
    location: "Gadarwara, Madhya Pradesh",
    wasteType: "Pulverized Coal Combustion Fly Ash",
    specification: "Class F / Reactive Silica > 70%",
    volume: "140,416 t/mo (1.685M t/yr)",
    currentDisposal: "Slurry Dykes Lagoon Retention",
    disposalTagClass: "bg-rose-50 text-rose-700 border border-rose-200",
    recommendedSolution: "PPC Cement Blending & Geopolymer Road Bricks",
    verificationStatus: "Pending Survey",
    badgeClass: "bg-amber-50 text-amber-800 border border-amber-200",
  },
  {
    id: "p4",
    name: "Jharkhand Bio-Fertilizer Consortium",
    location: "Namkum Hub, Ranchi",
    wasteType: "Fermented Organic Manure (FOM)",
    specification: "NPK Balanced Bio-Soil Amender",
    volume: "750 t/mo (25 t/d)",
    currentDisposal: "Unprocessed Direct Spreading",
    disposalTagClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    recommendedSolution: "Commercial Bio-Pelletizing & FPO Distribution",
    verificationStatus: "Verified",
    badgeClass: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  },
  {
    id: "p5",
    name: "PT Agro Sawit Jaya",
    location: "Subang Smartpolitan Axis, West Java",
    wasteType: "Palm Oil Mill Effluent (POME)",
    specification: "COD > 45,000 mg/L, Methane Capture Ready",
    volume: "5,000 m³/mo",
    currentDisposal: "Open Anaerobic Lagoon",
    disposalTagClass: "bg-rose-50 text-rose-700 border border-rose-200",
    recommendedSolution: "Covered Lagoon Biogas & Clean Power Generation",
    verificationStatus: "Verified",
    badgeClass: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  },
  {
    id: "p6",
    name: "Subang Biomass Cooperative",
    location: "Subang Regency, West Java",
    wasteType: "Empty Fruit Bunches (EFB)",
    specification: "Fibrous Biomass, Moisture 55-65%",
    volume: "800 t/mo",
    currentDisposal: "Open Pile Storage",
    disposalTagClass: "bg-amber-50 text-amber-800 border border-amber-200",
    recommendedSolution: "Boiler Pellet Production & Composting",
    verificationStatus: "Active",
    badgeClass: "bg-sky-50 text-sky-800 border border-sky-200",
  },
  {
    id: "p7",
    name: "Subang Sugar Processing Cluster",
    location: "Subang Regency, West Java",
    wasteType: "Sugarcane Bagasse",
    specification: "Lignocellulosic Fiber, 7.5-9.2 MJ/kg",
    volume: "300 t/mo",
    currentDisposal: "Seasonal Stockpile",
    disposalTagClass: "bg-slate-100 text-slate-700 border border-slate-200",
    recommendedSolution: "Industrial Co-Firing & Feed Pre-Treatment",
    verificationStatus: "Verified",
    badgeClass: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  },
  {
    id: "p8",
    name: "Cirebon Poultry Cooperative",
    location: "Cirebon Agro-Industrial Corridor",
    wasteType: "Poultry Manure",
    specification: "Nitrogen-Rich Organic Feedstock",
    volume: "200 t/mo",
    currentDisposal: "Uncontrolled Field Spreading",
    disposalTagClass: "bg-rose-50 text-rose-700 border border-rose-200",
    recommendedSolution: "Organic Bio-Fertilizer Granulation",
    verificationStatus: "Pending Survey",
    badgeClass: "bg-amber-50 text-amber-800 border border-amber-200",
  },
  {
    id: "p9",
    name: "Cirebon Soy Food Collective",
    location: "Cirebon Food Manufacturing Cluster",
    wasteType: "Soy Okara",
    specification: "Protein-Rich Wet Residue",
    volume: "10 t/mo",
    currentDisposal: "Third-Party Hauling",
    disposalTagClass: "bg-slate-100 text-slate-700 border border-slate-200",
    recommendedSolution: "Stabilized Protein Feed Ingredient",
    verificationStatus: "Active",
    badgeClass: "bg-sky-50 text-sky-800 border border-sky-200",
  },
];

const NETWORK_UPDATES: NetworkUpdate[] = [
  {
    id: "u1",
    category: "Verification",
    title: "POME characterization window opened for the Subang cluster",
    summary:
      "The demo workflow now tracks COD sampling, methane potential, and lagoon condition before a facility can move to verified status.",
    timestamp: "Today, 09:20",
    action: "Review checklist",
  },
  {
    id: "u2",
    category: "Market",
    title: "Bagasse off-take capacity updated for the co-firing pathway",
    summary:
      "A seeded buyer profile adds 300 tonnes per month of provisional demand to the regional material exchange preview.",
    timestamp: "Yesterday, 16:40",
    action: "View opportunity",
  },
  {
    id: "u3",
    category: "Verification",
    title: "Fly ash receiver survey is awaiting laboratory validation",
    summary:
      "Reactive silica and leachability results remain required before cement and road-brick recommendations can be certified.",
    timestamp: "18 Sep, 11:15",
    action: "Open survey",
  },
  {
    id: "u4",
    category: "Policy",
    title: "Circular procurement evidence pack added to the demo workspace",
    summary:
      "Partners can now see which traceability records, weighbridge slips, and chain-of-custody documents support an audit-ready exchange.",
    timestamp: "17 Sep, 14:05",
    action: "Read guidance",
  },
];

export default function DataIntegrationHubPage() {
  const { isPartner, isAdmin } = useUserSession();
  const [partners, setPartners] = useState<IndustrialPartner[]>(INITIAL_PARTNERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [updateFilter, setUpdateFilter] = useState<"All" | UpdateCategory>("All");
  const [selectedUpdate, setSelectedUpdate] = useState<NetworkUpdate | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<IndustrialPartner | null>(null);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [volume, setVolume] = useState("");
  const [unit, setUnit] = useState("t/mo");
  const [currentTreatment, setCurrentTreatment] = useState("Open Lagoon");
  const [coordinates, setCoordinates] = useState("23.3441, 85.3096 (Jhiri, Ranchi)");

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 4000);
  };

  const resetForm = () => {
    setCompanyName("");
    setSector("");
    setWasteType("");
    setVolume("");
    setUnit("t/mo");
    setCurrentTreatment("Open Lagoon");
    setCoordinates("23.3441, 85.3096 (Jhiri, Ranchi)");
    setEditingPartnerId(null);
  };

  const handleVerifyStream = (partnerId: string, partnerName: string) => {
    setPartners((prev) =>
      prev.map((p) =>
        p.id === partnerId
          ? {
              ...p,
              verificationStatus: "Verified",
              badgeClass: "bg-emerald-50 text-emerald-800 border border-emerald-200",
            }
          : p
      )
    );
    if (typeof window !== "undefined") {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
    showToast(`Stream from "${partnerName}" verified by Estate Administrator!`);
  };

  const handleQuickType = (type: string) => {
    setWasteType(type);
    if (type.includes("Municipal")) {
      setVolume("2400");
      setUnit("t/mo");
      setSector("Municipal Solid Waste");
    } else if (type.includes("Mandi")) {
      setVolume("1575");
      setUnit("t/mo");
      setSector("Agricultural Wholesale Market");
    } else if (type.includes("Fly Ash")) {
      setVolume("140416");
      setUnit("t/mo");
      setSector("Thermal Power Generation");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !wasteType || !volume) return;

    const existingPartner = editingPartnerId
      ? partners.find((partner) => partner.id === editingPartnerId)
      : undefined;
    const parsedLocation = coordinates.includes("(")
      ? coordinates.split("(")[1]?.replace(")", "")
      : coordinates.trim();
    const newPartner: IndustrialPartner = {
      id: existingPartner?.id ?? `p${Date.now()}`,
      name: companyName,
      location: parsedLocation || "Regional cluster",
      wasteType: wasteType,
      specification: `Vol: ${volume} ${unit}`,
      volume: `${Number(volume).toLocaleString()} ${unit}`,
      currentDisposal: currentTreatment,
      disposalTagClass:
        currentTreatment === "Open Lagoon" ||
        currentTreatment === "Landfill Disposal" ||
        currentTreatment === "Unmanaged / No Solution"
          ? "bg-rose-50 text-rose-700 border border-rose-200"
          : "bg-slate-100 text-slate-700 border border-slate-200",
      recommendedSolution:
        existingPartner?.recommendedSolution ?? "Continuous Biogas Digester (GAIL Jhiri CBG)",
      verificationStatus: existingPartner?.verificationStatus ?? "Verified",
      badgeClass:
        existingPartner?.badgeClass ??
        "bg-emerald-50 text-emerald-800 border border-emerald-200",
    };

    setPartners(
      existingPartner
        ? partners.map((partner) => (partner.id === existingPartner.id ? newPartner : partner))
        : [newPartner, ...partners],
    );
    showToast(
      existingPartner
        ? `Facility "${companyName}" was updated successfully.`
        : `Facility "${companyName}" was registered and matched successfully.`,
    );

    if (!existingPartner && typeof window !== "undefined") {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2c7a4b", "#89d7a0", "#14503f"],
      });
    }

    resetForm();
  };

  const handleEditPartner = (partner: IndustrialPartner) => {
    const normalizedTreatment = partner.currentDisposal.toLowerCase();
    setEditingPartnerId(partner.id);
    setCompanyName(partner.name);
    setSector("Agro-Industry & Sugar");
    setWasteType(partner.wasteType);
    setVolume(partner.volume.replace(/,/g, "").match(/[\d.]+/)?.[0] ?? "");
    setUnit(partner.volume.includes("m³") ? "m³/mo" : "t/mo");
    setCurrentTreatment(
      normalizedTreatment.includes("lagoon")
        ? "Open Lagoon"
        : normalizedTreatment.includes("landfill") || normalizedTreatment.includes("dumpsite")
          ? "Landfill Disposal"
          : normalizedTreatment.includes("third-party")
            ? "Third-Party Hauling"
            : "Unmanaged / No Solution",
    );
    setCoordinates(partner.location);
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadRegistry = () => {
    if (typeof window === "undefined") return;

    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const header = [
      "Facility",
      "Location",
      "Waste Stream",
      "Specification",
      "Volume",
      "Current Disposal",
      "Matched Pathway",
      "Status",
    ];
    const rows = partners.map((partner) => [
      partner.name,
      partner.location,
      partner.wasteType,
      partner.specification,
      partner.volume,
      partner.currentDisposal,
      partner.recommendedSolution,
      partner.verificationStatus,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => escapeCsv(value)).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "symbion-partner-registry.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    showToast("Partner registry CSV downloaded.");
  };

  const filteredPartners = partners.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    const isMyFacility =
      p.name.toLowerCase().includes("sawit") ||
      p.name.toLowerCase().includes("subang") ||
      p.location.toLowerCase().includes("subang");

    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "my_facility"
        ? isMyFacility
        : p.verificationStatus.toLowerCase() === filterStatus.toLowerCase();

    return matchSearch && matchStatus;
  });

  const verifiedPartnerCount = partners.filter(
    (partner) => partner.verificationStatus === "Verified",
  ).length;
  const filteredUpdates = NETWORK_UPDATES.filter(
    (update) => updateFilter === "All" || update.category === updateFilter,
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 left-4 right-4 sm:left-auto sm:right-8 z-50 bg-[#2c7a4b] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Role-Differentiated Operating Desk Banner */}
      {isPartner && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white font-mono text-[13px] font-bold shadow-xs">
              HP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[14px] font-bold text-emerald-950">
                  Regional Partner Intake Portal • PT Sawit Subang Bio-Industri
                </h2>
                <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 uppercase">
                  Mitra Kawasan
                </span>
              </div>
              <p className="text-[12px] text-emerald-800 mt-0.5">
                Register and update organic byproduct streams (POME, EFB, bagasse) directly into the Subang Smartpolitan Axis pipeline.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setCompanyName("PT Sawit Subang Bio-Industri");
              setSector("Palm Oil Agro-Industry");
              setWasteType("Palm Oil Mill Effluent (POME)");
              setVolume("5000");
              setUnit("m³/mo");
              setCoordinates("Subang Smartpolitan Axis, West Java");
              setCurrentTreatment("Open Lagoon");
              showToast("Autofilled Subang facility parameters into intake form.");
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[12px] font-bold transition-colors shadow-xs"
          >
            Autofill Subang Facility Form
          </button>
        </div>
      )}

      {isAdmin && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2c7a4b] text-white font-mono text-[13px] font-bold shadow-xs">
              SA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[14px] font-bold text-white">
                  Central Cluster Verification Desk • Root Administration
                </h2>
                <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 uppercase">
                  Super Admin Level 3
                </span>
              </div>
              <p className="text-[12px] text-slate-300 mt-0.5">
                Full authority to audit incoming partner streams, approve pending surveys, and certify mass-balance allocations.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 font-bold">
              {partners.filter((p) => p.verificationStatus === "Verified").length} Streams Verified
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold">
              {partners.filter((p) => p.verificationStatus !== "Verified").length} Pending Survey
            </span>
          </div>
        </div>
      )}

      {/* TOP SECTION: Portal Header Banner */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-[#2c7a4b] text-[12px] font-bold font-mono uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>INTEGRATED CLUSTER DATA PORTAL</span>
          </div>
          <h1 className="text-[20px] sm:text-[22px] font-bold text-slate-900 tracking-tight">
            Industrial Waste Streams & Facility Integration Hub
          </h1>
          <p className="text-[13px] text-slate-500 leading-relaxed">
            Register, update, and validate byproduct outputs across regional manufacturing facilities to compute autonomous circular symbiosis matches.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <a
            href="#form-section"
            className="bg-[#2c7a4b] text-white hover:bg-[#23613c] px-4 py-2.5 rounded-xl flex items-center gap-2 text-[12.5px] font-bold shadow-xs transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Register Facility / Waste</span>
          </a>
          <button
            type="button"
            disabled
            title="Bulk import will be enabled when the production data connector is configured."
            className="bg-slate-100 text-slate-400 px-4 py-2.5 rounded-xl flex items-center gap-2 text-[12.5px] font-semibold border border-slate-200 cursor-not-allowed"
          >
            <UploadCloud className="w-4 h-4 text-slate-500" />
            <span>Bulk Import Pending</span>
          </button>
        </div>
      </div>

      {/* STAT STRIP: 4 METRIC CARDS (Exact Stitch Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
              INDUSTRIAL PARTNERS
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2c7a4b] flex items-center justify-center">
              <Factory className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-mono font-bold text-slate-900">
              {partners.length}
            </span>
            <span className="text-[13px] font-bold text-slate-600">Active Facilities</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#2c7a4b] text-[11.5px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{verifiedPartnerCount} Physically Audited</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
              AGGREGATE RESIDUE VOLUME
            </span>
            <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Recycle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-mono font-bold text-slate-900">
              6,310
            </span>
            <span className="text-[13px] font-bold text-slate-600">t/mo Eq.</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Consolidated monthly baseline
          </span>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
              CLUSTER CIRCULARITY RATE
            </span>
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-mono font-bold text-[#2c7a4b]">
              28%
            </span>
            <span className="text-[12px] text-slate-500 font-semibold">/ Target 65%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#2c7a4b] h-full rounded-full w-[28%]" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
              SYMBION PRIORITY PIPELINE
            </span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-mono font-bold text-slate-900">1</span>
            <span className="text-[13px] font-bold text-slate-600">Gap Closure Source</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-800 text-[11.5px] font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>52.5 t/d Mandi Secondary Sourcing</span>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE: Form Left, AI Matching Estimator Right */}
      <div id="form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Clean Embedded Form */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#2c7a4b]" />
              <h2 className="text-[16px] font-bold text-slate-900">
                Register New Industrial Waste Stream
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              STEP 1/2
            </span>
          </div>

          <p className="text-[12.5px] text-slate-500 leading-snug">
            Input facility parameters to automatically match chemical, thermal, and spatial profiles with prospective industrial sinks in Ranchi & Gadarwara.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Facility Name */}
            <div>
              <label className="block text-[11.5px] font-mono font-bold text-slate-700 uppercase mb-1">
                Company / Facility Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Ranchi Municipal Waste Logistics"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-[#2c7a4b]"
              />
            </div>

            {/* Industrial Sector */}
            <div>
              <label className="block text-[11.5px] font-mono font-bold text-slate-700 uppercase mb-1">
                Industrial Sector <span className="text-rose-600">*</span>
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-[#2c7a4b] bg-white"
              >
                <option value="">Select Industrial Classification</option>
                <option value="Municipal Solid Waste">Municipal Solid Waste (Urban Wet Waste)</option>
                <option value="Agricultural Wholesale Market">Agricultural Wholesale Market (Mandi)</option>
                <option value="Thermal Power Generation">Thermal Power Generation (Coal Fly Ash)</option>
                <option value="Bio-Fertilizer Processing">Bio-Fertilizer Processing (FOM)</option>
                <option value="Agro-Industry & Sugar">Agro-Industry & Biomass Processing</option>
                <option value="Livestock & Dairy Farming">Livestock & Dairy Farming</option>
              </select>
            </div>

            {/* Waste Stream Type & Quick Tags */}
            <div>
              <label className="block text-[11.5px] font-mono font-bold text-slate-700 uppercase mb-1">
                Waste Stream Type <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                placeholder="e.g. Segregated Wet Waste, Mandi Residue, Coal Fly Ash"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-[#2c7a4b]"
              />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] text-slate-400 font-sans">Quick tags:</span>
                <button
                  type="button"
                  onClick={() => handleQuickType("Segregated Municipal Wet Waste")}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-[#2c7a4b] hover:text-white text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Municipal Wet Waste
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickType("Agri-Mandi Vegetable Waste")}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-[#2c7a4b] hover:text-white text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Mandi Residue
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickType("Pulverized Coal Fly Ash")}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-[#2c7a4b] hover:text-white text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Fly Ash
                </button>
              </div>
            </div>

            {/* Monthly Volume & Unit */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-7">
                <label className="block text-[11.5px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Monthly Output Volume <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="5000"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] font-mono font-bold text-slate-900 focus:outline-none focus:border-[#2c7a4b]"
                />
              </div>
              <div className="col-span-5">
                <label className="block text-[11.5px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Unit <span className="text-rose-600">*</span>
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-[#2c7a4b] bg-white"
                >
                  <option value="m³/mo">m³ / month</option>
                  <option value="t/mo">Tons / month</option>
                  <option value="kg/mo">kg / month</option>
                </select>
              </div>
            </div>

            {/* Current Disposal Practice */}
            <div>
              <label className="block text-[11.5px] font-mono font-bold text-slate-700 uppercase mb-1.5">
                Current Disposal Practice <span className="text-rose-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                {[
                  "Open Lagoon",
                  "Landfill Disposal",
                  "Third-Party Hauling",
                  "Unmanaged / No Solution",
                ].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      currentTreatment === opt
                        ? "border-[#2c7a4b] bg-emerald-50/60 font-bold text-emerald-900"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="treatment"
                      checked={currentTreatment === opt}
                      onChange={() => setCurrentTreatment(opt)}
                      className="accent-[#2c7a4b]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* GPS Coordinates */}
            <div>
              <label className="block text-[11.5px] font-mono font-bold text-slate-700 uppercase mb-1">
                Facility GPS Coordinates & Notes (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-[12.5px] text-slate-700 focus:outline-none focus:border-[#2c7a4b]"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-[12.5px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#2c7a4b] hover:bg-[#23613c] text-white text-[13px] font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>
                  {editingPartnerId
                    ? "Update Facility & Re-run Match"
                    : "Save & Execute Symbiosis Match"}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: AI Matching Estimator v2.4 */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#2c7a4b]" />
                <h3 className="text-[16px] font-bold text-slate-900">
                  Symbiosis Matching Engine (Real-Time Estimator)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#2c7a4b] border border-emerald-200">
                MODEL MATCHING v2.4
              </span>
            </div>

            <p className="text-[12.5px] text-slate-600 leading-relaxed">
              Autonomous matching algorithm pairs organic-rich wet waste with cement kilns, captive biogas engines, and organic fertilizer producers along the industrial axis.
            </p>

            {/* 3 Metric Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  OPTIMAL PATHWAY
                </span>
                <span className="text-[13.5px] font-bold text-slate-900 block mt-1">
                  Anaerobic Digestion
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  LNG Thermal Substitution
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  ESTIMATED OFFSET
                </span>
                <span className="text-[16px] font-mono font-bold text-[#2c7a4b] block mt-0.5">
                  3,840 tCO₂e / yr
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  ISO 14064 Compliant
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  COST EFFICIENCY
                </span>
                <span className="text-[16px] font-mono font-bold text-sky-800 block mt-0.5">
                  42% OPEX Saved
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  vs open lagoon aerators
                </span>
              </div>
            </div>

            {/* Facility location preview */}
            <figure className="relative aspect-[16/6] min-h-44 overflow-hidden rounded-xl bg-slate-200">
              <Image
                src="/images/subang-eco-industrial-hub.jpg"
                alt="Aerial view of a clean eco-industrial wastewater and biogas hub in Subang"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col sm:flex-row sm:items-end justify-between gap-2 bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-transparent px-4 pb-4 pt-12 text-white">
                <span className="flex items-start gap-2 text-[12.5px] font-semibold leading-snug">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-emerald-300" />
                  <span>Regional Hub: Subang Smartpolitan & Patimban Port Axis</span>
                </span>
                <span className="self-start sm:self-auto rounded-md bg-slate-950/70 px-2 py-1 text-[10.5px] font-semibold text-slate-100">
                  25 km radius
                </span>
              </figcaption>
            </figure>

            {/* Visual inspection gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  src: "/images/pome-treatment-facility.jpg",
                  alt: "Modern POME treatment facility with circular clarifier tank",
                  label: "POME Treatment",
                },
                {
                  src: "/images/bagasse-depot.jpg",
                  alt: "Clean industrial bagasse and biomass depot",
                  label: "Bagasse Depot",
                },
                {
                  src: "/images/organic-fertilizer-line.jpg",
                  alt: "Automated organic fertilizer production line",
                  label: "Organic Fertilizer",
                },
              ].map((image) => (
                <figure
                  key={image.src}
                  className="group relative aspect-[16/7] sm:aspect-[4/3] overflow-hidden rounded-lg bg-slate-200"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-3 pb-2 pt-7 text-[11px] font-bold text-white">
                    {image.label}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Advisory Guidance Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11.5px] text-slate-500 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2c7a4b] shrink-0 mt-0.5" />
              <span>
                <strong>Telemetry Standard:</strong> Enter normalized daily or monthly average flows under regular operational conditions. High volatile solid organic streams are automatically routed to the GAIL continuous anaerobic reactor pool.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Registered Industrial Partners & Symbiosis Status Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-[16px] font-bold text-slate-900 tracking-tight">
              Registered Industrial Partners & Symbiosis Status
            </h2>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Seeded implementation preview of byproduct generators and matched circular receivers. Replace demo records with validated API data in production.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Bar */}
            <div className="relative">
              <label htmlFor="partner-search" className="sr-only">
                Search partner registry
              </label>
              <input
                id="partner-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility, waste..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-[12px] text-slate-800 focus:outline-none focus:border-[#2c7a4b]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Filter Status */}
            <label htmlFor="partner-status" className="sr-only">
              Filter by verification status
            </label>
            <select
              id="partner-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[12px] text-slate-700 bg-white focus:outline-none focus:border-[#2c7a4b]"
            >
              <option value="all">All Verification States</option>
              {isPartner && (
                <option value="my_facility">My Facility Streams (Mitra)</option>
              )}
              <option value="verified">Verified</option>
              <option value="pending survey">Pending Survey</option>
              <option value="active">Active</option>
            </select>

            <button
              type="button"
              onClick={handleDownloadRegistry}
              aria-label="Download partner registry as CSV"
              title="Download partner registry as CSV"
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px] border-collapse">
            <thead>
              <tr className="bg-slate-100/75 text-slate-600 text-[11px] font-mono uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-3.5">Facility & Location</th>
                <th className="py-3 px-3.5">Primary Waste Stream</th>
                <th className="py-3 px-3.5">Output Volume</th>
                <th className="py-3 px-3.5">Current Disposal</th>
                <th className="py-3 px-3.5">Symbion Matched Pathway</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.map((item) => {
                const isSubangPartnerStream =
                  item.name.toLowerCase().includes("sawit") ||
                  item.name.toLowerCase().includes("subang") ||
                  item.location.toLowerCase().includes("subang");

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-sans font-semibold text-slate-900 text-[12.5px]">
                          {item.name}
                        </span>
                        {isPartner && isSubangPartnerStream && (
                          <span className="px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            My Stream
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5 font-mono">
                        {item.location}
                      </div>
                    </td>
                    <td className="py-3 px-3.5">
                      <div className="font-sans font-semibold text-slate-800 text-[12.5px]">
                        {item.wasteType}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {item.specification}
                      </div>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-slate-900 text-[12px]">
                      {item.volume}
                    </td>
                    <td className="py-3 px-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold ${item.disposalTagClass}`}
                      >
                        {item.currentDisposal}
                      </span>
                    </td>
                    <td className="py-3 px-3.5">
                      <span className="text-[12px] font-bold text-[#2c7a4b] flex items-center gap-1 font-sans">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.recommendedSolution}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider ${item.badgeClass}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{item.verificationStatus}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-slate-400">
                        {/* Admin One-Click Stream Verification */}
                        {isAdmin && item.verificationStatus !== "Verified" && (
                          <button
                            type="button"
                            onClick={() => handleVerifyStream(item.id, item.name)}
                            className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10.5px] font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer mr-1"
                            title="Verify and certify this stream"
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            <span>Verify</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedPartner(item)}
                          aria-label={`View dossier for ${item.name}`}
                          title="View facility dossier"
                          className="hover:text-slate-900 p-2 rounded-md hover:bg-slate-100 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditPartner(item)}
                          aria-label={`Edit ${item.name}`}
                          title="Edit facility parameters"
                          className="hover:text-slate-900 p-2 rounded-md hover:bg-slate-100 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredPartners.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center">
                    <div className="text-[13px] font-bold text-slate-800">No matching facilities</div>
                    <p className="mt-1 text-[12px] text-slate-500">
                      Clear the search or choose another verification status.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-2 text-[11.5px] text-slate-500">
          <span>
            Showing <strong>{filteredPartners.length}</strong> of {partners.length} registered facilities in the regional network
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-2.5 py-1 rounded bg-[#2c7a4b] text-white font-bold">1</span>
            <button
              type="button"
              disabled
              className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* NETWORK INTELLIGENCE: Seeded operational updates for implementation preview */}
      <section className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#2c7a4b]" />
              <h2 className="text-[16px] font-bold text-slate-900 tracking-tight">
                Regional Intelligence & Network Updates
              </h2>
            </div>
            <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
              Demo bulletins show how verification, market, and policy changes can keep partners informed after implementation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" aria-label="Filter network updates">
            {(["All", "Verification", "Market", "Policy"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setUpdateFilter(filter)}
                aria-pressed={updateFilter === filter}
                className={`px-3 py-1.5 rounded-lg text-[11.5px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c7a4b]/40 ${
                  updateFilter === filter
                    ? "bg-[#2c7a4b] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-6 pt-2">
          <div className="divide-y divide-slate-100">
            {filteredUpdates.map((update) => {
              const UpdateIcon =
                update.category === "Verification"
                  ? BadgeCheck
                  : update.category === "Market"
                    ? Handshake
                    : FileCheck2;

              return (
                <article
                  key={update.id}
                  className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 py-4 first:pt-3"
                >
                  <span className="w-9 h-9 rounded-lg bg-emerald-50 text-[#2c7a4b] flex items-center justify-center">
                    <UpdateIcon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#2c7a4b]">
                        {update.category}
                      </span>
                      <span className="text-[10.5px] text-slate-400">{update.timestamp}</span>
                    </div>
                    <h3 className="text-[13.5px] font-bold text-slate-900 mt-1 leading-snug">
                      {update.title}
                    </h3>
                    <p className="text-[12px] text-slate-500 mt-1 leading-relaxed max-w-3xl">
                      {update.summary}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedUpdate(update)}
                      className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-bold text-[#2c7a4b] hover:text-[#14503f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c7a4b]/40 rounded"
                    >
                      {update.action}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="xl:border-l xl:border-slate-100 xl:pl-6 py-3">
            <span className="text-[11px] uppercase font-bold text-slate-400">Implementation preview</span>
            <h3 className="text-[14px] font-bold text-slate-900 mt-2">
              A single operational signal for every partner
            </h3>
            <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">
              In production, this feed can combine survey milestones, new exchange opportunities, audit reminders, and policy notices from verified data sources.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500">Demo bulletins</span>
                <strong className="text-slate-900">{NETWORK_UPDATES.length}</strong>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500">Actionable items</span>
                <strong className="text-amber-700">2 pending</strong>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-slate-500">Last refresh</span>
                <strong className="text-[#2c7a4b]">Today</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {selectedPartner && (
        <div className="fixed inset-0 z-50 bg-slate-950/35 p-4 flex items-center justify-center" role="presentation">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-dossier-title"
            className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#2c7a4b]">
                  Facility dossier
                </span>
                <h2 id="partner-dossier-title" className="text-[17px] font-bold text-slate-900 mt-1 leading-snug">
                  {selectedPartner.name}
                </h2>
                <p className="text-[12px] text-slate-500 mt-1">{selectedPartner.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                aria-label="Close facility dossier"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c7a4b]/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-5 text-[12px]">
              <div>
                <dt className="font-semibold text-slate-400">Primary waste stream</dt>
                <dd className="mt-1 font-bold text-slate-900">{selectedPartner.wasteType}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-400">Verified output</dt>
                <dd className="mt-1 font-bold text-slate-900">{selectedPartner.volume}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-400">Technical specification</dt>
                <dd className="mt-1 text-slate-700">{selectedPartner.specification}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-400">Verification status</dt>
                <dd className="mt-1 font-bold text-slate-900">{selectedPartner.verificationStatus}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-400">Current disposal</dt>
                <dd className="mt-1 text-slate-700">{selectedPartner.currentDisposal}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-400">Symbion pathway</dt>
                <dd className="mt-1 font-bold text-[#2c7a4b]">{selectedPartner.recommendedSolution}</dd>
              </div>
            </dl>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[12px] font-semibold hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleEditPartner(selectedPartner);
                  setSelectedPartner(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#2c7a4b] text-white text-[12px] font-bold hover:bg-[#23613c]"
              >
                Edit facility
              </button>
            </div>
          </section>
        </div>
      )}

      {selectedUpdate && (
        <div className="fixed inset-0 z-50 bg-slate-950/35 p-4 flex items-center justify-center" role="presentation">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="network-update-title"
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#2c7a4b]">
                  Demo {selectedUpdate.category} Bulletin
                </span>
                <h2 id="network-update-title" className="text-[17px] font-bold text-slate-900 mt-2 leading-snug">
                  {selectedUpdate.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                aria-label="Close update details"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c7a4b]/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[13px] text-slate-600 mt-4 leading-relaxed">
              {selectedUpdate.summary}
            </p>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <span className="text-[11px] text-slate-400">{selectedUpdate.timestamp}</span>
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                className="px-4 py-2 rounded-lg bg-[#2c7a4b] text-white text-[12px] font-bold hover:bg-[#23613c]"
              >
                Mark as read
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
