"use client";
export const dynamic = "force-static";
import { motion } from "framer-motion";

const skillGroups = [
  { title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "NestJS", "Fastify", "PostgreSQL", "MongoDB", "Redis"] },
  { title: "Realtime & AI", skills: ["WebSockets", "Azure Cognitive Services"] },
];

const About = () => {
  const experienceCards = [
    {
      title: "Xcelore Pvt. Ltd.",
      subtitle: "Software Developer — Nov 2024 to Present",
      details: [
        "Owned the Cart Microservice end-to-end with NestJS and Fastify.",
        "Reduced API latency from 1.6–2s to under 500ms using Redis caching.",
        "Delivered performance benchmarks for 1,000 concurrent users.",
      ],
    },
    {
      title: "EXEI AI Voice Chatbot",
      subtitle: "Full-stack product delivery",
      details: [
        "Built backend, real-time voice pipeline, and Next.js chat UI.",
        "Cut voice latency from 5–7s to 2.5–3s using WebSockets.",
        "Integrated Vonage toll-free voice and Razorpay subscription billing.",
      ],
    },
  ];

  return (
    <section className="px-6 pt-28 pb-20 md:px-20 lg:px-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">About</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Building modern web products with strong technical ownership.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            Full Stack Engineer with nearly 3 years of experience in React/Next.js, Node.js, NestJS, TypeScript, and real-time AI systems. I create polished frontend experiences backed by scalable backend services and cloud-ready architecture.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <div className="space-y-6">
            <div className="section-card p-8 shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
              <h2 className="text-2xl font-semibold text-white">Professional background</h2>
              <p className="mt-4 text-slate-300 leading-7">
                I own full product cycles from architecture and backend services to frontend design and deployment. My strongest work is in AI-focused, high-performance applications with real-time synchronization and caching strategies.
              </p>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>Microservices with NestJS, Fastify, and PostgreSQL.</li>
                <li>Real-time pipelines using WebSockets and streaming.</li>
                <li>AI integrations with Azure Cognitive Services.</li>
                <li>Cache optimization using Redis.</li>
              </ul>
            </div>

            <div className="section-card p-8">
              <h2 className="text-2xl font-semibold text-white">Education</h2>
              <div className="mt-6 space-y-4 text-slate-300">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">MCA</p>
                  <p className="mt-3 text-lg font-semibold text-white">ABESIT, Ghaziabad</p>
                  <p className="mt-2 text-sm text-slate-400">2022 – 2024 | CGPA: 8.6</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="section-card p-8">
              <h2 className="text-2xl font-semibold text-white">Experience highlights</h2>
              <div className="mt-6 space-y-5">
                {experienceCards.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">{item.title}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.subtitle}</h3>
                    <ul className="mt-5 list-disc space-y-3 pl-5 text-slate-300">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="section-card p-8">
              <h2 className="text-2xl font-semibold text-white">Technical skills</h2>
              <div className="mt-6 space-y-6">
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">{group.title}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {group.skills.map((skill) => (
                        <span key={skill} className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm font-medium text-slate-100 shadow-sm transition hover:border-cyan-400 hover:bg-slate-900 hover:text-white">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
