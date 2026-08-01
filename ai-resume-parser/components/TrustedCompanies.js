"use client";

const COMPANIES = [
  "NexaWorks",
  "Vertex Cloud",
  "Orbital Labs",
  "Northgate Tech",
  "Lumen Systems",
  "Pinnacle Soft",
  "Quantix",
  "Skyline Robotics",
];

export default function TrustedCompanies() {
  const track = [...COMPANIES, ...COMPANIES];

  return (
    <section className="border-y border-primary/10 bg-white py-10">
      <p className="mb-6 text-center eyebrow text-slate-400">Trusted by forward-thinking teams</p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-16">
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center whitespace-nowrap font-display text-xl font-semibold text-slate-300 transition-colors duration-300 hover:text-primary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
