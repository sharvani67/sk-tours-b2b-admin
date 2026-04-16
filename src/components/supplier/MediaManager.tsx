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
//   // ================= TAB STATE =================
//   const [activeTab, setActiveTab] = useState<"normal" | "holiday">("normal");

//   // ================= HOLIDAY STATE =================
//   const [holidayImages, setHolidayImages] = useState<File[]>([]);
//   const [holidayVideos, setHolidayVideos] = useState<File[]>([]);
//   const [holidayCoverIndex, setHolidayCoverIndex] = useState<number | null>(
//     null,
//   );

//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   // ================= DYNAMIC SWITCH =================
//   const currentImages = activeTab === "normal" ? images : holidayImages;
//   const setCurrentImages =
//     activeTab === "normal" ? setImages : setHolidayImages;

//   const currentVideos = activeTab === "normal" ? videos : holidayVideos;
//   const setCurrentVideos =
//     activeTab === "normal" ? setVideos : setHolidayVideos;

//   const currentCoverIndex =
//     activeTab === "normal" ? coverIndex : holidayCoverIndex;

//   const setCurrentCoverIndex =
//     activeTab === "normal" ? setCoverIndex : setHolidayCoverIndex;

//   // ================= IMAGE UPLOAD =================
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setCurrentImages((prev) => [...prev, ...Array.from(e.target.files)]);
//   };

//   // ================= VIDEO UPLOAD =================
//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setCurrentVideos((prev) => [...prev, ...Array.from(e.target.files)]);
//   };

//   // ================= REMOVE IMAGE =================
//   const removeImage = (index: number) => {
//     setCurrentImages((prev) => prev.filter((_, i) => i !== index));

//     setCurrentCoverIndex((prev) => {
//       if (prev === null) return null;
//       if (prev === index) return 0;
//       if (prev > index) return prev - 1;
//       return prev;
//     });
//   };

//   // ================= REMOVE VIDEO =================
//   const removeVideo = (index: number) => {
//     setCurrentVideos((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ================= AUTO COVER =================
//   useEffect(() => {
//     if (currentImages.length > 0 && currentCoverIndex === null) {
//       setCurrentCoverIndex(0);
//     }
//   }, [currentImages]);

//   return (
//     <div>
//       {/* ================= MAIN BOX ================= */}
//       <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
//         <div className="bg-white p-6 rounded-xl">
//           {/* ================= TABS ================= */}
//           <div className="flex gap-2 mb-4">
//             <button
//               onClick={() => setActiveTab("normal")}
//               className={`px-6 py-2 border rounded-md text-sm font-semibold ${
//                 activeTab === "normal"
//                   ? "bg-[#0c2d67] text-white"
//                   : "bg-white text-black border-gray-400"
//               }`}
//             >
//               Normal Rate
//             </button>

//             <button
//               onClick={() => setActiveTab("holiday")}
//               className={`px-6 py-2 border rounded-md text-sm font-semibold ${
//                 activeTab === "holiday"
//                   ? "bg-[#0c2d67] text-white"
//                   : "bg-white text-black border-gray-400"
//               }`}
//             >
//               Public Holiday
//             </button>
//           </div>

//           <div className="grid grid-cols-2 gap-10">
//             {/* ================= PHOTOS ================= */}
//             <div className="grid grid-cols-2 gap-6">
//               {/* LEFT PREVIEW */}
//               <div>
//                 <div className="w-full h-[300px] bg-[#d9d9d9] rounded-xl overflow-hidden border border-gray-400">
//                   {currentImages.length > 0 ? (
//                     <img
//                       src={URL.createObjectURL(
//                         currentImages[currentCoverIndex || 0],
//                       )}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-full text-gray-500">
//                       Preview
//                     </div>
//                   )}
//                 </div>

//                 {/* BUTTONS */}
//                 <div className="flex gap-4 mt-3">
//                   <label className="bg-yellow-300 w-24 text-center py-1 text-xs border border-black rounded-md cursor-pointer">
//                     Upload
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageUpload}
//                     />
//                   </label>

//                   <button
//                     onClick={() => {
//                       setCurrentImages([]);
//                       setCurrentCoverIndex(null);
//                     }}
//                     className="bg-yellow-400 w-24 py-1 text-xs border border-black rounded-md"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {currentImages.length > 0
//                 ? currentImages.map((file, index) => {
//                     const preview = URL.createObjectURL(file);

