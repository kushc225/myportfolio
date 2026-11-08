"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaGamepad, FaFileAlt } from "react-icons/fa";
import ZoneDetailModal from "@/components/canvas/ZoneDetailModal";
import ClassicPortfolio from "@/components/classic/ClassicPortfolio";

// Dynamically import Three.js 3D world with SSR disabled
const BrunoWorld = dynamic(
  () => import("@/components/canvas/BrunoWorld"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-white">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin" />
          <div className="text-2xl animate-pulse">🚗</div>
        </div>
        <p className="mt-6 text-sm font-bold tracking-widest uppercase text-cyan-400">
          Loading 3D Experience...
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Building physics world, vehicles & sound engine
        </p>
      </div>
    ),
  }
);

export default function Home() {
  const [viewMode, setViewMode] = useState("3d"); // "3d" | "classic"
  const [modalZone, setModalZone] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalZone(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Floating Mode Switcher (Always available at the top center) */}
      <div className="fixed top-16 md:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-950/90 p-1 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              viewMode === "3d"
                ? "bg-cyan-400 text-slate-950 shadow-md scale-105"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FaGamepad size={14} /> 3D Drive Mode
          </button>
          <button
            onClick={() => setViewMode("classic")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              viewMode === "classic"
                ? "bg-cyan-400 text-slate-950 shadow-md scale-105"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FaFileAlt size={12} /> Resume View
          </button>
        </div>
      </div>

      {/* Main View Renderer */}
      {viewMode === "3d" ? (
        <div className="h-screen w-screen overflow-hidden">
          <BrunoWorld onOpenModal={(zone) => setModalZone(zone)} />

          {/* Detailed Full Modal Popup */}
          {modalZone && (
            <ZoneDetailModal
              zoneId={modalZone}
              onClose={() => setModalZone(null)}
            />
          )}
        </div>
      ) : (
        <ClassicPortfolio onSwitchTo3D={() => setViewMode("3d")} />
      )}
    </div>
  );
}
