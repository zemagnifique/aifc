import HeroSection from "@/components/home/HeroSection";
import FeaturedFights from "@/components/home/FeaturedFights";
import LatestVideos from "@/components/home/LatestVideos";
import EventsCalendar from "@/components/home/EventsCalendar";
import ResultsSection from "@/components/home/ResultsSection";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedFights />
      <LatestVideos />
      <EventsCalendar />
      <ResultsSection />
      <AboutSection />
    </div>
  );
}
