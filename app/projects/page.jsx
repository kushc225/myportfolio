"use client";
import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import Footer from "@/components/Footer";
import { FaExternalLinkAlt, FaGithub, FaCheckCircle, FaGamepad } from "react-icons/fa";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <div className="min-h-screen bg-slate-950 px-6 pt-32 pb-24 md:px-20 lg:px-28 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-400">
            Selected Work
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Featured Engineering Projects
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            Production-grade distributed systems and real-time collaborative applications.
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 shadow-md"
            >
              <FaGamepad size={14} /> Drive to Projects Zone (3D)
            </Link>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl border border-emerald-900/40 bg-slate-900/70 p-6 md:p-8 backdrop-blur-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h2 className="text-2xl font-bold text-white">{proj.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    {proj.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-300 shadow-md"
                  >
                    Open Live Demo <FaExternalLinkAlt size={11} />
                  </a>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-white"
                  >
                    <FaGithub size={13} /> Source Code
                  </a>
                </div>
              </div>

              <p className="mt-5 text-base text-slate-300 leading-relaxed">
                {proj.description}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {proj.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                {proj.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-emerald-900/40 bg-emerald-950/20 px-3 py-1 text-xs font-medium text-emerald-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
