import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
    bpPayRequest,
    generateOrderId,
    formatDate,
    formatTime,
    PAY_PAGE_URL,
} from "@/lib/mellat";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Basic validation
        const required = ["full_name", "phone", "email", "biz_name", "industry", "domain_name", "plan", "billing", "amount"];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json({ error: `فیلد ${field} الزامی است` }, { status: 400 });
            }
        }

        const orderId = generateOrderId();
        const now = Date.now();
        const id = randomUUID();

        // Save registration to DB
        const db = getDb();
        db.prepare(`
      INSERT INTO registrations
        (id, created_at, updated_at, status, plan, billing, amount,
         full_name, phone, email, city, biz_name, industry, biz_description,
         product_count, domain_type, domain_name, order_id)
      VALUES
        (?, ?, ?, 'pending_payment', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
            id,
            now,
            now,
            body.plan,
            body.billing,
            Number(body.amount),
            body.full_name,
            body.phone,
            body.email,
            body.city ?? null,
            body.biz_name,
            body.industry,
            body.biz_description ?? null,
            body.product_count ?? null,
            body.domain_type ?? "existing",
            body.domain_name,
            String(orderId)
        );

        // Call Bank Mellat
        const callBackUrl =
            process.env.BPM_CALLBACK_URL ?? "http://localhost:3000/start/callback";

        const result = await bpPayRequest({
            orderId,
            amount: Number(body.amount),
            localDate: formatDate(),
            localTime: formatTime(),
            callBackUrl,
            additionalData: `registration:${id}`,
        });

        if (result.resCode !== "0" || !result.refId) {
            db.prepare(
                "UPDATE registrations SET status='payment_failed', res_code=?, updated_at=? WHERE id=?"
            ).run(result.resCode, Date.now(), id);
            return NextResponse.json(
                { error: `درگاه پاسخ نامعتبر داد (کد ${result.resCode})` },
                { status: 502 }
            );
        }

        // Store refId
        db.prepare(
            "UPDATE registrations SET ref_id=?, updated_at=? WHERE id=?"
        ).run(result.refId, Date.now(), id);

        return NextResponse.json({ refId: result.refId, payUrl: PAY_PAGE_URL });
    } catch (err) {
        console.error("[initiate]", err);
        return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
    }
}
