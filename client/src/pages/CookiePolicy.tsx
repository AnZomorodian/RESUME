import { Cookie, FileText } from "lucide-react";
import { Link } from "wouter";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-3xl shadow-sm border border-border">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Cookie className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Cookie Policy</h1>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Cookies</h2>
            <p>
              We use cookies for several reasons, including keeping you logged in, understanding how you use our site, and remembering your preferences (such as your resume style choices).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., authentication).</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the site.</li>
              <li><strong>Functionality Cookies:</strong> Allow the site to remember choices you make.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We encourage you to periodically review this page for the latest information on our cookie practices.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
