import { Target, Lightbulb, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">ForeSite AI</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering industries through innovative AI solutions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Empowering Industries Through Innovation
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To empower industries via innovative AI solutions that drive efficiency, productivity, and growth.
              </p>
              <p className="text-lg text-muted-foreground">
                We provide the tools and knowledge needed to harness AI for transformative business outcomes.
              </p>
            </div>
            <div className="bg-gradient-primary rounded-2xl p-1">
              <div className="bg-background rounded-xl p-8 h-full">
                <h3 className="text-2xl font-bold mb-4">Focus Industries</h3>
                <ul className="space-y-3">
                  {["Manufacturing", "Mining", "Oil & Gas", "Transportation"].map((industry) => (
                    <li key={industry} className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-gradient-primary" />
                      <span className="text-lg">{industry}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                A Team of ML Experts
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We are a dedicated team of machine learning experts specializing in heavy industries,
                bringing unmatched expertise and cutting-edge technologies to your operations.
              </p>
              <div className="bg-gradient-hero rounded-lg p-8">
                <p className="text-xl font-medium text-foreground">
                  "Let us elevate your operations with cutting-edge technologies and unmatched expertise.
                  Together, we can revolutionize your industry."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
