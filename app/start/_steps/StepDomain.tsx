"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Globe, Link2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FieldWrapper, FieldInput } from "../_components/Fields";
import { NavButtons } from "./StepBusiness";
import type { FormData } from "../page";

type Props = {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function StepDomain({ data, update, onNext, onPrev }: Props) {
  const [domainType, setDomainType] = useState<"existing" | "subdomain">(data.domain_type);
  const [preview, setPreview] = useState(data.domain_name);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { domain_name: data.domain_name },
  });

  const watchedDomain = watch("domain_name");

  useEffect(() => {
    if (domainType === "subdomain") {
      // clean slug: lowercase, only a-z 0-9 -
      const slug = watchedDomain
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/^-+|-+$/g, "");
      setPreview(slug);
    } else {
      setPreview(watchedDomain);
    }
  }, [watchedDomain, domainType]);

  const onSubmit = (values: { domain_name: string }) => {
    const finalName =
      domainType === "subdomain"
        ? preview
        : values.domain_name
            .replace(/^https?:\/\//i, "")
            .replace(/^www\./i, "")
            .trim();
    if (!finalName) return;
    update({ domain_type: domainType, domain_name: finalName });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="mb-6 text-xl font-black">دامنه</h2>

      {/* Type picker */}
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            { value: "existing", icon: Link2, title: "دامنه دارم", sub: "مثلاً mybiz.com" },
            { value: "subdomain", icon: Globe, title: "دامنه ندارم", sub: "زیردامنه رایگان اپیتو" },
          ] as const
        ).map((opt) => {
          const Icon = opt.icon;
          const active = domainType === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setDomainType(opt.value);
                setValue("domain_name", "");
              }}
              className={`flex flex-col items-center gap-2 rounded-2xl border py-6 text-center transition-all duration-200 ${
                active
                  ? "border-brand/60 bg-brand/8 shadow-md shadow-brand/15"
                  : "border-line bg-surface text-muted hover:border-brand/30"
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  active ? "bg-brand text-white" : "bg-bg-soft text-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className={`text-sm font-black ${active ? "text-brand" : "text-foreground"}`}>{opt.title}</span>
              <span className="text-xs text-muted">{opt.sub}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Domain input */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {domainType === "existing" ? (
            <motion.div
              key="existing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FieldWrapper
                icon={<Link2 className="h-4 w-4" />}
                label="آدرس دامنه"
                required
                error={errors.domain_name?.message}
              >
                <FieldInput
                  {...register("domain_name", {
                    required: "آدرس دامنه الزامی است",
                    pattern: {
                      value: /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
                      message: "دامنه معتبر نیست (مثال: mybiz.com)",
                    },
                    setValueAs: (v: string) =>
                      v
                        .replace(/^https?:\/\//i, "")
                        .replace(/^www\./i, "")
                        .trim(),
                  })}
                  dir="ltr"
                  placeholder="mybiz.com"
                  hasError={!!errors.domain_name}
                />
              </FieldWrapper>
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-800">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                پس از ثبت‌نام، راهنمای تنظیم DNS برای شما ارسال می‌شود.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="subdomain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FieldWrapper
                icon={<Globe className="h-4 w-4" />}
                label="نام زیردامنه"
                required
                error={errors.domain_name?.message}
              >
                <FieldInput
                  {...register("domain_name", {
                    required: "نام زیردامنه الزامی است",
                    pattern: {
                      value: /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/,
                      message: "فقط حروف انگلیسی کوچک، اعداد و خط تیره",
                    },
                  })}
                  dir="ltr"
                  placeholder="mybiz"
                  hasError={!!errors.domain_name}
                />
              </FieldWrapper>

              {/* Live preview */}
              <AnimatePresence>
                {preview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span dir="ltr" className="text-sm font-mono font-bold text-emerald-700">
                        {preview}.myappito.ir
                      </span>
                      <span className="mr-auto rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        در دسترس
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NavButtons onPrev={onPrev} />
    </form>
  );
}
