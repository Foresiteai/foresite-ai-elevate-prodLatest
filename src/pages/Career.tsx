import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Career = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Continuous learning and career advancement in cutting-edge AI technologies.",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with talented ML experts on challenging and impactful projects.",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and comprehensive benefits package.",
    },
    {
      icon: Briefcase,
      title: "Meaningful Work",
      description: "Contribute to AI solutions that transform industries and create real impact.",
    },
  ];

  const openings = [
    {
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "Houston, TX / Remote",
      type: "Full-time",
    },
    {
      title: "AI Solutions Architect",
      department: "Solutions",
      location: "Houston, TX",
      type: "Full-time",
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Join Our <span className="bg-gradient-primary bg-clip-text text-transparent">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Build the future of AI with industry-leading experts
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ForeSite AI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a team that's shaping the future of AI in heavy industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Explore current opportunities to join our team
            </p>
          </div>

          <div className="space-y-4">
            {openings.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:border-primary/50 border-2">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                      <CardDescription className="text-base">
                        {position.department} • {position.location} • {position.type}
                      </CardDescription>
                    </div>
                    <Link to="/contact">
                      <Button className="whitespace-nowrap">Apply Now</Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 overflow-hidden">
            <div className="bg-gradient-primary p-1">
              <CardContent className="bg-background p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Don't See a Perfect Fit?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="text-base px-8">
                    Contact Us
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

export default Career;
