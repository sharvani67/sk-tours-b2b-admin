import { useState } from "react";
import { User } from "lucide-react";
import { useEffect } from "react";

type Staff = {
  firstName: string;
  lastName: string;
  post: string;
  cell1: string;
  cell2: string;
  landmark: string;
  email1: string;
  email2: string;
  landline: string;
  photo: File | null;
};

type Props = {
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
};

const StaffManager = ({ staff, setStaff }: Props) => {


  const addStaff = () => {
  setStaff([
    ...staff,
    {
      firstName: "",
      lastName: "",
      post: "",
      cell1: "",
      cell2: "",
      landmark: "",
      email1: "",
      email2: "",
      landline: "",
      photo: null,
    },
  ]);
};

  const update = (i: number, key: string, value: any) => {
    const updated = [...staff];
    updated[i][key] = value;
    setStaff(updated);
  };

  const remove = (i: number) => {
    setStaff(staff.filter((_, index) => index !== i));
  };
useEffect(() => {
  if (staff.length === 0) {
    addStaff();
  }
}, []);
  return (
<div>
       <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
               Staff Contact Details
        </div>
      </div>
    <div className="bg-[#66FFFF] p-4 rounded-xl border border-black rounded-md">

      {/* TITLE */}
  
   

      {/* HEADER BAR */}
     <div className="grid grid-cols-5 mb-4 overflow-hidden rounded-md gap-1">

  {/* LABEL */}
  <div className="bg-[#0c2d67] text-white p-2 text-center flex items-center justify-center rounded-md">
    Reservation Type
  </div>

  {/* INPUT */}
  <input
    type="text"
    placeholder="Enter type"
    className="bg-[#FFDADA] p-2 outline-none border border-black rounded-md"
  />

  {/* LABEL */}
  <div className="bg-[#0c2d67] text-white p-2 text-center flex items-center justify-center rounded-md">
    City
  </div>

  {/* INPUT + BUTTON */}
  <div className="bg-[#FFDADA] flex items-center justify-between px-2 rounded-md border border-black">
    <input
      type="text"
      placeholder="Enter city"
      className="bg-transparent outline-none flex-1 p-2"
    />

    
  </div>
<button className="bg-[#FF0000] text-white px-4 py-1 rounded-md border border-black">
      Add
    </button>
</div>

      {/* STAFF LIST */}
      {staff.map((s, i) => (
        <div key={i} className="mb-6">

          <div className="flex gap-4">

            {/* IMAGE */}
           <div className="w-[180px]">

  {/* IMAGE PREVIEW */}


 {s.photo ? (
  <img
    src={URL.createObjectURL(s.photo)}
    alt="staff"
    className="w-full h-[190px] object-cover border border-black rounded-md"
  />
) : (
  <div className="w-full h-[190px] flex items-center justify-center border border-black rounded-md bg-gray-200">
    <User className="w-12 h-12 text-gray-500" />
  </div>
)}


  {/* BUTTONS */}
  <div className="flex gap-2 mt-2">

    {/* UPLOAD */}
    <label className="bg-[#FF0000] text-white px-3 py-1 text-sm cursor-pointer rounded-md">
      Upload
    <input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) =>
    update(i, "photo", e.target.files?.[0] || null)
  }
/>
    </label>

    {/* DELETE */}
    <button
      onClick={() => update(i, "photo", null)}
      className="bg-[#FF0000] text-white px-3 py-1 text-sm rounded-md"
    >
      Delete
    </button>

  </div>

</div>

            {/* FORM */}
<div className="flex-1 space-y-1">

  {/* NAME ROW */}
  <div className="grid grid-cols-[120px_1fr_120px_120px] items-center gap-1">

    {/* LABEL */}
    <div className="bg-[#0c2d67] text-white px-3 py-1 text-md rounded-md">
      Name
    </div>

    {/* TWO INPUTS */}
<div className="flex gap-2">
  <input
    value={s.firstName || ""}
    onChange={(e) => update(i, "firstName", e.target.value)}
    placeholder="Name"
    className="bg-[#FFDADA] px-3 py-1 border border-black w-[245px] rounded-md"
  />
  <input
    value={s.lastName || ""}
    onChange={(e) => update(i, "lastName", e.target.value)}
    placeholder="SurName"
    className="bg-[#FFDADA] px-3 py-1 border border-black w-[245px] rounded-md"
  />
</div>


  </div>

  {/* OTHER FIELDS */}
  {[
    { label: "Post", key: "post" },
    { label: "Cell 1", key: "cell1" },
    { label: "Cell 2", key: "cell2" },
    { label: "Landmark", key: "landmark" },
    { label: "Email 1", key: "email1" },
    { label: "Email 2", key: "email2" },
    { label: "Landline", key: "landline" },
  ].map((field) => (
    <div
      key={field.key}
       className="grid grid-cols-[120px_500px_120px_120px] items-center gap-1"
    >

      {/* LABEL */}
      <div className="bg-[#0c2d67] text-white px-3 py-1 text-md border border-black rounded-md">
        {field.label}
      </div>

      {/* INPUT */}
      <input
        value={s[field.key] || ""}
        onChange={(e) => update(i, field.key, e.target.value)}
        className="bg-[#FFDADA] px-3 py-1 border border-black rounded-md w-[500px]"
      />

      {/* ACTIVE */}
      <button className="bg-[#FFFF00] py-1 border border-black rounded-md">
        Active
      </button>

      {/* HIDE */}
      <button className="bg-[#FFC000] py-1 border border-black rounded-md">
        Hide
      </button>

    </div>
  ))}

  {/* ADD BUTTON */}
  <div className="text-center mt-2">
    <button
      onClick={addStaff}
      className="bg-[#FF0000] text-white px-6 py-1 rounded-md"
    >
      Add
    </button>
  </div>

</div>

          </div>

        </div>
      ))}

    </div>
    </div>
  );
};

export default StaffManager;