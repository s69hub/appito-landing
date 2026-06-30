"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Shirt, Sparkles, Coffee, Smartphone, Gem, Flower2, Check } from "lucide-react";
import { PhoneMockup, type PhoneMockupProps } from "../PhoneMockup";
import { Reveal } from "../Reveal";

type IndustryTheme = {
  buttonGradient: string;
  shadow: string;
  soft: string;
  text: string;
  chip: string;
};

export type Industry = {
  id: string;
  label: string;
  icon: typeof Shirt;
  tagline: string;
  bullets: string[];
  theme: IndustryTheme;
  store: PhoneMockupProps;
};

export const industries: Industry[] = [
  {
    id: "fashion",
    label: "مد و پوشاک",
    icon: Shirt,
    tagline: "ویترینی شیک برای برند پوشاک شما",
    bullets: ["نمایش کالکشن با گالری تصاویر", "سایزبندی و تنوع رنگ", "کمپین حراج فصلی"],
    theme: {
      buttonGradient: "from-brand to-navy",
      shadow: "shadow-brand/25",
      soft: "bg-brand/10",
      text: "text-brand",
      chip: "bg-brand",
    },
    store: {
      storeName: "بوتیک لیلا",
      handle: "leila.shop",
      initial: "ل",
      bannerTitle: "حراج پایان فصل",
      bannerSubtitle: "تا ۴۰٪ تخفیف روی کالکشن جدید",
      bannerGradient: "from-brand via-brand-2 to-accent",
      categories: ["همه", "مانتو", "کیف", "کفش", "عینک"],
      products: [
        { name: "مانتو کتان", price: "۸۹۰٬۰۰۰", tag: "جدید", hue: "from-pink-500/30 to-fuchsia-500/20" },
        { name: "کیف چرم", price: "۱٬۲۵۰٬۰۰۰", tag: "", hue: "from-rose-500/30 to-pink-500/20" },
        { name: "عینک آفتابی", price: "۴۵۰٬۰۰۰", tag: "٪۲۰", hue: "from-violet-500/30 to-purple-500/20" },
        { name: "اسنیکر اسپرت", price: "۱٬۶۸۰٬۰۰۰", tag: "", hue: "from-amber-500/30 to-orange-500/20" },
      ],
    },
  },
  {
    id: "beauty",
    label: "آرایشی بهداشتی",
    icon: Sparkles,
    tagline: "فروشگاهی درخشان برای محصولات زیبایی",
    bullets: ["دسته‌بندی پوست، مو و آرایش", "هدیه با خرید و باشگاه مشتریان", "نظرات و امتیاز محصول"],
    theme: {
      buttonGradient: "from-pink-500 to-fuchsia-600",
      shadow: "shadow-pink-500/30",
      soft: "bg-pink-500/10",
      text: "text-pink-600",
      chip: "bg-pink-500",
    },
    store: {
      storeName: "گالری رُز",
      handle: "rose.beauty",
      initial: "ر",
      bannerTitle: "جشنواره زیبایی",
      bannerSubtitle: "هدیه با خرید بالای ۵۰۰ هزار تومان",
      bannerGradient: "from-pink-500 via-rose-500 to-fuchsia-500",
      categories: ["همه", "مراقبت پوست", "آرایش", "عطر", "مو"],
      products: [
        { name: "سرم ویتامین C", price: "۶۲۰٬۰۰۰", tag: "پرفروش", hue: "from-amber-500/30 to-orange-500/20" },
        { name: "رژلب مات", price: "۲۸۰٬۰۰۰", tag: "", hue: "from-rose-500/30 to-pink-500/20" },
        { name: "کرم آبرسان", price: "۴۹۰٬۰۰۰", tag: "٪۱۵", hue: "from-cyan-500/30 to-sky-500/20" },
        { name: "عطر زنانه", price: "۱٬۹۵۰٬۰۰۰", tag: "", hue: "from-violet-500/30 to-purple-500/20" },
      ],
    },
  },
  {
    id: "cafe",
    label: "کافه و رستوران",
    icon: Coffee,
    tagline: "منوی آنلاین و سفارش سریع",
    bullets: ["منوی دیجیتال با دسته‌بندی", "سفارش حضوری و بیرون‌بر", "اتصال به پیک و ارسال"],
    theme: {
      buttonGradient: "from-amber-500 to-orange-600",
      shadow: "shadow-orange-500/30",
      soft: "bg-orange-500/10",
      text: "text-orange-600",
      chip: "bg-orange-500",
    },
    store: {
      storeName: "کافه آرامش",
      handle: "aramesh.cafe",
      initial: "آ",
      bannerTitle: "منوی پاییزی",
      bannerSubtitle: "قهوه‌ی فصل با ۲۰٪ تخفیف",
      bannerGradient: "from-amber-600 via-orange-500 to-yellow-500",
      categories: ["همه", "قهوه", "دمنوش", "کیک", "صبحانه"],
      products: [
        { name: "لاته", price: "۸۵٬۰۰۰", tag: "", hue: "from-amber-500/30 to-orange-500/20" },
        { name: "چیزکیک", price: "۱۲۰٬۰۰۰", tag: "جدید", hue: "from-yellow-500/30 to-amber-500/20" },
        { name: "اسپرسو", price: "۶۵٬۰۰۰", tag: "", hue: "from-orange-500/30 to-red-500/20" },
        { name: "کاپوچینو", price: "۹۵٬۰۰۰", tag: "٪۱۰", hue: "from-amber-500/30 to-yellow-500/20" },
      ],
    },
  },
  {
    id: "digital",
    label: "کالای دیجیتال",
    icon: Smartphone,
    tagline: "فروشگاهی حرفه‌ای برای گجت و لوازم",
    bullets: ["مقایسه و مشخصات فنی", "گارانتی و خدمات پس از فروش", "پرداخت اقساطی"],
    theme: {
      buttonGradient: "from-sky-500 to-blue-600",
      shadow: "shadow-sky-500/30",
      soft: "bg-sky-500/10",
      text: "text-sky-600",
      chip: "bg-sky-500",
    },
    store: {
      storeName: "تک‌استور",
      handle: "tech.store",
      initial: "ت",
      bannerTitle: "تخفیف گجت",
      bannerSubtitle: "هدفون بی‌سیم با ۳۰٪ تخفیف",
      bannerGradient: "from-sky-500 via-cyan-500 to-blue-600",
      categories: ["همه", "موبایل", "هدفون", "ساعت", "لوازم"],
      products: [
        { name: "هدفون بی‌سیم", price: "۲٬۴۵۰٬۰۰۰", tag: "٪۳۰", hue: "from-cyan-500/30 to-sky-500/20" },
        { name: "ساعت هوشمند", price: "۳٬۹۰۰٬۰۰۰", tag: "", hue: "from-blue-500/30 to-indigo-500/20" },
        { name: "شارژر فست", price: "۴۲۰٬۰۰۰", tag: "جدید", hue: "from-violet-500/30 to-purple-500/20" },
        { name: "اسپیکر بلوتوث", price: "۱٬۲۸۰٬۰۰۰", tag: "", hue: "from-teal-500/30 to-cyan-500/20" },
      ],
    },
  },
  {
    id: "handicraft",
    label: "صنایع‌دستی",
    icon: Gem,
    tagline: "بازاری برای آثار دست‌ساز و اصیل",
    bullets: ["داستان هر اثر و هنرمند", "ارسال امن به سراسر کشور", "سفارش سفارشی‌سازی‌شده"],
    theme: {
      buttonGradient: "from-orange-500 to-rose-600",
      shadow: "shadow-rose-500/30",
      soft: "bg-orange-500/10",
      text: "text-orange-700",
      chip: "bg-orange-600",
    },
    store: {
      storeName: "دستینه",
      handle: "dastineh.shop",
      initial: "د",
      bannerTitle: "بازار صنایع‌دستی",
      bannerSubtitle: "ارسال رایگان آثار دست‌ساز",
      bannerGradient: "from-amber-700 via-orange-600 to-rose-500",
      categories: ["همه", "سفال", "گلیم", "زیورآلات", "چوب"],
      products: [
        { name: "کاسه سفالی", price: "۳۲۰٬۰۰۰", tag: "", hue: "from-orange-500/30 to-amber-500/20" },
        { name: "گردنبند نقره", price: "۸۹۰٬۰۰۰", tag: "ویژه", hue: "from-slate-400/30 to-zinc-400/20" },
        { name: "گلیم دست‌باف", price: "۲٬۱۰۰٬۰۰۰", tag: "", hue: "from-red-500/30 to-rose-500/20" },
        { name: "جعبه چوبی", price: "۴۸۰٬۰۰۰", tag: "٪۱۵", hue: "from-amber-600/30 to-yellow-600/20" },
      ],
    },
  },
  {
    id: "plants",
    label: "گل و گیاه",
    icon: Flower2,
    tagline: "گلفروشی آنلاین با ارسال تازه",
    bullets: ["ارسال روزانه و سریع", "راهنمای نگهداری گیاه", "اشتراک گل ماهانه"],
    theme: {
      buttonGradient: "from-emerald-500 to-green-600",
      shadow: "shadow-emerald-500/30",
      soft: "bg-emerald-500/10",
      text: "text-emerald-600",
      chip: "bg-emerald-600",
    },
    store: {
      storeName: "گلخانه سبز",
      handle: "sabz.shop",
      initial: "س",
      bannerTitle: "بهار همیشگی",
      bannerSubtitle: "ارسال گل تازه‌ی روزانه",
      bannerGradient: "from-emerald-500 via-green-500 to-lime-500",
      categories: ["همه", "گل", "کاکتوس", "آپارتمانی", "گلدان"],
      products: [
        { name: "مونسترا", price: "۵۸۰٬۰۰۰", tag: "محبوب", hue: "from-emerald-500/30 to-green-500/20" },
        { name: "کاکتوس مینی", price: "۱۲۰٬۰۰۰", tag: "", hue: "from-lime-500/30 to-green-500/20" },
        { name: "بونسای", price: "۱٬۴۵۰٬۰۰۰", tag: "", hue: "from-teal-500/30 to-emerald-500/20" },
        { name: "گلدان سفالی", price: "۲۲۰٬۰۰۰", tag: "٪۱۰", hue: "from-orange-500/30 to-amber-500/20" },
      ],
    },
  },
];

