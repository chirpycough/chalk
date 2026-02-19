import express, { type Express } from "express";
import path from "path";
import fs from "fs";

export function serveStatic(app: Express) {
  // primary and fallback paths
  const possiblePaths = [
    path.resolve("./dist/public"),        // default production build
    path.resolve(__dirname, "../client/dist"), // fallback if deployed differently
    path.resolve(__dirname, "public"),   // fallback for some Replit setups
  ];

  let distPath: string | null = null;

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Tried:\n${possiblePaths.join("\n")}\nRun 'npm run build' first.`
    );
  }

  console.log(`Serving static files from: ${distPath}`);

  // serve static assets (CSS, JS, images)
  app.use(express.static(distPath));

  // SPA fallback — return index.html for non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath!, "index.html"));
  });
}
