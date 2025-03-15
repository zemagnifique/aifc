import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function SupportAdvertising() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to the backend
    toast({
      title: "Inquiry Submitted",
      description: "Thank you for your interest. We'll respond within 48 hours.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="bg-[#111111] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl md:text-7xl text-white tracking-widest mb-4">
            SUPPORT & ADVERTISING
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Join the future of AI combat sports entertainment. Partner with AIFC.tv to reach tech enthusiasts, AI developers, and gaming fans worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-[#1A1A1A] p-8 rounded-lg">
            <h2 className="font-anton text-3xl text-white mb-6">ADVERTISING OPPORTUNITIES</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-white text-xl font-bold mb-2">In-Stream Placements</h3>
                <p className="text-gray-400">Premium video ad placements before and during AI fight streams, reaching our engaged global audience.</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-white text-xl font-bold mb-2">Banner Sponsorships</h3>
                <p className="text-gray-400">Strategic banner placements throughout the AIFC.tv platform with high visibility and engagement rates.</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-white text-xl font-bold mb-2">Event Sponsorships</h3>
                <p className="text-gray-400">Become the official sponsor of AIFC events with branded content, mentions, and exclusive promotional rights.</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-white text-xl font-bold mb-2">AI Robot Branding</h3>
                <p className="text-gray-400">Sponsor AI fighters with your branding visible during all their matches and promotional content.</p>
              </div>
            </div>
            
            <div className="mt-8 bg-[#232323] p-6 rounded">
              <h3 className="text-white text-xl font-bold mb-3">Audience Demographics</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• <span className="text-white font-medium">Age:</span> 18-45 years old</li>
                <li>• <span className="text-white font-medium">Interest:</span> Technology, AI, Combat Sports, Gaming</li>
                <li>• <span className="text-white font-medium">Global Reach:</span> North America, Europe, Asia</li>
                <li>• <span className="text-white font-medium">Monthly Views:</span> 2M+ and rapidly growing</li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-[#1A1A1A] p-8 rounded-lg mb-8">
              <h2 className="font-anton text-3xl text-white mb-6">CONTACT US</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white mb-1">Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#232323] border-none text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-1">Email</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#232323] border-none text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-white mb-1">Company</label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-[#232323] border-none text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-[#232323] border-none text-white h-32"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:brightness-90 text-black font-bold py-3"
                >
                  SUBMIT INQUIRY
                </Button>
              </form>
            </div>
            
            <div className="bg-[#1A1A1A] p-8 rounded-lg">
              <h2 className="font-anton text-3xl text-white mb-6">PARTNERSHIP BENEFITS</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <p className="text-gray-400">Access to a rapidly growing technology-focused audience</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <p className="text-gray-400">Association with cutting-edge AI technology and entertainment</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <p className="text-gray-400">Customized advertising packages to meet your specific goals</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <p className="text-gray-400">Detailed analytics and performance reporting on all campaigns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}