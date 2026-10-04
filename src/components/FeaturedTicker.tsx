interface DirectoryBadge {
  name: string;
  href: string;
  imgSrc: string;
  alt: string;
  width?: number;
  height?: number;
}

// Yahan bas apne badges add/update karte jao
const BADGES: DirectoryBadge[] = [
  {
    name: "Product Hunt",
    href: "https://www.producthunt.com/products/skillta?utm_source=badge-follow&utm_medium=badge&utm_source=badge-skillta",
    imgSrc: "https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1242760&theme=light",
    alt: "SkillTa on Product Hunt",
  },
  {
    name: "Uneed",
    href: "https://www.uneed.best/tool/skillta",
    imgSrc: "https://www.uneed.best/EMBED3.png",
    alt: "Launching Soon on Uneed",
  },
  {
    name: "Fazier",
    href: "https://fazier.com/launches/www.skillta.tech",
    imgSrc: "https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light",
    alt: "Featured on Fazier",
  },
  {
    name: "LaunchBuff",
    href: "https://launchbuff.com/products/skillta-dz3ysa",
    imgSrc: "https://launchbuff.com/badge-featured-light.svg",
    alt: "Featured on LaunchBuff",
  },
  {
    name: "LaunchNest",
    href: "https://launchnest.io/p/skillta",
    imgSrc: "https://launchnest.io/badge/skillta.svg?variant=featured&theme=light",
    alt: "Featured on LaunchNest",
  },
  {
    name: "Launchpadly",
    href: "https://launchpadly.co/startup/skillta?ref=badge",
    imgSrc: "https://launchpadly.co/embed/badges/startup/skillta.svg?variant=light",
    alt: "Featured on Launchpadly",
  },
];

export function FeaturedTicker() {
  // Badges array ko repeat kiya hai continuous seamless infinite scroll ke liye
  const displayBadges = [...BADGES, ...BADGES, ...BADGES];

  return (
    <div className="mx-auto mt-6 mb-10 w-full max-w-4xl overflow-hidden px-4">
      {/* Header with glowing dots */}
      <div className="mb-4 flex items-center justify-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground">
          Featured & Listed On
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      </div>

      {/* Marquee viewport with gradient blur fades */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left Blur Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
        
        {/* Right Blur Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />

        {/* Scrolling track */}
        <div className="animate-ticker flex items-center gap-6 sm:gap-8">
          {displayBadges.map((badge, idx) => (
            <a
              key={`${badge.name}-${idx}`}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center transition-all duration-200 hover:scale-105 hover:opacity-100 opacity-90"
            >
              <img
                src={badge.imgSrc}
                alt={badge.alt}
                className="h-10 sm:h-11 w-auto max-w-[220px] object-contain drop-shadow-xs"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}