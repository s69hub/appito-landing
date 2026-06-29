import { Logo } from "../Logo";

const cols = [
  {
    title: "محصول",
    links: ["امکانات", "تعرفه‌ها", "نمونه‌ها", "چطور کار می‌کند"],
  },
  {
    title: "شرکت",
    links: ["درباره اپیتو", "وبلاگ", "تماس با ما", "فرصت‌های شغلی"],
  },
  {
    title: "پشتیبانی",
    links: ["راهنما", "سوالات متداول", "وضعیت سرویس", "قوانین"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-bg-soft/50">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
              اپیتو؛ اپلیکیشن‌ساز فروشگاهی وایت‌لیبل برای راه‌اندازی فروشگاه آنلاین حرفه‌ای روی دامنه‌ی اختصاصی شما.
            </p>
            <div className="mt-5 flex gap-3">
              {["instagram", "telegram", "twitter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition-colors hover:text-foreground"
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} اپیتو · تمامی حقوق محفوظ است.</p>
          <p>ساخته شده با ❤️ برای کسب‌وکارهای ایرانی</p>
        </div>
      </div>
    </footer>
  );
}
