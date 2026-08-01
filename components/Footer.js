"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaProjectDiagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/95 px-6 py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm">© 2026 Kush Kumar Choudhary. Crafted for modern digital experiences.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link target="_blank" href="https://www.linkedin.com/in/kush-kumar-choudhary-013596289/" className="flex items-center gap-2 transition hover:text-cyan-300">
            <FaLinkedin /> LinkedIn
          </Link>
          <Link target="_blank" href="https://github.com/kushc225?tab=repositories" className="flex items-center gap-2 transition hover:text-cyan-300">
            <FaGithub /> GitHub
          </Link>
          <Link href="mailto:kushc225@gmail.com" className="flex items-center gap-2 transition hover:text-cyan-300">
            <FaEnvelope /> Email
          </Link>
          <Link href="/projects" className="flex items-center gap-2 transition hover:text-cyan-300">
            <FaProjectDiagram /> Projects
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
