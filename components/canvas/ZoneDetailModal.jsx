"use client";
import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTimes,
  FaCheckCircle,
  FaCode,
  FaRocket,
  FaGraduationCap,
  FaDocker,
  FaServer,
} from "react-icons/fa";

export default function ZoneDetailModal({ zoneId, onClose }) {
  if (!zoneId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-cyan-500/40 bg-slate-900/95 p-6 md:p-8 text-slate-100 shadow-[0_0_60px_rgba(6,182,212,0.25)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-cyan-400 hover:text-white"
        >
          <FaTimes size={18} />
        </button>

        {/* --- DEVOPS & CLOUD ARCHITECTURE MODAL --- */}
        {zoneId === "devops" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
                <FaDocker size={22} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-400 font-bold">
                  DevOps, Cloud & SRE
                </p>
                <h2 className="text-2xl font-bold text-white">
                  {portfolioData.devops.title}
                </h2>
                <p className="text-xs text-slate-400">{portfolioData.devops.tagline}</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {portfolioData.devops.summary}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {portfolioData.devops.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{item.tool}</h3>
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Cloud & DevOps Stack
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {portfolioData.skills.cloudDevops.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-blue-900/50 bg-slate-900 px-2.5 py-1 text-xs text-blue-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- EXPERIENCE MODAL --- */}
        {zoneId === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                <FaRocket size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  Work Experience
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Xcelore Pvt. Ltd. — Senior Software Engineer
                </h2>
                <p className="text-xs text-slate-400">Nov 2023 – Present | Noida, UP</p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              {portfolioData.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.project}</h3>
                      <p className="text-xs text-cyan-400 font-medium">
                        {exp.projectType} • {exp.timeline}
                      </p>
                    </div>
                    <span className="rounded-full bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 text-xs font-semibold text-cyan-300">
                      {exp.highlightMetric}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <FaCheckCircle className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-cyan-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PROJECTS MODAL --- */}
        {zoneId === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <FaCode size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  Featured Project
                </p>
                <h2 className="text-2xl font-bold text-white">
                  CollabDocs — Real-Time Collaborative Editor
                </h2>
              </div>
            </div>

            {portfolioData.projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 space-y-4"
              >
                <p className="text-sm text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                <ul className="space-y-2.5 text-sm text-slate-300">
                  {proj.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <FaCheckCircle className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-emerald-900/50 bg-emerald-950/40 px-2.5 py-1 text-xs font-medium text-emerald-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-300 shadow-md"
                  >
                    Open Live App <FaExternalLinkAlt size={12} />
                  </a>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-white"
                  >
                    GitHub Code <FaGithub size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- SKILLS PLAYGROUND MODAL --- */}
        {zoneId === "skills" && (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Interactive Playground
              </p>
              <h2 className="text-2xl font-bold text-white">Technical Arsenal</h2>
              <p className="mt-1 text-sm text-slate-300">
                You can ram the 3D car into the physics towers on the map to knock down and scatter these skill cubes!
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Languages & Frontend
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {[...portfolioData.skills.languages, ...portfolioData.skills.frontend].map(
                    (s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-200"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Backend & Architecture
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {[...portfolioData.skills.backend, ...portfolioData.skills.architecture].map(
                    (s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-200"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Databases & Cloud / DevOps
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {[...portfolioData.skills.databases, ...portfolioData.skills.cloudDevops].map(
                    (s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-200"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  AI & AI-Assisted Dev
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {[
                    ...portfolioData.skills.ai,
                    ...portfolioData.skills.aiAssistedDev,
                    ...portfolioData.skills.testing,
                  ].map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- EDUCATION & BIO MODAL --- */}
        {zoneId === "education" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
                <FaGraduationCap size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-purple-400 font-bold">
                  Education & Background
                </p>
                <h2 className="text-2xl font-bold text-white">
                  {portfolioData.education.degree}
                </h2>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {portfolioData.education.institution}
                  </h3>
                  <p className="text-xs text-purple-300">
                    {portfolioData.education.period}
                  </p>
                </div>
                <span className="rounded-full bg-purple-950 border border-purple-500/40 px-3 py-1 text-xs font-semibold text-purple-300">
                  {portfolioData.education.grade}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {portfolioData.education.summary}
              </p>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Professional Philosophy
                </h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {portfolioData.personal.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTACT MODAL --- */}
        {zoneId === "contact" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-400">
                <FaEnvelope size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-pink-400 font-bold">
                  Contact Terminal
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Let’s Build Something Great Together
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-pink-500"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400">
                  <FaEnvelope />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Email Address</p>
                  <p className="text-sm font-semibold text-white">
                    {portfolioData.personal.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${portfolioData.personal.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-cyan-500"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                  📞
                </span>
                <div>
                  <p className="text-xs text-slate-400">Phone & WhatsApp</p>
                  <p className="text-sm font-semibold text-white">
                    {portfolioData.personal.phone}
                  </p>
                </div>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
              >
                <FaLinkedin size={14} className="text-cyan-400" /> LinkedIn
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
              >
                <FaGithub size={14} /> GitHub Repos
              </a>
              <a
                href={portfolioData.personal.leetcode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-amber-400 hover:text-white"
              >
                LeetCode Profile
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 px-6 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            Back to Driving 🚗
          </button>
        </div>
      </div>
    </div>
  );
}
