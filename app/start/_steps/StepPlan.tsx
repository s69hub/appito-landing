"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, ShieldCheck, CreditCard } from "lucide-react";
import type { FormData } from "../page";

const PLANS = [
  {
    key: "start" as const,
    name: "شروع",
    monthly: 780000,
    annual: 650000,
    features: ["دامنه‌ی اختصاصی شما", "محصولات نامحدود", "پنل مدیریت فروشگاه", "پشتیبانی ایمیلی"],
    featured: false,
  },
  {
    key: "pro" as const,
    name: "حرفه‌ای",
    monthly: 1280000,
    annual: 1070000,
    features: [
      "همه امکانات پلن شروع",
      "درگاه پرداخت",
      "شیوه‌های ارسال",
      "سفارشی‌سازی کامل تم",
      "کد تخفیف و کمپین",
      "گزارش فروش پیشرفته",
      "پشتیبانی اولویت‌دار",
    ],
    featured: true,
  },
];

function toFa(n: number) {
  return n
    .toLocaleString("en-US")
    .replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
    .replace(/,/g, "٬");
}

type Props = { data: FormData; update: (p: Partial<FormData>) => void; onPrev: () => void };

export default function StepPlan({ data, update, onPrev }: Props) {
  const [plan, setPlan] = useState<"start" | "pro">(data.plan);
  const [billing, setBilling] = useState<"monthly" | "annual">(data.billing);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const selected = PLANS.find((p) => p.key === plan)!;
  const amount = billing === "annual" ? selected.annual : selected.monthly;

  const handlePay = () => {
    startTransition(async () => {
      setError(null);
      update({ plan, billing });

      try {
        const res = await fetch("/api/start/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, plan, billing, amount }),
        });

        const json = await res.json();

        if (!res.ok || !json.refId) {
          setError(json.error ?? "خطا در اتصال به درگاه پرداخت. دوباره تلاش کنید.");
          return;
        }

        // Auto-submit POST form to redirect to Bank Mellat
        const form = document.createElement("form");
        form.method = "POST";
        form.action = json.payUrl;
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "RefId";
        input.value = json.refId;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      } catch {
        setError("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    });
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-black">انتخاب پلن و پرداخت</h2>

      {/* Billing toggle */}
      <div className="mb-6 flex justify-center">
        <div className="relative flex rounded-full border border-line bg-surface p-1">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`relative z-10 rounded-full px-5 py-2 text-sm font-bold transition-colors ${billing === "monthly" ? "text-white" : "text-muted hover:text-foreground"}`}
          >
            ماهانه
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            className={`relative z-10 rounded-full px-5 py-2 text-sm font-bold transition-colors ${billing === "annual" ? "text-white" : "text-muted hover:text-foreground"}`}
          >
            سالانه
          </button>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className={`absolute inset-y-1 z-0 w-[calc(50%-0.25rem)] rounded-full bg-gradient-to-l from-brand to-navy shadow-sm ${billing === "annual" ? "left-1" : "right-1"}`}
          />
        </div>
        {billing === "annual" && (
          <span className="mr-3 self-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
            ۲ ماه رایگان
          </span>
        )}
      </div>

      {/* Plan cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((p) => {
          const active = plan === p.key;
          const price = billing === "annual" ? p.annual : p.monthly;
          return (
            <motion.button
              key={p.key}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPlan(p.key)}
              className={`relative rounded-3xl border p-6 text-right transition-all duration-300 ${
                active
                  ? "border-brand/50 bg-gradient-to-b from-brand/8 to-surface shadow-xl shadow-brand/10 scale-[1.02]"
                  : "border-line bg-surface shadow-sm"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-l from-brand to-navy px-3 py-1 text-[11px] font-bold text-white">
                  محبوب‌ترین
                </span>
              )}
              {active && (
                <motion.span
                  layoutId="plan-check"
                  className="absolute left-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-brand text-white"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4L19 7" />
                  </svg>
                </motion.span>
              )}
              <p className="font-black">{p.name}</p>
              <div className="mt-3 flex items-end gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="gradient-text text-2xl font-black"
                  >
                    {toFa(price)}
                  </motion.span>
                </AnimatePresence>
                <span className="pb-1 text-xs text-muted">تومان / ماه</span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.button>
          );
        })}
      </div>

      {/* Order summary */}
      <div className="mt-6 rounded-2xl border border-line bg-bg-soft px-5 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">پلن انتخابی</span>
          <span className="font-bold">
            {selected.name} · {billing === "annual" ? "سالانه" : "ماهانه"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted">مبلغ قابل پرداخت</span>
          <span className="gradient-text text-lg font-black">{toFa(amount)} تومان</span>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={isPending}
          className="flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-bg-soft disabled:opacity-50"
        >
          <ArrowRight className="h-4 w-4" />
          مرحله قبل
        </button>

        <button
          type="button"
          onClick={handlePay}
          disabled={isPending}
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-l from-brand to-navy py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              در حال اتصال به درگاه...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              پرداخت و تکمیل ثبت‌نام
            </>
          )}
          {!isPending && <span className="absolute inset-0 shine animate-shimmer" />}
        </button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        پرداخت امن از طریق درگاه به‌پرداخت ملت
      </p>
    </div>
  );
}