export function IndustryShowcase() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section id="industries" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-60" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-brand">برای هر صنفی ساخته شده</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-balance md:text-5xl">
            فروشگاهی که <span className="gradient-text">مناسب کسب‌وکار شماست</span>
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            یک صنف را انتخاب کنید و ببینید فروشگاه شما چطور به نظر می‌رسد.
          </p>
        </Reveal>

        {/* tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const isActive = i === active;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                  isActive
                    ? `border-transparent bg-gradient-to-l ${ind.theme.buttonGradient} text-white shadow-lg ${ind.theme.shadow}`
                    : "border-line bg-surface text-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {ind.label}
              </button>
            );
          })}
        </div>

        {/* preview */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 text-center lg:order-1 lg:text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-2xl font-black md:text-3xl">{current.tagline}</h3>
                <ul className="mx-auto mt-6 max-w-md space-y-3 lg:mx-0">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 lg:flex-row-reverse lg:justify-end">
                      <span className="text-sm font-medium text-foreground">{b}</span>
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${current.theme.soft} ${current.theme.text}`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`mt-8 inline-flex rounded-full bg-gradient-to-l ${current.theme.buttonGradient} px-6 py-3 text-sm font-bold text-white shadow-lg ${current.theme.shadow} transition-transform hover:scale-105`}
                >
                  فروشگاه {current.label} بسازید
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.94, rotateY: 12 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.94, rotateY: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <PhoneMockup
                  {...current.store}
                  accentGradient={current.theme.buttonGradient}
                  accentChip={current.theme.chip}
                  accentBadge={current.theme.chip}
                  accentText={current.theme.text}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
