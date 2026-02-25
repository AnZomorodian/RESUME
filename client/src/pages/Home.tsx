import { Link, useLocation } from "wouter";
import { useResumes, useDeleteResume } from "@/hooks/use-resumes";
import { Plus, FileText, Trash2, Edit3, Clock, Loader2, LogOut, User, Globe, Settings, Shield, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Home() {
  const { data: resumes, isLoading } = useResumes();
  const { data: user } = useQuery<any>({ queryKey: ["/api/user"] });
  const deleteMutation = useDeleteResume();
  const [, setLocation] = useLocation();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setLocation("/auth");
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this resume?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">Resumes</h1>
              <p className="text-muted-foreground mt-1">Create and manage your professional profile.</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => logoutMutation.mutate()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
              <Link 
                href="/editor/new"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> New Resume
              </Link>
            </div>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="text-sm font-medium">Loading...</p>
            </div>
          ) : !resumes || resumes.length === 0 ? (
            <div className="border rounded-lg p-12 text-center bg-card">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No resumes found</h2>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                Start by creating your first resume. Choose from our professional templates.
              </p>
              <Link 
                href="/editor/new"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Create First Resume
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resumes.map((resume, idx) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/editor/${resume.id}`}>
                    <div className="group bg-card rounded-lg p-5 border border-border hover:border-foreground/20 transition-all duration-200 cursor-pointer h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                          {resume.style}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-1">{resume.title}</h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Updated {new Date(resume.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex-1 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors">
                          Edit
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, resume.id)}
                          disabled={deleteMutation.isPending}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="bg-background border-t border-border py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-black text-2xl text-primary mb-4">
                <FileText className="w-8 h-8" />
                Phonix Resume (PXR)
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Empowering professionals to build stunning, high-impact resumes in minutes. Your career journey starts with PXR.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Legal
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Support
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/feedback" className="hover:text-primary transition-colors">Feedback</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground italic">
              Built with precision for the modern workforce.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Phonix Resume (PXR). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
