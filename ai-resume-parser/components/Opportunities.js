"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  UserPlus,
  Code2,
  Users,
  Rocket,
  Building,
  School,
  Briefcase,
  Landmark,
} from "lucide-react";

const GROUPS = [
  { icon: GraduationCap, label: "Students" },
  { icon: UserPlus, label: "Freshers" },
  { icon: Code2, label: "Experienced Developers" },
  { icon: Users, label: "HR Teams" },
  { icon: Rocket, label: "Startups" },
  { icon: Building, label: "Large Enterprises" },
  { icon: School, label: "Placement Cells" },
  { icon: Landmark, label: "Universities" },
  { icon: Briefcase, label: "Recruitment Agencies" },
];

export default function Opportunities() {
  return (
    <section className="section-padding bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 text-center">
        <span className="eyebrow">Built For Everyone in Hiring</span>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          One platform, <span className="text-gradient">every stakeholder</span>
        </h2>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {GROUPS.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="glass flex items-center gap-2.5 rounded-full px-5 py-3 shadow-glass hover:shadow-glow transition-shadow duration-300"
            >
              <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={2} />
              <span className="text-sm font-medium text-ink">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
