import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlanProvider } from "@/contexts/PlanContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DeferredThirdParty from "./components/DeferredThirdParty";
// Home stays in the main bundle: it is the LCP route for most traffic.
import Index from "./pages/Index";

// Every other route is code-split so the initial payload stays small.
const Quiz = lazy(() => import("./pages/Quiz"));
const Results = lazy(() => import("./pages/Results"));
const RoadmapLibrary = lazy(() => import("./pages/RoadmapLibrary"));
const RoadmapDetail = lazy(() => import("./pages/RoadmapDetail"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const CompareCareers = lazy(() => import("./pages/CompareCareers"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Story = lazy(() => import("./pages/Story"));
const SalaryPredictor = lazy(() => import("./pages/SalaryPredictor"));
const ResumeReviewer = lazy(() => import("./pages/ResumeReviewer"));
const SkillGapAnalyzer = lazy(() => import("./pages/SkillGapAnalyzer"));
const CountryPage = lazy(() => import("./pages/CountryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-[70vh] flex items-center justify-center" aria-busy="true">
    <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PlanProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <main className="min-h-screen pt-16">
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/roadmaps" element={<RoadmapLibrary />} />
                    <Route path="/roadmaps/:careerId" element={<RoadmapDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/compare" element={<CompareCareers />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/salary-predictor" element={<SalaryPredictor />} />
                    <Route path="/resume-reviewer" element={<ResumeReviewer />} />
                    <Route path="/skill-gap-analyzer" element={<SkillGapAnalyzer />} />
                    <Route path="/:country" element={<CountryPage />} />
                    <Route path="/:country/:section" element={<CountryPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <DeferredThirdParty />
            </BrowserRouter>
          </TooltipProvider>
        </PlanProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
