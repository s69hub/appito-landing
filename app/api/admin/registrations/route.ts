import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

type RegRow = {
  id: string;
  created_at: number;
  full_name: string;
  phone: string;
  email: string;
  plan: string;
  billing: string;
  status: string;
  amount: number;
  domain_name: string;
  industry: string;
};

const VALID_STATUSES = ["pending_payment", "payment_failed", "paid", "activated", "cancelled"];

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? "all";
  const q = searchParams.get("q")?.trim() ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "10", 10) || 10));

  const where: string[] = [];
  const params: (string | number)[] = [];

  if (status !== "all" && VALID_STATUSES.includes(status)) {
    where.push("status=?");
    params.push(status);
  }
  if (q) {
    where.push("(full_name LIKE ? OR phone LIKE ? OR email LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const db = getDb();

  const total = (
    db.prepare(`SELECT COUNT(*) as c FROM registrations ${whereClause}`).get(...params) as { c: number }
  ).c;

  const rows = db
    .prepare(
      `SELECT id, created_at, full_name, phone, email, plan, billing, status, amount, domain_name, industry
       FROM registrations ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
    )
    .all(...params, pageSize, (page - 1) * pageSize) as RegRow[];

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return NextResponse.json({ rows, total, page, pageSize, totalPages });
}
