import { lazy, Suspense, useEffect, useState } from "react";

const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
);
const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((m) => ({ default: m.SpeedInsights })),
);
const SaathiChatbot = lazy(() => import("./SaathiChatbot"));
const KofiButton = lazy(() => import("./KofiButton"));

/**
 * Non-critical client widgets & telemetry.
 * Mounted after the page is interactive/idle so they never compete
 * with the LCP paint or the first interaction.
 */
export default function DeferredThirdParty() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      const idle =
        (window as unknown as { requestIdleCallback?: (cb: () => void, o?: object) => number })
          .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
      idle(() => {
        if (!cancelled) setReady(true);
      }, { timeout: 3000 } as object);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <SaathiChatbot />
      <KofiButton />
      <Analytics />
      <SpeedInsights />
    </Suspense>
  );
}
