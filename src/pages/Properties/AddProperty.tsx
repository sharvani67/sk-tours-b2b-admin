import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import PropertyDetails, { AmenitiesManager } from "@/components/supplier/PropertyDetails";
import StaffManager from "@/components/supplier/StaffManager";
import PricingManager from "@/components/supplier/PricingManager";
import MediaManager from "@/components/supplier/MediaManager";
// import AmenitiesManager from "@/components/supplier/AmenitiesManager";
import SightSeeingManager from "@/components/supplier/SightSeeingManager";
import QAManager from "@/components/supplier/QAManager";
import BookingPoliciesManager from "@/components/supplier/BookingPoliciesManager";
import CancellationPoliciesManager from "@/components/supplier/CancellationPoliciesManager";
import CheckinManager from "@/components/supplier/CheckinManager";
import BankDetailsManager from "@/components/supplier/BankDetailsManager";
import AddressManager from "@/components/supplier/AddressManager";
import AnnualChargesManager  from "@/components/supplier/AnnualChargesManager ";

import {
  Building2,
  Users,
  IndianRupee,
  Image,
  Sparkles,
  Map,
  HelpCircle,
  FileText,
  Ban,
  Clock,
  Landmark
} from "lucide-react";

/* ===================== TABS ===================== */

const TABS = [
  "Overview",
  "Address",
  "Rooms Rates",
  "Staff Details",
  "Question & Answers",
  "Booking & Cancellation Policy",
  "Bank Details",
  "Media",
  "Annual Charges",
];



export default function AdminAddProperty() {

  const navigate = useNavigate();
 const { supplierId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [submitting, setSubmitting] = useState(false);
const [showCancelPopup, setShowCancelPopup] = useState(false);
const [propertyDraftId, setPropertyDraftId] = useState<number | null>(null);
const [amenities, setAmenities] = useState<string[]>([]);
  /* ================= BASIC DETAILS ================= */

  const [form, setForm] = useState({
    name: "",
    category: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    address: "",
    landmark: "",
    contacts: [""],
    emails: [""],
    total_rooms: "",
    hotel_remarks: ""
  });
const [pricingData, setPricingData] = useState({
  validFrom: "",
  validTo: "",
  meals: {
    lunchAdult: "",
    lunchChild: "",
    dinnerAdult: "",
    dinnerChild: ""
  }
});

const attachMealsToRooms = (rooms: any[], meals: any[]) => {
  return rooms.map(room => ({
    ...room,
    meals: meals
      .filter(m => m.room_id === room.id)
      .map(m => ({
        name: m.meal_name,
        price: String(m.price),
        available: m.is_available === 1
      }))
  }));
};
  useEffect(() => {

    if (supplierId) {
      loadDraft();
    }

  }, [supplierId]);
  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
  setShowCancelPopup(true);
};

const confirmCancel = () => {
  navigate("/users");
};

const closePopup = () => {
  setShowCancelPopup(false);
};


  /* ================= STATES ================= */

  const [rooms, setRooms] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState<number | null>(null);
 const [categories, setCategories] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);

  const [sightseeing, setSightSeeing] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [policies, setPolicies] = useState({
  booking_policy: "",
  cancellation_policy: "",
  child_policy: "",
  pet_policy: "",
  terms: ""
});
  const [cancellationRules, setCancellationRules] = useState<any[]>([]);
  const [checkinData, setCheckinData] = useState<any>({});

  const [certificate, setCertificate] = useState<File | null>(null);

   type BankDetails = {
  account_holder: string;
  bank_name: string;
  account_number: string;
  ifsc: string;
  branch: string;
  cancelled_cheque: File | null;
};

 const [bankDetails, setBankDetails] = useState<BankDetails[]>([
  {
    account_holder: "",
    bank_name: "",
    account_number: "",
    ifsc: "",
    branch: "",
    cancelled_cheque: null,
  },
]);
const [annualCharges, setAnnualCharges] = useState({
  maintenance_amount: "",
  maintenance_note: "",
  service_amount: "",
  service_note: "",
  gst_amount: "",
  gst_note: "",
  extra_amount: "",
  extra_note: "",
});

