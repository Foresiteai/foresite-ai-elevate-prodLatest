import { Pickaxe, Droplet, ShoppingCart, Factory, Heart, DollarSign, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Industries = () => {
  const industries = [
    {
      icon: Pickaxe,
      title: "Mining",
      description: "Optimize extraction processes, predictive maintenance, and resource allocation with AI-powered solutions for the mining industry.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Droplet,
      title: "Oil & Gas",
      description: "Enhance exploration, production optimization, and safety protocols with advanced AI analytics for oil and gas operations.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: ShoppingCart,
      title: "Retail",
      description: "Transform customer experience, inventory management, and demand forecasting with intelligent retail solutions.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Streamline production lines, quality control, and supply chain management with AI-driven manufacturing solutions.",
      color: "from-slate-500 to-gray-600",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Improve patient outcomes, diagnostics, and operational efficiency with healthcare-focused AI applications.",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: DollarSign,
      title: "Finance",
      description: "Enhance risk assessment, fraud detection, and financial forecasting with sophisticated AI models.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Truck,
      title: "Transportation",
      description: "Optimize logistics, route planning, and fleet management with AI-powered transportation solutions.",
      color: "from-indigo-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Industries <span className="bg-gradient-primary bg-clip-text text-transparent">We Serve</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Specialized AI solutions tailored for diverse sectors
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all border-2 hover:border-primary/50 group"
              >
                <CardHeader>
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <industry.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{industry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {industry.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Industries */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Expertise</h2>
          <p className="text-lg text-muted-foreground mb-12">
            While we serve various industries, our team specializes in AI solutions for heavy industries
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Manufacturing", "Mining", "Oil & Gas", "Transportation"].map((industry) => (
              <div
                key={industry}
                className="p-6 bg-card border-2 border-primary/20 rounded-lg hover:border-primary transition-all"
              >
                <p className="font-semibold text-lg">{industry}</p>
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
