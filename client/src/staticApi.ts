
import { mockMainEvent, mockFeaturedFights, mockUpcomingEvents, mockRecentResults, mockLatestVideos } from './mockData';

export const staticApi = {
  getMainEvent: () => Promise.resolve(mockMainEvent),
  getFeaturedFights: () => Promise.resolve(mockFeaturedFights),
  getUpcomingEvents: () => Promise.resolve(mockUpcomingEvents),
  getRecentResults: () => Promise.resolve(mockRecentResults),
  getLatestVideos: () => Promise.resolve(mockLatestVideos)
};
