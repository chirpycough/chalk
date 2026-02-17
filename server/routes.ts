
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { manualConnectSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API route to log connection attempts (optional, since main logic is client-side Firebase)
  app.post('/api/log-connection', async (req, res) => {
    try {
      const { walletName } = manualConnectSchema.pick({ walletName: true }).parse(req.body);
      await storage.logConnectionAttempt(walletName);
      res.json({ success: true });
    } catch (e) {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

  return httpServer;
}
