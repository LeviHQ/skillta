import { additionalCareers } from "./additionalCareers";

export interface Career {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  whySuits: string[];
  requiredSkills: string[];
  learningDifficulty: "Easy" | "Moderate" | "Hard" | "Very Hard";
  estimatedTime: string;
  demandLevel: "High" | "Very High" | "Moderate" | "Growing";
  salaryIndia: string;
  salaryGlobal: string;
  growthPotential: string;
  roadmap: RoadmapPhase[];
  realityCheck: {
    difficulty: number;
    learningTime: string;
    competition: "Low" | "Medium" | "High" | "Very High";
    entryBarrier: "Low" | "Medium" | "High";
    salaryExpectation: string;
    honestNote: string;
  };
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  items: { name: string; description: string }[];
  resources: string[];
  projects: string[];
}

export const careers: Career[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    icon: "🎨",
    tagline: "Craft beautiful, interactive user experiences",
    description: "Frontend developers bring designs to life. You'll build the visual and interactive parts of websites and apps that users directly interact with.",
    whySuits: [
      "You have a strong eye for design and aesthetics",
      "You enjoy seeing immediate visual results from your work",
      "You're creative and detail-oriented",
      "You love making things look and feel amazing"
    ],
    requiredSkills: ["HTML/CSS", "JavaScript", "React/Vue/Angular", "TypeScript", "Responsive Design", "Git", "UI/UX Principles"],
    learningDifficulty: "Moderate",
    estimatedTime: "6-12 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹4-15 LPA (entry) → ₹15-40 LPA (senior)",
    salaryGlobal: "$50K-80K (entry) → $120K-200K+ (senior)",
    growthPotential: "Excellent — every company needs frontend developers. Growing demand for React/Next.js specialists.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "1-2 months",
        items: [
          { name: "HTML5", description: "Semantic markup, accessibility, forms" },
          { name: "CSS3", description: "Flexbox, Grid, animations, responsive design" },
          { name: "JavaScript Basics", description: "Variables, functions, DOM manipulation, events" },
        ],
        resources: ["MDN Web Docs", "freeCodeCamp", "The Odin Project"],
        projects: ["Personal portfolio website", "Responsive landing page", "Interactive form"],
      },
      {
        phase: 2, title: "Core Skills", duration: "2-3 months",
        items: [
          { name: "Advanced JavaScript", description: "ES6+, async/await, closures, prototypes" },
          { name: "TypeScript", description: "Types, interfaces, generics" },
          { name: "React.js", description: "Components, hooks, state management, routing" },
        ],
        resources: ["React docs", "TypeScript Handbook", "Scrimba"],
        projects: ["Todo app with React", "Weather dashboard", "E-commerce product page"],
      },
      {
        phase: 3, title: "Tools & Technologies", duration: "1-2 months",
        items: [
          { name: "Next.js", description: "SSR, SSG, API routes" },
          { name: "Tailwind CSS", description: "Utility-first styling" },
          { name: "Testing", description: "Jest, React Testing Library, Cypress" },
        ],
        resources: ["Next.js docs", "Testing JavaScript (Kent C. Dodds)", "Tailwind docs"],
        projects: ["Full-stack blog with Next.js", "Component library", "Dashboard with charts"],
      },
      {
        phase: 4, title: "Projects", duration: "2-3 months",
        items: [
          { name: "Portfolio Projects", description: "3-5 polished projects showcasing skills" },
          { name: "Open Source", description: "Contribute to React ecosystem projects" },
          { name: "Real Client Work", description: "Freelance or volunteer for experience" },
        ],
        resources: ["GitHub", "Dev.to", "Frontend Mentor"],
        projects: ["Social media dashboard clone", "Real-time chat app", "Animated portfolio site"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1-2 months",
        items: [
          { name: "DSA Basics", description: "Arrays, strings, common patterns" },
          { name: "System Design", description: "Frontend architecture, performance" },
          { name: "Interview Prep", description: "Behavioral + technical questions" },
        ],
        resources: ["LeetCode", "Glassdoor", "Pramp"],
        projects: ["Polish GitHub profile", "Deploy all projects", "Practice mock interviews"],
      },
    ],
    realityCheck: {
      difficulty: 3,
      learningTime: "6-12 months (basics) → 2-3 years (expert)",
      competition: "High",
      entryBarrier: "Low",
      salaryExpectation: "Starts modest but grows quickly with experience. Remote-friendly roles often pay more.",
      honestNote: "Frontend changes fast. You'll constantly learn new frameworks and tools. CSS can be frustrating. But the creative satisfaction is unmatched.",
    },
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    icon: "⚙️",
    tagline: "Build the engines that power applications",
    description: "Backend developers create the server-side logic, databases, and APIs that make applications work. You're the architect behind the scenes.",
    whySuits: [
      "You love logical thinking and system design",
      "You prefer working with data and algorithms over visuals",
      "You enjoy solving complex architectural problems",
      "You want to understand how systems scale"
    ],
    requiredSkills: ["Node.js/Python/Java", "Databases (SQL/NoSQL)", "REST APIs", "Authentication", "Cloud Services", "Docker", "System Design"],
    learningDifficulty: "Hard",
    estimatedTime: "8-14 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹5-18 LPA (entry) → ₹20-50 LPA (senior)",
    salaryGlobal: "$60K-90K (entry) → $130K-220K+ (senior)",
    growthPotential: "Excellent — backend skills are foundational and always in demand.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "2-3 months",
        items: [
          { name: "Programming Language", description: "Python, Node.js, or Java — pick one and master it" },
          { name: "Data Structures & Algorithms", description: "Arrays, trees, graphs, sorting, searching" },
          { name: "Computer Science Basics", description: "OS, networking, HTTP protocol" },
        ],
        resources: ["CS50 (Harvard)", "freeCodeCamp", "NeetCode"],
        projects: ["CLI task manager", "Basic calculator", "File organizer script"],
      },
      {
        phase: 2, title: "Core Skills", duration: "2-3 months",
        items: [
          { name: "Databases", description: "PostgreSQL, MongoDB, Redis — querying, indexing, optimization" },
          { name: "REST API Design", description: "CRUD operations, authentication, error handling" },
          { name: "Version Control", description: "Git workflows, branching strategies" },
        ],
        resources: ["PostgreSQL docs", "MongoDB University", "REST API Tutorial"],
        projects: ["Blog API with authentication", "URL shortener", "Inventory management API"],
      },
      {
        phase: 3, title: "Tools & Technologies", duration: "2-3 months",
        items: [
          { name: "Docker & Containers", description: "Containerization, Docker Compose" },
          { name: "Cloud Services", description: "AWS/GCP basics, deployment, S3, Lambda" },
          { name: "Message Queues", description: "RabbitMQ, Redis pub/sub, event-driven design" },
        ],
        resources: ["Docker docs", "AWS Free Tier", "Fireship.io"],
        projects: ["Microservices architecture", "Serverless API", "Real-time notification system"],
      },
      {
        phase: 4, title: "Projects", duration: "2-3 months",
        items: [
          { name: "Full-Stack App", description: "Build end-to-end with a frontend" },
          { name: "System Design", description: "Design scalable architectures" },
          { name: "Open Source", description: "Contribute to backend frameworks" },
        ],
        resources: ["System Design Primer", "GitHub", "Dev.to"],
        projects: ["E-commerce platform", "Real-time chat system", "Payment integration"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1-2 months",
        items: [
          { name: "DSA Practice", description: "LeetCode medium/hard problems" },
          { name: "System Design Interviews", description: "Practice designing scalable systems" },
          { name: "Behavioral Prep", description: "STAR method, past experiences" },
        ],
        resources: ["LeetCode", "Grokking System Design", "Pramp"],
        projects: ["Polish portfolio", "Write technical blog posts", "Mock interviews"],
      },
    ],
    realityCheck: {
      difficulty: 4,
      learningTime: "8-14 months (basics) → 3-4 years (expert)",
      competition: "Medium",
      entryBarrier: "Medium",
      salaryExpectation: "Generally higher than frontend. Strong demand for Node.js and Python developers.",
      honestNote: "Backend is less glamorous — no one sees your work. Debugging production issues at 2 AM happens. But the pay is great and the skills transfer across industries.",
    },
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: "📊",
    tagline: "Turn data into actionable intelligence",
    description: "Data scientists analyze complex datasets to find patterns, build predictive models, and drive business decisions with data-driven insights.",
    whySuits: [
      "You love mathematics and statistics",
      "You're curious about finding hidden patterns",
      "You enjoy working with large datasets",
      "You want to make decisions based on evidence"
    ],
    requiredSkills: ["Python/R", "Statistics", "Machine Learning", "SQL", "Data Visualization", "Pandas/NumPy", "Communication"],
    learningDifficulty: "Very Hard",
    estimatedTime: "12-18 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹6-20 LPA (entry) → ₹25-60 LPA (senior)",
    salaryGlobal: "$70K-100K (entry) → $150K-250K+ (senior)",
    growthPotential: "Outstanding — AI/ML boom is creating massive demand. One of the highest-paid tech careers.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "2-3 months",
        items: [
          { name: "Python Programming", description: "Master Python for data work" },
          { name: "Mathematics", description: "Linear algebra, calculus, probability" },
          { name: "Statistics", description: "Hypothesis testing, distributions, regression" },
        ],
        resources: ["Khan Academy", "3Blue1Brown", "Python for Data Analysis (book)"],
        projects: ["Statistical analysis of a dataset", "Data cleaning pipeline", "Exploratory data analysis"],
      },
      {
        phase: 2, title: "Core Skills", duration: "3-4 months",
        items: [
          { name: "Pandas & NumPy", description: "Data manipulation and numerical computing" },
          { name: "Data Visualization", description: "Matplotlib, Seaborn, Plotly" },
          { name: "SQL", description: "Complex queries, joins, window functions" },
        ],
        resources: ["Kaggle Learn", "Mode Analytics SQL Tutorial", "DataCamp"],
        projects: ["Sales analysis dashboard", "Customer segmentation", "A/B test analysis"],
      },
      {
        phase: 3, title: "Machine Learning", duration: "3-4 months",
        items: [
          { name: "Supervised Learning", description: "Regression, classification, ensemble methods" },
          { name: "Unsupervised Learning", description: "Clustering, PCA, anomaly detection" },
          { name: "Deep Learning Basics", description: "Neural networks, TensorFlow/PyTorch intro" },
        ],
        resources: ["Andrew Ng's ML Course", "fast.ai", "Scikit-learn docs"],
        projects: ["House price prediction", "Image classifier", "Recommendation engine"],
      },
      {
        phase: 4, title: "Projects & Portfolio", duration: "2-3 months",
        items: [
          { name: "End-to-End Projects", description: "From data collection to deployment" },
          { name: "Kaggle Competitions", description: "Compete and learn from others" },
          { name: "Blog Writing", description: "Document your findings and process" },
        ],
        resources: ["Kaggle", "Towards Data Science", "GitHub"],
        projects: ["NLP sentiment analyzer", "Time series forecasting", "ML-powered web app"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1-2 months",
        items: [
          { name: "Case Studies", description: "Practice business case interviews" },
          { name: "Technical Interviews", description: "ML concepts, coding, statistics" },
          { name: "Portfolio Polish", description: "GitHub, blog, Kaggle profile" },
        ],
        resources: ["Glassdoor", "Interview Query", "Ace the Data Science Interview (book)"],
        projects: ["Create portfolio website", "Record project walkthroughs", "Mock interviews"],
      },
    ],
    realityCheck: {
      difficulty: 5,
      learningTime: "12-18 months (basics) → 3-5 years (expert)",
      competition: "Very High",
      entryBarrier: "High",
      salaryExpectation: "One of the highest paying tech careers, but entry-level competition is fierce. MS/PhD helps but not required.",
      honestNote: "80% of the job is cleaning data, not building cool models. Math is non-negotiable. The field is overhyped for beginners but genuinely rewarding for those who persist.",
    },
  },
  {
    id: "cybersecurity-specialist",
    title: "Cybersecurity Specialist",
    icon: "🔐",
    tagline: "Protect systems and hunt vulnerabilities",
    description: "Cybersecurity specialists protect organizations from threats, find vulnerabilities, and ensure data safety in an increasingly digital world.",
    whySuits: [
      "You're naturally curious about how things break",
      "You enjoy puzzles and detective-like thinking",
      "You care about privacy and security",
      "You thrive under pressure"
    ],
    requiredSkills: ["Networking", "Linux", "Python/Bash", "Penetration Testing", "Cryptography", "SIEM Tools", "Compliance"],
    learningDifficulty: "Hard",
    estimatedTime: "10-16 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹5-15 LPA (entry) → ₹20-50 LPA (senior)",
    salaryGlobal: "$65K-95K (entry) → $130K-200K+ (senior)",
    growthPotential: "Outstanding — cybersecurity talent shortage is massive globally. One of the most recession-proof tech careers.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "2-3 months",
        items: [
          { name: "Networking", description: "TCP/IP, DNS, HTTP, firewalls, VPNs" },
          { name: "Linux", description: "Command line, file systems, permissions" },
          { name: "Operating Systems", description: "Windows/Linux security, processes" },
        ],
        resources: ["CompTIA Network+", "TryHackMe", "Linux Journey"],
        projects: ["Set up a home lab", "Network traffic analysis", "Linux hardening"],
      },
      {
        phase: 2, title: "Core Skills", duration: "3-4 months",
        items: [
          { name: "Security Fundamentals", description: "CIA triad, threat modeling, risk assessment" },
          { name: "Web Application Security", description: "OWASP Top 10, SQL injection, XSS" },
          { name: "Cryptography", description: "Encryption, hashing, PKI, certificates" },
        ],
        resources: ["OWASP", "PortSwigger Web Security Academy", "CompTIA Security+"],
        projects: ["Vulnerable app exploitation", "Security audit report", "Encrypted messaging tool"],
      },
      {
        phase: 3, title: "Tools & Technologies", duration: "2-3 months",
        items: [
          { name: "Penetration Testing", description: "Nmap, Burp Suite, Metasploit, Wireshark" },
          { name: "SIEM & Monitoring", description: "Splunk, ELK Stack, log analysis" },
          { name: "Scripting", description: "Python and Bash for automation" },
        ],
        resources: ["Hack The Box", "SANS courses", "CyberDefenders"],
        projects: ["CTF challenges", "Automated vulnerability scanner", "Incident response playbook"],
      },
      {
        phase: 4, title: "Specialization", duration: "2-3 months",
        items: [
          { name: "Choose a Path", description: "Pentesting, SOC analyst, cloud security, or forensics" },
          { name: "Certifications", description: "CEH, CompTIA Security+, OSCP" },
          { name: "Bug Bounties", description: "Practice on real targets legally" },
        ],
        resources: ["HackerOne", "Bugcrowd", "Offensive Security"],
        projects: ["Bug bounty hunting", "Security assessment report", "Malware analysis"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1-2 months",
        items: [
          { name: "Portfolio", description: "Document CTFs, projects, certifications" },
          { name: "Networking", description: "Join security communities, conferences" },
          { name: "Interview Prep", description: "Technical scenarios, incident response" },
        ],
        resources: ["LinkedIn", "InfoSec conferences", "Reddit r/netsec"],
        projects: ["Write security blog posts", "Present at local meetups", "Mock incident response"],
      },
    ],
    realityCheck: {
      difficulty: 4,
      learningTime: "10-16 months (entry) → 3-5 years (expert)",
      competition: "Medium",
      entryBarrier: "Medium",
      salaryExpectation: "Good pay, especially with certifications. OSCP holders are highly sought after.",
      honestNote: "It's not like the movies. Lots of compliance work, log analysis, and documentation. But the ethical hacking side is genuinely exciting and the job security is unmatched.",
    },
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    icon: "✨",
    tagline: "Design experiences people love to use",
    description: "UI/UX designers research user needs, create wireframes and prototypes, and design intuitive interfaces that solve real problems beautifully.",
    whySuits: [
      "You're highly creative and visual",
      "You empathize with users and their frustrations",
      "You love both aesthetics and problem-solving",
      "You enjoy research and understanding human behavior"
    ],
    requiredSkills: ["Figma/Sketch", "User Research", "Wireframing", "Prototyping", "Design Systems", "Typography", "Usability Testing"],
    learningDifficulty: "Moderate",
    estimatedTime: "6-10 months to job-ready",
    demandLevel: "High",
    salaryIndia: "₹4-12 LPA (entry) → ₹15-35 LPA (senior)",
    salaryGlobal: "$55K-80K (entry) → $110K-180K+ (senior)",
    growthPotential: "Strong — companies increasingly value design. Product design roles are expanding rapidly.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "1-2 months",
        items: [
          { name: "Design Principles", description: "Color theory, typography, layout, hierarchy" },
          { name: "UX Fundamentals", description: "User-centered design, information architecture" },
          { name: "Figma Basics", description: "Tools, components, auto-layout" },
        ],
        resources: ["Google UX Design Certificate", "Refactoring UI", "Figma tutorials"],
        projects: ["Redesign a bad website", "Mobile app wireframes", "Style guide creation"],
      },
      {
        phase: 2, title: "Core Skills", duration: "2-3 months",
        items: [
          { name: "User Research", description: "Interviews, surveys, personas, journey maps" },
          { name: "Wireframing & Prototyping", description: "Low-fi to high-fi, interactive prototypes" },
          { name: "Design Systems", description: "Component libraries, tokens, documentation" },
        ],
        resources: ["Nielsen Norman Group", "Interaction Design Foundation", "Laws of UX"],
        projects: ["User research case study", "Design system from scratch", "Prototype a fintech app"],
      },
      {
        phase: 3, title: "Advanced Design", duration: "2-3 months",
        items: [
          { name: "Motion Design", description: "Micro-interactions, transitions, animation principles" },
          { name: "Accessibility", description: "WCAG guidelines, inclusive design" },
          { name: "Frontend Basics", description: "HTML/CSS awareness for better handoff" },
        ],
        resources: ["Material Design", "Apple HIG", "A11y Project"],
        projects: ["Accessible design audit", "Animated prototype", "Design-to-code handoff"],
      },
      {
        phase: 4, title: "Portfolio", duration: "2-3 months",
        items: [
          { name: "Case Studies", description: "3-5 detailed case studies with process" },
          { name: "Portfolio Website", description: "Beautiful, showcasing your best work" },
          { name: "Real Projects", description: "Freelance, volunteer, or redesign challenges" },
        ],
        resources: ["Behance", "Dribbble", "UX Collective"],
        projects: ["End-to-end app design", "Website redesign case study", "Design sprint exercise"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1 month",
        items: [
          { name: "Design Challenges", description: "Whiteboard exercises, take-home assignments" },
          { name: "Portfolio Reviews", description: "Get feedback from senior designers" },
          { name: "Interview Prep", description: "Present case studies confidently" },
        ],
        resources: ["ADPList (mentorship)", "Glassdoor", "Design communities"],
        projects: ["Timed design challenges", "Presentation practice", "Networking"],
      },
    ],
    realityCheck: {
      difficulty: 3,
      learningTime: "6-10 months (basics) → 2-3 years (expert)",
      competition: "High",
      entryBarrier: "Low",
      salaryExpectation: "Lower starting salary than engineering but excellent growth. Product design roles pay well.",
      honestNote: "You'll hear 'make the logo bigger' more than you'd like. Stakeholder management is 50% of the job. But designing something people genuinely love to use is incredibly fulfilling.",
    },
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    icon: "🔄",
    tagline: "Bridge development and operations seamlessly",
    description: "DevOps engineers automate deployments, manage infrastructure, and ensure applications run reliably at scale. You're the glue between code and production.",
    whySuits: [
      "You love automation and efficiency",
      "You enjoy working with infrastructure and systems",
      "You're comfortable with the command line",
      "You want to understand the full software lifecycle"
    ],
    requiredSkills: ["Linux", "Docker/Kubernetes", "CI/CD", "Cloud (AWS/GCP/Azure)", "Terraform", "Monitoring", "Scripting"],
    learningDifficulty: "Hard",
    estimatedTime: "10-14 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹6-18 LPA (entry) → ₹25-55 LPA (senior)",
    salaryGlobal: "$70K-100K (entry) → $140K-220K+ (senior)",
    growthPotential: "Outstanding — cloud adoption is accelerating. DevOps/SRE roles are among the highest-paid in tech.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "2-3 months",
        items: [
          { name: "Linux Administration", description: "Commands, scripting, networking, services" },
          { name: "Networking", description: "TCP/IP, DNS, load balancers, firewalls" },
          { name: "Scripting", description: "Bash and Python for automation" },
        ],
        resources: ["Linux Academy", "RHCSA prep", "Bash scripting guides"],
        projects: ["Automated backup script", "Server monitoring tool", "Network configuration"],
      },
      {
        phase: 2, title: "Core Skills", duration: "2-3 months",
        items: [
          { name: "Docker", description: "Containers, images, Docker Compose, networking" },
          { name: "CI/CD", description: "GitHub Actions, Jenkins, GitLab CI" },
          { name: "Version Control", description: "Git workflows, branching, code review" },
        ],
        resources: ["Docker docs", "GitHub Actions docs", "DevOps Roadmap"],
        projects: ["Containerize an app", "CI/CD pipeline", "Automated testing setup"],
      },
      {
        phase: 3, title: "Cloud & Infrastructure", duration: "3-4 months",
        items: [
          { name: "Cloud Platforms", description: "AWS/GCP — EC2, S3, Lambda, IAM" },
          { name: "Infrastructure as Code", description: "Terraform, CloudFormation" },
          { name: "Kubernetes", description: "Pods, services, deployments, Helm" },
        ],
        resources: ["AWS Free Tier", "Terraform docs", "KodeKloud"],
        projects: ["Deploy app on AWS", "Terraform infrastructure", "Kubernetes cluster"],
      },
      {
        phase: 4, title: "Monitoring & Security", duration: "2 months",
        items: [
          { name: "Monitoring", description: "Prometheus, Grafana, ELK Stack" },
          { name: "Security", description: "Secret management, network policies, scanning" },
          { name: "Reliability", description: "SLIs/SLOs, incident management, chaos engineering" },
        ],
        resources: ["SRE Book (Google)", "Prometheus docs", "Grafana tutorials"],
        projects: ["Monitoring dashboard", "Alert system", "Disaster recovery plan"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1-2 months",
        items: [
          { name: "Certifications", description: "AWS SAA, CKA, Terraform Associate" },
          { name: "Portfolio", description: "Document infrastructure projects" },
          { name: "Interview Prep", description: "Scenario-based questions, troubleshooting" },
        ],
        resources: ["A Cloud Guru", "KodeKloud", "LinkedIn"],
        projects: ["Full production-grade deployment", "Blog about learnings", "Open source contributions"],
      },
    ],
    realityCheck: {
      difficulty: 4,
      learningTime: "10-14 months (entry) → 3-4 years (expert)",
      competition: "Medium",
      entryBarrier: "Medium",
      salaryExpectation: "Among the highest in tech. Cloud certifications significantly boost salary.",
      honestNote: "On-call rotations are real. You'll deal with production fires. The learning curve is steep but the career is incredibly stable and well-compensated.",
    },
  },
  {
    id: "qa-automation",
    title: "QA Automation Engineer",
    icon: "✅",
    tagline: "Ensure software quality through intelligent testing",
    description: "QA Automation engineers design test strategies, write automated tests, and ensure software works flawlessly before it reaches users.",
    whySuits: [
      "You have a keen eye for detail and edge cases",
      "You enjoy breaking things to make them better",
      "You're methodical and thorough",
      "You care deeply about quality and reliability"
    ],
    requiredSkills: ["Selenium/Cypress/Playwright", "Python/Java/JS", "Test Frameworks", "API Testing", "CI/CD", "Performance Testing", "SQL"],
    learningDifficulty: "Moderate",
    estimatedTime: "6-10 months to job-ready",
    demandLevel: "High",
    salaryIndia: "₹4-12 LPA (entry) → ₹15-35 LPA (senior)",
    salaryGlobal: "$50K-75K (entry) → $100K-160K+ (senior)",
    growthPotential: "Strong — shift-left testing and DevOps integration are increasing demand for automation engineers.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "1-2 months",
        items: [
          { name: "Testing Fundamentals", description: "Test types, strategies, STLC, bug lifecycle" },
          { name: "Programming", description: "Python or JavaScript for test scripting" },
          { name: "Manual Testing", description: "Test cases, scenarios, exploratory testing" },
        ],
        resources: ["ISTQB Foundation", "Test Automation University", "Ministry of Testing"],
        projects: ["Write test cases for a web app", "Bug report documentation", "Test plan creation"],
      },
      {
        phase: 2, title: "Core Skills", duration: "2-3 months",
        items: [
          { name: "Selenium/Playwright", description: "Browser automation, locators, waits, POM" },
          { name: "API Testing", description: "Postman, REST Assured, API automation" },
          { name: "Test Frameworks", description: "pytest, TestNG, Jest — structure and reporting" },
        ],
        resources: ["Selenium docs", "Playwright docs", "Postman Learning Center"],
        projects: ["E-commerce test suite", "API test automation", "Cross-browser testing"],
      },
      {
        phase: 3, title: "Advanced Testing", duration: "2-3 months",
        items: [
          { name: "CI/CD Integration", description: "Run tests in pipelines, GitHub Actions" },
          { name: "Performance Testing", description: "JMeter, k6, load testing" },
          { name: "Mobile Testing", description: "Appium basics, responsive testing" },
        ],
        resources: ["JMeter docs", "k6 docs", "Appium docs"],
        projects: ["Pipeline-integrated test suite", "Performance test report", "Mobile test framework"],
      },
      {
        phase: 4, title: "Projects", duration: "1-2 months",
        items: [
          { name: "Framework Design", description: "Build a reusable test automation framework" },
          { name: "Real-World Testing", description: "Test open-source or volunteer projects" },
          { name: "Documentation", description: "Test strategies, reports, metrics" },
        ],
        resources: ["GitHub", "Open source projects", "Testing blogs"],
        projects: ["Complete automation framework", "Test coverage analysis", "Quality metrics dashboard"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1 month",
        items: [
          { name: "Portfolio", description: "Showcase test frameworks and strategies" },
          { name: "Certifications", description: "ISTQB, cloud testing certs" },
          { name: "Interview Prep", description: "Testing scenarios, coding challenges" },
        ],
        resources: ["Glassdoor", "LinkedIn", "Testing communities"],
        projects: ["Polish GitHub repos", "Mock interviews", "Networking"],
      },
    ],
    realityCheck: {
      difficulty: 3,
      learningTime: "6-10 months (entry) → 2-3 years (expert)",
      competition: "Medium",
      entryBarrier: "Low",
      salaryExpectation: "Slightly lower than dev roles but growing. SDET roles pay significantly more.",
      honestNote: "QA is sometimes undervalued, but great QA engineers are worth their weight in gold. The role is evolving rapidly — automation skills are now non-negotiable.",
    },
  },
  {
    id: "mobile-developer",
    title: "Mobile App Developer",
    icon: "📱",
    tagline: "Build apps that live in everyone's pocket",
    description: "Mobile developers create iOS and Android applications. From social apps to fintech, mobile is where billions of users interact with technology daily.",
    whySuits: [
      "You want to build products people use every day",
      "You enjoy both design and development",
      "You like seeing tangible results on real devices",
      "You're interested in app store ecosystems"
    ],
    requiredSkills: ["React Native/Flutter/Swift/Kotlin", "UI Design", "State Management", "APIs", "App Store Deployment", "Testing", "Performance"],
    learningDifficulty: "Moderate",
    estimatedTime: "8-12 months to job-ready",
    demandLevel: "High",
    salaryIndia: "₹4-14 LPA (entry) → ₹18-45 LPA (senior)",
    salaryGlobal: "$55K-85K (entry) → $120K-200K+ (senior)",
    growthPotential: "Strong — mobile usage continues to grow. Cross-platform frameworks are making it easier to target both platforms.",
    roadmap: [
      {
        phase: 1, title: "Fundamentals", duration: "2-3 months",
        items: [
          { name: "Choose Your Path", description: "React Native (JS), Flutter (Dart), or Native (Swift/Kotlin)" },
          { name: "Programming Language", description: "Master JS/Dart/Swift/Kotlin" },
          { name: "UI Basics", description: "Layouts, navigation, components" },
        ],
        resources: ["React Native docs", "Flutter docs", "Apple/Android dev docs"],
        projects: ["Calculator app", "Weather app", "Notes app"],
      },
      {
        phase: 2, title: "Core Skills", duration: "2-3 months",
        items: [
          { name: "State Management", description: "Redux/Provider/Riverpod/SwiftUI state" },
          { name: "API Integration", description: "REST APIs, JSON parsing, authentication" },
          { name: "Navigation", description: "Complex navigation patterns, deep linking" },
        ],
        resources: ["Flutter cookbook", "React Navigation docs", "API tutorials"],
        projects: ["Social feed app", "E-commerce app", "Chat application"],
      },
      {
        phase: 3, title: "Advanced Features", duration: "2-3 months",
        items: [
          { name: "Local Storage", description: "SQLite, AsyncStorage, Hive" },
          { name: "Push Notifications", description: "FCM, APNs, notification handling" },
          { name: "Performance", description: "Profiling, optimization, lazy loading" },
        ],
        resources: ["Firebase docs", "Performance optimization guides", "Platform-specific docs"],
        projects: ["Offline-first app", "Real-time messaging", "Media-heavy app"],
      },
      {
        phase: 4, title: "Deployment", duration: "1-2 months",
        items: [
          { name: "App Store Submission", description: "iOS App Store and Google Play Store" },
          { name: "CI/CD for Mobile", description: "Fastlane, CodePush, automated builds" },
          { name: "Analytics", description: "Firebase Analytics, crash reporting" },
        ],
        resources: ["App Store guidelines", "Fastlane docs", "Firebase"],
        projects: ["Publish an app", "Set up CI/CD", "Analytics dashboard"],
      },
      {
        phase: 5, title: "Job Preparation", duration: "1 month",
        items: [
          { name: "Portfolio Apps", description: "2-3 polished apps on stores" },
          { name: "Open Source", description: "Contribute to mobile libraries" },
          { name: "Interview Prep", description: "Mobile-specific questions, system design" },
        ],
        resources: ["LeetCode", "Mobile dev communities", "YouTube"],
        projects: ["Polish portfolio", "Blog about mobile dev", "Mock interviews"],
      },
    ],
    realityCheck: {
      difficulty: 3,
      learningTime: "8-12 months (basics) → 2-3 years (expert)",
      competition: "High",
      entryBarrier: "Medium",
      salaryExpectation: "Good demand, especially for React Native and Flutter. Native iOS developers command premium salaries.",
      honestNote: "Platform fragmentation is annoying. Dealing with app store reviews can be frustrating. But building something millions of people carry in their pocket is magical.",
    },
  },
  {
    id: "fullstack-developer",
    title: "Full-Stack Developer",
    icon: "🌐",
    tagline: "Master both frontend and backend development",
    description: "Full-stack developers handle everything — from pixel-perfect UIs to robust server architectures. You're the complete package every startup dreams of.",
    whySuits: [
      "You want to build entire applications end-to-end",
      "You enjoy variety and switching between frontend and backend",
      "You thrive in startup environments",
      "You want maximum flexibility in your career"
    ],
    requiredSkills: ["React/Next.js", "Node.js/Python", "Databases", "REST/GraphQL APIs", "DevOps Basics", "TypeScript", "System Design"],
    learningDifficulty: "Hard",
    estimatedTime: "12-18 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹6-18 LPA (entry) → ₹20-50 LPA (senior)",
    salaryGlobal: "$65K-95K (entry) → $140K-230K+ (senior)",
    growthPotential: "Outstanding — startups and mid-size companies heavily prefer full-stack developers for their versatility.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "HTML/CSS/JS", description: "Web fundamentals and responsive design" }, { name: "Programming Logic", description: "Data structures, algorithms, OOP" }, { name: "Git & CLI", description: "Version control and command line proficiency" }], resources: ["The Odin Project", "freeCodeCamp", "CS50"], projects: ["Personal website", "CLI tool", "Interactive form"] },
      { phase: 2, title: "Frontend Mastery", duration: "2-3 months", items: [{ name: "React & TypeScript", description: "Components, hooks, state management" }, { name: "Styling", description: "Tailwind CSS, responsive design, animations" }, { name: "API Consumption", description: "Fetching data, caching, error handling" }], resources: ["React docs", "TypeScript Handbook", "Tailwind docs"], projects: ["Dashboard app", "E-commerce frontend", "Portfolio site"] },
      { phase: 3, title: "Backend Mastery", duration: "2-3 months", items: [{ name: "Node.js/Express", description: "Server-side logic, middleware, auth" }, { name: "Databases", description: "PostgreSQL, MongoDB, ORMs" }, { name: "Authentication", description: "JWT, OAuth, session management" }], resources: ["Node.js docs", "Prisma docs", "MongoDB University"], projects: ["REST API", "Auth system", "Blog backend"] },
      { phase: 4, title: "Full-Stack Projects", duration: "3-4 months", items: [{ name: "Next.js", description: "SSR, API routes, full-stack framework" }, { name: "Deployment", description: "Vercel, Docker, CI/CD" }, { name: "Real-Time Features", description: "WebSockets, real-time updates" }], resources: ["Next.js docs", "Vercel guides", "Socket.io"], projects: ["SaaS app", "Real-time chat", "Job board platform"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "System Design", description: "Architecture decisions, trade-offs" }, { name: "DSA", description: "LeetCode medium problems" }, { name: "Portfolio", description: "3-5 deployed full-stack projects" }], resources: ["LeetCode", "System Design Primer", "Pramp"], projects: ["Polish GitHub", "Technical blog", "Mock interviews"] },
    ],
    realityCheck: { difficulty: 4, learningTime: "12-18 months (basics) → 3-5 years (expert)", competition: "High", entryBarrier: "Medium", salaryExpectation: "Excellent pay, especially at startups. Senior full-stack engineers are among the most sought-after.", honestNote: "Jack of all trades can mean master of none if you're not careful. Depth matters. But the career flexibility is unmatched — you can build anything." },
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    icon: "☁️",
    tagline: "Design and manage scalable cloud infrastructure",
    description: "Cloud architects design the infrastructure that powers modern applications. You decide how companies build, deploy, and scale their technology in the cloud.",
    whySuits: [
      "You love designing large-scale systems",
      "You enjoy optimizing for performance and cost",
      "You're fascinated by distributed computing",
      "You want one of the highest-paying tech roles"
    ],
    requiredSkills: ["AWS/Azure/GCP", "Networking", "Security", "Terraform/IaC", "Kubernetes", "Cost Optimization", "Architecture Patterns"],
    learningDifficulty: "Very Hard",
    estimatedTime: "14-20 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹10-25 LPA (entry) → ₹30-70 LPA (senior)",
    salaryGlobal: "$90K-130K (entry) → $160K-280K+ (senior)",
    growthPotential: "Outstanding — cloud spending is growing 20%+ annually. Massive talent shortage.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "Networking", description: "TCP/IP, DNS, VPNs, load balancing" }, { name: "Linux", description: "System administration, scripting" }, { name: "Cloud Basics", description: "AWS/Azure core services overview" }], resources: ["AWS Cloud Practitioner", "Linux Academy", "Cloud Computing Concepts"], projects: ["Set up VPC", "Deploy EC2 instances", "S3 static hosting"] },
      { phase: 2, title: "Core Cloud Services", duration: "3-4 months", items: [{ name: "Compute & Storage", description: "EC2, Lambda, S3, EBS, RDS" }, { name: "Networking & Security", description: "VPCs, IAM, security groups, WAF" }, { name: "Databases", description: "RDS, DynamoDB, ElastiCache, Aurora" }], resources: ["AWS Solutions Architect prep", "A Cloud Guru", "Stephane Maarek courses"], projects: ["Multi-tier architecture", "Serverless API", "Database migration"] },
      { phase: 3, title: "Advanced Architecture", duration: "3-4 months", items: [{ name: "Infrastructure as Code", description: "Terraform, CloudFormation, Pulumi" }, { name: "Containers & Orchestration", description: "Docker, ECS, EKS, Kubernetes" }, { name: "CI/CD Pipelines", description: "CodePipeline, GitHub Actions, ArgoCD" }], resources: ["Terraform docs", "KodeKloud", "AWS Well-Architected"], projects: ["IaC full environment", "K8s cluster", "Blue-green deployment"] },
      { phase: 4, title: "Specialization", duration: "2-3 months", items: [{ name: "Cost Optimization", description: "Reserved instances, spot, rightsizing" }, { name: "Disaster Recovery", description: "Multi-region, backup strategies, RPO/RTO" }, { name: "Compliance", description: "HIPAA, SOC2, GDPR cloud compliance" }], resources: ["AWS Cost Explorer", "Well-Architected Framework", "Cloud Security Alliance"], projects: ["Cost optimization audit", "DR plan implementation", "Compliance framework"] },
      { phase: 5, title: "Certification & Job Prep", duration: "2-3 months", items: [{ name: "AWS Solutions Architect Pro", description: "Professional-level certification" }, { name: "Architecture Portfolio", description: "Document architectures you've designed" }, { name: "Interview Prep", description: "Whiteboard architecture, case studies" }], resources: ["AWS Certification", "Glassdoor", "LinkedIn"], projects: ["Architecture decision records", "Blog posts", "Mock design reviews"] },
    ],
    realityCheck: { difficulty: 5, learningTime: "14-20 months (entry) → 4-6 years (expert)", competition: "Low", entryBarrier: "High", salaryExpectation: "One of the highest-paid roles in tech. Certifications directly impact salary.", honestNote: "Requires years of hands-on experience. Most cloud architects start as DevOps or backend engineers first. The learning never stops as cloud services evolve constantly." },
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    icon: "🤖",
    tagline: "Build intelligent systems that learn and adapt",
    description: "AI/ML engineers build and deploy machine learning models that power intelligent features — from recommendation systems to computer vision and NLP.",
    whySuits: [
      "You're passionate about artificial intelligence",
      "You have strong math and programming skills",
      "You want to work on cutting-edge technology",
      "You enjoy research and experimentation"
    ],
    requiredSkills: ["Python", "TensorFlow/PyTorch", "Mathematics", "Deep Learning", "MLOps", "Data Engineering", "Cloud ML Services"],
    learningDifficulty: "Very Hard",
    estimatedTime: "14-20 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹8-22 LPA (entry) → ₹30-70 LPA (senior)",
    salaryGlobal: "$80K-120K (entry) → $160K-300K+ (senior)",
    growthPotential: "Explosive — AI is transforming every industry. Demand far exceeds supply.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "Python Mastery", description: "Advanced Python, OOP, data structures" }, { name: "Mathematics", description: "Linear algebra, calculus, probability, statistics" }, { name: "Data Handling", description: "Pandas, NumPy, data preprocessing" }], resources: ["3Blue1Brown", "Khan Academy", "Python for Data Science"], projects: ["Data analysis pipeline", "Statistical visualizations", "Math implementation library"] },
      { phase: 2, title: "Machine Learning", duration: "3-4 months", items: [{ name: "Classical ML", description: "Regression, classification, clustering, ensemble methods" }, { name: "Feature Engineering", description: "Feature selection, extraction, transformation" }, { name: "Model Evaluation", description: "Cross-validation, metrics, hyperparameter tuning" }], resources: ["Andrew Ng ML Course", "Scikit-learn docs", "Kaggle"], projects: ["Prediction models", "Kaggle competition", "ML pipeline"] },
      { phase: 3, title: "Deep Learning", duration: "3-4 months", items: [{ name: "Neural Networks", description: "CNNs, RNNs, Transformers, GANs" }, { name: "NLP", description: "Text classification, sentiment analysis, LLMs" }, { name: "Computer Vision", description: "Image classification, object detection, segmentation" }], resources: ["fast.ai", "Deep Learning Specialization", "Hugging Face"], projects: ["Image classifier", "Chatbot", "Object detection system"] },
      { phase: 4, title: "MLOps & Deployment", duration: "2-3 months", items: [{ name: "Model Deployment", description: "Flask/FastAPI, Docker, model serving" }, { name: "MLOps", description: "MLflow, experiment tracking, model monitoring" }, { name: "Cloud ML", description: "AWS SageMaker, GCP Vertex AI, Azure ML" }], resources: ["MLOps Zoomcamp", "AWS ML docs", "Made With ML"], projects: ["End-to-end ML pipeline", "Model monitoring dashboard", "A/B testing framework"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "Research Papers", description: "Read and implement key papers" }, { name: "Portfolio", description: "GitHub repos, blog posts, Kaggle profile" }, { name: "Interviews", description: "ML theory, coding, system design" }], resources: ["Papers With Code", "Kaggle", "Interview resources"], projects: ["Paper implementation", "End-to-end ML project", "Technical blog"] },
    ],
    realityCheck: { difficulty: 5, learningTime: "14-20 months (basics) → 4-6 years (expert)", competition: "High", entryBarrier: "High", salaryExpectation: "Among the highest in tech. Top AI researchers earn $500K+. Even entry-level is well above average.", honestNote: "The hype is real but so is the math. Many 'AI engineers' are actually data pipeline builders. True ML work requires deep mathematical understanding. But the field is genuinely transformative." },
  },
  {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    icon: "⛓️",
    tagline: "Build decentralized applications and smart contracts",
    description: "Blockchain developers create decentralized applications, smart contracts, and Web3 solutions that power the next generation of trustless, transparent systems.",
    whySuits: [
      "You're fascinated by decentralization and cryptography",
      "You want to work on emerging technology",
      "You enjoy both backend and financial systems",
      "You believe in building trustless systems"
    ],
    requiredSkills: ["Solidity/Rust", "Ethereum/Solana", "Smart Contracts", "Web3.js/Ethers.js", "DeFi Protocols", "Security Auditing", "Cryptography"],
    learningDifficulty: "Hard",
    estimatedTime: "10-16 months to job-ready",
    demandLevel: "Growing",
    salaryIndia: "₹6-18 LPA (entry) → ₹25-60 LPA (senior)",
    salaryGlobal: "$70K-110K (entry) → $150K-300K+ (senior)",
    growthPotential: "High but volatile — the space goes through cycles. Skilled blockchain devs are always in demand.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "Blockchain Concepts", description: "Consensus mechanisms, hashing, distributed ledgers" }, { name: "JavaScript/TypeScript", description: "Strong programming foundation" }, { name: "Cryptography Basics", description: "Public-key cryptography, hashing, digital signatures" }], resources: ["Bitcoin Whitepaper", "Mastering Ethereum", "CryptoZombies"], projects: ["Simple blockchain in JS", "Hash function implementation", "Wallet generator"] },
      { phase: 2, title: "Smart Contracts", duration: "3-4 months", items: [{ name: "Solidity", description: "Language fundamentals, patterns, best practices" }, { name: "Hardhat/Foundry", description: "Development environment, testing, deployment" }, { name: "ERC Standards", description: "ERC-20, ERC-721, ERC-1155 tokens" }], resources: ["Solidity docs", "Patrick Collins courses", "OpenZeppelin"], projects: ["ERC-20 token", "NFT collection", "Simple DEX"] },
      { phase: 3, title: "DApp Development", duration: "2-3 months", items: [{ name: "Web3.js/Ethers.js", description: "Blockchain interaction from frontend" }, { name: "Frontend Integration", description: "React + wallet connection, transaction UX" }, { name: "IPFS & Storage", description: "Decentralized storage solutions" }], resources: ["Ethers.js docs", "Alchemy University", "IPFS docs"], projects: ["Full DApp", "NFT marketplace", "DAO voting system"] },
      { phase: 4, title: "Advanced Topics", duration: "2-3 months", items: [{ name: "Security Auditing", description: "Common vulnerabilities, reentrancy, overflow" }, { name: "DeFi Protocols", description: "AMMs, lending, yield farming mechanics" }, { name: "L2 Solutions", description: "Rollups, sidechains, scaling solutions" }], resources: ["Damn Vulnerable DeFi", "Secureum", "L2Beat"], projects: ["Security audit report", "DeFi protocol clone", "Cross-chain bridge concept"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "Portfolio", description: "Deployed contracts, audited projects" }, { name: "Open Source", description: "Contribute to Web3 libraries" }, { name: "Networking", description: "Web3 communities, hackathons" }], resources: ["ETHGlobal", "Gitcoin", "Web3 job boards"], projects: ["Hackathon participation", "Security audit practice", "Technical blog"] },
    ],
    realityCheck: { difficulty: 4, learningTime: "10-16 months (entry) → 3-5 years (expert)", competition: "Medium", entryBarrier: "Medium", salaryExpectation: "Very high during bull markets. Even in bear markets, skilled devs are well-compensated. Smart contract auditors earn premium.", honestNote: "The space is volatile and full of hype. Many projects are scams. But the core technology is genuinely innovative, and the developer community is passionate and rewarding." },
  },
  {
    id: "game-developer",
    title: "Game Developer",
    icon: "🎮",
    tagline: "Create immersive gaming experiences",
    description: "Game developers design and build video games — from indie titles to AAA productions. You combine programming, art, and storytelling to create interactive entertainment.",
    whySuits: [
      "You're passionate about games and interactive media",
      "You enjoy combining creativity with technical skills",
      "You love physics simulations and real-time graphics",
      "You want to create experiences that entertain millions"
    ],
    requiredSkills: ["C++/C#", "Unity/Unreal Engine", "3D Math", "Game Physics", "Graphics Programming", "AI for Games", "Multiplayer Networking"],
    learningDifficulty: "Hard",
    estimatedTime: "12-18 months to job-ready",
    demandLevel: "Moderate",
    salaryIndia: "₹4-12 LPA (entry) → ₹15-40 LPA (senior)",
    salaryGlobal: "$50K-75K (entry) → $100K-180K+ (senior)",
    growthPotential: "Steady — gaming is a $200B+ industry. Indie game development is more accessible than ever.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "Programming", description: "C# or C++ depending on engine choice" }, { name: "Game Design Basics", description: "Mechanics, dynamics, aesthetics framework" }, { name: "Math for Games", description: "Vectors, matrices, trigonometry, physics" }], resources: ["Unity Learn", "Unreal Engine docs", "Game Programming Patterns"], projects: ["2D platformer", "Pong clone", "Simple puzzle game"] },
      { phase: 2, title: "Engine Mastery", duration: "3-4 months", items: [{ name: "Unity or Unreal", description: "Deep dive into your chosen engine" }, { name: "Game Physics", description: "Collision detection, rigidbody, raycasting" }, { name: "UI Systems", description: "Menus, HUD, inventory systems" }], resources: ["Official engine tutorials", "GDC talks", "Brackeys/GameDev.tv"], projects: ["3D game prototype", "Physics-based game", "Complete game UI"] },
      { phase: 3, title: "Advanced Features", duration: "3-4 months", items: [{ name: "AI for Games", description: "Pathfinding, state machines, behavior trees" }, { name: "Networking", description: "Multiplayer basics, client-server, netcode" }, { name: "Graphics", description: "Shaders, lighting, post-processing" }], resources: ["AI for Games (book)", "Mirror Networking", "Shader tutorials"], projects: ["AI enemy system", "Multiplayer prototype", "Custom shader effects"] },
      { phase: 4, title: "Complete Game", duration: "3-4 months", items: [{ name: "Game Production", description: "Scope, plan, and build a complete game" }, { name: "Polish", description: "Juice, feel, sound design, playtesting" }, { name: "Publishing", description: "Steam, itch.io, mobile stores" }], resources: ["itch.io", "Steam docs", "Game jams"], projects: ["Publish a complete game", "Game jam entries", "Portfolio reel"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "Portfolio", description: "Playable demos, source code, design docs" }, { name: "Specialization", description: "Choose: gameplay, engine, tools, graphics" }, { name: "Networking", description: "GDC, game dev communities, studios" }], resources: ["GDC Vault", "Game industry job boards", "LinkedIn"], projects: ["Portfolio website", "Technical deep-dive blog", "Mock interviews"] },
    ],
    realityCheck: { difficulty: 4, learningTime: "12-18 months (basics) → 4-6 years (expert)", competition: "Very High", entryBarrier: "Medium", salaryExpectation: "Lower than other tech roles, especially at studios. Indie success is rare but possible. AAA studios pay better.", honestNote: "The gaming industry has crunch culture issues. Competition is fierce because everyone wants to make games. But the creative fulfillment is unmatched, and indie development offers freedom." },
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    icon: "🔧",
    tagline: "Build the pipelines that power data-driven decisions",
    description: "Data engineers design and maintain the infrastructure for collecting, storing, and processing data at scale. You make data accessible and reliable for entire organizations.",
    whySuits: [
      "You enjoy building robust, scalable systems",
      "You like working with large-scale data processing",
      "You prefer engineering over analysis",
      "You want strong job security with high pay"
    ],
    requiredSkills: ["Python/Scala", "SQL", "Apache Spark", "Airflow", "Cloud Data Services", "ETL/ELT", "Data Warehousing"],
    learningDifficulty: "Hard",
    estimatedTime: "10-16 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹6-18 LPA (entry) → ₹25-55 LPA (senior)",
    salaryGlobal: "$70K-100K (entry) → $140K-230K+ (senior)",
    growthPotential: "Outstanding — every company needs data infrastructure. Growing faster than data science roles.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "Python", description: "Advanced Python for data processing" }, { name: "SQL Mastery", description: "Complex queries, optimization, window functions" }, { name: "Data Modeling", description: "Star schema, snowflake, normalization" }], resources: ["Mode Analytics", "DataCamp", "Database Design books"], projects: ["Database design", "Complex SQL analytics", "Data cleaning scripts"] },
      { phase: 2, title: "Core Tools", duration: "3-4 months", items: [{ name: "Apache Spark", description: "Distributed data processing at scale" }, { name: "Airflow", description: "Workflow orchestration and scheduling" }, { name: "Kafka", description: "Real-time data streaming" }], resources: ["Spark docs", "Airflow docs", "Confluent tutorials"], projects: ["Spark ETL pipeline", "Airflow DAGs", "Streaming pipeline"] },
      { phase: 3, title: "Cloud & Warehousing", duration: "2-3 months", items: [{ name: "Cloud Data Services", description: "AWS Redshift, BigQuery, Snowflake" }, { name: "dbt", description: "Data transformation and modeling" }, { name: "Data Lakes", description: "S3, Delta Lake, data lakehouse" }], resources: ["Snowflake docs", "dbt docs", "AWS data analytics"], projects: ["Data warehouse setup", "dbt project", "Data lake architecture"] },
      { phase: 4, title: "Advanced Topics", duration: "2-3 months", items: [{ name: "Data Quality", description: "Testing, monitoring, observability" }, { name: "CI/CD for Data", description: "Version control, testing pipelines" }, { name: "Real-Time Processing", description: "Stream processing, CDC, event sourcing" }], resources: ["Great Expectations", "DataOps guides", "Streaming resources"], projects: ["Data quality framework", "Automated pipeline", "Real-time dashboard"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "System Design", description: "Data architecture design interviews" }, { name: "Portfolio", description: "End-to-end data projects on GitHub" }, { name: "Certifications", description: "AWS Data Analytics, Snowflake, Databricks" }], resources: ["Designing Data-Intensive Applications", "Glassdoor", "LinkedIn"], projects: ["Complete data platform", "Technical blog", "Mock interviews"] },
    ],
    realityCheck: { difficulty: 4, learningTime: "10-16 months (entry) → 3-5 years (expert)", competition: "Medium", entryBarrier: "Medium", salaryExpectation: "Excellent — often higher than data scientists. Senior data engineers are extremely well-compensated.", honestNote: "Less glamorous than data science but more in demand. You'll spend time debugging pipelines at 3 AM. But the pay is great and job security is strong." },
  },
  {
    id: "technical-writer",
    title: "Technical Writer",
    icon: "📝",
    tagline: "Make complex technology understandable",
    description: "Technical writers create documentation, tutorials, API references, and guides that help developers and users understand complex software products.",
    whySuits: [
      "You love writing and explaining things clearly",
      "You enjoy learning about new technologies",
      "You want a less stressful tech career with good pay",
      "You're detail-oriented and organized"
    ],
    requiredSkills: ["Technical Writing", "Markdown/Docs Tools", "API Documentation", "Basic Programming", "Information Architecture", "Git", "Content Strategy"],
    learningDifficulty: "Easy",
    estimatedTime: "4-8 months to job-ready",
    demandLevel: "High",
    salaryIndia: "₹4-10 LPA (entry) → ₹12-30 LPA (senior)",
    salaryGlobal: "$50K-70K (entry) → $90K-150K+ (senior)",
    growthPotential: "Strong — developer experience (DX) is a major priority. Companies invest heavily in documentation.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "1-2 months", items: [{ name: "Writing Basics", description: "Clear, concise technical writing principles" }, { name: "Markdown & Tools", description: "Markdown, Git, docs-as-code approach" }, { name: "Tech Basics", description: "Programming concepts, APIs, web basics" }], resources: ["Google Technical Writing Courses", "Write the Docs", "Markdown Guide"], projects: ["Rewrite bad documentation", "API quickstart guide", "Tutorial article"] },
      { phase: 2, title: "Core Skills", duration: "2-3 months", items: [{ name: "API Documentation", description: "OpenAPI/Swagger, reference docs, guides" }, { name: "Information Architecture", description: "Content structure, navigation, taxonomy" }, { name: "Docs Platforms", description: "Docusaurus, GitBook, ReadTheDocs" }], resources: ["Swagger docs", "Docusaurus docs", "I'd Rather Be Writing blog"], projects: ["API reference documentation", "Documentation site", "Developer guide"] },
      { phase: 3, title: "Advanced Skills", duration: "1-2 months", items: [{ name: "Content Strategy", description: "Audit, plan, and maintain large doc sets" }, { name: "Visual Communication", description: "Diagrams, screenshots, video tutorials" }, { name: "Developer Experience", description: "Onboarding flows, interactive docs" }], resources: ["Content Strategy for the Web", "Mermaid.js", "Loom"], projects: ["Content audit", "Video tutorial series", "Interactive code examples"] },
      { phase: 4, title: "Portfolio Building", duration: "1-2 months", items: [{ name: "Open Source Docs", description: "Contribute to OSS documentation" }, { name: "Sample Portfolio", description: "Diverse writing samples" }, { name: "Blog Writing", description: "Technical blog posts on dev topics" }], resources: ["GitHub", "Dev.to", "Medium"], projects: ["OSS documentation PR", "Portfolio website", "Technical blog series"] },
      { phase: 5, title: "Job Preparation", duration: "1 month", items: [{ name: "Writing Tests", description: "Practice timed writing assignments" }, { name: "Editing Skills", description: "Self-editing, peer review process" }, { name: "Interview Prep", description: "Portfolio presentation, writing samples" }], resources: ["Write the Docs job board", "LinkedIn", "Glassdoor"], projects: ["Polish portfolio", "Mock writing tests", "Networking"] },
    ],
    realityCheck: { difficulty: 2, learningTime: "4-8 months (entry) → 2-3 years (expert)", competition: "Low", entryBarrier: "Low", salaryExpectation: "Good pay with excellent work-life balance. Senior tech writers at top companies earn very well.", honestNote: "Often overlooked as a career but incredibly rewarding. You'll learn about every technology area. Low stress compared to engineering. The biggest challenge is getting engineers to review your work." },
  },
  {
    id: "site-reliability-engineer",
    title: "Site Reliability Engineer",
    icon: "🛡️",
    tagline: "Keep systems running at planet scale",
    description: "SREs ensure that large-scale systems are reliable, scalable, and performant. You blend software engineering with operations to build self-healing infrastructure.",
    whySuits: [
      "You love solving complex system problems",
      "You're interested in distributed systems",
      "You want one of the highest-paying engineering roles",
      "You enjoy automation and eliminating toil"
    ],
    requiredSkills: ["Linux", "Programming (Go/Python)", "Kubernetes", "Observability", "Incident Management", "Distributed Systems", "SLOs/SLIs"],
    learningDifficulty: "Very Hard",
    estimatedTime: "14-20 months to job-ready",
    demandLevel: "Very High",
    salaryIndia: "₹8-22 LPA (entry) → ₹30-65 LPA (senior)",
    salaryGlobal: "$85K-120K (entry) → $160K-280K+ (senior)",
    growthPotential: "Outstanding — as systems grow more complex, SRE demand skyrockets. Google invented the role.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "Linux & Networking", description: "Deep Linux knowledge, TCP/IP, DNS, HTTP" }, { name: "Programming", description: "Go or Python for tooling and automation" }, { name: "Version Control", description: "Git, branching strategies, code review" }], resources: ["SRE Book (Google)", "Linux Academy", "Go Tour"], projects: ["System monitoring script", "Network diagnostic tool", "Automation scripts"] },
      { phase: 2, title: "Core SRE Skills", duration: "3-4 months", items: [{ name: "Containers & K8s", description: "Docker, Kubernetes, Helm, operators" }, { name: "CI/CD", description: "Pipeline design, deployment strategies" }, { name: "Infrastructure as Code", description: "Terraform, Ansible, configuration management" }], resources: ["KodeKloud", "Terraform docs", "K8s docs"], projects: ["K8s cluster setup", "CI/CD pipeline", "IaC project"] },
      { phase: 3, title: "Observability & Reliability", duration: "3-4 months", items: [{ name: "Monitoring", description: "Prometheus, Grafana, alerting strategies" }, { name: "Logging & Tracing", description: "ELK Stack, Jaeger, distributed tracing" }, { name: "SLOs & Error Budgets", description: "Defining and tracking reliability targets" }], resources: ["Prometheus docs", "OpenTelemetry", "SRE Workbook"], projects: ["Observability stack", "SLO dashboard", "Alert runbooks"] },
      { phase: 4, title: "Advanced Topics", duration: "2-3 months", items: [{ name: "Incident Management", description: "On-call, postmortems, incident response" }, { name: "Chaos Engineering", description: "Failure injection, resilience testing" }, { name: "Capacity Planning", description: "Load testing, scaling strategies" }], resources: ["Chaos Engineering (book)", "Gremlin", "PagerDuty"], projects: ["Chaos experiments", "Capacity planning model", "Incident response playbook"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "System Design", description: "Design reliable distributed systems" }, { name: "Coding Interviews", description: "LeetCode + systems coding" }, { name: "On-Call Simulation", description: "Practice incident response scenarios" }], resources: ["System Design Primer", "LeetCode", "Mock interviews"], projects: ["Design portfolio", "Technical blog", "Community involvement"] },
    ],
    realityCheck: { difficulty: 5, learningTime: "14-20 months (entry) → 4-6 years (expert)", competition: "Low", entryBarrier: "High", salaryExpectation: "Among the highest in tech. Google SREs are some of the best-compensated engineers. On-call compensation adds more.", honestNote: "On-call is a reality — you will get paged at 3 AM. The pressure during incidents is intense. But the engineering challenges are fascinating and the compensation reflects the responsibility." },
  },
  {
    id: "product-manager-tech",
    title: "Technical Product Manager",
    icon: "📋",
    tagline: "Lead products from idea to launch",
    description: "Technical Product Managers bridge the gap between engineering, design, and business. You define what gets built, prioritize features, and drive product strategy.",
    whySuits: [
      "You love both technology and business strategy",
      "You enjoy leading teams and making decisions",
      "You're a strong communicator and collaborator",
      "You want to shape products used by millions"
    ],
    requiredSkills: ["Product Strategy", "Agile/Scrum", "Data Analysis", "Technical Understanding", "User Research", "Communication", "Roadmap Planning"],
    learningDifficulty: "Moderate",
    estimatedTime: "8-14 months to job-ready",
    demandLevel: "High",
    salaryIndia: "₹8-20 LPA (entry) → ₹25-60 LPA (senior)",
    salaryGlobal: "$70K-100K (entry) → $140K-250K+ (senior)",
    growthPotential: "Excellent — every tech company needs PMs. Senior PMs often transition to VP/C-suite roles.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "Product Thinking", description: "Problem framing, user needs, product vision" }, { name: "Agile & Scrum", description: "Sprints, standups, retrospectives, user stories" }, { name: "Tech Basics", description: "APIs, databases, system architecture overview" }], resources: ["Inspired (book)", "Scrum Guide", "Product School"], projects: ["Product teardown analysis", "PRD for a feature", "User story mapping"] },
      { phase: 2, title: "Core Skills", duration: "2-3 months", items: [{ name: "User Research", description: "Interviews, surveys, usability testing" }, { name: "Data Analysis", description: "SQL basics, metrics, A/B testing, analytics" }, { name: "Roadmap Planning", description: "Prioritization frameworks, OKRs, strategy" }], resources: ["Lean Analytics", "Google Analytics Academy", "RICE framework"], projects: ["User research report", "Metrics dashboard", "Product roadmap"] },
      { phase: 3, title: "Execution", duration: "2-3 months", items: [{ name: "Stakeholder Management", description: "Cross-functional collaboration, buy-in" }, { name: "Technical Communication", description: "Working with engineers, technical trade-offs" }, { name: "Launch Management", description: "Go-to-market, feature flags, rollout strategies" }], resources: ["Crucial Conversations", "Product-Led Growth", "Launch Darkly"], projects: ["Mock product launch", "Technical spec review", "Stakeholder presentation"] },
      { phase: 4, title: "Advanced Topics", duration: "2-3 months", items: [{ name: "Growth & Monetization", description: "Funnels, retention, pricing strategies" }, { name: "Platform Thinking", description: "APIs, ecosystems, developer platforms" }, { name: "AI Product Management", description: "ML-powered features, AI product strategy" }], resources: ["Reforge", "Lenny's Newsletter", "AI PM resources"], projects: ["Growth experiment design", "Platform strategy doc", "AI feature proposal"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "Case Studies", description: "Product design and strategy cases" }, { name: "Portfolio", description: "Document shipped products and impact" }, { name: "Interview Prep", description: "PM frameworks, estimation, behavioral" }], resources: ["Cracking the PM Interview", "Glassdoor", "Exponent"], projects: ["Case study practice", "PM portfolio", "Mock interviews"] },
    ],
    realityCheck: { difficulty: 3, learningTime: "8-14 months (entry) → 3-5 years (expert)", competition: "High", entryBarrier: "Medium", salaryExpectation: "Excellent pay, especially at FAANG. Senior PMs earn as much as senior engineers. VP of Product is a common path to C-suite.", honestNote: "You'll be responsible for decisions but often lack direct authority. Managing stakeholder expectations is exhausting. But shaping products that millions of people use is deeply rewarding." },
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems Engineer",
    icon: "🔌",
    tagline: "Program the hardware that runs the world",
    description: "Embedded systems engineers write software for hardware devices — from IoT sensors to automotive systems, medical devices, and robotics.",
    whySuits: [
      "You're fascinated by hardware-software interaction",
      "You enjoy low-level programming and optimization",
      "You want to work on tangible, physical products",
      "You love understanding how things work at the metal level"
    ],
    requiredSkills: ["C/C++", "Microcontrollers", "RTOS", "Electronics Basics", "Communication Protocols", "Debugging Tools", "Linux Embedded"],
    learningDifficulty: "Very Hard",
    estimatedTime: "12-18 months to job-ready",
    demandLevel: "High",
    salaryIndia: "₹5-14 LPA (entry) → ₹18-45 LPA (senior)",
    salaryGlobal: "$60K-90K (entry) → $120K-200K+ (senior)",
    growthPotential: "Strong — IoT is booming, automotive software is growing 30% YoY, and robotics is expanding rapidly.",
    roadmap: [
      { phase: 1, title: "Fundamentals", duration: "2-3 months", items: [{ name: "C Programming", description: "Pointers, memory management, bit manipulation" }, { name: "Electronics Basics", description: "Digital circuits, sensors, actuators" }, { name: "Computer Architecture", description: "CPU architecture, memory hierarchy, interrupts" }], resources: ["C Programming (K&R)", "Arduino tutorials", "Nand2Tetris"], projects: ["LED blink system", "Sensor reader", "Basic calculator on MCU"] },
      { phase: 2, title: "Microcontrollers", duration: "3-4 months", items: [{ name: "ARM/AVR Programming", description: "Register-level programming, peripherals" }, { name: "Communication Protocols", description: "I2C, SPI, UART, CAN" }, { name: "Timers & Interrupts", description: "Hardware timers, interrupt handling, PWM" }], resources: ["STM32 docs", "Embedded.fm", "Digikey tutorials"], projects: ["Motor controller", "Sensor network", "Serial communication system"] },
      { phase: 3, title: "RTOS & Systems", duration: "2-3 months", items: [{ name: "RTOS", description: "FreeRTOS, tasks, semaphores, queues" }, { name: "Embedded Linux", description: "Yocto, Buildroot, device drivers" }, { name: "Debugging", description: "JTAG, oscilloscope, logic analyzer" }], resources: ["FreeRTOS docs", "Yocto Project", "Embedded Linux Primer"], projects: ["RTOS-based project", "Linux device driver", "Debugging challenge"] },
      { phase: 4, title: "Advanced Projects", duration: "2-3 months", items: [{ name: "IoT Systems", description: "WiFi/BLE, MQTT, cloud connectivity" }, { name: "Power Management", description: "Low-power design, battery optimization" }, { name: "Safety & Reliability", description: "Watchdogs, error handling, MISRA C" }], resources: ["ESP32 docs", "MQTT guide", "MISRA guidelines"], projects: ["IoT weather station", "Battery-powered sensor", "Safety-critical system"] },
      { phase: 5, title: "Job Preparation", duration: "1-2 months", items: [{ name: "Portfolio", description: "Hardware projects with documentation" }, { name: "Certifications", description: "Embedded systems certifications" }, { name: "Interview Prep", description: "C puzzles, system design, debugging scenarios" }], resources: ["Embedded job boards", "LinkedIn", "Glassdoor"], projects: ["Portfolio website with demos", "Technical blog", "Mock interviews"] },
    ],
    realityCheck: { difficulty: 5, learningTime: "12-18 months (entry) → 4-6 years (expert)", competition: "Low", entryBarrier: "High", salaryExpectation: "Good pay with lower competition. Automotive and medical embedded pay premium. Hardware experience required for many roles.", honestNote: "You need actual hardware to practice — it's not free like web dev. Debugging hardware issues is painful. But embedded systems power everything from cars to pacemakers, and the impact is massive." },
  },
  ...additionalCareers,
];

