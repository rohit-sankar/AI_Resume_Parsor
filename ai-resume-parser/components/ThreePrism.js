"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud, ScanText, ListChecks, BrainCircuit, FileBarChart, Send } from "lucide-react";

const PrismScene = dynamic(() => import("./PrismScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin-slow rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  ),
});

const STAGES = [
  { icon: UploadCloud, title: "Resume Upload", desc: "The candidate's resume is uploaded and stored securely." },
  { icon: ScanText, title: "Resume Parsing", desc: "AI reads the document and structures its raw content." },
  { icon: ListChecks, title: "Skill Analysis", desc: "Skills, projects, and experience are matched against role requirements." },
  { icon: BrainCircuit, title: "AI Interview", desc: "An adaptive interview probes the exact skills on the resume." },
  { icon: FileBarChart, title: "Evaluation", desc: "Technical, communication, and confidence scores are generated." },
  { icon: Send, title: "HR Selection", desc: "Top-matched candidates are sent directly to the hiring team." },
];

export default function ThreePrism() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    let ctx;
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            const idx = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
            setActiveStage(idx);
          },
        });
      }, sectionRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  };

  const ActiveIcon = STAGES[activeStage].icon;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-blue-50/40 to-white"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0 bg-blob-gradient opacity-60 blur-3xl" />

        <div className="relative z-10 mb-10 text-center">
          <span className="eyebrow">The Engine Behind It All</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            One resume, <span className="text-gradient">six stages</span>
          </h2>
        </div>

        <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* 3D canvas */}
          <div className="relative h-[380px] w-full sm:h-[460px]" onMouseMove={handlePointerMove}>
            <PrismScene progressRef={progressRef} pointerRef={pointerRef} />
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              {STAGES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                    i === activeStage ? "bg-primary" : "bg-primary/15"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong rounded-3xl p-8 shadow-glow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-glow">
                  <ActiveIcon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <p className="mt-5 eyebrow">Stage {activeStage + 1} / {STAGES.length}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {STAGES[activeStage].title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{STAGES[activeStage].desc}</p>
              </motion.div>
            </AnimatePresence>

            <p className="text-sm text-slate-400">Scroll to rotate the prism through every stage.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
