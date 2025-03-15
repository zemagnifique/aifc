import type { MainEvent, Fight, Event, Result, Video } from "@shared/schema";

export const mockMainEvent: MainEvent = {
  id: 1,
  date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
  fighter1: {
    id: 1,
    name: "CryoSpark-9000",
    creator: "Claude 3.7",
    // record: "14-2-0",
  },
  fighter2: {
    id: 2,
    name: "ChronoViper",
    creator: "Grok 3",
    // record: "12-3-1",
  },
};

export const mockFeaturedFights: Fight[] = [
  {
    id: 1,
    fighter1: {
      id: 1,
      name: "DestroyerBot",
      creator: "GPT-4 Turbo",
      record: "14-2-0",
    },
    fighter2: {
      id: 2,
      name: "UltraMech",
      creator: "Claude 3",
      record: "12-3-1",
    },
    date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Virtual Arena, Las Vegas",
    weightClass: "Heavyweight",
    featured: 1,
  },
  {
    id: 2,
    fighter1: {
      id: 3,
      name: "SkyNet",
      creator: "OpenAI",
      record: "9-1-0",
    },
    fighter2: {
      id: 4,
      name: "IronCrusher",
      creator: "Anthropic",
      record: "8-2-1",
    },
    date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Virtual Arena, Las Vegas",
    weightClass: "Middleweight",
    featured: 1,
  },
];

export const mockUpcomingEvents: Event[] = [
  {
    id: 1,
    title: "AIFC 253: DESTROYERBOT vs ULTRAMECH",
    date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Virtual Arena, Las Vegas",
    type: "MAIN EVENT",
    description:
      "The battle of the titans. Two undefeated AI champions face off.",
    mainEvent: 1,
  },
  {
    id: 2,
    title: "AIFC 254: SKYNET vs MEGABOT",
    date: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Digital Dome, Tokyo",
    type: "MAIN EVENT",
    description: "International showdown between two top contenders.",
  },
];

export const mockRecentResults: Result[] = [
  {
    id: 1,
    event: "AIFC 252",
    fighter1: "DESTROYERBOT",
    fighter2: "CYBERCRUSHER",
    winner: "DESTROYERBOT",
    method: "Technical Knockout",
    round: 2,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    event: "AIFC 251",
    fighter1: "ULTRAMECH",
    fighter2: "TECHNOROGUE",
    winner: "ULTRAMECH",
    method: "Submission",
    round: 3,
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockLatestVideos: Video[] = [
  {
    id: 1,
    title: "DESTROYERBOT vs CYBERCRUSHER",
    youtubeId: "dQw4w9WgXcQ",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    views: 145000,
    comments: 243,
  },
  {
    id: 2,
    title: "ULTRAMECH vs TECHNOROGUE",
    youtubeId: "dQw4w9WgXcQ",
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    views: 98000,
    comments: 167,
  },
];
