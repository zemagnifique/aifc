import { useQuery } from "@tanstack/react-query";
import { Video } from "@shared/schema";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { Eye, MessageSquare } from "lucide-react";

export default function LatestVideos() {
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos/latest"],
  });

  return (
    <section className="py-12 bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bebas text-4xl text-white border-l-4 border-primary pl-3">LATEST BATTLES</h2>
          <a href="#" className="text-primary hover:underline font-medium">VIEW ALL</a>
        </div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="video-container">
                  {video.youtubeId ? (
                    <YoutubeEmbed videoId={video.youtubeId} title={video.title} />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-xl">▶</span>
                        </div>
                        <p className="text-white text-sm">Video not available</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Featured battle from {new Date(video.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4 flex items-center">
                      <Eye size={16} className="mr-1" /> {video.views}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare size={16} className="mr-1" /> {video.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-white text-xl">No battle videos available</p>
          </div>
        )}
      </div>
    </section>
  );
}
