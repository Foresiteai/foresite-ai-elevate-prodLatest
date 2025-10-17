import { Target, Lightbulb, Award, Heart, Users, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import teamImage from "@/assets/team-training.jpg";
import aiConsulting from "@/assets/ai-consulting.jpg";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Staying at the frontier of AI and exploring new methods to deliver cutting-edge solutions.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Conducting ethical and transparent business practices in everything we do.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering top-quality work and solutions that exceed expectations.",
    },
    {
      icon: Target,
      title: "Customer-Centricity",
      description: "Placing clients at the center of our mission and aiming to exceed their expectations.",
    },
  ];

  const focusAreas = [
    { name: "Manufacturing", icon: Cpu },
    { name: "Mining", icon: Target },
    { name: "Oil & Gas", icon: Lightbulb },
    { name: "Transportation", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={aiConsulting} 
            alt="AI Technology" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-primary/30"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            About <span className="gradient-text drop-shadow-2xl">ForeSite AI</span>
          </h1>
          <p className="text-2xl text-foreground/90 leading-relaxed font-medium drop-shadow-md">
            Empowering industries through innovative AI solutions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4 border border-primary/20">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transforming Industries with AI Innovation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To empower industries through innovative AI solutions, providing the tools and knowledge needed to harness AI for efficiency, productivity, and growth.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We focus on heavy industries including Manufacturing, Mining, Oil & Gas, and Transportation, bringing cutting-edge AI technology where it matters most.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {focusAreas.map((area, index) => (
                <Card 
                  key={index} 
                  className="border-2 hover:border-primary/50 transition-all hover-lift group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <area.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-semibold">{area.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              Principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 hover:shadow-xl transition-all hover-lift group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src={teamImage} 
            alt="ForeSite AI Team" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">Expert Team</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-in-up">
            Our team consists of seasoned ML experts specializing in heavy industries. We bring together decades of combined experience in artificial intelligence, machine learning, and industrial operations.
          </p>
          <div className="bg-card/90 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover-lift">
            <p className="text-xl font-semibold mb-4 gradient-text">
              "Let us elevate your operations with cutting-edge technologies and unmatched expertise."
            </p>
            <p className="text-lg text-muted-foreground">
              Together, we can revolutionize your industry with the power of AI.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
