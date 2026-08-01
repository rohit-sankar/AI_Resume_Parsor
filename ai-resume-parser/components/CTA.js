"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blob-gradient blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Ready to transform <span className="text-gradient">hiring?</span>
        </h2>
        <p className="mt-5 text-lg text-slate-600">
          Join thousands of candidates and hundreds of companies already hiring smarter with AI.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-0.5 focus-ring">
            Start Applying
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-8 py-4 text-sm font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-primary/30 hover:text-primary focus-ring">
            <Building2 className="h-4 w-4 text-primary" />
            Register Company
          </button>
        </div>
      </motion.div>
    </section>
  );
}
