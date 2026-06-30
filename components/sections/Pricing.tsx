"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../Reveal";

const toFa = (s: string | number) =>
  Number(s)
    .toLocaleString("en-US")
    .replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
    .replace(/,/g, "٬");

type Plan = {
  name: string;
  tagline: string;
  monthly?: number;
  annual?: number;
  custom?: string;
  period: string;
  featured: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "شروع",
    tagline: "برای اینفلوئنسرها و کسب‌وکارهای نوپا",
    monthly: 780000,
    annual: 650000,
    period: "تومان / ماه",
    featured: false,
    features: ["دامنه‌ی اختصاصی شما", "محصولات نامحدود", "پنل مدیریت فروشگاه", "پشتیبانی ایمیلی"],
  },
  {
    name: "حرفه‌ای",
    tagline: "برای فروشگاه‌های در حال رشد",
    monthly: 1280000,
    annual: 1070000,
    period: "تومان / ماه",
    featured: true,
    features: [
      "همه‌ی امکانات پلن شروع",
      "درگاه پرداخت",
      "شیوه‌های ارسال",
      "مدیریت کاربران",
      "گزارش فروش پیشرفته",
      "پشتیبانی اولویت‌دار",
    ],
  },
  {
    name: "سازمانی",
    tagline: "برای برندهای بزرگ",
    custom: "تماس بگیرید",
    period: "تعرفه‌ی اختصاصی",
    featured: false,
    features: [
      "همه‌ی امکانات پلن حرفه‌ای",
      "مدیر اختصاصی حساب",
      "یکپارچه‌سازی سفارشی (API)",
      "SLA و پشتیبانی ۲۴/۷",
      "آموزش تیم",
    ],
  },
];

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-brand">
      <path d="m5 12 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-brand">تعرفه‌ها</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-balance md:text-5xl">
            پلنی برای هر مرحله از رشد
          </h2>
          <p className="mt-4 text-muted">بدون هزینه‌ی پنهان. هر زمان خواستید ارتقا دهید یا لغو کنید.</p>

          {/* billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3">
            <div className="relative flex rounded-full border border-line bg-surface p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  !annual ? "text-white" : "text-muted hover:text-foreground"
                }`}
              >
                ماهانه
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  annual ? "text-white" : "text-muted hover:text-foreground"
                }`}
              >
                سالانه
              </button>
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className={`absolute inset-y-1 z-0 w-[calc(50%-0.25rem)] rounded-full bg-gradient-to-l from-brand to-navy shadow-sm ${
                  annual ? "left-1" : "right-1"
                }`}
              />
            </div>
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">۲ ماه رایگان</span>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className={
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-all " +
                  (p.featured
                    ? "border-brand/40 bg-gradient-to-b from-brand/10 to-surface glow scale-[1.03]"
                    : "border-line bg-surface shadow-sm hover:shadow-lg")
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 right-7 rounded-full bg-gradient-to-l from-brand to-navy px-3 py-1 text-xs font-bold text-white">
                    محبوب‌ترین
                  </span>
                )}
                <h3 className="text-xl font-black">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>

                <div className="mt-5 min-h-[3.25rem]">
                  {p.custom ? (
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black gradient-text">{p.custom}</span>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={annual ? "annual" : "monthly"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-end gap-2"
                      >
                        <span className="text-3xl font-black gradient-text">
                          {toFa(annual ? p.annual! : p.monthly!)}
                        </span>
                        <span className="pb-1 text-xs text-muted">{p.period}</span>
                        {annual && <span className="pb-1 text-xs text-muted line-through">{toFa(p.monthly!)}</span>}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/90">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={
                    "mt-7 rounded-full px-5 py-3 text-center text-sm font-bold transition-transform hover:scale-105 " +
                    (p.featured
                      ? "bg-gradient-to-l from-brand to-navy text-white"
                      : "border border-line text-foreground hover:bg-bg-soft")
                  }
                >
                  انتخاب پلن
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
