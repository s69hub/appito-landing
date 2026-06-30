import { Reveal } from "../Reveal";

const cases = [
  {
    badge: "اینفلوئنسر",
    name: "سارا · بلاگر مد",
    quote:
      "از اینستاگرام به مشتری‌ها لینک می‌دادم و سفارش‌ها گم می‌شد. با اپیتو حالا یک فروشگاه واقعی روی دامنه‌ی خودم دارم و فروشم سه برابر شده.",
    metric: "۳×",
    metricLabel: "رشد فروش",
    avatar: "from-pink-500 to-fuchsia-500",
  },
  {
    badge: "خرده‌فروش",
    name: "بوتیک لیلا",
    quote:
      "بدون اینکه یک خط کد بزنم، فروشگاهم در دو روز راه‌اندازی شد. پنل مدیریت خیلی ساده است و خودم محصولات را آپدیت می‌کنم.",
    metric: "۲ روز",
    metricLabel: "تا راه‌اندازی",
    avatar: "from-violet-500 to-purple-500",
  },
  {
    badge: "برند",
    name: "دیجی‌استایل",
    quote:
      "به یک راهکار حرفه‌ای و مقیاس‌پذیر روی دامنه‌ی برند خودمان نیاز داشتیم. اپیتو دقیقاً همان چیزی بود که می‌خواستیم، با پشتیبانی عالی.",
    metric: "٪۹۹٫۹",
    metricLabel: "پایداری",
    avatar: "from-cyan-500 to-sky-500",
  },
];

export function CaseStudies() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-accent-2">داستان مشتریان</span>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">کسب‌وکارهایی که با اپیتو رشد کردند</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-lg">
                <span className="w-fit rounded-full border border-line bg-bg-soft px-3 py-1 text-xs text-brand">
                  {c.badge}
                </span>
                <p className="mt-5 flex-1 text-sm leading-8 text-foreground/90">«{c.quote}»</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <div className="flex items-center gap-3">
                    <span className={`h-10 w-10 rounded-full bg-gradient-to-br ${c.avatar}`} />
                    <span className="text-sm font-bold">{c.name}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-black gradient-text">{c.metric}</p>
                    <p className="text-[10px] text-muted">{c.metricLabel}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
