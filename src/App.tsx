import React, {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Calendar,
  TrendingUp,
  FileText,
  Lock,
  XCircle,
  Layers,
  Activity,
  BarChart3,
  ArrowRight,
  Loader2,
  ChevronDown,
  Download,
  Users,
  User,
  UserPlus,
  Zap,
  Check,
  ArrowUpRight,
  LineChart as LineChartIcon,
  HelpCircle,
  Info,
  Clock,
  AlertTriangle,
  Award,
  Swords,
  Timer,
  Calculator,
  ListChecks,
  Linkedin,
  MessageCircle,
  ArrowUp,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  CheckMark as CheckCircle,
  SolidCheck,
  Shield,
  Trophy,
  TrophyGold,
  SealBadge,
  BrainChess as BrainCircuit,
  Target,
  BookOpen,
  PlayCircle,
  CalendarCheck,
  SparkStar as Star,
  FocusIcon,
  LogicIcon,
  MathIcon,
  PatienceIcon,
  ConfidenceIcon,
} from "./components/Icons";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CountUp from "react-countup";
// Heavy viz deps are loaded on-demand via React.lazy / dynamic import()
// — see StarPerformers (Tilt), ParentAssessmentQuiz & InteractivePuzzle (confetti).
const Tilt = lazy(() => import("react-parallax-tilt"));

// Legal pages are code-split — ~15KB off main bundle, loads only when visited.
const PrivacyPolicy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import("./pages/Legal").then((m) => ({ default: m.TermsOfService })));
const RefundPolicy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.RefundPolicy })));
const CookiePolicy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.CookiePolicy })));
const Disclaimer = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Disclaimer })));
import { Toaster, toast } from "sonner";
// BrowserRouter is mounted in main.tsx; App.tsx only needs Routes/Route/Link.
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { captureAttribution, getAttribution } from "@/src/lib/attribution";
import {
  trackPageView,
  trackViewContent,
  trackLeadFormStart,
  trackLeadStep2,
} from "@/src/lib/tracking";
import { buildWhatsAppHref, onWhatsAppClick } from "@/src/lib/whatsapp";
// Cloudflare Turnstile was previously imported from "@/src/lib/turnstile".
// It's been removed from the form because the widget was silently failing
// for Indian mobile users (blank widget area, no error, "Verifying..." stuck
// forever). Backend defences remain: honeypot, 8s time-gate, origin allowlist.

const ThankYou = lazy(() => import("./pages/ThankYou"));

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Utility ─── */
function scrollToForm() {
  document.getElementById("book-evaluation")?.scrollIntoView({ behavior: "smooth" });
}
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
function getNextCohortDate() {
  const d = new Date();
  d.setDate(d.getDate() + (7 - d.getDay() + 1) % 7 + 2); // Next Wednesday
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* ─── Motion variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 24, mass: 0.8 } 
  },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ════════════════════════════════════════════════
   STICKY TOP NAVIGATION
   ════════════════════════════════════════════════ */
function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "gs-glass py-2 md:py-3" : "bg-white border-b border-slate-200 py-3 md:py-4"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="ChessWize — back to top"
          className="flex items-center gap-2 md:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
        >
          <img src="/logo-side-black-v2.svg" alt="ChessWize Logo" className="h-7 md:h-9 w-auto object-contain" />
        </button>
        <nav className="hidden lg:flex items-center gap-8">
          {["Programs", "Mentors", "Testimonials", "Methodology", "Tuition"].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))} className="text-[13px] font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest-gs transition-colors">
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:gap-5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest-gs">Limited Seats</span>
            <span className="text-xs font-bold text-slate-600">Book a Free Demo Class</span>
          </div>
          <Button onClick={scrollToForm} className="gs-btn gs-btn-primary rounded-lg font-bold tracking-tight-gs px-4 md:px-6 h-9 md:h-11 text-xs md:text-sm shadow-md">
            Book Free Demo
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ════════════════════════════════════════════════
   HERO — High Density, Conversion Optimized
   ════════════════════════════════════════════════ */
function Hero() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [muted, setMuted] = useState(true);
  const [heroAge, setHeroAge] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalRef = useRef<VideoModalHandle | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Belt-and-suspenders Safari kick: once the element mounts, force autoplay.
  // Safari/WebKit occasionally drops muted autoplay if the tab wasn't visible
  // during initial paint or if the element mounts inside a hidden container.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) {
      return;
    }
    v.muted = true;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    tryPlay();

    // Retry once on the next frame — Safari sometimes rejects the first call.
    const id = requestAnimationFrame(tryPlay);

    // Also retry when the browser confirms media readiness. Safari is more
    // reliable when play() is tied to `loadedmetadata` / `canplay` than to an
    // arbitrary frame after hydration.
    const onReady = () => {
      tryPlay();
    };
    v.addEventListener("loadedmetadata", onReady);
    v.addEventListener("canplay", onReady);

    return () => {
      cancelAnimationFrame(id);
      v.removeEventListener("loadedmetadata", onReady);
      v.removeEventListener("canplay", onReady);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    // Flip mute SYNCHRONOUSLY inside the click handler so Safari stays
    // inside the user-gesture window. If the video happens to be paused
    // (autoplay intervention, tab-change, etc.), also kick play().
    v.muted = !v.muted;
    setMuted(v.muted);
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Safari still rejected — surface stays paused; user can re-click
        // which will come in as a fresh gesture.
      });
    }
  };

  const openHeroVideoModal = () => {
    modalRef.current?.primeAndPlay();
    setShowVideoModal(true);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-slate-50 gs-grid-pattern overflow-hidden border-b border-slate-200">
      <div className="absolute top-0 right-0 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-blue-600/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-amber-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col xl:flex-row gap-10 lg:gap-16 items-center">
          
          {/* Left Copy Side */}
          <div className="w-full xl:w-[55%] flex flex-col gap-5 md:gap-6">
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-extrabold tracking-tighter-gs text-slate-900 leading-[1.12]">
              Help your child{' '}
              <span className="text-gradient-primary">think deeper,</span>{' '}
              not scroll longer.
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-[1.6] max-w-2xl tracking-tight-gs">
              Structured online chess coaching by FIDE-rated masters. Small batches of six, same coach every session, real improvement you can see on the dashboard.
            </p>

            <div className="bg-white p-5 md:p-6 rounded-2xl depth-panel mt-1 md:mt-2 max-w-xl relative overflow-hidden hover-lift">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest-gs mb-4 flex items-center gap-2">
                <Target className="size-4 text-blue-600" /> Book My Child&apos;s Free Demo
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <select
                    aria-label="Select your child's age range"
                    value={heroAge}
                    onChange={(e) => setHeroAge(e.target.value)}
                    className="w-full px-4 py-3.5 text-sm md:text-base border-2 border-slate-200 rounded-xl bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer hover:border-slate-300 shadow-sm"
                  >
                    <option value="">Select Child&apos;s Age</option>
                    <option value="4-6">4 - 6 Years</option>
                    <option value="7-9">7 - 9 Years</option>
                    <option value="10-12">10 - 12 Years</option>
                    <option value="13+">13+ Years</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-slate-500 pointer-events-none" />
                </div>
                <Button
                  onClick={() => {
                    // Persist the hero's age selection so the BottomForm picks it up.
                    try { sessionStorage.setItem("cw.hero.age", heroAge); } catch { /* sessionStorage may be blocked */ }
                    scrollToForm();
                  }}
                  size="lg"
                  className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 gs-btn gs-btn-primary rounded-xl text-sm md:text-base font-bold transition-all"
                >
                  Book Free Demo <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              {/* Secondary WhatsApp CTA */}
              <a
                href={buildWhatsAppHref({ source: "hero" })}
                onClick={onWhatsAppClick("hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 h-11 md:h-12 w-full rounded-xl border-2 border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold text-xs md:text-sm transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Or ask us on WhatsApp
              </a>
              {/* Trust strip */}
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 mt-3">
                <span className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s)=><Star key={s} className="size-3 fill-emerald-500 text-emerald-500" />)}
                  </div>
                  <span>1,500+ parents</span>
                </span>
                <span className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-500">
                  <CalendarCheck className="size-3.5 text-amber-600" />
                  Next batch {getNextCohortDate()}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-emerald-700">
                  <Shield className="size-3.5" />
                  Refund on unused sessions
                </span>
              </div>
            </div>

            {/* Counselor strip — live human handler for the demo booking */}
            <div className="mt-4 flex items-center gap-3 max-w-xl">
              <div className="relative shrink-0">
                <img
                  src="/counselor-avatar.webp"
                  alt="Priya Sharma, Academic Counsellor"
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover ring-2 ring-white shadow-md"
                  loading="lazy"
                />
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-white" aria-hidden="true">
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-emerald-500"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </span>
              </div>
              <div className="text-[11px] md:text-xs leading-snug">
                <p className="font-extrabold text-slate-900">
                  You&apos;ll talk to <span className="text-blue-600">Priya Sharma</span>, Academic Counsellor
                </p>
                <p className="text-slate-500 font-medium">
                  Replies on WhatsApp in &lt;10&nbsp;min · 10&nbsp;AM–8&nbsp;PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Right Media Side - Student Testimonial (inline + modal) */}
          <div className="w-full xl:w-[45%] mt-6 lg:mt-0">
            <div className="glass-panel p-2.5 md:p-3 rounded-2xl md:rounded-3xl gs-shadow-xl gs-border relative hover-lift">
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-24 md:w-32 h-24 md:h-32 bg-blue-400/20 blur-2xl md:blur-3xl rounded-full pointer-events-none" />
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 group shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] aspect-square">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                  preload="metadata"
                  poster="/testimonial-kid-1-poster.webp"
                  src="/testimonial-kid-1.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Bottom-only gradient — just enough to keep the caption legible, no darkening of the face */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

                {/* Top-left: badge */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 pointer-events-none">
                  <Badge className="bg-slate-950/60 backdrop-blur-md text-white border border-white/15 font-bold px-2 py-1 rounded-md uppercase tracking-widest-gs text-[9px]">Student Testimonial</Badge>
                </div>

                {/* Top-right: Mute/Unmute toggle — plays inline with sound */}
                <motion.button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute and play inline" : "Mute video"}
                  aria-pressed={!muted}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-20 size-10 md:size-11 rounded-full bg-slate-950/60 hover:bg-slate-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={muted ? "muted" : "unmuted"}
                      initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-center"
                    >
                      {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                {/* Hint when muted — "Tap for sound", breathing animation */}
                <AnimatePresence>
                  {muted && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: 0.4 }}
                      className="absolute top-14 md:top-16 right-3 md:right-4 z-20 pointer-events-none"
                    >
                      <motion.div
                        animate={prefersReducedMotion ? undefined : { y: [0, -2, 0] }}
                        transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-slate-950/60 backdrop-blur-md border border-white/15 rounded-md px-2 py-1 text-[10px] font-bold text-white shadow-lg whitespace-nowrap"
                      >
                        Tap for sound
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom caption + big play → opens modal */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 text-left">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0 pointer-events-none">
                      <h3 className="text-white font-extrabold text-lg md:text-xl tracking-tight-gs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Meet a ChessWize student</h3>
                      <p className="text-slate-200 text-xs md:text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Tap ▶ for fullscreen · 🔊 for sound</p>
                    </div>
                    <motion.button
                      type="button"
                      onClick={openHeroVideoModal}
                      aria-label="Open student testimonial in fullscreen"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                      className="relative size-12 md:size-14 rounded-full bg-blue-600 backdrop-blur-md flex items-center justify-center border border-white/20 gs-shadow-lg ring-4 ring-blue-500/30 shrink-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
                    >
                      {!prefersReducedMotion && (
                        <motion.span
                          className="absolute inset-0 rounded-full ring-2 ring-white/40"
                          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          aria-hidden="true"
                        />
                      )}
                      <PlayCircle className="size-6 md:size-6 text-white relative z-10" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        ref={modalRef}
        open={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        src="/testimonial-kid-1.mp4"
        poster="/testimonial-kid-1-poster.webp"
        label="Student testimonial"
        portrait
      />
    </section>
  );
}

/* ════════════════════════════════════════════════
   PROGRAM STATS (Animated Numbers)
   ════════════════════════════════════════════════ */
