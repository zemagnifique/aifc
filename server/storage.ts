import {
  Fighter, InsertFighter,
  Fight, InsertFight,
  Event, InsertEvent,
  Result, InsertResult,
  Video, InsertVideo,
  Subscription, InsertSubscription,
  MainEvent
} from "@shared/schema";

export interface IStorage {
  // Fighter methods
  getFighter(id: number): Promise<Fighter | undefined>;
  getFighters(): Promise<Fighter[]>;
  createFighter(fighter: InsertFighter): Promise<Fighter>;
  
  // Fight methods
  getFight(id: number): Promise<Fight | undefined>;
  getFeaturedFights(): Promise<Fight[]>;
  createFight(fight: InsertFight): Promise<Fight>;
  
  // Event methods
  getEvent(id: number): Promise<Event | undefined>;
  getUpcomingEvents(): Promise<Event[]>;
  getMainEvent(): Promise<MainEvent | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Result methods
  getResult(id: number): Promise<Result | undefined>;
  getRecentResults(): Promise<Result[]>;
  createResult(result: InsertResult): Promise<Result>;
  
  // Video methods
  getVideo(id: number): Promise<Video | undefined>;
  getLatestVideos(): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  // Subscription methods
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
}

export class MemStorage implements IStorage {
  private fighters: Map<number, Fighter>;
  private fights: Map<number, Fight>;
  private events: Map<number, Event>;
  private results: Map<number, Result>;
  private videos: Map<number, Video>;
  private subscriptions: Map<number, Subscription>;
  
  private fighterIdCounter: number;
  private fightIdCounter: number;
  private eventIdCounter: number;
  private resultIdCounter: number;
  private videoIdCounter: number;
  private subscriptionIdCounter: number;

