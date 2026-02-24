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
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <div className="flex-1 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-muted-foreground">Welcome, {user?.username}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Resumes</h1>
              <p className="text-muted-foreground mt-2 text-lg">Manage and create your professional documents.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => logoutMutation.mutate()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
              <Link 
                href="/editor/new"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Plus className="w-5 h-5" /> Create New
              </Link>
            </div>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
              <p>Loading your resumes...</p>
            </div>
          ) : !resumes || resumes.length === 0 ? (
            <div className="bg-card border border-border rounded-3xl p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">No resumes yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Start building your career profile today. Choose from 15 stunning templates and create your perfect resume.
              </p>
              <Link 
                href="/editor/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all"
              >
                <Plus className="w-5 h-5" /> Start Building
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resumes.map((resume, idx) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/editor/${resume.id}`}>
                    <div className="group bg-card rounded-2xl p-6 shadow-md shadow-black/5 border border-border/60 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                          <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full capitalize">
                          {resume.style}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{resume.title}</h3>
                      
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-auto pt-4">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, resume.id)}
                          disabled={deleteMutation.isPending}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
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
                ResumePro
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Empowering professionals to build stunning, high-impact resumes in minutes. Your career journey starts here.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Legal
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Support
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground italic">
              Built with precision for the modern workforce.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 ResumePro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
