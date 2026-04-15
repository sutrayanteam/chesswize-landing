import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Brain,
  Target,
  Shield,
  Award,
  Users,
  Star,
  CheckCircle,
  Play,
  Trophy,
  Clock,
  BookOpen,
  ChevronRight,
  Quote,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Utility ─── */
function scrollToForm() {
  document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" });
}
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─── Simple fade-in variant (M3: opacity only, no blur/translate) ─── */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.05, 0.7, 0.1, 1.0] } },
};

/* ═══════════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR — Static, clickable (replaces marquee)
   ═══════════════════════════════════════════════════════════════ */
function AnnouncementBar() {
  return (
    <div
      onClick={scrollToForm}
      className="w-full py-3 px-4 text-center cursor-pointer transition-colors"
      style={{ background: "var(--color-primary)" }}
    >
      <p className="text-sm md:text-base font-medium text-white">
        🎯 Book a free trial class for your child{" "}
        <span className="underline underline-offset-2">→</span>
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHATSAPP BUTTON — Floating, simple fade-in
   ═══════════════════════════════════════════════════════════════ */
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20book%20a%20free%20chess%20trial%20class%20for%20my%20child"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
      className="fixed bottom-28 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full transition-shadow hover:shadow-[var(--elevation-4)]"
      style={{ boxShadow: "var(--elevation-3)" }}
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="font-medium text-sm hidden sm:inline">Chat with us</span>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0, 0, 0, 1] }}
      className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20"
    >
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="/IMG_2257.jpg"
          alt="ChessWize Logo"
          className="h-20 md:h-24 w-auto object-contain"
        />
      </div>

      {/* Headline */}
      <h1
        className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight"
        style={{ color: "var(--color-on-surface)" }}
      >
        Give Your Child a{" "}
        <span style={{ color: "var(--color-secondary)" }}>Competitive Edge</span> —
        Starting With Chess
      </h1>

      {/* Sub-headline */}
      <p
        className="text-base md:text-lg text-center mb-6 max-w-2xl mx-auto"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        Structured, coach-led training with FIDE-rated instructors. Over 1,000
        students have improved their chess ratings in the first 3 months.
      </p>

      {/* Social proof strip */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-10">
        <div className="flex text-amber-400 text-sm">⭐⭐⭐⭐⭐</div>
        <p className="text-sm italic" style={{ color: "var(--color-on-surface-variant)" }}>
          "My son went from not knowing the rules to winning his school championship" —{" "}
          <span className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
            Priya S.
          </span>
        </p>
      </div>

      {/* Hero content: image + CTA */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="/two-cute-children-playing-chess-at-home-2026-03-19-03-11-17-utc.jpg"
            alt="Children playing chess"
            className="w-full h-auto object-cover"
            style={{ borderRadius: "var(--shape-lg)", boxShadow: "var(--elevation-2)" }}
          />
        </div>

        {/* CTA side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-6">
          {/* Credential pills */}
          <div className="flex flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
              style={{
                background: "var(--color-surface-dim)",
                borderRadius: "var(--shape-sm)",
                color: "var(--color-on-surface)",
              }}
            >
              <Award className="w-4 h-4" style={{ color: "var(--color-secondary)" }} /> 10+
              Years Experience
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
              style={{
                background: "var(--color-surface-dim)",
                borderRadius: "var(--shape-sm)",
                color: "var(--color-on-surface)",
              }}
            >
              <BookOpen className="w-4 h-4" style={{ color: "var(--color-primary)" }} />{" "}
              Structured Learning Path
            </span>
          </div>

          {/* Value prop */}
          <p
            className="text-base md:text-lg"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Structured, level-based chess training designed to build{" "}
            <strong style={{ color: "var(--color-on-surface)" }}>strategic thinking</strong>,{" "}
            <strong style={{ color: "var(--color-on-surface)" }}>discipline</strong>, and{" "}
            <strong style={{ color: "var(--color-on-surface)" }}>competitive confidence</strong>.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={scrollToForm}
              className="px-6 py-3 text-base font-semibold text-white transition-colors flex items-center justify-center gap-2"
              style={{
                background: "var(--color-primary)",
                borderRadius: "var(--shape-sm)",
              }}
            >
              Book a Free Trial Class <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection("programs")}
              className="px-6 py-3 text-base font-semibold transition-colors flex items-center justify-center border"
              style={{
                color: "var(--color-on-surface)",
                borderColor: "var(--color-outline)",
                borderRadius: "var(--shape-sm)",
                background: "var(--color-surface)",
              }}
            >
              Explore Curriculum
            </button>
          </div>

          {/* Inline mini-form */}
          <div
            className="w-full p-4 mt-2"
            style={{
              background: "var(--color-surface-dim)",
              borderRadius: "var(--shape-md)",
              border: "1px solid var(--color-outline-variant)",
            }}
          >
            <p className="text-xs font-medium uppercase tracking-wider mb-3 text-center" style={{ color: "var(--color-on-surface-variant)" }}>
              Book a free trial — takes 10 seconds
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); scrollToForm(); }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input type="text" placeholder="Your name" className="flex-1 px-3 py-2.5 text-sm border bg-white" style={{ borderColor: "var(--color-outline-variant)", borderRadius: "var(--shape-sm)" }} />
              <input type="tel" placeholder="WhatsApp number" className="flex-1 px-3 py-2.5 text-sm border bg-white" style={{ borderColor: "var(--color-outline-variant)", borderRadius: "var(--shape-sm)" }} />
              <select defaultValue="" className="sm:w-28 px-3 py-2.5 text-sm border bg-white" style={{ borderColor: "var(--color-outline-variant)", borderRadius: "var(--shape-sm)", color: "var(--color-on-surface-variant)" }}>
                <option value="" disabled>Age</option>
                {Array.from({ length: 15 }, (_, i) => i + 4).map(age => (
                  <option key={age} value={age}>{age} yrs</option>
                ))}
              </select>
              <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
                Book Free Trial →
              </button>
            </form>
            <p className="text-xs text-center mt-2" style={{ color: "var(--color-on-surface-variant)" }}>
              ✓ Free 50-min class · ✓ No payment required · ✓ Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IMPACT NUMBERS
   ═══════════════════════════════════════════════════════════════ */
