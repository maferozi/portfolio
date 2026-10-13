import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  person,
  intro,
  interests,
  experience,
  projects,
  education,
  skills,
} from "../data/profile.js";
import { notes } from "../data/notes.js";
import { navigate } from "../router.jsx";

const PROMPT = "asad@portfolio:~$";
const BOOT_COMMAND = "whoami";

function download(href) {
  const a = document.createElement("a");
  a.href = href;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Each command returns the lines to print. Lines are React nodes, so links stay clickable.
function buildCommands({ onSwitchMode, clear }) {
  const commands = {
    help: {
      about: "list available commands",
      run: () => [
        <span key="h" className="t-dim">Available commands:</span>,
        ...Object.entries(commands)
          .filter(([, c]) => !c.hidden)
          .map(([name, c]) => (
            <span key={name}>
              <span className="t-cmd">{name.padEnd(12, " ")}</span>
              <span className="t-dim">{c.about}</span>
            </span>
          )),
        <span key="tip" className="t-dim">Tip: Tab completes, ↑ ↓ browse history, ⌘K opens the command palette.</span>,
      ],
    },
    whoami: {
      about: "who is Asad",
      run: () => [
        <div key="who" className="t-whoami">
          <picture>
            <source srcSet={person.photo.webp} type="image/webp" />
            <img src={person.photo.jpg} alt="" width="96" height="96" />
          </picture>
          <div>
            <div className="t-strong">{person.name}</div>
            <div>{person.role}.</div>
            <div className="t-dim">{person.location}</div>
          </div>
        </div>,
        <span key="next" className="t-dim">
          Type <span className="t-cmd">help</span> to see what else you can ask.
        </span>,
      ],
    },
    about: {
      about: "background and research interests",
      run: () => [
        ...intro.map((p) => <span key={p.slice(0, 16)}>{p}</span>),
        <span key="ri" className="t-dim">Research interests:</span>,
        ...interests.map((i) => <span key={i}>  • {i}</span>),
      ],
    },
    projects: {
      about: "things I've built",
      run: () => [
        ...projects.map((p) => (
          <span key={p.id}>
            <button type="button" className="t-link" onClick={() => scrollToId(`proj-${p.id}`)}>
              {p.name}
            </button>
            <span className="t-dim">  {p.kind}, {p.year}</span>
          </span>
        )),
        <span key="more" className="t-dim">Select a name to jump to its card below.</span>,
      ],
    },
    notes: {
      about: "things I've written",
      run: () => [
        ...notes.map((n) => (
          <span key={n.slug}>
            <button type="button" className="t-link" onClick={() => navigate(`/writing/${n.slug}`)}>
              {n.slug}.md
            </button>
            <span className="t-dim">  {n.title}</span>
          </span>
        )),
      ],
    },
    "case-study": {
      about: "read a project write-up",
      run: () => [
        <span key="pe">
          <button type="button" className="t-link" onClick={() => navigate("/work/parental-eye")}>parental-eye</button>
          <span className="t-dim">  real-time tracking with geofences</span>
        </span>,
        <span key="al">
          <button type="button" className="t-link" onClick={() => navigate("/work/ai-lawyer")}>ai-lawyer</button>
          <span className="t-dim">  RAG for criminal law, with a retrieval evaluation</span>
        </span>,
      ],
    },
    experience: {
      about: "where I've worked",
      run: () =>
        experience.map((j) => (
          <span key={j.id}>
            <span className="t-accent">{j.start} – {j.end}</span>  {j.role}, {j.org}
          </span>
        )),
    },
    skills: {
      about: "my stack",
      run: () =>
        skills.map((s) => (
          <span key={s.group}>
            <span className="t-cmd">{s.group.padEnd(16, " ")}</span>
            {s.items.join(", ")}
          </span>
        )),
    },
    education: {
      about: "degrees and results",
      run: () =>
        education.map((e) => (
          <span key={e.degree}>
            <span className="t-accent">{e.years}</span>  {e.degree}, {e.school}{" "}
            <span className="t-dim">({e.result})</span>
          </span>
        )),
    },
    contact: {
      about: "how to reach me",
      run: () => [
        <span key="e">email     <a className="t-link" href={`mailto:${person.email}`}>{person.email}</a></span>,
        <span key="g">github    <a className="t-link" href={person.github} target="_blank" rel="noreferrer">github.com/{person.handle}</a></span>,
        <span key="l">linkedin  <a className="t-link" href={person.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/{person.handle}</a></span>,
      ],
    },
    cv: {
      about: "download my CV (PDF)",
      run: () => {
        download(person.cv);
        return [<span key="cv">Downloading Muhammad_Asad_Ferozi_CV.pdf…</span>];
      },
    },
    ls: {
      about: "list files",
      run: () => [
        <span key="ls">
          <span className="t-cmd">about.md  experience.log  projects/  skills.ts  contact.sh  cv.pdf</span>
        </span>,
      ],
    },
    pro: {
      about: "switch to the professional view",
      run: () => {
        setTimeout(() => onSwitchMode("pro"), 350);
        return [<span key="pro" className="t-dim">Switching to the professional view…</span>];
      },
    },
    clear: {
      about: "clear the screen",
      run: () => {
        clear();
        return null;
      },
    },
    "sudo hire-asad": {
      about: "you know you want to",
      hidden: true,
      run: () => {
        setTimeout(() => {
          window.location.href = `mailto:${person.email}?subject=${encodeURIComponent("Let's talk")}`;
        }, 900);
        return [
          <span key="s1" className="t-dim">[sudo] password for visitor: ********</span>,
          <span key="s2" className="t-accent">Access granted. Opening a new email to Asad…</span>,
        ];
      },
    },
  };
  return commands;
}

const Terminal = forwardRef(function Terminal({ onSwitchMode }, ref) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booting, setBooting] = useState(true);
  const inputRef = useRef(null);
  const screenRef = useRef(null);

  const clear = () => setLines([]);
  const commands = buildCommands({ onSwitchMode, clear });
  const names = Object.keys(commands);

  const run = (raw) => {
    const cmd = raw.trim().replace(/\s+/g, " ");
    const echo = { kind: "cmd", text: cmd };
    if (!cmd) {
      setLines((l) => [...l, echo]);
      return;
    }
    setHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);
    const entry = commands[cmd.toLowerCase()];
    if (!entry) {
      setLines((l) => [
        ...l,
        echo,
        {
          kind: "out",
          nodes: [
            <span key="nf">
              command not found: {cmd}. Type <span className="t-cmd">help</span> for the list.
            </span>,
          ],
        },
      ]);
      return;
    }
    const out = entry.run();
    if (out === null) return; // clear
    setLines((l) => [...l, echo, { kind: "out", nodes: out }]);
  };

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    run,
  }));

  // One orchestrated moment: on first load the terminal types "whoami" itself.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      run(BOOT_COMMAND);
      setBooting(false);
      return;
    }
    let i = 0;
    let timer;
    const type = () => {
      i += 1;
      setInput(BOOT_COMMAND.slice(0, i));
      if (i < BOOT_COMMAND.length) {
        timer = setTimeout(type, 90);
      } else {
        timer = setTimeout(() => {
          setInput("");
          run(BOOT_COMMAND);
          setBooting(false);
        }, 320);
      }
    };
    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = names.filter((n) => !commands[n].hidden && n.startsWith(input.toLowerCase()));
      if (match.length === 1) setInput(match[0]);
      else if (match.length > 1) {
        setLines((l) => [...l, { kind: "cmd", text: input }, { kind: "out", nodes: [<span key="m" className="t-dim">{match.join("  ")}</span>] }]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clear();
    }
  };

  return (
    <div className="term" onClick={() => !booting && inputRef.current?.focus()}>
      <div className="term__bar">
        <span className="term__dots" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span className="term__title">asad@portfolio: ~</span>
      </div>
      <div className="term__screen" ref={screenRef} role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <div key={i} className="t-line">
              <span className="t-prompt">{PROMPT}</span> {line.text}
            </div>
          ) : (
            <div key={i} className="t-out">
              {line.nodes.map((n, j) => (
                <div key={j}>{n}</div>
              ))}
            </div>
          )
        )}
        <label className="t-line t-input">
          <span className="t-prompt">{PROMPT}</span>
          <span className="sr-only">Type a command</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            readOnly={booting}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input. Type help for commands."
          />
        </label>
      </div>
    </div>
  );
});

export default Terminal;
