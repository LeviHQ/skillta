import { useEffect, useRef } from "react";

const AD_KEY = "60755eda0a41ea29dfd0ba6b7f935205";
const AD_SRC = `https://pl30370123.effectivecpmnetwork.com/${AD_KEY}/invoke.js`;
const CONTAINER_ID = `container-${AD_KEY}`;

/**
 * Adsterra Native Banner.
 *
 * Adsterra's invoke.js looks for a single DOM element with the fixed id
 * `container-<key>` and injects its ad markup into it. Because the id must be
 * unique per page, we render this component AT MOST ONCE per route.
 *
 * The script is loaded a single time globally and cached; on subsequent mounts
 * (SPA navigation) we re-invoke the script so the ad renders in the fresh
 * container. Re-renders of the same mount (e.g. quiz question changes) do NOT
 * touch the container or the script.
 */
export default function AdsterraNativeBanner({ className = "" }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // Ensure the container exists inside our wrapper.
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
      container = document.createElement("div");
      container.id = CONTAINER_ID;
      wrapperRef.current.appendChild(container);
    } else if (container.parentElement !== wrapperRef.current) {
      // Move existing container into current wrapper (e.g. after SPA nav).
      wrapperRef.current.appendChild(container);
    }

    // Inject the script. Adsterra's invoke.js runs on load and populates the
    // container element. We (re)append it on each mount so the ad refreshes
    // for the new page context, but not on inner re-renders.
    const script = document.createElement("script");
    script.src = AD_SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);

    return () => {
      // Clean up: remove the script tag we added. Leave the container alone
      // so React can unmount it naturally with the wrapper.
      script.remove();
    };
  }, []);

  return (
    <div className={`w-full my-8 flex justify-center ${className}`}>
      <div className="w-full max-w-3xl px-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 text-center">
          Sponsored
        </p>
        <div
          ref={wrapperRef}
          className="w-full overflow-hidden rounded-xl border border-border/60 bg-card/30 p-3 min-h-[100px]"
        />
      </div>
    </div>
  );
}
