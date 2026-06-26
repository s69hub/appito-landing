import { Reveal } from "../Reveal";

const features = [
  {
    title: "دامنه‌ی اختصاصی شما",
    desc: "فروشگاه روی دامنه‌ی خودتان اجرا می‌شود، نه ساب‌دامین ما. برند شما، آدرس شما.",
    icon: <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />,
    span: "md:col-span-2",
  },
  {
    title: "طراحی موبایل‌محور",
    desc: "تجربه‌ای شبیه اپلیکیشن موبایل، بهینه برای فروش از اینستاگرام.",
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: "پنل مدیریت ساده",
    desc: "محصول، موجودی، سفارش و مشتری را بدون کدنویسی مدیریت کنید.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </>
    ),
  },
  {
    title: "درگاه پرداخت امن",
    desc: "اتصال به درگاه‌های پرداخت ایرانی با تسویه‌ی مطمئن.",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2.5" />
        <path d="M2 10h20" />
      </>
    ),
  },
  {
    title: "سفارشی‌سازی کامل",
    desc: "رنگ، فونت، بنر و چیدمان را مطابق برند خودتان تغییر دهید.",
    icon: (
      <>
        <path d="M12 19l7-7a2.8 2.8 0 0 0-4-4l-7 7" />
        <path d="M8 15l-2 5 5-2" />
      </>
    ),
    span: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-accent">امکانات</span>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            همه‌چیز برای فروش حرفه‌ای
          </h2>
          <p className="mt-4 text-muted">
            ابزارهایی که برای راه‌اندازی و رشد یک فروشگاه موفق نیاز دارید، یکجا.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07} className={f.span ?? ""}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-all hover:border-brand-2/40 hover:bg-white/[0.05]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-2/30 to-accent/20 text-accent-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {f.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
