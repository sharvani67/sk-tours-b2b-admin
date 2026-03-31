import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/api";
import { toast } from "@/components/ui/sonner";

type Props = {
  onClose: () => void;
  refresh: () => void;
  editData?: any;
};

export default function VideoForm({ refresh, onClose, editData }: Props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  const LANGUAGES = ["english", "kannada", "marathi", "bengali"];

  // ✅ Prefill edit
  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setLanguage(editData.language);
    }
  }, [editData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title required ❌");
      return;
    }

    if (!editData && !file) {
      toast.error("Please select a video ❌");
      return;
    }

    if (!language) {
      toast.error("Language required ❌");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("language", language);
    if (file) formData.append("video", file);

    try {
      setLoading(true);

      const url = editData
        ? `${API_URL}/api/videos/${editData.id}`
        : `${API_URL}/api/videos`;

      const method = editData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success(
        editData ? "Video updated ✅" : "Video uploaded 🎬"
      );

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2>{editData ? "Edit Video" : "Add Video"}</h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* TITLE + LANGUAGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* TITLE */}
            <div>
              <label className="text-sm font-medium">Video Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
              />
            </div>

            {/* LANGUAGE */}
            <div>
              <label className="text-sm font-medium">Language</label>

              {!isCustom ? (
                <select
                  value={language}
                  onChange={(e) => {
                    if (e.target.value === "__custom__") {
                      setIsCustom(true);
                      setLanguage("");
                    } else {
                      setLanguage(e.target.value);
                    }
                  }}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Language</option>

                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}

                  <option value="__custom__">+ Add New</option>
                </select>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="Enter language"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustom(false);
                      setLanguage("");
                    }}
                    className="text-red-500 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="text-sm font-medium">Upload Video</label>

            <div className="relative border-2 border-dashed rounded-xl p-6 text-center bg-gray-50 hover:border-blue-500">
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <p className="text-sm text-gray-600">
                <span className="text-blue-600 font-medium">browse</span>
              </p>

              <p className="text-xs text-gray-400">
                MP4, MOV, AVI (Max 200MB)
              </p>
            </div>

            {/* FILE PREVIEW */}
            {file && (
              <div className="flex justify-between mt-2 bg-green-50 border rounded-lg p-2">
                <div>
                  <p className="text-sm text-green-700">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading
                ? "Uploading..."
                : editData
                ? "Update"
                : "Upload"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}