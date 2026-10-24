/** Official resource destinations, not claims that a specific report was consulted. */
export const externalReferences: Record<string, string> = {
  // Salary, Career & Market Research
  "Levels.fyi": "https://www.levels.fyi/",
  Glassdoor: "https://www.glassdoor.com/",
  AmbitionBox: "https://www.ambitionbox.com/",
  PayScale: "https://www.payscale.com/",
  Indeed: "https://www.indeed.com/",
  Gartner: "https://www.gartner.com/en",
  "LinkedIn Talent Insights": "https://business.linkedin.com/talent-solutions/talent-insights",
  LinkedIn: "https://www.linkedin.com/",
  "Stack Overflow Developer Survey": "https://survey.stackoverflow.co/",
  "Stack Overflow": "https://stackoverflow.com/",
  StackOverflow: "https://stackoverflow.com/",

  // Coding Practice & Interview Prep
  LeetCode: "https://leetcode.com/",
  NeetCode: "https://neetcode.io/",
  Pramp: "https://www.pramp.com/",
  Exponent: "https://www.tryexponent.com/",
  "Interview Query": "https://www.interviewquery.com/",
  "Frontend Mentor": "https://www.frontendmentor.io/",
  StrataScratch: "https://www.stratascratch.com/",

  // Major Learning Platforms & University Courses
  freeCodeCamp: "https://www.freecodecamp.org/learn/",
  Coursera: "https://www.coursera.org/",
  Udemy: "https://www.udemy.com/",
  Kaggle: "https://www.kaggle.com/learn",
  "The Odin Project": "https://www.theodinproject.com/",
  "Khan Academy": "https://www.khanacademy.org/",
  "MIT OpenCourseWare": "https://ocw.mit.edu/",
  CS50: "https://cs50.harvard.edu/",
  "fast.ai": "https://www.fast.ai/",
  "DeepLearning.AI": "https://www.deeplearning.ai/",
  Scrimba: "https://scrimba.com/",
  DataCamp: "https://www.datacamp.com/",
  Pluralsight: "https://www.pluralsight.com/",
  KodeKloud: "https://kodekloud.com/",
  "Test Automation University": "https://testautomationu.applitools.com/",
  "Linux Journey": "https://linuxjourney.com/",

  // Web, Frontend & Languages Docs
  "React Docs": "https://react.dev/learn",
  "MDN Web Docs": "https://developer.mozilla.org/",
  MDN: "https://developer.mozilla.org/",
  "Next.js docs": "https://nextjs.org/docs",
  "TypeScript Handbook": "https://www.typescriptlang.org/docs/",
  "The Rust Book": "https://doc.rust-lang.org/book/",
  "Node.js docs": "https://nodejs.org/en/docs",
  "Tailwind docs": "https://tailwindcss.com/docs",
  "FastAPI docs": "https://fastapi.tiangolo.com/",
  "Go Tour": "https://go.dev/tour/",
  "Python for Data Science": "https://www.python.org/doc/",
  "web.dev": "https://web.dev/",

  // AI, ML & LLMs
  "Hugging Face": "https://huggingface.co/learn",
  "OpenAI Cookbook": "https://cookbook.openai.com/",
  "Anthropic Docs": "https://docs.anthropic.com/",
  "PyTorch tutorials": "https://pytorch.org/tutorials/",
  "Scikit-learn docs": "https://scikit-learn.org/stable/",
  "LangChain docs": "https://python.langchain.com/docs/",
  "LlamaIndex docs": "https://docs.llamaindex.ai/",
  "Pinecone docs": "https://docs.pinecone.io/",
  "Papers With Code": "https://paperswithcode.com/",
  "MLflow docs": "https://mlflow.org/docs/latest/",

  // Cloud, DevOps & Containers
  "Kubernetes Documentation": "https://kubernetes.io/docs/",
  "Kubernetes docs": "https://kubernetes.io/docs/",
  "Docker docs": "https://docs.docker.com/",
  "Terraform docs": "https://developer.hashicorp.com/terraform/docs",
  "AWS docs": "https://docs.aws.amazon.com/",
  "GitHub Actions docs": "https://docs.github.com/en/actions",
  "Prometheus docs": "https://prometheus.io/docs/",
  "Grafana tutorials": "https://grafana.com/tutorials/",
  "Ansible docs": "https://docs.ansible.com/",
  "PostgreSQL docs": "https://www.postgresql.org/docs/",
  "Redis docs": "https://redis.io/docs/",
  "MongoDB University": "https://learn.mongodb.com/",

  // Cybersecurity & Ethical Hacking
  HackTheBox: "https://www.hackthebox.com/",
  "Hack The Box": "https://www.hackthebox.com/",
  TryHackMe: "https://tryhackme.com/",
  "PortSwigger Web Security Academy": "https://portswigger.net/web-security",
  OWASP: "https://owasp.org/",
  "OWASP docs": "https://owasp.org/projects/",
  HackerOne: "https://www.hackerone.com/",
  Bugcrowd: "https://www.bugcrowd.com/",
  CTFtime: "https://ctftime.org/",
  Wireshark: "https://www.wireshark.org/docs/",

  // Mobile & System Architecture
  "Android Developer docs": "https://developer.android.com/docs",
  "Apple Developer docs": "https://developer.apple.com/documentation/",
  "Flutter docs": "https://docs.flutter.dev/",
  "System Design Primer": "https://github.com/donnemartin/system-design-primer",

  // Quantum Computing & Web3
  "Qiskit Textbook": "https://qiskit.org/learn",
  "Solidity docs": "https://docs.soliditylang.org/",
  CryptoZombies: "https://cryptozombies.io/",
  OpenZeppelin: "https://docs.openzeppelin.com/",
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const names = Object.keys(externalReferences).sort((a, b) => b.length - a.length);
const destinations = new Map(Object.entries(externalReferences).map(([name, url]) => [name.toLowerCase(), url]));
const namePattern = new RegExp(`(?<![\\w/])(?:${names.map(escape).join("|")})(?![\\w])`, "gi");

export function referenceParts(text: string): { text: string; href?: string }[] {
  const parts: { text: string; href?: string }[] = [];
  let start = 0;
  const urls = Array.from(text.matchAll(/(?:https?:\/\/|www\.)[^\s<>]+/gi));
  for (const match of text.matchAll(namePattern)) {
    const index = match.index ?? 0;
    if (urls.some((url) => index >= (url.index ?? 0) && index < (url.index ?? 0) + url[0].length)) continue;
    if (index > start) parts.push({ text: text.slice(start, index) });
    parts.push({ text: match[0], href: destinations.get(match[0].toLowerCase()) });
    start = index + match[0].length;
  }
  if (start < text.length) parts.push({ text: text.slice(start) });
  return parts;
}

interface MarkdownNode {
  type: string;
  value?: string;
  url?: string;
  children?: MarkdownNode[];
}

/** Link text nodes only: preserve existing links, code, headings and URLs. */
export function remarkExternalReferences() {
  return (tree: MarkdownNode) => {
    const visit = (node: MarkdownNode) => {
      if (["link", "linkReference", "code", "inlineCode", "heading", "html"].includes(node.type)) return;
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (child.type !== "text" || !child.value) {
          visit(child);
          return [child];
        }
        return referenceParts(child.value).map((part): MarkdownNode => part.href
          ? { type: "link", url: part.href, children: [{ type: "text", value: part.text }] }
          : { type: "text", value: part.text });
      });
    };
    visit(tree);
  };
}
