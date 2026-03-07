import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does the career quiz take?",
    answer:
      "The AI Career Quiz takes approximately 5-10 minutes. It includes 10 smart questions designed to understand your interests, skills, and career goals. You don't need to sign up or provide personal information to take it.",
  },
  {
    question: "Can I retake the quiz if my interests change?",
    answer:
      "Absolutely! You can retake the quiz anytime. If you're signed in, all your quiz results are saved to your dashboard so you can compare different paths and track your career journey over time.",
  },
  {
    question: "Are the learning roadmaps free?",
    answer:
      "Yes, all SkillTa roadmaps are completely free. The personalized roadmaps, career analysis, PDF downloads, and the entire roadmap library are available at no cost. We believe career guidance should be accessible to everyone.",
  },
  {
    question: "How accurate is the AI recommendation?",
    answer:
      "Our AI is trained on data from 10,000+ tech professionals and uses machine learning to match your profile with career paths. It has a 92% accuracy rate in recommending suitable tech careers, but it's one tool among many. Always combine it with mentorship and personal research.",
  },
  {
    question: "Can I download my roadmap as PDF?",
    answer:
      "Yes! Once you get your personalized roadmap, you can download it as a PDF with all the learning resources, project ideas, and timeline included. Perfect for offline reading or sharing with mentors.",
  },
  {
    question: "Do I need prior tech experience to use SkillTa?",
    answer:
      "No, SkillTa is designed for everyone—from complete beginners to career switchers with some background. The quiz adapts to your current level and recommends learning paths accordingly. Many users are transitioning from non-tech fields.",
  },
  {
    question: "How often are the roadmaps updated?",
    answer:
      "We update our roadmaps every quarter to reflect the latest industry trends, tools, and market demands. Your saved roadmaps automatically stay current so you're always following best practices.",
  },
  {
    question: "Can I save my progress if I'm not signed in?",
    answer:
      "Quiz results can be viewed immediately, but they won't persist if you close your browser without signing in. Sign in with Google to save everything and access your dashboard anytime. It's a one-click setup!",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about SkillTa and getting started with your career journey
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem className="border border-border rounded-lg px-6 bg-card/50 hover:bg-card/70 transition-colors">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
