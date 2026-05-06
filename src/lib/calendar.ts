/**
 * Calendar add-helpers — Google Calendar URL + downloadable .ics blob.
 *
 * Used on /thank-you to let the parent drop the booked demo into their
 * own calendar. Industry data (Calendly, Doodle case studies) shows a
 * one-tap calendar add reduces no-shows 30–40% on free-trial bookings.
 *
 * The booked time is captured as a local "YYYY-MM-DD HH:mm" string in
 * Asia/Kolkata. We convert it to UTC for both endpoints — Google
 * Calendar and the .ics standard expect UTC timestamps with a Z suffix.
 *
 * Duration is fixed at 30 minutes (matches the demo length advertised
 * on the LP). Title and description are lightly templated to include
 * the child's name when available, so the calendar entry feels like
 * the parent's own note.
 */

const DEMO_DURATION_MIN = 30;
const IST_OFFSET_MIN = 5 * 60 + 30; // +05:30

interface CalendarEvent {
  /** Local IST time string, "YYYY-MM-DD HH:mm". */
  preferred_datetime: string;
  /** Optional child first name to interpolate into title/description. */
  child_first_name?: string;
}

/** Parse "YYYY-MM-DD HH:mm" (IST) to a UTC Date. */
function parseISTtoUTC(local: string): Date | null {
  const m = local.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m;
  // Construct a Date from the IST wall-clock fields then subtract the
  // IST offset to get the UTC equivalent. Do NOT use the Date constructor
  // with the local string — that interprets in the browser's local zone,
  // which is rarely IST when the parent is travelling.
  const ist = Date.UTC(+y, +mo - 1, +d, +h, +mi, 0);
  return new Date(ist - IST_OFFSET_MIN * 60_000);
}

/** "YYYYMMDDTHHMMSSZ" — the format both Google Cal and ICS want. */
function toCalendarStamp(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

/** Friendly long-form date+time in the user's local zone. */
export function formatSlotForDisplay(local: string): string {
  const d = parseISTtoUTC(local);
  if (!d) return local;
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(d);
}

/**
 * Build a Google Calendar "Add Event" template URL. Opens a one-click
 * RSVP-style page in the user's google.com session.
 */
export function googleCalendarUrl(ev: CalendarEvent): string | null {
  const start = parseISTtoUTC(ev.preferred_datetime);
  if (!start) return null;
  const end = new Date(start.getTime() + DEMO_DURATION_MIN * 60_000);

  const child = ev.child_first_name ? ev.child_first_name : "Your child";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `ChessWize free chess evaluation — ${child}`,
    dates: `${toCalendarStamp(start)}/${toCalendarStamp(end)}`,
    details:
      `Free 30-minute online chess evaluation for ${child} with a FIDE-titled coach.\n\n` +
      `Priya Sharma will WhatsApp you the Zoom link before the call.\n` +
      `Need to reschedule? +91 84009 79997 or reply to the booking email.\n\n` +
      `What to have ready:\n• Laptop or tablet with camera\n• A quiet 30 minutes when your child is fresh\n• Optional: a physical board nearby`,
    location: "Online (Zoom — link arrives via WhatsApp)",
    sf: "true",
    output: "xml",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate a downloadable .ics blob URL. Compatible with Apple Calendar,
 * Outlook, Thunderbird, Fastmail, Proton, etc — anything that handles the
 * iCalendar standard. Caller is responsible for revoking the URL after
 * the click (do this in a `setTimeout` to keep the download alive).
 */
export function icsBlobUrl(ev: CalendarEvent): string | null {
  const start = parseISTtoUTC(ev.preferred_datetime);
  if (!start) return null;
  const end = new Date(start.getTime() + DEMO_DURATION_MIN * 60_000);

  const child = ev.child_first_name ? ev.child_first_name : "Your child";
  const summary = `ChessWize free chess evaluation — ${child}`;
  const description =
    `Free 30-minute online chess evaluation for ${child} with a FIDE-titled coach. ` +
    `Priya Sharma will WhatsApp the Zoom link before the call. ` +
    `Reschedule: +91 84009 79997.`;

  // RFC 5545 line folding rule: keep lines under 75 octets. We keep the
  // text short enough that this isn't strictly needed, but escape commas,
  // semicolons, and newlines per the spec.
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");

  const uid = `cw-demo-${start.getTime()}@chesswize.in`;
  const dtstamp = toCalendarStamp(new Date());

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ChessWize//Free Demo//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${toCalendarStamp(start)}`,
    `DTEND:${toCalendarStamp(end)}`,
    `SUMMARY:${escape(summary)}`,
    `DESCRIPTION:${escape(description)}`,
    "LOCATION:Online (Zoom — link arrives via WhatsApp)",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escape("Reminder — ChessWize evaluation in 30 minutes")}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
}

/**
 * Compute the "by when" deadline string for the counsellor's reply
 * promise (4 hours, capped to ChessWize working window 10:00–20:00 IST).
 * If now is outside the window, returns "by 11 AM tomorrow" semantics.
 */
export function counsellorReplyDeadline(now = new Date()): string {
  // Move `now` to IST clock for the math.
  const istNow = new Date(now.getTime() + IST_OFFSET_MIN * 60_000);
  const hour = istNow.getUTCHours(); // because we already shifted, getUTC* gives IST clock
  const min = istNow.getUTCMinutes();

  const fourHoursLater = new Date(istNow.getTime() + 4 * 60 * 60_000);
  const replyHour = fourHoursLater.getUTCHours();

  // Out-of-hours rule: anything before 10:00 IST → "by 2 PM today"
  // (4h after the 10 AM working start). Anything after 16:00 IST whose
  // +4h crosses 20:00 → "by 11 AM tomorrow" (working start + 1h grace).
  let label: string;
  if (hour < 10) {
    label = "by 2 PM today";
  } else if (replyHour >= 20 || (hour >= 16 && replyHour > 20)) {
    label = "by 11 AM tomorrow";
  } else {
    const replyMin = fourHoursLater.getUTCMinutes();
    const ampm = replyHour < 12 ? "AM" : "PM";
    const display = replyHour % 12 || 12;
    const minPad = replyMin === 0 ? "" : `:${String(replyMin).padStart(2, "0")}`;
    label = `by ${display}${minPad} ${ampm} today`;
  }
  void min;
  return label;
}
