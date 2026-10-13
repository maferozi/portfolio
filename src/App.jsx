import { useCallback, useEffect, useState } from "react";
import ModeSwitch from "./components/ModeSwitch.jsx";
import Professional from "./pro/Professional.jsx";
import Developer from "./dev/Developer.jsx";

const STORAGE_KEY = "portfolio-mode";

// Mode comes from the URL first (so links like ?mode=dev work), then the
// visitor's last choice, then defaults to professional.
function initialMode() {
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

export default function App() {
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
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    document.title =
      mode === "dev" ? "~/asad — Muhammad Asad Ferozi" : "Muhammad Asad Ferozi";
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
    <>
      <ModeSwitch mode={mode} onChange={changeMode} />
      {mode === "dev" ? (
        <Developer onSwitchMode={changeMode} />
      ) : (
        <Professional />
      )}
    </>
  );
}
