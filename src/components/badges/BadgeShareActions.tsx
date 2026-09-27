import { useState } from "react";
import { Download, Linkedin, Loader2, Share2 } from "lucide-react";
import { toBlob } from "html-to-image";
import { Button } from "@/components/ui/button";

interface BadgeShareActionsProps {
  badgeElement: HTMLDivElement | null;
  fileName: string;
  shareText: string;
}

async function renderBadge(element: HTMLDivElement) {
  const blob = await toBlob(element, {
    pixelRatio: 3,
    cacheBust: true,
    backgroundColor: "hsl(220 24% 6%)",
  });
  if (!blob) throw new Error("Could not create badge image.");
  return blob;
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function BadgeShareActions({ badgeElement, fileName, shareText }: BadgeShareActionsProps) {
  const [working, setWorking] = useState<string | null>(null);

  const createImage = async () => {
    if (!badgeElement) throw new Error("Badge is still loading.");
    return renderBadge(badgeElement);
  };

  const download = async () => {
    setWorking("download");
    try {
      downloadBlob(await createImage(), fileName);
    } finally {
      setWorking(null);
    }
  };

  const nativeShare = async () => {
    setWorking("share");
    try {
      const blob = await createImage();
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: "My SkillTa achievement", text: shareText, files: [file] });
      } else {
        downloadBlob(blob, fileName);
      }
    } catch (error) {
      if ((error as DOMException)?.name !== "AbortError") console.error("Badge sharing failed", error);
    } finally {
      setWorking(null);
    }
  };

  const shareTo = async (network: "x" | "linkedin") => {
    setWorking(network);
    try {
      const blob = await createImage();
      downloadBlob(blob, fileName);
      await navigator.clipboard?.writeText(shareText).catch(() => undefined);
      const url = network === "x"
        ? `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://skillta.tech")}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setWorking(null);
    }
  };

  const icon = (key: string, fallback: React.ReactNode) =>
    working === key ? <Loader2 className="animate-spin" /> : fallback;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button onClick={nativeShare} disabled={!!working}>
        {icon("share", <Share2 />)} Share
      </Button>
      <Button variant="outline" onClick={() => shareTo("x")} disabled={!!working}>
        {icon("x", <span className="text-base font-bold">𝕏</span>)} X
      </Button>
      <Button variant="outline" onClick={() => shareTo("linkedin")} disabled={!!working}>
        {icon("linkedin", <Linkedin />)} LinkedIn
      </Button>
      <Button variant="secondary" size="icon" onClick={download} disabled={!!working} title="Download PNG" aria-label="Download badge as PNG">
        {icon("download", <Download />)}
      </Button>
    </div>
  );
}