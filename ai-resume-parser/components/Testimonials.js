"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "We cut our first-round screening time by more than half. The skill match is remarkably accurate.",
    name: "Priya Nandakumar",
    role: "Head of Talent, Vertex Cloud",
  },
  {
    quote: "The AI interview asked me questions specific to my actual projects — not generic trivia. It felt fair.",
    name: "Arjun Mehta",
    role: "Software Engineer, Candidate",
  },
  {
    quote: "Our placement cell processes hundreds of resumes every season. This platform made shortlisting effortless.",
    name: "Dr. Kavitha Rao",
    role: "Placement Officer, Northgate University",
  },
  {
    quote: "Better hires, faster, with a lot less noise in our pipeline. Exactly what our HR team needed.",
    name: "Daniel Osei",
    role: "VP People, Orbital Labs",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="eyebrow">What People Say</span>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Trusted by <span className="text-gradient">candidates & companies</span>
        </h2>

        <div className="relative mt-14 min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-10 shadow-glass"
            >
              <Quote className="mx-auto h-8 w-8 text-primary/40" />
              <p className="mt-5 text-lg leading-relaxed text-ink">
                “{TESTIMONIALS[index].quote}”
              </p>
              <p className="mt-6 font-display font-semibold text-ink">{TESTIMONIALS[index].name}</p>
              <p className="text-sm text-slate-500">{TESTIMONIALS[index].role}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white p-2.5 shadow-glass hover:shadow-glow transition-shadow focus-ring hidden sm:block"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white p-2.5 shadow-glass hover:shadow-glow transition-shadow focus-ring hidden sm:block"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
