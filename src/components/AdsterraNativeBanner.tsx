import { useEffect, useRef } from "react";

const AD_KEY = "60755eda0a41ea29dfd0ba6b7f935205";
const AD_SRC = `https://pl30370123.effectivecpmnetwork.com/${AD_KEY}/invoke.js`;
const CONTAINER_ID = `container-${AD_KEY}`;

/**
 * Adsterra Native Banner — direct DOM injection (original behavior).
 * Renders the fixed container id the script expects and (re)loads invoke.js
 * on mount so the ad refreshes across SPA navigations.
 */
export default function AdsterraNativeBanner({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let timer: number | undefined;

    const inject = () => {
      // Ensure a fresh container each mount.
      host.innerHTML = `<div id="${CONTAINER_ID}"></div>`;

      const script = document.createElement("script");
      script.src = AD_SRC;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      host.appendChild(script);
    };

    // Load on every mount (no viewport gate) so every pageview counts as an
    // impression. A tiny idle/timeout delay keeps it off the LCP critical path.
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void, o?: object) => number })
        .requestIdleCallback;
    if (idle) idle(() => inject(), { timeout: 1200 } as object);
    else timer = window.setTimeout(inject, 400);

    return () => {
      if (timer) window.clearTimeout(timer);
      host.innerHTML = "";
    };
  }, []);

  return (
    <div className={`w-full my-8 flex justify-center ${className}`}>
      <div className="w-full max-w-3xl px-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 text-center">
          Sponsored
        </p>
        <div ref={hostRef} className="w-full" />
      </div>
    </div>
  );
}
