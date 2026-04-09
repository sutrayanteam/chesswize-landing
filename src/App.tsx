import React, { useState, useRef, useEffect } from "react";
import Lenis from 'lenis';
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
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "motion/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className={`inline-block mr-[0.25em] ${word.toLowerCase() === "online" || word.toLowerCase() === "chess" ? "text-[#FF3B30]" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

function TopMarquee() {
  return (
    <div className="w-full py-3 overflow-hidden bg-[#FF3B30] relative z-50">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="font-bold text-xl mx-3 text-[#FFCC00]">♔</span>
            <span className="font-semibold text-lg text-white tracking-wide">
              Professional <span className="text-[#FF3B30]">Online Chess</span>{" "}
              Coaching
            </span>
            <span className="font-bold text-xl mx-3 text-[#FFCC00]">♕</span>
            <span className="font-semibold text-lg text-[#FFCC00] tracking-wide">
              Book Your Free Demo
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, -150]);
  const yText = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="mx-auto mt-2 font-sans overflow-hidden relative">
      {/* Background Image / Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=2000&q=80"
          alt="Chess Grandmaster Atmosphere"
          className="w-full h-full object-cover opacity-15 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-parchment)]/90 via-[var(--color-parchment)]/60 to-[var(--color-parchment)]"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 py-20 lg:py-32 flex flex-col items-center">
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center w-full max-w-5xl text-center"
        >
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-8">
            <span className="px-4 py-1.5 rounded-full border border-onyx-900/10 text-sm font-semibold tracking-widest uppercase text-onyx-800 bg-white/50 backdrop-blur-md">
              Elite Online Chess Coaching
            </span>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-[40px] md:text-[64px] lg:text-[76px] leading-[1.05] font-serif font-medium tracking-tight text-[#1C1C1E] mb-8"
          >
            Premium <i className="text-[#D70015] italic">Online Chess</i> <br className="hidden md:block"/>
            Masterclasses for Kids.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-[18px] md:text-[22px] leading-[32px] font-normal text-gray-700 mb-12 max-w-3xl"
          >
            Give your child the ultimate cognitive edge. We teach expert-level chess strategies that build unbreakable focus, logical thinking, and lifelong confidence. 
          </motion.p>
          
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <Magnetic><button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative overflow-hidden text-[16px] md:text-[18px] font-semibold text-white px-10 py-5 rounded-full w-full md:w-auto bg-[#1C1C1E] transition-all flex items-center justify-center gap-3 group hover:bg-[#D70015]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine"></span>
              Book Free Trial Class
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button></Magnetic>
            <Magnetic><button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative overflow-hidden text-[16px] md:text-[18px] font-semibold text-[#1C1C1E] px-10 py-5 rounded-full w-full md:w-auto bg-transparent border border-onyx-900/20 transition-all flex items-center justify-center gap-3 group hover:border-onyx-900"
            >
              View Our Programs
            </button></Magnetic>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Trust Bar below Hero */}
      <div className="w-full relative z-20 border-t border-b border-onyx-900/5 bg-white/30 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
           <p className="text-sm font-bold uppercase tracking-widest text-[#1C1C1E]">Curriculum Aligned With:</p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center font-serif text-xl md:text-2xl font-bold">
              <span>FIDE Training</span>
              <span>US Chess Federation</span>
              <span>Chess.com</span>
              <span>Lichess Integration</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function ImpactNumbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { num: "10+", label: "Years Experience" },
    { num: "1500+", label: "Avg. ELO Gain" },
    { num: "50+", label: "Tournament Wins" },
  ];

  return (
    <section ref={ref} className="py-20 font-sans border-b border-onyx-900/5 relative overflow-hidden bg-[#1C1C1E]">
      <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={fadeInUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="flex flex-col items-center justify-center py-8 text-center group cursor-default">
            <p className="text-6xl md:text-7xl font-serif font-medium text-white mb-4 group-hover:text-[#D70015] transition-colors duration-500">
              {stat.num}
            </p>
            <p className="text-sm font-bold text-white/50 uppercase tracking-[0.2em]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LearningPath() {
  const levels = [
    {
      level: "Level 1",
      name: "Beginner",
      focus: "Rules & Basics",
      type: "Foundation",
    },
    {
      level: "Level 2",
      name: "Intermediate",
      focus: "Tactics & Strategy",
      type: "Development",
    },
    {
      level: "Level 3",
      name: "Advanced",
      focus: "Positional Play",
      type: "Competitive",
    },
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-gray-50 bg-dot-pattern relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-64 h-64 bg-[#FFCC00] rounded-full mix-blend-multiply filter blur-[120px] opacity-10"></motion.div>
      <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 right-10 w-64 h-64 bg-[#FF3B30] rounded-full mix-blend-multiply filter blur-[120px] opacity-10"></motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C] text-center mb-16"
        >
          Our Structured <span className="text-[#FF3B30]">Learning Path</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-6"
        >
          {levels.map((l, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-white bg-dot-pattern border border-black/5 dark:border-white/5 border-b-2 rounded-[1.5rem] p-6 text-center w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:flex-1 min-w-[160px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all hover:border-b-[#FFCC00] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="font-bold text-sm md:text-lg text-[#FF3B30] mb-2 uppercase tracking-wider group-hover:scale-110 transition-all duration-300">
                  {l.level}
                </div>
                <div className="font-black text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C] mb-3">
                  {l.name}
                </div>
                <div className="text-[#FF3B30] font-semibold text-sm md:text-base mb-6 h-10 flex items-center justify-center">
                  {l.focus}
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-[#1C1C1E] font-bold text-xs md:text-sm rounded-full py-2 px-4 bg-[#FFCC00] inline-block shadow-sm border border-black/5 dark:border-white/5"
                >
                  {l.type}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function WhatChildGains() {
  const items = [
    {
      title: "Academic Excellence",
      desc: "Develops problem-solving skills and spatial reasoning that directly translate to mathematics and sciences.",
      icon: <Brain className="w-8 h-8"/>,
    },
    {
      title: "Laser Focus",
      desc: "Trains the mind to concentrate deeply for extended periods, completely eliminating modern screen-induced ADHD tendencies.",
      icon: <Target className="w-8 h-8"/>,
    },
    {
      title: "Resilience & Grit",
      desc: "Teaches emotional control and resilience through wins and losses, cultivating a stoic competitive mindset.",
      icon: <Shield className="w-8 h-8"/>,
    },
    {
      title: "Strategic Vision",
      desc: "Learning to make critical decisions under pressure, anticipating outcomes 5 moves ahead.",
      icon: <Target className="w-8 h-8"/>,
    },
  ];

  return (
    <div className="w-full py-24 bg-[var(--color-parchment)] relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
           initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
           className="mb-20 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-[36px] md:text-[52px] leading-tight font-serif font-medium text-[#111111] mb-6">
              Beyond the Board: <br/>
              <span className="italic text-[#D70015]">The Cognitive Edge.</span>
            </h2>
            <p className="text-lg text-gray-600 font-sans">
              We don't just teach children how to move pieces. We reconstruct their neural pathways for elite problem-solving, emotional control, and strategic foresight.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {items.map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group cursor-default flex gap-8">
              <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full border border-onyx-900/10 text-[#D70015] group-hover:bg-[#1C1C1E] group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-serif font-medium text-onyx-900 mb-3 group-hover:text-[#D70015] transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoachingProcess() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const pathHeight = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const steps = [
    {
      id: 1,
      title: "Submit Enquiry",
      desc: "Fill out a simple form to let us know your child's current chess level and goals.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Attend Structured Demo",
      desc: "A free interactive session to assess skills and introduce our unique teaching methodology.",
      image:
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Enrollment & Batch Allocation",
      desc: "Get placed in the perfect batch based on skill level, age group, and your preferred schedule.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 bg-dot-pattern font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight mb-20 text-center bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          How Our <span className="text-[#FF3B30]">Coaching Process</span> Works
        </motion.h2>

        <div ref={ref} className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1.5 bg-gray-200 rounded-full transform md:-translate-x-1/2"></div>
          <motion.div
            style={{ scaleY: pathHeight, originY: 0 }}
            className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1.5 bg-[#FF3B30] rounded-full transform md:-translate-x-1/2 z-10"
          ></motion.div>

          <div className="space-y-24 relative z-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content Box */}
                <div className="w-full md:w-1/2 flex justify-center pl-24 md:pl-0">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="w-full max-w-md cursor-default"
                  >
                    <p className="text-sm font-black text-[#FF3B30] uppercase tracking-[0.2em] mb-3">Step 0{step.id}</p>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1E] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[18px] md:text-[22px] leading-[28px] md:leading-[32px] font-medium text-gray-600">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Center Number */}
                <div className="absolute left-10 md:left-1/2 transform -translate-x-1/2 w-16 h-16 shrink-0 rounded-full bg-[#1C1C1E] flex items-center justify-center text-2xl font-black text-[#FFCC00] shadow-[0_0_0_8px_rgba(249,250,251,1)] border-2 border-black/5 z-30">
                  {step.id}
                </div>

                {/* Image Box */}
                <div className="w-full md:w-1/2 flex justify-center pl-24 md:pl-0">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? -2 : 2 }}
                    className="relative w-full max-w-md aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-2 border-black/5"
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramDetails() {
  const programs = [
    {
      title: "Beginner Program",
      subtitle: "For absolute beginners",
      points: [
        "Piece movements & values",
        "Basic checkmates",
        "Opening principles",
        "Simple tactics (pins, forks)",
      ],
    },
    {
      title: "Intermediate Program",
      subtitle: "For players who know the basics",
      points: [
        "Advanced tactics",
        "Positional understanding",
        "Middle game planning",
        "Basic endgames",
      ],
    },
    {
      title: "Advanced Program",
      subtitle: "For tournament players",
      points: [
        "Opening repertoire building",
        "Complex endgames",
        "Calculation techniques",
        "Game analysis",
      ],
    },
  ];

  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -10, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    rest: { x: 0, opacity: 0.8 },
    hover: { x: 10, opacity: 1, color: "#FFFFFF" },
  };

  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-black font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1920&q=80"
          alt="Chess Strategy Background"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 text-white"
        >
          Deep Dive Into <span className="text-[#FFCC00]">Our Programs</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {programs.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              className="bg-[#1C1C1E]/80 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 border-b-2 border-b-[#FF3B30] shadow-[0_20px_40px_rgba(0,0,0,0.12)] relative overflow-hidden cursor-pointer group hover:border-gray-500 hover:border-b-[#FFCC00] transition-colors"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-2 bg-[#FF3B30] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              ></motion.div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] rounded-full filter blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

              <h3 className="text-2xl font-black text-white mb-2">{p.title}</h3>
              <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-[#FFCC00] mb-8 pb-4 border-b border-white/5">
                {p.subtitle}
              </p>
              <ul className="space-y-4">
                {p.points.map((point, j) => (
                  <motion.li
                    key={j}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-[#FF3B30] shrink-0" />
                    <span className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-[#EBEBF5]/80">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ClassModes() {
  const modes = [
    {
      title: "Individual",
      desc: "1-on-1 personalized attention tailored to specific weaknesses.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "Two on One",
      desc: "Learn with a peer to foster healthy competition and discussion.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "Group",
      desc: "Interactive group sessions focusing on broad concepts and practice.",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white bg-dot-pattern font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          Flexible <span className="text-[#FF3B30]">Class Modes</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {modes.map((mode, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] cursor-pointer"
            >
              <img src={mode.image} alt={mode.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                <h3 className="text-3xl font-black text-white mb-3 group-hover:text-[#FFCC00] transition-colors">
                  {mode.title}
                </h3>
                <p className="text-[16px] md:text-[18px] text-white/90 mb-6 leading-relaxed">
                  {mode.desc}
                </p>
                <button
                  type="button"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 rounded-full text-lg font-bold text-[#1C1C1E] bg-[#FFCC00] hover:bg-white transition-colors"
                >
                  Select Expert Coach
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Coaches() {
  const coaches = [
    { name: "Coach Rahul Sharma", exp: "8+ Years", rating: "2200+" },
    { name: "Coach Arjun Mehta", exp: "10+ Years", rating: "2350+" },
    { name: "Coach Sneha Patel", exp: "6+ Years", rating: "2100+" },
    { name: "Coach Vikram Nair", exp: "12+ Years", rating: "2400+" },
  ];

  return (
    <div className="w-full py-16 md:py-24 font-sans bg-gray-50 bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          Learn from <span className="text-[#FF3B30]">Experienced Coaches</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {coaches.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -15 }}
              className="bg-white bg-dot-pattern rounded-[2rem] p-6 text-center border border-black/5 dark:border-white/5 border-b-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-b-[#FF3B30] transition-all group"
            >
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6 border-2 border-black/5 overflow-hidden relative">
                <img
                  src={`https://i.pravatar.cc/150?img=${i + 11}`}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-sm bg-[#FF3B30] px-2 py-1 rounded-full border border-black/5 dark:border-white/5">
                    FIDE {c.rating}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C] mb-2 group-hover:text-[#FF3B30] group-hover:scale-110 transition-all duration-300">
                {c.name}
              </h3>
              <p className="text-[#FF3B30] font-semibold bg-red-50 py-1 px-3 rounded-full inline-block border border-[#FF3B30]">
                {c.exp} Experience
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SuccessStories() {
  const testimonials = [
    {
      quote:
        "My son's focus has improved tremendously since joining ChessWize. The structured approach really works!",
      name: "Priya S.",
      title: "Parent of 8yo",
      rating: 5,
    },
    {
      quote:
        "The coaches are incredibly patient and skilled. My daughter won her first local tournament last month!",
      name: "Rahul M.",
      title: "Parent of 10yo",
      rating: 5,
    },
    {
      quote:
        "Excellent curriculum. It's not just about moving pieces, it's about deep strategic thinking.",
      name: "Anita K.",
      title: "Parent of 12yo",
      rating: 5,
    },
    {
      quote:
        "We tried other academies, but ChessWize's level-based system is by far the most effective.",
      name: "Vikram D.",
      title: "Parent of 9yo",
      rating: 5,
    },
  ];

  // Duplicate the array to create a seamless infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="w-full py-16 md:py-24 relative overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=1920&q=80"
          alt="Chess Background"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      {/* Decorative quotes */}
      <Quote className="absolute top-10 left-10 w-40 h-40 text-gray-800 opacity-30 -z-0" />
      <Quote className="absolute bottom-10 right-10 w-40 h-40 text-gray-800 opacity-30 -z-0 rotate-180" />

      <div className="relative z-10 w-full text-white">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 px-4"
        >
          Success Stories -{" "}
          <span className="text-[#FFCC00]">What Parents Say</span>
        </motion.h2>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="w-full overflow-hidden flex"
        >
          <div className="flex gap-6 px-3 w-max marquee-left hover:[animation-play-state:paused]">
            {duplicatedTestimonials.map((t, i) => (
              <div
                key={i}
                className="relative w-[300px] md:w-[400px] rounded-[2rem] p-8 bg-[#1C1C1E]/80 backdrop-blur-sm border border-white/5 border-b-2 border-b-[#FFCC00] shrink-0 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-gray-500 hover:border-b-[#FF3B30] transition-colors group cursor-pointer"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-5 h-5 fill-[#FFCC00] text-[#FFCC00]"
                      />
                    ))}
                  </div>
                  <h3 className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-[#EBEBF5]/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    "{t.quote}"
                  </h3>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#FF3B30] flex items-center justify-center text-2xl font-bold text-white border border-[#FFCC00] shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{t.name}</p>
                    <p className="text-sm text-[#FFCC00] font-medium">
                      {t.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this program ideal for beginners?",
      answer:
        "Yes! Our Beginner Program is specifically designed for absolute beginners to learn the rules, basic checkmates, and opening principles.",
    },
    {
      question: "What platform do you use for online coaching?",
      answer:
        "We use interactive platforms like Zoom or Google Meet combined with online chess boards like Lichess or Chess.com for a seamless learning experience.",
    },
    {
      question: "How long is each session?",
      answer:
        "Sessions typically range from 45 minutes to 1 hour, depending on the age and level of the student.",
    },
    {
      question: "Do you prepare students for tournaments?",
      answer:
        "Absolutely. Our Advanced and Master programs focus heavily on tournament preparation, opening repertoires, and complex calculations.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 w-full flex justify-center font-sans bg-white bg-dot-pattern"
    >
      <div className="max-w-4xl w-full px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          Got Questions?{" "}
          <span className="text-[#FF3B30]">We've Got Answers!</span>
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className={`border border-black/5 dark:border-white/5 p-6 cursor-pointer rounded-[1.5rem] transition-all shadow-sm ${openIndex === index ? "bg-white bg-dot-pattern border-b-2 border-b-[#FFCC00] shadow-[0_4px_12px_rgba(0,0,0,0.04)]" : "bg-gray-50 bg-dot-pattern border-b-2 hover:border-b-2 hover:border-b-[#FF3B30]"}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <p
                  className={`text-lg md:text-xl font-bold pr-4 transition-colors ${openIndex === index ? "text-[#FF3B30]" : "bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"}`}
                >
                  {faq.question}
                </p>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className={`w-6 h-6 shrink-0 ${openIndex === index ? "text-[#FF3B30]" : "bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"}`}
                  />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ReadyToImprove() {
  return (
    <div className="relative font-sans py-16 md:py-24 px-4 bg-white bg-dot-pattern overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="max-w-5xl w-full mx-auto p-6 md:p-12 lg:p-20 rounded-[3rem] relative z-10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] bg-black border-2 border-white/5 border-b-4 border-b-[#FF3B30]"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1920&q=80"
            alt="Chess Final CTA"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent"></div>
        </div>

        {/* Animated background blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-64 h-64 bg-[#FF3B30] rounded-full blur-[100px] opacity-50"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFCC00] rounded-full blur-[100px] opacity-20"
        ></motion.div>

        <div className="text-center relative z-20">
          <h2 className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight mb-8 text-white">
            Ready to Help Your Child{" "}
            <span className="text-[#FFCC00]">Improve Systematically?</span>
          </h2>
          <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-[#EBEBF5]/80 mb-12 max-w-2xl mx-auto">
            Join ChessWize today and give your child the strategic advantage
            they need to succeed in chess and life.
          </p>
          <Magnetic><motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 0px #D70015", y: 4 }}
            whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px #D70015", y: 8 }}
            className="relative overflow-hidden text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-semibold text-white py-5 px-12 rounded-full transition shadow-[0_8px_0_#D70015] md:w-auto w-full flex items-center justify-center gap-2 mx-auto group bg-gradient-to-r from-[#FF3B30] to-[#D70015]"
          >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>
            Book Your Demo Now
            <motion.span group-hover={{ x: 5 }} transition={{ type: "spring" }}>
              <ChevronRight className="w-6 h-6" />
            </motion.span>
          </motion.button></Magnetic>
        </div>
      </motion.div>
    </div>
  );
}

function VideoDemo() {
  return (
    <div className="w-full py-16 md:py-24 bg-[#1C1C1E] font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-white mb-8"
        >
          See Our <span className="text-[#FF3B30]">Coaching in Action</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-[#EBEBF5]/60 mb-12 max-w-2xl mx-auto"
        >
          Watch a quick snippet of how our interactive online classes keep kids
          engaged and learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-[#FF3B30] group cursor-pointer aspect-video bg-black flex items-center justify-center hover:border-[#FFCC00] transition-colors duration-500"
        >
          <img
            src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1200&q=80"
            alt="Video Thumbnail"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-24 h-24 bg-[#FF3B30] rounded-full flex items-center justify-center z-10 shadow-[0_0_0_10px_rgba(211,47,47,0.3)] group-hover:shadow-[0_0_0_20px_rgba(211,47,47,0.4)] transition-all duration-300 border border-black/5 dark:border-white/5"
          >
            <Play className="w-10 h-10 text-white ml-2" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function WhyChooseUs() {
  const features = [
    {
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1000&q=80",
      title: "Certified Coaches",
      desc: "All our trainers are FIDE rated and certified chess instructors.",
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
      title: "Safe Environment",
      desc: "100% secure, kid-friendly online learning platform.",
    },
    {
      image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1000&q=80",
      title: "Proven Track Record",
      desc: "Hundreds of our students have won state and national titles.",
    },
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white bg-dot-pattern font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          Why Choose <span className="text-[#FFCC00]">ChessWize?</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group relative h-[400px] rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] cursor-default"
            >
              <img src={f.image} alt={f.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end text-left">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-[#FFCC00] transition-colors">
                  {f.title}
                </h3>
                <p className="text-[16px] md:text-[18px] leading-relaxed text-white/90">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      features: [
        "4 Classes per month",
        "Basic puzzles access",
        "Monthly progress report",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$89",
      period: "/month",
      features: [
        "8 Classes per month",
        "Unlimited puzzles",
        "Weekly progress report",
        "1-on-1 game analysis",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "$149",
      period: "/month",
      features: [
        "12 Classes per month",
        "Tournament preparation",
        "Daily assignments",
        "Direct coach WhatsApp",
        "24/7 support",
      ],
      popular: false,
    },
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-gray-50 bg-dot-pattern font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          Simple, Transparent <span className="text-[#FF3B30]">Pricing</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative transition-all duration-300 border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] ${plan.popular ? "border-2 border-[#FFCC00] shadow-[0_20px_40px_rgba(255,204,0,0.1)] md:scale-105 z-10" : "border-b-gray-300"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFCC00] text-[#1C1C1E] font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide border border-black/5 dark:border-white/5">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C] mb-2 text-center">
                {plan.name}
              </h3>
              <div className="text-center mb-8">
                <span className="text-4xl md:text-5xl font-black tracking-tight text-[#FF3B30]">
                  {plan.price}
                </span>
                <span className="text-[#8E8E93] font-medium">
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FFCC00] shrink-0" />
                    <span className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Magnetic><motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden w-full py-4 rounded-full text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-semibold text-white transition-colors border border-black/5 dark:border-white/5 bg-gradient-to-r from-[#FF3B30] to-[#D70015] hover:from-red-700 hover:to-red-900"
              >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>
                Choose Plan
              </motion.button></Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [step, setStep] = useState(1);

  return (
    <motion.div id="contact-form" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full py-24 bg-[#111111] font-sans text-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-5/12">
          <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-serif font-medium mb-6">
            Book Your <br/><span className="text-[#D70015] italic">Free Trial.</span>
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Experience our premium chess coaching firsthand. Fill out the application below to schedule your child's free 1-on-1 evaluation and trial class.
          </p>
          
          <div className="space-y-8">
             <div className="flex items-center gap-5">
               <div className="w-px h-12 bg-[#D70015]"></div>
               <div>
                 <p className="text-sm font-bold uppercase tracking-widest text-[#D70015] mb-1">Direct Line</p>
                 <p className="text-xl font-medium">+1 (555) 123-4567</p>
               </div>
             </div>
             <div className="flex items-center gap-5">
               <div className="w-px h-12 bg-white/20"></div>
               <div>
                 <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-1">Email</p>
                 <p className="text-xl font-medium">admissions@chesswize.com</p>
               </div>
             </div>
          </div>
        </div>

        <div className="w-full md:w-7/12">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 md:p-12 rounded-3xl">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-10">
               <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#D70015]' : 'bg-white/10'} transition-all duration-500`}></div>
               <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#D70015]' : 'bg-white/10'} transition-all duration-500`}></div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
               {step === 1 && (
                 <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                    <h3 className="text-2xl font-serif mb-6">Student Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Child's Full Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-[#D70015] focus:outline-none transition-colors text-xl font-serif placeholder:text-white/20 placeholder-[var(--font-serif)]" placeholder="e.g. Alexander Petrov" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                         <label className="block text-sm font-medium text-white/70 mb-2">Age</label>
                         <input type="number" className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-[#D70015] focus:outline-none transition-colors text-xl font-serif placeholder:text-white/20 placeholder-[var(--font-serif)]" placeholder="8" />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-white/70 mb-2">Current ELO (Approx.)</label>
                         <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-[#D70015] focus:outline-none transition-colors text-xl font-serif placeholder:text-white/20 placeholder-[var(--font-serif)]" placeholder="Unrated" />
                       </div>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="mt-8 bg-white text-[#111111] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#D70015] hover:text-white transition-colors w-full md:w-auto">
                       Next Step
                    </button>
                 </motion.div>
               )}
               {step === 2 && (
                 <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                    <h3 className="text-2xl font-serif mb-6">Parent Contact Info</h3>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Parent/Guardian Email</label>
                      <input type="email" className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-[#D70015] focus:outline-none transition-colors text-xl font-serif placeholder:text-white/20 placeholder-[var(--font-serif)]" placeholder="parent@elite.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                      <input type="tel" className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-[#D70015] focus:outline-none transition-colors text-xl font-serif placeholder:text-white/20 placeholder-[var(--font-serif)]" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="flex gap-4 pt-4">
                       <button type="button" onClick={() => setStep(1)} className="text-white/50 px-6 py-4 font-bold hover:text-white transition-colors">Back</button>
                       <button type="button" className="bg-[#D70015] text-white flex-1 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#111111] transition-colors shadow-[0_0_20px_rgba(215,0,21,0.4)]">
                          Confirm Free Trial
                       </button>
                    </div>
                 </motion.div>
               )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StickyBottomBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
      className="z-50 font-sans fixed bottom-0 left-0 right-0 bg-white bg-dot-pattern/90 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.1)] px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between border-t-4 border-[#FF3B30]"
    >
      <div className="hidden md:flex flex-col gap-1">
        <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]">
          Start Your Chess Journey
        </p>
        <p className="text-sm font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-2">
          Limited Demo Slots Available
        </p>
      </div>
      <div className="relative w-full md:w-auto">
        <Magnetic><motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-semibold text-white px-8 py-4 rounded-full w-full md:w-80 shadow-[0_8px_24px_rgba(0,0,0,0.06)] bg-gradient-to-r from-[#FF3B30] to-[#D70015] hover:from-red-700 hover:to-red-900 transition-colors flex justify-center items-center gap-2 group"
        >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>
          Book Free Demo
          <motion.span group-hover={{ x: 5 }} transition={{ type: "spring" }}>
            <ChevronRight className="w-6 h-6" />
          </motion.span>
        </motion.button></Magnetic>
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-[#FF3B30] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-6 z-50 p-4 bg-[#1C1C1E] text-[#FFCC00] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#FFCC00] hover:bg-[#FF3B30] hover:text-white transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}


function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block w-full md:w-auto"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col bg-white bg-dot-pattern pb-24 selection:bg-[#FF3B30] selection:text-white"
    >
      <ScrollProgress />
      <ScrollToTop />
      <TopMarquee />
      <Hero />
      <ImpactNumbers />
      <WhyChooseUs />
      <VideoDemo />
      <LearningPath />
      <WhatChildGains />
      <CoachingProcess />
      <ProgramDetails />
      <ClassModes />
      <Pricing />
      <Coaches />
      <SuccessStories />
      <FAQ />
      <ContactForm />
      <ReadyToImprove />
      <StickyBottomBar />
    </motion.div>
  );
}
