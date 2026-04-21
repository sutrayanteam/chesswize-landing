import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Clock, MessageCircle, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouteMeta } from "@/src/lib/useRouteMeta";
import { trackLead } from "@/src/lib/tracking";
import { buildWhatsAppHref, onWhatsAppClick } from "@/src/lib/whatsapp";

/**
 * /thank-you — Lead conversion page.
 *
 * URL contract: fired with `?eid=<uuid>` from BottomForm on successful submit.
 * Worker generates the event_id; browser re-uses it here so Meta deduplicates
 * the fbq Lead and the CAPI Lead into one event.
 *
 * Refresh-safe: dedup key in sessionStorage prevents the Lead fbq from firing
 * twice if the user refreshes or taps back+forward.
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
    if (!eid) return;
    const key = `cw_lead_fired_${eid}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* ignore — still safe to fire once */
    }
    trackLead(eid);
  }, [eid]);

  const waHref = buildWhatsAppHref({
    source: "thank_you_page",
    text: "Hi, I just booked a free demo on chesswize.in. Looking forward to hearing from you.",
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <header className="gs-glass py-4 border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo-side-black-v2.svg" alt="ChessWize" className="h-8 object-contain" width={180} height={32} />
          </Link>
          <Link to="/">
            <Button variant="outline" className="gs-btn gs-btn-white text-xs font-bold rounded-xl h-9 px-4">
              <ArrowLeft className="size-3.5 mr-1.5" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main id="main-content" role="main" className="flex-1 py-16 md:py-24 relative z-10">
        <div className="max-w-[720px] mx-auto px-4 md:px-8">
          <div className="glass-panel p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/60 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />

            <div className="size-20 mx-auto mb-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-10 text-emerald-600" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <p className="text-[10px] md:text-xs font-bold text-emerald-600 uppercase tracking-widest-gs mb-2 md:mb-3">Your demo request is in</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-4 leading-tight">
              Thank you. Priya is on it.
            </h1>
            <p className="text-base md:text-lg text-slate-600 font-medium max-w-lg mx-auto leading-relaxed mb-8">
              Your application is with our academic counsellor. She&rsquo;ll reach you on WhatsApp within <span className="font-extrabold text-slate-900">10 minutes</span> during office hours (10 AM – 8 PM IST) to confirm your child&rsquo;s 50-minute demo slot.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-8">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Clock className="size-5 text-blue-600 mb-2" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest-gs mb-1">Step 1</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">We WhatsApp you to confirm the slot</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <CalendarCheck className="size-5 text-blue-600 mb-2" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest-gs mb-1">Step 2</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">50-min 1-on-1 demo with a FIDE-rated coach</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <MessageCircle className="size-5 text-blue-600 mb-2" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest-gs mb-1">Step 3</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">Written report within 24 hours</p>
              </div>
            </div>

            <a
              href={waHref}
              onClick={onWhatsAppClick("thank_you_page")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg transition-all active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Open WhatsApp chat with Priya
            </a>
            <p className="text-xs text-slate-500 font-medium mt-4">
              Or message us directly at <a href="tel:+917007578072" className="font-bold text-slate-700 underline hover:text-blue-600">+91 70075 78072</a>
            </p>
          </div>

          <p className="text-center text-[11px] text-slate-500 font-medium mt-8 max-w-md mx-auto">
            Tip: add Priya&rsquo;s number to your contacts so her WhatsApp message doesn&rsquo;t land in the Unknown folder.
          </p>
        </div>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 relative z-10">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/logo-side-white-v3.svg" alt="ChessWize" className="h-7 object-contain opacity-80" width={160} height={28} />
          <p className="text-[10px] font-bold uppercase tracking-widest-gs text-slate-600">
            © {new Date().getFullYear()} ChessWize · Think smart · Play wise
          </p>
        </div>
      </footer>
    </div>
  );
}
