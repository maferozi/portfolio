// Results of the AI Lawyer retrieval evaluation, copied from eval/results.json
// in the AI-LAWYER-EXPRESS repository (run on 13 Oct 2026; a second full run gave
// identical numbers). Selected rows; the repository has all 30 configurations.
export const evaluation = {
  setup:
    "The test uses 40 everyday questions about the Penal Code (22 on punishments, 7 definitions, 6 exceptions, 5 procedural), each labelled with the section that answers it. The index holds both source books, chunked exactly as the app does. I compared keyword search (BM25), dense retrieval with two open embedding models, and a hybrid of the two, at chunk sizes from 40 to 800 words. A question counts as a hit when a retrieved chunk contains its section. The app sends the top 10 chunks to the model, so Hit@10 is the number that matters most.",
  rows: [
    { retriever: "Keyword (BM25)", chunk: 200, hit1: "0.150", hit5: "0.300", hit10: "0.300", mrr: "0.213" },
    { retriever: "Keyword (BM25)", chunk: 800, hit1: "0.225", hit5: "0.375", hit10: "0.500", mrr: "0.293" },
    { retriever: "Dense, MiniLM", chunk: 40, hit1: "0.275", hit5: "0.525", hit10: "0.625", mrr: "0.395" },
    { retriever: "Dense, MiniLM", chunk: 200, hit1: "0.350", hit5: "0.700", hit10: "0.800", mrr: "0.489", best: true },
    { retriever: "Dense, MiniLM", chunk: 300, hit1: "0.375", hit5: "0.600", hit10: "0.625", mrr: "0.465" },
    { retriever: "Dense, BGE-small", chunk: 200, hit1: "0.300", hit5: "0.675", hit10: "0.775", mrr: "0.446" },
    { retriever: "Hybrid, MiniLM", chunk: 200, hit1: "0.250", hit5: "0.450", hit10: "0.600", mrr: "0.351" },
    { retriever: "Hybrid, MiniLM", chunk: 400, hit1: "0.300", hit5: "0.575", hit10: "0.725", mrr: "0.440" },
  ],
  findings: [
    "Dense retrieval beats keyword search at every chunk size, by 0.25–0.50 Hit@10 up to 400 words. People ask about “stealing”; the statute says “theft”.",
    "200-word chunks worked best: 32 of 40 questions had the right section in the top 10. The sizes used in the app’s own examples (40 and 300 words) both scored 0.625.",
    "Fusing keyword and dense results did not help at small chunk sizes; it only caught up at 400–800 words, where the small embedding models cut off most of each chunk.",
    "Every model missed the murder questions. The Penal Code uses terms such as qatl-i-amd and qisas, which plain-English questions never reach.",
  ],
  limitations: [
    "Open models stand in for the OpenAI embeddings used in the app; those read longer chunks without cutting them off, so the best chunk size may differ there.",
    "With 40 questions, one question moves a score by 0.025, so differences under about 0.1 are noise.",
    "Only retrieval is measured. Answers were not generated or graded.",
  ],
  link: "https://github.com/maferozi/AI-LAWYER-EXPRESS/tree/main/eval",
};
