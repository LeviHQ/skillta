import { ReactNode, Suspense, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  /** Distance before viewport at which the section starts loading */
  rootMargin?: string;
  /** Reserved min-height while not yet mounted (prevents CLS) */
  minHeight?: number;
  className?: string;
}

/**
 * Mounts children only when they approach the viewport.
 * Keeps below-the-fold JS (and its chunks) off the critical path
 * without introducing layout shift — the placeholder reserves height.
 */
export default function DeferredSection({
  children,
  rootMargin = "600px",
  minHeight = 320,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} className={className} style={show ? undefined : { minHeight }}>
      {show ? <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense> : null}
    </div>
  );
}
