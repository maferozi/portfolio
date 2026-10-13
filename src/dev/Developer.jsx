import { useMemo, useRef, useState } from "react";
import "./dev.css";
import Terminal from "./Terminal.jsx";
import CommandPalette from "./CommandPalette.jsx";
import { person, experience, projects, skills } from "../data/profile.js";

// Deterministic short "commit hashes" for the git-log styling of experience.
function hashOf(text) {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

// "LLMs (OpenAI API)" -> "LLMs", "Computer vision" -> "ComputerVision",
// "C++" -> "Cpp", "Node.js" -> "NodeJS": readable identifiers for stack.ts.
const toIdent = (s) =>
  s
    .replace(/\s*\(.*?\)/g, "")
    .replace(/\s+API$/, "")
    .replace(/\+\+/g, "pp")
    .replace(/\.js$/i, "JS")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");

export default function Developer({ onSwitchMode }) {
  const terminalRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const actions = useMemo(
    () => [
      { label: "Type in the terminal", run: () => terminalRef.current?.focus() },
      { label: "Go to projects", run: () => go("dev-projects") },
      { label: "Go to experience", run: () => go("dev-experience") },
      { label: "Go to stack", run: () => go("dev-stack") },
      { label: "Go to contact", run: () => go("dev-contact") },
      { label: "Download CV (PDF)", run: () => terminalRef.current?.run("cv") },
      { label: "Copy email address", run: copyEmail },
      { label: "Open GitHub", run: () => window.open(person.github, "_blank", "noopener") },
      { label: "Open LinkedIn", run: () => window.open(person.linkedin, "_blank", "noopener") },
      { label: "Switch to professional view", hint: "D", run: () => onSwitchMode("pro") },
    ],
    [onSwitchMode]
  );

  return (
    <div className="dev">
      <div className="dev-glow" aria-hidden="true" />

      <nav className="dev-nav" aria-label="Sections">
        <span className="dev-nav__path">~/asad</span>
        <a href="#dev-projects">projects/</a>
        <a href="#dev-experience">git log</a>
        <a href="#dev-stack">stack.ts</a>
        <a href="#dev-contact">contact.sh</a>
        <CommandPalette actions={actions} />
      </nav>

      <header className="dev-hero">
        <h1 className="dev-hero__name">{person.shortName}</h1>
        <p className="dev-hero__line">
          I ship LLM systems to production, and I’m heading into research to make them trustworthy.
        </p>
        <Terminal ref={terminalRef} onSwitchMode={onSwitchMode} />
      </header>

      <main>
        <section id="dev-projects" className="dev-section" aria-labelledby="dev-projects-title">
          <h2 id="dev-projects-title" className="dev-section__title">
            <span className="dev-prompt">$</span> ls projects/
          </h2>
          <div className="dev-projects">
            {projects.filter((p) => !p.minor).map((p) => (
              <article
                key={p.id}
                id={`proj-${p.id}`}
                className={`dev-card${p.featured ? " dev-card--featured" : ""}`}
              >
                <div className="dev-card__tab">
                  <span>{p.file}</span>
                  <span className="dev-card__meta">{p.year}</span>
                </div>
                <div className="dev-card__body">
                  <p className="dev-comment">{`// ${p.kind}`}</p>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <ul className="dev-tokens" aria-label="Built with">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  {p.links.length > 0 && (
                    <p className="dev-card__links">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      ))}
                    </p>
                  )}
                </div>
              </article>
            ))}
            {/* Smaller builds share one card, listed like a directory. */}
            <article className="dev-card dev-card--list">
              <div className="dev-card__tab">
                <span>more/</span>
                <span className="dev-card__meta">smaller builds</span>
              </div>
              <ul className="dev-card__body dev-minor">
                {projects.filter((p) => p.minor).map((p) => (
                  <li key={p.id} id={`proj-${p.id}`}>
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                    <p className="dev-minor__meta">
                      {p.stack.join(" · ")}
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="dev-experience" className="dev-section" aria-labelledby="dev-exp-title">
          <h2 id="dev-exp-title" className="dev-section__title">
            <span className="dev-prompt">$</span> git log --author=asad
          </h2>
          <ol className="dev-log">
            {experience.map((job, i) => (
              <li key={job.id}>
                <div className="dev-log__head">
                  <span className="dev-log__hash">{hashOf(job.id + job.start)}</span>
                  {i === 0 && <span className="dev-log__ref">(HEAD -&gt; {job.id})</span>}
                  <span className="dev-log__msg">
                    {job.role} @ {job.org}
                  </span>
                </div>
                <div className="dev-log__date">
                  {job.start} – {job.end}, {job.place}
                </div>
                <ul>
                  {job.points.map((pt) => (
                    <li key={pt.slice(0, 24)}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="dev-stack" className="dev-section" aria-labelledby="dev-stack-title">
          <h2 id="dev-stack-title" className="dev-section__title">
            <span className="dev-prompt">$</span> cat stack.ts
          </h2>
          <pre className="dev-code">
            <code>
              {skills.map((s) => (
                <span key={s.group} className="dev-code__line">
                  <span className="k">import</span> {"{ "}
                  {s.items.map((item, i) => (
                    <span key={item}>
                      <span className="v">{toIdent(item)}</span>
                      {i < s.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  {" }"} <span className="k">from</span>{" "}
                  <span className="s">{`"@asad/${s.group.toLowerCase().replace(/[^a-z]+/g, "-")}"`}</span>;
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
        </section>

        <section id="dev-contact" className="dev-section" aria-labelledby="dev-contact-title">
          <h2 id="dev-contact-title" className="dev-section__title">
            <span className="dev-prompt">$</span> ./contact.sh
          </h2>
          <div className="dev-contact">
            <pre className="dev-code">
              <code>
                <span className="k">curl</span> -X POST mailto:<span className="s">{person.email}</span>{" \\\n"}
                {"  "}-d <span className="s">{`"subject=Let's build something"`}</span>
              </code>
            </pre>
            <div className="dev-contact__actions">
              <a className="dev-button dev-button--primary" href={`mailto:${person.email}`}>
                Send an email
              </a>
              <button type="button" className="dev-button" onClick={copyEmail}>
                {copied ? "Copied" : "Copy address"}
              </button>
              <a className="dev-button" href={person.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="dev-button" href={person.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="dev-button" href={person.cv} download>
                CV (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="dev-footer">
        <span>
          <kbd>⌘K</kbd> commands
        </span>
        <span>
          <kbd>D</kbd> professional view
        </span>
        <span>© {new Date().getFullYear()} {person.name}</span>
      </footer>
    </div>
  );
}
