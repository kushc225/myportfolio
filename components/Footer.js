"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPhoneAlt } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const Footer = () => {
  const { personal } = portfolioData;

  return (
    <footer className="border-t border-slate-900 bg-slate-950 px-6 py-10 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-300">
            © 2026 {personal.name}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Senior Full Stack Engineer (MERN Stack) • Noida, UP
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-cyan-400"
          >
            <FaLinkedin size={14} className="text-cyan-400" /> LinkedIn
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-white"
          >
            <FaGithub size={14} /> GitHub
          </a>
          <a
            href={personal.leetcode}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-amber-400"
          >
            <FaCode size={14} className="text-amber-400" /> LeetCode
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-1.5 transition hover:text-cyan-400"
          >
            <FaEnvelope size={13} /> {personal.email}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 transition hover:text-cyan-400"
          >
            <FaPhoneAlt size={12} /> {personal.phone}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
