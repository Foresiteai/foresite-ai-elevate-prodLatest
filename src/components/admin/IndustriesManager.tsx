import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IndustryDetailsManager from "./IndustryDetailsManager";

interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string | null;
}

const IndustriesManager = () => {
  const { toast } = useToast();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Factory",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast({ title: "Error fetching industries", variant: "destructive" });
    } else {
      setIndustries(data || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `industries/${fileName}`;

    const { error: uploadError } = await supabase.storage
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
        .from("industries")
        .update(formData)
        .eq("id", editing);

      if (error) {
        toast({ title: "Error updating industry", variant: "destructive" });
      } else {
        toast({ title: "Industry updated successfully" });
        setEditing(null);
        setFormData({ name: "", description: "", icon: "Factory", image_url: "" });
        fetchIndustries();
      }
    } else {
      const { error } = await supabase
        .from("industries")
        .insert([formData]);

      if (error) {
        toast({ title: "Error creating industry", variant: "destructive" });
      } else {
        toast({ title: "Industry created successfully" });
        setFormData({ name: "", description: "", icon: "Factory", image_url: "" });
        fetchIndustries();
      }
    }
  };

  const handleEdit = (industry: Industry) => {
    setEditing(industry.id);
    setFormData({
      name: industry.name,
      description: industry.description,
      icon: industry.icon,
      image_url: industry.image_url || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this industry?")) return;

    const { error } = await supabase.from("industries").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting industry", variant: "destructive" });
    } else {
      toast({ title: "Industry deleted successfully" });
      fetchIndustries();
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (selectedIndustry) {
    return (
      <div>
        <Button 
          variant="outline" 
          onClick={() => setSelectedIndustry(null)}
          className="mb-4"
        >
          ← Back to Industries
        </Button>
        <IndustryDetailsManager industryId={selectedIndustry} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Edit Industry" : "Create New Industry"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon (lucide-react name)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., Factory, Drill, Truck"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
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
                {editing ? "Update" : "Create"} Industry
              </Button>
              {editing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setFormData({ name: "", description: "", icon: "Factory", image_url: "" });
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
        {industries.map((industry) => (
          <Card key={industry.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{industry.name}</h3>
                  <p className="text-sm mb-2">{industry.description}</p>
                  {industry.image_url && (
                    <img src={industry.image_url} alt={industry.name} className="mt-2 h-32 w-auto object-cover rounded" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedIndustry(industry.id)}>
                    <Plus className="h-4 w-4 mr-1" /> Details
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(industry)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(industry.id)}>
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

export default IndustriesManager;
