import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  published_date: string;
}

const PostsManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      toast({ title: "Error fetching posts", variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from("content-images")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Error uploading image", variant: "destructive" });
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from("content-images")
        .getPublicUrl(filePath);
      
      setFormData({ ...formData, image_url: publicUrl });
      toast({ title: "Image uploaded successfully" });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      const { error } = await supabase
        .from("posts")
        .update(formData)
        .eq("id", editing);

      if (error) {
        toast({ title: "Error updating post", variant: "destructive" });
      } else {
        toast({ title: "Post updated successfully" });
        setEditing(null);
        setFormData({ title: "", summary: "", content: "", category: "", image_url: "" });
        fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from("posts")
        .insert([{ ...formData, created_by: user?.id }]);

      if (error) {
        toast({ title: "Error creating post", variant: "destructive" });
      } else {
        toast({ title: "Post created successfully" });
        setFormData({ title: "", summary: "", content: "", category: "", image_url: "" });
        fetchPosts();
      }
    }
  };

  const handleEdit = (post: Post) => {
    setEditing(post.id);
    setFormData({
      title: post.title,
      summary: post.summary,
      content: post.content || "",
      category: post.category,
      image_url: post.image_url || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting post", variant: "destructive" });
    } else {
      toast({ title: "Post deleted successfully" });
      fetchPosts();
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Edit Post" : "Create New Post"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="h-20 w-20 object-cover rounded" />
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={uploading}>
                {editing ? "Update" : "Create"} Post
              </Button>
              {editing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setFormData({ title: "", summary: "", content: "", category: "", image_url: "" });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{post.category}</p>
                  <p className="text-sm">{post.summary}</p>
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title} className="mt-2 h-32 w-auto object-cover rounded" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsManager;
