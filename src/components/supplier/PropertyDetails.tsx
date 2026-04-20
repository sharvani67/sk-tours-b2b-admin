import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const PropertyDetails = ({ form, handleChange, setCertificate }: any) => {
  const [allow24Hr, setAllow24Hr] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const addContact = () => {
    handleChange("contacts", [...form.contacts, ""]);
  };

  const removeContact = (index: number) => {
    const updated = [...form.contacts];
    updated.splice(index, 1);
    handleChange("contacts", updated);
  };

  const updateContact = (index: number, value: string) => {
    const updated = [...form.contacts];
    updated[index] = value;
    handleChange("contacts", updated);
  };

  const addEmail = () => {
    handleChange("emails", [...form.emails, ""]);
  };

  const removeEmail = (index: number) => {
    const updated = [...form.emails];
    updated.splice(index, 1);
    handleChange("emails", updated);
  };

  const updateEmail = (index: number, value: string) => {
    const updated = [...form.emails];
    updated[index] = value;
    handleChange("emails", updated);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(`${API_URL}/api/states`);
        const data = await res.json();
        setStates(data);
      } catch (error) {
        console.error("Failed to fetch states");
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (!form.name && form.supplier_id) {
      fetch(`${API_URL}/api/admin/supplier/${form.supplier_id}`)
        .then((res) => res.json())
        .then((data) => {
          handleChange("name", data.company_name);
        });
    }
  }, []);

  //change by navya
  return (
    <>
      {/* OVERVIEW HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Overview
        </div>
      </div>

      <div className="bg-[#0c2d67] p-4 rounded-2xl">
        {/* INNER BORDER */}
        <div className="bg-[#b9d3ea] p-3 rounded-2xl">
          {/* INNER BORDER */}
          {/* <div className="bg-[#b9d3ea] p-2 rounded-xl"> */}

          {/* CONTENT BACKGROUND */}
          <div className="bg-[rgb(255,218,215)] rounded-xl p-6">
            {/* FORM */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                {/* PROPERTY NAME */}
  

                {/* FILE */}

                {/* TEXTAREA */}
                <div className="md:col-span-4 space-y-2">
                  <label className="text-sm font-semibold">Full Overview</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full rounded-xl min-h-[100px] bg-white border border-gray-300 p-3"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">
                    Property Registration Certificate
                  </label>
                  <Input
                    type="file"
                    className="h-12 rounded-xl bg-white border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;

type Props = {
  amenities: string[];
  setAmenities: React.Dispatch<React.SetStateAction<string[]>>;
};

const MASTER_AMENITIES = [
  "Free WiFi",
  "Air Conditioning",
  "Swimming Pool",
  "Parking",
  "Restaurant",
  "Bar",
  "Gym",
  "Spa",
  "Room Service",
  "Laundry Service",
  "Power Backup",
  "Elevator",
  "Conference Hall",
  "Doctor on Call",
  "CCTV Security",
  "Fire Safety",
];

const AmenitiesManager = ({ amenities, setAmenities }: Props) => {
  const [customAmenity, setCustomAmenity] = useState("");

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities((prev) => prev.filter((a) => a !== amenity));
    } else {
      setAmenities((prev) => [...prev, amenity]);
    }
  };

  const addCustomAmenity = () => {
    if (!customAmenity.trim()) return;

    if (!amenities.includes(customAmenity)) {
      setAmenities((prev) => [...prev, customAmenity]);
    }

    setCustomAmenity("");
  };

  const removeAmenity = (amenity: string) => {
    setAmenities((prev) => prev.filter((a) => a !== amenity));
  };

  return (
   
    <div className="bg-[#f4f4f4]">
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Property Amenities
        </div>
      </div>
      <div className="bg-[#0c2d67] p-4 rounded-2xl">
        <div className="bg-[#b9d3ea] p-3 rounded-2xl">
          {/* MASTER AMENITIES GRID */}
          <div className="bg-[rgb(255,218,215)] text-black p-3 rounded-md">
            <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-3">
              {MASTER_AMENITIES.map((amenity) => (
              
                <label
                  key={amenity}
                  className="flex items-center gap-3 border-2 border-[#2c5f7c] rounded-xl p-4 cursor-pointer bg-[#7fd8dc]"
                >
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-5 h-5 accent-[#2c5f7c] scale-125 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm font-medium bg-[#f3dede] px-4 h-10 w-[220px] flex items-center rounded-md border border-[#2c5f7c]">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>

            {/* CUSTOM AMENITY ADD */}
            <div className="border-t pt-8 space-y-4 mt-3">
              <h3 className="text-lg font-semibold">Add Custom Amenity</h3>

              <div className="flex gap-4">
                <Input
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  placeholder="Enter custom amenity"
                  className="bg-[#fff] text-black border-black"
                />
                <Button onClick={addCustomAmenity}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* SELECTED AMENITIES DISPLAY */}
            {amenities.length > 0 && (
  <div className="border-t pt-8 space-y-4 mt-3">
    <h3 className="text-lg font-semibold text-black">
      Selected Amenities
    </h3>

    <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-3">
      {amenities.map((amenity) => (
        <div
          key={amenity}
          className="flex items-center justify-between border-2 border-[#2c5f7c] rounded-xl p-3 bg-[#7fd8dc]"
        >
          {/* TEXT */}
          <span className="text-sm font-medium bg-[#f3dede] px-3 py-2 rounded-md border border-[#2c5f7c] flex-1 mr-2">
            {amenity}
          </span>

          {/* DELETE ICON */}
          <button
            onClick={() => removeAmenity(amenity)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AmenitiesManager };
