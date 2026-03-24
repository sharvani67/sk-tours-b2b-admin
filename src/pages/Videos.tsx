import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pencil,
  Trash2,
  Search,
  Plus,
} from "lucide-react";
import { API_URL } from "@/config/api";
import VideoForm from "./VideoForm";
import { toast } from "@/components/ui/sonner";

type VideoType = {
  id: number;
  title: string;
  video_url: string;
  status: number;
  created_at: string;
};

export default function Videos() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<VideoType | null>(null);

  /* ================= FETCH ================= */
  const fetchVideos = async () => {
    const res = await fetch(`${API_URL}/api/videos`);
    const data = await res.json();

    // support both single + array
    setVideos(Array.isArray(data) ? data : data ? [data] : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ================= FILTER ================= */
  const processed = useMemo(() => {
    return videos.filter((v) =>
      v.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [videos, search]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const rows = processed.slice((page - 1) * pageSize, page * pageSize);

  /* ================= DELETE ================= */
  const deleteVideo = async (id: number) => {
    if (!confirm("Delete this video?")) return;

    try {
      await fetch(`${API_URL}/api/videos/${id}`, {
        method: "DELETE",
      });

      setVideos(videos.filter((v) => v.id !== id));
      toast.success("Video deleted 🗑️");
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  /* ================= STATUS TOGGLE ================= */
  const toggleStatus = async (id: number, current: number) => {
    const newValue = current === 1 ? 0 : 1;

    try {
      await fetch(`${API_URL}/api/videos/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newValue }),
      });

      setVideos(
        videos.map((v) =>
          v.id === id ? { ...v, status: newValue } : v
        )
      );

      toast.success(
  newValue === 1
    ? "Video activated 🎬 (others disabled automatically)"
    : "Video deactivated ❌"
);
    } catch {
      toast.error("Status update failed ❌");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Videos</h1>
            <p className="text-muted-foreground">Manage videos</p>
          </div>

          <Button
            onClick={() => {
              setEditData(null);
              setOpenForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Video
          </Button>
        </div>

        {/* FORM */}
        {openForm && (
          <VideoForm
            onClose={() => setOpenForm(false)}
            refresh={fetchVideos}
            editData={editData}
          />
        )}

        <Card className="p-6 space-y-6">

          {/* SEARCH */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search video..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <Button
              onClick={() => {
                setPage(1);
                setSearch(searchInput);
              }}
            >
              Search
            </Button>
          </div>

          <CardContent>
            {loading ? (
              <p className="text-center py-10">Loading...</p>
            ) : (
              <>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b uppercase text-left">
                      <th className="py-3">SL No</th>
                      <th className="py-3">Title</th>
                      <th className="py-3">Preview</th>
                      <th className="py-3">Created</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((v, index) => (
                      <tr key={v.id} className="border-b hover:bg-muted/40">
                        <td>
                          {(page - 1) * pageSize + index + 1}
                        </td>

                        <td className="font-medium">{v.title}</td>

                        <td>
                          <video
                            src={`${API_URL}${v.video_url}`}
                            className="w-40 h-24 rounded object-cover"
                            controls
                            />
                        </td>

                        <td>
                          {new Date(v.created_at).toLocaleDateString()}
                        </td>

                        {/* STATUS TOGGLE */}
                        <td>
                          <button
                            onClick={() => toggleStatus(v.id, v.status)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                              ${v.status === 1 ? "bg-green-500" : "bg-red-500"}
                            `}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                                ${v.status === 1 ? "translate-x-6" : "translate-x-1"}
                              `}
                            />
                          </button>
                        </td>

                        {/* ACTIONS */}
                     <td className="py-3">
  <div className="flex items-center gap-2">
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        setEditData(v);
        setOpenForm(true);
      }}
    >
      <Pencil className="w-4 h-4" />
    </Button>

    <Button
      size="icon"
      variant="destructive"
      onClick={() => deleteVideo(v.id)}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
</td>
                      </tr>
                    ))}

                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-6">
                          No videos found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* PAGINATION */}
                <div className="flex justify-between pt-4">
                  <p className="text-sm">
                    Page {page} of {totalPages}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Prev
                    </Button>

                    <Button
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}