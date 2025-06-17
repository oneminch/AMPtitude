import { initDb } from "./db";

// Initialize database
const initializeDatabase = async () => {
  try {
    await initDb();
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};

export default initializeDatabase;
