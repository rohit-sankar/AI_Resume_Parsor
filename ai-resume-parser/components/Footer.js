import { ScanLine, Twitter, Linkedin, Github, Mail } from "lucide-react";

const LINK_GROUPS = [
  {
    title: "Product",
    links: ["Features", "How It Works", "Companies", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-accent shadow-glow">
                <ScanLine className="h-5 w-5 text-white" strokeWidth={2.25} />
              </span>
              <span className="font-display font-semibold text-lg text-ink">AI Resume Parser</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              AI-powered resume parsing and skill validation — connecting the right
              candidates with the right companies, faster.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-200 hover:border-primary/30 hover:text-primary focus-ring"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-sm font-semibold text-ink">{group.title}</h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors duration-200 hover:text-primary focus-ring"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} AI Resume Parser. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
