import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

interface Industry {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
}

interface IndustryDetail {
  id: string;
  section_title: string;
  content: string;
  order_index: number;
}

const IndustryDetail = () => {
  const { industryId } = useParams();
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [details, setDetails] = useState<IndustryDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustryData();
  }, [industryId]);

  const fetchIndustryData = async () => {
    if (!industryId) return;

    const { data: industryData, error } = await supabase
      .from("industries")
      .select("*")
      .eq("id", industryId)
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
        .eq("industry_id", industryId)
        .order("order_index", { ascending: true });

      setIndustry(industryData);
      setDetails(detailsData || []);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold">Industry not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
        {industry.image_url && (
          <>
            <div className="absolute inset-0 z-0">
              <img 
                src={industry.image_url} 
                alt={industry.name} 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-secondary/30"></div>
            </div>
          </>
        )}
        <div className="container mx-auto max-w-4xl text-center relative z-10 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            <span className="gradient-text drop-shadow-2xl">{industry.name}</span>
          </h1>
          <p className="text-2xl text-foreground/90 font-medium drop-shadow-md">
            {industry.description}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          {details.map((detail, index) => (
            <Card 
              key={detail.id}
              className="animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  {detail.section_title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {detail.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryDetail;
