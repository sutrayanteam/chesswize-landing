import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
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
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
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
import { motion, AnimatePresence, useInView } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { DefaultVideoLayout, defaultLayoutIcons } from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "gs-glass py-2 md:py-3" : "bg-white border-b border-slate-200 py-3 md:py-4"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <img src="/logo-side-black-v2.svg" alt="ChessWize Logo" className="h-7 md:h-9 w-auto object-contain" />
        </div>
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
  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-slate-50 gs-grid-pattern overflow-hidden border-b border-slate-200">
      <div className="absolute top-0 right-0 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-blue-600/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-amber-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col xl:flex-row gap-10 lg:gap-16 items-center">
          
          {/* Left Copy Side */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full xl:w-[55%] flex flex-col gap-5 md:gap-6">
            <motion.div variants={fadeUp}>
              <div className="trust-badge-container bg-blue-50/80 border-blue-200 inline-flex">
                <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] md:text-[11px] font-extrabold text-blue-800 uppercase tracking-widest-gs">Strictly Max 6 Kids Per Batch</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-extrabold tracking-tighter-gs text-slate-900 leading-[1.12] drop-shadow-sm">
              Help your child{' '}
              <span className="text-gradient-primary">think deeper,</span>{' '}
              not scroll longer.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-[1.6] max-w-2xl tracking-tight-gs">
              Structured online chess coaching by FIDE-rated masters. Small batches of six, same coach every session, real improvement you can see on the dashboard.
            </motion.p>

            <motion.div variants={fadeUp} className="bg-white p-5 md:p-6 rounded-2xl depth-panel mt-1 md:mt-2 max-w-xl relative overflow-hidden hover-lift">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest-gs mb-4 flex items-center gap-2">
                <Target className="size-4 text-blue-600" /> Book My Child&apos;s Free Demo
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <select className="w-full px-4 py-3.5 text-sm md:text-base border-2 border-slate-200 rounded-xl bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer hover:border-slate-300 shadow-sm">
                    <option value="">Select Child&apos;s Age</option>
                    <option value="4-6">4 - 6 Years</option>
                    <option value="7-9">7 - 9 Years</option>
                    <option value="10-12">10 - 12 Years</option>
                    <option value="13+">13+ Years</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-slate-500 pointer-events-none" />
                </div>
                <Button onClick={scrollToForm} size="lg" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 gs-btn gs-btn-primary rounded-xl text-sm md:text-base font-bold transition-all">
                  Book Free Demo <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              {/* Secondary WhatsApp CTA */}
              <a
                href="https://wa.me/917007578072?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo%20for%20my%20child."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 h-11 md:h-12 w-full rounded-xl border-2 border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold text-xs md:text-sm transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Or ask us on WhatsApp
              </a>
              {/* Counselor strip — human face at CTA moment */}
              <div className="flex items-center gap-3 mt-3.5 pt-3.5 border-t border-slate-100">
                <img src="/counselor-avatar.jpg" alt="Priya Sharma — Academic Counsellor" className="size-10 rounded-full object-cover ring-2 ring-white shadow-md shrink-0" loading="lazy" decoding="async" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] md:text-xs font-extrabold text-slate-800">You&apos;ll talk to <span className="text-blue-700">Priya Sharma</span>, Academic Counsellor</p>
                  <p className="text-[10px] md:text-[11px] text-slate-500 font-medium">Replies on WhatsApp in &lt;10 min · 10 AM–8 PM IST</p>
                </div>
              </div>
              {/* What happens next — 4-step preview */}
              <ul className="mt-3 grid grid-cols-4 gap-1.5 text-center">
                {[
                  { n: "1", t: "Book", s: "30-sec form" },
                  { n: "2", t: "Match", s: "WhatsApp in <10 min" },
                  { n: "3", t: "Demo", s: "50-min live class" },
                  { n: "4", t: "Observe", s: "Parent welcome" },
                ].map((s) => (
                  <li key={s.n} className="flex flex-col items-center gap-0.5 rounded-md px-1 py-1.5 bg-slate-50 border border-slate-100">
                    <span className="size-5 rounded-full bg-blue-600 text-white text-[9px] font-extrabold flex items-center justify-center">{s.n}</span>
                    <span className="text-[10px] font-extrabold text-slate-900 leading-tight">{s.t}</span>
                    <span className="text-[9px] text-slate-500 leading-tight">{s.s}</span>
                  </li>
                ))}
              </ul>
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
            </motion.div>
          </motion.div>

          {/* Right Media Side - VSL / Masterclass Snippet */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full xl:w-[45%] mt-6 lg:mt-0">
            <div className="glass-panel p-2.5 md:p-3 rounded-2xl md:rounded-3xl gs-shadow-xl gs-border relative hover-lift">
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-24 md:w-32 h-24 md:h-32 bg-blue-400/20 blur-2xl md:blur-3xl rounded-full" />
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 group shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex flex-col gap-2">
                  <Badge className="bg-red-500/90 backdrop-blur-md text-white border-0 font-bold px-2 py-1 md:px-3 md:py-1 rounded shadow-lg uppercase tracking-widest-gs text-[9px] md:text-[10px] ring-1 ring-white/20">Inside Live Training</Badge>
                </div>
                
                <video
                  src="https://chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-07-at-22.51.22.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/hero-poster.webp"
                  className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-90 pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-extrabold text-lg md:text-xl tracking-tight-gs drop-shadow-md">Positional Masterclass</h3>
                      <p className="text-slate-200 text-xs md:text-sm font-medium drop-shadow-sm">Real tournament simulation training</p>
                    </div>
                    <div className="size-10 md:size-14 rounded-full bg-blue-600/90 backdrop-blur-md flex items-center justify-center border border-white/20 gs-shadow-lg group-hover:scale-110 transition-transform ring-4 ring-blue-500/30">
                      <PlayCircle className="size-5 md:size-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
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

      setTimeout(() => {
        setCalculating(false);
        setShowResult(true);
        toast.success("Profile Analyzed Successfully", {
          description: "We have determined the optimal development track for your child."
        });
        
        // Fire confetti for the achievement
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
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 leading-tight text-slate-900 drop-shadow-sm">
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
            <h2 className="text-[10px] font-bold text-red-600 uppercase tracking-widest-gs mb-3 flex items-center gap-2">
              <AlertTriangle className="size-3" /> The Attention Crisis
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 md:mb-6 leading-tight">
              Casual hobby classes are <span className="text-red-600">wasting your child's potential.</span>
            </h3>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                Most children's screen time trains distraction, not focus. ChessWize flips that — live online classes with FIDE-certified coaches on a platform built for deep attention, so sitting still and thinking deeply become automatic skills that carry straight into school.
              </p>
            </div>
            <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-4">
              <AlertTriangle className="size-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-extrabold text-red-900 mb-1">The Danger of Plateauing</p>
                <p className="text-xs text-red-700 font-medium">Without structured evaluation, children hit a rating ceiling, lose confidence, and quit. We mathematically prevent this.</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-square relative group">
                <img loading="lazy" src="/2026-04-15-10-30-00-distracted-child-screen.webp" alt="A distracted child scrolling on an iPad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale sepia-[0.3]" />
                <div className="absolute top-2 left-2 bg-red-600 text-slate-50 text-[10px] font-extrabold uppercase tracking-widest-gs px-2 py-1 rounded shadow">Passive Scrolling</div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-square relative group">
                 <img loading="lazy" src="/2026-04-15-10-00-00-focused-child-chess.webp" alt="A child focused on a chess board during a live online class" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-2 left-2 bg-blue-600 text-slate-50 text-[10px] font-extrabold uppercase tracking-widest-gs px-2 py-1 rounded shadow">Purposeful Training</div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 gs-shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 blur-[40px] rounded-full pointer-events-none" />
              <h4 className="text-xl font-extrabold tracking-tight-gs text-slate-900 mb-6 text-center">How We Compare</h4>
              
              <div className="flex flex-col gap-3">
                {/* Header Row */}
                <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] gap-2 mb-2 pb-2 border-b border-slate-200 text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest-gs text-slate-600">
                  <div>Feature</div>
                  <div className="text-center text-red-500">Hobby Clubs</div>
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
                Book Free Demo &amp; Counseling <ArrowRight className="ml-2 size-4" />
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
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 lg:p-10 gs-shadow-sm hover-lift">
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
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_8px_60px_-12px_rgba(37,99,235,0.18)] relative overflow-hidden hover-lift ring-1 ring-blue-100/60">
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
           <img loading="lazy" src="/2026-04-15-10-01-00-resilience-chess-close.webp" alt="A child deeply focusing on a chess piece, demonstrating a cognitive paradigm shift" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                      onClick={() => {
                        if (solved) return;
                        if (isWinningSquare) {
                          setSolved(true);
                          toast.success("Brilliant Move!", { description: `${currentPuzzle.solutionMove} — Forced winning sequence found in ${moveTime}s.` });
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
              <div key={i} className="bg-slate-50 rounded-3xl gs-border gs-shadow-md hover:border-blue-300 hover:shadow-xl transition-all flex flex-col h-full hover-lift cursor-default group overflow-hidden">
                <div className="h-48 md:h-56 w-full relative overflow-hidden">
                  <img loading="lazy" src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
              <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-md hover:border-blue-400 hover:shadow-xl transition-all flex flex-col h-full hover-lift overflow-hidden group">
                <div className="h-48 w-full relative overflow-hidden">
                  <img loading="lazy" src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
          <div className="hidden lg:block absolute left-[3.5rem] top-20 bottom-20 w-1 bg-gradient-to-b from-blue-200 via-emerald-200 to-amber-200 z-0" />
          
          {modules.map((mod, i) => (
            <div key={i} className="bg-white gs-border rounded-3xl p-6 md:p-8 lg:p-12 gs-shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-16 relative overflow-hidden group hover:border-blue-300 transition-all duration-300 hover-lift z-10">
              <div className="hidden md:block absolute -right-8 -top-12 text-[150px] lg:text-[200px] font-extrabold text-slate-50 pointer-events-none select-none z-0 group-hover:text-blue-50 transition-colors">
                0{i+1}
              </div>
              
              <div className="w-full lg:w-[45%] shrink-0 relative z-10">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 gs-shadow">
                  <img loading="lazy" src={mod.img} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
   VIDEO TESTIMONIALS — lazy, poster-first, click-to-play
   ════════════════════════════════════════════════ */
type VideoItem = { src: string; title: string; label: string; badge: string; poster?: string };

function VideoCard({ v }: { v: VideoItem }) {
  const [activated, setActivated] = useState(false);
  // derive poster path from src unless provided: `/foo.mp4` → `/foo-poster.jpg`
  const poster = v.poster ?? v.src.replace(/\.mp4$/i, "-poster.jpg");
  return (
    <div className="rounded-2xl overflow-hidden hover-lift group relative flex-shrink-0 w-[180px] md:w-full bg-white border border-slate-200 shadow-md">
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <Badge className="bg-amber-500 text-white border-0 text-[10px] font-bold shadow-lg">
          <PlayCircle className="size-3 mr-1" /> {v.badge}
        </Badge>
      </div>
      <div className="relative w-full aspect-[9/16] bg-slate-900 video-card-contain">
        {activated ? (
          <MediaPlayer
            title={v.title}
            src={v.src}
            poster={poster}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full"
            crossOrigin=""
          >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play video: ${v.title}`}
            className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          >
            <img
              src={poster}
              alt={v.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-14 md:size-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl ring-4 ring-white/30 group-hover:scale-110 group-hover:bg-white transition-all">
                <svg viewBox="0 0 24 24" className="size-6 md:size-7 text-blue-600 translate-x-[1px]" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-3 bg-white border-t border-slate-100">
        <p className="font-extrabold text-slate-900 tracking-tight-gs text-xs">{v.label}</p>
        <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">{v.title}</p>
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
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`rounded-full transition-all ${activeIndex === i ? 'w-6 h-2 bg-amber-500' : 'w-2 h-2 bg-slate-300'}`} />
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest-gs mb-2 md:mb-3 flex items-center justify-center gap-2">
            <PlayCircle className="size-3" /> Video Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-3 md:mb-4 leading-tight drop-shadow-sm">
            Hear it from <span className="text-amber-600">real families.</span>
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
              Only the top <span className="text-blue-700">1% of coaches</span> make it in.
            </h3>
            <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-5 md:mb-6">
              We reject hobbyists and 1500-rated amateurs. Our head coaches hold official FIDE titles, have background-verified IDs, and train under our in-house teaching rubric before they ever take a live class.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
                <Shield className="size-3.5 text-blue-600" /> Background-verified
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
                <CheckCircle className="size-3.5 text-emerald-500" /> FIDE-titled only
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
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
                   <h4 className="font-extrabold text-slate-900 text-sm md:text-base">Teaching &amp; Child-Safety Training</h4>
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
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 lg:p-10 gs-shadow-xl relative overflow-hidden hover-lift">
              <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-amber-100/50 rounded-full blur-[40px] md:blur-[60px] pointer-events-none" />
              <div className="flex flex-col gap-6 relative z-10">
                {/* Top: Image + Name side by side */}
                <div className="flex items-center gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <img loading="lazy" src="/young-man-deep-in-thought-while-playing-game-of-ch-2026-01-09-00-57-38-utc.webp" alt="Coach" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-200 gs-shadow-lg relative z-10" />
                    <div className="absolute -bottom-3 -right-3 bg-white border border-slate-200 rounded-lg p-1.5 gs-shadow-lg z-20">
                       <SealBadge className="size-6 text-amber-500" />
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-widest-gs mb-1.5 px-2 py-0.5">Head Coach & Founder</Badge>
                    <h4 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs text-slate-900">Tarun Sir</h4>
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
        <div className="bg-white/80 gs-shadow-xl backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-200 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center hover-lift">
          <div className="w-full md:w-1/3 shrink-0 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
           <img loading="lazy" src="/2026-04-15-10-34-00-founder-tarun-portrait.webp" alt="Tarun Sir, Founder and Head Coach" className="w-full aspect-square object-cover rounded-2xl border border-slate-200 relative z-10 shadow-lg grayscale hover:grayscale-0 transition-all duration-700" />
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
              <span className="font-extrabold text-slate-900 tracking-tight-gs text-lg">Tarun Sir</span>
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
      subtitle: "Siblings or friend pairs",
      icon: UserPlus,
      perSession: 550,
      unit: "per student / session",
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
      achievement: "Joined at 800 Elo with weak endgame technique. Coach identified recurring rook endgame errors and built a targeted 6-week module. She broke 1000 in month two, won her first rated tournament in month four, and hit 1340 by month six. Five tournament victories and counting — her tactical accuracy on the dashboard sits at 94%.",
      schoolImpact: "Parents report visibly sharper math problem-solving at school.",
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-28.png",
      tag: "800 → 1340 Elo",
      duration: "6 Months"
    },
    {
      name: "Mikaeel",
      achievement: "Started as a complete beginner who couldn't sit still for 10 minutes. The Foundation Programme stretched his focus from 5-minute bursts to full 45-minute sessions. His puzzle solve rate went from 30% to 76% in 8 weeks. He now plays rated games with calm composure and crossed 1100 Elo in just four months — without a single tantrum.",
      schoolImpact: "His class teacher noted improved sitting tolerance and homework focus.",
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-30.png",
      tag: "0 → 1100 Elo",
      duration: "4 Months"
    },
    {
      name: "Avyukt",
      achievement: "Entered the Foundation cohort but advanced to Tournament Masterclass in record time. His coach noted exceptional pattern recognition — he was spotting knight forks 3 moves ahead by week six. Promoted through two cohort levels in 10 weeks. Currently preparing for his first FIDE-rated tournament with a puzzle accuracy of 91%.",
      schoolImpact: "Earned the school's logic olympiad selection in his grade.",
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-29.png",
      tag: "Fast-Track Promotion",
      duration: "10 Weeks"
    }
  ];
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-amber-500/20 text-amber-600 border border-amber-500/30 rounded-full font-bold mb-4 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            <Trophy className="size-3 mr-1.5 inline" /> Our Star Performers
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 leading-tight">
            Excellence is <span className="text-amber-600">engineered.</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Meet the students who have fully embraced the ChessWize Programme and are dominating their local tournament circuits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {performers.map((p, i) => (
            <Tilt key={i} tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="white" glarePosition="all" className="rounded-3xl">
              <div className="bg-white/80 gs-shadow-xl backdrop-blur-md rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col hover-lift h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative mb-6">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                    <img loading="lazy" src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute -bottom-4 right-4 bg-amber-500 text-slate-50 font-extrabold text-[10px] uppercase tracking-widest-gs px-3 py-1 rounded-md shadow-lg border border-amber-400">
                    {p.tag}
                  </div>
                  <div className="absolute -bottom-4 left-4 bg-blue-600 text-slate-50 font-extrabold text-[10px] uppercase tracking-widest-gs px-3 py-1 rounded-md shadow-lg border border-blue-500">
                    {p.duration}
                  </div>
                </div>

                <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight-gs mb-3">{p.name}</h4>
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-4">
                  {p.achievement}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 rounded-xl p-3">
                  <BookOpen className="size-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">School impact: {p.schoolImpact}</span>
                </div>
              </div>
            </Tilt>
          ))}
        </div>      </div>
    </section>
  );
}

function WallOfLove() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4000, stopOnInteraction: true })]);

  const reviews = [
    { text: "Aadvik joined as a complete beginner at age 7. Within six weeks his coach had him solving two-move tactical puzzles independently. The weekly WhatsApp report showed his puzzle accuracy climbing from 25% to 61%. He now wakes up asking to do his daily puzzles before school. His class teacher told us his attention span in maths has noticeably improved.", author: "Rupali", desc: "Lucknow", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png" },
    { text: "Anika was playing chess casually on an app but never improving. Her coach diagnosed that she was losing material in the opening because she wasn’t checking for threats before moving. After 8 weeks of the Checks-Captures-Threats drill, she stopped hanging pieces entirely. Her online rating jumped from 500 to 780. What I love most is the parent dashboard — I can see exactly which topics she covered each week without needing to understand chess myself.", author: "Monika", desc: "Kanpur", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png" },
    { text: "Ishita used to cry when she lost a game. Her coach spent the first month purely on emotional resilience — teaching her to analyse losses calmly instead of reacting. By week five she was reviewing her own games and finding her mistakes before the coach pointed them out. Her Elo went from 650 to 920 in four months, but honestly the biggest win is that she now handles failure with composure. That skill transfers way beyond chess.", author: "Anjana", desc: "Mumbai", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png" },
  ];  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Parent Reviews</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-4 leading-tight">
            Verified by parents worldwide.
          </h3>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-8">
            {reviews.map((r, i) => (
              <div key={i} className="pl-4 md:pl-8 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl flex flex-col h-full hover-lift cursor-default transition-all">
                  <div className="flex gap-1 mb-4 md:mb-6">
                    {[1,2,3,4,5].map(s=><Star key={s} className="size-4 md:size-5 fill-amber-400 text-amber-600" />)}
                  </div>
                  <p className="text-slate-800 font-medium text-base md:text-lg leading-relaxed mb-6 md:mb-8 flex-1 italic">"{r.text}"</p>
                  <div className="flex items-center gap-4 md:gap-5 border-t border-slate-100 pt-5 md:pt-6 mt-auto">
                    <img loading="lazy" src={r.img} alt={r.author} className="size-12 md:size-14 rounded-full border-2 border-slate-100 gs-shadow shrink-0 object-cover" />
                    <div>
                      <p className="font-extrabold text-slate-900 text-sm md:text-base tracking-tight-gs">{r.author}</p>
                      <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest-gs mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
      title: "Free Demo &amp; Counseling",
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
      color: "emerald",
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
      color: "amber",
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; numBg: string; numText: string; bulletDot: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-200 hover:border-blue-400", text: "text-blue-600", numBg: "bg-blue-600", numText: "text-white", bulletDot: "bg-blue-400" },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200 hover:border-emerald-400", text: "text-emerald-600", numBg: "bg-emerald-600", numText: "text-white", bulletDot: "bg-emerald-400" },
    amber: { bg: "bg-amber-50", border: "border-amber-200 hover:border-amber-400", text: "text-amber-600", numBg: "bg-amber-600", numText: "text-white", bulletDot: "bg-amber-400" },
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-emerald-100 text-emerald-800 border-0 rounded-full font-bold mb-4 md:mb-6 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            The Process
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 md:mb-6 text-slate-900 leading-tight">
            How our <span className="text-emerald-600">training process</span> works.
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Three clear steps from first contact to measurable results. No guesswork, no wasted time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <div key={i} className={`flex flex-col ${c.bg} border ${c.border} p-6 md:p-8 rounded-3xl transition-all hover-lift relative overflow-hidden`}>
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
            <span className="size-2 rounded-full bg-blue-400" /> Evaluate
          </div>
          <ArrowRight className="size-4 text-slate-300" />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="size-2 rounded-full bg-emerald-400" /> Place
          </div>
          <ArrowRight className="size-4 text-slate-300" />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="size-2 rounded-full bg-amber-400" /> Train
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
  parent_name: z.string().min(2, "Parent's name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[0-9\s-]{10,15}$/, "Please enter a valid phone number"),
  child_name: z.string().min(2, "Child's name must be at least 2 characters"),
  child_age_range: z.string().min(1, "Please select your child's age group"),
  child_level: z.string().min(1, "Please select an estimated level"),
  city: z.string().min(2, "Please enter your city"),
  referral_source: z.string().min(1, "Please tell us how you found us"),
  parent_concern: z.array(z.string()).min(1, "Pick at least one goal so our coach can prepare"),
  parent_commitment: z.string().min(1, "Please select your commitment level"),
  /* Honeypot — hidden from real users, bots auto-fill it */
  website_url: z.string().max(0, "Bot detected").optional(),
});

type FormData = z.infer<typeof formSchema>;

function BottomForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [spamError, setSpamError] = useState("");
  const [step, setStep] = useState(1);
  const formLoadedAt = useRef(Date.now());
  const jsToken = useRef(Math.random().toString(36).slice(2) + Date.now().toString(36));

  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched"
  });

  const handleNextStep = async (fieldsToValidate: (keyof FormData)[]) => {
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
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

    /*
     * Primary: POST to /api/leads Cloudflare Worker (pushes to Zoho CRM + emails
     * counsellor via Resend). Worker lives at chesswize.in/api/*.
     *
     * Fallback: if worker is unreachable (not yet deployed OR network error),
     * open WhatsApp with a pre-filled message so we never lose the lead.
     */
    const openWhatsAppFallback = () => {
      const goals = Array.isArray(cleanData.parent_concern)
        ? cleanData.parent_concern.join(", ")
        : String(cleanData.parent_concern ?? "");
      const msgLines = [
        "Hi ChessWize, I'd like to book a free demo:",
        `• Child: ${cleanData.child_name ?? ""} (${cleanData.child_age_range ?? ""}, ${cleanData.child_level ?? ""})`,
        `• Parent: ${cleanData.parent_name ?? ""} · ${cleanData.phone ?? ""} · ${cleanData.city ?? ""}`,
        goals ? `• Goals: ${goals}` : "",
        cleanData.parent_commitment ? `• Commitment: ${cleanData.parent_commitment}` : "",
        cleanData.referral_source ? `• Heard via: ${cleanData.referral_source}` : "",
      ].filter(Boolean);
      const waUrl = `https://wa.me/917007578072?text=${encodeURIComponent(msgLines.join("\n"))}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...cleanData,
          js_token: jsToken.current,
          form_duration_s: Math.round(elapsed),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setStep(4);
        reset();
        return;
      }

      /* Worker reachable but returned an error — still use WhatsApp fallback for the user */
      openWhatsAppFallback();
      setStatus("success");
      setStep(4);
      reset();
    } catch {
      /* Network / DNS / worker-not-deployed — silent WhatsApp fallback */
      openWhatsAppFallback();
      setStatus("success");
      setStep(4);
      reset();
    }
  };

  const inputCls = (hasError: boolean) => `w-full px-4 py-3 text-sm md:text-base border-2 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all shadow-sm ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20 hover:border-slate-400'}`;

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <section id="book-evaluation" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500" />
      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-2 md:mb-3">Take the next step</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-3 md:mb-4 leading-tight">
            Book Your Child's Free Demo &amp; Counseling
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            This isn't a generic sign-up form. We ask a few extra questions so our coach can prepare a personalised evaluation — not a cookie-cutter demo. Fill this in carefully; we review every application by hand.
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
              <motion.div key="success" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="text-center py-12 relative z-10">
                <div className="size-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="size-10 text-emerald-600" />
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight-gs text-slate-900 mb-3">Application Received</h4>
                <p className="text-base md:text-lg font-medium text-slate-600 mb-2">We will reach out via WhatsApp within 4 hours to confirm your evaluation slot.</p>
                <p className="text-sm text-slate-500 font-medium">Your coach will review your answers before the call so the evaluation is tailored to your child from minute one.</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial="hidden" animate="visible" exit="exit" variants={stepVariants} onSubmit={handleSubmit(onSubmit)} className="flex flex-col relative z-10 w-full">
                
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
                    {step === 1 && "Step 1: The Student"}
                    {step === 2 && "Step 2: The Challenge"}
                    {step === 3 && "Step 3: Contact Info"}
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
                        <label htmlFor="bottom_child_name" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Child's First Name <span className="text-red-500">*</span></label>
                        <input id="bottom_child_name" {...register("child_name")} type="text" className={inputCls(!!errors.child_name)} placeholder="e.g. Aarav" />
                        {errors.child_name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.child_name.message}</p>}
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

                      <Button type="button" onClick={() => handleNextStep(['child_name', 'child_age_range', 'child_level'])} className="w-full h-14 mt-2 text-base font-extrabold tracking-tight gs-btn gs-btn-primary rounded-xl shadow-lg">
                        Continue to Next Step <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="flex flex-col gap-4 md:gap-5">
                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">
                          What do you want chess to do for your child? <span className="text-red-500">*</span>
                        </label>
                        <p className="text-[10px] text-slate-400 font-medium -mt-0.5">Pick all that apply — our coach uses this to tailor the demo.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {[
                            { value: "focus", label: "Improve focus & attention span" },
                            { value: "math", label: "Boost math, logic &amp; school performance" },
                            { value: "screen_time", label: "Replace passive screen time" },
                            { value: "tournament", label: "Train for tournaments / FIDE rating" },
                            { value: "confidence", label: "Build confidence &amp; emotional resilience" },
                            { value: "exploring", label: "Just exploring — not sure yet" },
                          ].map((opt) => (
                            <label key={opt.value} className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all cursor-pointer has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-sm">
                              <input
                                type="checkbox"
                                value={opt.value}
                                {...register("parent_concern")}
                                className="mt-0.5 size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                              />
                              <span
                                className="text-xs md:text-[13px] font-bold text-slate-800 leading-snug"
                                dangerouslySetInnerHTML={{ __html: opt.label }}
                              />
                            </label>
                          ))}
                        </div>
                        {errors.parent_concern && <p className="text-[10px] text-red-500 font-bold mt-1">{(errors.parent_concern as any).message}</p>}
                      </div>

                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_commitment" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">What is your commitment level? <span className="text-red-500">*</span></label>
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
                        <Button type="button" onClick={() => handleNextStep(['parent_concern', 'parent_commitment'])} className="flex-1 h-14 text-base font-extrabold tracking-tight gs-btn gs-btn-primary rounded-xl shadow-lg">
                          Continue to Final Step <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial="hidden" animate="visible" exit="exit" variants={stepVariants} className="flex flex-col gap-4 md:gap-5">
                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_parent_name" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Parent's Full Name <span className="text-red-500">*</span></label>
                        <input id="bottom_parent_name" {...register("parent_name")} type="text" autoComplete="name" className={inputCls(!!errors.parent_name)} placeholder="e.g. Rahul Sharma" />
                        {errors.parent_name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.parent_name.message}</p>}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div className="flex flex-col gap-1.5 md:gap-2">
                          <label htmlFor="bottom_phone" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">WhatsApp Number <span className="text-red-500">*</span></label>
                          <input id="bottom_phone" {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" className={inputCls(!!errors.phone)} placeholder="+91 98765 43210" />
                          {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.phone.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5 md:gap-2">
                          <label htmlFor="bottom_city" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">City <span className="text-red-500">*</span></label>
                          <input id="bottom_city" {...register("city")} type="text" autoComplete="address-level2" className={inputCls(!!errors.city)} placeholder="e.g. Bangalore" />
                          {errors.city && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.city.message}</p>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="bottom_referral" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">How did you hear about us? <span className="text-red-500">*</span></label>
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

                      {spamError && <div className="p-4 text-sm bg-amber-50 text-amber-700 rounded-xl border border-amber-200 font-bold">{spamError}</div>}
                      {status === "error" && <div className="p-4 text-sm bg-red-50 text-red-700 rounded-xl border border-red-200 font-bold">Transmission failed. Please try again.</div>}
                      
                      <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-extrabold text-amber-900 uppercase tracking-widest-gs mb-1">Strict Cohort Capacity</p>
                          <p className="text-xs text-amber-800 font-medium">To maintain our elite academic standards, we cap cohorts at 6 students. We are currently accepting only <span className="font-extrabold underline decoration-amber-300 underline-offset-2">12 new evaluations</span> this week.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-2">
                        <Button type="button" onClick={() => setStep(2)} variant="outline" className="h-16 px-6 font-bold text-slate-600 border-slate-200 rounded-xl hover:bg-slate-50">
                          <ArrowLeft className="size-4" />
                        </Button>
                        <Button type="submit" disabled={status === "sending"} className="flex-1 h-16 text-lg font-extrabold tracking-tight gs-btn gs-btn-primary rounded-xl shadow-xl hover:shadow-2xl hover-lift active:scale-[0.98]">
                          {status === "sending" ? (<><Loader2 className="size-5 animate-spin mr-2" /> Processing...</>) : (<>Lock In Your Evaluation <ArrowRight className="ml-2 size-5" /></>)}
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
                        We manually review every application. Incomplete or vague submissions are discarded. By submitting, you agree to our <Link to="/privacy-policy" className="underline hover:text-blue-600">Privacy Policy</Link>.
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
  const WA_HREF = "https://wa.me/917007578072?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo%20for%20my%20child.";
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with an academic counselor on WhatsApp"
      className="group fixed bottom-24 right-4 md:bottom-24 lg:bottom-8 md:right-8 z-[110] flex items-center gap-3 bg-emerald-500 text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all cursor-pointer border-2 border-emerald-400 pl-2 pr-3 md:pr-5 py-2"
    >
      <span className="relative flex items-center justify-center size-10 md:size-11 bg-white/15 rounded-full shrink-0">
        <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-green-400 ring-2 ring-emerald-500" />
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 md:size-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
      <div className="hidden md:flex flex-col leading-tight pr-1">
        <span className="text-[11px] font-bold uppercase tracking-widest-gs text-emerald-100">Academic Counselor</span>
        <span className="text-sm font-extrabold">Chat on WhatsApp</span>
        <span className="text-[10px] font-bold text-emerald-100">Replies in &lt;10 min</span>
      </div>
    </a>
  );
}

function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when the cursor exits through the very top of the viewport
      // (i.e. heading toward the address bar / close button). Ignore side and
      // bottom exits which happen during normal mouse movement.
      if (e.clientY <= 0 && e.clientX > 0 && e.clientX < window.innerWidth) {
        setShow(true);
        setHasTriggered(true);
      }
    };

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const elapsed = currentTime - lastTime;

      // Avoid division-by-zero and ignore tiny time deltas that produce
      // unreliable speed readings (e.g. rapid-fire scroll events).
      if (elapsed > 50) {
        const speed = (lastScrollY - currentScrollY) / elapsed;

        if (speed > 3 && currentScrollY > 500) {
          setShow(true);
          setHasTriggered(true);
        }

        lastScrollY = currentScrollY;
        lastTime = currentTime;
      }
    };

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasTriggered]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-slate-50/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 md:p-12 gs-border gs-shadow-2xl max-w-md w-full relative"
          >
            <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-slate-600 hover:text-slate-900 transition-colors">
              <XCircle className="size-6" />
            </button>
            <div className="flex justify-center mb-6">
              <div className="size-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <FileText className="size-8 text-amber-600" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tighter-gs mb-2 text-center leading-tight">Wait! Don't leave empty-handed.</h3>
            <p className="text-sm text-slate-600 font-medium text-center mb-6">
              Download our proprietary PDF: <strong>"The 5 Algorithmic Mistakes Kids Make in Chess (And How to Fix Them)."</strong>
            </p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Enter your email address" className="w-full px-4 py-4 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold placeholder:font-medium transition-all" />
              <Button onClick={() => setShow(false)} className="w-full h-14 gs-btn gs-btn-primary rounded-xl font-bold hover-lift shadow-lg">
                Get The Data Now
              </Button>
            </div>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest-gs text-center mt-6 cursor-pointer hover:text-slate-600 transition-colors" onClick={() => setShow(false)}>No thanks, I prefer unstructured learning.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 pt-20 md:pt-32 pb-24 lg:pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(15,23,42,0.8),_transparent)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          
          {/* Brand & Mission (Col span 4) */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="mb-6 md:mb-8 bg-white/5 inline-block p-3 rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <img loading="lazy" src="/logo-side-white-v2.svg" alt="ChessWize" className="h-8 md:h-10 object-contain drop-shadow-md" />
            </div>
            <p className="font-medium text-sm leading-relaxed text-slate-400 max-w-sm mb-8 drop-shadow-sm">
              India's premier online chess academy for children. FIDE-certified coaches, structured curriculum, and measurable results — trusted by 1,500+ parents nationwide.
            </p>
          </div>

          {/* Quick Links (Col span 2) */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h4 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest-gs mb-6 drop-shadow-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href="https://chesswize.com/about-us" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">About Us</a></li>
              <li><a href="https://chesswize.com/courses" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Courses</a></li>
              <li><a href="https://chesswize.com/blog" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Blog</a></li>
            </ul>
          </div>

          {/* Contact (Col span 3) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest-gs mb-6 drop-shadow-sm">Contact Us</h4>
            <ul className="space-y-5 text-sm font-medium text-slate-400">
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors shadow-inner">
                  <Phone className="size-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                </div>
                <a href="tel:+917007578072" className="hover:text-blue-400 transition-colors mt-1.5 drop-shadow-sm">+91-70075-78072</a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors shadow-inner">
                  <Mail className="size-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                </div>
                <a href="mailto:chesswize79@gmail.com" className="hover:text-blue-400 transition-colors mt-1.5 drop-shadow-sm">chesswize79@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 shadow-inner">
                  <MapPin className="size-4 text-slate-300" />
                </div>
                <span className="leading-relaxed mt-1 drop-shadow-sm">Kanpur, Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>

          {/* Legal & Social (Col span 2) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest-gs mb-6 drop-shadow-sm">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400 mb-10">
              <li><Link to="/terms" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Refund Policy</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Disclaimer</Link></li>
            </ul>

            <h4 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest-gs mb-6 drop-shadow-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/chesswize/" target="_blank" rel="noreferrer" className="size-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] hover-lift">
                <Linkedin className="size-4" />
              </a>
              <a href="https://www.facebook.com/chesswize" target="_blank" rel="noreferrer" className="size-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] hover-lift">
                <Facebook className="size-4" />
              </a>
              <a href="https://www.instagram.com/chesswize/" target="_blank" rel="noreferrer" className="size-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(219,39,119,0.4)] hover-lift">
                <Instagram className="size-4" />
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <Separator className="bg-slate-800 mb-8 shadow-inner" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest-gs text-slate-500 drop-shadow-sm">
            © 2026 by Chesswize. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest-gs text-slate-500 drop-shadow-sm">Designed by</span>
            <a href="https://engazedigital.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-extrabold tracking-widest-gs text-slate-400 hover:text-white transition-colors drop-shadow-sm">
              Engaze Digital
            </a>
          </div>
        </div>
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
              href="https://wa.me/917007578072?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo%20for%20my%20child."
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
              <img loading="lazy" src="/2026-04-15-10-40-00-12-week-syllabus-planner.webp" alt="A high-end academic planner showing a 12-week cognitive chess curriculum" className="w-full h-full object-cover" />
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
   LEGAL PAGES (Premium Glass UI)
   ════════════════════════════════════════════════ */
function LegalLayout({ title, children }: { title: string, children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Simple Header */}
      <header className="gs-glass py-4 border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo-side-black-v2.svg" alt="ChessWize Logo" className="h-8 object-contain" />
          </Link>
          <Link to="/">
            <Button variant="outline" className="gs-btn gs-btn-white text-xs font-bold rounded-xl h-9 px-4">
              <ArrowLeft className="size-3.5 mr-1.5" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 md:py-24 relative z-10">
        <div className="max-w-[800px] mx-auto px-4 md:px-8">
          <div className="glass-panel p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl mb-12 border border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-8 drop-shadow-sm">{title}</h1>
            <div className="prose prose-slate prose-blue max-w-none prose-headings:font-extrabold prose-headings:tracking-tight-gs prose-p:font-medium prose-p:leading-relaxed prose-a:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/logo-side-white-v2.svg" alt="ChessWize" className="h-8 object-contain opacity-80" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold tracking-tight-gs">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refunds</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookies</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest-gs text-slate-600">
            © {new Date().getFullYear()} Chesswize. <span className="text-slate-500">Designed by</span>{" "}
            <a href="https://engazedigital.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Engaze Digital</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>Last updated: April 15, 2026</p>
      <p>ChessWize, operated by Chesswize Education LLP ("we", "our", or "us"), is committed to protecting your privacy. This Privacy Policy describes how we collect, use, share, and safeguard personal information when you visit <strong>chesswize.com</strong> (the "Site"), interact with our advertisements on third-party platforms, or use our online chess coaching services (the "Services").</p>
      <p>By using our Site or Services, you consent to the practices described in this policy. If you do not agree, please discontinue use immediately.</p>

      <h3>1. Information We Collect</h3>
      <h4>1.1 Information You Provide Directly</h4>
      <ul>
        <li><strong>Contact &amp; Account Data:</strong> Name, email address, phone number, city, and your child's age and chess experience level — collected when you book a diagnostic evaluation, register for a cohort, or contact us.</li>
        <li><strong>Payment Data:</strong> Billing name, billing address, and payment card details. Card details are processed and stored exclusively by our PCI-DSS compliant payment processor (Razorpay). We do not store full card numbers on our servers.</li>
        <li><strong>Communication Data:</strong> Messages, feedback, and support requests you send us via email, WhatsApp, or on-site forms.</li>
      </ul>
      <h4>1.2 Information Collected Automatically</h4>
      <ul>
        <li><strong>Device &amp; Browser Data:</strong> IP address, browser type and version, operating system, device identifiers, screen resolution, and language preferences.</li>
        <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click paths, referral URLs, and interactions with our interactive tools (e.g., the Elo Projection Calculator, puzzle trainer).</li>
        <li><strong>Cookie &amp; Tracking Data:</strong> We use cookies, pixel tags, and similar technologies. See our <Link to="/cookie-policy"><strong>Cookie Policy</strong></Link> for full details.</li>
      </ul>
      <h4>1.3 Information from Third Parties</h4>
      <ul>
        <li><strong>Advertising Platforms:</strong> When you interact with our ads on Meta (Facebook/Instagram), Google Ads, or LinkedIn, those platforms may share hashed identifiers, click IDs, and conversion data with us to measure ad performance.</li>
        <li><strong>Analytics Providers:</strong> Google Analytics 4 provides aggregated and pseudonymised usage data.</li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <ul>
        <li>To deliver, personalise, and improve our coaching Services.</li>
        <li>To process payments and send transactional communications (booking confirmations, session reminders, invoices).</li>
        <li>To respond to your enquiries and provide customer support.</li>
        <li>To run and optimise advertising campaigns on Meta, Google, LinkedIn, and other platforms — including creating Custom Audiences and Lookalike/Similar Audiences.</li>
        <li>To send promotional emails and WhatsApp messages about new programs, offers, and educational content. You can opt out at any time.</li>
        <li>To analyse Site usage, diagnose technical issues, and improve user experience.</li>
        <li>To comply with legal obligations and enforce our Terms of Service.</li>
      </ul>

      <h3>3. Advertising &amp; Remarketing</h3>
      <p>We participate in interest-based advertising. This means:</p>
      <ul>
        <li><strong>Meta Pixel (Facebook/Instagram):</strong> We use the Meta Pixel to track conversions from ads, build targeted audiences, and remarket to visitors who have interacted with our Site. Meta processes this data under its own privacy policy.</li>
        <li><strong>Google Ads &amp; Google Analytics:</strong> We use Google Ads conversion tracking and Google Analytics 4 to measure ad effectiveness and remarket to past visitors across the Google Display Network and YouTube.</li>
        <li><strong>LinkedIn Insight Tag:</strong> Used to track conversions and retarget professional audiences.</li>
      </ul>
      <p>You can opt out of personalised ads via <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">YourAdChoices</a>, <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">NAI Opt-Out</a>, or your platform's ad settings.</p>

      <h3>4. Data Sharing &amp; Disclosure</h3>
      <p>We do not sell your personal data. We may share information with:</p>
      <ul>
        <li><strong>Service Providers:</strong> Payment processors (Razorpay), email/SMS providers, cloud hosting (Vercel, AWS), analytics tools (Google Analytics), and CRM platforms — solely to operate our Services.</li>
        <li><strong>Advertising Partners:</strong> Meta, Google, and LinkedIn receive pseudonymised event data (e.g., "a user completed a booking") to optimise ad delivery.</li>
        <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights, safety, or property.</li>
        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your data may be transferred to the successor entity.</li>
      </ul>

      <h3>5. Data Retention</h3>
      <p>We retain personal data for as long as your account is active or as needed to provide Services. After account closure, we retain data for up to 3 years for legal compliance, dispute resolution, and legitimate business purposes. Anonymised analytics data may be retained indefinitely.</p>

      <h3>6. Data Security</h3>
      <p>We implement industry-standard security measures including TLS/SSL encryption in transit, encrypted storage at rest, access controls, and regular security audits. However, no method of electronic transmission or storage is 100% secure.</p>

      <h3>7. Children's Privacy</h3>
      <p>Our Services are designed for children under the supervision of a parent or legal guardian. We do not knowingly collect personal data directly from children under 13 without verifiable parental consent. All accounts are created and managed by parents/guardians. If you believe a child has provided us data without consent, contact us immediately.</p>

      <h3>8. Your Rights</h3>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
        <li>Access, correct, or delete your personal data.</li>
        <li>Withdraw consent for marketing communications.</li>
        <li>Object to or restrict certain processing activities.</li>
        <li>Request data portability.</li>
        <li>Lodge a complaint with a supervisory authority.</li>
      </ul>
      <p>To exercise any of these rights, email us at <strong>chesswize79@gmail.com</strong> with the subject line "Privacy Request".</p>

      <h3>9. International Data Transfers</h3>
      <p>Our servers and service providers may be located outside India. By using our Services, you consent to the transfer of your data to jurisdictions that may have different data protection laws. We ensure appropriate safeguards are in place for such transfers.</p>

      <h3>10. Changes to This Policy</h3>
      <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on our Site. Continued use after changes constitutes acceptance.</p>

      <h3>11. Contact Us</h3>
      <p>For privacy-related enquiries:</p>
      <ul>
        <li><strong>Email:</strong> chesswize79@gmail.com</li>
        <li><strong>Phone:</strong> +91-70075-78072</li>
        <li><strong>Address:</strong> Kanpur, Uttar Pradesh, India</li>
      </ul>
    </LegalLayout>
  );
}

function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service">
      <p>Last updated: April 15, 2026</p>
      <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("you", "your", or "Parent/Guardian") and Chesswize Education LLP, operating as ChessWize ("we", "us", "our", or "ChessWize"). By accessing <strong>chesswize.com</strong> or enrolling in any of our programs, you agree to these Terms in full.</p>

      <h3>1. Eligibility &amp; Account Registration</h3>
      <p>Our Services are intended for parents or legal guardians enrolling children aged 5–17 in chess coaching programs. By creating an account, you represent that you are at least 18 years old and have the legal authority to bind yourself and your child to these Terms. You are responsible for all activity under your account and for maintaining the confidentiality of your login credentials.</p>

      <h3>2. Description of Services</h3>
      <p>ChessWize provides structured online chess coaching delivered via live video sessions, including:</p>
      <ul>
        <li><strong>1-on-1 Private Coaching:</strong> Personalised sessions with a FIDE-rated coach.</li>
        <li><strong>2-on-1 Sibling/Duo Coaching:</strong> Shared sessions for two students.</li>
        <li><strong>Cohort Training:</strong> Group sessions of 4–6 students at similar skill levels.</li>
        <li><strong>Diagnostic Evaluations:</strong> Complimentary baseline assessments to determine a student's starting level.</li>
        <li><strong>Digital Resources:</strong> Access to puzzles, study materials, and progress dashboards.</li>
      </ul>
      <p>Session schedules, pricing, and program details are as described on the Site at the time of purchase and in your booking confirmation.</p>

      <h3>3. Booking &amp; Payments</h3>
      <ul>
        <li>All fees are quoted in Indian Rupees (INR) unless otherwise stated and are due in advance.</li>
        <li>Payments are processed securely via Razorpay. By submitting payment, you agree to Razorpay's terms of service.</li>
        <li>We reserve the right to modify pricing at any time. Price changes will not affect existing paid enrolments.</li>
        <li>Promotional offers and discounts are subject to specific terms communicated at the time of the offer and cannot be combined unless explicitly stated.</li>
      </ul>

      <h3>4. Session Attendance &amp; Conduct</h3>
      <ul>
        <li>Students must join sessions on time via the designated video platform. Repeated no-shows (3 or more consecutive missed sessions without notice) may result in programme suspension without refund.</li>
        <li>Parents/guardians are expected to ensure a quiet, distraction-free environment for the student during sessions.</li>
        <li>Abusive, disruptive, or disrespectful behaviour toward coaches or other students will not be tolerated and may result in immediate termination of services.</li>
      </ul>

      <h3>5. Cancellations &amp; Refunds</h3>
      <p>Please refer to our dedicated <Link to="/refund-policy"><strong>Refund Policy</strong></Link> for complete details on our 30-Day Cognitive Growth Guarantee, session rescheduling, and cancellation procedures.</p>

      <h3>6. Intellectual Property</h3>
      <p>All content on the Site — including text, graphics, logos, curriculum materials, puzzle databases, the "ChessWize Programme" methodology, video recordings, and software — is the exclusive property of ChessWize or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any of our content without prior written consent.</p>

      <h3>7. User-Generated Content</h3>
      <p>If you submit testimonials, reviews, or feedback, you grant ChessWize a non-exclusive, royalty-free, perpetual, worldwide licence to use, reproduce, and display such content for marketing and promotional purposes across our Site, social media, and advertising campaigns.</p>

      <h3>8. Third-Party Links &amp; Services</h3>
      <p>Our Site may contain links to third-party websites or services (e.g., chess.com, lichess.org, payment processors). We are not responsible for the content, privacy practices, or availability of these external sites. Your use of third-party services is at your own risk.</p>

      <h3>9. Limitation of Liability</h3>
      <p>To the maximum extent permitted by applicable law, ChessWize and its directors, employees, coaches, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising from your use of or inability to use our Services. Our total aggregate liability for any claim shall not exceed the amount you paid to us in the 3 months preceding the claim.</p>

      <h3>10. Indemnification</h3>
      <p>You agree to indemnify and hold harmless ChessWize, its officers, coaches, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your breach of these Terms or misuse of our Services.</p>

      <h3>11. Governing Law &amp; Dispute Resolution</h3>
      <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kanpur, Uttar Pradesh, India. Before initiating legal proceedings, both parties agree to attempt resolution through good-faith negotiation for a period of 30 days.</p>

      <h3>12. Modifications to Terms</h3>
      <p>We may update these Terms at any time. Material changes will be notified via email or a prominent banner on the Site at least 15 days before taking effect. Continued use of our Services after the effective date constitutes acceptance of the revised Terms.</p>

      <h3>13. Severability</h3>
      <p>If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>

      <h3>14. Contact</h3>
      <p>For questions about these Terms:</p>
      <ul>
        <li><strong>Email:</strong> chesswize79@gmail.com</li>
        <li><strong>Phone:</strong> +91-70075-78072</li>
      </ul>
    </LegalLayout>
  );
}

function RefundPolicy() {
  return (
    <LegalLayout title="Refund Policy">
      <p>Last updated: April 15, 2026</p>
      <p>At ChessWize (operated by Chesswize Education LLP), we are confident in the quality of our coaching. This Refund Policy outlines the conditions under which refunds, cancellations, and rescheduling are handled.</p>

      <h3>1. 30-Day Cognitive Growth Guarantee</h3>
      <p>We stand behind our methodology with a results-backed guarantee. If you are not satisfied with the measurable progress your child has made within the first 30 calendar days of beginning a paid program, you are eligible for a <strong>full refund</strong> of your initial month's tuition, subject to the following conditions:</p>
      <ul>
        <li>The student must have attended all scheduled sessions during the 30-day period.</li>
        <li>The refund request must be submitted in writing to <strong>chesswize79@gmail.com</strong> within 7 days of the 30-day period ending.</li>
        <li>This guarantee applies once per family and only to the first enrolment.</li>
      </ul>

      <h3>2. Session Rescheduling</h3>
      <h4>1-on-1 and 2-on-1 Sessions</h4>
      <ul>
        <li><strong>More than 24 hours notice:</strong> You may reschedule the session at no cost. Rescheduled sessions must be completed within the same billing cycle.</li>
        <li><strong>Less than 24 hours notice:</strong> The session will be marked as attended. No refund or makeup session will be provided.</li>
        <li><strong>No-show:</strong> If a student fails to join within 10 minutes of the scheduled start time without prior notice, the session is forfeited.</li>
      </ul>
      <h4>Cohort Training</h4>
      <p>Due to the group nature of cohort sessions, individual rescheduling is not possible. If a student misses a cohort session, we will provide access to session notes or summary materials where available, but no refund or credit will be issued for missed group sessions.</p>

      <h3>3. Subscription Cancellations</h3>
      <ul>
        <li>You may cancel your monthly subscription at any time by emailing <strong>chesswize79@gmail.com</strong> or contacting us via WhatsApp.</li>
        <li>Cancellations take effect at the end of the current billing cycle. You will continue to have access to scheduled sessions until the cycle ends.</li>
        <li>No prorated refunds are issued for mid-cycle cancellations after the initial 30-day guarantee period.</li>
        <li>Annual or multi-month plans: Cancellations are subject to a pro-rata calculation minus a 15% early termination fee, applicable only after the 30-day guarantee window.</li>
      </ul>

      <h3>4. Diagnostic Evaluation</h3>
      <p>The initial Diagnostic Evaluation is provided free of charge. No refund applies as no payment is collected for this session.</p>

      <h3>5. Promotional &amp; Discounted Enrolments</h3>
      <p>Refunds for sessions purchased under promotional pricing or special offers will be calculated based on the discounted amount actually paid, not the original listed price.</p>

      <h3>6. Refund Processing</h3>
      <ul>
        <li>Approved refunds are processed within <strong>5–10 business days</strong> to the original payment method.</li>
        <li>Bank processing times may add an additional 3–7 business days depending on your financial institution.</li>
        <li>Refunds for UPI and net banking payments are typically faster (2–5 business days).</li>
      </ul>

      <h3>7. Exceptions &amp; Force Majeure</h3>
      <p>In the event of service disruption due to circumstances beyond our control (internet outages, platform failures, natural disasters, or government-mandated restrictions), we will make reasonable efforts to reschedule affected sessions. Refunds in such cases will be evaluated on a case-by-case basis.</p>

      <h3>8. How to Request a Refund</h3>
      <p>To initiate a refund or cancellation, contact us with:</p>
      <ul>
        <li>Your registered name and email address.</li>
        <li>The programme/plan you are enrolled in.</li>
        <li>Reason for the refund request.</li>
      </ul>
      <p><strong>Email:</strong> chesswize79@gmail.com | <strong>Phone/WhatsApp:</strong> +91-70075-78072</p>
    </LegalLayout>
  );
}

function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy">
      <p>Last updated: April 15, 2026</p>
      <p>This Cookie Policy explains how ChessWize (operated by Chesswize Education LLP) uses cookies and similar tracking technologies when you visit <strong>chesswize.com</strong>. It should be read alongside our <Link to="/privacy-policy"><strong>Privacy Policy</strong></Link>.</p>

      <h3>1. What Are Cookies?</h3>
      <p>Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, provide analytics, and enable advertising features. Similar technologies include pixel tags, web beacons, and local storage.</p>

      <h3>2. Types of Cookies We Use</h3>
      <h4>2.1 Strictly Necessary Cookies</h4>
      <p>These cookies are essential for the Site to function. They enable core features like page navigation, secure areas, and form submissions. You cannot opt out of these cookies as the Site will not function properly without them.</p>
      <ul>
        <li>Session management and authentication</li>
        <li>Security and fraud prevention</li>
        <li>Load balancing</li>
      </ul>

      <h4>2.2 Analytics &amp; Performance Cookies</h4>
      <p>These cookies help us understand how visitors interact with our Site by collecting anonymous, aggregated data.</p>
      <ul>
        <li><strong>Google Analytics 4 (GA4):</strong> Tracks page views, session duration, bounce rate, traffic sources, and user flow. Data is pseudonymised and processed by Google. <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Opt out of Google Analytics</a>.</li>
        <li><strong>Hotjar (if enabled):</strong> Records anonymised heatmaps and session replays to improve UX. No personal data is captured in recordings.</li>
      </ul>

      <h4>2.3 Advertising &amp; Remarketing Cookies</h4>
      <p>These cookies are used to deliver relevant advertisements and measure campaign performance.</p>
      <ul>
        <li><strong>Meta Pixel (Facebook/Instagram):</strong> Tracks conversions from Meta ads, enables Custom Audiences and Lookalike Audiences for remarketing. Cookie: <code>_fbp</code>, <code>_fbc</code>.</li>
        <li><strong>Google Ads (gtag.js):</strong> Tracks ad conversions and enables remarketing across the Google Display Network and YouTube. Cookies: <code>_gcl_au</code>, <code>_gac_</code>.</li>
        <li><strong>LinkedIn Insight Tag:</strong> Measures conversions from LinkedIn ads and enables retargeting of professional audiences. Cookie: <code>li_sugr</code>, <code>bcookie</code>.</li>
      </ul>

      <h4>2.4 Functional Cookies</h4>
      <p>These cookies remember your preferences (e.g., language, region) to provide a more personalised experience. They may also be used to remember choices you make on the Site (such as quiz answers in our diagnostic tools).</p>

      <h3>3. Third-Party Cookies</h3>
      <p>Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Key third parties include:</p>
      <ul>
        <li>Google (Analytics, Ads, YouTube embeds)</li>
        <li>Meta Platforms (Facebook Pixel)</li>
        <li>LinkedIn Corporation (Insight Tag)</li>
        <li>Razorpay (payment processing)</li>
      </ul>

      <h3>4. How to Manage Cookies</h3>
      <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
      <ul>
        <li>View and delete existing cookies</li>
        <li>Block all or specific third-party cookies</li>
        <li>Set preferences for certain websites</li>
      </ul>
      <p>Please note that disabling cookies may affect the functionality of our Site. For opt-out links specific to advertising cookies, see Section 3 of our <Link to="/privacy-policy"><strong>Privacy Policy</strong></Link>.</p>

      <h3>5. Updates to This Policy</h3>
      <p>We may update this Cookie Policy to reflect changes in technology or regulation. The "Last updated" date at the top will be revised accordingly.</p>

      <h3>6. Contact</h3>
      <p>For questions about our use of cookies, contact us at <strong>chesswize79@gmail.com</strong>.</p>
    </LegalLayout>
  );
}

function Disclaimer() {
  return (
    <LegalLayout title="Disclaimer">
      <p>Last updated: April 15, 2026</p>
      <p>The information provided on <strong>chesswize.com</strong> (the "Site") and through ChessWize's coaching services is for general educational and informational purposes only. By using our Site and Services, you acknowledge and agree to the following.</p>

      <h3>1. No Guaranteed Outcomes</h3>
      <p>While we are confident in our structured coaching methodology and have documented measurable improvements across hundreds of students, individual results may vary. Chess performance depends on numerous factors including the student's dedication, practice frequency, natural aptitude, and external circumstances. Elo ratings, tournament results, and cognitive improvements referenced on our Site are based on historical data from past students and are not a guarantee of future performance.</p>

      <h3>2. Educational Purpose Only</h3>
      <p>Our Services are designed to teach chess strategy, critical thinking, and cognitive skills. ChessWize is not a substitute for formal academic education, psychological counselling, or medical advice. Claims about cognitive development benefits of chess are based on published research and our internal observations, but should not be interpreted as clinical or therapeutic claims.</p>

      <h3>3. Testimonials &amp; Reviews</h3>
      <p>Testimonials displayed on our Site, social media, and advertising materials reflect the genuine experiences of individual parents and students. However, these are personal opinions and individual results. They do not constitute a guarantee that you or your child will achieve the same or similar results. Some testimonials may have been lightly edited for clarity or brevity while preserving the original meaning.</p>

      <h3>4. Advertising &amp; Promotional Content</h3>
      <p>Our Site and marketing campaigns (including ads on Meta, Google, LinkedIn, and other platforms) may contain forward-looking statements, promotional language, and illustrative projections (e.g., the Elo Projection Calculator). These tools are for educational illustration only and do not constitute a promise of specific outcomes.</p>

      <h3>5. Third-Party Links &amp; Content</h3>
      <p>Our Site may contain links to external websites, platforms, or resources (e.g., chess.com, lichess.org, FIDE). We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites. Accessing external links is at your own risk.</p>

      <h3>6. Accuracy of Information</h3>
      <p>We make reasonable efforts to ensure the information on our Site is accurate and up to date. However, we do not warrant the completeness, reliability, or accuracy of any information. Pricing, program details, schedules, and availability are subject to change without notice.</p>

      <h3>7. Limitation of Liability</h3>
      <p>To the fullest extent permitted by law, ChessWize, its founders, coaches, employees, and affiliates disclaim all liability for any loss or damage arising from your reliance on information provided on the Site or through our Services. This includes, without limitation, any direct, indirect, incidental, or consequential damages.</p>

      <h3>8. Professional Advice</h3>
      <p>Nothing on this Site constitutes professional, legal, financial, or medical advice. For specific concerns about your child's development, please consult a qualified professional.</p>

      <h3>9. Contact</h3>
      <p>If you have questions about this Disclaimer, please contact us at <strong>chesswize79@gmail.com</strong>.</p>
    </LegalLayout>
  );
}

/* ════════════════════════════════════════════════
   APP ROUTER
   ════════════════════════════════════════════════ */
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-200 selection:text-blue-900 font-sans bg-white overflow-x-hidden">
      <Toaster theme="light" position="top-center" richColors />
      <TopNav />
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
      <Footer />
      {/* ── Removed per consensus: ProgramStats, Transformation, Curriculum, LearningModes,
          FounderStory, ParentAssessmentQuiz, DailyRegimen, MidPageCTA, EloProjectionCalculator,
          InteractivePuzzle — all hurt conversion or duplicated content ── */}
      <WhatsAppWidget />
      <MobileStickyCTA />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
    </Routes>
  );
}
