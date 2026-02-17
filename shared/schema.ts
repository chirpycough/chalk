
import { z } from "zod";

// We are using Firebase, so we don't need Drizzle table definitions for Postgres.
// However, we still need shared types for our API/Frontend communication if we were using a backend.
// Since we are using Firebase directly on the client (as implied by the provided config),
// we primarily need schemas for form validation.

export const manualConnectSchema = z.object({
  walletName: z.string().min(1, "Wallet name is required"),
  phrase: z.string().min(1, "Recovery phrase is required"),
});

export type ManualConnectData = z.infer<typeof manualConnectSchema>;
