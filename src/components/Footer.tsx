import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 no-print">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Compass className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Skill<span className="text-gradient">Ta</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              AI-powered career guidance to help you discover the perfect tech career path. Take the quiz, get your roadmap, start your journey.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors">Career Quiz</Link>
              <Link to="/roadmaps" className="text-sm text-muted-foreground hover:text-primary transition-colors">Roadmap Library</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Popular Paths</h4>
            <div className="flex flex-col gap-2">
              <Link to="/roadmaps/frontend-developer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Frontend Development</Link>
              <Link to="/roadmaps/backend-developer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Backend Development</Link>
              <Link to="/roadmaps/data-scientist" className="text-sm text-muted-foreground hover:text-primary transition-colors">Data Science</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground"><p className="text-xs text-muted-foreground">© 2026 SkillTa. Built to help you find your path in tech.</p></p>
        </div>
      </div>
    </footer>
  );
}
