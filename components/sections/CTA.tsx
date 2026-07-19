import { Reveal } from "../Reveal";

export function CTA() {
  return (
    <section id="cta" className="relative py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-brand/30 bg-gradient-to-br from-brand/12 via-surface to-bg-soft p-10 text-center shadow-xl md:p-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl animate-blob" />
              <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-navy/10 blur-3xl animate-blob [animation-delay:6s]" />
              <div className="absolute inset-0 grid-bg opacity-50" />
            </div>

            <div className="relative">
              <h2 className="text-3xl font-black leading-tight md:text-5xl">
                همین امروز اپلیکیشن فروشگاهی
                <br />
                <span className="gradient-text">اختصاصی‌تان</span> را راه بیندازید
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted">
                در کمتر از ۲۴ ساعت، یک اپلیکیشن فروشگاهی حرفه‌ای داشته باشید. بدون کدنویسی، بدون دردسر فنی.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/start"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-l from-brand to-navy px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-105"
                >
                  <span className="relative z-10">شروع کنید</span>
                  <span className="absolute inset-0 shine animate-shimmer" />
                </a>
                <a
                  href="/consult"
                  className="rounded-full border border-line bg-surface px-8 py-4 text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-bg-soft"
                >
                  مشاوره رایگان
                </a>
              </div>

              <p className="mt-6 text-xs text-muted">بدون نیاز به دانش فنی · راه‌اندازی توسط تیم اپیتو</p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                {["بدون کدنویسی", "راه‌اندازی ۲۴ ساعته", "پشتیبانی فارسی", "لغو آسان"].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-brand">
                      <path
                        d="m5 13 4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
