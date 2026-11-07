import SEOHead from "@/components/SEOHead";
import ResearchLayout from "@/components/ResearchLayout";
import { ResearchHubBody } from "@/components/ResearchContent";
import { getBreadcrumbSchema } from "@/lib/seo";
export default function Research() {
  return <ResearchLayout title="Research"><SEOHead title="SkillTa Research — Public Career Catalog Data" description="Explore SkillTa's authored career catalog statistics, with calculated counts, editorial-label breakdowns and transparent methodology." path="/research" jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }])} /><ResearchHubBody /></ResearchLayout>;
}