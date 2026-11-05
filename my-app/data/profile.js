// Semua isi situs ada di sini. Ubah teks, proyek, atau tautan di file ini saja.

export const profile = {
  name: "Nello Aurelius",
  title: "Full Stack Developer",
  cv: "/Nello-Aurelius-CV.pdf",
  email: "nellooaurelius@gmail.com",
};

export const portrait = {
  src: "/portrait-nello-v2.webp",
  alt: "Formal portrait of Nello Aurelius in a dark suit",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nelloaurelius" },
  { label: "GitHub", href: "https://github.com/negoblette" },
  { label: "Instagram", href: "https://www.instagram.com/nelloaurelius" },
];

// Isi proyek dibaca dari kode dan dokumentasi tiap proyek.
// Untuk menambah gambar, simpan di public/projects lalu isi gallery: { src, alt, caption, position }.
// Proyek AMI sengaja tanpa link repositori.
export const projects = [
  {
    id: "pentest",
    name: "Penetration Testing Tools",
    kind: "Artha Mitra Interdata",
    description: "An internal security platform that checks company assets for open ports, SSL certificates and HTTP header issues, then produces PDF reports.",
    summary: "An internal security assessment platform for checking company assets and publishing the results as PDF reports.",
    overview: [
      "Pentest AMI is a web application for running security checks against Artha Mitra Interdata's own assets. Authorised staff register targets, run scans, review the findings and publish a report from one place.",
      "Because the app sends active traffic to real hosts, every target has to pass an allowed-scope check twice: once when it is registered and again right before a scan starts, including a check on where its DNS name resolves.",
    ],
    features: [
      { title: "Asset management", text: "Keep a list of the assets that are authorised for testing." },
      { title: "Background scans", text: "Scans run in workers, so long checks never block the app." },
      { title: "Core checks", text: "Open ports, SSL certificates and HTTP security headers." },
      { title: "Findings review", text: "Collect results per assessment and review them in one place." },
      { title: "PDF reports", text: "Publish each assessment as a report that can be shared." },
      { title: "Controlled access", text: "Role-based accounts with no self-registration." },
    ],
    stack: [
      { label: "Frontend", items: ["React 19", "Vite", "Tailwind CSS v4", "React Router"] },
      { label: "Backend", items: ["FastAPI", "SQLAlchemy", "Alembic", "Celery"] },
      { label: "Data", items: ["PostgreSQL", "Redis"] },
      { label: "Security", items: ["OWASP ZAP", "ssh-audit", "JWT", "bcrypt"] },
      { label: "Reports", items: ["ReportLab"] },
    ],
    infrastructure: {
      flow: [
        { name: "Browser", role: "React interface" },
        { name: "Nginx", role: "Web entry point" },
        { name: "FastAPI", role: "API and access control" },
        { name: "Celery worker", role: "Runs the scans" },
        { name: "PostgreSQL", role: "Assets, findings, reports" },
      ],
      notes: [
        "Every service runs in Docker Compose, with separate production settings.",
        "Redis carries the job queue between the API and the workers.",
        "A scheduler service starts planned scans.",
        "Database changes are managed with Alembic migrations.",
      ],
    },
    links: [],
    image: {
      src: "/projects/pentest-overview.jpg",
      alt: "The Pentest AMI dashboard with its figures and activity blurred",
      caption: "Dashboard. Confidential data is blurred on every screen.",
      position: "55% 12%",
      shot: true,
    },
    gallery: [
      { src: "/projects/pentest-assets.jpg", alt: "The assets page with names and addresses blurred", caption: "Assets", position: "0% 0%", shot: true },
      { src: "/projects/pentest-scans.jpg", alt: "The scans page with scan names and results blurred", caption: "Scans", position: "0% 0%", shot: true },
      { src: "/projects/pentest-findings.jpg", alt: "The findings page with assets and vulnerabilities blurred", caption: "Findings", position: "0% 0%", shot: true },
    ],
  },
  {
    id: "website",
    name: "Company Website",
    kind: "Artha Mitra Interdata",
    description: "A company website for an IT solutions provider, covering products, solutions, news and activities, with an admin area for managing the content.",
    summary: "A company website for an IT solutions provider, with a private admin area for managing its content.",
    overview: [
      "This is a website for Artha Mitra Interdata, an IT solutions integrator focused on infrastructure and security. It presents the company, its products and solutions, its news and its activities.",
      "Page content is stored as structured files and edited through a private admin area, so the site can be updated without touching the code.",
    ],
    features: [
      { title: "Company pages", text: "About, products, solutions, insights, activities and contact." },
      { title: "Content admin", text: "Edit page content and manage brands and solutions." },
      { title: "Two-step sign-in", text: "Admin access needs a password and an authenticator code." },
      { title: "Restricted admin host", text: "Admin routes only answer on an approved host." },
      { title: "Content backups", text: "Keep backups of the content from the admin area." },
      { title: "Media uploads", text: "Upload images for use across the site." },
    ],
    stack: [
      { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Swiper"] },
      { label: "Backend", items: ["Next.js route handlers", "Middleware"] },
      { label: "Content", items: ["JSON content files", "File uploads"] },
      { label: "Security", items: ["Authenticator codes (TOTP)", "Session cookies"] },
    ],
    infrastructure: {
      flow: [
        { name: "Visitor", role: "Public pages" },
        { name: "Nginx", role: "Web entry point" },
        { name: "Next.js", role: "Pages and API routes" },
        { name: "Content files", role: "Page data and uploads" },
      ],
      notes: [
        "Packaged with a multi-stage Docker build on Node 20 Alpine.",
        "Docker Compose runs the web app next to a Redis service.",
        "Also has a PM2 configuration for running on a server directly.",
        "Includes scripts for security audits and dependency updates.",
      ],
    },
    links: [{ label: "Live site", href: "https://staging.arthamitra.co.id/" }],
    image: {
      src: "/projects/website-home.jpg",
      alt: "The Artha Mitra Interdata home page with the headline we optimize IT for you",
      caption: "Home page",
      position: "50% 0%",
      shot: true,
    },
    gallery: [
      { src: "/projects/website-approach.jpg", alt: "The section explaining how the company optimizes IT", caption: "How we optimize IT", position: "0% 0%", shot: true },
      { src: "/projects/website-solutions.jpg", alt: "The solutions and services lists side by side", caption: "Solutions and services", position: "0% 0%", shot: true },
      { src: "/projects/website-history.jpg", alt: "The company history timeline on the About page", caption: "History on the About page", position: "0% 0%", shot: true },
    ],
  },
  {
    id: "office",
    name: "Office Automation",
    kind: "Artha Mitra Interdata",
    description: "An internal system that brings employee data, attendance, leave, reimbursement and health claims together, with tiered approvals and email notifications.",
    summary: "An internal system that brings employee data and office administration together, with tiered approvals and email notifications.",
    overview: [
      "Office Automation is an internal web application for managing employee data and day-to-day administration in one central system, covering both finance and technical processes.",
      "Requests move through tiered approval flows, and every change is written to an audit log. Business rules live in a separate service layer so they can be tested without the interface.",
    ],
    features: [
      { title: "Employee records", text: "Employee history, documents, family data and certificates." },
      { title: "Attendance", text: "Clock in and out, with history and recaps." },
      { title: "Leave", text: "Requests, balances and a holiday calendar." },
      { title: "Reimbursement and health", text: "Claims with limits and tracked payouts." },
      { title: "Tiered approvals", text: "Configurable flows with several approval levels." },
      { title: "Notifications", text: "Email alerts and scheduled reminders." },
    ],
    stack: [
      { label: "Frontend", items: ["Next.js App Router", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack Table"] },
      { label: "Backend", items: ["Server Actions", "Zod", "NextAuth", "Argon2"] },
      { label: "Data", items: ["PostgreSQL 17", "Prisma"] },
      { label: "Jobs and email", items: ["pg-boss", "Nodemailer", "React Email"] },
      { label: "Testing", items: ["Vitest"] },
    ],
    infrastructure: {
      flow: [
        { name: "Browser", role: "Admin and staff" },
        { name: "Reverse proxy", role: "HTTPS entry point" },
        { name: "Next.js app", role: "Interface and server actions" },
        { name: "Service layer", role: "Business rules and approvals" },
        { name: "PostgreSQL", role: "Data and job queue" },
      ],
      notes: [
        "Runs in Docker Compose with separate app, worker, database and proxy services.",
        "A worker sends email and runs scheduled jobs from a queue stored in PostgreSQL, so Redis is not needed.",
        "A migration step updates the database before the app starts.",
        "A backup service keeps scheduled backups of the data.",
      ],
    },
    links: [],
    image: {
      src: "/projects/office-dashboard.jpg",
      alt: "The Office Automation dashboard with names and figures blurred",
      caption: "Dashboard. Confidential data is blurred on every screen.",
      position: "79% 0%",
      shot: true,
    },
    gallery: [
      { src: "/projects/office-attendance.jpg", alt: "The attendance recap with employees and figures blurred", caption: "Attendance recap", position: "0% 0%", shot: true },
      { src: "/projects/office-employees.jpg", alt: "The employee directory with personal details blurred", caption: "Employees and documents", position: "0% 0%", shot: true },
      { src: "/projects/office-customers.jpg", alt: "The customer and project list with names blurred", caption: "Customers and projects", position: "0% 0%", shot: true },
      { src: "/projects/office-reimburse.jpg", alt: "The reimbursement list with applicants and amounts blurred", caption: "Reimbursement", position: "0% 0%", shot: true },
      { src: "/projects/office-users.jpg", alt: "The user and role settings with accounts blurred", caption: "Users and roles", position: "0% 0%", shot: true },
    ],
  },
  {
    id: "covidx",
    name: "CovidX",
    kind: "AI project, Binus University",
    description: "A Covid-19 screening tool: upload a chest image in the Next.js app and a Flask service runs the model and returns the result.",
    summary: "A Covid-19 screening tool with two paths: a chest image check and a symptom questionnaire.",
    overview: [
      "CovidX is an AI course project that explores early Covid-19 screening. A person can upload a chest image for detection, or answer a short questionnaire about their symptoms and exposure for a risk prediction.",
      "It was built as a student project to learn how models fit into a real web app. It is not a medical tool.",
    ],
    features: [
      { title: "Image detection", text: "Upload a chest image and a trained model classifies it." },
      { title: "Symptom prediction", text: "Answer yes or no questions to get a predicted result." },
      { title: "Web interface", text: "A Next.js app with separate pages for each path." },
      { title: "Model API", text: "A Flask service with one endpoint for each model." },
    ],
    stack: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI"] },
      { label: "Backend", items: ["Flask", "Python", "OpenCV", "pandas"] },
      { label: "AI", items: ["TensorFlow Keras", "scikit-learn"] },
    ],
    infrastructure: {
      flow: [
        { name: "Browser", role: "Upload or questionnaire" },
        { name: "Next.js", role: "Interface on Vercel" },
        { name: "Flask API", role: "Prepares the input" },
        { name: "AI models", role: "Return the prediction" },
      ],
      notes: [
        "The frontend is deployed on Vercel.",
        "The Flask service and the trained models run separately from the frontend.",
        "The image model and the questionnaire model each have their own endpoint.",
      ],
    },
    links: [
      { label: "Live site", href: "https://covidx-ecru.vercel.app/" },
    ],
    image: {
      src: "/projects/covidx-landing.jpg",
      alt: "The CovidX home page with the headline Early Covid Detection Saves Lives",
      caption: "Home page",
      position: "50% 0%",
      shot: true,
    },
    gallery: [
      { src: "/projects/covidx-detection.jpg", alt: "The detection page with a chest X-ray upload form", caption: "X-ray detection", position: "0% 0%", shot: true },
      { src: "/projects/covidx-prediction.jpg", alt: "The symptom questionnaire with yes and no answers", caption: "Symptom questionnaire", position: "0% 0%", shot: true },
    ],
  },
  {
    id: "automation",
    name: "AI Automation",
    kind: "Artha Mitra Interdata",
    description: "A Telegram bot built in n8n that turns a text prompt into an image or a video, then sends the result back in the chat.",
    summary: "A Telegram bot that turns a text prompt into an image or a video, built as an n8n workflow.",
    overview: [
      "AI Automation is a Telegram bot that creates media on request. Someone picks image or video, sends a prompt, and receives the finished file in the same chat.",
      "The whole flow is an n8n workflow. Generation takes time, so the workflow waits and keeps checking until the result is ready before it sends anything back.",
    ],
    features: [
      { title: "Image or video", text: "The bot asks which one to make before it takes a prompt." },
      { title: "Saved choices", text: "The chosen mode and the prompt are kept in Google Sheets." },
      { title: "Generation jobs", text: "Each request starts a job on a separate generator service." },
      { title: "Status checks", text: "The workflow waits and checks again until the file is ready." },
      { title: "Delivery in chat", text: "Finished images and videos are sent back through Telegram." },
    ],
    stack: [
      { label: "Automation", items: ["n8n"] },
      { label: "Messaging", items: ["Telegram Bot"] },
      { label: "Data", items: ["Google Sheets"] },
      { label: "Runtime", items: ["Docker", "ngrok"] },
    ],
    infrastructure: {
      flow: [
        { name: "Telegram", role: "Chat and trigger" },
        { name: "n8n", role: "Workflow rules" },
        { name: "Google Sheets", role: "Mode and prompt" },
        { name: "Generator", role: "Image and video jobs" },
      ],
      notes: [
        "A switch sends each message to the right step of the conversation.",
        "Images and videos follow separate paths, each with its own wait and status loop.",
        "n8n reaches the generator service through the Docker host address.",
        "Finished images go through an asset upload step before they are sent.",
      ],
    },
    links: [],
    image: {
      src: "/projects/automation-flow.jpg",
      alt: "The n8n workflow behind the Telegram bot, with separate image and video paths",
      caption: "The n8n workflow behind the bot",
      position: "24% 50%",
      shot: true,
    },
    gallery: [
      { src: "/projects/automation-chat.jpg", alt: "A Telegram chat where the bot asks for a mode and a prompt, then replies with a generated poster", caption: "The bot in Telegram", position: "50% 0%", shot: true },
    ],
  },
];

export const experience = [
  { date: "Feb 2026 – Feb 2027", role: "System Business Analyst", org: "PT Artha Mitra Interdata" },
  { date: "2025 – Present", role: "Staff of Public Relations", org: "Binus English Club, Binus University" },
  { date: "Aug – Sep 2025", role: "Marketing Committee", org: "New Member Recruitment 2025, Binus English Club, Binus University" },
  { date: "Oct 2024 – Jan 2025", role: "Logistics, Accommodation and Equipment Committee", org: "National English Olympics, Binus English Club, Binus University" },
];

export const education = [
  { date: "2023 – Present", role: "Bachelor of Computer Science", org: "Binus University" },
  { date: "2021 – 2023", role: "High school", org: "Sang Timur High School" },
];

export const facts = [
  { label: "Studying", value: "Computer Science" },
  { label: "At", value: "Binus University" },
  { label: "Since", value: "2023" },
];

// CONTOH: paragraf ini ditulis dari isi CV. Ubah agar terdengar seperti Anda sendiri.
export const certificates = [
  { title: "AI for Beginners", issuer: "HP LIFE", date: "Sep 2025", file: "/certificates/ai-for-beginners.pdf" },
  { title: "Data Science & Analytics", issuer: "HP LIFE", date: "Sep 2025", file: "/certificates/data-science-analytics.pdf" },
  { title: "Agile Project Management", issuer: "HP LIFE", date: "Sep 2025", file: "/certificates/agile-project-management.pdf" },
  { title: "Inventory Management", issuer: "HP LIFE", date: "Sep 2025", file: "/certificates/inventory-management.pdf" },
  { title: "IT for Business Success", issuer: "HP LIFE", date: "Sep 2025", file: "/certificates/it-for-business-success.pdf" },
];


export const softSkills = ["Teamwork", "Clear communication", "Negotiation", "Open mind", "Critical thinking"];

export const hardSkills = [
  { label: "Language", items: ["JavaScript", "TypeScript", "Python", "PHP", "C"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["FastAPI", "Flask"] },
  { label: "Database", items: ["PostgreSQL", "MySQL", "Prisma"] },
  { label: "DevOps", items: ["Docker"] },
  { label: "AI", items: ["TensorFlow", "n8n"] },
  { label: "Others", items: ["Video editing", "Content captioning", "Data entry"] },
];

