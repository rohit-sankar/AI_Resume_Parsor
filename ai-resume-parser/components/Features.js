"use client";

import { motion } from "framer-motion";
import {
  ScanText,
  ListChecks,
  Gauge,
  BrainCircuit,
  LayoutDashboard,
  UserCircle,
  ShieldCheck,
  FileEdit,
  Building2,
  ClipboardList,
} from "lucide-react";

const FEATURES = [
  { icon: ScanText, title: "AI Resume Parsing", desc: "Extracts structured data from any resume format in seconds — no manual entry." },
  { icon: ListChecks, title: "Skill Extraction", desc: "Identifies technical and soft skills directly from real project and work history." },
  { icon: Gauge, title: "Resume Score", desc: "A transparent score benchmarked against role requirements and market standards." },
  { icon: BrainCircuit, title: "AI Technical Interview", desc: "Adaptive interviews generated only from the skills listed on the candidate's resume." },
  { icon: LayoutDashboard, title: "Company Dashboard", desc: "A single view of every applicant, ranked and filtered by verified skill match." },
  { icon: UserCircle, title: "Candidate Dashboard", desc: "Track applications, scores, and feedback across every company in one place." },
  { icon: ShieldCheck, title: "Bias-Free Screening", desc: "Structured, skill-first evaluation that removes noise from the shortlist." },
  { icon: FileEdit, title: "Resume Editing", desc: "Refine and update resumes anytime, with instant re-parsing and re-scoring." },
  { icon: Building2, title: "Multi-Company Applications", desc: "One upload, unlimited applications — no repeated forms or duplicate resumes." },
  { icon: ClipboardList, title: "Interview Reports", desc: "Detailed breakdowns of technical performance, communication, and confidence." },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="section-padding relative bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Platform Capabilities</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Everything hiring needs, <span className="text-gradient">built on AI</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From parsing to placement — one platform that understands skills, not just keywords.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass group relative rounded-2xl p-7 shadow-glass transition-shadow duration-300 hover:shadow-glow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
