import { QueryClient } from "@tanstack/react-query";
import { staticApi } from "../staticApi";

const endpoints: Record<string, () => Promise<any>> = {
  '/api/events/main': staticApi.getMainEvent,
  '/api/featured-fights': staticApi.getFeaturedFights,
  '/api/upcoming-events': staticApi.getUpcomingEvents,
  '/api/recent-results': staticApi.getRecentResults,
  '/api/latest-videos': staticApi.getLatestVideos
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        const handler = endpoints[url];
        if (!handler) {
          throw new Error(`No static handler for ${url}`);
        }
        return handler();
      },
      staleTime: Infinity,
      retry: false,
    },
  },
});