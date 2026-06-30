"use client";

import { Store, Receipt, Star, ShieldCheck } from "lucide-react";
import { Counter } from "../Counter";
import { Reveal } from "../Reveal";

type Stat = {
  icon: typeof Store;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  unit?: string;
  label: string;
};

const stats: Stat[] = [
  { icon: Store, value: 1200, prefix: "+", separator: true, label: "فروشگاه فعال" },
  { icon: Receipt, value: 2.5, decimals: 1, unit: "میلیون+", label: "تراکنش موفق" },
  { icon: Star, value: 4.9, decimals: 1, suffix: "/۵", label: "رضایت مشتری" },
  { icon: ShieldCheck, value: 99.9, decimals: 1, suffix: "٪", label: "پایداری سرویس" },
];

export function Stats() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-l from-navy via-navy-2 to-navy p-8 shadow-xl md:p-12">
            {/* decorative */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
              <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
              <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="text-center">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-accent ring-1 ring-white/15">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-3xl font-black text-white md:text-4xl">
                      <Counter
                        value={s.value}
                        decimals={s.decimals}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        separator={s.separator}
                      />
                      {s.unit ? <span className="mr-1 text-xl font-bold text-white/80">{s.unit}</span> : null}
                    </p>
                    <p className="mt-1 text-sm text-white/60">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
