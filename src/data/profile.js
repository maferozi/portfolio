// Everything the site says about Asad lives here. Both modes read from this file,
// so content is edited once.

export const person = {
  name: "Muhammad Asad Ferozi",
  shortName: "Asad Ferozi",
  handle: "maferozi",
  role: "Full-stack engineer building LLM-powered systems",
  status: "Applying for a research master's in AI, Fall 2027",
  location: "Lahore, Pakistan",
  email: "maferozi373@gmail.com",
  github: "https://github.com/maferozi",
  linkedin: "https://www.linkedin.com/in/maferozi/",
  cv: "/Muhammad_Asad_Ferozi_CV.pdf",
  photo: { webp: "/asad-720.webp", jpg: "/asad-720.jpg" },
};

export const intro = [
  "I build production web systems and the LLM features inside them: enterprise search, document summarisation and retrieval-augmented assistants.",
  "I hold a BS in Information Technology from PUCIT, University of the Punjab (CGPA 3.78/4.00), and I'm applying for a research master's to study how to make these systems grounded, measurable and trustworthy.",
];

export const interests = [
  "Large language models and retrieval-augmented generation",
  "Grounded question answering and evaluation",
  "Trustworthy and secure AI",
  "Computer vision for assistive technology",
  "Real-time and distributed systems for AI",
];

export const experience = [
  {
    id: "intech",
    role: "Full Stack Engineer",
    org: "INTECH Automation and Intelligence",
    place: "Lahore",
    start: "Jun 2025",
    end: "Present",
    points: [
      "Build LLM features for EmpowerGPT, an enterprise platform for search, summarisation and workflow automation over structured and unstructured data.",
      "Built REST APIs serving 10,000+ requests a day; indexing and caching in PostgreSQL cut average response time by 35%.",
      "Containerised services with Docker behind Nginx, reaching 99.5% uptime and cutting deployment time by 40%.",
    ],
  },
  {
    id: "webox",
    role: "Full Stack Developer",
    org: "Webox Systems",
    place: "Lahore",
    start: "Jul 2024",
    end: "Jun 2025",
    points: [
      "Developed Euthyna, a sustainability analytics platform that automates ESG gap analysis and compliance checks.",
      "Code-splitting, database indexing and API optimisation cut page load times by 30%.",
      "Designed PostgreSQL schemas across 15+ tables, improving query efficiency by 30%.",
    ],
  },
  {
    id: "webox-fellow",
    role: "Full Stack Development Fellow",
    org: "Webox Systems",
    place: "Lahore",
    start: "Feb 2024",
    end: "May 2024",
    points: ["Three-month fellowship building PERN-stack applications."],
  },
  {
    id: "bytewise",
    role: "Frontend Development Fellow",
    org: "Bytewise Limited",
    place: "Remote",
    start: "Mar 2023",
    end: "Jul 2023",
    points: ["Three-month fellowship; built 5+ projects with React and Tailwind CSS."],
  },
];

export const projects = [
  {
    id: "ai-lawyer",
    name: "AI Lawyer",
    file: "ai-lawyer.ts",
    kind: "Personal project",
    year: "2024",
    summary:
      "A retrieval-augmented assistant that answers questions on Pakistan's legal framework, grounding language-model answers in semantic search over legal texts.",
    stack: ["React", "Node.js", "OpenAI", "Pinecone"],
    links: [
      { label: "Frontend code", href: "https://github.com/maferozi/AI-LAWYER-REACT" },
      { label: "Backend code", href: "https://github.com/maferozi/AI-LAWYER-EXPRESS" },
    ],
    featured: true,
  },
  {
    id: "empowergpt",
    name: "EmpowerGPT",
    file: "empowergpt.py",
    kind: "Industry, INTECH",
    year: "2025",
    summary:
      "LLM-powered enterprise search, document summarisation and workflow automation over structured and unstructured company data.",
    stack: ["React", "Flask", "PostgreSQL", "Docker", "OpenAI"],
    links: [],
  },
  {
    id: "parental-eye",
    name: "Parental Eye",
    file: "parental-eye.js",
    kind: "Final-year capstone, grade A",
    year: "2025",
    summary:
      "A real-time child-tracking system with geofencing, location history and safe-zone alerts, kept in sync over WebSockets and MQTT.",
    stack: ["React", "Node.js", "PostgreSQL", "MQTT", "WebSockets"],
    links: [
      { label: "Frontend code", href: "https://github.com/maferozi/parental-eye-react" },
      { label: "Backend code", href: "https://github.com/maferozi/parental-eye-express" },
    ],
  },
  {
    id: "be-my-eye",
    name: "Be My Eye",
    file: "be_my_eye.py",
    kind: "Computer vision project",
    year: "2024",
    summary:
      "Real-time obstacle detection for visually impaired users: 90% accuracy, 92% precision and 91% recall.",
    stack: ["Python", "Computer vision", "Roboflow"],
    links: [],
  },
  {
    id: "euthyna",
    name: "Euthyna",
    file: "euthyna.jsx",
    kind: "Industry, Webox Systems",
    year: "2024",
    summary:
      "Sustainability analytics that automates ESG gap analysis and compliance checks for companies.",
    stack: ["PostgreSQL", "Express", "React", "Node.js"],
    links: [],
  },
];

export const education = [
  {
    degree: "BS Information Technology",
    school: "PUCIT, University of the Punjab",
    years: "2021 – 2025",
    result: "CGPA 3.78 / 4.00 (85.40%)",
    note: "Highlights: Design & Analysis of Algorithms A, Artificial Intelligence A, Computer Organization A, Linear Algebra A.",
  },
  {
    degree: "Intermediate (FSc Pre-Engineering)",
    school: "Punjab College for Boys, Burewala",
    years: "2021",
    result: "97.4%, A+",
  },
  {
    degree: "Matriculation (Science)",
    school: "Govt. Higher Secondary School Sheikh Fazal, Burewala",
    years: "2019",
    result: "95.4%, A+",
  },
];

export const skills = [
  { group: "AI and ML", items: ["LLMs (OpenAI API)", "RAG", "Pinecone", "NLP", "Computer vision"] },
  { group: "Back end", items: ["Node.js", "Express", "Flask", "FastAPI", "REST", "GraphQL", "WebSockets", "MQTT"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { group: "Front end", items: ["React", "Next.js", "Redux", "Tailwind CSS"] },
  { group: "Infrastructure", items: ["Docker", "Nginx", "Git", "CI/CD", "Azure", "Linux"] },
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "Java"] },
];

export const certification =
  "Supervised Machine Learning: Regression and Classification, Stanford University and DeepLearning.AI (Coursera)";
