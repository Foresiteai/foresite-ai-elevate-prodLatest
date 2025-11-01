import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import * as LucideIcons from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
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
}

const serviceImages: Record<string, string> = {
  "AI Strategy & Consulting": aiStrategy,
  "Custom AI Model Development": customAIModel,
  "Process Automation": processAutomation,
  "Predictive Analytics": predictiveAnalytics,
  "Computer Vision Solutions": computerVision,
  "Natural Language Processing": nlpAI,
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceData();
  }, [serviceId]);

  const fetchServiceData = async () => {
    if (!serviceId) return;

    const { data: serviceData, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching service:", error);
      setLoading(false);
      return;
    }

    if (serviceData) {
      setService(serviceData);
    }
    
    setLoading(false);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.MessageSquare;
    return Icon;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold">Service not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = getIcon(service.icon);
  const serviceImage = serviceImages[service.title];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
        {serviceImage && (
          <>
            <div className="absolute inset-0 z-0">
              <img 
                src={serviceImage} 
                alt={service.title} 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-secondary/30"></div>
            </div>
          </>
        )}
        <div className="container mx-auto max-w-4xl text-center relative z-10 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-2xl">
              <Icon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            <span className="gradient-text drop-shadow-2xl">{service.title}</span>
          </h1>
          <p className="text-2xl text-foreground/90 font-medium drop-shadow-md">
            {service.description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">
            Key Features & Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <Card 
                key={index}
                className="animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-white" />
                    </div>
                    <p className="text-lg text-foreground/90 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
