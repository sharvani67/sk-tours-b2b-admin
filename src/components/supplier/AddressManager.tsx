const AddressManager = ({ form, handleChange }: any) => {
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

        {/* LEFT CARD */}
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

              {/* INPUT */}
              <input
                value={form[item.key] || ""}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="flex-1 px-3 py-2 bg-[#FFDADA] text-black border border-black outline-none rounded-md"
              />
            </div>
          ))}

     

        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#66FFFF] p-4 rounded-lg border border-black rounded-md">

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

              {/* INPUT */}
              <input
                value={form[item.key] || ""}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-200 bg-[#FFDADA] text-black border border-black rounded-md"
              />
            </div>
          ))}

         

        </div>

      </div>

    </div>
  );
};
export default AddressManager;