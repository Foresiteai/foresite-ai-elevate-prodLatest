import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import industrialAI from "@/assets/industrial-ai.jpg";
import aiConsulting from "@/assets/ai-consulting.jpg";
import aiStrategy from "@/assets/ai-strategy.jpg";
import customAIModel from "@/assets/custom-ai-model.jpg";
import processAutomation from "@/assets/process-automation.jpg";
import predictiveAnalytics from "@/assets/predictive-analytics.jpg";
import computerVision from "@/assets/computer-vision.jpg";
import nlpAI from "@/assets/nlp-ai.jpg";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image_url?: string;
}

const serviceImages: Record<string, string> = {
  "AI Strategy & Consulting": aiStrategy,
  "Custom AI Model Development": customAIModel,
  "Process Automation": processAutomation,
  "Predictive Analytics": predictiveAnalytics,
  "Computer Vision Solutions": computerVision,
  "Natural Language Processing": nlpAI,
};

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.MessageSquare;
    return Icon;
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={aiConsulting} 
            alt="AI Services" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-secondary/30"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Our <span className="gradient-text drop-shadow-2xl">Services</span>
          </h1>
          <p className="text-2xl text-foreground/90 font-medium drop-shadow-md">
            Comprehensive AI solutions designed to transform your business operations
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center">Loading services...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = getIcon(service.icon);
                const serviceImage = serviceImages[service.title];
                return (
                  <Card 
                    key={service.id} 
                    onClick={() => handleServiceClick(service.id)}
                    className="hover:shadow-xl transition-all border-2 hover:border-primary/50 group overflow-hidden hover-lift animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {serviceImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={serviceImage} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gradient-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section with Image */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift">
              <img 
                src={industrialAI} 
                alt="Industrial AI Solutions" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </div>
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Industry-Leading AI Implementation
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our comprehensive approach ensures seamless integration of AI technologies into your existing workflows, maximizing efficiency and ROI.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Proven Methodology</h3>
                    <p className="text-muted-foreground">Battle-tested implementation strategies that deliver results</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Continuous Support</h3>
                    <p className="text-muted-foreground">Ongoing assistance to ensure long-term success</p>
                  </div>
                </li>
              </ul>
              <Link to="/contact">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all hover-lift">
            <div className="bg-gradient-primary p-1">
              <CardContent className="bg-background p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore Cutting-Edge AI Consulting
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ready to transform your business with AI? Book a consultation with our experts today.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="text-base px-8 shadow-lg hover:shadow-xl transition-all">
                    Book Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
