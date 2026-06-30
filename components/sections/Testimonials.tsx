"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../Reveal";

type Testimonial = {
  name: string;
  role: string;
  badge: string;
  initial: string;
  quote: string;
  metric: string;
  metricLabel: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "سارا",
    role: "بلاگر مد",
    badge: "اینفلوئنسر",
    initial: "س",
    quote:
      "از اینستاگرام به مشتری‌ها لینک می‌دادم و سفارش‌ها گم می‌شد. با اپیتو حالا یک اپلیکیشن فروشگاهی اختصاصی و واقعی دارم و فروشم سه برابر شده.",
    metric: "۳×",
    metricLabel: "رشد فروش",
    avatar: "from-pink-500 to-fuchsia-500",
  },
  {
    name: "بوتیک لیلا",
    role: "فروشگاه پوشاک",
    badge: "مد و پوشاک",
    initial: "ل",
    quote:
      "بدون اینکه یک خط کد بزنم، فروشگاهم در دو روز راه‌اندازی شد. پنل مدیریت خیلی ساده است و خودم محصولات را آپدیت می‌کنم.",
    metric: "۲ روز",
    metricLabel: "تا راه‌اندازی",
    avatar: "from-violet-500 to-purple-500",
  },
  {
    name: "دیجی‌استایل",
    role: "برند کالای دیجیتال",
    badge: "برند",
    initial: "د",
    quote:
      "به یک اپلیکیشن فروشگاهی اختصاصی، حرفه‌ای و مقیاس‌پذیر نیاز داشتیم. اپیتو دقیقاً همان چیزی بود که می‌خواستیم، با پشتیبانی عالی.",
    metric: "٪۹۹٫۹",
    metricLabel: "پایداری",
    avatar: "from-cyan-500 to-sky-500",
  },
  {
    name: "کافه آرامش",
    role: "کافه و رستوران",
    badge: "کافه و رستوران",
    initial: "آ",
    quote:
      "منوی دیجیتال و سفارش آنلاین باعث شد فروش بیرون‌بر ما دو برابر شود. مشتری‌ها راحت سفارش می‌دهند و ما سریع آماده می‌کنیم.",
    metric: "۲×",
    metricLabel: "سفارش آنلاین",
    avatar: "from-amber-500 to-orange-500",
  },
  {
    name: "گالری رُز",
    role: "محصولات آرایشی",
    badge: "آرایشی بهداشتی",
    initial: "ر",
    quote: "مشتری‌ها حالا مستقیم از اپ خرید می‌کنند و باشگاه مشتریان، وفاداری و خرید دوباره را به‌وضوح بالا برده است.",
    metric: "۴۰٪+",
    metricLabel: "بازگشت مشتری",
    avatar: "from-rose-500 to-pink-500",
  },
  {
    name: "گلخانه سبز",
    role: "گل و گیاه",
    badge: "گل و گیاه",
    initial: "س",
    quote:
      "ارسال روزانه و پنل ساده، مدیریت سفارش‌ها را برایم بی‌دردسر کرده. حالا با خیال راحت روی رشد فروشگاه تمرکز می‌کنم.",
    metric: "+۱۲۰۰",
    metricLabel: "سفارش ماهانه",
    avatar: "from-emerald-500 to-green-500",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + count) % count);
  };

  const jump = (i: number) => {
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(t);
  }, [reduce, count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) go(1);
    else if (info.offset.x > threshold) go(-1);
  };

  const current = testimonials[index];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d > 0 ? -60 : 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d > 0 ? 60 : -60 }),
  };

  return (
    <section id="testimonials" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <span className="text-sm font-bold text-brand">داستان مشتریان</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-balance md:text-5xl">
            کسب‌وکارهایی که با اپیتو <span className="gradient-text">رشد کردند</span>
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                className="card cursor-grab p-8 active:cursor-grabbing md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <Quote className="h-6 w-6" />
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-lg leading-9 text-foreground md:text-xl">«{current.quote}»</p>

                <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${current.avatar} text-sm font-bold text-white`}
                    >
                      {current.initial}
                    </span>
                    <div>
                      <p className="text-sm font-black">{current.name}</p>
                      <p className="text-xs text-muted">{current.role}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-black gradient-text">{current.metric}</p>
                    <p className="text-[10px] text-muted">{current.metricLabel}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="قبلی"
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-foreground shadow-sm transition-colors hover:bg-bg-soft"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`نظر ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => jump(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-gradient-to-l from-brand to-navy" : "w-2 bg-line hover:bg-muted/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="بعدی"
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-foreground shadow-sm transition-colors hover:bg-bg-soft"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
