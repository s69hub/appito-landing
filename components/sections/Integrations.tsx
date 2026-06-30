"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Banknote,
  Landmark,
  Camera,
  MessageCircle,
  MessageSquare,
  Smartphone,
  Send,
} from "lucide-react";
import { Reveal } from "../Reveal";

type Item = { name: string; icon: typeof Wallet; color: string };

const groups: {
  title: string;
  subtitle: string;
  accent: string;
  items: Item[];
}[] = [
  {
    title: "درگاه‌های پرداخت",
    subtitle: "تسویه‌ی امن و مستقیم به حساب شما",
    accent: "from-pink-500 to-violet-600",
    items: [
      { name: "زرین‌پال", icon: Wallet, color: "#f59e0b" },
      { name: "دیجی‌پی", icon: CreditCard, color: "#10b981" },
      { name: "اسنپ‌پی", icon: Banknote, color: "#ef4444" },
      { name: "درگاه شتاب", icon: Landmark, color: "#3b82f6" },
    ],
  },
  {
    title: "کانال‌های فروش و اطلاع‌رسانی",
    subtitle: "همه‌جا کنار مشتری‌هایتان باشید",
    accent: "from-pink-500 to-violet-600",
    items: [
      { name: "اینستاگرام", icon: Camera, color: "#e1306c" },
      { name: "واتساپ", icon: MessageCircle, color: "#25d366" },
      { name: "تلگرام", icon: Send, color: "#229ed9" },
      { name: "روبیکا", icon: Smartphone, color: "#8b5cf6" },
      { name: "بله", icon: MessageSquare, color: "#06b6d4" },
    ],
  },
];

export function Integrations() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-bold text-brand backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            یکپارچه با ابزارهای محبوب
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-balance md:text-5xl">
            به هر چیزی که نیاز دارید <span className="gradient-text">وصل شوید</span>
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            درگاه‌های پرداخت ایرانی و کانال‌های فروش، همه آماده‌ی اتصال با چند کلیک.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.1}>
              <div className="group/panel relative h-full overflow-hidden rounded-3xl border border-line bg-surface/70 p-7 shadow-xl backdrop-blur-md md:p-8">
                {/* top accent */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${g.accent}`} />
                {/* glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${g.accent} opacity-10 blur-2xl transition-opacity duration-500 group-hover/panel:opacity-25`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black">{g.title}</h3>
                      <p className="mt-1 text-xs text-muted">{g.subtitle}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      فعال
                    </span>
                  </div>

                  <div className="mt-7 flex flex-wrap justify-center gap-3 sm:gap-4">
                    {g.items.map((it, i) => {
                      const Icon = it.icon;
                      return (
                        <motion.div
                          key={it.name}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ y: -6, scale: 1.05 }}
                          className="flex w-[84px] flex-col items-center gap-2.5 sm:w-24"
                        >
                          <span
                            className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${it.color}, color-mix(in srgb, ${it.color} 55%, #131443))`,
                              boxShadow: `0 12px 26px -10px ${it.color}`,
                            }}
                          >
                            <Icon className="h-6 w-6" />
                          </span>
                          <span className="text-xs font-bold text-foreground">{it.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-muted">و ده‌ها سرویس دیگر که مدام به آن‌ها اضافه می‌شود.</p>
        </Reveal>
      </div>
    </section>
  );
}
