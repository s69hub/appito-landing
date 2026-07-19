"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { StatusBadge } from "../_components/Badges";

type RegRow = {
  id: string;
  created_at: number;
  full_name: string;
  phone: string;
  email: string;
  plan: string;
  billing: string;
  status: string;
  amount: number;
  domain_name: string;
  industry: string;
};

type ApiResponse = {
  rows: RegRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function toFa(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
function dateStr(ms: number) {
  return new Date(ms).toLocaleDateString("fa-IR");
}

const statuses = ["all", "pending_payment", "payment_failed", "paid", "activated", "cancelled"];
const statusLabels: Record<string, string> = {
  all: "همه",
  pending_payment: "در انتظار",
  payment_failed: "ناموفق",
  paid: "پرداخت شده",
  activated: "فعال",
  cancelled: "لغو شده",
};

export default function RegistrationsPage() {
  return (
    <Suspense fallback={<Loader2 className="mx-auto mt-20 h-6 w-6 animate-spin text-muted" />}>
      <RegistrationsContent />
    </Suspense>
  );
}

function RegistrationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get("status") ?? "all";
  const q = searchParams.get("q") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const [searchInput, setSearchInput] = useState(q);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = useCallback(
    (next: { status?: string; q?: string; page?: number }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.status !== undefined) params.set("status", next.status);
      if (next.q !== undefined) {
        if (next.q) params.set("q", next.q);
        else params.delete("q");
      }
      params.set("page", String(next.page ?? 1));
      router.replace(`/admin/registrations?${params.toString()}`);
    },
    [router, searchParams],
  );

  // Debounce search input -> URL param
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchInput !== q) updateParams({ status: statusFilter, q: searchInput, page: 1 });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Fetch data whenever filters/page change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({ status: statusFilter, q, page: String(page), pageSize: "10" });
    fetch(`/api/admin/registrations?${params.toString()}`)
      .then((res) => res.json())
      .then((json: ApiResponse) => {
        if (!cancelled) setData(json);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [statusFilter, q, page]);

  const rows = data?.rows ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <div>
      <h1 className="mb-7 text-2xl font-black">ثبت‌نام‌ها</h1>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="جستجو نام، موبایل، ایمیل..."
          className="w-full max-w-xs flex-1 rounded-xl border border-line bg-surface px-3.5 py-2 text-sm outline-none focus:border-brand"
        />
        <div className="flex flex-wrap gap-1.5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => updateParams({ status: s, q, page: 1 })}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                statusFilter === s ? "bg-brand text-white" : "border border-line bg-surface text-muted hover:bg-bg-soft"
              }`}
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-bg-soft">
              {["نام", "موبایل", "پلن", "دامنه", "مبلغ", "وضعیت", "تاریخ", ""].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 text-right text-xs font-bold text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-muted">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-muted">
                  نتیجه‌ای یافت نشد
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0 hover:bg-bg-soft/40">
                  <td className="whitespace-nowrap px-4 py-3 font-medium">{r.full_name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted" dir="ltr">
                    {r.phone}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {r.plan === "pro" ? "حرفه‌ای" : "شروع"} · {r.billing === "annual" ? "سالانه" : "ماهانه"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted" dir="ltr">
                    {r.domain_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{toFa(r.amount)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">{dateStr(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/registrations/${r.id}`}
                      className="text-xs font-bold text-brand hover:underline"
                    >
                      جزئیات
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted">{toFa(total)} نتیجه</p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateParams({ status: statusFilter, q, page: page - 1 })}
              disabled={page <= 1}
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:bg-bg-soft disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-muted">
              صفحه {toFa(page)} از {toFa(totalPages)}
            </span>
            <button
              onClick={() => updateParams({ status: statusFilter, q, page: page + 1 })}
              disabled={page >= totalPages}
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:bg-bg-soft disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