//                     return (
//                       <div
//                         key={index}
//                         className="relative group cursor-pointer rounded-xl overflow-hidden"
//                         onClick={() => setSelectedIndex(index)}
//                       >
//                         <img
//                           src={preview}
//                           className="w-full h-[140px] object-cover transition-transform duration-200 group-hover:scale-105"
//                         />

//                         {/* DELETE */}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeImage(index);
//                           }}
//                           className="absolute top-1 right-1 bg-red-600 text-white px-2 text-xs rounded opacity-0 group-hover:opacity-100 transition"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     );
//                   })
//                 : [...Array(4)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="w-full h-[140px] bg-[#d9d9d9] rounded-xl"
//                     />
//                   ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
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
//   const [holidayVideos, setHolidayVideos] = useState<File[]>([]);
//   const [holidayCoverIndex, setHolidayCoverIndex] = useState<number | null>(
//     null,
//   );

//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   // ================= SWITCH =================
//   const currentImages = activeTab === "normal" ? images : holidayImages;
//   const setCurrentImages =
//     activeTab === "normal" ? setImages : setHolidayImages;

//   const currentCoverIndex =
//     activeTab === "normal" ? coverIndex : holidayCoverIndex;

//   const setCurrentCoverIndex =
//     activeTab === "normal" ? setCoverIndex : setHolidayCoverIndex;

//   // ================= UPLOAD =================
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setCurrentImages((prev) => [...prev, ...Array.from(e.target.files)]);
//   };

//   // ================= REMOVE =================
//   const removeImage = (index: number) => {
//     setCurrentImages((prev) => prev.filter((_, i) => i !== index));

//     setCurrentCoverIndex((prev) => {
//       if (prev === null) return null;
//       if (prev === index) return 0;
//       if (prev > index) return prev - 1;
//       return prev;
//     });
//   };

//   // ================= AUTO COVER =================
//   useEffect(() => {
//     if (currentImages.length > 0 && currentCoverIndex === null) {
//       setCurrentCoverIndex(0);
//     }
//   }, [currentImages]);

//   return (
//     <div>
//       <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
//         <div className="bg-white p-6 rounded-xl">
//           {/* ================= TABS ================= */}
//           <div className="flex gap-3 mb-4">
//             {/* NORMAL RATE */}
//             <div className="border-2 border-black bg-[#cfe3f5] p-[4px]">
//               <button
//                 onClick={() => setActiveTab("normal")}
//                 className={`px-12 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
//                   activeTab === "normal" ? "" : "opacity-80"
//                 }`}
//               >
//                 Normal Rate
//               </button>
//             </div>

//             {/* PUBLIC HOLIDAY */}
//             <div className="border-2 border-black bg-[rgb(170,209,244)] p-[4px]">
//               <button
//                 onClick={() => setActiveTab("holiday")}
//                 className={`px-12 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
//                   activeTab === "holiday" ? "" : "opacity-80"
//                 }`}
//               >
//                 Public Holiday
//               </button>
//             </div>
//           </div>
//           {/* ================= MAIN LAYOUT ================= */}
//           <div className="grid grid-cols-[1.2fr_1fr] gap-6">
//             {/* LEFT PREVIEW */}
//             <div>
//               <div className="w-[550px] h-[420px] bg-[#d9d9d9] rounded-xl overflow-hidden border border-gray-400">
//                 {currentImages.length > 0 && (
//                   <img
//                     src={URL.createObjectURL(
//                       currentImages[currentCoverIndex || 0],
//                     )}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>

//               {/* BUTTONS */}
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

//             {/* RIGHT GRID */}
//             <div className="grid grid-cols-2 gap-2">
//               {currentImages.length > 0
//                 ? currentImages.map((file, index) => {
//                     const preview = URL.createObjectURL(file);

//                     return (
//                       <div
//                         key={index}
//                         className="relative group cursor-pointer rounded-xl overflow-hidden"
//                         onClick={() => {
//                           setSelectedIndex(index);
//                           setCurrentCoverIndex(index);
//                         }}
//                       >
//                         <img
//                           src={preview}
//                           className="w-full h-[150px] object-cover transition duration-200 group-hover:scale-105"
//                         />

