import { useState } from "react";
import { Download, Linkedin, Loader2, Share2 } from "lucide-react";
import { toBlob } from "html-to-image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BadgeShareActionsProps {
  badgeElement: HTMLDivElement | null;
  fileName: string;
  shareText: string;
}

async function renderBadge(element: HTMLDivElement) {
  await document.fonts?.ready;
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map(async (image) => {
      if (image.complete) return image.decode?.().catch(() => undefined);
      await new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
    const blob = await toBlob(element, {
    pixelRatio: 3,
    width: 380,
    height: 380,
    canvasWidth: 1080,
    canvasHeight: 1080,
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
      
      // 1. Badge image auto-download karein
      downloadBlob(blob, fileName);

      // 2. Image ko clipboard me copy karein (taaki user direct Ctrl+V ya Paste kar sake)
      let copiedToClipboard = false;
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob }),
          ]);
          copiedToClipboard = true;
        }
      } catch {
        // Clipboard write fallback: text copy kar dega agar image format clipboard me restrict ho
        await navigator.clipboard?.writeText(shareText).catch(() => undefined);
      }

      // 3. Platform URL open karein (LinkedIn ke liye new post feed prefill URL)
      const url =
        network === "x"
          ? `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`
          : `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
      
      window.open(url, "_blank", "noopener,noreferrer");

      // 4. User ko popup toast notification dikhayein
      if (copiedToClipboard) {
        toast.success("Badge copied to clipboard & downloaded!", {
          description: "Just press Ctrl+V (or Paste) in your post to attach the badge image.",
          duration: 6000,
        });
      } else {
        toast.info("Badge image downloaded!", {
          description: "Attach the downloaded image file to your post.",
          duration: 6000,
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Could not prepare badge image.");
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