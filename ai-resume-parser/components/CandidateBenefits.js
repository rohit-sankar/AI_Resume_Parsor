"use client";

import { motion } from "framer-motion";
import {
  SendHorizontal,
  FileEdit,
  TrendingUp,
  Mic,
  LineChart,
  Compass,
  ListTodo,
} from "lucide-react";

const BENEFITS = [
  { icon: SendHorizontal, title: "Apply once, reach many", desc: "One resume opens the door to every registered company." },
  { icon: FileEdit, title: "Edit anytime", desc: "Update your resume whenever your experience grows." },
  { icon: TrendingUp, title: "Skill suggestions", desc: "Get direct suggestions on skills worth strengthening." },
  { icon: Mic, title: "AI mock interviews", desc: "Practice with the same AI interviewer companies use." },
  { icon: LineChart, title: "Resume insights", desc: "See exactly how your resume is scored and why." },
  { icon: Compass, title: "Career recommendations", desc: "Discover roles that match your real skill profile." },
  { icon: ListTodo, title: "Application tracking", desc: "Follow every application's status from one dashboard." },
];

export default function CandidateBenefits() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">For Candidates</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Your resume, <span className="text-gradient">working harder</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Upload once. Let it open doors everywhere while you focus on getting better.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
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
    </section>
  );
}
