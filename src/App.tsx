import React, { useState, useRef, useEffect } from "react";
import Lenis from 'lenis';
import {
  ChevronDown,
  ChevronUp,
  Play,
  ChevronRight,
  Quote,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Star
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

function TopMarquee() {
  return (
    <div className="w-full py-2.5 overflow-hidden bg-slate-900 text-white relative z-50 transition-colors">
      <div className="flex items-center animate-marquee whitespace-nowrap text-sm font-medium tracking-wide">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center mr-8">
            <span className="text-gray-400 mr-2">✦</span>
            Premium Online Chess Coaching for Future Leaders
            <span className="mx-4 text-gray-600">|</span>
            <span className="text-red-500">Admissions Open</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative w-full h-[90vh] bg-white overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <motion.img
          style={{ y: yImage, scale: 1.05 }}
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=2000&q=80"
          alt="Premium Chess Coaching"
          className="w-full h-full object-cover origin-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-1/3 bottom-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col pt-20">
        <motion.div style={{ opacity }} className="max-w-2xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
            <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 font-semibold tracking-wide text-sm border border-red-100">
              Transformative Learning
            </span>
          </motion.div>
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
          >
            Master the Board.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Master your Mind.</span>
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-light"
          >
            Enterprise-grade chess curriculum designed by Grandmasters to build resilience, profound strategic thinking, and unparalleled discipline.
          </motion.p>
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-none font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group">
              Start Your Journey
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-none font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> View Methodology
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 flex items-center gap-4 text-sm font-medium text-slate-500">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-8 h-8 rounded-full border-2 border-white" alt="Student" />
              ))}
            </div>
            <p>Trusted by 1000+ elite students</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ImpactNumbers() {
  const stats = [
    { num: "10+", label: "Years Excellence" },
    { num: "1000+", label: "Elite Students" },
    { num: "50+", label: "Championship Titles" },
    { num: "100%", label: "Focused Growth" },
  ];

  return (
    <section className="bg-slate-900 text-white py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x divide-slate-800/0 md:divide-slate-800"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center md:items-start md:pl-8 first:pl-0">
              <p className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tight">
                {stat.num}
              </p>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
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
      level: "PHASE 01",
      name: "Foundation",
      desc: "Establishing core cognitive frameworks and absolute rules of play.",
      img: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=800&q=80"
    },
    {
      level: "PHASE 02",
      name: "Strategic Depth",
      desc: "Tactical recognition, positional geometry, and dynamic planning.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    },
    {
      level: "PHASE 03",
      name: "Competitive Mastery",
      desc: "Advanced calculation, opening repertoires, and psychological resilience.",
      img: "https://images.unsplash.com/photo-1610620241639-688941783cfd?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <div className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:w-2/3">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-4">
            Curriculum
          </motion.h2>
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            A structured pathway to mastery.
          </motion.h3>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
          {levels.map((l, i) => (
            <motion.div key={i} variants={fadeUp} className="group cursor-pointer">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-slate-200">
                <img src={l.img} alt={l.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold tracking-widest uppercase">
                  {l.level}
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-slate-900 mb-3">{l.name}</h4>
              <p className="text-slate-600 leading-relaxed font-light">{l.desc}</p>
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
      title: "Cognitive Excellence",
      desc: "Heightened focus, memory retention, and rapid problem-solving capabilities.",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Psychological Resilience",
      desc: "Learning to thrive under pressure, handle losses gracefully, and strategize long-term.",
      img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Beyond the Board</h2>
          <p className="text-xl text-slate-500 font-light">Chess is merely the medium. Our true objective is cultivating the intellectual and emotional fortitude required for real-world leadership.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {items.map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative group">
              <div className="aspect-[16/9] md:aspect-[4/3] overflow-hidden mb-6 bg-slate-100">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] filter grayscale hover:grayscale-0" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PremiumVideoSecton() {
  return (
    <section className="bg-slate-900 py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm font-semibold text-red-500 uppercase tracking-widest mb-4">
            Our Environment
          </motion.h2>
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            Immersive, distraction-free learning.
          </motion.h3>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-slate-400 font-light mb-8">
            Experience our proprietary coaching platforms. We combine high-fidelity video conferring with synchronous interactive boards to ensure every session is entirely captivated.
          </motion.p>
          <button className="text-white border-b border-red-500 pb-1 font-medium hover:text-red-400 transition-colors flex items-center gap-2">
            Watch Full Overview <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-full md:w-1/2">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-video bg-black shadow-2xl overflow-hidden group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" alt="Video" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CoachingProcess() {
  const steps = [
    { title: "Consultation", desc: "A detailed assessment of the student's current cognitive baseline and goals." },
    { title: "Assignment", desc: "Strategic pairing with a Master-level coach suited to the student's psychological profile." },
    { title: "Execution", desc: "Rigorous, structured learning sessions with continuous performance analytics." }
  ];

  return (
    <section className="py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">The Process</h2>
            <p className="text-slate-500 font-light">Seamless onboarding designed to match intent with capability.</p>
          </div>
          <div className="md:col-span-3">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="relative">
                  <div className="text-slate-300 font-light text-6xl md:text-7xl mb-4 leading-none">0{i+1}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClassModes() {
  const modes = [
    {
      title: "One-to-One Focus",
      desc: "Hyper-personalized instruction targeting specific weaknesses and building custom repertoires.",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Elite Masterclasses",
      desc: "Small, curated groups (max 4) to foster high-level analytical discussions and competitive sparring.",
      img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Learning Models</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-0 border border-slate-200">
          {modes.map((mode, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`bg-white p-12 md:p-16 flex flex-col justify-between ${i === 0 ? 'border-b md:border-b-0 md:border-r border-slate-200' : ''}`}>
               <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{mode.title}</h3>
                  <p className="text-lg text-slate-500 font-light mb-12">{mode.desc}</p>
               </div>
               <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img src={mode.img} alt={mode.title} className="w-full h-full object-cover filter contrast-125" />
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessStories() {
  const testimonials = [
    {
      quote: "The structure and sophistication of the curriculum are unmatched. It's not just a hobby class; it's a profound cognitive workout for my son.",
      name: "Marcus T.",
      title: "Executive Director"
    },
    {
      quote: "Within six months, we saw a remarkable shift not just in her chess rating, but in her academic focus and resilience. An extraordinary investment.",
      name: "Elena R.",
      title: "Surgeon & Parent"
    }
  ];

  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Quote className="w-8 h-8 text-slate-200 mb-6" />
              <p className="text-2xl font-light text-slate-900 leading-snug mb-8">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider mt-1">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <section className="bg-slate-900 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-5xl font-bold tracking-tight mb-6">Take the first step.</h2>
          <p className="text-xl text-slate-400 font-light mb-16 max-w-md">Our intake process is highly selective. Request a consultation to see if ChessWize aligns with your child's potential.</p>
          
          <div className="space-y-8 font-light text-lg">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-slate-500" />
              <span>admissions@chesswize.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-slate-500" />
              <span>Global Online Academy</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="w-full md:w-1/2 bg-white text-slate-900 p-12 md:p-24 flex items-center">
        <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full max-w-lg space-y-8">
          <div>
             <input type="text" placeholder="Parent's Name" className="w-full clean-input text-lg placeholder:text-slate-400" />
          </div>
          <div>
             <input type="email" placeholder="Email Address" className="w-full clean-input text-lg placeholder:text-slate-400" />
          </div>
          <div>
             <input type="text" placeholder="Child's Age & Experience Level" className="w-full clean-input text-lg placeholder:text-slate-400" />
          </div>
          <button type="button" className="w-full bg-slate-900 text-white font-medium py-4 mt-8 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            Request Consultation <ChevronRight className="w-4 h-4" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
           className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 py-4 px-6 z-50 flex items-center justify-between"
        >
          <div className="hidden md:block">
            <p className="font-semibold text-slate-900">Secure Your Slot</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Selective Admissions</p>
          </div>
          <button className="bg-red-600 text-white px-8 py-3 font-medium hover:bg-red-700 transition-colors w-full md:w-auto">
            Book Assessment
          </button>
        </motion.div>
      )}
    </AnimatePresence>
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
    <div className="bg-white min-h-screen font-sans selection:bg-slate-900 selection:text-white">
      <TopMarquee />
      <Hero />
      <ImpactNumbers />
      <LearningPath />
      <WhatChildGains />
      <PremiumVideoSecton />
      <CoachingProcess />
      <ClassModes />
      <SuccessStories />
      <ContactForm />
      <StickyCTA />
    </div>
  );
}
