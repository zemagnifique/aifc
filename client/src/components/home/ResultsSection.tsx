import { useQuery } from "@tanstack/react-query";
import { Result } from "@shared/schema";

export default function ResultsSection() {
  const { data: results, isLoading } = useQuery<Result[]>({
    queryKey: ["/api/results/recent"],
  });

  return (
    <section id="results" className="py-12 bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bebas text-4xl text-white border-l-4 border-primary pl-3">RECENT RESULTS</h2>
          <a href="#" className="text-primary hover:underline font-medium">VIEW ALL RESULTS</a>
        </div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : results && results.length > 0 ? (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">EVENT</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">MATCH</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">WINNER</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">METHOD</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">ROUND</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-900">
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="text-white">{result.event}</div>
                        <div className="text-gray-400">{new Date(result.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="text-white">{`${result.fighter1} vs ${result.fighter2}`}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="text-[#EAB308] font-medium">{result.winner}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {result.method}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {result.round}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-white text-xl">No recent results available</p>
          </div>
        )}
      </div>
    </section>
  );
}
