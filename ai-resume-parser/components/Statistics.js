"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { value: 10000, suffix: "+", label: "Candidates" },
  { value: 500, suffix: "+", label: "Companies" },
  { value: 95, suffix: "%", label: "Accuracy" },
  { value: 70, suffix: "%", label: "Reduction in Hiring Time" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-semibold text-white sm:text-6xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-primary-light py-24">
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-2 gap-10 px-6 text-center lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-blue-100">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
