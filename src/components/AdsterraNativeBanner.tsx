import { useEffect, useRef } from "react";

const AD_KEY = "60755eda0a41ea29dfd0ba6b7f935205";
const AD_SRC = `https://pl30370123.effectivecpmnetwork.com/${AD_KEY}/invoke.js`;
const CONTAINER_ID = `container-${AD_KEY}`;

/**
 * Adsterra Native Banner (iframe-isolated).
 *
 * Adsterra's invoke.js targets a fixed element id (`container-<key>`). If we
 * render multiple instances on one page, `document.getElementById` returns
 * only the first match — so only one slot ever fills. To support multiple
 * ad placements on the same route we render each instance inside its own
 * srcdoc iframe. Each iframe has an isolated document, so the fixed id is
 * unique within that document and invoke.js populates every slot.
 */
export default function AdsterraNativeBanner({ className = "" }: { className?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const html = `<!doctype html><html><head><meta charset="utf-8" />
<meta name="color-scheme" content="dark" />
<style>
  html,body{margin:0;padding:0;width:100%;max-width:100%;background:transparent!important;color:inherit;font-family:ui-sans-serif,system-ui,sans-serif;overflow:hidden;scrollbar-width:none;color-scheme:dark;}
  body::-webkit-scrollbar{display:none;}
  #${CONTAINER_ID}{min-height:100px;width:100%;max-width:100%;overflow:hidden;background:transparent!important;}
  iframe{max-width:100%!important;background:transparent!important;}
  a{color:inherit;}
</style>
</head><body>
<script async data-cfasync="false" src="${AD_SRC}"></script>
<div id="${CONTAINER_ID}"></div>
<script>
  // Auto-resize the parent iframe to fit the injected ad content.
  function reportHeight(){
    try {
      var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      parent.postMessage({ __adsterraHeight: true, key: '${AD_KEY}', height: h }, '*');
    } catch(e){}
  }
  var mo = new MutationObserver(reportHeight);
  mo.observe(document.body, { childList: true, subtree: true, attributes: true });
  window.addEventListener('load', reportHeight);
  setInterval(reportHeight, 1500);
<\/script>
</body></html>`;

    iframe.srcdoc = html;

    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (data && data.__adsterraHeight && data.key === AD_KEY && iframeRef.current) {
        const h = Math.max(100, Math.min(600, Number(data.height) || 0));
        iframeRef.current.style.height = h + "px";
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className={`w-full my-8 flex justify-center ${className}`}>
      <div className="w-full max-w-3xl px-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 text-center">
          Sponsored
        </p>
        <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-card/30 p-3">
          <iframe
            ref={iframeRef}
            title="Sponsored content"
            className="w-full block"
            style={{ height: 120, border: 0, background: "transparent" }}
            scrolling="no"
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
