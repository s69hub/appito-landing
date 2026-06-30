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
  const row = [...items, ...items, ...items, ...items];
  return (
    <section className="border-y border-line bg-bg-soft py-8">
      <p className="mb-6 text-center text-sm text-muted">انتخاب کسب‌وکارهای پیشرو در حوزه‌های مختلف</p>
      <div
        dir="ltr"
        className="relative overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="marquee-track flex w-max animate-marquee [animation-duration:50s]">
          {row.map((it, i) => (
            <span
              key={i}
              className="mx-2 whitespace-nowrap rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-medium text-muted shadow-sm"
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
