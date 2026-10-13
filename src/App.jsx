import { useCallback, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import ModeSwitch from "./components/ModeSwitch.jsx";
import Professional from "./pro/Professional.jsx";
import Developer from "./dev/Developer.jsx";
import ParentalEye from "./pages/work/ParentalEye.jsx";
import AiLawyer from "./pages/work/AiLawyer.jsx";
import { NotFound, Note, WritingIndex } from "./pages/Writing.jsx";
import { RouterProvider, usePath } from "./router.jsx";
import { routeMeta } from "./routes.js";

const STORAGE_KEY = "portfolio-mode";

// Mode comes from the URL first (so links like ?mode=dev work), then the
// visitor's last choice, then defaults to professional. Prerendering always
// uses the professional view.
function initialMode() {
  if (typeof window === "undefined") return "pro";
  const fromUrl = new URLSearchParams(window.location.search).get("mode");
  if (fromUrl === "dev" || fromUrl === "pro") return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dev" || saved === "pro") return saved;
  } catch {
    // Storage can be blocked; the default still works.
  }
  return "pro";
}

function Page({ mode, onSwitchMode }) {
  const path = usePath();

  useEffect(() => {
    const meta = routeMeta(path);
    document.title = mode === "dev" && path === "/" ? "~/asad — Muhammad Asad Ferozi" : meta.title;
  }, [path, mode]);

  if (path === "/") {
    return mode === "dev" ? <Developer onSwitchMode={onSwitchMode} /> : <Professional />;
  }
  if (path === "/work/parental-eye") return <ParentalEye />;
  if (path === "/work/ai-lawyer") return <AiLawyer />;
  if (path === "/writing") return <WritingIndex />;
  if (path.startsWith("/writing/")) return <Note slug={path.slice("/writing/".length)} />;
  return <NotFound />;
}

export default function App({ initialPath, ssr = false }) {
  const [mode, setMode] = useState(initialMode);

  const changeMode = useCallback((next) => {
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not remembered; nothing else depends on it.
    }
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    window.history.replaceState(null, "", url);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  // "D" toggles the mode, unless the visitor is typing somewhere.
  useEffect(() => {
    const onKey = (e) => {
      const typing = ["INPUT", "TEXTAREA"].includes(e.target.tagName);
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "d" || e.key === "D") changeMode(mode === "dev" ? "pro" : "dev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, changeMode]);

  return (
    <RouterProvider initialPath={initialPath}>
      <ModeSwitch mode={mode} onChange={changeMode} />
      <Page mode={mode} onSwitchMode={changeMode} />
      {!ssr && <Analytics />}
    </RouterProvider>
  );
}
