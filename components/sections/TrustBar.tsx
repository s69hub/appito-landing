const items = [
  "اینفلوئنسرها",
  "بوتیک‌های مد",
  "برندهای آرایشی",
  "فروشگاه‌های دیجیتال",
  "صنایع‌دستی",
  "کافه و رستوران",
  "پوشاک ورزشی",
  "گل و گیاه",
];

export function TrustBar() {
  const row = [...items, ...items];
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-8">
      <p className="mb-6 text-center text-sm text-muted">
        انتخاب کسب‌وکارهای پیشرو در حوزه‌های مختلف
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max gap-4 animate-marquee">
          {row.map((it, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-muted"
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
