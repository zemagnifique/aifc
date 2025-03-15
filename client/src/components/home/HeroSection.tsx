import { useQuery } from "@tanstack/react-query";
import Countdown from "@/components/ui/Countdown";
import { MainEvent } from "@shared/schema";

export default function HeroSection() {
  const { data: mainEvent, isLoading } = useQuery<MainEvent>({
    queryKey: ["/api/events/main"],
  });

  return (
    <div className="hero-gradient py-16 sm:py-24 bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url('https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : mainEvent ? (
            <>
              <h1 className="font-bebas text-5xl md:text-7xl text-white tracking-widest mb-2">
                NEXT BATTLE: <span className="text-primary">{new Date(mainEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()}</span>
              </h1>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-center items-center my-10">
                  <div className="text-center md:text-right md:w-2/5 mb-6 md:mb-0">
                    <h2 className="font-anton text-4xl text-white">{mainEvent.fighter1.name.toUpperCase()}</h2>
                    <p className="text-[#6B7280] text-sm mt-1">Created by {mainEvent.fighter1.creator}</p>
                    <p className="text-white mt-2">{mainEvent.fighter1.record}</p>
                  </div>
                  <div className="relative mx-8">
                    <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center">
                      <span className="font-bebas text-white text-3xl">VS</span>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white text-[#171717] font-bold text-xs px-2 py-1 rounded mt-1">
                      MAIN EVENT
                    </div>
                  </div>
                  <div className="text-center md:text-left md:w-2/5">
                    <h2 className="font-anton text-4xl text-white">{mainEvent.fighter2.name.toUpperCase()}</h2>
                    <p className="text-[#6B7280] text-sm mt-1">Created by {mainEvent.fighter2.creator}</p>
                    <p className="text-white mt-2">{mainEvent.fighter2.record}</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <button className="bg-primary text-black px-6 py-4 rounded text-lg font-bold hover:brightness-90 transition-colors">
                  WATCH TRAILER
                </button>
              </div>
              <div className="mt-8">
                <Countdown targetDate={new Date(mainEvent.date)} />
              </div>
            </>
          ) : (
            <p className="text-white text-2xl">No upcoming events scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}
