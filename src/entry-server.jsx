import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Used only at build time by scripts/prerender.mjs.
export function render(path) {
  return renderToString(<App initialPath={path} ssr />);
}

export { allPaths, routeMeta, SITE_URL } from "./routes.js";
