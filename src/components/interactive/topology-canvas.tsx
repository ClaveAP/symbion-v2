"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { IndustrialCase, ScenarioCalculation } from "@/types/symbion";
import {
  Activity,
  RotateCcw,
  GripHorizontal,
  ShieldCheck,
  AlertTriangle,
  Move,
} from "lucide-react";

interface NodePosition {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface TopologyCanvasProps {
  currentCase: IndustrialCase;
  scenario: ScenarioCalculation;
}

// Function to compute responsive default node coordinates based on container width
function calculateDefaultNodes(
  isJhiri: boolean,
  containerW: number = 1050
): Record<string, NodePosition> {
  const pad = 24; // 24px padding from edges

  if (isJhiri) {
    const leftX = pad;
    const rightX = Math.max(leftX + 280, containerW - 230 - pad);
    const hubX = Math.round((containerW - 250) / 2);

    return {
      muni: { id: "muni", x: leftX, y: 35, w: 220, h: 125 },
      agri: { id: "agri", x: leftX, y: 280, w: 220, h: 130 },
      hub: { id: "hub", x: hubX, y: 135, w: 250, h: 175 },
      cbg: { id: "cbg", x: rightX, y: 35, w: 230, h: 125 },
      fom: { id: "fom", x: rightX, y: 280, w: 230, h: 125 },
    };
  } else {
    const leftX = pad;
    const rightX = Math.max(leftX + 300, containerW - 260 - pad);

    return {
      ntpc: { id: "ntpc", x: leftX, y: 155, w: 260, h: 160 },
      cement: { id: "cement", x: rightX, y: 40, w: 260, h: 130 },
      surplus: { id: "surplus", x: rightX, y: 265, w: 260, h: 145 },
    };
  }
}

export function TopologyCanvas({ currentCase, scenario }: TopologyCanvasProps) {
  const isJhiri = currentCase.id === "jhiri-cbg";
  const [activeFilter, setActiveFilter] = useState<"all" | "feedstock" | "outputs">("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const [nodes, setNodes] = useState<Record<string, NodePosition>>(() =>
    calculateDefaultNodes(isJhiri, 1050)
  );

  // Sync state when case changes or container mounts
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 1050;
    setNodes(calculateDefaultNodes(isJhiri, width));
  }, [isJhiri]);

  const resetPositions = () => {
    const width = containerRef.current?.clientWidth || 1050;
    setNodes(calculateDefaultNodes(isJhiri, width));
  };

  // Dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartPos = useRef<{ mouseX: number; mouseY: number; nodeX: number; nodeY: number }>({
    mouseX: 0,
    mouseY: 0,
    nodeX: 0,
    nodeY: 0,
  });

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    const node = nodes[id];
    if (!node) return;

    setDraggingId(id);
    dragStartPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    };
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingId) return;

      const deltaX = e.clientX - dragStartPos.current.mouseX;
      const deltaY = e.clientY - dragStartPos.current.mouseY;

      setNodes((prev) => {
        const node = prev[draggingId];
        if (!node) return prev;

        // Dynamic boundaries based on actual container dimensions
        const container = containerRef.current;
        const containerW = container ? container.clientWidth : 1100;
        const containerH = container ? container.clientHeight : 460;

        // Allows dragging all the way to 12px from right & bottom edges
        const maxX = Math.max(20, containerW - node.w - 12);
        const maxY = Math.max(20, containerH - node.h - 12);

        const newX = Math.max(12, Math.min(maxX, dragStartPos.current.nodeX + deltaX));
        const newY = Math.max(12, Math.min(maxY, dragStartPos.current.nodeY + deltaY));

        return {
          ...prev,
          [draggingId]: {
            ...node,
            x: newX,
            y: newY,
          },
        };
      });
    },
    [draggingId]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  useEffect(() => {
    if (draggingId) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingId, handlePointerMove, handlePointerUp]);

  // Cubic Bezier path generator connecting source right-edge to target left-edge
  const createPath = (sourceId: string, targetId: string) => {
    const s = nodes[sourceId];
    const t = nodes[targetId];
    if (!s || !t) return { d: "", labelX: 0, labelY: 0 };

    const startX = s.x + s.w;
    const startY = s.y + s.h / 2;
    const endX = t.x;
    const endY = t.y + t.h / 2;

    const dx = Math.abs(endX - startX) * 0.5;
    const cp1x = startX + dx;
    const cp1y = startY;
    const cp2x = endX - dx;
    const cp2y = endY;

    const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    const labelX = (startX + endX) / 2;
    const labelY = (startY + endY) / 2;

    return { d, labelX, labelY };
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-primary">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-bold text-slate-900 leading-none">
                Circular Material & Energy Topology Flow
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                α = {(scenario.alpha * 100).toFixed(0)}% SYNC
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
              <Move className="w-3 h-3 text-slate-400" />
              <span>Interactive network: <strong>Click and drag any node</strong> anywhere to rearrange positions.</span>
            </p>
          </div>
        </div>

        {/* Right Tools & Reset */}
        <div className="flex items-center gap-2">
          {/* Stream Filter Buttons */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-200/70 text-[11px] font-mono font-medium">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === "all"
                  ? "bg-white text-slate-900 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Streams ({isJhiri ? "4" : "2"})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("feedstock")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === "feedstock"
                  ? "bg-white text-slate-900 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Feedstocks
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("outputs")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === "outputs"
                  ? "bg-white text-slate-900 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Products
            </button>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetPositions}
            title="Reset to default balanced positions"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-mono font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[470px] bg-gradient-to-b from-slate-50/60 to-white overflow-hidden select-none touch-none"
      >
        {/* Crisp Technical Grid Texture */}
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none">
          <defs>
            <pattern id="symbion-grid-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#symbion-grid-dots)" />
        </svg>

        {/* Dynamic SVG Stream Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker
              id="arrowhead-green"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1b5e3a" />
            </marker>
            <marker
              id="arrowhead-mint"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker
              id="arrowhead-blue"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
            </marker>
            <marker
              id="arrowhead-red"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
            </marker>
          </defs>

          {isJhiri ? (
            /* JHIRI STREAMS */
            <>
              {/* Stream 1: Muni -> Hub (Solid Baseline Green) */}
              {(activeFilter === "all" || activeFilter === "feedstock") && (() => {
                const p = createPath("muni", "hub");
                return (
                  <g>
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#1b5e3a"
                      strokeWidth="3.5"
                      markerEnd="url(#arrowhead-green)"
                    />
                    {/* Stream Pill Badge */}
                    <g transform={`translate(${p.labelX - 75}, ${p.labelY - 14})`}>
                      <rect width="150" height="26" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="75" y="17" fill="#0f172a" fontSize="11" className="font-mono font-bold" textAnchor="middle">
                        Baseline: 80.0 t/d
                      </text>
                    </g>
                  </g>
                );
              })()}

              {/* Stream 2: Agri -> Hub (Pulsing Additional Supply Mint) */}
              {(activeFilter === "all" || activeFilter === "feedstock") && (() => {
                const p = createPath("agri", "hub");
                return (
                  <g>
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      className="animate-flow"
                      markerEnd="url(#arrowhead-mint)"
                    />
                    <g transform={`translate(${p.labelX - 85}, ${p.labelY - 14})`}>
                      <rect width="170" height="26" rx="6" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
                      <text x="85" y="17" fill="#065f46" fontSize="11" className="font-mono font-extrabold" textAnchor="middle">
                        +ΔS: {scenario.additionalSupplyPerDay} t/d ({(scenario.alpha * 100).toFixed(0)}%)
                      </text>
                    </g>
                  </g>
                );
              })()}

              {/* Stream 3: Hub -> CBG Fuel (Solid Cobalt Blue) */}
              {(activeFilter === "all" || activeFilter === "outputs") && (() => {
                const p = createPath("hub", "cbg");
                return (
                  <g>
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                      markerEnd="url(#arrowhead-blue)"
                    />
                    <g transform={`translate(${p.labelX - 70}, ${p.labelY - 14})`}>
                      <rect width="140" height="26" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                      <text x="70" y="17" fill="#1d4ed8" fontSize="11" className="font-mono font-bold" textAnchor="middle">
                        CBG: {scenario.cbgProductionTonsYear} t/yr
                      </text>
                    </g>
                  </g>
                );
              })()}

              {/* Stream 4: Hub -> FOM Manure (Solid Emerald Green) */}
              {(activeFilter === "all" || activeFilter === "outputs") && (() => {
                const p = createPath("hub", "fom");
                return (
                  <g>
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="3.5"
                      markerEnd="url(#arrowhead-green)"
                    />
                    <g transform={`translate(${p.labelX - 75}, ${p.labelY - 14})`}>
                      <rect width="150" height="26" rx="6" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
                      <text x="75" y="17" fill="#15803d" fontSize="11" className="font-mono font-bold" textAnchor="middle">
                        FOM: {scenario.fomProductionTonsYear} t/yr
                      </text>
                    </g>
                  </g>
                );
              })()}
            </>
          ) : (
            /* GADARWARA STREAMS */
            <>
              {/* Stream A: NTPC -> Cement (Active Utilized 37.64%) */}
              {(() => {
                const p = createPath("ntpc", "cement");
                return (
                  <g>
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="4"
                      markerEnd="url(#arrowhead-blue)"
                    />
                    <g transform={`translate(${p.labelX - 95}, ${p.labelY - 14})`}>
                      <rect width="190" height="26" rx="6" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" />
                      <text x="95" y="17" fill="#0369a1" fontSize="11" className="font-mono font-bold" textAnchor="middle">
                        Utilized: 634.3k t/yr (38%)
                      </text>
                    </g>
                  </g>
                );
              })()}

              {/* Stream B: NTPC -> Surplus Balance (Unutilized Red Dash) */}
              {(() => {
                const p = createPath("ntpc", "surplus");
                return (
                  <g>
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="4"
                      strokeDasharray="6 4"
                      className="animate-flow"
                      markerEnd="url(#arrowhead-red)"
                    />
                    <g transform={`translate(${p.labelX - 105}, ${p.labelY - 14})`}>
                      <rect width="210" height="26" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
                      <text x="105" y="17" fill="#b91c1c" fontSize="11" className="font-mono font-extrabold" textAnchor="middle">
                        Unutilized: 1.05M t/yr (62%)
                      </text>
                    </g>
                  </g>
                );
              })()}
            </>
          )}
        </svg>

        {/* DRAGGABLE CARDS (HTML DOM) */}
        {isJhiri ? (
          <>
            {/* NODE 1: Municipal Waste */}
            <div
              style={{
                transform: `translate3d(${nodes.muni?.x ?? 24}px, ${nodes.muni?.y ?? 35}px, 0)`,
                width: nodes.muni?.w ?? 220,
              }}
              onPointerDown={(e) => handlePointerDown("muni", e)}
              className={`absolute top-0 left-0 p-3.5 rounded-xl border bg-white shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 ${
                draggingId === "muni" ? "shadow-lg ring-2 ring-primary/40 border-primary" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 flex items-center gap-1">
                  <GripHorizontal className="w-3 h-3 text-slate-400" />
                  Feedstock Node 01
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <h5 className="text-[13px] font-bold text-slate-900 leading-tight">
                Municipal Wet Waste
              </h5>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">Ranchi Urban Core Collection</p>
              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11.5px] font-mono">
                <span className="text-slate-500">Initial Supply:</span>
                <span className="font-bold text-slate-900">80.0 t/d</span>
              </div>
            </div>

            {/* NODE 2: Agri Mandi Waste */}
            <div
              style={{
                transform: `translate3d(${nodes.agri?.x ?? 24}px, ${nodes.agri?.y ?? 280}px, 0)`,
                width: nodes.agri?.w ?? 220,
              }}
              onPointerDown={(e) => handlePointerDown("agri", e)}
              className={`absolute top-0 left-0 p-3.5 rounded-xl border bg-emerald-50/50 shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 ${
                draggingId === "agri" ? "shadow-lg ring-2 ring-emerald-500/40 border-emerald-500" : "border-emerald-300 hover:border-emerald-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 flex items-center gap-1">
                  <GripHorizontal className="w-3 h-3 text-emerald-600" />
                  Gap Recovery Node
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              </div>
              <h5 className="text-[13px] font-bold text-emerald-950 leading-tight">
                Agri-Wholesale Mandi Waste
              </h5>
              <p className="text-[11px] font-mono text-emerald-700 mt-0.5">Secondary Organic Streams</p>
              <div className="mt-2 pt-1.5 border-t border-emerald-200 flex items-center justify-between text-[11.5px] font-mono">
                <span className="text-emerald-800">Additional Inflow:</span>
                <span className="font-bold text-emerald-900">+{scenario.additionalSupplyPerDay} t/d</span>
              </div>
            </div>

            {/* NODE 3: Central CBG Hub */}
            <div
              style={{
                transform: `translate3d(${nodes.hub?.x ?? 370}px, ${nodes.hub?.y ?? 135}px, 0)`,
                width: nodes.hub?.w ?? 250,
              }}
              onPointerDown={(e) => handlePointerDown("hub", e)}
              className={`absolute top-0 left-0 p-4 rounded-xl border-2 bg-white shadow-md transition-shadow cursor-grab active:cursor-grabbing z-30 ${
                draggingId === "hub" ? "shadow-xl ring-2 ring-primary/40 border-primary" : "border-primary/40 hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-primary-light text-primary flex items-center gap-1">
                  <GripHorizontal className="w-3 h-3" />
                  CENTRAL HUB
                </span>
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-[14px] font-bold text-slate-900 leading-snug">
                GAIL CBG Facility, Jhiri
              </h4>
              <p className="text-[11px] font-mono text-slate-500">CSTR Anaerobic Digestion</p>

              <div className="mt-2.5 space-y-1 pt-2 border-t border-slate-100 text-[11.5px] font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Design Capacity:</span>
                  <span className="font-bold text-slate-900">150.0 t/d</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Active Intake:</span>
                  <span className="font-bold text-primary">{scenario.totalInputPerDay} t/d</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-dashed border-slate-200">
                  <span className="text-slate-500">Utilization:</span>
                  <span className="font-bold text-emerald-700">{scenario.utilizationPct}%</span>
                </div>
                {scenario.gapRemainingPerDay > 0 && (
                  <div className="flex items-center justify-between text-amber-700 font-semibold pt-0.5">
                    <span>Gap Remaining:</span>
                    <span>{scenario.gapRemainingPerDay} t/d</span>
                  </div>
                )}
              </div>
            </div>

            {/* NODE 4: CBG Sink */}
            <div
              style={{
                transform: `translate3d(${nodes.cbg?.x ?? 740}px, ${nodes.cbg?.y ?? 35}px, 0)`,
                width: nodes.cbg?.w ?? 230,
              }}
              onPointerDown={(e) => handlePointerDown("cbg", e)}
              className={`absolute top-0 left-0 p-3.5 rounded-xl border bg-white shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 ${
                draggingId === "cbg" ? "shadow-lg ring-2 ring-blue-500/40 border-blue-400" : "border-blue-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-mono font-bold text-blue-700 flex items-center gap-1">
                  <GripHorizontal className="w-3 h-3 text-blue-400" />
                  Product Sink 01
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
              <h5 className="text-[13px] font-bold text-slate-900 leading-tight">
                CNG Grid & Transport Fuel
              </h5>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">Displacing Fossil Natural Gas</p>
              <div className="mt-2 pt-1.5 border-t border-blue-100 flex items-center justify-between text-[11.5px] font-mono">
                <span className="text-slate-500">Annual Yield:</span>
                <span className="font-bold text-blue-700">{scenario.cbgProductionTonsYear} t/yr</span>
              </div>
            </div>

            {/* NODE 5: FOM Sink */}
            <div
              style={{
                transform: `translate3d(${nodes.fom?.x ?? 740}px, ${nodes.fom?.y ?? 280}px, 0)`,
                width: nodes.fom?.w ?? 230,
              }}
              onPointerDown={(e) => handlePointerDown("fom", e)}
              className={`absolute top-0 left-0 p-3.5 rounded-xl border bg-white shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 ${
                draggingId === "fom" ? "shadow-lg ring-2 ring-emerald-500/40 border-emerald-400" : "border-emerald-200 hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-700 flex items-center gap-1">
                  <GripHorizontal className="w-3 h-3 text-emerald-400" />
                  Product Sink 02
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
              <h5 className="text-[13px] font-bold text-slate-900 leading-tight">
                Bio-Fertilizer (FOM) Sink
              </h5>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">Regional Organic Farming Soil</p>
              <div className="mt-2 pt-1.5 border-t border-emerald-100 flex items-center justify-between text-[11.5px] font-mono">
                <span className="text-slate-500">Annual Yield:</span>
                <span className="font-bold text-emerald-700">{scenario.fomProductionTonsYear} t/yr</span>
              </div>
            </div>
          </>
        ) : (
          /* GADARWARA DRAGGABLE NODES */
          <>
            {/* NTPC Generation Node */}
            <div
              style={{
                transform: `translate3d(${nodes.ntpc?.x ?? 24}px, ${nodes.ntpc?.y ?? 155}px, 0)`,
                width: nodes.ntpc?.w ?? 260,
              }}
              onPointerDown={(e) => handlePointerDown("ntpc", e)}
              className={`absolute top-0 left-0 p-4 rounded-xl border-2 bg-white shadow-md cursor-grab active:cursor-grabbing z-30 ${
                draggingId === "ntpc" ? "shadow-xl ring-2 ring-slate-400 border-slate-700" : "border-slate-300 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                  <GripHorizontal className="w-3 h-3" />
                  SURPLUS EMITTER
                </span>
              </div>
              <h4 className="text-[14px] font-bold text-slate-900 mt-1 leading-snug">
                NTPC Gadarwara STPS
              </h4>
              <p className="text-[11px] font-mono text-slate-500">Ultra-Supercritical Coal Station</p>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[12px] font-mono flex items-center justify-between">
                <span className="text-slate-500">Total Generation:</span>
                <span className="font-bold text-slate-900">1,685,000 t/yr</span>
              </div>
            </div>

            {/* Cement Node */}
            <div
              style={{
                transform: `translate3d(${nodes.cement?.x ?? 690}px, ${nodes.cement?.y ?? 40}px, 0)`,
                width: nodes.cement?.w ?? 260,
              }}
              onPointerDown={(e) => handlePointerDown("cement", e)}
              className={`absolute top-0 left-0 p-3.5 rounded-xl border bg-white shadow-xs cursor-grab active:cursor-grabbing z-20 ${
                draggingId === "cement" ? "shadow-lg ring-2 ring-sky-400 border-sky-400" : "border-sky-300 hover:border-sky-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-mono font-bold text-sky-700 flex items-center gap-1">
                  <GripHorizontal className="w-3 h-3" />
                  ACTIVE UTILIZATION (38%)
                </span>
              </div>
              <h5 className="text-[13px] font-bold text-slate-900 mt-0.5">
                PPC Cement & Brick Industry
              </h5>
              <div className="mt-2.5 pt-1.5 border-t border-sky-100 text-[11.5px] font-mono flex justify-between">
                <span className="text-slate-500">Absorbed Volume:</span>
                <span className="font-bold text-sky-800">634,300 t/yr</span>
              </div>
            </div>

            {/* Surplus Risk Node */}
            <div
              style={{
                transform: `translate3d(${nodes.surplus?.x ?? 690}px, ${nodes.surplus?.y ?? 265}px, 0)`,
                width: nodes.surplus?.w ?? 260,
              }}
              onPointerDown={(e) => handlePointerDown("surplus", e)}
              className={`absolute top-0 left-0 p-3.5 rounded-xl border bg-white shadow-xs cursor-grab active:cursor-grabbing z-20 ${
                draggingId === "surplus" ? "shadow-lg ring-2 ring-rose-400 border-rose-400" : "border-rose-300 hover:border-rose-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1 text-rose-700 font-mono text-[10px] font-bold">
                  <GripHorizontal className="w-3 h-3" />
                  <span>UNUTILIZED SURPLUS (62%)</span>
                </div>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              </div>
              <h5 className="text-[13px] font-bold text-rose-950 mt-0.5">
                Ash Pond Overflow Risk
              </h5>
              <div className="mt-2.5 pt-1.5 border-t border-rose-100 text-[11.5px] font-mono flex justify-between">
                <span className="text-rose-800">Surplus Balance:</span>
                <span className="font-bold text-rose-900">1,050,700 t/yr</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-between px-5 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] font-mono text-slate-600 gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-primary rounded-full" />
            <span>Baseline Supply</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-400 rounded-full" />
            <span>Recovered Gap Inflow (α)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-blue-600 rounded-full" />
            <span>Clean Energy Conversion</span>
          </div>
        </div>
        <div className="font-semibold text-slate-800">
          Engine: Symbion Technical Evaluation Model R9.4
        </div>
      </div>
    </div>
  );
}
