import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Plus, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import AdminLayout from "@/components/admin/AdminLayout";
import { API_URL } from "@/config/api";
import { useParams } from "react-router-dom";

const inputClass =
"h-9 text-sm rounded-lg bg-card border border-gray-300 focus:ring-1 focus:ring-blue-500 px-2";

const selectClass =
  "h-9 rounded-lg bg-card border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2";

type Role = "agent" | "supplier";

const UserForm = ({ role }: { role: Role }) => {
  const navigate = useNavigate();
  const { id } = useParams();
const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
const [categories, setCategories] = useState<any[]>([]);
const [errors, setErrors] = useState<any>({});
const [form, setForm] = useState({
  companyName: "",
  firstName: "",
  lastName: "",
  contactPerson: "",
  emails: [""],
  mobiles: [""],

  // addressLine1: "",
  // addressLine2: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "",

  supplierType: "",
  otherSupplierType: "",
  gstApplicable: "no",
  gstNumber: "",
  agentType: "",
});

const addMobile = () => {
  setForm((prev) => ({
    ...prev,
    mobiles: [...prev.mobiles, ""],
  }));
};

const removeMobile = (index: number) => {
  const updated = [...form.mobiles];
  updated.splice(index, 1);

  setForm((prev) => ({
    ...prev,
    mobiles: updated,
  }));
};

const updateMobile = (index: number, value: string) => {
  const updated = [...form.mobiles];
  updated[index] = value;

  setForm((prev) => ({
    ...prev,
    mobiles: updated,
  }));
};

const addEmail = () => {
  setForm(prev => ({
    ...prev,
    emails: [...prev.emails, ""]
  }));
};

const removeEmail = (index:number) => {
  const updated = [...form.emails];
  updated.splice(index,1);

  setForm(prev => ({
    ...prev,
    emails: updated
  }));
};

const updateEmail = (index:number,value:string) => {
  const updated = [...form.emails];
  updated[index] = value;

  setForm(prev => ({
    ...prev,
    emails: updated
  }));
};

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  };

  fetchCategories();
}, []);

