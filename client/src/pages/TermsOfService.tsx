import { FileText, Gavel } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-3xl shadow-sm border border-border">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Gavel className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ResumePro, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Services</h2>
            <p>
              You are responsible for your use of the services and for any content you provide, including compliance with applicable laws, rules, and regulations. You may use our services only as permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. User Content</h2>
            <p>
              You retain all rights to the resumes and data you create on our platform. By using our services, you grant us a license to store and process your content as necessary to provide the services to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Termination</h2>
            <p>
              We may suspend or terminate your access to the services at any time, with or without cause, and with or without notice. You may stop using the services at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
