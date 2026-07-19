import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { getDb } from "./db";

const COOKIE_NAME = "admin_token";

// ─── Password ────────────────────────────────────────────────────────────────

export async function verifyAdminPassword(plain: string): Promise<boolean> {
    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) return false;
    return bcrypt.compare(plain, hash);
}

// ─── Session token ────────────────────────────────────────────────────────────

/** Generate a fresh 32-byte token, replace the only row in admin_session. */
export function createAdminSession(): string {
    const token = randomBytes(32).toString("hex");
    const db = getDb();
    db.prepare("DELETE FROM admin_session").run();
    db.prepare(
        "INSERT INTO admin_session (token, created_at) VALUES (?, ?)"
    ).run(token, Date.now());
    return token;
}

/** Returns true only if the cookie token matches the DB token exactly. */
export function validateAdminSession(cookieToken: string | undefined): boolean {
    if (!cookieToken) return false;
    const db = getDb();
    const row = db
        .prepare("SELECT token FROM admin_session LIMIT 1")
        .get() as { token: string } | undefined;
    if (!row) return false;
    return row.token === cookieToken;
}

/** Destroy the session — called on logout. */
export function destroyAdminSession(): void {
    getDb().prepare("DELETE FROM admin_session").run();
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

// NOTE: path must be "/" (not "/admin") so the browser also attaches the
// cookie to "/api/admin/*" requests used by the list pages for filtering/pagination.
export const adminCookieOptions = {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
};

/** Convenience guard for API route handlers: validates the admin_token cookie. */
export async function isAdminAuthenticated(): Promise<boolean> {
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    return validateAdminSession(token);
}
