import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { calculateCareerScores, QuizAnswers, Career } from "@/data/careers";
import { ArrowRight, Star, Clock, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO } from "@/lib/seo";

interface CareerResult {
  career: Career;
  score: number;
  matchPercentage: number;
}

export default function Results() {
  const navigate = useNavigate();
  const { user, saveQuizResult } = useAuth();
  const [results, setResults] = useState<CareerResult[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("quizAnswers");
    if (!stored) {
      navigate("/quiz");
      return;
    }
    const answers: QuizAnswers = JSON.parse(stored);
    const computed = calculateCareerScores(answers);
    setResults(computed);

    // Auto-save if user just signed in (quiz page didn't save yet)
    if (user && !saved) {
      const top = computed[0];
      saveQuizResult({
        answers: answers as Record<number, string>,
        topCareer: top.career.id,
        topMatchPercentage: top.matchPercentage,
        allResults: computed.slice(0, 5).map((r) => ({
          careerId: r.career.id,
          title: r.career.title,
          matchPercentage: r.matchPercentage,
        })),
      }).then(() => setSaved(true));
    }
  }, [navigate, user]);

  if (results.length === 0) return null;

  const top = results[0];
  const runners = results.slice(1, 4);

  const difficultyStars = (level: string) => {
    const map: Record<string, number> = { Easy: 1, Moderate: 2, Hard: 3, "Very Hard": 4 };
    return map[level] || 2;
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container mx-auto px-6 py-12 relative z-10">

        {/* Signed in banner */}
        {user && (
          <motion.div
            className="max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
              {user.photoURL && <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" />}
              <p className="text-sm text-primary">
                ✓ Results saved to your dashboard, {user.displayName?.split(" ")[0]}!
              </p>
              <Link to="/dashboard" className="ml-auto text-xs font-semibold text-primary hover:underline">
                Go to Dashboard →
              </Link>
            </div>
          </motion.div>
        )}

        {/* Top Result */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Your top career match</p>
          <div className="text-6xl mb-4">{top.career.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-gradient">{top.career.title}</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-4">{top.career.tagline}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold">{top.matchPercentage}% Match</span>
          </div>
        </motion.div>

        {/* Career Analysis */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-8 rounded-2xl bg-gradient-card border border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground">Why This Career Suits You</h2>
            <ul className="space-y-3 mb-8">
              {top.career.whySuits.map((reason, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-0.5">✦</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <Clock className="w-5 h-5 text-info mb-2" />
                <p className="text-xs text-muted-foreground">Learning Time</p>
                <p className="text-sm font-semibold text-foreground">{top.career.estimatedTime}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <TrendingUp className="w-5 h-5 text-success mb-2" />
                <p className="text-xs text-muted-foreground">Demand</p>
                <p className="text-sm font-semibold text-foreground">{top.career.demandLevel}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <DollarSign className="w-5 h-5 text-warning mb-2" />
                <p className="text-xs text-muted-foreground">Salary (India)</p>
                <p className="text-sm font-semibold text-foreground">{top.career.salaryIndia.split("→")[0]}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <AlertTriangle className="w-5 h-5 text-accent mb-2" />
                <p className="text-xs text-muted-foreground">Difficulty</p>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        i < difficultyStars(top.career.learningDifficulty) ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Required Skills */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-8 rounded-2xl bg-gradient-card border border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {top.career.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reality Check */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-8 rounded-2xl bg-gradient-card border border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Reality Check
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Competition</p>
                <p className="text-sm font-semibold text-foreground">{top.career.realityCheck.competition}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Entry Barrier</p>
                <p className="text-sm font-semibold text-foreground">{top.career.realityCheck.entryBarrier}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Learning Time</p>
                <p className="text-sm font-semibold text-foreground">{top.career.realityCheck.learningTime}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic border-l-2 border-warning pl-4">
              {top.career.realityCheck.honestNote}
            </p>
          </div>
        </motion.div>

        {/* Salary */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="p-8 rounded-2xl bg-gradient-card border border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground">💰 Salary Expectations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">India</p>
                <p className="text-sm font-semibold text-foreground">{top.career.salaryIndia}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Global</p>
                <p className="text-sm font-semibold text-foreground">{top.career.salaryGlobal}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">{top.career.growthPotential}</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to={`/roadmaps/${top.career.id}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            View Full Roadmap <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
          >
            Retake Quiz
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors"
            >
              Go to Dashboard
            </Link>
          )}
        </motion.div>

        {/* Other Matches */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-foreground mb-4">Other Great Matches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {runners.map((r, i) => (
              <motion.div
                key={r.career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <Link
                  to={`/roadmaps/${r.career.id}`}
                  className="block p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{r.career.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{r.career.title}</p>
                      <p className="text-xs text-primary">{r.matchPercentage}% match</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.career.tagline}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
