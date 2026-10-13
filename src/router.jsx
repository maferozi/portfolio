import { createContext, useContext, useEffect, useState } from "react";

// A very small client-side router: plain paths, history API, no library.
// On the server (prerendering) the path comes in as a prop.

const PathContext = createContext("/");

export function RouterProvider({ initialPath, children }) {
  const [path, setPath] = useState(
    initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/")
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    window.addEventListener("app:navigate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("app:navigate", onPop);
    };
  }, []);

  return <PathContext.Provider value={normalise(path)}>{children}</PathContext.Provider>;
}

export const usePath = () => useContext(PathContext);

export function normalise(path) {
  const p = path.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function navigate(to) {
  const url = new URL(to, window.location.href);
  // Keep the current mode in the URL so a shared link opens the same view.
  const mode = new URLSearchParams(window.location.search).get("mode");
  if (mode && !url.searchParams.has("mode")) url.searchParams.set("mode", mode);
  window.history.pushState(null, "", url);
  window.dispatchEvent(new Event("app:navigate"));
  if (url.hash) {
    requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView());
  } else {
    window.scrollTo({ top: 0 });
  }
}

// Internal link: normal <a> for crawlers and new tabs, client navigation on plain clicks.
export function Link({ to, children, ...rest }) {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
