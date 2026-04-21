import { useState, useEffect } from "react";
import { User } from "lucide-react";

// type Staff = {
//   firstName: string;
//   lastName: string;
//   post: string;
//   cell1: string;
//   cell2: string;
//   landmark: string;
//   email1: string;
//   email2: string;
//   landline: string;
//   extension: string;
//   photo: File | null;
//   is_active: boolean;
//   show_phones: boolean;
//   show_emails: boolean;
//   show_photo: boolean;
// };

type Staff = {
  firstName: string;
  lastName: string;
  post: string;
  reservation_type: string;
  city: string;
  cell1: string;
  cell2: string;
  landmark: string;
  email1: string;
  email2: string;
  landline: string;
  extension: string;
  photo: File | null;

  is_active: boolean; // ✅ ADD THIS

  active_fields: {
    post: boolean;
    cell1: boolean;
    cell2: boolean;
    landmark: boolean;
    email1: boolean;
    email2: boolean;
    landline: boolean;
  };

  show_phones: boolean;
  show_emails: boolean;
  show_photo: boolean;
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
      reservation_type: "",
      city: "",
      cell1: "",
      cell2: "",
      landmark: "",
      email1: "",
      email2: "",
      landline: "",
      extension: "",
      photo: null,

      active_fields: {
        post: true,
        cell1: true,
        cell2: true,
        landmark: true,
        email1: true,
        email2: true,
        landline: true,
      },

  
      is_active: true, // ✅ IMPORTANT
  show_phones: true,
  show_emails: true,
  show_photo: true,
    },
  ]);
};
const toggleField = (
  i: number,
  field: keyof Staff["active_fields"],
  value: boolean
) => {
  const updated = [...staff];
  updated[i].active_fields[field] = value;
  setStaff(updated);
};
 const update = <K extends keyof Staff>(
  i: number,
  key: K,
  value: Staff[K]
) => {
  const updated = [...staff];
  updated[i][key] = value;
  setStaff(updated);
};
const fields: { label: string; key: keyof Staff["active_fields"] }[] = [
  { label: "Post", key: "post" },
  { label: "Cell 1", key: "cell1" },
  { label: "Cell 2", key: "cell2" },
  { label: "Landmark", key: "landmark" },
  { label: "Email 1", key: "email1" },
  { label: "Email 2", key: "email2" },
];
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
      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Staff Contact Details
        </div>
      </div>

      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
        {/* HEADER */}
        <div className="grid grid-cols-5 mb-4 gap-1">
          <div className="bg-[#0c2d67] text-white p-2 text-center rounded-md">
            Reservation Type
          </div>

          {/* <input
            type="text"
            placeholder="Enter type"
            className="bg-[#fff] p-2 border border-black rounded-md"
          /> */}
          <input
  value={staff[0]?.reservation_type || ""}
  onChange={(e) => update(0, "reservation_type", e.target.value)}
  className="bg-[#fff] p-2 border border-black rounded-md"
