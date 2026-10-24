/** Official resource destinations, not claims that a specific report was consulted. */
export const externalReferences: Record<string, string> = {
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
  LeetCode: "https://leetcode.com/",
  Pramp: "https://www.pramp.com/",
  Exponent: "https://www.tryexponent.com/",
  "Hugging Face": "https://huggingface.co/learn",
  "React Docs": "https://react.dev/learn",
  "MDN Web Docs": "https://developer.mozilla.org/",
  MDN: "https://developer.mozilla.org/",
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
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const names = Object.keys(externalReferences).sort((a, b) => b.length - a.length);
const destinations = new Map(Object.entries(externalReferences).map(([name, url]) => [name.toLowerCase(), url]));

export function referenceParts(text: string): { text: string; href?: string }[] {
  const pattern = new RegExp(`(?<![\\w/])(?:${names.map(escape).join("|")})(?![\\w])`, "gi");
  const parts: { text: string; href?: string }[] = [];
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
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