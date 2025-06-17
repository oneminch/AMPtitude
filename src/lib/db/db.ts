import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { mkdir } from "fs/promises";
import { join } from "path";

// In-memory store for prepared statements
const stmtCache = new Map();

// Database path configuration
const DATA_DIR = join(process.cwd(), ".data");
const DB_PATH = join(DATA_DIR, "amptitude.db");

// Singleton instance
let db: Database.Database | null = null;

export const getDb = async () => {
  if (!db) {
    // Ensure data directory exists
    await mkdir(DATA_DIR, { recursive: true });

    db = new Database(DB_PATH, { fileMustExist: false });
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
};

// Initialize database with schema and seed data
export const initDb = async () => {
  try {
    const db = await getDb();

    // Read schema and seed files
    const schemaSQL = readFileSync(
      join(process.cwd(), "src/lib/db/schema.sql"),
      "utf8"
    );
    const seedSQL = readFileSync(
      join(process.cwd(), "src/lib/db/seed.sql"),
      "utf8"
    );

    // Execute schema in a transaction
    db.transaction(() => {
      db.exec(schemaSQL);

      // Only seed if the database is empty
      const hasData = db.prepare("SELECT 1 FROM customers LIMIT 1").get();
      if (!hasData) {
        db.exec(seedSQL);
      }
    })();

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

// Prepare and cache SQL statements
export const prepare = async (sql: string) => {
  const db = await getDb();
  let stmt = stmtCache.get(sql);

  if (!stmt) {
    stmt = db.prepare(sql);
    stmtCache.set(sql, stmt);
  }

  return stmt;
};

// Close database connection
export const closeDb = () => {
  if (db) {
    stmtCache.clear();
    db.close();
    db = null;
  }
};
