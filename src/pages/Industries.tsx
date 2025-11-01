import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pickaxe, Droplet, ShoppingCart, Factory, Heart, DollarSign, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import miningAI from "@/assets/mining-ai.jpg";
import oilGasAI from "@/assets/oil-gas-ai.jpg";
import industrialAI from "@/assets/industrial-ai.jpg";

interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string | null;
}

const Industries = () => {
  const navigate = useNavigate();
  const [dbIndustries, setDbIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    const { data } = await supabase
      .from("industries")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (data) {
      setDbIndustries(data);
    }
    setLoading(false);
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Pickaxe,
      Droplet,
      ShoppingCart,
      Factory,
      Heart,
      DollarSign,
      Truck,
    };
    return icons[iconName] || Factory;
  };

  const getColorGradient = (name: string) => {
    const gradients: Record<string, string> = {
      "Mining": "from-amber-500 to-orange-600",
      "Oil & Gas": "from-blue-500 to-cyan-600",
      "Retail": "from-purple-500 to-pink-600",
      "Manufacturing": "from-slate-500 to-gray-600",
      "Healthcare": "from-red-500 to-rose-600",
      "Finance": "from-green-500 to-emerald-600",
      "Supply Chain": "from-indigo-500 to-blue-600",
    };
    return gradients[name] || "from-blue-500 to-cyan-600";
  };

  const handleIndustryClick = (industryId: string) => {
    navigate(`/industries/${industryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={industrialAI} 
            alt="Industries" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-primary/30"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Industries <span className="gradient-text drop-shadow-2xl">We Serve</span>
          </h1>
          <p className="text-2xl text-foreground/90 font-medium drop-shadow-md">
            Specialized AI solutions tailored for diverse sectors
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dbIndustries.map((industry, index) => {
                const IconComponent = getIconComponent(industry.icon);
                const colorGradient = getColorGradient(industry.name);
                
                return (
                  <Card
                    key={industry.id}
                    onClick={() => handleIndustryClick(industry.id)}
                    className="hover:shadow-xl transition-all border-2 hover:border-primary/50 group overflow-hidden hover-lift animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {industry.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={industry.image_url} 
                          alt={industry.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                      </div>
                    )}
                    <CardHeader>
                      <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${colorGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{industry.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {industry.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Focus Industries */}
      <section className="py-20 px-4 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-fade-in-up">Our Core Expertise</h2>
          <p className="text-lg text-white/90 mb-12 animate-fade-in-up">
            While we serve various industries, our team specializes in AI solutions for heavy industries
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Manufacturing", "Mining", "Oil & Gas", "Supply Chain"].map((industry, index) => (
              <div
                key={industry}
                className="p-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg hover:bg-white/20 transition-all hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="font-semibold text-lg text-white">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;
