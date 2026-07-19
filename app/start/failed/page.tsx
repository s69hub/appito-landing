import Link from "next/link";

export default async function StartFailedPage({ searchParams }: { searchParams: Promise<{ reason?: string }> }) {
  const { reason } = await searchParams;
  const message =
    reason && reason !== "notfound" && reason !== "mismatch" && reason !== "server"
      ? decodeURIComponent(reason)
      : "پرداخت ناموفق بود یا از پرداخت انصراف دادید.";

  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-5 text-center text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-40" />
        <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-rose-400/10 blur-3xl" />
      </div>

      <div className="card max-w-md p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10">
          <svg
            viewBox="0 0 52 52"
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <circle cx="26" cy="26" r="24" className="stroke-rose-400/40" />
            <path d="M18 18 l16 16 M34 18 l-16 16" className="stroke-rose-500" />
          </svg>
        </div>

        <h1 className="text-2xl font-black">پرداخت ناموفق</h1>
        <p className="mt-3 text-muted">{message}</p>
        <p className="mt-2 text-sm text-muted">اطلاعات ثبت‌نام شما ذخیره شده است. می‌توانید دوباره تلاش کنید.</p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/start"
            className="rounded-full bg-gradient-to-l from-brand to-navy px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            تلاش مجدد
          </Link>
          <Link
            href="/consult"
            className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-bg-soft"
          >
            درخواست مشاوره رایگان
          </Link>
        </div>
      </div>
    </div>
  );
}
