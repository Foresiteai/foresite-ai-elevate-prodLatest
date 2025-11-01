import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Industry {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  icon: string;
  slug: string;
}

interface IndustryDetail {
  id: string;
  section_title: string;
  content: string;
  order_index: number;
}

const IndustryDetail = () => {
  const { slug } = useParams();
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [details, setDetails] = useState<IndustryDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustryData();
  }, [slug]);

  const fetchIndustryData = async () => {
    if (!slug) return;

    const { data: industryData, error } = await supabase
      .from("industries")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error fetching industry:", error);
      setLoading(false);
      return;
    }

    if (industryData) {
      const { data: detailsData } = await supabase
        .from("industry_details")
        .select("*")
        .eq("industry_id", industryData.id)
        .order("order_index", { ascending: true });

      setIndustry(industryData);
      setDetails(detailsData || []);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Industry not found</h1>
          <p className="text-muted-foreground">The industry you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Full Image Background */}
      <section className="relative pt-24 pb-32 px-4 overflow-hidden min-h-[70vh] flex items-center">
        {industry.image_url && (
          <>
            <div className="absolute inset-0 z-0">
              <img 
                src={industry.image_url} 
                alt={industry.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/30"></div>
            </div>
          </>
        )}
        <div className="container mx-auto max-w-5xl relative z-10 animate-fade-in">
          <Badge className="mb-6 text-lg px-6 py-2 bg-primary/10 text-primary border-primary/20">
            Industry Solutions
          </Badge>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="gradient-text">{industry.name}</span>
          </h1>
          <p className="text-2xl md:text-3xl text-foreground/90 font-medium leading-relaxed max-w-3xl">
            {industry.description}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-6xl">
          {details.length > 0 ? (
            <>
              {/* Introduction */}
              <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Our <span className="gradient-text">AI Solutions</span>
                </h2>
                <Separator className="max-w-xs mx-auto mb-8" />
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover how our cutting-edge artificial intelligence transforms {industry.name.toLowerCase()} operations
                </p>
              </div>

              {/* Detail Cards Grid */}
              <div className="space-y-8">
                {details.map((detail, index) => (
                  <Card 
                    key={detail.id}
                    className="animate-fade-in hover-lift border-2 overflow-hidden group"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border-2 border-primary/20">
                          {index + 1}
                        </div>
                        <CardTitle className="text-3xl md:text-4xl flex-1 gradient-text group-hover:scale-[1.02] transition-transform">
                          {detail.section_title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-8 pb-8">
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {detail.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-20 text-center">
                <Card className="bg-gradient-primary border-0 text-primary-foreground">
                  <CardContent className="py-16 px-8">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      Ready to Transform Your {industry.name} Operations?
                    </h3>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                      Let's discuss how our AI solutions can drive innovation and efficiency in your organization
                    </p>
                    <a 
                      href="/contact" 
                      className="inline-block bg-background text-primary px-10 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
                    >
                      Get Started Today
                    </a>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="py-16">
                  <h3 className="text-3xl font-bold mb-4 gradient-text">Coming Soon</h3>
                  <p className="text-xl text-muted-foreground">
                    We're currently developing comprehensive AI solutions for the {industry.name} industry. 
                    Contact us to learn more about how we can help your organization.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryDetail;
