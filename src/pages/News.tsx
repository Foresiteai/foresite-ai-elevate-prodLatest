import { useState, useEffect } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  published_date: string;
}

const News = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("published_date", { ascending: false });
    
    setPosts(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

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
          {posts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p className="text-xl">No posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/50">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {post.image_url && (
                      <div className="md:col-span-1 h-64 md:h-auto relative overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <div className={post.image_url ? "md:col-span-2" : "md:col-span-3"}>
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.published_date).toLocaleDateString()}
                          </div>
                        </div>
                        <CardTitle className="text-2xl hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">
                          {post.summary}
                        </CardDescription>
                        <Link to={`/news/${post.id}`}>
                          <Button variant="outline" className="group">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
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
