// import { useEffect, useState } from "react";

// type Props = {
//   images: File[];
//   setImages: React.Dispatch<React.SetStateAction<File[]>>;
//   videos: File[];
//   setVideos: React.Dispatch<React.SetStateAction<File[]>>;
//   coverIndex: number | null;
//   setCoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
// };

// const MediaManager = ({
//   images,
//   setImages,
//   videos,
//   setVideos,
//   coverIndex,
//   setCoverIndex,
// }: Props) => {
//   const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");
//   const [error, setError] = useState("");

//   const currentFiles = activeTab === "photo" ? images : videos;
//   const setCurrentFiles = activeTab === "photo" ? setImages : setVideos;

//   const currentCoverIndex = coverIndex;
//   const setCurrentCoverIndex = setCoverIndex;

//   const IMAGE_MAX_SIZE = 2 * 1024 * 1024;
//   const VIDEO_MAX_SIZE = 20 * 1024 * 1024;

//   // 👉 Upload
//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     const files = Array.from(e.target.files);
//     let validFiles: File[] = [];

//     files.forEach((file) => {
//       if (activeTab === "photo") {
//         if (!file.type.startsWith("image/"))
//           return setError("Only images allowed");
//         if (file.size > IMAGE_MAX_SIZE) return setError("Max 2MB image");
//       } else {
//         if (!file.type.startsWith("video/"))
//           return setError("Only videos allowed");
//         if (file.size > VIDEO_MAX_SIZE) return setError("Max 20MB video");
//       }
//       validFiles.push(file);
//     });

//     if (validFiles.length > 0) {
//       setError("");
//       setCurrentFiles((prev) => [...prev, ...validFiles]);
//     }
//   };

//   // 👉 Delete
//   const removeFile = (index: number) => {
//     setCurrentFiles((prev) => prev.filter((_, i) => i !== index));

//     setCurrentCoverIndex((prev) => {
//       if (prev === null) return null;
//       if (prev === index) return 0;
//       if (prev > index) return prev - 1;
//       return prev;
//     });
//   };

//   // 👉 Default Cover
//   useEffect(() => {
//     if (currentFiles.length > 0 && currentCoverIndex === null) {
//       setCurrentCoverIndex(0);
//     }
//   }, [currentFiles]);

//   // 👉 Arrow Navigation
//   const goPrev = () => {
//     if (!currentFiles.length) return;
//     setCurrentCoverIndex((prev) =>
//       prev === 0 ? currentFiles.length - 1 : (prev as number) - 1,
//     );
//   };

//   const goNext = () => {
//     if (!currentFiles.length) return;
//     setCurrentCoverIndex((prev) =>
//       prev === currentFiles.length - 1 ? 0 : (prev as number) + 1,
//     );
//   };

//   return (
//     <div>
//       <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
//         <div className="bg-white p-6 rounded-xl">
//           {/* TABS */}
//           <div className="flex gap-3 mb-4">
//             {["photo", "video"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab as any)}
//                 className={`px-10 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
//                   activeTab === tab ? "" : "opacity-70"
//                 }`}
//               >
//                 {tab === "photo" ? "Photo" : "Video"}
//               </button>
//             ))}
//           </div>

//           {/* NOTE */}
//           <div className="text-xs text-gray-600 mb-2">
//             {activeTab === "photo"
//               ? "Upload JPG/PNG (Max 2MB)"
//               : "Upload MP4 (Max 20MB)"}
//           </div>

//           {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

//           <div className="flex gap-8">
//             {/* LEFT LARGE PREVIEW */}
//             <div className="relative">
//               <div className="w-[550px] h-[480px] rounded-xl overflow-hidden border">
//                 {currentFiles.length > 0 &&
//                   (activeTab === "photo" ? (
//                     <img
//                       src={URL.createObjectURL(
//                         currentFiles[currentCoverIndex || 0],
//                       )}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <video
//                       src={URL.createObjectURL(
//                         currentFiles[currentCoverIndex || 0],
//                       )}
//                       className="w-full h-full object-cover"
//                       controls
//                     />
//                   ))}
//               </div>

