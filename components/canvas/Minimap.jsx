"use client";
import React from "react";
import { portfolioData } from "@/data/portfolioData";

export default function Minimap({ carPos, carYaw, activeZone, onSelectZone }) {
  // Arena coordinates are approximately -70 to +70
  // Minimap size is 120x120 pixels, center is (60, 60)
  const mapSize = 120;
  const center = mapSize / 2;
  const scale = (mapSize * 0.42) / 60; // 60 units in world -> 50.4 px in minimap

  const toMapCoords = (x, z) => {
    return {
      cx: center + x * scale,
      cy: center + z * scale,
    };
  };

  const playerCoords = toMapCoords(carPos?.x || 0, carPos?.z || 0);
  const playerAngleDeg = ((carYaw || 0) * 180) / Math.PI;

  return (
    <div className="relative rounded-2xl border border-slate-700/80 bg-slate-950/85 p-2.5 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between pb-1.5 px-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
          Radar / GPS
        </span>
        <span className="text-[9px] text-slate-400">Click to Fly</span>
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90"
        style={{ width: `${mapSize}px`, height: `${mapSize}px` }}
      >
        {/* Subtle Radar sweep / grid lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="h-full w-px bg-cyan-400" />
          <div className="w-full h-px bg-cyan-400 absolute" />
          <div className="h-20 w-20 rounded-full border border-cyan-400 absolute" />
        </div>

        {/* Zone Markers on Minimap */}
        {portfolioData.zones.map((zone) => {
          const { cx, cy } = toMapCoords(zone.x, zone.z);
          const isCurrent = activeZone === zone.id;

          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              title={`Teleport to ${zone.name}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 group transition-transform hover:scale-125 focus:outline-none"
              style={{ left: `${cx}px`, top: `${cy}px` }}
            >
              <div
                className={`rounded-full transition-all ${
                  isCurrent ? "h-3.5 w-3.5 ring-2 ring-white animate-pulse" : "h-2.5 w-2.5 opacity-85"
                }`}
                style={{ backgroundColor: zone.color }}
              />
              <span className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-950/90 px-1 py-0.2 text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {zone.name.split(" ")[0]}
              </span>
            </button>
          );
        })}

        {/* Player Car Blip on Minimap */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
          style={{
            left: `${playerCoords.cx}px`,
            top: `${playerCoords.cy}px`,
            transform: `translate(-50%, -50%) rotate(${playerAngleDeg}deg)`,
          }}
        >
          {/* Arrow representing car orientation */}
          <div className="h-0 w-0 border-x-4 border-x-transparent border-b-[9px] border-b-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
        </div>
      </div>
    </div>
  );
}
