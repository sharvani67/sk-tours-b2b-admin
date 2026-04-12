// const AddressManager = ({ form, handleChange }: any) => {
//   return (
//     <div>

//       {/* TITLE */}
//       <div className="flex justify-between items-center mb-2">
//         <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
//               Hotel Address
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid md:grid-cols-2 gap-6">

//         {/* LEFT CARD */}
//         <div className="bg-[#66FFFF] p-4 rounded-lg border border-black">

//           {[
//             { label: "Address Type", key: "address_type" },
//             { label: "Address", key: "address1" },
//             { label: "Address", key: "address2" },
//             { label: "Area", key: "area" },
//             { label: "Landmark", key: "landmark" },
//             { label: "Pincode", key: "pincode" },
//             { label: "City", key: "city" },
//             { label: "State", key: "state" },
//             { label: "Country", key: "country" },
//           ].map((item) => (
//             <div key={item.key} className="flex mb-2 rounded-md">

//               {/* LABEL */}
//               <div className="bg-[#FF0000] text-white px-3 py-2 w-40 text-sm rounded-md border border-black">
//                 {item.label}
//               </div>

//               {/* INPUT */}
//               <input
//                 value={form[item.key] || ""}
//                 onChange={(e) => handleChange(item.key, e.target.value)}
//                 className="flex-1 px-3 py-2 bg-[#FFDADA] text-black border border-black outline-none rounded-md"
//               />
//             </div>
//           ))}

     

//         </div>

//         {/* RIGHT CARD */}
//         <div className="bg-[#66FFFF] p-4 rounded-lg border border-black rounded-md">

//           {[
//             { label: "Address Type", key: "hotel_address_type" },
//             { label: "Address", key: "hotel_address1" },
//             { label: "Address", key: "hotel_address2" },
//             { label: "Area", key: "hotel_area" },
//             { label: "Landmark", key: "hotel_landmark" },
//             { label: "Pincode", key: "hotel_pincode" },
//             { label: "City", key: "hotel_city" },
//             { label: "State", key: "hotel_state" },
//             { label: "Country", key: "hotel_country" },
//           ].map((item) => (
//             <div key={item.key} className="flex mb-2 rounded-md">

//               {/* LABEL */}
//               <div className="bg-[#FF0000] text-white px-3 py-2 w-40 text-sm rounded-md border border-black">
//                 {item.label}
//               </div>

//               {/* INPUT */}
//               <input
//                 value={form[item.key] || ""}
//                 onChange={(e) => handleChange(item.key, e.target.value)}
//                 className="flex-1 px-3 py-2 bg-gray-200 bg-[#FFDADA] text-black border border-black rounded-md"
//               />
//             </div>
//           ))}

         

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

  /* ================= FETCH SUPPLIER ================= */

  useEffect(() => {
    if (!supplierId) return;

    const fetchSupplier = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/user/${supplierId}`);
        const data = await res.json();
        setSupplierData(data);
      } catch (err) {
        console.error("Failed to fetch supplier");
      }
    };

    fetchSupplier();
  }, [supplierId]);

  /* ================= LEFT PANEL DATA MAPPING ================= */

  const getSupplierValue = (key: string) => {
    switch (key) {
      case "address_type":
        return "Supplier Address";
      case "address1":
        return supplierData.area || "";
      case "address2":
        return ""; // not available in DB
      case "area":
        return supplierData.area || "";
      case "landmark":
        return supplierData.landmark || "";
      case "city":
        return supplierData.city || "";
      case "state":
        return supplierData.state || "";
      case "pincode":
        return supplierData.pincode || "";
      case "country":
        return supplierData.country || "";
      default:
        return "";
    }
  };

  return (
    <div>

      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Hotel Address
        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= LEFT CARD (READ ONLY) ================= */}
        <div className="bg-[#66FFFF] p-4 rounded-lg border border-black">

          {[
            { label: "Address Type", key: "address_type" },
            { label: "Address", key: "address1" },
            { label: "Address", key: "address2" },
            { label: "Area", key: "area" },
            { label: "Landmark", key: "landmark" },
            { label: "Pincode", key: "pincode" },
            { label: "City", key: "city" },
            { label: "State", key: "state" },
            { label: "Country", key: "country" },
          ].map((item) => (
            <div key={item.key} className="flex mb-2 rounded-md">

              {/* LABEL */}
              <div className="bg-[#FF0000] text-white px-3 py-2 w-40 text-sm rounded-md border border-black">
                {item.label}
              </div>

              {/* READ-ONLY INPUT */}
              <input
                value={getSupplierValue(item.key)}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-300 text-black border border-black outline-none rounded-md cursor-not-allowed"
              />
            </div>
          ))}

        </div>

        {/* ================= RIGHT CARD (EDITABLE) ================= */}
        <div className="bg-[#66FFFF] p-4 rounded-lg border border-black">

          {[
            { label: "Address Type", key: "hotel_address_type" },
            { label: "Address", key: "hotel_address1" },
            { label: "Address", key: "hotel_address2" },
            { label: "Area", key: "hotel_area" },
            { label: "Landmark", key: "hotel_landmark" },
            { label: "Pincode", key: "hotel_pincode" },
            { label: "City", key: "hotel_city" },
            { label: "State", key: "hotel_state" },
            { label: "Country", key: "hotel_country" },
          ].map((item) => (
            <div key={item.key} className="flex mb-2 rounded-md">

              {/* LABEL */}
              <div className="bg-[#FF0000] text-white px-3 py-2 w-40 text-sm rounded-md border border-black">
                {item.label}
              </div>

              {/* EDITABLE INPUT */}
              <input
                value={form[item.key] || ""}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="flex-1 px-3 py-2 bg-[#FFDADA] text-black border border-black outline-none rounded-md"
              />
            </div>
          ))}

          {/* OPTIONAL COPY BUTTON */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                handleChange("hotel_address1", supplierData.area || "");
                handleChange("hotel_area", supplierData.area || "");
                handleChange("hotel_landmark", supplierData.landmark || "");
                handleChange("hotel_city", supplierData.city || "");
                handleChange("hotel_state", supplierData.state || "");
                handleChange("hotel_pincode", supplierData.pincode || "");
                handleChange("hotel_country", supplierData.country || "");
              }}
              className="bg-[#002060] text-white px-4 py-2 rounded-md text-sm"
            >
              Copy Supplier Address →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AddressManager;