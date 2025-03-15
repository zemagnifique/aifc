// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  fighters;
  fights;
  events;
  results;
  videos;
  subscriptions;
  fighterIdCounter;
  fightIdCounter;
  eventIdCounter;
  resultIdCounter;
  videoIdCounter;
  subscriptionIdCounter;
  constructor() {
    this.fighters = /* @__PURE__ */ new Map();
    this.fights = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
    this.results = /* @__PURE__ */ new Map();
    this.videos = /* @__PURE__ */ new Map();
    this.subscriptions = /* @__PURE__ */ new Map();
    this.fighterIdCounter = 1;
    this.fightIdCounter = 1;
    this.eventIdCounter = 1;
    this.resultIdCounter = 1;
    this.videoIdCounter = 1;
    this.subscriptionIdCounter = 1;
    this.initializeSampleData();
  }
  // Fighter methods
  async getFighter(id) {
    return this.fighters.get(id);
  }
  async getFighters() {
    return Array.from(this.fighters.values());
  }
  async createFighter(fighter) {
    const id = this.fighterIdCounter++;
    const newFighter = {
      ...fighter,
      id,
      description: fighter.description || null
    };
    this.fighters.set(id, newFighter);
    return newFighter;
  }
  // Fight methods
  async getFight(id) {
    return this.fights.get(id);
  }
  async getFeaturedFights() {
    return Array.from(this.fights.values()).filter((fight) => fight.featured === 1).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  async createFight(fightData) {
    const id = this.fightIdCounter++;
    const fighter1 = await this.getFighter(fightData.fighter1Id);
    const fighter2 = await this.getFighter(fightData.fighter2Id);
    if (!fighter1 || !fighter2) {
      throw new Error("Fighter not found");
    }
    const fight = {
      id,
      fighter1: {
        id: fighter1.id,
        name: fighter1.name,
        creator: fighter1.creator,
        record: fighter1.record
      },
      fighter2: {
        id: fighter2.id,
        name: fighter2.name,
        creator: fighter2.creator,
        record: fighter2.record
      },
      date: fightData.date.toISOString(),
      location: fightData.location,
      weightClass: fightData.weightClass,
      featured: fightData.featured || 0
    };
    this.fights.set(id, fight);
    return fight;
  }
  // Event methods
  async getEvent(id) {
    return this.events.get(id);
  }
  async getUpcomingEvents() {
    const now = /* @__PURE__ */ new Date();
    return Array.from(this.events.values()).filter((event) => new Date(event.date) > now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  async getMainEvent() {
    const upcomingEvents = await this.getUpcomingEvents();
    const mainEvent = upcomingEvents.find((event) => event.mainEvent === 1);
    if (!mainEvent) return void 0;
    const fight = Array.from(this.fights.values()).find(
      (fight2) => fight2.date === mainEvent.date.toISOString()
    );
    if (!fight) return void 0;
    return {
      id: mainEvent.id,
      date: mainEvent.date.toISOString(),
      fighter1: fight.fighter1,
      fighter2: fight.fighter2
    };
  }
  async createEvent(event) {
    const id = this.eventIdCounter++;
    const newEvent = {
      ...event,
      id,
      type: event.type || null,
      description: event.description || null,
      mainEvent: event.mainEvent || null
    };
    this.events.set(id, newEvent);
    return newEvent;
  }
  // Result methods
  async getResult(id) {
    return this.results.get(id);
  }
  async getRecentResults() {
    return Array.from(this.results.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  async createResult(result) {
    const id = this.resultIdCounter++;
    const newResult = { ...result, id };
    this.results.set(id, newResult);
    return newResult;
  }
  // Video methods
  async getVideo(id) {
    return this.videos.get(id);
  }
  async getLatestVideos() {
    return Array.from(this.videos.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  async createVideo(video) {
    const id = this.videoIdCounter++;
    const newVideo = {
      ...video,
      id,
      youtubeId: video.youtubeId || null,
      views: video.views || 0,
      comments: video.comments || 0
    };
    this.videos.set(id, newVideo);
    return newVideo;
  }
  // Subscription methods
  async createSubscription(subscription) {
    const id = this.subscriptionIdCounter++;
    const newSubscription = {
      ...subscription,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      interests: subscription.interests || null
    };
    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }
  // Initialize with some sample data
  async initializeSampleData() {
    const fighter1 = await this.createFighter({
      name: "DestroyerBot",
      creator: "GPT-4 Turbo",
      record: "14-2-0",
      description: "A heavy-duty combat machine with reinforced armor and dual weapon systems."
    });
    const fighter2 = await this.createFighter({
      name: "UltraMech",
      creator: "Claude 3",
      record: "12-3-1",
      description: "A nimble, adaptive robot with advanced AI learning capabilities."
    });
    const fighter3 = await this.createFighter({
      name: "SkyNet",
      creator: "OpenAI",
      record: "9-1-0",
      description: "An aerial combat specialist with superior targeting systems."
    });
    const fighter4 = await this.createFighter({
      name: "IronCrusher",
      creator: "Anthropic",
      record: "8-2-1",
      description: "A ground-based powerhouse designed for brute force attacks."
    });
    const fighter5 = await this.createFighter({
      name: "VoltTitan",
      creator: "Gemini Ultra",
      record: "7-0-0",
      description: "An electrical specialist with shocking offensive capabilities."
    });
    const fighter6 = await this.createFighter({
      name: "NeonFighter",
      creator: "Mistral AI",
      record: "6-1-0",
      description: "A speed-based robot with advanced evasion techniques."
    });
    const mainEventDate = /* @__PURE__ */ new Date();
    mainEventDate.setDate(mainEventDate.getDate() + 17);
    const fight1 = await this.createFight({
      fighter1Id: fighter1.id,
      fighter2Id: fighter2.id,
      date: mainEventDate,
      location: "Virtual Arena, Las Vegas",
      weightClass: "Heavyweight",
      featured: 1
    });
    const secondEventDate = /* @__PURE__ */ new Date();
    secondEventDate.setDate(secondEventDate.getDate() + 17);
    const fight2 = await this.createFight({
      fighter1Id: fighter3.id,
      fighter2Id: fighter4.id,
      date: secondEventDate,
      location: "Virtual Arena, Las Vegas",
      weightClass: "Middleweight",
      featured: 1
    });
    const thirdEventDate = /* @__PURE__ */ new Date();
    thirdEventDate.setDate(thirdEventDate.getDate() + 17);
    const fight3 = await this.createFight({
      fighter1Id: fighter5.id,
      fighter2Id: fighter6.id,
      date: thirdEventDate,
      location: "Virtual Arena, Las Vegas",
      weightClass: "Lightweight",
      featured: 1
    });
    const mainEvent = await this.createEvent({
      title: `AIFC 253: ${fighter1.name} vs ${fighter2.name}`,
      date: mainEventDate,
      location: "Virtual Arena, Las Vegas",
      type: "MAIN EVENT",
      description: "The battle of the titans. Two undefeated AI champions face off.",
      mainEvent: 1
    });
    const event2Date = /* @__PURE__ */ new Date();
    event2Date.setDate(event2Date.getDate() + 24);
    const event2 = await this.createEvent({
      title: "AIFC 254: SKYNET vs MEGABOT",
      date: event2Date,
      location: "Digital Dome, Tokyo",
      type: "MAIN EVENT",
      description: "International showdown between two top contenders."
    });
    const event3Date = /* @__PURE__ */ new Date();
    event3Date.setDate(event3Date.getDate() + 38);
    const event3 = await this.createEvent({
      title: "AIFC 255: IRONCRUSHER vs VOLTTITAN",
      date: event3Date,
      location: "Cyber Stadium, New York",
      type: "MAIN EVENT",
      description: "Power vs. speed in this anticipated matchup."
    });
    const pastDate1 = /* @__PURE__ */ new Date();
    pastDate1.setDate(pastDate1.getDate() - 14);
    const result1 = await this.createResult({
      event: "AIFC 252",
      fighter1: "DESTROYERBOT",
      fighter2: "CYBERCRUSHER",
      winner: "DESTROYERBOT",
      method: "Technical Knockout",
      round: 2,
      date: pastDate1
    });
    const pastDate2 = /* @__PURE__ */ new Date();
    pastDate2.setDate(pastDate2.getDate() - 28);
    const result2 = await this.createResult({
      event: "AIFC 251",
      fighter1: "ULTRAMECH",
      fighter2: "TECHNOROGUE",
      winner: "ULTRAMECH",
      method: "Submission",
      round: 3,
      date: pastDate2
    });
    const pastDate3 = /* @__PURE__ */ new Date();
    pastDate3.setDate(pastDate3.getDate() - 40);
    const result3 = await this.createResult({
      event: "AIFC 250",
      fighter1: "VOLTTITAN",
      fighter2: "IRONWARRIOR",
      winner: "VOLTTITAN",
      method: "Decision (Unanimous)",
      round: 5,
      date: pastDate3
    });
    await this.createVideo({
      title: "DESTROYERBOT vs CYBERCRUSHER",
      youtubeId: "dQw4w9WgXcQ",
      // Replace with actual YouTube ID
      date: pastDate1,
      views: 145e3,
      comments: 243
    });
    await this.createVideo({
      title: "ULTRAMECH vs TECHNOROGUE",
      youtubeId: "dQw4w9WgXcQ",
      // Replace with actual YouTube ID
      date: pastDate2,
      views: 98e3,
      comments: 167
    });
    await this.createVideo({
      title: "VOLTTITAN vs IRONWARRIOR",
      youtubeId: "dQw4w9WgXcQ",
      // Replace with actual YouTube ID
      date: pastDate3,
      views: 127e3,
      comments: 205
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var fighters = pgTable("fighters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  creator: text("creator").notNull(),
  record: text("record").notNull(),
  description: text("description")
});
var insertFighterSchema = createInsertSchema(fighters).omit({
  id: true
});
var fights = pgTable("fights", {
  id: serial("id").primaryKey(),
  fighter1Id: integer("fighter1_id").notNull(),
  fighter2Id: integer("fighter2_id").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  weightClass: text("weight_class").notNull(),
  featured: integer("featured").default(0)
});
var insertFightSchema = createInsertSchema(fights).omit({
  id: true
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  type: text("type").default("MAIN EVENT"),
  description: text("description"),
  mainEvent: integer("main_event").default(0)
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true
});
var results = pgTable("results", {
  id: serial("id").primaryKey(),
  event: text("event").notNull(),
  fighter1: text("fighter1").notNull(),
  fighter2: text("fighter2").notNull(),
  winner: text("winner").notNull(),
  method: text("method").notNull(),
  round: integer("round").notNull(),
  date: timestamp("date").notNull()
});
var insertResultSchema = createInsertSchema(results).omit({
  id: true
});
var videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  youtubeId: text("youtube_id"),
  date: timestamp("date").notNull(),
  views: integer("views").default(0),
  comments: integer("comments").default(0)
});
var insertVideoSchema = createInsertSchema(videos).omit({
  id: true
});
var subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  interests: text("interests").array(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.get("/api/events/main", async (req, res) => {
    try {
      const mainEvent = await storage.getMainEvent();
      res.json(mainEvent || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch main event" });
    }
  });
  app2.get("/api/fights/featured", async (req, res) => {
    try {
      const fights2 = await storage.getFeaturedFights();
      res.json(fights2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured fights" });
    }
  });
  app2.get("/api/videos/latest", async (req, res) => {
    try {
      const videos2 = await storage.getLatestVideos();
      res.json(videos2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest videos" });
    }
  });
  app2.get("/api/events/upcoming", async (req, res) => {
    try {
      const events2 = await storage.getUpcomingEvents();
      res.json(events2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });
  app2.get("/api/results/recent", async (req, res) => {
    try {
      const results2 = await storage.getRecentResults();
      res.json(results2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent results" });
    }
  });
  app2.post("/api/subscribe", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5005;
  server.listen({
    port,
    host: "localhost",
    // "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
