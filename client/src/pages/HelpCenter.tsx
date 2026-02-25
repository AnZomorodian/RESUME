import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, HelpCircle, Book, MessageCircle, Zap } from "lucide-react";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" /> Help Center
          </h1>
          <p className="text-lg text-muted-foreground mb-12">Everything you need to know about building the perfect resume with Phonix Resume.</p>
          
          <div className="grid gap-6">
            {[
              { title: "Getting Started", desc: "Learn how to create your first resume in 5 minutes.", icon: Zap },
              { title: "Customizing Styles", desc: "How to use our 20+ templates to stand out.", icon: Book },
              { title: "Export Options", desc: "How to export to PDF, PNG, and Word correctly.", icon: MessageCircle },
            ].map((item, i) => (
              <div key={i} className="p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
