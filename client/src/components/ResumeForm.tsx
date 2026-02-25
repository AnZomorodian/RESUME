import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { CreateResumeRequest } from "@shared/schema";
import { Trash2, Plus, User, FileText, Briefcase, GraduationCap, Code, Layout, Heart, Globe, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResumeFormProps {
  form: UseFormReturn<CreateResumeRequest>;
}

export function ResumeForm({ form }: ResumeFormProps) {
  const { register, control, formState: { errors } } = form;

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control, name: "experience"
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control, name: "education"
  });

  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({
    control, name: "projects"
  });

  const [skillInput, setSkillInput] = React.useState("");
  const skills = form.watch("skills") || [];

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if ((e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') || !skillInput.trim()) return;
    e.preventDefault();
    form.setValue("skills", [...skills, skillInput.trim()]);
    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    form.setValue("skills", skills.filter((_, i) => i !== index));
  };

  const STYLES = [
    "minimal", "modern", "classic", "creative", "professional", 
    "elegant", "bold", "clean", "tech", "executive",
    "vintage", "playful", "corporate", "startup", "academic", "canva"
  ];

  const SECTIONS = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Layout },
    { id: "hobbies", label: "Hobbies", icon: Heart },
  ];

  const [activeSection, setActiveSection] = React.useState("personal");

  const [hobbyInput, setHobbiesInput] = React.useState("");
  const hobbies = form.watch("hobbies") || [];

  const addHobby = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if ((e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') || !hobbyInput.trim()) return;
    e.preventDefault();
    form.setValue("hobbies", [...hobbies, hobbyInput.trim()]);
    setHobbiesInput("");
  };

  const removeHobby = (index: number) => {
    form.setValue("hobbies", hobbies.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      {/* Section Sidebar Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="sticky top-6 space-y-2">
          <div className="px-4 py-2 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Resume Sections</h3>
          </div>
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 space-y-10">
        {/* Basics & Style */}
        <section className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight">Document Settings</h2>
            <div className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black rounded-full uppercase tracking-widest border border-primary/20">
              Personalizing
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                Language
              </label>
              <input 
                {...register("language")}
                className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm font-medium"
                placeholder="e.g. English"
              />
              {errors.language && <p className="text-sm text-destructive mt-1 font-medium">{errors.language.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                Document Title
              </label>
              <input 
                {...register("title")}
                className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm font-medium"
                placeholder="e.g. Software Engineer Resume"
              />
              {errors.title && <p className="text-sm text-destructive mt-1 font-medium">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                <Settings className="w-4 h-4" />
                Resume Style
              </label>
              <div className="relative">
                <select 
                  {...register("style")}
                  className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm capitalize appearance-none font-medium cursor-pointer"
                >
                  {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <Layout className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeSection === "personal" && (
              <motion.section 
                key="personal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors"></div>
                <h2 className="text-2xl font-black tracking-tight mb-8">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                    <input 
                      {...register("personalInfo.fullName")}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm font-medium"
                      placeholder="John Doe"
                    />
                    {errors.personalInfo?.fullName && <p className="text-sm text-destructive mt-1 font-medium">{errors.personalInfo.fullName.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                    <input 
                      {...register("personalInfo.email")}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm font-medium"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                    <input 
                      {...register("personalInfo.phone")}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm font-medium"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Location</label>
                    <input 
                      {...register("personalInfo.location")}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm font-medium"
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portfolio / LinkedIn</label>
                    <input 
                      {...register("personalInfo.website")}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm font-medium"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {activeSection === "summary" && (
              <motion.section 
                key="summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                <h2 className="text-2xl font-black tracking-tight mb-8">Professional Summary</h2>
                <textarea 
                  {...register("summary")}
                  rows={10}
                  className="w-full px-6 py-4 rounded-3xl bg-background border border-border/60 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm font-medium resize-none leading-relaxed"
                  placeholder="Tell your professional story... What are your key achievements and goals?"
                />
              </motion.section>
            )}

            {activeSection === "experience" && (
              <motion.section 
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-orange-500/20 group-hover:bg-orange-500 transition-colors"></div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black tracking-tight">Work Experience</h2>
                  <button 
                    type="button" 
                    onClick={() => appendExp({ id: crypto.randomUUID(), company: "", position: "", startDate: "", endDate: "", description: "" })}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="w-4 h-4" /> Add Role
                  </button>
                </div>

                <div className="space-y-8">
                  {expFields.map((field, index) => (
                    <div 
                      key={field.id}
                      className="p-6 border border-border/60 rounded-3xl bg-background/50 relative group/item hover:border-orange-500/30 transition-colors shadow-sm"
                    >
                      <button 
                        type="button" 
                        onClick={() => removeExp(index)}
                        className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover/item:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pr-12">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Job Title</label>
                          <input 
                            {...register(`experience.${index}.position`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                            placeholder="Senior Developer"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Company Name</label>
                          <input 
                            {...register(`experience.${index}.company`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                            placeholder="Tech Corp"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Start Date</label>
                          <input 
                            {...register(`experience.${index}.startDate`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">End Date</label>
                          <input 
                            {...register(`experience.${index}.endDate`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Key Responsibilities & Achievements</label>
                        <textarea 
                          {...register(`experience.${index}.description`)}
                          rows={6}
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all resize-none leading-relaxed"
                          placeholder="Describe your achievements and impact..."
                        />
                      </div>
                    </div>
                  ))}
                  {expFields.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-border rounded-3xl bg-muted/20">
                      <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground font-medium">No work experience added yet.</p>
                      <p className="text-sm text-muted-foreground/60 mt-1">Click the "Add Role" button above to start.</p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {activeSection === "education" && (
              <motion.section 
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-violet-500/20 group-hover:bg-violet-500 transition-colors"></div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black tracking-tight">Education</h2>
                  <button 
                    type="button" 
                    onClick={() => appendEdu({ id: crypto.randomUUID(), institution: "", degree: "", startDate: "", endDate: "" })}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-violet-500 text-white rounded-2xl hover:bg-violet-600 transition-all shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>

                <div className="space-y-6">
                  {eduFields.map((field, index) => (
                    <div 
                      key={field.id}
                      className="p-6 border border-border/60 rounded-3xl bg-background/50 relative group/item hover:border-violet-500/30 transition-colors shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <button 
                        type="button" 
                        onClick={() => removeEdu(index)}
                        className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover/item:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      
                      <div className="md:col-span-2 pr-12 space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Degree / Major</label>
                        <input 
                          {...register(`education.${index}.degree`)}
                          className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
                          placeholder="B.S. Computer Science"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Institution / University</label>
                        <input 
                          {...register(`education.${index}.institution`)}
                          className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
                          placeholder="University of Technology"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Start Year</label>
                          <input 
                            {...register(`education.${index}.startDate`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
                            placeholder="2016"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">End Year</label>
                          <input 
                            {...register(`education.${index}.endDate`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
                            placeholder="2020"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {eduFields.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-border rounded-3xl bg-muted/20">
                      <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground font-medium">No education history added yet.</p>
                      <p className="text-sm text-muted-foreground/60 mt-1">Add your degrees and certificates to showcase your expertise.</p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {activeSection === "skills" && (
              <motion.section 
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors"></div>
                <h2 className="text-2xl font-black tracking-tight mb-8">Skills & Expertise</h2>
                <div className="flex gap-3 mb-8">
                  <input 
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                    className="flex-1 px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all shadow-sm font-medium"
                    placeholder="Type a skill (e.g. React) and press Enter..."
                  />
                  <button 
                    type="button"
                    onClick={addSkill}
                    className="px-6 py-3 bg-cyan-500 text-white font-bold rounded-2xl hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence>
                    {skills.map((skill, index) => (
                      <motion.div 
                        key={`${skill}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 font-bold text-sm rounded-xl border border-cyan-100 group/skill shadow-sm"
                      >
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill(index)}
                          className="text-cyan-400 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.section>
            )}

            {activeSection === "projects" && (
              <motion.section 
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-rose-500/20 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black tracking-tight">Key Projects</h2>
                  <button 
                    type="button" 
                    onClick={() => appendProj({ id: crypto.randomUUID(), name: "", description: "", link: "" })}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-rose-500 text-white rounded-2xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                <div className="space-y-6">
                  {projFields.map((field, index) => (
                    <div 
                      key={field.id}
                      className="p-6 border border-border/60 rounded-3xl bg-background/50 relative group/item hover:border-rose-500/30 transition-colors shadow-sm"
                    >
                      <button 
                        type="button" 
                        onClick={() => removeProj(index)}
                        className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover/item:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pr-12">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Project Name</label>
                          <input 
                            {...register(`projects.${index}.name`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
                            placeholder="E-commerce Platform"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Project URL (Optional)</label>
                          <input 
                            {...register(`projects.${index}.link`)}
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Project Description</label>
                        <textarea 
                          {...register(`projects.${index}.description`)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-2xl bg-background border border-border/60 text-sm font-medium focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all resize-none leading-relaxed"
                          placeholder="What did you build and which technologies did you use?"
                        />
                      </div>
                    </div>
                  ))}
                  {projFields.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-border rounded-3xl bg-muted/20">
                      <Layout className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground font-medium">No projects added yet.</p>
                      <p className="text-sm text-muted-foreground/60 mt-1">Showcase your best work by adding your favorite projects.</p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {activeSection === "hobbies" && (
              <motion.section 
                key="hobbies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-pink-500/20 group-hover:bg-pink-500 transition-colors"></div>
                <h2 className="text-2xl font-black tracking-tight mb-8">Hobbies & Interests</h2>
                <div className="flex gap-3 mb-8">
                  <input 
                    value={hobbyInput}
                    onChange={(e) => setHobbiesInput(e.target.value)}
                    onKeyDown={addHobby}
                    className="flex-1 px-5 py-3 rounded-2xl bg-background border border-border/60 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all shadow-sm font-medium"
                    placeholder="Type a hobby and press Enter..."
                  />
                  <button 
                    type="button"
                    onClick={addHobby}
                    className="px-6 py-3 bg-pink-500 text-white font-bold rounded-2xl hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/20 active:scale-95"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence>
                    {hobbies.map((hobby, index) => (
                      <motion.div 
                        key={`${hobby}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 font-bold text-sm rounded-xl border border-pink-100 group/hobby shadow-sm"
                      >
                        {hobby}
                        <button 
                          type="button" 
                          onClick={() => removeHobby(index)}
                          className="text-pink-400 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
