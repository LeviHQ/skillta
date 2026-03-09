import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { careers, Career } from "@/data/careers";
import { ArrowRight, Search, Filter, X } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function RoadmapLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [demandFilter, setDemandFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [entryBarrierFilter, setEntryBarrierFilter] = useState<string>("all");

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.requiredSkills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Difficulty filter
      const matchesDifficulty =
        difficultyFilter === "all" || career.learningDifficulty === difficultyFilter;

      // Demand filter
      const matchesDemand =
        demandFilter === "all" || career.demandLevel === demandFilter;

      // Duration filter
      const matchesDuration = (() => {
        if (durationFilter === "all") return true;
        const timeStr = career.estimatedTime.toLowerCase();
        if (durationFilter === "quick" && (timeStr.includes("3-6") || timeStr.includes("4-8"))) return true;
        if (durationFilter === "medium" && (timeStr.includes("6-12") || timeStr.includes("8-12") || timeStr.includes("6-18"))) return true;
        if (durationFilter === "long" && (timeStr.includes("12-18") || timeStr.includes("12-24") || timeStr.includes("18-24") || timeStr.includes("2-4 years"))) return true;
        return false;
      })();

      // Entry barrier filter
      const matchesEntryBarrier =
        entryBarrierFilter === "all" || career.realityCheck.entryBarrier === entryBarrierFilter;

      return matchesSearch && matchesDifficulty && matchesDemand && matchesDuration && matchesEntryBarrier;
    });
  }, [searchQuery, difficultyFilter, demandFilter, durationFilter, entryBarrierFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setDemandFilter("all");
    setDurationFilter("all");
    setEntryBarrierFilter("all");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    difficultyFilter !== "all" ||
    demandFilter !== "all" ||
    durationFilter !== "all" ||
    entryBarrierFilter !== "all";

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <SEOHead
        {...PAGE_SEO.roadmaps}
        jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Roadmaps", path: "/roadmaps" }])}
      />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tech Career <span className="text-gradient">Roadmaps</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse {careers.length}+ detailed roadmaps for in-demand tech careers. Filter by difficulty, demand, duration, and more.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="mb-10 p-6 rounded-2xl border border-border bg-gradient-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Filter Roadmaps</h2>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" /> Clear All
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by career name, skill, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Very Hard">Very Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={demandFilter} onValueChange={setDemandFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Demand Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Demand Levels</SelectItem>
                <SelectItem value="Very High">Very High</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Growing">Growing</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
              </SelectContent>
            </Select>

            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="quick">Quick (3-8 months)</SelectItem>
                <SelectItem value="medium">Medium (6-18 months)</SelectItem>
                <SelectItem value="long">Long (12+ months)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={entryBarrierFilter} onValueChange={setEntryBarrierFilter}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Entry Barrier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entry Levels</SelectItem>
                <SelectItem value="Low">Low (Beginner Friendly)</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High (Requires Experience)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredCareers.length}</span> of {careers.length} roadmaps
          </div>
        </motion.div>

        {/* Career Cards Grid */}
        {filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredCareers.map((career, i) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={`/roadmaps/${career.id}`}
                  className="block p-6 rounded-2xl border border-border bg-gradient-card hover:border-primary/40 hover:shadow-glow transition-all group h-full"
                >
                  <div className="text-4xl mb-4">{career.icon}</div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {career.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{career.tagline}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">{career.demandLevel}</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{career.learningDifficulty}</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent-foreground">{career.estimatedTime}</span>
                  </div>

                  <div className="text-xs text-muted-foreground mb-3">
                    Entry: <span className="text-foreground">{career.realityCheck.entryBarrier}</span> • 
                    Competition: <span className="text-foreground">{career.realityCheck.competition}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    View Roadmap <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No roadmaps found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
