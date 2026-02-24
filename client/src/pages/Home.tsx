import { Link } from "wouter";
import { useResumes, useDeleteResume } from "@/hooks/use-resumes";
import { Plus, FileText, Trash2, Edit3, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: resumes, isLoading } = useResumes();
  const deleteMutation = useDeleteResume();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this resume?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Resumes</h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage and create your professional documents.</p>
          </div>
          <Link 
            href="/editor/new"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Plus className="w-5 h-5" /> Create New
          </Link>
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
              Start building your career profile today. Choose from 10 stunning templates and create your perfect resume.
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
  );
}
