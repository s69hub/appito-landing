import { cn } from "@/lib/utils";

export type MockProduct = { name: string; price: string; tag?: string; hue: string };

export type PhoneMockupProps = {
  className?: string;
  storeName?: string;
  handle?: string;
  initial?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  bannerCta?: string;
  bannerGradient?: string;
  categories?: string[];
  products?: MockProduct[];
  accentGradient?: string;
  accentChip?: string;
  accentText?: string;
  accentBadge?: string;
};

const defaultProducts: MockProduct[] = [
  { name: "کیف چرم دست‌دوز", price: "۸۹۰٬۰۰۰", tag: "جدید", hue: "from-pink-500/30 to-fuchsia-500/20" },
  { name: "ساعت مینیمال", price: "۱٬۲۵۰٬۰۰۰", tag: "", hue: "from-cyan-500/30 to-sky-500/20" },
  { name: "عینک آفتابی", price: "۴۵۰٬۰۰۰", tag: "٪۲۰", hue: "from-violet-500/30 to-purple-500/20" },
  { name: "اسنیکر اسپرت", price: "۱٬۶۸۰٬۰۰۰", tag: "", hue: "from-amber-500/30 to-orange-500/20" },
];

export function PhoneMockup({
  className,
  storeName = "بوتیک لیلا",
  handle = "leila.shop",
  initial = "ل",
  bannerTitle = "حراج پایان فصل",
  bannerSubtitle = "تا ۴۰٪ تخفیف روی کالکشن جدید",
  bannerCta = "مشاهده",
  bannerGradient = "from-brand via-brand-2 to-accent",
  categories = ["همه", "کیف", "ساعت", "کفش", "عینک"],
  products = defaultProducts,
  accentGradient = "from-brand to-navy",
  accentChip = "bg-brand",
  accentText = "text-brand",
  accentBadge = "bg-accent",
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[290px] select-none rounded-[2.6rem] border border-navy/20 bg-navy p-2.5 shadow-2xl glow",
        className,
      )}
    >
      <div className="relative h-[600px] w-full overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-white to-bg-soft">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black/70" />

        {/* app header */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-9 pb-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white",
                accentGradient,
              )}
            >
              {initial}
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-bold">{storeName}</p>
              <p className="text-[9px] text-muted">{handle}</p>
            </div>
          </div>
          <div className="relative grid h-8 w-8 place-items-center rounded-full bg-bg-soft text-navy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 7h13l-1.5 9h-10L6 7Zm0 0-1-3H3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.3" fill="currentColor" />
              <circle cx="16" cy="20" r="1.3" fill="currentColor" />
            </svg>
            <span
              className={cn(
                "absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold text-white",
                accentBadge,
              )}
            >
              ۳
            </span>
          </div>
        </div>

        {/* banner */}
        <div className={cn("mx-4 mb-3 overflow-hidden rounded-2xl bg-gradient-to-l p-3.5", bannerGradient)}>
          <p className="text-[13px] font-extrabold">{bannerTitle}</p>
          <p className="mt-0.5 text-[10px] text-white/80">{bannerSubtitle}</p>
          <span className="mt-2 inline-block rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-bold">
            {bannerCta}
          </span>
        </div>

        {/* category chips */}
        <div className="mb-3 flex gap-2 overflow-hidden px-4">
          {categories.map((c, i) => (
            <span
              key={c}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-medium",
                i === 0 ? cn(accentChip, "text-white") : "bg-bg-soft text-muted",
              )}
            >
              {c}
            </span>
          ))}
        </div>

        {/* product grid */}
        <div className="grid grid-cols-2 gap-2.5 px-4">
          {products.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
              <div className={cn("relative h-20 bg-gradient-to-br", p.hue)}>
                {p.tag && (
                  <span className="absolute right-1.5 top-1.5 rounded-full bg-black/40 px-1.5 py-0.5 text-[8px] font-bold">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-2">
                <p className="text-[10px] font-bold">{p.name}</p>
                <p className={cn("mt-1 text-[10px]", accentText)}>
                  {p.price} <span className="text-[8px] text-muted">تومان</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* bottom nav */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-around border-t border-line bg-white/85 px-4 py-3 backdrop-blur">
          {[
            { l: "خانه", a: true },
            { l: "دسته‌ها", a: false },
            { l: "سبد", a: false },
            { l: "پروفایل", a: false },
          ].map((n) => (
            <div
              key={n.l}
              className={cn("flex flex-col items-center gap-1 text-[9px]", n.a ? accentText : "text-muted")}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {n.l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
