"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PhoneMockup } from "../PhoneMockup";
import { Counter } from "../Counter";
import { platforms } from "../PlatformIcons";
import { industries } from "./IndustryShowcase";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const trustChips = ["بدون کدنویسی", "راه‌اندازی ۲۴ ساعته", "SSL رایگان"];

// Per-store floating chips (color + content). Order matches `industries`.
const heroChips = [
  { color: "#7a4dff", sales: "۱۲٬۴۰۰٬۰۰۰ ت", order: "مانتو و کیف · ثبت شد", growth: "۳۲٪+" },
  { color: "#ec4899", sales: "۸٬۷۵۰٬۰۰۰ ت", order: "سرم ویتامین C · ثبت شد", growth: "۲۷٪+" },
  { color: "#f59e0b", sales: "۴٬۹۸۰٬۰۰۰ ت", order: "۲ کاپوچینو · آماده شد ✓", growth: "۴۱٪+" },
  { color: "#0ea5e9", sales: "۳۶٬۲۰۰٬۰۰۰ ت", order: "هندزفری بلوتوث · ارسال شد", growth: "۱۹٪+" },
  { color: "#f97316", sales: "۶٬۳۰۰٬۰۰۰ ت", order: "ظرف سفالی · بسته‌بندی شد", growth: "۲۴٪+" },
  { color: "#22c55e", sales: "۵٬۱۵۰٬۰۰۰ ت", order: "کاکتوس مینی · ارسال شد ✓", growth: "۳۸٪+" },
];
// Per-store positions so the chips visibly jump to a new spot as the store changes.
const chip1Pos: React.CSSProperties[] = [
  { top: "1rem", right: "-1.5rem" },
  { top: "6rem", right: "4rem" },
  { top: "-1rem", right: "2.5rem" },
  { top: "8rem", right: "-2rem" },
  { top: "2.5rem", right: "5.5rem" },
  { top: "0.5rem", right: "1rem" },
];
const chip2Pos: React.CSSProperties[] = [
  { bottom: "6rem", left: "-1.5rem" },
  { bottom: "9rem", left: "3.5rem" },
  { bottom: "4rem", left: "0.5rem" },
  { bottom: "10rem", left: "-2rem" },
  { bottom: "5rem", left: "5rem" },
  { bottom: "8rem", left: "1.5rem" },
];
const chip3Pos: React.CSSProperties[] = [
  { bottom: "1rem", right: "1.5rem" },
  { bottom: "4rem", right: "-1.5rem" },
  { bottom: "-1rem", right: "5rem" },
  { bottom: "3rem", right: "0rem" },
  { bottom: "0.5rem", right: "6.5rem" },
  { bottom: "2.5rem", right: "2rem" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [storeIndex, setStoreIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setStoreIndex((i) => (i + 1) % industries.length);
    }, 2500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 pb-24 md:pt-44">
      {/* layered background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-80" />
        <div className="absolute -top-24 right-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-3xl animate-blob" />
        <div className="absolute top-20 left-1/4 h-[26rem] w-[26rem] rounded-full bg-navy/10 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-accent/15 blur-3xl animate-blob [animation-delay:8s]" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 noise" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2"
      >
        {/* copy */}
        <div className="text-center lg:text-right">
          {/* <motion.div variants={item} className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-medium text-navy shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              پلتفرم فروشگاه‌ساز وایت‌لیبل
            </span>
          </motion.div> */}

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-black leading-[1.25] tracking-tight text-balance md:text-6xl"
          >
            اپلیکیشن فروشگاهی
            <br />
            <span className="gradient-text">اختصاصی و حرفه‌ای</span>
          </motion.h1>

          <motion.p variants={item} className="mx-auto mt-6 max-w-lg text-base leading-8 text-muted lg:mx-0 md:text-lg">
            با اپیتو بدون نیاز به کدنویسی، اپلیکیشن فروشگاهی اختصاصی خودتان را راه‌اندازی کنید. تنها چیزی که نیاز دارید
            یک دامنه است؛ بقیه‌ی کار با ماست.
          </motion.p>

          {/* trust chips */}
          <motion.ul variants={item} className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {trustChips.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-foreground"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand">
                  <path
                    d="m5 13 4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {c}
              </li>
            ))}
          </motion.ul>

          {/* platform compatibility */}
          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start"
          >
            <span className="text-xs font-medium text-muted">سازگار با همه دستگاه‌ها:</span>
            <ul className="flex items-center gap-3">
              {platforms.map(({ name, Icon }) => (
                <li key={name} className="flex items-center gap-1.5 text-foreground">
                  <Icon className="h-4 w-4 text-brand" />
                  <span className="text-xs font-bold">{name}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#cta"
              className="group relative overflow-hidden rounded-full bg-gradient-to-l from-brand to-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-105"
            >
              <span className="relative z-10">شروع کنید</span>
              <span className="absolute inset-0 shine animate-shimmer" />
            </a>
            <a
              href="#how"
              className="rounded-full border border-line bg-surface px-7 py-3.5 text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-bg-soft"
            >
              مشاهده دمو
            </a>
          </motion.div>

          {/* social proof */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <div className="flex -space-x-3 -space-x-reverse">
              {["from-brand to-accent", "from-navy to-brand-2", "from-accent to-navy", "from-brand-2 to-navy-2"].map(
                (g, i) => (
                  <span
                    key={i}
                    className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${g} text-[10px] font-bold text-white ring-2 ring-bg`}
                  >
                    {["ل", "م", "ر", "س"][i]}
                  </span>
                ),
              )}
            </div>
            <div className="text-center sm:text-right">
              <div className="flex items-center justify-center gap-1 sm:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-amber-400"
                  >
                    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9L12 2.5z" />
                  </svg>
                ))}
                <span className="mr-1 text-sm font-bold text-foreground">۴٫۹/۵</span>
              </div>
              <p className="mt-0.5 text-xs text-muted">رضایت بیش از ۱۲۰۰ کسب‌وکار ایرانی</p>
            </div>
          </motion.div>

          {/* stats */}
          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-8 lg:justify-start">
            <div className="text-center lg:text-right">
              <p className="text-2xl font-black gradient-text">
                <Counter value={1200} separator prefix="+" />
              </p>
              <p className="text-xs text-muted">فروشگاه فعال</p>
            </div>
            <div className="h-8 w-px bg-line" />
            <div className="text-center lg:text-right">
              <p className="text-2xl font-black gradient-text">
                <Counter value={99.9} decimals={1} suffix="٪" />
              </p>
              <p className="text-xs text-muted">پایداری سرویس</p>
            </div>
            <div className="h-8 w-px bg-line" />
            <div className="text-center lg:text-right">
              <p className="text-2xl font-black gradient-text">۲۴/۷</p>
              <p className="text-xs text-muted">پشتیبانی</p>
            </div>
          </motion.div>
        </div>

        {/* phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: yPhone }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 -z-10 m-auto h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
          <div className="animate-float">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={industries[storeIndex].id}
                initial={{ opacity: 0, scale: 0.96, rotateY: 12 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.96, rotateY: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <PhoneMockup
                  {...industries[storeIndex].store}
                  accentGradient={industries[storeIndex].theme.buttonGradient}
                  accentChip={industries[storeIndex].theme.chip}
                  accentBadge={industries[storeIndex].theme.chip}
                  accentText={industries[storeIndex].theme.text}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* floating chips — smoothly relocate; color & content change per store */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            style={chip1Pos[storeIndex]}
            className="absolute hidden glass rounded-2xl px-4 py-3 transition-[top,right,bottom,left] duration-700 ease-out md:block animate-float-slow"
          >
            <p className="text-xs text-muted">فروش امروز</p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={storeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-lg font-black"
                style={{ color: heroChips[storeIndex].color }}
              >
                {heroChips[storeIndex].sales}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            style={chip2Pos[storeIndex]}
            className="absolute hidden glass rounded-2xl px-4 py-3 transition-[top,right,bottom,left] duration-700 ease-out md:block animate-float"
          >
            <p className="text-xs text-muted">سفارش جدید</p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={storeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-sm font-bold"
              >
                {heroChips[storeIndex].order}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            style={chip3Pos[storeIndex]}
            className="absolute hidden items-center gap-2 glass rounded-2xl px-4 py-2.5 transition-[top,right,bottom,left] duration-700 ease-out md:flex animate-float-slow"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full transition-colors duration-500"
              style={{
                color: heroChips[storeIndex].color,
                backgroundColor: `color-mix(in srgb, ${heroChips[storeIndex].color} 15%, transparent)`,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M21 7v5h-5" />
              </svg>
            </span>
            <div>
              <p className="text-[11px] text-muted">رشد فروش</p>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={storeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm font-black"
                  style={{ color: heroChips[storeIndex].color }}
                >
                  {heroChips[storeIndex].growth}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
