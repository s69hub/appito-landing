"use client";

import { useActionState, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { submitConsultation } from "./actions";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Camera,
  Send,
  MessageSquare,
  Clock,
  ChevronDown,
  Loader2,
  ArrowRight,
} from "lucide-react";

const industries = [
  "مد و پوشاک",
  "آرایشی بهداشتی",
  "کافه و رستوران",
  "کالای دیجیتال",
  "صنایع‌دستی",
  "گل و گیاه",
  "پوشاک ورزشی",
  "اینفلوئنسر",
  "سایر",
];

const callTimes = [
  { value: "morning", label: "صبح", sub: "۸–۱۲" },
  { value: "afternoon", label: "بعدازظهر", sub: "۱۲–۱۷" },
  { value: "evening", label: "عصر", sub: "۱۷–۲۰" },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ConsultPage() {
  const [state, action, pending] = useActionState(submitConsultation, null);
  const [socialOpen, setSocialOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div dir="rtl" className="relative min-h-screen overflow-hidden bg-bg text-foreground">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-navy/10 blur-3xl animate-blob [animation-delay:6s]" />
      </div>

      {/* header bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به سایت
        </Link>
        <span className="gradient-text text-sm font-black">اپیتو</span>
      </div>

      {/* card */}
      <div className="mx-auto max-w-2xl px-5 pb-24 pt-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-bold text-brand backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            مشاوره رایگان
          </span>
          <h1 className="mt-4 text-3xl font-black md:text-4xl">با ما صحبت کنید</h1>
          <p className="mt-3 text-muted">اطلاعات خود را وارد کنید. کارشناسان ما در کمترین زمان با شما تماس می‌گیرند.</p>
        </motion.div>

        <motion.form
          ref={formRef}
          action={action}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="card p-7 md:p-9"
        >
          {/* error banner */}
          <AnimatePresence>
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 border border-rose-200"
              >
                {state.error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Row: name + phone ── */}
          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
            <Field icon={<User className="h-4 w-4" />} label="نام" required>
              <input name="name" required placeholder="نام و نام خانوادگی" className="field-input" />
            </Field>
            <Field icon={<Phone className="h-4 w-4" />} label="موبایل" required>
              <input
                name="phone"
                type="tel"
                required
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                dir="ltr"
                className="field-input text-left"
              />
            </Field>
          </motion.div>

          {/* ── Row: email + city ── */}
          <motion.div variants={fadeUp} className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field icon={<Mail className="h-4 w-4" />} label="ایمیل">
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                dir="ltr"
                className="field-input text-left"
              />
            </Field>
            <Field icon={<MapPin className="h-4 w-4" />} label="شهر">
              <input name="city" placeholder="تهران" className="field-input" />
            </Field>
          </motion.div>

          {/* ── Industry ── */}
          <motion.div variants={fadeUp} className="mt-4">
            <label className="mb-1.5 block text-sm font-bold text-foreground">صنف / نوع کسب‌وکار</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setSelectedIndustry(ind === selectedIndustry ? "" : ind)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                    selectedIndustry === ind
                      ? "border-brand bg-brand/10 text-brand shadow-sm shadow-brand/20"
                      : "border-line bg-surface text-muted hover:border-brand/40 hover:text-foreground"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
            <input type="hidden" name="industry" value={selectedIndustry} />
          </motion.div>

          {/* ── Social section ── */}
          <motion.div variants={fadeUp} className="mt-6">
            <button
              type="button"
              onClick={() => setSocialOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-line bg-bg-soft px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-surface"
            >
              <span className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-brand" />
                شبکه‌های اجتماعی
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">اختیاری</span>
              </span>
              <motion.span animate={{ rotate: socialOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="h-4 w-4 text-muted" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { name: "instagram", label: "اینستاگرام", placeholder: "username", icon: "📸" },
                      { name: "telegram", label: "تلگرام", placeholder: "@username", icon: "✈️" },
                      { name: "whatsapp", label: "واتساپ", placeholder: "09123456789", icon: "💬" },
                      { name: "bale", label: "بله", placeholder: "username", icon: "🔵" },
                      { name: "rubika", label: "روبیکا", placeholder: "username", icon: "🟣" },
                    ].map((s) => (
                      <div key={s.name}>
                        <label className="mb-1 block text-xs font-medium text-muted">
                          {s.icon} {s.label}
                        </label>
                        <input
                          name={s.name}
                          placeholder={s.placeholder}
                          dir="ltr"
                          className="field-input text-left text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Message ── */}
          <motion.div variants={fadeUp} className="mt-4">
            <Field icon={<MessageSquare className="h-4 w-4" />} label="توضیحات / سوال">
              <textarea
                name="message"
                rows={3}
                placeholder="در چه زمینه‌ای نیاز به مشاوره دارید؟"
                className="field-input resize-none"
              />
            </Field>
          </motion.div>

          {/* ── Preferred call time ── */}
          <motion.div variants={fadeUp} className="mt-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
              <Clock className="h-4 w-4 text-muted" />
              زمان مناسب تماس
            </label>
            <div className="grid grid-cols-3 gap-3">
              {callTimes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setSelectedTime(t.value === selectedTime ? "" : t.value)}
                  className={`flex flex-col items-center rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                    selectedTime === t.value
                      ? "border-brand bg-brand/10 text-brand shadow-sm shadow-brand/20"
                      : "border-line bg-surface text-muted hover:border-brand/40"
                  }`}
                >
                  <span className="font-bold">{t.label}</span>
                  <span className="mt-0.5 text-xs opacity-70">{t.sub}</span>
                </button>
              ))}
            </div>
            <input type="hidden" name="preferred_call_time" value={selectedTime} />
          </motion.div>

          {/* ── Submit ── */}
          <motion.div variants={fadeUp} className="mt-8">
            <button
              type="submit"
              disabled={pending}
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-l from-brand to-navy py-4 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    ارسال درخواست مشاوره
                  </>
                )}
              </span>
              {!pending && <span className="absolute inset-0 shine animate-shimmer" />}
            </button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-center text-xs text-muted">
            اطلاعات شما نزد ما محفوظ است و با شخص ثالثی به اشتراک گذاشته نمی‌شود.
          </motion.p>
        </motion.form>
      </div>

      <style jsx global>{`
        .field-input {
          width: 100%;
          background: var(--color-bg-soft);
          border: 1px solid var(--color-line);
          border-radius: 0.75rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }
        .field-input::placeholder {
          color: var(--color-muted);
        }
        .field-input:focus {
          border-color: var(--color-brand);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand) 15%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({
  icon,
  label,
  required,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-foreground">
        <span className="text-muted">{icon}</span>
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}