/>

          <div className="bg-[#0c2d67] text-white p-2 text-center rounded-md">
            City
          </div>

          <div className="bg-[#fff] flex items-center px-2 border border-black rounded-md">
            {/* <input
              type="text"
              placeholder="Enter city"
              className="bg-transparent outline-none flex-1 p-2"
            /> */}
            <input
  value={staff[0]?.city || ""}
  onChange={(e) => update(0, "city", e.target.value)}
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
              <div className="w-[230px]">
                {s.photo ? (
                  <img
                    src={URL.createObjectURL(s.photo)}
                    alt="staff"
                    className="w-[full] h-[300px] object-contain bg-gray-200 border border-black rounded-md"
                  />
                ) : (
                  <div className="w-[full] h-[300px] flex items-center justify-center border border-black rounded-md bg-gray-200">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}

                <div className="flex gap-4 mt-2">
                  <label className="bg-yellow-400 text-black px-5 py-1 text-sm cursor-pointer rounded-md border border-black text-center">
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

                  <button
                    onClick={() => update(i, "photo", null)}
                    className="ml-[38px] bg-[#FF0000] text-white px-5 py-1 text-sm rounded-md border border-black"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* FORM */}
              <div className="w-[950px] ml-auto space-y-1">
                {/* NAME ROW */}
                <div className="grid grid-cols-[120px_1fr_120px_120px] items-center gap-2">
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
                      className="bg-[#fff] px-3 py-1 border border-black w-[245px] rounded-md"
                    />
                    <input
                      value={s.lastName || ""}
                      onChange={(e) => update(i, "lastName", e.target.value)}
                      placeholder="SurName"
                      className="bg-[#fff] px-3 py-1 border border-black w-[245px] rounded-md"
                    />
                  </div>
                </div>

                {/* OTHER FIELDS */}
               {fields.map((field) => (
  <div
    key={field.key}
    className="grid grid-cols-[120px_500px_90px_90px] items-center gap-1"
  >
    <div className="bg-[#0c2d67] text-white px-3 py-1 border border-black rounded-md">
      {field.label}
    </div>

    <input
      value={s[field.key] ?? ""}
      onChange={(e) => update(i, field.key, e.target.value)}
      className="bg-[#fff] px-3 py-1 border border-black rounded-md w-[500px]"
    />

                    {/* <button
                      onClick={() => update(i, "is_active", true)}
                      className={`px-2 py-1 text-sm border border-black rounded-md ${
                        s.is_active ? "bg-[#FFFF00]" : "bg-yellow-400"
                      }`}
                    >
                      Active 
                    </button>

                    <button
                      onClick={() => update(i, "is_active", false)}
                      className={`px-2 py-1 text-sm border border-black rounded-md ${
                        !s.is_active ? "bg-[#FFFF00]" : "bg-yellow-400"
                      }`}
                    >
                      Hide
                    </button> */}
<button
  onClick={() => toggleField(i, field.key, true)}
  className={`px-2 py-1 border border-black rounded-md ${
    s.active_fields[field.key] ? "bg-[#FFFF00]" : "bg-yellow-400"
  }`}
>
  Active
</button>

<button
  onClick={() => toggleField(i, field.key, false)}
  className={`px-2 py-1 border border-black rounded-md ${
    !s.active_fields[field.key] ? "bg-[#FFFF00]" : "bg-yellow-400"
  }`}
>
  Inactive
</button>
                  </div>
                ))}

                {/* ✅ LANDLINE + EXTENSION */}
                <div className="grid grid-cols-[120px_500px_90px_90px] items-center gap-1">
                  <div className="bg-[#0c2d67] text-white px-3 py-1 border border-black rounded-md">
                    Landline
                  </div>

                  <div className="flex items-center border border-black rounded-md overflow-hidden w-[500px]">
                    <input
                      value={s.landline}
                      onChange={(e) => update(i, "landline", e.target.value)}
                      className="bg-[#fff] px-3 py-1 flex-1 outline-none"
                      placeholder="Landline"
                    />

                    <div className="bg-[#0c2d67] text-white px-3 py-1">
                      Extension
                    </div>

                    <input
                      value={s.extension}
                      onChange={(e) => update(i, "extension", e.target.value)}
                      className="bg-[#fff] px-3 py-1 w-[90px] outline-none"
                      placeholder="12345"
                    />
                  </div>

                  <button
  onClick={() => toggleField(i, "landline", true)}
  className={`py-1 border border-black rounded-md ${
    s.active_fields.landline ? "bg-[#FFFF00]" : "bg-yellow-400"
  }`}
>
  Active
</button>

<button
  onClick={() => toggleField(i, "landline", false)}
  className={`py-1 border border-black rounded-md ${
    !s.active_fields.landline ? "bg-[#FFFF00]" : "bg-yellow-400"
  }`}
>
  Inactive
</button>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-center gap-3 mt-2">
                  <button
                    onClick={addStaff}
                    className="bg-yellow-400 text-black px-4 py-1 rounded-md border border-black"
                  >
                    Add
                  </button>

                  <button
                    onClick={() => remove(i)}
                    className="bg-[#FF0000] text-white px-4 py-1 rounded-md border border-black"
                  >
                    Remove
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
