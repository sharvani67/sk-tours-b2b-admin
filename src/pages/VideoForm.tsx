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
const LANGUAGES = ["english", "kannada", "marathi", "bengali"];

const [language, setLanguage] = useState("");
const [isCustom, setIsCustom] = useState(false);
  // ✅ Prefill for edit
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

    // ✅ Use FormData for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("language", language);

    if (file) {
      formData.append("video", file);
    }

    try {
      if (editData) {
        await fetch(`${API_URL}/api/videos/${editData.id}`, {
          method: "PUT",
          body: formData, // ✅ no headers
        });

        toast.success("Video updated ✅");
      } else {
        if (!file) {
          toast.error("Please select a video ❌");
          return;
        }
if (!language) {
  toast.error("Language required ❌");
  return;
}
        await fetch(`${API_URL}/api/videos`, {
          method: "POST",
          body: formData, // ✅ no headers
        });

        toast.success("Video uploaded 🎬");
      }

      refresh();
      onClose();

    } catch {
      toast.error("Error ❌");
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2>{editData ? "Edit Video" : "Add Video"}</h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* TITLE */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      Video Title
    </label>
    <Input
      placeholder="Enter video title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  {/* LANGUAGE */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      Language
    </label>

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

        <option value="__custom__">+ Add New Language</option>
      </select>
    ) : (
      <div className="flex gap-2">
        <Input
          placeholder="Enter new language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <button
          type="button"
          onClick={() => {
            setIsCustom(false);
            setLanguage("");
          }}
          className="text-sm text-red-500"
        >
          Cancel
        </button>
      </div>
    )}
  </div>

</div>


          {/* FILE INPUT */}
          <div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Upload Video
  </label>

  <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer bg-gray-50">
    
    <input
      type="file"
      accept="video/*"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />

    <div className="text-center space-y-2">
      <p className="text-sm text-gray-600">
        <span className="text-blue-600 font-medium">browse</span>
      </p>

      <p className="text-xs text-gray-400">
        MP4, MOV, AVI (Max 50MB)
      </p>
    </div>
  </div>

  {/* FILE NAME PREVIEW */}
  {file && (
    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
      <span className="text-sm text-green-700 truncate">
        {file.name}
         <p className="text-xs text-gray-400">
            {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </span>
     
      <button
        type="button"
        onClick={() => setFile(null)}
        className="text-red-500 text-xs hover:underline"
      >
        Remove
      </button>
    </div>
  )}
</div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Button type="submit">
              {editData ? "Update" : "Upload"}
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