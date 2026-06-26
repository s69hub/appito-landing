import { Reveal } from "../Reveal";

const steps = [
  {
    n: "۱",
    title: "دامنه‌تان را ثبت کنید",
    desc: "یک دامنه دلخواه (مثل shop.com) ثبت کنید یا دامنه‌ی فعلی‌تان را به ما معرفی کنید.",
    icon: (
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    ),
  },
  {
    n: "۲",
    title: "DNS را تنظیم کنید",
    desc: "رکوردهای DNS که برایتان ارسال می‌کنیم را وارد پنل دامنه کنید. فقط چند کلیک.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <path d="M7 7h.01M7 17h.01" />
      </>
    ),
  },
  {
    n: "۳",
    title: "ما راه‌اندازی می‌کنیم",
    desc: "تیم اپیتو اپلیکیشن فروشگاهی شما را روی دامنه‌تان نصب و فعال می‌کند؛ با SSL امن.",
    icon: (
      <>
        <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    n: "۴",
    title: "سفارشی‌سازی کنید",
    desc: "از پنل مدیریت، محصولات، رنگ‌ها، بنرها و همه‌چیز را بدون کدنویسی تنظیم کنید.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1L16.5 2h-4l-.4 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1Z" />
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
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            از صفر تا فروش، فقط در ۴ قدم
          </h2>
          <p className="mt-4 text-muted">
            بدون دانش فنی، بدون کدنویسی. شما دامنه را وصل می‌کنید، ما فروشگاه را
            تحویل می‌دهیم.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div className="pointer-events-none absolute right-0 left-0 top-10 hidden h-px bg-gradient-to-l from-transparent via-brand-2/40 to-transparent md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative h-full rounded-3xl border border-white/8 bg-white/[0.03] p-6 transition-all hover:-translate-y-1.5 hover:bg-white/[0.05]">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-accent">
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
                <span className="absolute left-5 top-5 text-5xl font-black text-white/5">
                  {s.n}
                </span>
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
