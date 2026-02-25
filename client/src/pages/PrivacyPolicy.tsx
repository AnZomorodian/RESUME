import { FileText, Shield } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-3xl shadow-sm border border-border">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p>
              At ResumePro, we collect information that you provide directly to us when you create an account, build a resume, or contact us for support. This includes your name, email address, and any professional information you include in your resumes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services. Specifically, we use your resume data to generate professional documents and your account information to manage your access to our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. Your data is stored securely using industry-standard encryption.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Your Choices</h2>
            <p>
              You may update or delete your account information at any time by logging into your account settings. You can also delete individual resumes you have created through our dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@resumepro.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
