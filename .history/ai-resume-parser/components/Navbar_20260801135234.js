"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Companies", href: "#companies" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(37,99,235,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group focus-ring rounded-lg">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-accent shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
            <ScanLine className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            AI Resume Parser
          </span>
        </a>

        {/* Center links */}
        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200 focus-ring rounded after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="px-5 py-2.5 text-sm font-medium text-ink rounded-full hover:bg-primary/5 transition-colors duration-200 focus-ring">
            Login
          </button>
          <button className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-primary to-primary-light shadow-[0_0_0_0_rgba(37,99,235,0.5)] hover:shadow-[0_0_24px_4px_rgba(37,99,235,0.45)] transition-shadow duration-300 focus-ring">
            Sign Up
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-primary/5 focus-ring"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6 text-ink" /> : <Menu className="h-6 w-6 text-ink" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-primary/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-base font-medium text-slate-700 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <div className="flex gap-3 pt-3">
              <link href="/login"></link>
                <button className="flex-1 px-5 py-2.5 text-sm font-medium border border-primary/20 rounded-full">
                  Login
                </button>
                
                <button className="flex-1 px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-primary to-primary-light">
                  Sign Up
                </button>

              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