useEffect(() => {
  if (!id) return;

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/user/${id}`);
      const data = await res.json();

      setForm({
        companyName: data.company_name || "",
        firstName: data.contact_person?.split(" ")[0] || "",
        lastName: data.contact_person?.split(" ")[1] || "",
        contactPerson: data.contact_person || "",
       emails: data.email ? data.email.split(",") : [""],
        mobiles: data.mobile ? data.mobile.split(",") : [""],

        // addressLine1: data.address_line1 || "",
        // addressLine2: data.address_line2 || "",
        area: data.area || "",
        landmark: data.landmark || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
        country: data.country || "",

        supplierType: data.supplier_type || "",
        otherSupplierType: "",
        gstApplicable: data.gst_applicable || "no",
        gstNumber: data.gst_number || "",
        agentType: data.agent_type || "",
      });
    } catch (err) {
      toast.error("Failed to load user");
    }
  };

  fetchUser();
}, [id]);


const handleChange = (field: string, value: string) => {
  setForm(prev => {
    const updated = { ...prev, [field]: value };

    if (field === "firstName" || field === "lastName") {
      updated.contactPerson =
        `${updated.firstName} ${updated.lastName}`.trim();
    }

    return updated;
  });
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (loading) return;

  const newErrors: any = {};

  form.mobiles.forEach((mob, index) => {
    if (!mob.trim()) {
      newErrors[`mobile_${index}`] = "Mobile number required";
      return;
    }

    if (!/^\d{10}$/.test(mob)) {
      newErrors[`mobile_${index}`] = "Mobile must be 10 digits";
    }

    if (form.mobiles.indexOf(mob) !== index) {
      newErrors[`mobile_${index}`] = "Duplicate mobile number";
    }
  });

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    toast.error("Fix mobile errors");
    return;
  }

  const cleanedMobiles = form.mobiles.filter(m => m.trim() !== "");

//  if (
//   (role === "supplier" && !form.companyName) ||
//   (role === "agent" && !form.firstName) ||
//   form.emails.filter(e => e.trim()).length === 0
// ) {
//   toast.error("Required fields missing");
//   return;
// }

  setLoading(true);

  try {
  const payload = {
  role,
  company_name: form.companyName,
  contact_person: form.contactPerson,
  emails: form.emails.filter(e => e.trim() !== ""),
 mobiles: cleanedMobiles,

  // address_line1: form.addressLine1,
  // address_line2: form.addressLine2,
  area: form.area,
landmark: form.landmark,
  city: form.city,
  state: form.state,
  pincode: form.pincode,
  country: form.country,

  supplier_type:
    role === "supplier"
      ? form.supplierType === "Others"
        ? form.otherSupplierType
        : form.supplierType
      : null,

  agent_type: role === "agent" ? form.agentType : null,

  gst_applicable: form.gstApplicable,
  gst_number: form.gstApplicable === "yes" ? form.gstNumber : null,
};

    const url = isEdit
  ? `${API_URL}/api/admin/update-user/${id}`
  : `${API_URL}/api/admin/create-user`;

const method = isEdit ? "PUT" : "POST";

const res = await fetch(url, {
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.message || "Failed to create user");
      setLoading(false);
      return;
    }

    toast.success("User created Successfully🎉");
    navigate("/users");


  } catch (error) {
    console.error("Submit error:", error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-6">

<div className="grid grid-cols-2 gap-2">

{/* COMPANY NAME (SUPPLIER) */}
{role === "supplier" && (
  <div className="col-span-2">
    <Label className="text-sm">Company Name</Label>
    <Input
      className={inputClass}
      value={form.companyName}
      onChange={(e) => handleChange("companyName", e.target.value)}
    />
  </div>
)}

{/* INDIVIDUAL NAME */}
{role === "agent" && (
  <>
    <div>
      <Label className="text-sm">Individual Name</Label>
      <Input
        className={inputClass}
        value={form.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
      />
    </div>

    <div>
      <Label className="text-sm">Surname</Label>
      <Input
        className={inputClass}
        value={form.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
      />
    </div>
  </>
)}

</div>

<div className="grid md:grid-cols-2 gap-4">

{/* EMAIL SECTION */}
<div>
  <Label className="text-sm">Email</Label>

  {form.emails.map((email, index) => (
    <div key={index} className="flex gap-2 mt-1">

      <Input
        type="email"
        className={inputClass}
        value={email}
        onChange={(e) => updateEmail(index, e.target.value)}
      />

      {index === form.emails.length - 1 && (
        <button
          type="button"
          onClick={addEmail}
          className="px-2 rounded bg-green-500 text-white text-xs"
        >
          +
        </button>
      )}

      {form.emails.length > 1 && (
        <button
          type="button"
          onClick={() => removeEmail(index)}
          className="px-2 rounded bg-red-500 text-white text-xs"
        >
          -
        </button>
      )}
    </div>
  ))}
</div>


{/* MOBILE SECTION */}
<div>
  <Label>Mobile Number</Label>

  {form.mobiles.map((mob, index) => (
    <div key={index} className="mb-2">

     <div className="flex gap-2 mt-1">

        <Input
          value={mob}
          maxLength={10}
          type="tel"
          className={`${inputClass} ${
            errors[`mobile_${index}`] ? "border-red-500" : ""
          }`}
          onChange={(e) =>
            updateMobile(index, e.target.value.replace(/\D/g, ""))
          }
        />

        {index === form.mobiles.length - 1 && (
          <button
            type="button"
            onClick={addMobile}
            className="px-2 rounded bg-green-500 text-white text-xs"
          >
             +
          </button>
        )}

        {form.mobiles.length > 1 && (
          <button
            type="button"
            onClick={() => removeMobile(index)}
            className="px-2 rounded bg-red-500 text-white text-xs"
          >
            -
          </button>
        )}

      </div>

      {errors[`mobile_${index}`] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[`mobile_${index}`]}
        </p>
      )}

    </div>
  ))}
</div>

</div>

      {/* SUPPLIER SECTION */}
      {role === "supplier" && (
        <div>
          <Label>Supplier Type</Label>

          <div className="grid sm:grid-cols-2 gap-3">
            <select
              className={inputClass}
              value={form.supplierType}
              onChange={(e) =>
                handleChange("supplierType", e.target.value)
              }
              
            >
              <option value="">Select supplier type</option>

{categories.map((cat) => (
  <option key={cat.id} value={cat.category_name}>
    {cat.category_name}
  </option>
))}
            </select>

            {form.supplierType === "Others" && (
              <Input
                placeholder="Mention Type"
                className={inputClass}
                value={form.otherSupplierType}
                onChange={(e) =>
                  handleChange("otherSupplierType", e.target.value)
                }
                
              />
            )}
          </div>
        </div>
      )}


 {role === "agent" && (
  <div className="flex items-center gap-4">
    <Label className="whitespace-nowrap">Agent Type</Label>

    <select
      className={`${inputClass} w-56`}
      value={form.agentType}
      onChange={(e) => handleChange("agentType", e.target.value)}
      required
    >
      <option value="">Select Agent Type</option>
      <option value="Domestic">Domestic</option>
      <option value="International">International</option>
    </select>
  </div>
)}

      {/* GST SECTION */}
      <div>
        <Label>GST</Label>

        <div className="grid sm:grid-cols-4 gap-3 items-center">
        <select
  className={selectClass}
  value={form.gstApplicable}
  onChange={(e) =>
    handleChange("gstApplicable", e.target.value)
  }
>
  <option value="no">Not Applicable</option>
  <option value="yes">Applicable</option>
</select>

          <Input
            placeholder="GST Number"
            className={`${inputClass} sm:col-span-3 ${
              form.gstApplicable === "no"
                ? "bg-gray-100 cursor-not-allowed"
                : ""
            }`}
            value={form.gstNumber}
            onChange={(e) =>
              handleChange("gstNumber", e.target.value)
            }
            disabled={form.gstApplicable === "no"}
            required={form.gstApplicable === "yes"}
          />
        </div>
      </div>

      {/* LOCATION */}
      {/* ADDRESS */}
<div className="space-y-3">
{/* <div className="grid grid-cols-2 gap-2">
  <div>
    <Label>Address Line 1</Label>
    <Input
      className={inputClass}
      value={form.addressLine1}
      onChange={(e) => handleChange("addressLine1", e.target.value)}
      required
    />
  </div>

  <div>
    <Label>Address Line 2</Label>
    <Input
      className={inputClass}
      value={form.addressLine2}
      onChange={(e) => handleChange("addressLine2", e.target.value)}
    />
  </div>
</div> */}
<div className="grid grid-cols-2 gap-2">

<div>
  <Label className="text-sm">Area</Label>
  <Input
    className={inputClass}
    value={form.area}
    onChange={(e) => handleChange("area", e.target.value)}
  />
</div>

<div>
  <Label className="text-sm">Landmark</Label>
  <Input
    className={inputClass}
    value={form.landmark}
    onChange={(e) => handleChange("landmark", e.target.value)}
  />
</div>

<div>
  <Label className="text-sm">Pincode</Label>
  <Input
    className={inputClass}
    value={form.pincode}
    onChange={(e) => handleChange("pincode", e.target.value)}
  />
</div>

<div>
  <Label className="text-sm">City</Label>
  <Input
    className={inputClass}
    value={form.city}
    onChange={(e) => handleChange("city", e.target.value)}
  />
</div>

<div>
  <Label className="text-sm">State</Label>
  <Input
    className={inputClass}
    value={form.state}
    onChange={(e) => handleChange("state", e.target.value)}
  />
</div>

<div>
  <Label className="text-sm">Country</Label>
  <Input
    className={inputClass}
    value={form.country}
    onChange={(e) => handleChange("country", e.target.value)}
  />
</div>

</div>

</div>

     <Button
  type="submit"
  disabled={loading}
  className="w-full h-12 rounded-xl"
>
  {loading ? "Submitting..." : isEdit ? "Update User" : "Save"}
</Button>
    </form>
  );
};

export default function AdminUserForm() {
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold mb-6">Add New User</h2>

        <Tabs defaultValue="agent">
          <TabsList className="w-full flex bg-muted rounded-full p-1 mb-6">
            <TabsTrigger
              value="agent"
              className="flex-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Agent
            </TabsTrigger>

            <TabsTrigger
              value="supplier"
              className="flex-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Supplier
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agent">
            <UserForm role="agent" />
          </TabsContent>

          <TabsContent value="supplier">
            <UserForm role="supplier" />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}