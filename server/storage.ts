import { type Resume, type InsertResume, type UpdateResumeRequest, type User, type InsertUser } from "@shared/schema";
import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "DATABASE.JSON");
const USER_DB_FILE = path.join(process.cwd(), "DATABASEUSER.JSON");

export interface IStorage {
  getResumes(userId?: string): Promise<Resume[]>;
  getResume(id: string): Promise<Resume | undefined>;
  createResume(resume: InsertResume & { userId?: string }): Promise<Resume>;
  updateResume(id: string, updates: UpdateResumeRequest): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;
  
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class JsonStorage implements IStorage {
  private async readDB<T>(file: string): Promise<T[]> {
    try {
      const data = await fs.readFile(file, "utf-8");
      return JSON.parse(data);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        await fs.writeFile(file, "[]", "utf-8");
        return [];
      }
      throw err;
    }
  }

  private async writeDB<T>(file: string, data: T[]): Promise<void> {
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
  }

  async getResumes(userId?: string): Promise<Resume[]> {
    const resumes = await this.readDB<Resume>(DB_FILE);
    if (userId) return resumes.filter(r => r.userId === userId);
    return resumes;
  }

  async getResume(id: string): Promise<Resume | undefined> {
    const resumes = await this.readDB<Resume>(DB_FILE);
    return resumes.find(r => r.id === id);
  }

  async createResume(insertResume: InsertResume & { userId?: string }): Promise<Resume> {
    const resumes = await this.readDB<Resume>(DB_FILE);
    const id = Math.random().toString(36).substring(2, 9);
    const resume: Resume = { 
      ...insertResume, 
      id, 
      createdAt: new Date().toISOString(),
      style: insertResume.style || "minimal",
      language: insertResume.language || "English",
      hobbies: insertResume.hobbies || []
    } as any;
    resumes.push(resume);
    await this.writeDB(DB_FILE, resumes);
    return resume;
  }

  async updateResume(id: string, updates: UpdateResumeRequest): Promise<Resume | undefined> {
    const resumes = await this.readDB<Resume>(DB_FILE);
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    
    resumes[index] = { ...resumes[index], ...updates } as any;
    await this.writeDB(DB_FILE, resumes);
    return resumes[index];
  }

  async deleteResume(id: string): Promise<boolean> {
    const resumes = await this.readDB<Resume>(DB_FILE);
    const index = resumes.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    resumes.splice(index, 1);
    await this.writeDB(DB_FILE, resumes);
    return true;
  }

  async getUser(id: string): Promise<User | undefined> {
    const users = await this.readDB<User>(USER_DB_FILE);
    return users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.readDB<User>(USER_DB_FILE);
    return users.find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = await this.readDB<User>(USER_DB_FILE);
    const id = Math.random().toString(36).substring(2, 9);
    const user: User = { ...insertUser, id };
    users.push(user);
    await this.writeDB(USER_DB_FILE, users);
    return user;
  }
}

export const storage = new JsonStorage();
