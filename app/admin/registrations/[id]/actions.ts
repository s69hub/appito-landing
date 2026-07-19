"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";

export async function updateRegistrationAction(formData: FormData) {
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const notes = formData.get("notes") as string;
    getDb()
        .prepare("UPDATE registrations SET status=?, notes=?, updated_at=? WHERE id=?")
        .run(status, notes || null, Date.now(), id);
    redirect(`/admin/registrations/${id}`);
}
