import { ArrowRight, CheckCircle2, Sparkles, Cpu, TrendingUp, Users, Award, Clock, Shield, Zap, Target, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-ai.jpg";

interface Industry {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

const Home = () => {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState<Industry[]>([]);
  
  const features = [
    { icon: Sparkles, text: "Innovative AI solutions" },
    { icon: Cpu, text: "Industry-specific expertise" },
    { icon: TrendingUp, text: "Cutting-edge technology" },
    { icon: Users, text: "Dedicated support" },
  ];

  const solutions = [
    {
      title: "Cutting-Edge Custom AI Solutions",
      description: "Tailored AI applications designed specifically for your business challenges and objectives.",
      icon: Target,
    },
    {
      title: "Pioneering AI Integration",
      description: "Seamlessly integrate advanced AI capabilities into your existing workflows and systems.",
      icon: Zap,
    },
    {
      title: "Consulting and Training",
      description: "Expert guidance and comprehensive training to empower your team with AI expertise.",
      icon: Users,
    },
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: CheckCircle2 },
    { value: "24/7", label: "Support Available", icon: Clock },
    { value: "100%", label: "Data Security", icon: Shield },
  ];

  const benefits = [
    {
      icon: BarChart3,
      title: "Increased Efficiency",
      description: "Automate repetitive tasks and optimize workflows to boost productivity by up to 40%."
    },
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Data-driven insights and predictive analytics to identify new opportunities and maximize ROI."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Advanced AI models to predict and prevent potential issues before they impact operations."
    },
    {
      icon: Cpu,
      title: "Smart Innovation",
      description: "Stay ahead of the curve with cutting-edge AI technology tailored to your industry."
    },
  ];

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    const { data } = await supabase
      .from("industries")
      .select("id, name, slug, image_url")
      .order("name");
    
    if (data) {
      // Filter out industries without slugs
      const validIndustries = data.filter(industry => industry.slug);
      setIndustries(validIndustries);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AI Technology" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-primary/20"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <div className="px-6 py-2.5 bg-primary/20 backdrop-blur-md rounded-full text-sm font-semibold text-primary mb-6 border-2 border-primary/30 shadow-lg">
                🚀 Next-Generation AI Solutions
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight drop-shadow-lg">
              Empowering Industries
              <br />
              <span className="gradient-text drop-shadow-2xl">
                Through AI
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/90 max-w-3xl mx-auto font-medium drop-shadow-md">
              Innovative GenAI Solutions Tailored for Your Business
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-6 py-3.5 bg-card/90 backdrop-blur-md border-2 border-border rounded-full shadow-lg hover:shadow-2xl hover:border-primary/70 transition-all duration-300 hover-lift hover:bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/contact">
                <Button size="lg" className="text-lg px-10 py-6 shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
                  Get Started <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 bg-card/50 backdrop-blur-md hover:border-primary hover:bg-card transition-all duration-300 hover:scale-105 shadow-xl">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert AI Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI services designed to transform your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group hover-lift overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <solution.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{solution.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ForeSite AI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your business with measurable results and cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section with Images */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized AI solutions across diverse sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                onClick={() => navigate(`/industries/${industry.slug}`)}
                className="relative group overflow-hidden rounded-xl h-48 cursor-pointer hover-lift"
              >
                {industry.image_url ? (
                  <>
                    <img 
                      src={industry.image_url} 
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 to-primary/40 group-hover:from-primary/90 transition-all duration-300"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-primary"></div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white font-semibold text-lg text-center px-4">{industry.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/industries">
              <Button variant="outline" size="lg" className="border-2 hover:border-primary">
                View All Industries <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in-up">
            Let's discuss how our AI solutions can drive your success
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-base px-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
