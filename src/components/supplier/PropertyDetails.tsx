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
        .then(res => res.json())
        .then(data => {
          handleChange("name", data.company_name);
        });

    }

  }, []);



  return (
  <div className="bg-[#f4f4f4] p-4">

    {/* OUTER BORDER */}
    <div className="bg-[#0c2d67] p-3 rounded-2xl">

      {/* INNER BORDER */}
      <div className="bg-[#b9d3ea] p-2 rounded-xl">

        {/* CONTENT BACKGROUND */}
        <div className="bg-[#e6cfcf] rounded-xl p-6">
          {/* FORM */}
          <div className="space-y-4">

            <div className="grid md:grid-cols-4 gap-4">

              {/* PROPERTY NAME */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Property Name *
                </label>
                <Input
                  value={form.name}
                  readOnly
                  className="h-12 rounded-xl bg-white text-black border border-gray-300"
                />
              </div>

              {/* CATEGORY */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="h-12 w-full rounded-xl border px-4 bg-white text-black border-gray-300"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.category_name}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* TOTAL ROOMS */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Total No. of Rooms
                </label>
                <Input
                  type="number"
                  value={form.total_rooms ?? ""}
                  onChange={(e) =>
                    handleChange(
                      "total_rooms",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="h-12 rounded-xl bg-white text-black border border-gray-300"
                />
              </div>

              {/* STATE */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">State *</label>
                <select
                  value={form.state || ""}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="h-12 w-full rounded-xl border px-4 bg-white text-black border-gray-300"
                >
                  <option value="">Select State</option>
                  {states
                    .filter((s) => s.status === 1)
                    .map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.state_name}
                      </option>
                    ))}
                </select>
              </div>

              {/* CITY */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">City *</label>
                <Input
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="h-12 rounded-xl bg-white border border-gray-300"
                />
              </div>

              {/* AREA */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Area</label>
                <Input
                  value={form.area}
                  onChange={(e) => handleChange("area", e.target.value)}
                  className="h-12 rounded-xl bg-white border border-gray-300"
                />
              </div>

              {/* PINCODE */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Pincode</label>
                <Input
                  value={form.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  className="h-12 rounded-xl bg-white border border-gray-300"
                />
              </div>

              {/* LANDMARK */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Landmark</label>
                <Input
                  value={form.landmark}
                  onChange={(e) => handleChange("landmark", e.target.value)}
                  className="h-12 rounded-xl bg-white border border-gray-300"
                />
              </div>

              {/* CONTACT */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold">
                  Contact Numbers
                </label>

                {form.contacts.map((phone: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={phone}
                      onChange={(e) => updateContact(index, e.target.value)}
                      className="h-12 rounded-xl bg-white border border-gray-300"
                    />
                    <button onClick={addContact} className="px-3 bg-green-500 text-white rounded">+</button>
                    {form.contacts.length > 1 && (
                      <button onClick={() => removeContact(index)} className="px-3 bg-red-500 text-white rounded">-</button>
                    )}
                  </div>
                ))}
              </div>

              {/* EMAIL */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold">
                  Email Addresses
                </label>

                {form.emails.map((email: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={email}
                      onChange={(e) => updateEmail(index, e.target.value)}
                      className="h-12 rounded-xl bg-white border border-gray-300"
                    />
                    <button onClick={addEmail} className="px-3 bg-green-500 text-white rounded">+</button>
                    {form.emails.length > 1 && (
                      <button onClick={() => removeEmail(index)} className="px-3 bg-red-500 text-white rounded">-</button>
                    )}
                  </div>
                ))}
              </div>

              {/* FILE */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold">
                  Property Registration Certificate
                </label>
                <Input
                  type="file"
                  className="h-12 rounded-xl bg-white border border-gray-300"
                />
              </div>

              {/* TEXTAREA */}
              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold">
                  Full Overview
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full rounded-xl min-h-[100px] bg-white border border-gray-300 p-3"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
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
      setAmenities(prev => prev.filter(a => a !== amenity));
    } else {
      setAmenities(prev => [...prev, amenity]);
    }
  };

  const addCustomAmenity = () => {
    if (!customAmenity.trim()) return;

    if (!amenities.includes(customAmenity)) {
      setAmenities(prev => [...prev, customAmenity]);
    }

    setCustomAmenity("");
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(prev => prev.filter(a => a !== amenity));
  };

  return (
    <div className="bg-[#f4f4f4]">

      {/* HEADER */}
      {/* <div>
        <h2 className="text-3xl font-bold">
          Property Amenities
        </h2>
        <p className="text-muted-foreground mt-2">
          Select available amenities to improve visibility and booking rate.
        </p>
      </div> */}
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Property Amenities
        </div>
      </div>

      {/* MASTER AMENITIES GRID */}
      <div className="bg-[#0c2d67] text-white p-3 rounded-md">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-3">

          {MASTER_AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/20 transition"
            >
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              <span className="text-sm font-medium">
                {amenity}
              </span>
            </label>
          ))}

        </div>


        {/* CUSTOM AMENITY ADD */}
        <div className="border-t pt-8 space-y-4 mt-3">

          <h3 className="text-lg font-semibold">
            Add Custom Amenity
          </h3>

          <div className="flex gap-4">
            <Input
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              placeholder="Enter custom amenity"
              className="bg-[#FFDADA] text-black border-none"
            />
            <Button onClick={addCustomAmenity}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

        </div>


        {/* SELECTED AMENITIES DISPLAY */}
        {amenities.length > 0 && (
          <div className="border-t-2 border-white pt-8 space-y-4 mt-3">

            <h3 className="text-lg font-semibold text-white">
              Selected Amenities
            </h3>

            <div className="flex flex-wrap gap-3">

              {amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full"
                >
                  <span className="text-sm text-white">
                    {amenity}
                  </span>

                  <button
                    onClick={() => removeAmenity(amenity)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export { AmenitiesManager };