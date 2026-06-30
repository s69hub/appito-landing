import { Camera, Send, MessageCircle, Mail, ShieldCheck, Lock } from "lucide-react";
import { Logo } from "../Logo";

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "محصول",
    links: [
      { label: "تعرفه‌ها", href: "#pricing" },
      { label: "صنف‌ها", href: "#industries" },
      { label: "چطور کار می‌کند", href: "#how" },
    ],
  },
  {
    title: "شرکت",
    links: [
      { label: "درباره اپیتو", href: "#" },
      { label: "وبلاگ", href: "#" },
      { label: "تماس با ما", href: "#cta" },
      { label: "فرصت‌های شغلی", href: "#" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { label: "راهنما", href: "#" },
      { label: "سوالات متداول", href: "#faq" },
      { label: "وضعیت سرویس", href: "#" },
      { label: "قوانین", href: "#" },
    ],
  },
];

const socials = [
  { name: "اینستاگرام", icon: Camera, href: "#" },
  { name: "تلگرام", icon: Send, href: "#" },
  { name: "واتساپ", icon: MessageCircle, href: "#" },
  { name: "ایمیل", icon: Mail, href: "mailto:hello@appito.app" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
              اپیتو؛ اپلیکیشن فروشگاهی اختصاصی و وایت‌لیبل برای راه‌اندازی فروشگاه آنلاین حرفه‌ای. تنها به یک دامنه نیاز
              دارید.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* newsletter + trust */}
        <div className="mt-12 grid items-center gap-8 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <h4 className="text-base font-black">از تخفیف‌ها و امکانات تازه باخبر شوید</h4>
            <p className="mt-1.5 text-sm text-muted">خبرنامه‌ی اپیتو؛ بدون اسپم، هر زمان بخواهید می‌توانید لغو کنید.</p>
            <form
              action="mailto:hello@appito.app"
              method="post"
              encType="text/plain"
              className="mt-4 flex max-w-md gap-2"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="ایمیل شما"
                aria-label="ایمیل شما"
                className="min-w-0 flex-1 rounded-full border border-line bg-surface px-5 py-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-brand/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gradient-to-l from-brand to-navy px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-105"
              >
                عضویت
              </button>
            </form>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-line bg-surface px-4 py-3 text-xs font-medium text-muted">
              <ShieldCheck className="h-5 w-5 text-brand" />
              نماد اعتماد الکترونیکی
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3 text-xs font-medium text-muted shadow-sm">
              <Lock className="h-5 w-5 text-brand" />
              پرداخت امن · SSL
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} اپیتو · تمامی حقوق محفوظ است.</p>
          <p>ساخته شده با ❤️ برای کسب‌وکارهای ایرانی</p>
        </div>
      </div>
    </footer>
  );
}
