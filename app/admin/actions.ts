"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminPassword, createAdminSession, adminCookieOptions } from "@/lib/auth";

export async function adminLoginAction(
    _prev: { error?: string } | null,
    formData: FormData
): Promise<{ error: string }> {
    const password = formData.get("password") as string;

    if (!password) return { error: "رمز عبور الزامی است" };

    const valid = await verifyAdminPassword(password);
    if (!valid) return { error: "رمز عبور نادرست است" };

    const token = createAdminSession();
    const jar = await cookies();
    jar.set({ ...adminCookieOptions, value: token });

    redirect("/admin/dashboard");
}

export async function adminLogoutAction() {
    const jar = await cookies();
    jar.delete(adminCookieOptions.name);
    redirect("/admin/login");
}
