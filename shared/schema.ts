import { pgTable, text, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumes = pgTable("resumes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  style: text("style").notNull().default("minimal"),
  language: text("language").notNull().default("English"),
  personalInfo: json("personal_info").notNull(),
  summary: text("summary").notNull(),
  experience: json("experience").notNull(),
  education: json("education").notNull(),
  skills: json("skills").notNull(),
  projects: json("projects").notNull(),
  hobbies: json("hobbies").notNull().default([]),
  createdAt: text("created_at").notNull(),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({ id: true, createdAt: true });

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

// Strict JSON schemas for the frontend forms
export const personalInfoZod = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const experienceZod = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const educationZod = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  startDate: z.string(),
  endDate: z.string(),
});

export const projectZod = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string(),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// Extend the insert schema to use these strict JSON types
export const createResumeRequestSchema = insertResumeSchema.extend({
  personalInfo: personalInfoZod,
  experience: z.array(experienceZod),
  education: z.array(educationZod),
  skills: z.array(z.string()),
  projects: z.array(projectZod),
  hobbies: z.array(z.string()).default([]),
  style: z.enum([
    "minimal", "modern", "classic", "creative", "professional", 
    "elegant", "bold", "clean", "tech", "executive",
    "vintage", "playful", "corporate", "startup", "academic"
  ]).default("minimal"),
});

export type CreateResumeRequest = z.infer<typeof createResumeRequestSchema>;
export type UpdateResumeRequest = Partial<CreateResumeRequest>;
