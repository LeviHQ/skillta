import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const testimonials = [
  {
    name: "Priya Singh",
    role: "Full Stack Developer at TCS",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    content:
      "SkillTa helped me transition from IT support to full-stack development. The roadmap was crystal clear and the timeline realistic. Landed my first dev job in 8 months!",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Data Scientist at Microsoft",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    content:
      "The AI quiz was scary accurate. It suggested data science when I was confused between ML and analytics. Worth every minute spent on SkillTa.",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Product Manager at Flipkart",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
    content:
      "Best career guidance tool I've used. The PDF roadmap feature saved me hours. Shared it with my entire cohort.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "DevOps Engineer at AWS",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    content:
      "The reality check section about salary and competition was brutally honest. That's exactly what I needed to make an informed decision.",
    rating: 5,
  },
  {
    name: "Sneha Iyer",
    role: "UI/UX Designer at Swiggy",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    content:
      "I was stuck in a boring corporate job. SkillTa's quiz pinpointed UX design for me. The roadmap was a game changer — I switched careers in 6 months!",
    rating: 5,
  },
  {
    name: "Karan Mehta",
    role: "Cloud Architect at Google",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan",
    content:
      "The detailed career analysis with salary ranges and demand levels helped me pick cloud computing over cybersecurity. Best decision ever.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            What Our Users Say
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Loved by <span className="text-gradient">Career Changers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who used SkillTa to land their dream tech
            jobs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayPlugin.current]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.name}
                  className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all relative group">
                    {/* Quote icon */}
                    <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6 group-hover:text-primary/40 transition-colors" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, j) => (
                          <Star
                            key={j}
                            className="w-4 h-4 fill-primary text-primary"
                          />
                        )
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-sm text-foreground/90 mb-8 leading-relaxed min-h-[100px]">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-5 border-t border-border">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-primary/40 overflow-hidden bg-secondary">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary border-2 border-card" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex items-center justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border-border bg-card hover:bg-secondary hover:border-primary/30" />
              <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border-border bg-card hover:bg-secondary hover:border-primary/30" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