// ✅ ADD HERE 👇👇👇
const validateTab = () => {

  // TAB 0 → Overview
  if (activeTab === 0) {
    if (!form.name) return "Property name is required";
    
  }

  // TAB 2 → Rooms
  if (activeTab === 2) {
    if (!rooms.length) return "Add at least one room";
  }

  // TAB 6 → Bank
  if (activeTab === 6) {
    if (!bankDetails[0]?.account_holder)
      return "Account holder name required";
  }

  return null;
};

const validateAll = () => {

  if (!form.name) return { tab: 0, msg: "Enter property name" };
  // if (!form.category) return { tab: 0, msg: "Select category" };
  // if (!form.state) return { tab: 0, msg: "Select state" };
  // if (!form.city) return { tab: 0, msg: "Select city" };

  if (!rooms.length) return { tab: 2, msg: "Add rooms" };

  if (!bankDetails[0]?.account_holder)
    return { tab: 6, msg: "Enter bank details" };

  return null;
};

const loadDraft = async () => {

  try {

    const res = await fetch(`${API_URL}/api/properties/get-draft/${supplierId}`);
    const data = await res.json();
    const updatedRooms = attachMealsToRooms(data.rooms, data.meals || []);

    if (!data) return;

    setPropertyDraftId(data.id);

    setForm(data.form ? JSON.parse(data.form) : form);
    setRooms(updatedRooms);
    setStaff(data.staff ? JSON.parse(data.staff) : []);
    setAmenities(data.amenities ? JSON.parse(data.amenities) : []);
    setSightSeeing(data.sightseeing ? JSON.parse(data.sightseeing) : []);
    setFaqs(data.faqs ? JSON.parse(data.faqs) : []);
    setPolicies(data.policies ? JSON.parse(data.policies) : {});
    setCancellationRules(data.cancellation_rules ? JSON.parse(data.cancellation_rules) : []);
    setCheckinData(data.checkin_data ? JSON.parse(data.checkin_data) : {});
    setBankDetails(data.bank_details ? JSON.parse(data.bank_details) : []);

  } catch (err) {

    console.error("Draft load error:", err);

  }

};

  /* ================= NAVIGATION ================= */
const saveAndContinue = async () => {

  const error = validateTab();

  if (error) {
    toast.error(error);
    return;
  }

  await saveDraft();

  if (activeTab < TABS.length - 1) {
    setActiveTab(prev => prev + 1);
  }
};
  const nextTab = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(prev => prev + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(prev => prev - 1);
    }
  };


