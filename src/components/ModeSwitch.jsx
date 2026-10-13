// Two-option switch fixed to the top of the page. It is a radio group, so it
// works with arrow keys and screen readers; "D" also toggles (see App.jsx).
export default function ModeSwitch({ mode, onChange }) {
  const options = [
    { value: "pro", label: "Professional" },
    { value: "dev", label: "Developer" },
  ];

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      onChange(mode === "pro" ? "dev" : "pro");
    }
  };

  return (
    <div className="mode-switch" role="radiogroup" aria-label="Site mode" onKeyDown={onKeyDown}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={mode === o.value}
          tabIndex={mode === o.value ? 0 : -1}
          className={mode === o.value ? "is-active" : ""}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
      <kbd className="mode-switch__hint" aria-hidden="true">D</kbd>
    </div>
  );
}
