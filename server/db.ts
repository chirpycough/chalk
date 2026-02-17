
// We are not using Postgres as per user request.
// This file is kept to satisfy the project structure but will not connect to a real DB.
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

// Export a dummy db object or similar to prevent import errors if referenced
export const db = null;
