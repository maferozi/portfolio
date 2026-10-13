import "./doc.css";
import { Link } from "../router.jsx";
import { person } from "../data/profile.js";

// Shared layout for case studies and notes. It follows the active mode through
// CSS variables, so the same page reads as a paper in one view and as docs in the other.
export default function DocLayout({ back = { to: "/", label: "Home" }, eyebrow, title, lead, children }) {
  return (
    <div className="doc">
      <nav className="doc-nav" aria-label="Breadcrumb">
        <Link to={back.to}>← {back.label}</Link>
      </nav>
      <article className="doc-article">
        <header className="doc-header">
          {eyebrow && <p className="doc-eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="doc-lead">{lead}</p>}
        </header>
        {children}
      </article>
      <footer className="doc-footer">
        <span>
          {person.name} · <a href={`mailto:${person.email}`}>{person.email}</a>
        </span>
        <Link to="/">Back to the home page</Link>
      </footer>
    </div>
  );
}
