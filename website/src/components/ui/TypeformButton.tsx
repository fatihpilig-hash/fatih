"use client";

import { PopupButton } from "@typeform/embed-react";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 cursor-pointer rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost:
    "bg-transparent text-foreground border border-border hover:bg-background-alt",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const TYPEFORM_ID = "LXBpAcqU";

export function TypeformPopupButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <PopupButton
      id={TYPEFORM_ID}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </PopupButton>
  );
}
