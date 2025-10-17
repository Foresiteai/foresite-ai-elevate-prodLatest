import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const News = () => {
  const newsItems = [
    {
      title: "Notable Quotes from the 2024 Africa Energy Technology Conference",
      date: "March 15, 2024",
      category: "Industry Insights",
      summary: "Key insights and quotes from world leaders and industry titans at the premier African energy technology summit. Discussions covered the future of AI in energy, sustainable practices, and technological innovations shaping the continent's energy landscape.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "SIKOUM Limestone Project — Core Drilling Launched by SONAMINES",
      date: "February 28, 2024",
      category: "Project Update",
      summary: "Detailed overview of the core drilling work at the SIKOUM Limestone Project. The initiative includes engagement with local leadership, comprehensive geophysical assessments, and advanced mechanical evaluations to ensure sustainable resource extraction.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "High-Stakes AI Summit in Paris: World Leaders and Tech Titans",
      date: "February 10, 2024",
      category: "Global AI",
      summary: "Comprehensive coverage of the landmark AI summit in Paris featuring world leaders, tech industry titans, and challenging diplomatic discussions. Topics included AI governance, ethical frameworks, international cooperation, and the future direction of artificial intelligence technology.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            News & <span className="bg-gradient-primary bg-clip-text text-transparent">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with the latest industry news and AI developments
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/50">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {item.category}
                        </span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                        </div>
                      </div>
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {item.summary}
                      </CardDescription>
                      <Button variant="outline" className="group">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Informed</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest AI insights and industry updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="lg" className="sm:w-auto w-full">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
