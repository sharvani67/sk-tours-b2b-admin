import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";

const PropertyDetails = ({ form, handleChange, setCertificate }: any) => {

  const [allow24Hr, setAllow24Hr] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const addContact = () => {
    handleChange("contacts", [...form.contacts, ""]);
  };
  
  const removeContact = (index:number) => {
    const updated = [...form.contacts];
    updated.splice(index,1);
    handleChange("contacts", updated);
  };
  
  const updateContact = (index:number,value:string) => {
    const updated = [...form.contacts];
    updated[index] = value;
    handleChange("contacts", updated);
  };
  
  
  const addEmail = () => {
    handleChange("emails", [...form.emails, ""]);
  };
  
  const removeEmail = (index:number) => {
    const updated = [...form.emails];
    updated.splice(index,1);
    handleChange("emails", updated);
  };
  
  const updateEmail = (index:number,value:string) => {
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
  <div className="space-y-12">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold">
        Property Information
      </h2>
      <p className="text-muted-foreground mt-2">
        Enter complete property details for listing approval.
      </p>
    </div>

    {/* MAIN GRID */}
      <div className="grid md:grid-cols-4 gap-4">

      {/* PROPERTY NAME */}
      <div className="space-y-2 md:col-span-1">
        <label className="text-sm font-semibold">
          Property Name *
        </label>
       <Input
  value={form.name}
  readOnly
  className="h-12 rounded-xl text-black"
/>
      </div>

      {/* CATEGORY */}
      <div className="space-y-2 md:col-span-1">
        <label className="text-sm font-semibold">
          Category *
        </label>
        <select
          value={form.category}
          onChange={e => handleChange("category", e.target.value)}
          className="h-12 w-full rounded-xl border px-4 bg-background"
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
          min="0"
          value={form.total_rooms || ""}
          onChange={e => handleChange("total_rooms", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

       <div className="space-y-2">
  <label className="text-sm font-semibold">
    State *
  </label>

  <select
    value={form.state || ""}
    onChange={e => handleChange("state", e.target.value)}
    className="h-12 w-full rounded-xl border px-4 bg-background"
  >
    <option value="">Select State</option>

    {states
      .filter((s) => s.status === 1) // optional (only active states)
      .map((state) => (
        <option key={state.name} value={state.name}>
          {state.state_name}
        </option>
      ))}
  </select>
</div>

      {/* CITY */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          City *
        </label>
        <Input
          value={form.city}
          onChange={e => handleChange("city", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      {/* AREA */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Area
        </label>
        <Input
          value={form.area}
          onChange={e => handleChange("area", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      {/* PINCODE */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Pincode
        </label>
        <Input
          value={form.pincode}
          onChange={e => handleChange("pincode", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      {/* LANDMARK */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Landmark
        </label>
        <Input
          value={form.landmark}
          onChange={e => handleChange("landmark", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      {/* CONTACT */}
      <div className="space-y-2 md:col-span-2">
<label className="text-sm font-semibold">Contact Numbers</label>

{form.contacts.map((phone:string,index:number)=>(
<div key={index} className="flex gap-2">

<Input
 value={phone}
 onChange={e=>updateContact(index,e.target.value)}
 className="h-12 rounded-xl"
/>

<button
 type="button"
 onClick={addContact}
 className="px-3 bg-green-500 text-white rounded"
>
+
</button>

{form.contacts.length>1 && (
<button
 type="button"
 onClick={()=>removeContact(index)}
 className="px-3 bg-red-500 text-white rounded"
>
-
</button>
)}

</div>
))}
</div>

      {/* EMAIL */}
     <div className="space-y-2 md:col-span-2">
<label className="text-sm font-semibold">Email Addresses</label>

{form.emails.map((email:string,index:number)=>(
<div key={index} className="flex gap-2">

<Input
 value={email}
 onChange={e=>updateEmail(index,e.target.value)}
 className="h-12 rounded-xl"
/>

<button
 type="button"
 onClick={addEmail}
 className="px-3 bg-green-500 text-white rounded"
>
+
</button>

{form.emails.length>1 && (
<button
 type="button"
 onClick={()=>removeEmail(index)}
 className="px-3 bg-red-500 text-white rounded"
>
-
</button>
)}

</div>
))}
</div>

         {/* REGISTRATION CERTIFICATE */}
       <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-semibold">
          Property Registration Certificate
        </label>
        <Input
          type="file"
          accept="application/pdf,image/*"
          className="h-12 rounded-xl"
          onChange={(e) => setCertificate(e.target.files?.[0])}
        />
      </div>

      {/* ADDRESS */}
      <div className="md:col-span-3 space-y-2">
        <label className="text-sm font-semibold">
          Full Address
        </label>
        <Textarea
          value={form.address}
          onChange={e => handleChange("address", e.target.value)}
          className="rounded-xl min-h-[100px]"
        />
      </div>

      {/* HOTEL REMARKS */}
      <div className="md:col-span-3 space-y-2">
        <label className="text-sm font-semibold">
          Hotel Remarks
        </label>
        <Textarea
          value={form.hotel_remarks}
          onChange={e => handleChange("hotel_remarks", e.target.value)}
          placeholder="Special notes, property highlights..."
          className="rounded-xl min-h-[100px]"
        />
      </div>

   

    </div>

  </div>
);


};

export default PropertyDetails;