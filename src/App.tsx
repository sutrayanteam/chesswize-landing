import React, { useState } from "react";
import { CheckCircle, Play, ChevronDown, Star, Users, Globe, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-[55%]">
        <div className="inline-block bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm mb-6">
          Batch 24 Starts at 5 PM on Apr 15th
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Master Chess with Professional, Hands-on Coaching.
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          The exact strategies that have helped 10,000+ students build razor-sharp focus, improve critical thinking, and win local tournaments—without burning out.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
          Reserve seat for Batch 24
        </button>
        <p className="text-sm text-red-600 font-medium mt-3">🔥 Only 12 Seats left</p>
      </div>
      <div className="w-full md:w-[45%] relative">
        <img 
          src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80" 
          alt="Coach teaching chess to a student" 
          className="rounded-2xl shadow-2xl w-full object-cover"
        />
      </div>
    </section>
  );
}

function SocialProof() {
  const testimonials = [
    { text: "My child's concentration improved drastically within just a month. The structured approach is brilliant.", author: "Priya S.", title: "Parent of 8-year-old" },
    { text: "Rahul understands chess pedagogy so well. It's not just about moves; it's about life skills.", author: "Amit V.", title: "Parent & IT Professional" },
    { text: "The way the coaches teach is something I find very, very engaging.", author: "Sarah M.", title: "Parent of Tournament Winner" }
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-800 font-medium text-lg italic mb-4">"{t.text}"</p>
              <div className="mt-auto">
                <p className="font-bold text-gray-900">{t.author}</p>
                <p className="text-sm text-gray-500">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl text-gray-500 font-medium mb-10">We'll let the numbers talk</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-5xl font-black text-gray-900 mb-2">10K+</h3>
          <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Learners</p>
        </div>
        <div>
          <h3 className="text-5xl font-black text-gray-900 mb-2">15+</h3>
          <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Countries</p>
        </div>
        <div>
          <h3 className="text-5xl font-black text-gray-900 mb-2">4.9/5</h3>
          <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Rating</p>
        </div>
      </div>
    </section>
  );
}

function WhoIsThisFor() {
  const points = [
    "Want to build their child's critical thinking but don't know 'how'",
    "Are looking for a structured, non-addictive screen time activity",
    "Want their kids to participate in tournaments and build confidence",
    "Notice their child struggles with focus and want a proven method to improve it",
    "Want to develop their child's patience and emotional resilience",
    "Are tired of unstructured YouTube chess videos and need proper guidance"
  ];

  return (
    <section className="bg-gray-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">This program is for parents who:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {points.map((pt, i) => (
            <div key={i} className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
              <p className="text-lg text-gray-300 leading-relaxed">{pt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Curriculum() {
  const modules = [
    { title: "Foundation & Setup", desc: "Understand the board, piece values, and basic principles without memorization. We focus on why pieces move the way they do." },
    { title: "Tactical Vision", desc: "Learn to spot pins, forks, skewers, and discovered attacks. We train pattern recognition through repetitive, structured puzzles." },
    { title: "Strategic Planning", desc: "How to evaluate a position. Controlling the center, king safety, and creating long-term plans when there are no immediate tactics." },
    { title: "Endgame Mastery", desc: "Converting an advantage into a win. King and pawn endgames, opposition, and essential theoretical draw techniques." },
    { title: "Tournament Psychology", desc: "Managing time trouble, recovering from blunders, and maintaining emotional control during stressful competitive play." }
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">What Your Child Will Learn</h2>
      <div className="space-y-10">
        {modules.map((m, i) => (
          <div key={i} className="border-l-4 border-blue-600 pl-6 py-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Module {i + 1}: {m.title}</h3>
            <p className="text-lg text-gray-600 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CoachProfile() {
  return (
    <section className="bg-gray-50 py-20 px-4 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" 
            alt="Coach Portrait" 
            className="w-full rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Hi! My name is Coach Rahul.</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>For me, chess was the game-changer—no exaggeration.</p>
            <p>It's where I learned patience, discipline, and the value of thinking three steps ahead. These experiences helped me navigate my academics, build two successful businesses, and eventually become a National Master.</p>
            <p>This coaching program is my way of giving back, sharing the insights and structured training methods that made all the difference for me.</p>
            <p className="font-semibold text-gray-900">Now, I'm here to help your child do the same.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-900">Everything you need to start winning</h2>
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden max-w-md mx-auto">
        <div className="bg-gray-900 text-white py-6">
          <h3 className="text-2xl font-bold">Complete Mastery Plan</h3>
          <p className="text-gray-400 mt-2">12 Weeks of intensive coaching</p>
        </div>
        <div className="p-8">
          <div className="text-5xl font-black text-gray-900 mb-2">$199<span className="text-lg text-gray-500 font-normal">/month</span></div>
          <p className="text-red-500 font-medium text-sm mb-6">Deadline 15th April</p>
          
          <ul className="text-left space-y-4 mb-8">
            <li className="flex gap-3 items-center"><CheckCircle className="w-5 h-5 text-blue-600" /> <span>2 Live Sessions per week</span></li>
            <li className="flex gap-3 items-center"><CheckCircle className="w-5 h-5 text-blue-600" /> <span>Daily structured puzzles</span></li>
            <li className="flex gap-3 items-center"><CheckCircle className="w-5 h-5 text-blue-600" /> <span>Weekly practice tournaments</span></li>
            <li className="flex gap-3 items-center"><CheckCircle className="w-5 h-5 text-blue-600" /> <span>Monthly progress reports for parents</span></li>
            <li className="flex gap-3 items-center"><CheckCircle className="w-5 h-5 text-blue-600" /> <span>Access to premium study materials</span></li>
          </ul>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-lg shadow-md transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQs() {
  const faqs = [
    { q: "When does the program start?", a: "The exact date and timings of the batches are mentioned at the top of the page. We start new batches every 2 weeks." },
    { q: "Will this be live or pre-recorded?", a: "It's a mix of both. You will get access to foundational recorded lessons to watch anytime, and live interactive practice sessions twice a week." },
    { q: "My child is a complete beginner. Is this suitable?", a: "Absolutely! We assign batches based on skill level. Beginners start in the Foundation batch where we cover all basics from scratch." },
    { q: "What if we miss a live session?", a: "All live sessions are recorded and uploaded to your student portal within 24 hours so you never miss out on the learning." }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 border-t border-gray-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">FAQs: Here's everything you may ask...</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 text-center">
      <p>&copy; 2026 ChessWize. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Hero />
      <SocialProof />
      <Numbers />
      <WhoIsThisFor />
      <Curriculum />
      <CoachProfile />
      <Pricing />
      <FAQs />
      <Footer />
    </div>
  );
}

export default App;
