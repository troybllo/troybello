export const ABOUT_EVENT = "open-about";

/** Open the About slide-over from anywhere (nav, footer). */
export function openAbout() {
  window.dispatchEvent(new Event(ABOUT_EVENT));
}
