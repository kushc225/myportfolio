"use client";
import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import {
  FaRocket,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGamepad,
  FaPhoneAlt,
  FaGraduationCap,
  FaCode,
  FaDocker,
  FaServer,
} from "react-icons/fa";

import Footer from "@/components/Footer";

export default function ClassicPortfolio({ onSwitchTo3D }) {
  const { personal, experiences, projects, skills, education } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:px-20 lg:px-28 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[650px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl">
          {/* 3D Drive Mode Banner */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-5 py-2 text-xs font-semibold text-cyan-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Interactive 3D Driving World Available</span>
              <button
                onClick={onSwitchTo3D}
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-3 py-1 text-slate-950 font-bold transition hover:bg-cyan-300"
              >
                <FaGamepad /> Play 3D Mode
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5 mb-6">
            <Image
              src="/avatar.jpg"
              alt={personal.name}
              width={80}
              height={80}
              priority
              className="h-20 w-20 rounded-2xl border-2 border-cyan-400/80 object-cover shadow-xl"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
                {personal.title}
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                {personal.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 text-xl font-medium text-cyan-300">
            {personal.tagline}
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {personal.bio}
          </p>

          {/* Key Metric Highlights from Resume */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {personal.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md transition hover:border-cyan-500/50"
              >
                <p className="text-2xl font-black text-cyan-400 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-white">
                  {stat.label}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onSwitchTo3D}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 shadow-lg shadow-cyan-500/20"
            >
              <FaGamepad size={16} /> Drive Through My Portfolio (3D)
            </button>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Contact Me
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/40 px-5 py-3.5 text-xs font-medium text-slate-400 transition hover:text-white"
            >
              <FaEnvelope /> {copied ? "Email Copied!" : personal.email}
            </button>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="px-6 py-20 md:px-20 lg:px-28 border-t border-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400">
              Work Experience
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Proven results in high-scale production systems.
            </h2>
            <p className="mt-4 text-sm text-slate-400">
              Senior Software Engineer at Xcelore Pvt. Ltd. (Nov 2023 – Present)
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md transition hover:border-slate-700"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.project}</h3>
                    <p className="mt-1 text-sm font-medium text-cyan-400">
                      {exp.projectType} • {exp.timeline}
                    </p>
                  </div>
                  <span className="rounded-full bg-cyan-950/80 border border-cyan-500/30 px-4 py-1.5 text-xs font-semibold text-cyan-300">
                    {exp.highlightMetric}
                  </span>
                </div>

                <p className="mt-5 text-base text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-cyan-400" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docker, Kubernetes & Cloud Architecture */}
      <section id="devops" className="px-6 py-20 md:px-20 lg:px-28 border-t border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-blue-400">
              Cloud Infrastructure & DevOps
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Docker, Kubernetes & Automated CI/CD.
            </h2>
            <p className="mt-4 text-sm text-slate-400">
              {portfolioData.devops.summary}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioData.devops.highlights.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-blue-900/40 bg-slate-900/60 p-6 md:p-7 backdrop-blur-md transition hover:border-blue-500/50"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white">{item.tool}</h3>
                  <span
                    className="rounded-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="px-6 py-20 md:px-20 lg:px-28 border-t border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-400">
              Featured Project
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineering collaborative, real-time products.
            </h2>
          </div>

          <div className="mt-12">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl border border-emerald-900/40 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{proj.name}</h3>
                    <p className="mt-1 text-sm text-emerald-400 font-medium">
                      {proj.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
                    >
                      Live Demo <FaExternalLinkAlt size={11} />
                    </a>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-emerald-400"
                    >
                      <FaGithub size={13} /> Code
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

                <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-slate-800">
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
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="px-6 py-20 md:px-20 lg:px-28 border-t border-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400">
              Technical Skills
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Production-tested capabilities across the entire stack.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                Languages & Frontend
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...skills.languages, ...skills.frontend].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                Backend & Microservices
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...skills.backend, ...skills.architecture].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Databases & Cloud
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...skills.databases, ...skills.cloudDevops].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400">
                AI & Realtime Voice
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.ai.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400">
                Testing & Integrations
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...skills.testing, ...skills.integrations].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
                AI-Assisted Development
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.aiAssistedDev.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Bio */}
      <section id="education" className="px-6 py-20 md:px-20 lg:px-28 border-t border-slate-900 bg-slate-950/70">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-purple-400">
              Education
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Academic Background
            </h2>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-2xl font-bold text-white">{education.degree}</h3>
                <p className="mt-1 text-sm font-semibold text-purple-400">
                  {education.institution} • {education.period}
                </p>
              </div>
              <span className="rounded-full bg-purple-950 border border-purple-500/40 px-4 py-1.5 text-xs font-bold text-purple-300">
                {education.grade}
              </span>
            </div>
            <p className="mt-5 text-sm text-slate-300 leading-relaxed">
              {education.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24 md:px-20 lg:px-28 border-t border-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let’s build something extraordinary.
          </h2>
          <p className="mt-5 text-base text-slate-300">
            Available for senior engineering roles, architectural consulting, and high-impact projects.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 shadow-lg shadow-cyan-500/20"
            >
              <FaEnvelope /> Email Me Directly
            </a>
            <a
              href={`tel:${personal.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
            >
              <FaPhoneAlt size={13} /> {personal.phone}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
            >
              <FaLinkedin className="text-cyan-400" /> LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
