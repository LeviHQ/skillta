import SEOHead from "@/components/SEOHead";
import ResearchLayout from "@/components/ResearchLayout";
import { TechCareerResearchBody } from "@/components/ResearchContent";
import { researchTitle, researchDescription, getResearchSchemas, RESEARCH_PATH } from "@/lib/researchContent";
import { getBreadcrumbSchema } from "@/lib/seo";
export default function TechCareerResearch() {
  return <ResearchLayout title="Tech Careers" report><SEOHead title={researchTitle()} description={researchDescription()} path={RESEARCH_PATH} jsonLd={[...getResearchSchemas(), getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Tech Careers", path: RESEARCH_PATH }])]} /><TechCareerResearchBody /></ResearchLayout>;
}