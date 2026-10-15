// Everything the site says about Asad lives here. Both modes read from this file,
// so content is edited once.
//
// Sources (Oct 2026): LinkedIn profile, PUCIT transcript, public GitHub repos
// under github.com/maferozi, and a high-level summary of work pull requests.
// Work items are described without client names or internal details.

export const person = {
  name: "Muhammad Asad Ferozi",
  shortName: "Asad Ferozi",
  handle: "maferozi",
  role: "Software engineer building enterprise AI products",
  location: "Lahore, Pakistan",
  email: "maferozi373@gmail.com",
  github: "https://github.com/maferozi",
  linkedin: "https://www.linkedin.com/in/maferozi/",
  cv: "/Muhammad_Asad_Ferozi_CV.pdf",
  photo: { webp: "/asad-720.webp", jpg: "/asad-720.jpg" },
};

export const intro = [
  "I'm a software engineer at INTECH, where I work on EmpowerGPT, an enterprise generative-AI platform. I build features end to end: assistant builders, hybrid search over company documents, multi-tenant sign-in, and the React interfaces on top. Since October 2025 I've authored 145 pull requests there, 135 of them merged.",
  "I hold a BS in Information Technology from PUCIT, University of the Punjab (CGPA 3.78/4.00). I'm applying for a research master's to study how to make LLM systems grounded, measurable and safe to give real tools to.",
  "I also write on LinkedIn about agentic workflows: guardrails, idempotency, and what changes when an agent can act on production tools.",
];

export const interests = [
  "Retrieval-augmented generation and hybrid search",
  "Agentic workflows: tool use, guardrails and human approval",
  "Evaluating and grounding LLM answers",
  "Trustworthy and secure AI systems",
  "Real-time and distributed systems for AI",
];

export const experience = [
  {
    id: "intech-se",
    role: "Software Engineer",
    org: "INTECH Automation and Intelligence",
    place: "Lahore",
    start: "Jun 2026",
    end: "Present",
    points: [
      "Led the AI Assistants revamp: REST APIs for creating and sharing custom assistants, enterprise-knowledge and image-generation settings, and a redesigned assistant builder and knowledge-upload flow.",
      "Built Advanced Search and Explorer end to end (FastAPI and React): hybrid search across enterprise documents with suggestions, recent-activity tracking and workspace navigation, backed by indexing on multi-tenant PostgreSQL tables.",
    ],
  },
  {
    id: "intech-ase",
    role: "Associate Software Engineer",
    org: "INTECH Automation and Intelligence",
    place: "Lahore",
    start: "Jun 2025",
    end: "Jun 2026",
    points: [
      "Led the Data Library revamp across three versions: file and folder browsing with permissions, uploads for CSV, audio and video with size limits and cancelling, translations and a shared icon system.",
      "Designed multi-tenant sign-in on Keycloak: domain-based tenant discovery, credential-reset rules for new tenants and Azure AD language sync for enterprise SSO.",
      "Implemented rate limiting for AI image generation, coordinated across the chat and core backend services.",
      "Drove a configuration refactor across about 10 microservices and the frontend, standardising runtime settings for multi-environment Kubernetes deployments.",
      "Contributed to the shared Python framework used by every backend service: base repositories, factories, result types and database connection pooling.",
    ],
  },
  {
    id: "webox",
    role: "Full-stack Developer",
    org: "Webox Systems",
    place: "Lahore",
    start: "Jul 2024",
    end: "Jul 2025",
    points: [
      "Built features for Euthyna, a sustainability analytics platform, across React, Node.js, Express and PostgreSQL: frontend workflows, REST APIs and relational data models.",
      "Improved database efficiency and worked through code reviews, sprint planning and deployments with a cross-functional team.",
    ],
  },
  {
    id: "webox-fellow",
    role: "PERN Stack Fellow",
    org: "Webox Systems",
    place: "Lahore",
    start: "Feb 2024",
    end: "May 2024",
    points: ["Built full-stack applications with React, Node.js, Express and PostgreSQL in an Agile team."],
  },
  {
    id: "bytewise",
    role: "Frontend Fellow",
    org: "Bytewise Limited",
    place: "Remote",
    start: "Mar 2023",
    end: "Jul 2023",
    points: ["Built responsive projects with HTML, CSS, JavaScript, Tailwind CSS and React."],
  },
];

