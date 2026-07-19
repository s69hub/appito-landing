import Link from "next/link";

export default async function StartSuccessPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-5 text-center text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="card max-w-lg p-10">
        {/* animated check */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <svg
            viewBox="0 0 52 52"
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="26" cy="26" r="24" className="stroke-emerald-400/40" />
            <path
              d="M14 26 l8 8 16-16"
              className="stroke-emerald-500"
              style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: "draw 0.7s 0.3s ease both" }}
            />
          </svg>
        </div>

        <h1 className="text-2xl font-black">پرداخت موفق بود!</h1>
        <p className="mt-3 text-muted">ثبت‌نام شما با موفقیت تکمیل شد. تیم ما ظرف ۲۴ ساعت با شما تماس می‌گیرد.</p>

        {id && (
          <div className="mt-4 rounded-xl bg-bg-soft px-4 py-2.5 text-xs">
            <span className="text-muted">شناسه سفارش: </span>
            <span dir="ltr" className="font-mono font-bold text-foreground">
              {id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        )}

        {/* Next steps */}
        <div className="mt-7 space-y-3 text-right">
          {[
            { step: "۱", text: "تیم اپیتو با شما تماس می‌گیرد" },
            { step: "۲", text: "راهنمای تنظیم DNS برایتان ارسال می‌شود" },
            { step: "۳", text: "فروشگاهتان راه‌اندازی می‌شود" },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-black text-brand">
                {s.step}
              </span>
              <span className="text-sm text-muted">{s.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-l from-brand to-navy px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link
            href="https://demo.myappito.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-bg-soft"
          >
            مشاهده دمو
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes draw { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
