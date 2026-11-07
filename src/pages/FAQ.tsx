import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import ResearchLayout from "@/components/ResearchLayout";
import { ResearchAnswers } from "@/components/ResearchContent";
import { getResearchFaqs } from "@/lib/researchContent";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/seo";
export default function FAQ() {
  return <ResearchLayout title="FAQ"><SEOHead title="Tech Career Catalog FAQ — SkillTa" description="Answers about SkillTa's career counts, editorial labels, learning resources, public data sources and research citations." path="/faq" jsonLd={[getFAQSchema(getResearchFaqs()), getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
    <h1 className="text-4xl md:text-5xl font-bold mb-5">Tech Career Catalog FAQ</h1><p className="text-lg text-muted-foreground mb-8">Facts about SkillTa's public catalog and how its research numbers are calculated.</p>
    <ResearchAnswers /><Link to="/research/tech-careers" className="inline-block mt-8 text-primary hover:underline">Read the full report →</Link>
  </ResearchLayout>;
}