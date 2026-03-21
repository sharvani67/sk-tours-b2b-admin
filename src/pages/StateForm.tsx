import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/config/api";
import { toast } from "@/components/ui/sonner";

type Props = {
  onClose: () => void;
  refresh: () => void;
  editData: any;
};

export default function StateForm({ onClose, refresh, editData }: Props) {
  const [state_name, setStateName] = useState("");
  const [status, setStatus] = useState(1);

  useEffect(() => {
    if (editData) {
      setStateName(editData.state_name);
      setStatus(editData.status);
    }
  }, [editData]);

const handleSubmit = async (e: any) => {
  e.preventDefault();

  const payload = { state_name, status };

  try {
    if (editData) {
      await fetch(`${API_URL}/api/states/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("State updated successfully ✅");
    } else {
      await fetch(`${API_URL}/api/states`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("State added successfully ✅");
    }

    refresh();
    onClose();

  } catch (error) {
    toast.error("Something went wrong ❌");
  }
};

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {editData ? "Edit State" : "Add State"}
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            placeholder="Enter state name"
            value={state_name}
            onChange={(e) => setStateName(e.target.value)}
            required
          />

          {/* STATUS */}
          <select
            className="border p-2 rounded w-full"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>

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