// Scoring algorithm - works with dynamic question bank (string IDs)
export interface QuizAnswers {
  [questionId: string]: string;
}

export function calculateCareerScores(answers: QuizAnswers): { career: Career; score: number; matchPercentage: number }[] {
  const scoreMap: Record<string, number> = {};
  careers.forEach(c => { scoreMap[c.id] = 0; });

  // Dynamic scoring: iterate through all answers and apply rules based on answer values
  Object.values(answers).forEach(answerValue => {
    // === CORE INTEREST SIGNALS ===
    if (answerValue === "backend") { scoreMap["backend-developer"] += 5; scoreMap["cloud-architect"] += 3; scoreMap["data-engineer"] += 2; scoreMap["platform-engineer"] += 3; scoreMap["api-developer"] += 4; scoreMap["site-reliability-engineer"] += 2; }
    if (answerValue === "frontend") { scoreMap["frontend-developer"] += 5; scoreMap["uiux-designer"] += 3; scoreMap["mobile-developer"] += 2; scoreMap["ios-developer"] += 2; scoreMap["android-developer"] += 2; scoreMap["flutter-developer"] += 2; }
    if (answerValue === "data" || answerValue === "analytics") { scoreMap["data-scientist"] += 5; scoreMap["data-engineer"] += 4; scoreMap["ai-ml-engineer"] += 3; scoreMap["data-analyst"] += 4; scoreMap["business-intelligence-analyst"] += 3; scoreMap["mlops-engineer"] += 3; }
    if (answerValue === "security") { scoreMap["cybersecurity-specialist"] += 5; scoreMap["penetration-tester"] += 5; scoreMap["digital-forensics-analyst"] += 4; }

    // === MOTIVATION & PRIORITIES ===
    if (answerValue === "money") { scoreMap["data-scientist"] += 2; scoreMap["devops-engineer"] += 3; scoreMap["cloud-architect"] += 3; scoreMap["ai-ml-engineer"] += 3; scoreMap["solutions-architect"] += 3; scoreMap["site-reliability-engineer"] += 3; }
    if (answerValue === "impact") { scoreMap["frontend-developer"] += 2; scoreMap["uiux-designer"] += 3; scoreMap["product-manager-tech"] += 3; scoreMap["mobile-developer"] += 2; }
    if (answerValue === "balance") { scoreMap["frontend-developer"] += 3; scoreMap["qa-automation"] += 3; scoreMap["technical-writer"] += 3; scoreMap["uiux-designer"] += 2; }
    if (answerValue === "growth") { scoreMap["data-scientist"] += 3; scoreMap["cybersecurity-specialist"] += 3; scoreMap["blockchain-developer"] += 3; scoreMap["ai-ml-engineer"] += 2; }

    // === WORK ENVIRONMENT ===
    if (answerValue === "remote") { scoreMap["frontend-developer"] += 2; scoreMap["backend-developer"] += 2; scoreMap["technical-writer"] += 3; scoreMap["fullstack-developer"] += 2; }
    if (answerValue === "freelance") { scoreMap["frontend-developer"] += 3; scoreMap["uiux-designer"] += 3; scoreMap["mobile-developer"] += 3; scoreMap["fullstack-developer"] += 3; }
    if (answerValue === "office") { scoreMap["embedded-systems"] += 3; scoreMap["product-manager-tech"] += 2; scoreMap["cybersecurity-specialist"] += 2; }
    if (answerValue === "hybrid") { Object.keys(scoreMap).forEach(k => scoreMap[k] += 1); }

    // === PERSONALITY TRAITS ===
    if (answerValue === "solo" || answerValue === "introvert") { scoreMap["backend-developer"] += 2; scoreMap["data-engineer"] += 2; scoreMap["embedded-systems"] += 2; }
    if (answerValue === "collaborative" || answerValue === "social") { scoreMap["product-manager-tech"] += 3; scoreMap["uiux-designer"] += 2; scoreMap["scrum-master"] += 3; }
    if (answerValue === "systematic" || answerValue === "analytical") { scoreMap["backend-developer"] += 3; scoreMap["data-scientist"] += 3; scoreMap["cybersecurity-specialist"] += 2; scoreMap["qa-automation"] += 2; }
    if (answerValue === "visual" || answerValue === "creative") { scoreMap["frontend-developer"] += 3; scoreMap["uiux-designer"] += 4; scoreMap["game-developer"] += 3; }
    if (answerValue === "experimental" || answerValue === "adaptive") { scoreMap["fullstack-developer"] += 2; scoreMap["game-developer"] += 2; scoreMap["blockchain-developer"] += 2; }

    // === PATIENCE & LEARNING ===
    if (answerValue === "high" && answerValue !== "money") { scoreMap["data-scientist"] += 1; scoreMap["ai-ml-engineer"] += 1; scoreMap["embedded-systems"] += 1; }
    if (answerValue === "medium") { scoreMap["frontend-developer"] += 1; scoreMap["backend-developer"] += 1; scoreMap["mobile-developer"] += 1; }
    if (answerValue === "low") { scoreMap["frontend-developer"] += 2; scoreMap["uiux-designer"] += 1; scoreMap["technical-writer"] += 1; }

    // === PROJECT TYPES ===
    if (answerValue === "apps" || answerValue === "mobile") { scoreMap["mobile-developer"] += 5; scoreMap["frontend-developer"] += 3; scoreMap["ios-developer"] += 4; scoreMap["android-developer"] += 4; scoreMap["flutter-developer"] += 4; scoreMap["fullstack-developer"] += 3; }
    if (answerValue === "automation") { scoreMap["devops-engineer"] += 4; scoreMap["qa-automation"] += 3; scoreMap["site-reliability-engineer"] += 4; scoreMap["platform-engineer"] += 3; }
    if (answerValue === "quality" || answerValue === "thorough") { scoreMap["qa-automation"] += 5; scoreMap["cybersecurity-specialist"] += 2; }

    // === TECH PREFERENCES ===
    if (answerValue === "ui" || answerValue === "frameworks") { scoreMap["frontend-developer"] += 4; scoreMap["mobile-developer"] += 3; scoreMap["fullstack-developer"] += 2; }
    if (answerValue === "database" || answerValue === "data_tools") { scoreMap["backend-developer"] += 3; scoreMap["data-engineer"] += 4; scoreMap["database-administrator"] += 5; }
    if (answerValue === "ml" || answerValue === "ai_tools") { scoreMap["ai-ml-engineer"] += 5; scoreMap["data-scientist"] += 3; scoreMap["mlops-engineer"] += 4; }
    if (answerValue === "performance" || answerValue === "cloud") { scoreMap["cloud-architect"] += 4; scoreMap["devops-engineer"] += 3; scoreMap["site-reliability-engineer"] += 3; }

    // === MATH COMFORT ===
    if (answerValue === "willing") { scoreMap["data-scientist"] += 2; scoreMap["game-developer"] += 2; scoreMap["blockchain-developer"] += 2; }

    // === COMMUNICATION ===
    if (answerValue === "written") { scoreMap["technical-writer"] += 4; scoreMap["data-scientist"] += 2; scoreMap["backend-developer"] += 2; }
    if (answerValue === "growing") { scoreMap["frontend-developer"] += 2; scoreMap["fullstack-developer"] += 2; }

    // === CAREER HELPER SIGNALS ===
    if (answerValue === "web") { scoreMap["frontend-developer"] += 3; scoreMap["fullstack-developer"] += 3; scoreMap["backend-developer"] += 2; }
    if (answerValue === "fintech") { scoreMap["backend-developer"] += 3; scoreMap["blockchain-developer"] += 4; scoreMap["cybersecurity-specialist"] += 2; }
    if (answerValue === "healthcare") { scoreMap["data-scientist"] += 3; scoreMap["embedded-systems"] += 3; scoreMap["ai-ml-engineer"] += 2; }
    if (answerValue === "entertainment") { scoreMap["game-developer"] += 5; scoreMap["frontend-developer"] += 2; scoreMap["mobile-developer"] += 2; scoreMap["ar-vr-developer"] += 4; }
    if (answerValue === "ecommerce") { scoreMap["fullstack-developer"] += 3; scoreMap["frontend-developer"] += 3; scoreMap["backend-developer"] += 2; }
    if (answerValue === "startup") { scoreMap["fullstack-developer"] += 4; scoreMap["mobile-developer"] += 2; scoreMap["frontend-developer"] += 2; }
    if (answerValue === "enterprise") { scoreMap["cloud-architect"] += 3; scoreMap["solutions-architect"] += 4; scoreMap["devops-engineer"] += 2; }
    if (answerValue === "specialist") { scoreMap["ai-ml-engineer"] += 2; scoreMap["cybersecurity-specialist"] += 2; scoreMap["embedded-systems"] += 2; }
    if (answerValue === "generalist" || answerValue === "fullstack") { scoreMap["fullstack-developer"] += 4; scoreMap["product-manager-tech"] += 2; }
    if (answerValue === "beginner") { scoreMap["frontend-developer"] += 3; scoreMap["qa-automation"] += 2; scoreMap["technical-writer"] += 2; }
    if (answerValue === "experienced") { scoreMap["cloud-architect"] += 2; scoreMap["solutions-architect"] += 3; scoreMap["site-reliability-engineer"] += 2; }
    if (answerValue === "self_taught") { scoreMap["frontend-developer"] += 3; scoreMap["fullstack-developer"] += 2; scoreMap["mobile-developer"] += 2; }
    if (answerValue === "modern") { scoreMap["frontend-developer"] += 2; scoreMap["fullstack-developer"] += 2; scoreMap["mobile-developer"] += 2; scoreMap["devops-engineer"] += 2; }
    if (answerValue === "thrives") { scoreMap["devops-engineer"] += 2; scoreMap["site-reliability-engineer"] += 3; scoreMap["cybersecurity-specialist"] += 2; }
    if (answerValue === "aspiring_leader") { scoreMap["product-manager-tech"] += 4; scoreMap["solutions-architect"] += 3; }
    if (answerValue === "tech_lead") { scoreMap["backend-developer"] += 2; scoreMap["fullstack-developer"] += 2; scoreMap["cloud-architect"] += 2; }
    if (answerValue === "ic") { scoreMap["embedded-systems"] += 2; scoreMap["data-scientist"] += 2; scoreMap["ai-ml-engineer"] += 2; }
    if (answerValue === "backend_arch") { scoreMap["backend-developer"] += 3; scoreMap["solutions-architect"] += 3; scoreMap["cloud-architect"] += 3; }
    if (answerValue === "frontend_arch") { scoreMap["frontend-developer"] += 3; scoreMap["uiux-designer"] += 2; }
    if (answerValue === "data_arch") { scoreMap["data-engineer"] += 4; scoreMap["data-scientist"] += 2; }
    if (answerValue === "infra_arch") { scoreMap["devops-engineer"] += 3; scoreMap["cybersecurity-specialist"] += 3; scoreMap["cloud-architect"] += 3; }
    if (answerValue === "design") { scoreMap["uiux-designer"] += 3; scoreMap["frontend-developer"] += 2; }
    if (answerValue === "consumer") { scoreMap["frontend-developer"] += 2; scoreMap["mobile-developer"] += 2; }
    if (answerValue === "practical") { scoreMap["fullstack-developer"] += 2; scoreMap["devops-engineer"] += 2; }
    if (answerValue === "loves") { scoreMap["backend-developer"] += 2; scoreMap["ai-ml-engineer"] += 2; }
    if (answerValue === "cs_degree") { scoreMap["ai-ml-engineer"] += 2; scoreMap["data-scientist"] += 2; scoreMap["embedded-systems"] += 2; }
    if (answerValue === "non_tech") { scoreMap["uiux-designer"] += 3; scoreMap["product-manager-tech"] += 3; scoreMap["technical-writer"] += 3; }
  });

  const maxPossible = 50; // approximate max score
  const results = careers.map(career => ({
    career,
    score: scoreMap[career.id] || 0,
    matchPercentage: Math.min(Math.round(((scoreMap[career.id] || 0) / maxPossible) * 100), 98),
  }));

  return results.sort((a, b) => b.score - a.score);
}