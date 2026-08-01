"use client";

import { motion } from "framer-motion";
import { Clock, Users2, ScanSearch, BrainCircuit, Star, ShieldCheck } from "lucide-react";

const BENEFITS = [
  { icon: Clock, title: "Reduce hiring time", desc: "Cut weeks of manual screening down to hours with automated matching." },
  { icon: Users2, title: "Save HR effort", desc: "Let AI handle first-pass screening so your team focuses on final decisions." },
  { icon: ScanSearch, title: "Automatic resume screening", desc: "Every application is parsed and ranked against your requirements instantly." },
  { icon: BrainCircuit, title: "Technical AI interviews", desc: "Validate real skills before a human interview ever happens." },
  { icon: Star, title: "Better quality hires", desc: "Shortlists are built on verified skill match, not keyword luck." },
  { icon: ShieldCheck, title: "Reduce hiring bias", desc: "Structured, skill-first evaluation keeps the process fair and consistent." },
];

export default function CompanyBenefits() {
  return (
    <section id="companies" className="section-padding bg-gradient-to-b from-white to-blue-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow">For Companies</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Hire faster, with <span className="text-gradient">more confidence</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Skip the manual sifting. Every candidate arrives pre-screened, skill-scored,
              and interview-tested — so your team only spends time on the people worth meeting.
            </p>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-0.5 focus-ring">
              Register Your Company
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 shadow-glass hover:shadow-glow transition-shadow duration-300"
              >
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
