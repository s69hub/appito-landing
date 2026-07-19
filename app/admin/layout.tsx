import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { validateAdminSession } from "@/lib/auth";
import Sidebar from "./_components/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Skip session check on the login page itself to avoid redirect loops
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Full DB token validation (proxy only checks cookie presence)
  const jar = await cookies();
  const token = jar.get("admin_token")?.value;
  const valid = validateAdminSession(token);
  if (!valid) redirect("/admin/login");

  return (
    <div dir="rtl" className="flex min-h-screen bg-bg text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
