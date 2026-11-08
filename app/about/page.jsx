"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import Footer from "@/components/Footer";
import { FaRocket, FaGraduationCap, FaCheckCircle, FaGamepad, FaDocker, FaServer } from "react-icons/fa";

export default function About() {
  const { personal, experiences, education, skills } = portfolioData;

  return (
    <div className="min-h-screen bg-slate-950 px-6 pt-32 pb-24 md:px-20 lg:px-28 text-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
              About Me
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Building resilient microservices & modern real-time systems.
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              {personal.bio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 shadow-md"
              >
                <FaGamepad size={14} /> Play 3D Drive Mode
              </Link>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Profile Photo Card */}
          <div className="relative mx-auto w-full max-w-xs">
            <div className="relative overflow-hidden rounded-3xl border-2 border-slate-700/80 bg-slate-900 shadow-2xl transition hover:border-cyan-400">
              <Image
                src="/avatar.jpg"
                alt="Kush Kumar Choudhary"
                width={320}
                height={320}
                priority
                className="aspect-square w-full object-cover object-top"
              />
              <div className="border-t border-slate-800 bg-slate-950/95 p-4 text-center">
                <p className="text-sm font-bold text-white">{personal.name}</p>
                <p className="text-xs text-cyan-400 mt-0.5">{personal.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {personal.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md"
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

        {/* Work Experience Breakdown */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400">
            <FaRocket />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
              Work Experience
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.project}</h3>
                    <p className="text-xs font-semibold text-cyan-400">
                      {exp.company} • {exp.role} ({exp.timeline})
                    </p>
                  </div>
                  <span className="rounded-full bg-cyan-950 border border-cyan-500/40 px-3.5 py-1 text-xs font-semibold text-cyan-300">
                    {exp.highlightMetric}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <FaCheckCircle className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-cyan-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Docker, Kubernetes & Cloud Architecture */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center gap-2 text-blue-400">
            <FaDocker size={22} />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
              Docker, Kubernetes & Cloud SRE
            </h2>
          </div>

          <div className="rounded-3xl border border-blue-900/40 bg-slate-900/70 p-6 md:p-8">
            <h3 className="text-xl font-bold text-white">
              {portfolioData.devops.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {portfolioData.devops.summary}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {portfolioData.devops.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{item.tool}</h4>
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider"
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
          </div>
        </div>

        {/* Education & Bio */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center gap-2 text-purple-400">
            <FaGraduationCap size={20} />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
              Education
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {education.degree}
                </h3>
                <p className="text-sm font-semibold text-purple-400">
                  {education.institution} ({education.period})
                </p>
              </div>
              <span className="rounded-full bg-purple-950 border border-purple-500/40 px-4 py-1.5 text-xs font-bold text-purple-300">
                {education.grade}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {education.summary}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
