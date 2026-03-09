import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomQuestions, QuizQuestion } from "@/data/quizQuestionBank";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SignInModal from "@/components/SignInModal";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO } from "@/lib/seo";

export interface QuizAnswers {
  [questionId: string]: string;
}

export default function Quiz() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showSignIn, setShowSignIn] = useState(false);
  
  // Generate random questions once on mount
  const quizQuestions = useMemo(() => {
    // Check if we have saved questions in session (in case of page refresh)
    const saved = sessionStorage.getItem("currentQuizQuestions");
    if (saved) {
      return JSON.parse(saved) as QuizQuestion[];
    }
    const questions = getRandomQuestions();
    sessionStorage.setItem("currentQuizQuestions", JSON.stringify(questions));
    return questions;
  }, []);

  const question = quizQuestions[currentQ];
  const progress = ((currentQ + 1) / quizQuestions.length) * 100;
  const isAnswered = answers[question.id] !== undefined;

  const selectAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const next = async () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((p) => p + 1);
    } else {
      // Quiz complete - check if signed in
      if (!user) {
        // Show sign-in modal but still allow proceeding
        sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
        setShowSignIn(true);
        return;
      }
      await finishQuiz();
    }
  };

  const finishQuiz = () => {
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    // Clear the saved questions
    sessionStorage.removeItem("currentQuizQuestions");
    // Always navigate immediately; results page handles signed-in auto-save.
    navigate("/results");
  };

  const handleSignInClose = () => {
    setShowSignIn(false);
    // After closing sign-in modal, proceed to results anyway
    navigate("/results");
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ((p) => p - 1);
  };

  const resetQuiz = () => {
    if (confirm("Start a new quiz with different questions? Your current progress will be lost.")) {
      sessionStorage.removeItem("currentQuizQuestions");
      sessionStorage.removeItem("quizAnswers");
      window.location.reload();
    }
  };

  return (
    <>
      <SEOHead {...PAGE_SEO.quiz} />
      <div className="min-h-screen bg-gradient-hero relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Progress */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">
                Question {currentQ + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-mono text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {question.question}
                  </h2>
                  {question.subtitle && (
                    <p className="text-muted-foreground">{question.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {question.options.map((option) => {
                    const isSelected = answers[question.id] === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => selectAnswer(option.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-glow"
                            : "border-border bg-card hover:border-muted-foreground/30"
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <p className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {option.label}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={prev}
                disabled={currentQ === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={next}
                disabled={!isAnswered}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {currentQ === quizQuestions.length - 1 ? "See Results" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SignInModal
        open={showSignIn}
        onClose={handleSignInClose}
        message="Sign in to save your quiz results and get personalized recommendations. You can also continue without signing in."
      />
    </>
  );
}