function ImpactNumbers() {
  const stats = [
    { num: "10+", label: "Years Experience", icon: Award },
    { num: "1000+", label: "Students Taught", icon: Users },
    { num: "50+", label: "Tournament Winners", icon: Trophy },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-primary)" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="text-2xl md:text-3xl font-bold text-white text-center mb-10"
        >
          Our Impact in <span style={{ color: "var(--color-secondary)" }}>Numbers</span>
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm text-white flex-1"
                style={{ borderRadius: "var(--shape-md)" }}
              >
                <Icon className="w-10 h-10 shrink-0" style={{ color: "var(--color-secondary)" }} />
                <div>
                  <p className="text-3xl font-bold">{s.num}</p>
                  <p className="text-sm font-medium text-white/70 uppercase tracking-wide">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUCCESS STORIES (Video Testimonials)
   ═══════════════════════════════════════════════════════════════ */
function SuccessStories() {
  const testimonials = [
    { src: "/20250924_224436.mp4", name: "Priya S.", title: "Parent of 8yo" },
    { src: "/VID-20250914-WA0001.mp4", name: "Rahul M.", title: "Parent of 10yo" },
    { src: "/VID-20250914-WA0002.mp4", name: "Anita K.", title: "Parent of 12yo" },
    { src: "/VID-20250916-WA0013.mp4", name: "Vikram D.", title: "Parent of 9yo" },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-on-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="text-2xl md:text-3xl font-bold text-white text-center mb-3"
        >
          Success Stories — <span style={{ color: "var(--color-secondary)" }}>What Parents Say</span>
        </motion.h2>
        <p className="text-base text-white/50 text-center mb-10 max-w-xl mx-auto">
          Hear directly from families whose children have transformed their strategic thinking.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 p-3 flex flex-col gap-3"
              style={{ borderRadius: "var(--shape-md)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-black" style={{ borderRadius: "var(--shape-sm)" }}>
                <video src={t.src} controls playsInline preload="none" poster="/IMG_2257.jpg" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="px-1 pb-1">
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHY CHOOSE US
   ═══════════════════════════════════════════════════════════════ */
function WhyChooseUs() {
  const features = [
    { image: "/star-badge.png", title: "Certified Coaches", desc: "All our trainers are FIDE rated and certified chess instructors." },
    { image: "/calendar-appointment.png", title: "Flexible Scheduling", desc: "Easily book classes at times that work best for your child's routine." },
    { image: "/gold-thropy.png", title: "Proven Track Record", desc: "Hundreds of our students have won state and national titles." },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--color-on-surface)" }}>
          Why Choose <span style={{ color: "var(--color-secondary)" }}>ChessWize?</span>
        </motion.h2>
        <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          Interactive exercises, proven curriculum, and coaches who genuinely care.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 text-center transition-shadow hover:shadow-[var(--elevation-3)]"
              style={{ borderRadius: "var(--shape-md)", boxShadow: "var(--elevation-1)", border: "1px solid var(--color-outline-variant)" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center p-3" style={{ background: "var(--color-surface-dim)", borderRadius: "var(--shape-sm)" }}>
                <img src={f.image} alt={f.title} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-on-surface)" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AI PLATFORM SHOWCASE
   ═══════════════════════════════════════════════════════════════ */
function AIPlatformShowcase() {
  const items = [
    { icon: Brain, title: "AI Puzzle Engine", desc: "2,000+ puzzles adapted to skill level", color: "var(--color-secondary)" },
    { icon: Target, title: "Game Analysis", desc: "AI reviews every game your child plays", color: "var(--color-primary)" },
    { icon: Trophy, title: "Progress Dashboard", desc: "Weekly reports sent to parents", color: "var(--color-success)" },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col lg:flex-row items-center gap-12">
          {/* Copy */}
          <div className="w-full lg:w-1/2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold mb-5" style={{ background: "var(--color-primary-container)", color: "var(--color-on-primary-container)", borderRadius: "var(--shape-sm)" }}>
              <Brain className="w-3.5 h-3.5" /> NEW — AI-Powered Platform
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--color-on-surface)" }}>
              Learn on Our Own <span style={{ color: "var(--color-secondary)" }}>AI-Based Chess Platform</span>
            </h2>
            <p className="text-base mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
              Unlike other coaching services that use generic tools, we built our own interactive learning platform. Your child gets AI-powered puzzle recommendations, real-time game analysis, and personalized practice.
            </p>
            <ul className="space-y-3 mb-6">
              {["AI-powered puzzles adapted to your child's skill level", "Real-time game analysis and move suggestions", "Progress tracking dashboard for parents", "Interactive lessons with visual explanations"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-secondary)" }} /> {item}
                </li>
              ))}
            </ul>
            <button onClick={scrollToForm} className="px-6 py-3 text-sm font-semibold text-white flex items-center gap-2 transition-colors" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
              Try It Free <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Visual */}
          <div className="w-full lg:w-1/2">
            <div className="p-6 md:p-8 space-y-4" style={{ background: "var(--color-on-surface)", borderRadius: "var(--shape-lg)", boxShadow: "var(--elevation-3)" }}>
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4 p-4" style={{ background: "rgba(255,255,255,0.06)", borderRadius: "var(--shape-sm)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: item.color, borderRadius: "var(--shape-xs)" }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-white/50 text-xs">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIDEO DEMO (ambient, brief)
   ═══════════════════════════════════════════════════════════════ */
function VideoDemo() {
  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden aspect-[21/9] md:aspect-[24/9] bg-black" style={{ borderRadius: "var(--shape-lg)", boxShadow: "var(--elevation-3)" }}>
          <video src="/playing-chess-in-the-university-2025-12-17-10-35-30-utc.mov" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEARNING PATH
   ═══════════════════════════════════════════════════════════════ */
function LearningPath() {
  const levels = [
    { name: "Beginner Program", desc: "Chess fundamentals, basic tactics, focus and discipline.", image: "/young-boy-developing-chess-strategy-playing-chess-2026-03-19-07-06-56-utc.jpg" },
    { name: "Intermediate Program", desc: "Tactical combinations, strategic planning, game analysis.", image: "/brain-gym-2026-03-13-01-47-11-utc.jpg" },
    { name: "Advanced Program", desc: "Tournament preparation, advanced positional play, competitive improvement.", image: "/young-man-deep-in-thought-while-playing-game-of-ch-2026-01-09-00-57-38-utc.jpg" },
  ];

  return (
    <section id="programs" className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--color-on-surface)" }}>
          Our Structured <span style={{ color: "var(--color-secondary)" }}>Learning Path</span>
        </motion.h2>
        <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          From the first move to advanced tournament strategies, a clear roadmap for success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((l, i) => (
            <div key={i} className="bg-white overflow-hidden transition-shadow hover:shadow-[var(--elevation-3)]" style={{ borderRadius: "var(--shape-md)", boxShadow: "var(--elevation-1)", border: "1px solid var(--color-outline-variant)" }}>
              <div className="h-48 md:h-56 overflow-hidden">
                <img src={l.image} alt={l.name} loading="lazy" className="w-full h-full object-cover object-[center_15%]" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-on-surface)" }}>{l.name}</h3>
                <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRAM DETAILS
   ═══════════════════════════════════════════════════════════════ */
function ProgramDetails() {
  const programs = [
    { title: "Beginner Program", subtitle: "For absolute beginners", points: ["Piece movements & values", "Basic checkmates", "Opening principles", "Simple tactics (pins, forks)"] },
    { title: "Intermediate Program", subtitle: "For players who know the basics", points: ["Advanced tactics", "Positional understanding", "Middle game planning", "Basic endgames"] },
    { title: "Advanced Program", subtitle: "For tournament players", points: ["Opening repertoire building", "Complex endgames", "Calculation techniques", "Game analysis"] },
  ];

  return (
    <section id="program-details" className="py-16 md:py-20" style={{ background: "var(--color-on-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
          Deep Dive Into <span style={{ color: "var(--color-secondary)" }}>Our Programs</span>
        </motion.h2>
        <p className="text-base text-white/50 text-center mb-10 max-w-xl mx-auto">
          A breakdown of what your child will learn at each level.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <div key={i} className="p-6 bg-white/5 backdrop-blur-sm" style={{ borderRadius: "var(--shape-md)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
              <p className="text-sm font-medium mb-6 pb-4" style={{ color: "var(--color-secondary)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{p.subtitle}</p>
              <ul className="space-y-3">
                {p.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "var(--color-secondary)" }} />
                    <span className="text-sm text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLASS MODES
   ═══════════════════════════════════════════════════════════════ */
function ClassModes() {
  const modes = [
    { title: "Individual", desc: "1-on-1 personalized attention tailored to specific weaknesses.", image: "/father-and-son-playing-chess-game-at-home-childre-2026-03-17-07-11-24-utc.jpg" },
    { title: "Two on One", desc: "Learn with a peer to foster healthy competition and discussion.", image: "/intellectual-board-games-2026-03-16-00-42-30-utc.jpg" },
    { title: "Group", desc: "Interactive group sessions focusing on broad concepts and practice.", image: "/child-s-hand-moves-the-horse-during-a-chess-tourna-2026-03-26-03-58-25-utc.jpg" },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--color-on-surface)" }}>
          Flexible <span style={{ color: "var(--color-secondary)" }}>Class Models</span>
        </motion.h2>
        <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          Choose a learning environment that fits your child's needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode, i) => (
            <div key={i} className="relative h-[400px] overflow-hidden flex flex-col justify-end" style={{ borderRadius: "var(--shape-md)", boxShadow: "var(--elevation-2)" }}>
              <img src={mode.image} alt={mode.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
                <p className="text-sm text-white/80 mb-4">{mode.desc}</p>
                <button onClick={scrollToForm} className="w-full px-5 py-3 text-sm font-semibold text-white transition-colors" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
                  Book a Free Trial
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COACHES — Static grid (no expanding accordion)
   ═══════════════════════════════════════════════════════════════ */
function Coaches() {
  const coaches = [
    { name: "Rahul Sharma", role: "FIDE Master", exp: "8+ Years", rating: "2200", bg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
    { name: "Arjun Mehta", role: "Grandmaster", exp: "10+ Years", rating: "2550", bg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" },
    { name: "Sneha Patel", role: "National Champ", exp: "6+ Years", rating: "2100", bg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
    { name: "Vikram Nair", role: "Senior Tactics Coach", exp: "12+ Years", rating: "2400", bg: "https://images.unsplash.com/photo-1517482811406-3bc556204c94?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--color-on-surface)" }}>
          Meet Your <span style={{ color: "var(--color-primary)" }}>Coaches</span>
        </motion.h2>
        <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          Train with FIDE-rated instructors who bring decades of competitive experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coaches.map((c, i) => (
            <div key={i} className="overflow-hidden bg-white transition-shadow hover:shadow-[var(--elevation-3)]" style={{ borderRadius: "var(--shape-md)", boxShadow: "var(--elevation-1)", border: "1px solid var(--color-outline-variant)" }}>
              <div className="h-52 overflow-hidden">
                <img src={c.bg} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold" style={{ color: "var(--color-on-surface)" }}>{c.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "var(--color-primary)" }}>{c.role}</p>
                <div className="flex gap-3">
                  <span className="text-xs px-2 py-1 font-medium" style={{ background: "var(--color-surface-dim)", borderRadius: "var(--shape-xs)", color: "var(--color-on-surface-variant)" }}>{c.exp}</span>
                  <span className="text-xs px-2 py-1 font-medium" style={{ background: "var(--color-secondary-container)", borderRadius: "var(--shape-xs)", color: "var(--color-on-secondary-container)" }}>FIDE {c.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING — INR, no hover translate
   ═══════════════════════════════════════════════════════════════ */
function Pricing() {
  const plans = [
    { name: "Starter", price: "₹3,999", period: "/month", perClass: "₹1,000/class", features: ["4 Classes per month", "Basic puzzles access", "Monthly progress report", "Email support"], popular: false },
    { name: "Pro", price: "₹6,999", period: "/month", perClass: "₹875/class", features: ["8 Classes per month", "Unlimited puzzles", "Weekly progress report", "1-on-1 game analysis", "Priority support"], popular: true },
    { name: "Elite", price: "₹11,999", period: "/month", perClass: "₹1,000/class", features: ["12 Classes per month", "Tournament preparation", "Daily assignments", "Direct coach WhatsApp", "24/7 support"], popular: false },
  ];

  return (
    <section id="pricing" className="py-16 md:py-20" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--color-on-surface)" }}>
          Simple, Transparent <span style={{ color: "var(--color-secondary)" }}>Pricing</span>
        </motion.h2>
        <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          Pick the plan that fits your child's pace. First class is always free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-white p-6 relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`} style={{ borderRadius: "var(--shape-md)", boxShadow: plan.popular ? "var(--elevation-3)" : "var(--elevation-1)", border: plan.popular ? "2px solid var(--color-primary)" : "1px solid var(--color-outline-variant)" }}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-center mb-1" style={{ color: "var(--color-on-surface)" }}>{plan.name}</h3>
              <div className="text-center mb-1">
                <span className="text-3xl md:text-4xl font-bold" style={{ color: "var(--color-secondary)" }}>{plan.price}</span>
                <span className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{plan.period}</span>
              </div>
              <p className="text-center text-xs font-medium mb-6" style={{ color: "var(--color-primary)" }}>{plan.perClass}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "var(--color-secondary)" }} /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={scrollToForm} className="w-full px-5 py-3 text-sm font-semibold text-white transition-colors" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
                Start This Plan — First Class Free
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ — Accordion (purposeful motion ✓)
   ═══════════════════════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "Is this program ideal for beginners?", a: "Yes! Our Beginner Program is specifically designed for absolute beginners to learn the rules, basic checkmates, and opening principles." },
    { q: "What platform do you use for online coaching?", a: "We use our own AI-based platform for a seamless and interactive learning experience." },
    { q: "How long is each session?", a: "Each session lasts 50 minutes." },
    { q: "Do you prepare students for tournaments?", a: "Absolutely. Our Advanced and Master programs focus heavily on tournament preparation, opening repertoires, and complex calculations." },
    { q: "Can I reschedule or cancel a class?", a: "Yes, you can reschedule up to 2 hours before your class starts. Contact us via WhatsApp for quick changes." },
    { q: "Is there a refund if my child doesn't like it?", a: "We offer a full refund within the first 7 days if you're not satisfied. No questions asked." },
    { q: "What age group do you cover?", a: "We teach children from 4 to 18 years old, with age-appropriate curriculum at every level." },
    { q: "Can I sit in on a class?", a: "Absolutely! Parents are welcome to observe any class. We believe transparency builds trust." },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--color-on-surface)" }}>
          Got Questions? <span style={{ color: "var(--color-secondary)" }}>We've Got Answers</span>
        </motion.h2>
        <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          Everything you need to know about our coaching platform.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 cursor-pointer transition-colors"
              style={{ background: openIndex === i ? "var(--color-surface)" : "var(--color-surface-dim)", borderRadius: "var(--shape-md)", border: `1px solid ${openIndex === i ? "var(--color-primary)" : "var(--color-outline-variant)"}` }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold pr-4" style={{ color: openIndex === i ? "var(--color-primary)" : "var(--color-on-surface)" }}>{faq.q}</p>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} style={{ color: "var(--color-on-surface-variant)" }} />
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.05, 0.7, 0.1, 1.0] }} className="overflow-hidden">
                    <p className="text-sm mt-3 pt-3" style={{ color: "var(--color-on-surface-variant)", borderTop: "1px solid var(--color-outline-variant)" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM — Simplified, 3 fields
   ═══════════════════════════════════════════════════════════════ */
function ContactForm() {
  const [formData, setFormData] = useState({ parent_name: "", child_age: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parent_name || !formData.phone) {
      alert("Please fill in at least your name and phone number.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ parent_name: "", child_age: "", phone: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = { borderColor: "var(--color-outline-variant)", borderRadius: "var(--shape-sm)", background: "var(--color-surface)" };

  return (
    <section id="book-demo" className="py-16 md:py-20" style={{ background: "var(--color-surface-dim)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--color-on-surface)" }}>
          Book Your <span style={{ color: "var(--color-secondary)" }}>Free Trial Class</span>
        </motion.h2>
        <p className="text-base text-center mb-10 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          Fill in your details and our team will schedule a free demo class within 24 hours.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="p-5" style={{ background: "var(--color-surface)", borderRadius: "var(--shape-md)", border: "1px solid var(--color-outline-variant)" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "var(--color-on-surface)" }}>Contact Information</h3>
              {[
                { icon: Phone, label: "WhatsApp", value: "+91 98765 43210" },
                { icon: Mail, label: "Email", value: "hello@chesswize.com" },
                { icon: Clock, label: "Response Time", value: "Within 24 hours" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`flex items-center gap-3 ${i > 0 ? "mt-4 pt-4" : ""}`} style={i > 0 ? { borderTop: "1px solid var(--color-outline-variant)" } : {}}>
                    <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "var(--color-secondary)", borderRadius: "var(--shape-xs)" }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase" style={{ color: "var(--color-on-surface-variant)" }}>{item.label}</p>
                      <p className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 text-center" style={{ background: "var(--color-surface)", borderRadius: "var(--shape-md)", border: "1px solid var(--color-outline-variant)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--color-on-surface-variant)" }}>🔒 Your information is safe. We never share your data.</p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-2/3">
            {status === "success" ? (
              <div className="p-10 text-center" style={{ background: "#f0fdf4", borderRadius: "var(--shape-md)", border: "1px solid #bbf7d0" }}>
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--color-success)" }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-success)" }}>Thank You! 🎉</h3>
                <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>We'll reach out within 24 hours to schedule your child's free trial class.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8" style={{ background: "var(--color-surface)", borderRadius: "var(--shape-md)", border: "1px solid var(--color-outline-variant)", boxShadow: "var(--elevation-1)" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="parent_name" className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>Your Name *</label>
                    <input id="parent_name" name="parent_name" type="text" required value={formData.parent_name} onChange={handleChange} className="w-full px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]" placeholder="Your full name" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>Phone / WhatsApp *</label>
                    <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]" placeholder="+91 98765 43210" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="child_age" className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>Child's Age</label>
                    <select id="child_age" name="child_age" value={formData.child_age} onChange={handleChange} className="w-full px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]" style={inputStyle}>
                      <option value="">Select age</option>
                      {Array.from({ length: 15 }, (_, i) => i + 4).map((age) => (
                        <option key={age} value={age}>{age} years</option>
                      ))}
                    </select>
                  </div>
                </div>
                {status === "error" && (
                  <div className="mb-4 p-3 text-sm" style={{ background: "#fef2f2", color: "var(--color-error)", borderRadius: "var(--shape-sm)", border: "1px solid #fecaca" }}>
                    Something went wrong. Please try again or contact us via WhatsApp.
                  </div>
                )}
                <button type="submit" disabled={status === "sending"} className="w-full px-5 py-3 text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
                  {status === "sending" ? (<><Loader2 className="w-4 h-4 animate-spin" /> Scheduling...</>) : (<>Book My Free Trial Class <Send className="w-4 h-4" /></>)}
                </button>
                <p className="text-xs text-center mt-3" style={{ color: "var(--color-on-surface-variant)" }}>No payment required · Free 50-minute trial · Cancel anytime</p>
                <div className="flex items-center justify-center gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
                  <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>Or reach us directly:</span>
                  <a href="https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20book%20a%20free%20chess%20trial%20class%20for%20my%20child" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════════════ */
function ReadyToImprove() {
  return (
    <section className="py-16 md:py-20 px-4" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-3xl mx-auto text-center p-8 md:p-14" style={{ background: "var(--color-on-surface)", borderRadius: "var(--shape-lg)", boxShadow: "var(--elevation-4)" }}>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Help Your Child <span style={{ color: "var(--color-secondary)" }}>Improve?</span>
        </h2>
        <p className="text-base text-white/60 mb-8 max-w-lg mx-auto">
          Join ChessWize today and give your child the strategic advantage they need to succeed in chess and life.
        </p>
        <button onClick={scrollToForm} className="px-8 py-3 text-base font-semibold text-white flex items-center gap-2 mx-auto transition-colors" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
          Book Your Free Trial Class <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STICKY BOTTOM BAR
   ═══════════════════════════════════════════════════════════════ */
function StickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm px-4 md:px-8 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--color-outline-variant)", boxShadow: "0 -2px 10px rgba(0,0,0,0.06)" }}>
      <div className="hidden md:block">
        <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>Start Your Chess Journey Today</p>
        <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>⏰ Only a few demo slots left this week</p>
      </div>
      <button onClick={scrollToForm} className="text-sm font-semibold text-white px-6 py-2.5 w-full md:w-auto flex items-center justify-center gap-1.5 transition-colors" style={{ background: "var(--color-primary)", borderRadius: "var(--shape-sm)" }}>
        Book Free Trial Class <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL TO TOP
   ═══════════════════════════════════════════════════════════════ */
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-6 z-50 p-3 text-white transition-colors"
      style={{ background: "var(--color-on-surface)", borderRadius: "var(--shape-sm)", boxShadow: "var(--elevation-2)" }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP — Root component
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col pb-16 selection:bg-[var(--color-primary)] selection:text-white" style={{ background: "var(--color-surface)" }}>
      <ScrollToTop />
      <WhatsAppButton />
      <AnnouncementBar />
      <Hero />
      <ImpactNumbers />
      <SuccessStories />
      <WhyChooseUs />
      <AIPlatformShowcase />
      <VideoDemo />
      <LearningPath />
      <ProgramDetails />
      <ClassModes />
      <Coaches />
      <Pricing />
      <FAQ />
      <ContactForm />
      <ReadyToImprove />
      <StickyBottomBar />
    </div>
  );
}
