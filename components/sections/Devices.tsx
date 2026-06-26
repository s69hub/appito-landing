import { Reveal } from "../Reveal";
import { PhoneMockup } from "../PhoneMockup";

const deskProducts = [
  "from-pink-500/30 to-fuchsia-500/20",
  "from-cyan-500/30 to-sky-500/20",
  "from-violet-500/30 to-purple-500/20",
  "from-amber-500/30 to-orange-500/20",
  "from-emerald-500/30 to-teal-500/20",
  "from-rose-500/30 to-red-500/20",
];

export function Devices() {
  return (
    <section id="showcase" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-accent-2">دسکتاپ و موبایل</span>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            روی هر صفحه‌ای، بی‌نقص
          </h2>
          <p className="mt-4 text-muted">
            فروشگاه شما به‌صورت خودکار با موبایل، تبلت و دسکتاپ سازگار می‌شود.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-16">
            {/* desktop browser */}
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-bg-soft shadow-2xl glow">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                <div className="mr-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-xs text-muted">
                  🔒 leila.shop
                </div>
              </div>

              <div className="p-6">
                {/* nav */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-lg font-black">بوتیک لیلا</p>
                  <div className="hidden gap-5 text-sm text-muted md:flex">
                    <span>خانه</span>
                    <span>محصولات</span>
                    <span>درباره ما</span>
                    <span>تماس</span>
                  </div>
                  <span className="rounded-full bg-gradient-to-l from-brand to-accent px-4 py-1.5 text-xs font-bold">
                    سبد خرید
                  </span>
                </div>

                {/* hero banner */}
                <div className="mb-6 flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-l from-brand via-brand-2 to-accent p-7">
                  <div>
                    <p className="text-xl font-black md:text-2xl">کالکشن تابستان</p>
                    <p className="mt-1 text-sm text-white/80">جدیدترین‌ها با ارسال رایگان</p>
                    <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold">
                      خرید کنید
                    </span>
                  </div>
                  <div className="hidden h-24 w-24 rounded-full bg-white/15 md:block" />
                </div>

                {/* product grid */}
                <div className="grid grid-cols-3 gap-4">
                  {deskProducts.map((hue, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.03]"
                    >
                      <div className={`h-24 bg-gradient-to-br ${hue}`} />
                      <div className="p-2.5">
                        <div className="h-2 w-3/4 rounded bg-white/10" />
                        <div className="mt-2 h-2 w-1/3 rounded bg-accent/40" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* overlapping phone */}
            <div className="absolute -bottom-8 left-0 hidden scale-75 md:block lg:-left-6">
              <div className="animate-float">
                <PhoneMockup className="w-[230px]" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
