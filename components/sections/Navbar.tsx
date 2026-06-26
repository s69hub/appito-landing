"use client";

import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how", label: "چطور کار می‌کند" },
  { href: "#compare", label: "چرا اپیتو" },
  { href: "#showcase", label: "نمونه‌ها" },
  { href: "#pricing", label: "تعرفه‌ها" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 md:px-5",
          scrolled ? "glass" : "bg-transparent"
        )}
      >
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#pricing"
            className="hidden rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-foreground sm:block"
          >
            ورود
          </a>
          <a
            href="#cta"
            className="rounded-full bg-gradient-to-l from-brand to-accent px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            شروع رایگان
          </a>
        </div>
      </nav>
    </header>
  );
}
