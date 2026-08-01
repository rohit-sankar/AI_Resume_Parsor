'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ScanLine,
  BadgeCheck,
  GraduationCap,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

/* -------------------------------------------------------------------------
 * Config
 * ---------------------------------------------------------------------- */

const GOOGLE_CLIENT_ID = '896020754462-9n28uiraj97ola7utnb3qpvkaq1b7qao.apps.googleusercontent.com';

/* -------------------------------------------------------------------------
 * Signature visual: an animated "resume scan" illustration.
 * A scanning beam sweeps down a stylised resume document and, as it
 * passes each block of text, peels off a labelled data tag — this is the
 * one thing on the page that visually states what the product does
 * (parses a resume into structured fields) rather than illustrating
 * "AI" in the abstract.
 * ---------------------------------------------------------------------- */

const EXTRACTED_TAGS = [
  { label: 'Experience', icon: Briefcase, delay: 0.2, top: '18%' },
  { label: 'Education', icon: GraduationCap, delay: 1.1, top: '46%' },
  { label: 'Verified Skills', icon: BadgeCheck, delay: 2.0, top: '74%' },
];

function ResumeScanIllustration() {
  return (
    <div className="relative mx-auto h-[420px] w-[320px] select-none">
      {/* Ambient gradient blobs */}
      <motion.div
        className="absolute -left-16 -top-10 h-64 w-64 rounded-full bg-[#60A5FA]/30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-14 -right-10 h-72 w-72 rounded-full bg-[#3B82F6]/25 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const size = 3 + ((i * 7) % 5);
        const left = (i * 37) % 100;
        const duration = 6 + (i % 5);
        const delay = (i % 7) * 0.4;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#93C5FD]"
            style={{ left: `${left}%`, width: size, height: size, top: '100%' }}
            animate={{ top: ['100%', '-5%'], opacity: [0, 0.9, 0] }}
            transition={{ duration, repeat: Infinity, delay, ease: 'linear' }}
          />
        );
      })}

      {/* The resume document */}
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.35)] backdrop-blur-sm">
        {/* Header block */}
        <div className="space-y-2 border-b border-blue-100 p-5">
          <div className="h-3 w-24 rounded-full bg-[#2563EB]/70" />
          <div className="h-2 w-32 rounded-full bg-blue-200" />
        </div>

        {/* Body lines, grouped to loosely resemble resume sections */}
        <div className="space-y-4 p-5">
          {[0, 1, 2].map((section) => (
            <div key={section} className="space-y-1.5">
              <div className="h-2 w-16 rounded-full bg-[#60A5FA]/70" />
              <div className="h-1.5 w-full rounded-full bg-slate-100" />
              <div className="h-1.5 w-5/6 rounded-full bg-slate-100" />
              <div className="h-1.5 w-2/3 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>

        {/* Scanning beam */}
        <motion.div
          className="absolute inset-x-0 h-14"
          style={{
            background:
              'linear-gradient(180deg, rgba(37,99,235,0) 0%, rgba(96,165,250,0.35) 45%, rgba(37,99,235,0.55) 50%, rgba(96,165,250,0.35) 55%, rgba(37,99,235,0) 100%)',
          }}
          animate={{ top: ['-15%', '105%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
        <motion.div
          className="absolute inset-x-3 h-[2px] bg-[#2563EB] shadow-[0_0_12px_2px_rgba(37,99,235,0.8)]"
          animate={{ top: ['-2%', '100%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
      </div>

      {/* Extracted data tags peeling off to the side */}
      {EXTRACTED_TAGS.map(({ label, icon: Icon, delay, top }) => (
        <motion.div
          key={label}
          className="absolute right-[-18px] flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#2563EB] shadow-lg shadow-blue-500/10 backdrop-blur-sm"
          style={{ top }}
          initial={{ opacity: 0, x: -30, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1, 0], x: [-30, 24, 24, 40], scale: [0.8, 1, 1, 0.9] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            delay,
            times: [0, 0.18, 0.82, 1],
            ease: 'easeInOut',
          }}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Reusable animated text input
 * ---------------------------------------------------------------------- */

function AnimatedField({
  id,
  label,
  type,
  value,
  onChange,
  icon: Icon,
  placeholder,
  rightSlot,
  error,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <span
          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            focused ? 'text-[#2563EB]' : 'text-slate-400'
          }`}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={type === 'password' ? 'current-password' : 'email'}
          className={`w-full rounded-xl border bg-white/70 py-3 pl-11 ${
            rightSlot ? 'pr-11' : 'pr-4'
          } text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-all duration-200 ${
            error
              ? 'border-red-300 focus:border-red-400'
              : 'border-slate-200 focus:border-[#2563EB]'
          }`}
        />

        {rightSlot}

        {/* Animated focus underline/glow */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-xl"
          initial={false}
          animate={{
            boxShadow: focused
              ? '0 0 0 3.5px rgba(37,99,235,0.15), 0 0 20px -4px rgba(37,99,235,0.35)'
              : '0 0 0 0px rgba(37,99,235,0)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-xs font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Google icon (inline SVG — official 4-colour mark)
 * ---------------------------------------------------------------------- */

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.9 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 35 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.8l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.2 5.8l6.6 5.6C40.8 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * Main Login component
 * ---------------------------------------------------------------------- */

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = useCallback(() => {
    const next = {};
    if (!email.trim()) {
      next.email = 'Enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!password) {
      next.password = 'Enter your password.';
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      setLoading(true);
      try {
        // Replace with your real authentication call, e.g.:
        // await signIn({ email, password, remember });
        await new Promise((resolve) => setTimeout(resolve, 1600));
      } finally {
        setLoading(false);
      }
    },
    [validate, email, password, remember]
  );

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      // Send credentialResponse.credential to your backend for verification.
      // await signInWithGoogle(credentialResponse.credential);
      console.log('Google credential:', credentialResponse.credential);
    } finally {
      setGoogleLoading(false);
    }
  }, []);

  const handleGoogleError = useCallback(() => {
    setErrors((prev) => ({ ...prev, google: 'Google sign-in failed. Please try again.' }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md"
    >
      {/* Glowing border wrapper */}
      <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#60A5FA] via-[#2563EB]/60 to-[#3B82F6] opacity-40 blur-sm" />

      <div className="relative rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-[0_30px_80px_-20px_rgba(37,99,235,0.35)] backdrop-blur-2xl sm:p-10">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]"
          >
            Welcome back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="mt-2 text-sm text-slate-500"
          >
            Sign in to continue.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <AnimatedField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            placeholder="you@company.com"
            error={errors.email}
          />

          <AnimatedField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            placeholder="••••••••"
            error={errors.password}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#2563EB]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            }
          />

          <div className="flex items-center justify-between pt-1">
            <label
              htmlFor="remember"
              className="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-600"
            >
              <span className="relative flex h-4.5 w-4.5 items-center justify-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="peer sr-only"
                />
                <span className="h-4.5 w-4.5 rounded-md border border-slate-300 bg-white/80 transition-all peer-checked:border-[#2563EB] peer-checked:bg-[#2563EB]" />
                <motion.svg
                  viewBox="0 0 12 10"
                  className="pointer-events-none absolute h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100"
                  style={{ opacity: remember ? 1 : 0 }}
                >
                  <motion.path
                    d="M1 5L4.5 8.5L11 1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: remember ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.svg>
              </span>
              Remember me
            </label>

            <a
              href="/forgot-password"
              className="text-sm font-medium text-[#2563EB] transition-opacity hover:opacity-70"
            >
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.015 }}
            whileTap={{ scale: loading ? 1 : 0.985 }}
            className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#2563EB] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-80"
          >
            <AnimatePresence mode="wait" initial={false}>
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Signing in…
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Log in
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <div className="my-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Or</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="flex justify-center">
          <div className="w-full [&>div]:!w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              shape="pill"
              size="large"
              width="100%"
              text="continue_with"
            />
          </div>
        </div>

        {/* Fallback styled button shown while the official widget loads / for reference of hover styling */}
        {googleLoading && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting to Google…
          </div>
        )}

        {errors.google && (
          <p className="mt-3 text-center text-xs font-medium text-red-500">{errors.google}</p>
        )}

        <p className="mt-8 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="group relative font-semibold text-[#2563EB]">
            Create account
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#2563EB] transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default function Login() {
  const providerId = useMemo(() => GOOGLE_CLIENT_ID, []);

  return (
    <GoogleOAuthProvider clientId={providerId}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative flex min-h-screen w-full overflow-hidden bg-white"
      >
        {/* Soft global background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(96,165,250,0.18),transparent),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(37,99,235,0.12),transparent)]" />

        {/* Left: illustration panel (desktop only) */}
        <div className="relative hidden w-1/2 flex-col items-center justify-center px-12 lg:flex">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#2563EB] shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Hiring
          </motion.div>

          <ResumeScanIllustration />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-900"
          >
            Welcome back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-2 max-w-xs text-center text-sm text-slate-500"
          >
            Continue your hiring journey, powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 flex items-center gap-1.5 text-xs text-slate-400"
          >
            <ScanLine className="h-3.5 w-3.5 text-[#60A5FA]" />
            Parsing resumes in real time
          </motion.div>
        </div>

        {/* Right: login card */}
        <div className="relative flex w-full flex-1 items-center justify-center px-5 py-12 sm:px-10 lg:w-1/2">
          <LoginForm />
        </div>
      </motion.main>
    </GoogleOAuthProvider>
  );
}