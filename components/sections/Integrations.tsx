"use client";

import {
  Wallet,
  CreditCard,
  Banknote,
  QrCode,
  Landmark,
  Building2,
  Camera,
  MessageCircle,
  Smartphone,
  Mail,
  Send,
  Megaphone,
} from "lucide-react";
import { Reveal } from "../Reveal";

const groups = [
  {
    title: "درگاه‌های پرداخت",
    items: [
      { name: "زرین‌پال", icon: Wallet },
      { name: "آیدی‌پی", icon: CreditCard },
      { name: "Pay.ir", icon: Banknote },
      { name: "نکست‌پی", icon: QrCode },
      { name: "درگاه بانکی", icon: Landmark },
      { name: "سداد", icon: Building2 },
    ],
  },
  {
    title: "کانال‌های فروش و اطلاع‌رسانی",
    items: [
      { name: "اینستاگرام", icon: Camera },
      { name: "واتساپ", icon: MessageCircle },
      { name: "پیامک", icon: Smartphone },
      { name: "ایمیل", icon: Mail },
      { name: "تلگرام", icon: Send },
      { name: "اعلان‌ها", icon: Megaphone },
    ],
  },
];

export function Integrations() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-brand">یکپارچه با ابزارهای محبوب</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-balance md:text-5xl">
            به هر چیزی که نیاز دارید <span className="gradient-text">وصل شوید</span>
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            درگاه‌های پرداخت ایرانی و کانال‌های فروش، همه آماده‌ی اتصال با چند کلیک.
          </p>
        </Reveal>

        <div className="mt-14 space-y-8">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08}>
              <div className="card p-6 md:p-8">
                <h3 className="mb-5 text-sm font-bold text-muted">{g.title}</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                  {g.items.map((it) => {
                    const Icon = it.icon;
                    return (
                      <div
                        key={it.name}
                        className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-bg-soft px-3 py-5 text-center transition-all hover:border-brand/30 hover:bg-surface hover:shadow-md"
                      >
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-navy shadow-sm transition-colors group-hover:bg-brand/10 group-hover:text-brand">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold text-foreground">{it.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 text-center">
          <p className="text-sm text-muted">و ده‌ها سرویس دیگر که مدام به آن‌ها اضافه می‌شود.</p>
        </Reveal>
      </div>
    </section>
  );
}
