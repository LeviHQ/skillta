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
 * - 728x90 on >=768px
 * - 320x50 on <768px
 * Loads invoke.js inside an isolated container per mount to prevent
 * duplicate ads and clean up on unmount / route change.
 */
export default function AdsterraResponsiveBanner({ className = "" }: { className?: string }) {
  const { adsAllowed } = usePlan();
  const isMobile = useIsMobile();
  const cfg = isMobile ? MOBILE : DESKTOP;
  if (!adsAllowed) return null;

  return (
    <div
      className={`w-full flex justify-center my-7 md:my-8 overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <iframe
        key={cfg.key}
        title="Sponsored banner"
        width={cfg.width}
        height={cfg.height}
        className="max-w-full border-0 shrink-0"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="strict-origin-when-cross-origin"
        srcDoc={`<!doctype html><html><head><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body><script>var atOptions={key:'${cfg.key}',format:'iframe',height:${cfg.height},width:${cfg.width},params:{}};</script><script async data-cfasync="false" src="https://www.highperformanceformat.com/${cfg.key}/invoke.js"></script></body></html>`}
      />
    </div>
  );
}
