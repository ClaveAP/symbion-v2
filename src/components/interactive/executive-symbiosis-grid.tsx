"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useSymbion } from "@/context/symbion-context";
import { formatCurrency } from "@/lib/currency";
import {
  Network,
  AlertTriangle,
  ArrowDown,
  RefreshCw,
  Rocket,
  ArrowRight,
  RotateCcw,
  GripHorizontal,
  Move,
} from "lucide-react";

interface NodePosition {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const calculateDefaultNodes = (width: number): Record<string, NodePosition> => {
  // Ensure we compute based on at least 500px so cards and flow badges have adequate spacing
  const effectiveW = Math.max(width, 500);
  const isCompact = effectiveW < 560;
  const cardW = isCompact ? 155 : 175;
  const leftX = 14;
  const rightX = effectiveW - cardW - 14;

  return {
    municipal: { id: "municipal", x: leftX, y: 16, w: cardW, h: 78 },
    mandi: { id: "mandi", x: leftX, y: 136, w: cardW, h: 74 },
    biomass: { id: "biomass", x: leftX, y: 254, w: cardW, h: 74 },
    cbgPlant: { id: "cbgPlant", x: rightX, y: 16, w: cardW, h: 80 },
    cgd: { id: "cgd", x: rightX, y: 136, w: cardW, h: 76 },
    fom: { id: "fom", x: rightX, y: 254, w: cardW, h: 74 },
  };
};

export function ExecutiveSymbiosisGrid() {
  const { currency, scenario, currentCase } = useSymbion();
  const [activeStreamTab, setActiveStreamTab] = useState<"all" | "material" | "energy">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Record<string, NodePosition>>(() => calculateDefaultNodes(520));

  const scrollToSide = (side: "left" | "right") => {
    const el = scrollWrapperRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: side === "left" ? 0 : maxScroll, behavior: "smooth" });
  };

  // Initialize and track container width
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = Math.max(containerRef.current.clientWidth, 500);
        setNodes(calculateDefaultNodes(w));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const resetPositions = () => {
    const w = Math.max(containerRef.current?.clientWidth || 520, 500);
    setNodes(calculateDefaultNodes(w));
    showToast("Network topology reset to balanced alignment.");
  };

  // Draggable state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartPos = useRef<{ mouseX: number; mouseY: number; nodeX: number; nodeY: number }>({
    mouseX: 0,
    mouseY: 0,
    nodeX: 0,
    nodeY: 0,
  });

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const node = nodes[id];
    if (!node) return;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Safe fallback
    }

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

        const container = containerRef.current;
        const containerW = container ? Math.max(container.clientWidth, 500) : 520;
        const containerH = container ? container.clientHeight : 370;

        const maxX = Math.max(10, containerW - node.w - 10);
        const maxY = Math.max(10, containerH - node.h - 10);

        const newX = Math.max(10, Math.min(maxX, dragStartPos.current.nodeX + deltaX));
        const newY = Math.max(10, Math.min(maxY, dragStartPos.current.nodeY + deltaY));

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
      window.addEventListener("pointercancel", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [draggingId, handlePointerMove, handlePointerUp]);

  // Background desktop drag-to-scroll
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, scrollLeft: 0 });

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-draggable-node]")) return;
    isPanningRef.current = true;
    panStartRef.current = {
      x: e.clientX,
      scrollLeft: scrollWrapperRef.current?.scrollLeft || 0,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanningRef.current || !scrollWrapperRef.current) return;
      const deltaX = e.clientX - panStartRef.current.x;
      scrollWrapperRef.current.scrollLeft = panStartRef.current.scrollLeft - deltaX;
    };

    const handleMouseUp = () => {
      isPanningRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Cubic Bezier path generator connecting source card to target card
  const createPath = (sourceId: string, targetId: string) => {
    const s = nodes[sourceId];
    const t = nodes[targetId];
    if (!s || !t) return { d: "", labelX: 0, labelY: 0 };

    const isTargetRight = t.x + t.w / 2 >= s.x + s.w / 2;

    const startX = isTargetRight ? s.x + s.w : s.x;
    const startY = s.y + s.h / 2;
    const endX = isTargetRight ? t.x : t.x + t.w;
    const endY = t.y + t.h / 2;

    const dx = Math.max(25, Math.abs(endX - startX) * 0.45);
    const cp1x = isTargetRight ? startX + dx : startX - dx;
    const cp1y = startY;
    const cp2x = isTargetRight ? endX - dx : endX + dx;
    const cp2y = endY;

    const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    const labelX = (startX + endX) / 2;
    const labelY = (startY + endY) / 2;

    return { d, labelX, labelY };
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApplyCooperation = () => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2c7a4b", "#89d7a0", "#14503f"],
      });
    }
    showToast("Partnership agreement submitted to Ranchi Municipal & GAIL authority!");
  };

  const formattedGrossValue = formatCurrency(
    scenario.grossValue[currency],
    currency,
    true
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14503f] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-[12.5px] border border-emerald-500/40 animate-slideUp">
          <Rocket className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT COLUMN (6 COLS): MATERIAL FLOW & SYMBIOSIS TOPOLOGY PREVIEW */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden">
        {/* Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 bg-slate-50/80 border-b border-slate-200 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Network className="w-4 h-4 text-[#2c7a4b] shrink-0" />
            <h3 className="text-[13px] sm:text-[14px] font-bold text-slate-900 tracking-tight truncate">
              Material Flow & Distribution Network
            </h3>
            <span className="text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold shrink-0">
              {currentCase.location.split(",")[0]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
            {/* Mobile swipe hint */}
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 sm:hidden">
              <Move className="w-3 h-3" />
              Swipe ↔
            </span>
            {/* Desktop Draggable Hint */}
            <span className="text-[10.5px] text-slate-400 font-mono hidden xl:flex items-center gap-1">
              <Move className="w-3 h-3" />
              Drag nodes
            </span>

            {/* Filter Tabs */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-200/80 p-0.5 rounded-lg text-[10px] sm:text-[10.5px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveStreamTab("all")}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all cursor-pointer ${
                  activeStreamTab === "all"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveStreamTab("material")}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all cursor-pointer ${
                  activeStreamTab === "material"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Material (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveStreamTab("energy")}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all cursor-pointer ${
                  activeStreamTab === "energy"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Energy (2)
              </button>
            </div>

            {/* Mobile Quick Jump / Swipe Navigation */}
            <div className="flex sm:hidden items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-[9.5px] font-mono font-bold">
              <button
                type="button"
                onClick={() => scrollToSide("left")}
                className="px-1.5 py-0.5 rounded bg-white text-slate-700 shadow-xs border border-slate-200 cursor-pointer hover:text-slate-900"
              >
                Inputs
              </button>
              <button
                type="button"
                onClick={() => scrollToSide("right")}
                className="px-1.5 py-0.5 rounded bg-white text-slate-700 shadow-xs border border-slate-200 cursor-pointer hover:text-slate-900"
              >
                Off-takers
              </button>
            </div>

            {/* Reset Positions Button */}
            <button
              type="button"
              onClick={resetPositions}
              title="Reset node positions to default layout"
              className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[10px] sm:text-[10.5px] font-mono font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Clean Docked Opportunity Alert Banner */}
        <div className="mx-3 sm:mx-4 mt-2.5 sm:mt-3 p-2 sm:p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-[11.5px] gap-1.5 sm:gap-2">
          <div className="flex items-start sm:items-center gap-2 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>70.0 t/d Wet Waste Deficit</strong> (53.33% utilization) → Solution: <strong>Mandi Organic Waste Integration</strong>
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[9.5px] sm:text-[10px] font-mono font-bold shrink-0 self-end sm:self-auto">
            GAP CLOSURE
          </span>
        </div>

        {/* Responsive Canvas Viewport with Horizontal Touch Panning */}
        <div
          ref={scrollWrapperRef}
          className="relative w-full overflow-x-auto overflow-y-hidden touch-pan-x scroll-smooth select-none cursor-default"
        >
          <div
            ref={containerRef}
            onMouseDown={handleCanvasMouseDown}
            className="relative min-w-[500px] sm:min-w-0 w-full h-[370px] bg-[#f8fafc] overflow-hidden select-none touch-pan-x"
          >
          {/* Engineering Dot Grid Background */}
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none">
            <defs>
              <pattern id="symb-grid-exec" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.75" fill="#cbd5e1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#symb-grid-exec)" />
          </svg>

          {/* Dynamic SVG Stream Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <marker
                id="marker-arrow-green"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2c7a4b" />
              </marker>
              <marker
                id="marker-arrow-amber"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
              </marker>
              <marker
                id="marker-arrow-sky"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
              </marker>
            </defs>

            {/* Stream 1: Municipal Baseline (municipal -> cbgPlant) */}
            {(activeStreamTab === "all" || activeStreamTab === "material") && (() => {
              const p = createPath("municipal", "cbgPlant");
              return (
                <g key="stream-1">
                  <path
                    d={p.d}
                    fill="none"
                    stroke="#2c7a4b"
                    strokeWidth="2.5"
                    className="animate-pulse"
                    markerEnd="url(#marker-arrow-green)"
                  />
                  <g transform={`translate(${p.labelX - 52}, ${p.labelY - 11})`}>
                    <rect
                      width="104"
                      height="22"
                      rx="5"
                      fill="#f0fdf4"
                      stroke="#86efac"
                      strokeWidth="1"
                    />
                    <text
                      x="52"
                      y="14"
                      fill="#166534"
                      fontSize="9.5"
                      className="font-mono font-bold"
                      textAnchor="middle"
                    >
                      Baseline: 80 t/d
                    </text>
                  </g>
                </g>
              );
            })()}

            {/* Stream 2: Mandi Organic Waste (mandi -> cbgPlant) */}
            {(activeStreamTab === "all" || activeStreamTab === "material") && (() => {
              const p = createPath("mandi", "cbgPlant");
              return (
                <g key="stream-2">
                  <path
                    d={p.d}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                    className="animate-pulse"
                    markerEnd="url(#marker-arrow-amber)"
                  />
                  <g transform={`translate(${p.labelX - 58}, ${p.labelY - 11})`}>
                    <rect
                      width="116"
                      height="22"
                      rx="5"
                      fill="#fffbeb"
                      stroke="#fcd34d"
                      strokeWidth="1"
                    />
                    <text
                      x="58"
                      y="14"
                      fill="#b45309"
                      fontSize="9.5"
                      className="font-mono font-bold"
                      textAnchor="middle"
                    >
                      +52.5 t/d (Mandi)
                    </text>
                  </g>
                </g>
              );
            })()}

            {/* Stream 3: Crop Residue / Straw (biomass -> cbgPlant) */}
            {(activeStreamTab === "all" || activeStreamTab === "material") && (() => {
              const p = createPath("biomass", "cbgPlant");
              return (
                <g key="stream-3">
                  <path
                    d={p.d}
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2"
                    markerEnd="url(#marker-arrow-green)"
                  />
                  <g transform={`translate(${p.labelX - 52}, ${p.labelY - 11})`}>
                    <rect
                      width="104"
                      height="22"
                      rx="5"
                      fill="#f0fdfa"
                      stroke="#99f6e4"
                      strokeWidth="1"
                    />
                    <text
                      x="52"
                      y="14"
                      fill="#0f766e"
                      fontSize="9.5"
                      className="font-mono font-semibold"
                      textAnchor="middle"
                    >
                      Straw 15 t/d
                    </text>
                  </g>
                </g>
              );
            })()}

            {/* Stream 4: Compressed Biogas Fuel (cbgPlant -> cgd) */}
            {(activeStreamTab === "all" || activeStreamTab === "energy") && (() => {
              const p = createPath("cbgPlant", "cgd");
              return (
                <g key="stream-4">
                  <path
                    d={p.d}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    markerEnd="url(#marker-arrow-sky)"
                  />
                  <g transform={`translate(${p.labelX - 55}, ${p.labelY - 11})`}>
                    <rect
                      width="110"
                      height="22"
                      rx="5"
                      fill="#f0f9ff"
                      stroke="#bae6fd"
                      strokeWidth="1"
                    />
                    <text
                      x="55"
                      y="14"
                      fill="#0369a1"
                      fontSize="9.5"
                      className="font-mono font-bold"
                      textAnchor="middle"
                    >
                      1,650 t/yr CBG
                    </text>
                  </g>
                </g>
              );
            })()}

            {/* Stream 5: Fermented Organic Manure (cbgPlant -> fom) */}
            {(activeStreamTab === "all" || activeStreamTab === "material") && (() => {
              const p = createPath("cbgPlant", "fom");
              return (
                <g key="stream-5">
                  <path
                    d={p.d}
                    fill="none"
                    stroke="#2c7a4b"
                    strokeWidth="2"
                    markerEnd="url(#marker-arrow-green)"
                  />
                  <g transform={`translate(${p.labelX - 55}, ${p.labelY - 11})`}>
                    <rect
                      width="110"
                      height="22"
                      rx="5"
                      fill="#f0fdf4"
                      stroke="#bbf7d0"
                      strokeWidth="1"
                    />
                    <text
                      x="55"
                      y="14"
                      fill="#15803d"
                      fontSize="9.5"
                      className="font-mono font-semibold"
                      textAnchor="middle"
                    >
                      8,250 t/yr FOM
                    </text>
                  </g>
                </g>
              );
            })()}
          </svg>

          {/* DRAGGABLE NODE CARDS (HTML DOM) */}
          {/* Node 1: Ranchi Municipal Core (Top Left) */}
          <div
            data-draggable-node="true"
            style={{
              transform: `translate3d(${nodes.municipal?.x ?? 14}px, ${nodes.municipal?.y ?? 16}px, 0)`,
              width: nodes.municipal?.w ?? 175,
            }}
            onPointerDown={(e) => handlePointerDown("municipal", e)}
            className={`absolute top-0 left-0 bg-white rounded-xl border p-2.5 shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 touch-none select-none ${
              draggingId === "municipal"
                ? "shadow-xl ring-2 ring-[#2c7a4b]/50 border-[#2c7a4b] scale-[1.02]"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase font-bold text-[#2c7a4b] font-mono flex items-center gap-1">
                <GripHorizontal className="w-3 h-3 text-slate-400" />
                BASELINE INPUT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2c7a4b]" />
            </div>
            <div className="text-[12px] font-bold text-slate-900 leading-tight">
              Ranchi Municipal Core
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[9.5px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-bold border border-emerald-200 font-mono">
              <span>Wet Waste</span>
              <span>80 t/day</span>
            </div>
          </div>

          {/* Node 2: Pandra Wholesale Mandi (Middle Left) */}
          <div
            data-draggable-node="true"
            style={{
              transform: `translate3d(${nodes.mandi?.x ?? 14}px, ${nodes.mandi?.y ?? 136}px, 0)`,
              width: nodes.mandi?.w ?? 175,
            }}
            onPointerDown={(e) => handlePointerDown("mandi", e)}
            className={`absolute top-0 left-0 bg-white rounded-xl border p-2 shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 touch-none select-none ${
              draggingId === "mandi"
                ? "shadow-xl ring-2 ring-amber-500/50 border-amber-500 scale-[1.02]"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase font-bold text-amber-700 font-mono flex items-center gap-1">
                <GripHorizontal className="w-3 h-3 text-slate-400" />
                SECONDARY SINK
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <div className="text-[11.5px] font-bold text-slate-900 leading-tight">
              Pandra Wholesale Mandi
            </div>
            <div className="mt-1 flex items-center justify-between text-[9.5px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded font-semibold border border-amber-200 font-mono">
              <span>Agri Residue</span>
              <span>+52.5 t/day</span>
            </div>
          </div>

          {/* Node 3: Regional Agro Units (Bottom Left) */}
          <div
            data-draggable-node="true"
            style={{
              transform: `translate3d(${nodes.biomass?.x ?? 14}px, ${nodes.biomass?.y ?? 254}px, 0)`,
              width: nodes.biomass?.w ?? 175,
            }}
            onPointerDown={(e) => handlePointerDown("biomass", e)}
            className={`absolute top-0 left-0 bg-white rounded-xl border p-2 shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 touch-none select-none ${
              draggingId === "biomass"
                ? "shadow-xl ring-2 ring-teal-500/50 border-teal-500 scale-[1.02]"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase font-bold text-teal-700 font-mono flex items-center gap-1">
                <GripHorizontal className="w-3 h-3 text-slate-400" />
                CO-FEEDSTOCK
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            </div>
            <div className="text-[11.5px] font-bold text-slate-900 leading-tight">
              Agro Biomass Sinks
            </div>
            <div className="mt-1 flex items-center justify-between text-[9.5px] bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded font-semibold border border-teal-200 font-mono">
              <span>Crop Straw</span>
              <span>15 t/day</span>
            </div>
          </div>

          {/* Node 4: GAIL CBG Plant, Jhiri (Top Right) */}
          <div
            data-draggable-node="true"
            style={{
              transform: `translate3d(${nodes.cbgPlant?.x ?? 320}px, ${nodes.cbgPlant?.y ?? 16}px, 0)`,
              width: nodes.cbgPlant?.w ?? 175,
            }}
            onPointerDown={(e) => handlePointerDown("cbgPlant", e)}
            className={`absolute top-0 left-0 bg-emerald-50/90 rounded-xl border p-2.5 shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 touch-none select-none ${
              draggingId === "cbgPlant"
                ? "shadow-xl ring-2 ring-[#2c7a4b]/50 border-[#2c7a4b] scale-[1.02]"
                : "border-emerald-300 hover:border-emerald-400"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase font-bold text-[#2c7a4b] font-mono flex items-center gap-1">
                <GripHorizontal className="w-3 h-3 text-[#2c7a4b]" />
                BIOMETHANE HUB
              </span>
              <span className="px-1 py-0.2 rounded bg-emerald-200 text-emerald-800 text-[8.5px] font-bold font-mono">
                ANCHOR
              </span>
            </div>
            <div className="text-[12px] font-bold text-slate-900 leading-tight">
              GAIL Jhiri CBG Plant
            </div>
            <div className="mt-1 flex items-center justify-between text-[9px] bg-white text-[#2c7a4b] px-1.5 py-0.5 rounded font-bold border border-emerald-200 font-mono">
              <span>CSTR Digester</span>
              <span>150 t/day</span>
            </div>
          </div>

          {/* Node 5: City Gas Distribution Grid (Middle Right) */}
          <div
            data-draggable-node="true"
            style={{
              transform: `translate3d(${nodes.cgd?.x ?? 320}px, ${nodes.cgd?.y ?? 136}px, 0)`,
              width: nodes.cgd?.w ?? 175,
            }}
            onPointerDown={(e) => handlePointerDown("cgd", e)}
            className={`absolute top-0 left-0 bg-white rounded-xl border p-2 shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 touch-none select-none ${
              draggingId === "cgd"
                ? "shadow-xl ring-2 ring-sky-500/50 border-sky-500 scale-[1.02]"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase font-bold text-sky-700 font-mono flex items-center gap-1">
                <GripHorizontal className="w-3 h-3 text-slate-400" />
                ENERGY OFF-TAKER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            </div>
            <div className="text-[11.5px] font-bold text-slate-900 leading-tight">
              City Gas Distribution (CGD)
            </div>
            <div className="mt-1 flex items-center justify-between text-[9.5px] bg-sky-50 text-sky-800 px-1.5 py-0.5 rounded font-semibold border border-sky-200 font-mono">
              <span>CBG Vehicle Fuel</span>
              <span>1,650 t/yr</span>
            </div>
          </div>

          {/* Node 6: Jharkhand Organic Farmers FPO (Bottom Right) */}
          <div
            data-draggable-node="true"
            style={{
              transform: `translate3d(${nodes.fom?.x ?? 320}px, ${nodes.fom?.y ?? 254}px, 0)`,
              width: nodes.fom?.w ?? 175,
            }}
            onPointerDown={(e) => handlePointerDown("fom", e)}
            className={`absolute top-0 left-0 bg-white rounded-xl border p-2 shadow-xs transition-shadow cursor-grab active:cursor-grabbing z-20 touch-none select-none ${
              draggingId === "fom"
                ? "shadow-xl ring-2 ring-emerald-500/50 border-emerald-500 scale-[1.02]"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase font-bold text-emerald-800 font-mono flex items-center gap-1">
                <GripHorizontal className="w-3 h-3 text-slate-400" />
                BIO-FERTILIZER SINK
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            </div>
            <div className="text-[11.5px] font-bold text-slate-900 leading-tight">
              Organic Farmers FPO
            </div>
            <div className="mt-1 flex items-center justify-between text-[9.5px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-semibold border border-emerald-200 font-mono">
              <span>FOM Manure</span>
              <span>8,250 t/yr</span>
            </div>
          </div>
        </div>
        </div>

        {/* Stream Legend & Link Bar */}
        <div className="px-3.5 sm:px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[10.5px] sm:text-[11px] font-mono">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2c7a4b]" />
              <span className="text-slate-600">Organic Waste (132.5 t/d)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span className="text-slate-600">CBG Fuel (1,650 t/yr)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-600">FOM Bio-Fertilizer (8,250 t/yr)</span>
            </div>
          </div>

          <Link
            href="/topology"
            className="flex items-center gap-1 text-[#2c7a4b] hover:text-[#1e5835] font-bold font-sans transition-colors group self-end sm:self-auto shrink-0"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* RIGHT COLUMN (6 COLS): CANDIDATE FACILITY BLUEPRINT */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4">
        <div>
          {/* Header */}
          <div className="pb-2.5 border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
              <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#2c7a4b] text-white text-[9.5px] sm:text-[10px] font-bold font-mono tracking-wide uppercase">
                ECOSYSTEM INTERVENTION BLUEPRINT
              </span>
              <span className="text-[10.5px] sm:text-[11px] text-[#2c7a4b] font-bold">
                Capacity Gap Closure
              </span>
            </div>
            <h3 className="text-[15px] sm:text-[16px] text-slate-900 font-bold mt-1 leading-snug">
              Facility Plan: GAIL Jhiri Continuous Biogas CSTR Digester
            </h3>
            <p className="text-[11px] sm:text-[11.5px] text-slate-500 mt-0.5 leading-snug">
              Ex-ante optimization to bridge the 70.0 t/d input gap, lifting plant utilization from 53.33% to 88.33%.
            </p>
          </div>

          {/* Feedstock Safety Buffer Meter */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 mt-3">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-[11px] sm:text-[11.5px] font-bold text-slate-800">
                Design Capacity Utilization
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#2c7a4b] text-[10px] sm:text-[10.5px] font-bold font-mono">
                88.33% Restored (+65.6% Gain)
              </span>
            </div>

            <div className="flex flex-wrap justify-between text-[10px] sm:text-[10.5px] text-slate-600 gap-1">
              <span>Baseline: <strong className="text-slate-900">80.0 t/d (53.33%)</strong></span>
              <span>With Mandi Waste: <strong className="text-[#2c7a4b] font-bold">132.5 t/d (88.33%)</strong></span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 rounded-full relative overflow-hidden flex items-center">
              <div className="h-full bg-[#2c7a4b] rounded-full" style={{ width: "88.33%" }} />
              <div className="absolute left-[53.33%] top-0 bottom-0 w-0.5 bg-amber-500 z-10" />
            </div>

            <div className="flex justify-between text-[8.5px] sm:text-[9.5px] font-mono text-slate-400 gap-1">
              <span>0 t/d</span>
              <span className="text-amber-600 font-bold">↑ Baseline 80 t/d</span>
              <span className="text-[#2c7a4b] font-bold">132.5 t/d (α = 75%)</span>
              <span>150 t/d Max</span>
            </div>
          </div>

          {/* 4-Step Valorization Waterfall Flow */}
          <div className="space-y-1.5 mt-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
              4-STEP EMPIRICAL VALUE PIPELINE
            </span>

            {/* Step 1 */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] sm:text-[11.5px] gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-[#2c7a4b] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  1
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 leading-tight truncate">
                    Segregated Wet Feedstock Intake
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-slate-500 truncate">
                    Ranchi Municipal wet waste + Pandra wholesale mandi
                  </div>
                </div>
              </div>
              <div className="text-right font-mono shrink-0">
                <span className="font-bold text-slate-900 block">132.5</span>
                <span className="text-[9px] text-slate-400">t / day</span>
              </div>
            </div>

            <div className="flex justify-center -my-1 text-slate-400">
              <ArrowDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* Step 2 */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] sm:text-[11.5px] gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-[#2c7a4b] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  2
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 leading-tight truncate">
                    High-Rate Anaerobic CSTR Digestion
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-slate-500 truncate">
                    Sealed thermophilic biomethane generation
                  </div>
                </div>
              </div>
              <div className="text-right font-mono shrink-0">
                <span className="font-bold text-[#2c7a4b] block">43,725</span>
                <span className="text-[9px] text-slate-400">t / yr processed</span>
              </div>
            </div>

            <div className="flex justify-center -my-1 text-slate-400">
              <ArrowDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* Step 3 */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] sm:text-[11.5px] gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-[#2c7a4b] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  3
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 leading-tight truncate">
                    Clean Energy Yield (CBG)
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-slate-500 truncate">
                    Upgraded biomethane vehicle fuel & grid injection
                  </div>
                </div>
              </div>
              <div className="text-right font-mono shrink-0">
                <span className="font-bold text-slate-900 block">1,650</span>
                <span className="text-[9px] text-slate-400">tons CBG / yr</span>
              </div>
            </div>

            <div className="flex justify-center -my-1 text-slate-400">
              <ArrowDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* Step 4 */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-[11px] sm:text-[11.5px] gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-[#2c7a4b] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  4
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-emerald-950 leading-tight truncate">
                    Gross Annual Economic Dividends
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-emerald-700 truncate">
                    Commercial off-take under SATAT framework & FOM fertilizer
                  </div>
                </div>
              </div>
              <div className="text-right font-mono shrink-0">
                <span className="font-bold text-[#2c7a4b] block">{formattedGrossValue}</span>
                <span className="text-[9px] text-slate-400">/ year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2">
          <button
            type="button"
            onClick={() => showToast("Recalculating thermodynamic mass balance for Jhiri...")}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Recalculate Yield</span>
          </button>

          <button
            type="button"
            onClick={handleApplyCooperation}
            className="py-2.5 px-3 rounded-xl bg-[#2c7a4b] hover:bg-[#23613c] text-white text-[11.5px] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-white" />
            <span>Apply Partnership</span>
          </button>
        </div>
      </div>
    </div>
  );
}
