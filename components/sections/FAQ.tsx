"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "../Reveal";

const faqs = [
  {
    q: "برای راه‌اندازی به دانش فنی یا کدنویسی نیاز دارم؟",
    a: "خیر. همه‌چیز از پنل مدیریت و بدون کدنویسی انجام می‌شود. تیم اپیتو هم در مراحل راه‌اندازی کنار شماست تا فروشگاه‌تان سریع آماده شود.",
  },
  {
    q: "برای شروع چه چیزی لازم دارم؟",
    a: "تنها چیزی که نیاز دارید یک دامنه است. کافیست دامنه‌تان را ثبت و رکوردهای DNS را طبق راهنما تنظیم کنید؛ بقیه‌ی کار را تیم اپیتو انجام می‌دهد و اپلیکیشن فروشگاهی اختصاصی شما آماده می‌شود.",
  },
  {
    q: "راه‌اندازی چقدر طول می‌کشد؟",
    a: "معمولاً ظرف ۲۴ ساعت، بسته به آماده بودن دامنه و محتوای اولیه‌ی فروشگاه، همه‌چیز آماده‌ی فروش است.",
  },
  {
    q: "کارمزد تراکنش‌ها چقدر است و پول به کجا واریز می‌شود؟",
    a: "تسویه به‌صورت مستقیم و از طریق درگاه پرداخت رسمی به حساب بانکی خودتان انجام می‌شود. اپیتو در میانه‌ی نقل‌وانتقال پول قرار نمی‌گیرد.",
  },
  {
    q: "می‌توانم ظاهر فروشگاه را شخصی‌سازی کنم؟",
    a: "بله. با چند تم آماده و امکان تغییر رنگ، لوگو و چیدمان، فروشگاه را کاملاً متناسب با هویت برندتان طراحی می‌کنید.",
  },
  {
    q: "اگر تعداد محصولات یا سفارش‌هایم زیاد شود چه؟",
    a: "زیرساخت اپیتو مقیاس‌پذیر است و با رشد کسب‌وکار شما همراه می‌شود؛ از چند محصول تا هزاران سفارش بدون نگرانی از کندی.",
  },
  {
    q: "پشتیبانی به چه صورت است؟",
    a: "تیم پشتیبانی اپیتو پیش از راه‌اندازی، حین راه‌اندازی و در ادامه‌ی مسیر رشد، پاسخگوی شماست.",
  },
  {
    q: "می‌توانم بعداً پلن را تغییر دهم یا لغو کنم؟",
    a: "بله. هر زمان که بخواهید می‌توانید پلن خود را ارتقا دهید، تغییر دهید یا لغو کنید؛ بدون قرارداد اجباری بلندمدت.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <span className="text-sm font-bold text-brand">سوالات متداول</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-balance md:text-5xl">
            هر چه باید بدانید، <span className="gradient-text">یک‌جا</span>
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            اگر پاسخ سوالتان را پیدا نکردید، تیم ما آماده‌ی کمک است.
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.04, 0.2)}>
                <div className="card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-right"
                  >
                    <span className="text-base font-bold text-foreground">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${
                        isOpen ? "bg-gradient-to-l from-brand to-navy text-white" : "bg-bg-soft text-muted"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-8 text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-muted">سوال دیگری دارید؟</p>
          <a
            href="#cta"
            className="mt-3 rounded-full bg-gradient-to-l from-brand to-navy px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-105 sm:block"
          >
            با ما صحبت کنید
          </a>
        </Reveal>
      </div>
    </section>
  );
}
