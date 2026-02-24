import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { CreateResumeRequest } from "@shared/schema";
import { Trash2, Plus, GripVertical, User, FileText, Briefcase, GraduationCap, Code, Layout, Heart, Globe, Settings } from "lucide-react";
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

  // Skills is a flat array of strings, handled slightly differently
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
    "vintage", "playful", "corporate", "startup", "academic"
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
        {/* Basics & Style - Always visible or as a separate section? Let's keep it visible at top for now or make it a section */}
        <section className="bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Document Settings</h2>
            <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
              Draft
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                Language
              </label>
              <input 
                {...register("language")}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. English"
              />
              {errors.language && <p className="text-sm text-destructive mt-1">{errors.language.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Document Title
              </label>
              <input 
                {...register("title")}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. Software Engineer Resume"
              />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4 text-muted-foreground" />
                Resume Style
              </label>
              <select 
                {...register("style")}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all capitalize appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat"
              >
                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </section>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeSection === "personal" && (
              <motion.section 
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1.5">Full Name</label>
                    <input 
                      {...register("personalInfo.fullName")}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="John Doe"
                    />
                    {errors.personalInfo?.fullName && <p className="text-sm text-destructive mt-1">{errors.personalInfo.fullName.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input 
                      {...register("personalInfo.email")}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone</label>
                    <input 
                      {...register("personalInfo.phone")}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Location</label>
                    <input 
                      {...register("personalInfo.location")}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Website / LinkedIn</label>
                    <input 
                      {...register("personalInfo.website")}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {activeSection === "summary" && (
              <motion.section 
                key="summary"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <h2 className="text-xl font-bold mb-6">Professional Summary</h2>
                <textarea 
                  {...register("summary")}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all resize-y"
                  placeholder="Brief overview of your professional background and goals..."
                />
              </motion.section>
            )}

            {activeSection === "experience" && (
              <motion.section 
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Experience</h2>
                  <button 
                    type="button" 
                    onClick={() => appendExp({ id: crypto.randomUUID(), company: "", position: "", startDate: "", endDate: "", description: "" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Role
                  </button>
                </div>

                <div className="space-y-6">
                  {expFields.map((field, index) => (
                    <div 
                      key={field.id}
                      className="p-5 border border-border rounded-xl bg-background/50 relative group"
                    >
                      <button 
                        type="button" 
                        onClick={() => removeExp(index)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-6">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Position</label>
                          <input 
                            {...register(`experience.${index}.position`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                            placeholder="Senior Developer"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Company</label>
                          <input 
                            {...register(`experience.${index}.company`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                            placeholder="Tech Corp"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Start Date</label>
                          <input 
                            {...register(`experience.${index}.startDate`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">End Date</label>
                          <input 
                            {...register(`experience.${index}.endDate`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">Description</label>
                        <textarea 
                          {...register(`experience.${index}.description`)}
                          rows={4}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                          placeholder="Describe your achievements and responsibilities..."
                        />
                      </div>
                    </div>
                  ))}
                  {expFields.length === 0 && (
                    <p className="text-center text-muted-foreground py-8 border-2 border-dashed border-border rounded-xl">No experience added yet.</p>
                  )}
                </div>
              </motion.section>
            )}

            {activeSection === "education" && (
              <motion.section 
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Education</h2>
                  <button 
                    type="button" 
                    onClick={() => appendEdu({ id: crypto.randomUUID(), institution: "", degree: "", startDate: "", endDate: "" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>

                <div className="space-y-4">
                  {eduFields.map((field, index) => (
                    <div 
                      key={field.id}
                      className="p-5 border border-border rounded-xl bg-background/50 relative group grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <button 
                        type="button" 
                        onClick={() => removeEdu(index)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors md:opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="md:col-span-2 pr-6">
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">Degree / Program</label>
                        <input 
                          {...register(`education.${index}.degree`)}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                          placeholder="B.S. Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">Institution</label>
                        <input 
                          {...register(`education.${index}.institution`)}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                          placeholder="University of Technology"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Start</label>
                          <input 
                            {...register(`education.${index}.startDate`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                            placeholder="2016"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">End</label>
                          <input 
                            {...register(`education.${index}.endDate`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <h2 className="text-xl font-bold mb-6">Skills</h2>
                <div className="flex gap-2 mb-4">
                  <input 
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Type a skill and press Enter..."
                  />
                  <button 
                    type="button"
                    onClick={addSkill}
                    className="px-5 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {skills.map((skill, index) => (
                      <motion.div 
                        key={`${skill}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary font-medium text-sm rounded-lg"
                      >
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill(index)}
                          className="hover:text-destructive transition-colors ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.section>
            )}

            {activeSection === "hobbies" && (
              <motion.section 
                key="hobbies"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <h2 className="text-xl font-bold mb-6">Hobbies & Interests</h2>
                <div className="flex gap-2 mb-4">
                  <input 
                    value={hobbyInput}
                    onChange={(e) => setHobbiesInput(e.target.value)}
                    onKeyDown={addHobby}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Type a hobby and press Enter..."
                  />
                  <button 
                    type="button"
                    onClick={addHobby}
                    className="px-5 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {hobbies.map((hobby, index) => (
                      <motion.div 
                        key={`${hobby}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary font-medium text-sm rounded-lg"
                      >
                        {hobby}
                        <button 
                          type="button" 
                          onClick={() => removeHobby(index)}
                          className="hover:text-destructive transition-colors ml-1"
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Projects</h2>
                  <button 
                    type="button" 
                    onClick={() => appendProj({ id: crypto.randomUUID(), name: "", description: "", link: "" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                <div className="space-y-4">
                  {projFields.map((field, index) => (
                    <div 
                      key={field.id}
                      className="p-5 border border-border rounded-xl bg-background/50 relative group space-y-4"
                    >
                      <button 
                        type="button" 
                        onClick={() => removeProj(index)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-6">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Project Name</label>
                          <input 
                            {...register(`projects.${index}.name`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                            placeholder="E-commerce Platform"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Link (Optional)</label>
                          <input 
                            {...register(`projects.${index}.link`)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">Description</label>
                        <textarea 
                          {...register(`projects.${index}.description`)}
                          rows={4}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
                          placeholder="What did you build?"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
