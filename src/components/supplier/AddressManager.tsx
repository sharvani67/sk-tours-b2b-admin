

// import { useEffect, useState } from "react";
// import { API_URL } from "@/config/api";

// type Props = {
//   form: any;
//   handleChange: (key: string, value: string) => void;
//   supplierId?: string;
// };

// const AddressManager = ({ form, handleChange, supplierId }: Props) => {
//   const [supplierData, setSupplierData] = useState<any>({});

  

//   /* ================= FETCH SUPPLIER ================= */

//   useEffect(() => {
//     if (!supplierId) return;

//     const fetchSupplier = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/admin/user/${supplierId}`);
//         const data = await res.json();
//         setSupplierData(data);
//       } catch (err) {
//         console.error("Failed to fetch supplier");
//       }
//     };

//     fetchSupplier();
//   }, [supplierId]);

//   /* ================= LEFT PANEL DATA MAPPING ================= */

//   const getSupplierValue = (key: string) => {
//     switch (key) {
//       case "address_type":
//         return "Hotel Address";
//       case "address1":
//         return supplierData.area || "";
//       case "address2":
//         return ""; // not available in DB
//       case "area":
//         return supplierData.area || "";
//       case "landmark":
//         return supplierData.landmark || "";
//       case "city":
//         return supplierData.city || "";
//       case "state":
//         return supplierData.state || "";
//       case "pincode":
//         return supplierData.pincode || "";
//       case "country":
//         return supplierData.country || "";
//       default:
//         return "";
//     }
//   };

//   useEffect(() => {
//   if (!supplierData || !supplierId) return;

//   handleChange("address1", supplierData.address_line1 || "");
//   handleChange("address2", supplierData.address_line2 || "");
//   handleChange("area", supplierData.area || "");
//   handleChange("landmark", supplierData.landmark || "");
//   handleChange("city", supplierData.city || "");
//   handleChange("state", supplierData.state || "");
//   handleChange("pincode", supplierData.pincode || "");
//   handleChange("country", supplierData.country || "");

// }, [supplierData]);

  

//   return (
//     <div>
//       {/* TITLE */}
//       <div className="flex justify-between items-center mb-2">
//         <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
//           Hotel Address
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid md:grid-cols-2 gap-6">
       
//         {/* ================= LEFT CARD ================= */}
// <div className="bg-[#66FFFF] p-3 w-full max-w-2xl rounded-md">
//   {[
//     { label: "Address Type", key: "address_type" },
//     { label: "Address", key: "address1" },
//     { label: "Address", key: "address2" },
//     { label: "Area", key: "area" },
//     { label: "Landmark", key: "landmark" },
//     { label: "Pincode", key: "pincode" },
//     { label: "City", key: "city" },
//     { label: "State", key: "state" },
//     { label: "Country", key: "country" },
//   ].map((item, index) => (
//     <div key={item.key} className="flex mt-[1px]">
      
//       {/* LABEL */}
//       <div className="bg-[#e11900] text-white text-xs font-bold px-2 py-1 w-32 rounded-[5px] border-2 border-gray-700">
//         {item.label}
//       </div>

//       {/* INPUT (EDITABLE) */}
//       <input
//  value={form[item.key] || ""}
//   onChange={(e) => handleChange(item.key, e.target.value)}
//   className={`flex-1 px-2 py-1 text-xs rounded-[5px] border-2 border-l-0 border-gray-700 outline-none
//   ${index >= 3 ? "bg-[rgb(255,218,215)]" : "bg-[rgb(255,218,215)]"}`}
// />
//     </div>
//   ))}
// </div>

//         {/* ================= RIGHT CARD ================= */}
//         <div className="bg-[#66FFFF] p-3 rounded-md">
//           {[
//             { label: "Address Type", key: "hotel_address_type", value:"Central Reservation(Static)" },
//             { label: "Address", key: "hotel_address1" },
//             { label: "Address", key: "hotel_address2" },
//             { label: "Area", key: "hotel_area" },
//             { label: "Landmark", key: "hotel_landmark" },
//             { label: "Pincode", key: "hotel_pincode" },
//             { label: "City", key: "hotel_city" },
//             { label: "State", key: "hotel_state" },
//             { label: "Country", key: "hotel_country", value:"India(fetch)" },
//           ].map((item) => (
//             <div key={item.key} className="flex mt-[1px]">
//               {/* LABEL */}
//               <div className="bg-[#FF0000] text-white text-xs font-bold rounded-[5px] px-2 py-1 w-32 border-2 border-gray-700">
//                 {item.label}
//               </div>

