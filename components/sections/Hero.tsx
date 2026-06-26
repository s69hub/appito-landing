"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "../PhoneMockup";

const stats = [
  { value: "+۱۲۰۰", label: "فروشگاه فعال" },
  { value: "۴٫۹/۵", label: "رضایت مشتری" },
  { value: "۲۴/۷", label: "پشتیبانی" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44">
      {/* animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl animate-blob" />
        <div className="absolute top-20 left-1/4 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-accent-2/20 blur-3xl animate-blob [animation-delay:8s]" />
        <div className="absolute inset-0 grid-bg opacity-60" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        {/* copy */}
        <div className="text-center lg:text-right">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-accent-2 animate-pulse" />
            فروشگاه‌ساز وایت‌لیبل روی دامنه‌ی شما
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl font-black leading-[1.25] tracking-tight md:text-6xl"
          >
            فروشگاه اینترنتی
            <br />
            <span className="gradient-text">حرفه‌ای و موبایلی</span>
            <br />
            روی دامنه‌ی خودتان
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-lg text-base leading-8 text-muted lg:mx-0 md:text-lg"
          >
            با اپیتو بدون نیاز به کدنویسی، فروشگاه موبایلی خودتان را راه‌اندازی
            کنید. کافیست دامنه‌تان را ثبت و DNS را تنظیم کنید؛ بقیه‌ی کار با ماست.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#cta"
              className="group relative overflow-hidden rounded-full bg-gradient-to-l from-brand to-accent px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              <span className="relative z-10">رایگان شروع کنید</span>
              <span className="absolute inset-0 shine animate-shimmer" />
            </a>
            <a
              href="#how"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-white/5"
            >
              تماشای دمو
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-8 lg:justify-start"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-right">
                <p className="text-2xl font-black gradient-text">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 -z-10 m-auto h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="animate-float">
            <PhoneMockup />
          </div>

          {/* floating chips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute right-0 top-16 hidden glass rounded-2xl px-4 py-3 md:block animate-float-slow"
          >
            <p className="text-xs text-muted">فروش امروز</p>
            <p className="text-lg font-black text-accent-2">۱۲٬۴۰۰٬۰۰۰ ت</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20 left-0 hidden glass rounded-2xl px-4 py-3 md:block animate-float"
          >
            <p className="text-xs text-muted">سفارش جدید</p>
            <p className="text-sm font-bold">۳ کالا · ارسال شد ✓</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
