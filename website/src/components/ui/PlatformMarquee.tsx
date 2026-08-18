import Image from "next/image";

const platforms = [
  { name: "Meta", src: "/platform-icons/icon-meta.png" },
  { name: "Instagram", src: "/platform-icons/icon-instagram.png" },
  { name: "Facebook", src: "/platform-icons/icon-facebook.png" },
  { name: "TikTok", src: "/platform-icons/icon-tiktok.png" },
  { name: "YouTube", src: "/platform-icons/icon-youtube.png" },
  { name: "LinkedIn", src: "/platform-icons/icon-linkedin.png" },
];

// Rendered twice back-to-back so the track can loop seamlessly at -50%.
const loopedPlatforms = [...platforms, ...platforms];

export function PlatformMarquee() {
  return (
    <div aria-hidden className="marquee-mask relative overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-10">
        {loopedPlatforms.map(({ name, src }, index) => (
          <Image
            key={`${name}-${index}`}
            src={src}
            alt=""
            width={128}
            height={128}
            className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
          />
        ))}
      </div>
    </div>
  );
}
