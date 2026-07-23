export const ABOUT_EVENT = "open-about";

/** Open the About slide-over from anywhere (nav, footer). */
export function openAbout() {
  window.dispatchEvent(new Event(ABOUT_EVENT));
}

/**
 * Proof points. Shared by the Manifesto stat switcher and the About drawer so
 * the numbers can never drift apart.
 *
 * Keep these literally true — they are the first thing a sceptical visitor
 * checks, and an inflated number is worse than a small one.
 */
export const STATS = [
  {
    num: "04",
    label: "Client projects shipped end to end — LeadPing, Align, RightFuture, Metalab",
  },
  {
    num: "RBC",
    label: "Two engineering internships — data & strategy, then full stack",
  },
  {
    num: "100%",
    label: "Founder-led — you work directly with me, start to finish",
  },
] as const;

/** Lead paragraph first, then supporting body copy. */
export const ABOUT_BIO = [
  "Hey, I'm Troy — a designer and developer in Toronto. I studied Computer Science and Business at Brock University and graduated in October 2025.",
  "Before that I interned at RBC twice: first as a Data & Strategy Engineer, then as a Full Stack Engineer. Two halves of the same job — reading what the numbers are actually saying, and shipping software that holds up in production.",
  "I've been freelancing since 2025. I take on a small number of clients at a time and run the whole thing myself — strategy, design, build, launch — so what you approve is what goes live.",
] as const;

export const ABOUT_META = [
  { label: "Est", value: "2025" },
  { label: "Based", value: "Toronto" },
  { label: "Focus", value: "Design · Build · Ship" },
] as const;

export const ABOUT_LINKS = [
  { label: "Email", href: "mailto:troybello25@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/troybello/" },
  { label: "GitHub", href: "https://github.com/troybllo" },
  { label: "Fiverr", href: "https://www.fiverr.com/troybello/build-a-full-stack-saas-web-application-for-your-business" },
] as const;

export const ABOUT_AVAILABILITY = "Booking projects for Q4 '26";
