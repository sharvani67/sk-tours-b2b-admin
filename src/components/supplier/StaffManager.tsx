import { useState, useEffect } from "react";
import { User } from "lucide-react";

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
  extension: string;
  photo: File | null;
  is_active: boolean;
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
        cell1: "",
        cell2: "",
        landmark: "",
        email1: "",
        email2: "",
        landline: "",
        extension: "",
        photo: null,
        is_active: true,
        show_phones: true,
        show_emails: true,
        show_photo: true,
      },
    ]);
  };

  const update = (i: number, key: string, value: any) => {
    const updated = [...staff];
    updated[i][key as keyof Staff] = value;
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

          <input
            type="text"
            placeholder="Enter type"
            className="bg-[#fff] p-2 border border-black rounded-md"
          />

          <div className="bg-[#0c2d67] text-white p-2 text-center rounded-md">
            City
          </div>

          <div className="bg-[#fff] flex items-center px-2 border border-black rounded-md">
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
                {s.photo ? (
                  <img
                    src={URL.createObjectURL(s.photo)}
                    alt="staff"
                    className="w-full h-[300px] object-cover border border-black rounded-md"
                  />
                ) : (
                  <div className="w-full h-[300px] flex items-center justify-center border border-black rounded-md bg-gray-200">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}

                <div className="flex gap-2 mt-2">
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
                    className="bg-[#FF0000] text-white px-5 py-1 text-sm rounded-md border border-black"
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
                {[
                  { label: "Post", key: "post" },
                  { label: "Cell 1", key: "cell1" },
                  { label: "Cell 2", key: "cell2" },
                  { label: "Landmark", key: "landmark" },
                  { label: "Email 1", key: "email1" },
                  { label: "Email 2", key: "email2" },
                ].map((field) => (
                  <div
                    key={field.key}
                    className="grid grid-cols-[120px_500px_120px_120px] items-center gap-1"
                  >
                    <div className="bg-[#0c2d67] text-white px-3 py-1 border border-black rounded-md">
                      {field.label}
                    </div>

                    <input
                      value={s[field.key as keyof Staff] as string}
                      onChange={(e) => update(i, field.key, e.target.value)}
                      className="bg-[#fff] px-3 py-1 border border-black rounded-md w-[500px]"
                    />

                    <button
                      onClick={() => update(i, "is_active", true)}
                      className={`py-1 border border-black rounded-md ${
                        s.is_active ? "bg-[#FFFF00]" : "bg-yellow-400"
                      }`}
                    >
                      Active
                    </button>

                    <button
                      onClick={() => update(i, "is_active", false)}
                      className={`py-1 border border-black rounded-md ${
                        !s.is_active ? "bg-[#FFFF00]" : "bg-yellow-400"
                      }`}
                    >
                      Hide
                    </button>
                  </div>
                ))}

                {/* ✅ LANDLINE + EXTENSION */}
                <div className="grid grid-cols-[120px_500px_120px_120px] items-center gap-1">
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
                    onClick={() => update(i, "is_active", true)}
                    className={`py-1 border border-black rounded-md ${
                      s.is_active ? "bg-[#FFFF00]" : "bg-yellow-400"
                    }`}
                  >
                    Active
                  </button>

                  <button
                    onClick={() => update(i, "is_active", false)}
                    className={`py-1 border border-black rounded-md ${
                      !s.is_active ? "bg-[#FFFF00]" : "bg-yellow-400"
                    }`}
                  >
                    Hide
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
