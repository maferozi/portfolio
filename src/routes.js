// Every page, with the title and description used for the browser tab, search
// results and link previews. The prerender script renders each path to HTML.
import { notes } from "./data/notes.js";

export const SITE_URL = "https://maferozi.vercel.app";

const DEFAULT_DESCRIPTION =
  "Muhammad Asad Ferozi, software engineer building enterprise AI products. Applying for a research master's in AI, Fall 2027.";

const pages = {
  "/": {
    title: "Muhammad Asad Ferozi",
    description: DEFAULT_DESCRIPTION,
  },
  "/work/parental-eye": {
    title: "Parental Eye: real-time tracking with geofences — Muhammad Asad Ferozi",
    description:
      "Case study: MQTT, Turf.js geofences, PostGIS and Socket.IO alerts in a real-time child and vehicle tracking system.",
  },
  "/work/ai-lawyer": {
    title: "AI Lawyer: answering legal questions from the source text — Muhammad Asad Ferozi",
    description:
      "Case study and retrieval evaluation of a RAG assistant for Pakistani criminal law: chunking, embeddings, Pinecone and LangChain.",
  },
  "/writing": {
    title: "Writing — Muhammad Asad Ferozi",
    description: "Notes on agentic workflows and the engineering around them.",
  },
};

for (const n of notes) {
  pages[`/writing/${n.slug}`] = { title: `${n.title} — Muhammad Asad Ferozi`, description: n.summary };
}

export const allPaths = Object.keys(pages);

export function routeMeta(path) {
  return pages[path] ?? { title: "Page not found — Muhammad Asad Ferozi", description: DEFAULT_DESCRIPTION };
}
