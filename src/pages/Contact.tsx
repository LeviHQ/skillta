import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    toast({
      title: "Message sent! ✅",
      description: "We'll get back to you within 24-48 hours.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <SEOHead
        {...PAGE_SEO.contact}
        jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}
      />
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Have a question, feedback, or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="p-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Email Us</h3>
                    <a href="mailto:support@skillta.tech" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      support@skillta.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Location</h3>
                    <p className="text-sm text-muted-foreground">Remote-first, India 🇮🇳</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Response Time</h3>
                    <p className="text-sm text-muted-foreground">Within 24–48 hours</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-foreground mb-2">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  <Link to="/quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors">→ Take the Career Quiz</Link>
                  <Link to="/roadmaps" className="text-sm text-muted-foreground hover:text-primary transition-colors">→ Browse Roadmaps</Link>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">→ About SkillTa</Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Subject</label>
                  <Input
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Message</label>
                  <Textarea
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
