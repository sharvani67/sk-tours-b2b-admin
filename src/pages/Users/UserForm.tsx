import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import AdminLayout from "@/components/admin/AdminLayout";
import { API_URL } from "@/config/api";

const inputClass =
  "h-12 rounded-xl bg-card border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3";

const selectClass =
  "h-12 rounded-xl bg-card border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3";

const UserForm = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const [categories, setCategories] = useState<any[]>([]);
const [form, setForm] = useState({
  companyName: "",
  firstName: "",
  lastName: "",
  contactPerson: "",
  email: "",
  mobile: "",

  addressLine1: "",
  addressLine2: "",
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

  if (loading) return; // Prevent double click

  if (!form.companyName || !form.contactPerson || !form.email || !form.mobile) {
    toast.error("Required fields missing");
    return;
  }

  setLoading(true);

  try {
  const payload = {
  role,
  company_name: form.companyName,
  contact_person: form.contactPerson,
  email: form.email,
  mobile: form.mobile,

  address_line1: form.addressLine1,
  address_line2: form.addressLine2,
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

    const res = await fetch(`${API_URL}/api/admin/create-user`, {
      method: "POST",
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

   <div className="space-y-4">

{role === "agent" ? (

  <>
    {/* COMPANY NAME FULL WIDTH */}
    <div>
      <Label>Company Name</Label>
      <Input
        className={inputClass}
        value={form.companyName}
        onChange={(e) => handleChange("companyName", e.target.value)}
        required
      />
    </div>

    {/* FIRST + LAST NAME */}
    <div className="grid sm:grid-cols-2 gap-4">

      <div>
        <Label>First Name</Label>
        <Input
          className={inputClass}
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Last Name</Label>
        <Input
          className={inputClass}
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          required
        />
      </div>

    </div>
  </>

) : (

  <>
    {/* SUPPLIER LAYOUT */}
    <div className="grid sm:grid-cols-2 gap-4">

      <div>
        <Label>Supplier Name</Label>
        <Input
          className={inputClass}
          value={form.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Contact Person</Label>
        <Input
          className={inputClass}
          value={form.contactPerson}
          onChange={(e) => handleChange("contactPerson", e.target.value)}
          required
        />
      </div>

    </div>
  </>

)}

</div>

      {/* CONTACT */}
      <div>
        <Label>Email Address</Label>
        <Input
          type="email"
          className={inputClass}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Mobile Number</Label>
        <Input
          className={inputClass}
          value={form.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          required
        />
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
              required
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
                required
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

  <div className="grid sm:grid-cols-2 gap-4">
    <Input
      placeholder="City"
      className={inputClass}
      value={form.city}
      onChange={(e) => handleChange("city", e.target.value)}
    />

    <Input
      placeholder="State"
      className={inputClass}
      value={form.state}
      onChange={(e) => handleChange("state", e.target.value)}
    />
  </div>

  <div className="grid sm:grid-cols-2 gap-4">
    <Input
      placeholder="Pincode"
      className={inputClass}
      value={form.pincode}
      onChange={(e) => handleChange("pincode", e.target.value)}
    />

    <Input
      placeholder="Country"
      className={inputClass}
      value={form.country}
      onChange={(e) => handleChange("country", e.target.value)}
    />
  </div>

</div>

     <Button
  type="submit"
  disabled={loading}
  className="w-full h-12 rounded-xl"
>
  {loading ? "Submitting..." : "Create & Send Credentials"}
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