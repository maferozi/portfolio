import DocLayout from "../DocLayout.jsx";
import { evaluation } from "../../data/evaluation.js";

// Ingestion and question paths, drawn from the AI-LAWYER-EXPRESS code.
function Diagram() {
  const box = (x, y, w, title, sub, accent) => (
    <g>
      <rect className={`box${accent ? " box--accent" : ""}`} x={x} y={y} width={w} height="64" rx="10" />
      <text className="label" x={x + w / 2} y={y + 28} textAnchor="middle">{title}</text>
      <text className="sub" x={x + w / 2} y={y + 47} textAnchor="middle">{sub}</text>
    </g>
  );
  return (
    <svg className="diagram" viewBox="0 0 760 300" role="img"
      aria-label="Legal PDFs are chunked, embedded and stored in Pinecone. A question is embedded, the closest passages are retrieved and a LangChain QA chain answers from them; chats are stored in PostgreSQL.">
      <defs>
        <marker id="al-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className="arrow" d="M0 0L10 5L0 10z" />
        </marker>
      </defs>
      <text className="sub" x="20" y="26">Once, when documents are added</text>
      {box(20, 38, 150, "Legal PDFs", "two source books")}
      {box(210, 38, 160, "Chunk", "fixed word count")}
      {box(410, 38, 150, "Embed", "OpenAI embeddings")}
      {box(600, 38, 140, "Pinecone", "cosine index", true)}
      <path className="edge" d="M170 70H206" markerEnd="url(#al-arrow)" />
      <path className="edge" d="M370 70H406" markerEnd="url(#al-arrow)" />
      <path className="edge" d="M560 70H596" markerEnd="url(#al-arrow)" />

      <text className="sub" x="20" y="176">For every question</text>
      {box(20, 188, 150, "Question", "React chat")}
      {box(210, 188, 160, "Retrieve", "top 10 passages", true)}
      {box(410, 188, 150, "Answer", "LangChain QA chain")}
      {box(600, 188, 140, "Chat history", "PostgreSQL")}
      <path className="edge" d="M170 220H206" markerEnd="url(#al-arrow)" />
      <path className="edge" d="M370 220H406" markerEnd="url(#al-arrow)" />
      <path className="edge" d="M560 220H596" markerEnd="url(#al-arrow)" />
      <path className="edge" d="M670 102V140H290V184" markerEnd="url(#al-arrow)" />
      <text className="edge-label" x="420" y="134">nearest chunks</text>
    </svg>
  );
}

function Evaluation() {
  if (!evaluation) {
    return (
      <p className="doc-note">
        A retrieval evaluation is being run on this design. Results will appear here once they are measured.
      </p>
    );
  }
  const { setup, rows, findings, limitations, link } = evaluation;
  return (
    <>
      <p>{setup}</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Retriever</th>
              <th>Chunk (words)</th>
              <th>Hit@1</th>
              <th>Hit@5</th>
              <th>Hit@10</th>
              <th>MRR@10</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.retriever}-${r.chunk}`} className={r.best ? "is-best" : ""}>
                <td>{r.retriever}</td>
                <td>{r.chunk}</td>
                <td>{r.hit1}</td>
                <td>{r.hit5}</td>
                <td>{r.hit10}</td>
                <td>{r.mrr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>What the numbers say</h3>
      <ul>
        {findings.map((f) => (
          <li key={f.slice(0, 24)}>{f}</li>
        ))}
      </ul>
      <h3>Limits of this test</h3>
      <ul>
        {limitations.map((l) => (
          <li key={l.slice(0, 24)}>{l}</li>
        ))}
      </ul>
      {link ? (
        <p className="doc-links">
          <a href={link}>Evaluation code, questions and all 30 configurations</a>
        </p>
      ) : (
        <p className="doc-note">Showing 8 of the 30 configurations tested.</p>
      )}
    </>
  );
}

export default function AiLawyer() {
  return (
    <DocLayout
      back={{ to: "/#projects", label: "All work" }}
      eyebrow="Case study · Personal project"
      title="AI Lawyer: answering legal questions from the source text"
      lead="A retrieval-augmented assistant for Pakistani criminal law that answers from the statute itself instead of from the model’s memory."
    >
      <dl className="doc-facts">
        <div><dt>When</dt><dd>Jun – Oct 2024</dd></div>
        <div><dt>Type</dt><dd>Personal project</dd></div>
        <div><dt>Stack</dt><dd>React, Express, LangChain, OpenAI, Pinecone, PostgreSQL</dd></div>
      </dl>

      <p className="doc-links">
        <a href="https://github.com/maferozi/AI-LAWYER-EXPRESS">Backend code</a>
        <a href="https://github.com/maferozi/AI-LAWYER-REACT">Frontend code</a>
      </p>

      <h2>The problem</h2>
      <p>
        Most people in Pakistan never read the Penal Code; it is long and written for lawyers. A general chatbot will
        happily answer legal questions, but it answers from memory, can be confidently wrong, and gives no way to check
        where an answer came from. I wanted answers that are grounded in the actual text.
      </p>

      <h2>How it works</h2>
      <figure className="doc-figure">
        <Diagram />
        <figcaption>Two paths: indexing documents once, and answering each question from retrieved passages.</figcaption>
      </figure>
      <p>
        The source documents, the Pakistan Penal Code and a handbook of criminal investigation, are split into chunks of a
        fixed number of words. Each chunk is embedded with OpenAI and stored in a Pinecone index. When a user asks a
        question, it is embedded the same way, the ten closest chunks are retrieved, and a LangChain question-answering
        chain writes the answer from those passages only. Every question and answer is saved in PostgreSQL, so users can
        return to past conversations.
      </p>

      <h2>Measuring retrieval</h2>
      <p>
        In this design the answer can only be as good as the passages retrieved, so retrieval is the part worth measuring
        first: how often does the passage that answers a question actually reach the model?
      </p>
      <Evaluation />

      <h2>What I would improve next</h2>
      <ul>
        <li>Switch the app to 200-word chunks, the best setting measured above, and re-run the test with the production embeddings.</li>
        <li>Bridge everyday English and legal terms (for example “murder” and qatl-i-amd) with a glossary or query expansion.</li>
        <li>Show the section numbers each answer was drawn from, and grade full answers, not only retrieval.</li>
      </ul>
    </DocLayout>
  );
}
