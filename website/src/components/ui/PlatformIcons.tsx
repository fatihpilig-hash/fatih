import Image from "next/image";

const platforms = [
  { name: "Meta", src: "/platform-icons/icon-meta.png" },
  { name: "Facebook", src: "/platform-icons/icon-facebook.png" },
  { name: "Instagram", src: "/platform-icons/icon-instagram.png" },
  { name: "TikTok", src: "/platform-icons/icon-tiktok.png" },
  { name: "YouTube", src: "/platform-icons/icon-youtube.png" },
  { name: "LinkedIn", src: "/platform-icons/icon-linkedin.png" },
];

export function PlatformIcons() {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {platforms.map(({ name, src }) => (
        <Image
          key={name}
          src={src}
          alt={name}
          width={128}
          height={128}
          className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
        />
      ))}
    </div>
  );
}
