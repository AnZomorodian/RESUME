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
    "vintage", "playful", "corporate", "startup", "academic", "canva", "premium",
    "emerald", "slate", "royal", "tokyo", "organic"
  ];

  const SECTIONS = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Layout },
    { id: "languages", label: "Languages", icon: Globe },
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
    <div className="flex flex-col gap-6 lg:gap-8 pb-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Resume Details</h2>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded border">
            Editing
          </div>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar gap-1 p-1 bg-muted/50 rounded-lg border">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  activeSection === section.id
                    ? "bg-background text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {activeSection === "personal" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-4 border rounded-lg bg-card/50">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language</label>
              <input 
                {...register("language")}
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all"
                placeholder="English"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Document Title</label>
              <input 
                {...register("title")}
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all"
                placeholder="Resume Title"
              />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resume Style</label>
              <select 
                {...register("style")}
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all appearance-none"
              >
                {STYLES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {activeSection === "personal" && (
            <motion.section 
              key="personal"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input 
                    {...register("personalInfo.fullName")}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all"
                    placeholder="John Doe"
                  />
                  {errors.personalInfo?.fullName && <p className="text-xs text-destructive mt-1">{errors.personalInfo.fullName.message}</p>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <input 
                    {...register("personalInfo.email")}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</label>
                  <input 
                    {...register("personalInfo.phone")}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</label>
                  <input 
                    {...register("personalInfo.location")}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all"
                    placeholder="City, State"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Website</label>
                  <input 
                    {...register("personalInfo.website")}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === "summary" && (
            <motion.section 
              key="summary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-1.5"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Professional Summary</label>
              <textarea 
                {...register("summary")}
                rows={8}
                className="w-full px-4 py-3 rounded-md bg-background border border-input text-sm focus:ring-1 focus:ring-ring transition-all resize-none leading-relaxed"
                placeholder="Briefly describe your career background and key strengths..."
              />
            </motion.section>
          )}

          {activeSection === "experience" && (
            <motion.section 
              key="experience"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Work Experience</h3>
                <button 
                  type="button" 
                  onClick={() => appendExp({ id: crypto.randomUUID(), company: "", position: "", startDate: "", endDate: "", description: "" })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Role
                </button>
              </div>

              <div className="space-y-4">
                {expFields.map((field, index) => (
                  <div 
                    key={field.id}
                    className="p-4 border border-border rounded-lg bg-card/30 relative group"
                  >
                    <button 
                      type="button" 
                      onClick={() => removeExp(index)}
                      className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Job Title</label>
                        <input 
                          {...register(`experience.${index}.position`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                          placeholder="Position"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Company</label>
                        <input 
                          {...register(`experience.${index}.company`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                          placeholder="Company"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:col-span-2">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Start</label>
                          <input 
                            {...register(`experience.${index}.startDate`)}
                            className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">End</label>
                          <input 
                            {...register(`experience.${index}.endDate`)}
                            className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                        <textarea 
                          {...register(`experience.${index}.description`)}
                          rows={4}
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-xs resize-none"
                          placeholder="Key achievements..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === "education" && (
            <motion.section 
              key="education"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Education</h3>
                <button 
                  type="button" 
                  onClick={() => appendEdu({ id: crypto.randomUUID(), institution: "", degree: "", startDate: "", endDate: "" })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </button>
              </div>

              <div className="space-y-4">
                {eduFields.map((field, index) => (
                  <div 
                    key={field.id}
                    className="p-4 border border-border rounded-lg bg-card/30 relative group"
                  >
                    <button 
                      type="button" 
                      onClick={() => removeEdu(index)}
                      className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Degree</label>
                        <input 
                          {...register(`education.${index}.degree`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                          placeholder="Degree Name"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Institution</label>
                        <input 
                          {...register(`education.${index}.institution`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                          placeholder="University"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Start</label>
                        <input 
                          {...register(`education.${index}.startDate`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                          placeholder="2016"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">End</label>
                        <input 
                          {...register(`education.${index}.endDate`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                          placeholder="2020"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === "skills" && (
            <motion.section 
              key="skills"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Skills</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  className="flex-1 px-3 py-2 rounded-md bg-background border border-input text-sm"
                  placeholder="Add a skill (Press Enter)"
                />
                <button 
                  type="button" 
                  onClick={addSkill}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium border"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(index)}>
                      <Trash2 className="w-3 h-3 hover:text-destructive" />
                    </button>
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === "projects" && (
            <motion.section 
              key="projects"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Projects</h3>
                <button 
                  type="button" 
                  onClick={() => appendProj({ id: crypto.randomUUID(), name: "", description: "", link: "" })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              <div className="space-y-4">
                {projFields.map((field, index) => (
                  <div 
                    key={field.id}
                    className="p-4 border border-border rounded-lg bg-card/30 relative group"
                  >
                    <button 
                      type="button" 
                      onClick={() => removeProj(index)}
                      className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Project Name</label>
                        <input 
                          {...register(`projects.${index}.name`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs font-semibold"
                          placeholder="Project Name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Link</label>
                        <input 
                          {...register(`projects.${index}.link`)}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                        <textarea 
                          {...register(`projects.${index}.description`)}
                          rows={3}
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs resize-none"
                          placeholder="What did you build?"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === "languages" && (
            <motion.section 
              key="languages"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Languages</h3>
                <button 
                  type="button" 
                  onClick={() => {
                    const current = form.getValues("languages") || [];
                    form.setValue("languages", [...current, { name: "", level: "Beginner" }]);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Language
                </button>
              </div>

              <div className="space-y-4">
                {(form.watch("languages") || []).map((_, index) => (
                  <div key={index} className="flex gap-4 items-end p-4 border rounded-lg bg-card/30 relative group">
                    <div className="flex-1 space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language</label>
                      <input 
                        {...register(`languages.${index}.name`)}
                        className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                        placeholder="e.g. Spanish"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Level</label>
                      <select 
                        {...register(`languages.${index}.level`)}
                        className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-xs"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Native">Native</option>
                      </select>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        const current = form.getValues("languages") || [];
                        form.setValue("languages", current.filter((__, i) => i !== index));
                      }}
                      className="p-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === "hobbies" && (
            <motion.section 
              key="hobbies"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hobbies</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={hobbyInput}
                  onChange={(e) => setHobbiesInput(e.target.value)}
                  onKeyDown={addHobby}
                  className="flex-1 px-3 py-2 rounded-md bg-background border border-input text-sm"
                  placeholder="Add a hobby"
                />
                <button 
                  type="button" 
                  onClick={addHobby}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {hobbies.map((hobby, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium border"
                  >
                    {hobby}
                    <button type="button" onClick={() => removeHobby(index)}>
                      <Trash2 className="w-3 h-3 hover:text-destructive" />
                    </button>
                  </span>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
