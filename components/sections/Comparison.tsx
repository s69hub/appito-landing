import { Reveal } from "../Reveal";

type Cell = { type: "yes" | "no" | "partial"; text: string };

const columns: { key: string; label: string; sub: string; featured?: boolean }[] = [
  { key: "dev", label: "توسعه‌دهنده‌ی اختصاصی", sub: "سفارش ساخت اپ" },
  { key: "wp", label: "وردپرس / ووکامرس", sub: "خودت بساز" },
  { key: "appito", label: "اپیتو", sub: "آماده و مدیریت‌شده", featured: true },
];

const rows: { label: string; dev: Cell; wp: Cell; appito: Cell }[] = [
  {
    label: "هزینه‌ی راه‌اندازی",
    dev: { type: "no", text: "ده‌ها میلیون تومان" },
    wp: { type: "partial", text: "هاست + قالب + افزونه" },
    appito: { type: "yes", text: "اشتراک ماهانه‌ی مقرون‌به‌صرفه" },
  },
  {
    label: "زمان تا راه‌اندازی",
    dev: { type: "no", text: "هفته‌ها تا ماه‌ها" },
    wp: { type: "partial", text: "چند روز تا چند هفته" },
    appito: { type: "yes", text: "فقط چند روز" },
  },
  {
    label: "نیاز به دانش فنی",
    dev: { type: "partial", text: "مدیریت پروژه و قرارداد" },
    wp: { type: "no", text: "هاست، امنیت، افزونه‌ها" },
    appito: { type: "yes", text: "هیچ دانشی لازم نیست" },
  },
  {
    label: "طراحی موبایل‌محور",
    dev: { type: "partial", text: "هزینه‌ی جداگانه" },
    wp: { type: "partial", text: "وابسته به قالب" },
    appito: { type: "yes", text: "ذاتاً موبایل‌محور" },
  },
  {
    label: "سازگاری چندسکویی (کراس‌پلتفرم)",
    dev: { type: "partial", text: "برای هر سیستم‌عامل توسعه‌ی جداگانه" },
    wp: { type: "no", text: "فقط وب؛ اپ نیتیو ندارد" },
    appito: { type: "yes", text: "اندروید، iOS، ویندوز فون و دسکتاپ" },
  },
  {
    label: "دامنه‌ی اختصاصی شما",
    dev: { type: "yes", text: "بله" },
    wp: { type: "yes", text: "بله" },
    appito: { type: "yes", text: "بله" },
  },
  {
    label: "نگهداری و امنیت",
    dev: { type: "no", text: "بر عهده‌ی شما" },
    wp: { type: "no", text: "آپدیت و امنیت با شما" },
    appito: { type: "yes", text: "کاملاً مدیریت‌شده + SSL" },
  },
  {
    label: "آپدیت و امکانات جدید",
    dev: { type: "no", text: "هزینه‌ی توسعه‌ی مجدد" },
    wp: { type: "partial", text: "افزونه‌های پراکنده" },
    appito: { type: "yes", text: "خودکار و رایگان" },
  },
  {
    label: "پشتیبانی",
    dev: { type: "partial", text: "وابسته به فریلنسر" },
    wp: { type: "no", text: "انجمن‌های عمومی" },
    appito: { type: "yes", text: "تیم پشتیبانی اختصاصی" },
  },
];

function Mark({ cell, align = "start" }: { cell: Cell; align?: "start" | "end" }) {
  const icon =
    cell.type === "yes" ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="m5 12 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : cell.type === "no" ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );

  const color =
    cell.type === "yes"
      ? "text-emerald-600 bg-emerald-100"
      : cell.type === "no"
        ? "text-rose-600 bg-rose-100"
        : "text-amber-600 bg-amber-100";

  return (
    <div className={"flex items-start gap-2.5 " + (align === "end" ? "flex-row-reverse text-right" : "")}>
      <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${color}`}>{icon}</span>
      <span className="text-sm leading-6 text-foreground/85">{cell.text}</span>
    </div>
  );
}

export function Comparison() {
  return (
    <section id="compare" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-brand">مقایسه</span>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">چرا اپیتو، نه راه‌های دیگر؟</h2>
          <p className="mt-4 text-muted">
            سفارش ساخت اپ به توسعه‌دهنده، یا ساختن با وردپرس، یا اپیتو؛ تفاوت را ببینید.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* desktop: comparison table */}
          <div className="mt-14 hidden overflow-x-auto pb-2 md:block">
            <div className="min-w-[760px]">
              {/* header */}
              <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] gap-3">
                <div />
                {columns.map((c) => (
                  <div
                    key={c.key}
                    className={
                      "rounded-2xl px-4 py-5 text-center " +
                      (c.featured
                        ? "border border-brand/40 bg-gradient-to-b from-brand/10 to-surface glow"
                        : "border border-line bg-surface shadow-sm")
                    }
                  >
                    <p className={"font-black " + (c.featured ? "text-lg gradient-text" : "text-base")}>{c.label}</p>
                    <p className="mt-1 text-xs text-muted">{c.sub}</p>
                  </div>
                ))}
              </div>

              {/* rows */}
              <div className="mt-3 space-y-2.5">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="grid grid-cols-[1.1fr_1fr_1fr_1fr] items-center gap-3 rounded-2xl border border-line bg-surface px-2 py-3 shadow-sm"
                  >
                    <div className="px-3 text-sm font-bold text-foreground">{r.label}</div>
                    <div className="px-3">
                      <Mark cell={r.dev} />
                    </div>
                    <div className="px-3">
                      <Mark cell={r.wp} />
                    </div>
                    <div className="rounded-xl bg-brand/5 px-3 py-1">
                      <Mark cell={r.appito} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* mobile: stacked feature cards (no horizontal scroll) */}
          <div className="mt-10 space-y-4 md:hidden">
            {rows.map((r) => (
              <div key={r.label} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                <p className="border-b border-line bg-bg-soft px-4 py-3 text-sm font-black text-foreground">
                  {r.label}
                </p>
                <div className="divide-y divide-line">
                  {columns.map((c) => {
                    const cell = r[c.key as "dev" | "wp" | "appito"];
                    return (
                      <div
                        key={c.key}
                        className={
                          "flex items-start justify-between gap-3 px-4 py-3 " + (c.featured ? "bg-brand/5" : "")
                        }
                      >
                        <span className={"shrink-0 text-xs font-bold " + (c.featured ? "gradient-text" : "text-muted")}>
                          {c.label}
                        </span>
                        <Mark cell={cell} align="end" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <a
            href="#cta"
            className="inline-block rounded-full bg-gradient-to-l from-brand to-navy px-8 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            می‌خواهم با اپیتو شروع کنم
          </a>
        </Reveal>
      </div>
    </section>
  );
}