//                         {/* DELETE ON HOVER */}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeImage(index);
//                           }}
//                           className="absolute top-2 right-2 bg-red-600 text-white px-2 py-[2px] text-xs rounded opacity-0 group-hover:opacity-100 transition"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     );
//                   })
//                 : [...Array(4)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="w-[250px] h-[186px] bg-[#d9d9d9] rounded-xl"
//                     />
//                   ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {selectedIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
//           {/* CLOSE */}
//           <button
//             onClick={() => setSelectedIndex(null)}
//             className="absolute top-5 right-5 text-white text-3xl"
//           >
//             ✕
//           </button>

//           {/* IMAGE */}
//           <img
//             src={URL.createObjectURL(currentImages[selectedIndex])}
//             className="max-h-[85%] max-w-[85%] object-contain"
//           />

//           {/* PREV */}
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

//           {/* NEXT */}
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
  const [activeTab, setActiveTab] = useState<"normal" | "holiday">("normal");

  const [holidayImages, setHolidayImages] = useState<File[]>([]);
  const [holidayCoverIndex, setHolidayCoverIndex] = useState<number | null>(
    null,
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const currentImages = activeTab === "normal" ? images : holidayImages;
  const setCurrentImages =
    activeTab === "normal" ? setImages : setHolidayImages;

  const currentCoverIndex =
    activeTab === "normal" ? coverIndex : holidayCoverIndex;

  const setCurrentCoverIndex =
    activeTab === "normal" ? setCoverIndex : setHolidayCoverIndex;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setCurrentImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeImage = (index: number) => {
    setCurrentImages((prev) => prev.filter((_, i) => i !== index));

    setCurrentCoverIndex((prev) => {
      if (prev === null) return null;
      if (prev === index) return 0;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  useEffect(() => {
    if (currentImages.length > 0 && currentCoverIndex === null) {
      setCurrentCoverIndex(0);
    }
  }, [currentImages]);

  return (
    <div>
      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
        <div className="bg-white p-6 rounded-xl">
          {/* TABS */}
          <div className="flex gap-3 mb-4">
            <div className="border-2 border-black bg-[#cfe3f5] p-[4px]">
              <button
                onClick={() => setActiveTab("normal")}
                className={`px-12 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
                  activeTab === "normal" ? "" : "opacity-80"
                }`}
              >
                Normal Rate
              </button>
            </div>

            <div className="border-2 border-black bg-[#cfe3f5] p-[4px]">
              <button
                onClick={() => setActiveTab("holiday")}
                className={`px-12 py-2 text-sm font-semibold bg-[#123e6b] text-white ${
                  activeTab === "holiday" ? "" : "opacity-80"
                }`}
              >
                Public Holiday
              </button>
            </div>
          </div>

          {/* MAIN */}
          <div className="flex gap-10">
            {/* LEFT PREVIEW */}
            <div>
              <div className=" mt-3 w-[550px] h-[480px] bg-[#d9d9d9] rounded-xl overflow-hidden border border-gray-400">
                {currentImages.length > 0 && (
                  <img
                    src={URL.createObjectURL(
                      currentImages[currentCoverIndex || 0],
                    )}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex gap-4 mt-3">
                <label className="bg-[#FFE600] w-28 text-center py-1 text-sm border border-black rounded-md cursor-pointer">
                  Upload
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                <button
                  onClick={() => {
                    setCurrentImages([]);
                    setCurrentCoverIndex(null);
                  }}
                  className="bg-[#FFC107] w-28 py-1 text-sm border border-black rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* RIGHT CARDS (FIXED LAYOUT) */}
            <div className="flex flex-wrap w-[500px]">
              {currentImages.length > 0
                ? currentImages.map((file, index) => {
                    const preview = URL.createObjectURL(file);

                    return (
                      <div
                        key={index}
                        className="relative group cursor-pointer rounded-xl overflow-hidden bg-[#d9d9d9]"
                        style={{ width: "200px", height: "200px" }}
                        onClick={() => {
                          setSelectedIndex(index);
                          setCurrentCoverIndex(index);
                        }}
                      >

                        
                        <img
                          src={preview}
                          className="w-full h-full object-cover"
                        />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white px-2 py-[2px] text-xs rounded opacity-0 group-hover:opacity-100 transition"
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
                      style={{ width: "240px", height: "230px" }}
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

          <img
            src={URL.createObjectURL(currentImages[selectedIndex])}
            className="max-h-[85%] max-w-[85%] object-contain"
          />

          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === 0 ? currentImages.length - 1 : (prev as number) - 1,
              )
            }
            className="absolute left-5 text-white text-5xl"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === currentImages.length - 1 ? 0 : (prev as number) + 1,
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
