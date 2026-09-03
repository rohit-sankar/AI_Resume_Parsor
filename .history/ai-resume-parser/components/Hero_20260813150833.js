"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle, FileText, Sparkles, BadgeCheck, BrainCircuit } from "lucide-react";
import ParticleField from "./ParticleField";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const skillTags = ["React.js", "Python", "SQL", "Machine Learning", "Cloud"];

export default function Hero() {
  const wrapRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 15 });

  const handleMouse = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouse}
      ref={wrapRef}
      className="relative overflow-hidden bg-hero-gradient pt-40 pb-28 lg:pt-48 lg:pb-36"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blob-gradient blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-blob-gradient blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Particle field */}
      <ParticleField count={70} className="absolute inset-0 h-full w-full opacity-70" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 eyebrow rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Hiring Intelligence
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display font-semibold text-[2.75rem] leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.6rem]"
          >
            Find the{" "}
            <span className="text-gradient">Right Talent</span>
            <br /> with AI
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Upload resumes once. Apply to multiple companies. Let AI evaluate skills,
            conduct technical interviews, and connect the best candidates with recruiters.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-0.5 focus-ring">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-primary/30 hover:text-primary focus-ring">
              <PlayCircle className="h-5 w-5 text-primary" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex items-center gap-8 text-sm text-slate-500">
            <div>
              <p className="font-display text-2xl font-semibold text-ink">10,000+</p>
              <p>Candidates matched</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="font-display text-2xl font-semibold text-ink">500+</p>
              <p>Hiring companies</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: animated illustration */}
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative isolate mx-auto w-full max-w-md"
        >
          {/* Main resume card */}
          <div className="glass-strong relative rounded-3xl p-6 shadow-glass">
            <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">candidate_resume.pdf</p>
                <p className="text-xs text-slate-500">Parsing in progress…</p>
              </div>
              <span className="ml-auto flex h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
            </div>

            {/* Fake resume lines with scan bar */}
            <div className="relative mt-5 space-y-3 overflow-hidden rounded-xl">
              {[100, 88, 95, 70, 82, 60].map((w, i) => (
                <div key={i} className="h-2.5 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
              ))}
              <motion.div
                className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent"
                initial={{ y: "-100%" }}
                animate={{ y: "220%" }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Extracted skill tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {skillTags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-ink">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Resume Score
              </div>
              <span className="font-display text-lg font-semibold text-primary">92%</span>
            </div>
          </div>

          {/* Floating chip: AI Interview */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass pointer-events-none absolute -left-10 top-0 hidden -translate-y-1/2 items-center gap-2 rounded-2xl px-4 py-3 shadow-glow sm:flex"
          >
            <BrainCircuit className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-ink">AI Interview Active</span>
          </motion.div>

          {/* Floating chip: match score */}
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass absolute -right-8 bottom-6 hidden rounded-2xl px-4 py-3 shadow-glow sm:flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-ink">98% Skill Match</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