const saveDraft = async () => {

  try {

    const formData = new FormData();

    formData.append("form", JSON.stringify(form));
    formData.append("supplier_id", String(supplierId));
    formData.append("rooms", JSON.stringify(rooms));
    formData.append("staff", JSON.stringify(staff));
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("sightseeing", JSON.stringify(sightseeing));
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("policies", JSON.stringify(policies));
    formData.append("cancellation_rules", JSON.stringify(cancellationRules));
    formData.append("checkin_data", JSON.stringify(checkinData));
    formData.append("bank_details", JSON.stringify(bankDetails));
    formData.append("annual_charges", JSON.stringify(annualCharges));
    formData.append("contacts", JSON.stringify(form.contacts));
    formData.append("emails", JSON.stringify(form.emails));

    if (propertyDraftId) {
      formData.append("property_id", String(propertyDraftId));
    }

    const res = await fetch(`${API_URL}/api/properties/save-draft`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    setPropertyDraftId(data.propertyId);

    toast.success("Draft saved");

  } catch (err) {
    toast.error("Draft save failed");
  }

};



  /* ================= SUBMIT ================= */

  const submitProperty = async () => {

    const validation = validateAll();

if (validation) {
  toast.error(validation.msg);
  setActiveTab(validation.tab); // 🔥 auto move to tab
  return;
}

    setSubmitting(true);

    try {

    
      if (!supplierId) {
        toast.error("Please login again");
        return;
      }

      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) =>
        formData.append(k, v as string)
      );

      formData.append("supplier_id", String(supplierId));
      formData.append("rooms", JSON.stringify(rooms));
      formData.append("staff", JSON.stringify(staff));
      formData.append("amenities", JSON.stringify(amenities));
      formData.append("coverIndex", String(coverIndex ?? 0));
      formData.append("sightseeing", JSON.stringify(sightseeing));
      formData.append("faqs", JSON.stringify(faqs));
      formData.append("policies", JSON.stringify(policies));
      formData.append("cancellation_rules", JSON.stringify(cancellationRules));
      formData.append("checkin_data", JSON.stringify(checkinData));
      formData.append("contacts", JSON.stringify(form.contacts));
      formData.append("emails", JSON.stringify(form.emails));
      formData.append("valid_from", pricingData.validFrom);
formData.append("valid_to", pricingData.validTo);
formData.append("meals", JSON.stringify(pricingData.meals));
formData.append("annual_charges", JSON.stringify(annualCharges));
      if (certificate) formData.append("certificate", certificate);

      images.forEach(img => formData.append("images", img));
      videos.forEach(v => formData.append("videos", v));

      staff.forEach(member => {
        if (member.photo) formData.append("staffPhotos", member.photo);
      });

    formData.append("bank_details", JSON.stringify(bankDetails));

     bankDetails.forEach((bank) => {
  if (bank.cancelled_cheque) {
    formData.append("cancelledCheque", bank.cancelled_cheque);
  }
});

      const res = await fetch(
        `${API_URL}/api/properties/add-property`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create property");
        return;
      }

      toast.success("Property created successfully 🎉");

      setTimeout(() => {
        navigate("/properties");
      }, 1200);

    } catch (err) {
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

useEffect(() => {

  const fetchSupplier = async () => {

    const res = await fetch(`${API_URL}/api/admin/supplier/${supplierId}`);
    const data = await res.json();

    setForm(prev => ({
      ...prev,
      name: data.company_name
    }));

  };

  if (supplierId) fetchSupplier();

}, [supplierId]);

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
  /* ================= UI ================= */

  return (
    <AdminLayout>

      <div className="space-y-2">

        {/* PAGE HEADER */}

        <div className="flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-bold">Add Property</h1>
    <p className="text-muted-foreground">
      Create a new hotel / resort property
    </p>
  </div>

  <Button
    variant="outline"
    onClick={handleBack}
  >
    ← Back
  </Button>
</div>

{showCancelPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

    <div className="bg-white rounded-2xl shadow-xl p-6 w-[380px]">

      <h2 className="text-lg font-semibold mb-2">
        Cancel Property Entry
      </h2>

      <p className="text-sm text-muted-foreground mb-6">
        Do you want to cancel this entry?  
        All unsaved data will be lost.
      </p>

      <div className="flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={closePopup}
        >
          No
        </Button>

        <Button
          variant="destructive"
          onClick={confirmCancel}
        >
          Yes, Cancel
        </Button>

      </div>

    </div>

  </div>
)}

<div className="w-full bg-[#66FFFF] rounded-md px-4 py-1 flex gap-4 items-center mb-0">
  {/* Company Name */}
  <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
    {/* <span className="bg-[#002060] text-white px-3 py-1 rounded-md text-sm font-medium">
      Category:   {form.category || "N/A"}
    </span> */}
    <select
  value={form.category}
  onChange={(e) => handleChange("category", e.target.value)}
>
  <option value="">Select Category</option>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>
  </div>
</div>

   {/* TOP INFO BAR */}

<div className="w-full bg-[#66FFFF] rounded-md px-4 py-1 flex gap-4 items-center mb-0">

  {/* Company Name */}
  <div className="flex items-center gap-2">
    <span className="bg-[#002060] text-white px-3 py-1 rounded-md text-sm font-medium">
      Property Name
    </span>
    <div className="bg-[#b2f5f5] px-4 py-1 rounded-md min-w-[250px] text-sm border-2 border-black">
      {form.name || "N/A"}
    </div>
  </div>

  {/* Type of Company */}
  <div className="flex items-center gap-2">
    <span className="bg-[#002060] text-white px-3 py-1 rounded-md text-sm font-medium">
      Type of Company
    </span>
       <div className="bg-[#b2f5f5] px-4 py-1 rounded-md min-w-[250px] text-sm border-2 border-black">
      {form.category || "N/A"}
    </div>
  </div>

  {/* City */}
  <div className="flex items-center gap-2">
    <span className="bg-[#002060] text-white px-3 py-1 rounded-md text-sm font-medium">
      City
    </span>
    <div className="bg-[#b2f5f5] px-4 py-1 rounded-md min-w-[250px] text-sm border-2 border-black">
      {form.city || "N/A"}
    </div>
  </div>

</div>

     

          {/* TABS */}

<div className="flex w-full bg-[#66FFFF] overflow-hidden rounded-md border-2 border-black">

 {TABS.map((tab, index) => (
  <button
    key={tab}
    onClick={() => setActiveTab(index)}
    className={` px-5 py-1 text-sm font-medium transition
      ${index !== 0 ? "border-l-2 border-black" : ""}
      ${
        activeTab === index
          ? "bg-[#002060] text-white"
          : "bg-[#66FFFF] text-black"
      }
    `}
  >
    {tab}
  </button>
))}

</div>

          {/* TAB CONTENT */}

         {activeTab === 0 && (
  <>
    <PropertyDetails
      form={form}
      handleChange={handleChange}
      setCertificate={setCertificate}
    />
    <AmenitiesManager
      amenities={amenities}
      setAmenities={setAmenities}
    />
  </>
)}

{activeTab === 1 && (
  <AddressManager 
    form={form} 
    handleChange={handleChange} 
    supplierId={supplierId} 
  />
)}

{activeTab === 2 && (
 <PricingManager
  rooms={rooms}
  setRooms={setRooms}
  pricingData={pricingData}
  setPricingData={setPricingData}
/>
)}

{activeTab === 3 && (
  <StaffManager staff={staff} setStaff={setStaff} />
)}

{activeTab === 4 && (
  <QAManager faqs={faqs} setFaqs={setFaqs} />
)}

{activeTab === 5 && (
  <BookingPoliciesManager
    policies={policies}
    setPolicies={setPolicies}
  />
)}

{activeTab === 6 && (
  <BankDetailsManager
    bankDetails={bankDetails}
    setBankDetails={setBankDetails}
  />
)}

{activeTab === 7 && (
  <MediaManager
    images={images}
    setImages={setImages}
    coverIndex={coverIndex}
    setCoverIndex={setCoverIndex}
    videos={videos}
    setVideos={setVideos}
  />
)}

{activeTab === 8 && (
  <AnnualChargesManager
    charges={annualCharges}
    setCharges={setAnnualCharges}
  />
)}

          {/* BUTTONS */}

          <div className="mt-10 flex justify-between">

            {activeTab > 0 && (
              <Button onClick={prevTab}
              className="bg-[#FF0000] hover:bg-red-600 text-white px-6 py-2 font-semibold">
                ← Previous
              </Button>
            )}
          <div className="flex gap-3">
            {/* SAVE ONLY */}
            <Button onClick={saveDraft}
            className="bg-[#FF0000] hover:bg-red-600 text-white px-6 py-2 font-semibold">
              Save as Draft
            </Button>

            {/* SAVE AND CONTINUE */}
    {activeTab < TABS.length - 1 && (
      <Button onClick={saveAndContinue}
      className="bg-[#FF0000] hover:bg-red-600 text-white px-6 py-2 font-semibold">
        Save & Continue →
      </Button>
    )}
              {/* FINAL SUBMIT */}
    {activeTab === TABS.length - 1 && (
      <Button
        onClick={submitProperty}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit All"}
      </Button>
    )}
</div>
          </div>

     

      </div>

    </AdminLayout>
  );
}