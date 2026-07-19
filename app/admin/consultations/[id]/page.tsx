import { notFound } from "next/navigation";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { ConsultStatusBadge } from "../../_components/Badges";
import { updateConsultationAction } from "./actions";
import { ArrowRight } from "lucide-react";

type Con = {
  id: string;
  created_at: number;
  updated_at: number;
  status: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  industry: string | null;
  instagram: string | null;
  telegram: string | null;
  whatsapp: string | null;
  bale: string | null;
  rubika: string | null;
  message: string | null;
  preferred_call_time: string | null;
  notes: string | null;
};

function dateStr(ms: number) {
  return new Date(ms).toLocaleString("fa-IR");
}

export default async function ConsultDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const con = db.prepare("SELECT * FROM consultations WHERE id=?").get(id) as Con | undefined;
  if (!con) notFound();

  const timeLabels: Record<string, string> = { morning: "صبح ۸–۱۲", afternoon: "بعدازظهر ۱۲–۱۷", evening: "عصر ۱۷–۲۰" };
  const statuses = ["new", "contacted", "converted", "closed"];
  const statusLabels: Record<string, string> = {
    new: "جدید",
    contacted: "تماس گرفته شد",
    converted: "تبدیل شد",
    closed: "بسته شد",
  };

  const socials = [
    { icon: "📸", label: "اینستاگرام", value: con.instagram },
    { icon: "✈️", label: "تلگرام", value: con.telegram },
    { icon: "💬", label: "واتساپ", value: con.whatsapp },
    { icon: "🔵", label: "بله", value: con.bale },
    { icon: "🟣", label: "روبیکا", value: con.rubika },
  ].filter((s) => s.value);

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/consultations"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت
        </Link>
        <h1 className="text-xl font-black">{con.name}</h1>
        <ConsultStatusBadge status={con.status} />
      </div>
      <p className="mb-5 text-xs text-muted">ثبت: {dateStr(con.created_at)}</p>

      <div className="card p-6">
        <h2 className="mb-4 text-sm font-black">اطلاعات</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "نام", value: con.name },
            { label: "موبایل", value: con.phone, mono: true },
            { label: "ایمیل", value: con.email, mono: true },
            { label: "شهر", value: con.city },
            { label: "صنف", value: con.industry },
            {
              label: "زمان تماس",
              value: con.preferred_call_time ? (timeLabels[con.preferred_call_time] ?? con.preferred_call_time) : null,
            },
          ]
            .filter((f) => f.value)
            .map((f) => (
              <div key={f.label}>
                <p className="text-[11px] font-medium text-muted">{f.label}</p>
                <p className={`mt-0.5 text-sm font-bold ${f.mono ? "font-mono" : ""}`} dir={f.mono ? "ltr" : undefined}>
                  {f.value}
                </p>
              </div>
            ))}
        </div>
        {con.message && (
          <div className="mt-4">
            <p className="text-[11px] font-medium text-muted">پیام</p>
            <p className="mt-1 rounded-xl bg-bg-soft p-3 text-sm">{con.message}</p>
          </div>
        )}
        {socials.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-medium text-muted">شبکه‌های اجتماعی</p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <span
                  key={s.label}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium"
                >
                  {s.icon} {s.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card mt-4 p-6">
        <h2 className="mb-4 text-sm font-black">مدیریت</h2>
        <form action={updateConsultationAction}>
          <input type="hidden" name="id" value={con.id} />
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold text-muted">تغییر وضعیت</label>
            <select
              name="status"
              defaultValue={con.status}
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
              defaultValue={con.notes ?? ""}
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
