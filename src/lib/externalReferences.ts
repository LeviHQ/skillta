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
  "Grokking System Design": "https://www.designgurus.io/",
  "System Design Primer": "https://github.com/donnemartin/system-design-primer",
  "Ace the Data Science Interview": "https://www.acethedatascienceinterview.com/",

  // Math, AI, ML & Data Science
  "3Blue1Brown": "https://www.3blue1brown.com/",
  "Andrew Ng": "https://www.deeplearning.ai/",
  "Towards Data Science": "https://towardsdatascience.com/",
  "Hugging Face": "https://huggingface.co/learn",
  HuggingFace: "https://huggingface.co/learn",
  "fast.ai": "https://www.fast.ai/",
  "DeepLearning.AI": "https://www.deeplearning.ai/",
  Kaggle: "https://www.kaggle.com/",
  "Mode Analytics": "https://mode.com/",
  "Papers With Code": "https://paperswithcode.com/",
  PyTorch: "https://pytorch.org/",
  TensorFlow: "https://www.tensorflow.org/",
  "Scikit-learn": "https://scikit-learn.org/",
  LangChain: "https://python.langchain.com/",
  LlamaIndex: "https://www.llamaindex.ai/",
  Pinecone: "https://www.pinecone.io/",
  MLflow: "https://mlflow.org/",
  "OpenAI Cookbook": "https://cookbook.openai.com/",
  "Anthropic Docs": "https://docs.anthropic.com/",
  Anthropic: "https://docs.anthropic.com/",

  // General Learning Platforms & Academies
  freeCodeCamp: "https://www.freecodecamp.org/",
  Coursera: "https://www.coursera.org/",
  Udemy: "https://www.udemy.com/",
  DataCamp: "https://www.datacamp.com/",
  "The Odin Project": "https://www.theodinproject.com/",
  "Khan Academy": "https://www.khanacademy.org/",
  "MIT OpenCourseWare": "https://ocw.mit.edu/",
  CS50: "https://cs50.harvard.edu/",
  Nand2Tetris: "https://www.nand2tetris.org/",
  Scrimba: "https://scrimba.com/",
  Pluralsight: "https://www.pluralsight.com/",
  KodeKloud: "https://kodekloud.com/",
  "A Cloud Guru": "https://acloudguru.com/",
  "Linux Journey": "https://linuxjourney.com/",
  "Test Automation University": "https://testautomationu.applitools.com/",

  // Developer Portals, Communities & Tools
  GitHub: "https://github.com/",
  "Dev.to": "https://dev.to/",
  Medium: "https://medium.com/",
  YouTube: "https://www.youtube.com/",
  Figma: "https://www.figma.com/",
  "CSS-Tricks": "https://css-tricks.com/",
  "web.dev": "https://web.dev/",

  // Web & Framework Docs
  "MDN Web Docs": "https://developer.mozilla.org/",
  MDN: "https://developer.mozilla.org/",
  "React Docs": "https://react.dev/learn",
  React: "https://react.dev/",
  "Next.js": "https://nextjs.org/docs",
  Nextjs: "https://nextjs.org/docs",
  Tailwind: "https://tailwindcss.com/docs",
  TypeScript: "https://www.typescriptlang.org/docs/",
  Rust: "https://www.rust-lang.org/",
  "Node.js": "https://nodejs.org/en/docs",
  FastAPI: "https://fastapi.tiangolo.com/",
  "Go Tour": "https://go.dev/tour/",
  Python: "https://www.python.org/doc/",

  // Cloud, DevOps & Infrastructure
  AWS: "https://aws.amazon.com/",
  Docker: "https://docs.docker.com/",
  Kubernetes: "https://kubernetes.io/docs/",
  Terraform: "https://developer.hashicorp.com/terraform/docs",
  Ansible: "https://docs.ansible.com/",
  Prometheus: "https://prometheus.io/docs/",
  Grafana: "https://grafana.com/",
  PostgreSQL: "https://www.postgresql.org/docs/",
  MySQL: "https://dev.mysql.com/doc/",
  Redis: "https://redis.io/docs/",
  "MongoDB University": "https://learn.mongodb.com/",
  MongoDB: "https://www.mongodb.com/",

  // Cybersecurity & Ethical Hacking
  HackTheBox: "https://www.hackthebox.com/",
  "Hack The Box": "https://www.hackthebox.com/",
  TryHackMe: "https://tryhackme.com/",
  "PortSwigger Web Security Academy": "https://portswigger.net/web-security",
  OWASP: "https://owasp.org/",
  HackerOne: "https://www.hackerone.com/",
  Bugcrowd: "https://www.bugcrowd.com/",
  CTFtime: "https://ctftime.org/",
  Wireshark: "https://www.wireshark.org/docs/",

  // Mobile, Systems, Web3 & Quantum
  Android: "https://developer.android.com/docs",
  Apple: "https://developer.apple.com/documentation/",
  Flutter: "https://docs.flutter.dev/",
  Unity: "https://unity.com/learn",
  "Unreal Engine": "https://dev.epicgames.com/community/learning",
  Blender: "https://www.blender.org/",
  Solidity: "https://docs.soliditylang.org/",
  CryptoZombies: "https://cryptozombies.io/",
  OpenZeppelin: "https://docs.openzeppelin.com/",
  Qiskit: "https://qiskit.org/learn",
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
