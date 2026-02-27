import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { API_URL } from "@/config/api";

type Props = {
  onClose: () => void;
  refresh: () => void;
  editData: any;
};

export default function CategoryForm({ onClose, refresh, editData }: Props) {
  const [category_name, setCategoryName] = useState("");

  useEffect(() => {
    if (editData) {
      setCategoryName(editData.category_name);
    }
  }, [editData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (editData) {
      await fetch(`${API_URL}/api/categories/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_name }),
      });
    } else {
      await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_name }),
      });
    }

    refresh();
    onClose();
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {editData ? "Edit Category" : "Add Category"}
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            placeholder="Enter category name"
            value={category_name}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />

          <div className="flex gap-3">
            <Button type="submit">
              {editData ? "Update" : "Create"}
            </Button>

            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}