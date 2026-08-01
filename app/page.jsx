"use client";
export const dynamic = "force-static";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

const technologies = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Fastify", "PostgreSQL", "MongoDB", "Redis"] },
  { category: "Realtime & AI", items: ["WebSockets", "Azure Cognitive Services"] },
];

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="px-6 pt-28 pb-20 md:px-20 lg:px-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              Full Stack Engineer
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              I’m Kush Kumar Choudhary.
              <span className="block text-cyan-300">I build performant web and AI products.</span>
            </h1>
            <p className="mt-8 text-base leading-8 text-slate-300 sm:text-lg">
              Nearly 3 years of experience building modern applications in React/Next.js, Node.js, NestJS, and TypeScript. I specialize in high-performance systems, real-time collaboration, voice AI pipelines, and polished user experiences.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Let’s work together
                <FaArrowRight className="ml-3" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                View projects
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-slate-400">
              <Link target="_blank" href="https://www.linkedin.com/in/kush-kumar-choudhary-013596289/" className="transition hover:text-cyan-300">
                LinkedIn
              </Link>
              <Link target="_blank" href="https://github.com/kushc225?tab=repositories" className="transition hover:text-cyan-300">
                GitHub
              </Link>
              <Link target="_blank" href="https://leetcode.com/kush_op/" className="transition hover:text-cyan-300">
                LeetCode
              </Link>
              <Link href="/about" className="transition hover:text-cyan-300">
                About
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid gap-6 xl:grid-cols-[1.4fr_1fr]"
          >
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
                <span className="text-xs uppercase tracking-[0.35em] text-cyan-400">Profile</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">What I deliver</h2>
                <p className="mt-4 text-slate-300 leading-7">
                  I build end-to-end applications with strong ownership of frontend, backend, and infrastructure. My experience spans microservices, real-time systems, AI integrations, and scalable cloud-ready product delivery.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/90 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Performance</p>
                    <p className="mt-3 font-semibold text-white">Reduced API latency by 70%</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Realtime</p>
                    <p className="mt-3 font-semibold text-white">Cut voice AI response times by more than half</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8">
                <span className="text-xs uppercase tracking-[0.35em] text-cyan-400">Strengths</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">Core technical expertise</h2>
                <ul className="mt-6 space-y-3 text-slate-300">
                  <li>Scalable REST API design with NestJS and Fastify</li>
                  <li>Real-time voice and messaging pipelines using WebSockets</li>
                  <li>AI integrations with Azure Cognitive Services</li>
                  <li>Cache-driven performance tuning with Redis</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8">
                <span className="text-xs uppercase tracking-[0.35em] text-cyan-400">Featured work</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">CollabDocs</h2>
                <p className="mt-4 text-slate-300 leading-7">
                  A Google Docs-style collaborative editor with CRDT-based sync, live cursor presence, and role-based workspace permissions. Built for teams that need real-time document collaboration without data loss.
                </p>
                <div className="mt-6 space-y-3 text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <span>Real-time collaboration for unlimited simultaneous users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <span>Role-based document permissions and team workspace access</span>
                  </div>
                </div>
                <Link href="/projects" className="mt-8 inline-flex items-center text-sm font-semibold text-cyan-300 transition hover:text-cyan-100">
                  Explore the project
                  <FaExternalLinkAlt className="ml-2" />
                </Link>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8">
                <span className="text-xs uppercase tracking-[0.35em] text-cyan-400">Technologies</span>
                <div className="mt-6 space-y-6">
                  {technologies.map((group) => (
                    <div key={group.category}>
                      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">{group.category}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {group.items.map((tech) => (
                          <span key={tech} className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm font-medium text-slate-100 shadow-sm transition hover:border-cyan-400 hover:bg-slate-900 hover:text-white">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
