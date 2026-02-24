import { type Resume, type InsertResume, type UpdateResumeRequest } from "@shared/schema";
import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "DATABASE.JSON");

export interface IStorage {
  getResumes(): Promise<Resume[]>;
  getResume(id: string): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: string, updates: UpdateResumeRequest): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;
}

export class JsonStorage implements IStorage {
  private async readDB(): Promise<Resume[]> {
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      return JSON.parse(data);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        await fs.writeFile(DB_FILE, "[]", "utf-8");
        return [];
      }
      throw err;
    }
  }

  private async writeDB(data: Resume[]): Promise<void> {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  }

  async getResumes(): Promise<Resume[]> {
    return this.readDB();
  }

  async getResume(id: string): Promise<Resume | undefined> {
    const resumes = await this.readDB();
    return resumes.find(r => r.id === id);
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const resumes = await this.readDB();
    const id = Math.random().toString(36).substring(2, 9);
    const resume: Resume = { 
      ...insertResume, 
      id, 
      createdAt: new Date().toISOString() 
    };
    resumes.push(resume);
    await this.writeDB(resumes);
    return resume;
  }

  async updateResume(id: string, updates: UpdateResumeRequest): Promise<Resume | undefined> {
    const resumes = await this.readDB();
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    
    resumes[index] = { ...resumes[index], ...updates };
    await this.writeDB(resumes);
    return resumes[index];
  }

  async deleteResume(id: string): Promise<boolean> {
    const resumes = await this.readDB();
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    resumes.splice(index, 1);
    await this.writeDB(resumes);
    return true;
  }
}

export const storage = new JsonStorage();