//               {/* LEFT ARROW */}
//               <button
//                 onClick={goPrev}
//                 className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
//               >
//                 ‹
//               </button>

//               {/* RIGHT ARROW */}
//               <button
//                 onClick={goNext}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
//               >
//                 ›
//               </button>

//               {/* ACTIONS */}
//               <div className="flex gap-4 mt-3">
//                 <label className="bg-[#FFE600] w-28 text-center py-1 text-sm border rounded cursor-pointer">
//                   Upload
//                   <input
//                     type="file"
//                     multiple
//                     accept={activeTab === "photo" ? "image/*" : "video/*"}
//                     className="hidden"
//                     onChange={handleUpload}
//                   />
//                 </label>

//                 <button
//                   onClick={() => {
//                     setCurrentFiles([]);
//                     setCurrentCoverIndex(null);
//                   }}
//                   className="bg-[#FFC107] w-28 py-1 text-sm border rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT THUMBNAILS */}
//             <div className="w-[600px] h-[480px] overflow-y-auto">
//               <div className="grid grid-cols-3 gap-2">
//                 {currentFiles.length > 0
//                   ? currentFiles.map((file, index) => (
//                       <div
//                         key={index}
//                         className="relative cursor-pointer bg-[#d9d9d9] rounded overflow-hidden h-[155px]"
//                         onClick={() => setCurrentCoverIndex(index)}
//                       >
//                         {activeTab === "photo" ? (
//                           <img
//                             src={URL.createObjectURL(file)}
//                             className="w-full h-full object-contain"
//                           />
//                         ) : (
//                           <video
//                             src={URL.createObjectURL(file)}
//                             className="w-full h-full object-contain"
//                           />
//                         )}

//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeFile(index);
//                           }}
//                           className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))
//                   : [...Array(9)].map((_, i) => (
//                       <div key={i} className="bg-[#d9d9d9] rounded h-[155px]" />
//                     ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MediaManager;





