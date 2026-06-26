import { Reveal } from "../Reveal";

const plans = [
  {
    name: "شروع",
    tagline: "برای اینفلوئنسرها و کسب‌وکارهای نوپا",
    price: "۲۹۰",
    period: "هزار تومان / ماه",
    featured: false,
    features: [
      "دامنه‌ی اختصاصی شما",
      "تا ۱۰۰ محصول",
      "درگاه پرداخت",
      "پنل مدیریت موبایل",
      "پشتیبانی ایمیلی",
    ],
  },
  {
    name: "حرفه‌ای",
    tagline: "برای فروشگاه‌های در حال رشد",
    price: "۵۹۰",
    period: "هزار تومان / ماه",
    featured: true,
    features: [
      "همه‌ی امکانات پلن شروع",
      "محصولات نامحدود",
      "سفارشی‌سازی کامل تم",
      "کد تخفیف و کمپین",
      "گزارش فروش پیشرفته",
      "پشتیبانی اولویت‌دار",
    ],
  },
  {
    name: "سازمانی",
    tagline: "برای برندهای بزرگ",
    price: "تماس بگیرید",
    period: "تعرفه‌ی اختصاصی",
    featured: false,
    features: [
      "همه‌ی امکانات پلن حرفه‌ای",
      "مدیر اختصاصی حساب",
      "یکپارچه‌سازی سفارشی (API)",
      "SLA و پشتیبانی ۲۴/۷",
      "آموزش تیم",
    ],
  },
];

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-accent-2">
      <path d="m5 12 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-accent">تعرفه‌ها</span>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            پلنی برای هر مرحله از رشد
          </h2>
          <p className="mt-4 text-muted">
            بدون هزینه‌ی پنهان. هر زمان خواستید ارتقا دهید یا لغو کنید.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className={
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-all " +
                  (p.featured
                    ? "border-brand-2/50 bg-gradient-to-b from-brand/15 to-surface glow scale-[1.03]"
                    : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]")
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 right-7 rounded-full bg-gradient-to-l from-brand to-accent px-3 py-1 text-xs font-bold">
                    محبوب‌ترین
                  </span>
                )}
                <h3 className="text-xl font-black">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-3xl font-black gradient-text">{p.price}</span>
                  <span className="pb-1 text-xs text-muted">{p.period}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/90">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={
                    "mt-7 rounded-full px-5 py-3 text-center text-sm font-bold transition-transform hover:scale-105 " +
                    (p.featured
                      ? "bg-gradient-to-l from-brand to-accent text-white"
                      : "border border-white/15 text-foreground hover:bg-white/5")
                  }
                >
                  انتخاب پلن
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
