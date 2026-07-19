import Link from "next/link";

export default function ConsultThanksPage() {
  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-5 text-center text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="card max-w-md p-10">
        {/* animated checkmark */}
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
            <circle cx="26" cy="26" r="24" className="stroke-emerald-500/30" />
            <path
              d="M14 26 l8 8 16-16"
              className="stroke-emerald-500"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 0,
                animation: "draw 0.6s 0.2s ease both",
              }}
            />
          </svg>
        </div>

        <h1 className="text-2xl font-black">درخواست شما ثبت شد</h1>
        <p className="mt-3 text-muted">
          کارشناسان اپیتو در اسرع وقت با شما تماس می‌گیرند. معمولاً ظرف ۲۴ ساعت کاری با شما در ارتباط خواهیم بود.
        </p>

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
        @keyframes draw {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
