"use client";
import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  FaExternalLinkAlt,
  FaRocket,
  FaCode,
  FaGraduationCap,
  FaEnvelope,
  FaTimes,
  FaArrowRight,
  FaServer,
  FaCubes,
} from "react-icons/fa";

export default function ZoneCardDrawer({
  zoneId,
  onClose,
  onExpand,
  onNextStation,
}) {
  if (!zoneId || zoneId === "spawn") return null;

  const currentZone = portfolioData.zones.find((z) => z.id === zoneId);

  return (
    <div className="absolute bottom-5 inset-x-4 md:inset-x-auto md:right-8 md:bottom-8 z-30 md:w-[430px] max-w-full animate-fadeIn pointer-events-auto">
      <div className="relative rounded-3xl border border-cyan-400/40 bg-slate-900/95 p-5 md:p-6 text-slate-100 shadow-[0_12px_45px_rgba(6,182,212,0.28)] backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-cyan-400 hover:text-white"
          title="Dismiss"
        >
          <FaTimes size={13} />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: currentZone?.color || "#06b6d4" }}
          />
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
            {currentZone?.name || "Station"}
          </span>
        </div>

        {/* --- DEVOPS & DOCKER/K8S ZONE --- */}
        {zoneId === "devops" && (
          <div className="mt-3 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaServer className="text-blue-400" size={16} />
              Docker, Kubernetes & CI/CD
            </h3>
            <p className="text-xs text-blue-400 font-semibold">
              Production Containerization & Orchestration
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-300">
                <span>🐳 Docker Multi-Stage Builds</span>
                <span className="rounded bg-blue-950 border border-blue-600/40 px-2 py-0.5 text-[10px]">
                  65% Size Cut
                </span>
              </div>
              <p className="text-[12px] text-slate-300 leading-snug">
                Optimized microservice containers, zero dev-drift, and automated GitHub Actions CI/CD workflows.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-sky-300">
                <span>☸️ Kubernetes (K8s) & Cloud SRE</span>
                <span className="rounded bg-sky-950 border border-sky-600/40 px-2 py-0.5 text-[10px]">
                  HPA Autoscaling
                </span>
              </div>
              <p className="text-[12px] text-slate-300 leading-snug">
                Configured Pods, Ingress, and horizontal autoscaling on GCP/AWS. Verified under 5,000-VU k6 load tests.
              </p>
            </div>
          </div>
        )}

        {/* --- EXPERIENCE ZONE --- */}
        {zoneId === "experience" && (
          <div className="mt-3 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaRocket className="text-cyan-400" size={16} />
              Senior Software Engineer
            </h3>
            <p className="text-xs text-slate-300">
              Xcelore Pvt. Ltd. (Nov 2023 – Present)
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-cyan-300">
                <span>Outzidr.com E-Commerce</span>
                <span className="rounded bg-cyan-950 border border-cyan-600/40 px-2 py-0.5 text-[10px]">
                  6s ➔ &lt;500ms p95
                </span>
              </div>
              <p className="text-[12px] text-slate-300 leading-snug">
                Containerized Cart Microservice in Nest.js + Fastify, 5,000-VU k6 load tested with Redis cache & Docker.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-purple-300">
                <span>EXEI AI Voice Chatbot</span>
                <span className="rounded bg-purple-950 border border-purple-600/40 px-2 py-0.5 text-[10px]">
                  50% Latency Cut
                </span>
              </div>
              <p className="text-[12px] text-slate-300 leading-snug">
                Real-time WebSocket voice pipeline with Azure Cognitive Services, Next.js agent dashboard & CI/CD.
              </p>
            </div>
          </div>
        )}

        {/* --- PROJECTS ZONE --- */}
        {zoneId === "projects" && (
          <div className="mt-3 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaCode className="text-emerald-400" size={16} />
              CollabDocs
            </h3>
            <p className="text-xs text-emerald-400 font-medium">
              Real-Time Collaborative Document Editor
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
              <p className="text-[12px] text-slate-300 leading-snug">
                Google Docs-style full-stack collaborative editor with CRDT-based sync (5 concurrent editors verified), Liveblocks cursor presence, Convex backend, and Clerk RBAC.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {["Next.js", "Convex", "Liveblocks", "Tiptap", "Clerk"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-300"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="pt-1">
              <a
                href="https://collabdoc.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Launch App Live <FaExternalLinkAlt size={10} />
              </a>
            </div>
          </div>
        )}

        {/* --- SKILLS PLAYGROUND ZONE --- */}
        {zoneId === "skills" && (
          <div className="mt-3 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaCubes className="text-amber-400" size={16} />
              Destructible Skills Playground
            </h3>
            <p className="text-xs text-amber-400 font-medium">
              Crash into the physics cubes to knock them over!
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {portfolioData.physicsBlocks.slice(0, 10).map((b) => (
                <span
                  key={b.name}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-slate-200"
                  style={{ borderLeftColor: b.color, borderLeftWidth: "3px" }}
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* --- EDUCATION ZONE --- */}
        {zoneId === "education" && (
          <div className="mt-3 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaGraduationCap className="text-purple-400" size={18} />
              MCA — ABESIT, Ghaziabad
            </h3>
            <p className="text-xs text-purple-300 font-semibold">
              Master of Computer Applications • 2022–2024 (CGPA: 8.6)
            </p>
            <p className="text-[12px] text-slate-300 leading-snug">
              Specialized in distributed architectures, microservices, containerization, and database optimization.
            </p>
          </div>
        )}

        {/* --- CONTACT ZONE --- */}
        {zoneId === "contact" && (
          <div className="mt-3 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaEnvelope className="text-pink-400" size={16} />
              Let’s Connect
            </h3>
            <p className="text-xs text-slate-300">
              Open for senior engineering roles and technical partnerships.
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1.5 text-xs">
              <p className="text-slate-300">
                <span className="text-slate-400">Email:</span>{" "}
                <span className="font-semibold text-white">
                  kushc225@gmail.com
                </span>
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Phone:</span>{" "}
                <span className="font-semibold text-white">
                  +91 96088 12837
                </span>
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Location:</span> Noida, Uttar Pradesh
              </p>
            </div>
          </div>
        )}

        {/* Action Row */}
        <div className="mt-5 flex items-center justify-between gap-2 pt-3 border-t border-slate-800">
          <button
            onClick={() => onExpand(zoneId)}
            className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Full Details (E)
          </button>

          {onNextStation && (
            <button
              onClick={onNextStation}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
            >
              Next Station <FaArrowRight size={10} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
