import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";
  const nextTheme = isLight ? "dark" : "light";
  const label = `Switch to ${nextTheme} mode`;

  const toggleTheme = () => {
    setTheme(nextTheme);
    const themeColor = nextTheme === "light" ? "#f7f9fc" : "#0e1117";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={label}
          className="h-9 w-9 shrink-0 border border-border/70 bg-background/50 text-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          {isLight ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}