import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/src/lib/useDocumentTitle";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100/40 via-transparent to-transparent pointer-events-none" />

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

      <main className="flex-1 py-16 md:py-24 relative z-10">
        <div className="max-w-[800px] mx-auto px-4 md:px-8">
          <div className="glass-panel p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl mb-12 border border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter-gs text-slate-900 mb-8">{title}</h1>
            <div className="prose prose-slate prose-blue max-w-none prose-headings:font-extrabold prose-headings:tracking-tight-gs prose-p:font-medium prose-p:leading-relaxed prose-a:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700">
              {children}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/logo-side-white-v3.svg" alt="ChessWize" className="h-8 object-contain opacity-80" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold tracking-tight-gs">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refunds</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookies</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest-gs text-slate-600">
            © {new Date().getFullYear()} ChessWize. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PrivacyPolicy() {
  useDocumentTitle("Privacy Policy — ChessWize");
  return (
    <LegalLayout title="Privacy Policy">
      <p>Last updated: April 15, 2026</p>
      <p>ChessWize ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, share, and safeguard personal information when you visit <strong>chesswize.in</strong> (the "Site"), interact with our advertisements on third-party platforms, or use our online chess coaching services (the "Services").</p>
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
      <p>To exercise any of these rights, email us at <strong>hello@chesswize.in</strong> with the subject line "Privacy Request".</p>

      <h3>9. International Data Transfers</h3>
      <p>Our servers and service providers may be located outside India. By using our Services, you consent to the transfer of your data to jurisdictions that may have different data protection laws. We ensure appropriate safeguards are in place for such transfers.</p>

      <h3>10. Changes to This Policy</h3>
      <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on our Site. Continued use after changes constitutes acceptance.</p>

      <h3>11. Contact Us</h3>
      <p>For privacy-related enquiries:</p>
      <ul>
        <li><strong>Email:</strong> hello@chesswize.in</li>
        <li><strong>Phone:</strong> +91-70075-78072</li>
        <li><strong>Address:</strong> Kanpur, Uttar Pradesh, India</li>
      </ul>
    </LegalLayout>
  );
}

export function TermsOfService() {
  useDocumentTitle("Terms of Service — ChessWize");
  return (
    <LegalLayout title="Terms of Service">
      <p>Last updated: April 15, 2026</p>
      <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("you", "your", or "Parent/Guardian") and ChessWize ("we", "us", "our", or "ChessWize"). By accessing <strong>chesswize.in</strong> or enrolling in any of our programs, you agree to these Terms in full.</p>

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
        <li><strong>Email:</strong> hello@chesswize.in</li>
        <li><strong>Phone:</strong> +91-70075-78072</li>
      </ul>
    </LegalLayout>
  );
}

export function RefundPolicy() {
  useDocumentTitle("Refund Policy — ChessWize");
  return (
    <LegalLayout title="Refund Policy">
      <p>Last updated: April 15, 2026</p>
      <p>At ChessWize, we are confident in the quality of our coaching. This Refund Policy outlines the conditions under which refunds, cancellations, and rescheduling are handled.</p>

      <h3>1. 30-Day Cognitive Growth Guarantee</h3>
      <p>We stand behind our methodology with a results-backed guarantee. If you are not satisfied with the measurable progress your child has made within the first 30 calendar days of beginning a paid program, you are eligible for a <strong>full refund</strong> of your initial month's tuition, subject to the following conditions:</p>
      <ul>
        <li>The student must have attended all scheduled sessions during the 30-day period.</li>
        <li>The refund request must be submitted in writing to <strong>hello@chesswize.in</strong> within 7 days of the 30-day period ending.</li>
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
        <li>You may cancel your monthly subscription at any time by emailing <strong>hello@chesswize.in</strong> or contacting us via WhatsApp.</li>
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
      <p><strong>Email:</strong> hello@chesswize.in | <strong>Phone/WhatsApp:</strong> +91-70075-78072</p>
    </LegalLayout>
  );
}

export function CookiePolicy() {
  useDocumentTitle("Cookie Policy — ChessWize");
  return (
    <LegalLayout title="Cookie Policy">
      <p>Last updated: April 15, 2026</p>
      <p>This Cookie Policy explains how ChessWize uses cookies and similar tracking technologies when you visit <strong>chesswize.in</strong>. It should be read alongside our <Link to="/privacy-policy"><strong>Privacy Policy</strong></Link>.</p>

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
      <p>For questions about our use of cookies, contact us at <strong>hello@chesswize.in</strong>.</p>
    </LegalLayout>
  );
}

export function Disclaimer() {
  useDocumentTitle("Disclaimer — ChessWize");
  return (
    <LegalLayout title="Disclaimer">
      <p>Last updated: April 15, 2026</p>
      <p>The information provided on <strong>chesswize.in</strong> (the "Site") and through ChessWize's coaching services is for general educational and informational purposes only. By using our Site and Services, you acknowledge and agree to the following.</p>

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
      <p>If you have questions about this Disclaimer, please contact us at <strong>hello@chesswize.in</strong>.</p>
    </LegalLayout>
  );
}
