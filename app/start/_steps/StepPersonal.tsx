"use client";

import { useForm } from "react-hook-form";
import { User, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import { FieldWrapper, FieldInput } from "../_components/Fields";
import type { FormData } from "../page";

type Props = { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void };

export default function StepPersonal({ data, update, onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: data.full_name,
      phone: data.phone,
      email: data.email,
      city: data.city,
    },
  });

  const onSubmit = (values: { full_name: string; phone: string; email: string; city: string }) => {
    update(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="mb-6 text-xl font-black">مشخصات فردی</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper
          icon={<User className="h-4 w-4" />}
          label="نام و نام خانوادگی"
          required
          error={errors.full_name?.message}
        >
          <FieldInput
            {...register("full_name", {
              required: "نام الزامی است",
              minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
            })}
            placeholder="علی محمدی"
            hasError={!!errors.full_name}
          />
        </FieldWrapper>

        <FieldWrapper icon={<Phone className="h-4 w-4" />} label="شماره موبایل" required error={errors.phone?.message}>
          <FieldInput
            {...register("phone", {
              required: "موبایل الزامی است",
              pattern: { value: /^(\+98|0)?9\d{9}$/, message: "شماره معتبر نیست" },
            })}
            type="tel"
            dir="ltr"
            placeholder="09123456789"
            hasError={!!errors.phone}
          />
        </FieldWrapper>

        <FieldWrapper icon={<Mail className="h-4 w-4" />} label="ایمیل" required error={errors.email?.message}>
          <FieldInput
            {...register("email", {
              required: "ایمیل الزامی است",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "ایمیل معتبر نیست" },
            })}
            type="email"
            dir="ltr"
            placeholder="you@example.com"
            hasError={!!errors.email}
          />
        </FieldWrapper>

        <FieldWrapper icon={<MapPin className="h-4 w-4" />} label="شهر">
          <FieldInput {...register("city")} placeholder="تهران" />
        </FieldWrapper>
      </div>

      <div className="mt-8 flex justify-start">
        <NextButton />
      </div>
    </form>
  );
}

function NextButton() {
  return (
    <button
      type="submit"
      className="group flex items-center gap-2 rounded-full bg-gradient-to-l from-brand to-navy px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-105"
    >
      مرحله بعد
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
    </button>
  );
}