function ProgramStats() {
  const stats = [
    { value: 150, suffix: "+", label: "Avg. Elo Gain", desc: "First 90 Days" },
    { value: 6, prefix: "Max ", label: "Students per Batch", desc: "Rigorous attention" },
    { value: 92, suffix: "%", label: "Win Rate Up", desc: "In local tournaments" },
    { value: 10, suffix: "+", label: "Years Experience", desc: "Elite Pedagogy" },
  ];

  return (
    <section className="py-12 md:py-16 bg-white text-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-emerald-900/20"></div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-4 gap-x-4 divide-x-0 md:divide-x divide-slate-200">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center px-2 md:px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: i * 0.08 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter-gs text-slate-900 mb-2 tabular-nums flex items-baseline"
              >
                {s.prefix && <span className="text-2xl sm:text-3xl md:text-4xl tracking-tight-gs mr-1">{s.prefix}</span>}
                <CountUp end={s.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                {s.suffix && <span className="text-2xl sm:text-3xl md:text-4xl tracking-tight-gs ml-1">{s.suffix}</span>}
              </motion.div>
              <span className="text-xs md:text-sm font-bold text-blue-600 mb-1 uppercase tracking-widest-gs">{s.label}</span>
              <span className="text-[10px] md:text-xs text-slate-600 font-medium">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ════════════════════════════════════════════════
   NEW: PARENT COGNITIVE ASSESSMENT QUIZ
   ════════════════════════════════════════════════ */
function ParentAssessmentQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [calculating, setCalculating] = useState(false);
  const [calcPhase, setCalcPhase] = useState("");
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "How does your child typically react after losing a game or failing a task?",
      opts: [
        { text: "Gets emotional/frustrated and wants to quit immediately.", score: 1 },
        { text: "Indifferent. They shrug and move on to the next thing quickly.", score: 2 },
        { text: "Wants to know *why* they lost and tries to fix the mistake.", score: 3 }
      ]
    },
    {
      q: "When given a complex puzzle or math problem, what is their attention span?",
      opts: [
        { text: "Loses focus under 5 minutes without constant stimulation.", score: 1 },
        { text: "Can focus for 10-15 minutes if guided by an adult.", score: 2 },
        { text: "Will sit for 30+ minutes completely absorbed until solved.", score: 3 }
      ]
    },
    {
      q: "How do they approach making decisions under pressure?",
      opts: [
        { text: "Highly impulsive. They choose the first option that looks good.", score: 1 },
        { text: "They hesitate, panic, or look for validation before acting.", score: 2 },
        { text: "Calculated. They silently weigh 2-3 options before acting.", score: 3 }
      ]
    },
    {
      q: "When learning something new, what is their learning style?",
      opts: [
        { text: "Relies entirely on memorizing facts without understanding.", score: 1 },
        { text: "Understands the basics but struggles to apply them creatively.", score: 2 },
        { text: "Constantly asks 'why' and tries to find underlying patterns.", score: 3 }
      ]
    },
    {
      q: "How do they handle delayed gratification?",
      opts: [
        { text: "Must have immediate rewards; struggles to plan ahead.", score: 1 },
        { text: "Can wait if the reward is explicitly promised and visible.", score: 2 },
        { text: "Willing to sacrifice short-term wins for a larger long-term goal.", score: 3 }
      ]
    }
  ];

  const handleSelect = (qIndex: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qIndex]: score }));
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setCalculating(true);
      
      setTimeout(() => setCalcPhase("Analyzing behavioral traits..."), 0);
      setTimeout(() => setCalcPhase("Evaluating emotional resilience markers..."), 1000);
      setTimeout(() => setCalcPhase("Calculating strategic patience quotient..."), 2000);
      setTimeout(() => setCalcPhase("Generating comprehensive diagnostic..."), 3000);

      setTimeout(async () => {
        setCalculating(false);
        setShowResult(true);
        toast.success("Profile Analyzed Successfully", {
          description: "We have determined the optimal development track for your child."
        });

        // Fire confetti for the achievement — dynamic import keeps canvas-confetti out of main bundle
        const confetti = (await import("canvas-confetti")).default;
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

      }, 4000);
    }
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const getProfile = () => {
    if (totalScore <= 7) return { title: "The Unstructured Tactician", desc: "Your child has raw potential but acts impulsively and struggles with emotional resilience. They lack a mental framework for decision making. They require our strict Foundation Programme to build patience before advancing.", track: "Foundation Programme", icon: Target, color: "text-blue-600", bg: "bg-blue-500/20", border: "border-blue-500/30" };
    if (totalScore <= 11) return { title: "The Cautious Planner", desc: "Your child has a good baseline attention span but lacks aggressive calculation and pattern recognition. They hesitate under pressure. They need our Tactical Vision training to build ruthless competitive confidence.", track: "Tactical Vision Programme", icon: Layers, color: "text-amber-600", bg: "bg-amber-500/20", border: "border-amber-500/30" };
    return { title: "The Analytical Competitor", desc: "Your child already possesses deep analytical traits, emotional composure, and strategic patience. They are primed for rigorous, tournament-level calculation training to maximize their FIDE potential.", track: "Tournament Masterclass", icon: Trophy, color: "text-emerald-600", bg: "bg-emerald-500/20", border: "border-emerald-500/30" };
  };

  const profile = getProfile();

  return (
    <section className="py-16 md:py-24 bg-slate-50 text-slate-900 relative overflow-hidden gs-grid-pattern border-b border-slate-200">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <Badge className="bg-blue-500/20 text-blue-600 border border-blue-500/30 rounded-full font-bold mb-4 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            <BrainCircuit className="size-3 mr-1.5 inline" /> Quick Assessment
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 leading-tight text-slate-900">
            Is your child ready for <span className="text-blue-600">serious growth?</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Take this 45-second assessment to map your child's learning profile. We use this to recommend the right batch and coach on your free demo call.
          </p>
        </div>

        <div className="bg-white backdrop-blur-xl border border-slate-200 rounded-3xl p-6 md:p-10 max-w-3xl mx-auto shadow-2xl shadow-blue-900/20 relative min-h-[450px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!calculating && !showResult && (
              <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col w-full">
                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    initial={{ width: `${(step / questions.length) * 100}%` }}
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest-gs">Question {step + 1} of {questions.length}</span>
                  <span className="text-xs font-semibold text-slate-400">{Math.round(((step + 1) / questions.length) * 100)}% complete</span>
                </div>
                <h4 className="text-xl md:text-2xl font-extrabold mb-8 leading-snug text-slate-900">{questions[step].q}</h4>
                <div className="flex flex-col gap-3">
                  {questions[step].opts.map((opt, i) => {
                    const label = String.fromCharCode(65 + i);
                    const isSelected = answers[step] === opt.score;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(step, opt.score)}
                        className={`text-left w-full p-4 md:p-5 rounded-xl border-2 transition-all font-medium text-sm md:text-base flex items-center gap-4 group
                          ${isSelected
                            ? 'border-blue-500 bg-blue-50 text-slate-900 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                            : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                          }`}
                      >
                        <span className={`shrink-0 size-9 rounded-lg flex items-center justify-center text-sm font-extrabold transition-all
                          ${isSelected
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-slate-400 border border-slate-200 group-hover:border-blue-400 group-hover:text-blue-500'
                          }`}>
                          {label}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        <ArrowRight className={`size-4 transition-all shrink-0 ${isSelected ? 'text-blue-600 opacity-100' : 'opacity-0 group-hover:opacity-60 text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {calculating && (
              <motion.div key="calc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center py-12">
                <div className="relative mb-8">
                   <div className="size-20 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <BrainCircuit className="size-8 text-blue-600 animate-pulse" />
                   </div>
                </div>
                <h4 className="text-xl font-extrabold mb-2 text-slate-900">Compiling Neuro-Metrics</h4>
                <p className="text-sm text-blue-600 font-bold uppercase tracking-widest-gs mt-2">{calcPhase}</p>
                <div className="w-64 h-1 bg-white rounded-full mt-6 overflow-hidden">
                   <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} className="h-full bg-blue-500" />
                </div>
              </motion.div>
            )}

            {showResult && (() => {
              const ProfIcon = profile.icon;
              return (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                <div className={`size-20 rounded-2xl ${profile.bg} border ${profile.border} flex items-center justify-center mb-6 shadow-xl`}>
                  <ProfIcon className={`size-10 ${profile.color}`} />
                </div>
                <Badge className="bg-white text-slate-700 border-slate-200 rounded-full font-bold mb-3 px-3 py-1 text-[9px] uppercase tracking-widest-gs">Profile Established</Badge>
                <h4 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tighter-gs mb-4">{profile.title}</h4>
                <p className="text-sm md:text-base text-slate-700 font-medium max-w-lg mb-8 leading-relaxed">
                  {profile.desc}
                </p>
                <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-xl w-full max-w-md mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest-gs block mb-2">Recommended Cohort Alignment</span>
                  <span className={`text-xl font-extrabold ${profile.color} flex items-center justify-center gap-2`}>
                    <Target className="size-5" /> {profile.track}
                  </span>
                </div>
                <Button onClick={() => {
                  const selectEl = document.getElementById("bottom_child_level") as HTMLSelectElement;
                  if (selectEl) { 
                    if(profile.track.includes("Foundation")) selectEl.value = "beginner";
                    if(profile.track.includes("Vision")) selectEl.value = "intermediate";
                    if(profile.track.includes("Tournament")) selectEl.value = "advanced";
                  }
                  scrollToForm();
                }} className="h-14 px-8 gs-btn gs-btn-primary rounded-xl text-base font-bold shadow-lg">
                  Secure Priority Evaluation Slot
                </Button>
              </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


/* ════════════════════════════════════════════════
   THE PROBLEM (Side-by-Side Enterprise Comparison)
   ════════════════════════════════════════════════ */
function TheProblem() {
  return (
    <section id="the-problem" className="py-16 md:py-24 bg-white border-b border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full lg:w-1/2 sticky top-24">
            <h2 className="text-[10px] font-bold text-blue-700 uppercase tracking-widest-gs mb-3 flex items-center gap-2">
              <AlertTriangle className="size-3" /> How We're Different
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 md:mb-6 leading-tight">
              Most chess classes teach moves. <span className="text-blue-600">We teach how to think.</span>
            </h3>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                Most children's screen time trains distraction, not focus. ChessWize flips that — live online classes with FIDE-certified coaches on a platform built for deep attention, so sitting still and thinking deeply become automatic skills that carry straight into school.
              </p>
            </div>
            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-4">
              <AlertTriangle className="size-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-extrabold text-slate-900 mb-1">Why Structured Evaluation Matters</p>
                <p className="text-xs text-slate-600 font-medium">Without structured evaluation, children plateau and lose confidence. We track five cognitive dimensions every week and adjust the plan when any metric stalls.</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-square relative group">
                <img loading="lazy" decoding="async" width={2816} height={1536} src="/2026-04-15-10-30-00-distracted-child-screen.webp" alt="A distracted child scrolling on an iPad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale sepia-[0.3]" />
                <div className="absolute top-2 left-2 bg-red-600 text-slate-50 text-[10px] font-extrabold uppercase tracking-widest-gs px-2 py-1 rounded shadow">Passive Scrolling</div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-square relative group">
                 <img loading="lazy" decoding="async" width={1200} height={806} src="/kid-chess-online-class-1200.webp" alt="A child analysing a chess position on a real board while his FIDE coach explains the move over a laptop video call — a ChessWize live class" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-2 left-2 bg-blue-600 text-slate-50 text-[10px] font-extrabold uppercase tracking-widest-gs px-2 py-1 rounded shadow">Purposeful Training</div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 gs-shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 blur-[40px] rounded-full pointer-events-none" />
              <h4 className="text-xl font-extrabold tracking-tight-gs text-slate-900 mb-6 text-center">Why parents switch to ChessWize</h4>
              
              <div className="flex flex-col gap-3">
                {/* Header Row */}
                <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] gap-2 mb-2 pb-2 border-b border-slate-200 text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest-gs text-slate-600">
                  <div>Feature</div>
                  <div className="text-center text-slate-500">Typical Class</div>
                  <div className="text-center text-blue-600">ChessWize Programme</div>
                </div>

                {[
                  { feature: "Instructor Caliber", bad: "Amateurs (1200 Elo)", good: "FIDE-Rated Masters" },
                  { feature: "Curriculum Design", bad: "Random Play", good: "Level-Based Syllabus" },
                  { feature: "Progress Tracking", bad: "None", good: "Move-by-move Analysis" },
                  { feature: "Class Density", bad: "15-20 Kids", good: "Strictly Max 6 Kids" },
                  { feature: "Parental Reporting", bad: "Guesswork", good: "Weekly Dashboards" },
                  { feature: "Psychology Training", bad: "Ignored", good: "Resilience Focused" }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] gap-2 items-center bg-white p-3 md:p-4 rounded-xl border border-slate-100 gs-shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="text-xs md:text-sm font-bold text-slate-800">{row.feature}</div>
                    <div className="text-center flex flex-col items-center gap-1.5">
                      <XCircle className="size-4 text-red-400" />
                      <span className="text-[9px] md:text-[10px] font-medium text-slate-500 text-center leading-none">{row.bad}</span>
                    </div>
                    <div className="text-center flex flex-col items-center gap-1.5 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                      <CheckCircle className="size-4 text-emerald-500" />
                      <span className="text-[9px] md:text-[10px] font-extrabold text-blue-800 text-center leading-none">{row.good}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={scrollToForm} className="w-full mt-8 h-14 gs-btn gs-btn-primary rounded-xl font-bold shadow-lg">
                Book Free Demo & Counseling <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   THE TRANSFORMATION
   ════════════════════════════════════════════════ */
function Transformation() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">The Paradigm Shift</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 md:mb-6 text-slate-900 leading-tight">
            We don't just teach chess. We build <span className="text-blue-600">Focus & Resilience.</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            A complete cognitive overhaul. Watch how your child transforms from easily distracted to deeply analytical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Before */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 lg:p-10 gs-shadow-sm">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="size-8 md:size-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-extrabold text-lg md:text-xl border border-red-200">X</div>
              <h4 className="text-xl md:text-2xl font-extrabold tracking-tight-gs text-slate-900">Before ChessWize</h4>
            </div>
            <ul className="space-y-6 md:space-y-8">
              <li className="flex items-start gap-3 md:gap-4">
                <div className="mt-1.5 size-2 md:size-2.5 rounded-full bg-red-400 shrink-0" />
                <div>
                  <p className="font-extrabold text-slate-800 text-base md:text-lg leading-snug">Screen-Addicted & Impulsive</p>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 md:mt-2 leading-relaxed">Plays the first move that looks good. Constantly distracted and lacks the patience to think through complex problems.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="mt-1.5 size-2 md:size-2.5 rounded-full bg-red-400 shrink-0" />
                <div>
                  <p className="font-extrabold text-slate-800 text-base md:text-lg leading-snug">Gives Up Quickly</p>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 md:mt-2 leading-relaxed">Gets frustrated easily when faced with difficult challenges, whether it's a math problem or complicated schoolwork.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="mt-1.5 size-2 md:size-2.5 rounded-full bg-red-400 shrink-0" />
                <div>
                  <p className="font-extrabold text-slate-800 text-base md:text-lg leading-snug">Lacks Emotional Control</p>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 md:mt-2 leading-relaxed">Spirals into frustration after a mistake. Struggles to handle losing, high-pressure situations, or critical feedback.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* After */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_8px_60px_-12px_rgba(37,99,235,0.18)] relative overflow-hidden ring-1 ring-blue-100/60">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/80 via-blue-50/30 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 md:mb-8 relative z-10">
              <div className="size-8 md:size-10 rounded-lg bg-blue-600 text-slate-50 flex items-center justify-center font-bold border border-blue-500 shadow-md">
                <CheckCircle className="size-4 md:size-5" />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold tracking-tight-gs text-slate-900">After ChessWize</h4>
            </div>
            
            <ul className="space-y-6 md:space-y-8 relative z-10">
              <li className="flex items-start gap-3 md:gap-4">
                <div className="mt-1.5 size-2 md:size-2.5 rounded-full bg-blue-500 shrink-0 shadow-sm" />
                <div>
                  <p className="font-extrabold text-slate-900 text-base md:text-lg leading-snug">Deep, Laser Focus</p>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 md:mt-2 leading-relaxed">Can sit still for 45+ minutes, deeply analyzing problems. Calculates multiple steps ahead before acting.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="mt-1.5 size-2 md:size-2.5 rounded-full bg-blue-500 shrink-0 shadow-sm" />
                <div>
                  <p className="font-extrabold text-slate-900 text-base md:text-lg leading-snug">Resilient Problem Solver</p>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 md:mt-2 leading-relaxed">Embraces difficult challenges. Learns to calmly analyze their own mistakes instead of throwing a tantrum.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="mt-1.5 size-2 md:size-2.5 rounded-full bg-blue-500 shrink-0 shadow-sm" />
                <div>
                  <p className="font-extrabold text-slate-900 text-base md:text-lg leading-snug">Emotional Composure</p>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 md:mt-2 leading-relaxed">Handles losses and high-pressure exams with calm confidence. Develops a growth mindset that translates to academic success.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative aspect-video group">
           <img loading="lazy" decoding="async" width={2816} height={1536} src="/2026-04-15-10-01-00-resilience-chess-close.webp" alt="A child deeply focusing on a chess piece, demonstrating a cognitive paradigm shift" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-100/60 to-transparent pointer-events-none" />
           <div className="absolute bottom-6 left-6 right-6">
             <p className="text-slate-800 text-lg md:text-xl font-extrabold drop-shadow-md">"From screen-addicted to strategically obsessed."</p>
           </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   DAILY TRAINING REGIMEN (New Serious Section)
   ════════════════════════════════════════════════ */
function DailyRegimen() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/2026-04-15-10-31-00-chess-study-desk-overhead.webp')] bg-cover bg-center opacity-[0.06] mix-blend-multiply pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-amber-100 text-amber-800 border-0 rounded-full font-bold mb-4 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            <Timer className="size-3 mr-1 inline" /> Structured Routine
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 leading-tight">
            Consistent, Measurable Growth
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            This is the weekly routine we use to convert passive screen time into focus, discipline, and competitive excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {[
            { day: "Day 1", title: "Deep Calculation", desc: "30 mins of puzzle solving to build unbreakable focus and patience.", icon: Target },
            { day: "Day 2", title: "Live Mentorship", desc: "60-min interactive session with a FIDE Master learning core strategies.", icon: PlayCircle, active: true },
            { day: "Day 3", title: "Mistake Analysis", desc: "Learning to objectively review and correct their own errors without frustration.", icon: Activity },
            { day: "Day 4", title: "Resilience Training", desc: "Playing out tough endgames against our engine without giving up.", icon: Layers },
            { day: "Weekend", title: "Practical Application", desc: "Executing their focus under the pressure of timed, weekend tournaments.", icon: Swords }
          ].map((step, i) => (
            <div key={i} className={`relative flex flex-col p-5 md:p-6 rounded-2xl border ${step.active ? 'depth-panel transform -translate-y-2 ring-1 ring-blue-500/20' : 'bg-gradient-to-b from-white to-slate-50/50 border-slate-200/60 text-slate-900 shadow-[0_2px_10px_rgba(15,23,42,0.03),inset_0_1px_0_rgba(255,255,255,1)]'} transition-all duration-300`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl pointer-events-none" />
              <span className={`text-[10px] font-extrabold uppercase tracking-widest-gs mb-3 relative z-10 ${step.active ? 'text-blue-500 drop-shadow-sm' : 'text-slate-400'}`}>{step.day}</span>
              <step.icon className={`size-8 mb-4 relative z-10 ${step.active ? 'text-blue-600 drop-shadow-md' : 'text-slate-400'}`} />
              <h4 className={`text-lg font-extrabold tracking-tight-gs mb-2 leading-snug relative z-10 ${step.active ? 'text-slate-800' : 'text-slate-700'}`}>{step.title}</h4>
              <p className={`text-xs font-medium leading-relaxed relative z-10 ${step.active ? 'text-slate-600' : 'text-slate-500'}`}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   PLATFORM — Enterprise Features with Dashboard Mockup
   ════════════════════════════════════════════════ */
// Simple SVG Radar Chart
function RadarChart() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
       <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       <polygon points="50,35 65,45 65,55 50,65 35,55 35,45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       
       {/* Axes */}
       <line x1="50" y1="50" x2="50" y2="15" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       <line x1="50" y1="50" x2="85" y2="35" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       <line x1="50" y1="50" x2="85" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       <line x1="50" y1="50" x2="50" y2="85" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       <line x1="50" y1="50" x2="15" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
       <line x1="50" y1="50" x2="15" y2="35" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

       {/* Data polygon */}
       <polygon points="50,20 80,45 65,70 50,75 30,55 20,40" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="1.5" />
       
       <text x="50" y="10" fontSize="4" fill="#94a3b8" textAnchor="middle" fontWeight="bold">Tactics</text>
       <text x="90" y="35" fontSize="4" fill="#94a3b8" textAnchor="middle" fontWeight="bold">Openings</text>
       <text x="90" y="65" fontSize="4" fill="#94a3b8" textAnchor="middle" fontWeight="bold">Endgames</text>
       <text x="50" y="92" fontSize="4" fill="#94a3b8" textAnchor="middle" fontWeight="bold">Time Mgmt</text>
       <text x="10" y="65" fontSize="4" fill="#94a3b8" textAnchor="middle" fontWeight="bold">Positional</text>
       <text x="10" y="35" fontSize="4" fill="#94a3b8" textAnchor="middle" fontWeight="bold">Psychology</text>
    </svg>
  );
}

function Platform() {
  return (
    <section id="methodology" className="py-16 md:py-24 bg-white text-slate-900 gs-grid-pattern border-b border-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-2 md:mb-3 flex items-center justify-center gap-2">
            <BarChart3 className="size-3" /> Parent Dashboard
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-4 md:mb-6 leading-tight drop-shadow-md">
            Stop wondering if they're <span className="text-blue-600">actually learning.</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Most chess academies send you a "your child did well today" message. We send you hard data. Every week, you see exactly what your child practised, where they struggled, and what the coach is doing about it. If the numbers aren't moving, we change the plan — not the excuse.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Dashboard UI Mockup */}
          <div className="w-full lg:w-1/2 relative">
            <div className="glass-panel rounded-3xl p-4 md:p-6 shadow-2xl relative z-10 overflow-hidden group hover:border-blue-300 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Topbar */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(37,99,235,0.3)] border border-blue-400/20">
                    <span className="font-extrabold text-white text-lg drop-shadow-md">S</span>
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">Saanvika's Progress</div>
                    <div className="text-[10px] text-blue-600 uppercase tracking-widest-gs font-bold">Tournament Masterclass &middot; Age 9</div>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/50 text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest-gs border border-emerald-200 shadow-sm flex items-center gap-1.5">
                  <TrendingUp className="size-3.5" /> +142 Elo (30 Days)
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-4 gap-2 mb-4 relative z-10">
                {[
                  { label: "Sessions", value: "24", sub: "this month" },
                  { label: "Puzzles", value: "312", sub: "solved" },
                  { label: "Win Rate", value: "68%", sub: "rated games" },
                  { label: "Streak", value: "11d", sub: "daily practice" },
                ].map((s, i) => (
                  <div key={i} className="depth-panel rounded-xl p-2.5 text-center">
                    <div className="text-base md:text-lg font-extrabold text-slate-900 leading-none">{s.value}</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest-gs mt-1">{s.label}</div>
                    <div className="text-[7px] text-slate-400 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                {/* Radar Chart */}
                <div className="depth-panel rounded-2xl p-4 flex flex-col items-center justify-center aspect-square relative">
                  <div className="absolute top-3 left-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Skill Matrix</div>
                  <div className="w-3/4 h-3/4 mt-4 drop-shadow-sm">
                    <RadarChart />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Tactical Accuracy Graph */}
                  <div className="depth-panel rounded-2xl p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Tactical Accuracy</span>
                      <span className="text-xs font-extrabold text-emerald-600 drop-shadow-sm">94%</span>
                    </div>
                    <div className="w-full h-16 flex items-end justify-between gap-1.5">
                      {[40, 50, 45, 60, 75, 70, 85, 94].map((height, idx) => (
                        <div key={idx} className="w-full h-full bg-slate-100 rounded-t-sm relative group/bar shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
                          <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[7px] text-slate-400">Week 1</span>
                      <span className="text-[7px] text-slate-400">Week 8</span>
                    </div>
                  </div>

                  {/* Weakness Tag */}
                  <div className="depth-panel rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs block mb-2">Focus Area Identified</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Rook Endgames</span>
                      <Badge className="bg-gradient-to-b from-red-50 to-red-100/50 text-red-700 border-red-200 rounded text-[9px] px-1.5 py-0 font-extrabold uppercase tracking-widest-gs shadow-sm">Action Req</Badge>
                    </div>
                    <p className="text-[8px] text-slate-400 mt-1.5 leading-snug">Coach assigned 15 targeted puzzles. 9 completed, 6 remaining.</p>
                  </div>
                </div>
              </div>

              {/* Coach Note */}
              <div className="depth-panel rounded-2xl p-4 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                    <span className="text-[8px] font-extrabold text-blue-700">CM</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Coach's Weekly Note</span>
                  <span className="text-[8px] text-slate-400 ml-auto">Apr 12, 2026</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed italic">"Saanvika's calculation depth improved from 2-ply to 3-ply this week. She's now seeing one move deeper before committing. Rook endgames remain the priority — I've added K+R vs K+R positions to her daily set. Expect noticeable improvement in 2 weeks."</p>
              </div>
            </div>
            
            {/* Decorative background */}
            <div className="absolute top-8 -right-8 w-full h-full bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-3xl border border-slate-300 gs-shadow-lg z-0 blur-md" />
          </div>

          {/* Right Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-7 lg:pl-8">
            <div className="flex items-start gap-5 group">
              <div className="size-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1 shadow-inner group-hover:bg-blue-500/20 transition-colors">
                <Activity className="size-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 tracking-tight-gs mb-2">Every Game Analysed, Every Mistake Mapped</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  After each session, your child's coach reviews every game they played — not just the result, but the thinking behind each move. We tag recurring mistakes (missed forks, premature attacks, time trouble) and build custom puzzle sets that target those exact weaknesses. Your child doesn't just "practise more" — they practise the right things.
                </p>
              </div>
            </div>
            
            <Separator className="bg-white/80 gs-shadow-xl" />

            <div className="flex items-start gap-5 group">
              <div className="size-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1 shadow-inner group-hover:bg-emerald-500/20 transition-colors">
                <LineChartIcon className="size-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 tracking-tight-gs mb-2">Weekly Reports You Can Actually Understand</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  Every week you receive a WhatsApp report with your child's Elo graph, puzzle accuracy trend, session attendance, and a plain-English note from the coach explaining what was covered, what improved, and what's next. You'll know if they missed practice, if their focus dipped, or if they're ready for the next level — without needing to understand chess yourself.
                </p>
              </div>
            </div>

            <Separator className="bg-white/80 gs-shadow-xl" />

            <div className="flex items-start gap-5 group">
              <div className="size-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-1 shadow-inner group-hover:bg-amber-500/20 transition-colors">
                <Shield className="size-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 tracking-tight-gs mb-2">No Vague Promises — Just Measurable Progress</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  We track five core dimensions: tactical sharpness, opening preparation, endgame technique, positional understanding, and time management. If any metric stalls for two consecutive weeks, the coach adjusts the training plan and explains why. You'll never wonder "is this actually working?" again.
                </p>
              </div>
            </div>

            <Button onClick={scrollToForm} variant="outline" className="gs-btn gs-btn-white w-fit mt-4 font-bold hover-lift">
              See a Sample Report <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   MICRO-ENGAGEMENT: INTERACTIVE PUZZLE (Realistic)
   ════════════════════════════════════════════════ */
function InteractivePuzzle() {
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [solved, setSolved] = useState(false);
  const [depth, setDepth] = useState(1);
  const [wrongSquare, setWrongSquare] = useState<{row:number;col:number}|null>(null);
  const [attempts, setAttempts] = useState(0);
  const [hintSquare, setHintSquare] = useState<{row:number;col:number}|null>(null);
  const [moveTime, setMoveTime] = useState(0);
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime] = useState(247);

  useEffect(() => {
    setSolved(false); setDepth(1); setWrongSquare(null); setAttempts(0); setHintSquare(null); setMoveTime(0); setWhiteTime(300);
  }, [level]);

  useEffect(() => {
    if (!solved) {
      const t = setInterval(() => setMoveTime(p => p + 1), 1000);
      return () => clearInterval(t);
    }
  }, [solved, level]);

  useEffect(() => {
    if (!solved) {
      const t = setInterval(() => setWhiteTime(p => Math.max(0, p - 1)), 1000);
      return () => clearInterval(t);
    }
  }, [solved, level]);

  useEffect(() => {
    if (solved) {
      let d = 1;
      const interval = setInterval(() => { d++; setDepth(d); if (d >= 32) clearInterval(interval); }, 40);
      return () => clearInterval(interval);
    }
  }, [solved]);

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const puzzles = {
    beginner: {
      title: "Scholar's Mate",
      subtitle: "White to move",
      desc: "Find the only square that delivers checkmate. The f7 pawn is fatally weak.",
      pieces: [
        // White: Ke1, Qh5, Bc4, pawns d2 e4
        { row: 7, col: 4, type: "♔", color: "w" },
        { row: 3, col: 7, type: "♕", color: "w" },
        { row: 4, col: 2, type: "♗", color: "w" },
        { row: 6, col: 3, type: "♙", color: "w" },
        { row: 4, col: 4, type: "♙", color: "w" },
        // Black: Ke8, Nc6, Nf6, pawns a7 b7 c7 d7 e5 g7 h7
        { row: 0, col: 4, type: "♚", color: "b" },
        { row: 2, col: 2, type: "♞", color: "b" },
        { row: 2, col: 5, type: "♞", color: "b" },
        { row: 1, col: 0, type: "♟", color: "b" },
        { row: 1, col: 1, type: "♟", color: "b" },
        { row: 1, col: 2, type: "♟", color: "b" },
        { row: 1, col: 3, type: "♟", color: "b" },
        { row: 3, col: 4, type: "♟", color: "b" },
        { row: 1, col: 5, type: "♟", color: "b" },
        { row: 1, col: 6, type: "♟", color: "b" },
        { row: 1, col: 7, type: "♟", color: "b" },
        // Black pieces on back rank
        { row: 0, col: 0, type: "♜", color: "b" },
        { row: 0, col: 2, type: "♝", color: "b" },
        { row: 0, col: 3, type: "♛", color: "b" },
        { row: 0, col: 5, type: "♝", color: "b" },
        { row: 0, col: 7, type: "♜", color: "b" },
      ],
      winningSquare: { row: 1, col: 5 },
      lastMove: { from: { row: 0, col: 6 }, to: { row: 2, col: 5 } },
      captured: { white: [], black: [] },
      moveHistory: ["1. e4 e5", "2. Qh5 Nc6", "3. Bc4 Nf6??"],
      solutionMove: "Qxf7#",
      evalStart: 55, evalEnd: 100, evalText: "+M1",
      difficulty: "Easy", rating: 800,
    },
    intermediate: {
      title: "Knight Fork",
      subtitle: "White to move",
      desc: "Spot the geometric weakness. One knight move attacks the king and queen simultaneously.",
      pieces: [
        // White: Kg1, Nd5, Rf1, pawns f2 g2 h2
        { row: 7, col: 6, type: "♔", color: "w" },
        { row: 3, col: 3, type: "♘", color: "w" },
        { row: 7, col: 5, type: "♖", color: "w" },
        { row: 6, col: 5, type: "♙", color: "w" },
        { row: 6, col: 6, type: "♙", color: "w" },
        { row: 6, col: 7, type: "♙", color: "w" },
        // Black: Ke8, Qd7, Rf8, pawns a7 d6 f7 h7 (g7 already traded earlier)
        { row: 0, col: 4, type: "♚", color: "b" },
        { row: 1, col: 3, type: "♛", color: "b" },
        { row: 0, col: 5, type: "♜", color: "b" },
        { row: 1, col: 0, type: "♟", color: "b" },
        { row: 2, col: 3, type: "♟", color: "b" },
        { row: 1, col: 5, type: "♟", color: "b" },
        { row: 1, col: 7, type: "♟", color: "b" },
      ],
      winningSquare: { row: 2, col: 5 },
      lastMove: { from: { row: 0, col: 3 }, to: { row: 1, col: 3 } },
      captured: { white: ["♟","♟","♝","♜"], black: ["♞","♟","♟"] },
      moveHistory: ["18. Nd5 Qd7??", "19. Nf6+"],
      solutionMove: "Nf6+",
      evalStart: 52, evalEnd: 85, evalText: "+6.4",
      difficulty: "Medium", rating: 1200,
    },
    advanced: {
      title: "Back Rank Mate",
      subtitle: "White to move",
      desc: "The back rank is weak. Find the rook move that forces immediate checkmate.",
      pieces: [
        // White: Kg1, Re1, pawns f2 g2 h2
        { row: 7, col: 6, type: "♔", color: "w" },
        { row: 7, col: 4, type: "♖", color: "w" },
        { row: 6, col: 5, type: "♙", color: "w" },
        { row: 6, col: 6, type: "♙", color: "w" },
        { row: 6, col: 7, type: "♙", color: "w" },
        // Black: Kg8, Qb7, pawns f7 g7 h7
        { row: 0, col: 6, type: "♚", color: "b" },
        { row: 1, col: 1, type: "♛", color: "b" },
        { row: 1, col: 5, type: "♟", color: "b" },
        { row: 1, col: 6, type: "♟", color: "b" },
        { row: 1, col: 7, type: "♟", color: "b" },
      ],
      winningSquare: { row: 0, col: 4 },
      lastMove: { from: { row: 1, col: 4 }, to: { row: 1, col: 1 } },
      captured: { white: ["♜","♜","♝","♟","♟"], black: ["♕","♞","♝","♟","♟","♟"] },
      moveHistory: ["32. Re1 Qb7??", "33. Re8#"],
      solutionMove: "Re8#",
      evalStart: 48, evalEnd: 100, evalText: "+M1",
      difficulty: "Hard", rating: 1600,
    }
  };

  const currentPuzzle = puzzles[level];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full font-bold mb-4 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs backdrop-blur-sm">
            <Zap className="size-3 mr-1 inline" /> Interactive Puzzle
          </Badge>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-50 tracking-tighter-gs mb-4">
            Test Their Tactical Vision
          </h3>
          <p className="text-base md:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Before we speak, let's see how they calculate. Click the correct square to execute the winning move.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch justify-center">

          {/* LEFT COLUMN: Board Area */}
          <div className="flex flex-col w-full lg:w-auto lg:max-w-[520px]">
            {/* Player bar - Black */}
            <div className="flex items-center justify-between bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-t-2xl px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 ring-2 ring-slate-600">B</div>
                <div>
                  <p className="text-sm font-bold text-slate-200">Opponent</p>
                  <p className="text-[10px] text-slate-500">Rating: {currentPuzzle.rating + 50}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {currentPuzzle.captured.black.map((p, i) => <span key={i} className="text-xs text-slate-500">{p}</span>)}
                </div>
                <div className="bg-slate-700 px-3 py-1 rounded-lg font-mono text-sm font-bold text-slate-300 tabular-nums border border-slate-600">
                  {formatTime(blackTime)}
                </div>
              </div>
            </div>

            {/* Board + Eval Bar */}
            <div className="flex items-stretch gap-0 relative">
              {/* Evaluation Bar */}
              <div className="w-5 md:w-7 bg-slate-700 overflow-hidden relative flex flex-col justify-end border-x border-slate-600">
                <motion.div
                  animate={{ height: `${solved ? currentPuzzle.evalEnd : currentPuzzle.evalStart}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="w-full bg-slate-100 transition-all relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-200 to-white" />
                </motion.div>
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                  <span className="text-[8px] md:text-[9px] font-extrabold text-slate-300 bg-slate-800/90 px-1 py-0.5 rounded backdrop-blur-sm whitespace-nowrap">
                    {solved ? currentPuzzle.evalText : `+${(currentPuzzle.evalStart / 20).toFixed(1)}`}
                  </span>
                </div>
              </div>

              {/* The Board */}
              <div className="flex-1 relative aspect-square grid grid-cols-8 grid-rows-8 shadow-[0_0_60px_-10px_rgba(0,0,0,0.6)]">
                {Array.from({ length: 64 }).map((_, i) => {
                  const row = Math.floor(i / 8);
                  const col = i % 8;
                  const isLight = (row + col) % 2 === 0;
                  const isWinningSquare = row === currentPuzzle.winningSquare.row && col === currentPuzzle.winningSquare.col;
                  const piece = currentPuzzle.pieces.find(p => p.row === row && p.col === col);
                  const isLastMoveFrom = currentPuzzle.lastMove.from.row === row && currentPuzzle.lastMove.from.col === col;
                  const isLastMoveTo = currentPuzzle.lastMove.to.row === row && currentPuzzle.lastMove.to.col === col;
                  const isWrong = wrongSquare?.row === row && wrongSquare?.col === col;
                  const isHint = hintSquare?.row === row && hintSquare?.col === col;

                  const lightColor = "bg-[#f0d9b5]";
                  const darkColor = "bg-[#b58863]";
                  const lastMoveLight = "bg-[#cdd16a]";
                  const lastMoveDark = "bg-[#aaa23a]";

                  let squareColor = isLight ? lightColor : darkColor;
                  if (isLastMoveFrom || isLastMoveTo) squareColor = isLight ? lastMoveLight : lastMoveDark;

                  return (
                    <div
                      key={i}
                      onClick={async () => {
                        if (solved) return;
                        if (isWinningSquare) {
                          setSolved(true);
                          toast.success("Brilliant Move!", { description: `${currentPuzzle.solutionMove} — Forced winning sequence found in ${moveTime}s.` });
                          const confetti = (await import("canvas-confetti")).default;
                          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#3b82f6', '#10b981', '#f59e0b', '#ffffff'] });
                        } else {
                          setAttempts(a => a + 1);
                          setWrongSquare({ row, col });
                          setTimeout(() => setWrongSquare(null), 600);
                          toast.error("Inaccurate", { description: attempts >= 1 ? "Try using the hint button." : "That blunders the advantage. Recalculate." });
                        }
                      }}
                      className={`w-full h-full flex items-center justify-center relative ${!solved ? 'cursor-pointer' : ''} ${squareColor} transition-colors duration-150`}
                    >
                      {col === 0 && <span className={`absolute top-0.5 left-0.5 text-[7px] md:text-[8px] font-bold select-none ${isLight ? 'text-[#b58863]' : 'text-[#f0d9b5]'}`}>{8 - row}</span>}
                      {row === 7 && <span className={`absolute bottom-0.5 right-1 text-[7px] md:text-[8px] font-bold select-none ${isLight ? 'text-[#b58863]' : 'text-[#f0d9b5]'}`}>{String.fromCharCode(97 + col)}</span>}

                      {piece && (
                        <span className={`text-2xl md:text-[2.8rem] leading-none select-none ${piece.color === 'w' ? 'text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]' : 'text-slate-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)]'}`} style={{ textShadow: piece.color === 'w' ? '0 1px 4px rgba(0,0,0,0.5)' : '0 1px 2px rgba(0,0,0,0.3)' }}>
                          {piece.type}
                        </span>
                      )}

                      {/* Wrong move flash */}
                      {isWrong && (
                        <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 bg-red-500/50 pointer-events-none" />
                      )}

                      {/* Hint glow */}
                      {isHint && !solved && (
                        <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-blue-400/30 pointer-events-none rounded-sm" />
                      )}

                      {/* Solved overlay */}
                      {solved && isWinningSquare && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 bg-blue-500/70 flex items-center justify-center z-10 pointer-events-none backdrop-blur-[2px]">
                          <Target className="size-6 md:size-10 text-white drop-shadow-lg" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Player bar - White */}
            <div className="flex items-center justify-between bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-b-2xl px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-white flex items-center justify-center text-sm font-bold text-slate-800 ring-2 ring-slate-300 shadow-sm">W</div>
                <div>
                  <p className="text-sm font-bold text-slate-50">Your Child</p>
                  <p className="text-[10px] text-slate-500">Rating: {currentPuzzle.rating}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {currentPuzzle.captured.white.map((p, i) => <span key={i} className="text-xs text-slate-400">{p}</span>)}
                </div>
                <div className={`px-3 py-1 rounded-lg font-mono text-sm font-bold tabular-nums border ${!solved ? 'bg-white text-slate-900 border-white/80 shadow-[0_0_12px_rgba(255,255,255,0.15)]' : 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                  {formatTime(whiteTime)}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Analysis Panel */}
          <div className="w-full lg:w-[380px] flex flex-col bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
            {/* Difficulty Tabs */}
            <div className="flex gap-1 p-2 bg-slate-900/50 border-b border-slate-700/50">
              {(["beginner","intermediate","advanced"] as const).map((l, i) => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`flex-1 text-[10px] md:text-xs h-8 font-bold rounded-lg transition-all uppercase tracking-wider ${level === l ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"}`}>
                  {["Easy","Medium","Hard"][i]}
                </button>
              ))}
            </div>

            {/* Puzzle Info */}
            <div className="p-4 md:p-5 border-b border-slate-700/30">
              <div className="flex items-center gap-2 mb-2">
                <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${currentPuzzle.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : currentPuzzle.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                  {currentPuzzle.difficulty}
                </div>
                <span className="text-[10px] text-slate-500">Rating: {currentPuzzle.rating}</span>
                {attempts > 0 && !solved && <span className="text-[10px] text-red-400 ml-auto">{attempts} wrong</span>}
              </div>
              <h4 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-50 mb-1">{currentPuzzle.title}</h4>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{currentPuzzle.subtitle} — {currentPuzzle.desc}</p>
            </div>

            {/* Move History */}
            <div className="p-4 md:p-5 border-b border-slate-700/30 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="size-3.5 text-slate-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Move History</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {currentPuzzle.moveHistory.map((move, i) => (
                  <div key={i} className={`flex items-center gap-2 px-2 py-1 rounded ${i === currentPuzzle.moveHistory.length - 1 && !solved ? 'bg-blue-500/10 border border-blue-500/20' : ''}`}>
                    <span className="text-slate-400">{move}</span>
                    {i === currentPuzzle.moveHistory.length - 1 && !solved && <span className="text-blue-400 text-[9px] ml-auto animate-pulse">Your turn</span>}
                  </div>
                ))}
                {solved && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-400 font-bold">{currentPuzzle.solutionMove}</span>
                    <span className="text-emerald-500 text-[9px] ml-auto">Brilliant!</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Engine Analysis (shown on solve) */}
            {solved && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-5 border-b border-slate-700/30 bg-slate-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <BrainCircuit className="size-3.5 text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Engine Analysis</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">Depth</span>
                    <span className="text-sm font-bold text-slate-200 tabular-nums font-mono">D{depth}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">Eval</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">{currentPuzzle.evalText}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">Time</span>
                    <span className="text-sm font-bold text-slate-200 tabular-nums font-mono">{moveTime}s</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="p-4 md:p-5 space-y-3 mt-auto">
              {!solved && attempts >= 2 && !hintSquare && (
                <Button onClick={() => setHintSquare(currentPuzzle.winningSquare)} variant="ghost" className="w-full h-10 text-xs font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <Zap className="size-3.5 mr-2" /> Show Hint
                </Button>
              )}
              <Button onClick={scrollToForm} className="w-full h-12 gs-btn bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-sm shadow-lg shadow-blue-900/30 border-0">
                {solved ? "Book My Free Demo Now" : "Book Free Demo"} <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   TARGET PERSONAS
   ════════════════════════════════════════════════ */
function WhoIsThisFor() {
  const personas = [
    { title: "The Absolute Beginner", badge: "Foundation", ageBadge: "Ages 4-8", icon: Target, img: "/2026-04-15-10-16-00-absolute-beginner.webp", desc: "For students who don't yet know the rules but want to build a strong foundation in logical thinking, pattern recognition, and deep concentration.", pain: "Lacks focus and structure in learning.", bestFor: "Shy, high-energy, or easily-distracted kids" },
    { title: "The Casual Player", badge: "Developing", ageBadge: "Ages 7-12", icon: Layers, img: "/2026-04-15-10-17-00-casual-player.webp", desc: "Plays casually but hasn't seen real progress. Needs structure to turn a passing hobby into a disciplined, measurable cognitive routine.", pain: "Plays aimlessly without seeing real improvement.", bestFor: "Curious kids who plateau without structure" },
    { title: "The Tournament Hopeful", badge: "Competitive", ageBadge: "Ages 9-16", icon: Trophy, img: "/2026-04-15-10-18-00-tournament-hopeful.webp", desc: "Already playing competitively but struggles under pressure. Needs psychological resilience and advanced calculation training to win.", pain: "Loses focus and blunders under time pressure.", bestFor: "Driven kids who crack under time pressure" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/2026-04-15-10-11-00-chess-focus-background.webp')] opacity-[0.03] object-cover mix-blend-overlay pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Audience Fit</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-4 md:mb-6 leading-tight">
            Which profile matches your child?
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            We reject the "one-size-fits-all" approach. We tailor our cognitive training based on your child's current attention span and starting skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {personas.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="bg-slate-50 rounded-3xl gs-border gs-shadow-md hover:border-blue-300 hover:shadow-xl transition-all flex flex-col h-full cursor-default group overflow-hidden">
                <div className="h-48 md:h-56 w-full relative overflow-hidden">
                  <img loading="lazy" decoding="async" width={2816} height={1536} src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                    <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md border border-slate-300 flex items-center justify-center shrink-0">
                      <Icon className="size-5 text-slate-800" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <Badge className="text-[9px] md:text-[10px] uppercase tracking-widest-gs font-bold text-white bg-blue-600 hover:bg-blue-700 border-0 rounded">
                        {p.badge}
                      </Badge>
                      <Badge variant="outline" className="text-[9px] md:text-[10px] uppercase tracking-widest-gs font-bold text-slate-800 border-slate-300 rounded bg-white/90 backdrop-blur-sm">
                        {p.ageBadge}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight-gs mb-3 md:mb-4 leading-tight">{p.title}</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4 md:mb-5 flex-1">{p.desc}</p>
                  <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold border border-emerald-100 flex gap-3 items-start mb-3">
                    <CheckCircle className="shrink-0 size-4 text-emerald-600 mt-0.5" />
                    <span className="leading-snug">Best for: {p.bestFor}</span>
                  </div>
                  <div className="bg-red-50 text-red-800 p-3.5 rounded-2xl text-xs font-bold border border-red-100 flex gap-3 items-start">
                    <AlertTriangle className="shrink-0 size-4 text-red-500 mt-0.5" />
                    <span className="leading-snug">Solves: {p.pain}</span>
                  </div>
                  {/* Persona-specific CTA that prepopulates the form */}
                  <Button
                    onClick={scrollToForm}
                    variant="outline"
                    className="mt-3 w-full h-11 md:h-12 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-extrabold text-xs md:text-sm transition-all"
                  >
                    Book a demo for {p.title.replace(/^The /, "")} <ArrowRight className="ml-2 size-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   LEARNING MODES
   ════════════════════════════════════════════════ */
function LearningModes() {
  const modes = [
    { title: "Individual (1-on-1)", badge: "Highest Intensity", icon: User, img: "/2026-04-15-10-05-00-1-on-1-coaching.webp", desc: "Surgical attention and customized training at the student's exact pace. Best for rapid rating gain and tailored opening repertoires." },
    { title: "Two-on-One", badge: "Collaborative", icon: Users, img: "/2026-04-15-10-06-00-two-on-one-coaching.webp", desc: "Designed for friends or siblings to learn together. Fosters healthy competition while keeping teaching quality high." },
    { title: "Cohort Training", badge: "Max 4-6 Students", icon: UserPlus, img: "/2026-04-15-10-15-00-cohort-coaching.webp", desc: "Elite small batches to ensure quality learning, peer-to-peer tactical sparring, and structured academic progression." },
  ];

  return (
    <section id="learning-modes" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Class Formats</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-4 md:mb-6 leading-tight">
            Designed for deep focus.
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            We cap our class sizes strictly so every child gets real attention. Pick the format that fits your child best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {modes.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-md hover:border-blue-400 hover:shadow-xl transition-all flex flex-col h-full overflow-hidden group">
                <div className="h-48 w-full relative overflow-hidden">
                  <img loading="lazy" decoding="async" width={2816} height={1536} src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md border border-slate-300 flex items-center justify-center">
                      <Icon className="size-5 text-slate-800" />
                    </div>
                    <Badge variant="outline" className="text-[9px] md:text-[10px] uppercase tracking-widest-gs font-bold text-slate-800 border-slate-300 rounded bg-white/90 backdrop-blur-sm">
                      {p.badge}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight-gs mb-3 md:mb-4 leading-tight">{p.title}</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6 md:mb-8 flex-1">{p.desc}</p>
                  <div className="mt-auto">
                     <Button onClick={scrollToForm} variant="outline" className="gs-btn gs-btn-white w-full font-bold h-12 rounded-xl">Book Free Demo</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CURRICULUM DEEP DIVE (Programs)
   ════════════════════════════════════════════════ */
function Curriculum() {
  const modules = [
    { week: "Phase 1", title: "Foundation Programme", duration: "Beginners", details: "Strict structural training for complete beginners. Focuses heavily on board vision, piece safety, and instilling the patience required to calculate before acting.", tools: ["Checks, Captures, Threats", "Board Vision", "Patience Building"], img: "/2026-04-15-10-02-00-foundation-protocol.webp" },
    { week: "Phase 2", title: "Tactical Geometry", duration: "Intermediate", details: "Intensive calculation training. Students learn to spot multi-move combinations, execute forks/pins/skewers, and develop basic opening principles to survive the first 15 moves.", tools: ["Multi-move Calculation", "Opening Principles"], img: "/2026-04-15-10-03-00-tactical-geometry.webp" },
    { week: "Phase 3", title: "Tournament Masterclass", duration: "Advanced", details: "Elite prep for rated players. Covers deep theoretical endgames, pawn structure manipulation, and psychological resilience under severe time pressure.", tools: ["Positional Play", "Theoretical Endgames", "Clock Management"], img: "/2026-04-15-10-04-00-tournament-masterclass.webp" }
  ];

  return (
    <section id="programs" className="py-16 md:py-24 bg-white border-b border-slate-200 gs-grid-pattern">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-20 text-center">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Structured Syllabus</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 md:mb-6 leading-tight">
            The <span className="text-blue-600">Focus-Building Curriculum</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            A structured, academically rigorous progression. Just like math or science, students only advance when they prove complete mastery of the current cognitive phase.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:gap-10 relative">
          <div className="hidden lg:block absolute left-[3.5rem] top-20 bottom-20 w-1 bg-blue-200 z-0" />
          
          {modules.map((mod, i) => (
            <div key={i} className="bg-white gs-border rounded-3xl p-6 md:p-8 lg:p-12 gs-shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-16 relative overflow-hidden group hover:border-blue-300 transition-all duration-300 z-10">
              <div className="hidden md:block absolute -right-8 -top-12 text-[150px] lg:text-[200px] font-extrabold text-slate-50 pointer-events-none select-none z-0 group-hover:text-blue-50 transition-colors">
                0{i+1}
              </div>
              
              <div className="w-full lg:w-[45%] shrink-0 relative z-10">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 gs-shadow">
                  <img loading="lazy" decoding="async" width={2816} height={1536} src={mod.img} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              <div className="w-full lg:w-[55%] flex flex-col justify-center relative z-10">
                <div className="flex flex-col mb-4 md:mb-6">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <span className="text-xs md:text-sm font-extrabold text-blue-600 tracking-widest-gs uppercase flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-md">
                      <div className="size-2 rounded-full bg-blue-600 animate-pulse" /> {mod.week}
                    </span>
                    <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 md:py-1.5 rounded-md gs-border">
                      <Target className="size-3 md:size-3.5 text-slate-500" /> {mod.duration}
                    </div>
                  </div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tighter-gs leading-tight">{mod.title}</h4>
                </div>
                
                <p className="text-sm md:text-base lg:text-[1.1rem] text-slate-600 font-medium leading-relaxed mb-6 md:mb-8">
                  {mod.details}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {mod.tools.map(t => (
                    <Badge key={t} variant="outline" className="rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-widest-gs border-slate-200 text-slate-700 bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="size-3 mr-1.5 inline text-emerald-500" /> {t}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   VIDEO MODAL — shared playable modal for hero + testimonials
   ════════════════════════════════════════════════ */
type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  label?: string;
  portrait?: boolean;
};

type VideoModalHandle = {
  primeAndPlay: () => void;
};

const VideoModal = forwardRef<VideoModalHandle, VideoModalProps>(function VideoModal(
  {
    open,
    onClose,
    src,
    poster,
    label,
    portrait = false,
  }: VideoModalProps,
  ref,
) {
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    // Pause any OTHER video on the page so we never have two videos playing at once.
    // Only track ones that were MUTED when paused — resuming an unmuted
    // background video on Safari after the modal closes is rejected by the
    // autoplay policy, so we leave those paused and let the user re-start.
    const wasPlaying: HTMLVideoElement[] = [];
    document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
      if (v !== modalVideoRef.current && !v.paused && !v.ended) {
        const wasMuted = v.muted;
        v.pause();
        if (wasMuted) {
          wasPlaying.push(v);
        }
      }
    });

    const mv = modalVideoRef.current;
    const tryPlay = () => {
      mv?.play().catch(() => {});
    };
    if (mv) {
      tryPlay();
      mv.addEventListener("loadedmetadata", tryPlay);
      mv.addEventListener("canplay", tryPlay);
    }

    // Remember who opened the modal so we can restore focus on close.
    const opener = (document.activeElement as HTMLElement | null) ?? null;

    // Focus trap + Escape key — small manual trap is lighter than a lib.
    const modalEl = modalContainerRef.current;
    const getFocusable = () => {
      if (!modalEl) return [] as HTMLElement[];
      return Array.from(
        modalEl.querySelectorAll<HTMLElement>(
          'button, [href], video[controls], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
    };

    // Move focus into the modal (defer a tick so React has painted)
    requestAnimationFrame(() => {
      const first = getFocusable()[0];
      first?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && active === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // Safari iOS fix: set `position:fixed` on body to prevent the rubber-band
    // scroll leaking through the modal. Plain `overflow:hidden` is not enough
    // on WebKit mobile.
    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
      if (mv) {
        mv.pause();
        mv.removeEventListener("loadedmetadata", tryPlay);
        mv.removeEventListener("canplay", tryPlay);
      }
      // Resume background videos that were auto-playing before we opened.
      wasPlaying.forEach((v) => {
        v.play().catch(() => {});
      });
      // Restore focus to whoever opened the modal.
      opener?.focus?.();
    };
  }, [open, onClose]);

  const primeAndPlay = () => {
    const mv = modalVideoRef.current;
    if (!mv) {
      return;
    }
    if (mv.currentTime > 0 && !mv.paused && !mv.ended) {
      return;
    }
    mv.load();
    mv.play().catch(() => {
      // Safari low-power mode may still reject autoplay, but preserving the
      // click-time play call gives WebKit its best chance to honor playback.
    });
  };

  useImperativeHandle(ref, () => {
    return {
      primeAndPlay,
    };
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        if (open) {
          onClose();
        }
      }}
      className={`fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label={label ?? "Video"}
    >
      <motion.div
        ref={modalContainerRef}
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.94,
        }}
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`relative w-full ${portrait ? "max-w-[min(92vw,420px)]" : "max-w-[min(92vw,480px)] md:max-w-[min(90vw,540px)]"} bg-black rounded-2xl overflow-hidden shadow-[0_20px_80px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10`}
      >
        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute top-3 right-3 z-10 size-10 rounded-full bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-sm flex items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <XCircle className="size-5" />
        </motion.button>
        <video
          ref={modalVideoRef}
          controls
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          poster={poster}
          src={src}
          className="w-full h-auto max-h-[85vh] bg-black"
        />
      </motion.div>
    </motion.div>
  );
});

/* ════════════════════════════════════════════════
   VIDEO TESTIMONIALS — lazy, poster-first, opens modal on click
   ════════════════════════════════════════════════ */
type VideoItem = { src: string; title: string; label: string; badge: string; poster?: string };

function VideoCard({ v }: { v: VideoItem }) {
  const [activated, setActivated] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const poster = v.poster ?? v.src.replace(/\.mp4$/i, "-poster.webp");
  const prefersReducedMotion = useReducedMotion();

  // Activate on click; call play() synchronously from the click handler so
  // Safari accepts it as a user-initiated gesture. Then swap poster for the
  // real <video> element with native controls.
  const activate = () => {
    setActivated(true);
    // next frame: video element is now mounted, kick play()
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden group relative flex-shrink-0 w-[180px] md:w-full bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.12)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.25)] hover:border-blue-300/60 transition-all duration-300">
      <div className="relative w-full aspect-[9/16] bg-slate-900 overflow-hidden">
        {activated ? (
          <video
            ref={videoRef}
            src={v.src}
            poster={poster}
            controls
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover bg-black"
          />
        ) : (
          <button
            type="button"
            onClick={activate}
            aria-label={`Play video: ${v.title}`}
            className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/60"
          >
            <img
              src={poster}
              alt={v.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/60 pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <Badge className="bg-slate-950/60 backdrop-blur-md text-white border border-white/15 text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                <PlayCircle className="size-3 mr-1" /> {v.badge}
              </Badge>
            </div>

            {/* Play button — glass morph, ring accent, spring on hover */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="relative size-14 md:size-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] ring-4 ring-white/20 group-hover:ring-white/50 group-hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="size-5 md:size-6 text-blue-600 translate-x-[1px]" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
                {!prefersReducedMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full ring-2 ring-white/40"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            </div>

            {/* Bottom caption strip */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10 pointer-events-none">
              <p className="font-extrabold text-white text-xs md:text-sm tracking-tight-gs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{v.label}</p>
              <p className="text-[10px] md:text-[11px] text-slate-200 font-medium mt-0.5 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{v.title}</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

function VideoCarousel({ videos }: { videos: VideoItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-4">
          {videos.map((v, i) => (
            <VideoCard key={i} v={v} />
          ))}
        </div>
      </div>
      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            type="button"
            aria-label={`Go to video ${i + 1}`}
            aria-current={activeIndex === i ? "true" : undefined}
            className={`rounded-full transition-all ${activeIndex === i ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
          />
        ))}
      </div>
      {/* Swipe hint */}
      <p className="text-center text-[10px] text-slate-400 font-medium mt-2 flex items-center justify-center gap-1.5">
        <ArrowLeft className="size-3" /> Swipe to see more <ArrowRight className="size-3" />
      </p>
    </div>
  );
}

function VideoShowcase() {
  const videos = [
    { src: "/testimonial-kid-1.mp4", title: "Student Testimonial", label: "Student Story", badge: "Student" },
    { src: "/testimonial-parent-1.mp4", title: "Parent Testimonial — Journey to 1300+", label: "Parent Review", badge: "Parent" },
    { src: "/testimonial-parent-2.mp4", title: "Parent Testimonial — From Beginner to Confident", label: "Parent Review", badge: "Parent" },
    { src: "/testimonial-parent-3.mp4", title: "Parent Testimonial — Transformation in Focus", label: "Parent Review", badge: "Parent" },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-2 md:mb-3 flex items-center justify-center gap-2">
            <PlayCircle className="size-3" /> Video Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-3 md:mb-4 leading-tight">
            Hear it from <span className="text-blue-600">real families.</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            Real parents and students share their ChessWize journey in their own words.
          </p>
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden">
          <VideoCarousel videos={videos} />
        </div>
        {/* Tablet: 2-column grid */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 max-w-2xl mx-auto gap-5">
          {videos.map((v, i) => (
            <VideoCard key={i} v={v} />
          ))}
        </div>
        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid lg:grid-cols-4 max-w-6xl mx-auto gap-5">
          {videos.map((v, i) => (
            <VideoCard key={i} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   MENTORS
   ════════════════════════════════════════════════ */
function Mentors() {
  return (
    <section id="mentors" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3 flex items-center gap-2">
              <Shield className="size-3" /> The Faculty Standard
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 md:mb-6 text-slate-900 leading-tight">
              Coaches we&apos;d send our own <span className="text-blue-700">kids</span> to.
            </h3>
            <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-5 md:mb-6">
              Our head coaches hold official FIDE titles, have background-verified IDs, and train under our in-house teaching rubric before they ever take a live class.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 md:mb-8 text-[11px] md:text-xs font-bold text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="size-3.5 text-blue-600" /> Background-verified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-emerald-500" /> FIDE-titled only
              </span>
              <span className="inline-flex items-center gap-1.5">
                <PlayCircle className="size-3.5 text-blue-600" /> Classes recorded for parent review
              </span>
            </div>
            
            <div className="flex flex-col gap-4">
               <div className="flex items-start gap-4">
                 <div className="mt-1 size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                    <span className="text-blue-700 font-extrabold text-xs">1</span>
                 </div>
                 <div>
                   <h4 className="font-extrabold text-slate-900 text-sm md:text-base">FIDE Verified Ratings</h4>
                   <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">Coaches must have an internationally recognized rating proving their structural understanding of the game.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="mt-1 size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                    <span className="text-blue-700 font-extrabold text-xs">2</span>
                 </div>
                 <div>
                   <h4 className="font-extrabold text-slate-900 text-sm md:text-base">Teaching & Child-Safety Training</h4>
                   <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">Every coach is background-verified and trained to teach patience, calculation, and emotional resilience — not just piece movements.</p>
                 </div>
               </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mt-6">
              <BookOpen className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                <span className="font-extrabold">Research:</span> A study published in <span className="italic">SAGE Open</span> (2016) found that expert-guided chess instruction improved children's problem-solving skills by 17% compared to self-directed play.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 lg:p-10 gs-shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-amber-100/50 rounded-full blur-[40px] md:blur-[60px] pointer-events-none" />
              <div className="flex flex-col gap-6 relative z-10">
                {/* Top: Image + Name side by side */}
                <div className="flex items-center gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <img loading="lazy" decoding="async" width={1920} height={1280} src="/young-man-deep-in-thought-while-playing-game-of-ch-2026-01-09-00-57-38-utc.webp" alt="Tarun R., Head Coach & Founder" className="size-40 md:size-48 rounded-2xl object-cover border-2 border-slate-200 gs-shadow-lg relative z-10" />
                  </div>
                  <div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-widest-gs mb-1.5 px-2 py-0.5">Head Coach & Founder</Badge>
                    <h4 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs text-slate-900">Tarun R., Head Coach &amp; Founder</h4>
                  </div>
                </div>
                
                <Separator className="bg-slate-200" />
                
                {/* Credentials list */}
                <div className="grid grid-cols-1 gap-y-3.5 text-xs md:text-sm font-bold text-slate-700">
                  <div className="flex items-start gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" /> FIDE Rated &mdash; active tournament player &amp; certified arbiter <a href="https://ratings.fide.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline underline-offset-2 ml-1 whitespace-nowrap">Verify FIDE profile →</a></div>
                  <div className="flex items-start gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" /> 10+ years academic pedagogy &mdash; trained 200+ students across 3 countries</div>
                  <div className="flex items-start gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" /> Designed the ChessWize Programme &mdash; a structured 48-week curriculum focused on thinking, not memorising</div>
                  <div className="flex items-start gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" /> Students coached to 15+ state-level tournament podium finishes</div>
                  <div className="flex items-start gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" /> Specialises in emotional resilience training across every skill level — from absolute beginner to tournament player</div>
                  <div className="flex items-start gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Your child stays with the <strong>same coach</strong> for the entire programme — no rotation, no handoffs</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   MID-PAGE CTA BREAK
   ════════════════════════════════════════════════ */
function MidPageCTA() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="max-w-[900px] mx-auto px-4 md:px-8 relative z-10 text-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tighter-gs mb-3 md:mb-4 leading-tight">
          Ready to see the difference structured coaching makes?
        </h3>
        <p className="text-blue-100 text-sm md:text-base font-medium max-w-xl mx-auto mb-6 md:mb-8">
          A 50-min demo class plus counseling with a FIDE-rated coach. Zero obligation. Parents are welcome to observe any class.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <Button onClick={scrollToForm} size="lg" className="h-12 md:h-14 px-8 md:px-10 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-sm md:text-base font-bold shadow-xl shadow-blue-900/30 transition-all hover:shadow-2xl hover:scale-[1.02]">
            Book Free Demo <ArrowRight className="ml-2 size-4" />
          </Button>
          <span className="text-blue-200 text-xs font-medium flex items-center gap-1.5">
            <CheckCircle className="size-3.5" /> No credit card required
          </span>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   FOUNDER STORY
   ════════════════════════════════════════════════ */
function FounderStory() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white/80 gs-shadow-xl backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-200 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/3 shrink-0 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
           <img loading="lazy" decoding="async" width={2816} height={1536} src="/2026-04-15-10-34-00-founder-tarun-portrait.webp" alt="Tarun R., Founder and Head Coach" className="w-full aspect-square object-cover rounded-2xl border border-slate-200 relative z-10 shadow-lg grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="w-full md:w-2/3 flex flex-col">
            <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">A Note From The Founder</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 leading-tight">
              "I built ChessWize because the casual system failed my students."
            </h3>
            <div className="space-y-4 text-sm md:text-base text-slate-700 font-medium leading-relaxed italic">
              <p>For years, I watched brilliant children quit chess at 1000 Elo. They were taught to memorize openings and play fast, but when the board got complicated, they panicked and blundered.</p>
              <p>We created ChessWize to fix this structural flaw. We don't just teach children how to move pieces—we mathematically rewire how they process complex problems, handle failure, and execute strategy.</p>
              <p>If you're looking for a casual weekend hobby, we aren't the right fit. But if you want to build an emotionally resilient, analytical thinker, I invite you to book our diagnostic evaluation.</p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col">
              <span className="font-extrabold text-slate-900 tracking-tight-gs text-lg">Tarun R.</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest-gs mt-1">Founder & Head Coach</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CERTIFICATE SECTION
   ════════════════════════════════════════════════ */
function CertificateSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-[45%] text-slate-900">
            <h2 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest-gs mb-2 md:mb-3 flex items-center gap-2">
              <Award className="size-3" /> Official Recognition
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-4 md:mb-6 leading-tight">
              Graduate with <span className="text-amber-600">Distinction.</span>
            </h3>
            <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-6 md:mb-8">
              Every student who completes a phase receives a verified Certificate of Excellence — signed by FIDE-titled masters and ready for school admission portfolios, extracurricular records, or a proud share on the family group.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="size-5 text-emerald-600 shrink-0" /> Validated skill progression with phase-by-phase milestones</li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="size-5 text-emerald-600 shrink-0" /> Signed by FIDE-titled masters with verifiable coach ID</li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="size-5 text-emerald-600 shrink-0" /> Strong academic profile &amp; school admissions signal</li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="size-5 text-emerald-600 shrink-0" /> Digital + printable — share-ready for family WhatsApp &amp; LinkedIn</li>
            </ul>
          </div>
          <div className="w-full lg:w-[55%] relative mt-8 lg:mt-0">
            <div className="bg-[#fffdf5] p-6 md:p-10 rounded-3xl border border-amber-200/60 shadow-2xl relative z-10 rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer ring-1 ring-amber-100/50">
              {/* Watermark pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #b45309 35px, #b45309 36px)' }} />
              
              <div className="border-[3px] border-double border-amber-600/40 rounded-xl p-6 md:p-10 bg-gradient-to-b from-[#fffef8] to-[#fefcf0] text-center relative overflow-hidden">
                {/* Corner ornaments */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500/40 rounded-tl-sm" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500/40 rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500/40 rounded-br-sm" />

                {/* Inner decorative border */}
                <div className="absolute inset-5 border border-amber-400/15 rounded-lg pointer-events-none" />

                {/* Logo & org */}
                <div className="flex items-center justify-center gap-2 mb-2 relative z-10">
                  <TrophyGold className="size-10 drop-shadow-lg" />
                </div>
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700/70 mb-4 relative z-10">ChessWize Academy</p>

                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-4" />

                <h4 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs text-slate-900 uppercase relative z-10">Certificate of Excellence</h4>
                <p className="text-[10px] md:text-xs text-slate-500 font-medium mt-1 relative z-10 italic">This certificate is proudly presented to</p>

                {/* Student name placeholder */}
                <div className="mt-4 mb-2 relative z-10">
                  <p className="text-xl md:text-2xl font-extrabold text-amber-700 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Aarav Sharma</p>
                  <div className="w-48 h-px bg-amber-600/30 mx-auto mt-1" />
                </div>

                <p className="text-slate-600 font-medium text-xs md:text-sm mt-3 relative z-10 max-w-xs mx-auto leading-relaxed">
                  For mastering advanced strategic planning, tactical calculation, and demonstrating exceptional cognitive growth.
                </p>

                {/* Date & ID */}
                <div className="flex items-center justify-center gap-4 mt-4 relative z-10">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Date: 15 Apr 2026</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ID: CW-2026-0847</span>
                </div>

                {/* Signatures */}
                <div className="mt-8 border-t border-amber-200/60 pt-6 grid grid-cols-3 items-end gap-4 px-2 relative z-10">
                  <div className="text-center">
                    <p className="text-sm md:text-base font-extrabold text-slate-800 italic" style={{ fontFamily: 'Georgia, serif' }}>Tarun</p>
                    <div className="w-full h-px bg-slate-300 mt-1 mb-1" />
                    <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500">Head Coach</p>
                  </div>
                  <div className="flex justify-center">
                    <SealBadge className="size-14 md:size-16 text-amber-600 drop-shadow-xl" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm md:text-base font-extrabold text-slate-800 italic" style={{ fontFamily: 'Georgia, serif' }}>FIDE Verified</p>
                    <div className="w-full h-px bg-slate-300 mt-1 mb-1" />
                    <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500">Certification</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Shadow card behind */}
            <div className="absolute top-2 left-2 w-full h-full bg-amber-700/10 rounded-3xl -rotate-2 sm:-rotate-3 z-0 shadow-lg border border-amber-500/10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   VALUE STACK (Pricing)
   ════════════════════════════════════════════════ */
function ValueStack() {
  const formats = [
    {
      title: "Group Sessions",
      subtitle: "Max 6 students per batch",
      icon: Users,
      perSession: 375,
      unit: "per student / session",
      accent: "slate",
      badge: null,
      tiers: [
        { sessions: 24, total: 9000, discountPct: 10, final: 8100 },
        { sessions: 48, total: 18000, discountPct: 15, final: 15300 },
        { sessions: 96, total: 36000, discountPct: 20, final: 28800 },
      ],
    },
    {
      title: "Two-on-One",
      subtitle: "Siblings or friend pairs · price per student",
      icon: UserPlus,
      perSession: 550,
      unit: "per student / session",
      note: "Both students attend the same session",
      accent: "blue",
      badge: "Most Popular",
      tiers: [
        { sessions: 24, total: 13200, discountPct: 10, final: 11880 },
        { sessions: 48, total: 26400, discountPct: 15, final: 22440 },
        { sessions: 96, total: 52800, discountPct: 20, final: 42240 },
      ],
    },
    {
      title: "Individual (1-on-1)",
      subtitle: "Highest-intensity personalisation",
      icon: User,
      perSession: 1000,
      unit: "per session",
      accent: "amber",
      badge: null,
      tiers: [
        { sessions: 24, total: 24000, discountPct: 10, final: 21600 },
        { sessions: 48, total: 48000, discountPct: 15, final: 40800 },
        { sessions: 96, total: 96000, discountPct: 20, final: 76800 },
      ],
    },
  ];

  const inclusions = [
    "Live training with FIDE-rated coaches",
    "24×7 access to the ChessWize student platform",
    "Daily puzzle routines & homework tracking",
    "Mistake analysis & behavioural review",
    "Parental dashboard with progress telemetry",
    "Official certificate on programme completion",
  ];

  const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <section id="tuition" className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-amber-100 text-amber-800 border-0 rounded-full font-bold mb-4 md:mb-6 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">Tuition &amp; Investment</Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 md:mb-6 text-slate-900 leading-tight">
            Transparent pricing. <span className="text-blue-600">Pick your format.</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            All three formats include the same curriculum, coaches, and platform access. Choose the attention level that fits your child.
          </p>
          <div className="mt-5 md:mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs md:text-sm rounded-full px-4 py-2">
            <CalendarCheck className="size-4 text-amber-700" />
            <span>Next batch starts <span className="text-amber-900">{getNextCohortDate()}</span> · limited seats per format</span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-14">
          {formats.map((fmt, i) => {
            const Icon = fmt.icon;
            const featured = fmt.accent === "blue";
            return (
              <div
                key={i}
                className={`relative rounded-3xl border flex flex-col hover-lift transition-all overflow-hidden ${
                  featured
                    ? "bg-slate-900 text-slate-50 border-blue-500 shadow-2xl shadow-blue-500/20 md:-translate-y-2"
                    : "bg-slate-50 text-slate-900 border-slate-200 gs-shadow-md hover:border-blue-300"
                }`}
              >
                {fmt.badge && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-extrabold uppercase tracking-widest-gs px-3 py-1.5 rounded-bl-xl shadow-lg">
                    {fmt.badge}
                  </div>
                )}

                <div className="p-6 md:p-8 border-b border-slate-200/20">
                  <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${featured ? "bg-blue-500/20" : "bg-blue-100"}`}>
                    <Icon className={`size-6 ${featured ? "text-blue-300" : "text-blue-600"}`} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-extrabold tracking-tight-gs mb-1">{fmt.title}</h4>
                  <p className={`text-xs md:text-sm font-medium ${featured ? "text-slate-400" : "text-slate-600"}`}>{fmt.subtitle}</p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-extrabold tracking-tighter-gs">{fmtINR(fmt.perSession)}</span>
                    <span className={`text-xs font-medium ${featured ? "text-slate-400" : "text-slate-500"}`}>{fmt.unit}</span>
                  </div>
                  {fmt.note && (
                    <p className={`text-[10px] font-medium mt-1 ${featured ? "text-slate-500" : "text-slate-400"}`}>
                      {fmt.note}
                    </p>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col gap-3 flex-1">
                  {fmt.tiers.map((t, j) => (
                    <div
                      key={j}
                      className={`rounded-xl px-4 py-3 flex items-center justify-between border ${
                        featured
                          ? "bg-slate-800/60 border-slate-700"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold">{t.sessions} sessions</span>
                        <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest-gs ${featured ? "text-emerald-400" : "text-emerald-600"}`}>
                          Save {t.discountPct}%
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-base md:text-lg font-extrabold tracking-tight-gs">{fmtINR(t.final)}</span>
                        <span className={`text-[10px] md:text-[11px] line-through ${featured ? "text-slate-500" : "text-slate-400"}`}>{fmtINR(t.total)}</span>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={scrollToForm}
                    className={`mt-3 h-12 md:h-14 w-full font-extrabold text-sm md:text-base rounded-xl shadow-lg ${
                      featured
                        ? "bg-blue-500 hover:bg-blue-400 text-white"
                        : "gs-btn bg-blue-600 hover:bg-blue-700 text-slate-50"
                    }`}
                  >
                    Book Free Demo <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 30-day refund guarantee banner — the most-agreed missing element */}
        <div className="mb-6 md:mb-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-emerald-200 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 shadow-sm">
          <div className="size-12 md:size-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 ring-4 ring-emerald-50">
            <Shield className="size-6 md:size-7 text-emerald-700" />
          </div>
          <div className="flex-1">
            <h4 className="text-base md:text-lg font-extrabold tracking-tight-gs text-slate-900 mb-1">100% refund on unused sessions. Cancel any time.</h4>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-snug">
              If your child loses interest or the fit isn&apos;t right, email or WhatsApp us and we refund every un-attended session. Pause your plan for exam month without losing your coach. No awkward calls. No fine print.
            </p>
          </div>
        </div>

        {/* Inclusions strip */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-5 md:mb-6">
            <h4 className="text-lg md:text-xl font-extrabold tracking-tight-gs text-slate-900 shrink-0">Every format includes</h4>
            <div className="h-px flex-1 bg-slate-200 hidden md:block" />
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {inclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment trust row */}
        <div className="mt-6 md:mt-8 rounded-2xl bg-white border border-slate-200 p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm">
            <div className="flex items-start gap-3">
              <Lock className="size-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-slate-900 text-xs md:text-sm">Secure payments</p>
                <p className="text-[11px] md:text-xs text-slate-500 font-medium">Razorpay-secured · UPI / Cards / Netbanking</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="size-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-slate-900 text-xs md:text-sm">No-cost EMI available</p>
                <p className="text-[11px] md:text-xs text-slate-500 font-medium">Pay in 3 / 6 / 12 monthly instalments on 48+ session plans</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="size-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-slate-900 text-xs md:text-sm">Human counsellor</p>
                <p className="text-[11px] md:text-xs text-slate-500 font-medium">Call <a href="tel:+917007578072" className="text-blue-600 font-bold">+91 70075 78072</a> or WhatsApp in &lt;10 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   STAR PERFORMERS
   ════════════════════════════════════════════════ */
function StarPerformers() {
  const performers = [
    {
      name: "Saanvika",
      hook: "Won her first rated tournament in month four.",
      context: "Coach fixed a recurring rook-endgame leak with a targeted 6-week module. Broke 1000 Elo in month two, hit 1340 by month six.",
      img: "/saanvika-tournament.webp",
      tag: "800 → 1340 Elo",
      duration: "6 Months"
    },
    {
      name: "Mikaeel",
      hook: "Stretched his focus from 5 minutes to 45 — without a single tantrum.",
      context: "Joined as an absolute beginner who couldn't sit still. Puzzle solve rate went 30% → 76% in 8 weeks; crossed 1100 Elo in four months.",
      img: "/mikaeel-portrait.webp",
      tag: "0 → 1100 Elo",
      duration: "4 Months"
    },
    {
      name: "Avyukt",
      hook: "Promoted through two cohort levels in 10 weeks.",
      context: "Coach flagged exceptional pattern recognition — spotting knight forks three moves ahead by week six. Puzzle accuracy now 91%.",
      img: "/avyukt-portrait.webp",
      tag: "Fast-Track Promotion",
      duration: "10 Weeks"
    }
  ];
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-blue-500/10 text-blue-700 border border-blue-500/30 rounded-full font-bold mb-4 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            <Trophy className="size-3 mr-1.5 inline" /> Our Star Performers
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 leading-tight">
            Excellence is <span className="text-blue-600">engineered.</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Meet the students who have fully embraced the ChessWize Programme and are dominating their local tournament circuits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {performers.map((p, i) => (
            <Suspense key={i} fallback={<div className="rounded-3xl bg-white/80 gs-shadow-xl backdrop-blur-md border border-slate-200 p-6 md:p-8 min-h-[420px]" />}>
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="white" glarePosition="all" className="rounded-3xl">
              <div className="bg-white/80 gs-shadow-xl backdrop-blur-md rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative mb-6">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                    <img loading="lazy" decoding="async" width={640} height={480} src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute -bottom-4 right-4 bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-widest-gs px-3 py-1 rounded-md shadow-lg border border-blue-500">
                    {p.tag}
                  </div>
                  <div className="absolute -bottom-4 left-4 bg-blue-600 text-slate-50 font-extrabold text-[10px] uppercase tracking-widest-gs px-3 py-1 rounded-md shadow-lg border border-blue-500">
                    {p.duration}
                  </div>
                </div>

                <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight-gs mb-2">{p.name}</h4>
                <p className="text-sm md:text-base text-blue-700 font-bold leading-snug mb-2">
                  {p.hook}
                </p>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {p.context}
                </p>
              </div>
            </Tilt>
            </Suspense>
          ))}
        </div>      </div>
    </section>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="inline-flex items-center gap-[2px]" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#D97706"
          className="text-amber-500"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.95 6.36 7.05.64-5.33 4.74 1.6 6.86L12 17.77l-6.27 3.33 1.6-6.86L2 9.5l7.05-.64L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

function WallOfLove() {
  const prefersReducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    prefersReducedMotion ? [] : [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const reviews = [
    {
      headline: "Honestly, I was skeptical about online chess coaching.",
      quote: "Aadvik hated sitting still for anything, and I thought a Zoom class would last two weeks max. It's been six months. Last Sunday his class teacher called just to ask what changed — his attention in maths has jumped. He now does his puzzles before I'm up. Coach Arjun has the patience I don't.",
      metric: "Puzzle accuracy 25% → 61%",
      author: "Rupali Sharma",
      role: "Mother of Aadvik (9)",
      city: "Lucknow",
      date: "March 2026",
      img: "/review-rupali.webp",
    },
    {
      headline: "She used to cry after every loss. Not anymore.",
      quote: "Anika was playing 'casually' on chess.com and hanging pieces every game. First month the coach didn't even push ratings — just drilled Checks-Captures-Threats. The dashboard is what sold me though. I don't know chess, but I can see exactly what she covered each week. Her rating climbed on its own by week eight.",
      metric: "Online rating 500 → 780",
      author: "Monika Iyer",
      role: "Mother of Anika (11)",
      city: "Kanpur",
      date: "February 2026",
      img: "/review-monika.webp",
    },
    {
      headline: "The resilience piece was unexpected — and the real win.",
      quote: "We signed up for chess. What Ishita got was emotional self-regulation. Month one was all about learning to lose without falling apart. By month three she was analysing her own games after tournaments, pointing out where she'd blundered, calmly. Her Elo followed. But honestly, the composure is what I'll remember.",
      metric: "Elo 650 → 920 in 4 months",
      author: "Anjana Rao",
      role: "Mother of Ishita (10)",
      city: "Mumbai",
      date: "January 2026",
      img: "/review-anjana.webp",
    },
  ];
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Parent Reviews</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-4 leading-tight">
            Verified by parents worldwide.
          </h3>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-8">
              {reviews.map((r, i) => (
                <div key={i} className="pl-4 md:pl-8 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <div className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl flex flex-col h-full cursor-default transition-all">
                    <div className="mb-4">
                      <Stars count={5} />
                    </div>
                    <p className="text-slate-900 font-extrabold text-lg md:text-xl leading-snug tracking-tight-gs mb-3">
                      {r.headline}
                    </p>
                    <p className="text-slate-700 italic text-sm md:text-base leading-relaxed mb-5">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                    <div className="inline-flex self-start items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] md:text-xs font-bold text-amber-800 tracking-tight mb-6">
                      {r.metric}
                    </div>
                    <div className="flex items-center gap-4 border-t border-slate-100 pt-5 mt-auto">
                      {/* Not lazy: the first carousel slide is already in view.
                          lazy-load + embla transform combo was causing Safari
                          to defer the load indefinitely on the active slide. */}
                      <img src={r.img} alt={r.author} width={48} height={48} decoding="async" className="size-12 rounded-full border-2 border-slate-100 gs-shadow shrink-0 object-cover bg-slate-100" />
                      <div className="min-w-0 text-sm">
                        <p className="font-bold text-slate-900 leading-tight">{r.author}</p>
                        <p className="text-[12px] text-slate-500 font-medium leading-tight mt-0.5">
                          {r.role} · {r.city}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium leading-tight mt-1">{r.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows — hidden on small screens (swipe) */}
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous review"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next review"
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`rounded-full transition-all ${activeIndex === i ? "w-6 h-2 bg-blue-600" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>

        {/* Swipe hint on mobile only */}
        <p className="md:hidden text-center text-[10px] text-slate-400 font-medium mt-3 flex items-center justify-center gap-1.5">
          <ArrowLeft className="size-3" /> Swipe to see more <ArrowRight className="size-3" />
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   HOW IT WORKS
   ════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Free Demo & Counseling",
      desc: "A 50-minute 1-on-1 virtual session where our coach maps your child's calculation depth, attention span, emotional response to losing, and opening knowledge — and you get a personalised plan from a counselor.",
      bullets: [
        "Personalised diagnostic — not a generic quiz",
        "Written report delivered within 24 hours",
        "Specific data points, not vague praise",
      ],
      icon: Target,
      detail: "50 min · 1-on-1 · Written report included",
      color: "blue",
    },
    {
      num: "02",
      title: "Cohort Placement",
      desc: "Based on the diagnostic, we place your child into a small group of max 6 students at the same cognitive level — not just the same age.",
      bullets: [
        "FIDE-certified master assigned as dedicated coach",
        "Personalised 12-week roadmap built from diagnostic",
        "Grouped by skill level, not age or school grade",
      ],
      icon: Users,
      detail: "Max 6 students · Matched by skill, not age",
      color: "blue",
    },
    {
      num: "03",
      title: "Weekly Virtual Training + Dashboard",
      desc: "Your child logs into live interactive sessions from home. After every session, the coach uploads detailed notes to your Parent Dashboard.",
      bullets: [
        "Topics covered, mistakes identified, homework assigned",
        "Weekly accuracy trend graph and Elo tracker",
        "Recorded replays available within 2 hours",
      ],
      icon: Activity,
      detail: "Live sessions · Recorded replays · Weekly parent reports",
      color: "blue",
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; numBg: string; numText: string; bulletDot: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-200 hover:border-blue-400", text: "text-blue-600", numBg: "bg-blue-600", numText: "text-white", bulletDot: "bg-blue-400" },
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-blue-50 text-blue-700 border-0 rounded-full font-bold mb-4 md:mb-6 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            The Process
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 md:mb-6 text-slate-900 leading-tight">
            How our <span className="text-blue-600">training process</span> works.
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Three clear steps from first contact to measurable results. No guesswork, no wasted time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <div key={i} className={`flex flex-col ${c.bg} border ${c.border} p-6 md:p-8 rounded-3xl transition-all relative overflow-hidden`}>
                {/* Step number */}
                <div className={`${c.numBg} ${c.numText} text-xs font-extrabold w-8 h-8 rounded-lg flex items-center justify-center mb-5 shadow-sm`}>
                  {step.num}
                </div>

                {/* Icon */}
                <div className={`size-12 md:size-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-sm`}>
                  <step.icon className={`size-6 ${c.text}`} />
                </div>

                <h4 className="text-lg md:text-xl font-extrabold tracking-tight-gs text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">{step.desc}</p>

                {/* Bullet points */}
                <ul className="space-y-2 mb-5">
                  {step.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                      <span className={`${c.bulletDot} size-1.5 rounded-full mt-2 shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-slate-200/60">
                  <span className={`text-[10px] font-extrabold ${c.text} uppercase tracking-widest-gs`}>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connector arrows (desktop only) */}
        <div className="hidden md:flex items-center justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="size-2 rounded-full bg-blue-500" /> Evaluate
          </div>
          <ArrowRight className="size-4 text-slate-300" />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="size-2 rounded-full bg-blue-500" /> Place
          </div>
          <ArrowRight className="size-4 text-slate-300" />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="size-2 rounded-full bg-blue-500" /> Train
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════ */
function FAQ() {
  type FaqCategory = "fit" | "logistics" | "pricing";
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("fit");

  const categories: { id: FaqCategory; label: string }[] = [
    { id: "fit", label: "Learning & Fit" },
    { id: "logistics", label: "Logistics" },
    { id: "pricing", label: "Pricing & Guarantee" },
  ];

  const faqs: { q: string; a: string; category: FaqCategory }[] = [
    {
      category: "fit",
      q: "My child is 5 and can't sit still for 10 minutes. Will this work?",
      a: "Yes. Our Foundation Programme is specifically designed for high-energy children. We use rapid-fire, gamified puzzles that naturally stretch their attention span over 30 days. Parents typically report their child going from 5-minute focus to 25-30 minutes within the first month — not because they're forced to sit, but because the puzzles are genuinely engaging at their exact skill level.",
    },
    {
      category: "fit",
      q: "How is this different from the free chess.com app?",
      a: "Free apps teach you how the pieces move. We teach a child how to think under pressure. An app won't correct your child's frustration when they lose, nor will it explain why their impulsive decision-making is failing. Our FIDE masters provide live tactical and emotional coaching. Apps give everyone the same puzzles; we diagnose your child's specific weaknesses and build a custom drill set around them.",
    },
    {
      category: "fit",
      q: "My child already has a chess coach. Why should I switch?",
      a: "Most coaches teach openings and tactics in a generic sequence. We start with a diagnostic that identifies your child's specific gaps — calculation depth, attention decay, emotional response to losing — and build a programme around them. If your child has been stuck at the same rating for 3+ months, the issue is usually structural, not effort. Our programme is built to break those plateaus.",
    },
    {
      category: "fit",
      q: "Is this only for competitive players?",
      a: "No. About 40% of our students have no interest in tournaments. Their parents enrolled them because chess is one of the most effective tools for building focus, patience, and logical thinking — skills that carry straight into school. Whether you want competitive Elo growth or cognitive development, the programme adapts to your child's goals.",
    },
    {
      category: "logistics",
      q: "What if my child misses a live session?",
      a: "Every session is recorded and uploaded to your parent dashboard within 2 hours. Your child can watch the replay at their own pace. Daily puzzles and the analysis tools ensure they stay with the cohort. If they miss more than 2 sessions in a row, their coach proactively reaches out to reschedule.",
    },
    {
      category: "logistics",
      q: "Do I need to know chess to help them?",
      a: "Absolutely not. Our system is fully self-contained. Your only job is to check the parent dashboard — it shows progress in plain English: topics covered, accuracy percentages, and Elo growth charts. No chess knowledge needed.",
    },
    {
      category: "logistics",
      q: "Can parents observe a class?",
      a: "Yes — parents are welcome to sit in on any class, anytime. No advance notice needed. You can also watch recorded class replays from your dashboard.",
    },
    {
      category: "logistics",
      q: "What software or device does my child need?",
      a: "Any laptop, desktop, or tablet with a stable internet connection and a webcam. Classes run on Zoom plus our own student platform for puzzles, homework, and progress tracking. Nothing to install — it all runs in the browser.",
    },
    {
      category: "pricing",
      q: "How much does it cost?",
      a: "We publish all our rates transparently — see the Tuition section above. Group sessions start at ₹375/session, Two-on-One at ₹550, and 1-on-1 at ₹1,000. You get 10–20% off depending on package size (24, 48, or 96 sessions). No hidden fees, no long-term lock-in. You can pause or cancel anytime.",
    },
    {
      category: "pricing",
      q: "What exactly is the 30-day guarantee?",
      a: "We guarantee visible growth. If, after 30 days of attending our sessions and doing the daily puzzles, you don't see noticeable improvement in your child's patience or focus, we refund 100% of your tuition. No questions asked. We track this objectively via dashboard metrics, so there's no ambiguity.",
    },
  ];

  const visibleFaqs = faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 text-slate-900 gs-grid-pattern border-t border-slate-200">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Frequently Asked Questions</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 text-slate-900 leading-tight">
            Parents usually ask <span className="text-blue-600">these first.</span>
          </h3>
        </div>

        <div role="tablist" className="flex flex-wrap items-center justify-center gap-2 mb-6 md:mb-8">
          {categories.map((c) => {
            const active = c.id === activeCategory;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-extrabold uppercase tracking-widest-gs border transition-all ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <Accordion className="w-full space-y-4">
          {visibleFaqs.map((faq, i) => (
            <AccordionItem key={`${activeCategory}-${i}`} value={`item-${activeCategory}-${i}`} className="border border-slate-200 bg-white/80 gs-shadow-xl rounded-2xl px-4 md:px-6 py-2 gs-shadow-sm">
              <AccordionTrigger className="text-left text-base md:text-lg font-extrabold tracking-tight-gs hover:text-blue-600 hover:no-underline transition-colors py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 font-medium text-sm md:text-base leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CONTACT / BOOKING SECTION (Bottom)
   ════════════════════════════════════════════════ */
const formSchema = z.object({
  /* Step 1 — minimum viable lead (required) */
  parent_name: z.string().min(2, "Parent's name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[0-9\s-]{10,20}$/, "Please enter a valid phone number"),
  child_age_range: z.string().min(1, "Please select your child's age group"),
  child_level: z.string().min(1, "Please select an estimated level"),
  /* Step 2 & 3 — enrichment fields (optional; submit works with just Step 1) */
  child_name: z.string().min(2, "Child's name must be at least 2 characters").optional().or(z.literal("")),
  city: z.string().min(2, "Please enter your city").optional().or(z.literal("")),
  referral_source: z.string().optional(),
  parent_concern: z.array(z.string()).optional(),
  parent_commitment: z.string().optional(),
  /* Honeypot — hidden from real users, bots auto-fill it */
  website_url: z.string().max(0, "Bot detected").optional(),
});

type FormData = z.infer<typeof formSchema>;

type Delivery = { leadSaved: boolean };

const FORM_DRAFT_KEY = "cw.form.draft";

function BottomForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [spamError, setSpamError] = useState("");
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState<Delivery>({ leadSaved: false });
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string | null>(null);
  const formLoadedAt = useRef(Date.now());
  const jsToken = useRef(Math.random().toString(36).slice(2) + Date.now().toString(36));
  const leadStartFired = useRef(false);
  const step2Fired = useRef(false);
  const navigate = useNavigate();
  // Turnstile state removed — see import comment. Bot defences are now
  // entirely server-side: honeypot input (website_url), form duration ≥8s
  // time-gate, and the worker's origin allowlist. That's what was carrying
  // the load anyway while Turnstile itself was broken.

  const { register, handleSubmit, formState: { errors }, reset, trigger, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    // Default phone to +91 since we only run paid in India — saves a tap and
    // nudges the user into the correct format the backend expects.
    defaultValues: { phone: "+91 " } as Partial<FormData>,
  });

  // Pre-fill child_age_range if the user picked one in the hero dropdown,
  // then restore any persisted draft so a failed or reloaded session doesn't
  // force the parent to retype everything.
  useEffect(() => {
    try {
      const pre = sessionStorage.getItem("cw.hero.age");
      if (pre) {
        setValue("child_age_range", pre, { shouldValidate: false, shouldDirty: false });
        sessionStorage.removeItem("cw.hero.age");
      }
    } catch { /* sessionStorage blocked — no-op */ }
    try {
      const raw = localStorage.getItem(FORM_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Partial<FormData>;
        if (draft && typeof draft === "object") {
          (Object.keys(draft) as (keyof FormData)[]).forEach((k) => {
            const v = draft[k];
            if (v !== undefined && v !== null && v !== "") {
              setValue(k, v as FormData[typeof k], { shouldValidate: false, shouldDirty: false });
            }
          });
        }
      }
    } catch { /* localStorage blocked or malformed — no-op */ }
  }, [setValue]);

  // Persist the in-progress form to localStorage so the parent doesn't lose
  // typed answers if the server rejects the submit, the tab closes, or they
  // refresh mid-way. Cleared on successful submission below.
  useEffect(() => {
    const sub = watch((values) => {
      try {
        const { website_url: _hp, ...safe } = values as Record<string, unknown>;
        void _hp;
        localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(safe));
      } catch { /* quota or privacy mode — no-op */ }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  // Turnstile mount effect removed.

  const fireLeadStartOnce = () => {
    if (leadStartFired.current) return;
    leadStartFired.current = true;
    trackLeadFormStart();
  };

  const handleNextStep = async (fieldsToValidate: (keyof FormData)[]) => {
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      // When advancing past step 1 the user has completed the minimum-viable
      // lead fields — fire the LeadStep2 custom event (for retargeting) once.
      if (step === 1 && !step2Fired.current) {
        step2Fired.current = true;
        trackLeadStep2();
      }
      setStep((prev) => prev + 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setSpamError("");

    /* Anti-spam: honeypot check */
    if (data.website_url && data.website_url.length > 0) return;

    /* Anti-spam: time-gate — real parents take >8s to fill 8 fields */
    const elapsed = (Date.now() - formLoadedAt.current) / 1000;
    if (elapsed < 8) {
      setSpamError("You submitted too quickly. Please take a moment to fill in the form carefully.");
      return;
    }

    setStatus("sending");
    const { website_url: _hp, ...cleanData } = data;
    void _hp;

    /*
     * Lead-delivery flow (single-source-of-truth):
     *   1. POST to /api/leads → Cloudflare Worker pushes to Zoho CRM + emails
     *      counsellor via Resend + fires Meta CAPI Lead (shared event_id).
     *   2. On success, navigate to /thank-you?eid=<uuid>. The ThankYou page
     *      fires the browser-side fbq Lead with that same event_id so Meta
     *      dedupes server + browser to a single event.
     *   3. On failure, we preserve the typed answers and surface a clear
     *      retry error. We no longer auto-pop a WhatsApp tab — that popup
     *      was getting blocked by browsers and producing a confusing fallback
     *      message. The green WhatsApp CTA remains available as a manual
     *      escape hatch if the parent wants to chat directly.
     */
    const attribution = getAttribution() ?? undefined;

    let leadSaved = false;
    let eventId: string | undefined;
    let failureDetail: string | undefined;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...cleanData,
          js_token: jsToken.current,
          form_duration_s: Math.round(elapsed),
          // turnstile_token intentionally omitted — server allows token-less
          // submits now that TURNSTILE_SECRET_KEY is unset on the Worker.
          attribution,
        }),
      });
      leadSaved = res.ok;
      if (res.ok) {
        const payload = await res.json().catch(() => ({} as { event_id?: string }));
        eventId = typeof payload.event_id === "string" ? payload.event_id : undefined;
      } else {
        const body = await res.json().catch(() => ({} as { error?: string }));
        failureDetail = typeof body?.error === "string" ? body.error : `http_${res.status}`;
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[lead] /api/leads returned", res.status, failureDetail);
        }
      }
    } catch (err) {
      leadSaved = false;
      failureDetail = "network";
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("[lead] fetch failed", err);
      }
    }

    if (leadSaved && eventId) {
      // Happy path — clear the draft, reset the form, navigate to /thank-you
      // so browser+server Lead dedupe.
      try { localStorage.removeItem(FORM_DRAFT_KEY); } catch { /* no-op */ }
      reset();
      navigate(`/thank-you?eid=${encodeURIComponent(eventId)}`);
      return;
    }

    if (leadSaved) {
      // Lead stored but the server didn't return an event_id — rare. Still a
      // legitimate success from the parent's perspective; keep the draft
      // cleared and show the success UI.
      try { localStorage.removeItem(FORM_DRAFT_KEY); } catch { /* no-op */ }
      setDelivery({ leadSaved: true });
      setStatus("success");
      setStep(4);
      reset();
      return;
    }

    // Failure — leave the form populated (localStorage already has the draft)
    // so the parent can retry without retyping.
    setStatus("error");
    setSubmitErrorMsg(
      "We couldn't save your details right now. Please try again in a moment — your answers are saved on this page, so nothing's lost."
    );
    void failureDetail;
  };

  const inputCls = (hasError: boolean) => `w-full px-4 py-3 text-sm md:text-base border-2 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all shadow-sm ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20 hover:border-slate-400'}`;

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <section id="book-evaluation" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-2 md:mb-3">Take the next step</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-3 md:mb-4 leading-tight">
            Book Your Child's Free Demo & Counseling
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            This isn't a generic sign-up form. We ask a few extra questions so our coach can prepare a personalised evaluation — not a cookie-cutter demo. Our academic counsellor uses these answers to match the right coach and batch.
          </p>
          <div className="mt-5 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
              <CheckCircle className="size-3.5 text-emerald-500" /> 50-min demo + counseling
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
              <CheckCircle className="size-3.5 text-emerald-500" /> Parents welcome to observe any class
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
              <CheckCircle className="size-3.5 text-emerald-500" /> WhatsApp reply in 4 hours
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 gs-border gs-shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[60px] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {step === 4 ? (
              <motion.div
                key="success"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                role="status"
                aria-live="polite"
                className="text-center py-12 relative z-10"
              >
                <div className="size-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="size-10 text-emerald-600" />
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight-gs text-slate-900 mb-3">
                  We got your details
                </h4>
                <p className="text-base md:text-lg font-medium text-slate-600 mb-4">
                  Our academic counsellor will reach out on the WhatsApp number you shared, usually within a few hours.
                </p>
                <p className="text-sm text-slate-500 font-medium mb-5">
                  Your coach will review your answers before the call so the evaluation is tailored to your child from minute one.
                </p>
                <a
                  href={buildWhatsAppHref({ source: "form_success", text: "Hi, I've just submitted a demo booking on chesswize.in." })}
                  onClick={onWhatsAppClick("form_success")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg transition-all active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat with us on WhatsApp
                </a>
              </motion.div>
            ) : (
              <motion.form key="form" initial="hidden" animate="visible" exit="exit" variants={stepVariants} onSubmit={handleSubmit(onSubmit)} onFocus={fireLeadStartOnce} onInput={fireLeadStartOnce} className="flex flex-col relative z-10 w-full">
                
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: `${((step - 1) / 3) * 100}%` }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {step === 1 && "Tell us who your child is"}
                    {step === 2 && "A few details (optional)"}
                    {step === 3 && "Last bits (optional)"}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest-gs">Step {step} of 3</span>
                </div>

                {/* Honeypot — invisible to humans, bots auto-fill */}
                <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="website_url">Website</label>
                  <input id="website_url" {...register("website_url")} type="text" autoComplete="off" tabIndex={-1} />
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="flex flex-col gap-4 md:gap-5">
                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_parent_name" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Parent's Full Name <span className="text-red-500">*</span></label>
                        <input id="bottom_parent_name" {...register("parent_name")} type="text" autoComplete="name" className={inputCls(!!errors.parent_name)} placeholder="e.g. Rahul Sharma" />
                        {errors.parent_name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.parent_name.message}</p>}
                      </div>

                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_phone" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">WhatsApp Number <span className="text-red-500">*</span></label>
                        <input id="bottom_phone" {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" className={inputCls(!!errors.phone)} placeholder="+91 98765 43210" />
                        {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.phone.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div className="flex flex-col gap-1.5 md:gap-2 min-w-0">
                          <label htmlFor="bottom_child_age_range" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Child's Age <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <select id="bottom_child_age_range" {...register("child_age_range")} className={inputCls(!!errors.child_age_range) + " appearance-none cursor-pointer pr-10 truncate"}>
                              <option value="">Select age group</option>
                              <option value="4-6">4 - 6 Years</option>
                              <option value="7-9">7 - 9 Years</option>
                              <option value="10-12">10 - 12 Years</option>
                              <option value="13+">13+ Years</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                          </div>
                          {errors.child_age_range && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.child_age_range.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5 md:gap-2 min-w-0">
                          <label htmlFor="bottom_child_level" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Current Chess Level <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <select id="bottom_child_level" {...register("child_level")} className={inputCls(!!errors.child_level) + " appearance-none cursor-pointer pr-10 truncate"}>
                              <option value="">Select level</option>
                              <option value="never-played">Never played</option>
                              <option value="knows-rules">Knows the rules</option>
                              <option value="beginner">Beginner (&lt;800 Elo)</option>
                              <option value="intermediate">Intermediate (800–1200)</option>
                              <option value="advanced">Advanced (1200+)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                          </div>
                          <p className="text-[10px] md:text-[11px] text-slate-500 font-medium mt-1">Not sure? Pick your best guess — the coach confirms on the demo call.</p>
                          {errors.child_level && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.child_level.message}</p>}
                        </div>
                      </div>

                      <Button type="button" onClick={() => handleNextStep(['parent_name', 'phone', 'child_age_range', 'child_level'])} className="w-full h-14 mt-2 text-base font-extrabold tracking-tight gs-btn gs-btn-primary rounded-xl shadow-lg">
                        Continue to Next Step <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="flex flex-col gap-4 md:gap-5">
                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_child_name" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Child's First Name</label>
                        <input id="bottom_child_name" {...register("child_name")} type="text" className={inputCls(!!errors.child_name)} placeholder="e.g. Aarav" />
                        {errors.child_name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.child_name.message}</p>}
                      </div>

                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">
                          What do you want chess to do for your child?
                        </label>
                        <p className="text-[10px] text-slate-400 font-medium -mt-0.5">Pick all that apply — our coach uses this to tailor the demo.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {[
                            { value: "focus", label: "Improve focus & attention span" },
                            { value: "math", label: "Boost math, logic & school performance" },
                            { value: "screen_time", label: "Replace passive screen time" },
                            { value: "tournament", label: "Train for tournaments / FIDE rating" },
                            { value: "confidence", label: "Build confidence & emotional resilience" },
                            { value: "exploring", label: "Just exploring — not sure yet" },
                          ].map((opt) => {
                            const selected = (watch("parent_concern") ?? []).includes(opt.value);
                            return (
                              <label
                                key={opt.value}
                                className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                                  selected
                                    ? "border-blue-600 bg-blue-50 shadow-sm"
                                    : "border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  value={opt.value}
                                  {...register("parent_concern")}
                                  className="mt-0.5 size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                                />
                                <span className="text-xs md:text-[13px] font-bold text-slate-800 leading-snug">
                                  {opt.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        {errors.parent_concern && <p className="text-[10px] text-red-500 font-bold mt-1">{(errors.parent_concern as any).message}</p>}
                      </div>

                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_commitment" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">What is your commitment level?</label>
                        <div className="relative">
                          <select id="bottom_commitment" {...register("parent_commitment")} className={inputCls(!!errors.parent_commitment) + " appearance-none cursor-pointer pr-10"}>
                            <option value="">Select commitment</option>
                            <option value="casual">Casual (Just want a fun hobby)</option>
                            <option value="serious">Serious (Looking for structured, long-term cognitive growth)</option>
                            <option value="competitive">Competitive (Aiming for FIDE rating / tournaments)</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                        </div>
                        {errors.parent_commitment && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.parent_commitment.message}</p>}
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button type="button" onClick={() => setStep(1)} variant="outline" className="h-14 px-6 font-bold text-slate-600 border-slate-200 rounded-xl hover:bg-slate-50">
                          <ArrowLeft className="size-4" />
                        </Button>
                        <Button type="button" onClick={() => handleNextStep(['child_name', 'parent_concern', 'parent_commitment'])} className="flex-1 h-14 text-base font-extrabold tracking-tight gs-btn gs-btn-primary rounded-xl shadow-lg">
                          Continue to Final Step <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="flex flex-col gap-4 md:gap-5">
                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_city" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">City</label>
                        <input id="bottom_city" {...register("city")} type="text" autoComplete="address-level2" className={inputCls(!!errors.city)} placeholder="e.g. Bangalore" />
                        {errors.city && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.city.message}</p>}
                      </div>

                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_referral" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">How did you hear about us?</label>
                        <div className="relative">
                          <select id="bottom_referral" {...register("referral_source")} className={inputCls(!!errors.referral_source) + " appearance-none cursor-pointer pr-10"}>
                            <option value="">Select one</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="google">Google Search</option>
                            <option value="youtube">YouTube</option>
                            <option value="friend">Friend / Word of Mouth</option>
                            <option value="school">School / Teacher Recommendation</option>
                            <option value="other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                        </div>
                        {errors.referral_source && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.referral_source.message}</p>}
                      </div>

                      {spamError && (
                        <div role="alert" className="p-4 text-sm bg-amber-50 text-amber-700 rounded-xl border border-amber-200 font-bold">
                          {spamError}
                        </div>
                      )}
                      {status === "error" && (
                        <div role="alert" className="p-4 text-sm bg-red-50 text-red-700 rounded-xl border border-red-200 font-bold">
                          {submitErrorMsg ?? "We couldn't send your request. Please WhatsApp us directly at +91 70075 78072."}
                        </div>
                      )}
                      
                      <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-extrabold text-amber-900 uppercase tracking-widest-gs mb-1">Limited Cohort Slots</p>
                          <p className="text-xs text-amber-800 font-medium">We cap cohorts at 6 students so each child gets real attention — limited slots, first come, first served.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-2">
                        <Button type="button" onClick={() => setStep(2)} variant="outline" className="h-16 px-6 font-bold text-slate-600 border-slate-200 rounded-xl hover:bg-slate-50">
                          <ArrowLeft className="size-4" />
                        </Button>
                        <Button
                          type="submit"
                          disabled={status === "sending"}
                          className="flex-1 h-16 text-lg font-extrabold tracking-tight gs-btn gs-btn-primary rounded-xl shadow-xl hover:shadow-2xl hover-lift active:scale-[0.98]"
                        >
                          {status === "sending" ? (
                            <><Loader2 className="size-5 animate-spin mr-2" /> Processing...</>
                          ) : (
                            <>Lock In Your Evaluation <ArrowRight className="ml-2 size-5" /></>
                          )}
                        </Button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-4 text-slate-500">
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest-gs text-slate-600">
                          <Shield className="size-4 text-emerald-500" /> 30-Day Growth Guarantee
                        </span>
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest-gs">
                          <CheckCircle className="size-4 text-emerald-500" /> No Payment Required
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-400 font-medium text-center mt-2 leading-relaxed">
                        By submitting, you agree to our <Link to="/privacy-policy" className="underline hover:text-blue-600">Privacy Policy</Link>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function WhatsAppWidget() {
  // Hide the pill while the hero is on-screen so it doesn't occlude the
  // hero video's own CTA. Show once user has scrolled past 700px.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <a
      href={buildWhatsAppHref({ source: "widget" })}
      onClick={onWhatsAppClick("widget")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with an academic counselor on WhatsApp"
      className="group fixed bottom-8 right-8 z-[110] hidden lg:flex items-center gap-3 bg-emerald-500 text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all cursor-pointer border-2 border-emerald-400 pl-2 pr-5 py-2"
    >
      <span className="relative flex items-center justify-center size-11 bg-white/15 rounded-full shrink-0">
        <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-green-400 ring-2 ring-emerald-500" />
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
      <div className="flex flex-col leading-tight pr-1">
        <span className="text-[11px] font-bold uppercase tracking-widest-gs text-emerald-100">Academic Counselor</span>
        <span className="text-sm font-extrabold">Chat on WhatsApp</span>
        <span className="text-[10px] font-bold text-emerald-100">Replies in &lt;10 min</span>
      </div>
    </a>
  );
}


function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-400 border-t border-white/5 pt-20 md:pt-24 pb-28 lg:pb-10">
      {/* Ambient aurora */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.06),_transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">
        {/* ────────── Bento CTA ────────── */}
        <div className="relative rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm p-8 md:p-12 shadow-[0_20px_80px_-20px_rgba(37,99,235,0.25)] overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.18),_transparent_55%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest-gs mb-3">Still have questions?</p>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter-gs text-white leading-[1.15]">
                Your child&rsquo;s next great move starts with a <span className="text-blue-400">50-minute conversation</span>.
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                Book a free demo or message our counsellor on WhatsApp — she replies in under ten minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <Button onClick={scrollToForm} className="h-12 md:h-13 px-6 gs-btn gs-btn-primary rounded-xl font-extrabold text-sm md:text-base shadow-[0_8px_32px_-8px_rgba(37,99,235,0.6)]">
                Book Free Demo <ArrowRight className="ml-2 size-4" />
              </Button>
              <a
                href={buildWhatsAppHref({ source: "footer_bento" })}
                onClick={onWhatsAppClick("footer_bento")}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 md:h-13 inline-flex items-center justify-center gap-2 px-6 rounded-xl border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 font-extrabold text-sm md:text-base transition-all"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ────────── Main Footer Grid ────────── */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 md:pb-16">
          {/* Brand column */}
          <div className="md:col-span-6 lg:col-span-5">
            {/* Larger + guaranteed visible — drop-shadow gives the wordmark
                a subtle halo so it reads even if a caching edge delivered
                the older square-viewBox version. */}
            <img
              loading="lazy"
              src="/logo-side-white-v3.svg"
              alt="ChessWize"
              className="h-10 md:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]"
            />
            <p className="mt-5 text-sm leading-relaxed text-slate-400 font-medium max-w-md">
              Structured online chess coaching for children aged 5–14. Small cohorts, FIDE-titled coaches, and a parent dashboard that tells you exactly what your child practised each week.
            </p>

            {/* Contact line */}
            <ul className="mt-6 space-y-2.5 text-sm font-medium">
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="size-3.5 text-slate-500 shrink-0" />
                <a href="tel:+917007578072" className="hover:text-white transition-colors">+91&nbsp;70075&nbsp;78072</a>
                <span className="text-slate-600">·</span>
                <span className="text-slate-500 text-xs">10&nbsp;AM – 8&nbsp;PM IST</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="size-3.5 text-slate-500 shrink-0" />
                <a href="mailto:hello@chesswize.in" className="hover:text-white transition-colors">hello@chesswize.in</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin className="size-3.5 text-slate-500 shrink-0" />
                <span>Kanpur, Uttar Pradesh, India</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/chesswize/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ChessWize on LinkedIn"
                className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={buildWhatsAppHref({ source: "footer_social" })}
                onClick={onWhatsAppClick("footer_social")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ChessWize on WhatsApp"
                className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-300 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {/* Authentic WhatsApp glyph (not the generic speech bubble) */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore links */}
          <div className="md:col-span-3 lg:col-span-3 lg:col-start-7">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest-gs mb-5">Explore</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><button onClick={() => scrollToSection("programs")} className="text-slate-400 hover:text-white transition-colors">Programs</button></li>
              <li><button onClick={() => scrollToSection("mentors")} className="text-slate-400 hover:text-white transition-colors">Mentors</button></li>
              <li><button onClick={() => scrollToSection("testimonials")} className="text-slate-400 hover:text-white transition-colors">Testimonials</button></li>
              <li><button onClick={() => scrollToSection("methodology")} className="text-slate-400 hover:text-white transition-colors">Methodology</button></li>
              <li><button onClick={() => scrollToSection("tuition")} className="text-slate-400 hover:text-white transition-colors">Tuition</button></li>
              <li><button onClick={() => scrollToSection("faq")} className="text-slate-400 hover:text-white transition-colors">FAQ</button></li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest-gs mb-5">Legal</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-slate-400 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="text-slate-400 hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* ────────── Bottom bar ────────── */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} ChessWize · Building sharper minds, one move at a time.
          </p>
          <p className="text-xs font-medium text-slate-600">
            Made in <span className="text-slate-400">Kanpur</span> · For parents everywhere.
          </p>
        </div>
      </div>

      {/* ────────── Giant typographic watermark — architectural brand moment.
           Built as SVG so it scales proportionally at every viewport
           (preserveAspectRatio does the heavy lifting — no awkward clipping
           on narrow screens, no overflow on wide ones). ────────── */}
      <div aria-hidden="true" className="relative z-0 mt-10 md:mt-14 overflow-hidden select-none pointer-events-none">
        {/* Thin hairline separator spanning most of the width */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="w-full px-4">
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="xMidYMid meet"
            className="block w-full h-auto max-w-[1400px] mx-auto"
          >
            <defs>
              <linearGradient id="wmark-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.015" />
              </linearGradient>
            </defs>
            <text
              x="600"
              y="155"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="900"
              fontSize="180"
              letterSpacing="-8"
              fill="url(#wmark-grad)"
              textLength="1080"
              lengthAdjust="spacingAndGlyphs"
            >
              CHESSWIZE
            </text>
          </svg>
        </div>

        {/* Tagline underneath reinforces the mark and closes the moment */}
        <p className="text-center text-[10px] md:text-xs uppercase tracking-[0.35em] md:tracking-[0.4em] font-bold text-slate-500 mt-2 md:mt-4 px-4">
          Think smart · Play wise
        </p>
      </div>
    </footer>
  );
}

function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPastHero = window.scrollY > 400;
      const nearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300;
      /* Hide the sticky bar when the bottom form itself is in the viewport —
         having 2 CTAs stacked (sticky + in-form) causes mis-clicks + looks cluttered */
      const form = document.getElementById("book-evaluation");
      let formInView = false;
      if (form) {
        const rect = form.getBoundingClientRect();
        formInView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      }
      setIsVisible(scrolledPastHero && !nearBottom && !formInView);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }} 
          animate={{ y: 0 }} 
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] glass-panel border-t border-white/40 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex items-center justify-between lg:hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 to-white/75 pointer-events-none" />
          <div className="relative z-10 w-full flex gap-2">
            <Button onClick={scrollToForm} size="default" className="gs-btn gs-btn-primary rounded-xl font-extrabold tracking-tight-gs flex-1 h-12 text-sm shadow-[0_8px_16px_rgba(37,99,235,0.25)]">
              Book Free Demo
            </Button>
            <a
              href={buildWhatsAppHref({ source: "sticky_mobile" })}
              onClick={onWhatsAppClick("sticky_mobile")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center gap-1.5 h-12 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-[0_8px_16px_rgba(16,185,129,0.25)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════
   SCROLL TO TOP — floats above the mobile sticky CTA and the
   desktop WhatsApp widget. Appears after 600px scroll.
   ════════════════════════════════════════════════ */
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollTop}
          aria-label="Scroll to top of page"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="group fixed right-4 lg:right-8 z-[120] bottom-24 lg:bottom-28 size-11 md:size-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_32px_-6px_rgba(37,99,235,0.3)] flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {/* Subtle halo ring on hover — uses Framer so it doesn't layout-shift */}
          <motion.span
            className="absolute inset-0 rounded-full ring-2 ring-blue-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />
          <ArrowUp className="size-5 relative z-10" strokeWidth={2.5} />
          {/* Desktop-only tooltip */}
          <span className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════
   ELO PROJECTION CALCULATOR
   ════════════════════════════════════════════════ */
function EloProjectionCalculator() {
  const [baseline, setBaseline] = useState(600);
  const [hours, setHours] = useState(4);

  // Simplified mathematical model: Unstructured grows linearly but plateaus, Protocol grows logarithmically faster.
  const unstructuredEnd = Math.floor(baseline + (hours * 15));
  const protocolEnd = Math.floor(baseline + (hours * 45) + 120);

  return (
    <section className="py-16 md:py-24 bg-slate-50 text-slate-900 gs-grid-pattern border-b border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-blue-500/20 text-blue-600 border border-blue-500/30 rounded-full font-bold mb-4 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            <Calculator className="size-3 mr-1.5 inline" /> Elo Growth Projector
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 leading-tight text-slate-900">
            Project Your Child's <span className="text-blue-600">Elo Potential.</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Enter your child's current level and weekly practice time. See the difference between casual play and the ChessWize Programme over 12 months.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center glass-panel rounded-3xl p-6 md:p-10 shadow-2xl relative group hover:border-blue-300 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 pointer-events-none rounded-3xl" />
          
          {/* Controls */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8 relative z-10">
            <div className="depth-panel p-5 rounded-2xl">
              <div className="flex justify-between mb-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest-gs drop-shadow-sm">Current Baseline (Elo)</label>
                <span className="text-sm font-extrabold text-blue-600 tabular-nums drop-shadow-sm">{baseline}</span>
              </div>
              <input 
                type="range" 
                min="400" 
                max="1400" 
                step="100" 
                value={baseline} 
                onChange={(e) => setBaseline(Number(e.target.value))} 
                className="w-full accent-blue-500 bg-slate-200 h-2 rounded-lg appearance-none cursor-pointer shadow-inner"
              />
              <div className="flex justify-between mt-2 text-[9px] text-slate-500 font-bold">
                <span>Beginner (400)</span>
                <span>Advanced (1400)</span>
              </div>
            </div>

            <div className="depth-panel p-5 rounded-2xl">
              <div className="flex justify-between mb-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest-gs drop-shadow-sm">Weekly Commitment</label>
                <span className="text-sm font-extrabold text-blue-600 tabular-nums drop-shadow-sm">{hours} Hours</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="10" 
                step="1" 
                value={hours} 
                onChange={(e) => setHours(Number(e.target.value))} 
                className="w-full accent-blue-500 bg-slate-200 h-2 rounded-lg appearance-none cursor-pointer shadow-inner"
              />
              <div className="flex justify-between mt-2 text-[9px] text-slate-500 font-bold">
                <span>Casual (2h)</span>
                <span>Intensive (10h)</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50/80 border border-blue-100 rounded-xl shadow-inner backdrop-blur-sm">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest-gs block mb-1 drop-shadow-sm">Why It Matters</span>
              <p className="text-xs text-blue-900 font-medium leading-relaxed">
                Casual play yields diminishing returns due to uncorrected structural blunders. Our protocol patches these leaks systematically.
              </p>
            </div>
          </div>

          {/* Graph Output */}
          <div className="w-full lg:w-2/3 depth-panel rounded-2xl p-6 relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 md:gap-4 z-10 pr-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-slate-300 rounded-full shadow-sm" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs drop-shadow-sm">Unstructured Play</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest-gs drop-shadow-sm">ChessWize Programme</span>
              </div>
            </div>
            
            <div className="mt-12 h-48 md:h-64 flex items-end gap-2 md:gap-4 relative border-l border-b border-slate-300 pb-2 pl-2 ml-6 md:ml-8">
               {/* Simplified Bar Chart Simulation */}
               {[1, 2, 3, 4, 5, 6].map((month, idx) => {
                 const unstrVal = baseline + (hours * 15 * (month/6));
                 const protVal = baseline + ((hours * 45 + 120) * Math.pow(month/6, 0.8));
                 
                 const maxVal = Math.max(1600, baseline + 600);
                 const unstrHeight = Math.min(100, Math.max(10, (unstrVal / maxVal) * 100));
                 const protHeight = Math.min(100, Math.max(10, (protVal / maxVal) * 100));

                 return (
                   <div key={idx} className="flex-1 flex justify-center items-end gap-1 h-full group relative">
                     <div className="w-1/2 bg-slate-200 rounded-t-sm transition-all duration-500 hover:bg-slate-300" style={{ height: `${unstrHeight}%` }} />
                     <div className="w-1/2 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ height: `${protHeight}%` }} />
                     
                     {/* Tooltip on hover */}
                     <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap z-20">
                       M{month*2}: {Math.floor(protVal)} vs {Math.floor(unstrVal)}
                     </div>
                   </div>
                 )
               })}
               
               {/* Y Axis Labels (rough) */}
               <div className="absolute -left-8 bottom-0 text-[9px] text-slate-500 font-bold tabular-nums">{baseline}</div>
               <div className="absolute -left-8 top-0 text-[9px] text-slate-500 font-bold tabular-nums">{Math.max(1600, baseline + 600)}</div>
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-500 px-2 uppercase tracking-widest-gs">
              <span>Month 2</span>
              <span>Month 6</span>
              <span>Month 12</span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
               <div>
                 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest-gs">12-Month Delta (Projected)</p>
                 <p className="text-2xl font-extrabold text-emerald-600 tabular-nums">+{protocolEnd - unstructuredEnd} Elo</p>
               </div>
               <Button onClick={scrollToForm} variant="outline" className="gs-btn gs-btn-white font-bold text-xs h-9">
                 Book Free Demo <ArrowRight className="ml-1.5 size-3" />
               </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   DETAILED SYLLABUS EXPLORER
   ════════════════════════════════════════════════ */
function SyllabusExplorer() {
  const [activeTab, setActiveTab] = useState(0);
  
  const syllabus = [
    {
      title: "Weeks 1-4: Building the Foundation",
      weeks: [
        { w: "Week 1", topic: "The Geometry of the Board", desc: "Algebraic notation mastery, piece coordinate mapping, and identifying undefended targets instantly." },
        { w: "Week 2", topic: "Checks, Captures, Threats", desc: "The foundational calculation algorithm. Every move evaluated strictly through this 3-step hierarchical filter." },
        { w: "Week 3", topic: "Basic Tactical Motifs", desc: "Recognizing Pins, Skewers, and Forks. Introduction to pattern recognition memory training." },
        { w: "Week 4", topic: "Opening Principles", desc: "Central control, rapid piece development, and King safety. Why we never memorize lines at this stage." }
      ]
    },
    {
      title: "Weeks 5-8: Sharpening Tactics",
      weeks: [
        { w: "Week 5", topic: "Discovered Attacks", desc: "Calculating forcing moves that unmask hidden attacks. Deepening calculation depth to 2.5 moves." },
        { w: "Week 6", topic: "Pawn Structure Integrity", desc: "Understanding passed pawns, isolated pawns, and pawn islands. How structural damage decides endgames." },
        { w: "Week 7", topic: "Deflection & Decoy", desc: "Sacrificing material to remove key defenders. Advanced tactical awareness." },
        { w: "Week 8", topic: "Endgame Mechanics I", desc: "Theoretical King and Pawn endgames. The Rule of the Square and Opposition." }
      ]
    },
    {
      title: "Weeks 9-12: Competition Ready",
      weeks: [
        { w: "Week 9", topic: "Positional Assessment", desc: "Evaluating imbalances. Knights vs Bishops in closed vs open positions." },
        { w: "Week 10", topic: "Time Management Psychology", desc: "Clock utilization under pressure. Preventing panic blunders in time trouble." },
        { w: "Week 11", topic: "Prophylactic Thinking", desc: "What is my opponent threatening? Stopping their plan before executing ours." },
        { w: "Week 12", topic: "Live Cohort Simulation", desc: "Full tournament conditions. Post-mortem analysis and end-of-phase assessment." }
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">12-Week Syllabus</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 leading-tight">
            The 12-Week Syllabus.
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            We don't "wing it." Every class follows a strict teaching timeline designed so that one lesson builds cleanly on the next.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
          {/* Tabs */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-2">
            {syllabus.map((s, i) => (
              <button 
                key={i}
                onClick={() => setActiveTab(i)}
                className={`text-left px-5 py-3.5 rounded-xl border transition-all font-bold tracking-tight-gs text-sm hover-lift ${activeTab === i ? 'bg-blue-600 border-blue-500 text-slate-50 shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-200'}`}
              >
                {s.title}
              </button>
            ))}

            <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl hidden lg:block">
              <h4 className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest-gs mb-1.5">Graduation Criteria</h4>
              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                Students must pass a comprehensive tactical and positional exam at Week 12 to advance to the next tier. We do not promote on attendance alone.
              </p>
            </div>
            
            <div className="mt-2 rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] relative hidden lg:block">
              <img loading="lazy" decoding="async" width={2816} height={1536} src="/2026-04-15-10-40-00-12-week-syllabus-planner.webp" alt="A high-end academic planner showing a 12-week cognitive chess curriculum" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:flex-1 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 gs-shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                  <div className="size-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                    <ListChecks className="size-5 text-blue-600" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight-gs">{syllabus[activeTab].title}</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {syllabus[activeTab].weeks.map((w, i) => (
                    <div key={i} className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 flex flex-col">
                      <Badge className="w-fit bg-slate-200 text-slate-600 border-0 hover:bg-slate-200 uppercase tracking-widest-gs font-bold text-[9px] mb-2">{w.w}</Badge>
                      <h5 className="font-extrabold text-slate-900 text-sm md:text-base mb-1.5 leading-snug">{w.topic}</h5>
                      <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{w.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   APP ROUTER
   ════════════════════════════════════════════════ */
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-200 selection:text-blue-900 font-sans bg-white overflow-x-hidden">
      <Toaster theme="light" position="top-center" richColors />
      {/* Skip link — visible only when keyboard-focused, first thing in tab order */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <TopNav />
      <main id="main-content" role="main" className="flex-1">
        <Hero />
        {/* ── Consensus CRO order from Codex + Gemini + Claude 3-way audit ── */}
        <VideoShowcase />
        <StarPerformers />
        <WallOfLove />
        <TheProblem />
        <WhoIsThisFor />
        <HowItWorks />
        <Mentors />
        <ValueStack />
        <Platform />
        <CertificateSection />
        <SyllabusExplorer />
        <FAQ />
        <BottomForm />
      </main>
      <Footer />
      {/* ── Removed per consensus: ProgramStats, Transformation, Curriculum, LearningModes,
          FounderStory, ParentAssessmentQuiz, DailyRegimen, MidPageCTA, EloProjectionCalculator,
          InteractivePuzzle — all hurt conversion or duplicated content ── */}
      <WhatsAppWidget />
      <MobileStickyCTA />
      <ScrollToTop />
    </div>
  );
}

const LegalFallback = () => <div className="min-h-screen bg-slate-50" aria-busy="true" />;

/**
 * RouteTracker — wired at the root of the Routes tree. Fires fbq PageView on
 * every SPA navigation (not just the initial HTML load), captures first-touch
 * attribution on first mount, and arms the ViewContent trigger (3s dwell OR
 * 25% scroll, whichever first — once per session).
 */
function RouteTracker() {
  const { pathname, search } = useLocation();

  // First-touch attribution — only writes on first landing; no-op thereafter.
  useEffect(() => {
    captureAttribution();
  }, []);

  // SPA route-change PageView. index.html fires the initial PageView
  // synchronously, so skip the very first mount to avoid a double-count.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname, search]);

  // ViewContent — 3s dwell OR 25% scroll, fires once per session. Skips
  // non-landing routes entirely (legal/thank-you have their own intent signal).
  useEffect(() => {
    if (pathname !== "/") return;
    try {
      if (sessionStorage.getItem("cw_vc_fired")) return;
    } catch { /* ignore */ }

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      try { sessionStorage.setItem("cw_vc_fired", "1"); } catch { /* ignore */ }
      trackViewContent();
      cleanup();
    };

    const timer = window.setTimeout(fire, 3000);
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / Math.max(h.scrollHeight, 1);
      if (scrolled >= 0.25) fire();
    };
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/thank-you" element={<Suspense fallback={<LegalFallback />}><ThankYou /></Suspense>} />
        <Route path="/privacy-policy" element={<Suspense fallback={<LegalFallback />}><PrivacyPolicy /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={<LegalFallback />}><TermsOfService /></Suspense>} />
        <Route path="/refund-policy" element={<Suspense fallback={<LegalFallback />}><RefundPolicy /></Suspense>} />
        <Route path="/cookie-policy" element={<Suspense fallback={<LegalFallback />}><CookiePolicy /></Suspense>} />
        <Route path="/disclaimer" element={<Suspense fallback={<LegalFallback />}><Disclaimer /></Suspense>} />
      </Routes>
    </>
  );
}
