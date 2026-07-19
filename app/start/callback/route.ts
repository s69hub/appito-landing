import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { bpVerifySettleRequest, mellatResCodeMessage } from "@/lib/mellat";

export const runtime = "nodejs";

// Bank Mellat POSTs to this route after payment
export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();
        const refId = form.get("RefId") as string;
        const resCode = form.get("ResCode") as string;
        const saleOrderId = form.get("SaleOrderId") as string;
        const saleReferenceId = form.get("SaleReferenceId") as string;

        const db = getDb();

        // Security check: find the registration by refId
        const reg = db
            .prepare("SELECT id, order_id FROM registrations WHERE ref_id=? LIMIT 1")
            .get(refId) as { id: string; order_id: string } | undefined;

        if (!reg) {
            return NextResponse.redirect(new URL("/start/failed?reason=notfound", req.url));
        }

        // If payment failed at bank side
        if (resCode !== "0") {
            db.prepare(
                "UPDATE registrations SET status='payment_failed', res_code=?, sale_order_id=?, updated_at=? WHERE id=?"
            ).run(resCode, saleOrderId ?? null, Date.now(), reg.id);
            const msg = encodeURIComponent(mellatResCodeMessage(resCode));
            return NextResponse.redirect(new URL(`/start/failed?reason=${msg}`, req.url));
        }

        // Security check: SaleOrderId must match our stored order_id
        if (saleOrderId !== reg.order_id) {
            db.prepare(
                "UPDATE registrations SET status='payment_failed', res_code=?, updated_at=? WHERE id=?"
            ).run("mismatch", Date.now(), reg.id);
            return NextResponse.redirect(new URL("/start/failed?reason=mismatch", req.url));
        }

        // Call bpVerifySettleRequest
        const verifyResCode = await bpVerifySettleRequest({
            orderId: Number(reg.order_id),
            saleOrderId: Number(saleOrderId),
            saleReferenceId: Number(saleReferenceId),
        });

        // 0 = success, 43 = already verified (also success)
        if (verifyResCode === "0" || verifyResCode === "43" || verifyResCode === "45") {
            db.prepare(
                `UPDATE registrations
          SET status='paid', res_code=?, sale_order_id=?, sale_reference_id=?, updated_at=?
          WHERE id=?`
            ).run("0", saleOrderId, saleReferenceId, Date.now(), reg.id);

            // Clear sessionStorage hint for client
            const successUrl = new URL("/start/success", req.url);
            successUrl.searchParams.set("id", reg.id);
            return NextResponse.redirect(successUrl);
        } else {
            db.prepare(
                "UPDATE registrations SET status='payment_failed', res_code=?, sale_order_id=?, updated_at=? WHERE id=?"
            ).run(verifyResCode, saleOrderId, Date.now(), reg.id);
            const msg = encodeURIComponent(mellatResCodeMessage(verifyResCode));
            return NextResponse.redirect(new URL(`/start/failed?reason=${msg}`, req.url));
        }
    } catch (err) {
        console.error("[callback]", err);
        return NextResponse.redirect(new URL("/start/failed?reason=server", req.url));
    }
}
