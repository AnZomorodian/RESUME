import { useEffect, useRef, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createResumeRequestSchema, CreateResumeRequest } from "@shared/schema";
import { useCreateResume, useUpdateResume, useResume } from "@/hooks/use-resumes";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { ArrowLeft, Save, Download, Loader2, Image as ImageIcon, FileText } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

const DEFAULT_RESUME: CreateResumeRequest = {
  title: "My Resume",
  style: "minimal",
  personalInfo: {
    fullName: "Alex Developer",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    website: "github.com/alexdev"
  },
  summary: "Passionate software engineer with 5+ years of experience building scalable web applications. Strong focus on React, TypeScript, and modern frontend architecture.",
  experience: [
    {
      id: crypto.randomUUID(),
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Engineer",
      startDate: "Jan 2021",
      endDate: "Present",
      description: "- Led migration from Vue to React, improving performance by 40%.\n- Mentored 3 junior developers.\n- Architected component library used across 5 products."
    }
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: "State University",
      degree: "B.S. Computer Science",
      startDate: "2015",
      endDate: "2019"
    }
  ],
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
  projects: [],
  language: "English",
  languages: [],
  hobbies: []
};

export default function Editor() {
  const [, params] = useRoute("/editor/:id");
  const [, setLocation] = useLocation();
  const isNew = params?.id === "new";
  const id = isNew ? null : params?.id || null;

  const { data: existingResume, isLoading } = useResume(id);
  const createMutation = useCreateResume();
  const updateMutation = useUpdateResume();

  const printRef = useRef<HTMLDivElement>(null);
  const form = useForm<CreateResumeRequest>({
    resolver: zodResolver(createResumeRequestSchema),
    defaultValues: isNew ? DEFAULT_RESUME : undefined,
  });

  const formData = form.watch();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: formData.title || "Resume",
    onAfterPrint: () => console.log("Printed"),
  });

  const exportAsPng = async () => {
    if (!printRef.current) return;
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `${formData.title || "resume"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to export PNG:", err);
    }
  };

  const exportAsWord = () => {
    if (!printRef.current) return;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header+printRef.current.innerHTML+footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${formData.title || "resume"}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (existingResume && !isNew) {
      form.reset({
        title: existingResume.title,
        style: existingResume.style as CreateResumeRequest["style"],
        personalInfo: existingResume.personalInfo as any,
        summary: existingResume.summary,
        experience: existingResume.experience as any,
        education: existingResume.education as any,
        skills: existingResume.skills as any,
        projects: existingResume.projects as any,
        language: existingResume.language as any,
        languages: (existingResume.languages || []) as any,
        hobbies: (existingResume.hobbies || []) as any,
      });
    }
  }, [existingResume, isNew, form]);

  const onSubmit = async (data: CreateResumeRequest) => {
    if (isNew) {
      createMutation.mutate(data, {
        onSuccess: (res) => {
          setLocation(`/editor/${res.id}`);
        }
      });
    } else {
      updateMutation.mutate({ id: id!, data });
    }
  };

  if (isLoading && !isNew) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 flex-shrink-0 bg-background border-b border-border px-4 flex items-center justify-between z-10 no-print">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLocation("/")}
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="w-px h-4 bg-border"></div>
          <h1 className="font-semibold text-sm truncate max-w-[150px] sm:max-w-none">
            {formData.title || "Untitled"}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 border rounded-md p-1 bg-muted/50">
            <button
              onClick={() => handlePrint()}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium hover:bg-background hover:shadow-sm rounded transition-all"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
            <button
              onClick={() => exportAsPng()}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium hover:bg-background hover:shadow-sm rounded transition-all"
            >
              <ImageIcon className="w-3.5 h-3.5" /> PNG
            </button>
            <button
              onClick={() => exportAsWord()}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium hover:bg-background hover:shadow-sm rounded transition-all"
            >
              <FileText className="w-3.5 h-3.5" /> Word
            </button>
          </div>
          <button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden no-print relative">
        
        {/* Left: Form Area */}
        <div className="w-full lg:w-[400px] xl:w-[450px] h-full overflow-y-auto bg-background border-b lg:border-b-0 lg:border-r border-border p-4 md:p-6">
          <div className="max-w-xl mx-auto">
            <ResumeForm form={form} />
          </div>
        </div>

        {/* Right: Live Preview Area */}
        <div className="flex-1 h-full overflow-y-auto bg-secondary/30 items-start justify-center p-4 md:p-12 flex">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="resume-scale-wrapper origin-top mb-12 shadow-2xl"
            style={{ 
              scale: typeof window !== 'undefined' && window.innerWidth < 1024 ? Math.min(0.6, (window.innerWidth - 32) / 800) : 0.75
            }}
          >
            <ResumePreview ref={printRef} data={formData as CreateResumeRequest} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
