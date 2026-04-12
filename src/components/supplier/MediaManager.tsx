import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Star } from "lucide-react";

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  videos: File[];
  setVideos: React.Dispatch<React.SetStateAction<File[]>>;
  coverIndex: number | null;
  setCoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const MediaManager = ({
  images,
  setImages,
  videos,
  setVideos,
  coverIndex,
  setCoverIndex,
}: Props) => {

  // IMAGE UPLOAD
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(prev => [...prev, ...Array.from(e.target.files)]);
  };

  // VIDEO UPLOAD
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setVideos(prev => [...prev, ...Array.from(e.target.files)]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (coverIndex === index) setCoverIndex(null);
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };


    return (
  <div>
<div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
                Media
        </div>
      </div>


    <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
      <div className="bg-white p-6 rounded-xl">

        <div className="grid grid-cols-2 gap-10">

          {/* ================= PHOTOS ================= */}
          <div>

            {/* BOX */}
            <div className="w-full h-[250px] bg-[#e6cccc] border border-black rounded-md flex items-center justify-center text-gray-700">
              PHOTOS
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between mt-3">

              {/* UPLOAD */}
              <label className="bg-[#FFFF00] px-4 py-1 border border-black rounded-md cursor-pointer">
                Upload
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {/* DELETE ALL */}
              <button
                onClick={() => {
                  setImages([]);
                  setCoverIndex(null);
                }}
                className="bg-[#FFC000] px-4 py-1 border border-black rounded-md"
              >
                Delete
              </button>

            </div>

            {/* PREVIEW GRID */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {images.map((file, index) => {
                  const preview = URL.createObjectURL(file);

                  return (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        className="h-24 w-full object-cover border border-black"
                      />

                      {/* COVER */}
                      <button
                        onClick={() => setCoverIndex(index)}
                        className="absolute bottom-1 left-1 bg-white p-1"
                      >
                        <Star
                          size={14}
                          className={
                            coverIndex === index
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }
                        />
                      </button>

                      {/* DELETE SINGLE */}
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white px-1 text-xs"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* ================= VIDEOS ================= */}
          <div>

            {/* BOX */}
            <div className="w-full h-[250px] bg-[#e6cccc] border border-black rounded-md flex items-center justify-center text-gray-700">
              VIDEOS
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between mt-3">

              {/* UPLOAD */}
              <label className="bg-[#FFFF00] px-4 py-1 border border-black rounded-md cursor-pointer">
                Upload
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>

              {/* DELETE ALL */}
              <button
                onClick={() => setVideos([])}
                className="bg-[#FFC000] px-4 py-1 border border-black rounded-md"
              >
                Delete
              </button>

            </div>

            {/* PREVIEW GRID */}
            {videos.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {videos.map((file, index) => {
                  const preview = URL.createObjectURL(file);

                  return (
                    <div key={index} className="relative">
                      <video
                        src={preview}
                        className="h-24 w-full object-cover border border-black"
                        controls
                      />

                      {/* DELETE SINGLE */}
                      <button
                        onClick={() => removeVideo(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white px-1 text-xs"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>


      </div>
    </div>

  </div>
);
};

export default MediaManager;