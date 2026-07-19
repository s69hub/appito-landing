"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { randomUUID } from "crypto";

const schema = z.object({
    name: z.string().min(2, "نام حداقل ۲ کاراکتر است"),
    phone: z
        .string()
        .regex(/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست"),
    email: z.string().email("ایمیل معتبر نیست").optional().or(z.literal("")),
    city: z.string().optional(),
    industry: z.string().optional(),
    instagram: z.string().optional(),
    telegram: z.string().optional(),
    whatsapp: z.string().optional(),
    bale: z.string().optional(),
    rubika: z.string().optional(),
    message: z.string().optional(),
    preferred_call_time: z.string().optional(),
});

export async function submitConsultation(
    _prev: { error?: string } | null,
    formData: FormData
): Promise<{ error?: string }> {
    const raw = Object.fromEntries(formData.entries());

    const result = schema.safeParse(raw);
    if (!result.success) {
        const first = result.error.issues[0];
        return { error: first.message };
    }

    const d = result.data;
    const db = getDb();
    const now = Date.now();

    db.prepare(`
    INSERT INTO consultations
      (id, created_at, updated_at, status, name, phone, email, city, industry,
       instagram, telegram, whatsapp, bale, rubika, message, preferred_call_time)
    VALUES
      (?, ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
        randomUUID(),
        now,
        now,
        d.name,
        d.phone,
        d.email || null,
        d.city || null,
        d.industry || null,
        d.instagram || null,
        d.telegram || null,
        d.whatsapp || null,
        d.bale || null,
        d.rubika || null,
        d.message || null,
        d.preferred_call_time || null
    );

    redirect("/consult/thanks");
}
