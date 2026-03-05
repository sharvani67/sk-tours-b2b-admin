import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { API_URL } from "@/config/api";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [generatedPassword, setGeneratedPassword] = useState("");
const navigate = useNavigate();
 useEffect(() => {
  const loadUser = async () => {
    const res = await fetch(`${API_URL}/api/admin/user/${id}`);
    const data = await res.json();
    setUser(data);
    setGeneratedPassword(data.admin_password || "");
  };

  loadUser();
}, [id]);




const approveUser = async () => {
  const res = await fetch(`${API_URL}/api/admin/approve/${id}`, {
    method: "POST",
  });

  const data = await res.json();

  setGeneratedPassword(data.password);

  // refresh user state so status updates immediately
  setUser(prev => ({
    ...prev,
    status: "approved",
    admin_password: data.password,
  }));
};

  const rejectUser = async () => {
    await fetch(`${API_URL}/api/admin/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });
  };

  if (!user) return null;

  return (
   <AdminLayout>
     <div className="max-w-4xl mx-auto mb-4">
    <Button
      variant="outline"
      onClick={() => navigate(-1)}
      className="mb-2"
    >
      ← Back
    </Button>
  </div>
  <Card className="p-6 max-w-4xl mx-auto space-y-6">

    {/* HEADER */}
    <div className="border-b pb-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* COMPANY + META */}
        <div>
          <p className="text-xs text-muted-foreground uppercase">Company</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {user.company_name}
          </h1>

          <p className="mt-2 text-xs text-muted-foreground">
            Created on {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* STATUS PANEL */}
        <div className="flex gap-4">

          <div className="px-4 py-3 rounded-lg border bg-muted/40 min-w-[130px] text-center">
            <p className="text-xs text-muted-foreground uppercase">Role</p>
            <p className="font-semibold capitalize">{user.role}</p>
          </div>

             {user.role === "agent" && (
        <>
          <Info label="Agent Type" value={user.agent_type || "-"} />

          <div className="border rounded-lg p-3 bg-indigo-50 border-indigo-200">
            <p className="text-xs text-indigo-600 mb-1 uppercase">
              Agent Code
            </p>
            <p className="font-mono text-lg font-semibold text-indigo-900">
              {user.agent_code || "-"}
            </p>
          </div>
        </>
      )}

          <div className="px-4 py-3 rounded-lg border bg-muted/40 min-w-[130px] text-center">
            <p className="text-xs text-muted-foreground uppercase">Status</p>
            <p
              className={`font-semibold ${
                user.status === "approved"
                  ? "text-green-600"
                  : user.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {user.status}
            </p>
          </div>

        </div>
      </div>
    </div>

    {/* DETAILS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

      <Info label="Contact Person" value={user.contact_person} />
      <Info label="Email" value={user.email} />
      <Info label="Mobile" value={user.mobile} />

      {/* 🔥 AGENT FIELDS */}
   

      {/* 🔥 SUPPLIER FIELD */}
      {user.role === "supplier" && (
        <Info label="Supplier Type" value={user.supplier_type || "-"} />
      )}

      <Info label="Country" value={user.country} />
      <Info label="City" value={user.city} />
      <Info label="Pincode" value={user.pincode} />

      {/* ✅ FIXED GST DISPLAY */}
      <Info
        label="GST Applicable"
        value={user.gst_applicable === "yes" ? "Yes" : "No"}
      />

      <Info label="GST Number" value={user.gst_number || "-"} />

      <Info label="Registration Type" value={user.registration_type || "-"} />

    </div>

    {/* GENERATED PASSWORD */}
    {generatedPassword && (
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
        <p className="text-xs uppercase text-emerald-700 tracking-wide mb-1">
          System Generated Login Credential
        </p>
        <p className="font-mono text-lg font-semibold text-emerald-900">
          Password: {generatedPassword}
        </p>
      </div>
    )}

    {/* ACTIONS */}
    <div className="flex gap-3 pt-4">

      {user.status !== "approved" && (
        <Button onClick={approveUser}>
          Approve & Generate Password
        </Button>
      )}

      <Button variant="destructive" onClick={rejectUser}>
        Reject User
      </Button>

    </div>

  </Card>
</AdminLayout>
  );
}

/* Small reusable component */
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="border rounded-lg p-3 bg-muted/30">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}