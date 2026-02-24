import { useEffect, useRef, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createResumeRequestSchema, CreateResumeRequest } from "@shared/schema";
import { useCreateResume, useUpdateResume, useResume } from "@/hooks/use-resumes";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { ArrowLeft, Save, Download, Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { motion } from "framer-motion";

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
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Resume",
  });

  const form = useForm<CreateResumeRequest>({
    resolver: zodResolver(createResumeRequestSchema),
    defaultValues: isNew ? DEFAULT_RESUME : undefined,
  });

  useEffect(() => {
    if (existingResume && !isNew) {
      // Ensure we format it to match the CreateResumeRequest shape
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

  const formData = form.watch();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading && !isNew) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-muted/30 overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 flex-shrink-0 bg-card border-b border-border px-6 flex items-center justify-between z-10 no-print">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="w-px h-6 bg-border"></div>
          <h1 className="font-bold text-lg">{formData.title || "Untitled Resume"}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden no-print relative">
        
        {/* Left: Form Area */}
        <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto bg-background/50 border-r border-border p-6">
          <div className="max-w-xl mx-auto">
            <ResumeForm form={form} />
          </div>
        </div>

        {/* Right: Live Preview Area */}
        <div className="hidden lg:flex flex-1 h-full overflow-y-auto bg-neutral-100 items-start justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="resume-scale-wrapper"
            style={{ zoom: 0.8 }} // Slight zoom out to fit typical screens better
          >
            <ResumePreview ref={printRef} data={formData as CreateResumeRequest} />
          </motion.div>
        </div>
      </div>

      {/* Hidden print container for react-to-print if needed, though react-to-print clones the ref natively */}
    </div>
  );
}
