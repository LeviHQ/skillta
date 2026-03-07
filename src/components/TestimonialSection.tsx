import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Singh",
    role: "Full Stack Developer at TCS",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    content: "SkillTa helped me transition from IT support to full-stack development. The roadmap was crystal clear and the timeline realistic. Landed my first dev job in 8 months!",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Data Scientist at Microsoft",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    content: "The AI quiz was scary accurate. It suggested data science when I was confused between ML and analytics. Worth every minute spent on SkillTa.",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Product Manager at Flipkart",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
    content: "Best career guidance tool I've used. The PDF roadmap feature saved me hours. Shared it with my entire cohort.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "DevOps Engineer at AWS",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    content: "The reality check section about salary and competition was brutally honest. That's exactly what I needed to make an informed decision.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by <span className="text-gradient">Career Changers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who used SkillTa to land their dream tech jobs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full border border-primary/30"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