//               {/* INPUT */}
//          <input
//   value={form[item.key] ?? item.value ?? ""}
//   onChange={(e) => handleChange(item.key, e.target.value)}
//   className={`flex-1 px-2 py-1 text-xs border-2 rounded-[5px] border-l-0 border-gray-700 outline-none 
//   ${item.key === "hotel_country" ? "bg-[#FFDADA]" : "bg-[rgb(255,218,215)]"}`}
// />
//             </div>
//           ))}

//           {/* BUTTON */}
//           {/* <div className="mt-2 flex justify-end">
//       <button
//         type="button"
//         onClick={() => {
//           handleChange("hotel_address1", supplierData.address1 || "");
//           handleChange("hotel_address2", supplierData.address2 || "");
//           handleChange("hotel_area", supplierData.area || "");
//           handleChange("hotel_landmark", supplierData.landmark || "");
//           handleChange("hotel_city", supplierData.city || "");
//           handleChange("hotel_state", supplierData.state || "");
//           handleChange("hotel_pincode", supplierData.pincode || "");
//           handleChange("hotel_country", supplierData.country || "");
//         }}
//         className="bg-[#002060] text-white px-3 py-1 text-xs rounded-md"
//       >
//         Copy Supplier Address →
//       </button>
//     </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressManager;


import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";

type Props = {
  form: any;
  handleChange: (key: string, value: string) => void;
  supplierId?: string;
};

const AddressManager = ({ form, handleChange, supplierId }: Props) => {
  const [supplierData, setSupplierData] = useState<any>({});

  useEffect(() => {
    if (!supplierId) return;

    const fetchSupplier = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/user/${supplierId}`);
        const data = await res.json();
        setSupplierData(data);
      } catch (err) {
        console.error("Failed to fetch supplier", err);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  useEffect(() => {
    if (!supplierData || Object.keys(supplierData).length === 0) return;

    handleChange("address_type", "");
    handleChange("address1", supplierData.address_line1 || supplierData.address1 || "");
    handleChange("address2", supplierData.address_line2 || supplierData.address2 || "");
    handleChange("area", supplierData.area || "");
    handleChange("landmark", supplierData.landmark || "");
    handleChange("pincode", supplierData.pincode || "");
    handleChange("city", supplierData.city || "");
    handleChange("state", supplierData.state || "");
  }, [supplierData]);

  const leftFields = [
    { label: "Address Type", key: "address_type" },
    { label: "Address", key: "address1" },
    { label: "Address", key: "address2" },
    { label: "Area", key: "area" },
    { label: "Landmark", key: "landmark" },
    { label: "Pincode", key: "pincode" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Country", key: "hotel_country" },
  ];

  const rightFields = [
    { label: "Address Type", key: "hotel_address_type" },
    { label: "Address", key: "hotel_address1" },
    { label: "Address", key: "hotel_address2" },
    { label: "Area", key: "hotel_area" },
    { label: "Landmark", key: "hotel_landmark" },
    { label: "Pincode", key: "hotel_pincode" },
    { label: "City", key: "hotel_city" },
    { label: "State", key: "hotel_state" },
    { label: "Country", key: "hotel_country" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Hotel Address
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#66FFFF] p-3 w-full max-w-2xl rounded-md">
          {leftFields.map((item) => (
            <div key={item.key} className="flex mt-[1px]">
              <div className="bg-[#e11900] text-white text-xs font-bold px-2 py-1 w-32 rounded-[5px] border-2 border-gray-700">
                {item.label}
              </div>

              <input
                value={form[item.key] || ""}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="flex-1 px-2 py-1 text-xs rounded-[5px] border-2 border-l-0 border-gray-700 outline-none bg-[rgb(255,218,215)]"
              />
            </div>
          ))}
        </div>

        <div className="bg-[#66FFFF] p-3 rounded-md">
          {rightFields.map((item) => (
            <div key={item.key} className="flex mt-[1px]">
              <div className="bg-[#FF0000] text-white text-xs font-bold rounded-[5px] px-2 py-1 w-32 border-2 border-gray-700">
                {item.label}
              </div>

              <input
                value={
                  form[item.key] ||
                  (item.key === "hotel_address_type" ? "Central Reservation" : "") ||
                  (item.key === "hotel_country" ? "India" : "")
                }
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="flex-1 px-2 py-1 text-xs border-2 rounded-[5px] border-l-0 border-gray-700 outline-none bg-[rgb(255,218,215)]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressManager;