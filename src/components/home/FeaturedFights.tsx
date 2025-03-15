import { useQuery } from "@tanstack/react-query";
import { Fight } from "@shared/schema";

export default function FeaturedFights() {
  const { data: fights, isLoading } = useQuery<Fight[]>({
    queryKey: ["/api/fights/featured"],
  });

  return (
    <section id="fights" className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bebas text-4xl text-white border-l-4 border-primary pl-3">
            FEATURED FIGHTS
          </h2>
          <a href="#" className="text-primary hover:underline font-medium">
            VIEW ALL
          </a>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : fights && fights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fights.map((fight) => (
              <div
                key={fight.id}
                className="event-card bg-[#171717] rounded-lg overflow-hidden shadow-lg hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-[0_10px_25px_-5px_rgba(220,38,38,0.4)]"
              >
                <div className="bg-gradient-to-r from-primary to-gold-800 py-2 px-4">
                  <span className="text-white font-medium">
                    {new Date(fight.date)
                      .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="h-24 w-24 rounded-full bg-gray-800 mx-auto border-2 border-primary flex items-center justify-center text-4xl text-white font-anton">
                        {fight.fighter1.name.charAt(0)}
                      </div>
                      <h3 className="text-white font-anton mt-2">
                        {fight.fighter1.name.toUpperCase()}
                      </h3>
                      <p className="text-[#EAB308] text-sm">
                        {fight.fighter1.record}
                      </p>
                    </div>
                    <div className="font-bebas text-white text-3xl">VS</div>
                    <div className="text-center">
                      <div className="h-24 w-24 rounded-full bg-gray-800 mx-auto border-2 border-primary flex items-center justify-center text-4xl text-white font-anton">
                        {fight.fighter2.name.charAt(0)}
                      </div>
                      <h3 className="text-white font-anton mt-2">
                        {fight.fighter2.name.toUpperCase()}
                      </h3>
                      <p className="text-[#EAB308] text-sm">
                        {fight.fighter2.record}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Weight Class</span>
                      <span className="text-white">{fight.weightClass}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Location</span>
                      <span className="text-white">{fight.location}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-red-700 transition-colors">
                      MATCH DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#171717] rounded-lg p-8 text-center">
            <p className="text-white text-xl">No featured fights available</p>
          </div>
        )}
      </div>
    </section>
  );
}
