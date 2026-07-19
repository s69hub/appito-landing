import { getDb } from "@/lib/db";
import Link from "next/link";
import { ClipboardList, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { StatusBadge, ConsultStatusBadge } from "../_components/Badges";

function toFa(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
function dateStr(ms: number) {
  return new Date(ms).toLocaleDateString("fa-IR");
}

type RegRow = {
  id: string;
  created_at: number;
  full_name: string;
  plan: string;
  status: string;
  amount: number;
  domain_name: string;
};
type ConRow = { id: string; created_at: number; name: string; phone: string; status: string; industry: string | null };

export default function AdminDashboard() {
  const db = getDb();

  const totalRegs = (db.prepare("SELECT COUNT(*) as c FROM registrations").get() as { c: number }).c;
  const paidRegs = (
    db.prepare("SELECT COUNT(*) as c FROM registrations WHERE status='paid' OR status='activated'").get() as {
      c: number;
    }
  ).c;
  const pendingRegs = (
    db.prepare("SELECT COUNT(*) as c FROM registrations WHERE status='pending_payment'").get() as { c: number }
  ).c;
  const newConsults = (db.prepare("SELECT COUNT(*) as c FROM consultations WHERE status='new'").get() as { c: number })
    .c;

  const recentRegs = db
    .prepare(
      "SELECT id, created_at, full_name, plan, status, amount, domain_name FROM registrations ORDER BY created_at DESC LIMIT 8",
    )
    .all() as RegRow[];

  const recentConsults = db
    .prepare("SELECT id, created_at, name, phone, status, industry FROM consultations ORDER BY created_at DESC LIMIT 6")
    .all() as ConRow[];

  const stats = [
    { label: "کل ثبت‌نام‌ها", value: toFa(totalRegs), icon: ClipboardList, color: "text-brand bg-brand/10" },
    { label: "پرداخت موفق", value: toFa(paidRegs), icon: CheckCircle2, color: "text-emerald-600 bg-emerald-500/10" },
    { label: "در انتظار پرداخت", value: toFa(pendingRegs), icon: Clock, color: "text-amber-600 bg-amber-500/10" },
    {
      label: "مشاوره‌های جدید",
      value: toFa(newConsults),
      icon: MessageCircle,
      color: "text-violet-600 bg-violet-500/10",
    },
  ];

  return (
    <div>
      <h1 className="mb-7 text-2xl font-black">داشبورد</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-4 p-5">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${s.color}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent registrations */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black">آخرین ثبت‌نام‌ها</h2>
          <Link href="/admin/registrations" className="text-xs font-bold text-brand hover:underline">
            مشاهده همه
          </Link>
        </div>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-bg-soft">
                {["نام", "پلن", "دامنه", "مبلغ", "وضعیت", "تاریخ"].map((h) => (
                  <th key={h} className="px-4 py-3 text-right text-xs font-bold text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRegs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted text-sm">
                    هنوز ثبت‌نامی وجود ندارد
                  </td>
                </tr>
              ) : (
                recentRegs.map((r) => (
                  <tr key={r.id} className="border-b border-line last:border-0 hover:bg-bg-soft/50">
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/admin/registrations/${r.id}`} className="hover:text-brand">
                        {r.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{r.plan === "pro" ? "حرفه‌ای" : "شروع"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted" dir="ltr">
                      {r.domain_name}
                    </td>
                    <td className="px-4 py-3 text-muted">{toFa(r.amount)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{dateStr(r.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent consultations */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black">آخرین مشاوره‌ها</h2>
          <Link href="/admin/consultations" className="text-xs font-bold text-brand hover:underline">
            مشاهده همه
          </Link>
        </div>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-bg-soft">
                {["نام", "موبایل", "صنف", "وضعیت", "تاریخ"].map((h) => (
                  <th key={h} className="px-4 py-3 text-right text-xs font-bold text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentConsults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted text-sm">
                    هنوز مشاوره‌ای وجود ندارد
                  </td>
                </tr>
              ) : (
                recentConsults.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0 hover:bg-bg-soft/50">
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/admin/consultations/${c.id}`} className="hover:text-brand">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted" dir="ltr">
                      {c.phone}
                    </td>
                    <td className="px-4 py-3 text-muted">{c.industry ?? "—"}</td>
                    <td className="px-4 py-3">
                      <ConsultStatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{dateStr(c.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
