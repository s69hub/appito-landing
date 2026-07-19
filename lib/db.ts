import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "store", "db", "appito.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
    if (_db) return _db;
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initSchema(_db);
    return _db;
}

function initSchema(db: Database.Database) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending_payment',
      plan TEXT NOT NULL,
      billing TEXT NOT NULL,
      amount INTEGER NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      city TEXT,
      biz_name TEXT NOT NULL,
      industry TEXT NOT NULL,
      biz_description TEXT,
      product_count TEXT,
      domain_type TEXT NOT NULL,
      domain_name TEXT NOT NULL,
      order_id TEXT,
      ref_id TEXT,
      sale_order_id TEXT,
      sale_reference_id TEXT,
      res_code TEXT,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      city TEXT,
      industry TEXT,
      instagram TEXT,
      telegram TEXT,
      whatsapp TEXT,
      bale TEXT,
      rubika TEXT,
      message TEXT,
      preferred_call_time TEXT,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS admin_session (
      token TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);
}
