

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
//   const [activeTab, setActiveTab] = useState<"normal" | "holiday">("normal");

//   const [holidayImages, setHolidayImages] = useState<File[]>([]);
//   const [holidayCoverIndex, setHolidayCoverIndex] = useState<number | null>(
//     null,
//   );

//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const currentImages = activeTab === "normal" ? images : holidayImages;
//   const setCurrentImages =
//     activeTab === "normal" ? setImages : setHolidayImages;

//   const currentCoverIndex =
//     activeTab === "normal" ? coverIndex : holidayCoverIndex;

//   const setCurrentCoverIndex =
//     activeTab === "normal" ? setCoverIndex : setHolidayCoverIndex;

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setCurrentImages((prev) => [...prev, ...Array.from(e.target.files)]);
//   };

//   const removeImage = (index: number) => {
//     setCurrentImages((prev) => prev.filter((_, i) => i !== index));

//     setCurrentCoverIndex((prev) => {
//       if (prev === null) return null;
//       if (prev === index) return 0;
//       if (prev > index) return prev - 1;
//       return prev;
//     });
//   };

//   useEffect(() => {
//     if (currentImages.length > 0 && currentCoverIndex === null) {
//       setCurrentCoverIndex(0);
//     }
//   }, [currentImages]);

//   return (
//     <div>
//       <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
//         <div className="bg-white p-6 rounded-xl">
//           {/* TABS */}
//           <div className="flex gap-3 mb-4">
//             <div className="border-2 border-black bg-[#cfe3f5] p-[4px]">
//               <button
//                 onClick={() => setActiveTab("normal")}
//                 className={`px-12 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
//                   activeTab === "normal" ? "" : "opacity-80"
//                 }`}
//               >
//                 Normal Photo
//               </button>
//             </div>

//             <div className="border-2 border-black bg-[#cfe3f5] p-[4px]">
//               <button
//                 onClick={() => setActiveTab("holiday")}
//                 className={`px-12 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
//                   activeTab === "holiday" ? "" : "opacity-80"
//                 }`}
//               >
//                 video 
//               </button>
//             </div>
//           </div>

//           {/* MAIN */}
//           <div className="flex gap-10">
//             {/* LEFT PREVIEW */}
//             <div>
//               <div className=" mt-3 w-[550px] h-[480px] bg-[#d9d9d9] rounded-xl overflow-hidden border border-gray-400">
//                 {currentImages.length > 0 && (
//                   <img
//                     src={URL.createObjectURL(
//                       currentImages[currentCoverIndex || 0],
//                     )}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>

//               <div className="flex gap-4 mt-3">
//                 <label className="bg-[#FFE600] w-28 text-center py-1 text-sm border border-black rounded-md cursor-pointer">
//                   Upload
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageUpload}
//                   />
//                 </label>

//                 <button
//                   onClick={() => {
//                     setCurrentImages([]);
//                     setCurrentCoverIndex(null);
//                   }}
//                   className="bg-[#FFC107] w-28 py-1 text-sm border border-black rounded-md"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT CARDS (FIXED LAYOUT) */}
//             <div className="flex flex-wrap w-[500px]">
//               {currentImages.length > 0
//                 ? currentImages.map((file, index) => {
//                     const preview = URL.createObjectURL(file);

//                     return (
//                       <div
//                         key={index}
//                         className="relative group cursor-pointer rounded-xl overflow-hidden bg-[#d9d9d9]"
//                         style={{ width: "200px", height: "200px" }}
//                         onClick={() => {
//                           setSelectedIndex(index);
//                           setCurrentCoverIndex(index);
//                         }}
//                       >

                        
//                         <img
//                           src={preview}
//                           className="w-full h-full object-cover"
//                         />

//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeImage(index);
//                           }}
//                           className="absolute top-1 right-1 bg-red-600 text-white px-2 py-[2px] text-xs rounded opacity-0 group-hover:opacity-100 transition"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     );
//                   })
//                 : [...Array(4)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="bg-[#d9d9d9] rounded-xl m-[5px]"
//                       style={{ width: "240px", height: "230px" }}
//                     />
//                   ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
//           <button
//             onClick={() => setSelectedIndex(null)}
//             className="absolute top-5 right-5 text-white text-3xl"
//           >
//             ✕
//           </button>

//           <img
//             src={URL.createObjectURL(currentImages[selectedIndex])}
//             className="max-h-[85%] max-w-[85%] object-contain"
//           />

//           <button
//             onClick={() =>
//               setSelectedIndex((prev) =>
//                 prev === 0 ? currentImages.length - 1 : (prev as number) - 1,
//               )
//             }
//             className="absolute left-5 text-white text-5xl"
//           >
//             ‹
//           </button>

