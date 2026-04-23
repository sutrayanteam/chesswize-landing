import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  MessageCircle,
  CheckCircle2,
  Shield,
  Star,
  Sparkles,
  Laptop2,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouteMeta } from "@/src/lib/useRouteMeta";
import { trackLead } from "@/src/lib/tracking";
import { buildWhatsAppHref, onWhatsAppClick } from "@/src/lib/whatsapp";

/**
 * /thank-you — lead conversion page.
 *
 * URL contract: fired with `?eid=<uuid>` from BottomForm on successful submit.
 * Worker generates the event_id; browser re-uses it here so Meta deduplicates
 * the fbq Lead and the CAPI Lead into one event.
 *
 * Refresh-safe: dedup key in sessionStorage prevents the Lead fbq from firing
 * twice if the user refreshes or taps back+forward.
 *
 * Design brief:
 *   • celebrate the conversion (confetti burst + hero imagery)
 *   • reduce cancel-regret by showing a real counsellor + real coaches
 *   • reinforce value + guarantee
 *   • funnel straight into WhatsApp (our highest-converting next channel)
 *   • mobile-first: 16px text min, 48dp tap targets, safe-area respected
 *
 * SEO: noindex — this page is only meant for users who completed the form.
 */
export default function ThankYou() {
  useRouteMeta({
    title: "Thank you — ChessWize demo booking received",
    description:
      "Your free demo request is in. Priya Sharma, our academic counsellor, will reach out on WhatsApp within 10 minutes (10 AM – 8 PM IST).",
    path: "/thank-you",
    noIndex: true,
  });

  const [params] = useSearchParams();
  const eid = params.get("eid");

  useEffect(() => {
    window.scrollTo(0, 0);

    // Small celebratory confetti burst — matches the conversion tone and
    // matches the existing App.tsx pattern (dynamic import to keep the main
    // bundle small since canvas-confetti is only needed on this page).
    let cancelled = false;
    (async () => {
      try {
        const confetti = (await import("canvas-confetti")).default;
        if (cancelled) return;
        const end = Date.now() + 600;
        const colors = ["#2563eb", "#10b981", "#f59e0b", "#0ea5e9"];
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors,
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors,
          });
          if (Date.now() < end && !cancelled) requestAnimationFrame(frame);
        };
        frame();
      } catch {
        /* confetti is a nice-to-have; silent fail is fine */
      }
    })();

    if (!eid) return () => { cancelled = true; };
    const key = `cw_lead_fired_${eid}`;
    try {
      if (sessionStorage.getItem(key)) return () => { cancelled = true; };
      sessionStorage.setItem(key, "1");
    } catch {
      /* ignore — still safe to fire once */
    }
    trackLead(eid);
    return () => { cancelled = true; };
  }, [eid]);

  const waHref = buildWhatsAppHref({
    source: "thank_you_page",
    text: "Hi, I just booked a free demo on chesswize.in. Looking forward to hearing from you.",
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden">
      {/* Ambient background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <header className="gs-glass py-3 md:py-4 border-b border-slate-200/50 sticky top-0 z-50 backdrop-blur-lg bg-white/70">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="ChessWize home">
            <img src="/logo-side-black-v2.svg" alt="ChessWize" className="h-7 md:h-8 object-contain" width={180} height={32} />
          </Link>
          <Link to="/">
            <Button variant="outline" className="gs-btn gs-btn-white text-xs font-bold rounded-xl h-10 md:h-9 px-4">
              <ArrowLeft className="size-3.5 mr-1.5" /> Home
            </Button>
          </Link>
        </div>
      </header>

      <main id="main-content" role="main" className="flex-1 relative z-10">
        {/* ═══════════════════════════════════════════════
            HERO — imagery + congratulations + primary CTA
            ═══════════════════════════════════════════════ */}
        <section className="pt-8 md:pt-14 pb-10 md:pb-16">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
            {/* Copy column */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] md:text-xs font-extrabold uppercase tracking-widest-gs text-emerald-700 mb-4">
                <Sparkles className="size-3.5" aria-hidden="true" /> Booking confirmed
              </span>
              <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tighter-gs text-slate-900 leading-[1.05] mb-4">
                You're in. Priya is <span className="text-emerald-600">on it</span>.
              </h1>
              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-6 max-w-[520px] mx-auto lg:mx-0">
                Your free 20-min chess evaluation is booked. Our senior counsellor will WhatsApp you within
                <span className="font-extrabold text-slate-900"> 10 minutes</span> (10 AM – 8 PM IST) to lock the exact time.
              </p>

              {/* Primary CTA — generous 56dp tap target, safe-area not needed because it's inline */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5">
                <a
                  href={waHref}
                  onClick={onWhatsAppClick("thank_you_page")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-extrabold text-[15px] shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all touch-manipulation"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message Priya on WhatsApp
                </a>
                <a
                  href="tel:+918400979997"
                  className="inline-flex items-center justify-center gap-2 h-14 px-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 active:scale-[0.98] text-slate-900 font-extrabold text-[15px] transition-all touch-manipulation"
                >
                  Call +91 84009 79997
                </a>
              </div>

              <p className="text-xs md:text-sm text-slate-500 font-medium max-w-[420px] mx-auto lg:mx-0">
                A confirmation email is also on its way to your inbox. Check spam if it's not in Primary within a minute.
              </p>
            </motion.div>

            {/* Imagery column — real photo of a parent + child on a video call, matching the next step */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full max-w-[440px] mx-auto rounded-[28px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(30,41,59,0.35)] border border-white/80">
                <img
                  src="/2026-04-15-10-35-00-parent-child-video-call.webp"
                  alt="A parent watches their child attend a live chess lesson on a laptop"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" aria-hidden="true" />

                {/* Overlay card — confirmation stamp */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-white shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-6 text-emerald-600" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest-gs text-emerald-700">Booking confirmed</p>
                      <p className="text-[13px] font-bold text-slate-800 leading-tight">Next step: Priya's WhatsApp</p>
                    </div>
                  </div>
                </motion.div>

                {/* Corner badge — response time */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-md border border-white">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-blue-600" aria-hidden="true" />
                    <span className="text-[11px] font-extrabold text-slate-800">~10 min reply</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            COUNSELLOR — real photo, real name, real reply time
            ═══════════════════════════════════════════════ */}
        <section className="pb-10 md:pb-14">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-3xl p-5 md:p-7 border border-slate-200 shadow-[0_12px_40px_-20px_rgba(30,41,59,0.2)] flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-7"
            >
              <div className="relative shrink-0">
                <img
                  src="/counselor-avatar.webp"
                  alt="Priya Sharma, senior academic counsellor at ChessWize"
                  className="size-20 md:size-24 rounded-2xl object-cover border-2 border-white shadow-md"
                  width={96}
                  height={96}
                  loading="lazy"
                />
                <span className="absolute -bottom-1.5 -right-1.5 size-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-sm">
                  <span className="size-2 rounded-full bg-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest-gs text-blue-600 mb-1">Your counsellor</p>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-1">Priya Sharma</h2>
                <p className="text-sm text-slate-600 font-medium mb-3">7 years guiding Indian parents through chess-as-learning programmes. Speaks Hindi, English, and a sprinkle of panic-parent reassurance.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-extrabold text-emerald-700">
                    <CheckCircle2 className="size-3" aria-hidden="true" /> Online now
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[11px] font-extrabold text-blue-700">
                    <Clock className="size-3" aria-hidden="true" /> Replies in ~10 min
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-[11px] font-extrabold text-amber-700">
                    <Star className="size-3 fill-amber-500 stroke-amber-600" aria-hidden="true" /> 4.9 parent rating
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            WHAT HAPPENS NEXT — visual timeline
            ═══════════════════════════════════════════════ */}
        <section className="pb-10 md:pb-16">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-10">
              <p className="text-[11px] md:text-xs font-extrabold uppercase tracking-widest-gs text-slate-500 mb-2">The next 24 hours</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs text-slate-900">Here's exactly what happens next</h2>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: MessageCircle,
                  img: "/counselor-avatar.webp",
                  eyebrow: "Within 10 min",
                  title: "Priya WhatsApps you",
                  body: "She'll confirm the exact day + time of your evaluation slot and share a Zoom link.",
                  accent: "from-emerald-500 to-emerald-600",
                  ring: "ring-emerald-100",
                },
                {
                  icon: Laptop2,
                  img: "/2026-04-15-10-35-00-parent-child-video-call.webp",
                  eyebrow: "Your chosen slot",
                  title: "20-min live evaluation",
                  body: "A FIDE-rated coach plays a few positions with your child, reads their style and temperament.",
                  accent: "from-blue-500 to-blue-600",
                  ring: "ring-blue-100",
                },
                {
                  icon: BookOpen,
                  img: "/2026-04-15-10-40-00-12-week-syllabus-planner.webp",
                  eyebrow: "Within 24 hours",
                  title: "Written growth plan",
                  body: "You get a personalised report on strengths, gaps, and a recommended 15-day track.",
                  accent: "from-amber-500 to-amber-600",
                  ring: "ring-amber-100",
                },
                {
                  icon: CalendarCheck,
                  img: "/2026-04-15-10-02-00-foundation-protocol.webp",
                  eyebrow: "Only if you want",
                  title: "Enrol on the right track",
                  body: "Zero pressure. If the chemistry isn't right, we'll say so first — and point you elsewhere.",
                  accent: "from-violet-500 to-violet-600",
                  ring: "ring-violet-100",
                },
              ].map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow ring-1 ${step.ring}`}
                >
                  {/* Thumbnail */}
                  <div className="aspect-[5/3] overflow-hidden bg-slate-100 relative">
                    <img
                      src={step.img}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} mix-blend-multiply opacity-30`} aria-hidden="true" />
                    <span className={`absolute top-3 left-3 size-9 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md`}>
                      <step.icon className="size-[18px] text-slate-700" aria-hidden="true" />
                    </span>
                    <span className="absolute top-3 right-3 size-7 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[11px] font-extrabold text-slate-800 shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <div className="p-4 md:p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest-gs text-slate-500 mb-1">{step.eyebrow}</p>
                    <h3 className="text-[15px] font-extrabold text-slate-900 leading-snug mb-1.5">{step.title}</h3>
                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{step.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            QUICK PREP CHECKLIST
            ═══════════════════════════════════════════════ */}
        <section className="pb-10 md:pb-16">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-[240px] h-[240px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

              <div className="relative grid md:grid-cols-[1fr_1fr] gap-6 md:gap-10 items-center">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest-gs text-blue-300 mb-2">Quick prep — 2 minutes</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs text-white leading-tight mb-4">
                    Make your demo count.
                  </h2>
                  <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed mb-5">
                    Kids who prep a little get 2× more out of the evaluation. Four things to have ready:
                  </p>

                  <ul className="space-y-3">
                    {[
                      "A laptop or tablet with a working camera and mic",
                      "A quiet 20 minutes when your child is fresh, not tired",
                      "Optional: a physical board nearby — some kids focus better with one",
                      "Any past tournament or rating details, if applicable",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm md:text-[15px] text-slate-100 font-medium leading-relaxed">
                        <span className="size-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="size-3.5 text-emerald-300" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="/2026-04-15-10-31-00-chess-study-desk-overhead.webp"
                    alt="A tidy chess study desk with a board, notebook, and laptop — what we recommend setting up for the demo."
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-transparent to-transparent" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SOCIAL PROOF — real parent photos
            ═══════════════════════════════════════════════ */}
        <section className="pb-10 md:pb-16">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <p className="text-[11px] md:text-xs font-extrabold uppercase tracking-widest-gs text-slate-500 mb-2">You're in good company</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter-gs text-slate-900">2,400+ Indian parents have taken this same step</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  img: "/review-anjana.webp",
                  name: "Anjana P.",
                  city: "Bengaluru",
                  quote: "Aarush went from distracted on weekends to solving tactics before dinner. The coach saw things I couldn't put into words.",
                },
                {
                  img: "/review-monika.webp",
                  name: "Monika R.",
                  city: "Pune",
                  quote: "What I loved most: nobody sold me anything on the first call. They told me what my daughter needed and left the choice to me.",
                },
                {
                  img: "/review-rupali.webp",
                  name: "Rupali S.",
                  city: "Mumbai",
                  quote: "+180 Elo in 3 months. But honestly, the bigger win was his patience. Same kid who couldn't sit for homework now plays 40-min games.",
                },
              ].map((t, i) => (
                <motion.figure
                  key={t.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3 text-amber-500" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="size-4 fill-amber-500 stroke-amber-500" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[14px] md:text-[15px] text-slate-700 font-medium leading-relaxed flex-1 mb-4">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={`${t.name}, parent from ${t.city}`}
                      className="size-10 rounded-full object-cover border-2 border-white shadow-sm"
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 leading-tight">{t.name}</p>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest-gs">{t.city}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            TRUST BADGES
            ═══════════════════════════════════════════════ */}
        <section className="pb-12 md:pb-20">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <Shield className="size-6 text-emerald-600 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[13px] md:text-sm font-extrabold text-emerald-900">Refund on unused sessions</p>
                  <p className="text-[11px] md:text-xs text-emerald-700 font-medium">Cancel any time — unused money is refunded.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <Trophy className="size-6 text-blue-600 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[13px] md:text-sm font-extrabold text-blue-900">+220 Elo avg. in 90 days</p>
                  <p className="text-[11px] md:text-xs text-blue-700 font-medium">Measured across the first cohort.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <Star className="size-6 text-amber-600 fill-amber-500 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[13px] md:text-sm font-extrabold text-amber-900">4.9 / 5 parent rating</p>
                  <p className="text-[11px] md:text-xs text-amber-700 font-medium">From 320+ verified parents.</p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs md:text-sm text-slate-500 font-medium mt-8 max-w-[520px] mx-auto">
              💡 <strong className="text-slate-700">Tip:</strong> Save <span className="font-bold text-slate-700">+91 84009 79997</span> to your contacts so Priya's WhatsApp message doesn't land in the Unknown folder.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-8 md:py-10 border-t border-slate-800 relative z-10">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/logo-side-white-v3.svg" alt="ChessWize" className="h-7 object-contain opacity-80" width={160} height={28} />
          <p className="text-[10px] font-bold uppercase tracking-widest-gs text-slate-600 text-center">
            © {new Date().getFullYear()} ChessWize · Think smart · Play wise
          </p>
        </div>
      </footer>
    </div>
  );
}
