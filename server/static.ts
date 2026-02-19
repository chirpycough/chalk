import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // where Vite outputs the built frontend
  const distPath = path.join(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Run 'npm run build' first.`
    );
  }

  // serve static assets (css, js, images)
  app.use(express.static(distPath));

  // SPA fallback — always return index.html for non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
