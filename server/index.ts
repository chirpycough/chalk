import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    (res as any)._capturedJson = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      const captured = (res as any)._capturedJson;
      if (captured) logLine += ` :: ${JSON.stringify(captured)}`;
      console.log(logLine);
    }
  });
  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });

  // PRODUCTION: serve the built frontend
  serveStatic(app);

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
