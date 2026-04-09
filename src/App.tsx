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
    <div className="mx-auto p-4 md:p-8 bg-white bg-dot-pattern rounded-lg mt-2 font-sans max-w-7xl overflow-hidden relative border border-gray-100 shadow-sm">
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-center mb-8"
        >
          <img
            src="/IMG_2257.jpg"
            alt="ChessWize Logo"
            className="h-24 md:h-32 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-6 text-[#1C1C1E]"
        >
          Professional <span className="text-[#FF3B30]">Online Chess</span> Coaching for Kids
        </motion.h1>
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black text-center mb-12 max-w-4xl mx-auto"
        >
          We don't just play games; we build minds. Our 10+ years of experience
          ensures a structured development path for every student.
        </motion.h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-16 gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full lg:w-1/2 relative group"
        >
          <div className="absolute inset-0 bg-[#FFCC00] rounded-[1.5rem] transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500 border border-black/5 dark:border-white/5"></div>
          <div className="absolute inset-0 bg-[#FF3B30] rounded-[1.5rem] transform -translate-x-4 -translate-y-4 transition-transform group-hover:-translate-x-6 group-hover:-translate-y-6 duration-500 -z-10 border border-black/5 dark:border-white/5"></div>
          <img
            src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80"
            alt="Chess Coaching"
            className="w-full h-auto rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.12)] relative z-10 border-2 border-black/5 transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center lg:items-start w-full lg:w-1/2"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-5 rounded-[1rem] flex items-center justify-center gap-4 bg-[#1C1C1E] text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex-1 border border-black/5 dark:border-white/5 border-b-2 border-b-[#FFCC00] cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=200&q=80" alt="Experience" className="w-12 h-12 rounded-[0.8rem] object-cover shadow-sm border border-black/10" />
              <p className="font-medium text-lg leading-tight">
                <span className="font-bold text-[#FFCC00] text-xl">
                  10+ Years
                </span>
                <br /> Experience
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-5 rounded-[1rem] flex items-center justify-center gap-4 bg-[#FF3B30] text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex-1 border border-black/5 dark:border-white/5 border-b-2 border-b-[#1C1C1E] cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1504280613257-22f281e053f3?auto=format&fit=crop&w=200&q=80" alt="Structured Learning" className="w-12 h-12 rounded-[0.8rem] object-cover shadow-sm border border-black/10" />
              <p className="font-medium text-lg leading-tight">
                <span className="font-bold text-white text-xl">Structured</span>
                <br />
                Learning Path
              </p>
            </motion.div>
          </div>
          <div className="w-full mb-8 bg-gray-50 bg-dot-pattern p-6 rounded-[1rem] border-l-4 border-[#FF3B30] shadow-[0_4px_12px_rgba(0,0,0,0.04)] relative overflow-hidden group">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black relative z-10">
              Structured, level-based chess training designed to build{" "}
              <span className="font-bold text-[#FF3B30]">
                strategic thinking
              </span>
              , <span className="font-bold text-[#FF3B30]">discipline</span>,
              and{" "}
              <span className="font-bold text-[#FF3B30]">
                competitive confidence
              </span>
              .
            </p>
          </div>
          <Magnetic><motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 0px #D70015", y: 4 }}
            whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px #D70015", y: 8 }}
            className="relative overflow-hidden text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-semibold text-white px-6 md:px-10 py-4 md:py-5 rounded-full w-full md:w-auto shadow-[0_8px_0_#D70015] bg-gradient-to-r from-[#FF3B30] to-[#D70015] transition-all flex items-center justify-center gap-2 group"
          >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>
            Book Your Free Demo
            <motion.span group-hover={{ x: 5 }} transition={{ type: "spring" }}>
              <ChevronRight className="w-6 h-6" />
            </motion.span>
          </motion.button></Magnetic>
        </motion.div>
      </div>
    </div>
  );
}

function ImpactNumbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { num: "10+", label: "Years Experience", image: "https://images.unsplash.com/photo-1501139082119-e14197628102?auto=format&fit=crop&w=200&q=80" },
    { num: "1000+", label: "Students Taught", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80" },
    { num: "50+", label: "Tournament Winners", image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=200&q=80" },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-cover bg-center py-16 md:py-24 font-sans flex items-center bg-[#FF3B30] overflow-hidden"
    >
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1200&q=80')] bg-cover mix-blend-multiply"
      ></motion.div>
      <div className="container relative z-10 mx-auto text-center px-4">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-white mb-16"
        >
          Our Impact in <span className="text-[#FFCC00]">Numbers</span>
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row justify-center items-center gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex items-center gap-6 bg-white bg-dot-pattern p-6 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.12)] md:w-auto w-full max-w-sm justify-center border border-black/5 dark:border-white/5 border-b-2 cursor-pointer group"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-[1rem] bg-gray-100 overflow-hidden shadow-inner border border-black/5 dark:border-white/5"
              >
                <img src={stat.image} alt={stat.label} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
              </motion.div>
              <div className="flex flex-col items-start">
                <p className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]">
                  {stat.num}
                </p>
                <p className="text-lg font-bold text-[#8E8E93] uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=200&q=80",
      text: "Sharpens Critical Thinking",
      desc: "Develops problem-solving skills that translate to academics.",
    },
    {
      image: "https://images.unsplash.com/photo-1504280613257-22f281e053f3?auto=format&fit=crop&w=200&q=80",
      text: "Improves Focus & Patience",
      desc: "Trains the mind to concentrate for extended periods.",
    },
    {
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=200&q=80",
      text: "Boosts Creativity",
      desc: "Encourages out-of-the-box thinking and pattern recognition.",
    },
    {
      image: "https://images.unsplash.com/photo-1614332287897-cdc24cb7ca52?auto=format&fit=crop&w=200&q=80",
      text: "Builds Confidence",
      desc: "Teaches resilience through wins and losses.",
    },
    {
      image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=200&q=80",
      text: "Prepares for Competitions",
      desc: "Instills a healthy competitive spirit and sportsmanship.",
    },
    {
      image: "https://images.unsplash.com/photo-1501139082119-e14197628102?auto=format&fit=crop&w=200&q=80",
      text: "Time Management",
      desc: "Learning to make critical decisions under time pressure.",
    },
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          What Your Child{" "}
          <span className="text-[#FF3B30]">Gains With Chess!</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gray-50 bg-dot-pattern p-8 rounded-[1.5rem] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-black/5 dark:border-white/5 border-b-2 flex flex-col gap-4 group hover:bg-[#1C1C1E] transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-16 h-16 shrink-0 rounded-[1rem] bg-gray-100 overflow-hidden shadow-sm border border-black/5 dark:border-white/5"
                >
                  <img src={item.image} alt={item.text} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                </motion.div>
                <p className="text-xl font-bold text-gray-800 group-hover:text-white group-hover:scale-110 transition-all duration-300 duration-300">
                  {item.text}
                </p>
              </div>
              <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black pl-[4.5rem] group-hover:text-[#EBEBF5]/80 transition-colors duration-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
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
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-white bg-dot-pattern p-8 rounded-[2rem] border border-black/5 dark:border-white/5 border-b-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-b-[#FFCC00] transition-colors w-full max-w-md relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] -z-10"></div>
                    <h3 className="text-2xl font-bold mb-3 text-[#1C1C1E] group-hover:text-[#FF3B30] group-hover:scale-110 transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black">
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
      image: "/father-and-son-playing-chess-game-at-home-childre-2026-03-17-07-11-24-utc.jpg",
    },
    {
      title: "Two on One",
      desc: "Learn with a peer to foster healthy competition and discussion.",
      image: "/intellectual-board-games-2026-03-16-00-42-30-utc.jpg",
    },
    {
      title: "Group",
      desc: "Interactive group sessions focusing on broad concepts and practice.",
      image: "/child-s-hand-moves-the-horse-during-a-chess-tourna-2026-03-26-03-58-25-utc.jpg",
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
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gray-50 bg-dot-pattern p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center border border-black/5 dark:border-white/5 border-b-2 hover:border-b-[#FFCC00] transition-colors relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-24 h-24 mx-auto rounded-[1.5rem] overflow-hidden mb-6 shadow-md border border-black/5 dark:border-white/5"
                >
                  <img src={mode.image} alt={mode.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                </motion.div>
                <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C] mb-4">
                  {mode.title}
                </h3>
                <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black mb-8">
                  {mode.desc}
                </p>
                <Magnetic><motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden w-full py-4 rounded-full text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-semibold text-white bg-gradient-to-r from-[#FF3B30] to-[#D70015] hover:from-red-700 hover:to-red-900 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5"
                >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>
                  Select Mode
                </motion.button></Magnetic>
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
      image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=800&q=80",
      title: "Certified Coaches",
      desc: "All our trainers are FIDE rated and certified chess instructors.",
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      title: "Safe Environment",
      desc: "100% secure, kid-friendly online learning platform.",
    },
    {
      image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=800&q=80",
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
              whileHover={{ y: -10 }}
              className="bg-gray-50 bg-dot-pattern p-8 rounded-[2rem] border border-black/5 dark:border-white/5 border-b-2 text-center hover:border-b-[#FF3B30] transition-colors group"
            >
              <div className="w-24 h-24 mx-auto rounded-[1.5rem] overflow-hidden mb-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-black/5 dark:border-white/5">
                <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C] mb-4">
                {f.title}
              </h3>
              <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black">
                {f.desc}
              </p>
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
              className={`bg-white bg-dot-pattern rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative border border-black/5 dark:border-white/5 border-b-2 ${plan.popular ? "border-b-[#FFCC00] md:scale-105 z-10" : "border-b-gray-300"}`}
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="w-full py-16 md:py-24 bg-white bg-dot-pattern font-sans"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]"
        >
          Get In <span className="text-[#FF3B30]">Touch</span>
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <div className="bg-gray-50 bg-dot-pattern p-8 rounded-[2rem] border border-black/5 dark:border-white/5 border-b-2 border-b-[#FFCC00]">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C] mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFCC00] rounded-full flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                    <Phone className="w-6 h-6 text-[#1C1C1E]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8E8E93] font-bold uppercase">
                      Phone
                    </p>
                    <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFCC00] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#1C1C1E]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8E8E93] font-bold uppercase">
                      Email
                    </p>
                    <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black">
                      hello@chesswize.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFCC00] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#1C1C1E]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8E8E93] font-bold uppercase">
                      Location
                    </p>
                    <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-normal text-black">
                      123 Grandmaster Ave, NY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3"
          >
            <form className="bg-gray-50 bg-dot-pattern p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Parent's Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-[1rem] border border-gray-200 focus:border-[#FF3B30] focus:outline-none focus:ring-4 focus:ring-[#FF3B30]/20 transition-colors bg-white bg-dot-pattern"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Child's Age
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-[1rem] border border-gray-200 focus:border-[#FF3B30] focus:outline-none focus:ring-4 focus:ring-[#FF3B30]/20 transition-colors bg-white bg-dot-pattern"
                    placeholder="8"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-[1rem] border border-gray-200 focus:border-[#FF3B30] focus:outline-none focus:ring-4 focus:ring-[#FF3B30]/20 transition-colors bg-white bg-dot-pattern"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-[1rem] border border-gray-200 focus:border-[#FF3B30] focus:outline-none focus:ring-4 focus:ring-[#FF3B30]/20 transition-colors bg-white bg-dot-pattern"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-[1rem] border border-gray-200 focus:border-[#FF3B30] focus:outline-none focus:ring-4 focus:ring-[#FF3B30]/20 transition-colors bg-white bg-dot-pattern resize-none"
                  placeholder="Tell us about your child's chess experience..."
                ></textarea>
              </div>
              <Magnetic><motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden w-full py-4 rounded-[1rem] text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-semibold text-white bg-gradient-to-r from-[#FF3B30] to-[#D70015] hover:from-red-700 hover:to-red-900 transition-colors flex items-center justify-center gap-2"
              >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>
                Send Message <Send className="w-5 h-5" />
              </motion.button></Magnetic>
            </form>
          </motion.div>
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
