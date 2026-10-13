import "./pro.css";
import {
  person,
  intro,
  interests,
  experience,
  projects,
  education,
  skills,
  certification,
} from "../data/profile.js";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../components/Icons.jsx";

function Section({ id, title, children }) {
  return (
    <section className="pro-section" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="pro-section__title">
        {title}
      </h2>
      <div className="pro-section__body">{children}</div>
    </section>
  );
}

export default function Professional() {
  return (
    <div className="pro">
      <a className="pro-skip" href="#about">
        Skip to content
      </a>

      <header className="pro-hero">
        <div className="pro-hero__text">
          <h1 className="pro-hero__name">{person.name}</h1>
          <p className="pro-hero__role">{person.role}.</p>
          <p className="pro-hero__status">{person.status}.</p>

          <div className="pro-actions">
            <a className="pro-button pro-button--primary" href={person.cv} download>
              <DownloadIcon /> Download CV
            </a>
            <a className="pro-button" href={`mailto:${person.email}`}>
              <MailIcon /> Email me
            </a>
            <a className="pro-icon-link" href={person.github} aria-label="GitHub profile">
              <GitHubIcon />
            </a>
            <a className="pro-icon-link" href={person.linkedin} aria-label="LinkedIn profile">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <picture className="pro-hero__photo">
          <source srcSet={person.photo.webp} type="image/webp" />
          <img src={person.photo.jpg} alt="Portrait of Muhammad Asad Ferozi" width="360" height="360" />
        </picture>
      </header>

      <main>
        <Section id="about" title="About">
          {intro.map((p) => (
            <p key={p.slice(0, 20)} className="pro-lead">
              {p}
            </p>
          ))}
          <h3 className="pro-subhead">Research interests</h3>
          <ul className="pro-interests">
            {interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="pro-timeline">
            {experience.map((job) => (
              <li key={job.id} className="pro-entry">
                <div className="pro-entry__head">
                  <h3>
                    {job.role}, <span className="pro-entry__org">{job.org}</span>
                  </h3>
                  <span className="pro-entry__when">
                    {job.start} – {job.end}
                  </span>
                </div>
                <ul className="pro-points">
                  {job.points.map((pt) => (
                    <li key={pt.slice(0, 24)}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Selected work">
          <div className="pro-projects">
            {projects.map((p) => (
              <article key={p.id} className="pro-project">
                <div className="pro-entry__head">
                  <h3>{p.name}</h3>
                  <span className="pro-entry__when">
                    {p.kind}, {p.year}
                  </span>
                </div>
                <p>{p.summary}</p>
                <p className="pro-project__stack">Built with {p.stack.join(", ")}</p>
                {p.links.length > 0 && (
                  <p className="pro-project__links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href}>
                        {l.label}
                      </a>
                    ))}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          {education.map((e) => (
            <div key={e.degree} className="pro-entry">
              <div className="pro-entry__head">
                <h3>
                  {e.degree}, <span className="pro-entry__org">{e.school}</span>
                </h3>
                <span className="pro-entry__when">{e.years}</span>
              </div>
              <p className="pro-entry__result">{e.result}</p>
              {e.note && <p className="pro-muted">{e.note}</p>}
            </div>
          ))}
          <p className="pro-muted">Certificate: {certification}.</p>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="pro-skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title="Contact">
          <p className="pro-contact">
            <a href={`mailto:${person.email}`}>{person.email}</a>
          </p>
          <p className="pro-muted">
            Based in {person.location}. Happy to talk about research positions, collaborations or
            engineering work.
          </p>
        </Section>
      </main>

      <footer className="pro-footer">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span>Press D for the developer view.</span>
      </footer>
    </div>
  );
}
