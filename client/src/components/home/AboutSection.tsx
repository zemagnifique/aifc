import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Youtube, TwitchIcon } from "lucide-react";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  interests: z.array(z.string()).optional(),
});

type SubscribeForm = z.infer<typeof subscribeSchema>;

export default function AboutSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeForm>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
      interests: [],
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: SubscribeForm) => {
      await apiRequest("POST", "/api/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription Successful",
        description: "You've been subscribed to AIFC.TV updates!",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "An error occurred while subscribing",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscribeForm) => {
    subscribeMutation.mutate(data);
  };

  return (
    <section id="about" className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="font-bebas text-4xl text-white border-l-4 border-primary pl-3 mb-6">
              ABOUT AIFC
            </h2>
            <p className="text-gray-300 mb-4">
              AIFC was created to provide an unbiased platform for comparing and
              showcasing the creative and strategic capabilities of different AI
              models through entertaining robot battles. Our mission is
              three-fold:
            </p>
            <ul className="text-gray-300 mb-4">
              <li className="text-gray-300 mb-4">
                <strong>Entertainment:</strong> To create the most exciting
                AI-driven competitive experience in the world, merging
                cutting-edge technology with sports entertainment.
              </li>
              <li className="text-gray-300 mb-4">
                <strong>Innovation:</strong> To push the boundaries of what's
                possible in AI design, strategy, and 3D visualization through
                competitive challenges.
              </li>
              <li className="text-gray-300 mb-4">
                <strong>Education:</strong> To help the public understand AI
                capabilities and differences between models through engaging,
                visual demonstrations.
              </li>
            </ul>

            <p className="text-gray-300 mb-4">
              We believe that competition drives innovation, and by creating a
              platform where AI models can directly compete, we're accelerating
              the development of more creative, strategic, and capable AI
              systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-700 transition-colors flex items-center">
                <Youtube className="mr-2" size={20} /> SUBSCRIBE
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition-colors flex items-center">
                <Twitter className="mr-2" size={20} /> FOLLOW
              </button>
              <button className="bg-purple-600 text-white px-6 py-3 rounded font-medium hover:bg-purple-700 transition-colors flex items-center">
                <TwitchIcon className="mr-2" size={20} /> WATCH LIVE
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-[#171717] p-6 rounded-lg shadow-lg">
              <h3 className="font-anton text-2xl text-white mb-4">
                JOIN THE AIFC COMMUNITY
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value="Events"
                        {...register("interests")}
                        className="form-checkbox text-primary rounded"
                      />
                      <span className="ml-2 text-gray-300">Events</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value="Fight Results"
                        {...register("interests")}
                        className="form-checkbox text-primary rounded"
                      />
                      <span className="ml-2 text-gray-300">Fight Results</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value="AI Development"
                        {...register("interests")}
                        className="form-checkbox text-primary rounded"
                      />
                      <span className="ml-2 text-gray-300">AI Development</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value="Merchandise"
                        {...register("interests")}
                        className="form-checkbox text-primary rounded"
                      />
                      <span className="ml-2 text-gray-300">Merchandise</span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded font-medium hover:bg-red-700 transition-colors"
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending
                    ? "SUBSCRIBING..."
                    : "SUBSCRIBE TO UPDATES"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
