import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { careers } from "@/data/careers";
import {
  User, LogOut, TrendingUp, Clock, Star, ArrowRight,
  BarChart3, History, Sparkles, Target, BookOpen
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO } from "@/lib/seo";

interface QuizResult {
  id?: string;
  answers: Record<string, string>;
  topCareer: string;
  topMatchPercentage: number;
  allResults: { careerId: string; title: string; matchPercentage: number }[];
  createdAt: any;
}

export default function Dashboard() {
  const { user, signOut, getQuizHistory } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    getQuizHistory().then((h) => {
      setHistory(h);
      setLoading(false);
    });
  }, [user]);

  if (!user) return null;

  const latestResult = history[0];
  const topCareer = latestResult ? careers.find((c) => c.id === latestResult.topCareer) : null;

  // Aggregate stats
  const totalQuizzes = history.length;
  const careerFrequency: Record<string, number> = {};
  history.forEach((h) => {
    careerFrequency[h.topCareer] = (careerFrequency[h.topCareer] || 0) + 1;
  });
  const mostFrequentCareer = Object.entries(careerFrequency).sort((a, b) => b[1] - a[1])[0];
  const mostFrequentCareerData = mostFrequentCareer ? careers.find((c) => c.id === mostFrequentCareer[0]) : null;

  // Get unique recommended careers from all results
  const allRecommended = new Set<string>();
  history.forEach((h) => h.allResults?.slice(0, 3).forEach((r) => allRecommended.add(r.careerId)));

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container mx-auto px-6 py-8 relative z-10">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="w-14 h-14 rounded-full border-2 border-primary/40" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, <span className="text-gradient">{user.displayName?.split(" ")[0] || "User"}</span>
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-destructive/50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-5 rounded-2xl bg-gradient-card border border-border">
            <BarChart3 className="w-6 h-6 text-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">{totalQuizzes}</p>
            <p className="text-xs text-muted-foreground">Quizzes Taken</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-card border border-border">
            <Star className="w-6 h-6 text-warning mb-3" />
            <p className="text-2xl font-bold text-foreground">
              {latestResult ? `${latestResult.topMatchPercentage}%` : "—"}
            </p>
            <p className="text-xs text-muted-foreground">Best Match Score</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-card border border-border">
            <Target className="w-6 h-6 text-accent mb-3" />
            <p className="text-2xl font-bold text-foreground truncate">
              {mostFrequentCareerData?.title || "—"}
            </p>
            <p className="text-xs text-muted-foreground">Top Career Match</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-card border border-border">
            <Sparkles className="w-6 h-6 text-info mb-3" />
            <p className="text-2xl font-bold text-foreground">{allRecommended.size}</p>
            <p className="text-xs text-muted-foreground">Careers Explored</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Latest Result */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6 rounded-2xl bg-gradient-card border border-border h-full">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Latest Career Result</h2>
              </div>

              {topCareer ? (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{topCareer.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{topCareer.title}</h3>
                      <p className="text-sm text-muted-foreground">{topCareer.tagline}</p>
                      <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <Star className="w-3 h-3 text-primary" />
                        <span className="text-xs font-semibold text-primary">{latestResult.topMatchPercentage}% Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Other matches from latest result */}
                  {latestResult.allResults && latestResult.allResults.length > 1 && (
                    <div className="mb-6">
                      <p className="text-xs text-muted-foreground mb-3">Other matches from this quiz:</p>
                      <div className="flex flex-wrap gap-2">
                        {latestResult.allResults.slice(1, 4).map((r) => {
                          const c = careers.find((c) => c.id === r.careerId);
                          return (
                            <Link
                              key={r.careerId}
                              to={`/roadmaps/${r.careerId}`}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                            >
                              <span className="text-lg">{c?.icon}</span>
                              <div>
                                <p className="text-xs font-medium text-foreground">{r.title}</p>
                                <p className="text-xs text-primary">{r.matchPercentage}%</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {topCareer.requiredSkills.slice(0, 6).map((s) => (
                        <span key={s} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Demand</p>
                      <p className="text-sm font-semibold text-foreground">{topCareer.demandLevel}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="text-sm font-semibold text-foreground">{topCareer.learningDifficulty}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="text-sm font-semibold text-foreground">{topCareer.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/roadmaps/${topCareer.id}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      View Full Roadmap <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/quiz"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      Retake Quiz
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't taken a quiz yet</p>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
                  >
                    Take the Career Quiz <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Personalized Recommendations */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold text-foreground">Recommended For You</h2>
              </div>
              {allRecommended.size > 0 ? (
                <div className="space-y-2">
                  {Array.from(allRecommended).slice(0, 5).map((cId) => {
                    const c = careers.find((cr) => cr.id === cId);
                    if (!c) return null;
                    return (
                      <Link
                        key={cId}
                        to={`/roadmaps/${cId}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                      >
                        <span className="text-xl">{c.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{c.title}</p>
                          <p className="text-xs text-muted-foreground">{c.demandLevel} Demand</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Take a quiz to get personalized recommendations</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to="/quiz" className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors group">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Take Career Quiz</span>
                </Link>
                <Link to="/roadmaps" className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group">
                  <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Browse Roadmaps</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quiz History */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 rounded-2xl bg-gradient-card border border-border">
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Quiz History</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-3">
                {history.map((h, i) => {
                  const c = careers.find((cr) => cr.id === h.topCareer);
                  const date = h.createdAt?.toDate ? h.createdAt.toDate() : new Date();
                  return (
                    <div
                      key={h.id || i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
                    >
                      <span className="text-2xl">{c?.icon || "📋"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{c?.title || h.topCareer}</p>
                        <p className="text-xs text-muted-foreground">
                          {date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          {" · "}
                          {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary px-2 py-1 rounded-md bg-primary/10">{h.topMatchPercentage}%</span>
                        {c && (
                          <Link
                            to={`/roadmaps/${c.id}`}
                            className="text-xs px-3 py-1 rounded-md border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors"
                          >
                            Roadmap
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No quiz history yet. Take your first quiz!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
