"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { industries } from "@/components/sections/IndustryShowcase";
import StepPersonal from "./_steps/StepPersonal";
import StepBusiness from "./_steps/StepBusiness";
import StepDomain from "./_steps/StepDomain";
import StepPlan from "./_steps/StepPlan";

export type FormData = {
  // Step 1
  full_name: string;
  phone: string;
  email: string;
  city: string;
  // Step 2
  biz_name: string;
  industry: string;
  industryIndex: number;
  biz_description: string;
  product_count: string;
  // Step 3
  domain_type: "existing" | "subdomain";
  domain_name: string;
  // Step 4
  plan: "start" | "pro";
  billing: "monthly" | "annual";
};

const STORAGE_KEY = "appito_start_form";
const TOTAL_STEPS = 4;

const stepLabels = ["مشخصات فردی", "کسب‌وکار", "دامنه", "پلن و پرداخت"];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

function loadSaved(): Partial<FormData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function StartPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => ({
    full_name: "",
    phone: "",
    email: "",
    city: "",
    biz_name: "",
    industry: "",
    industryIndex: 0,
    biz_description: "",
    product_count: "",
    domain_type: "existing",
    domain_name: "",
    plan: "pro",
    billing: "monthly",
  }));

  // Restore from sessionStorage on mount
  useEffect(() => {
    const saved = loadSaved();
    if (Object.keys(saved).length > 0) {
      setFormData((prev) => ({ ...prev, ...saved }));
    }
  }, []);

  const update = useCallback((patch: Partial<FormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...patch };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    setDir(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goPrev = useCallback(() => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const currentIndustry = industries[formData.industryIndex];

  return (
    <div dir="rtl" className="relative min-h-screen overflow-hidden bg-bg text-foreground">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-40 right-1/3 h-[30rem] w-[30rem] rounded-full bg-brand/15 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-navy/8 blur-3xl animate-blob [animation-delay:8s]" />
      </div>

      {/* top bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت
        </Link>
        <span className="gradient-text text-sm font-black">اپیتو</span>
      </div>

      {/* layout */}
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 pb-24 pt-4 lg:grid-cols-[1fr_320px]">
        {/* left: form area */}
        <div>
          {/* heading + step counter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="mb-1 text-sm font-medium text-brand">
              مرحله {toPersian(step)} از {toPersian(TOTAL_STEPS)}
            </p>
            <h1 className="text-3xl font-black">ثبت‌نام در اپیتو</h1>
          </motion.div>

          {/* step indicator */}
          <StepIndicator step={step} />

          {/* progress bar */}
          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full rounded-full bg-gradient-to-l from-brand to-navy"
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* step card */}
          <div className="relative mt-8 overflow-hidden">
            <AnimatePresence custom={dir} mode="popLayout">
              <motion.div
                key={step}
                custom={dir}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                variants={slideVariants as any}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <div className="card p-7 md:p-9">
                  {step === 1 && <StepPersonal data={formData} update={update} onNext={goNext} />}
                  {step === 2 && <StepBusiness data={formData} update={update} onNext={goNext} onPrev={goPrev} />}
                  {step === 3 && <StepDomain data={formData} update={update} onNext={goNext} onPrev={goPrev} />}
                  {step === 4 && <StepPlan data={formData} update={update} onPrev={goPrev} />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* right: live phone preview */}
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <p className="mb-4 text-center text-xs font-medium text-muted">پیش‌نمایش فروشگاه شما</p>
            <div className="flex justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentIndustry.id}
                  initial={{ opacity: 0, scale: 0.94, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.94, rotateY: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ perspective: 1000 }}
                >
                  <PhoneMockup
                    {...currentIndustry.store}
                    className="w-[220px]"
                    accentGradient={currentIndustry.theme.buttonGradient}
                    accentChip={currentIndustry.theme.chip}
                    accentBadge={currentIndustry.theme.chip}
                    accentText={currentIndustry.theme.text}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-center text-[11px] text-muted">طراحی کامل در {toPersian(24)} ساعت</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0">
      {stepLabels.map((label, i) => {
        const idx = i + 1;
        const done = idx < step;
        const active = idx === step;
        return (
          <div key={label} className="flex flex-1 items-center">
            {/* circle */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  backgroundColor: done ? "var(--color-brand)" : active ? "var(--color-brand)" : "var(--color-bg-soft)",
                  borderColor: done || active ? "var(--color-brand)" : "var(--color-line)",
                  scale: active ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-black"
              >
                {done ? (
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                ) : (
                  <span className={active ? "text-white" : "text-muted"}>{toPersian(idx)}</span>
                )}
                {active && (
                  <motion.span
                    className="absolute -inset-1.5 rounded-full border border-brand/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <span
                className={`mt-1.5 hidden text-[10px] font-medium sm:block ${
                  active ? "text-brand" : done ? "text-foreground" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {/* connector */}
            {i < stepLabels.length - 1 && (
              <motion.div
                className="mx-1 h-0.5 flex-1"
                animate={{
                  backgroundColor: idx < step ? "var(--color-brand)" : "var(--color-line)",
                }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function toPersian(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
