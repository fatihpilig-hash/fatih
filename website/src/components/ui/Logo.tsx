import Image from "next/image";
import Link from "next/link";

type LogoVariant = "schwarz" | "weiss";

const LOGO_SRC: Record<LogoVariant, string> = {
  schwarz: "/logos/plg-media-logo-schwarz.png",
  weiss: "/logos/plg-media-logo-weiss.png",
};

export function Logo({
  variant = "schwarz",
  className = "h-10 w-auto sm:h-12",
  priority = false,
  onClick,
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      aria-label="PLG Media – zur Startseite"
      className="inline-flex shrink-0 items-center"
      onClick={onClick}
    >
      <Image
        src={LOGO_SRC[variant]}
        alt="PLG Media Marketing"
        width={789}
        height={762}
        priority={priority}
        quality={100}
        className={className}
      />
    </Link>
  );
}
