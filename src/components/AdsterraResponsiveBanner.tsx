import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
 * - 728x90 on >=768px
 * - 320x50 on <768px
 * Loads invoke.js inside an isolated container per mount to prevent
 * duplicate ads and clean up on unmount / route change.
 */
export default function AdsterraResponsiveBanner({ className = "" }: { className?: string }) {
  const isMobile = useIsMobile();
  const hostRef = useRef<HTMLDivElement>(null);
  const cfg = isMobile ? MOBILE : DESKTOP;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Reset container
    host.innerHTML = "";

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `atOptions = { 'key' : '${cfg.key}', 'format' : 'iframe', 'height' : ${cfg.height}, 'width' : ${cfg.width}, 'params' : {} };`;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `https://www.highperformanceformat.com/${cfg.key}/invoke.js`;
    invokeScript.async = true;

    host.appendChild(configScript);
    host.appendChild(invokeScript);

    return () => {
      host.innerHTML = "";
    };
  }, [cfg.key, cfg.width, cfg.height]);

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
      />
    </div>
  );
}
