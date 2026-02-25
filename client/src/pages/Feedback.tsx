import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, MessageSquare, Star } from "lucide-react";

export default function Feedback() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Feedback</h1>
          <p className="text-lg text-muted-foreground mb-12">Your thoughts help us build a better PXR.</p>
          
          <div className="p-8 border rounded-2xl bg-card shadow-sm">
            <div className="flex gap-2 mb-8 justify-center">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 text-amber-400 fill-amber-400" />)}
            </div>
            <textarea 
              className="w-full p-4 border rounded-xl bg-background mb-6" 
              rows={6}
              placeholder="Tell us about your experience..."
            />
            <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors">
              Submit Feedback
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
