import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertSubscriptionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for getting the main event
  app.get("/api/events/main", async (req, res) => {
    try {
      const mainEvent = await storage.getMainEvent();
      res.json(mainEvent || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch main event" });
    }
  });

  // API route for getting featured fights
  app.get("/api/fights/featured", async (req, res) => {
    try {
      const fights = await storage.getFeaturedFights();
      res.json(fights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured fights" });
    }
  });

  // API route for getting latest videos
  app.get("/api/videos/latest", async (req, res) => {
    try {
      const videos = await storage.getLatestVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest videos" });
    }
  });

  // API route for getting upcoming events
  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });

  // API route for getting recent results
  app.get("/api/results/recent", async (req, res) => {
    try {
      const results = await storage.getRecentResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent results" });
    }
  });

  // API route for subscribing to updates
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriptionSchema.parse(req.body);
      const subscription = await storage.createSubscription(data);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to create subscription" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
