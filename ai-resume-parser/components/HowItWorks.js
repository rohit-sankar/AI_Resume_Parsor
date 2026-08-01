"use client";

import { useEffect, useRef } from "react";
import {
  UploadCloud,
  Building2,
  ScanText,
  ListFilter,
  BrainCircuit,
  FileBarChart,
  Send,
} from "lucide-react";

const STEPS = [
  {
    icon: UploadCloud,
    title: "Sign up & upload",
    desc: "Candidate signs up and uploads a resume, stored securely on the platform.",
  },
  {
    icon: Building2,
    title: "Apply to any company",
    desc: "Candidate applies to any registered company using that single resume.",
  },
  {
    icon: ScanText,
    title: "AI parses the resume",
    desc: "Skills, projects, education, experience, and certifications are extracted automatically.",
  },
  {
    icon: ListFilter,
    title: "Skill matching",
    desc: "The system compares candidate skills with company requirements — only eligible candidates advance.",
  },
  {
    icon: BrainCircuit,
    title: "AI interview",
    desc: "An AI interview assistant asks questions based only on the skills listed on the resume — Java, Python, React, ML, SQL, Cloud, and more.",
  },
  {
    icon: FileBarChart,
    title: "Evaluation report",
    desc: "AI generates skill scores, communication score, confidence, technical performance, and an overall recommendation.",
  },
  {
    icon: Send,
    title: "HR selection",
    desc: "The selected candidate list is sent to HR — the remaining hiring process is handled by the company.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    let ctx;
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );

        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
              },
            }
          );
        });
      }, sectionRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding relative bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The Process</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            From upload to <span className="text-gradient">offer</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Seven steps take a resume from upload to a shortlisted, interview-scored candidate.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Track line */}
          <div className="absolute left-6 top-0 h-full w-px bg-slate-200 sm:left-1/2 sm:-translate-x-1/2">
            <div ref={lineRef} className="h-full w-px bg-gradient-to-b from-primary to-primary-accent" />
          </div>

          <div className="space-y-14">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  ref={(el) => (stepRefs.current[i] = el)}
                  className={`relative flex items-start gap-6 sm:w-1/2 ${
                    isLeft ? "sm:pr-12" : "sm:ml-auto sm:pl-12 sm:flex-row-reverse sm:text-right"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white shadow-glow sm:absolute sm:top-0 ${
                      isLeft ? "sm:-right-6" : "sm:-left-6"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>

                  <div className="glass ml-16 w-full rounded-2xl p-6 shadow-glass sm:ml-0">
                    <span className="eyebrow">Step {i + 1}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
