import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

type ConRow = {
  id: string;
  created_at: number;
  name: string;
  phone: string;
  email: string | null;
  industry: string | null;
  status: string;
  instagram: string | null;
  telegram: string | null;
  whatsapp: string | null;
  bale: string | null;
  rubika: string | null;
};

const VALID_STATUSES = ["new", "contacted", "converted", "closed"];

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
    where.push("(name LIKE ? OR phone LIKE ? OR email LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const db = getDb();

  const total = (
    db.prepare(`SELECT COUNT(*) as c FROM consultations ${whereClause}`).get(...params) as { c: number }
  ).c;

  const rows = db
    .prepare(
      `SELECT id, created_at, name, phone, email, industry, status, instagram, telegram, whatsapp, bale, rubika
       FROM consultations ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
    )
    .all(...params, pageSize, (page - 1) * pageSize) as ConRow[];

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return NextResponse.json({ rows, total, page, pageSize, totalPages });
}
