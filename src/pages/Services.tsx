import { MessageSquare, Cpu, Wrench, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "AI Consulting Services",
      description: "Strategic guidance on leveraging AI for your business. We help you develop a comprehensive roadmap and ensure alignment with your business goals.",
      features: [
        "Strategic AI roadmap development",
        "Business goal alignment",
        "Technology assessment",
        "Implementation planning",
      ],
    },
    {
      icon: Cpu,
      title: "Advanced AI Solutions",
      description: "End-to-end AI implementation services. From deployment to optimization, we ensure your AI solutions deliver maximum efficiency and performance.",
      features: [
        "Complete implementation lifecycle",
        "System deployment & integration",
        "Performance optimization",
        "Continuous improvement",
      ],
    },
    {
      icon: Wrench,
      title: "Custom Industrial AI Solutions",
      description: "Bespoke AI applications tailored to your specific business challenges. We develop solutions that address your unique operational needs.",
      features: [
        "Tailored AI applications",
        "Industry-specific customization",
        "Scalable architecture",
        "Ongoing support",
      ],
    },
    {
      icon: GraduationCap,
      title: "Training & Education",
      description: "Comprehensive workshops, webinars, and on-site training programs to empower your teams with the AI skills they need to succeed.",
      features: [
        "Hands-on workshops",
        "Interactive webinars",
        "On-site training",
        "Certification programs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive AI solutions designed to transform your business operations
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 overflow-hidden">
            <div className="bg-gradient-primary p-1">
              <CardContent className="bg-background p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore Cutting-Edge AI Consulting
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ready to transform your business with AI? Book a consultation with our experts today.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="text-base px-8">
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