  constructor() {
    this.fighters = new Map();
    this.fights = new Map();
    this.events = new Map();
    this.results = new Map();
    this.videos = new Map();
    this.subscriptions = new Map();
    
    this.fighterIdCounter = 1;
    this.fightIdCounter = 1;
    this.eventIdCounter = 1;
    this.resultIdCounter = 1;
    this.videoIdCounter = 1;
    this.subscriptionIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // Fighter methods
  async getFighter(id: number): Promise<Fighter | undefined> {
    return this.fighters.get(id);
  }
  
  async getFighters(): Promise<Fighter[]> {
    return Array.from(this.fighters.values());
  }
  
  async createFighter(fighter: InsertFighter): Promise<Fighter> {
    const id = this.fighterIdCounter++;
    const newFighter: Fighter = { 
      ...fighter, 
      id,
      description: fighter.description || null 
    };
    this.fighters.set(id, newFighter);
    return newFighter;
  }
  
  // Fight methods
  async getFight(id: number): Promise<Fight | undefined> {
    return this.fights.get(id);
  }
  
  async getFeaturedFights(): Promise<Fight[]> {
    return Array.from(this.fights.values())
      .filter(fight => fight.featured === 1)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  
  async createFight(fightData: InsertFight): Promise<Fight> {
    const id = this.fightIdCounter++;
    
    const fighter1 = await this.getFighter(fightData.fighter1Id);
    const fighter2 = await this.getFighter(fightData.fighter2Id);
    
    if (!fighter1 || !fighter2) {
      throw new Error("Fighter not found");
    }
    
    const fight: Fight = {
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
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  
  async getMainEvent(): Promise<MainEvent | undefined> {
    const upcomingEvents = await this.getUpcomingEvents();
    const mainEvent = upcomingEvents.find(event => event.mainEvent === 1);
    
    if (!mainEvent) return undefined;
    
    // Find the corresponding fight for this event
    const fight = Array.from(this.fights.values()).find(
      fight => fight.date === mainEvent.date.toISOString()
    );
    
    if (!fight) return undefined;
    
    return {
      id: mainEvent.id,
      date: mainEvent.date.toISOString(),
      fighter1: fight.fighter1,
      fighter2: fight.fighter2
    };
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const newEvent: Event = { 
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
  async getResult(id: number): Promise<Result | undefined> {
    return this.results.get(id);
  }
  
  async getRecentResults(): Promise<Result[]> {
    return Array.from(this.results.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createResult(result: InsertResult): Promise<Result> {
    const id = this.resultIdCounter++;
    const newResult: Result = { ...result, id };
    this.results.set(id, newResult);
    return newResult;
  }
  
  // Video methods
  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }
  
  async getLatestVideos(): Promise<Video[]> {
    return Array.from(this.videos.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createVideo(video: InsertVideo): Promise<Video> {
    const id = this.videoIdCounter++;
    const newVideo: Video = { 
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
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const id = this.subscriptionIdCounter++;
    const newSubscription: Subscription = { 
      ...subscription, 
      id, 
      createdAt: new Date(),
      interests: subscription.interests || null
    };
    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }

  // Initialize with some sample data
  private async initializeSampleData() {
    // Create sample fighters
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
    
    // Create sample fights
    const mainEventDate = new Date();
    mainEventDate.setDate(mainEventDate.getDate() + 17); // 17 days from now
    
    const fight1 = await this.createFight({
      fighter1Id: fighter1.id,
      fighter2Id: fighter2.id,
      date: mainEventDate,
      location: "Virtual Arena, Las Vegas",
      weightClass: "Heavyweight",
      featured: 1
    });
    
    const secondEventDate = new Date();
    secondEventDate.setDate(secondEventDate.getDate() + 17); // Same day as main event
    
    const fight2 = await this.createFight({
      fighter1Id: fighter3.id,
      fighter2Id: fighter4.id,
      date: secondEventDate,
      location: "Virtual Arena, Las Vegas",
      weightClass: "Middleweight",
      featured: 1
    });
    
    const thirdEventDate = new Date();
    thirdEventDate.setDate(thirdEventDate.getDate() + 17); // Same day as main event
    
    const fight3 = await this.createFight({
      fighter1Id: fighter5.id,
      fighter2Id: fighter6.id,
      date: thirdEventDate,
      location: "Virtual Arena, Las Vegas",
      weightClass: "Lightweight",
      featured: 1
    });
    
    // Create events
    const mainEvent = await this.createEvent({
      title: `AIFC 253: ${fighter1.name} vs ${fighter2.name}`,
      date: mainEventDate,
      location: "Virtual Arena, Las Vegas",
      type: "MAIN EVENT",
      description: "The battle of the titans. Two undefeated AI champions face off.",
      mainEvent: 1
    });
    
    const event2Date = new Date();
    event2Date.setDate(event2Date.getDate() + 24); // 24 days from now
    
    const event2 = await this.createEvent({
      title: "AIFC 254: SKYNET vs MEGABOT",
      date: event2Date,
      location: "Digital Dome, Tokyo",
      type: "MAIN EVENT",
      description: "International showdown between two top contenders."
    });
    
    const event3Date = new Date();
    event3Date.setDate(event3Date.getDate() + 38); // 38 days from now
    
    const event3 = await this.createEvent({
      title: "AIFC 255: IRONCRUSHER vs VOLTTITAN",
      date: event3Date,
      location: "Cyber Stadium, New York",
      type: "MAIN EVENT",
      description: "Power vs. speed in this anticipated matchup."
    });
    
    // Create results
    const pastDate1 = new Date();
    pastDate1.setDate(pastDate1.getDate() - 14); // 14 days ago
    
    const result1 = await this.createResult({
      event: "AIFC 252",
      fighter1: "DESTROYERBOT",
      fighter2: "CYBERCRUSHER",
      winner: "DESTROYERBOT",
      method: "Technical Knockout",
      round: 2,
      date: pastDate1
    });
    
    const pastDate2 = new Date();
    pastDate2.setDate(pastDate2.getDate() - 28); // 28 days ago
    
    const result2 = await this.createResult({
      event: "AIFC 251",
      fighter1: "ULTRAMECH",
      fighter2: "TECHNOROGUE",
      winner: "ULTRAMECH",
      method: "Submission",
      round: 3,
      date: pastDate2
    });
    
    const pastDate3 = new Date();
    pastDate3.setDate(pastDate3.getDate() - 40); // 40 days ago
    
    const result3 = await this.createResult({
      event: "AIFC 250",
      fighter1: "VOLTTITAN",
      fighter2: "IRONWARRIOR",
      winner: "VOLTTITAN",
      method: "Decision (Unanimous)",
      round: 5,
      date: pastDate3
    });
    
    // Create videos
    await this.createVideo({
      title: "DESTROYERBOT vs CYBERCRUSHER",
      youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      date: pastDate1,
      views: 145000,
      comments: 243
    });
    
    await this.createVideo({
      title: "ULTRAMECH vs TECHNOROGUE",
      youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      date: pastDate2,
      views: 98000,
      comments: 167
    });
    
    await this.createVideo({
      title: "VOLTTITAN vs IRONWARRIOR",
      youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      date: pastDate3,
      views: 127000,
      comments: 205
    });
  }
}

export const storage = new MemStorage();