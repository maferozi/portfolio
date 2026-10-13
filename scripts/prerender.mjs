// Renders every route to static HTML after `vite build`, so search engines and
// link previews see real content and per-page titles. Also writes sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const server = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);

const template = readFileSync(join(dist, "index.html"), "utf8");
const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const path of server.allPaths) {
  const { title, description } = server.routeMeta(path);
  const url = `${server.SITE_URL}${path === "/" ? "/" : path}`;
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escape(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace('<div id="root"></div>', `<div id="root">${server.render(path)}</div>`);

  const file = path === "/" ? join(dist, "index.html") : join(dist, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`  prerendered ${path}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${server.allPaths
  .map((p) => `  <url><loc>${server.SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`  wrote sitemap.xml (${server.allPaths.length} pages)`);
