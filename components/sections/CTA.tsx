import { Reveal } from "../Reveal";

export function CTA() {
  return (
    <section id="cta" className="relative py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-2/30 bg-gradient-to-br from-brand/30 via-surface to-bg p-10 text-center md:p-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl animate-blob" />
              <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-brand/30 blur-3xl animate-blob [animation-delay:6s]" />
              <div className="absolute inset-0 grid-bg opacity-40" />
            </div>

            <div className="relative">
              <h2 className="text-3xl font-black leading-tight md:text-5xl">
                همین امروز فروشگاه‌تان را
                <br />
                <span className="gradient-text">روی دامنه‌ی خودتان</span> راه بیندازید
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted">
                در کمتر از چند روز، یک فروشگاه موبایلی حرفه‌ای داشته باشید. بدون
                کدنویسی، بدون دردسر فنی.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-l from-brand to-accent px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
                >
                  <span className="relative z-10">رایگان شروع کنید</span>
                  <span className="absolute inset-0 shine animate-shimmer" />
                </a>
                <a
                  href="#pricing"
                  className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-foreground transition-colors hover:bg-white/5"
                >
                  مشاوره رایگان
                </a>
              </div>

              <p className="mt-6 text-xs text-muted">
                بدون نیاز به کارت بانکی · راه‌اندازی توسط تیم اپیتو
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
