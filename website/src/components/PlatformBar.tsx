import Image from "next/image";
import { Container } from "@/components/ui/Container";

const platforms = [
  { name: "Meta", src: "/platform-icons/icon-meta.png" },
  { name: "Instagram", src: "/platform-icons/icon-instagram.png" },
  { name: "Facebook", src: "/platform-icons/icon-facebook.png" },
  { name: "TikTok", src: "/platform-icons/icon-tiktok.png" },
  { name: "YouTube", src: "/platform-icons/icon-youtube.png" },
  { name: "LinkedIn", src: "/platform-icons/icon-linkedin.png" },
];

export function PlatformBar() {
  return (
    <div className="py-8 sm:py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
          {platforms.map(({ name, src }) => (
            <Image
              key={name}
              src={src}
              alt={name}
              width={128}
              height={128}
              className="h-8 w-8 shrink-0 object-contain"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
