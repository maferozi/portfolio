import { useEffect, useMemo, useRef, useState } from "react";

// ⌘K / Ctrl+K palette. Actions are passed in by the Developer page.
export default function CommandPalette({ actions }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => a.label.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  const choose = (action) => {
    setOpen(false);
    action.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <>
      <button type="button" className="palette-trigger" onClick={() => setOpen(true)}>
        <kbd>⌘K</kbd> Commands
      </button>
      {open && (
        <div className="palette-backdrop" onClick={() => setOpen(false)}>
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              className="palette__input"
              placeholder="Search actions…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              aria-label="Search actions"
            />
            <ul className="palette__list" role="listbox">
              {results.map((a, i) => (
                <li
                  key={a.label}
                  role="option"
                  aria-selected={i === active}
                  className={i === active ? "is-active" : ""}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(a)}
                >
                  <span>{a.label}</span>
                  {a.hint && <kbd>{a.hint}</kbd>}
                </li>
              ))}
              {results.length === 0 && <li className="palette__empty">No action matches “{query}”.</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
