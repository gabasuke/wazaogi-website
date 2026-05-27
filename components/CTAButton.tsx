"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-lantern text-night lantern-glow hover:bg-[#ffb464] focus-visible:outline-lantern",
  secondary:
    "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/16 focus-visible:outline-white",
  ghost:
    "bg-transparent text-white ring-1 ring-white/15 hover:bg-white/10 focus-visible:outline-white"
};

export function CTAButton({ href, children, variant = "primary", external, className = "" }: Props) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.98] ${variants[variant]} ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}
