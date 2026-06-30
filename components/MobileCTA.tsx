"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 p-3 transition-all duration-300 md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="glass flex items-center gap-2 rounded-2xl p-2">
        <a
          href="#cta"
          className="flex-1 rounded-xl bg-gradient-to-l from-brand to-navy px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-brand/20"
        >
          شروع کنید
        </a>
        <a
          href="#pricing"
          className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-bold text-foreground"
        >
          تعرفه‌ها
        </a>
      </div>
    </div>
  );
}
