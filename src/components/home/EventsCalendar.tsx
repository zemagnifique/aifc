import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";

export default function EventsCalendar() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events/upcoming"],
  });

  return (
    <section id="events" className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bebas text-4xl text-white border-l-4 border-primary pl-3">UPCOMING EVENTS</h2>
          <a href="#" className="text-primary hover:underline font-medium">VIEW CALENDAR</a>
        </div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : events && events.length > 0 ? (
          <div className="bg-[#171717] rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-700">
              {events.map((event) => {
                const eventDate = new Date(event.date);
                const day = eventDate.getDate();
                const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const year = eventDate.getFullYear();
                const time = eventDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                
                return (
                  <div key={event.id} className="p-6 flex">
                    <div className="w-20 flex-shrink-0 flex flex-col items-center">
                      <span className="font-bebas text-primary text-3xl">{day}</span>
                      <span className="text-gray-400 text-sm">{month}</span>
                      <span className="text-gray-400 text-sm">{year}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-white font-medium text-lg">{event.title}</h3>
                      <p className="text-gray-400 mt-1">{event.location}</p>
                      <div className="mt-4">
                        <span className="inline-block bg-primary px-3 py-1 rounded text-white text-xs font-bold mr-2">
                          {event.type}
                        </span>
                        <span className="inline-block bg-gray-700 px-3 py-1 rounded text-white text-xs font-medium">
                          {time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-[#171717] rounded-lg p-8 text-center">
            <p className="text-white text-xl">No upcoming events scheduled</p>
          </div>
        )}
      </div>
    </section>
  );
}
