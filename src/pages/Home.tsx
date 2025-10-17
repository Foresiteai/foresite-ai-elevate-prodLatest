import { ArrowRight, CheckCircle2, Sparkles, Cpu, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Home = () => {
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
    },
    {
      title: "Pioneering AI Integration",
      description: "Seamlessly integrate advanced AI capabilities into your existing workflows and systems.",
    },
    {
      title: "Consulting and Training",
      description: "Expert guidance and comprehensive training to empower your team with AI expertise.",
    },
  ];

  const industries = [
    "Mining",
    "Oil & Gas",
    "Retail",
    "Manufacturing",
    "Healthcare",
    "Finance",
    "Transportation",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Next-Generation AI Solutions
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Empowering Industries
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Through AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Innovative GenAI Solutions Tailored for Your Business
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-6 py-3 bg-card border border-border rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="text-base px-8">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert AI Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI services designed to transform your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized AI solutions across diverse sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-lg text-center hover:border-primary hover:shadow-md transition-all cursor-pointer group"
              >
                <p className="font-medium group-hover:text-primary transition-colors">{industry}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/industries">
              <Button variant="outline" size="lg">
                View All Industries <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss how our AI solutions can drive your success
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-base px-8">
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
