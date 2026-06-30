import { Reveal } from "../Reveal";

const steps = [
  {
    n: "۱",
    title: "ثبت دامنه و تنظیم DNS",
    desc: "یک دامنه‌ی دلخواه ثبت کنید یا دامنه‌ی فعلی‌تان را معرفی کنید؛ سپس رکوردهای DNS را که برایتان می‌فرستیم با چند کلیک وارد کنید.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
  },
  {
    n: "۲",
    title: "ما راه‌اندازی می‌کنیم",
    desc: "تیم اپیتو اپلیکیشن فروشگاهی اختصاصی شما را نصب و پیکربندی می‌کند و با گواهی SSL ایمن، آماده‌ی تحویل می‌شود؛ بدون هیچ دردسر فنی.",
    icon: (
      <>
        <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    n: "۳",
    title: "سفارشی‌سازی و شروع فروش",
    desc: "از پنل مدیریت، محصولات، رنگ‌ها و برندتان را بدون کدنویسی تنظیم کنید و همین امروز فروش را آغاز کنید.",
    icon: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-accent-2">فرایند راه‌اندازی</span>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">از صفر تا فروش، فقط در ۳ قدم</h2>
          <p className="mt-4 text-muted">
            بدون دانش فنی، بدون کدنویسی، در کمترین زمان و با کمترین هزینه،
            <br /> اپلیکیشین فروشگاهی خودتان رو داشته باشید.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute right-0 left-0 top-10 hidden h-px bg-gradient-to-l from-transparent via-brand/30 to-transparent md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative h-full rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-lg">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-navy">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </div>
                <span className="absolute left-5 top-5 text-5xl font-black text-navy/5">{s.n}</span>
                <h3 className="text-lg font-extrabold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
