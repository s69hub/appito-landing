import Link from "next/link";
import { adminLogoutAction } from "../actions";
import { LayoutDashboard, ClipboardList, MessageCircle, LogOut } from "lucide-react";

const nav = [
  { href: "/admin/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "ثبت‌نام‌ها", icon: ClipboardList },
  { href: "/admin/consultations", label: "مشاوره‌ها", icon: MessageCircle },
];

export default function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-l border-line bg-surface">
      {/* Logo */}
      <div className="border-b border-line px-5 py-5">
        <span className="gradient-text text-lg font-black">اپیتو</span>
        <p className="mt-0.5 text-[11px] text-muted">پنل مدیریت</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-bg-soft hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-line p-3">
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-4 w-4" />
            خروج
          </button>
        </form>
      </div>
    </aside>
  );
}
