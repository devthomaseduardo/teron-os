// Lightweight client-side analytics for landing conversion events.
// Emits to window.dataLayer (GTM/GA-friendly), dispatches a CustomEvent,
// and logs in dev — no external SDK required.

export type TrackEvent =
  | "cta_click"
  | "demo_dialog_open"
  | "demo_form_submit"
  | "demo_form_success"
  | "demo_form_error"
  | "section_view"
  | "faq_open"
  | "faq_search";

export type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    teronTrack?: (event: TrackEvent, props?: TrackProps) => void;
  }
}

export function track(event: TrackEvent, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    event: `teron_${event}`,
    ts: Date.now(),
    path: window.location.pathname,
    ...props,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("teron:track", { detail: payload }));
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[track]", payload);
  }
}

// Attach a global helper for quick testing from the console.
if (typeof window !== "undefined") {
  window.teronTrack = track;
}