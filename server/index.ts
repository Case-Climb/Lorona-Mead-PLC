import express from "express";
import fs from "fs";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Prerendered pages: /attorney -> attorney.html, /blog/<slug> -> blog/<slug>.html
  app.use(express.static(staticPath, { extensions: ["html"], redirect: false }));
  // Paths that are also directories (/blog, /criminal-defense) skip the
  // extension lookup above, so resolve <path>.html explicitly; else a real 404.
  app.get("*", (req, res) => {
    const page = path.join(staticPath, `${req.path.replace(/\/+$/, "")}.html`);
    if (page.startsWith(staticPath + path.sep) && fs.existsSync(page)) {
      return res.sendFile(page);
    }
    res.status(404).sendFile(path.join(staticPath, "404.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
