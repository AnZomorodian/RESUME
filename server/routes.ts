import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.resumes.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const resumes = await storage.getResumes((req.user as any).id);
    res.json(resumes);
  });

  app.get(api.resumes.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const resume = await storage.getResume(req.params.id);
    if (!resume || resume.userId !== (req.user as any).id) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  });

  app.post(api.resumes.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const input = api.resumes.create.input.parse(req.body);
      const resume = await storage.createResume({ ...input, userId: (req.user as any).id });
      res.status(201).json(resume);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.resumes.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const existing = await storage.getResume(req.params.id);
      if (!existing || existing.userId !== (req.user as any).id) {
        return res.status(404).json({ message: 'Resume not found' });
      }
      const input = api.resumes.update.input.parse(req.body);
      const resume = await storage.updateResume(req.params.id, input);
      res.json(resume);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.resumes.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const existing = await storage.getResume(req.params.id);
    if (!existing || existing.userId !== (req.user as any).id) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    const success = await storage.deleteResume(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(204).end();
  });

  return httpServer;
}
