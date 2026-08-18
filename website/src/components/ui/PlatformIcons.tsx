import Image from "next/image";

const platforms = [
  { name: "Meta", src: "/platform-icons/icon-meta.png" },
  { name: "Facebook", src: "/platform-icons/icon-facebook.png" },
  { name: "Instagram", src: "/platform-icons/icon-instagram.png" },
  { name: "TikTok", src: "/platform-icons/icon-tiktok.png" },
  { name: "YouTube", src: "/platform-icons/icon-youtube.png" },
  { name: "LinkedIn", src: "/platform-icons/icon-linkedin.png" },
];

// Rendered twice back-to-back so the track can loop seamlessly at -50%.
const loopedPlatforms = [...platforms, ...platforms];

export function PlatformIcons() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
        Wir arbeiten mit:
      </p>
      <div aria-hidden className="marquee-mask w-56 overflow-hidden sm:w-72">
        <div className="marquee-track flex w-max items-center gap-4 sm:gap-6">
          {loopedPlatforms.map(({ name, src }, index) => (
            <Image
              key={`${name}-${index}`}
              src={src}
              alt=""
              width={128}
              height={128}
              className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
