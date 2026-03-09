import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Store the event for later use
      setDeferredPrompt(event);
      setIsInstallable(true);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to install prompt: ${outcome}`);
    // Clear the deferredPrompt for the next time.
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-background border border-border rounded-lg shadow-lg p-4 z-50 flex items-center gap-3">
      <img src={logo} alt="SkillTa" className="w-12 h-12 rounded-lg flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground">
          Install SkillTa
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Add to your home screen for quick access
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsVisible(false)}
          className="h-8 px-2"
        >
          <X className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={handleInstall}
          className="h-8 px-3 gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Install</span>
        </Button>
      </div>
    </div>
  );
}