export const projects = [
  {
    id: "parental-eye",
    name: "Parental Eye",
    file: "parental-eye.js",
    kind: "Final-year project, four-person team",
    year: "2025",
    summary:
      "Real-time GPS tracking for children and school drivers. Devices publish locations over MQTT; the server checks each point against circle, polygon and route geofences with Turf.js, stores it in PostgreSQL with PostGIS, and pushes alerts over Socket.IO to the right people for each of five roles.",
    stack: ["React", "Leaflet", "Node.js", "MQTT", "Socket.IO", "PostGIS"],
    links: [
      { label: "Live demo", href: "https://parental-eye-react.vercel.app" },
      { label: "Frontend code", href: "https://github.com/maferozi/parental-eye-react" },
      { label: "Backend code", href: "https://github.com/maferozi/parental-eye-express" },
    ],
    caseStudy: "/work/parental-eye",
    image: { src: "/work/parental-eye.webp", alt: "Parental Eye home page", width: 1200, height: 400 },
    featured: true,
  },
  {
    id: "empowergpt",
    name: "EmpowerGPT",
    file: "empowergpt.tsx",
    kind: "Industry, INTECH",
    year: "2025–26",
    summary:
      "An enterprise generative-AI platform. My work: the assistant builder, hybrid document search and explorer, the Data Library, multi-tenant sign-in, and reusable UI such as an AG Grid data grid.",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Keycloak", "Kubernetes"],
    links: [],
  },
  {
    id: "ai-lawyer",
    name: "AI Lawyer",
    file: "ai-lawyer.ts",
    kind: "Personal project, retrieval-augmented assistant",
    year: "2024",
    summary:
      "Answers questions on Pakistani criminal law from the statute itself: legal PDFs are chunked, embedded with OpenAI and indexed in Pinecone, and a LangChain QA chain answers from the retrieved passages. A retrieval evaluation over 40 labelled questions and 30 configurations found the best setup, which reached the right section for 32 of 40 questions.",
    stack: ["React", "Express", "LangChain", "OpenAI", "Pinecone"],
    links: [
      { label: "Frontend code", href: "https://github.com/maferozi/AI-LAWYER-REACT" },
      { label: "Backend code", href: "https://github.com/maferozi/AI-LAWYER-EXPRESS" },
    ],
    caseStudy: "/work/ai-lawyer",
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
    id: "url-shortener",
    name: "URL Shortener API",
    file: "shortener.js",
    kind: "REST API",
    year: "2025",
    summary:
      "Create, update and delete short links with 8-character codes, track how often each is opened, and validate every request.",
    stack: ["Express 5", "MongoDB", "nanoid"],
    links: [{ label: "Code", href: "https://github.com/maferozi/asad-innovaxel-ferozi/tree/dev" }],
    minor: true,
  },
  {
    id: "job-board",
    name: "Job Board",
    file: "JobListing.php",
    kind: "Laravel app",
    year: "2024",
    summary:
      "Job listings with employers and tags, policy-based permissions for editing, and queued email notifications when a job is posted or changed.",
    stack: ["Laravel 11", "PHP", "Tailwind CSS"],
    links: [{ label: "Code", href: "https://github.com/maferozi/job-listing-laravel" }],
    minor: true,
  },
];

export const education = [
  {
    degree: "BS Information Technology",
    school: "PUCIT, University of the Punjab",
    years: "2021 – 2025",
    result: "CGPA 3.78 / 4.00",
    note: "Relevant coursework: Artificial Intelligence, Machine Learning, Design and Analysis of Algorithms, Data Structures and Algorithms, Discrete Structures, Linear Algebra, Probability and Statistics, Database Systems, Computer Networks, Operating Systems, Information Security, Cyber Security.",
  },
];

export const skills = [
  { group: "AI and ML", items: ["RAG", "LangChain", "OpenAI API", "Pinecone", "Hybrid search", "Computer vision"] },
  { group: "Back end", items: ["FastAPI", "Python", "Node.js", "Express", "REST", "WebSockets", "MQTT"] },
  { group: "Front end", items: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "AG Grid", "Leaflet"] },
  { group: "Data", items: ["PostgreSQL", "PostGIS", "Redis", "MongoDB"] },
  { group: "Platform", items: ["Kubernetes", "Docker", "Keycloak", "Azure AD (SSO)", "GitHub Actions", "Nginx"] },
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "PHP", "Java", "C++"] },
];

export const certifications = [
  {
    name: "Supervised Machine Learning: Regression and Classification",
    issuer: "Stanford University and DeepLearning.AI (Coursera)",
    date: "January 2025",
    url: "https://www.coursera.org/account/accomplishments/verify/B25EMBF6ZVMT",
  },
];

export const courses = [
  {
    name: "Ultimate AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Udemy, Stephane Maarek",
    date: "October 2026",
  },
];