//           <button
//             onClick={() =>
//               setSelectedIndex((prev) =>
//                 prev === currentImages.length - 1 ? 0 : (prev as number) + 1,
//               )
//             }
//             className="absolute right-5 text-white text-5xl"
//           >
//             ›
//           </button>
//         </div>
//       )}
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
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const currentFiles = activeTab === "photo" ? images : videos;
  const setCurrentFiles = activeTab === "photo" ? setImages : setVideos;

  const currentCoverIndex = coverIndex;
  const setCurrentCoverIndex = setCoverIndex;

  // 🔥 FILE SIZE LIMITS
  const IMAGE_MAX_SIZE = 2 * 1024 * 1024; // 2MB
  const VIDEO_MAX_SIZE = 20 * 1024 * 1024; // 20MB

  // 👉 Upload Handler
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    let validFiles: File[] = [];

    files.forEach((file) => {
      if (activeTab === "photo") {
        if (!file.type.startsWith("image/")) {
          setError("Only image files allowed");
          return;
        }
        if (file.size > IMAGE_MAX_SIZE) {
          setError("Image must be less than 2MB");
          return;
        }
      } else {
        if (!file.type.startsWith("video/")) {
          setError("Only video files allowed");
          return;
        }
        if (file.size > VIDEO_MAX_SIZE) {
          setError("Video must be less than 20MB");
          return;
        }
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setError("");
      setCurrentFiles((prev) => [...prev, ...validFiles]);
    }
  };

  // 👉 Delete
  const removeFile = (index: number) => {
    setCurrentFiles((prev) => prev.filter((_, i) => i !== index));

    setCurrentCoverIndex((prev) => {
      if (prev === null) return null;
      if (prev === index) return 0;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  // 👉 Default Cover
  useEffect(() => {
    if (currentFiles.length > 0 && currentCoverIndex === null) {
      setCurrentCoverIndex(0);
    }
  }, [currentFiles]);

  return (
    <div>
      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
        <div className="bg-white p-6 rounded-xl">

          {/* TABS */}
          <div className="flex gap-3 mb-4">
            {["photo", "video"].map((tab) => (
              <div key={tab} className="border-2 border-black bg-[#cfe3f5] p-[4px]">
                <button
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-12 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
                    activeTab === tab ? "" : "opacity-70"
                  }`}
                >
                  {tab === "photo" ? "Photo" : "Video"}
                </button>
              </div>
            ))}
          </div>

          {/* NOTE */}
          <div className="text-xs text-gray-600 mb-2">
            {activeTab === "photo"
              ? "Upload JPG/PNG images (Max: 2MB each, Recommended: 1200x800)"
              : "Upload MP4 videos (Max: 20MB each, Recommended: 720p/1080p)"}
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}

          {/* MAIN */}
          <div className="flex gap-10">

            {/* LEFT PREVIEW */}
            <div>
              <div className="mt-3 w-[550px] h-[480px] bg-[#d9d9d9] rounded-xl overflow-hidden border border-gray-400">
                {currentFiles.length > 0 &&
                  (activeTab === "photo" ? (
                    <img
                      src={URL.createObjectURL(
                        currentFiles[currentCoverIndex || 0]
                      )}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(
                        currentFiles[currentCoverIndex || 0]
                      )}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ))}
              </div>

              <div className="flex gap-4 mt-3">
                <label className="bg-[#FFE600] w-28 text-center py-1 text-sm border border-black rounded-md cursor-pointer">
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
                    setCurrentCoverIndex(null);
                  }}
                  className="bg-[#FFC107] w-28 py-1 text-sm border border-black rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* RIGHT GRID */}
            <div className="flex flex-wrap w-[500px]">
              {currentFiles.length > 0
                ? currentFiles.map((file, index) => {
                    const preview = URL.createObjectURL(file);

                    return (
                      <div
                        key={index}
                        className="relative group cursor-pointer rounded-xl overflow-hidden bg-[#d9d9d9] m-[5px]"
                        style={{ width: "200px", height: "200px" }}
                        onClick={() => {
                          setSelectedIndex(index);
                          setCurrentCoverIndex(index);
                        }}
                      >
                        {activeTab === "photo" ? (
                          <img
                            src={preview}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={preview}
                            className="w-full h-full object-cover"
                          />
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white px-2 py-[2px] text-xs rounded opacity-0 group-hover:opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                : [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#d9d9d9] rounded-xl m-[5px]"
                      style={{ width: "200px", height: "200px" }}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>

          {activeTab === "photo" ? (
            <img
              src={URL.createObjectURL(currentFiles[selectedIndex])}
              className="max-h-[85%] max-w-[85%] object-contain"
            />
          ) : (
            <video
              src={URL.createObjectURL(currentFiles[selectedIndex])}
              className="max-h-[85%] max-w-[85%]"
              controls
            />
          )}

          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === 0 ? currentFiles.length - 1 : (prev as number) - 1
              )
            }
            className="absolute left-5 text-white text-5xl"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === currentFiles.length - 1 ? 0 : (prev as number) + 1
              )
            }
            className="absolute right-5 text-white text-5xl"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaManager;