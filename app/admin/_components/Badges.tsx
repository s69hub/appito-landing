export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending_payment: { label: "در انتظار پرداخت", cls: "bg-amber-100 text-amber-700" },
    payment_failed: { label: "پرداخت ناموفق", cls: "bg-rose-100 text-rose-700" },
    paid: { label: "پرداخت شده", cls: "bg-emerald-100 text-emerald-700" },
    activated: { label: "فعال شده", cls: "bg-brand/10 text-brand" },
    cancelled: { label: "لغو شده", cls: "bg-gray-100 text-gray-600" },
  };
  const s = map[status] ?? { label: status, cls: "bg-gray-100 text-gray-600" };
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>{s.label}</span>;
}

export function ConsultStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    new: { label: "جدید", cls: "bg-brand/10 text-brand" },
    contacted: { label: "تماس گرفته شد", cls: "bg-sky-100 text-sky-700" },
    converted: { label: "تبدیل شد", cls: "bg-emerald-100 text-emerald-700" },
    closed: { label: "بسته شد", cls: "bg-gray-100 text-gray-600" },
  };
  const s = map[status] ?? { label: status, cls: "bg-gray-100 text-gray-600" };
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>{s.label}</span>;
}
