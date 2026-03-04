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
];

// Scoring algorithm
export interface QuizAnswers {
  [questionId: number]: string;
}

export function calculateCareerScores(answers: QuizAnswers): { career: Career; score: number; matchPercentage: number }[] {
  const scoreMap: Record<string, number> = {};

  careers.forEach(c => { scoreMap[c.id] = 0; });

  // Interest
  const interest = answers[1];
  if (interest === "backend") { scoreMap["backend-developer"] += 5; scoreMap["devops-engineer"] += 3; }
  if (interest === "frontend") { scoreMap["frontend-developer"] += 5; scoreMap["uiux-designer"] += 4; scoreMap["mobile-developer"] += 3; }
  if (interest === "data") { scoreMap["data-scientist"] += 5; scoreMap["backend-developer"] += 2; }
  if (interest === "security") { scoreMap["cybersecurity-specialist"] += 5; scoreMap["devops-engineer"] += 2; }

  // Math
  const math = answers[2];
  if (math === "high") { scoreMap["data-scientist"] += 4; scoreMap["backend-developer"] += 2; scoreMap["cybersecurity-specialist"] += 2; }
  if (math === "medium") { scoreMap["backend-developer"] += 2; scoreMap["frontend-developer"] += 2; scoreMap["devops-engineer"] += 2; }
  if (math === "low") { scoreMap["frontend-developer"] += 3; scoreMap["uiux-designer"] += 3; scoreMap["qa-automation"] += 2; }
  if (math === "willing") { scoreMap["data-scientist"] += 2; scoreMap["backend-developer"] += 2; scoreMap["mobile-developer"] += 2; }

  // Logic
  const logic = answers[3];
  if (logic === "systematic") { scoreMap["backend-developer"] += 3; scoreMap["devops-engineer"] += 3; scoreMap["qa-automation"] += 3; }
  if (logic === "visual") { scoreMap["frontend-developer"] += 3; scoreMap["uiux-designer"] += 4; scoreMap["mobile-developer"] += 2; }
  if (logic === "experimental") { scoreMap["cybersecurity-specialist"] += 3; scoreMap["data-scientist"] += 2; scoreMap["frontend-developer"] += 2; }
  if (logic === "collaborative") { scoreMap["uiux-designer"] += 3; scoreMap["devops-engineer"] += 2; scoreMap["qa-automation"] += 2; }

  // Creativity
  const creativity = answers[4];
  if (creativity === "high") { scoreMap["uiux-designer"] += 5; scoreMap["frontend-developer"] += 4; scoreMap["mobile-developer"] += 3; }
  if (creativity === "low") { scoreMap["backend-developer"] += 3; scoreMap["data-scientist"] += 3; scoreMap["devops-engineer"] += 2; }
  if (creativity === "technical") { scoreMap["backend-developer"] += 3; scoreMap["devops-engineer"] += 3; scoreMap["cybersecurity-specialist"] += 2; }
  if (creativity === "medium") { scoreMap["frontend-developer"] += 2; scoreMap["mobile-developer"] += 2; scoreMap["qa-automation"] += 2; }

  // Workstyle
  const workstyle = answers[5];
  if (workstyle === "remote") { scoreMap["frontend-developer"] += 2; scoreMap["backend-developer"] += 2; scoreMap["data-scientist"] += 2; }
  if (workstyle === "freelance") { scoreMap["frontend-developer"] += 3; scoreMap["uiux-designer"] += 3; scoreMap["mobile-developer"] += 3; }
  if (workstyle === "office") { scoreMap["devops-engineer"] += 1; scoreMap["cybersecurity-specialist"] += 2; }
  if (workstyle === "hybrid") { Object.keys(scoreMap).forEach(k => scoreMap[k] += 1); }

  // Patience
  const patience = answers[6];
  if (patience === "high") { scoreMap["data-scientist"] += 3; scoreMap["cybersecurity-specialist"] += 3; scoreMap["devops-engineer"] += 2; }
  if (patience === "medium") { scoreMap["backend-developer"] += 2; scoreMap["frontend-developer"] += 2; scoreMap["mobile-developer"] += 2; }
  if (patience === "low") { scoreMap["frontend-developer"] += 3; scoreMap["uiux-designer"] += 2; scoreMap["qa-automation"] += 2; }
  if (patience === "conditional") { scoreMap["mobile-developer"] += 2; scoreMap["frontend-developer"] += 2; }

  // Communication
  const communication = answers[7];
  if (communication === "high") { scoreMap["uiux-designer"] += 3; scoreMap["devops-engineer"] += 2; }
  if (communication === "written") { scoreMap["data-scientist"] += 2; scoreMap["qa-automation"] += 2; scoreMap["backend-developer"] += 2; }
  if (communication === "low") { scoreMap["backend-developer"] += 3; scoreMap["data-scientist"] += 2; }
  if (communication === "growing") { scoreMap["frontend-developer"] += 2; scoreMap["mobile-developer"] += 2; }

  // Project type
  const projectType = answers[8];
  if (projectType === "apps") { scoreMap["frontend-developer"] += 3; scoreMap["mobile-developer"] += 4; scoreMap["backend-developer"] += 2; }
  if (projectType === "analytics") { scoreMap["data-scientist"] += 4; scoreMap["backend-developer"] += 2; }
  if (projectType === "automation") { scoreMap["devops-engineer"] += 4; scoreMap["qa-automation"] += 3; scoreMap["backend-developer"] += 2; }
  if (projectType === "quality") { scoreMap["qa-automation"] += 5; scoreMap["cybersecurity-specialist"] += 2; }

  // Detail orientation
  const detail = answers[9];
  if (detail === "high") { scoreMap["uiux-designer"] += 3; scoreMap["frontend-developer"] += 3; scoreMap["qa-automation"] += 3; }
  if (detail === "low") { scoreMap["backend-developer"] += 2; scoreMap["devops-engineer"] += 2; }
  if (detail === "balanced") { scoreMap["mobile-developer"] += 2; scoreMap["data-scientist"] += 2; }
  if (detail === "efficiency") { scoreMap["devops-engineer"] += 3; scoreMap["backend-developer"] += 3; }

  // Motivation
  const motivation = answers[10];
  if (motivation === "money") { scoreMap["data-scientist"] += 2; scoreMap["devops-engineer"] += 3; scoreMap["backend-developer"] += 2; }
  if (motivation === "impact") { scoreMap["frontend-developer"] += 2; scoreMap["uiux-designer"] += 3; scoreMap["mobile-developer"] += 2; }
  if (motivation === "balance") { scoreMap["frontend-developer"] += 3; scoreMap["qa-automation"] += 3; scoreMap["uiux-designer"] += 2; }
  if (motivation === "growth") { scoreMap["data-scientist"] += 3; scoreMap["cybersecurity-specialist"] += 3; scoreMap["devops-engineer"] += 2; }

  const maxPossible = 40; // approximate max score
  const results = careers.map(career => ({
    career,
    score: scoreMap[career.id],
    matchPercentage: Math.min(Math.round((scoreMap[career.id] / maxPossible) * 100), 98),
  }));

  return results.sort((a, b) => b.score - a.score);
}
