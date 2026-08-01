"use client";
export const dynamic = "force-static";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef(null);
  const [isSent, setIsSent] = useState(false);

  const sendMessage = (event) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:kushc225@gmail.com?subject=${subject}&body=${body}`;
    setIsSent(true);
  };

  return (
    <section className="px-6 pt-28 pb-20 md:px-20 lg:px-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Let’s build something great together.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-300">
            Send a message or email me directly at <span className="font-semibold text-white">kushc225@gmail.com</span>. I’m available for new projects, freelance work, and technical partnerships.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <form ref={formRef} className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.24)]" onSubmit={sendMessage}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell me about your project"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Send message
            </button>
            {isSent && <p className="text-sm text-cyan-300">Your message is ready to send in your email client.</p>}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 text-slate-300"
        >
          <h2 className="text-xl font-semibold text-white">Prefer a direct link?</h2>
          <p className="mt-4 leading-7">
            Email me at <span className="font-semibold text-white">kushc225@gmail.com</span> or connect on LinkedIn to discuss your next product.
          </p>
          <Link href="mailto:kushc225@gmail.com" className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-300 hover:text-cyan-100">
            Email Kush directly
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
