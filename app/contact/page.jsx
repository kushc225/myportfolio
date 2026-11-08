"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import Footer from "@/components/Footer";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaGamepad,
} from "react-icons/fa";

export default function Contact() {
  const { personal } = portfolioData;
  const formRef = useRef(null);
  const [isSent, setIsSent] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 pt-32 pb-24 md:px-20 lg:px-28 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-400">
            Contact Me
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let’s Build Something Great Together
          </h1>
          <p className="mt-5 text-base text-slate-300">
            I am open to senior engineering roles, technical leadership, and high-performance product consulting.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 shadow-md"
            >
              <FaGamepad size={14} /> Drive to Contact Terminal (3D)
            </Link>
          </div>
        </div>

        {/* Contact Methods Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-pink-500"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-400">
              <FaEnvelope size={20} />
            </span>
            <div>
              <p className="text-xs text-slate-400">Direct Email</p>
              <p className="text-base font-bold text-white">{personal.email}</p>
            </div>
          </a>

          <a
            href={`tel:${personal.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-cyan-500"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
              <FaPhoneAlt size={18} />
            </span>
            <div>
              <p className="text-xs text-slate-400">Phone & WhatsApp</p>
              <p className="text-base font-bold text-white">{personal.phone}</p>
            </div>
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-6 py-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
          >
            <FaLinkedin size={15} className="text-cyan-400" /> LinkedIn Profile
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-6 py-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
          >
            <FaGithub size={15} /> GitHub Repositories
          </a>
          <a
            href={personal.leetcode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-6 py-3 text-xs font-semibold text-slate-200 transition hover:border-amber-400 hover:text-white"
          >
            <FaCode size={15} className="text-amber-400" /> LeetCode
          </a>
        </div>

        {/* Contact Form */}
        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
          <form ref={formRef} onSubmit={sendMessage} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Alex Smith"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="alex@company.com"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about your team or project..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-cyan-400 px-8 py-3.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 shadow-lg shadow-cyan-500/20"
            >
              Send Message
            </button>

            {isSent && (
              <p className="mt-3 text-xs text-cyan-300 font-semibold">
                ✓ Message client opened! Thank you for reaching out.
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
