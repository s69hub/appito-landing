"use client";

import { useEffect, useState } from "react";

const items = [
  { label: "اینفلوئنسرها", color: "#d946ef" },
  { label: "بوتیک‌های مد", color: "#7a4dff" },
  { label: "برندهای آرایشی", color: "#ec4899" },
  { label: "فروشگاه‌های دیجیتال", color: "#0ea5e9" },
  { label: "صنایع‌دستی", color: "#f97316" },
  { label: "کافه و رستوران", color: "#f59e0b" },
  { label: "پوشاک ورزشی", color: "#10b981" },
  { label: "گل و گیاه", color: "#22c55e" },
];

// Each "group" repeats the items twice so a single group is always wider than
// the viewport — translating the track by exactly one group (-50%) is then
// perfectly seamless with no gap on any screen size.
const group = [...items, ...items];
const row = [...group, ...group];

export function TrustBar() {
  const [lit, setLit] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Each item runs its own independent on/off loop, so they light up and fade
    // out at random, overlapping moments — fully independent of one another.
    const cleanups = items.map((_, idx) => {
      let onTimer: ReturnType<typeof setTimeout>;
      let offTimer: ReturnType<typeof setTimeout>;

      const setOne = (value: boolean) =>
        setLit((prev) => {
          const next = [...prev];
          next[idx] = value;
          return next;
        });

      const turnOn = () => {
        setOne(true);
        offTimer = setTimeout(turnOff, 500); // lit for 0.5s
      };
      const turnOff = () => {
        setOne(false);
        onTimer = setTimeout(turnOn, 500 + Math.random() * 2600); // off 0.5–3.1s
      };

      onTimer = setTimeout(turnOn, Math.random() * 2600); // staggered start
      return () => {
        clearTimeout(onTimer);
        clearTimeout(offTimer);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="border-y border-line bg-bg-soft py-8">
      <p className="mb-6 text-center text-sm text-muted">انتخاب کسب‌وکارهای پیشرو در حوزه‌های مختلف</p>
      <div
        dir="ltr"
        className="relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max items-center animate-marquee [animation-direction:reverse] [animation-duration:40s] [will-change:transform]">
          {row.map((it, i) => {
            const on = lit[i % items.length];
            return (
              <span
                key={i}
                className="mx-2 whitespace-nowrap rounded-full border px-6 py-2.5 text-sm font-medium shadow-sm transition-colors duration-300"
                style={
                  on
                    ? {
                        color: it.color,
                        borderColor: it.color,
                        backgroundColor: `color-mix(in srgb, ${it.color} 12%, var(--color-surface))`,
                        boxShadow: `0 4px 14px color-mix(in srgb, ${it.color} 22%, transparent)`,
                      }
                    : {
                        color: "var(--color-muted)",
                        borderColor: "var(--color-line)",
                        backgroundColor: "var(--color-surface)",
                      }
                }
              >
                {it.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
