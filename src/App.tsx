import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import {
  CheckCircle,
  Trophy,
  Calendar,
  TrendingUp,
  FileText,
  PlayCircle,
  Lock,
  XCircle,
  Star,
  Shield,
  Target,
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
  BrainCircuit,
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
  Phone
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import { defaultLayoutIcons, DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { Toaster, toast } from "sonner";

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
          <img src="/Untitled-design-22.png.bv.webp" alt="ChessWize Logo" className="h-8 md:h-10 object-contain" />
          <span className="font-extrabold tracking-tighter-gs text-slate-900 text-[1.25rem] md:text-[1.5rem] leading-none">ChessWize.</span>
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
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 md:gap-4">
              <div className="trust-badge-container">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s)=><Star key={s} className="size-3 md:size-3.5 fill-emerald-500 text-emerald-500" />)}
                </div>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-700">Trusted by 1,500+ Parents</span>
              </div>
              <div className="trust-badge-container bg-blue-50/50 border-blue-100">
                <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] md:text-[11px] font-extrabold text-blue-800 uppercase tracking-widest-gs">Strictly Max 6 Kids Per Batch</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-extrabold tracking-tighter-gs text-slate-900 leading-[1.12] drop-shadow-sm">
              Turn idle screen time into{' '}
              <span className="text-gradient-primary">strategic intelligence.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-[1.6] max-w-2xl tracking-tight-gs mt-1 md:mt-2">
              Stop wasting hours on unstructured play. Our rigorous, level-based chess curriculum transforms impulsive kids into focused, patient, and analytical thinkers—guided by elite FIDE-certified masters.
            </motion.p>

            <motion.div variants={fadeUp} className="bg-white p-5 md:p-6 rounded-2xl depth-panel mt-2 md:mt-4 max-w-xl relative overflow-hidden hover-lift">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest-gs mb-4 flex items-center gap-2">
                <Target className="size-4 text-blue-600" /> Start Your Free Evaluation
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <select className="w-full px-4 py-3.5 text-sm md:text-base border border-slate-200 rounded-xl bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all appearance-none cursor-pointer hover:border-blue-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                    <option value="">Select Child's Age</option>
                    <option value="4-6">4 - 6 Years</option>
                    <option value="7-9">7 - 9 Years</option>
                    <option value="10-12">10 - 12 Years</option>
                    <option value="13+">13+ Years</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 md:size-5 text-slate-500 pointer-events-none" />
                </div>
                <Button onClick={scrollToForm} size="lg" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 gs-btn gs-btn-primary rounded-xl text-sm md:text-base font-bold transition-all">
                  Request Eval <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-500">
                  <CheckCircle className="size-3.5 text-emerald-500 drop-shadow-sm" /> Zero Financial Risk
                </span>
                <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-500">
                  <CheckCircle className="size-3.5 text-emerald-500 drop-shadow-sm" /> 100% Free Baseline Report
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
                  <Badge className="bg-red-500/90 backdrop-blur-md text-white border-0 font-bold px-2 py-1 md:px-3 md:py-1 rounded shadow-lg uppercase tracking-widest-gs text-[9px] md:text-[10px] animate-pulse ring-1 ring-white/20">Inside Live Training</Badge>
                </div>
                
                <video
                  src="https://chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-07-at-22.51.22.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
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
              
              {/* Trust Indicators below video */}
              <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3">
                <div className="pill-badge rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-default">
                  <img src="/calendar-appointment.webp" className="size-5 md:size-7 object-contain mb-1 md:mb-2 drop-shadow-sm" alt="Calendar" />
                  <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Diagnostic</span>
                  <span className="text-xs md:text-sm font-extrabold text-slate-900 tracking-tight-gs">Evaluation</span>
                </div>
                <div className="pill-badge rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-default">
                  <img src="/gold-thropy.webp" className="size-5 md:size-7 object-contain mb-1 md:mb-2 drop-shadow-sm" alt="Trophy" />
                  <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Expert</span>
                  <span className="text-xs md:text-sm font-extrabold text-slate-900 tracking-tight-gs">FIDE Masters</span>
                </div>
                <div className="pill-badge rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-default">
                  <Activity className="size-5 md:size-7 text-blue-600 mb-1 md:mb-2 drop-shadow-sm" />
                  <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Analytics</span>
                  <span className="text-xs md:text-sm font-extrabold text-slate-900 tracking-tight-gs">Data-Driven</span>
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
    <section className="py-12 md:py-16 bg-slate-50 text-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-emerald-900/20"></div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-4 gap-x-4 divide-x-0 md:divide-x divide-slate-800">
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
    if (totalScore <= 7) return { title: "The Unstructured Tactician", desc: "Your child has raw potential but acts impulsively and struggles with emotional resilience. They lack a mental framework for decision making. They require our strict Foundation Protocol to build patience before advancing.", track: "Foundation Protocol", icon: Target, color: "text-blue-600", bg: "bg-blue-500/20", border: "border-blue-500/30" };
    if (totalScore <= 11) return { title: "The Cautious Planner", desc: "Your child has a good baseline attention span but lacks aggressive calculation and pattern recognition. They hesitate under pressure. They need our Tactical Vision training to build ruthless competitive confidence.", track: "Tactical Vision Protocol", icon: Layers, color: "text-amber-600", bg: "bg-amber-500/20", border: "border-amber-500/30" };
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
            Take this 45-second assessment to map your child's Cognitive Profile. We use this data to determine if they qualify for our intensive cohorts.
          </p>
        </div>

        <div className="bg-slate-50/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 md:p-10 max-w-3xl mx-auto shadow-2xl shadow-blue-900/20 relative min-h-[450px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!calculating && !showResult && (
              <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col w-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest-gs">Question {step + 1} of {questions.length}</span>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <div key={i} className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-extrabold mb-8 leading-snug text-slate-600">{questions[step].q}</h4>
                <div className="flex flex-col gap-3">
                  {questions[step].opts.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSelect(step, opt.score)}
                      className="text-left w-full p-4 md:p-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 hover:border-blue-500 transition-all font-medium text-sm md:text-base text-slate-500 gs-shadow flex items-center justify-between group hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    >
                      {opt.text}
                      <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                    </button>
                  ))}
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
                  const selectEl = document.getElementById("bottom_child_age") as HTMLSelectElement;
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
              <AlertTriangle className="size-3" /> The Screen-Time Crisis
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 md:mb-6 leading-tight">
              Casual hobby classes are <span className="text-red-600">wasting your child's potential.</span>
            </h3>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                Today’s children are overwhelmed by screen distractions. Most local clubs treat chess as just another after-school activity where kids play aimlessly, without learning the rigorous cognitive frameworks required to build patience, strategic foresight, and academic focus.
              </p>
              <p>
                At ChessWize, we operate an <strong>academic-grade training environment</strong>. We teach children how to sit still, calculate variations deeply, analyze their own mistakes, and perform under psychological pressure—skills that translate directly to better grades.
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
                <div className="absolute top-2 left-2 bg-red-600 text-slate-50 text-[10px] font-extrabold uppercase tracking-widest-gs px-2 py-1 rounded shadow">The Status Quo</div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-square relative group">
                 <img loading="lazy" src="/2026-04-15-10-00-00-focused-child-chess.webp" alt="A child deeply focused on a chess board, overcoming screen-time addiction" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-2 left-2 bg-blue-600 text-slate-50 text-[10px] font-extrabold uppercase tracking-widest-gs px-2 py-1 rounded shadow">The Solution</div>
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
                  <div className="text-center text-blue-600">ChessWize Protocol</div>
                </div>

                {[
                  { feature: "Instructor Caliber", bad: "Amateurs (1200 Elo)", good: "FIDE-Rated Masters" },
                  { feature: "Curriculum Design", bad: "Random Play", good: "Level-Based Syllabus" },
                  { feature: "Cognitive Tracking", bad: "None", good: "Engine Matrix Analysis" },
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
                Upgrade Their Education Standard
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
            This is the weekly routine we use to replace idle screen time with focus, discipline, and competitive excellence.
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
            We give parents complete visibility. Track your child's progress, tactical accuracy, and focus improvements week over week through our parent dashboard. No more guessing.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Dashboard UI Mockup */}
          <div className="w-full lg:w-1/2 relative">
            <div className="glass-panel rounded-3xl p-4 md:p-6 shadow-2xl relative z-10 overflow-hidden group hover:border-blue-300 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Fake Topbar */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(37,99,235,0.3)] border border-blue-400/20">
                    <span className="font-extrabold text-white text-lg drop-shadow-md">S</span>
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">Saanvika's Telemetry</div>
                    <div className="text-[10px] text-blue-600 uppercase tracking-widest-gs font-bold">Tournament Masterclass</div>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/50 text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest-gs border border-emerald-200 shadow-sm flex items-center gap-1.5">
                  <TrendingUp className="size-3.5" /> +142 Elo (30 Days)
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                {/* Radar Chart Component */}
                <div className="depth-panel rounded-2xl p-4 flex flex-col items-center justify-center aspect-square relative">
                  <div className="absolute top-3 left-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Skill Matrix</div>
                  <div className="w-3/4 h-3/4 mt-4 drop-shadow-sm">
                    <RadarChart />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Fake Graph */}
                  <div className="depth-panel rounded-2xl p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs">Tactical Accuracy</span>
                      <span className="text-xs font-extrabold text-emerald-600 drop-shadow-sm">94%</span>
                    </div>
                    <div className="w-full h-16 flex items-end justify-between gap-1.5">
                      {[40, 50, 45, 60, 75, 70, 85, 94].map((height, idx) => (
                        <div key={idx} className="w-full bg-slate-100 rounded-t-sm relative group/bar shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
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
                  </div>

                  {/* Weakness Tag */}
                  <div className="depth-panel rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest-gs block mb-2">Focus Area Identified</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Rook Endgames</span>
                      <Badge className="bg-gradient-to-b from-red-50 to-red-100/50 text-red-700 border-red-200 rounded text-[9px] px-1.5 py-0 font-extrabold uppercase tracking-widest-gs shadow-sm">Action Req</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative background blocks behind dashboard */}
            <div className="absolute top-8 -right-8 w-full h-full bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-3xl border border-slate-300 gs-shadow-lg z-0 blur-md" />
          </div>

          {/* Right Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:pl-8">
            <div className="flex items-start gap-5 group">
              <div className="size-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1 shadow-inner group-hover:bg-blue-500/20 transition-colors">
                <Activity className="size-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 tracking-tight-gs mb-2">Pinpoint Weakness Detection</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  Our coaches analyse every game your child plays online. We identify recurring mistakes and create custom puzzle sets to fix the exact gaps — so they improve faster, not just play more.
                </p>
              </div>
            </div>
            
            <Separator className="bg-white/80 gs-shadow-xl" />

            <div className="flex items-start gap-5 group">
              <div className="size-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1 shadow-inner group-hover:bg-emerald-500/20 transition-colors">
                <LineChartIcon className="size-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-900 tracking-tight-gs mb-2">Complete Transparency for Parents</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  Know exactly what you're paying for. Receive regular WhatsApp progress reports covering concepts mastered, attendance, and live Elo rating graphs.
                </p>
              </div>
            </div>

            <Button onClick={scrollToForm} variant="outline" className="w-fit mt-4 bg-slate-50 border-slate-200 text-slate-900 hover:bg-white font-bold hover-lift shadow-lg">
              Experience the Dashboard <ArrowUpRight className="ml-2 size-4" />
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
      title: "Mate in 1",
      subtitle: "White to move",
      desc: "Find the only square that delivers checkmate. The king has no escape.",
      pieces: [
        { row: 7, col: 4, type: "♔", color: "w" },
        { row: 0, col: 6, type: "♚", color: "b" },
        { row: 2, col: 5, type: "♕", color: "w" },
        { row: 1, col: 7, type: "♟", color: "b" },
        { row: 1, col: 5, type: "♟", color: "b" },
      ],
      winningSquare: { row: 0, col: 5 },
      lastMove: { from: { row: 3, col: 2 }, to: { row: 2, col: 5 } },
      captured: { white: ["♟","♟","♝"], black: ["♞","♟"] },
      moveHistory: ["1. e4 e5", "2. Qh5 Nc6", "3. Bc4 Nf6??", "4. Qxf7#"],
      solutionMove: "Qf8#",
      evalStart: 60, evalEnd: 100, evalText: "+M1",
      difficulty: "Easy", rating: 800,
    },
    intermediate: {
      title: "Knight Fork",
      subtitle: "White to move",
      desc: "Spot the geometric weakness. One knight move attacks two pieces simultaneously.",
      pieces: [
        { row: 7, col: 6, type: "♔", color: "w" },
        { row: 1, col: 6, type: "♚", color: "b" },
        { row: 4, col: 4, type: "♘", color: "w" },
        { row: 1, col: 3, type: "♛", color: "b" },
        { row: 2, col: 7, type: "♟", color: "b" },
        { row: 6, col: 5, type: "♙", color: "w" },
        { row: 6, col: 6, type: "♙", color: "w" },
      ],
      winningSquare: { row: 2, col: 5 },
      lastMove: { from: { row: 0, col: 3 }, to: { row: 1, col: 3 } },
      captured: { white: ["♟","♝","♜"], black: ["♞","♟","♟"] },
      moveHistory: ["18. Nd5 Qd7??", "19. Nf6+"],
      solutionMove: "Nf6+",
      evalStart: 52, evalEnd: 85, evalText: "+6.4",
      difficulty: "Medium", rating: 1200,
    },
    advanced: {
      title: "Deflection Sacrifice",
      subtitle: "White to move",
      desc: "Calculate the sacrifice that deflects the defender, opening the back rank for mate.",
      pieces: [
        { row: 7, col: 6, type: "♔", color: "w" },
        { row: 0, col: 6, type: "♚", color: "b" },
        { row: 0, col: 5, type: "♜", color: "b" },
        { row: 2, col: 7, type: "♖", color: "w" },
        { row: 2, col: 6, type: "♕", color: "w" },
        { row: 1, col: 5, type: "♟", color: "b" },
        { row: 1, col: 7, type: "♟", color: "b" },
        { row: 6, col: 6, type: "♙", color: "w" },
        { row: 6, col: 7, type: "♙", color: "w" },
      ],
      winningSquare: { row: 0, col: 7 },
      lastMove: { from: { row: 0, col: 0 }, to: { row: 0, col: 5 } },
      captured: { white: ["♜","♝","♟","♟"], black: ["♞","♝","♟","♟","♟"] },
      moveHistory: ["24. Qg6 Rf8??", "25. Rh8+!"],
      solutionMove: "Rh8+!",
      evalStart: 48, evalEnd: 100, evalText: "+M4",
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
                {solved ? "Claim Evaluation Based On This Result" : "Book Free Evaluation"} <ArrowRight className="ml-2 size-4" />
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
    { title: "The Absolute Beginner", badge: "Ages 4-8", icon: Target, img: "/2026-04-15-10-16-00-absolute-beginner.webp", desc: "For children who don't know the rules but want to build a strong foundation in logical thinking, pattern recognition, and deep concentration.", pain: "Lacks focus and structure in learning." },
    { title: "The Casual Player", badge: "Ages 7-12", icon: Layers, img: "/2026-04-15-10-17-00-casual-player.webp", desc: "Plays casually but hasn't seen real progress. Needs structure to turn a passing hobby into a disciplined, measurable cognitive routine.", pain: "Plays aimlessly without seeing real improvement." },
    { title: "The Tournament Hopeful", badge: "Ages 9-16", icon: Trophy, img: "/2026-04-15-10-18-00-tournament-hopeful.webp", desc: "Already playing competitively but struggles under pressure. Needs psychological resilience and advanced calculation training to win.", pain: "Loses focus and blunders under time pressure." },
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
                  <div className="bg-red-50 text-red-800 p-4 rounded-2xl text-xs font-bold border border-red-100 flex gap-3 items-start mt-auto">
                    <AlertTriangle className="shrink-0 size-4 text-red-500 mt-0.5" />
                    <span className="leading-snug">Solves: {p.pain}</span>
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
   LEARNING MODES
   ════════════════════════════════════════════════ */
function LearningModes() {
  const modes = [
    { title: "Individual (1-on-1)", badge: "Highest Intensity", icon: User, img: "/2026-04-15-10-05-00-1-on-1-coaching.webp", desc: "Surgical attention and customized training at the student's exact pace. Best for rapid rating gain and tailored opening repertoires." },
    { title: "Two-on-One", badge: "Collaborative", icon: Users, img: "/2026-04-15-10-06-00-two-on-one-coaching.webp", desc: "Designed for friends or siblings to learn together. Fosters healthy competition while maintaining high pedagogical density." },
    { title: "Cohort Training", badge: "Max 4-6 Students", icon: UserPlus, img: "/2026-04-15-10-15-00-cohort-coaching.webp", desc: "Elite small batches to ensure quality learning, peer-to-peer tactical sparring, and structured academic progression." },
  ];

  return (
    <section id="learning-modes" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Class Formats</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-4 md:mb-6 leading-tight">
            Architected for maximum focus.
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
            We cap our class sizes ruthlessly to maintain pedagogical integrity. Choose the delivery mechanism that fits your child's psychology.
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
                     <Button onClick={scrollToForm} variant="outline" className="w-full font-bold border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-blue-600 h-12 rounded-xl">Secure Placement</Button>
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
    { week: "Phase 1", title: "Foundation Protocol", duration: "Beginners", details: "Strict structural training for complete beginners. Focuses heavily on board vision, piece safety, and instilling the patience required to calculate before acting.", tools: ["Checks, Captures, Threats", "Board Vision", "Patience Building"], img: "/2026-04-15-10-02-00-foundation-protocol.webp" },
    { week: "Phase 2", title: "Tactical Geometry", duration: "Intermediate", details: "Intensive calculation training. Students learn to spot multi-move combinations, execute forks/pins/skewers, and develop basic opening principles to survive the first 15 moves.", tools: ["Multi-move Calculation", "Opening Principles"], img: "/2026-04-15-10-03-00-tactical-geometry.webp" },
    { week: "Phase 3", title: "Tournament Masterclass", duration: "Advanced", details: "Elite prep for rated players. Covers deep theoretical endgames, pawn structure manipulation, and psychological resilience under severe time pressure.", tools: ["Positional Play", "Theoretical Endgames", "Clock Management"], img: "/2026-04-15-10-04-00-tournament-masterclass.webp" }
  ];

  return (
    <section id="programs" className="py-16 md:py-24 bg-white border-b border-slate-200 gs-grid-pattern">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-20 text-center">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Structured Syllabus</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 md:mb-6 leading-tight">
            The <span className="text-blue-600">Cognitive Framework</span>
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
   VIDEO TESTIMONIALS
   ════════════════════════════════════════════════ */
function VideoShowcase() {
  const videos = [
    { src: "https://chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-07-at-22.51.22.mp4", name: "Saanvika's Parents", desc: "Won five tournaments since joining", poster: "/2026-04-15-10-36-00-proud-parent-tablet.webp" },
    { src: "https://chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-07-at-22.51.22-1.mp4", name: "Mikaeel's Parents", desc: "Huge improvement in confidence", poster: "/2026-04-15-10-35-00-parent-child-video-call.webp" }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl mx-auto text-center md:text-left">
            <h2 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest-gs mb-2 md:mb-3 flex items-center justify-center md:justify-start gap-2">
              <PlayCircle className="size-3" /> Verifiable Results
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter-gs mb-3 md:mb-4 leading-tight drop-shadow-sm">
              Real parents. <span className="text-amber-600">Real data.</span>
            </h3>
            <p className="text-base md:text-lg text-slate-600 font-medium">
              Don't take our word for it. Listen to the parents who trusted us with their child's cognitive development.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-6 md:gap-10">
          {videos.map((v, i) => (
            <div key={i} className="flex flex-col gap-3 md:gap-4 group">
              <div className="relative aspect-[9/16] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden group hover:border-amber-400/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 pointer-events-none" />
                <MediaPlayer
                  title={v.name}
                  src={v.src}
                  playsInline
                  aspectRatio="9/16"
                  className="w-full h-full object-cover z-20 relative"
                >
                  <MediaProvider>
                    <Poster src={v.poster} alt={v.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  </MediaProvider>
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
              </div>
              <div className="depth-panel p-4 md:p-5 rounded-xl hover-lift cursor-default mt-2">
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(s=><Star key={s} className="size-3 fill-amber-400 text-amber-500 drop-shadow-sm" />)}
                </div>
                <p className="font-extrabold text-slate-900 tracking-tight-gs text-sm md:text-base leading-snug drop-shadow-sm">{v.name}</p>
                <p className="text-xs font-bold text-slate-500 mt-1">{v.desc}</p>
              </div>
            </div>
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
              Expert Coaching by <span className="text-blue-700">Titled Masters.</span>
            </h3>
            <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-6 md:mb-8">
              We strictly filter our faculty. We do not hire hobbyists or 1500-rated amateurs. Our head coaches hold official titles from the World Chess Federation (FIDE) and possess years of rigorous pedagogical experience.
            </p>
            
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
                   <h4 className="font-extrabold text-slate-900 text-sm md:text-base">Cognitive Pedagogy Training</h4>
                   <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">Every coach is trained to teach patience, calculation protocols, and resilience—not just piece movements.</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 lg:p-10 gs-shadow-xl relative overflow-hidden hover-lift">
              <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-amber-100/50 rounded-full blur-[40px] md:blur-[60px] pointer-events-none" />
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start relative z-10">
                <div className="relative shrink-0">
                  <img loading="lazy" src="/young-man-deep-in-thought-while-playing-game-of-ch-2026-01-09-00-57-38-utc.webp" alt="Coach" className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-slate-200 gs-shadow-lg relative z-10" />
                  <div className="absolute -bottom-4 -right-4 bg-white border border-slate-200 rounded-xl p-2 gs-shadow-lg z-20">
                     <img src="/star-badge.webp" className="size-8 object-contain" alt="FIDE" />
                  </div>
                </div>
                <div className="flex-1 mt-2 sm:mt-0">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-widest-gs mb-2 px-2 py-0.5">Master Coach & Founder</Badge>
                  <h4 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs mb-1 text-slate-900">Tarun Sir</h4>
                  
                  <Separator className="bg-slate-200 mb-4 mt-4" />
                  
                  <div className="grid grid-cols-1 gap-y-3 text-xs md:text-sm font-bold text-slate-700">
                    <div className="flex items-center gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0" /> Officially FIDE Rated</div>
                    <div className="flex items-center gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0" /> 10+ years academic pedagogy</div>
                    <div className="flex items-center gap-3"><CheckCircle className="size-4 text-emerald-500 shrink-0" /> Developed the ChessWize Protocol</div>
                  </div>
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
          </div>          <div className="w-full md:w-2/3 flex flex-col">
            <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Origin Directive</h2>
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
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest-gs mt-1">Founder & Chief Architect</span>
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
              Upon successful completion of our rigorous training protocols, students receive a verified Certificate of Excellence—a testament to their focus, logic, and strategic capabilities.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="size-5 text-emerald-600 shrink-0" /> Mathematically validated skill progression</li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="size-5 text-emerald-600 shrink-0" /> Signed by FIDE Titled Masters</li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="size-5 text-emerald-600 shrink-0" /> Powerful academic profile enhancer</li>
            </ul>
          </div>
          <div className="w-full lg:w-[55%] relative mt-8 lg:mt-0">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl relative z-10 rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer">
              <div className="border-[4px] border-amber-500/30 rounded-2xl p-8 md:p-10 bg-slate-50 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                <img src="/gold-thropy.webp" className="size-20 mx-auto mb-6 relative z-10 drop-shadow-2xl" alt="Trophy" />
                <h4 className="text-3xl font-extrabold tracking-tighter-gs text-slate-900 uppercase relative z-10">Certificate of Excellence</h4>
                <p className="text-slate-600 font-medium text-sm mt-4 relative z-10 max-w-sm mx-auto">Awarded for mastering advanced strategic planning and tactical calculation.</p>
                <div className="mt-10 border-t border-slate-200 pt-8 flex justify-between items-center px-4 relative z-10">
                  <div className="text-left relative z-10">
                    <p className="text-[10px] uppercase tracking-widest-gs font-bold text-slate-500 mb-1">Head Coach</p>
                    <p className="font-extrabold text-slate-900 text-lg">Tarun Sir</p>
                  </div>
                  <img src="/star-badge.webp" className="size-16 opacity-90 drop-shadow-lg relative z-10" alt="Seal" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-amber-600/20 rounded-3xl -rotate-2 sm:-rotate-3 z-0 shadow-lg border border-amber-500/20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   VALUE STACK
   ════════════════════════════════════════════════ */
function ValueStack() {
  return (
    <section id="tuition" className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-amber-100 text-amber-800 border-0 rounded-full font-bold mb-4 md:mb-6 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">The Arsenal</Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 md:mb-6 text-slate-900 leading-tight">
            The Complete <span className="text-blue-600">Cognitive Stack</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Everything required to build a resilient thinker, bundled into our rigorous training environment.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Stack details */}
        <div className="w-full lg:w-[55%] flex flex-col gap-3">
          <h4 className="text-lg md:text-xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight-gs">What your investment covers:</h4>
          {[
            { label: "Live Cognitive Training with FIDE Masters", value: "Core" },
            { label: "Daily Puzzle Routines to Build Focus", value: "Tech" },
            { label: "Mistake Analysis & Behavioral Review", value: "Core" },
            { label: "Parental Dashboard & Telemetry Updates", value: "Comms" },
            { label: "Official Certification of Cognitive Progress", value: "Included" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200 gs-shadow-sm hover:border-blue-300 transition-all hover:bg-white hover-lift cursor-default">
              <div className="flex items-center gap-3 md:gap-4">
                <CheckCircle className="size-4 md:size-5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm md:text-base leading-tight">{item.label}</span>
              </div>
              <Badge variant="secondary" className="bg-white text-slate-600 border border-slate-200 uppercase tracking-widest-gs font-bold text-[9px]">
                {item.value}
              </Badge>
            </div>
          ))}
        </div>

        {/* Call to Action Card */}
        <div className="w-full lg:w-[45%] relative">
          <div className="absolute inset-0 rounded-3xl bg-[url('/2026-04-15-10-10-00-chess-dashboard.webp')] bg-cover bg-center gs-shadow-2xl border border-slate-200 hover-lift overflow-hidden">
             <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-sm pointer-events-none" />
             <div className="absolute inset-0 flex flex-col p-6 sm:p-8 md:p-10 text-slate-900 relative z-10">
               <div className="absolute -top-3 right-4 sm:right-8 bg-emerald-500 text-slate-50 font-extrabold text-[9px] sm:text-[11px] uppercase tracking-widest-gs px-3 sm:px-4 py-1 sm:py-1.5 rounded-md shadow-lg text-center animate-pulse border border-emerald-400">
                 Strict 6-Student Limit
               </div>
               
               <div className="mb-auto">
                 <h4 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs mb-2 md:mb-3">Ready to enroll?</h4>
                 <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
                   We do not accept direct payments. Every student must complete the free baseline evaluation to ensure cohort compatibility.
                 </p>
               </div>
               
               <div className="mt-8 md:mt-10">
                 <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-700 mb-4 md:mb-6">
                   <Lock className="size-4 text-blue-600" />
                   Invitation-only enrollment process
                 </div>
                 <Button onClick={scrollToForm} className="w-full h-14 md:h-16 gs-btn bg-blue-600 text-slate-50 hover:bg-blue-700 font-extrabold text-base shadow-xl rounded-xl">
                   Book Baseline Evaluation <ArrowRight className="ml-2 size-5" />
                 </Button>
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
   STAR PERFORMERS
   ════════════════════════════════════════════════ */
function StarPerformers() {
  const performers = [
    {
      name: "Saanvika",
      achievement: "Won five local tournaments since joining. Phenomenal growth in strategic positional play.",
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-28.png",
      tag: "Tournament Winner"
    },
    {
      name: "Mikaeel",
      achievement: "Significant improvement in calculation accuracy and immense growth in competitive confidence.",
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-30.png",
      tag: "Tactical Specialist"
    },
    {
      name: "Avyukt",
      achievement: "Advanced from baseline to the Advanced Cohort in record time. Exceptional puzzle-solving vision.",
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-29.png",
      tag: "Fast-Track Advancement"
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
            Meet the students who have fully embraced the ChessWize Protocol and are dominating their local tournament circuits.
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
                </div>

                <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight-gs mb-3">{p.name}</h4>
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                  {p.achievement}
                </p>
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
    { text: "Chesswize has been an incredible experience for my son, Aadvik! The coaches are patient and engaging, making each lesson exciting. I've noticed a big improvement in his thinking skills and concentration. He looks forward to every session, and I’m so happy with his progress. Highly recommend!", author: "Rupali", desc: "Lucknow", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png" },
    { text: "My daughter, Anika, has shown amazing progress since joining Chesswize! The coaches make learning fun and engaging, helping her improve focus and problem-solving skills. She looks forward to every session, and I’m so happy to see her confidence grow. Highly recommend!", author: "Monika", desc: "Kanpur", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png" },
    { text: "My daughter, Ishita, has shown amazing progress since joining Chesswize! The coaches are patient and engaging, making learning fun. She has improved her focus and problem-solving skills. She looks forward to every session, and I’m so happy with her growth. Highly recommend!", author: "Anjana", desc: "Mumbai", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png" },
  ];
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 gs-grid-pattern">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Written Telemetry</h2>
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
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-emerald-100 text-emerald-800 border-0 rounded-full font-bold mb-4 md:mb-6 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-widest-gs">
            The Process
          </Badge>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 md:mb-6 text-slate-900 leading-tight">
            How our <span className="text-emerald-600">training process</span> works.
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            We've removed all friction. Your child can access our elite academic-grade training from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[
            {
              title: "1. The Free Baseline Evaluation",
              desc: "First, we jump on a 50-minute 1-on-1 virtual call to map your child's current focus, patience, and logic skills. No commitment required.",
              icon: Target,
            },
            {
              title: "2. Cohort Placement",
              desc: "Based on their cognitive profile, we place them into a high-density, small group (max 6 kids) with a FIDE-certified master.",
              icon: Users,
            },
            {
              title: "3. Weekly Virtual Training",
              desc: "Your child logs into our secure interactive platform. They get live masterclasses, interactive engine puzzles, and you track it all via the Parent Dashboard.",
              icon: Activity,
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl gs-shadow-sm hover:border-emerald-300 transition-all hover-lift">
              <div className="size-12 md:size-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                <step.icon className="size-6 text-emerald-600" />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold tracking-tight-gs text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════ */
function FAQ() {
  const faqs = [
    {
      q: "My child is 5 and can't sit still for 10 minutes. Will this work?",
      a: "Yes. Our Foundation Protocol is specifically designed for high-energy children. We use rapid-fire, gamified puzzles that naturally stretch their attention span over 30 days. They learn to sit still because they are constantly engaged, not because they are forced to."
    },
    {
      q: "How is this different from the free chess.com app?",
      a: "Free apps teach you how the pieces move. We teach cognitive resilience. An app won't correct your child's frustration when they lose, nor will it explain *why* their impulsive decision-making is failing. Our FIDE Masters provide live, psychological and tactical interventions."
    },
    {
      q: "What if my child misses a live session?",
      a: "Every single session is recorded and uploaded to your Parent Dashboard. Additionally, they will have their daily puzzle regimen and engine analysis tools to ensure they never fall behind the cohort."
    },
    {
      q: "Do I need to know how to play chess to help them?",
      a: "Absolutely not. In fact, we prefer you don't intervene. Our system is fully self-contained. Your only job is to check the Parent Dashboard to monitor their cognitive metrics and Elo growth."
    },
    {
      q: "What exactly is the 30-Day Guarantee?",
      a: "We guarantee visible cognitive growth. If, after 30 days of attending our sessions and doing the daily puzzles, you do not see a noticeable improvement in your child's patience or focus, we will refund 100% of your tuition. No questions asked."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 text-slate-900 gs-grid-pattern border-t border-slate-200">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-3">Frequently Asked Questions</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs mb-4 text-slate-900 leading-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h3>
        </div>

        <Accordion className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200 bg-white/80 gs-shadow-xl rounded-2xl px-4 md:px-6 py-2 gs-shadow-sm">
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
function BottomForm() {
  const [formData, setFormData] = useState({ parent_name: "", child_age: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parent_name || !formData.phone) { alert("Please fill in your name and phone number."); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { setStatus("success"); setFormData({ parent_name: "", child_age: "", phone: "" }); } else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="book-evaluation" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 gs-grid-pattern relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest-gs mb-2 md:mb-3">Take the next step</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-3 md:mb-4 leading-tight">
            Claim Your Child's Free Cognitive Evaluation
          </h3>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Fill in your details below. We'll contact you to schedule a free 50-minute evaluation to assess your child's current focus, patience, and baseline calculation ability.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-14 gs-border gs-shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[60px] pointer-events-none" />
          
          {status === "success" ? (
            <div className="text-center py-12 relative z-10">
              <div className="size-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="size-10 text-emerald-600" />
              </div>
              <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight-gs text-slate-900 mb-3">Application Received</h4>
              <p className="text-base md:text-lg font-medium text-slate-600">We will reach out via WhatsApp shortly to confirm your evaluation slot.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label htmlFor="bottom_parent_name" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Parent's Full Name <span className="text-red-500">*</span></label>
                  <input id="bottom_parent_name" name="parent_name" type="text" required value={formData.parent_name} onChange={handleChange} className="px-4 py-4 text-sm md:text-base border border-slate-200 rounded-xl bg-slate-50 text-slate-900 font-bold placeholder:text-slate-600 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all hover:border-blue-300" placeholder="e.g. Rahul Sharma" />
                </div>
                
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label htmlFor="bottom_phone" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">WhatsApp Number <span className="text-red-500">*</span></label>
                  <input id="bottom_phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="px-4 py-4 text-sm md:text-base border border-slate-200 rounded-xl bg-slate-50 text-slate-900 font-bold placeholder:text-slate-600 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all hover:border-blue-300" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2 mt-2">
                <label htmlFor="bottom_child_age" className="text-[10px] md:text-[11px] font-extrabold tracking-widest-gs text-slate-600 uppercase">Child's Current Baseline</label>
                <div className="relative mt-2">
                  <select id="bottom_child_age" name="child_age" value={formData.child_age} onChange={handleChange} className="w-full px-4 py-4 text-sm md:text-base border border-slate-200 rounded-xl bg-slate-50 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all appearance-none cursor-pointer hover:border-blue-300">
                    <option value="" className="font-medium text-slate-600">Select estimated level</option>
                    <option value="beginner">Absolute Beginner (Needs structural foundation)</option>
                    <option value="intermediate">Intermediate (Plays, but blunders often)</option>
                    <option value="advanced">Advanced (Ready for rigorous tournament prep)</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-slate-600 pointer-events-none" />
                </div>
              </div>
              
              {status === "error" && <div className="p-4 text-sm bg-red-50 text-red-700 rounded-xl border border-red-200 font-bold">Transmission failed. Please try again.</div>}
              
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-extrabold text-amber-900 uppercase tracking-widest-gs mb-1">Strict Cohort Capacity</p>
                  <p className="text-xs text-amber-800 font-medium">To maintain our elite academic standards, we cap cohorts at 6 students. We are currently accepting only <span className="font-extrabold underline decoration-amber-300 underline-offset-2">12 new evaluations</span> this week.</p>
                </div>
              </div>

              <Button type="submit" disabled={status === "sending"} className="w-full h-16 mt-2 text-lg font-extrabold tracking-tight gs-btn gs-btn-primary rounded-xl shadow-xl hover:shadow-2xl hover-lift active:scale-[0.98]">
                {status === "sending" ? (<><Loader2 className="size-5 animate-spin mr-2" /> Processing...</>) : (<>Lock In Your Baseline Evaluation <ArrowRight className="ml-2 size-5" /></>)}
              </Button>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 text-slate-500">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest-gs text-slate-600">
                  <Shield className="size-4 text-emerald-500" /> 30-Day Cognitive Growth Guarantee
                </span>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest-gs">
                  <CheckCircle className="size-4 text-emerald-500" /> No Payment Required Today
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function WhatsAppWidget() {
  return (
    <a 
      href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20a%20baseline%20evaluation." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center size-14 md:size-16 bg-emerald-500 text-slate-900 rounded-full shadow-2xl hover:scale-110 hover:bg-emerald-600 transition-all cursor-pointer border-2 border-emerald-400"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7 md:size-8">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setShow(true);
        setHasTriggered(true);
      }
    };
    
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const speed = (lastScrollY - currentScrollY) / (currentTime - lastTime);
      
      if (speed > 2 && !hasTriggered && currentScrollY > 500) {
        setShow(true);
        setHasTriggered(true);
      }
      
      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
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
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 pt-20 md:pt-32 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(15,23,42,0.8),_transparent)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          
          {/* Brand & Mission (Col span 4) */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="mb-6 md:mb-8 bg-white/5 inline-block p-3 rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <img loading="lazy" src="/logo-side-white.svg" alt="ChessWize" className="h-8 md:h-10 object-contain drop-shadow-md" />
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
                <a href="tel:+918400979997" className="hover:text-blue-400 transition-colors mt-1.5 drop-shadow-sm">+91-8400979997</a>
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
                <span className="leading-relaxed mt-1 drop-shadow-sm">Araaji No 988, H.no 05 Rajiv Vihar Naubasta, Kanpur 208021</span>
              </li>
            </ul>
          </div>

          {/* Legal & Social (Col span 2) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest-gs mb-6 drop-shadow-sm">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400 mb-10">
              <li><a href="https://chesswize.com/terms-of-service" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Terms of Service</a></li>
              <li><a href="https://chesswize.com/privacy-policy" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all">Privacy Policy</a></li>
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
            © 2025 by Chesswize. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a href="https://engazedigital.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-extrabold tracking-widest-gs text-slate-500 hover:text-slate-300 transition-colors drop-shadow-sm">
              Engaze
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
      const nearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800;
      setIsVisible(scrolledPastHero && !nearBottom);
    };
    window.addEventListener("scroll", handleScroll);
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
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-white/50 pointer-events-none" />
          <div className="flex flex-col relative z-10">
            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest-gs drop-shadow-sm">Baseline Assessment</span>
            <span className="text-xs font-bold text-slate-900 drop-shadow-sm">Secure Your Slot</span>
          </div>
          <Button onClick={scrollToForm} size="default" className="gs-btn gs-btn-primary relative z-10 rounded-xl font-bold tracking-tight-gs px-6 h-12 text-sm shadow-[0_8px_16px_rgba(37,99,235,0.2)]">
            Book Now
          </Button>
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
            Input their current baseline and weekly commitment. See the mathematical difference between casual play and the ChessWize Protocol over 12 months.
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
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest-gs drop-shadow-sm">ChessWize Protocol</span>
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
               <Button onClick={scrollToForm} variant="outline" className="bg-white border-slate-200 text-slate-900 hover:bg-slate-100 font-bold text-xs h-9">
                 Start Protocol <ArrowRight className="ml-1.5 size-3" />
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
        { w: "Week 12", topic: "Live Cohort Simulation", desc: "Full tournament conditions. Post-mortem analysis and final baseline evaluation." }
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
            We don't "wing it." Every class is mapped to a strict pedagogical timeline designed to compound knowledge mathematically.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {syllabus.map((s, i) => (
              <button 
                key={i}
                onClick={() => setActiveTab(i)}
                className={`text-left px-5 py-4 rounded-xl border transition-all font-bold tracking-tight-gs text-sm md:text-base hover-lift ${activeTab === i ? 'bg-blue-600 border-blue-500 text-slate-50 shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-200'}`}
              >
                {s.title}
              </button>
            ))}
            
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] relative hidden lg:block">
              <img loading="lazy" src="/2026-04-15-10-40-00-12-week-syllabus-planner.webp" alt="A high-end academic planner showing a 12-week cognitive chess curriculum" className="w-full h-full object-cover" />
            </div>

            <div className="mt-6 p-5 bg-amber-50 border border-amber-100 rounded-xl hidden lg:block">
              <h4 className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest-gs mb-2">Graduation Criteria</h4>
              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                Students must pass a comprehensive tactical and positional exam at Week 12 to advance to the next tier. We do not promote on attendance alone.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/3 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 gs-shadow-xl min-h-[400px]">
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
   APP
   ════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-200 selection:text-blue-900 font-sans bg-white overflow-x-hidden">
      <Toaster theme="light" position="top-center" richColors />
      <TopNav />
      <Hero />
      <ProgramStats />
      <TheProblem />
      <Transformation />
      <DailyRegimen />
      <ParentAssessmentQuiz />
      <Platform />
      <InteractivePuzzle />
      <EloProjectionCalculator />
      <WhoIsThisFor />
      <LearningModes />
      <Curriculum />
      <SyllabusExplorer />
      <VideoShowcase />
      <Mentors />
      <FounderStory />
      <CertificateSection />
      <StarPerformers />
      <WallOfLove />
      <ValueStack />
      <HowItWorks />
      <FAQ />
      <BottomForm />
      <Footer />
      <WhatsAppWidget />
      <ExitIntentPopup />
      <MobileStickyCTA />
    </div>
  );
}
