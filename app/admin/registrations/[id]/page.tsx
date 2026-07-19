import { notFound } from "next/navigation";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { StatusBadge } from "../../_components/Badges";
import { updateRegistrationAction } from "./actions";
import { ArrowRight } from "lucide-react";

type Reg = {
  id: string;
  created_at: number;
  updated_at: number;
  status: string;
  plan: string;
  billing: string;
  amount: number;
  full_name: string;
  phone: string;
  email: string;
  city: string | null;
  biz_name: string;
  industry: string;
  biz_description: string | null;
  product_count: string | null;
  domain_type: string;
  domain_name: string;
  order_id: string | null;
  ref_id: string | null;
  sale_order_id: string | null;
  sale_reference_id: string | null;
  res_code: string | null;
  notes: string | null;
};

function toFa(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
function dateStr(ms: number) {
  return new Date(ms).toLocaleString("fa-IR");
}

export default async function RegistrationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const reg = db.prepare("SELECT * FROM registrations WHERE id=?").get(id) as Reg | undefined;
  if (!reg) notFound();

  const statuses = ["pending_payment", "payment_failed", "paid", "activated", "cancelled"];
  const statusLabels: Record<string, string> = {
    pending_payment: "در انتظار پرداخت",
    payment_failed: "پرداخت ناموفق",
    paid: "پرداخت شده",
    activated: "فعال شده",
    cancelled: "لغو شده",
  };

  const fields: { label: string; value: string | null; mono?: boolean }[] = [
    { label: "نام و نام خانوادگی", value: reg.full_name },
    { label: "موبایل", value: reg.phone, mono: true },
    { label: "ایمیل", value: reg.email, mono: true },
    { label: "شهر", value: reg.city },
    { label: "نام کسب‌وکار", value: reg.biz_name },
    { label: "صنف", value: reg.industry },
    { label: "توضیح", value: reg.biz_description },
    { label: "تعداد محصولات", value: reg.product_count },
    { label: "نوع دامنه", value: reg.domain_type === "existing" ? "دامنه اختصاصی" : "زیردامنه اپیتو" },
    { label: "دامنه", value: reg.domain_name, mono: true },
    { label: "پلن", value: reg.plan === "pro" ? "حرفه‌ای" : "شروع" },
    { label: "نوع پرداخت", value: reg.billing === "annual" ? "سالانه" : "ماهانه" },
    { label: "مبلغ (تومان)", value: toFa(reg.amount) },
  ];

  const payFields: { label: string; value: string | null }[] = [
    { label: "Order ID", value: reg.order_id },
    { label: "Ref ID", value: reg.ref_id },
    { label: "Sale Order ID", value: reg.sale_order_id },
    { label: "Sale Reference ID", value: reg.sale_reference_id },
    { label: "Res Code", value: reg.res_code },
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/registrations"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت
        </Link>
        <h1 className="text-xl font-black">{reg.full_name}</h1>
        <StatusBadge status={reg.status} />
      </div>

      <p className="mb-5 text-xs text-muted">
        ثبت: {dateStr(reg.created_at)} · آخرین به‌روزرسانی: {dateStr(reg.updated_at)}
      </p>

      {/* Info */}
      <div className="card p-6">
        <h2 className="mb-4 text-sm font-black">اطلاعات</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((f) =>
            f.value ? (
              <div key={f.label}>
                <p className="text-[11px] font-medium text-muted">{f.label}</p>
                <p className={`mt-0.5 text-sm font-bold ${f.mono ? "font-mono" : ""}`} dir={f.mono ? "ltr" : undefined}>
                  {f.value}
                </p>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Payment info */}
      <div className="card mt-4 p-6">
        <h2 className="mb-4 text-sm font-black">اطلاعات پرداخت</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {payFields.map((f) => (
            <div key={f.label}>
              <p className="text-[11px] font-medium text-muted">{f.label}</p>
              <p className="mt-0.5 font-mono text-xs font-bold" dir="ltr">
                {f.value ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="card mt-4 p-6">
        <h2 className="mb-4 text-sm font-black">مدیریت</h2>
        <form action={updateRegistrationAction}>
          <input type="hidden" name="id" value={reg.id} />
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold text-muted">تغییر وضعیت</label>
            <select
              name="status"
              defaultValue={reg.status}
              className="w-full rounded-xl border border-line bg-bg-soft px-3.5 py-2.5 text-sm outline-none focus:border-brand"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold text-muted">یادداشت ادمین</label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={reg.notes ?? ""}
              className="w-full rounded-xl border border-line bg-bg-soft px-3.5 py-2.5 text-sm outline-none focus:border-brand resize-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-l from-brand to-navy px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  );
}
