"use client";
"use client";
export const dynamic = "force-static";
import Link from "next/link";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section className="px-6 pt-28 pb-20 md:px-20 lg:px-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Projects</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Selected work and technical deliverables.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            A curated view of modern applications that highlight performance, reliability, and user-centered design.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6">
          <article className="section-card p-8">
            <h2 className="text-2xl font-semibold text-white">CollabDocs</h2>
            <p className="mt-4 text-slate-300 leading-7">
              A Google Docs-style collaborative editor with CRDT-based sync, live cursor presence, and access controls for team workspaces.
            </p>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-slate-300">
              <li>Real-time collaboration for unlimited simultaneous users.</li>
              <li>Role-based permissions with secure access controls.</li>
              <li>Clerk authentication and rich-text editing with Tiptap.</li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Talk about a similar project
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Projects;
