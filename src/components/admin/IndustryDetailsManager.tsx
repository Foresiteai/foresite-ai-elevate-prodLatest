import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IndustryDetail {
  id: string;
  section_title: string;
  content: string;
  order_index: number;
}

interface IndustryDetailsManagerProps {
  industryId: string;
}

const IndustryDetailsManager = ({ industryId }: IndustryDetailsManagerProps) => {
  const { toast } = useToast();
  const [details, setDetails] = useState<IndustryDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    section_title: "",
    content: "",
    order_index: 0,
  });

  useEffect(() => {
    fetchDetails();
  }, [industryId]);

  const fetchDetails = async () => {
    const { data, error } = await supabase
      .from("industry_details")
      .select("*")
      .eq("industry_id", industryId)
      .order("order_index", { ascending: true });

    if (error) {
      toast({ title: "Error fetching details", variant: "destructive" });
    } else {
      setDetails(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      const { error } = await supabase
        .from("industry_details")
        .update(formData)
        .eq("id", editing);

      if (error) {
        toast({ title: "Error updating detail", variant: "destructive" });
      } else {
        toast({ title: "Detail updated successfully" });
        setEditing(null);
        setFormData({ section_title: "", content: "", order_index: 0 });
        fetchDetails();
      }
    } else {
      const { error } = await supabase
        .from("industry_details")
        .insert([{ ...formData, industry_id: industryId }]);

      if (error) {
        toast({ title: "Error creating detail", variant: "destructive" });
      } else {
        toast({ title: "Detail created successfully" });
        setFormData({ section_title: "", content: "", order_index: 0 });
        fetchDetails();
      }
    }
  };

  const handleEdit = (detail: IndustryDetail) => {
    setEditing(detail.id);
    setFormData({
      section_title: detail.section_title,
      content: detail.content,
      order_index: detail.order_index,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this detail section?")) return;

    const { error } = await supabase.from("industry_details").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting detail", variant: "destructive" });
    } else {
      toast({ title: "Detail deleted successfully" });
      fetchDetails();
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Edit Section" : "Add New Section"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="section_title">Section Title</Label>
              <Input
                id="section_title"
                value={formData.section_title}
                onChange={(e) => setFormData({ ...formData, section_title: e.target.value })}
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
                required
              />
            </div>
            <div>
              <Label htmlFor="order_index">Order (0 = first)</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editing ? "Update" : "Add"} Section
              </Button>
              {editing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setFormData({ section_title: "", content: "", order_index: 0 });
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
        {details.map((detail) => (
          <Card key={detail.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Order: {detail.order_index}</div>
                  <h3 className="font-bold text-lg">{detail.section_title}</h3>
                  <p className="text-sm mt-2 whitespace-pre-wrap">{detail.content}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(detail)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(detail.id)}>
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

export default IndustryDetailsManager;
