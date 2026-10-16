import { useLayoutEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlan } from "@/contexts/PlanContext";

const DESKTOP = {
  key: "a42c2ea43dd437aedb9ba40f5951e8db",
  width: 728,
  height: 90,
};

const MOBILE = {
  key: "5f4b601eb578235607f2ac7582fc0a8c",
  width: 320,
  height: 50,
};

/**
 * Adsterra Responsive Banner
 * - 728x90 on >=768px (Desktop)
 * - 320x50 on <768px (Mobile)
 * Loads invoke.js directly in a managed DOM host container so Adsterra
 * verifies the skillta.tech origin and fills the ad.
 * Cleans up cleanly on unmount / route changes.
 */
export default function AdsterraResponsiveBanner({ className = "" }: { className?: string }) {
  const { adsAllowed } = usePlan();
  const isMobile = useIsMobile();
  const hostRef = useRef<HTMLDivElement>(null);
  const cfg = isMobile ? MOBILE : DESKTOP;

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!adsAllowed || !host) return;

    // Container reset taaki duplicates na banein
    host.innerHTML = "";

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `atOptions = { 'key' : '${cfg.key}', 'format' : 'iframe', 'height' : ${cfg.height}, 'width' : ${cfg.width}, 'params' : {} };`;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `https://www.highperformanceformat.com/${cfg.key}/invoke.js`;
    invokeScript.async = true;
    invokeScript.setAttribute("data-cfasync", "false");

    host.appendChild(configScript);
    host.appendChild(invokeScript);

    return () => {
      host.innerHTML = "";
    };
  }, [adsAllowed, cfg.key, cfg.width, cfg.height]);

  if (!adsAllowed) return null;

  return (
    <div
      className={`w-full flex justify-center my-7 md:my-8 overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <div
        ref={hostRef}
        style={{
          width: `${cfg.width}px`,
          height: `${cfg.height}px`,
          maxWidth: "100%",
        }}
        className="flex justify-center items-center overflow-hidden shrink-0"
      />
    </div>
  );
}
