import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-12">We're here to help you accelerate your career.</p>
          
          <div className="grid gap-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Email Support</h3>
                <p className="text-muted-foreground">support@phonixresume.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-muted-foreground">+1 (800) PXR-JOBS</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Office</h3>
                <p className="text-muted-foreground">Silicon Valley, CA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
