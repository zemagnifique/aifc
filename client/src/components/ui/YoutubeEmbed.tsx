interface YoutubeEmbedProps {
  videoId: string;
  title?: string;
}

export default function YoutubeEmbed({ videoId, title = "YouTube video player" }: YoutubeEmbedProps) {
  return (
    <div className="video-container relative w-full pb-[56.25%] h-0 overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
