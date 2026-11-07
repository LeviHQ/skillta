import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export default function ResearchLayout({ title, report = false, children }: { title: string; report?: boolean; children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><div className="container mx-auto px-6 py-10 max-w-5xl">
    <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap justify-end gap-2 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link><span>/</span>{report && <><Link to="/research" className="hover:text-primary">Research</Link><span>/</span></>}<span className="text-foreground">{title}</span></nav>
    {children}
  </div></div>;
}