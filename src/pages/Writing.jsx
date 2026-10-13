import DocLayout from "./DocLayout.jsx";
import { Link } from "../router.jsx";
import { notes } from "../data/notes.js";
import { person } from "../data/profile.js";

export function WritingIndex() {
  return (
    <DocLayout
      eyebrow="Writing"
      title="Notes on building with AI"
      lead="Short notes on agentic workflows and the engineering around them. First posted on LinkedIn."
    >
      <ul className="notes-list">
        {notes.map((n) => (
          <li key={n.slug}>
            <h2>
              <Link to={`/writing/${n.slug}`}>{n.title}</Link>
            </h2>
            <p className="doc-note">{n.date}</p>
            <p>{n.summary}</p>
          </li>
        ))}
      </ul>
    </DocLayout>
  );
}

export function Note({ slug }) {
  const note = notes.find((n) => n.slug === slug);
  if (!note) return <NotFound />;
  return (
    <DocLayout back={{ to: "/writing", label: "All notes" }} eyebrow={note.date} title={note.title}>
      {note.body.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
      <p className="doc-note">
        First posted on <a href={person.linkedin}>LinkedIn</a>.
      </p>
    </DocLayout>
  );
}

export function NotFound() {
  return (
    <DocLayout title="This page doesn’t exist" lead="The link may be old or mistyped.">
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </DocLayout>
  );
}