import { useEffect, useState } from "react";

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  videos: File[];
  setVideos: React.Dispatch<React.SetStateAction<File[]>>;
  videoLinks: string[];
  setVideoLinks: React.Dispatch<React.SetStateAction<string[]>>;
  coverIndex: number | null;
  setCoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const MediaManager = ({
  images,
  setImages,
  videos,
  setVideos,
  videoLinks,        // ✅ from parent
  setVideoLinks,     // ✅ from parent
  coverIndex,
  setCoverIndex,
}: Props) => {
  
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");
  const [error, setError] = useState("");

  // const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [videoInput, setVideoInput] = useState("");

  const currentFiles = activeTab === "photo" ? images : videos;
  const setCurrentFiles = activeTab === "photo" ? setImages : setVideos;

  const currentCoverIndex = coverIndex;
  const setCurrentCoverIndex = setCoverIndex;

  const IMAGE_MAX_SIZE = 2 * 1024 * 1024;
  const VIDEO_MAX_SIZE = 20 * 1024 * 1024;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    let validFiles: File[] = [];

    files.forEach((file) => {
      if (activeTab === "photo") {
        if (!file.type.startsWith("image/"))
          return setError("Only images allowed");
        if (file.size > IMAGE_MAX_SIZE) return setError("Max 2MB image");
      } else {
        if (!file.type.startsWith("video/"))
          return setError("Only videos allowed");
        if (file.size > VIDEO_MAX_SIZE) return setError("Max 20MB video");
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setError("");
      setCurrentFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleAddVideoLink = () => {
    if (!videoInput.trim()) return;
    setVideoLinks((prev) => [...prev, videoInput.trim()]);
    setVideoInput("");
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
    }
    return url;
  };

  const removeFile = (index: number) => {
    if (activeTab === "video" && index >= currentFiles.length) {
      const linkIndex = index - currentFiles.length;
      setVideoLinks((prev) => prev.filter((_, i) => i !== linkIndex));
    } else {
      setCurrentFiles((prev) => prev.filter((_, i) => i !== index));
    }

    setCurrentCoverIndex((prev) => {
      if (prev === null) return null;
      if (prev === index) return 0;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  useEffect(() => {
    const total =
      activeTab === "video"
        ? currentFiles.length + videoLinks.length
        : currentFiles.length;

    if (total > 0 && currentCoverIndex === null) {
      setCurrentCoverIndex(0);
    }
  }, [currentFiles, videoLinks, activeTab]);

  const goPrev = () => {
    const total =
      activeTab === "video"
        ? currentFiles.length + videoLinks.length
        : currentFiles.length;

    if (!total) return;

    setCurrentCoverIndex((prev) =>
      prev === 0 ? total - 1 : (prev as number) - 1,
    );
  };

  const goNext = () => {
    const total =
      activeTab === "video"
        ? currentFiles.length + videoLinks.length
        : currentFiles.length;

    if (!total) return;

    setCurrentCoverIndex((prev) =>
      prev === total - 1 ? 0 : (prev as number) + 1,
    );
  };

  const combinedVideos =
    activeTab === "video" ? [...currentFiles, ...videoLinks] : currentFiles;

  return (
    <div>
      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
        <div className="bg-white p-6 rounded-xl">
          {/* TABS */}
          <div className="flex gap-3 mb-4">
            {["photo", "video"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-10 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
                  activeTab === tab ? "" : "opacity-70"
                }`}
              >
                {tab === "photo" ? "Photo" : "Video"}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-600 mb-2">
            {activeTab === "photo"
              ? "Upload JPG/PNG (Max 2MB)"
              : "Upload MP4 (Max 20MB) or add video link"}
          </div>

          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <div className="flex gap-8">
            {/* LEFT */}
            <div className="relative">
              <div className="w-[550px] h-[480px] rounded-xl overflow-hidden border">
                {combinedVideos.length > 0 &&
                  (typeof combinedVideos[currentCoverIndex || 0] ===
                  "string" ? (
                    <iframe
                      src={getEmbedUrl(
                        combinedVideos[currentCoverIndex || 0] as string,
                      )}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : activeTab === "photo" ? (
                    <img
                      src={URL.createObjectURL(
                        combinedVideos[currentCoverIndex || 0] as File,
                      )}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(
                        combinedVideos[currentCoverIndex || 0] as File,
                      )}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ))}
              </div>

              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
              >
                ›
              </button>

              <div className="flex gap-4 mt-3">
                <label className="bg-[#FFE600] w-28 text-center py-1 text-sm border rounded cursor-pointer">
                  Upload
                  <input
                    type="file"
                    multiple
                    accept={activeTab === "photo" ? "image/*" : "video/*"}
                    className="hidden"
                    onChange={handleUpload}
                  />
                </label>

                <button
                  onClick={() => {
                    setCurrentFiles([]);
                    setVideoLinks([]);
                    setCurrentCoverIndex(null);
                  }}
                  className="bg-[#FFC107] w-28 py-1 text-sm border rounded"
                >
                  Delete
                </button>
              </div>

              {activeTab === "video" && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={videoInput}
                    onChange={(e) => setVideoInput(e.target.value)}
                    placeholder="Paste video URL..."
                    className="border px-2 py-1 w-full text-sm rounded"
                  />
                  <button
                    onClick={handleAddVideoLink}
                    className="bg-blue-600 text-white px-3 text-sm rounded"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT THUMBNAILS */}
            <div className="w-[600px] h-[480px] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                {combinedVideos.length > 0
                  ? combinedVideos.map((item, index) => (
                      <div
                        key={index}
                        className="relative cursor-pointer rounded-lg overflow-hidden h-[155px] border bg-white shadow-sm"
                        onClick={() => setCurrentCoverIndex(index)}
                      >
                        {typeof item === "string" ? (
                          <iframe
                            src={getEmbedUrl(item)}
                            className="w-full h-full"
                          />
                        ) : activeTab === "photo" ? (
                          <img
                            src={URL.createObjectURL(item)}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <video
                            src={URL.createObjectURL(item)}
                            className="w-full h-full object-contain"
                          />
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  : [...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded-lg h-[155px] border bg-white"
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaManager;
