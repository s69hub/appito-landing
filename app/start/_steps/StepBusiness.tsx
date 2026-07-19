"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Briefcase, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FieldWrapper, FieldInput } from "../_components/Fields";
import { industries } from "@/components/sections/IndustryShowcase";
import type { FormData } from "../page";

const productCounts = ["۱–۵۰", "۵۰–۲۰۰", "۲۰۰–۵۰۰", "۵۰۰+", "نامحدود"];

type Props = {
  data: FormData;
  update: (p: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function StepBusiness({ data, update, onNext, onPrev }: Props) {
  const [selectedIndustry, setSelectedIndustry] = useState(data.industryIndex);
  const [selectedCount, setSelectedCount] = useState(data.product_count);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { biz_name: data.biz_name, biz_description: data.biz_description },
  });

  const onSubmit = (values: { biz_name: string; biz_description: string }) => {
    update({
      ...values,
      industry: industries[selectedIndustry].label,
      industryIndex: selectedIndustry,
      product_count: selectedCount,
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="mb-6 text-xl font-black">مشخصات کسب‌وکار</h2>

      <FieldWrapper
        icon={<Briefcase className="h-4 w-4" />}
        label="نام کسب‌وکار"
        required
        error={errors.biz_name?.message}
      >
        <FieldInput
          {...register("biz_name", { required: "نام کسب‌وکار الزامی است" })}
          placeholder="بوتیک لیلا"
          hasError={!!errors.biz_name}
        />
      </FieldWrapper>

      {/* Industry grid */}
      <div className="mt-5">
        <label className="mb-3 block text-sm font-bold text-foreground">
          صنف <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const active = i === selectedIndustry;
            return (
              <motion.button
                key={ind.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedIndustry(i)}
                className={`relative flex flex-col items-center gap-1.5 rounded-2xl border py-4 text-center text-xs font-medium transition-all duration-200 ${
                  active
                    ? "border-brand/60 bg-brand/8 text-brand shadow-md shadow-brand/15"
                    : "border-line bg-surface text-muted hover:border-brand/30 hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-brand" : "text-muted"}`} />
                {ind.label}
                {active && (
                  <motion.span
                    layoutId="industry-dot"
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-brand"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <FieldWrapper icon={<FileText className="h-4 w-4" />} label="توضیح کوتاه">
          <textarea
            {...register("biz_description")}
            rows={2}
            placeholder="کوتاه توضیح دهید چه محصول یا خدماتی ارائه می‌دهید..."
            className="field-input resize-none"
          />
        </FieldWrapper>
      </div>

      {/* Product count */}
      <div className="mt-5">
        <label className="mb-2.5 block text-sm font-bold text-foreground">تعداد تقریبی محصولات</label>
        <div className="flex flex-wrap gap-2">
          {productCounts.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCount(c === selectedCount ? "" : c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedCount === c
                  ? "border-brand bg-brand/10 text-brand shadow-sm"
                  : "border-line bg-surface text-muted hover:border-brand/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <NavButtons onPrev={onPrev} />
    </form>
  );
}

export function NavButtons({ onPrev }: { onPrev: () => void }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrev}
        className="flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-bg-soft"
      >
        <ArrowRight className="h-4 w-4" />
        مرحله قبل
      </button>
      <button
        type="submit"
        className="group flex items-center gap-2 rounded-full bg-gradient-to-l from-brand to-navy px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-105"
      >
        مرحله بعد
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      </button>
    </div>
  );
}
